---
title: "A GSD System for Claude Code"
date: 2026-02-03T13:45:24Z
type: post
tags: 
- ai
- development
categories:
- Engineering
---
# A GSD System for Claude Code

## I have a Problem with Unstructured AI-Assisted Coding

When GitHub Copilot rolled out, I found it a new paradigm, though it quickly revealed limitations. Cursor offered a brighter future until context limits emerged. Then, a friend introduced me to Claude Code, and it was a whole new experience.

My productivity skyrocketed, and I quickly hit daily and weekly limits, pushing its bounds. However, I soon realized that jumping into coding so fast was not sustainable.

I have always been someone that reads on a topic, learns the foundations and then properly learns by doing; that meant jumping to an IDE really fast and trying things until they fully clicked.

With AI-assisted coding, that approach was no longer sufficient. Clear specs, proper documentation, and detailed requirements became essential. I started doing that, but there was not a clear way to keep it reproducible the way I needed it to be.

While I was fast at trying new things, the bottleneck was me going back and forth polishing the outcomes not matching my expectations. I got better and better and detailed what I needed to increase exponentially the success of the AI assisted code; but there was still a critical element that needed addressing.

As I was scrolling through different apps, I landed on LinkedIn to [this post: Claude Workflow Upgrade with GSD](https://www.linkedin.com/posts/girish-s-16b4b91a6_claudecode-aiagents-devtools-activity-7416057263422988288-6X5m). I read the idea, and it sounded interesting, resonating with me.

The tool is `Getting Shit Done` , which is a spec-driven development tool for AI assisted development. It relies heavily on people getting "interviewed" and reaching proper spec documents for the assistant to execute. From the `README`:

> The complexity is in the system, not in your workflow. Behind the scenes: context engineering, XML prompt formatting, subagent orchestration, state management. What you see: a few commands that just work.
>
> The system gives Claude everything it needs to do the work and verify it. I trust the workflow. It just does a good job.
>
> ## Who This Is For
>
> People who want to describe what they want and have it built correctly — without pretending they're running a 50-person engineering org.

This resonated deeply with me but I was deep into other projects and couldn't simply take the time that this new tool deserved to see if it would work for me or not.

## Testing out GSD

I've always hoarded articles, trying various apps before self-hosting [Karakeep](https://karakeep.app/) on a Raspberry Pi. After an upgrade bricked the database, I couldn't be bothered to fix it.

I quickly switched to [BlogWatcher](https://github.com/Hyaxia/blogwatcher) running on a local server/computer, which works great. However, I lacked a GUI to navigate the articles, presenting the perfect opportunity to finally test [GSD](https://github.com/glittercowboy/get-shit-done).

### GSD System in Practice

I started with a blank canvas; I created a `.reference` folder where I dumped the source code from [blogwatcher](https://github.com/Hyaxia/blogwatcher), I grabbed some reference images of UI I liked and dumped them in the reference folder and kicked a new `Claude Code` session.

I followed the instructions of the [gsd](https://github.com/glittercowboy/get-shit-done) documentation and started with:

Now this is where the "magic" happens. The tool will start "quizzing" you about your goals, the codebase, etc; you can then choose to do research, planning and verification. It will let you know that you'll be using more tokens during these phases, but I think most of them are worth it.

Once you answer the setup questions, you receive a roadmap and plan. The tool will split the work in phases, you get to confirm if that looks correct, etc and at the end you'll have a planning document as well as a roadmap. And you are ready to go.

After the initial plan is laid out, you can start researching or planning phase 1. Work cannot begin until the phase is planned. Planning lays out a proper 'prompt plan' for the AI assistant to follow and execute. After that, it's autopilot with strong guardrails.

I let the assistant do its thing and whenever a phase was ready I would launch and verify that things were working accordingly. The code generated for each phase was functionally correct on the first execution, requiring only minor stylistic tweaks.

I tested it with a relatively simple project, which proved to be a great initial validation. While I was impressed by the structured process, its performance on a more complex, multi-faceted project remains to be seen.

## Outcomes and Personal Reflections

At the end of a single "coding" session I was left with a product that satisfies my needs. The [BlogWatcher UI](https://github.com/esttorhe/blogwatcher-ui). The plans and roadmaps are left in the code-base (as suggested by the tool) and I believe they are a great way to document how the project came to be in case I need to touch this in the future (or another AI assistant does).

I enjoyed the thorough planning and careful execution. The token expenditure is no joke, but I believe it is a worthwhile investment. In my experience, it likely prevents the higher cumulative token cost and wasted time on multiple failed attempts often associated with less structured methods.

Now, after this first test, I have a better sense of which phases are essential and which can be streamlined. For example, on a project where the architecture is already clear, I might condense the 'research' phase while always retaining the detailed 'planning' phase, which I found delivered the most value. I'll definitely be using the tool again in the future and will keep iterating on the workflow.

For any developer looking to improve the reliability and structure of their AI-assisted work, I believe trying this system is a valuable exercise. Even if the tool isn't for you, it will hopefully instill the habit of proper specification for AI-assisted coding or even your own coding sessions.

---

Made with BlueTip 🦋 ([https://www.bluetip.ai](https://www.bluetip.ai))
