# OFSI Monetary Penalty — Citibank, N.A., London Branch (August 2026)

**Sanctions compliance analysis and lessons for a global PSP**

Prepared: 15 September 2026

> **Sourcing caveat.** The primary penalty notice on GOV.UK could not be retrieved directly from this
> environment (outbound access to `gov.uk` is blocked by the network egress policy). The factual account
> below is assembled from search results and secondary legal/compliance reporting. Every figure should be
> validated against the primary notice before external use:
> `https://www.gov.uk/government/publications/imposition-of-monetary-penalty-citibank-na-london-branch`

---

## 1. Headline

| Item | Detail |
|---|---|
| Subject | Citibank, N.A., London Branch ("CBNA London") |
| Regulator | Office of Financial Sanctions Implementation (OFSI), HM Treasury |
| Penalty imposed | **£4,732,830.58** |
| Date imposed | 11 August 2026 (published early September 2026) |
| Legal basis | s.146 Policing and Crime Act 2017; Russia (Sanctions) (EU Exit) Regulations 2019 |
| Conduct | **970 payments**, aggregate value **£19,720,127.32** |
| Period | Majority February – November 2022 |
| Baseline penalty | £7,888,050.97, reduced 40% |
| Severity | Assessed at the top of OFSI's seriousness framework — a "serious" case |
| Ranking | **OFSI's second-largest penalty ever**, behind Standard Chartered (£20.47m, 2020); the largest since the February 2022 Russia designations |

---

## 2. What happened

CBNA London processed payments for, and failed to restrict accounts connected to, parties designated
under the UK Russia regime in the months following the February 2022 invasion. The affected
counterparties included the state shipping company **PJSC Sovcomflot**, and the designated banks
**Alfa-Bank**, **PJSC Gazprombank** and **Credit Bank of Moscow**, plus a group of companies
owned or controlled by a single designated individual.

What makes this case instructive is that OFSI did not find a missing control. It found a **mature
sanctions programme that failed operationally in five distinct, independently fixable ways**.

### 2.1 Screening name-variant gap — the "PAO" failure

CBNA London's KYC record for the entity read **"PAO Sovcomflot"**. The UK Consolidated List entry read
**"Sovcomflot"**. The screening engine's fuzzy-matching calibration treated the two strings as materially
different and **generated no alert at all**.

Consequence: **32 accounts left unrestricted, 328 transactions, c. £5.4 million.**

Three characters of a Russian legal-form prefix (PAO / ПАО — *publichnoye aktsionernoye obshchestvo*,
the public joint-stock company designator) defeated the control. This is a calibration and
normalisation defect, not a tooling gap.

### 2.2 Ownership and control assessment failures

CBNA London did not promptly restrict **24 commercial accounts belonging to 11 companies** owned or
controlled by one designated Russian individual. Roughly **242 payments (c. US$8 million)** were
processed after designation. OFSI found at least one **incorrect ownership assessment** and that
**some subsidiaries were missed entirely**.

### 2.3 An internal guidance change that quietly loosened a control

The bank revised internal guidance so that staff needed to request account restrictions **only where
they held affirmative evidence** that an entity was majority-owned by a designated person — replacing a
posture of restricting accounts with a *potential* association. OFSI's finding was blunt: the change
**increased both the number of accounts left unrestricted and the length of time they stayed that way**.

This is the most transferable finding in the notice. The change would have read as a reasonable
false-positive reduction measure in a change-control paper. Under a strict-liability regime it inverted
the burden of proof in the wrong direction.

### 2.4 Alert backlog at third-level review

High volumes of potential matches requiring manual adjudication created a **backlog at the third review
level**. Alerts sat unresolved **for weeks**. Internal communications flagging issues were **not acted
on promptly**. The February 2022 designation surge produced an inflow that outran adjudication capacity,
and the overflow converted directly into processed payments.

### 2.5 Individual human error

Discrete staff errors across payment processing, correspondent banking and account restriction —
individually minor, but multiplied across hundreds of transactions.

---

## 3. The result — how OFSI got to £4.73m

**Baseline: £7,888,050.97**, driven by aggravating factors:

- high aggregate value (£19.7m) and high volume (970 payments);
- the **strategic importance** of the Russia regime as a foreign-policy instrument;
- **screening systems not commensurate with the branch's sanctions exposure**;
- **repeated** failures across multiple business lines;
- **delayed reporting** to OFSI.

**Discounts: 40% total**

| Credit | Applied | Available |
|---|---|---|
| Voluntary disclosure + co-operation | **20%** | 30% |
| Early settlement (within the settlement window) | 20% | 20% |

The bank lost a third of the disclosure credit because, while it self-reported most of the conduct,
it **had not identified c. £6.9 million of the breaching payments until OFSI began asking questions**.
An incomplete self-report is a discounted self-report.

**What was expressly *not* mitigation**

OFSI accepted there was **no intent** to breach and **no attempt to circumvent** the regime — and stated
that these absences **carried no mitigating weight**. The branch "knew or should have known" that its
conduct could give rise to contraventions, and several of the control weaknesses were
**"reasonably foreseeable"** given its Russia exposure.

**Settlement cost**: by settling, CBNA London waived its rights to **ministerial review** and to
**judicial challenge**. Remediation undertaken by the bank was credited.

---

## 4. Why this matters now

OFSI refreshed its enforcement and monetary penalties guidance in **February 2026**, introducing a
graduated case-severity framework and signalling greater enforcement appetite. Citibank is the first
large-institution penalty published under the sharper framework, and the pattern is clear: OFSI is now
willing to dissect *operational* execution — threshold calibration, queue management, internal guidance
version history — rather than confining itself to whether a control existed on paper.

---

## 5. Lessons for Checkout.com as a global PSP

Checkout's risk profile differs from a correspondent bank's in ways that make several of these findings
*more* acute, not less: near-real-time authorisation, fast payouts, merchant and sub-merchant
intermediation, multi-entity licensing across the UK/EU, and dependence on partner-bank rails.

### 5.1 Fix name normalisation before you tune anything else

The Sovcomflot failure is directly reproducible in any PSP's merchant and payout screening.

- Build a **legal-form token equivalence layer** that normalises corporate designators *before* matching:
  PAO / ПАО / OAO / OJSC / PJSC / ZAO / AO / TOO / OOO / LLC / JSC and the Cyrillic originals. Stripping
  or mapping these must not be left to the vendor's default fuzzy threshold.
- Handle **transliteration variance** as a first-class case (Sovcomflot / Sovkomflot; Gazprombank /
  Gazprom Bank; Alfa / Alpha). Latin-script transliteration of Cyrillic, Arabic and Chinese names is the
  dominant recall failure mode in list screening.
- Screen against the **full alias set** in the UK Consolidated List, not the primary name — and note that
  the list's primary name frequently *omits* the legal-form prefix your merchant record carries.
- Match on **identifiers as well as names**: registration numbers, LEI, IMO numbers for vessels, addresses,
  DOBs. Name-only matching is the weakest configuration available.

### 5.2 Assure screening *recall*, not alert volume

OFSI penalised calibration, not absence of a tool. A programme that reports "alerts generated" and
"false-positive rate" has no measurement of the failure that actually happened here.

- Stand up a **screening assurance capability**: seed the estate with synthetic records for real
  designated parties under deliberately awkward name variants, run them through production screening on a
  schedule, and **measure recall**.
- Treat every threshold change, list-load change, vendor model update and normalisation rule change as
  requiring a **regression test** against a maintained adversarial name corpus.
- Report recall to the board alongside volume. A falling alert count is as likely to be a broken control
  as an improving one.

### 5.3 Ownership and control is the hardest problem — treat it as a graph, not a field

The UK 50%-plus-ownership test and the broader Regulation 7 "control" test are where PSPs are most
exposed, because merchant UBO data is collected once at onboarding and then decays.

- Maintain merchant → shareholder → parent → UBO relationships as a **traversable graph**, including
  sub-merchants and marketplace sellers, so that a **new designation can be propagated across the entire
  book** rather than only matched against direct names.
- Make every **designation event a trigger for re-assessment of the whole portfolio**, not just a
  forward-looking screening list update. Citi's 11-company, 24-account failure was a propagation failure.
- Set a **refresh cadence for ownership data** on higher-risk merchants, and treat stale UBO data as a
  control deficiency with an owner and a due date.
- Track **aggregated indirect holdings** — several sub-50% stakes held by designated persons can
  combine past the threshold.

### 5.4 Never relax a sanctions control without a documented impact assessment

This is the single most portable lesson. Checkout's equivalents of Citi's guidance change are:
alert auto-clear rules, "good guy" / whitelist lists, screening thresholds, hit-disposition playbooks,
risk-based exemptions for low-value transactions, and the evidentiary bar for holding a payout.

- Require **named sanctions-officer sign-off** on any change that could reduce detection or delay
  restriction, supported by a written sanctions impact assessment.
- Keep **versioned, auditable change records** with pre- and post-change metrics. OFSI reconstructed
  Citi's guidance history; assume yours will be reconstructed too.
- Where ownership or identity is **uncertain, the strict-liability default is to hold, not to release**.
  "We lacked affirmative evidence" is not a defence. If holding creates commercial or contractual
  difficulty, that is what OFSI licences and the OFSI enquiries channel exist for.

### 5.5 Backlogs are breaches — engineer for the surge

For a bank, a two-week alert backlog is a queue problem. For a PSP running real-time authorisation and
same-day payouts, it is a pipeline of completed contraventions.

- Set **hard, tiered SLAs** on alert adjudication, and instrument the **age distribution** of the queue,
  not just its depth. Depth hides ageing.
- Default to **automatic hold of funds when an alert breaches SLA**, rather than letting the payment or
  payout complete while the alert waits. Capacity failures should fail closed.
- Build a **designation-surge playbook**: pre-agreed escalation, trained surge reviewers,
  pre-approved temporary tightening of auto-clear rules, and a defined path to throttle affected
  corridors. February 2022 will happen again in another geography.
- Treat **sustained backlog growth as an escalation trigger** in its own right, reportable to the
  Sanctions Officer and the board risk committee.

### 5.6 Give internal escalation teeth

OFSI specifically noted internal communications that were not acted on promptly. An email raising a
sanctions concern must become a **tracked item with a named owner, a deadline and an audit trail**.
Informal escalation that dies in an inbox is an aggravating factor waiting to be discovered.

### 5.7 If you self-disclose, disclose completely and early

Citi surrendered 10 of the 30 available percentage points because OFSI found breaches the bank had not.

- When a breach is identified, **scope the look-back wider than the trigger**: all entities, all products
  (acquiring, payouts, FX, treasury), all corridors, the full designation period.
- Report to OFSI **as soon as practicable** — delayed reporting was an explicit aggravating factor, and
  for relevant firms the reporting obligation is a standalone legal duty, not a strategic choice.
- **Supplement the disclosure promptly** as the investigation widens. A voluntary disclosure that OFSI has
  to correct stops functioning as mitigation.
- Decide the **settlement question early with external counsel**: settlement buys 20% but waives
  ministerial and judicial review.

### 5.8 Calibrate investment to exposure, and be able to evidence it

The finding that weaknesses were "reasonably foreseeable" given the branch's Russia exposure is the
standard Checkout will be held to.

- Maintain a documented **sanctions exposure map**: merchants, corridors, currencies, partner banks,
  correspondent and settlement relationships, and card-scheme flows touching high-risk jurisdictions.
- Be able to show that **control investment tracks that map**, and that it was uplifted when exposure
  changed. This is the artefact that converts a "reasonably foreseeable" finding into a defensible one.

### 5.9 Multi-entity licensing does not aggregate away local obligations

A US bank's London branch was penalised by a UK regulator for UK-nexus payments. Group-level screening
run from a single hub does **not** discharge each licensed entity's local duties.

- Confirm **list coverage per entity**: the UK Consolidated List, the EU list and OFAC's SDN list are not
  interchangeable, and a UK entity must screen the UK list.
- Document, per regulated entity, **who owns the sanctions obligation, which lists apply, and which
  regulator's reporting duty is triggered** by a given breach.
- Verify that any **outsourced or intra-group screening arrangement** is evidenced as meeting the local
  standard, with local oversight and testing.

---

## 6. Suggested near-term actions

**Next 30 days**
1. Run the Sovcomflot test: seed "PAO Sovcomflot" and a set of legal-form and transliteration variants
   through production merchant and payment screening. Record whether each alerts.
2. Pull the current age distribution of the sanctions alert queue by tier, and the oldest open alert.
3. Retrieve the change history for screening thresholds, auto-clear rules and hit-disposition guidance for
   the last 24 months. Identify any change that reduced detection without a documented sanctions
   impact assessment.

**Next 60 days**
4. Implement the legal-form normalisation and alias/identifier matching improvements; regression-test
   against an adversarial name corpus.
5. Introduce SLA-breach auto-hold so capacity failures fail closed.
6. Stand up designation-event portfolio propagation across the merchant ownership graph.

**Next 90 days**
7. Publish a designation-surge playbook and rehearse it.
8. Refresh the sanctions exposure map and produce the control-investment-versus-exposure evidence pack.
9. Add screening recall, alert age distribution and UBO data staleness to board risk MI.
10. Confirm per-entity list coverage and reporting-duty ownership across all licensed entities.

---

## 7. The one-line version

Citibank was fined £4.7m not because it lacked a sanctions programme, but because a legal-form prefix
defeated its fuzzy matching, an ownership assessment missed a corporate group, a false-positive reduction
measure loosened the restriction trigger, and an alert backlog outran its reviewers — and under UK strict
liability, the absence of intent bought it nothing.

---

## Sources

- [Imposition of Monetary Penalty – Citibank, N.A., London Branch — GOV.UK](https://www.gov.uk/government/publications/imposition-of-monetary-penalty-citibank-na-london-branch) *(primary notice; not directly retrievable from this environment)*
- [UK – OFSI imposes fine of £4.73m on investment bank — Duane Morris, European Sanctions Enforcement](https://blogs.duanemorris.com/europeansanctionsenforcement/2026/09/02/uk-ofsi-imposes-fine-of-4-73m-on-investment-bank/)
- [OFSI fines Citibank over Russian sanctions violations — Compliance Week](https://www.complianceweek.com/sanctions/ofsi-fines-citibank-over-russian-sanctions-violations/)
- [The UK's $6.4 Million Citibank Penalty: What Operational Sanctions Failures Actually Look Like Inside a Major Bank — Corruption, Crime & Compliance](https://blog.volkovlaw.com/2026/09/the-uks-6-4-million-citibank-penalty-what-operational-sanctions-failures-actually-look-like-inside-a-major-bank/)
- [Citibank Hit With £4.7M OFSI Fine Over Control Failures — Fincrime Central](https://fincrimecentral.com/citibank-ofsi-fine-sanctions-control-failures/)
- [OFSI fines Citibank London £4.7m over serious sanctions violations — GIR Just Sanctions](https://globalinvestigationsreview.com/just-sanctions/article/ofsi-fines-citibank-london-ps47m-over-serious-sanctions-violations)
- [Which Three Letters Defeated Citibank's Sovcomflot Screening? — gosships](https://www.gosships.com/p/which-three-letters-defeated-citibanks)
- [UK fines Citibank London $6 million over Russia sanctions breaches — Euronext / Reuters](https://live.euronext.com/en/financial-news/uk-fines-citibank-london-6-million-over-russia-sanctions-breaches)
- [Citibank fined £4.7m over Russia sanctions breaches — AML Intelligence](https://www.amlintelligence.com/2026/09/breaking-citibank-fined-4-7m-over-russia-sanctions-breaches/)
- [Regulatory gap analysis: OFSI monetary penalty against Citibank, N.A., London Branch — Avyse Partners](https://www.avyse.co.uk/regulatory-gap-analysis-templates/regulatory-gap-analysis-ofsi-monetary-penalty-against-citibank-na-london-branch)
- [UK OFSI Updates Enforcement and Monetary Penalties Guidance — Akin](https://www.akingump.com/en/insights/alerts/uk-ofsi-updates-enforcement-and-monetary-penalties-guidance)
- [OFSI Fines Standard Chartered Bank £20M for Sectoral Sanctions Breaches — Kirkland & Ellis](https://www.kirkland.com/publications/kirkland-alert/2020/04/ofsi-fines-standard-chartered-bank)
