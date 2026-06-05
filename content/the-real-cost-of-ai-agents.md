+++
title = "The Real Cost of AI Agents"
date = 2026-06-05
path = "the-real-cost-of-ai-agents"

[taxonomies]
tags = ["ai", "agents", "local-llm", "ollama", "hermes", "odysseus", "self-hosted", "opinion"]
+++

There are a lot of YouTube videos out there promising you can run your own AI agent for free. The thumbnails are exciting. The reality is slightly different.

I have been using and testing AI agents for a while now — OpenClaw, Hermes, and more recently looking at [Odysseus](https://github.com/odysseus-agent). Each one comes with its own promise of autonomy, automation, and intelligence on tap. Each one also comes with a bill, whether you see it or not.

## The Two Routes

When it comes to running an AI agent, you have two options.

**Use an online API.** Pay per token. No hardware headaches, frontier model quality, scales up or down with your usage. If you are trying to earn money from your agent — automating a workflow, running a business process, generating content at scale — this makes sense. The cost is a business overhead, potentially tax deductible, and the economics can work in your favour if the agent is genuinely productive.

**Run a local LLM.** Buy the hardware, host it yourself, keep your data private. Sounds appealing until you price it up. A capable local inference box — something that can actually run a useful model without embarrassing itself — is not cheap. You are looking at a decent mini PC with 32GB RAM minimum, and that is before you think about the model itself, the setup time, and the ongoing power draw.

## The Egg Frying Test

I have run Ollama on my own hardware. Even with a relatively small model, the CPU was working hard enough to fry an egg. It was not subtle.

Now imagine that running 24/7, waiting for a Telegram message that might arrive three times a day. The hardware is drawing power constantly. The fans are spinning. The model is sitting loaded in memory doing nothing most of the time, and then thrashing when something arrives.

The "free" local LLM agent has quietly accumulated a meaningful electricity bill. And it is still not as capable as a frontier model you could have called via API for a few pence.

## Privacy Has a Price

This is not an argument against local LLMs. Privacy is a legitimate reason to go local. If you do not want your prompts and data leaving your network, you have no choice — local is the only option.

Odysseus is interesting precisely because it is trying to be honest about this. Rather than just saying "run it locally, it's fine," it attempts to match models to hardware realistically. That is a more useful conversation than most of the hype content out there.

But eyes open: privacy via local inference costs money. Decent hardware to run it properly costs money. Your time setting it up and maintaining it costs money, even if you enjoy it.

## Who Should Use What

**API route** makes sense if you are generating value from the agent — commercial use, productivity gains that outweigh the per-token cost, or you simply want the best available models without the faff.

**Local route** makes sense if privacy is non-negotiable, you are doing heavy or frequent inference where the per-token API cost would genuinely exceed hardware amortisation, or you want full control and are willing to pay for it in time and hardware.

**Neither route** is free. The question is not "how do I run agents cheaply" — it is "do the agents actually justify the cost, whichever route I take?"

## The Honest Summary

Most people hyping local agents have not done the maths. The YouTube "for free" crowd have usually glossed over the GPU cost, the power draw, the hours of setup, and the capability gap versus hosted models.

If you are going in with clear eyes — knowing what you are spending, knowing what you are getting, and knowing why — then either route can be the right choice.

Just do not let a YouTube thumbnail make that decision for you.
