<div align="center">
```
██╗███╗   ██╗██████╗ ██╗ █████╗ ███╗   ██╗    ███████╗ ██████╗  ██████╗ ██████╗
██║████╗  ██║██╔══██╗██║██╔══██╗████╗  ██║    ██╔════╝██╔═══██╗██╔═══██╗██╔══██╗
██║██╔██╗ ██║██║  ██║██║███████║██╔██╗ ██║    █████╗  ██║   ██║██║   ██║██║  ██║
██║██║╚██╗██║██║  ██║██║██╔══██║██║╚██╗██║    ██╔══╝  ██║   ██║██║   ██║██║  ██║
██║██║ ╚████║██████╔╝██║██║  ██║██║ ╚████║    ██║     ╚██████╔╝╚██████╔╝██████╔╝
╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝    ╚═╝      ╚═════╝  ╚═════╝ ╚═════╝
```

### 🚀 Projet DevSecOps CI/CD — Apprentissage complet

[![Pipeline](https://github.com/randriamasinoro/indian/actions/workflows/deploy.yml/badge.svg)](https://github.com/randriamasinoro/indian/actions)
[![HTTPS](https://img.shields.io/badge/HTTPS-Let's%20Encrypt-green?logo=letsencrypt)](https://indian-food.duckdns.org)
[![Docker](https://img.shields.io/badge/Docker-Nginx%3Aalpine-blue?logo=docker)](https://hub.docker.com/_/nginx)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

**[🌐 Voir le site en production](https://indian-food.duckdns.org)**

</div>

---

## 🎯 Objectif

Projet d'apprentissage DevSecOps complet — du code source jusqu'à la production sécurisée, en passant par un pipeline CI/CD automatisé avec scans de sécurité intégrés.

> Ce projet illustre les pratiques professionnelles de déploiement sécurisé conformes aux exigences du **Cyber Resilience Act (CRA)**.

---

## ⚡ En un coup d'œil
```
git push  →  Gitleaks  →  Semgrep  →  Trivy  →  Deploy  →  OWASP ZAP
              secrets      SAST        SCA+SBOM   Oracle     DAST
                                          ↓
                                  https://indian-food.duckdns.org
```

---

## 🏗️ Stack technique

| Couche | Technologie | Rôle |
|--------|-------------|------|
| **Hébergement** | Oracle Cloud Free Tier (ARM) | Serveur de production 24/7 |
| **Conteneur** | Docker + Nginx:alpine | Isolation + serveur web |
| **Domaine** | DuckDNS | Nom de domaine gratuit |
| **HTTPS** | Let's Encrypt + Certbot | Certificat SSL automatique |
| **CI/CD** | GitHub Actions | Pipeline automatisé |
| **Secrets** | Gitleaks | Détection credentials |
| **SAST** | Semgrep | Analyse code statique |
| **SCA** | Trivy + SBOM CycloneDX | Vulnérabilités dépendances |
| **DAST** | OWASP ZAP | Tests dynamiques |

---

## 🔒 Pipeline de sécurité
```yaml
git push
    │
    ├── 🔍 Gitleaks     → secrets oubliés dans le code ?
    ├── 🔍 Semgrep      → failles dans le code source ?
    ├── 🔍 Trivy        → CVE dans les dépendances ?
    │
    │   ✅ tout vert → Security Gate ouvert
    │
    ├── 🚀 Deploy       → Oracle Cloud via SSH
    │
    └── 🔍 OWASP ZAP   → site attaquable en ligne ?
```

Si un scan échoue → **déploiement bloqué automatiquement**.

---

## 🚀 Lancer en local
```bash
# Cloner le projet
git clone https://github.com/randriamasinoro/indian.git
cd indian

# Lancer en développement
docker compose -f docker-compose.dev.yml build
docker compose -f docker-compose.dev.yml up -d

# Ouvrir http://localhost
```

---

## 📁 Structure
```
indian/
├── .github/workflows/deploy.yml   ← Pipeline CI/CD complet
├── .zap/rules.tsv                 ← Règles OWASP ZAP
├── public/                        ← Site statique
├── docker/
│   ├── Dockerfile                 ← Production
│   ├── Dockerfile.dev             ← Développement local
│   ├── nginx.conf                 ← Config HTTPS production
│   └── nginx.dev.conf             ← Config HTTP local
├── docker-compose.yml             ← Production
├── docker-compose.dev.yml         ← Développement
└── docs/compliance/               ← Documentation CRA
    ├── architecture.md
    ├── risk-analysis.md
    └── declaration.md
```

---

## 📋 Documentation CRA

Ce projet inclut une documentation de conformité au **Cyber Resilience Act** :

- 📐 [Architecture du système](docs/compliance/architecture.md)
- ⚠️ [Analyse des risques](docs/compliance/risk-analysis.md)
- 📜 [Déclaration de conformité (exemple)](docs/compliance/declaration.md)

> Les rapports de scans (SBOM, SAST, SCA, DAST) sont générés automatiquement
> à chaque déploiement et disponibles dans l'onglet **Actions → Artifacts**.

---

## 🔄 Workflow de mise à jour
```bash
# 1. Modifier le code
nano public/index.html

# 2. Tester en local
docker compose -f docker-compose.dev.yml build && up -d

# 3. Déployer
git add . && git commit -m "feat: description" && git push
# → pipeline se lance automatiquement
```

---

## 👩‍💻 Auteur

**Elisa Randriamasinoro**
Master Cybersécurité des Systèmes Embarqués — Université de Bretagne Sud

[![GitHub](https://img.shields.io/badge/GitHub-randriamasinoro-black?logo=github)](https://github.com/randriamasinoro)

---

<div align="center">

*Projet réalisé dans le cadre d'un apprentissage DevSecOps*
*Oracle Cloud • Docker • GitHub Actions • Let's Encrypt • OWASP*

</div>