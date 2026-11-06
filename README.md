# Bhargavi's Experiment Lab

A responsive student portfolio built with plain HTML, CSS and JavaScript. It presents learning experiments and project work across AI/ML, AWS, Linux, Python and product development.

## Included files
- `index.html` — page structure, navigation, project sections and metadata
- `styles.css` — responsive notebook-inspired visual design and accessibility states
- `script.js` — interactive problem wall, experiment tabs, learning journey, AWS scenario and project cards
- `hunt.js` — simulated forgotten-resource cost-awareness game

## Preview locally
Open `index.html` in a browser, or run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy with AWS Amplify
1. Push these files to a Git repository.
2. In AWS Amplify Hosting, connect the repository and select the branch to deploy.
3. This is a static site: no build command or backend is required. If Amplify asks for a build specification, use the static hosting defaults or a minimal build spec with the repository root as the artifact directory.
4. Test the deployed site on desktop and mobile before sharing it.

## Project status and accuracy
- **NekoMemo:** presented as live; its current link is included in the portfolio.
- **Farmora:** presented as an AI-assisted crop-photo analysis project. Add its actual demo, repository, model details and evaluation results before claiming production readiness. Disease suggestions should be validated by agricultural experts.
- **AWS Cost Guardian:** explicitly labelled as a concept / in-development. The portfolio describes intended safeguards, not completed capabilities.
- **AWS experiments:** described as hands-on learning labs. Generic GitHub profile links are labelled as such and are not represented as individual project repositories.

## Before publishing
- Replace any placeholder status or description with verified project details.
- Add direct repository links and screenshots for each project when available.
- Add a Farmora demo URL and technical stack once confirmed.
- Verify all contact and social links.

## Technology
HTML, CSS and vanilla JavaScript. Google Fonts are loaded remotely; system-font fallbacks are provided.
