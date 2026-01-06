## Ở phần Next.js Cơ bản

Cách login

1. Client component gọi api login đến Server Backend để nhận về token
2. Client lấy token này để gọi tiếp 1 API là `/auth` đến Next.js Server để Next.js Server lưu token vào cookie client

💡Nói chung là muốn thao tác với cookie ở domain front-end (thêm, sửa, xóa) thì phải thông qua `Route Handler Next.js Server`

## Ở dự án Quản lý quán ăn

Mình sẽ làm khác 1 tí, thay vì khai báo 1 route handler là `/auth` thì mình sẽ khai báo route handler cho login luôn

1. Client component gọi api login route handler là `/auth/login`
2. Route handler này sẽ gọi tiếp api login đến Server Backend để nhận về token, sau đó lưu token vào cookie client, cuối cùng trả kết quả về cho client component

Cái này gọi là dùng `Next.js Server` làm `proxy trung gian`

Tương tự với logout cũng vậy

Ở Server Component nhận biết được login hay chưa thì dựa vào cookie mà browser gửi lên  
Ở Client Component nhận biết được login hay chưa thì dựa vào local storage

`Có 3 case xử lý logout`
- Logout bình thường (ấn đăng xuất)
- Logout khi accessToken trong cookie hết hạn - (middleware - dành cho khi AT hết hạn rồi load lại page) redirect qua trang /logout (xử lý logout bình thường) -> redirect về /login
- Logout khi API lỗi trả về 401 - (http - xử lý cả ở client và ở server) 