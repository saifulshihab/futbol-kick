# Football Blog AI Agent Instructions

You are an AI agent that builds and maintains a **football content blog centered on the 2026 FIFA World Cup**, with the goal of attracting organic traffic and monetizing via AdSense. The site should be **fast‑loading, SEO‑optimized, and mobile‑first**, with clear navigation and good ad placement.

---

## 1. Overall Site Goals

- Create a **fan‑friendly football blog** focused on the **2026 FIFA World Cup**.
- Attract readers by providing:
  - Up‑to‑date fixtures and standings.
  - Team and player profiles.
  - Match previews, predictions, and simple analysis.
  - Fan‑oriented content (quizzes, polls, local‑angle guides).
- Optimize for **AdSense**:
  - Place ads in the header, sidebar, between sections, and in the footer.
  - Use standard ad units (leaderboard, rectangle, in‑content) without covering main content.

---

## 2. Visual Design & Layout

### 2.1. Look & Feel

- Use a **dark or deep blue background** with white/light text for readability.
- Accent colors: yellow, red, and white (World Cup / sport‑style).
- Fonts:
  - Headings: bold clean font (e.g., Poppins, Oswald).
  - Body text: readable sans‑serif (e.g., Inter, Roboto).
- Make the site **fully responsive** (mobile‑first); large touch‑friendly buttons and readable text sizes.

### 2.2. General Layout Structure

Use a **single‑column layout on mobile** and **2–3 columns on desktop**:

- Top: Header (logo + navigation).
- Middle: Main content area with sidebars (where applicable).
- Bottom: Footer with links and legal info.

---

## 3. Header (Top Bar)

Implement a **sticky header** at the top of every page:

- **Logo & site name** on the left:
  - Example: “FutbolKick” or similar.
- **Main navigation (horizontal)**:
  - Items: `Home`, `Fixtures`, `Groups`, `Teams`, `News`, `Predictions`, `Fan Zone`.
- **Optional small bar below**:
  - Live match indicator (if applicable).
  - Language or time‑zone selector (e.g., “Bangladesh local time”).

---

## 4. Homepage Layout

Structure the homepage as follows:

### 4.1. Hero Banner

- Full‑width banner or slight parallax section:
  - Title: “FIFA World Cup 2026”.
  - Subtitle: “Follow every match, every team, and every moment.”
  - Countdown to the opening match.
- One big CTA button:
  - Example: “View Fixtures” or “Predict the Winner”.

### 4.2. Live / Upcoming Match Strip

Immediately below the hero:

- A horizontal strip:
  - Today’s / next match: `Team A vs Team B` + date + kickoff time (local time) + venue.
  - If live: show “Live” badge and current score.
- Reserve space for a **horizontal AdSense banner** here.

### 4.3. Main Content Grid (3 columns)

#### Column 1 – Fixtures & Groups

- Short list: “Today’s Matches” (3–5 matches, with time and teams).
- Quick‑link cards:
  - “Group Tables”
  - “Knockout Bracket Preview”
  - “Standings After Matchday X”
- After this section, place a **vertical or rectangle AdSense block**.

#### Column 2 – Latest Posts

- List of 5–7 latest blog posts as cards:
  - Examples:
    - “Team X Preview – World Cup 2026”
    - “Player to Watch: [Name]”
    - “Match Preview: Team A vs Team B”
- Each card includes:
  - Thumbnail image or icon.
  - Title.
  - Short teaser text.
- Place an **in‑content AdSense block** after the list.

#### Column 3 – Sidebar / Widget Zone

- Widgets:
  - “Top Stories This Week”
  - “Popular Teams (by engagement)”
  - “Fan Poll: Who will win the World Cup?”
  - “Quick Links: Fixtures | Groups | Standings”
- Reserve top and bottom of the sidebar for **AdSense rectangles**.

### 4.4. Promo / CTA Section

Below the main grid:

- A section titled “Stay Updated” or similar.
- Include:
  - “Sign up for match alerts” (email or WhatsApp‑style).
  - Or “Join our World Cup Prediction League”.

---

## 5. Fixtures Page

This page should be the **central hub for all matches**. Add some dummy fixures data for now.

### 5.1. Search & Filters

At the top:

- Filter bar with:
  - Date range.
  - Team (autocomplete).
  - Host city / stadium.
  - Group (A–H).
  - Stage: Group stage, Round of 16, Quarter‑finals, Semi‑finals, Final.

### 5.2. Fixture Table / Cards

- Two tabs:
  - “Upcoming” (default).
  - “Completed”.
- Each match card:
  - Matchday + date + time (local + UTC).
  - Team flags + team names.
  - Venue (stadium + city).
  - If live: live score / progress bar.
- Use a clean, sortable table or card grid.

### 5.3. Sidebar

- “Quick‑link buttons”:
  - Group A, Group B, ..., Group H.
- Widgets:
  - “Top scorers so far”
  - “Most‑watched matches”
- Place one **AdSense block** in the sidebar.

---

## 6. Group / Team / Match Pages

### 6.1. Group Page (e.g., Group A)

Structure:

- Banner:
  - Title: “Group A – Teams, Fixtures, Standings”.
- Sections:
  1. **Group table**:
     - Sortable, with columns: Team, P, W, D, L, GF, GA, GD, Pts.
  2. **Team cards**:
     - Four team cards, each linking to a dedicated team page.
  3. **Upcoming fixtures within Group A** (3–4 matches).
  4. **Mini‑analysis box**:
     - Short text: “What each team needs to qualify” (points, scenarios).
- Place AdSense blocks:
  - After the group table.
  - After the fixtures list.

### 6.2. Team Page

- Hero:
  - Title: “Team Name – World Cup 2026 Team Profile”.
  - Team badge + national flag.
- Sections:
  1. **Squad list**:
     - Short list of key players with icons or photos.
  2. **Tactics & Style**:
     - Short paragraph + 1–2 simple diagrams or icons.
  3. **World Cup History Summary**:
     - 3–5 bullet points.
  4. **Next match**:
     - Card with team, opponent, date, and CTA: “Read Match Preview”.
- Place ad blocks:
  - After the squad list.
  - After the tactics section.

### 6.3. Match‑Preview Page

- Hero:
  - Title: “Team A vs Team B – World Cup 2026 Match Preview”.
- Sections:
  1. **Quick stats**:
     - Recent form, head‑to‑head record, key players.
  2. **Key battles**:
     - Player vs player (e.g., “Left‑winger vs right‑back”), 3–5 pairs.
  3. **Predicted context**:
     - Short text on likely score / tactical trends (no illegal betting).
  4. **Fan interaction**:
     - Poll or comment section: “How will this match end?”.
- Place AdSense:
  - Between paragraphs.
  - After the preview text.

---

## 7. News / Blog Section

- Use a **classic blog layout**:
  - Featured image on top.
  - Title.
  - Meta: date + category (e.g., “News”, “Analysis”, “Player”).
  - Intro text (2–3 lines).
- Sidebar:
  - “Trending Today”
  - “Most‑read posts”
  - Category filter: “World Cup 2026”, “Player”, “Tactics”, etc.
- Place **1–2 AdSense blocks** in the sidebar.

---

## 8. Fan Zone / Community

This page should feel like a **fan hub**.

- Title: “Fan Zone – Join the World Cup 2026 Community”.

Content blocks:

1. **Fan polls**:
   - Multiple‑choice questions (e.g., “Who will win the World Cup?”).
   - Show live results in a simple bar chart or percentage display.
2. **Fan stories**:
   - Short user‑submitted posts (e.g., “My first World Cup memory”).
   - If allowed, show 5–10 selected stories.
3. **Prediction leaderboards**:
   - If you implement a prediction system, show top users.
4. **Local‑angle guides**:
   - Example: “How to watch the World Cup in Bangladesh”.
   - “Best watch‑party spots in Dhaka / Kafrul”.

Place **one large AdSense rectangle** or **multiple small blocks** around this content.

---

## 9. Footer

Use a **two‑row footer**:

### Row 1 – Link Columns

- Column 1 – “Tournament”:
  - Groups
  - Fixtures
  - Standings
  - Bracket / Knockout stage
- Column 2 – “Teams & Players”:
  - Teams
  - Player profiles
  - Player to watch
- Column 3 – “Help & Info”:
  - How to watch
  - Timezone explainer
  - FAQ

### Row 2 – Legal & Utility

- Privacy Policy
- Terms of Service
- AdSense / Disclosure notice
- Contact page link
- Optional social media icons:
  - Facebook, Instagram, WhatsApp, YouTube Shorts, etc.

---

## 10. Technical & SEO Guidelines

- Ensure **fast loading**:
  - Optimize images (WebP where possible).
  - Lazy‑load images and ads.
- Implement basic SEO:
  - Unique title and meta description per page.
  - Structured headings (`H1`, `H2`, `H3`).
  - Schema‑like markup (microdata) for matches (teams, dates, venues) if possible.
- Use **clean HTML structure**:
  - Semantic tags (`<header>`, `<main>`, `<section>`, `<aside>`, `<footer>`).
  - Proper class names for styling and JavaScript hooks.

---

## 11. Future Expansion Hints (Optional)

- If desired, add:
  - Email newsletter integration.
  - WhatsApp or Telegram channel link.
  - Simple prediction‑game database (user accounts, scores).
- Keep these features **optional and clearly marked** in the project.

---

This instruction file should be used as a **blueprint** for the AI agent to:

- Generate the Pages/Components using React, Tailwind CSS.
- Build dynamic pages (fixtures, groups, teams).
