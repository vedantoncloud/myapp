# MyApp — Serverless Web App (CI/CD Project)

**Student:** Vedant Mishra  
**GitHub:** https://github.com/vedantoncloud  
**Project Type:** Guided project — Serverless Web App + CI/CD  
**Technologies:** Node.js, Jest, Docker, GitHub Actions, Render  

---

## 🚀 Project Overview
This is a minimal Node.js web application deployed with a full CI/CD pipeline.

Pipeline includes:
- Automated tests using Jest
- Docker image build (optional)
- GitHub Actions CI workflow
- Automatic deployment to Render on every push to `main`

The application also provides a `/health` endpoint for monitoring.

---

## 🛠 How to Run Locally

```bash
git clone https://github.com/vedantoncloud/myapp.git
cd myapp
npm ci
node app.js
