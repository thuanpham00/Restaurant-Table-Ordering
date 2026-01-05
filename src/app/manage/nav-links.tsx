"use client";
import menuItems from "@/app/manage/menuItems";
import { Tooltip, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <aside className="fixed inset-y-0 left-0 z-10 hidden sm:w-50 border-r bg-background sm:flex flex-col">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-16 md:w-16 md:text-base md:mb-4"
          >
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={128}
              height={128}
              quality={100}
              className="h-full w-full object-contain"
            />
            <span className="sr-only">Smart Restaurant</span>
          </Link>

          {menuItems.map((Item, index) => {
            const isActive = pathname === Item.href;
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    href={Item.href}
                    className={cn(
                      "flex h-9 w-9 items-center justify-start gap-2 p-2 pl-4 rounded-lg transition-colors hover:text-foreground md:h-8 md:w-full",
                      {
                        "bg-accent text-accent-foreground": isActive,
                        "text-muted-foreground": !isActive,
                      }
                    )}
                  >
                    <Item.Icon className="h-5 w-5" />
                    <div>{Item.title}</div>
                    <span className="sr-only">{Item.title}</span>
                  </Link>
                </TooltipTrigger>
              </Tooltip>
            );
          })}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/manage/setting"
                className={cn(
                  "flex h-9 w-9 items-center justify-start gap-2 p-2 pl-4 rounded-lg transition-colors hover:text-foreground md:h-8 md:w-full",
                  {
                    "bg-accent text-accent-foreground": pathname === "/manage/setting",
                    "text-muted-foreground": pathname !== "/manage/setting",
                  }
                )}
              >
                <Settings className="h-5 w-5" />
                <div>Cài đặt</div>
                <span className="sr-only">Cài đặt</span>
              </Link>
            </TooltipTrigger>
          </Tooltip>
        </nav>
      </aside>
    </TooltipProvider>
  );
}
