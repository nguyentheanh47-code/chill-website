// build.js — Tự động tạo trang HTML tĩnh riêng cho từng bài viết blog.
// Chạy: node build.js  (Cloudflare Pages sẽ tự chạy lệnh này qua "npm run build")
// Output: thư mục dist/ — đây là thứ thực sự được deploy lên web.

const fs = require("fs");
const path = require("path");
const marked = require("marked");

const ROOT = __dirname;
const OUT = path.join(ROOT, "dist");
const BLOG_DIR = path.join(ROOT, "content", "blog");

// Các file/thư mục KHÔNG copy vào dist (chỉ dùng lúc build, không cần deploy)
const EXCLUDE = new Set(["dist", "content", "node_modules", "build.js", "package.json", "package-lock.json", ".git"]);

// ---------- Tiện ích ----------

function rimraf(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const item of fs.readdirSync(src)) {
      copyRecursive(path.join(src, item), path.join(dest, item));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

function parseFrontmatter(raw) {
  const m = raw.match(/^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]+([\s\S]*)$/);
  const meta = {};
  if (!m) return { meta, body: raw };
  for (const line of m[1].split("\n")) {
    const t = line.trim();
    if (!t) continue;
    const idx = t.indexOf(":");
    if (idx === -1) continue;
    const key = t.slice(0, idx).trim();
    let val = t.slice(idx + 1).trim();
    val = val.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
    meta[key] = val;
  }
  return { meta, body: m[2] };
}

// Loại bỏ số thứ tự ở đầu tên file (ví dụ "01-ngay-dau" -> "ngay-dau") để URL đẹp hơn
function slugFromFilename(filename) {
  const base = filename.replace(/\.md$/, "");
  return base.replace(/^\d+-/, "");
}

function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return d + "/" + m + "/" + y;
}

// ---------- Đọc toàn bộ bài viết ----------

function loadAllPosts() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map((filename) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
    const { meta, body } = parseFrontmatter(raw);
    return {
      slug: slugFromFilename(filename),
      title: meta.title || "",
      category: meta.category || "",
      date: meta.date || "",
      excerpt: meta.excerpt || "",
      cover: meta.cover || "",
      focus_keyword: meta.focus_keyword || "",
      bodyHTML: marked.parse(body || ""),
    };
  });
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

// ---------- HTML helpers (khớp với style.css / class hiện có) ----------

function headHTML(title, description, ogImage, ogUrl, ogType) {
  const image = ogImage ? (ogImage.startsWith("http") ? ogImage : "https://chillentertainment.vn" + ogImage) : "https://chillentertainment.vn/images/logo.png";
  const url = ogUrl ? "https://chillentertainment.vn" + ogUrl : "https://chillentertainment.vn/";
  return `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32.png">
<link rel="icon" type="image/png" sizes="192x192" href="/images/favicon-192.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/style.css">
<meta property="og:type" content="${ogType || "website"}">
<meta property="og:site_name" content="Chill Entertainment">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${image}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${image}">`;
}

function headerHTML() {
  return `<header class="site">
  <nav>
    <a href="/" class="logo"><img src="/images/logo.png" alt="Chill Entertainment"></a>
    <a href="/tips/" class="nav-search-btn" id="navSearchBtn" aria-label="Tìm kiếm bài viết" title="Tìm kiếm bài viết"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg></a>
    <ul class="navlinks">
      <li><a href="/">Trang chủ</a></li>
      <li><a href="/gioi-thieu/">Giới thiệu</a></li>
      <li><a href="/mentor/">Mentor</a></li>
      <li><a href="/hall-of-fame/">Hall of Fame</a></li>
      <li><a href="/tips/" class="active">Blog/Tips</a></li>
      <li><a href="/lien-he/">Liên hệ</a></li>
    </ul>
    <div class="navcta"><a href="/lien-he/" class="btn btn-primary">Đăng ký ứng tuyển</a></div>
  </nav>
</header>`;
}

function footerHTML() {
  return `<footer class="site">
  <div class="wrap">
    <div class="footer-top">
      <div>
        <div class="footer-logo"><img src="/images/logo-white.png" alt="Chill Entertainment"></div>
        <p style="max-width:280px; font-size:13px; line-height:1.6;">Học viện đào tạo và phát triển Idol Livestream.</p>
      </div>
      <div class="footer-links">
        <div class="footer-col"><h5>Khám phá</h5><a href="/gioi-thieu/">Giới thiệu</a><a href="/mentor/">Mentor</a><a href="/hall-of-fame/">Hall of Fame</a><a href="/tips/">Blog / Tips</a><a href="/faq/">FAQ</a></div>
        <div class="footer-col"><h5>Kết nối</h5><a href="/lien-he/">Liên hệ</a><a href="https://www.facebook.com/ChillEntertainment9" target="_blank" rel="noopener">Fanpage</a><a href="https://www.tiktok.com/@chillentertainment568" target="_blank" rel="noopener">TikTok</a></div>
      </div>
    </div>
    <div class="footer-bottom"><span>© 2026 Chill Entertainment.</span><span>Bright Modern · Premium Creator Academy</span></div>
  </div>
</footer>
<script src="/assets/main.js" defer></script>
<script src="/assets/blog.js" defer></script>`;
}

function cardHTML(p) {
  const img = p.cover ? `<img src="${p.cover}" alt="${p.title}">` : "";
  return `<a href="/tips/${p.slug}/" class="tip-card">
  <div class="tip-thumb">${img}</div>
  <div class="tip-body">
    <span class="tip-cat">${p.category}</span>
    <h4>${p.title}</h4>
    <p>${p.excerpt}</p>
    <span class="tip-readmore">Đọc bài viết →</span>
  </div>
</a>`;
}

// ---------- Trang chi tiết 1 bài viết ----------

function buildPostPage(post, allPosts) {
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const coverHTML = post.cover ? `<img src="${post.cover}" alt="${post.title}">` : "";

  const jsonLd = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": ${JSON.stringify(post.title)},
  "description": ${JSON.stringify(post.excerpt)},
  "datePublished": ${JSON.stringify(post.date)},
  "image": ${JSON.stringify(post.cover ? "https://chillentertainment.vn" + post.cover : "")},
  "publisher": { "@type": "Organization", "name": "Chill Entertainment" }
}
</script>`;

  return `<!DOCTYPE html>
<html lang="vi">
<head>
${headHTML(post.title + " — Chill Entertainment", post.excerpt, post.cover, "/tips/" + post.slug + "/", "article")}
${jsonLd}
</head>
<body>

${headerHTML()}

<section style="padding-top:56px; padding-bottom:0;">
  <div class="wrap">
    <div class="breadcrumb"><a href="/">Trang chủ</a> / <a href="/tips/">Blog/Tips</a> / ${post.title}</div>
  </div>
</section>

<section style="padding-top:32px;">
  <div class="wrap">
    <div class="article-head">
      <span class="eyebrow" style="justify-content:center;">${post.category}</span>
      <h1>${post.title}</h1>
      <p class="article-meta">Đội ngũ Chill Entertainment${post.date ? " · " + formatDate(post.date) : ""}</p>
    </div>
    <div class="article-cover">${coverHTML}</div>
    <div class="article-body">${post.bodyHTML}</div>
    <div class="related-wrap"><h3>Bài viết liên quan</h3><div class="related-grid">${related.map(cardHTML).join("\n")}</div></div>
  </div>
</section>

<section class="center" style="padding-top:40px; padding-bottom:120px;">
  <div class="wrap">
    <h2 style="margin-bottom:20px;">Sẵn sàng thử buổi live đầu tiên?</h2>
    <a href="/lien-he/" class="btn btn-primary">Đăng ký ứng tuyển ngay</a>
  </div>
</section>

${footerHTML()}
</body>
</html>
`;
}

// ---------- Trang danh sách blog (/tips/) ----------

function buildBlogListPage(allPosts) {
  const cards = allPosts.map(cardHTML).join("\n      ");
  return `<!DOCTYPE html>
<html lang="vi">
<head>
${headHTML("Blog / Tips — Chill Entertainment", "Chia sẻ livestream thực tế, đúc kết từ Mentor và Idol tại Chill Entertainment.", null, "/tips/", "website")}
</head>
<body>

${headerHTML()}

<section style="padding-top:56px; padding-bottom:0;">
  <div class="wrap">
    <div class="breadcrumb"><a href="/">Trang chủ</a> / Blog & Tips</div>
    <span class="eyebrow">Blog / Tips</span>
    <h1>Chia sẻ<br>từ Chill.</h1>
    <p>Những bài viết ngắn, thực tế — được đúc kết từ chính Mentor và Idol tại Chill Entertainment.</p>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="blog-search">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
      <input type="text" id="blogSearchInput" placeholder="Tìm bài viết theo từ khoá, chuyên mục...">
    </div>
    <div class="card-row" id="blog-list">
      ${cards}
    </div>
    <div class="blog-loadmore" id="blogLoadMoreWrap"><button type="button" class="btn btn-outline" id="blogLoadMoreBtn">Xem thêm</button></div>
    <p class="blog-empty" id="blogEmptyMsg" style="display:none;">Không tìm thấy bài viết nào phù hợp.</p>
  </div>
</section>

${footerHTML()}
</body>
</html>
`;
}

// ---------- Chạy build ----------

function main() {
  console.log("Bắt đầu build...");
  rimraf(OUT);
  fs.mkdirSync(OUT, { recursive: true });

  // 1. Copy toàn bộ site (trừ các mục loại trừ) vào dist/
  for (const item of fs.readdirSync(ROOT)) {
    if (EXCLUDE.has(item)) continue;
    copyRecursive(path.join(ROOT, item), path.join(OUT, item));
  }

  // 2. Đọc toàn bộ bài viết
  const posts = loadAllPosts();
  console.log("Đã đọc", posts.length, "bài viết.");

  // 3. Tạo trang riêng cho từng bài: dist/tips/{slug}/index.html
  for (const post of posts) {
    const dir = path.join(OUT, "tips", post.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), buildPostPage(post, posts));
  }
  console.log("Đã tạo", posts.length, "trang bài viết riêng tại /tips/{slug}/");

  // 4. Ghi đè lại dist/tips/index.html với danh sách bài viết mới nhất
  fs.writeFileSync(path.join(OUT, "tips", "index.html"), buildBlogListPage(posts));

  // 5. Cập nhật link bài "mentor-khong-lam-thay" trên trang Mentor sang URL mới
  const mentorPath = path.join(OUT, "mentor", "index.html");
  if (fs.existsSync(mentorPath)) {
    let mentorHTML = fs.readFileSync(mentorPath, "utf-8");
    mentorHTML = mentorHTML.replace(
      '/tips/post/?slug=mentor-khong-lam-thay',
      '/tips/mentor-khong-lam-thay/'
    );
    fs.writeFileSync(mentorPath, mentorHTML);
  }

  console.log("Build xong. Nội dung nằm trong thư mục dist/");
}

main();
