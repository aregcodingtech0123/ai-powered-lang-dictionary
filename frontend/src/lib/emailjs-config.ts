import { unstable_noStore as noStore } from "next/cache";

export type EmailJsConfig = {
  serviceId: string;
  templateId: string;
  publicKey: string;
  adminEmail: string;
};

/** Read on the server so Docker/runtime env_file values are available without a rebuild. */
export function getEmailJsConfig(): EmailJsConfig {
  noStore();

  return {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim() ?? "",
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?.trim() ?? "",
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim() ?? "",
    adminEmail: process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim() ?? "",
  };
}

export function isEmailJsConfigured(config: EmailJsConfig): boolean {
  return Boolean(config.serviceId && config.templateId && config.publicKey);
}
