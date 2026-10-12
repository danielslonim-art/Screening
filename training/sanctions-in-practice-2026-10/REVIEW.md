# Trainer review: "Sanctions in Practice October 2026 — Regional Rules, Common Controls & Escalation"

| | |
|---|---|
| Reviewed | 12 October 2026 |
| Audience | Operations analysts (L1 screening and payments) |
| Original | 44-slide deck, shared via Drive |
| Output | `sanctions-in-practice-analyst-edition.pptx`: 32 core slides plus 2 appendix slides, in the original's tone: four teaching parts plus a hands-on section. One slide per sanctions regime; every slide answers "in short / why it matters / what it means for you"; transitions and click-reveal builds |
| Status | **AI-drafted. Needs Sanctions Officer sign-off before delivery** (CLAUDE.md §1) |

Slides are referred to by title, not number, because the original numbering may shift with edits.

## Content standard: three questions on every slide

Every piece of information on a slide has to earn its place by answering three questions for the analyst:

1. **In short:** what are we telling you, in very simple terms? This is a plain-English line directly
   under every headline.
2. **Why it matters:** why should you care? This sits in the band at the foot of every content slide.
3. **What it means for you:** what do you do with this in our process? This also sits in the foot band,
   and it names the process step or tool: the Firco queue, the 4-eye check, the L2 path, Orbis, the RFI
   template, the Country Risk Rating and HRTC registers, TM / EDR referral.

Where the questions appear:

- **Content slides:** all three, as above.
- **Part openers:** "Why it matters" and "What it means for you" columns.
- **Appendix B:** a "What it means for you" column.
- **Learning objectives and the close:** the whole session in one sentence:

> **If in doubt, don't let it go: stop the payment, check who is really behind it and every country it
> touches, pass anything unclear to L2 — and write down why.**

If a fact on a slide cannot answer "why should I care?" and "what does it mean for me in our process?",
it moves to the speaker notes or the facilitator appendix.

---

## 1. Verdict

The original is accurate in most places and honest about its limits. It also has a good narrative arc:
four connected capabilities, and a clear theme for each section. The problems are length and depth. At
44 slides it carries specialist detail an analyst does not need. The regional sections describe each
regime without saying what changes in the analyst's decision.

The analyst edition keeps the original's tone, structure and flow, and condenses it:

1. **Same roadmap.** The original's four capabilities run through the whole deck: understand the model,
   compare the regions, apply the indicators, record the decision.
2. **Themed part openers.** Each part opens with:
   - its theme
   - where it sits in our current process
   - a question to keep in mind

   It then hands over to the next part.
3. **One slide per regime:** MENA, Singapore, Hong Kong, UK, France / EU and US, in the original's order and on a common template, followed by one side-by-side comparison.
4. **A dedicated hands-on section (Part 5)** brings the practice together:
   - case studies 01–04
   - six new regime scenarios, one per regime, so the practice tests Part 2 directly
   - the Atlas Bridge exercise

   Every answer stays hidden until the room has decided.

The result is 32 core slides instead of 44. Before anyone presents either version, the edition also fixes
**ten accuracy and risk issues** (section 2).

---

## 2. Must-fix: accuracy and risk

Ranked by severity.

| # | Slide (original) | Problem | Fix (applied in the analyst edition) |
|---|---|---|---|
| 1 | *Internal case example — anonymised* | The case is labelled anonymised but **names the merchant**. It also refers to law-enforcement engagement. If the deck circulates, that is a confidentiality breach and a tipping-off risk, and it breaks our own data-handling rule (CLAUDE.md §4). | Removed. If it is needed, re-anonymise it fully ("Merchant X") and clear it with the case owner and MLRO. |
| 2 | *Answer reveal — correct response: B* (insurance case) | The flow box reads **"Clear only if truly matched"**. That is the inverse of the rule. | Now reads "Clear only if shown **not** to be the listed person". |
| 3 | Whole deck | **UK strict liability is never mentioned.** It is the single most important UK nuance. Since 15 June 2022 OFSI can impose civil penalties without proving knowledge or suspicion (ECTEA 2022 s.54, amending PCA 2017 s.146). This applies to civil penalties only; criminal offences still need knowledge or reasonable cause to suspect. | Added to "Why do we care?" and to the UK regime slide. |
| 4 | *How to avoid tipping off?* | Only the title is visible in the export. The most practical topic for analysts has no content. | New slide: do / don't wording for RFIs. Legal basis is POCA 2002 s.333A and TA 2000 s.21D. Customer messaging only through scripts approved by the Sanctions Officer or MLRO. |
| 5 | *Bank of Scotland / OFSI* (two slides) | **The lesson and the date are wrong.** The deck says automated screening failed. In fact a PEP alert did fire, and staff wrongly concluded the person had been delisted. The passport spelling also differed from the list entry, and there was no route for escalating PEP alerts to sanctions. The penalty was **imposed 10 Nov 2025** and **published 26 Jan 2026**. | Corrected. The real story is a better lesson for analysts: an alert fired and a person discounted it. |
| 6 | Whole deck | **The Citibank N.A. London penalty (£4.73m, imposed 11 Aug 2026) is missing.** It is OFSI's second-largest penalty, and every failure in it happened at operations level: <br>• the "PAO Sovcomflot" name variant generated no alert <br>• a backlog built up at third-level review <br>• guidance required proof of more than 50% ownership before restricting an account <br>• frozen-asset reports were up to 518 days late | Added to "Why do we care?", "Name variants" and Appendix B. |
| 7 | *UK: ownership/control and reporting* | "A rejected payment is not treated like frozen assets" can be read as "reject means no report". Under reg 70 of the Russia Regs, the duty to report is triggered by knowledge or reasonable cause to suspect, whatever happened to the money. | Rewritten on the "Freeze, block, reject" slide. Also added: **never return funds to a designated person**, because returning them is itself making funds available. |
| 8 | *Regional comparison* table, ownership row | Entries such as "Increasingly explicit" and "Expected in FI controls" give an analyst nothing to act on. The thresholds are never set side by side. The real differences: <br>• **UK** is the odd one out: more than 50%, and stakes held by *different* designated persons are not added together. <br>• **EU** (Best Practices ST 11623/24, July 2024) and **US** (OFAC 50% Rule): 50% or more, with stakes added together. | New ownership slide: one company, with US, EU and UK answers side by side. The decision principle is the same for all three: do not rely on a single percentage threshold — escalate. |
| 9 | *MENA* slides | The source cited is the **ADGM Rulebook**, which binds only ADGM-licensed firms. The UAE-wide sources are: <br>• Cabinet Decision 74/2020 <br>• EOCN guidance <br>• Decree-Law 10/2025, which repealed Decree-Law 20/2018 <br>Also missing: the UAE Local Terrorist List; CNMR/PNMR filing within 5 business days; and the rule that a suspended partial match **stays suspended until EOCN instructs**. | Corrected on the MENA regime slide. Still open: confirm which UAE supervisor (CBUAE, DFSA or FSRA) covers the Checkout entity. |
| 10 | *Singapore* slides | Instrument names are out of date: <br>• The MAS Act regulations are now the FSM (Sanctions and Freezing of Assets of Persons) Regulations 2023. <br>• The March 2022 Russia notice SNR-N01 was replaced on 30 June 2025 (amended Feb 2026). It names four banks plus the entities they own or control, and adds a lending ban. | Corrected on the Singapore regime slide. |

Smaller issues, also fixed:

- **"The former OFSI Consolidated List has closed".** The list stays online but gets no new names. Any
  screening feed still reading it silently misses designations made after 28 January 2026. This is a
  question for the screening controls team, not the training: confirm the vendor feed.
- **EU reporting.** Reg 269/2014 Art 8 now says "within two weeks", not "immediately". The French freeze
  report (CMF L562-4) is still immediate, and the freeze itself is always immediate.
- **France.** The national freeze register contains names that are not on the EU list. Screening against
  the EU list alone misses them.
- **Analyst lane.** *Common control model* ("Decide: hold / reject or freeze, licence review") and the
  *Analyst decision checklist* list freeze, licence and report as analyst actions. That contradicts the
  L1 → L2 → L3 model and the DoA. The analyst edition separates "The analyst's decision (L1)" from "Reserved for L2 / L3".
- ***Operating model*.** The second step has no label (presumably the 4-eye or manager review).
- ***The differences that change the case outcome*.** "Legal reach" lists the UK, Singapore and MENA but
  leaves out the US, which has the broadest extraterritorial reach.
- **AML cases.** The MAS S$27.45m case and the Banque Misr UAE s.311 action are presented as regional
  "real-life cases". Both are **AML, not sanctions**, and Banque Misr is a *proposed* rule. A s.311
  target will not appear in SDN screening. Both moved to the facilitator appendix with that caveat.

---

## 3. Condense: what happened to each original slide

| Original | Analyst edition |
|---|---|
| Title · Why do we care? | **1** Title. Same strapline, "A decision discipline, not a list-check", and the same "one payment, six rulebooks" image. <br>**2** Agenda (new): each section, what it covers, its format (briefing, walk-through, practice with votes, Q&A) and its slide range <br>**3** Why do we care? Covers strict liability, Citibank and Bank of Scotland |
| Learning objectives | **4** Learning objectives. Kept, and now the spine of the deck: four teaching parts, each with its own opener (**5**, **9**, **20**, **23**), then the hands-on section (**25**) |
| Common control model · What counts as a sanctions exposure? · First response / triage · Operating model · Analyst decision checklist | **Part 1:** <br>**6** Eight principles <br>**7** What counts as a sanctions exposure? <br>**8** First response to a potential true match, with the analyst / L2–L3 boundary and the escalation path |
| Transaction screening divider · Regional lens overview | Replaced by the part openers |
| MENA ×2 · Singapore ×2 · Hong Kong ×2 · UK ×2 · France ×2 · US ×2 · Regional comparison ×2 | **Part 2:** <br>**10** Which rules apply? ("Apply every layer", moved up from the MENA slide) <br>**11–16** One slide per regime, in the original's order: MENA, Singapore, Hong Kong, UK, France / EU, US. The two original slides per regime become one, and each regime's real-life case moves onto its own slide <br>**17** Six regimes side by side: the original comparison table, with every cell made actionable <br>**18** Ownership and control <br>**19** Freeze, block and reject |
| Tipping off (title only) · name variants (new) | **Part 3:** <br>**21** Name variants <br>**22** How to avoid tipping off |
| Joined case note · Defensible case note | **Part 4:** **24** The defensible case note |
| Case studies 01–03 · insurance practice case | **Part 5 (hands-on):** **26–27** Case studies, two per slide, in the original's Alert / Decision / Record format |
| (new) | **Part 5 (hands-on):** **28–29** Regime scenarios 05–10, one per regime: <br>• an unresolved UAE partial match <br>• a Singapore payout to a company owned by a named Russian bank <br>• a Hong Kong name in Chinese characters <br>• a UK company with two designated owners at 40% and 20% <br>• a French payment not checked against the national register <br>• a EUR payout with Crimea IP addresses and a US settlement bank |
| Atlas Bridge exercise (9 slides) | **Part 5 (hands-on):** <br>**30** Three teams, one risk picture <br>**31** Choose C — the risks converge |
| Close · Thank you | **32** Key takeaways: one per part, plus the thank-you |
| Banque Misr ×2 · MAS ×2 · Bittrex · control maturity ladder · HK LegCo 2019 · internal merchant case | Appendix B (one line each) or cut. Dual-use / SBDU content is cut as out of scope for payment analysts |
| (new) | Appendix A: Acronyms. The original uses about 15 acronyms without defining them |

**How the original's tone and flow are kept:**

- **The three questions.** Every content slide follows the content standard above: an "In short" line
  under the headline, and a "Why it matters / What it means for you" band at the foot.

- **Labels and headlines.** Every slide keeps the original's uppercase label, now prefixed with its part
  (e.g. "PART 2 · REGIONAL COMPARISON"). Headlines are full sentences or the original's own titles.
- **Wording.** Body text is in complete sentences and reuses the original's wording wherever it already
  worked.
- **Callout labels.** The original's labels are kept: Lesson for analysts, Key principle, Decision
  principle, Pause & vote, Facilitator, Answer reveal.
- **Part openers.** Each part opener carries the direction:
  - the theme
  - a hand-over from the previous part
  - "In this part"
  - "In your process": the Firco queue, the 4-eye check, the L2 path, Orbis, the RFI template, the Country
    Risk Rating and HRTC registers, and TM / EDR referral
  - "Ask yourself"

  A progress bar on each opener shows where the session is.
- **Process prompts on content slides.** Content slides also point back to the process where it matters,
  for example "In your process: confirm the legal entity, payment route and currency from the case
  record."
- **Regime slides.** Every regime uses the same template, so analysts know where to look:
  - **The rulebook:** lists to screen, who is in charge, ownership / control, required action, and who
    is told (via L2).
  - **Watch for:** the traps specific to that regime.
  - **A real-life lesson.**
  - **Wayfinding:** a row of six regime markers shows which regime you are on.
- **Comparison slide.** The side-by-side slide uses the same rows as the original comparison table, with
  every cell made actionable.
- **Unverified points.** Where a point could not be verified (for example, the Saudi list detail, or an
  ownership threshold in MENA, Singapore or Hong Kong), the slide says "L2 assesses" rather than
  asserting it.
- **Sources and notes.** Each slide has a source line. Trainer narration and the bridges between parts
  are in the speaker notes.

**Animation and transitions:**

- **Transitions.** Every slide has a fade. Part openers push up, to mark each new part.
- **Click to reveal**, used where the original asks the room to vote or predict first:
  - **Case studies:** the Decision and Record boxes, one case per click.
  - **Regime scenarios:** the "What you do" answer for each scenario, one per click.
  - **Team exercise:** each evidence drop, then the vote.
  - **Ownership slide:** the US, EU and UK answers, one per click.
- **Automatic fade-ins** that set the pace without extra clicks:
  - the agenda rows, the four capabilities on the roadmap, and the five parts on the close
  - the columns on each part opener
  - Pause → Investigate → Escalate
  - the process steps on the freeze slide
  - each regime's "Watch for" and lesson boxes
  - the team handoffs on the answer slide
- **Static by design.** The "In short" line and the "Why it matters / What it means for you" band never
  animate, so the message is always on screen.

---

## 4. Kept from the original, because it works

- **The four-capability structure.** It now carries the whole deck.
- **The measured tone**, including "a decision discipline, not a list-check" and "regional rules differ;
  the control objective is constant".
- **The core triage.** Pause / Investigate / Escalate, and "do not release while material uncertainty
  remains".
- **The four exposure types**, and "apply every layer": local law → group policy → partner rules →
  product rules.
- **The cases.** Case studies 01–03 and the insurance case. "Merchant comfort is a commercial view, not
  evidence" is the best line in the deck.
- **The Atlas Bridge exercise.** It is good, just long.
- **Honest labelling** of proposed versus final actions, and "Do not reduce US analysis to 'USD =
  automatic OFAC'".

---

## 5. Verification status

Two independent fact-checks ran on 12 October 2026.

**Limitation:** primary-source pages could not be opened directly from this environment because of a DNS
failure on fetch. Every finding was confirmed against search extracts of the primary pages plus law-firm
commentary. **Before delivery, a human should open the primary documents** for anything marked ⚠.

| Claim in the analyst edition | Status | Source |
|---|---|---|
| UK Sanctions List is the only source from 28 Jan 2026 | Verified | gov.uk, "Moving to a single list…" |
| UK strict liability from 15 Jun 2022 (civil penalties only) | Verified | ECTEA 2022 s.54; SI 2022/638 |
| Citibank £4,732,830.58, imposed 11 Aug 2026; failure themes | Verified ⚠ (themes from secondary sources) | OFSI penalty notice; DWF, Duane Morris |
| Bank of Scotland £160,000, imposed 10 Nov 2025, published 26 Jan 2026; PEP alert discounted | Verified ⚠ | OFSI notice; OFSI blog 23 Feb 2026 |
| UK reporting: reg 70, "as soon as practicable", triggered by knowledge or reasonable cause to suspect | Verified ⚠ | Russia Regs 2019 reg 70 ("relevant firm" is defined in reg 71) |
| UK: more than 50%; different designated persons' stakes not added together (unless held jointly or one controls the other) | Verified | Reg 7; OFSI General Guidance (ownership and control). The Feb 2026 call for evidence on changing the test brought no change yet |
| EU: 50% or more; stakes added together; CJEU C-84/24 (Mar 2026) makes 50% a rebuttable presumption of control | Partly ⚠ (para 63 wording seen only in commentary) | Best Practices ST 11623/24; Commission asset-freeze FAQ |
| EU Art 8 reporting "within two weeks"; France L562-4 "immediately"; TRACFIN separate (L561-15) | Verified ⚠ (amending act not identified) | Reg 269/2014 consolidated text; CMF |
| French register contains national-only names | Verified | DG Trésor register FAQ |
| OFAC: blocked and rejected reports within 10 business days; 50% Rule, stakes added together | Verified | 31 CFR 501.603–604; OFAC 2014 guidance |
| Bittrex $24,280,829.20, 11 Oct 2022 | Verified | OFAC enforcement release |
| Banque Misr UAE: s.311 NPRM 28 Aug 2026; UAE branches only; not final | Verified | 91 FR 56085; FinCEN |
| UAE: freeze within 24h; CNMR/PNMR within 5 business days; PNMR suspension until EOCN instructs | Verified | EOCN guidance; CBUAE Rulebook |
| SAMA TFS Rules, 7 Dec 2025, in force | Verified | SAMA Rulebook |
| Singapore FSM Regs 2023; SNR-N01 (30 Jun 2025, amended Feb 2026); report to MAS immediately, STR to STRO | Verified ⚠ | MAS; Singapore Statutes Online; SPF |
| MAS S$27.45m, nine FIs, 4 Jul 2025 (AML) | Verified | MAS enforcement release |
| Hong Kong: Cap. 537, Cap. 575 s.12 → JFIU; no unilateral sanctions | Verified | elegislation.gov.hk; HKMA circular, Aug 2020 |
| OFSI position on telling a customer their funds are frozen | **Not verified**. Left off the deck | — |

---

## 6. Before go-live (owner actions)

1. **Sign-off.** The Sanctions Officer approves the wording. Legal checks the customer-messaging line on
   the tipping-off slide.
2. **Cite the procedure.** Replace every "(cite section)" with the section number from the Global
   Sanctions Reporting Procedure (CLAUDE.md §2).
3. **Confirm scope:**
   - Which Checkout entities are in scope (UK, France, UAE, Singapore, Hong Kong, US).
   - Whether Saudi Arabia belongs in the deck at all. Add a card only if a Checkout entity or product is
     supervised by SAMA.
   - Which UAE supervisor applies.
4. **Confirm the process references.** The tools named under "In your process" were taken from the
   original deck: Firco, Orbis, the RFI template, the Country Risk Rating and HRTC registers, and the
   UAR. Check that they match current procedure.
5. **Confirm the analyst lane:**
   - Can L1 close an evidenced false positive, and with what 4-eye check?
   - How many identifiers does the procedure require?
   - Is there an RFI template?
   - What is the escalation SLA?
6. **Bank of Scotland lesson.** Check that our procedure routes PEP alerts with a possible sanctions link
   to the sanctions team. The missing route was one of the failures OFSI identified at Bank of Scotland.
   This is a controls point, not a training point.
7. **Screening feed.** Confirm with the screening controls team that the feed has moved from the OFSI
   Consolidated List to the UK Sanctions List.
8. **The internal merchant case.** Decide whether it returns in any form, fully anonymised and cleared.

---

## 7. Related finding in this repository (not changed)

`.claude/skills/ownership-and-control/SKILL.md`, Step 2, tells agents to *"aggregate holdings across
designated persons"* under the UK test. Both fact-checks found that OFSI does **not** aggregate the
holdings of different designated persons, unless they hold jointly or one controls the other's rights.
OFSI's February 2026 call for evidence considered changing this, but nothing has changed.

The skill is over-inclusive, so it is not a breach risk, but it misstates UK law. It also contradicts
the new training slide. The skill should separate the UK rule from the EU and US rules. Whether to keep
the more conservative approach as house policy is a decision for the Sanctions Officer and Legal. The
skill was **not edited**, because a skill edit is a control change that needs review.
