import{a as o,f as i}from"./1kz9IMli.js";import"./AWc5D6On.js";import{P as a}from"./Cbs7v_Ax.js";const n={title:"AI Riffraff, Part 1: Greenfield Architecture",description:"A practical workflow for using AI without giving up good greenfield decisions.",author:"Xavier Chanthavong",date:"2026-05-04",published:!0},{title:d,description:c,author:u,date:m,published:g}=n;var s=i(`<h2>This Series</h2> <p>This is the first post in a series on how I use AI in software work.
I’m still figuring out exactly where I want to take the series, but there are a few topics that I already know I want to write about:</p> <ul><li>Working on architecture with AI, and leveraging it to research, explore, experiment, and record technology decisions. (<strong>this post</strong>)</li> <li>Some more hands-on workflows using pi and a custom distribution for it that I’ve put together.</li> <li>Some less hands-on workflows using some of these larger harnesses, such as Cursor agents or Codex.</li> <li>Voice-driven workflows with AI.</li> <li>Less workflow oriented, but how I categorize all of the available products in the space, both from a usability perspective and GTM perspective.</li></ul> <h2>AI Makes Decision Making Harder</h2> <p>AI is a force multiplier.
It lets you move faster, whether you’re moving in a good direction or a bad one.
Something that used to take several weeks might now take several days.</p> <p>That speed is great, but it changes how decisions get made.
Over those few weeks, how many times would you have sat down with an architect, product manager, or designer to think through what you were building?
When AI compresses that timeline, you lose some of those natural windows where decisions would have been made explicitly.
Instead, they often get made implicitly by the model through assumptions.</p> <p>That, to me, is one of the biggest risks of using AI in greenfield work.</p> <h2>Solving the Decision Making Dilemma</h2> <p>So how do we solve this? How do we make more conscious decisions while still moving quickly?</p> <p>I think the answer is to be more deliberate about what kind of work we’re asking AI to help us with.
Not all AI-assisted work has the same risk profile.</p> <p>There are three areas I think about:</p> <ol><li><strong>Prototypes.</strong> In a prototype, code quality often doesn’t matter that much. The point is to generate a quick idea and decide whether it’s worth exploring further or throwing away. This is where speed matters most.</li> <li><strong>Brownfield codebases.</strong> In an existing codebase, the model has something to ground itself in. Models are getting better at understanding what’s already there, and the diffs they produce are a lot more reviewable than they used to be.</li> <li><strong>Greenfield codebases.</strong> This is the trickiest area by far. There are more unanswered questions, less code for the model to anchor on, and a much higher chance that it makes assumptions or decisions you never would have made.</li></ol> <h2>Greenfield Codebases</h2> <p>In greenfield codebases, there is very little for AI models to ground themselves in.
That’s a problem, because in my experience a model will almost always make some assumption I never would have made, or try to make a decision it shouldn’t be making yet.
I’ve tried working around this with skills that record decisions as they happen so they can be corrected later.
It didn’t really work that well.</p> <p>This is where I think we need to be more hands-on.
As engineers or architects, it’s important that we maintain understanding of the code as it’s being produced.
The hardest time to do that is right at the beginning.
If you don’t understand how interfaces are being laid out, or how things are being wired together at a high level, it’s very hard to reason about the details.</p> <p>For greenfield codebases, the human should be the pilot, not the model.
Over time, you can defer more and more to the LLM, but early on you need to lay down interface boundaries and decide where abstraction effort matters and where it doesn’t.
I still don’t think models are equipped to make those calls well.
A lot of architectural work comes down to experience and taste.
Sometimes it’s a gut check first, and then you verify that you’re directionally correct.
Sometimes it’s realizing that you aren’t sure yet, and making decisions that preserve flexibility without overcomplicating things too early.</p> <p>Trying to explain all of that to a model in precise language is difficult.
A lot of the time it’s easier to do the thinking myself, lay the foundation, and then use the model in smaller, more contained ways.
As I’ve gone from prototyping into actual greenfield production work, I’ve found myself reaching less for a fully agentic harness and more for short, focused queries to implement one small thing at a time.</p> <h2>My Greenfield AI Workflow</h2> <p>The first thing I try to do is flesh out the most fundamental parts of the application.
Not everything, just enough that I can start seeing some boundaries and identify parts of the project that can be isolated in scope.</p> <p>Once I have that, I’ll usually grab my phone and go for a walk.
I’ll put on headphones and start talking through the problem.
I usually use Claude for this because I find the voice experience more natural than most of the other tools.
I’ll go back and forth with it and describe what I’m trying to build without much structure.</p> <p>One of the hardest parts of writing a design doc is taking a bunch of loose ideas and turning them into something coherent.
That conversational workflow helps a lot.
It lets me stay in the flow while the model helps organize what I’m saying.
Once I feel like I’ve covered everything I care about, I’ll ask it to turn the conversation into a design doc.</p> <blockquote><p>One thing to watch for during this stage is overfitting.
If you tell the model not to do something, it may still keep that idea at the
center of the response. For example, if I say, “don’t make this too abstract,”
the model might remove one interface or rename a layer while preserving the same
basic shape. What I really want to make it into the plan is usually more direct:
start with the concrete workflow and interfaces, and only introduce abstractions
if they become necessary.</p></blockquote> <p>After that, I’ll usually take the draft to a stronger model and ask it to review the plan for gaps, open-ended decisions, weak assumptions, or places where the tradeoffs haven’t really been thought through.
I’ll keep iterating until the plan feels solid, then I’ll turn that into a Markdown document and bring it into my coding editor.</p> <p>There are some obvious benefits to doing it this way.
Because I’m not doing this inside the codebase, the model doesn’t automatically see things I may not want it to see.
I can stay vague where I want to stay vague, and get specific only when the problem starts to sharpen.
That helps me start from the big picture and work my way down into something that actually fits what I’m trying to solve.</p> <p>From there, the implementation approach depends on the size of the design doc and the kind of problem.
Sometimes it’s better to define interfaces first and have the model implement against those boundaries.
Sometimes it’s fine to give a larger chunk to an agent.
The important thing, especially in a greenfield codebase, is that everything stays reviewable.
If what the AI produces is too large for you to comfortably understand, you’ve already lost too much of the picture.</p> <h2>Don’t Trust AI</h2> <p>It’s especially important in greenfield codebases that AI mistakes are caught and corrected immediately.
Early mistakes are more likely to stick around, and the effects can compound over time.
AI mistakes are a form of technical debt, and we probably shouldn’t be starting new projects by injecting technical debt on day one.</p> <h2>Recap of my AI Greenfield Development Workflow</h2> <ul><li><strong>Capture</strong>: Get the raw shape of the problem out of your head first. Let the ideas be messy, then use AI to organize them into a coherent design doc draft.</li> <li><strong>Refine</strong>: Pull in a more powerful model to review, refine, and finalize the design document.</li> <li><strong>Clarify</strong>: Go back and forth on the gaps, weak assumptions, and tradeoffs until the important decisions are explicit.</li> <li><strong>Develop</strong>: Bring the design document into the codebase and break it down into sizeable chunks.</li> <li><strong>Review</strong>: The better you are at catching mistakes now, the happier you will be later.</li></ul> <h2>Takeaways</h2> <p>When something has been vibe-coded, it’s usually noticeable.
We’ve even got a name for it now: slop.
I don’t want to be somebody building AI slop.</p> <p>Not every project, and not every piece of code, needs the highest possible quality.
Some software really does just need to work.
But for the things that matter most, the things we’re putting real effort into, those are exactly the places where we shouldn’t be sacrificing quality.</p> <p>It’s okay to feel enlightened by AI, just don’t let that enlightenment turn into enshittification.</p>`,1);function p(e){var t=s();a(64),o(e,t)}export{p as default,n as metadata};
