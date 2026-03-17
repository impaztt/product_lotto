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

## Current UI Improvement Plan (Archive Tab)
1.  **Enhance Title Readability:** Update the "최근 번호" (Recent Numbers) title in the Archive tab to include a bullet-point style indicator for better visual hierarchy and readability.
2.  **Fix Content Alignment:** Correct the alignment of the Archive tab's content. Currently, it is shifted to the left and needs to be centered to match the layout of other tabs (Draw, My Page).
3.  **Refine CSS Layout:** Update the `app-shell--store` and related layout classes in `style.css` to ensure consistent padding and centering across all devices.

## Steps
1.  **Modify `style.css`:**
    -   Add a pseudo-element (`::before`) to `#tab-store .store-shell-title--recent h2` to create a bullet-point effect.
    -   Add `#tab-store .locker-layout` and `#tab-store .locker-board` to the list of centered elements (around line 9853).
    -   Update the `#tab-store.app-shell` selector to ensure it inherits the standard `app-shell` layout properties.
2.  **Verify Changes:** Check the layout and title style in the Archive tab to ensure it is centered and visually consistent with the rest of the app.
3.  **Push Changes:** Commit and push the updates to the repository.
