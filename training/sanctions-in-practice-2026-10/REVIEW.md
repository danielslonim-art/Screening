# Trainer review: "Sanctions in Practice October 2026 — Regional Rules, Common Controls & Escalation"

| | |
|---|---|
| Reviewed | 12 October 2026 |
| Audience | Operations analysts (L1 screening and payments) |
| Original | 44-slide deck, shared via Drive |
| Output | `sanctions-in-practice-analyst-edition.pptx`: 18 core slides plus 2 appendix slides |
| Status | **AI-drafted. Needs Sanctions Officer sign-off before delivery** (CLAUDE.md §1) |

Slides are referred to by title, not number, because the original numbering may shift with edits.

---

## 1. Verdict

The deck is accurate in most places and honest about its limits. But it is a specialist briefing, not
analyst training. An analyst leaves knowing that six regions differ. They do not leave knowing what to
do differently on Monday.

What analysts need:

1. **Eight rules** that hold everywhere.
2. **One action path:** Hold → Check → Escalate → Write it down.
3. **Two cheat sheets** covering what actually changes by regime.
4. **Practice cases.**

The rebuild does exactly that and goes from 44 slides to 18. Before anyone presents either version, it
also fixes **ten accuracy and risk issues** (section 2).

---

## 2. Must-fix: accuracy and risk

Ranked by severity.

| # | Slide (original) | Problem | Fix (applied in the rebuild) |
|---|---|---|---|
| 1 | *Internal case example — anonymised* | The case is labelled anonymised but **names the merchant**. It also refers to law-enforcement engagement. If the deck circulates, that is a confidentiality breach and a tipping-off risk, and it breaks our own data-handling rule (CLAUDE.md §4). | Removed. If it is needed, re-anonymise it fully ("Merchant X") and clear it with the case owner and MLRO. |
| 2 | *Answer reveal — correct response: B* (insurance case) | The flow box reads **"Clear only if truly matched"**. That is the inverse of the rule. | Now reads "Clear only if shown **not** to be the listed person". |
| 3 | Whole deck | **UK strict liability is never mentioned.** It is the single most important UK nuance. Since 15 June 2022 OFSI can impose civil penalties without proving knowledge or suspicion (ECTEA 2022 s.54, amending PCA 2017 s.146). This applies to civil penalties only; criminal offences still need knowledge or reasonable cause to suspect. | Added to "Why this matters" and to the UK cheat-sheet card. |
| 4 | *How to avoid tipping off?* | Only the title is visible in the export. The most practical topic for analysts has no content. | New slide: do / don't wording for RFIs. Legal basis is POCA 2002 s.333A and TA 2000 s.21D. Customer messaging only through scripts approved by the Sanctions Officer or MLRO. |
| 5 | *Bank of Scotland / OFSI* (two slides) | **The lesson and the date are wrong.** The deck says automated screening failed. In fact a PEP alert did fire, and staff wrongly concluded the person had been delisted. The passport spelling also differed from the list entry, and there was no route for escalating PEP alerts to sanctions. The penalty was **imposed 10 Nov 2025** and **published 26 Jan 2026**. | Corrected. The real story is a better lesson for analysts: an alert fired and a person discounted it. |
| 6 | Whole deck | **The Citibank N.A. London penalty (£4.73m, imposed 11 Aug 2026) is missing.** It is OFSI's second-largest penalty, and every failure in it happened at operations level: <br>• the "PAO Sovcomflot" name variant generated no alert <br>• a backlog built up at third-level review <br>• guidance required proof of more than 50% ownership before restricting an account <br>• frozen-asset reports were up to 518 days late | Added to "Why this matters", "Spotting a real match" and Appendix B. |
| 7 | *UK: ownership/control and reporting* | "A rejected payment is not treated like frozen assets" can be read as "reject means no report". Under reg 70 of the Russia Regs, the duty to report is triggered by knowledge or reasonable cause to suspect, whatever happened to the money. | Rewritten on the "Freeze, block, reject" slide. Also added: **never return funds to a designated person**, because returning them is itself making funds available. |
| 8 | *Regional comparison* table, ownership row | Entries such as "Increasingly explicit" and "Expected in FI controls" give an analyst nothing to act on. The thresholds are never set side by side. The real differences: <br>• **UK** is the odd one out: more than 50%, and stakes held by *different* designated persons are not added together. <br>• **EU** (Best Practices ST 11623/24, July 2024) and **US** (OFAC 50% Rule): 50% or more, with stakes added together. | New ownership slide: one company, with US, EU and UK answers side by side. The instruction is the same for all three: "you don't do the maths — escalate". |
| 9 | *MENA* slides | The source cited is the **ADGM Rulebook**, which binds only ADGM-licensed firms. The UAE-wide sources are: <br>• Cabinet Decision 74/2020 <br>• EOCN guidance <br>• Decree-Law 10/2025, which repealed Decree-Law 20/2018 <br>Also missing: the UAE Local Terrorist List; CNMR/PNMR filing within 5 business days; and the rule that a suspended partial match **stays suspended until EOCN instructs**. | Corrected on Cheat sheet 2. Still open: confirm which UAE supervisor (CBUAE, DFSA or FSRA) covers the Checkout entity. |
| 10 | *Singapore* slides | Instrument names are out of date: <br>• The MAS Act regulations are now the FSM (Sanctions and Freezing of Assets of Persons) Regulations 2023. <br>• The March 2022 Russia notice SNR-N01 was replaced on 30 June 2025 (amended Feb 2026). It names four banks plus the entities they own or control, and adds a lending ban. | Corrected on Cheat sheet 2. |

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
  L1 → L2 → L3 model and the DoA. The rebuild has an explicit "your call / not your call" box.
- ***Operating model*.** The second step has no label (presumably the 4-eye or manager review).
- ***The differences that change the case outcome*.** "Legal reach" lists the UK, Singapore and MENA but
  leaves out the US, which has the broadest extraterritorial reach.
- **AML cases.** The MAS S$27.45m case and the Banque Misr UAE s.311 action are presented as regional
  "real-life cases". Both are **AML, not sanctions**, and Banque Misr is a *proposed* rule. A s.311
  target will not appear in SDN screening. Both moved to the facilitator appendix with that caveat.

---

## 3. Simplify: what happened to each original slide

| Original | Rebuild |
|---|---|
| Title / Why do we care | **1** Title · **2** Why this matters (strict liability, Citibank, Bank of Scotland) |
| Learning objectives | Cut. Replaced by **3** Eight rules |
| Common control model · First response / triage · Operating model · Analyst decision checklist | Merged into **4** An alert hits: Hold → Check → Escalate (with the analyst lane and escalation path) |
| What counts as a sanctions exposure? | **5** Four ways a payment can be exposed (kept, with an example on each) |
| Transaction screening divider · Regional lens overview | Cut |
| MENA ×2 ("apply every layer") | The layer model moves up front as **6** Which rules apply? It is the organising idea for every region, not just MENA. The UAE becomes a card on **8** |
| UK ×2 · France ×2 · US ×2 · Regional comparison ×2 | **7** Cheat sheet 1 (UK, EU/France, US) · **9** Ownership and control · **10** Freeze, block, reject |
| Singapore ×2 · Hong Kong ×2 | **8** Cheat sheet 2 (UAE, Singapore, Hong Kong) |
| Tipping off (empty) | **11** Asking for information without tipping off (new content) |
| (new) | **12** Spotting a real match: legal-form prefixes, transliteration, aliases. Both UK penalties were name-variant failures |
| Case studies 01–03 · insurance practice case (3 slides) | **13–14** Practice: two cases per slide, each in the same format (alert → do this → the trap → rules) |
| Atlas Bridge exercise (9 slides) | **15** Team exercise · **16** Answer and team handoffs |
| Joined case note · Defensible case note | **17** The case note: six lines a stranger could follow |
| Close · Thank you | **18** If you remember nothing else |
| Banque Misr ×2 · MAS ×2 · Bittrex · control maturity ladder · HK LegCo 2019 · internal merchant case | Appendix B (one line each) or cut. Dual-use / SBDU content is cut as out of scope for payment analysts |
| (new) | Appendix A: Acronyms. The original uses about 15 acronyms without defining them |

**Design rules applied:**

- One message per slide.
- The same four "signal" icons (Hold, Check, Escalate, Write it down) on every slide.
- Every regime card answers the same four questions in the same order: *lists, owned when, who's told,
  remember*.
- Every case uses the same format.
- Each slide carries a short source line. Trainer narration and background are in the speaker notes.

---

## 4. Kept from the original, because it works

- The Pause / Investigate / Escalate triage and "do not release while material uncertainty remains".
- The four exposure types.
- "Apply every layer": local law → group policy → partner rules → product rules.
- Case studies 01–03 and the insurance case. "Merchant comfort is not evidence" is the best line in the
  deck.
- The Atlas Bridge exercise. It is good, just long.
- Honest labelling of proposed versus final actions, and "USD ≠ automatic OFAC".

---

## 5. Verification status

Two independent fact-checks ran on 12 October 2026.

**Limitation:** primary-source pages could not be opened directly from this environment because of a DNS
failure on fetch. Every finding was confirmed against search extracts of the primary pages plus law-firm
commentary. **Before delivery, a human should open the primary documents** for anything marked ⚠.

| Claim in the rebuild | Status | Source |
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
4. **Confirm the analyst lane:**
   - Can L1 close an evidenced false positive, and with what 4-eye check?
   - How many identifiers does the procedure require?
   - Is there an RFI template?
   - What is the escalation SLA?
5. **Bank of Scotland lesson.** Check that our procedure routes PEP alerts with a possible sanctions link
   to the sanctions team. The missing route was one of the failures OFSI identified at Bank of Scotland.
   This is a controls point, not a training point.
6. **Screening feed.** Confirm with the screening controls team that the feed has moved from the OFSI
   Consolidated List to the UK Sanctions List.
7. **The internal merchant case.** Decide whether it returns in any form, fully anonymised and cleared.

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
