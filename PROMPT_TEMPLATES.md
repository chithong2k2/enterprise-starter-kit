# 💬 PROMPT_TEMPLATES.md — Mẫu Câu Lệnh Copy-Paste Cho AI

Khi bạn nhận một dự án mới của khách hàng, chỉ cần copy một trong các mẫu prompt dưới đây và dán cho AI (kèm theo yêu cầu cụ thể của khách):

---

## 📋 Mẫu 1: Đổi sang phong cách Ngành Y Tế / Nha Khoa / Thẩm Mỹ

```text
Tôi vừa clone dự án cho khách hàng mới là "Phòng Khám Nha Khoa SmileCare". Hãy giúp tôi:
1. Đọc file AGENTS.md và tuân thủ nguyên tắc thiết kế (TUYỆT ĐỐI KHÔNG DÙNG GRADIENT).
2. Đổi tông màu thương hiệu sang "emerald" (Xanh lá / Mint y tế) trong data/db.json.
3. Bổ sung entity "doctors" vào lib/db.ts và data/db.json gồm các trường: id, name, title, experience, specialty.
4. Thêm trang quản lý Bác sĩ trong app/admin/doctors/page.tsx và gắn link vào Sidebar admin.
5. Hiển thị khối "Đội Ngũ Bác Sĩ Chuyên Gia" ra ngoài trang chủ app/page.tsx.
6. Chạy npm run build để đảm bảo 0 lỗi.
```

---

## 📋 Mẫu 2: Đổi sang phong cách Ngành Bất Động Sản / Dự Án Nghỉ Dưỡng

```text
Khách hàng của tôi là "Bất Động Sản Địa Ốc Hưng Thịnh". Hãy giúp tôi:
1. Đọc AGENTS.md, giữ thiết kế Solid/Flat sắc nét (KHÔNG DÙNG GRADIENT).
2. Đổi tông màu thương hiệu sang "slate" (Đen / Xám sang trọng monochrome) hoặc "amber" (Vàng kim cao cấp).
3. Thêm entity "properties" (Dự án BĐS) vào lib/db.ts: title, location, priceRange, bedrooms, area, status (Đang mở bán / Sắp ra mắt).
4. Tạo trang quản lý dự án BĐS tại app/admin/properties/page.tsx.
5. Cập nhật trang chủ để hiển thị danh sách các Dự Án Đang Mở Bán kèm bộ lọc trạng thái.
6. Chạy npm run build kiểm tra trước khi hoàn tất.
```

---

## 📋 Mẫu 3: Khách hàng đưa một trang web mẫu kêu làm giao diện na ná

```text
Khách hàng muốn làm giao diện có bố cục tương tự trang web mẫu này:
- Hero banner: Chia làm 2 cột, bên trái là tiêu đề to, bên phải là form đăng ký nhanh.
- Dịch vụ: Trình bày dạng Bento Grid ô to nhỏ so le.
- Bảng giá: Hiển thị 3 cột gói Basic, Pro, Enterprise.
Hãy:
1. Xem các blocks có sẵn trong components/blocks/ và sử dụng chúng để tái cấu trúc lại app/page.tsx.
2. TUYỆT ĐỐI KHÔNG DÙNG GRADIENT, sử dụng màu đơn sắc và border sắc nét theo AGENTS.md.
3. Đảm bảo form liên hệ vẫn lưu dữ liệu vào hệ thống CMS Leads.
4. Chạy npm run build để kiểm tra.
```
