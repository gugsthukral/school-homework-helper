"""Generate School Homework Helper project requirements PDF."""
from fpdf import FPDF
from pathlib import Path

OUTPUT = Path(__file__).parent / "School_Homework_Helper_Project_Requirements.pdf"


class ProjectPDF(FPDF):
    def header(self):
        if self.page_no() > 1:
            self.set_font("Helvetica", "I", 8)
            self.set_text_color(100, 100, 100)
            self.cell(0, 8, "School Homework Helper - Project Requirements", align="C")
            self.ln(10)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(120, 120, 120)
        self.cell(0, 10, f"Page {self.page_no()}", align="C")

    def section_title(self, title: str):
        self.ln(4)
        self.set_font("Helvetica", "B", 14)
        self.set_text_color(30, 64, 120)
        self.multi_cell(0, 8, title)
        self.ln(2)
        self.set_draw_color(30, 64, 120)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(4)

    def subsection(self, title: str):
        self.ln(2)
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(50, 50, 50)
        self.multi_cell(0, 6, title)
        self.ln(1)

    def body_text(self, text: str):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(40, 40, 40)
        self.multi_cell(0, 5.5, text)
        self.ln(1)

    def bullet(self, text: str):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(40, 40, 40)
        self.set_x(self.l_margin)
        self.cell(6, 5.5, chr(149))
        self.multi_cell(0, 5.5, text)
        self.set_x(self.l_margin)

    def center_text(self, text: str, h: float = 8):
        self.set_x(self.l_margin)
        self.cell(0, h, text, align="C", ln=1)

    def numbered(self, n: int, text: str):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(40, 40, 40)
        self.multi_cell(0, 5.5, f"{n}. {text}")
        self.ln(0.5)


def build_pdf():
    pdf = ProjectPDF()
    pdf.set_auto_page_break(auto=True, margin=20)
    pdf.add_page()

    # Cover
    pdf.set_font("Helvetica", "B", 24)
    pdf.set_text_color(20, 50, 100)
    pdf.ln(30)
    pdf.center_text("School Homework Helper", 14)
    pdf.ln(6)
    pdf.set_font("Helvetica", "", 14)
    pdf.set_text_color(80, 80, 80)
    pdf.center_text("AI Education Platform - Complete Project Requirements", 10)
    pdf.ln(8)
    pdf.set_font("Helvetica", "I", 11)
    pdf.center_text("SEO-first platform for Classes 1-12", 8)
    pdf.ln(30)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(100, 100, 100)
    pdf.center_text("Document generated from project specification", 6)
    pdf.center_text("June 2026", 6)

    # Section 1
    pdf.add_page()
    pdf.section_title("1. Project Vision")
    pdf.body_text(
        "Build an SEO-first AI education platform for Classes 1-12 - not a single homework "
        "page, but a full ecosystem targeting students, parents, teachers, and tutors. "
        "Long-term brand vision: 'AI School Hub'."
    )

    pdf.section_title("2. Target Audience")
    pdf.bullet("Students (Class 1-12) - homework help, essays, math, quizzes, science projects")
    pdf.bullet("Parents - homework tips, study plans, class-specific resources")
    pdf.bullet("Teachers / Tutors - lesson plans, report card comments, parent letters (Phase 2)")

    pdf.section_title("3. MVP Features (Launch with 6 Tools)")
    tools = [
        ("Homework Solver", "Student enters question; AI explains answer step-by-step."),
        ("Essay Generator", "Generate essays by topic, word count, and class level."),
        ("Math Solver", "Arithmetic, algebra, geometry, and word problems."),
        ("Quiz Generator", "Generate MCQs from any topic."),
        ("Grammar Checker", "Correct English writing."),
        ("Science Project Ideas", "Class-wise project suggestions."),
    ]
    for i, (name, desc) in enumerate(tools, 1):
        pdf.numbered(i, f"{name}: {desc}")

    pdf.section_title("4. Website Structure")
    pdf.body_text(
        "Home\n"
        "  AI Tools (6 tools listed above)\n"
        "  Classes (Class 1 through Class 12)\n"
        "  Subjects (Mathematics, Science, English, Hindi, Punjabi, SST)\n"
        "  Blog\n"
        "  About\n"
        "  Contact"
    )

    pdf.section_title("5. Technology Stack")
    pdf.subsection("Frontend")
    pdf.bullet("Next.js")
    pdf.bullet("Tailwind CSS")
    pdf.bullet("Shadcn UI")
    pdf.subsection("Backend")
    pdf.bullet("Next.js API Routes")
    pdf.bullet("Node.js")
    pdf.subsection("Database")
    pdf.bullet("PostgreSQL via Supabase")
    pdf.subsection("AI")
    pdf.bullet("OpenAI API (primary)")
    pdf.bullet("Gemini API (cheaper backup)")
    pdf.subsection("Hosting")
    pdf.bullet("Vercel")

    pdf.add_page()
    pdf.section_title("6. Database Schema (Minimum)")
    pdf.subsection("users")
    pdf.body_text("id, name, email, role, created_at")
    pdf.subsection("ai_requests")
    pdf.body_text("id, user_id, tool_name, prompt, response, created_at")
    pdf.subsection("blog_posts")
    pdf.body_text("id, title, slug, content, created_at")

    pdf.section_title("7. AI Prompt Engineering")
    pdf.subsection("Homework Solver")
    pdf.body_text(
        "You are a friendly teacher. Explain this homework answer in a way that a Class "
        "{grade} student can understand.\n\n"
        "Question: {question}\n\n"
        "Rules:\n"
        "- Show step-by-step solution\n"
        "- Use simple language\n"
        "- Give final answer\n"
        "- Add quick revision notes"
    )
    pdf.subsection("Essay Generator")
    pdf.body_text(
        "Write a {word_count} word essay on: {topic}\n"
        "For Class {grade} student.\n"
        "Use: Introduction, Main Body, Conclusion. Easy language only."
    )
    pdf.body_text("Similar tailored prompts are required for Math, Quiz, Grammar, and Science tools.")

    pdf.section_title("8. SEO Strategy (Critical for Traffic)")
    pdf.body_text("Goal: 500+ SEO landing pages targeting long-tail keywords.")
    pdf.subsection("Example Page URLs")
    for url in [
        "class-5-maths-homework-help",
        "class-6-science-homework-help",
        "class-7-english-essay-topics",
        "class-8-math-word-problems",
        "class-9-science-projects",
        "class-10-board-exam-preparation",
    ]:
        pdf.bullet(url)
    pdf.subsection("Target Keywords")
    pdf.bullet('"Class 5 Maths Questions"')
    pdf.bullet('"Class 8 Science Homework"')
    pdf.bullet('"Class 10 Essay Topics"')
    pdf.bullet('"Class 7 English Grammar"')
    pdf.body_text("Start with ~100 SEO pages, then scale to 500+.")

    pdf.add_page()
    pdf.section_title("9. Monetization Strategy")
    pdf.subsection("Revenue Sources")
    pdf.bullet("Google AdSense (after launch)")
    pdf.bullet("Affiliate links (books, courses)")
    pdf.bullet("Premium AI credits - Rs. 199/month (after ~20k monthly visitors)")
    pdf.bullet("School advertising (later phase)")
    pdf.bullet("Teacher listings (later phase)")

    pdf.subsection("Premium Tier (Post 20,000 Visitors)")
    pdf.body_text("Free tier: 5 AI requests per day.")
    pdf.body_text("Premium (Rs. 199/month) includes:")
    pdf.bullet("Unlimited AI usage")
    pdf.bullet("Homework PDF Export")
    pdf.bullet("Advanced Math Solver")
    pdf.bullet("Exam Preparation Tools")
    pdf.bullet("Personal Study Planner")

    pdf.section_title("10. AdSense Placement Rules")
    pdf.subsection("Homepage")
    pdf.bullet("Below hero section")
    pdf.bullet("Between content sections")
    pdf.subsection("Blog Pages")
    pdf.bullet("After paragraph 2")
    pdf.bullet("Middle of content")
    pdf.bullet("End of content")
    pdf.subsection("AI Tool Pages")
    pdf.bullet("Right sidebar")
    pdf.bullet("Results section")
    pdf.bullet("Footer")
    pdf.body_text("Important: Avoid excessive ads at launch.")

    pdf.section_title("11. Content Marketing")
    pdf.body_text("Publish 5 articles per day. Examples:")
    pdf.bullet("100 Maths Questions for Class 5")
    pdf.bullet("Best Science Projects for Class 8")
    pdf.bullet("English Essay Topics for Class 6")
    pdf.bullet("Homework Tips for Students")
    pdf.bullet("Board Exam Study Plan")
    pdf.body_text(
        "After 6 months: 5 articles/day = 150/month = 1,800/year. "
        "This becomes a massive traffic asset alongside SEO pages."
    )

    pdf.section_title("12. Future Expansion (50+ AI Tools)")
    pdf.bullet("AI Worksheet Generator")
    pdf.bullet("AI Report Card Comments Generator")
    pdf.bullet("AI Lesson Plan Generator")
    pdf.bullet("AI Parent Letter Generator")
    pdf.body_text(
        "Teacher-focused tools attract dual student + teacher traffic, "
        "increasing long-term SEO potential and ad revenue."
    )

    pdf.add_page()
    pdf.section_title("13. Growth Targets")
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_fill_color(230, 240, 250)
    pdf.cell(60, 8, "Month", border=1, fill=True)
    pdf.cell(60, 8, "Target Visitors", border=1, fill=True)
    pdf.ln()
    pdf.set_font("Helvetica", "", 10)
    targets = [("1", "500"), ("3", "5,000"), ("6", "20,000"), ("12", "100,000+")]
    for month, visitors in targets:
        pdf.cell(60, 8, month, border=1)
        pdf.cell(60, 8, visitors, border=1)
        pdf.ln()

    pdf.ln(4)
    pdf.section_title("14. Development Plan - Where to Start")
    pdf.subsection("Week 1 - Foundation (Start Here)")
    week1 = [
        "Scaffold Next.js app with Tailwind CSS and Shadcn UI",
        "Set up Supabase with users and ai_requests tables",
        "Build Homework Solver end-to-end (UI, API, OpenAI, DB logging)",
        "Design homepage and tool page in Figma",
        "Deploy to Vercel for early live URL",
    ]
    for i, step in enumerate(week1, 1):
        pdf.numbered(i, step)

    pdf.subsection("Weeks 2-3 - MVP Completion")
    week23 = [
        "Add remaining 5 AI tools (reuse API + prompt pattern)",
        "Build Classes and Subjects hub pages",
        "Add About and Contact pages",
        "Implement basic authentication (needed before premium)",
    ]
    for i, step in enumerate(week23, 1):
        pdf.numbered(i, step)

    pdf.subsection("Week 4 - SEO and Content")
    week4 = [
        "Generate first 20-50 SEO pages (class + subject combos)",
        "Launch blog with CMS or MDX; publish first 5-10 articles",
        "Add meta tags, sitemap, and structured data",
    ]
    for i, step in enumerate(week4, 1):
        pdf.numbered(i, step)

    pdf.subsection("Month 2+")
    month2 = [
        "Scale to 100+ SEO pages",
        "Apply for Google AdSense",
        "Add rate limiting (5 free requests/day)",
        "Plan and launch premium tier near 20k visitors",
    ]
    for i, step in enumerate(month2, 1):
        pdf.numbered(i, step)

    pdf.section_title("15. Initial Setup Commands")
    pdf.set_font("Courier", "", 9)
    pdf.set_fill_color(245, 245, 245)
    commands = [
        "npx create-next-app@latest school-homework-helper",
        "npm install tailwindcss openai @supabase/supabase-js lucide-react zod",
    ]
    for cmd in commands:
        pdf.multi_cell(0, 6, cmd, fill=True)
        pdf.ln(1)
    pdf.set_font("Helvetica", "", 10)

    pdf.section_title("16. Build Priority Summary")
    pdf.body_text(
        "1. Next.js + Tailwind + Shadcn\n"
        "2. Supabase database schema\n"
        "3. Homework Solver (one complete tool end-to-end)\n"
        "4. Deploy to Vercel\n"
        "5. Remaining 5 AI tools\n"
        "6. Site structure: Classes, Subjects, Blog\n"
        "7. SEO pages (batch 1)\n"
        "8. AdSense + content pipeline\n"
        "9. Premium features + scale"
    )

    pdf.ln(4)
    pdf.section_title("17. Key Takeaway")
    pdf.body_text(
        "The highest-leverage first step is scaffolding the Next.js project and shipping "
        "Homework Solver as a complete vertical slice: UI, API, AI integration, database "
        "logging, and deployment. Traffic comes from SEO pages and daily blog content; "
        "revenue starts with AdSense and affiliates, then premium subscriptions at scale."
    )

    pdf.output(OUTPUT)
    print(f"PDF created: {OUTPUT}")


if __name__ == "__main__":
    build_pdf()
