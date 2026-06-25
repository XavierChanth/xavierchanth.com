---
title: "Context Should Be Lazy"
description: "A case for lazy context, small AGENTS.md files, and using plain Markdown instead of skill sprawl."
author: "Xavier Chanthavong"
date: "2026-05-14"
published: true
series: "AI Riffraff"
---

## Hot Take: Skills Are Usually Bad

Okay, this is sort of a hot take, but I think skills are usually a bad way to use AI in a large project, especially in a monorepo.

It is not just that skills are misused. I think they are often misauthored, and the difference matters. Even for skills that are eval'd properly, where someone has written a bunch of evals to make sure the skill guides the model toward the correct behavior, I have a hunch that most of those evals do not care about token churn.

They probably test the positive case.

> Does the skill help when it is relevant?  
> Does the model follow the right workflow?  
> Does the answer improve when this skill is loaded?

Those are all good questions, but I would assume most evals are not testing the negative case.

> Does the skill stay out of the way when it is irrelevant?  
> Does it avoid triggering when it should not?  
> How much context does it add to tasks that do not need it?

This is something worth thinking about when authoring skills. A skill can be helpful in the right moment and still be bad tooling overall if it creates context inflation everywhere else.

## The Hidden Cost: Context Churn

Skill descriptions are hard to write well.

They cannot be too short, because then the agent will not have enough information to know when the skill should be used. But they also cannot be too long, because the description itself is part of the context the agent has to carry around. That tradeoff is not a big deal with one skill.

The problem starts when you compound it across a project. One description may not affect you much. Twenty skills means twenty descriptions. Even if every single one of those descriptions is reasonable on its own, together they start to add up and eat into the context window.

This is especially true in monorepos. A monorepo usually has multiple projects, multiple stacks, multiple workflows, and a lot more tooling. Each area can justify having some kind of guidance. Each tool can justify its own skill. But once everything gets a skill, the discovery layer itself becomes expensive.

That is the context churn I care about. Skill authors often seem to assume that because the project uses a tool, the skill for that tool is always relevant. That is not true.

If I am changing a CSS class in a Svelte component, I do not want database deployment guidance in context. If I am refactoring a Rust package, I do not want frontend testing instructions unless they are actually relevant. The repo can use all of those tools, but the task usually needs only a small slice of them.

## A Real-World Example: Convex's AI Files

I have been using Convex frequently, and I want to be clear that I do like that they are putting effort into this space. I am a Convex customer, and overall I like what they are doing.

But I really do not like the way they have done their AI files. The first issue is that they try to add guidance to both `AGENTS.md` and `CLAUDE.md`. I do not use Claude. Nobody touching this project is going to use Claude. I do not want a `CLAUDE.md` file automatically generated in my project every time the AI files update. Nor do I want them touching **my** AGENTS.md file and filling it with junk.

The second issue is the skills.

Convex has a built-in router skill as part of its AI files. That skill is designed to tell the model how to find the other Convex skills. I think that is the right general shape. The problem is that the subskills are not nested inside the router skill as additional Markdown resources. The other skills are separate top-level skills, which means all of their descriptions go into context too.

So now we have a router skill that exists to tell the model when to load the other skills, but the descriptions for those other skills are already being loaded for discovery. That defeats the point of the router. When I looked at this in May 2026, the subskill descriptions were longer than the router skill description itself. The whole setup ends up using far more skill-description bandwidth than it needs to. Not just 6x because there are six skills, but closer to 7x or 8x if you look at the relative length of the descriptions.

That is what frustrates me. The idea is good, but the implementation undermines the reason to have a router skill in the first place.

## Context Should Be Lazy

The broader principle here is that context should be lazy.

This is similar to how I think about my Neovim setup. I created a wrapper around `vim.pack` so that I can control when things load into my editor.

The goal is simple: do not load something you do not need. Defer as much of the loading process as possible to when, and if, you actually need it.

Skills are a step in the right direction because they defer detailed instructions. That is good, but the discovery layer still has a cost. A router skill is the right idea. It gives the agent one place to decide whether more specific guidance is needed. But if all of the subskills also sit at the top-level discovery layer, then we are not really being as lazy as we could be.

This matters most in monorepos. Most tasks only need one small part of the repo. If every tool, package, app, and workflow gets its own top-level skill, then every task starts carrying discovery context for things it does not need.

## `AGENTS.md` Is Already A Router Skill

The better way to think about this is that `AGENTS.md` is already an always-on skill.

All\* agent harnesses read it. That means it is always loaded into context, so it should be treated like an always-loaded router skill. (\*all of the ones I care about anyways)

It should not contain every detail about the repo. It should contain exactly enough information for the agent to go and find the information it needs. In one of my repos, my `AGENTS.md` file is around twenty lines, and seven of those lines are whitespace. So really, it is about thirteen lines of actual content.

Here's the whole file:

```markdown
# AGENTS.md

This is a mixed TypeScript + Rust monorepo. Bun is the default TypeScript
package manager for this project.

Top-level layout:

- `apps/` — applications.
- `components/` — Convex components.
- `packages/` — shared Rust and TypeScript packages.

The default backend/database choice in this repo is Convex.

Useful starting points:

- `Justfile` — common repo commands. Run `just --list`.
- `repo/README.md` — repo-wide structure, tooling, and workflow decisions.
- `docs/README.md` — project design notes, including cryptography decisions.

Prefer existing conventions before adding new tools.
```

It points to the repo structure. It points to docs. It tells the agent to run `just --list` to find commands it might want to run. And that is basically all it needs.

If the agent needs more information, it knows where to go. That is the job of the root file. It should be a map, not the territory.

## Repo Knowledge Should Not Live In Skills

Skills are a bad place to store repo-specific knowledge, agents are far less likely to touch them compared to a docs folder.

The beauty of thinking about `AGENTS.md` as a router skill is that it works well for both tooling and knowledge. It can point the agent toward commands, whether that is a `Justfile`, a `commands.md` file, or whatever else the repo uses. It can also point the agent towards architecture decisions, package boundaries, deployment notes, and workflow details.

That information should still exist, but I don't know of anyone putting it in skills, even though the discovery mechanisms for these things should be largely the same.

## When Skills Are Worth It

I am not saying skills should never exist.

I still have one global skill right now. It tells LLMs how I like to commit code with Jujutsu. That workflow earns being a skill because I use it frequently, it applies across projects, and it includes scripts that help pull the right context. It also compensates for the fact that LLMs know Git much better than jj, so I need to provide more explicit guidance.

A skill should be broadly relevant or used frequently. If it is global, it should apply across many projects. If it is project-local, it should apply to a meaningful amount of work in that project.

If it is low-frequency, it probably should not be a top-level skill. That does not mean the information is useless. It just means it should sit behind a thinner discovery layer, or live as Markdown that the agent can load when needed.

The real question is not:

> Can this skill help?

The real question is:

> Is this skill worth carrying around all the time?

Most of the time, I think the answer is no.

## Takeaway

Skills are Markdown, which makes me telling you to replace them with markdown a little funny. But they are not just Markdown. They also have frontmatter descriptions, which contain trigger and discovery behavior. All of that creates context inflation if it is authored poorly, or you have too many skills in context.

Keep `AGENTS.md` small, and your list of skills smaller. Treat `AGENTS.md` like an always-on router skill. Point the agent toward the files it needs and have it load them only when it needs them.
