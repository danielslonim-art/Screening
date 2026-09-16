---
name: name-variant-testing
description: Method and corpus for testing sanctions/PEP name screening recall — legal-form token normalisation, transliteration variants, and how to build and run an adversarial name test set against a screening engine. Use when calibrating fuzzy matching, changing a screening threshold, onboarding a new list or vendor model, or investigating a screening miss.
---

# Name variant testing

Name screening fails quietly. A missed match produces **no alert**, so the queue looks healthy, the
false-positive rate looks great, and nobody knows until a regulator asks. This skill exists because
that is exactly what happened to Citibank N.A., London Branch: the internal record read
`PAO Sovcomflot`, the UK Consolidated List read `Sovcomflot`, the fuzzy matching did not bridge the
three-character legal-form prefix, and **no alert was ever generated** across 32 accounts and 328
transactions worth c. £5.4m. OFSI fined the branch £4.73m in August 2026.

## The measurement you actually need

Alert volume and false-positive rate tell you nothing about the failure above. The metric is
**recall**: of the true positives that exist in the data, what proportion does the engine alert on?

Measure it by seeding known true positives you control into the screening path and counting how
many alert. Anything else is an assumption.

## Failure classes to test

### 1. Legal-form tokens

The dominant class, and the one that caught Citibank. Normalise or map these to equivalence
**before** matching rather than relying on the fuzzy threshold to absorb them:

| Region | Tokens |
|---|---|
| Russia / CIS | PAO, ПАО, OAO, ОАО, ZAO, ЗАО, AO, АО, OOO, ООО, PJSC, OJSC, JSC, CJSC, TOO, GUP, FGUP |
| Ukraine / Belarus | TOV, ТОВ, PrAT, DP, ODO |
| Wider | GmbH, AG, SA, SAS, SARL, BV, NV, AB, AS, A/S, Oy, SpA, Srl, Pty, Sdn Bhd, KK, KG, Ltd, LLC, PLC |

Test each in four positions: prefix (`PAO Sovcomflot`), suffix (`Sovcomflot PAO`), absent
(`Sovcomflot`), and punctuated (`Sovcomflot, P.A.O.`). A list entry commonly carries a different
form from the internal record — and frequently omits the token entirely.

### 2. Transliteration

Cyrillic, Arabic, Chinese, Greek, Hebrew and Korean names have multiple defensible Latin renderings,
and no single standard is used consistently by lists, registries and customers.

Worked examples to include: `Sovcomflot` / `Sovkomflot`; `Alfa-Bank` / `Alpha Bank` / `Alfabank`;
`Gazprombank` / `Gazprom Bank` / `Gasprombank`; `Mikhail` / `Michail` / `Mihail`;
`Evgeny` / `Yevgeny` / `Evgenii` / `Evgeniy`; `Aleksandr` / `Alexander` / `Alexandr`;
`Muhammad` / `Mohammed` / `Mohamad` / `Muhammed`; `Abdul Rahman` / `Abdulrahman` / `Abd al-Rahman`;
`Zhang Wei` / `Wei Zhang` / `Chang Wei`.

### 3. Structural variation

- Word order and surname-first conventions (Chinese, Hungarian, Japanese)
- Patronymics present or absent (`Ivan Ivanovich Petrov` / `Ivan Petrov`)
- Multiple surnames (Spanish, Portuguese, Brazilian conventions)
- Initials and abbreviations (`M. Fridman`, `M.M. Fridman`)
- Hyphens, apostrophes, spacing (`Al-Assad` / `Al Assad` / `AlAssad`; `O'Brien` / `OBrien`)
- Diacritics stripped or retained (`Müller` / `Mueller` / `Muller`)
- Honorifics and titles (`Sheikh`, `Hajji`, `Dr`, `Sayyid`)
- Trailing entity noise (`Sovcomflot (Cyprus) Limited`, `Sovcomflot Bunkering`)

### 4. Deliberate evasion

Character substitution and homoglyphs (`0` for `O`, Cyrillic `а` for Latin `a`, `rn` for `m`),
zero-width and non-breaking characters, doubled or dropped letters, and names embedded in free-text
payment reference fields rather than structured party fields.

### 5. Data-pipeline failures that look like matching failures

Always rule these out before tuning a threshold:

- The list load failed, ran stale, or silently dropped records — check record counts per load
- **Aliases were not ingested**, only primary names. Check the alias count, not just entity count
- Identifiers (reg. number, LEI, IMO, DOB, address) present on the list but not mapped into matching
- Screening covers the merchant but not UBOs, directors, or sub-merchants
- The wrong list for the entity — a UK entity screened only against OFAC, or vice versa
- Free-text fields (payment reference, beneficiary name, narrative) not screened at all

## Procedure

1. **Build the corpus.** For each failure class above, generate variants of real designated entities
   and persons drawn from the current UK Consolidated List. Record the expected outcome for each row
   (`should_alert: true|false`), including deliberate true negatives — an engine that alerts on
   everything has perfect recall and is useless.
2. **Seed and run** the corpus through the screening path as close to production as possible.
   Screen the *whole* path: onboarding screening, transaction screening, payout screening, refresh.
3. **Score recall per failure class**, not in aggregate. Aggregate recall hides a total failure in
   one class behind good performance in others. The PAO case is a single-class total failure.
4. **Fix by normalisation first, threshold second.** Lowering the global threshold to catch a
   legal-form mismatch floods the queue and creates the backlog that becomes the next finding.
   Normalise the token; leave the threshold alone.
5. **Make it a regression gate.** Re-run the corpus on every threshold change, list-load change,
   vendor model update, normalisation rule change, and provider migration. Block the change if
   recall regresses in any class.
6. **Report recall to the board** alongside alert volume. A falling alert count is as likely a
   broken control as an improving one, and only recall distinguishes them.

## Rules

- Use **synthetic or public list data only** in any corpus committed to a repository. Never commit
  customer, merchant or UBO data.
- Test against real list entries as the target, with synthetic subject records as the input.
- Record the corpus version, engine version, threshold configuration, and list load date with every
  result set. A recall figure without that context is not evidence.
