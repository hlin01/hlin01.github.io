---
layout: default
title: Hender Lin
permalink: /
description: Hender Lin is an applied AI scientist building production agentic systems and conducting applied research in evaluation, multimodal AI, memory, reliability, and safety.
---

<div class="site-shell">
<div class="mobile-bar">
  <a href="#top">Hender Lin</a>
  <button class="mobile-theme-toggle" type="button" aria-label="Change color theme" onclick="document.getElementById('light-toggle').click()"><span aria-hidden="true">◐</span></button>
</div>

<section id="top" class="hero" aria-labelledby="hero-title">
  <div class="hero-copy">
    <p class="eyebrow">New York City · Applied AI</p>
    <h1 id="hero-title">Hender Lin</h1>
    <p class="hero-role">Applied AI Scientist — Agentic Systems &amp; Applied Research</p>
    <p class="hero-lead">I build production AI systems and applied research that make complex models more reliable, useful, and safe in real workflows.</p>
    <div class="hero-links" aria-label="Profiles and contact">
      <a href="mailto:hlin01@g.ucla.edu">Email</a>
      <a href="https://www.linkedin.com/in/hender-lin" target="_blank" rel="noopener">LinkedIn <span aria-hidden="true">↗</span></a>
      <a href="https://github.com/hlin01" target="_blank" rel="noopener">GitHub <span aria-hidden="true">↗</span></a>
    </div>
  </div>
  <figure class="portrait-frame">
    <img src="{{ '/assets/img/hender-lin-portrait.jpg' | relative_url }}" alt="Portrait of Hender Lin" width="1024" height="1024" fetchpriority="high">
  </figure>
</section>

<nav class="section-nav" aria-label="On this page">
  <a href="#work">Work</a>
  <a href="#research">Research</a>
  <a href="#education">Education</a>
  <a href="#contact">Contact</a>
</nav>

<section class="focus-section" aria-labelledby="focus-title">
  <p class="eyebrow">Focus</p>
  <h2 id="focus-title" class="sr-only">Focus areas</h2>
  <div class="focus-grid">
    <article class="focus-item">
      <h3>Agentic systems</h3>
      <p>Multi-agent orchestration, durable memory, and workflow-native interfaces built for real users.</p>
    </article>
    <article class="focus-item">
      <h3>Evaluation &amp; reliability</h3>
      <p>Validation, observability, failure analysis, and safety layers that make quality measurable.</p>
    </article>
    <article class="focus-item">
      <h3>Applied research</h3>
      <p>Multimodal AI, robust NLP, and synthetic-data methods evaluated against practical utility.</p>
    </article>
  </div>
</section>

<section id="work" class="site-section" aria-labelledby="work-title">
  <header class="section-header">
    <h2 id="work-title">Selected work</h2>
  </header>

  <div class="experience-list">
    <article class="experience-item">
      <div class="experience-heading">
        <p class="experience-date">Aug 2025–Present</p>
        <h3>Wealth.com</h3>
        <p class="experience-role">Applied Scientist, Applied AI</p>
        <p class="experience-location">Ester Intelligence</p>
      </div>
      <ul>
        <li>Architected and shipped Ester’s production multi-agent platform, replacing six legacy agent packages with orchestrator, leaf-agent, and summarizer layers plus shared context, citation, and live-event infrastructure.</li>
        <li>Led reliability and workflow work across multimodal document analysis, long-term memory, safety, and a major enterprise-custodian integration.</li>
      </ul>
    </article>

    <article class="experience-item">
      <div class="experience-heading">
        <p class="experience-date">Jun–Aug 2025</p>
        <h3>Charles Schwab</h3>
        <p class="experience-role">AI/ML Model Validation Intern</p>
        <p class="experience-location">Model Risk Oversight</p>
      </div>
      <ul>
        <li>Built and launched a reusable generative-AI validation pipeline combining NLI hallucination detection, LLM-as-a-judge, generation metrics, and responsible-AI review.</li>
      </ul>
    </article>

    <article class="experience-item">
      <div class="experience-heading">
        <p class="experience-date">Jun 2024–Jun 2025</p>
        <h3>Lucasfilm</h3>
        <p class="experience-role">Machine Learning Engineer Intern</p>
        <p class="experience-location">Advanced Development Group</p>
      </div>
      <ul>
        <li>Scaled a RAG prototype into the production ILM Assist knowledge system, which served 12,000+ sessions and 25,000+ queries in its first six months.</li>
        <li>Built its Confluence ingestion and Vertex AI, Kubernetes, Airflow, and FastAPI serving architecture with zero-downtime refresh and persistent multi-turn history; presented the work at DISGRAPH.</li>
      </ul>
    </article>

  </div>
</section>

<section id="research" class="site-section" aria-labelledby="research-title">
  <header class="section-header">
    <h2 id="research-title">Research</h2>
  </header>

  <nav class="research-profile-links" aria-label="Research profiles">
    <a href="https://scholar.google.com/citations?user=oLy-zt4AAAAJ&amp;hl=en" target="_blank" rel="noopener">Google Scholar <span aria-hidden="true">↗</span></a>
    <a href="https://orcid.org/0009-0009-6032-1977" target="_blank" rel="noopener">ORCID <span aria-hidden="true">↗</span></a>
    <a href="https://openreview.net/profile?id=~Hender_Lin1" target="_blank" rel="noopener">OpenReview <span aria-hidden="true">↗</span></a>
  </nav>

  <div class="research-grid">
    <article class="research-item">
      <p class="research-kind">Sole author · arXiv · 2025</p>
      <h3>Enhancing NLP Robustness and Generalization through LLM-Generated Contrast Sets</h3>
      <p>Generated a balanced 3,000-example SNLI contrast set with Gemini 1.5 Pro. Adding it as 0.5% of training data improved ELECTRA-small by 7.4 points on seen and 2.9 points on unseen perturbations, while standard accuracy held at 89.0–89.1%.</p>
      <a class="text-link" href="https://arxiv.org/abs/2503.06648" target="_blank" rel="noopener">Read the paper <span aria-hidden="true">↗</span></a>
    </article>

    <article class="research-item">
      <p class="research-kind">Current graduate research · 2025–2026</p>
      <h3>Synthetic longitudinal human-services data and utility-centered evaluation</h3>
      <p>Developing a structured-first synthetic-data pipeline and practical evaluation for longitudinal human-services data. The work studies downstream transfer, privacy-side risk, and practitioner usefulness while keeping private source notes and real trajectories local.</p>
    </article>

  </div>
</section>

<section id="education" class="site-section" aria-labelledby="education-title">
  <header class="section-header">
    <h2 id="education-title">Education</h2>
  </header>

  <div class="education-list">
    <article class="education-item">
      <div>
        <h3>The University of Texas at Austin</h3>
        <p>M.S. Artificial Intelligence · GPA 3.92 / 4.00</p>
      </div>
      <p class="education-date">December 2025</p>
    </article>
    <article class="education-item">
      <div>
        <h3>University of California, Los Angeles</h3>
        <p>B.S. Mathematics of Computation</p>
      </div>
      <p class="education-date">March 2023</p>
    </article>
  </div>
</section>

<section id="contact" class="contact-panel" aria-labelledby="contact-title">
  <div>
    <p class="eyebrow">Contact</p>
    <h2 id="contact-title">Get in touch</h2>
    <p>I’m based in New York City. Email or LinkedIn are the best ways to reach me.</p>
  </div>
  <div class="contact-actions">
    <a class="primary-action" href="mailto:hlin01@g.ucla.edu">Email me</a>
    <a class="secondary-action" href="https://www.linkedin.com/in/hender-lin" target="_blank" rel="noopener">LinkedIn <span aria-hidden="true">↗</span></a>
  </div>
</section>
</div>
