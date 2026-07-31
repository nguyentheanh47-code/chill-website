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
