<?php
declare(strict_types=1);

function blog_posts_data(): array
{
    static $posts = null;
    if ($posts !== null) {
        return $posts;
    }

    $posts = [
        [
            'slug' => '100-maths-questions-class-5',
            'title' => '100 Maths Questions for Class 5',
            'category' => 'Mathematics',
            'readTime' => '5 min read',
            'excerpt' => 'Practice essential Class 5 maths problems covering fractions, decimals, and geometry.',
            'content' => <<<'HTML'
<h2>Why Daily Maths Practice Matters in Class 5</h2>
<p>Class 5 is a turning point in primary school mathematics. Students move from basic arithmetic to fractions, decimals, large numbers, and introductory geometry. Regular practice with varied question types builds confidence before the transition to middle school. The NCERT Math-Magic textbook for Class 5 covers thirteen chapters, and revisiting each topic through extra questions helps cement concepts that appear again in Class 6 algebra and mensuration.</p>
<p>Teachers often recommend solving at least ten problems per topic every week. A structured set of 100 questions spread across all major units gives students a comprehensive revision tool before unit tests and annual exams. The key is not speed alone but understanding each step — especially for word problems involving money, measurement, and data handling.</p>
<h2>Topic-Wise Breakdown of the 100 Questions</h2>
<p>Organise your practice into manageable sections so no topic is left out. Below is a suggested distribution aligned with the CBSE Class 5 syllabus for session 2026-27.</p>
<ul>
<li><strong>Large Numbers (15 questions):</strong> Reading and writing numbers in Indian and international place value, comparing numbers, and rounding to the nearest ten, hundred, and thousand.</li>
<li><strong>Operations (20 questions):</strong> Addition and subtraction of multi-digit numbers, multiplication of 3-digit by 2-digit numbers, and long division with remainders.</li>
<li><strong>Fractions (15 questions):</strong> Equivalent fractions, comparing unlike fractions, addition and subtraction of like fractions, and simple word problems.</li>
<li><strong>Decimals (10 questions):</strong> Tenths and hundredths, converting fractions to decimals, and money-based calculations.</li>
<li><strong>Geometry (15 questions):</strong> Identifying angles (acute, obtuse, right), properties of triangles and quadrilaterals, and finding perimeter of rectangles and squares.</li>
<li><strong>Measurement (10 questions):</strong> Converting between cm and m, g and kg, ml and litres, and solving capacity problems.</li>
<li><strong>Data Handling (10 questions):</strong> Reading bar graphs and pictographs, finding mode, and interpreting tables.</li>
<li><strong>Mixed Word Problems (5 questions):</strong> Multi-step problems combining two or more concepts.</li>
</ul>
<h2>Sample Questions to Get Started</h2>
<p>Try these five questions today. Write your working in a notebook before checking answers with a parent or teacher.</p>
<ul>
<li>Write the numeral for "Seven lakh three thousand forty-two" and place commas correctly.</li>
<li>Find the value of 4/5 + 2/5 and express the answer as a decimal.</li>
<li>A rectangle has length 12 cm and breadth 8 cm. Find its perimeter and area.</li>
<li>Ravi bought 2 kg 350 g of rice and 1 kg 125 g of dal. What is the total weight?</li>
<li>The bar graph shows books read by five students: 4, 6, 3, 8, and 5. Who read the most books? What is the total?</li>
</ul>
<h2>Tips for Effective Practice</h2>
<p>Set aside twenty minutes daily rather than cramming all 100 questions in one sitting. Use a timer for mental math sections but take unlimited time for word problems. After completing each section, mark questions you got wrong and redo them after two days — spaced repetition improves long-term retention. Parents can turn some questions into real-life activities: measuring ingredients while cooking covers fractions and decimals, and planning a trip budget covers large numbers and addition.</p>
<p>Download printable worksheets from your school's homework portal or use our Math Solver tool for step-by-step explanations when you get stuck. Consistent practice now makes Class 6 algebra feel like a natural next step rather than a sudden jump in difficulty.</p>
HTML,
        ],
        [
            'slug' => 'best-science-projects-class-8',
            'title' => 'Best Science Projects for Class 8',
            'category' => 'Science',
            'readTime' => '7 min read',
            'excerpt' => 'Creative and easy science project ideas perfect for Class 8 students.',
            'content' => <<<'HTML'
<h2>Choosing the Right Science Project for Class 8</h2>
<p>Science exhibitions and internal assessments in Class 8 expect students to demonstrate understanding of concepts from physics, chemistry, and biology chapters in the NCERT textbook. A good project is not the most flashy one — it is the one where you can clearly explain the scientific principle, show your experiment, and answer questions from judges or classmates. CBSE schools typically assign projects during Term 1 or Term 2, so start planning at least three weeks before the submission date.</p>
<p>Pick a topic linked to your syllabus: force and pressure, friction, sound, chemical effects of electric current, or conservation of biodiversity. Projects that connect classroom theory to everyday life score well because they show application, not just memorisation.</p>
<h2>Top 10 Project Ideas with Brief Descriptions</h2>
<p>Each idea below can be completed with household or low-cost materials. Always work with an adult when using electricity, chemicals, or sharp tools.</p>
<ul>
<li><strong>Electromagnet Strength Tester:</strong> Wrap copper wire around an iron nail, connect to a battery, and test how many paper clips it lifts. Change the number of coils and record results — links to magnetic effects of electric current.</li>
<li><strong>Friction Comparison Ramp:</strong> Roll a toy car down ramps covered with sandpaper, cloth, and smooth wood. Measure distance travelled to compare friction on different surfaces.</li>
<li><strong>Water Filtration Model:</strong> Layer gravel, sand, and charcoal in a plastic bottle to filter muddy water. Test clarity before and after — connects to wastewater treatment chapter.</li>
<li><strong>Sound Wave Visualiser:</strong> Place rice grains on a stretched plastic wrap over a bowl and play different frequencies near it. Observe vibration patterns — demonstrates sound as vibration.</li>
<li><strong>Soil Erosion Demo:</strong> Pour water over trays of bare soil, grass-covered soil, and soil with pebbles. Compare runoff and erosion — links to agriculture and environment units.</li>
<li><strong>Acid-Base Indicator from Red Cabbage:</strong> Extract juice from red cabbage and test household substances (lemon juice, baking soda solution, soap). Record colour changes — relates to acids, bases, and salts from Class 7 revision.</li>
<li><strong>Solar Cooker:</strong> Build a box cooker with aluminium foil and black paper. Measure temperature rise over time — connects to energy and environmental science.</li>
<li><strong>Microorganism Growth:</strong> Leave bread slices in different conditions (dry, moist, refrigerated) and observe mould growth over a week — links to microorganisms friend and foe.</li>
<li><strong>Human Eye Model:</strong> Use a convex lens and screen to demonstrate how the eye focuses light and how concave lenses correct myopia — ties to the light chapter.</li>
<li><strong>Composting Bin:</strong> Set up a small compost bin with kitchen waste and dry leaves. Track decomposition over four weeks — connects to garbage management and recycling.</li>
</ul>
<h2>How to Present Your Project</h2>
<p>Your display board should include a clear title, objective, hypothesis, materials list, procedure, observations in a table, conclusion, and bibliography. Use neat handwriting or printed labels. Prepare a two-minute oral explanation you can deliver without reading every word from the board. Anticipate questions: Why did you choose this topic? What would you improve? What safety precautions did you follow?</p>
<p>Take photos during the experiment and paste them on the board — visual evidence makes your work credible. If your school allows, bring the working model for a live demonstration. Judges appreciate students who can connect their project back to NCERT chapter names and real-world applications such as water conservation, renewable energy, or public health.</p>
HTML,
        ],
        [
            'slug' => 'english-essay-topics-class-6',
            'title' => 'English Essay Topics for Class 6',
            'category' => 'English',
            'readTime' => '4 min read',
            'excerpt' => '50 essay topics to improve writing skills for Class 6 students.',
            'content' => <<<'HTML'
<h2>Building Essay Writing Skills in Class 6</h2>
<p>Essay writing in Class 6 moves beyond simple paragraph composition to structured pieces of 120–150 words with a clear introduction, body, and conclusion. CBSE English assessments test both creative and factual writing — you may be asked to describe a festival, argue for or against a school rule, or narrate a personal experience. The Honeycomb textbook and writing section in your workbook provide models, but practising with diverse topics builds flexibility for unseen exam questions.</p>
<p>A strong Class 6 essay uses correct grammar, appropriate vocabulary, and logical flow. Start with a hook sentence, develop two or three supporting points in the body, and end with a conclusion that restates your main idea or offers a thoughtful closing remark. Always leave five minutes to proofread for spelling and punctuation errors.</p>
<h2>50 Essay Topics Organised by Type</h2>
<p>Use this list for weekly writing practice. Aim to write at least two essays per week — one descriptive and one argumentative or narrative.</p>
<ul>
<li><strong>Descriptive (10 topics):</strong> My Favourite Teacher, A Rainy Day, My School Library, The Diwali Festival, A Visit to a Historical Monument, My Best Friend, My Favourite Sport, A Market Scene, My Pet, An Indian Village.</li>
<li><strong>Narrative (10 topics):</strong> A Day I Will Never Forget, How I Helped Someone, My First Day in Class 6, A Funny Incident at School, A Trip with My Family, When I Lost Something Important, Learning to Ride a Bicycle, A Time I Felt Proud, An Adventure in the Park, A Dream I Remember.</li>
<li><strong>Argumentative (10 topics):</strong> Should Homework Be Banned?, Are Mobile Phones Good for Students?, Why Reading Books Is Better Than Watching TV, Should School Uniforms Be Compulsory?, Is Social Media Helpful for Students?, Why We Should Save Trees, Should Pets Be Allowed in School?, Importance of Punctuality, Why Exercise Is Essential, Should Plastic Bags Be Banned?</li>
<li><strong>Expository (10 topics):</strong> How to Stay Healthy, The Importance of Clean Water, How Plants Grow, The Solar System, How Paper Is Made, The Role of Police in Society, How to Prepare for a Test, The Water Cycle, How Computers Help Us, The Importance of National Symbols.</li>
<li><strong>Imaginative (10 topics):</strong> If I Were the Principal for a Day, If I Could Fly, A World Without Electricity, If Animals Could Talk, Life on Another Planet, If I Found a Magic Lamp, A Robot in My House, If I Were Invisible for a Day, A Conversation with a Tree, The City of the Future.</li>
</ul>
<h2>Essay Structure Template</h2>
<p>Follow this three-part structure for every essay. Adapt the length based on the word limit given in your question paper.</p>
<ul>
<li><strong>Introduction (2–3 sentences):</strong> State the topic and your main point. For "My Favourite Festival," name the festival and one reason you love it.</li>
<li><strong>Body (4–6 sentences):</strong> Give details, examples, and reasons. Use connecting words like "firstly," " moreover," and "for example" to link ideas smoothly.</li>
<li><strong>Conclusion (1–2 sentences):</strong> Summarise your feelings or restate your opinion. Avoid introducing new information here.</li>
</ul>
<h2>Common Mistakes to Avoid</h2>
<p>Many Class 6 students lose marks for avoidable errors. Do not write one long paragraph — divide your essay into paragraphs. Avoid repeating the same word; use synonyms from your vocabulary notebook. Check subject-verb agreement: "She go" should be "She goes." Do not exceed the word limit by more than twenty words; examiners penalise overly long answers. Practice timed writing — fifteen minutes for a 120-word essay — to build exam readiness for your half-yearly and annual English papers.</p>
HTML,
        ],
        [
            'slug' => 'homework-tips-for-students',
            'title' => 'Homework Tips for Students',
            'category' => 'Study Tips',
            'readTime' => '6 min read',
            'excerpt' => 'Simple strategies to finish homework faster and understand concepts better.',
            'content' => <<<'HTML'
<h2>Why Homework Feels Hard — and How to Fix It</h2>
<p>Homework is practice, not punishment. Every assignment reinforces what you learned in class and prepares you for the next lesson. Yet many students struggle with procrastination, distractions, and unclear instructions. The good news is that a few simple habits can cut your homework time significantly while improving the quality of your work. Whether you are in Class 4 writing sentences or in Class 10 solving trigonometry problems, the principles below apply across subjects and age groups.</p>
<p>The biggest mistake students make is starting homework late in the evening when they are already tired. Your brain processes new information best when you review it within a few hours of learning it. Try to begin homework within thirty minutes of reaching home after a short snack and break.</p>
<h2>Seven Proven Homework Strategies</h2>
<p>Implement these strategies one at a time over two weeks. Small consistent changes beat ambitious plans that fizzle out after three days.</p>
<ul>
<li><strong>Create a dedicated study space:</strong> Use the same desk or corner every day. Keep it clean with only the books and stationery you need for the current task. Remove phones and gaming devices from arm's reach.</li>
<li><strong>Make a priority list:</strong> Write down all assignments, due dates, and estimated time for each. Do the hardest subject first when your energy is highest — usually maths or science for most students.</li>
<li><strong>Use the Pomodoro Technique:</strong> Study for 25 minutes, then take a 5-minute break. After four cycles, take a longer 15-minute break. This keeps focus sharp and prevents burnout.</li>
<li><strong>Read instructions twice:</strong> Before writing answers, read the question carefully. Underline key words like "explain," "list," "compare," and "draw a labelled diagram." Many lost marks come from answering the wrong question.</li>
<li><strong>Ask for help early:</strong> If you are stuck for more than ten minutes on one problem, note it down and move on. Ask your teacher the next day, use our Homework Solver for step-by-step guidance, or discuss with a study partner — but never copy blindly.</li>
<li><strong>Review before submitting:</strong> Spend the last five minutes checking spelling, units in maths and science, and whether you answered every part of every question.</li>
<li><strong>Track your progress:</strong> Cross off completed tasks on your list. The visual satisfaction motivates you to finish the rest.</li>
</ul>
<h2>Subject-Specific Quick Tips</h2>
<p>Different subjects need different approaches. Match your method to the work in front of you.</p>
<ul>
<li><strong>Mathematics:</strong> Show all working steps. Practice similar problems if you got one wrong — one solved example is worth ten copied answers.</li>
<li><strong>Science:</strong> Draw neat labelled diagrams. Learn definitions in your own words rather than memorising textbook sentences word for word.</li>
<li><strong>English and Hindi:</strong> Draft essays on scratch paper first. Read your writing aloud to catch awkward sentences.</li>
<li><strong>Social Science:</strong> Use maps, timelines, and bullet-point notes. Connect events to causes and consequences rather than memorising dates alone.</li>
</ul>
<h2>When Homework Takes Too Long</h2>
<p>If homework regularly exceeds two hours for primary students or three hours for secondary students, talk to your parents and teacher. You may need extra support in a specific subject, or the workload may need adjustment. Quality matters more than quantity — understanding one concept deeply beats rushing through ten pages without comprehension. Build these habits now and you will carry them into board exam preparation in Class 10 and Class 12, where disciplined daily study makes the difference between stress and confidence.</p>
HTML,
        ],
        [
            'slug' => 'board-exam-study-plan-class-10',
            'title' => 'Board Exam Study Plan for Class 10',
            'category' => 'Exam Prep',
            'readTime' => '8 min read',
            'excerpt' => 'A month-by-month study plan to ace your Class 10 board exams.',
            'content' => <<<'HTML'
<h2>Understanding the Class 10 Board Exam Timeline</h2>
<p>CBSE Class 10 board exams for session 2026-27 typically begin in February or March. That gives you roughly ten months from June to prepare thoroughly across five subjects: Mathematics, Science, English, Hindi (or regional language), and Social Science. The key to success is not studying fourteen hours a day in the final month — it is consistent, syllabus-aligned preparation spread across the entire academic year with intensified revision in the last twelve weeks.</p>
<p>Your NCERT textbooks are the primary resource. CBSE board papers are largely based on NCERT exercises, in-text questions, and chapter-end summaries. Supplement with previous year question papers, sample papers released by CBSE, and chapter-wise tests from your school.</p>
<h2>Month-by-Month Study Plan</h2>
<p>Follow this roadmap from June 2026 to March 2027. Adjust dates if your school follows a different calendar, but keep the sequence intact.</p>
<ul>
<li><strong>June–July (Foundation):</strong> Complete first-read of all NCERT chapters. Make chapter-wise notes with formulas, definitions, and key diagrams. Identify weak topics in each subject.</li>
<li><strong>August–September (Deep Study):</strong> Solve all NCERT intext and exercise questions. For Mathematics and Science, maintain a formula sheet and a separate notebook for numerical problems. Begin Social Science map work and timeline charts.</li>
<li><strong>October (First Revision):</strong> Revise Units 1–7 of each subject. Take a full-length mock test for Mathematics and Science. Analyse mistakes and redo weak chapters.</li>
<li><strong>November (Pre-Board Preparation):</strong> Complete syllabus coverage. Solve CBSE sample question papers from the official website. Focus on writing practice for English and Hindi — letters, essays, and analytical paragraphs.</li>
<li><strong>December (Second Revision):</strong> School pre-board exams usually happen now. Treat them as real board exams: timed conditions, no notes, proper seating. Revise based on pre-board feedback.</li>
<li><strong>January (Intensive Revision):</strong> Daily rotation: two subjects per day in 90-minute blocks. Prioritise chapters with higher weightage — trigonometry, electricity, and chemical reactions in Science/Maths; Nationalism and Federalism in Social Science.</li>
<li><strong>February (Final Sprint):</strong> One previous year paper per subject every two days. Review only notes and formula sheets — avoid starting new chapters. Sleep at least seven hours; avoid all-nighters.</li>
<li><strong>March (Exam Month):</strong> Light revision the day before each paper. Read the question paper fully in the first fifteen minutes. Attempt sections you find easiest first to build confidence.</li>
</ul>
<h2>Weekly Schedule Template</h2>
<p>During regular school months (June–November), dedicate roughly eighteen to twenty hours per week outside school hours to board preparation.</p>
<ul>
<li><strong>Monday &amp; Thursday:</strong> Mathematics (2 hours) + Science (1.5 hours)</li>
<li><strong>Tuesday &amp; Friday:</strong> Social Science (1.5 hours) + English writing practice (1 hour)</li>
<li><strong>Wednesday:</strong> Hindi grammar and literature (1.5 hours) + weak topic revision (1 hour)</li>
<li><strong>Saturday:</strong> Full mock test or chapter test (3 hours) + error analysis (1 hour)</li>
<li><strong>Sunday:</strong> Rest, light reading, and optional group study for doubt clearing</li>
</ul>
<h2>Exam Day Tips</h2>
<p>Reach the exam centre thirty minutes early with your admit card, stationery, and water bottle. For Mathematics, show every step — partial marks are awarded for correct method even if the final answer is wrong. In Science, draw labelled diagrams wherever possible. Social Science answers should use headings and bullet points for clarity. Manage time: allocate minutes per question based on marks — a 5-mark question deserves more time than a 1-mark MCQ. Stay calm if a question seems unfamiliar; attempt what you know first and return to difficult ones later. Consistent effort over months beats last-minute cramming every time.</p>
HTML,
        ],
        [
            'slug' => 'class-7-english-grammar-guide',
            'title' => 'Class 7 English Grammar Guide',
            'category' => 'English',
            'readTime' => '6 min read',
            'excerpt' => 'Essential grammar rules every Class 7 student should know.',
            'content' => <<<'HTML'
<h2>Grammar in the Class 7 CBSE Curriculum</h2>
<p>English grammar in Class 7 builds on the foundations from Classes 5 and 6 and prepares you for the more complex structures tested in Class 8 board-style assessments and beyond. The CBSE curriculum covers parts of speech in greater depth, tense usage, active and passive voice, reported speech, clauses, phrasal verbs, and integrated grammar exercises such as gap filling, editing, and sentence reordering. Your Honeycomb textbook and grammar workbook are the starting points, but mastering grammar requires daily application in both writing and speaking.</p>
<p>Grammar is not a separate subject to memorise — it is the framework that makes your sentences clear and correct. Every essay, letter, and comprehension answer is scored partly on grammatical accuracy. Investing twenty minutes daily in grammar practice pays off across all written exams.</p>
<h2>Essential Grammar Topics for Class 7</h2>
<p>Work through each topic below in order. Use examples from your textbook and create your own sentences to test understanding.</p>
<ul>
<li><strong>Nouns and Pronouns:</strong> Common, proper, collective, abstract nouns; personal, reflexive, relative, and demonstrative pronouns. Know when to use "who" vs "whom" and "its" vs "it's."</li>
<li><strong>Verbs and Tenses:</strong> Simple present, present continuous, simple past, past continuous, present perfect, and future tenses. Identify tense errors in sentences and correct them.</li>
<li><strong>Subject-Verb Agreement:</strong> Singular subjects take singular verbs; plural subjects take plural verbs. Watch for tricky cases: "Each of the boys is" (singular), "The team has" vs "The team are" (British vs American usage — CBSE accepts standard forms).</li>
<li><strong>Adjectives and Adverbs:</strong> Degrees of comparison (positive, comparative, superlative). Adverbs of manner, place, time, and frequency. Position of adverbs in sentences.</li>
<li><strong>Prepositions and Conjunctions:</strong> Common prepositions of time (at, on, in), place (under, above, between), and conjunctions (although, because, unless, while).</li>
<li><strong>Active and Passive Voice:</strong> Convert sentences between active and passive. Know when passive is preferred — formal writing, scientific reports, and news articles.</li>
<li><strong>Reported Speech:</strong> Change direct speech to indirect speech. Rules for tense backshift, pronoun changes, and time expression changes (today → that day, tomorrow → the next day).</li>
<li><strong>Clauses:</strong> Main clauses and subordinate clauses; noun clauses, adjective clauses, and adverb clauses. Identify clause types in complex sentences.</li>
<li><strong>Phrasal Verbs:</strong> Common phrasal verbs like "give up," "look after," "put off," and "run out of." Use them in sentences correctly.</li>
<li><strong>Determiners and Modals:</strong> Articles (a, an, the), quantifiers (some, any, much, many), and modals (can, could, may, might, must, should, ought to).</li>
</ul>
<h2>Integrated Grammar Question Types</h2>
<p>CBSE Class 7 exams include specific grammar question formats. Practise each type with ten examples per week.</p>
<ul>
<li><strong>Gap Filling:</strong> Choose the correct word from options or supply your own word based on context and grammar rules.</li>
<li><strong>Editing / Omission:</strong> Find and correct grammatical errors in a passage, or identify words that should be deleted.</li>
<li><strong>Sentence Reordering:</strong> Arrange jumbled words or sentences into a meaningful paragraph using connectors.</li>
<li><strong>Transformation:</strong> Rewrite sentences changing tense, voice, or speech without altering meaning.</li>
</ul>
<h2>How to Study Grammar Effectively</h2>
<p>Do not rote-learn rules without examples. For every rule, write three original sentences — one simple, one compound, and one complex. Keep a grammar error log: whenever a teacher marks a mistake in your notebook, record the correction and the rule it violates. Review this log weekly. Read English newspapers, storybooks, or Honeycomb chapters aloud and pause to notice how tenses and clauses work in real writing. Use our Grammar Checker tool to spot patterns in your mistakes, but always learn the rule behind each correction rather than accepting suggestions blindly. By the end of Class 7, you should write a 150-word paragraph with no more than two minor grammatical errors — that standard sets you up for success in Class 8 formal essays and beyond.</p>
HTML,
        ],
    ];

    return $posts;
}

function get_blog_posts(): array
{
    return blog_posts_data();
}

function get_blog_post(string $slug): ?array
{
    foreach (blog_posts_data() as $post) {
        if ($post['slug'] === $slug) {
            return $post;
        }
    }
    return null;
}
