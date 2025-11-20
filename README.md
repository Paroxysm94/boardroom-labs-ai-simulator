# BoardRoom Labs - AI Boardroom Simulator

Validate your startup ideas with AI-powered advisors in minutes, not weeks.

## 🚀 What is BoardRoom Labs?

BoardRoom Labs is an AI-powered platform that helps entrepreneurs validate their business ideas through:

- **AI Chat Interface**: Share your idea through natural conversation
- **Expert Panel Review**: Get feedback from 5 specialized AI advisors (Operations, Growth, Finance, Product, Risk)
- **Market Simulation**: See how real users would react through virtual focus groups
- **Actionable Next Steps**: Receive concrete, achievable tasks
- **Progress Tracking**: Monitor your idea through multiple validation phases

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works!)
- npm or yarn package manager

## ⚡ Quick Start

### 1. Clone or Fork

```bash
# If you have the code
cd boardroom-labs
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and sign in
2. Create a new project (or use existing)
3. Wait for the database to initialize
4. Go to **Settings → API**
5. Copy your credentials:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (long JWT token)

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then edit `.env` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 5. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Setup

The app uses Supabase for data storage. You'll need to set up the following tables:

### Sessions Table

Stores user validation sessions.

### Messages Table

Stores chat messages between users and AI advisors.

_SQL migration scripts coming soon in `/supabase/migrations`_

## 🔐 Authentication

The app uses Supabase Auth for user management. Users can:

- Sign up with email/password
- Sign in to access their sessions
- Manage their validation projects

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy!

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── account/           # User account page
│   ├── pricing/           # Pricing page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # UI components
│   ├── auth-form.tsx     # Authentication form
│   ├── auth-provider.tsx # Auth context
│   ├── board-view.tsx    # Board visualization
│   ├── chat-interface.tsx # Chat UI
│   ├── dashboard.tsx     # Main dashboard
│   ├── landing-page.tsx  # Landing page
│   └── ...               # Other components
├── lib/                   # Utility functions
│   ├── hooks/            # Custom React hooks
│   ├── supabase.ts       # Supabase client
│   └── utils.ts          # Helper functions
├── supabase/             # Supabase config
└── .env                  # Environment variables (create this!)
```

## 🎨 Features

### Landing Page

- Clean, modern design
- Clear value proposition
- Feature highlights
- Call-to-action buttons

### Dashboard

- Session management
- Progress tracking
- Stage visualization
- Quick access to chats

### Chat Interface

- Real-time conversation
- AI advisor responses
- Message history
- File upload support (coming soon)

### Validation Stages

1. **Pattern Check**: Initial idea validation
2. **Market Simulation**: User reaction testing
3. **Evidence Check**: Data-driven validation
4. **Completed**: Final recommendations

## 🔧 Troubleshooting

### "supabaseUrl is required" Error

- Make sure your `.env` file exists in the root directory
- Check that both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Restart your development server after adding environment variables

### Auth Issues

- Verify your Supabase project is active
- Check that email authentication is enabled in Supabase dashboard
- Confirm your anon key is correct (NOT the service_role key!)

### Build Errors

- Run `npm install` to ensure all dependencies are installed
- Clear `.next` folder: `rm -rf .next`
- Try `npm run build` to see detailed error messages

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - feel free to use this project for your own purposes!

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Supabase](https://supabase.com/)
- UI components from [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)

---

**Built for entrepreneurs who need clarity, not noise.**

Happy validating! 🚀
