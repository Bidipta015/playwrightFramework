# Contributing

Thank you for contributing! This project uses an opinionated but simple workflow to keep the repository healthy.

Branch naming
- feature/{short-description}
- fix/{short-description}
- chore/{short-description}
- ci/{short-description}

Commit messages
- Use short, present-tense <type>: <subject>
- Type examples: feat, fix, docs, style, refactor, test, chore, ci
- Example: feat: add events health check

Pull requests
- Target the `master` branch (or a feature branch). Include a short description of what changed and why.
- Link any related issue and include screenshots or logs when relevant.

Running checks locally
- Install deps: `npm ci`
- Install browsers: `npx playwright install`
- Run health checks: `npm run health:all`

Thanks for improving the project!
