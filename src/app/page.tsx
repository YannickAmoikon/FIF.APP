import { redirect } from "next/navigation";

export default function Home() {
  // Redirection côté serveur
  redirect("/back");
}
