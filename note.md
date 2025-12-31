# Biến môi trường
có 2 loại biến môi trường

- Loại dành cho server -> chỉ server chỉ truy cập được
`DB_ABC` -> chỉ dùng được ở server

- Loại dành cho browser (client) -> cả browser và server đều truy cập được
vd đặt tên biến dành cho browser: `NEXT_PUBLIC_ANALYTICS_biến`
`NEXT_PUBLIC_API_ENDPOINT=http://localhost:4000` -> dùng được ở server và client