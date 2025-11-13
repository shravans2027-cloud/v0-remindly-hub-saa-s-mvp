// Configuration with sensible defaults for optional env vars
export const getConfig = () => {
  return {
    supabase: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    },
    smtp: {
      enabled: !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD),
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      user: process.env.SMTP_USER || "",
      password: process.env.SMTP_PASSWORD || "",
      from: process.env.SMTP_FROM || "noreply@remindlyhub.com",
    },
    app: {
      url: process.env.APP_URL || "http://localhost:3000",
    },
    auth: {
      cronSecret: process.env.CRON_SECRET || "dev-cron-secret-change-in-production",
    },
    analytics: {
      enabled: !!process.env.NEXT_PUBLIC_ANALYTICS_ID,
      id: process.env.NEXT_PUBLIC_ANALYTICS_ID,
    },
  }
}
