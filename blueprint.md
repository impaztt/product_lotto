# Lotto Number Generator (Firebase Studio)

## Overview
A modern, framework-less web application for generating and managing lottery numbers (Lotto 6/45). The app features a multi-tab interface (Dashboard, Draw, Archive, My Page) and integrates with Firebase for authentication and data storage. It uses Web Components and modern CSS for a high-quality, responsive user experience.

## Project Structure & Features
- **Dashboard Tab:** Displays recent draw results, win statistics, and quick-access tools.
- **Draw Tab:** A wizard-based interface for generating lottery numbers with various filters and patterns.
- **Archive (보관함) Tab:** Stores generated numbers, allowing users to review and manage their history.
- **My Page Tab:** User profile, account settings, and membership information.
- **Firebase Integration:** Uses Firestore for storing user-generated numbers and Firebase Auth for account management.
- **Modern CSS:** Utilizes container queries, logical properties, and CSS variables for a robust design system.
- **Native Feel Enhancement:** Disables global text selection (`user-select: none`) and touch callouts to provide a seamless, native app-like experience while preserving input interaction.
- **Draw Completion Screen Optimization:** Refined the "추첨 완료" screen to be more compact and fit within a single viewport.
    - **Deleted Redundant Title:** Removed the "추첨 완료" text element to eliminate overlap issues and save vertical space.
    - **Premium 3D Lotto Ball Design:** Upgraded the visual quality of balls and slots using sophisticated multi-layered gradients, inner shadows, and realistic glossy highlights for a modern, high-end 3D appearance.
    - Removed analysis tags (odd/even, etc.) from individual set rows for a cleaner, more focused UI.

## Current UI Improvement Plan (Archive & Draw Tabs)
1.  **Enhance Archive Title Readability:** Update the "최근 번호" (Recent Numbers) title in the Archive tab to include a bullet-point style indicator for better visual hierarchy and readability.
2.  **Fix Archive Content Alignment:** Correct the alignment of the Archive tab's content. Currently, it is shifted to the left and needs to be centered to match the layout of other tabs (Draw, My Page).
3.  **Optimize Draw Completion Screen:** Redesign the wizard result screen to be more compact by:
    -   Reducing paddings and gaps in the result shell and stage.
    -   Shrinking the lottery reels and slots.
    -   Transforming number rows from vertical/multi-line to horizontal/single-line layouts.
    -   Optimizing action button sizes for mobile.

## Steps
1.  **Modify `style.css` (Archive):**
    -   Add a pseudo-element (`::before`) to `#tab-store .store-shell-title--recent h2` to create a bullet-point effect.
    -   Add `#tab-store .locker-layout` and `#tab-store .locker-board` to the list of centered elements (around line 9853).
    -   Update the `#tab-store.app-shell` selector to ensure it inherits the standard `app-shell` layout properties.
2.  **Modify `style.css` (Draw Result):**
    -   Reduce `draw-funnel-result-shell` and `draw-wizard-result-stage` paddings.
    -   Update `number-row--wizard-result` to a horizontal grid with 6-column balls.
    -   Scale down balls and slots for better vertical efficiency.
3.  **Verify Changes:** Check the layout in both Archive and Draw tabs to ensure they are centered, visually consistent, and space-efficient.
4.  **Push Changes:** Commit and push the updates to the repository.
