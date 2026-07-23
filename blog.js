// ============================================
// DÁN THÔNG TIN GITHUB CỦA BẠN VÀO ĐÂY (sau khi tạo repo ở Bước 1)
// ============================================
var GITHUB_OWNER = "nguyentheanh47-code";   // vd: nguyenvana
var GITHUB_REPO = "chill-website";                 // vd: chill-website
var GITHUB_BRANCH = "main";
// ============================================

(function () {
  var API_BASE = "https://api.github.com/repos/" + GITHUB_OWNER + "/" + GITHUB_REPO + "/contents/content/blog?ref=" + GITHUB_BRANCH;
  var RAW_BASE = "https://raw.githubusercontent.com/" + GITHUB_OWNER + "/" + GITHUB_REPO + "/" + GITHUB_BRANCH + "/content/blog/";

  function notConfigured() {
    return GITHUB_OWNER.indexOf("DIEN_TEN") !== -1;
  }

  // Tách phần frontmatter (--- ... ---) và nội dung markdown
  function parseFrontmatter(raw) {
    var match = raw.match(/^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]+([\s\S]*)$/);
    var meta = {};
    var body = raw;
    if (match) {
      body = match[2];
      match[1].split(/\r?\n/).forEach(function (line) {
        var idx = line.indexOf(":");
        if (idx > -1) {
          var key = line.slice(0, idx).trim();
          var val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
          meta[key] = val;
        }
      });
    }
    return { meta: meta, body: body };
  }

  function formatDate(d) {
    if (!d) return "";
    var parts = d.split("-");
    if (parts.length === 3) return parts[2] + "/" + parts[1] + "/" + parts[0];
    return d;
  }

  function fetchAllPosts(callback) {
    fetch(API_BASE)
      .then(function (r) { return r.json(); })
      .then(function (files) {
        if (!Array.isArray(files)) { callback([]); return; }
        var mdFiles = files.filter(function (f) { return f.name.endsWith(".md"); });
        var promises = mdFiles.map(function (f) {
          var slug = f.name.replace(/\.md$/, "");
          return fetch(RAW_BASE + f.name)
            .then(function (r) { return r.text(); })
            .then(function (raw) {
              var parsed = parseFrontmatter(raw);
              return Object.assign({ slug: slug }, parsed.meta);
            });
        });
        Promise.all(promises).then(function (posts) {
          posts.sort(function (a, b) { return (b.date || "").localeCompare(a.date || ""); });
          callback(posts);
        });
      })
      .catch(function () { callback([]); });
  }

  function cardHTML(post) {
    var img = post.cover
      ? '<img src="' + post.cover + '" alt="' + post.title + '">'
      : "";
    return (
      '<a href="/tips/post/?slug=' + encodeURIComponent(post.slug) + '" class="tip-card">' +
        '<div class="tip-thumb">' + img + "</div>" +
        '<div class="tip-body">' +
          '<span class="tip-cat">' + (post.category || "") + "</span>" +
          "<h4>" + (post.title || "") + "</h4>" +
          "<p>" + (post.excerpt || "") + "</p>" +
          '<span class="tip-readmore">Đọc bài viết →</span>' +
        "</div>" +
      "</a>"
    );
  }

  // ---- Trang danh sách blog (/tips/) ----
  var listEl = document.getElementById("blog-list");
  if (listEl) {
    // Trang đã có sẵn danh sách bài viết dạng HTML tĩnh (để công cụ tìm kiếm đọc được).
    // Ở đây chỉ thử tải bản mới nhất từ GitHub để cập nhật nếu có bài mới —
    // nếu tải lỗi hoặc chưa cấu hình, GIỮ NGUYÊN danh sách tĩnh đã có, không xoá.
    if (window.ChillBlogSetup) window.ChillBlogSetup();
    if (!notConfigured()) {
      fetchAllPosts(function (posts) {
        if (posts.length) {
          listEl.innerHTML = posts.map(cardHTML).join("");
        }
        if (window.ChillBlogSetup) window.ChillBlogSetup();
      });
    }
  }

  // ---- Trang chi tiết bài viết (/tips/post/) ----
  var postContainer = document.getElementById("post-container");
  if (postContainer) {
    var params = new URLSearchParams(window.location.search);
    var slug = params.get("slug");
    if (!slug || notConfigured()) {
      postContainer.innerHTML = '<p style="text-align:center; color:var(--ink-40);">Không tìm thấy bài viết.</p>';
    } else {
      fetch(RAW_BASE + slug + ".md")
        .then(function (r) {
          if (!r.ok) throw new Error("not found");
          return r.text();
        })
        .then(function (raw) {
          var parsed = parseFrontmatter(raw);
          var meta = parsed.meta;
          document.title = (meta.title || "Bài viết") + " — Chill Entertainment";
          var coverHTML = meta.cover ? '<img src="' + meta.cover + '" alt="' + meta.title + '">' : "";
          var bodyHTML = window.marked ? window.marked.parse(parsed.body) : parsed.body;
          postContainer.innerHTML =
            '<div class="article-head">' +
              '<span class="eyebrow" style="justify-content:center;">' + (meta.category || "") + "</span>" +
              "<h1>" + (meta.title || "") + "</h1>" +
              '<p class="article-meta">Đội ngũ Chill Entertainment' + (meta.date ? " · " + formatDate(meta.date) : "") + "</p>" +
            "</div>" +
            '<div class="article-cover">' + coverHTML + "</div>" +
            '<div class="article-body">' + bodyHTML + "</div>" +
            '<div class="related-wrap"><h3>Bài viết liên quan</h3><div class="related-grid" id="related-grid"></div></div>';

          fetchAllPosts(function (posts) {
            var related = posts.filter(function (p) { return p.slug !== slug; }).slice(0, 2);
            var relEl = document.getElementById("related-grid");
            if (relEl) relEl.innerHTML = related.map(cardHTML).join("");
          });
        })
        .catch(function () {
          postContainer.innerHTML = '<p style="text-align:center; color:var(--ink-40);">Không tìm thấy bài viết.</p>';
        });
    }
  }
})();
