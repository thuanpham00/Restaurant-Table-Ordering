import { accountApiRequests } from "@/apiRequests/account";
import { cookies } from "next/headers";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value as string;
  const result = await accountApiRequests.me_next_server(accessToken);
  console.log(result);
  return <div>DashboardPage</div>;
}
