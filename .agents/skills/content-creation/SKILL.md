---
name: content-creation
description: Use only when the user explicitly asks for the content-creation skill or explicitly requests this staged, author-led writing workflow. Helps reshape an author's own ideas into coherent prose while preserving their intent, language, and editorial control across input, outline, draft, edit, and completion stages.
---

# Content Creation

Use this skill only when the user explicitly asks for it. Do not auto-trigger this skill for
ordinary writing, editing, blogging, copywriting, or drafting requests.

This is an author-led writing workflow. The author's ideas, language, claims, intent, and final
judgment are authoritative. The agent's role is to create coherence, expose structure, identify
gaps, and propose changes that better align the piece with the author's stated goal.

This workflow can support blog posts, essays, LinkedIn posts, marketing pages, white papers,
positioning documents, memos, and other prose-heavy content. The boundary is authorship, not
genre: use this when the author wants structured help developing their own ideas, not generic
ghostwriting.

## Core Rules

- Preserve the author's source language wherever it carries intent, voice, specificity, or
  positioning.
- Do not invent major claims, examples, metaphors, frameworks, conclusions, or positioning unless
  the author asks for them.
- Prefer restructuring and clarification before sentence-level rewriting.
- Flag gaps instead of silently filling them.
- Treat author corrections and revisions as source of truth.
- Surface meaningful LLM-made decisions and edits so the author can accept, reject, or revise them.
- When a proposed change could shift voice, emphasis, certainty, tone, or positioning, explain the
  tradeoff and ask for confirmation before applying it.

## Files

Use at most three files for the workflow:

```text
filename.input.md
filename.outline.md
filename.md
```

Use the final `filename.md` only after the outline is locked. Intermediate files are service
artifacts for transparency and iteration.

## Stage 1: Input

Working file:

```text
filename.input.md
```

Purpose:

- Capture raw notes and fragments.
- Capture target audience.
- Capture intended outcome.
- Capture medium or content type.
- Preserve the author's wording and fragments as source material.
- Identify open questions without resolving them prematurely.

The input file is not polished prose. Keep it close to the author's source material.

If the user has not provided enough context, ask only the minimum questions needed to continue.
Prefer questions about audience, outcome, medium, and the available source material.

## Stage 2: Outline

Working file:

```text
filename.outline.md
```

Purpose:

- Convert the input into a proposed structure.
- Propose the main claim or thesis.
- Define the intended role of each section.
- Place source ideas and fragments under the sections where they belong.
- Suggest a tone direction for author approval.
- Identify terms to preserve and terms or framings to avoid.
- Surface gaps, unclear claims, or unresolved author decisions.

The outline is the main planning artifact. Iterate on it with the author until the structure,
section intent, tone, and core argument are locked in. Do not jump from raw notes to final prose.

Treat style as a project variable, not an agent default. Recommend a direction based on the
author's stated intent, then let the author confirm or revise it.

## Stage 3: Draft From Locked Outline

Working file:

```text
filename.md
```

After the author approves the outline, copy the full outline into `filename.md`. From this point
onward, develop the piece in `filename.md`.

When practical, copy the locked outline from `filename.outline.md` to `filename.md` with a shell
command instead of re-emitting the file through the model. This preserves tokens and avoids
accidental wording drift during the stage transition.

Purpose:

- Expand each section from outline notes into prose.
- Work section by section.
- For each section, propose the direction or shape the section should take before drafting it.
- Wait for author confirmation or revision of the proposed section direction before making changes.
- Keep the section intent and main ideas visible while drafting when useful.
- Prioritize completeness, idea placement, and coherence over polish.
- Avoid heavy sentence-level rewriting unless the author asks for it.

At this stage, the agent may create rough paragraphs from approved section notes, but should not
over-polish the author's language. The author remains in control of all section-level decisions;
the agent only helps speed up the conversion of approved ideas into prose.

## Stage 4: Edit In The Final File

Working file:

```text
filename.md
```

Purpose:

- Refine clarity, flow, sentence structure, and tone.
- Preserve the author's voice unless a shift has been approved.
- Propose meaningful edits before applying them when they affect voice, emphasis, precision,
  certainty, tone, or positioning.
- Wait for the author to accept, reject, or revise each proposed edit before applying it.

For short language changes, use a numbered before/after list so each item can be addressed
independently:

```md
1. `old wording` > `new wording`
```

For longer or numerous changes, use a numbered table:

```md
| # | Original | Proposed | Reason |
| --- | --- | --- | --- |
| 1 | ... | ... | ... |
```

For long edit lists, group changes by topic or correction type, such as clarity, grammar, syntax,
tone, precision, redundancy, or transitions.

## Stage 5: Completion Pass

Working file:

```text
filename.md
```

Purpose:

- Review whether the piece works as a whole.
- Identify gaps, missing content, weak transitions, unresolved placeholders, open questions, and
  unapproved assumptions.
- Suggest possible additions, cuts, rearrangements, intro changes, conclusion changes, calls to
  action, or closing moves that may help complete the piece.
- Explain why each suggestion may help the piece better fit the medium, audience, and intended
  outcome.
- Wait for the author to decide which suggestions to accept, reject, revise, or answer before
  applying changes.
- Keep the author in control of what "complete" means for the piece.

Do not fill missing content or resolve open questions on the author's behalf unless explicitly
asked. Do not treat the piece as complete while unresolved author decisions remain.

## Change Transparency

Make visible:

- Structural decisions.
- Inferred claims.
- Rewritten sentences.
- Removed, merged, or relocated ideas.
- Tone shifts.
- Added connective tissue.
- Places where author input is still needed.

The author should be able to see what changed, why it changed, and where the agent made an
assumption.

## Restricted Defaults

Avoid by default:

- Inventing major claims.
- Adding unsupported examples.
- Replacing the author's vocabulary with generic language.
- Over-polishing into a default AI essay voice.
- Flattening nuance or uncertainty.
- Making the piece more salesy, academic, casual, punchy, technical, or provocative without
  author approval.

If the user's stated goal calls for one of these moves, the agent may recommend it. Call out the
tradeoff and ask for confirmation before applying the change.
