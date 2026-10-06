---
layout: splash
title: "Hire me"
permalink: /hire-me/
author_profile: false
---
{% assign linkedin = "https://www.linkedin.com/in/ammanueltamrat/" %}

<style>
.hypno-page {
  position: relative;
  left: 50%;
  width: 100vw;
  margin-left: -50vw;
  min-height: calc(100vh - 9rem);
  display: grid;
  place-items: center;
  padding: 2rem 1.25rem;
  text-align: center;
  background: url("{{ '/images/spiral.svg' | relative_url }}") center / cover no-repeat;
}

.hypno-card {
  width: 100%;
  max-width: 30rem;
  padding: 1.75rem 1.5rem 2rem;
  border-radius: 0.75rem;
  background: var(--global-bg-color, #1f2523);
  color: var(--global-text-color, #e6ece9);
}

.hypno-card a {
  margin: 0 0.4rem;
  font-weight: 700;
}
</style>

<div class="hypno-page">
  <section class="hypno-card">
    <h1>Keep looking at the spiral.</h1>
    <p>I'm Amman. I'm doing an MSc in Computer Science at Maynooth, and I've spent the last few years building and running production software.</p>
    <p>The spiral does nothing useful. I do, so message me.</p>
    <p>
      <a href="{{ linkedin }}" target="_blank" rel="noopener">LinkedIn</a>
      <a href="{{ '/cv/' | relative_url }}">CV</a>
      <a href="{{ '/hire-me/spread/' | relative_url }}">Spread Me</a>
    </p>
  </section>
</div>