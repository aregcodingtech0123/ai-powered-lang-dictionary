import { redirect } from "next/navigation";

export default function TermsPage() {
  // Backward-compatible route: AdSense requires /terms-of-service. Keep the old route by redirecting.
  redirect("/terms-of-service");
}
