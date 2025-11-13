# RemindlyHub - Automated Business Reminders SaaS

A modern, full-stack SaaS application for managing reminders, tax deadlines, and recurring business events with automated email delivery.

## Features

- ✅ User authentication with Supabase Auth
- ✅ Reminder creation with scheduling and recurrence
- ✅ Tax deadline library with state-specific deadlines
- ✅ Automated email notifications via SMTP (optional)
- ✅ Background job processing with Upstash Redis (optional)
- ✅ Email open tracking with pixel tracking
- ✅ Activity logging and analytics
- ✅ Subscription management
- ✅ Integration management (Google Calendar ready)
- ✅ Responsive dashboard UI
- ✅ Admin endpoints for seeding and stats

## Tech Stack

**Frontend:**
- Next.js 16 with React 19
- TypeScript
- Tailwind CSS
- Recharts for analytics
- Shadcn/ui components

**Backend:**
- Node.js with Next.js API Routes
- Supabase PostgreSQL
- Upstash Redis for job queuing (optional)
- Nodemailer for email delivery (optional)

**Infrastructure:**
- Vercel for deployment
- Supabase for database
- Upstash for Redis (optional)

## Quick Start (5 minutes)

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier works!)

### Installation

1. **Clone and install**
\`\`\`bash
git clone https://github.com/your-org/remindlyhub.git
cd remindlyhub
npm install
\`\`\`

2. **Set up Supabase only**
\`\`\`bash
cp .env.example .env.local
# Add your Supabase credentials:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY
\`\`\`

3. **Run migrations**
   - Go to Supabase Dashboard > SQL Editor
   - Copy content from \`scripts/001_create_schema.sql\`
   - Paste and execute
   - (Optional) Copy and execute \`scripts/002_create_trigger.sql\`

4. **Start the app**
\`\`\`bash
npm run dev
\`\`\`

Visit \`http://localhost:3000\` - the app is now ready to use! ✅

## Optional Enhancements

### Enable Email Notifications

1. Set up SMTP (Gmail, SendGrid, etc.)
2. Add to \`.env.local\`:
   \`\`\`
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   \`\`\`

### Enable Background Jobs

1. Create Upstash Redis account (free tier available)
2. Add to \`.env.local\`:
   \`\`\`
   KV_REST_API_URL=https://your-redis.upstash.io
   KV_REST_API_TOKEN=your-token
   \`\`\`

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Upstash account
- SMTP credentials (Gmail, SendGrid, etc.)

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/your-org/remindlyhub.git
cd remindlyhub
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Set up environment variables**
\`\`\`bash
cp .env.example .env.local
# Edit .env.local with your credentials
\`\`\`

4. **Run database migrations**
\`\`\`bash
npm run migrate
# Or manually run scripts/001_create_schema.sql in Supabase
\`\`\`

5. **Seed tax deadlines (optional)**
\`\`\`bash
curl -X POST http://localhost:3000/api/admin/seed \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
  -H "Content-Type: application/json"
\`\`\`

6. **Start development server**
\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` to start using RemindlyHub.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create user account
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Reminders
- `GET /api/reminders` - List all reminders
- `GET /api/reminders/:id` - Get reminder details
- `POST /api/reminders` - Create reminder
- `PUT /api/reminders/:id` - Update reminder
- `DELETE /api/reminders/:id` - Delete reminder
- `POST /api/reminders/:id/snooze` - Snooze reminder
- `POST /api/reminders/:id/complete` - Mark as complete
- `POST /api/reminders/:id/send-now` - Send immediately

### Tax Deadlines
- `GET /api/tax-deadlines` - List tax deadlines
- `POST /api/tax-deadlines/subscribe` - Subscribe to deadline

### Notifications
- `GET /api/notifications` - List notifications
- `PUT /api/notifications/:id` - Mark as read

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile

### Subscriptions
- `GET /api/subscriptions` - Get subscription
- `POST /api/subscriptions` - Update subscription

### Admin
- `POST /api/admin/seed` - Seed sample data
- `GET /api/admin/stats` - Get usage statistics

### Health
- `GET /api/health` - Health check

## Scheduled Jobs

The application uses a cron job to process scheduled reminders:

**Every 5 minutes:** `POST /api/cron/process-reminders`

Set up via Vercel Cron Jobs or external service:

\`\`\`bash
# Vercel Cron Job
POST /api/cron/process-reminders
Authorization: Bearer YOUR_CRON_SECRET
Interval: 5 minutes
\`\`\`

## Environment Variables

See `.env.example` for complete list. Key variables:

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `KV_REST_API_URL` - Upstash Redis URL (optional)
- `SMTP_HOST` - Email SMTP host (optional)
- `SMTP_PORT` - Email SMTP port (optional)
- `SMTP_USER` - Email SMTP user (optional)
- `SMTP_PASSWORD` - Email SMTP password (optional)
- `CRON_SECRET` - Secret token for cron jobs
- `APP_URL` - Application base URL

## Deployment

### Deploy to Vercel

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Set up Cron Jobs

In Vercel dashboard or `vercel.json`:

\`\`\`json
{
  "crons": [{
    "path": "/api/cron/process-reminders",
    "schedule": "*/5 * * * *"
  }]
}
\`\`\`

## Database Schema

The application uses PostgreSQL with the following main tables:

- `profiles` - User profiles and preferences
- `reminders` - User reminders with scheduling
- `tax_deadlines` - Tax deadline reference data
- `notifications` - User notifications
- `activity_log` - User activity tracking
- `integrations` - Third-party integrations
- `subscriptions` - Subscription plans

All tables have Row Level Security (RLS) enabled for data privacy.

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support, email support@remindlyhub.com or open an issue on GitHub.
