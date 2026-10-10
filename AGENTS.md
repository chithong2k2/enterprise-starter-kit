# 🤖 AGENTS.md — Quy Chuẩn Dành Cho AI Khi Tùy Biến Dự Án Khách Hàng

Tài liệu này là "luật chơi" bắt buộc cho mọi AI Agent (Claude, Gemini, GPT) khi nhận nhiệm vụ tùy biến repo này cho một khách hàng mới.

---

## 1. Nguyên Tắc Thiết Kế Cốt Lõi (Design Principles)
* **TUYỆT ĐỐI KHÔNG DÙNG GRADIENT:** Không dùng `bg-gradient-to-...`. Sử dụng màu đơn sắc (solid colors), đường viền sắc nét (`border border-slate-200/300`), độ tương phản cao, typography đậm chất doanh nghiệp (B2B corporate/clean flat).
* **SOLID & CLEAN:** Sử dụng các tông màu chuẩn trong `lib/theme.ts` (`bg-blue-600`, `bg-emerald-600`, `bg-slate-900`, etc.).
* **REGISTRY LOOKUP:** Tra cứu các khối có sẵn trong `components/blocks/registry.ts` trước khi tự viết mới.

---

## 2. Quy Trình 3 Bước Khi Tùy Biến Theo Yêu Cầu Khách

### Bước 1: Cập Nhật Dữ Liệu & Entity (`data/db.json` & `lib/db.ts`)
* Cập nhật thông tin công ty trong `settings` (tên, hotline, email, địa chỉ, màu sắc).
* Nếu khách thuộc ngành mới (Nha khoa, BĐS, Cơ khí...): Nạp dữ liệu tương ứng vào các mục `services`, `team`, `testimonials`, `faq` trong `data/db.json`.

### Bước 2: Bố Cục Trang Chủ (`data/db.json` -> `pageConfig`)
* Thay đổi `headerVariant`: `'topbar'` | `'classic'` | `'floating'`.
* Thay đổi `footerVariant`: `'corporate'` | `'minimal'`.
* Điều chỉnh danh sách `sections`: Bật/Tắt (`enabled: true/false`), đổi thứ tự, hoặc đổi `variant` của Hero (`'split'` | `'centered'` | `'form'`).

### Bước 3: Kiểm Tra Bắt Buộc Trước Khi Hoàn Thành
Chạy lệnh xác thực không có lỗi TypeScript hay prerender:
```bash
npm run build
```
Mã thoát phải là 0 (`exit code 0`).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
