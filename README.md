# Bhargavi's Experiment Lab (AWS Student Builder Challenge 2026)

A lightweight, accessible portfolio in plain HTML, CSS and JavaScript. No build step, no backend.

## Files
- `index.html` page structure
- `styles.css` lavender/cream notebook design, responsive, reduced-motion friendly
- `script.js` flask mixer, problem wall, experiment benches, build-journey stepper, "2 AM billing alert" challenge, project notebooks
- `hunt.js` the "Forgotten server hunt" game (45-second timed round, no backend, keyboard accessible)
- `amplify.yml` unchanged static build spec

## Preview locally
Open `index.html` in a browser, or run `python -m http.server 8000` and visit http://localhost:8000.

## Deploy with AWS Amplify (safe order)
1. In your repo, create a branch named `redesign` and add these files there. Leave `main` untouched.
2. In Amplify, open your app, choose Hosting > Branches > Connect branch, and pick `redesign`. Amplify gives it its own URL. Check your account's current free-tier limits first.
3. Test every tab, button and link on desktop and phone.
4. When happy, merge `redesign` into `main`. Amplify redeploys the live site.

## AWS services used
- AWS Amplify Hosting (CI/CD from GitHub, HTTPS)
- No databases, servers, Lambda functions or other billable resources.

## Honesty notes
Statuses on the project notebooks are intentional: NekoMemo is live, AWS Cost Guardian is a concept, the AWS labs are hands-on learning.
