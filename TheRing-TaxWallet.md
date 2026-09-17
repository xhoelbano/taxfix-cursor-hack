# Taxfix x Cursor Hackathon — Submission

## Team name

The Ring

## Active team members

- Xhoel Bano
- Vivek Santi
- Selin Ogulmus
- Alp Acar

## Project

**Tax Wallet** — File your tax return once, get your refund advanced to a spendable wallet today, and every purchase quietly auto-builds next year's refund.

## Prototype / repository link

[https://github.com/xhoelbano/taxfix-cursor-hack](https://github.com/xhoelbano/taxfix-cursor-hack)

## Pitch video / screen recording (max 2 minutes)

https://drive.google.com/file/d/1HtCCYV4DwtVV6EkwRztt6YKsTRwQy9b9/view?usp=sharing


## How we used Cursor

We built the entire project inside Cursor, using the Agent as a hands-on teammate from idea to working prototype:

- **Ideation & framing:** We used Cursor's Agent to pressure-test our concept against the brief (voluntary, year-round engagement), sharpen the value proposition, and shape the "file once → spend your refund today → every purchase builds next year's refund" loop.
- **Pitch deck:** We generated a branded, on-theme pitch deck programmatically (via `python-pptx`) directly from Cursor, iterating on copy and layout in the chat.
- **Prototype build:** Cursor scaffolded and wrote the full app — Vite + React + TypeScript + Tailwind, with framer-motion animations, canvas-confetti moments, and lucide-react icons — including the Apple-Fitness-style activity rings, the Spend/merchant flow, auto-categorized tax tags, life-event detection, the Coach deals, and the tax-filing flow that advances the refund to the wallet.
- **State & data:** All hardcoded and in-memory (no backend), organized into a single React store and seed data files so the demo is deterministic and repeatable for recording.
- **Test & polish in-editor:** We used Cursor's built-in browser to click through every screen, catch and fix issues (e.g., navigation and animation edge cases), and verify the end-to-end demo flow with screenshots — all without leaving the editor.

