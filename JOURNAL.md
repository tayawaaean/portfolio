# Project Journal

Newest entries first. Each entry is tagged **[Feature build-out]** or **[Bug fix]**.

## 2026-06-06 — [Bug fix] Removed "Available for Work" badge from About hero
- Removed the "Available for Work" tag from the `tags` array in `src/components/about/AboutHero.tsx`.
- Cleaned up the code it left behind: the unused green pulsing-dot `isAvailable` branch and the now-unused `Briefcase` import from lucide-react.
- Left other badges (Philippines, BS Computer Engineering) and all title text untouched.
- Lesson: when removing a list item that had special-case rendering logic, also remove the dead conditional and any imports that become unused — don't just delete the data entry.
