# MY COLLECTION

Website tuyển chọn sản phẩm thời trang, phụ kiện và phong cách sống, có liên kết tiếp thị liên kết.

## Công nghệ
- Next.js 14 + TypeScript
- Tailwind CSS
- Supabase Auth + Postgres
- Vercel (triển khai)

## Chạy dự án trên máy
1. Cài Node.js phiên bản LTS.
2. Tải mã nguồn: `git clone https://github.com/trantrunghieu090905-commits/my-collection.git`
3. Cài thư viện: `npm install`
4. Sao chép `.env.example` thành `.env.local`, rồi điền URL và anon/publishable key của Supabase.
5. Chạy `npm run dev` và mở `http://localhost:3000`.

## Thiết lập Supabase và tài khoản quản trị
1. Tạo project tại https://supabase.com.
2. Mở SQL Editor và chạy toàn bộ nội dung `supabase/schema.sql`.
3. Trong Authentication > Users, tạo user quản trị bằng email và mật khẩu. Nên tắt public sign-ups trong Authentication settings.
4. Sao chép UUID của user vừa tạo.
5. Trong SQL Editor chạy: `insert into public.admins (user_id) values ('UUID_CUA_ADMIN');`.
6. Điền Project URL và anon/publishable key vào `.env.local`.
7. Mở `/admin` để đăng nhập và quản lý sản phẩm.

## Quản lý sản phẩm
Trang `/admin` hỗ trợ thêm, sửa, xóa sản phẩm; lưu danh mục, giá, giá gốc, ảnh, mô tả, nền tảng, liên kết affiliate, trạng thái hiển thị và đánh dấu nổi bật. Các sản phẩm đang hiển thị trong Supabase sẽ được tải lên trang chủ; nút xem sản phẩm mở liên kết affiliate ở tab mới.

## Bảo mật
- Chỉ tài khoản có UUID trong bảng `admins` mới được thêm, sửa, xóa hoặc xem sản phẩm ẩn.
- Khách truy cập chỉ đọc được sản phẩm đang hiển thị.
- Không đưa Supabase service-role key vào trình duyệt hoặc commit lên GitHub.
- Dùng URL ảnh công khai ở giai đoạn đầu; có thể tích hợp Supabase Storage sau.

## Lưu ý về giá
Giá hiện tại do quản trị viên nhập. Tự động đồng bộ giá từ Shopee/TikTok Shop chỉ triển khai khi có API/feed hợp lệ và được cấp quyền phù hợp; không lấy giá bằng cách giả lập hoặc scraping trái điều khoản.
