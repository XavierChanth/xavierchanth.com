---
title: "The Five I's of Agentic Engineering"
description: "A simple framework for using AI agents to design high-quality software."
author: "Xavier Chanthavong"
date: "2026-06-25"
published: true
series: "AI Riffraff"
tags:
  - "AI"
  - "tooling"
---

My latest endeavor has been focused on building a highly complex system, which can easily become a slop-fest if AI is used carelessly.
At it's heart, it's basically a distributed runtime, with multiple layers and subsystems that can be swapped out based on the best deployment strategy for a given project.
A combination of code-gen tools, testing, and careful use of AI has led me to a workflow where iteration is faster than by hand, and code is still very easy for me to review and maintain.

The Five I's is really a framework for writing better design documents to hand to AI agents and it's composed of five elements:
- Intent: What you are trying to accomplish?
- Interfaces: What are the behaviors and boundaries we want to express?
- Information: How is data shaped, transformed, and transmitted?
- Invariants: Define system invariants, rule out illegal behavior.
- Implementation: Iterate to a clean implemenation plan and implement it.

## Intent (Current & Overall goals)

Intent is all about your design goals here. It should be easy for the agent to find information about the intent of the overall system design, as well as the particular subsystem you are working on. I tend to use a tree of folders under docs, with READMEs serving as index maps to help agents find the files they are looking for.

The second kind of intent that's important to surface is why the current piece of work needs to occur. For new features: why is the feature important, what problem is it solving? For refactors or redesigns: what technical debt or flaw are we obliterating with the changes? For bug fixes, what bad behavior do we need to remove from the system? You get the idea.

By making both kinds of intents available to the agent, it sets the high-level criteria for success. Agent evals are entirely outcome based. By giving your agent a clear explicit goal, it makes it much easier for that agent to correctly identify what the desired outcome is. Thus always make sure to give your agent a design goal, that's what they are tuned and improved against.

## Interfaces (Behaviors and Boundaries)

Interfaces serve two main purposes in my usage of the word, I use it very loosely.
You can think of interface definition as a combination of behaviors and boundaries.

Starting at the highest level, what is the public API? *The I in API literally stands for interface if you weren't already aware.* The public API typically represents the most distinct boundary within a system, it represents the contract you are committing to. Within a more complex system you may also want to commit further to defining the boundaries of sub-systems, i.e. what APIs are exposed between systems, and what contracts are they committing to. This naturally allows you to segment your system and it's various responsibilities. This is literally separation of concerns–not as Uncle Bob defines it (i.e. reasons for change), but rather as most of the industry has come to understand it (i.e. creating areas of focus).

Underneath the larger changes, we also need to make sure we define the actions a "thing" can perform. I'm talking in terms of (F)OOP concepts here, as that is how I write most of my code. In this case, we are getting to what goes into the things defined by the literal `abstract class` or `interface` keywords, or `trait` in Rust.

Now, before you tell me "YAGNI", or "abstraction is the root of all evil", just hear me out. I promise I'm going somewhere with this, just hear me out until the end, I've included a tangent section at the end of this post with my thoughts.

## Information

Now, the next section is about data... or "information" so that it starts with an I...

There are four things to think about when it comes to data:
- The representation or "the shape" (i.e. fields in structs / classes)
- How the data is serialized / transmitted (what actually goes over the wire)
- How data is persisted (both in a database, but also within application state)
- How data flows through a system (what data is needed where, when, and in what format)

At the end of the day, the only thing that matters from a piece of software is the data itself. Nearly every system can be broken down into some data and transformations to that data, and when you can describe about a system in this way, the algorithms and implementation of the systems are trivial to derive.

I don't want to dwell too much on this section, because I think it's well understood by most engineers. It is an extremely important piece of software design, but that's why I trust you to already be good at it!

## Invariants

The last piece is the invariants, if you aren't familiar with the term, I suggest you search it up. It is originally a math term, but you can also find explanations specific to programming.

A simple way to think about invariants is by answer the questions: what should be allowed and what should be illegal at any given time within a system, also, what are the edge cases?

Many testing frameworks are designed around describing invariants, whether explicitly or implicitly. I often find it useful to describe invariants in language which looks very similar to, though not always exactly, BDD. For example, the table headers for a list of lifecycle based situations in one of my design documents are as follows:
- Situation
- Local State Transition
- Message to Send
- Late Response Behavior
- Cleanup Rule

There are 20+ scenarios covered in the table, and that makes it very easy to define the shape of the code and test suite that should follow suit.

## Implementation

Those four I's above represent the design phase I's. I dislike the plan mode built into most products because they don't make it easy to express those four things. So I don't use plan mode, I use a define phase.

Talking over the 4 design I's with the agent until I get it to nearly one-shot an accurate implementation plan. If I need to state more than one thing to correct the plan, I go back to design clarification until I can get it to one-shot the plan. That ensures the plan stays in context and accurate.

Again, I don't use plan mode, I ask the agent to give me the plan inline, without activating any magic plan mode features which turn freeform design work into a multiple choice test.

I typically ask for the plan to be structured around a series of "checkpoints" i.e. the commits that will end up in the graph. This often starts with a docs update step, and ends with a consolidation step including codegen, tests, lints, formatting to ensure that what I end up reviewing has been validated by the agent to the best of it's abilities. I also carry a progress tracker document in some of my larger projects, so I'll ask the agent to update the status after doing validation.

I've found that having a status document makes it easier to get the agent to ground itself correctly in the codebase, because your docs can describe the end state for the desired system, but the agent has a quick way to find out how much of that end state is expected to be found in the code. This prevents it from making assumptions about what code is or isn't complete yet.

Anyways, that's how I leverage AI now. I design & review instead of implement. This allows me to build complex systems faster, while still abiding by the same high quality standards that I wish for in my work.

## Tangent: Revisiting YAGNI

I promised I would come back to talk about why I don't think the use of abstraction is bad with this kind of system design. It creates contracts that tie directly to the system design.

Let's cover what the four I's above express:
- System & design goals.
- System boundaries & expected behaviors.
- Data representation, transformation, persistence, and transmission.
- Illegal and invalid system states.

When you only have an abstract class, and you are in the weeds it makes sense that if you've only got a need to write one implementation, then true, YAGNI. However, if you are designing at system scale, it can be very useful to break things down into the four elements, and having an LLM define both the abstract class, and the implemenation of the class can be highly productive.

It becomes easy to review and verify the API contracts, tests and implementations against the system design.
