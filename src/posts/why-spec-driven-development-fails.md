---
title: "Why spec driven development fails"
description: "And how I've made it work better for me"
author: "Xavier Chanthavong"
date: "2026-07-24"
published: true
series: "AI Riffraff"
tags:
  - "AI"
  - "tooling"
  - "development methodology"
---

> Disclaimer: this article is not scientific. I don't have enough personal data points to bother trying to make it so. This is purely an opinion/personal experience piece. Feel free to have your own opinions on the matter.

## My failures

For a long time I struggled to make spec-driven development work. 

One of my first failures was trying to get coding agents to automatically document its own decisions and specifications updates, similar to automatic memory features. In that experiment I quickly learned the downside to that approach. It's pretty much the same as why you shouldn't have automatic memory turned on for most things. The agent over time begins to develop biases and starts overfitting on certain memories, which just leads to less diverse results over time. In the same way that it's much easier to build something good in a greenfield code base than it is in a brownfield code base, the same is true when interacting with an agent that doesn't have bias from memory and one that does. 

> Please don't take the memory thing the wrong way. There are plenty of people working really hard to build good products that actually solve that problem but it is something that cannot just be turned on and called a day. There need to be real evals behind a memory feature to make sure that agents actually record the things we want recorded and don't over-record memories to the point where the model starts become overeager to portray certain mannerisms and behaviors that it maybe shouldn't. (i.e. how does it determine permanent preference vs one-off preference).

### Skills

I also went through a skills arc using Matt Pocock's in addition to some of my own. I also tried a blend, basically modifying Matt's skills to be more the way that I wanted. Ultimately what I realized is it's just better to not have something persistent in the harness. The only way in which skills will perform well enough, especially across model generations, is if you have enough data points to actually eval a skill based on your own agentic coding patterns.

I personally don't have enough sessions left on my system because I've wiped my cache a few times. Nor do I really care enough to put in the effort to eval custom skills for myself and my workflow. It's almost always gonna be faster for me to tell the model exactly what I'm looking for than to try to encode enough behavior into a skill such that the model does the things I want it to. When it comes to writing documentation and designing things, there's just too much variance for there to be a rigid right way to do things. I'd rather reserve the flexibility to express docs freely.

>  I even went as far as to make a complicated graph-driven approach to documentation with backlinks, kind of like Obsidian, so I could use Obsidian to view it or some other tool. In fact I even came up with some other tool that used front matter as the way of linking these pages and gave that to agents. It was okay but it was hard to make it a useful part of my workflow.

## What I do now

Moving on, I've since kind of revised the way that I manage my documentation into two folders in my larger project. I have a `repo/` folder, which contains information related to CI, software supply chain security practices, tooling, and those sorts of things.

And of course the second one is `docs/`. Every documentation folder and subfolder has a readme in it that serves as an index map. This allows the agent to traverse the documentation within my repo like a descending tree. My `AGENTS.md` file serves as a top-level index for docs, among other things.

Even with all of this it's still really easy to get spec-driven development to fail and I'll tell you why. The problem with spectrum and development is that we forget there are different types of tenses that we want to write specifications and documentation for. The bulk of my documentation or my specs is written to be the North Star for what I want the product to be or the desired end state or future state for the system. I never write it to be current tense. If I want to see what the current status of the project is, the best place to look is always the code and so that remains the source of truth for current tense.

In addition to this I have a roadmap subfolder within Docs, which then describes the transitions, the gaps, the problems with the existing implementation, and how we're going to fix it. It describes the initiatives that I want to take or the milestones I want to actively work on. It describes the strategies I plan on taking in order to get from the current state of the code to what is described in the documentation.

In practice it looks something like this:

```
MY REPOSITORY/
├── repo/
│   ├── README.md
│   ├── ci.md
│   ├── tooling.md
│   └── etc...
├── docs/
│   ├── README.md
│   ├── MAIN PROJECT FOLDER/
│   │   ├── README.md
│   │   ├── architecture/
│   │   ├── demos/
│   │   ├── reference/
│   │   └── roadmap/
│   │       ├── README.md
│   │       └── initiatives/
│   │           ├── initiativeA.md
│   │           ├── initiativeB.md
│   │           └── initiativeC.md
│   └── OTHER PROJECTS...
└── REST OF REPO...
```

Note how each tense has a home: 
- How to develop/contribute to this project  = `repo`
- What needs to be done and how to do it = `docs/roadmap`
- What is the desired end product = `docs/**/*` (except for roadmap)

This approach to organizing documentation has led to massive improvements in the quality of the output from the models. I'm able to do a lot more work instead of spending time trying to get the model to actually understand the work that we're trying to accomplish. It leads to far fewer solution hallucinations and generally keeps the model on task much more often.

How did I come to these conclusions you ask?

![I read the code - Mitchell Hashimoto](/assets/posts/i-read-the-code.png)

## Migrating is easy

It's relatively cheap to get a model to go through documentation and clean it up and reorganize it for you. On the few occasions where I've started a random project that I didn't really care too much about and the docs got out of hand because I let the model do whatever it wanted with them, I've been able to have a fresh model do a second pass and draft new docs to tmp/docs. Often times I'll have it flag inconsistencies and raise up a recommendation matrix for me to review. Usually the recommendations the model comes up with already 90% correct so for any given table I usually am only correcting 10% or less of it.

After that I **review the docs**, ask for any revisions, and then I'll just replace the old docs. If I really lost something that was important, I can always go back into git history and retrieve it.

## Wrapping things up

At this time, I'm not sure if this is a progress update or if this is going to be something more permanent to my development methodology. But for the time being this is working quite well. I have a lot of flexibility. I don't enforce any rigid formats for how the documentation must be written. The only thing that I care about is the perspective from which it is written, which ultimately serves as the higher purpose for the documentation existing.

Hopefully this will age well and this will become something that's permanently part of my setup; I am quite bullish on it. However, I will remain diligent in ensuring that I stay productive and continue to produce high-quality code.
