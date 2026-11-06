# Bhargavi S. — AWS Student Builder Challenge Portfolio

A responsive, static portfolio website designed for AWS Amplify Hosting.

## Included
- `index.html` — all portfolio sections and semantic page structure
- `styles.css` — responsive futuristic visual system and animations
- `script.js` — mobile navigation and the working **Superpower Lab** interactive feature

## Before publishing — personalize these details
Search `index.html` and replace:
- `YOUR_EMAIL@example.com` with the email address you want to publish.
- `https://www.linkedin.com/` with your LinkedIn profile URL.
- `https://github.com/` with your GitHub profile URL.
- The generic GitHub project link under the S3 project with the exact repository URL, if available.

Review the project descriptions and status labels so they accurately reflect what you have completed. In particular, AWS Cost Guardian is described as a concept/in-development project rather than a finished product.

## Run locally
You can open `index.html` directly in a browser. For a local development server, from this folder run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy with AWS Amplify Hosting
1. Push these files to a **new public GitHub repository**.
2. In the AWS Console, open **AWS Amplify**.
3. Choose **Create new app** → **Host web app**.
4. Connect GitHub and select the portfolio repository and branch.
5. For a plain HTML/CSS/JS site, use the default build settings or add the `amplify.yml` below.
6. Save and deploy. Amplify will provide a live HTTPS URL.
7. Open the URL on desktop and mobile and test every navigation and external link.

### Optional `amplify.yml`
This site has no build step. If Amplify asks for a build specification, add this file at the repository root:

```yaml
version: 1
frontend:
  phases:
    build:
      commands: []
  artifacts:
    baseDirectory: /
    files:
      - '**/*'
  cache:
    paths: []
```

## AWS services
- **AWS Amplify Hosting** — build/deploy pipeline and public hosting.
- **GitHub** — source repository connected to Amplify.

No database, server, Lambda function, or paid backend is required for this static portfolio.

## Creative feature: The Superpower Lab
The section titled “Curiosity has a power source” contains a visible hint and an **Activate my superpower** button. Clicking it reveals rotating personal strengths and the story behind them. The feature is implemented in `script.js` and works without a backend.

## Final challenge submission checklist
- [ ] Replace placeholder email and social links.
- [ ] Add exact GitHub repository URLs.
- [ ] Check all project descriptions and completion statuses.
- [ ] Push the original site to a new repository.
- [ ] Deploy with AWS Amplify Hosting.
- [ ] Test the public URL on mobile and desktop.
- [ ] Capture screenshots of the site and Amplify setup.
- [ ] Document the creative feature, AWS services, learning, and challenges in the Builder Center project submission.
