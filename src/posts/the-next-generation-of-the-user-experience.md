---
title: 'The Next Generation of the User Experience'
description: "The Evolution of UX: Why Security is the New Engine of Innovation"
author: 'Xavier Chanthavong'
date: '2026-02-11'
published: true
---

In the pre-agentic era, we viewed security as a series of locks—necessary
restrictions that inevitably slowed down the user experience. But as we move
into an age of autonomous agents, the paradigm has flipped. We are entering a
world where security is no longer a barrier to capability; it is the primary
enabler of it.

## The Two-Layer User Experience

In the agentic era, the user experience is bifurcated. There are the
people-facing interfaces we all recognize, and the agent-facing harnesses that
provide LLMs with their capabilities. To improve the people experience, we must
expand the agent’s capabilities. However, as we continue to see in the media,
the current approach is flawed. Data is at risk because we're building
on legacy architecture.

## The Guardrail Fallacy

Most agentic frameworks today rely on middleware or guardrails to correct bad
behavior. This is fundamentally the wrong way to think about security. A
guardrail is designed to course-correct a vehicle that has already run off the
road. In a well-designed agentic framework, going off the rails shouldn't
even be a mathematical possibility.

We cannot rely on static capability mappings—I'm already seeing products with
~600 grant checkboxes—how is this going to scale when we finally transition
from finite to an unbounded number of capabilities? We need dynamic, scalable
frameworks that recognize the transfinite possibilities of LLM actions. If a
tool is unsafe in a specific context, the system shouldn't just "block" its
use—it should dynamically remove the capability entirely.

## The [Lethal Trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) and Contextual Safety

We must address the "Lethal Trifecta" surrounding inputs, queries, and
mutations. For most modern applications, external-agent use is not yet safe
by default, because direct access often means satisfying the lethal trifecta.
For example:

- Email applications
- Banking applications
- Social media / chat applications

Each of these applications has a risk of untrusted inputs, access to private
data, and the ability to communicate externally or, in banking contexts, move
your money elsewhere.

> Even banking apps have a risk of untrusted inputs. In Canada, the most common
> way to send someone money is with an e-transfer, and transfers include a memo
> field which allows the sender to write whatever they want.

In general, most applications which require a login satisfy the trifecta.

The solution isn't more middleware; it’s a fundamental redesign of how agents
interact with data. We need systems that ensure an LLM is only capable of what
it should be allowed to do within its immediate context.

## Safety is an Enabler

The future of all agentic technology lies in this realization: security is a
means to capability.

In the agentic era, better governance and more rigorous design allow us to
trust systems, and entrust them with more responsibility than ever before. When
we build frameworks that are inherently safe by design rather than by
restriction, we unlock the ability to give agents more autonomy.

## What the Next Generation Looks Like

The result is quite powerful: as the underlying agent-experience becomes
safer and more capable, the people-experience becomes simpler and more
intuitive. Products will become goal-driven, rather than execution-driven.
Interactions will become communication-based—about articulating thoughts
rather than performing tasks.

By solving the hard problems of agentic security today, we aren't
just protecting data—we are expanding the horizon of what is possible tomorrow.

