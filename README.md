<h1>Playwright Health-check Framework</h1>

<p>This repository contains a Playwright + TypeScript monitoring project that runs a set of BDD-style health checks for <a href="https://theleadingyounth.com">theleadingyounth.com</a>. The checks run across Chromium, Firefox and WebKit and the CI uploads failure artifacts for diagnostics.</p>

<h2>Why this repo</h2>
<ul>
	<li>Lightweight scheduled monitoring for public pages.</li>
	<li>Captures failure artifacts (screenshots, videos, junit) to diagnose regressions.</li>
	<li>Runs on GitHub Actions daily and supports manual dispatch.</li>
</ul>

<h2>Files of interest</h2>
<ul>
	<li><code>src/tests/site-health.bdd.spec.ts</code> — BDD-style homepage health check (Given/When/Then)</li>
	<li><code>src/tests/events.bdd.spec.ts</code> — events page health check</li>
	<li><code>src/tests/survey.bdd.spec.ts</code> — survey page health check</li>
	<li><code>src/tests/calculator.bdd.spec.ts</code> — smart calculator health check</li>
	<li><code>src/tests/steps.ts</code> — reusable BDD helpers</li>
	<li><code>.github/workflows/daily-health.yml</code> — scheduled workflow that runs daily</li>
	<li><code>playwright.config.ts</code> — Playwright settings (timeouts, reporters, artifact capture)</li>
</ul>

<h2>Quick start (local)</h2>
<pre><code class="language-bash">cd '/Users/bidiptadatta/Documents/New project/playwright'
npm install
npx playwright install
</code></pre>

<h3>Run a single check</h3>
<pre><code class="language-bash">npx playwright test src/tests/site-health.bdd.spec.ts --reporter=list
</code></pre>

<h3>Run all health checks</h3>
<pre><code class="language-bash">npx playwright test src/tests/*.bdd.spec.ts --reporter=list
</code></pre>
<h2>Run subsets using the built-in CLI</h2>
<p>Use the included Node script to run named subsets of checks:</p>
<pre><code class="language-bash">node ./scripts/run-checks.js events
node ./scripts/run-checks.js survey
node ./scripts/run-checks.js calculator
node ./scripts/run-checks.js all
</code></pre>

<p>Or use the npm scripts:</p>
<pre><code class="language-bash">npm run health:events
npm run health:survey
npm run health:calculator
npm run health:all
</code></pre>
<h2>CI and failure artifacts</h2>
<ul>
	<li>The workflow runs daily at 06:00 UTC and on manual dispatch.</li>
	<li>Uploads the Playwright HTML report, junit XML and any screenshots/videos produced on failure as workflow artifacts.</li>
</ul>

<h2>Extending the checks</h2>
<ul>
	<li>Create additional BDD specs under <code>src/tests/</code> and reuse helpers in <code>src/tests/steps.ts</code>.</li>
	<li>Consider adding authenticated fixtures for deeper E2E coverage.</li>
</ul>

<h2>Contact</h2>
<p>Designed & Built by Bidipta Datta</p>

<h2>License</h2>
<p>Private for now; adapt as needed.</p>

# playwrightFramework
