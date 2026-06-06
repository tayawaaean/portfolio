# Project Journal

Newest entries first. Each entry is tagged **[Feature build-out]** or **[Bug fix]**.

## 2026-06-06 — [Feature build-out] Reworded About hero to emphasize proven track record
- Changed the About hero description in `src/components/about/AboutHero.tsx` from "I build production-ready web applications from the ground up" to "I've built plenty of production-ready systems from the ground up" (present/aspirational → past/proven).
- Assumed location was the About hero (where "from the ground up" copy already lived); flagged to the user in case they meant the home hero instead.
- Lesson: when a terse copy request is ambiguous about *where*, edit the spot whose existing wording already matches and state the assumption so it's easy to redirect.

## 2026-06-06 — [Bug fix] Removed "Available for Work" badge from About hero
- Removed the "Available for Work" tag from the `tags` array in `src/components/about/AboutHero.tsx`.
- Cleaned up the code it left behind: the unused green pulsing-dot `isAvailable` branch and the now-unused `Briefcase` import from lucide-react.
- Left other badges (Philippines, BS Computer Engineering) and all title text untouched.
- Lesson: when removing a list item that had special-case rendering logic, also remove the dead conditional and any imports that become unused — don't just delete the data entry.
