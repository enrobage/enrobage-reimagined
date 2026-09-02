# Enrobage — Site Design Checklist

The standard every **section** on every **page** must pass. Grounded in the issues found while
polishing Home + About, plus core UI/UX principles. Scope: light-mode marketing site, English
only — **dark mode and i18n are out of scope**.

Legend: **[M]** = must pass (blocker) · **[S]** = should pass (fix unless there's a reason not to).

---

## 1. Layout & containerization *(per section)*
- [M] Content wrapped in `.container-x` (or `.container-prose` for long-form text). No stray
  `max-w-[1400px]`, `px-[4.2%]`, `px-[5%]`, `max-w-5xl mx-auto`, or `w-full px-…` as a section wrapper.
- [M] Section's left/right edge lines up with the navbar, footer, and neighbouring sections.
- [S] Full-bleed backgrounds (hero mesh, CTA bands) allowed, but inner content still sits in
  `.container-x`. Images bleed to the viewport edge only when intentional.
- [M] Nothing overflows its container unintentionally — images/canvas/cards contained or clipped
  (`overflow-hidden` where an element is meant to peek).
- [M] No horizontal scroll at any width.

## 2. Responsive *(per page)*
- [M] Verified at 375 / 768 / 1024 / 1440 / 1600px+. Nothing overlaps, clips text, or overflows.
- [M] Grids reflow sensibly (cards not cramped; comfortable gap). Multi-column → fewer columns on
  smaller screens.
- [S] No fixed pixel heights that break content (hero `min-h`, card `minHeight`) — content can grow.
- [M] Images/media stack or resize on mobile; no fixed-width element forces a scrollbar.

## 3. Typography & contrast
- [M] Body text ≥16px, line-height ~1.5; long-form line length ~65–75ch.
- [M] All text meets **4.5:1** contrast (3:1 for large). No light-gray-on-white — use
  `text-foreground`, `text-muted-foreground`, or `text-foreground/70+`, not `/40`–`/50` or `*-300/400`.
- [M] **Barely-visible gray text:** hunt down faint gray copy (section sub-headings, card
  descriptions, captions, eyebrows, form hints) and darken it so it reads clearly. Replace
  `text-gray-300/400`, `text-slate-300/400`, `text-*-foreground/40`–`/60`, and washed-out inline
  grays with a darker token (`text-muted-foreground` or `text-foreground/70`+). If a whole class of
  muted text is still too light globally, darken the `--muted-foreground` token another notch.
- [S] Headings use the shared scale (`heading-hero/section/sub/cta/card`); alignment consistent
  (section intros centered; split sections left).
- [S] Gradient/clipped text isn't cut off (descenders/caps); gradient text reserved for headings.

## 4. Color & brand
- [S] On-palette (petal/logo tokens). Blue→purple gradient reserved for headings, primary CTAs, and
  brand moments — not sprayed on every element.
- [S] One primary CTA per section; secondary actions subordinate. Buttons use shared styles
  (`btn-ombre`/`btn-pill`) consistently.

## 5. Imagery & media
- [M] Every meaningful `<img>` has descriptive `alt`; decorative ones `aria-hidden`.
- [S] Images declare dimensions / `aspect-ratio` (no layout shift); below-the-fold images `loading="lazy"`.
- [M] Canvas/WebGL (globe, Spline) must **not** capture page scroll or block gestures
  (`pointer-events-none` for decorative; `enablePointerInteraction={false}` / non-zoom for interactive).
- [M] Images contained or bleed intentionally — never accidentally cut with a white gap.

## 6. Spacing & rhythm
- [S] Section vertical padding uses the existing scale (`py-16/20/24/28`); consistent between sections.
- [S] Grid/flex gaps follow a 4/8px rhythm; consistent within a page.

## 7. Interaction & motion
- [M] Interactive elements have visible hover **and** focus states; focus rings not removed.
- [M] Touch targets ≥44×44px; clickable elements have `cursor-pointer`. No dead `<button>`s.
- [S] Transitions 150–300ms, animate transform/opacity (not width/height/top for perf-critical);
  respect `prefers-reduced-motion` for autoplay/scroll effects.

## 8. Accessibility
- [M] Exactly one `<h1>` per page; heading levels don't skip.
- [M] Icon-only buttons/links have `aria-label`; links have discernible text.
- [S] Keyboard: tab order matches visual order; all actions reachable.

## 9. Forms & states *(where relevant — Contact, search, dialogs)*
- [M] Every input has a visible `<label>` (not placeholder-only); required marked; errors shown by
  the field; submit shows loading→success/error.
- [S] Empty/loading states handled (blog list, globe, async content), not blank.
- [M] Links resolve to real routes; no broken nav; 404 page is branded, not bare.

## 10. Per-page sign-off
- [M] `npm run build` passes with no new errors; no console errors on the page.
- [M] Visually verified at desktop **and** mobile widths against items 1–9.

---

## Per-page tracker

Mark ✅ when the page passes that category, ⬜ if pending, — if not applicable.

| Page | Route | 1 Layout | 2 Resp | 3 Type/Contrast | 4 Color | 5 Media | 6 Spacing | 7 Interact | 8 A11y | 9 Forms | 10 Signoff |
|------|-------|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| Home (Index)    | `/`                 | ✅ | ⬜ | ⬜ | ⬜ | ✅ | ⬜ | ⬜ | ⬜ | — | ⬜ |
| About           | `/about`            | ✅ | ⬜ | ⬜ | ⬜ | ✅ | ⬜ | ⬜ | ⬜ | — | ⬜ |
| Products        | `/products`         | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 |
| Blog (Insights) | `/insights`         | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | 🟡 |
| Support         | `/support`          | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | 🟡 |
| SupportDetail   | `/support/:slug`    | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | 🟡 |
| Contact         | `/contact`          | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 |
| GlobalPresence  | `/global-presence`  | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | 🟡 |
| BlogPost        | `/insights/:slug`   | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | 🟡 |
| NotFound (404)  | `*`                 | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ | ✅ | ✅ | 🟡 |

Legend: ✅ pass · 🟡 partial (containerized, not fully reviewed) · ⬜ pending · — n/a

**Work order:** global contrast sweep → Products → Blog → Support → SupportDetail → Contact →
GlobalPresence → BlogPost → NotFound → re-verify Home + About.
