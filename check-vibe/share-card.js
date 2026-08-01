// share-card.js — Tạo ảnh thẻ kết quả để chia sẻ, dùng chung cho Xin Xăm / Vibe Hôm Nay / Trắc nghiệm
// Cách dùng: generateShareCard({ icon, eyebrow, title, body }, function(blob){ ... })

function generateShareCard(opts, callback) {
  // Đợi font Montserrat tải xong hẳn trước khi vẽ chữ lên canvas
  // (nếu vẽ khi font chưa tải xong, trình duyệt tự động dùng font hệ thống thay thế -> dễ lỗi dấu tiếng Việt)
  if (document.fonts && document.fonts.ready) {
    document.fonts.load("800 54px 'Montserrat'").then(function(){
      document.fonts.ready.then(function(){ drawShareCard(opts, callback); });
    });
  } else {
    drawShareCard(opts, callback);
  }
}

function drawShareCard(opts, callback) {
  var W = 1080, H = 1350;
  var canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  var ctx = canvas.getContext('2d');

  // Nền vũ trụ (gradient tím than)
  var grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#15132b');
  grad.addColorStop(1, '#0B0B1F');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Quầng sáng góc trên (giả lập nebula)
  var neb = ctx.createRadialGradient(W*0.75, H*0.08, 20, W*0.75, H*0.08, 500);
  neb.addColorStop(0, 'rgba(107,63,160,0.55)');
  neb.addColorStop(1, 'rgba(107,63,160,0)');
  ctx.fillStyle = neb;
  ctx.fillRect(0, 0, W, H);

  // Sao lấp lánh ngẫu nhiên (cố định seed đơn giản để nhìn tự nhiên)
  var starPositions = [
    [0.1,0.05],[0.22,0.15],[0.35,0.06],[0.5,0.12],[0.65,0.04],[0.78,0.18],[0.9,0.08],
    [0.06,0.28],[0.18,0.4],[0.3,0.32],[0.85,0.35],[0.93,0.25],
    [0.08,0.55],[0.15,0.68],[0.88,0.6],[0.92,0.72],
    [0.1,0.85],[0.2,0.92],[0.8,0.88],[0.9,0.95]
  ];
  ctx.fillStyle = 'rgba(240,238,250,0.85)';
  starPositions.forEach(function(p){
    ctx.beginPath();
    ctx.arc(W*p[0], H*p[1], 2.2, 0, Math.PI*2);
    ctx.fill();
  });

  // Logo/tên nhãn góc trên
  ctx.fillStyle = '#25F4EE';
  ctx.font = "700 30px 'Montserrat', Arial, sans-serif";
  ctx.textAlign = 'center';
  ctx.fillText('CHECK VIBE VŨ TRỤ', W/2, 90);

  // Icon lớn
  ctx.font = "120px 'Montserrat', Arial, sans-serif";
  ctx.fillText(opts.icon || '🔮', W/2, 260);

  // Eyebrow nhỏ
  ctx.fillStyle = '#FFE9A8';
  ctx.font = "700 26px 'Montserrat', Arial, sans-serif";
  ctx.fillText((opts.eyebrow || '').toUpperCase(), W/2, 330);

  // Tiêu đề chính (wrap nếu dài)
  ctx.fillStyle = '#F5F3FF';
  ctx.font = "800 54px 'Montserrat', Arial, sans-serif";
  wrapText(ctx, opts.title || '', W/2, 410, W - 140, 64);

  // Nội dung chính (wrap, cỡ vừa)
  ctx.fillStyle = 'rgba(245,243,255,0.92)';
  ctx.font = "400 34px 'Montserrat', Arial, sans-serif";
  var bodyStartY = 410 + (countLines(ctx, opts.title || '', W - 140) * 64) + 60;
  wrapText(ctx, opts.body || '', W/2, bodyStartY, W - 160, 46);

  // Chân trang thương hiệu
  ctx.fillStyle = 'rgba(245,243,255,0.5)';
  ctx.font = "400 26px 'Montserrat', Arial, sans-serif";
  ctx.fillText('chillentertainment.vn/check-vibe', W/2, H - 60);

  canvas.toBlob(function(blob){ callback(blob); }, 'image/png', 0.92);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line = '';
  var curY = y;
  for (var i = 0; i < words.length; i++) {
    var testLine = line + words[i] + ' ';
    if (ctx.measureText(testLine).width > maxWidth && line !== '') {
      ctx.fillText(line.trim(), x, curY);
      line = words[i] + ' ';
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, curY);
  return curY;
}

function countLines(ctx, text, maxWidth) {
  var words = text.split(' ');
  var line = '';
  var count = 1;
  for (var i = 0; i < words.length; i++) {
    var testLine = line + words[i] + ' ';
    if (ctx.measureText(testLine).width > maxWidth && line !== '') {
      count++;
      line = words[i] + ' ';
    } else {
      line = testLine;
    }
  }
  return count;
}

// Chia sẻ nhanh — chỉ chữ + link, mở bảng chia sẻ hệ điều hành (gửi tin nhắn Zalo/Messenger nhanh)
// Chia sẻ nhanh — gửi kèm ẢNH thật của kết quả + câu ngắn gọn, để tin nhắn hiện đúng ảnh (không bị Zalo/Facebook tự lấy ảnh chung chung)
function shareQuickCard(cardOpts, shortCaption, shareUrl, btnEl, filename) {
  var oldText = btnEl ? btnEl.textContent : '';
  if (btnEl) btnEl.textContent = '⏳ Đang tạo ảnh...';

  generateShareCard(cardOpts, function(blob){
    if (btnEl) btnEl.textContent = oldText;
    var file = new File([blob], filename, { type: 'image/png' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({ files: [file], text: shortCaption }).catch(function(){});
    } else if (navigator.share) {
      // Máy không hỗ trợ gửi kèm ảnh -> gửi chữ + link như cũ
      navigator.share({ title: 'Check Vibe Vũ Trụ', text: shortCaption, url: shareUrl }).catch(function(){});
    } else {
      navigator.clipboard.writeText(shortCaption + '\n\n' + shareUrl).then(function(){
        if (btnEl) {
          btnEl.textContent = '✅ Đã copy!';
          setTimeout(function(){ btnEl.textContent = oldText; }, 2000);
        }
      });
    }
  });
}

// Tải ảnh đẹp về máy — dành cho ai muốn đăng lên feed/tường kèm hình
// Lưu ý: thẻ <a download> không hoạt động đúng trên Safari iPhone (hay bị mở link/đứng trang) -> ưu tiên dùng share ảnh qua hệ điều hành (có tuỳ chọn "Lưu vào Ảnh"), chỉ dùng cách tải file cũ khi máy không hỗ trợ.
function downloadCardImage(blob, filename, btnEl) {
  var file = new File([blob], filename, { type: 'image/png' });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    navigator.share({ files: [file] }).then(function(){
      if (btnEl) {
        var oldText = btnEl.textContent;
        btnEl.textContent = '✅ Chọn "Lưu vào Ảnh" nhé!';
        setTimeout(function(){ btnEl.textContent = oldText; }, 2500);
      }
    }).catch(function(){});
  } else {
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (btnEl) {
      var oldText2 = btnEl.textContent;
      btnEl.textContent = '✅ Đã tải ảnh!';
      setTimeout(function(){ btnEl.textContent = oldText2; }, 2000);
    }
  }
}
