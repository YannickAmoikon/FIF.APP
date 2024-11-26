import { redirect } from "next/navigation";

export default function BackPage() {
  redirect("/back/login");
}
