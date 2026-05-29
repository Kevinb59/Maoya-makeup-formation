import { redirect } from "next/navigation";

/** Redirection vers le catalogue intégré au pack de formation hybride. */
export default function FormationsPage() {
  redirect("/a-distance/");
}
