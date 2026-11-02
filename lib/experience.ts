export const experiences = {
  "ai-in-the-physical-world": {
    title: "AI in the physical world",
    excerpt: "Defense technology. Welding intelligence. Machine learning for manufacturing.",
    eyebrow: "TECHNICAL PRACTICE / EXPERIENCE NOTE",
    content: `<h2>Where software meets the physical world</h2><p>My work has taken me from AI technology for the U.S. Department of Defense at Think-A-Move, through data science at Lincoln Electric, to machine learning for manufacturing at Atomic Industries.</p><h2>My role</h2><p>At Think-A-Move, I worked as an Engineer &amp; Product Manager (2013–2017). At Lincoln Electric, I was a Data Scientist (2017–2018), working on describing and logging welding events. Since 2021, I have been a Member of Technical Staff at Atomic Industries.</p><h2>The through line</h2><p>These settings connect data and models to physical processes. They are the context behind my interest in AI that can sense, predict and act in the real world.</p><details><summary>Experience note</summary><p>This is a summary of role scope from my biography. It does not claim a specific client result, savings figure or deployment outcome.</p></details>`,
  },
  "different-seats-same-table": {
    title: "Different seats. A wider perspective.",
    excerpt: "A founder’s perspective, a CTO’s technical responsibility, and data science leadership.",
    eyebrow: "COMPANY & FUNCTIONAL LEADERSHIP / EXPERIENCE NOTE",
    content: `<h2>Three different kinds of responsibility</h2><p>I served as CEO of liftr (2018–2020), CTO of LiftCamp Inc. (2020–2021), and Director of Data Science at Captiv8 (2021).</p><h2>My role</h2><p>These were company leadership, technical leadership and functional data science leadership roles, respectively. They sit alongside the hands-on engineering work that has run through my career.</p><h2>How that informs my approach</h2><p>I care about making technical choices understandable: what problem we are solving, how the work connects, and what we need to learn next. My aim is to connect the depth of the technical work to a clear direction.</p><details><summary>Experience note</summary><p>This overview identifies the roles I held. Specific team scope, decisions and measured outcomes will be added when those details are approved for publication.</p></details>`,
  },
  "a-community-for-curiosity": {
    title: "A community for curiosity.",
    excerpt: "Making AI more accessible by bringing people into the conversation.",
    eyebrow: "COMMUNITY LEADERSHIP / EXPERIENCE NOTE",
    content: `<h2>Making AI more accessible</h2><p>As President &amp; CEO of CLE AI &amp; DATA, my community work is centred on making artificial intelligence more accessible and connecting people around the field.</p><h2>My role</h2><p>This is a community leadership role alongside my technical career. The purpose is to help create a place for people to learn, share ideas and meet others working with AI and data.</p><h2>Join the conversation</h2><p>Visit <a href="https://cle-ai.com">CLE AI &amp; DATA</a> for the community’s current activities and information.</p><details><summary>Experience note</summary><p>Community size and partner metrics are intentionally omitted until their date and scope can be confirmed. Community relationships are not presented as personal endorsements.</p></details>`,
  },
} as const;

export type ExperienceSlug = keyof typeof experiences;
