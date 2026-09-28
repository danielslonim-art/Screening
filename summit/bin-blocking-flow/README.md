# Summit flow chart: sanctioned bank BIN/BIC blocking

A one-page, 16:9 process flow of how Checkout.com blocks payments involving sanctioned
financial institutions, drawn from the **Sanctioned Bank BIN-BIC Blocking Framework**.

| File | Use |
|---|---|
| `bin-blocking-process-flow.png` | 3840 × 2160, drop straight into a slide |
| `bin-blocking-process-flow.pdf` | Vector, for print or poster output |
| `index.html` | Source. Edit text here, then re-render |
| `render.cjs` | `node render.cjs` (needs Playwright + Chromium) to regenerate the PNG and PDF |
| `fonts/` | Inter (SIL Open Font License, see `fonts/LICENSE.txt`) |

**Status: draft.** It needs Compliance sign-off before it is shown outside Checkout.com (see
"Before external use" below).

## How the chart reads

1. **Keep the Sanctioned BIN List current** (top panel). A designation leads to identifying the
   bank, classifying the block, mapping BINs, validating them, getting 2LOD approval, deploying
   and verifying. This runs weekly. An emergency route skips full BIN regeneration.
2. **Check every payment in real time** (middle panel). Identifiers are extracted, then each rail
   is checked before authorisation, clearing or settlement. A match is declined, or for Pay2Bank
   blocked or held for Compliance review.
3. **Accountability** (bottom band). 1LOD / 2LOD / 3LOD responsibilities and the 1-hour incident
   notification.

Amber marks the points where a named human decides: 2LOD approval of list changes, and Compliance
review of held Pay2Bank payouts.

## Source map

Every box traces to the framework. Section numbers refer to that document.

| Box | Content | Framework § |
|---|---|---|
| Subtitle | Preventive, real-time; before authorisation, clearing or settlement | §2, §7.2 (minimum acceptance requirements) |
| 01 Designation | EU, UK (OFSI), US (OFAC) | §2, §6.2 (hard blocks apply to primary international lists) |
| 02 Identify | LexisNexis lists; wildcard searches; ownership & control checks | §7.3, §10.4; §7.4 and §6.3 (O&C "where feasible") |
| 03 Classify | Global hard stop vs regional / sectoral | §8.2 (Global vs Regional Sanctions Taxonomy) |
| 04 Map BINs | 6- and 8-digit ranges via BINDB | §7.3, §10.1 |
| 05 Validate | Manual validation to avoid blocking legitimate banks | §7.4, §10.1, §10.3 |
| 06 Approve | Sanctions Team sole final approver | §8.2 (Change Management), §9.1 |
| 07 Deploy | Controlled upload to validation and fraud detection systems | §9.1 |
| 08 Verify | Post-deployment verification | §9.1, §10.1 |
| Weekly cycle | Weekly update and reconciliation | §7.4, §9.1 |
| Fortnightly reconciliation | Register vs third-party industry lists | §10.4 |
| Emergency route | Expedited approval; temporary restriction pending full BIN regeneration | §9.3 |
| Emergency 2 hours | Emergency Register Update within 2 hours of a major designation | §8.2 |
| Extract identifiers | Issuer BIN, beneficiary BIC, routing data | §7.2.1, §7.2.2 |
| Card acquiring | Fraud Detection solution; auto-decline; standard authorisation | §4, §7.2.1, §7.3.1 |
| Payout to card | Validation layer; incl. refunds where BIN is available; standard settlement | §4, §7.2.2.1, §7.3.1 |
| Payout to bank | Fircosoft Continuity; dynamic BIC screening, no pre-built list; EU, UK, US, UN; block or hold | §7.2.2.2, §7.3.2 |
| Control point strip | After extraction, before scheme authorisation, before clearing and settlement | §7.2 |
| On every match | Sanctions_Block_Event logged and retained; escalation where required; Compliance review of holds | §7.3.1, §7.3.2, §8.1 |
| 1LOD / 2LOD / 3LOD | Responsibilities by team | §8.1, §8.2, §8.3 |
| Incident handling | Sanctions Team notified within 1 hour | §11 |

Individuals named in the framework are shown by team only, in line with the data-handling rule in
`CLAUDE.md` § 4.

## Talk track (about 90 seconds)

- We process payments for merchants but don't hold relationships with issuing banks, so we can't
  rely on schemes or acquirers to keep sanctioned banks out. We block them ourselves.
- **Top panel:** when a bank is designated, we identify it, including ownership and control, and
  map it to 6- and 8-digit BINs. The Sanctions Team approves every addition before it goes live.
  This runs weekly, and there's an emergency route for major designations.
- **Middle panel:** every payment is checked in real time, after the BIN or BIC is extracted and
  before anything goes to the scheme. Card acquiring and card payouts are matched against our BIN
  list. Bank payouts have their BIC screened live against EU, UK, US and UN lists.
- A match is declined automatically. Pay2Bank payouts can be held, and in that case a person in
  Compliance decides. Every block is logged.
- **Bottom band:** three lines of defence, and a one-hour clock for reporting anything that gets
  past the control.

## Resolve before presenting

These are gaps or inconsistencies in the framework that surfaced while building the chart. The
chart works around them, but someone may ask about them on stage.

1. **Scope vs. control coverage.** §4 (Scope) lists only Acquiring and Card-based Payouts.
   Pay2Bank BIC screening is in §7.2.2.2 and §7.3.2 but not in §4. §7.2 says controls cover
   "three product lines" but lists two. The chart shows three rails. Suggest updating §4 and §7.2.
2. **Who identifies newly sanctioned banks.** §9.1 gives this to the first line. §8.2 gives
   Register maintenance to the Sanctions Team (2LOD), and §10.4 says the Sanctions Team runs the
   wildcard searches. The chart doesn't name an owner for step 02.
3. **Step order.** The framework describes the BIN update steps across §7.3, §7.4, §8.2 and §9.1
   but doesn't set their order. In particular it doesn't say where classification (§8.2) falls.
   The 01–08 order is a synthesis; confirm it with the control owner.
4. **Emergency timing.** The 2-hour commitment in §8.2 covers the *Register* update. §9.3 refers
   only to "defined timelines", so the framework doesn't say how quickly an emergency block is
   live in production. The chart only claims the 2-hour Register update.
5. **Escalation criteria for BIN declines.** §7.3.1 says escalation happens "if required" but
   doesn't define when. Hence "where required" on the chart.
6. **Roadmap dates are due or past.** Automation and identifier matching were targeted for
   H1 2026 (§10.3, §10.4), and local list integration for Q3 (§6.3). As of 28 Sep 2026 these are
   due or overdue. The roadmap is left off the chart. Confirm its status before adding a
   "target state" line.
7. **§5 Regulatory Basis wording.** If a regulatory line is added to the slide, don't take it
   from §5 as written. The OFSI reference links to a Google search redirect, not a gov.uk page,
   so confirm the document's title and URL before quoting it. And §5 presents failing to
   implement BIN blocks as the criminal offence. Under UK sanctions the offences are the
   prohibitions themselves: dealing with frozen funds, or making funds available to a designated
   person (for Russia, the Russia (Sanctions) (EU Exit) Regulations 2019, regs 11–15). BIN
   blocking is the control that prevents those breaches. *Not sourced from the framework: verify
   with Legal before relying on this.*
8. **Minor:** the incident mailbox's display text in §11 is broken ("checkout.co" followed by
   "m"). The link target is correct.

## Before external use

If the summit audience is external, decide on:

- **Vendor names** (LexisNexis, BINDB, Fircosoft Continuity). To make the chart generic, replace
  them with "screening data provider", "BIN data provider" and "screening engine".
- **Internal cadences and SLAs** (weekly cycle, fortnightly reconciliation, 2-hour Register update,
  1-hour incident notification).
- **Control maturity.** The chart doesn't show the manual nature of today's BIN generation
  (§7.4, §10.3) or the Medium-High residual risk rating (§6.2). The talk track shouldn't volunteer
  either without approval.
