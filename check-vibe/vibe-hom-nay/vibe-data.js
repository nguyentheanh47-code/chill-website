// Dữ liệu Vibe Hôm Nay — Check Vibe Vũ Trụ
// GIAI ĐOẠN THỬ NGHIỆM (Bước A): chỉ có nội dung đầy đủ cho tiết khí hiện tại (Đại Thử)
// Các tiết khí khác sẽ được viết dần ở Bước B

// 1. Khoảng ngày của 24 tiết khí trong năm (dùng để xác định hôm nay đang ở tiết nào)
// Mỗi mục: { ten, thang_bat_dau, ngay_bat_dau, thang_ket_thuc, ngay_ket_thuc, mua, hanh }
var TIET_KHI_RANGES = [
  { ten: "Tiểu Hàn",   from: [1, 5],   to: [1, 19],  mua: "Đông", hanh: "Thuỷ" },
  { ten: "Đại Hàn",    from: [1, 20],  to: [2, 3],   mua: "Đông", hanh: "Thuỷ" },
  { ten: "Lập Xuân",   from: [2, 4],   to: [2, 18],  mua: "Xuân", hanh: "Mộc" },
  { ten: "Vũ Thuỷ",    from: [2, 19],  to: [3, 4],   mua: "Xuân", hanh: "Mộc" },
  { ten: "Kinh Trập",  from: [3, 5],   to: [3, 19],  mua: "Xuân", hanh: "Mộc" },
  { ten: "Xuân Phân",  from: [3, 20],  to: [4, 4],   mua: "Xuân", hanh: "Mộc" },
  { ten: "Thanh Minh", from: [4, 5],   to: [4, 19],  mua: "Xuân", hanh: "Mộc" },
  { ten: "Cốc Vũ",     from: [4, 20],  to: [5, 5],   mua: "Xuân", hanh: "Thổ" },
  { ten: "Lập Hạ",     from: [5, 6],   to: [5, 20],  mua: "Hạ",   hanh: "Hoả" },
  { ten: "Tiểu Mãn",   from: [5, 21],  to: [6, 5],   mua: "Hạ",   hanh: "Hoả" },
  { ten: "Mang Chủng", from: [6, 6],   to: [6, 20],  mua: "Hạ",   hanh: "Hoả" },
  { ten: "Hạ Chí",     from: [6, 21],  to: [7, 6],   mua: "Hạ",   hanh: "Hoả" },
  { ten: "Tiểu Thử",   from: [7, 7],   to: [7, 21],  mua: "Hạ",   hanh: "Hoả" },
  { ten: "Đại Thử",    from: [7, 22],  to: [8, 6],   mua: "Hạ",   hanh: "Hoả" },
  { ten: "Lập Thu",    from: [8, 7],   to: [8, 22],  mua: "Thu",  hanh: "Kim" },
  { ten: "Xử Thử",     from: [8, 23],  to: [9, 6],   mua: "Thu",  hanh: "Kim" },
  { ten: "Bạch Lộ",    from: [9, 7],   to: [9, 22],  mua: "Thu",  hanh: "Kim" },
  { ten: "Thu Phân",   from: [9, 23],  to: [10, 7],  mua: "Thu",  hanh: "Kim" },
  { ten: "Hàn Lộ",     from: [10, 8],  to: [10, 22], mua: "Thu",  hanh: "Kim" },
  { ten: "Sương Giáng",from: [10, 23], to: [11, 6],  mua: "Thu",  hanh: "Kim" },
  { ten: "Lập Đông",   from: [11, 7],  to: [11, 21], mua: "Đông", hanh: "Thuỷ" },
  { ten: "Tiểu Tuyết", from: [11, 22], to: [12, 6],  mua: "Đông", hanh: "Thuỷ" },
  { ten: "Đại Tuyết",  from: [12, 7],  to: [12, 20], mua: "Đông", hanh: "Thuỷ" },
  { ten: "Đông Chí",   from: [12, 21], to: [1, 4],   mua: "Đông", hanh: "Thuỷ" }
];

// 2. Khoảng ngày 12 cung hoàng đạo
var CUNG_HOANG_DAO_RANGES = [
  { ten: "Bạch Dương", from: [3, 21],  to: [4, 19] },
  { ten: "Kim Ngưu",   from: [4, 20],  to: [5, 20] },
  { ten: "Song Tử",    from: [5, 21],  to: [6, 20] },
  { ten: "Cự Giải",    from: [6, 21],  to: [7, 22] },
  { ten: "Sư Tử",      from: [7, 23],  to: [8, 22] },
  { ten: "Xử Nữ",      from: [8, 23],  to: [9, 22] },
  { ten: "Thiên Bình", from: [9, 23],  to: [10, 22] },
  { ten: "Bọ Cạp",     from: [10, 23], to: [11, 21] },
  { ten: "Nhân Mã",    from: [11, 22], to: [12, 21] },
  { ten: "Ma Kết",     from: [12, 22], to: [1, 19] },
  { ten: "Bảo Bình",   from: [1, 20],  to: [2, 18] },
  { ten: "Song Ngư",   from: [2, 19],  to: [3, 20] }
];

// 3. Nội dung Vibe theo (tiết khí + cung hoàng đạo)
// GIAI ĐOẠN THỬ NGHIỆM: chỉ có đủ 12 cung cho tiết Đại Thử — các tiết khác thêm dần ở Bước B
var VIBE_CONTENT = {
  "Đại Thử": {
    "Bạch Dương": { vutru: "Trời đang giữa tiết Đại Thử, hành Hoả cực vượng — mà Bạch Dương vốn là lửa của lửa, năng lượng hôm nay gần như không có giới hạn trên.", chill: "Full pin 100% đó chiến thần 🔥 Nhưng nhớ đừng đốt sạch trong 1 ngày, để dành chút cho ngày mai nha!" },
    "Kim Ngưu": { vutru: "Trời đang giữa tiết Đại Thử, hành Hoả cực vượng — Kim Ngưu vốn điềm tĩnh, hôm nay có thể thấy hơi nóng nảy hơn thường lệ.", chill: "Nóng trong người xíu là bình thường thôi, uống nước mát và chill lại là ổn ngay á, đừng quạu với ai nha!" },
    "Song Tử": { vutru: "Trời đang giữa tiết Đại Thử, hành Hoả cực vượng — Song Tử vốn nhanh nhẹn, hôm nay đầu óc chạy nhanh hơn cả nắng ngoài trời.", chill: "Ý tưởng tuôn ra ào ào đó, tranh thủ ghi lại liền kẻo quên, não đang chạy full tốc độ luôn!" },
    "Cự Giải": { vutru: "Trời đang giữa tiết Đại Thử, hành Hoả cực vượng — Cự Giải vốn nhạy cảm, hôm nay dễ thấy nóng nực cả trong lòng lẫn ngoài trời.", chill: "Hơi bứt rứt trong người thì đừng ngại nghỉ ngơi, tìm chỗ mát mẻ chill 1 chút là nhẹ lòng liền!" },
    "Sư Tử": { vutru: "Trời đang giữa tiết Đại Thử, hành Hoả cực vượng — mà Sư Tử vốn mang mệnh lửa, năng lượng hôm nay đang cộng hưởng ở đỉnh điểm.", chill: "Nắng cỡ nào thì aura em cũng cỡ đó luôn 🔥 Ý tưởng ấp ủ lâu rồi thì tung ra liền tay đi, quý nhân đang để ý em đó!" },
    "Xử Nữ": { vutru: "Trời đang giữa tiết Đại Thử, hành Hoả cực vượng — Xử Nữ vốn tỉ mỉ, hôm nay dễ để ý những chi tiết nhỏ mà người khác bỏ qua.", chill: "Mắt tinh của em hôm nay phát huy tối đa đó, để ý kỹ là phát hiện ra điều hay ho ngay!" },
    "Thiên Bình": { vutru: "Trời đang giữa tiết Đại Thử, hành Hoả cực vượng — Thiên Bình vốn cân bằng, hôm nay cần chú ý giữ nhịp giữa công việc và nghỉ ngơi.", chill: "Đừng để cái nóng ngoài trời làm mất cân bằng trong người nha, xen kẽ nghỉ giữa giờ là hợp lý đó!" },
    "Bọ Cạp": { vutru: "Trời đang giữa tiết Đại Thử, hành Hoả cực vượng — Bọ Cạp vốn mãnh liệt, hôm nay cảm xúc có thể dâng cao hơn bình thường.", chill: "Cảm xúc mạnh hôm nay là bình thường thôi, hướng nó vào việc có ích là biến thành động lực khủng luôn!" },
    "Nhân Mã": { vutru: "Trời đang giữa tiết Đại Thử, hành Hoả cực vượng — Nhân Mã vốn phóng khoáng, hôm nay càng thêm muốn bứt phá giới hạn.", chill: "Máu phiêu lưu đang trỗi dậy đó, có kèo gì mới lạ thì cứ thử, hôm nay hợp để bung xoã!" },
    "Ma Kết": { vutru: "Trời đang giữa tiết Đại Thử, hành Hoả cực vượng — Ma Kết vốn kiên trì, hôm nay sức nóng bên ngoài lại tiếp thêm quyết tâm bên trong.", chill: "Nắng chiếu vào là quyết tâm em cũng cháy theo luôn á, việc gì đang dang dở thì hôm nay đẩy nốt đi!" },
    "Bảo Bình": { vutru: "Trời đang giữa tiết Đại Thử, hành Hoả cực vượng — Bảo Bình vốn khác biệt, hôm nay dễ nảy ra ý tưởng không giống ai giữa cái nóng.", chill: "Nóng não ra ý hay đó nha 🧠 Nghĩ ra cái gì lạ lạ thì cứ thử, biết đâu lại thành hit!" },
    "Song Ngư": { vutru: "Trời đang giữa tiết Đại Thử, hành Hoả cực vượng — Song Ngư vốn mơ mộng, hôm nay dễ thấy uể oải hơn vì cái nóng.", chill: "Hơi lười 1 chút cũng không sao đâu, nghe nhạc chill hoặc ngủ trưa xíu là nạp lại năng lượng liền!" }
  }
};

// Hàm phụ: kiểm tra ngày (thang, ngay) có nằm trong khoảng [from, to] không, xử lý cả trường hợp vắt qua năm mới (vd Đông Chí, Ma Kết)
function ngayTrongKhoang(thang, ngay, from, to) {
  var val = thang * 100 + ngay;
  var fromVal = from[0] * 100 + from[1];
  var toVal = to[0] * 100 + to[1];
  if (fromVal <= toVal) {
    return val >= fromVal && val <= toVal;
  } else {
    // khoảng vắt qua năm mới (vd 22/12 -> 19/1)
    return val >= fromVal || val <= toVal;
  }
}

function timTietKhiHomNay(date) {
  var thang = date.getMonth() + 1;
  var ngay = date.getDate();
  for (var i = 0; i < TIET_KHI_RANGES.length; i++) {
    var t = TIET_KHI_RANGES[i];
    if (ngayTrongKhoang(thang, ngay, t.from, t.to)) return t;
  }
  return null;
}

function timCungHoangDao(thang, ngay) {
  for (var i = 0; i < CUNG_HOANG_DAO_RANGES.length; i++) {
    var c = CUNG_HOANG_DAO_RANGES[i];
    if (ngayTrongKhoang(thang, ngay, c.from, c.to)) return c.ten;
  }
  return null;
}
