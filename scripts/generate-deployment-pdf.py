"""Generate deployment guide PDF for School Homework Helper."""

from fpdf import FPDF
from pathlib import Path

OUTPUT = Path(__file__).resolve().parent.parent / "docs" / "School-Homework-Helper-Deployment-Guide.pdf"


class GuidePDF(FPDF):
    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(100, 100, 100)
        self.cell(0, 10, f"School Homework Helper - Deployment Guide  |  Page {self.page_no()}", align="C")

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
        self.set_font("Courier", "", 9)
        self.set_fill_color(245, 245, 245)
        self.multi_cell(0, 5, text, fill=True)
        self.ln(2)


def build_pdf():
    pdf = GuidePDF()
    pdf.set_auto_page_break(auto=True, margin=20)
    pdf.add_page()

    # Cover
    pdf.set_font("Helvetica", "B", 22)
    pdf.set_text_color(15, 39, 68)
    pdf.cell(0, 12, "School Homework Helper", ln=True, align="C")
    pdf.set_font("Helvetica", "B", 16)
    pdf.cell(0, 10, "Live Deployment Guide", ln=True, align="C")
    pdf.ln(4)
    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(60, 60, 60)
    pdf.cell(0, 7, "Domain: www.schoolhomeworkhelper.com", ln=True, align="C")
    pdf.cell(0, 7, "Stack: Next.js 15 + Supabase + OpenAI", ln=True, align="C")
    pdf.cell(0, 7, "Hosting: Vercel (recommended) + Bluehost DNS", ln=True, align="C")
    pdf.cell(0, 7, "Date: June 2026", ln=True, align="C")
    pdf.ln(8)

    pdf.section_title("Important: Read This First")
    pdf.body(
        "This website is built with Next.js 15, which requires Node.js hosting. "
        "It cannot run on standard PHP-only shared hosting without Node.js support."
    )
    pdf.body(
        "Most Bluehost shared cPanel plans are PHP-focused. Before deploying on Bluehost "
        "directly, check your cPanel for Setup Node.js App, Node.js Selector, SSH with Node, "
        "or a VPS/Cloud plan."
    )
    pdf.body(
        "RECOMMENDED: Deploy on Vercel (free tier works well for Next.js) and point your "
        "Bluehost domain DNS to Vercel. You keep your domain at Bluehost; Vercel hosts the app."
    )

    pdf.section_title("What You Need Before Going Live")
    pdf.sub_title("Accounts and services")
    pdf.bullet("GitHub account - store code for deployment")
    pdf.bullet("Vercel account (recommended) - host Next.js app")
    pdf.bullet("Bluehost cPanel - manage domain DNS")
    pdf.bullet("Supabase project - authentication and database")
    pdf.bullet("OpenAI API key - AI tools")
    pdf.bullet("Google Cloud Console - Google Sign-In OAuth")
    pdf.bullet("Google AdSense (optional) - advertisements")

    pdf.sub_title("Environment variables (production)")
    pdf.body("Set these in Vercel: Settings > Environment Variables. Never commit real keys to GitHub.")
    for line in [
        "OPENAI_API_KEY - your OpenAI secret key",
        "OPENAI_MODEL - gpt-4o-mini (optional)",
        "NEXT_PUBLIC_SITE_URL - https://www.schoolhomeworkhelper.com",
        "NEXT_PUBLIC_SUPABASE_URL - https://xxxxx.supabase.co",
        "NEXT_PUBLIC_SUPABASE_ANON_KEY - Supabase public anon key",
        "SUPABASE_SERVICE_ROLE_KEY - server only; keep secret",
        "NEXT_PUBLIC_ADSENSE_CLIENT_ID - optional, ca-pub-...",
        "NEXT_PUBLIC_ADSENSE_SLOT - optional",
        "NEXT_PUBLIC_ADSENSE_SLOT_HORIZONTAL - optional",
        "NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE - optional",
    ]:
        pdf.bullet(line)

    pdf.sub_title("Supabase setup")
    pdf.bullet("Log in to supabase.com and open your project")
    pdf.bullet("SQL Editor: run supabase/schema.sql from this project")
    pdf.bullet("Authentication > Providers > Google: Enable")
    pdf.bullet("URL Configuration - add redirect URLs:")
    pdf.bullet("  https://www.schoolhomeworkhelper.com/**")
    pdf.bullet("  https://schoolhomeworkhelper.com/**")
    pdf.bullet("  http://localhost:3000/** (local dev)")
    pdf.bullet("Copy Project URL, anon key, and service_role key for env vars")

    pdf.sub_title("Google OAuth (Sign-In)")
    pdf.bullet("Google Cloud Console > APIs & Services > Credentials")
    pdf.bullet("Create OAuth 2.0 Web application credentials")
    pdf.bullet("Authorized JavaScript origins:")
    pdf.bullet("  https://www.schoolhomeworkhelper.com")
    pdf.bullet("  https://schoolhomeworkhelper.com")
    pdf.bullet("Authorized redirect URI: Supabase callback URL")
    pdf.bullet("  https://YOUR_PROJECT.supabase.co/auth/v1/callback")
    pdf.bullet("Paste Client ID and Secret into Supabase Google provider")

    pdf.add_page()
    pdf.section_title("Option A - Recommended: Vercel + Bluehost Domain")

    pdf.sub_title("Step 1: Push code to GitHub")
    pdf.bullet("Create a new GitHub repository")
    pdf.bullet("Ensure .env.local is in .gitignore and never pushed")
    pdf.code_block(
        "git init\n"
        "git add .\n"
        "git commit -m \"Initial commit\"\n"
        "git branch -M main\n"
        "git remote add origin https://github.com/YOUR_USERNAME/school-homework-helper.git\n"
        "git push -u origin main"
    )

    pdf.sub_title("Step 2: Import project on Vercel")
    pdf.bullet("Go to vercel.com and sign in with GitHub")
    pdf.bullet("Add New > Project > Import your repository")
    pdf.bullet("Framework: Next.js (auto-detected)")
    pdf.bullet("Add all environment variables from the list above")
    pdf.bullet("Set NEXT_PUBLIC_SITE_URL to https://www.schoolhomeworkhelper.com")
    pdf.bullet("Click Deploy and wait for build to finish")

    pdf.sub_title("Step 3: Add custom domain in Vercel")
    pdf.bullet("Vercel project > Settings > Domains")
    pdf.bullet("Add: schoolhomeworkhelper.com")
    pdf.bullet("Add: www.schoolhomeworkhelper.com")
    pdf.bullet("Note the DNS records Vercel shows")

    pdf.sub_title("Step 4: Configure DNS in Bluehost cPanel")
    pdf.bullet("Bluehost > cPanel > Domains > Zone Editor")
    pdf.bullet("Select schoolhomeworkhelper.com")
    pdf.bullet("Add or update DNS records:")
    pdf.bullet("  A record | Host @ | Value 76.76.21.21")
    pdf.bullet("  CNAME record | Host www | Value cname.vercel-dns.com")
    pdf.bullet("Remove conflicting A/CNAME records for @ or www")
    pdf.bullet("Save changes")

    pdf.sub_title("Step 5: Wait for DNS and SSL")
    pdf.bullet("DNS propagation: 15 minutes to 48 hours (often under 1 hour)")
    pdf.bullet("Vercel automatically provisions HTTPS (SSL)")
    pdf.bullet("Set www as primary domain or redirect apex to www in Vercel")

    pdf.sub_title("Step 6: Verify live site checklist")
    for item in [
        "Homepage loads at https://www.schoolhomeworkhelper.com",
        "Logo, navigation, and footer display correctly",
        "Cookie banner appears; Accept/Reject works",
        "All 6 AI tools respond",
        "Google Sign-In works on /signin",
        "Privacy, Terms, and Cookie pages load",
        "Mobile layout looks correct on phone",
    ]:
        pdf.bullet(item)

    pdf.sub_title("Step 7: Future updates")
    pdf.bullet("Commit and push to GitHub main branch")
    pdf.bullet("Vercel auto-redeploys when connected to GitHub")

    pdf.add_page()
    pdf.section_title("Option B - Deploy on Bluehost (Node.js required)")
    pdf.body("Use only if your Bluehost plan includes Node.js App setup or SSH with persistent Node.")
    pdf.sub_title("Step 1: Confirm Node.js support")
    pdf.bullet("In cPanel, look for Setup Node.js App")
    pdf.bullet("Contact Bluehost support to confirm Node 18+ is available")

    pdf.sub_title("Step 2: Upload project")
    pdf.bullet("SSH: git clone https://github.com/YOUR_USERNAME/school-homework-helper.git")
    pdf.bullet("Or upload ZIP via File Manager and extract")

    pdf.sub_title("Step 3: Install and build")
    pdf.code_block("npm install\nnpm run build")
    pdf.body("Create .env or set env vars in cPanel Node app panel.")

    pdf.sub_title("Step 4: Configure Node.js app in cPanel")
    pdf.bullet("Setup Node.js App > Create Application")
    pdf.bullet("Node version: 18 or 20")
    pdf.bullet("Application root: your project folder")
    pdf.bullet("Startup: npm start (runs next start)")
    pdf.bullet("Set all environment variables")
    pdf.bullet("Start the application")

    pdf.body("Note: Shared hosting often cannot run Next.js reliably. Vercel is strongly recommended.")

    pdf.section_title("How Bluehost + Vercel Work Together")
    pdf.bullet("Domain registration: Bluehost")
    pdf.bullet("DNS records: Bluehost cPanel Zone Editor")
    pdf.bullet("Website hosting (Next.js): Vercel")
    pdf.bullet("Database and Auth: Supabase")
    pdf.bullet("AI API: OpenAI")
    pdf.body("You do NOT need to upload PHP files from the php/ folder if you deploy the Next.js app.")

    pdf.section_title("Troubleshooting")
    pdf.sub_title("Site shows Bluehost default page")
    pdf.bullet("DNS not updated or old A record points to Bluehost server IP")
    pdf.bullet("Wait and verify A/CNAME in Zone Editor")

    pdf.sub_title("Google Sign-In fails on live site")
    pdf.bullet("Add production URLs in Supabase redirect allow list")
    pdf.bullet("Add origins in Google OAuth console")
    pdf.bullet("Ensure NEXT_PUBLIC_SITE_URL matches live URL exactly")

    pdf.sub_title("AI tools return errors")
    pdf.bullet("Check OPENAI_API_KEY in Vercel env")
    pdf.bullet("Check OpenAI billing/credits")
    pdf.bullet("View Vercel Functions logs for API route errors")

    pdf.sub_title("Ads not showing")
    pdf.bullet("AdSense must approve your site first")
    pdf.bullet("User must click Accept on cookie banner")
    pdf.bullet("Verify NEXT_PUBLIC_ADSENSE_CLIENT_ID starts with ca-pub-")

    pdf.sub_title("Build fails on Vercel")
    pdf.bullet("Run npm run build locally first")
    pdf.bullet("Fix TypeScript/lint errors")
    pdf.bullet("Ensure all env vars are set before deploy")

    pdf.section_title("Quick Reference Commands")
    pdf.bullet("Local development: pnpm dev")
    pdf.bullet("Production build test: pnpm run build")
    pdf.bullet("Run production locally: pnpm start")
    pdf.bullet("Lint: pnpm run lint")

    pdf.section_title("Support")
    pdf.bullet("Website email: hello@schoolhomeworkhelper.com")
    pdf.bullet("Vercel docs: https://vercel.com/docs")
    pdf.bullet("Supabase docs: https://supabase.com/docs")
    pdf.bullet("Bluehost support: via Bluehost chat / help center")

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(OUTPUT))
    print(f"Created: {OUTPUT}")


if __name__ == "__main__":
    build_pdf()
