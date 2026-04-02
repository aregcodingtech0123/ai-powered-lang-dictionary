import { redirect } from "next/navigation";

export default function PrivacyPage() {
  // Backward-compatible route: AdSense requires /privacy-policy. Keep the old route by redirecting.
  redirect("/privacy-policy");
}
