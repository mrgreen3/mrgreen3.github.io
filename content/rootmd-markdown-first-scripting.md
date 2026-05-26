+++
title = "RootMD: Write the Markdown First"
date = 2026-05-26
path = "rootmd-markdown-first-scripting"

[taxonomies]
tags = ["linux", "bash", "ai", "tools", "scripting"]
+++

A conversation with a friend today turned into something worth writing down.

He maintains a collection of install scripts for EndeavourOS — one per desktop environment, each cloning a repo, deploying config files, fixing permissions, enabling services. They work. They're also a bit of a mess: inconsistent variable names, repeated boilerplate, no documentation. He's adding more WMs and the headache is growing.

We were looking at one of the scripts and I fed it to Claude and asked for a markdown version. Not documentation after the fact — a clean `.md` that described what the script does, step by step, in plain language.

It took about ten seconds.

Then I asked Claude to regenerate the bash script from the markdown.

That also took about ten seconds. And the script that came back was cleaner than the original — consistent variable names, `set -e`, proper error handling, the same logic but tidier.

## The Round Trip

The interesting thing isn't that Claude can convert between formats. It's what the conversion reveals.

Writing the markdown forces you to think about *intent* rather than *implementation*. What does this step actually do? Why does it do it? The bash just says `chown -R $username:$username` — the markdown says "fix ownership because git and cp ran as root in the ISO." That's the context that matters.

And when you go back to bash from the markdown, the code that comes out is informed by that intent. It's not just a transcription — it's a cleaner implementation of a clearly stated idea.

## RootMD

I'm calling this approach **RootMD**. The idea in one line:

> Write the markdown first. The code grows from it.

The `.md` is the source of truth. The script is an artefact of it. This means:

- The documentation is never out of date because it came first
- The same `.md` can generate bash, Python, Ansible, or whatever the job needs
- An AI working from the `.md` understands the *why*, not just the *what*

That last point matters more than it might seem. Claude Code working from a well-structured markdown document can make sensible decisions about edge cases, suggest improvements, and extend the script — because it understands what the script is trying to do.

## The common.sh Problem

Once you see the scripts as artefacts of documents, another thing becomes obvious: the repeated boilerplate across every script is a documentation smell as much as a code smell.

The fix is the same either way — pull the shared logic into a `common.sh`, source it from each script, and reduce each individual script to just what's unique about that desktop environment. With RootMD you'd have a `common.md` too, documenting what the shared functions do.

New WM? Write the markdown. Generate the script. Done in minutes rather than hours.

## A Note on AI and Bash Scripts

There's a version of this that doesn't involve AI at all — document-first development is not a new idea. But the AI piece genuinely changes the friction. The gap between a clear `.md` and working code used to require a programmer. Now it requires a conversation.

That's not a replacement for understanding what your scripts do. But it does mean that the cost of doing things properly — documenting intent, keeping things consistent, refactoring toward shared functions — is low enough that there's no good excuse not to.

My friend is still dealing with the GPU headache. But at least the scripts will be cleaner.
