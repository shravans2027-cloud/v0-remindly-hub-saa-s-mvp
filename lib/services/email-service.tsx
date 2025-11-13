import nodemailer from "nodemailer"
import { getConfig } from "@/lib/config"

let transporter: nodemailer.Transporter | null = null

// Initialize transporter only if SMTP is configured
const getTransporter = () => {
  if (transporter) return transporter

  const config = getConfig()

  if (!config.smtp.enabled) {
    return null
  }

  transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.port === 465,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.password,
    },
  })

  return transporter
}

interface EmailPayload {
  to: string[]
  subject: string
  message: string
  title: string
  reminderId: string
}

export class EmailService {
  static async sendReminder(payload: EmailPayload) {
    const { to, subject, message, title, reminderId } = payload
    const config = getConfig()

    const transporter = getTransporter()
    if (!transporter) {
      console.log("[v0] Email sending disabled. Reminder:", {
        to,
        subject,
        title,
        message,
      })
      return { messageId: "dev-mode-no-email" }
    }

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="padding: 24px; background: #f5f5f5; border-radius: 8px;">
          <h2 style="color: #222; margin: 0 0 16px 0;">${title}</h2>
          <p style="color: #666; line-height: 1.6; margin: 0 0 24px 0;">${message}</p>
          <a href="${config.app.url}/reminders/${reminderId}" style="display: inline-block; padding: 10px 24px; background: #FF385C; color: white; text-decoration: none; border-radius: 6px; font-weight: 500;">View Reminder</a>
        </div>
        <img src="${config.app.url}/api/track/open?delivery_id=${reminderId}" width="1" height="1" alt="" style="display: none;" />
      </div>
    `

    const result = await transporter.sendMail({
      from: config.smtp.from,
      to: to.join(","),
      subject,
      html: htmlContent,
    })

    return result
  }

  static async sendWelcome(email: string, name: string) {
    const config = getConfig()
    const transporter = getTransporter()

    if (!transporter) {
      console.log("[v0] Welcome email disabled for:", { email, name })
      return { messageId: "dev-mode-no-email" }
    }

    return transporter.sendMail({
      from: config.smtp.from,
      to: email,
      subject: "Welcome to RemindlyHub!",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h1 style="color: #222; margin: 0 0 16px 0;">Welcome to RemindlyHub, ${name}!</h1>
          <p style="color: #666; line-height: 1.6; margin: 0 0 24px 0;">We're excited to help you stay on top of your reminders and tax deadlines.</p>
          <a href="${config.app.url}/dashboard" style="display: inline-block; padding: 10px 24px; background: #FF385C; color: white; text-decoration: none; border-radius: 6px; font-weight: 500;">Get Started</a>
        </div>
      `,
    })
  }
}
