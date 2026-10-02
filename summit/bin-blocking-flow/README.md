# Summit materials: sanctioned bank BIN blocking

How Checkout.com blocks card payments and card payouts involving sanctioned banks, drawn from
the BIN sections of the **Sanctioned Banks BIN BIC Blocking Framework**. Scope is **card BIN
blocking only**: card acquiring (Processing-In) and payouts to card (Processing-Out). The
framework's BIC material (Pay2Bank, §7.2.2.2, §7.3.2, §9.2, §10.2) is deliberately excluded.

Two deliverables:

| File | Use |
|---|---|
| `deck/bin-blocking-summit-deck.pptx` | **Present from this.** Editable PowerPoint, 8 slides, speaker notes on every slide |
| `deck/bin-blocking-summit-deck.pdf` | PDF of the deck, for sharing or a quick look |
| `bin-blocking-process-flow.png` / `.pdf` | One-page reference. Handout, poster or Q&A backup; too dense to present from |
| `deck/build-deck.cjs` | Deck source. `cd deck && npm install && npm run build` |
| `index.html`, `render.cjs` | One-pager source. `node render.cjs` (needs Playwright + Chromium) |
| `fonts/` | Inter, for the one-pager (SIL Open Font License, see `fonts/LICENSE.txt`) |

**Status: draft.** It needs Compliance sign-off before it is shown outside Checkout.com (see
"Before external use" below).

## The deck

Built for a projected room: titles 28–46pt, body text no smaller than 11pt, one idea per slide.

| # | Slide | What it shows |
|---|---|---|
| 1 | Cover | The payment chain, stopped at our check: the whole talk in one picture |
| 2 | Why we do it ourselves | Merchant → Checkout.com → scheme → issuing bank, with the check marked before the scheme; the three exposures |
| 3 | Part 1: the list | Identify → Map → Validate & approve → Deploy & verify; weekly loop; emergency route |
| 4 | Part 2: every payment | Where the check sits; card acquiring and payout-to-card flows with match / no-match outcomes |
| 5 | Part 3: who owns it | 1LOD / 2LOD / 3LOD, plus the three numbers: weekly, 2 hours, 1 hour |
| 6 | What makes it hard | Name matching, BIN precision, list-to-BIN lag, ownership and control. *Optional* |
| 7 | Takeaways | Three things to remember |
| 8 | Appendix | The one-page reference, full-slide |

For a short panel slot, slides 3 and 4 are the flow chart on their own. Amber marks the points
where a person decides: 2LOD approval of every list change, including shared-BIN exceptions.

Fonts are Arial throughout so the deck renders the same on any machine. Colours sit in the
theme (Design → Variants → Colors), so you can restyle to the summit's brand in one place. To
drop it into a summit template, paste the slides with "Use destination theme".

## Source map

Every element traces to the framework. Section numbers refer to that document; slides cite them
on their source lines.

| Element | Content | Framework § |
|---|---|---|
| Why we block it ourselves | No relationship with issuing banks; third-party reliance does not absolve us | §3, §6.1 |
| Exposures | Sanctioned issuers; payouts to sanctioned issuers; routing through intermediaries | §3 |
| Designation | EU, UK (OFSI), US (OFAC) | §2, §6.2 (hard blocks apply to primary international lists) |
| Identify | LexisNexis lists; wildcard searches; ownership & control checks | §7.3, §10.4; §7.4 and §6.3 (O&C "where feasible") |
| Classify | Global hard stop vs regional / sectoral | §8.2 (Global vs Regional Sanctions Taxonomy) |
| Map BINs | 6- and 8-digit ranges via BINDB | §7.3, §10.1 |
| Validate | Manual validation to avoid blocking legitimate banks | §7.4, §10.1, §10.3 |
| Approve | Sanctions Team sole final approver | §8.2 (Change Management), §9.1 |
| Deploy, Verify | Controlled upload; post-deployment verification | §9.1, §10.1 |
| Weekly cycle | Weekly update and reconciliation | §7.4, §9.1 |
| Fortnightly reconciliation | Register vs third-party industry lists | §10.4 |
| Emergency route | Expedited approval; temporary restriction pending full BIN regeneration | §9.3 |
| 2 hours | Emergency Register Update within 2 hours of a major designation | §8.2 |
| Where the check sits | After BIN extraction, before the scheme authorisation request, before clearing and settlement | §7.2 (minimum acceptance requirements) |
| Card acquiring | Issuer BIN vs Sanctioned BIN List in the Fraud Detection solution; auto-decline | §4, §7.2.1, §7.3.1 |
| Payout to card | Same match in the payout validation layer, incl. refunds where the BIN is available | §4, §7.2.2.1, §7.3.1 |
| On every match | Sanctions_Block_Event logged and retained; escalation where required | §7.3.1, §8.1 |
| 1LOD / 2LOD / 3LOD | Responsibilities by team | §8.1, §8.2, §8.3 |
| 1 hour | Incident notification to the Sanctions Team | §11 |
| What makes it hard | Name matching; BIN precision and shared BINs; data lag; ownership and control | §3, §6.3, §7.4, §8.2, §10.4 |

Individuals named in the framework are shown by team only, in line with the data-handling rule in
`CLAUDE.md` § 4.

## Resolve before presenting

These are gaps or inconsistencies in the framework that surfaced while building the materials.
The slides work around them, but someone may ask about them on stage.

1. **BIC material in a BIN framework.** §4 (Scope) correctly lists only acquiring and card
   payouts, but the title and §7.2.2.2, §7.3.2, §9.2 and §10.2 still describe Pay2Bank BIC
   screening, and §7.2 says controls cover "three product lines" while listing two. If BIC
   screening isn't part of this control, take it out of the framework or move it to its own
   document, so the framework matches what is presented.
2. **Who identifies newly sanctioned banks.** §9.1 gives this to the first line. §8.2 gives
   Register maintenance to the Sanctions Team (2LOD), and §10.4 says the Sanctions Team runs the
   wildcard searches. The slides don't name an owner for the Identify step.
3. **Step order.** The framework describes the BIN update steps across §7.3, §7.4, §8.2 and §9.1
   but doesn't set their order. In particular it doesn't say where classification (§8.2) falls.
   The order shown is a synthesis; confirm it with the control owner.
4. **Emergency timing.** The 2-hour commitment in §8.2 covers the *Register* update. §9.3 refers
   only to "defined timelines", so the framework doesn't say how quickly an emergency block is
   live in production. The slides only claim the 2-hour Register update.
5. **Escalation criteria for BIN declines.** §7.3.1 says escalation happens "if required" but
   doesn't define when. Hence "where required" on the slides.
6. **Roadmap dates are due or past.** Automation and identifier matching were targeted for
   H1 2026 (§10.3, §10.4), and local list integration for Q3 (§6.3). These are now due or
   overdue, so the roadmap is left out. Confirm its status before adding a "target state" slide.
7. **§5 Regulatory Basis wording.** If a regulatory line is added, don't take it from §5 as
   written. The OFSI reference links to a Google search redirect, not a gov.uk page, so confirm
   the document's title and URL before quoting it. And §5 presents failing to implement BIN
   blocks as the criminal offence. Under UK sanctions the offences are the prohibitions
   themselves: dealing with frozen funds, or making funds available to a designated person (for
   Russia, the Russia (Sanctions) (EU Exit) Regulations 2019, regs 11–15). BIN blocking is the
   control that prevents those breaches. *Not sourced from the framework: verify with Legal
   before relying on this.*
8. **Minor:** the incident mailbox's display text in §11 is broken ("checkout.co" followed by
   "m"). The link target is correct.

## Before external use

If the summit audience is external, decide on:

- **Vendor names** (LexisNexis, BINDB). To make it generic, replace them with "sanctions data
  provider" and "BIN data provider".
- **Internal cadences and SLAs** (weekly cycle, fortnightly reconciliation, 2-hour Register update,
  1-hour incident notification).
- **Slide 6** frames the practical difficulties as industry problems, but it is still a view into
  where the control is hardest to run. Hide it if in doubt.
- **Control maturity.** Nothing shows the manual nature of today's BIN generation (§7.4, §10.3) or
  the Medium-High residual risk rating (§6.2). The speaker notes don't volunteer either.
