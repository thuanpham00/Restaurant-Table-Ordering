"use client";
import { getAccessTokenFromLocalStorage } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const menuItems = [
  {
    title: "Món ăn",
    href: "/menu", // menu chung cho cả đã đăng nhập và chưa đăng nhập
  },
  {
    title: "Đơn hàng",
    href: "/orders",
    authRequired: true, // khi true nghĩa là đã đăng nhập thì hiển thị
  },
  {
    title: "Đăng nhập",
    href: "/login",
    authRequired: false, // khi false nghĩa là chưa đăng nhập thì hiển thị
  },
  {
    title: "Quản lý",
    href: "/manage/dashboard",
    authRequired: true, // khi true nghĩa là đã đăng nhập thì hiển thị
  },
];

// server: trả về món ăn + đăng nhập do server ko biết trạng thái login
// client: đầu tiên client sẽ hiển thị món ăn + đăng nhập
// nhưng sau đó thì client render ra là món ăn + đơn hàng + quản lý do đã check được trạng thái login
// 'Text content does not match server-rendered HTML' - do sự khác biệt giữa server và client -> dùng state (chớp giật ui)

// hoặc là chuyển nav-items thành server component (cookie - mất static) sẽ không bị chớp giật UI

export default function NavItems({ className }: { className?: string }) {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsAuth(Boolean(getAccessTokenFromLocalStorage()));
  }, []);

  // nếu check login ở server thì chỉ check bằng cookies() nhưng cookies() thì page sẽ thành dynamic function
  // dẫn đến các trang thành dynamic page hết
  // nếu là tránh việc này check ở client bằng localStorage như trên và chỉ chạy đoạn này ở client nếu chạy ở server thì null (dành cho build page)
  // nó sẽ tránh được việc page thành dynamic page -> static page vẫn ok

  return menuItems.map((item) => {
    if ((item.authRequired === false && isAuth) || (item.authRequired === true && !isAuth)) return null;
    return (
      <Link href={item.href} key={item.href} className={className}>
        {item.title}
      </Link>
    );
  });
}
