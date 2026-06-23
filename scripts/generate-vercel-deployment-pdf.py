"""Generate Vercel deployment guide PDF for School Homework Helper."""

from fpdf import FPDF
from pathlib import Path

OUTPUT = Path(__file__).resolve().parent.parent / "docs" / "Vercel-Deployment-Guide-School-Homework-Helper.pdf"


class GuidePDF(FPDF):
    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(100, 100, 100)
        self.cell(
            0,
            10,
            f"Vercel Deployment Guide - School Homework Helper  |  Page {self.page_no()}",
            align="C",
        )

    def section_title(self, text: str):
        self.ln(4)
        self.set_font("Helvetica", "B", 14)
        self.set_text_color(15, 39, 68)
        self.multi_cell(0, 8, text)
        self.ln(2)

    def sub_title(self, text: str):
        self.ln(2)
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(30, 60, 100)
        self.multi_cell(0, 7, text)
        self.ln(1)

    def step(self, number: int, text: str):
        self.set_font("Helvetica", "B", 10)
        self.set_text_color(234, 88, 12)
        self.multi_cell(0, 6, f"Step {number}: {text}")
        self.ln(1)

    def body(self, text: str):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(30, 30, 30)
        self.multi_cell(0, 5, text)
        self.ln(2)

    def bullet(self, text: str):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(30, 30, 30)
        self.multi_cell(0, 5, f"  -  {text}")
        self.ln(1)

    def code_block(self, text: str):
        self.set_font("Courier", "", 8)
        self.set_fill_color(245, 245, 245)
        self.multi_cell(0, 4.5, text, fill=True)
        self.ln(2)


def build_pdf():
    pdf = GuidePDF()
    pdf.set_auto_page_break(auto=True, margin=20)

    # ---- COVER ----
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 24)
    pdf.set_text_color(15, 39, 68)
    pdf.cell(0, 14, "School Homework Helper", ln=True, align="C")
    pdf.set_font("Helvetica", "B", 18)
    pdf.cell(0, 12, "Vercel Deployment Guide", ln=True, align="C")
    pdf.ln(6)
    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(60, 60, 60)
    for line in [
        "Complete step-by-step guide to go live",
        "Domain: www.schoolhomeworkhelper.com",
        "Hosting: Vercel  |  DNS: Bluehost cPanel",
        "Stack: Next.js 15 + Supabase + OpenAI",
        "Prepared: June 2026",
    ]:
        pdf.cell(0, 8, line, ln=True, align="C")
    pdf.ln(10)
    pdf.set_font("Helvetica", "I", 10)
    pdf.multi_cell(
        0,
        5,
        "This document walks you through every step from your local project to a live "
        "production website with HTTPS, Google Sign-In, AI tools, and your custom domain.",
        align="C",
    )

    # ---- OVERVIEW ----
    pdf.add_page()
    pdf.section_title("What You Will Accomplish")
    pdf.bullet("Push your code safely to GitHub (no secrets exposed)")
    pdf.bullet("Deploy the Next.js app on Vercel with one click")
    pdf.bullet("Connect Supabase for login and database")
    pdf.bullet("Connect OpenAI for all 6 AI tools")
    pdf.bullet("Point www.schoolhomeworkhelper.com from Bluehost to Vercel")
    pdf.bullet("Enable free HTTPS (SSL) automatically")
    pdf.bullet("Verify everything works on desktop and mobile")

    pdf.section_title("Architecture Overview")
    pdf.body(
        "Your domain stays registered at Bluehost. DNS records in Bluehost tell browsers "
        "to load the website from Vercel servers. Supabase and OpenAI stay as external "
        "services - you do not host a database on Vercel."
    )
    pdf.code_block(
        "User browser\n"
        "    |\n"
        "    v\n"
        "Bluehost DNS (schoolhomeworkhelper.com)\n"
        "    |\n"
        "    v\n"
        "Vercel (Next.js app + API routes)\n"
        "    |--- Supabase (auth + database)\n"
        "    |--- OpenAI (AI responses)\n"
        "    |--- Google OAuth (sign-in)"
    )

    pdf.section_title("Prerequisites Checklist")
    pdf.bullet("Project folder on your computer (School_homework_helper)")
    pdf.bullet("GitHub account (free): https://github.com")
    pdf.bullet("Vercel account (free): https://vercel.com")
    pdf.bullet("Bluehost cPanel login (domain already assigned)")
    pdf.bullet("Supabase project with schema.sql ready")
    pdf.bullet("OpenAI API key with billing enabled")
    pdf.bullet("Google Cloud OAuth credentials (for Sign-In)")
    pdf.bullet("Node.js installed locally (for testing build)")

    # ---- PART 1: LOCAL PREP ----
    pdf.add_page()
    pdf.section_title("PART 1 - Prepare Your Project Locally")

    pdf.step(1, "Test the build on your computer")
    pdf.body("Open terminal in your project folder and run:")
    pdf.code_block("pnpm install\npnpm run build")
    pdf.body("If build succeeds, your project is ready for Vercel. Fix any errors before continuing.")

    pdf.step(2, "Confirm .env.local is NOT uploaded to GitHub")
    pdf.body("Your .gitignore file already contains:")
    pdf.code_block(".env*.local\n.env")
    pdf.body("Never commit API keys. You will copy values manually into Vercel dashboard.")

    pdf.step(3, "Note your environment variable values")
    pdf.body("Open .env.local and copy these values to a secure notepad (password manager):")
    for var in [
        "OPENAI_API_KEY",
        "OPENAI_MODEL (optional, default gpt-4o-mini)",
        "NEXT_PUBLIC_SUPABASE_URL",
        "NEXT_PUBLIC_SUPABASE_ANON_KEY",
        "SUPABASE_SERVICE_ROLE_KEY",
        "NEXT_PUBLIC_ADSENSE_CLIENT_ID (if using ads)",
        "NEXT_PUBLIC_ADSENSE_SLOT (if using ads)",
    ]:
        pdf.bullet(var)
    pdf.body("For production, NEXT_PUBLIC_SITE_URL must be:")
    pdf.code_block("https://www.schoolhomeworkhelper.com")

    pdf.step(4, "Install Git (if not installed)")
    pdf.body("Download from https://git-scm.com. Verify with: git --version")

    # ---- PART 2: GITHUB ----
    pdf.section_title("PART 2 - Push Code to GitHub")

    pdf.step(1, "Create a new GitHub repository")
    pdf.bullet("Go to github.com > click + > New repository")
    pdf.bullet("Name: school-homework-helper (or your choice)")
    pdf.bullet("Visibility: Private recommended (keeps code hidden)")
    pdf.bullet("Do NOT add README, .gitignore, or license (project already has them)")
    pdf.bullet("Click Create repository")

    pdf.step(2, "Initialize Git and push (first time only)")
    pdf.body("In your project folder terminal:")
    pdf.code_block(
        "git init\n"
        "git add .\n"
        "git status\n"
        "git commit -m \"Initial commit - School Homework Helper\"\n"
        "git branch -M main\n"
        "git remote add origin https://github.com/YOUR_USERNAME/school-homework-helper.git\n"
        "git push -u origin main"
    )
    pdf.body("Replace YOUR_USERNAME with your GitHub username. Use GitHub login if prompted.")

    pdf.step(3, "Verify on GitHub")
    pdf.bullet("Refresh your repo page - all project files should appear")
    pdf.bullet("Confirm .env.local is NOT visible in the repo")

    # ---- PART 3: SUPABASE ----
    pdf.add_page()
    pdf.section_title("PART 3 - Configure Supabase for Production")

    pdf.step(1, "Run database schema")
    pdf.bullet("Login to supabase.com > your project")
    pdf.bullet("Left menu: SQL Editor > New query")
    pdf.bullet("Copy contents of supabase/schema.sql from your project")
    pdf.bullet("Click Run")
    pdf.bullet("Creates tables: users, ai_requests, blog_posts")

    pdf.step(2, "Enable Google provider")
    pdf.bullet("Authentication > Providers > Google")
    pdf.bullet("Toggle Enable")
    pdf.bullet("You will add Client ID and Secret in Part 4")

    pdf.step(3, "Set Site URL and Redirect URLs")
    pdf.bullet("Authentication > URL Configuration")
    pdf.bullet("Site URL: https://www.schoolhomeworkhelper.com")
    pdf.bullet("Redirect URLs - add ALL of these:")
    pdf.code_block(
        "https://www.schoolhomeworkhelper.com/**\n"
        "https://schoolhomeworkhelper.com/**\n"
        "http://localhost:3000/**"
    )

    pdf.step(4, "Copy Supabase keys")
    pdf.bullet("Project Settings > API")
    pdf.bullet("Project URL -> NEXT_PUBLIC_SUPABASE_URL")
    pdf.bullet("anon public key -> NEXT_PUBLIC_SUPABASE_ANON_KEY")
    pdf.bullet("service_role key -> SUPABASE_SERVICE_ROLE_KEY (keep secret!)")

    # ---- PART 4: GOOGLE OAUTH ----
    pdf.section_title("PART 4 - Configure Google Sign-In (OAuth)")

    pdf.step(1, "Create Google Cloud project")
    pdf.bullet("Go to console.cloud.google.com")
    pdf.bullet("Create project or select existing one")

    pdf.step(2, "Configure OAuth consent screen")
    pdf.bullet("APIs & Services > OAuth consent screen")
    pdf.bullet("User type: External")
    pdf.bullet("App name: School Homework Helper")
    pdf.bullet("Support email: your email")
    pdf.bullet("Save and continue through scopes and test users if needed")

    pdf.step(3, "Create OAuth credentials")
    pdf.bullet("APIs & Services > Credentials > Create Credentials")
    pdf.bullet("Choose: OAuth client ID")
    pdf.bullet("Application type: Web application")
    pdf.bullet("Name: School Homework Helper Web")

    pdf.step(4, "Authorized JavaScript origins - add:")
    pdf.code_block(
        "https://www.schoolhomeworkhelper.com\n"
        "https://schoolhomeworkhelper.com\n"
        "http://localhost:3000"
    )

    pdf.step(5, "Authorized redirect URIs - add Supabase callback:")
    pdf.body("Find callback URL in Supabase > Auth > Google provider. Usually:")
    pdf.code_block("https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback")

    pdf.step(6, "Paste into Supabase")
    pdf.bullet("Copy Google Client ID and Client Secret")
    pdf.bullet("Paste into Supabase > Auth > Google provider")
    pdf.bullet("Save")

    # ---- PART 5: VERCEL ----
    pdf.add_page()
    pdf.section_title("PART 5 - Deploy on Vercel")

    pdf.step(1, "Create Vercel account")
    pdf.bullet("Go to vercel.com")
    pdf.bullet("Sign up with GitHub (recommended - easiest import)")

    pdf.step(2, "Import your GitHub repository")
    pdf.bullet("Dashboard > Add New > Project")
    pdf.bullet("Find school-homework-helper repository")
    pdf.bullet("Click Import")

    pdf.step(3, "Configure project settings")
    pdf.bullet("Framework Preset: Next.js (auto-detected)")
    pdf.bullet("Root Directory: ./ (leave default)")
    pdf.bullet("Build Command: next build (default)")
    pdf.bullet("Output Directory: .next (default)")
    pdf.bullet("Install Command: npm install or pnpm install")

    pdf.step(4, "Add Environment Variables BEFORE first deploy")
    pdf.body("Expand Environment Variables section. Add each variable:")
    env_rows = [
        ("OPENAI_API_KEY", "sk-...", "Production, Preview, Development"),
        ("OPENAI_MODEL", "gpt-4o-mini", "Production (optional)"),
        ("NEXT_PUBLIC_SITE_URL", "https://www.schoolhomeworkhelper.com", "Production only"),
        ("NEXT_PUBLIC_SUPABASE_URL", "https://xxx.supabase.co", "All environments"),
        ("NEXT_PUBLIC_SUPABASE_ANON_KEY", "eyJ...", "All environments"),
        ("SUPABASE_SERVICE_ROLE_KEY", "eyJ... (secret)", "Production only"),
        ("NEXT_PUBLIC_ADSENSE_CLIENT_ID", "ca-pub-...", "Production (optional)"),
        ("NEXT_PUBLIC_ADSENSE_SLOT", "your slot id", "Production (optional)"),
    ]
    for name, example, scope in env_rows:
        pdf.bullet(f"{name} = {example}  [{scope}]")

    pdf.body("IMPORTANT: NEXT_PUBLIC_SITE_URL must be your live domain in Production.")

    pdf.step(5, "Click Deploy")
    pdf.bullet("Wait 2-5 minutes for build to complete")
    pdf.bullet("Green checkmark = success")
    pdf.bullet("You get a temporary URL: your-project.vercel.app")
    pdf.bullet("Open it and test homepage + one AI tool")

    pdf.step(6, "If build fails")
    pdf.bullet("Click failed deployment > View Build Logs")
    pdf.bullet("Common fixes: missing env vars, TypeScript errors")
    pdf.bullet("Run pnpm run build locally to reproduce and fix")

    # ---- PART 6: DOMAIN ----
    pdf.add_page()
    pdf.section_title("PART 6 - Connect Custom Domain (Bluehost DNS)")

    pdf.step(1, "Add domains in Vercel")
    pdf.bullet("Project > Settings > Domains")
    pdf.bullet("Add: schoolhomeworkhelper.com")
    pdf.bullet("Add: www.schoolhomeworkhelper.com")
    pdf.bullet("Vercel shows Invalid Configuration until DNS is updated")

    pdf.step(2, "Open Bluehost DNS Zone Editor")
    pdf.bullet("Login to Bluehost")
    pdf.bullet("Go to cPanel")
    pdf.bullet("Domains section > Zone Editor (or DNS Zone Editor)")
    pdf.bullet("Select domain: schoolhomeworkhelper.com")

    pdf.step(3, "Add DNS records")
    pdf.body("Add or UPDATE these records (remove conflicting old ones):")
    pdf.code_block(
        "Type: A\n"
        "Host: @\n"
        "Points to: 76.76.21.21\n"
        "TTL: 14400 (or 4 hours)\n"
        "\n"
        "Type: CNAME\n"
        "Host: www\n"
        "Points to: cname.vercel-dns.com\n"
        "TTL: 14400"
    )
    pdf.body("If an old A record for @ points to Bluehost IP, delete or replace it.")

    pdf.step(4, "Wait for DNS propagation")
    pdf.bullet("Usually 15 minutes to 2 hours; can take up to 48 hours")
    pdf.bullet("Check status in Vercel > Domains")
    pdf.bullet("When valid, status changes to Valid Configuration")

    pdf.step(5, "Set primary domain")
    pdf.bullet("In Vercel Domains, choose primary: www.schoolhomeworkhelper.com")
    pdf.bullet("Enable redirect: schoolhomeworkhelper.com -> www (recommended)")
    pdf.bullet("Vercel auto-issues SSL certificate (HTTPS)")

    # ---- PART 7: VERIFY ----
    pdf.section_title("PART 7 - Post-Deploy Verification Checklist")

    checks = [
        "https://www.schoolhomeworkhelper.com loads homepage",
        "Logo appears in header and footer",
        "Navigation links work (Tools, Classes, Blog, etc.)",
        "Cookie banner shows at bottom; Accept and Reject work",
        "Privacy, Terms, Cookie Policy pages open",
        "All 6 AI tools pages load",
        "Guest can use AI tools 4 times without login",
        "Sign-in prompt appears after 4 free uses",
        "Google Sign-In works on /signin",
        "Signed-in user can use AI tools without limit",
        "Search icon works (Ctrl+K)",
        "Mobile layout looks correct on phone",
        "HTTPS padlock shows in browser (secure)",
        "Non-www redirects to www (if configured)",
    ]
    for i, check in enumerate(checks, 1):
        pdf.bullet(f"[ ] {check}")

    # ---- PART 8: UPDATES ----
    pdf.add_page()
    pdf.section_title("PART 8 - Updating Your Live Site Later")

    pdf.step(1, "Make changes locally")
    pdf.body("Edit code, test with: pnpm dev")

    pdf.step(2, "Commit and push to GitHub")
    pdf.code_block(
        "git add .\n"
        "git commit -m \"Describe your change\"\n"
        "git push"
    )

    pdf.step(3, "Vercel auto-deploys")
    pdf.body(
        "Every push to main branch triggers a new deployment automatically. "
        "View progress in Vercel > Deployments tab."
    )

    pdf.step(4, "Add new environment variables")
    pdf.body(
        "If you add new env vars in code, add them in Vercel > Settings > "
        "Environment Variables, then Redeploy."
    )

    # ---- TROUBLESHOOTING ----
    pdf.section_title("PART 9 - Troubleshooting")

    issues = [
        (
            "Bluehost default page still shows",
            "DNS not updated or still pointing to Bluehost server IP. "
            "Verify A record @ = 76.76.21.21 and CNAME www = cname.vercel-dns.com. "
            "Wait up to 48 hours. Clear browser cache.",
        ),
        (
            "Domain shows Invalid Configuration in Vercel",
            "DNS records incorrect or not propagated yet. "
            "Use Vercel's DNS instructions exactly. Check for duplicate A/CNAME records.",
        ),
        (
            "Google Sign-In fails on live site",
            "Add production URLs in Supabase redirect list. "
            "Add origins in Google OAuth console. "
            "Ensure NEXT_PUBLIC_SITE_URL is https://www.schoolhomeworkhelper.com in Vercel Production env.",
        ),
        (
            "AI tools return error or 500",
            "Check OPENAI_API_KEY in Vercel env vars. "
            "Verify OpenAI account has credits. "
            "View Vercel > Project > Logs > Functions for error details.",
        ),
        (
            "Supabase auth not working",
            "Verify all three Supabase env vars are set. "
            "Check redirect URLs in Supabase dashboard include production domain.",
        ),
        (
            "Ads not showing",
            "AdSense must approve site first (can take days). "
            "User must click Accept on cookie banner. "
            "Verify NEXT_PUBLIC_ADSENSE_CLIENT_ID starts with ca-pub-.",
        ),
        (
            "Build fails on Vercel",
            "Run pnpm run build locally. Fix TypeScript/lint errors. "
            "Ensure no missing dependencies in package.json.",
        ),
        (
            "Images not loading",
            "Google avatars and YouTube thumbnails are allowed in next.config.ts. "
            "If adding new image domains, update remotePatterns and redeploy.",
        ),
    ]
    for title, fix in issues:
        pdf.sub_title(title)
        pdf.body(fix)

    # ---- QUICK REFERENCE ----
    pdf.section_title("Quick Reference")
    pdf.sub_title("Important URLs")
    for url in [
        "Live site: https://www.schoolhomeworkhelper.com",
        "Vercel dashboard: https://vercel.com/dashboard",
        "Supabase dashboard: https://supabase.com/dashboard",
        "Google Cloud Console: https://console.cloud.google.com",
        "Bluehost cPanel: via bluehost.com login",
        "GitHub: https://github.com",
    ]:
        pdf.bullet(url)

    pdf.sub_title("Local commands")
    pdf.code_block("pnpm dev          # Run locally\npnpm run build    # Test production build\npnpm start        # Run production build locally")

    pdf.sub_title("Support email")
    pdf.body("hello@schoolhomeworkhelper.com")

    pdf.ln(4)
    pdf.set_font("Helvetica", "I", 9)
    pdf.set_text_color(120, 120, 120)
    pdf.multi_cell(
        0,
        5,
        "End of Vercel Deployment Guide. Keep this PDF and your API keys secure. "
        "Regenerate this file anytime by running: python scripts/generate-vercel-deployment-pdf.py",
    )

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(OUTPUT))
    print(f"Created: {OUTPUT}")


if __name__ == "__main__":
    build_pdf()
