import { ContactPageClient } from "./ContactPageClient";
import { getEmailJsConfig } from "@/lib/emailjs-config";

// Env vars come from runtime (Docker env_file / .env.local), not only at image build time.
export const dynamic = "force-dynamic";

export default function ContactPage() {
  const emailConfig = getEmailJsConfig();

  return <ContactPageClient emailConfig={emailConfig} />;
}
