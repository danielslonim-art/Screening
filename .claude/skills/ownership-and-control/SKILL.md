---
name: ownership-and-control
description: Decision procedure for the UK ownership and control tests under the Russia and other UK sanctions regimes — the 50%-plus ownership test and the separate control test. Use whenever an entity is not itself designated but may be owned or controlled by a designated person, when assessing a corporate ownership chain, or when ownership data is incomplete or stale.
---

# Ownership and control — decision procedure

An entity that is not itself designated is nevertheless caught if it is **owned or controlled
directly or indirectly** by a designated person. The two limbs are independent: failing the
ownership test does not end the analysis, because control can be established without any ownership
at all. Treat them as two separate questions, always both asked.

This is where the OFSI Citibank penalty (August 2026) did most of its damage: 24 accounts across
11 companies controlled by a single designated individual were not promptly restricted, one
ownership assessment was simply wrong, and some subsidiaries were missed entirely.

## Step 1 — Establish the designated person

Identify the designated person precisely from the list entry: full name, aliases, DOB, nationality,
and the designation date. **The designation date matters** — it sets the point from which the asset
freeze bit, and therefore which transactions were in breach.

## Step 2 — The ownership test (more than 50%)

Ask: does the designated person hold, directly or indirectly, **more than 50%** of the shares or
voting rights?

- **Indirect holdings chain through.** If a designated person holds 60% of A, and A holds 60% of B,
  B is caught. Work the chain to its end, not to the first layer.
- **Aggregate holdings across designated persons.** Several designated persons each holding less
  than 50% can combine past the threshold. Check whether the entry's holdings should be read
  together.
- **Look through nominees, trusts and bearer arrangements.** Registered shareholder is not the same
  as beneficial owner.
- **Check the register date.** Ownership data captured at onboarding two years ago is not evidence
  of ownership today.

Exactly 50% does not meet the ownership test — but go to Step 3, because it very often meets the
control test.

## Step 3 — The control test

Ask: is it reasonable to expect that the designated person can, by any means, ensure the entity's
affairs are conducted in accordance with their wishes?

Indicators, none of which require ownership:

- Right to appoint or remove a majority of the board, or the ability to do so in practice
- Founder, chair, chief executive, or a de facto leadership role regardless of title
- Rights under shareholder agreements, golden shares, veto rights, or constitutional documents
- Control through family members, nominees, or close associates acting on their behalf
- Financial control — the entity is dependent on the designated person's funding
- A documented pattern of the entity acting on the designated person's direction

The control test is deliberately broad and fact-sensitive. A carefully structured sub-50%
shareholding is exactly the fact pattern it exists to catch.

## Step 4 — Enumerate the group, not just the named entity

The single most repeated failure in this area. Having identified one caught entity:

- Map **subsidiaries** of the caught entity — they are caught in turn where the chain holds.
- Map **sister entities** under the same designated person.
- Check corporate registries in every relevant jurisdiction, not only the one on the account record.
- Search by the designated person's name as a director/shareholder, not only by entity name.
- Record which entities you checked and found **not** caught, and on what basis. An unrecorded
  negative is indistinguishable from an entity you never checked.

## Step 5 — Handle incomplete or stale data correctly

This is the step the Citibank guidance change got wrong, and it is the most important rule here.

**Where ownership or control cannot be established either way, the answer is HOLD — not release.**

Do not adopt a posture of "restrict only where there is affirmative evidence of majority ownership."
OFSI found precisely that framing increased both the number of unrestricted accounts and their
duration. UK sanctions are strict liability: an honest, well-documented inability to confirm
ownership is not a defence to having made funds available.

The correct sequence on doubt is: hold → request the ownership evidence from the customer →
escalate to the Sanctions Officer → consider an OFSI licence application or an enquiry to OFSI if
the hold creates a commercial or contractual problem. Legal should be involved.

## Step 6 — Propagate designation events across the whole book

A new designation is not only a forward-looking screening-list update. It is a trigger to
re-assess the **existing** portfolio, because the exposure may sit in merchants and UBOs already
onboarded, under entity names that will never match the newly designated person's name.

This requires merchant → shareholder → parent → UBO relationships to be traversable, not stored as
flat text fields. If they are not, that is a control finding to raise, not a data limitation to
work around.

## Record the analysis

Output, every time:

```
DESIGNATED PERSON     [name, list, entry ref, designation date]
OWNERSHIP TEST        [met / not met / cannot be established] — chain and percentages
CONTROL TEST          [met / not met / cannot be established] — indicators relied on
GROUP ENUMERATED      [entities checked: caught / not caught / unresolved, each with basis]
DATA QUALITY          [source and date of the ownership data; staleness]
CONCLUSION            [caught / not caught / HOLD pending X]
ESCALATION            [who; whether Legal and a licence are in scope]
```

Cite the regulation (for the Russia regime, Regulation 7 of the Russia (Sanctions) (EU Exit)
Regulations 2019) and OFSI's ownership and control guidance. Verify the current text of both — do
not rely on recall for the wording of the test.
