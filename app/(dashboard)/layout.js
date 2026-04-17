export const dynamic = "force-dynamic";
export const revalidate = 0;

import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function Layout({ children }) {
  const session = await auth();
  console.log(session);
  if (!session || !session.user) return redirect("/login");
  return <>{children}</>;
}
