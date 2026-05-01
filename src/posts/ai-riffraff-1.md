---
title: "AI Riffraff, Part 1: Greenfield Architecture"
description: "A practical workflow for using AI without giving up good greenfield decisions."
author: "Xavier Chanthavong"
date: "2026-05-04"
published: true
---

## This Series

This is the first post in a series on how I use AI in software work.
I'm still figuring out exactly where I want to take the series, but there are a few topics that I already know I want to write about:

- Working on architecture with AI, and leveraging it to research, explore, experiment, and record technology decisions. (**this post**)
- Some more hands-on workflows using pi and a custom distribution for it that I've put together.
- Some less hands-on workflows using some of these larger harnesses, such as Cursor agents or Codex.
- Voice-driven workflows with AI.
- Less workflow oriented, but how I categorize all of the available products in the space, both from a usability perspective and GTM perspective.

## AI Makes Decision Making Harder

AI is a force multiplier.
It lets you move faster, whether you're moving in a good direction or a bad one.
Something that used to take several weeks might now take several days.

That speed is great, but it changes how decisions get made.
Over those few weeks, how many times would you have sat down with an architect, product manager, or designer to think through what you were building?
When AI compresses that timeline, you lose some of those natural windows where decisions would have been made explicitly.
Instead, they often get made implicitly by the model through assumptions.

That, to me, is one of the biggest risks of using AI in greenfield work.

## Solving the Decision Making Dilemma

So how do we solve this? How do we make more conscious decisions while still moving quickly?

I think the answer is to be more deliberate about what kind of work we're asking AI to help us with.
Not all AI-assisted work has the same risk profile.

There are three areas I think about:

1. **Prototypes.** In a prototype, code quality often doesn't matter that much. The point is to generate a quick idea and decide whether it's worth exploring further or throwing away. This is where speed matters most.
2. **Brownfield codebases.** In an existing codebase, the model has something to ground itself in. Models are getting better at understanding what's already there, and the diffs they produce are a lot more reviewable than they used to be.
3. **Greenfield codebases.** This is the trickiest area by far. There are more unanswered questions, less code for the model to anchor on, and a much higher chance that it makes assumptions or decisions you never would have made.

## Greenfield Codebases

In greenfield codebases, there is very little for AI models to ground themselves in.
That's a problem, because in my experience a model will almost always make some assumption I never would have made, or try to make a decision it shouldn't be making yet.
I've tried working around this with skills that record decisions as they happen so they can be corrected later.
It didn't really work that well.

This is where I think we need to be more hands-on.
As engineers or architects, it's important that we maintain understanding of the code as it's being produced.
The hardest time to do that is right at the beginning.
If you don't understand how interfaces are being laid out, or how things are being wired together at a high level, it's very hard to reason about the details.

For greenfield codebases, the human should be the pilot, not the model.
Over time, you can defer more and more to the LLM, but early on you need to lay down interface boundaries and decide where abstraction effort matters and where it doesn't.
I still don't think models are equipped to make those calls well.
A lot of architectural work comes down to experience and taste.
Sometimes it's a gut check first, and then you verify that you're directionally correct.
Sometimes it's realizing that you aren't sure yet, and making decisions that preserve flexibility without overcomplicating things too early.

Trying to explain all of that to a model in precise language is difficult.
A lot of the time it's easier to do the thinking myself, lay the foundation, and then use the model in smaller, more contained ways.
As I've gone from prototyping into actual greenfield production work, I've found myself reaching less for a fully agentic harness and more for short, focused queries to implement one small thing at a time.

## My Greenfield AI Workflow

The first thing I try to do is flesh out the most fundamental parts of the application.
Not everything, just enough that I can start seeing some boundaries and identify parts of the project that can be isolated in scope.

Once I have that, I'll usually grab my phone and go for a walk.
I'll put on headphones and start talking through the problem.
I usually use Claude for this because I find the voice experience more natural than most of the other tools.
I'll go back and forth with it and describe what I'm trying to build without much structure.

One of the hardest parts of writing a design doc is taking a bunch of loose ideas and turning them into something coherent.
That conversational workflow helps a lot.
It lets me stay in the flow while the model helps organize what I'm saying.
Once I feel like I've covered everything I care about, I'll ask it to turn the conversation into a design doc.

After that, I'll usually take the draft to a stronger model and ask it to review the plan for gaps, open-ended decisions, weak assumptions, or places where the tradeoffs haven't really been thought through.
I'll keep iterating until the plan feels solid, then I'll turn that into a Markdown document and bring it into my coding editor.

There are some obvious benefits to doing it this way.
Because I'm not doing this inside the codebase, the model doesn't automatically see things I may not want it to see.
I can stay vague where I want to stay vague, and get specific only when the problem starts to sharpen.
That helps me start from the big picture and work my way down into something that actually fits what I'm trying to solve.

From there, the implementation approach depends on the size of the design doc and the kind of problem.
Sometimes it's better to define interfaces first and have the model implement against those boundaries.
Sometimes it's fine to give a larger chunk to an agent.
The important thing, especially in a greenfield codebase, is that everything stays reviewable.
If what the AI produces is too large for you to comfortably understand, you've already lost too much of the picture.

## Don't Trust AI

It's especially important in greenfield codebases that AI mistakes are caught and corrected immediately.
Early mistakes are more likely to stick around, and the effects can compound over time.
AI mistakes are a form of technical debt, and we probably shouldn't be starting new projects by injecting technical debt on day one.

## Recap of my AI Greenfield Development Workflow

- **Converse**: Talk through a problem with AI, and let it structure your thoughts into a coherent design doc draft.
- **Refine**: Pull in a more powerful model to review, refine, and finalize the design document.
- **Develop**: Bring the design document into the codebase and break it down into sizeable chunks.
- **Review**: The better you are at catching mistakes now, the happier you will be later.

## Takeaways

When something has been vibe-coded, it's usually noticeable.
We've even got a name for it now: slop.
I don't want to be somebody building AI slop.

Not every project, and not every piece of code, needs the highest possible quality.
Some software really does just need to work.
But for the things that matter most, the things we're putting real effort into, those are exactly the places where we shouldn't be sacrificing quality.

It's okay to feel enlightened by AI, just don't let that enlightenment turn into enshittification.
