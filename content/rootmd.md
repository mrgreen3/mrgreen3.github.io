+++
title = "RootMD Framework"
path = "rootmd"
+++

> *Write the markdown first. The code grows from it.*

RootMD is a lightweight methodology for writing and maintaining scripts. The idea is simple: document intent before writing code. The markdown is the source of truth. The scripts are artefacts of it.

This page is a living reference. The concept is still developing.

---

## The Tree

RootMD borrows its structure from a tree. Each layer has a clear role.

### Root — the `.md`
The markdown document that describes what a script does and why. Written first, before any code. Language-agnostic — the same root can generate bash, Python, Ansible, or anything else.

### Trunk — `common.sh`
Shared logic extracted from individual scripts. Ownership fixing, directory creation, package installation — anything repeated across scripts belongs here. Individual scripts source the trunk rather than repeat it.

### Branch — individual scripts
One script per task, each sourcing the trunk. Only what is unique to that task lives in the branch. New scripts are quick to write because the scaffolding is already in the trunk.

### Leaf — generated artefacts
The scripts themselves, produced from the markdown root. Any language, any format. When the root changes, the leaves can be regenerated.

### Fruit — the working system
The deployed result. A healthy tree produces good fruit consistently.

---

## The Workflow

1. Write the `.md` — describe what the script needs to do, step by step, in plain language
2. Identify shared logic — anything that appears in more than one script moves to `common.sh`
3. Generate the implementation — bash, Python, or whatever the job needs
4. Keep the `.md` as source of truth — update the document first, regenerate the code from it

---

## Why It Works With AI

An AI working from a well-structured markdown document understands *why*, not just *what*. That means it can make sensible decisions about edge cases, suggest improvements, and extend scripts consistently — because the intent is explicit.

The cost of doing things properly — documenting intent, maintaining consistency, refactoring toward shared functions — is low enough with AI assistance that there's no good excuse not to.

---

## Status

Early days. The concept emerged from a practical session converting EndeavourOS install scripts. The round trip — bash to markdown, markdown back to bash — works cleanly. The trunk/branch pattern is the next thing to prove out properly.

Posts on the blog will document progress as the framework develops.
