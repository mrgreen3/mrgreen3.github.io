+++
title = 'Ditching Zapier for n8n'
date = "2026-05-25"
draft = false
tags = ['tools', 'workflow', 'self-hosting']
+++

I've been using Zapier for a few days to glue bits of my digital life together. It works, but the cracks show quickly. Task limits that reset monthly and punish you for actually using the tool. Pricing that climbs whenever your automations get useful. And everything — every trigger, every action, every email address — flowing through their servers.

That last one bothered me more as time went on.

n8n is a self-hosted workflow automation tool. Open source, runs on your own hardware, no task caps, no data leaving your machine. The interface is a node graph — drag wires between nodes to build workflows. It's not the prettiest thing, but it's clear.

My first workflow was simple: check the inbox for my ArchBang project email and push notifications to Telegram. In Zapier this was a two-step Zap, straightforward enough, but it was the kind of workflow that would quietly break when I hit my task limit mid-month. In n8n it runs on a schedule on my own server, costs nothing beyond electricity, and I can see exactly what it's doing.

Setup isn't click-and-go — you're running a Node.js service, managing credentials yourself, keeping it updated. Getting it stood up manually took some wrestling. With a bit of help from my AI assistant it was soon up and running.

Worth it. My data stays local, the workflows don't expire, and I'm not watching a task counter tick down.

*MrG*
