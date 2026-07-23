// ============================================
// CHỈNH SỬA THÔNG TIN LIÊN HỆ Ở ĐÂY (áp dụng cho mọi trang)
// ============================================
var HOTLINE_PHONE = "0813787568";                 // số điện thoại (không dấu cách)
var HOTLINE_ZALO = "https://zalo.me/0813787568";   // link Zalo — sửa số của bạn
var HOTLINE_TELEGRAM = "https://t.me/+84813787568"; // link Telegram
// ============================================

(function () {
  // ---- 0. Menu di động: bấm vào logo để xổ menu xuống ----
  var logoEl = document.querySelector(".logo");
  var navlinksEl = document.querySelector(".navlinks");
  if (logoEl && navlinksEl) {
    logoEl.addEventListener("click", function (e) {
      if (window.innerWidth <= 900) {
        e.preventDefault(); // trên di động: chặn việc chuyển trang, chỉ xổ menu
        navlinksEl.classList.toggle("nav-open");
      }
      // trên desktop (>900px): không chặn gì, logo vẫn bấm về trang chủ như bình thường
    });

    // Cuộn trang mà không chọn mục nào trong menu -> tự đóng menu lại
    window.addEventListener("scroll", function () {
      if (navlinksEl.classList.contains("nav-open")) {
        navlinksEl.classList.remove("nav-open");
      }
    }, { passive: true });
  }

  // ---- 1. Chèn nút liên hệ nổi (Zalo / Telegram / Điện thoại) ----
  var fc = document.createElement("div");
  fc.className = "floating-contact";
  fc.innerHTML =
    '<a href="' + HOTLINE_ZALO + '" target="_blank" rel="noopener" class="fc-btn fc-zalo" title="Chat Zalo" aria-label="Chat Zalo">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>' +
    '</a>' +
    '<a href="' + HOTLINE_TELEGRAM + '" target="_blank" rel="noopener" class="fc-btn fc-telegram" title="Chat Telegram" aria-label="Chat Telegram">' +
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.5 4.5l-19 7.3c-.9.35-.9 1.65.05 1.95l4.65 1.5 1.8 5.7c.25.75 1.2.95 1.75.35l2.5-2.7 4.7 3.5c.7.5 1.7.15 1.9-.7l3.1-14.7c.25-1.1-.85-2-1.85-1.6zM8.5 13.9l9.2-6.3c.3-.2.6.15.35.4l-7.6 7.35c-.3.3-.5.7-.55 1.15l-.2 2-1.2-4.6z"/></svg>' +
    '</a>' +
    '<a href="tel:' + HOTLINE_PHONE + '" class="fc-btn fc-phone" title="Gọi điện" aria-label="Gọi điện">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.45 2.1L8.1 9.6a16 16 0 006 6l1.1-1.15a2 2 0 012.1-.45c.9.3 1.8.5 2.7.6a2 2 0 011.9 2z"/></svg>' +
    '</a>';
  document.body.appendChild(fc);

  // ---- 1b. Slideshow ảnh Idol ở trang chủ ----
  // MUỐN THÊM/BỚT ẢNH: chỉ cần sửa danh sách bên dưới, không cần sửa gì khác.
  // Đặt file ảnh tương ứng vào thư mục /images/ với đúng tên trong danh sách.
  var HERO_SLIDER_IMAGES = [
    "/images/hero-home-1.jpg",
    "/images/hero-home-2.jpg",
    "/images/hero-home-3.jpg",
    "/images/hero-home-4.jpg"
    // Thêm ảnh mới: chỉ cần thêm 1 dòng nữa vào đây, ví dụ:
    // ,"/images/hero-home-5.jpg"
    // rồi upload đúng file ảnh đó vào /images/ — không cần sửa gì khác.
  ];
  var SLIDE_INTERVAL_MS = 4000; // 4 giây mỗi ảnh

  var sliderEl = document.getElementById("hero-slider");
  if (sliderEl) {
    sliderEl.innerHTML = HERO_SLIDER_IMAGES.map(function (src, i) {
      return '<img src="' + src + '" alt="Idol Chill Entertainment" class="' + (i === 0 ? "active" : "") + '">';
    }).join("");

    var slideImgs = sliderEl.querySelectorAll("img");
    if (slideImgs.length > 1) {
      var current = 0;
      setInterval(function () {
        slideImgs[current].classList.remove("active");
        current = (current + 1) % slideImgs.length;
        slideImgs[current].classList.add("active");
      }, SLIDE_INTERVAL_MS);
    }
  }

  // ---- 2. Hiệu ứng "xuất hiện" khi cuộn trang ----
  var selectors = [
    ".tip-card", ".value-item", ".band-item", ".podium-card", ".split-col",
    ".hero-grid > div", ".about-grid > div", ".contact-wrap > div",
    ".article-body > *", ".page-hero .wrap > *", ".related-grid > *"
  ];
  var targets = document.querySelectorAll(selectors.join(","));

  if ("IntersectionObserver" in window) {
    targets.forEach(function (el) { el.classList.add("reveal"); });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach(function (el) { io.observe(el); });
  }
})();
