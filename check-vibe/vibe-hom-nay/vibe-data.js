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
  },
  "Lập Thu": {
    "Bạch Dương": { vutru: "Lập Thu — mùa Thu bắt đầu, Kim khí dần lên thay Hoả. Bạch Dương vốn xông xáo, hôm nay là lúc chuyển nhịp, không còn dồn hết ga như mùa hè.", chill: "Hạ nhiệt xíu cũng ổn á, không cần lúc nào cũng full tốc độ, mùa này hợp để vừa chạy vừa ngắm cảnh!" },
    "Kim Ngưu": { vutru: "Lập Thu — mùa Thu bắt đầu, Kim khí dần lên. Kim Ngưu vốn ưa ổn định, đây là giai đoạn thuận lợi để củng cố những gì đã xây dựng.", chill: "Nền tảng xây bao lâu nay giờ là lúc gia cố thêm cho chắc, đừng vội mở rộng gì lớn nha!" },
    "Song Tử": { vutru: "Lập Thu — mùa Thu bắt đầu, Kim khí dần lên. Song Tử vốn thích cái mới, mùa chuyển giao này mang đến nhiều chủ đề thú vị để khám phá.", chill: "Đầu óc lại có cớ để lượn sang chuyện mới rồi đó, cứ tò mò khám phá thoải mái nha!" },
    "Cự Giải": { vutru: "Lập Thu — mùa Thu bắt đầu, Kim khí dần lên thay Hoả. Cự Giải vốn nhạy cảm với thời tiết, dễ cảm nhận được sự dịu lại trong không khí.", chill: "Cảm giác dịu dàng hơn đang tới đó, tận hưởng khoảnh khắc chill này thay vì lo nghĩ nhiều nha!" },
    "Sư Tử": { vutru: "Lập Thu — mùa Thu bắt đầu, Hoả khí Sư Tử vẫn còn dư âm mạnh mẽ dù mùa đã chuyển. Đây là lúc toả sáng theo cách điềm tĩnh hơn.", chill: "Vẫn rực rỡ nhưng theo kiểu chill hơn xíu, không cần gồng hết cỡ như hè nữa, để dành sức bền!" },
    "Xử Nữ": { vutru: "Lập Thu — mùa Thu bắt đầu, đúng vào mùa của Xử Nữ. Đây là giai đoạn tinh thần và năng lượng của bạn hài hoà nhất trong năm.", chill: "Đây là sân nhà của em đó! Việc gì cần sự chỉn chu, tỉ mỉ thì làm ngay mùa này, đúng thời điểm vàng!" },
    "Thiên Bình": { vutru: "Lập Thu — mùa Thu bắt đầu, Kim khí dần lên. Thiên Bình vốn hợp sự cân bằng, mùa Thu mát mẻ rất thuận cho những quyết định quan trọng.", chill: "Đầu óc tỉnh táo hơn khi trời mát, quyết định gì khó thì để dành mùa này giải quyết nha!" },
    "Bọ Cạp": { vutru: "Lập Thu — mùa Thu bắt đầu, Kim khí dần lên. Bọ Cạp vốn sâu sắc, mùa chuyển giao khiến trực giác trở nên nhạy bén hơn.", chill: "Linh cảm đang bén hơn đó, tin vào cảm nhận của mình nhiều hơn trong giai đoạn này nha!" },
    "Nhân Mã": { vutru: "Lập Thu — mùa Thu bắt đầu, Kim khí dần lên thay Hoả. Nhân Mã vốn ưa tự do, đây là lúc thích hợp để lên kế hoạch cho hành trình mới.", chill: "Mùa hè rong chơi đã đủ rồi, giờ là lúc vẽ ra kế hoạch phiêu lưu tiếp theo cho mùa tới đó!" },
    "Ma Kết": { vutru: "Lập Thu — mùa Thu bắt đầu, Kim khí dần lên. Ma Kết vốn kiên trì, mùa Thu mát mẻ là điều kiện lý tưởng để tăng tốc công việc.", chill: "Trời mát là lúc năng suất tăng vọt đó, tranh thủ đẩy nhanh việc đang dang dở nha!" },
    "Bảo Bình": { vutru: "Lập Thu — mùa Thu bắt đầu, Kim khí dần lên. Bảo Bình vốn sáng tạo, mùa chuyển giao mang tới nhiều góc nhìn mới lạ.", chill: "Ý tưởng độc lạ đang lượn lờ quanh em đó, ghi lại liền kẻo bay mất nha!" },
    "Song Ngư": { vutru: "Lập Thu — mùa Thu bắt đầu, Kim khí dần lên thay Hoả. Song Ngư vốn mộng mơ, không khí mùa Thu mang lại cảm hứng sáng tác dồi dào.", chill: "Cảm hứng đang dâng trào đó, có viết lách hay sáng tạo gì thì tranh thủ làm ngay đi!" }
  },
  "Xử Thử": {
    "Bạch Dương": { vutru: "Xử Thử — nắng nóng bắt đầu lui, Hoả nhường chỗ cho Kim. Bạch Dương vốn nóng vội, đây là lúc học cách chậm lại một nhịp.", chill: "Không cần lúc nào cũng lao lên trước đâu, chậm lại xíu để nhìn rõ đường đi tiếp theo nha!" },
    "Kim Ngưu": { vutru: "Xử Thử — nắng nóng bắt đầu lui, Hoả nhường Kim. Kim Ngưu vốn thích sự chắc chắn, đây là giai đoạn thuận lợi để thu hoạch thành quả.", chill: "Công sức bỏ ra bao lâu nay giờ là lúc hái quả rồi đó, tận hưởng thành quả xứng đáng nha!" },
    "Song Tử": { vutru: "Xử Thử — nắng nóng bắt đầu lui, Hoả nhường Kim. Song Tử vốn linh hoạt, hôm nay đúng lúc chuyển hướng một việc đang làm dở.", chill: "Việc đang làm mà thấy sai sai thì đổi hướng liền, không phải bỏ mà là làm mới lại cho hợp!" },
    "Cự Giải": { vutru: "Xử Thử — nắng nóng bắt đầu lui, Hoả nhường Kim. Cự Giải vốn nhạy cảm, dễ cảm nhận được sự nhẹ nhõm khi tiết trời dịu lại.", chill: "Cảm giác nhẹ nhõm đang tới rồi đó, hít thở sâu và tận hưởng khoảnh khắc bình yên này nha!" },
    "Sư Tử": { vutru: "Xử Thử — nắng nóng bắt đầu lui, Hoả nhường chỗ cho Kim — đúng lúc năng lượng Sư Tử cũng dịu bớt sau mùa hè rực rỡ.", chill: "Xả hơi 1 chút cũng không sao đâu, em đã toả sáng đủ nhiều rồi, giờ là lúc nghỉ ngơi xứng đáng!" },
    "Xử Nữ": { vutru: "Xử Thử — nắng nóng bắt đầu lui, đúng vào mùa của Xử Nữ. Sự tỉ mỉ và chỉn chu của bạn đang phát huy tối đa trong giai đoạn này.", chill: "Đúng mùa của em rồi đó, mọi chi tiết em để ý đều đang chứng minh giá trị, tự tin lên!" },
    "Thiên Bình": { vutru: "Xử Thử — nắng nóng bắt đầu lui, Hoả nhường Kim. Thiên Bình vốn hợp sự hài hoà, tiết trời dịu lại giúp tâm trạng cân bằng hơn.", chill: "Tâm trạng đang ổn định lại rồi đó, đây là lúc tốt để đưa ra những quyết định quan trọng!" },
    "Bọ Cạp": { vutru: "Xử Thử — nắng nóng bắt đầu lui, Hoả nhường Kim. Bọ Cạp vốn mãnh liệt, giai đoạn này giúp cảm xúc lắng lại, nhìn mọi việc rõ ràng hơn.", chill: "Đầu óc đang bớt rối hơn rồi đó, nhìn lại mọi chuyện với con mắt tỉnh táo hơn nha!" },
    "Nhân Mã": { vutru: "Xử Thử — nắng nóng bắt đầu lui, Hoả nhường Kim. Nhân Mã vốn phóng khoáng, đây là lúc thích hợp để tổng kết chuyến phiêu lưu vừa qua.", chill: "Mùa hè rong chơi sắp khép lại rồi, ngồi lại tổng kết những gì đã học được cũng hay đó!" },
    "Ma Kết": { vutru: "Xử Thử — nắng nóng bắt đầu lui, Hoả nhường Kim. Ma Kết vốn kiên trì, thành quả từ những nỗ lực trước đó bắt đầu rõ nét hơn.", chill: "Cố gắng bao lâu nay đang dần hiện rõ kết quả rồi đó, ráng thêm chút nữa là trọn vẹn!" },
    "Bảo Bình": { vutru: "Xử Thử — nắng nóng bắt đầu lui, Hoả nhường Kim. Bảo Bình vốn khác biệt, giai đoạn giao mùa này giúp ý tưởng trở nên rõ ràng, khả thi hơn.", chill: "Ý tưởng lạ lúc trước giờ bắt đầu thành hình rõ hơn rồi đó, thử biến nó thành hành động xem sao!" },
    "Song Ngư": { vutru: "Xử Thử — nắng nóng bắt đầu lui, Hoả nhường Kim. Song Ngư vốn mơ mộng, tiết trời dịu lại giúp tâm hồn nhẹ nhàng, thư thái hơn.", chill: "Tâm hồn đang được xoa dịu đó, dành thời gian làm điều mình thích để nạp lại năng lượng nha!" }
  },
  "Bạch Lộ": {
    "Bạch Dương": { vutru: "Bạch Lộ — sương trắng bắt đầu đọng, tiết trời chuyển lạnh nhẹ, hành Kim vừa vào mùa. Bạch Dương vốn nóng vội, đây là lúc cần thêm sự thận trọng.", chill: "Trước khi lao vào việc gì thì dừng lại suy nghĩ thêm chút xíu, không mất gì đâu mà chắc ăn hơn nhiều!" },
    "Kim Ngưu": { vutru: "Bạch Lộ — sương trắng bắt đầu đọng, hành Kim vừa vào mùa. Kim Ngưu vốn ổn định, đây là giai đoạn thuận lợi để bắt đầu một kế hoạch dài hơi mới.", chill: "Đất lành đã sẵn sàng rồi đó, có dự định gì ấp ủ lâu thì đây là lúc gieo hạt cho nó!" },
    "Song Tử": { vutru: "Bạch Lộ — sương trắng bắt đầu đọng, hành Kim vừa vào mùa. Song Tử vốn nhanh nhạy, dễ đón nhận những thông tin, cơ hội mới trong giai đoạn này.", chill: "Có tin gì hay ho sắp tới đó, để ý email/tin nhắn nhiều hơn 1 chút nha!" },
    "Cự Giải": { vutru: "Bạch Lộ — sương trắng bắt đầu đọng, tiết trời chuyển lạnh nhẹ. Cự Giải vốn nhạy cảm với thời tiết, cần chú ý giữ ấm cả cơ thể lẫn tâm trạng.", chill: "Trời se lạnh rồi đó, khoác thêm áo và giữ ấm trái tim bằng những điều mình yêu thích nha!" },
    "Sư Tử": { vutru: "Bạch Lộ — sương trắng bắt đầu đọng, hành Kim vừa vào mùa, thay cho Hoả của Sư Tử. Đây là lúc toả sáng theo cách tinh tế, không cần phô trương.", chill: "Không cần hoành tráng mới là toả sáng đâu, đôi khi nhẹ nhàng lại ghi điểm nhiều hơn đó!" },
    "Xử Nữ": { vutru: "Bạch Lộ — sương trắng bắt đầu đọng, vẫn còn dư âm mùa của Xử Nữ. Sự chỉn chu tiếp tục mang lại kết quả tốt trong giai đoạn này.", chill: "Phong độ ổn định của em vẫn đang phát huy tốt đó, cứ giữ vững phong cách quen thuộc nha!" },
    "Thiên Bình": { vutru: "Bạch Lộ — sương trắng bắt đầu đọng, tiết trời chuyển lạnh nhẹ, hành Kim vừa vào mùa. Hợp phong cách cân bằng, tinh tế của Thiên Bình.", chill: "Đây là lúc để cân nhắc kỹ trước khi quyết, không cần vội, đáp án đúng đang tới gần rồi!" },
    "Bọ Cạp": { vutru: "Bạch Lộ — sương trắng bắt đầu đọng, hành Kim vừa vào mùa. Bọ Cạp vốn bí ẩn, sương mù giăng nhẹ khiến trực giác trở nên nhạy bén hơn.", chill: "Giác quan thứ 6 đang hoạt động mạnh đó, tin vào cảm nhận của mình trong giai đoạn này nha!" },
    "Nhân Mã": { vutru: "Bạch Lộ — sương trắng bắt đầu đọng, hành Kim vừa vào mùa. Nhân Mã vốn phóng khoáng, đây là lúc thích hợp để lên kế hoạch cho chuyến đi mới.", chill: "Trời mát mẻ đúng kiểu hợp để xách balo lên và đi đó, có kèo gì hay thì thử ngay đi!" },
    "Ma Kết": { vutru: "Bạch Lộ — sương trắng bắt đầu đọng, hành Kim vừa vào mùa. Ma Kết vốn kiên trì, tiết trời mát mẻ là điều kiện tốt để tăng tốc mục tiêu dài hạn.", chill: "Năng suất đang lên cao đó, tranh thủ đẩy nhanh mục tiêu dài hạn trong giai đoạn này nha!" },
    "Bảo Bình": { vutru: "Bạch Lộ — sương trắng bắt đầu đọng, hành Kim vừa vào mùa. Bảo Bình vốn sáng tạo, không khí mát mẻ giúp đầu óc minh mẫn, nhiều ý tưởng hơn.", chill: "Đầu óc đang tỉnh táo hết cỡ đó, có ý tưởng gì thì ghi lại ngay kẻo quên!" },
    "Song Ngư": { vutru: "Bạch Lộ — sương trắng bắt đầu đọng, tiết trời chuyển lạnh nhẹ, hành Kim vừa vào mùa. Song Ngư vốn mộng mơ, cần chú ý giữ sức khoẻ khi trời chuyển mùa.", chill: "Đổi mùa dễ mệt người đó, ngủ đủ giấc và ăn uống đầy đủ để giữ vibe tốt nha!" }
  },
  "Thu Phân": {
    "Bạch Dương": { vutru: "Thu Phân — ngày đêm bằng nhau, hành Kim cực vượng. Bạch Dương vốn xông xáo, hôm nay cần học cách chia đều sức lực thay vì dồn hết vào 1 việc.", chill: "Đừng dốc hết sức cho 1 thứ thôi, chia đều ra vài việc là hiệu quả hơn nhiều đó!" },
    "Kim Ngưu": { vutru: "Thu Phân — ngày đêm bằng nhau, hành Kim cực vượng. Kim Ngưu vốn thích sự cân bằng, đây là giai đoạn thuận lợi nhất trong năm cho Kim Ngưu.", chill: "Đúng sóng của em rồi đó, việc gì quan trọng thì làm ngay giai đoạn này, tỉ lệ thành công cao lắm!" },
    "Song Tử": { vutru: "Thu Phân — ngày đêm bằng nhau, hành Kim cực vượng. Song Tử vốn thích khám phá, sự cân bằng của tiết trời giúp đầu óc sáng suốt hơn để chọn lọc thông tin.", chill: "Đọc nhiều thứ cùng lúc thì hôm nay dễ chọn lọc cái nào đáng tin, cái nào bỏ qua đó!" },
    "Cự Giải": { vutru: "Thu Phân — ngày đêm bằng nhau, hành Kim cực vượng. Cự Giải vốn nhạy cảm, sự cân bằng ngày đêm giúp tâm trạng ổn định hơn hẳn.", chill: "Tâm trạng đang ở trạng thái cân bằng đẹp nhất rồi đó, tranh thủ mà quyết định mấy chuyện quan trọng!" },
    "Sư Tử": { vutru: "Thu Phân — ngày đêm bằng nhau, hành Kim cực vượng thay Hoả. Sư Tử vốn rực rỡ, giai đoạn này hợp để toả sáng theo cách điềm tĩnh, có chiều sâu.", chill: "Không cần ồn ào mới nổi bật, im lặng làm tốt việc của mình cũng đủ khiến người ta chú ý rồi!" },
    "Xử Nữ": { vutru: "Thu Phân — ngày đêm bằng nhau, hành Kim vượng. Xử Nữ vốn hợp sự cân bằng, tỉ mỉ — hôm nay hợp để dọn dẹp lại 1 mối quan hệ hay dự án đang rối.", chill: "Não em đang ở chế độ dọn dẹp đó ✨ Cái gì rối thì sắp lại cho gọn, không phải để bỏ mà để đẹp hơn!" },
    "Thiên Bình": { vutru: "Thu Phân — ngày đêm bằng nhau, đúng vào mùa của Thiên Bình. Đây là giai đoạn năng lượng và tinh thần hài hoà nhất trong năm.", chill: "Đây là sân nhà của em đó! Quyết định gì khó thì để dành giai đoạn này, đầu óc đang cực kỳ tỉnh táo!" },
    "Bọ Cạp": { vutru: "Thu Phân — ngày đêm bằng nhau, hành Kim cực vượng. Bọ Cạp vốn sâu sắc, sự cân bằng của tiết trời giúp nhìn thấu vấn đề rõ ràng hơn.", chill: "Mắt nhìn người của em đang cực chuẩn giai đoạn này đó, tin vào phán đoán của mình nha!" },
    "Nhân Mã": { vutru: "Thu Phân — ngày đêm bằng nhau, hành Kim cực vượng. Nhân Mã vốn phóng khoáng, đây là lúc cân bằng giữa tự do và trách nhiệm.", chill: "Vừa chơi vừa làm vẫn được mà, không cần chọn 1 trong 2, cân bằng cả 2 là đỉnh nhất!" },
    "Ma Kết": { vutru: "Thu Phân — ngày đêm bằng nhau, hành Kim cực vượng. Ma Kết vốn kiên trì, đây là giai đoạn công sức bỏ ra và kết quả nhận lại cân xứng nhất.", chill: "Làm bao nhiêu ăn bấy nhiêu đúng nghĩa giai đoạn này đó, cứ chăm chỉ là có quả ngọt liền!" },
    "Bảo Bình": { vutru: "Thu Phân — ngày đêm bằng nhau, hành Kim cực vượng. Bảo Bình vốn khác biệt, sự cân bằng giúp ý tưởng táo bạo trở nên khả thi, dễ thực hiện hơn.", chill: "Ý tưởng điên điên của em giờ có thể biến thành thật rồi đó, thử làm xem sao!" },
    "Song Ngư": { vutru: "Thu Phân — ngày đêm bằng nhau, hành Kim cực vượng. Song Ngư vốn mơ mộng, sự cân bằng giúp giấc mơ và thực tế xích lại gần nhau hơn.", chill: "Ước mơ ấp ủ lâu nay đang có cơ hội thành hiện thực đó, bắt tay làm 1 bước nhỏ thử xem!" }
  },
  "Hàn Lộ": {
    "Bạch Dương": { vutru: "Hàn Lộ — sương bắt đầu lạnh, khí trời se sắt hơn. Bạch Dương vốn nóng vội, đây là lúc cần thêm lớp áo thận trọng trước khi hành động.", chill: "Nhiệt huyết vẫn giữ nguyên nhưng thêm chút cẩn thận nữa là an toàn hơn nhiều đó!" },
    "Kim Ngưu": { vutru: "Hàn Lộ — sương bắt đầu lạnh, hành Kim vẫn đang vượng. Kim Ngưu vốn ổn định, đây là lúc củng cố thêm cho những kế hoạch đã có.", chill: "Nền tảng đang vững rồi đó, giờ chỉ cần thêm 1 lớp bảo vệ nữa là chắc chắn tuyệt đối!" },
    "Song Tử": { vutru: "Hàn Lộ — sương bắt đầu lạnh, khí trời se sắt. Song Tử vốn linh hoạt, tiết trời lạnh dần là lời nhắc để chậm lại và quan sát kỹ hơn.", chill: "Chạy nhanh hoài cũng mệt, hôm nay chậm lại 1 nhịp để nhìn rõ mọi thứ xung quanh nha!" },
    "Cự Giải": { vutru: "Hàn Lộ — sương bắt đầu lạnh, cần chú ý giữ ấm. Cự Giải vốn nhạy cảm với thời tiết, dễ cảm thấy cần được che chở hơn trong giai đoạn này.", chill: "Trời lạnh là lúc thích hợp để quây quần với người thân yêu, tìm chút ấm áp bên cạnh nhau nha!" },
    "Sư Tử": { vutru: "Hàn Lộ — sương bắt đầu lạnh, hành Kim vượng thay Hoả. Sư Tử vốn rực rỡ, giai đoạn này hợp để giữ lửa bên trong hơn là phô ra bên ngoài.", chill: "Lửa vẫn cháy nhưng cháy âm ỉ bên trong thôi, không cần phô trương ra ngoài lúc này đâu!" },
    "Xử Nữ": { vutru: "Hàn Lộ — sương bắt đầu lạnh, khí trời se sắt. Xử Nữ vốn chỉn chu, đây là lúc rà soát lại các kế hoạch trước khi bước sang giai đoạn cuối năm.", chill: "Sắp cuối năm rồi đó, rà lại 1 lượt kế hoạch xem còn thiếu gì không nha!" },
    "Thiên Bình": { vutru: "Hàn Lộ — sương bắt đầu lạnh, hành Kim vẫn vượng nhưng đang dần nhường Thuỷ. Thiên Bình vốn cân bằng, cần chú ý điều chỉnh nhịp sống theo mùa.", chill: "Nhịp sống hè-thu giờ chuyển dần sang nhịp thu-đông rồi đó, điều chỉnh lại lịch sinh hoạt cho hợp nha!" },
    "Bọ Cạp": { vutru: "Hàn Lộ — sương bắt đầu lạnh, đang dần vào mùa của Bọ Cạp. Trực giác và chiều sâu cảm xúc của bạn bắt đầu mạnh mẽ hơn.", chill: "Sắp vào mùa của em rồi đó, cảm nhận của em giai đoạn này sẽ chuẩn hơn hẳn, tin tưởng vào nó nha!" },
    "Nhân Mã": { vutru: "Hàn Lộ — sương bắt đầu lạnh, khí trời se sắt. Nhân Mã vốn ưa xê dịch, đây là lúc thu xếp lại hành trang trước khi mùa đông tới.", chill: "Chuyến đi hè-thu sắp khép lại rồi, dọn dẹp hành trang và chuẩn bị cho kế hoạch mùa tới nha!" },
    "Ma Kết": { vutru: "Hàn Lộ — sương bắt đầu lạnh, hành Kim dần nhường Thuỷ — báo hiệu mùa của Ma Kết đang tới gần.", chill: "Mùa của em sắp tới rồi đó, giữ vững phong độ, sắp là lúc toả sáng thật sự!" },
    "Bảo Bình": { vutru: "Hàn Lộ — sương bắt đầu lạnh, khí trời se sắt. Bảo Bình vốn thích sự mới lạ, tiết trời lạnh dần lại kích thích tư duy sáng tạo hơn.", chill: "Trời lạnh mà đầu lại nóng ran ý tưởng đó, tranh thủ brainstorm 1 mớ ý hay ho đi!" },
    "Song Ngư": { vutru: "Hàn Lộ — sương bắt đầu lạnh, cần chú ý sức khoẻ. Song Ngư vốn dễ xúc động, thời tiết chuyển lạnh có thể ảnh hưởng tới tâm trạng.", chill: "Trời lạnh dễ buồn vu vơ đó, mặc ấm và nghe playlist yêu thích để giữ mood tốt nha!" }
  },
  "Sương Giáng": {
    "Bạch Dương": { vutru: "Sương Giáng — sương lạnh phủ khắp, Kim khí dần lui để Thuỷ lên. Bạch Dương vốn nóng vội, đây là lúc học cách kiên nhẫn chờ đúng thời điểm.", chill: "Không phải lúc nào cũng cần xông lên trước đâu, đôi khi chờ đúng lúc lại thắng lớn hơn!" },
    "Kim Ngưu": { vutru: "Sương Giáng — sương lạnh phủ khắp. Kim Ngưu vốn bền bỉ, đây là giai đoạn thu hoạch những gì đã gieo trồng từ đầu năm.", chill: "Cả năm cày cuốc giờ là lúc gặt hái rồi đó, tự thưởng cho bản thân 1 chút xứng đáng nha!" },
    "Song Tử": { vutru: "Sương Giáng — sương lạnh phủ khắp, Kim khí dần lui. Song Tử vốn nhanh nhạy, đây là lúc tổng kết lại những gì đã học được trong năm.", chill: "Cả năm học hỏi bao nhiêu thứ hay ho, giờ ngồi lại tổng kết xem mình đã lớn cỡ nào nha!" },
    "Cự Giải": { vutru: "Sương Giáng — sương lạnh phủ khắp, cần giữ ấm kỹ hơn. Cự Giải vốn nhạy cảm, đây là lúc ưu tiên chăm sóc bản thân và gia đình.", chill: "Lạnh rồi đó, ưu tiên chăm sóc bản thân và người thân yêu trong giai đoạn này nha!" },
    "Sư Tử": { vutru: "Sương Giáng — sương lạnh phủ khắp, Kim khí dần lui để Thuỷ lên. Sư Tử vốn rực rỡ, đây là lúc nghỉ ngơi để dưỡng sức cho những dự định lớn sắp tới.", chill: "Nghỉ ngơi không có nghĩa là dừng lại đâu, đây là lúc sạc pin cho màn trình diễn tiếp theo!" },
    "Xử Nữ": { vutru: "Sương Giáng — sương lạnh phủ khắp. Xử Nữ vốn chỉn chu, đây là lúc hoàn thiện những chi tiết cuối cùng trước khi bước sang giai đoạn mới.", chill: "Sắp về đích rồi đó, chăm chút nốt vài chi tiết cuối để mọi thứ hoàn hảo nha!" },
    "Thiên Bình": { vutru: "Sương Giáng — sương lạnh phủ khắp, Kim khí dần lui. Thiên Bình vốn cân bằng, đây là lúc nhìn lại và cân đối lại các mối quan hệ quan trọng.", chill: "Cuối năm là lúc nhìn lại xem ai đáng để giữ gần, ai nên buông bớt cho nhẹ lòng nha!" },
    "Bọ Cạp": { vutru: "Sương Giáng — sương lạnh phủ khắp, Kim khí dần lui để Thuỷ lên — đúng vào mùa của Bọ Cạp. Trực giác và chiều sâu đang ở đỉnh điểm.", chill: "Đúng mùa của em rồi đó! Có chuyện gì giấu kín lâu rồi thì đây là lúc phù hợp để lộ diện!" },
    "Nhân Mã": { vutru: "Sương Giáng — sương lạnh phủ khắp. Nhân Mã vốn ưa tự do, đây là lúc thích hợp để lên kế hoạch cho những chuyến đi năm sau.", chill: "Năm nay sắp khép lại rồi, bắt đầu mơ mộng về chuyến phiêu lưu tiếp theo của năm sau đi!" },
    "Ma Kết": { vutru: "Sương Giáng — sương lạnh phủ khắp, Kim khí dần lui để Thuỷ lên — báo hiệu mùa của Ma Kết sắp bắt đầu.", chill: "Sắp tới mùa của em rồi đó, chuẩn bị sẵn sàng để toả sáng trong giai đoạn tới nha!" },
    "Bảo Bình": { vutru: "Sương Giáng — sương lạnh phủ khắp, Kim khí dần lui. Bảo Bình vốn khác biệt, đây là lúc chắt lọc lại những ý tưởng hay nhất trong năm.", chill: "Cả năm nghĩ ra bao nhiêu ý tưởng, giờ chọn lọc ra vài cái hay nhất để dồn sức làm nha!" },
    "Song Ngư": { vutru: "Sương Giáng — sương lạnh phủ khắp, cần giữ sức khoẻ. Song Ngư vốn mơ mộng, đây là lúc thích hợp để nghỉ ngơi và chăm sóc tâm hồn.", chill: "Cho phép bản thân nghỉ ngơi nhiều hơn 1 chút nha, tâm hồn cũng cần được chăm sóc như cơ thể vậy!" }
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
