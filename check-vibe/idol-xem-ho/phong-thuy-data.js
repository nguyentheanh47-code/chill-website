// Dữ liệu Idol Xem Hộ — Phong thuỷ thật theo Can Chi / Nạp Âm / Mệnh Ngũ Hành
// Năm 2026 = Bính Ngọ, mệnh Thiên Hà Thuỷ (hành Thuỷ)

// 1. Bảng 30 Nạp Âm (chu kỳ 60 năm, mỗi nạp âm ứng 2 năm liên tiếp)
// index 0-29, năm sinh -> index = Math.floor((((namSinh - 4) % 60) + 60) % 60 / 2)
var NAP_AM_LIST = [
  { ten: "Hải Trung Kim", ynghia: "Vàng dưới đáy biển", hanh: "Kim" },
  { ten: "Lư Trung Hỏa", ynghia: "Lửa trong lò", hanh: "Hỏa" },
  { ten: "Đại Lâm Mộc", ynghia: "Cây trong rừng lớn", hanh: "Mộc" },
  { ten: "Lộ Bàng Thổ", ynghia: "Đất ven đường", hanh: "Thổ" },
  { ten: "Kiếm Phong Kim", ynghia: "Kim loại đầu mũi kiếm", hanh: "Kim" },
  { ten: "Sơn Đầu Hỏa", ynghia: "Lửa trên đỉnh núi", hanh: "Hỏa" },
  { ten: "Giản Hạ Thủy", ynghia: "Nước dưới khe suối", hanh: "Thủy" },
  { ten: "Thành Đầu Thổ", ynghia: "Đất trên đầu thành", hanh: "Thổ" },
  { ten: "Bạch Lạp Kim", ynghia: "Vàng trong nến trắng", hanh: "Kim" },
  { ten: "Dương Liễu Mộc", ynghia: "Cây dương liễu", hanh: "Mộc" },
  { ten: "Tuyền Trung Thủy", ynghia: "Nước trong khe suối", hanh: "Thủy" },
  { ten: "Ốc Thượng Thổ", ynghia: "Đất trên nóc nhà", hanh: "Thổ" },
  { ten: "Tích Lịch Hỏa", ynghia: "Lửa sấm sét", hanh: "Hỏa" },
  { ten: "Tùng Bách Mộc", ynghia: "Cây tùng bách", hanh: "Mộc" },
  { ten: "Trường Lưu Thủy", ynghia: "Dòng nước chảy dài", hanh: "Thủy" },
  { ten: "Sa Trung Kim", ynghia: "Vàng lẫn trong cát", hanh: "Kim" },
  { ten: "Sơn Hạ Hỏa", ynghia: "Lửa dưới chân núi", hanh: "Hỏa" },
  { ten: "Bình Địa Mộc", ynghia: "Cây trên đất bằng", hanh: "Mộc" },
  { ten: "Bích Thượng Thổ", ynghia: "Đất trên vách tường", hanh: "Thổ" },
  { ten: "Kim Bạch Kim", ynghia: "Vàng pha bạc", hanh: "Kim" },
  { ten: "Phú Đăng Hỏa", ynghia: "Lửa đèn dầu", hanh: "Hỏa" },
  { ten: "Thiên Hà Thủy", ynghia: "Nước trên trời (sông Ngân)", hanh: "Thủy" },
  { ten: "Đại Trạch Thổ", ynghia: "Đất nền nhà lớn", hanh: "Thổ" },
  { ten: "Thoa Xuyến Kim", ynghia: "Vàng làm trang sức", hanh: "Kim" },
  { ten: "Tang Đố Mộc", ynghia: "Cây dâu tằm", hanh: "Mộc" },
  { ten: "Đại Khê Thủy", ynghia: "Nước khe lớn", hanh: "Thủy" },
  { ten: "Sa Trung Thổ", ynghia: "Đất lẫn trong cát", hanh: "Thổ" },
  { ten: "Thiên Thượng Hỏa", ynghia: "Lửa trên trời", hanh: "Hỏa" },
  { ten: "Thạch Lựu Mộc", ynghia: "Cây thạch lựu", hanh: "Mộc" },
  { ten: "Đại Hải Thủy", ynghia: "Nước biển lớn", hanh: "Thủy" }
];

// 2. 12 Con Giáp theo Địa Chi
var CON_GIAP_LIST = ["Chuột (Tý)","Trâu (Sửu)","Hổ (Dần)","Mèo (Mão)","Rồng (Thìn)","Rắn (Tỵ)","Ngựa (Ngọ)","Dê (Mùi)","Khỉ (Thân)","Gà (Dậu)","Chó (Tuất)","Lợn (Hợi)"];

// 3. Luận giải Bản Mệnh theo 5 hành — đủ 4 khía cạnh: Sự nghiệp, Tài lộc, Tình cảm, Sức khoẻ
var BAN_MENH = {
  "Kim": "Người mệnh Kim thường có ý chí sắc bén, quyết đoán, làm việc gì cũng rõ ràng dứt khoát.\n\n💼 Sự nghiệp: Hợp với công việc đòi hỏi tính kỷ luật, quyết đoán — càng khó càng phát huy được bản lĩnh.\n💰 Tài lộc: Có khả năng tích luỹ tốt nếu biết kiên định với kế hoạch tài chính đã đặt ra.\n💕 Tình cảm: Sống tình cảm nhưng ít bộc lộ, cần chủ động mở lòng hơn để người khác hiểu mình.\n🌿 Sức khoẻ: Cần chú ý hệ hô hấp, phổi — nên giữ ấm và tránh môi trường nhiều khói bụi.",
  "Mộc": "Người mệnh Mộc thường có sức sống bền bỉ, luôn hướng tới sự phát triển và vươn lên.\n\n💼 Sự nghiệp: Phù hợp với môi trường có không gian phát triển dài hạn, không hợp gò bó khuôn khổ cứng nhắc.\n💰 Tài lộc: Tài chính phát triển ổn định theo thời gian, không nên nóng vội muốn giàu nhanh.\n💕 Tình cảm: Chân thành, bền vững trong tình cảm, là chỗ dựa đáng tin cậy cho người thương yêu.\n🌿 Sức khoẻ: Cần chú ý hệ gan, mật — nên hạn chế thức khuya và giữ tinh thần thư thái.",
  "Thủy": "Người mệnh Thuỷ thường linh hoạt, thích nghi nhanh, tư duy uyển chuyển như dòng nước.\n\n💼 Sự nghiệp: Hợp với công việc cần sự linh hoạt, giao tiếp, dễ thích nghi với nhiều môi trường khác nhau.\n💰 Tài lộc: Tài vận thường đến từ nhiều nguồn khác nhau, cần biết chọn lọc để không phân tán quá mức.\n💕 Tình cảm: Nhạy cảm, giàu cảm xúc, dễ đồng cảm nhưng cũng dễ suy nghĩ nhiều.\n🌿 Sức khoẻ: Cần chú ý hệ thận, tiết niệu — nên uống đủ nước và tránh để cơ thể nhiễm lạnh.",
  "Hỏa": "Người mệnh Hoả thường nhiệt huyết, năng động, tràn đầy năng lượng trong mọi việc.\n\n💼 Sự nghiệp: Toả sáng trong môi trường năng động, cần sự thể hiện — nhưng cần kiên nhẫn hơn ở giai đoạn đầu.\n💰 Tài lộc: Kiếm tiền nhanh nhưng cũng dễ chi tiêu nhanh, nên có kế hoạch tiết kiệm rõ ràng.\n💕 Tình cảm: Nồng nhiệt, chân thành, yêu là thể hiện rõ ràng, không giấu giếm cảm xúc.\n🌿 Sức khoẻ: Cần chú ý hệ tim mạch — nên tránh căng thẳng kéo dài và cân bằng nghỉ ngơi.",
  "Thổ": "Người mệnh Thổ thường vững vàng, đáng tin cậy, là điểm tựa cho những người xung quanh.\n\n💼 Sự nghiệp: Phù hợp với công việc cần sự ổn định, tích luỹ kinh nghiệm theo thời gian để đi đường dài.\n💰 Tài lộc: Tài chính phát triển chậm nhưng chắc, phù hợp với việc tích luỹ dài hạn hơn đầu tư mạo hiểm.\n💕 Tình cảm: Chung thuỷ, đáng tin cậy, là người luôn ở bên khi người thương cần đến.\n🌿 Sức khoẻ: Cần chú ý hệ tiêu hoá, dạ dày — nên ăn uống điều độ, đúng giờ giấc."
};

// 4. Luận giải Vận Trình 2026 — dựa trên quan hệ Sinh/Khắc với mệnh năm 2026 (Bính Ngọ - Thiên Hà Thuỷ, hành Thuỷ)
var VAN_2026 = {
  "Kim": "Năm 2026 (mệnh Thuỷ) có quan hệ Kim sinh Thuỷ — năm nay bạn ở thế \"sinh xuất\", tức là cho đi nhiều hơn nhận lại, nhưng đổi lại được nâng đỡ về danh tiếng và cơ hội.\n\n💼 Sự nghiệp: Có quý nhân giúp sức, nhưng cần chủ động thể hiện năng lực thay vì chờ đợi.\n💰 Tài lộc: Có thể phải đầu tư/chi ra trước, nhưng đây là khoản đầu tư xứng đáng cho tương lai.\n💕 Tình cảm: Là người chủ động vun đắp, mối quan hệ sẽ bền chặt hơn nếu không ngại cho đi trước.\n🌿 Sức khoẻ: Đừng vì lo cho người khác mà quên chăm sóc bản thân, cần cân bằng.",
  "Mộc": "Năm 2026 (mệnh Thuỷ) có quan hệ Thuỷ sinh Mộc — năm nay bạn được \"sinh nhập\", tức là được tiếp thêm năng lượng, nguồn lực để phát triển mạnh mẽ.\n\n💼 Sự nghiệp: Năm thuận lợi để mở rộng, phát triển — có nhiều trợ lực đến từ bên ngoài.\n💰 Tài lộc: Tài chính có xu hướng tăng trưởng tốt, phù hợp để bắt đầu kế hoạch dài hạn.\n💕 Tình cảm: Được yêu thương, quan tâm nhiều hơn, các mối quan hệ có chiều hướng phát triển tích cực.\n🌿 Sức khoẻ: Năng lượng dồi dào, chỉ cần chú ý không lạm dụng sức quá mức.",
  "Thủy": "Năm 2026 (mệnh Thuỷ) cùng hành với mệnh của bạn — năm nay là năm \"tỷ hoà\", tức là cộng hưởng, nhịp điệu cuộc sống khá đồng điệu, thuận theo dòng chảy tự nhiên.\n\n💼 Sự nghiệp: Công việc diễn ra theo đúng nhịp đã quen thuộc, ổn định, không có nhiều biến động lớn.\n💰 Tài lộc: Tài chính ở mức ổn định, phù hợp để duy trì hơn là mạo hiểm thay đổi lớn.\n💕 Tình cảm: Dễ tìm được sự đồng điệu, thấu hiểu với người có cùng tần số suy nghĩ.\n🌿 Sức khoẻ: Tương đối ổn định, chỉ cần duy trì nếp sinh hoạt điều độ đã có.",
  "Hỏa": "Năm 2026 (mệnh Thuỷ) có quan hệ Thuỷ khắc Hoả — năm nay bạn ở thế bị khắc chế nhẹ, cần thêm sự cẩn trọng và kiên nhẫn hơn bình thường.\n\n💼 Sự nghiệp: Có thể gặp một vài trở ngại nhỏ, nên bình tĩnh xử lý thay vì nóng vội phản ứng.\n💰 Tài lộc: Nên hạn chế các quyết định tài chính mạo hiểm trong năm nay, ưu tiên sự an toàn.\n💕 Tình cảm: Dễ có hiểu lầm nhỏ, cần bình tĩnh trao đổi thẳng thắn để tránh xa cách.\n🌿 Sức khoẻ: Cần chú ý nhiều hơn, nghỉ ngơi đầy đủ, tránh để cơ thể quá sức.",
  "Thổ": "Năm 2026 (mệnh Thuỷ) có quan hệ Thổ khắc Thuỷ — tức là mệnh của bạn đang ở thế \"khắc xuất\", kiểm soát được tình hình nhưng cũng khá vất vả, hao tổn năng lượng.\n\n💼 Sự nghiệp: Cần nỗ lực nhiều hơn để giữ vững phong độ, nhưng hoàn toàn kiểm soát được tình hình.\n💰 Tài lộc: Kiếm được nhưng khá vất vả, nên chi tiêu có kế hoạch để không bị hao hụt.\n💕 Tình cảm: Đóng vai trò người giữ vững, cần chú ý đừng ôm đồm quá nhiều trách nhiệm một mình.\n🌿 Sức khoẻ: Dễ cảm thấy hao tổn năng lượng, nên ưu tiên nghỉ ngơi phục hồi định kỳ."
};

// 5. Tinh thần chủ đạo 3 năm tới (2026-2028) theo từng hành
var TINH_THAN_3_NAM = {
  "Kim": "Trong 3 năm tới, tinh thần chủ đạo là \"rèn giũa để sắc bén hơn\" — giống như kim loại càng mài càng sáng. Đây là giai đoạn tích luỹ kinh nghiệm và bản lĩnh, không phải lúc để nóng vội bứt phá ngay, mà là lúc củng cố nội lực để khi thời cơ đến sẽ đủ sức nắm bắt trọn vẹn.",
  "Mộc": "Trong 3 năm tới, tinh thần chủ đạo là \"vươn cao bám rễ\" — giống như cây phát triển cần cả thân vươn lên lẫn rễ cắm sâu. Đây là giai đoạn phù hợp để vừa phát triển ra bên ngoài, vừa củng cố nền tảng bên trong, tạo sự phát triển bền vững lâu dài chứ không chỉ nhất thời.",
  "Thủy": "Trong 3 năm tới, tinh thần chủ đạo là \"linh hoạt thích nghi\" — giống như nước luôn tìm được đường chảy phù hợp dù gặp địa hình nào. Đây là giai đoạn nên giữ tâm thế cởi mở, sẵn sàng điều chỉnh theo hoàn cảnh thay vì cố chấp theo 1 hướng duy nhất, sự linh hoạt sẽ là chìa khoá thành công.",
  "Hỏa": "Trong 3 năm tới, tinh thần chủ đạo là \"cháy bền thay vì cháy nhanh\" — giống như ngọn lửa cần biết tiết chế để duy trì lâu dài. Đây là giai đoạn nên học cách phân bổ năng lượng hợp lý, tránh dồn hết vào 1 giai đoạn ngắn rồi kiệt sức, mà nên giữ nhịp đều đặn để đi được đường dài.",
  "Thổ": "Trong 3 năm tới, tinh thần chủ đạo là \"tích luỹ bồi đắp\" — giống như đất cần thời gian để bồi đắp thành nền vững chắc. Đây là giai đoạn phù hợp để kiên nhẫn xây dựng nền tảng dài hạn, không nóng vội mong thấy kết quả ngay, thành quả bền vững nhất thường đến từ sự tích luỹ đều đặn theo thời gian."
};

// Hàm tính toán
function tinhNapAm(namSinh) {
  var idx = (((namSinh - 4) % 60) + 60) % 60;
  var napAmIdx = Math.floor(idx / 2);
  return NAP_AM_LIST[napAmIdx];
}

function tinhConGiap(namSinh) {
  var idx = (((namSinh - 4) % 12) + 12) % 12;
  return CON_GIAP_LIST[idx];
}
