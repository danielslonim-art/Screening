# Global Screening — Claude agents

Claude agents supporting Checkout.com's Global Screening function: sanctions advisory and controls,
PEP screening, and adverse media screening.

`CLAUDE.md` holds the operating rules that apply to every agent here. Read it first — it is the
control environment, not documentation.

## What's here

### Agents (`.claude/agents/`)

Each is a specialist with its own system prompt, model and tool set. Claude routes to them
automatically based on the `description` field, or you can name one explicitly
("use the sanctions-advisory agent to…").

| Agent | Model | Scope |
|---|---|---|
| `sanctions-advisory` | Opus 5 | Designations, ownership and control, regime scope, nexus, licences, prohibited services, "can we do this?" |
| `screening-controls` | Opus 5 | Screening design and calibration, thresholds, list management, queue SLAs, control testing, root-cause of a miss |
| `pep-screening` | Opus 5 | PEP scope, domestic vs foreign, RCA perimeter, risk tiering, EDD scope, proportionality |
| `adverse-media` | Opus 5 | AM taxonomy, entity resolution, source credibility, materiality, disposition |
| `alert-disposition` | Sonnet 5 | Volume first-line alert rationale drafting; escalates anything it can't fully evidence |

`alert-disposition` runs on Sonnet because it is volume work against a supplied record. Everything
advisory runs on Opus — do not downgrade an advisory agent to save cost without the Sanctions
Officer's agreement and a re-run of the eval set.

### Skills (`.claude/skills/`)

Reusable procedures any agent (or the main session) can load on demand. Skills are where the
method lives; agents are where the role lives.

| Skill | Purpose |
|---|---|
| `ownership-and-control` | The 50% ownership test and the separate control test, group enumeration, and the correct posture on incomplete data |
| `name-variant-testing` | Legal-form token and transliteration corpus, and how to measure screening **recall** rather than alert volume |
| `alert-rationale` | House format for a defensible disposition record, plus the second-line QA checklist |

## Design principles behind these prompts

1. **Advise, never decide.** No agent can action an alert, release a payment, or restrict an
   account. The output is a recommendation with reasoning, routed to a named human. This is what
   keeps agent use inside model-risk and DoA governance.
2. **Cite or don't say it.** Unsourced but plausible regulatory assertions are the top risk in this
   whole design. Every agent is required to source claims and to say explicitly when it can't.
3. **Never screen from model recall.** An agent must not assert that a party is or isn't designated
   from memory. Screening is a control performed by approved tooling against a current list; the
   agent's job is to reason about the result.
4. **Fail closed.** Under strict liability, unresolved doubt produces a hold, not a release. This is
   written into every agent and into `ownership-and-control`, because it is the specific posture
   OFSI penalised Citibank for getting backwards.
5. **Encode the failure modes, not just the rules.** The prompts name the concrete ways this work
   goes wrong — `not available` treated as a mismatch, discounting on low score, PEP de-risking,
   allegations stated as fact, backlog pressure leaking into dispositions. Naming the failure mode
   is what changes behaviour; abstract instructions to "be careful" do not.
6. **Two-sided calibration.** Each agent's prompt names both the under-detection failure *and* the
   over-reaction failure, weighted equally. An agent tuned only against misses escalates everything
   and gets switched off.

## Connecting real data

The agents above reason; they don't yet have access to your systems. Add MCP servers to give them
read access, keeping to the data-handling rules in `CLAUDE.md`:

- **Policy and procedure** — Confluence, so answers cite Checkout's actual approved standards rather
  than generic regulatory positions. Highest-value single connection.
- **Case and alert data** — your case management system, **read-only**. Read-only is a deliberate
  control, not a limitation.
- **List and screening provider** — for current list entries and alias data.
- **Jira** — for control findings, remediation tracking, and audit actions.

Configure per-server access in `.claude/settings.json`, and keep write scopes off anything that can
change a case, account or payment state.

## Where to run these

The prompts and skills here are portable. Four surfaces, in increasing order of engineering effort:

1. **Claude Code (what this repo is).** Agents and skills as markdown, used interactively by the
   Screening team in the terminal, IDE, desktop or web. Zero infrastructure, full audit trail in
   session transcripts. Start here — it is also how you tune the prompts cheaply.
2. **Claude Agent SDK.** The same Claude Code harness packaged as a library
   (`claude-agent-sdk` / `@anthropic-ai/claude-agent-sdk`), so you can put these agents behind an
   internal Slack bot or web app on Checkout's own infrastructure. Docs:
   `code.claude.com/docs/en/agent-sdk`.
3. **Claude API with tool use.** Full control over the loop and the tool surface, for embedding
   screening reasoning inside an existing service. Use the SDK's tool runner rather than
   hand-writing the agent loop.
4. **Managed Agents (beta).** Anthropic runs the loop and hosts a per-session sandbox; agent
   configs are persisted and versioned, which maps well onto model-risk change control. Adds
   scheduled deployments — useful for a nightly designation-diff review or a weekly screening MI
   pack — and outcome-graded sessions where a separate grader iterates the agent against a rubric
   until it passes. This is the natural home for anything that must run unattended on a cadence.

Don't jump to 3 or 4 before the prompts are good. Prompt quality dominates; the surface is a
deployment decision.

## Evaluation — do this before relying on any of it

Per `CLAUDE.md` § 7, an unevaluated agent is an unvalidated model. Minimum bar before live use:

1. **Build a graded eval set** of 50–100 real historical cases per agent, anonymised, with the known
   correct outcome and the rationale that was accepted at the time. Include:
   - clear true matches and clear false positives
   - the hard middle: ambiguous ownership chains, common-name PEPs, stale UBO data
   - cases where the *original human decision was wrong* — these are the most informative rows
   - true negatives, so you can detect an agent that escalates everything
2. **Grade on two axes**, separately: was the recommendation right, and was the reasoning sound?
   An agent that reaches the right answer through bad reasoning will fail on the next case, and
   only the second axis catches it.
3. **Measure the asymmetry.** False-clear rate and false-escalate rate are not equally costly.
   Report both; set a tolerance for each with the Sanctions Officer.
4. **Baseline against the humans.** The question is not "is the agent perfect" but "does the
   agent plus a reviewer beat the reviewer alone".
5. **Re-run on every prompt change**, and on every model change. Treat the eval set as a regression
   gate, exactly as `name-variant-testing` treats the name corpus.

Claude Code has bundled guides for this — ask for `/claude-api build-eval` to construct the eval
set and `/claude-api hillclimb` to iterate the prompts against it.

## Governance to settle before go-live

These are organisational, not technical, and they're the ones that get asked in an audit:

- **Named owner** per agent, and a review cadence for its prompt.
- **Where agent output lands** in the case record, and how it's marked as AI-drafted.
- **Model risk registration** — these are models under most firms' MRM policy. Register them.
- **Change control** on `.claude/agents/` and `.claude/skills/` — a prompt edit is a control change.
  Require review and keep the git history as the audit trail. This is also why the operating rules
  live in version control rather than in someone's chat history.
- **Training** for analysts on what the agents are for and, more importantly, what they are not:
  they do not screen, they do not decide, and their unsourced assertions are not evidence.
