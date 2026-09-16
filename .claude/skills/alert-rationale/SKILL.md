---
name: alert-rationale
description: House format for documenting a screening alert disposition (sanctions, PEP, adverse media) so the record is defensible to a regulator, an auditor or a second-line reviewer. Use whenever drafting, reviewing or quality-assuring an alert decision rationale.
---

# Alert disposition rationale — house format

The rationale is the control. A correct decision with an undocumented basis is indistinguishable
from a guess when a regulator reads the file two years later. Write for that reader.

## Format

```
ALERT REF          [id]
SUBJECT            [entity or individual as held on our record — source system and field]
MATCHED ENTRY      [list / media source, entry reference, name matched, designation or publication date]
MATCH BASIS        [which fields matched, at what score, on which engine and threshold config]
CONTEXT            [onboarding / transaction / payout / refresh; value, currency, corridor, counterparty]

FIELD COMPARISON
  Name             [match | mismatch | not available] — [detail]
  DOB              [match | mismatch | not available] — [detail]
  Nationality      [...]
  Place of birth   [...]
  Address          [...]
  Identifier       [reg no / LEI / passport / IMO]
  Role / entity    [...]

OWNERSHIP & CONTROL   [n/a | assessed — see ownership-and-control output | NOT ASSESSED]

DISCRIMINATOR RELIED ON
  [the specific verified fact that supports the conclusion, and how it was verified]

DISPOSITION        [DISCOUNT | TRUE MATCH | HOLD / ESCALATE]
REASONING          [2-5 sentences. Why this fact pattern supports this disposition.]

OUTSTANDING        [what could not be established; what would change the conclusion]
ESCALATED TO       [name / role, or "not escalated" with why]
DECIDED BY         [named human] on [date]
SOURCES            [policy section, list entry, evidence documents, provider record]
```

## Rules that make the record defensible

**Not available is not a mismatch.** Write it as `not available`. A missing DOB on the list entry
does not discriminate between two people — it means you have no discriminator. Recording it as a
mismatch is the most common reasoning error in alert disposition and the easiest one for a reviewer
or regulator to find.

**A discount needs a named, verified discriminator.** State what it is and how it was verified.
"Score below threshold", "different person", "reviewed and cleared", and "common name" are not
discriminators. If you have none, the disposition is `HOLD / ESCALATE`.

**Score is routing, not evidence.** A low match score does not support a discount. And note the
limit of scoring altogether: the Citibank Sovcomflot failure produced no alert and therefore no
score — scoring can only rank what the engine surfaced.

**Never discount on commercial or operational grounds.** Not because the value is small, the
merchant is long-standing, the corridor is routine, the queue is backed up, or the alert has been
cleared before. A prior clearance is not evidence — if you rely on one, check its rationale was
sound and say so, and if it wasn't, raise it.

**Absence of a finding is a scoped statement.** Write "no adverse media identified in [sources],
[languages], [date range]", never "no adverse media exists". Name what you searched.

**Attribute allegations.** "[Outlet] reported on [date] that X was charged with…", not "X did…".
Keep allegation, charge, conviction and acquittal distinct in every sentence. The subject is a real
person and the record may be disclosed to them.

**Record the negatives you checked.** An entity you assessed and found not caught, written down,
is evidence of a control operating. The same entity unrecorded is indistinguishable from one you
never looked at.

**Name the decision-maker.** Every rationale ends with a human. An AI-drafted rationale that no
human owns is not a decision record.

## Second-line QA checklist

When reviewing someone else's rationale, test it against these. Any "no" is a finding:

1. Is the discriminator named, specific and verified — or is the reasoning circular?
2. Is any `not available` field being treated as a mismatch?
3. Was ownership and control assessed on every entity alert, and recorded?
4. Does the reasoning rely on value, tenure, corridor, queue pressure, or a prior clearance?
5. Is an allegation stated as fact anywhere?
6. Is the disposition consistent with the evidence, or is it a partially-evidenced discount that
   should have been a hold?
7. Is a named human recorded as the decision-maker?
8. Would a reader with no prior knowledge of this case reach the same conclusion from this record
   alone?
