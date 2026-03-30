# Lotto Number Generator (Firebase Studio)

## Overview
A modern, framework-less web application for generating and managing lottery numbers (Lotto 6/45). The app features a multi-tab interface (Dashboard, Draw, Archive, My Page) and integrates with Firebase for authentication and data storage. It uses Web Components and modern CSS for a high-quality, responsive user experience.

## Project Structure & Features
- **Dashboard Tab:** Displays recent draw results, win statistics, and quick-access tools.
- **Draw Tab:** A wizard-based interface for generating lottery numbers with various filters and patterns.
- **Archive (보관함) Tab:** Stores generated numbers, allowing users to review and manage their history (displays up to 20 recent sessions).
- **My Page Tab:** User profile, account settings, and membership information.
- **Firebase Integration:** Uses Firestore for storing user-generated numbers and Firebase Auth for account management.
- **Modern CSS:** Utilizes container queries, logical properties, and CSS variables for a robust design system.
- **Native Feel Enhancement:** Disables global text selection (`user-select: none`) and touch callouts to provide a seamless, native app-like experience while preserving input interaction.
- **Draw Review Screen Optimization:**
    - **Enhanced Headline:** Enlarged the "남은 후보" (Remaining Candidates) count to be the primary focus with a bolder, professional look.
    - **Single-Line Metrics:** Reorganized "Core" metrics (Remaining %, Excluded %, Rules Count) into a clean, horizontal 3-column row where each item fits on a single line.
    - **Clean Rules Summary:** Updated selected rules cards to a horizontal flex layout for better alignment and readability.
    - **Deleted Redundant Tags:** Removed small tag-like bullets under the main count to minimize visual noise.
- **Draw Completion Screen Optimization:** Refined the "추첨 완료" screen to be more compact and fit within a single viewport.
- **Step 8 (Exclusion Selection) & Final Review Optimization:**
    - **Step 8 UI Compression:** Reduced the height and font sizes of the step header and instructions.
    - **Exclusion Number Title:** Shortened the "제외수 없음" label to "없음" and minimized its footprint for better mobile fit.
    - **Lotto Ball Design:** Styled the number buttons (1-45) as authentic, circular lottery balls with range-based coloring and 3D effects.
    - **Review Screen Space-Efficiency:** Aggressively minimized vertical margins, paddings, and gaps in the final confirmation (review) step to ensure all summary content fits within a single mobile screen height without scrolling. Added side-by-side layouts for metrics and session counts on mobile.
- **Dashboard Result Card Optimization (2026-03-30):**
    - **Centered Layout:** Re-engineered the `.dashboard-card--result` to use a vertical flex layout with all elements (Header, Round Info, Balls, Prize) perfectly center-aligned.
    - **Premium "Official" Badge:** Moved the "Official" (공식) badge to the top-left corner as a high-quality, absolute-positioned element with a dark gradient, pulse animation, and glow effect.
    - **Refined Information Grouping:** Introduced a dedicated, styled box for the round number and draw date, using dashed dividers to separate the prize information for better clarity and premium feel.

## Steps
1.  **Modify `style.css` (Dashboard Result Card):**
    -   Reset the `.dashboard-card--result` to `display: flex; flex-direction: column; align-items: center;`.
    -   Repositioned `.dashboard-card-meta` to `top: 14px; left: 14px;` with premium styling.
    -   Applied centered text alignment and flex/grid centering across all child components (header, round-row, balls, prize).
    -   Added pulse animation and 3D glow effects to the official badge for a "live" feel.
2.  **Modify `style.css` (Archive):**
    -   Add a pseudo-element (`::before`) to `#tab-store .store-shell-title--recent h2` to create a bullet-point effect.
    -   Add `#tab-store .locker-layout` and `#tab-store .locker-board` to the list of centered elements.
    -   Update the `#tab-store.app-shell` selector to ensure it inherits the standard `app-shell` layout properties.
3.  **Modify `style.css` (Draw Step 8 & Review):**
    -   **Step 8 (Exclude):**
        -   Reduced header and copy gaps/font-sizes.
        -   Ensured `.exclude-number-ball` is always circular (`border-radius: 50%`) and has `aspect-ratio: 1/1`.
        -   Added 3D radial gradients and range-based colors for balls.
    -   **Step 9 (Review):**
        -   Reduced `gap` in `.draw-funnel-review-unified` and `.draw-funnel-review-dash`.
        -   Minimized `padding` and `font-size` across all review components.
        -   Implemented horizontal layouts for generation counts and session metrics to maximize vertical space.
4.  **Modify `main.js` / `index.html`:**
    -   Shortened exclusion labels ("없음" / "제외수 n").
    -   Added `draw-funnel-review-row--split` to the count row for side-by-side layout.
5.  **Verify Changes:** Verified the layout in mobile emulation mode to ensure single-screen fit for review and authentic ball styling in Step 8.
