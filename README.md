# Student Finance Tracker

A responsive, accessible web app to help students track expenses, analyze spending, and stay within budget. Built with **vanilla HTML, CSS, and JavaScript**.

---

## 🌟 Features

- Add, edit, and delete financial records
- Dashboard with total records, total spent, top category, and spending cap status
- Regex-powered search with live highlighting
- Spending cap alerts with ARIA live messages
- Inline editing of records
- Mobile-first responsive design (3+ breakpoints)
- Keyboard navigation & accessibility (skip links, focus indicators)

---

## 📊 Regex Catalog

| Field | Pattern | Example |
|-------|---------|---------|
| Description | `^\S(?:.*\S)?$` | `Coffee` |
| Amount | `^(0|[1-9]\d*)(\.\d{1,2})?$` | `12.50` |
| Date | `^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$` | `2025-09-29` |
| Category | `^[A-Za-z]+(?:[ -][A-Za-z]+)*$` | `Food` |
| Advanced (duplicate word) | `\b(\w+)\s+\1\b` | `coffee coffee` |

- Search box supports **live regex patterns**.
- Clear button resets search and highlights.

---

## ⌨️ Keyboard & Accessibility

- Skip to content link at top of page
- Fully operable via **Tab / Shift+Tab / Enter / Space**
- ARIA live regions announce errors, cap status, and search highlights
- Focus indicators visible on all interactive elements

---

## 🛠️ How to Run

1. Clone the repo:
   ```bash
   git clone https://github.com/endahiro/student-finance-tracker.git

## URL Link
https://endahiro.github.io/student-finance-tracker/
## Demo/Video Link
https://youtu.be/ybZaAWvPgUY
