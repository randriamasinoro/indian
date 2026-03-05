# Architecture du système — Documentation CRA

## Identification du produit

- **Nom** : Indian Food — Landing page restaurant
- **Version** : 1.0
- **Date** : 2026-03-05
- **Auteur** : Elisa Randriamasinoro

---

## Vue d'ensemble

Application web statique déployée en production sur Oracle Cloud Free Tier,
accessible publiquement via HTTPS.
```
[Développeur - PC local]
        │
        │ git push
        ▼
[GitHub - Dépôt source]
        │
        │ déclenche automatiquement
        ▼
[GitHub Actions - Pipeline CI/CD]
        ├── Gitleaks  (scan secrets)
        ├── Semgrep   (SAST)
        ├── Trivy     (SCA + SBOM)
        ├── Deploy    (SSH → Oracle Cloud)
        └── OWASP ZAP (DAST)
        │
        ▼
[Oracle Cloud VM - Ubuntu 22.04 ARM]
        └── Docker
              └── Nginx:alpine
                    └── Fichiers statiques (HTML/CSS/JS)
```

---

## Composants techniques

### Serveur de production
- **Fournisseur** : Oracle Cloud Free Tier
- **Architecture** : ARM Ampere (VM.Standard.A1.Flex)
- **OS** : Ubuntu 22.04 LTS
- **CPU** : 1 core / **RAM** : 6 GB
- **IP** : publique fixe
- **Domaine** : indian-food.duckdns.org (DuckDNS)

### Conteneurisation
- **Runtime** : Docker
- **Image base** : nginx:alpine
- **Orchestration** : Docker Compose

### Serveur web
- **Logiciel** : Nginx 1.29.5
- **Protocole** : HTTPS (TLS 1.2 / TLS 1.3)
- **Certificat** : Let's Encrypt (renouvellement automatique)

### Pipeline CI/CD
- **Outil** : GitHub Actions
- **Déclencheur** : push sur branche main
- **Runners** : ubuntu-latest (éphémères)

---

## Flux de données
```
Visiteur
    │ HTTPS TLS 1.3
    ▼
Oracle Cloud Firewall (port 443 autorisé)
    │
    ▼
UFW (pare-feu Ubuntu)
    │
    ▼
Docker Nginx:alpine
    │
    ▼
Fichiers statiques HTML/CSS/JS
(aucune donnée utilisateur collectée)
```

**Données sensibles** : aucune. Le site est 100% statique — pas de base de données, pas de formulaire, pas de cookies, pas de données personnelles collectées.

---

## Mesures de sécurité en place

| Couche | Mesure | Objectif |
|--------|--------|----------|
| Accès serveur | SSH clé ED25519 | Authentification forte |
| Réseau | UFW + Oracle Security List | Moindre privilège |
| Anti-intrusion | Fail2ban | Protection brute-force |
| Transport | HTTPS TLS 1.2/1.3 | Chiffrement en transit |
| HSTS | max-age=31536000 | Force HTTPS navigateur |
| Conteneur | Image Alpine minimale | Surface d'attaque réduite |
| Conteneur | Sans privilèges | Isolation |
| Headers | X-Frame, X-Content-Type, X-XSS | Protection navigateur |
| Pipeline | Gitleaks | Détection secrets |
| Pipeline | Semgrep SAST | Audit code statique |
| Pipeline | Trivy SCA + SBOM | Vulnérabilités dépendances |
| Pipeline | OWASP ZAP DAST | Tests dynamiques |
| Pipeline | Security Gate (needs) | Blocage si vulnérabilité |
| Certificat | Renouvellement auto cron | Continuité HTTPS |

---

## Arborescence du projet
```
Indian_Food/
├── .github/workflows/deploy.yml   ← Pipeline CI/CD
├── .zap/rules.tsv                 ← Règles OWASP ZAP
├── public/                        ← Site statique
│   ├── index.html
│   ├── css/
│   ├── JS/
│   └── Image/
├── docker/
│   ├── Dockerfile                 ← Image production
│   ├── Dockerfile.dev             ← Image développement
│   ├── nginx.conf                 ← Config Nginx production
│   └── nginx.dev.conf             ← Config Nginx développement
├── docker-compose.yml             ← Orchestration production
├── docker-compose.dev.yml         ← Orchestration développement
└── docs/compliance/               ← Documentation CRA
    ├── architecture.md            ← Ce document
    ├── risk-analysis.md
    ├── declaration.md
    ├── sbom.json                  ← Généré automatiquement
    ├── report-sast.json           ← Généré automatiquement
    ├── report-sca.json            ← Généré automatiquement
    └── report-dast.html           ← Généré automatiquement
```