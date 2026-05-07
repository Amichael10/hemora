## Switch Kindred to the Protective Crescent palette

### New color system

| Token | Use | HSL |
|---|---|---|
| Cream `#f4ead8` | App background | `38 56% 90%` |
| Deep teal `#1f3a3d` | Primary surfaces, headers, body text, sidebar | `184 33% 18%` |
| Gold `#c9a35a` | Accent, highlights, streaks, success moments | `36 50% 57%` |
| Sickle red `#a8324a` | Logo, primary CTA, crisis/urgent only | `347 55% 43%` |
| Cream-card `#fbf5e7` | Card surfaces (slightly lighter than bg) | `42 65% 95%` |
| Ink `#14282a` | Headlines on cream | `186 35% 12%` |

Hierarchy rule (important): teal is the workhorse for surfaces & text, cream is the canvas, gold is the warm accent, **red is reserved** for the logo, primary CTAs, and crisis/urgent states only — never large fills.

### What changes

1. **`src/kindred-theme.css`** — rewrite `:root` tokens
   - `--background` → cream
   - `--foreground` → ink/deep teal
   - `--primary` → sickle red (CTAs)
   - `--secondary` → deep teal
   - `--accent` → gold
   - `--card` → cream-card
   - `--sidebar` → deep teal w/ cream foreground
   - `--destructive` → keep red (same as primary family)
   - Brand tokens: replace `--brand-blue*` with `--brand-teal*` (deep teal), add `--brand-gold`, `--brand-red`, `--brand-cream`
   - `--gradient-brand` → deep-teal → teal gradient (no more royal blue)
   - Keep dark mode but retune: dark teal bg, gold accent, red primary
   - Update focus ring `.kindred-body-region` to red (already `#7B2335`, refine to `#a8324a`)

2. **Logo / wordmark** — update `src/components/brand/Wordmark.tsx` (or wherever the logo lives) to use the Protective Crescent identity: serif "Kindred" in deep teal + small crescent mark in red/gold. I'll inspect actual file then update.

3. **Targeted component sweeps** to make sure the red doesn't overwhelm:
   - Dashboard hero card → teal gradient bg w/ cream text + gold accents (not red)
   - Crisis page → red is appropriate here (urgent context)
   - Meds adherence chart → gold bars, teal axes
   - Bottom nav active state → teal pill w/ gold icon
   - Primary "Add" / "Save" CTAs → sickle red

4. **Onboarding screen** background gradient → deep teal → cream split (replaces blue split).

### Review flow

After the migration I'll point you to three screens to gut-check before we finalize:
- `/dashboard` — overall feel
- `/meds` — gold accent in chart
- `/crisis` — the only place red goes large

If anything feels off (too red, too dark, gold too yellow), we tune the HSL values in one file and it cascades everywhere.

### Out of scope

- Replacing the actual logo SVG with the crescent mark from the reference image — I'll add a placeholder crescent + family glyph using inline SVG, but a final logo asset would ideally come from your designer. I can also generate one if you want.
- Marketing site / landing page (none exists in app yet).
