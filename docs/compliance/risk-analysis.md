# Analyse des risques — Documentation CRA

## Identification

- **Produit** : Indian Food — Landing page restaurant
- **Version** : 1.0
- **Date** : 2026-03-05
- **Auteur** : Elisa Randriamasinoro
- **Méthode** : STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege)

---

## Échelle de criticité

| Niveau | Score | Définition |
|--------|-------|------------|
| Critique | 4 | Impact majeur, exploitation facile |
| Élevé | 3 | Impact significatif |
| Moyen | 2 | Impact limité |
| Faible | 1 | Impact négligeable |

---

## Risques identifiés

### R1 — Interception des communications (STRIDE : Information Disclosure)

- **Description** : Un attaquant intercepte le trafic HTTP entre le visiteur et le serveur
- **Probabilité** : Faible (2)
- **Impact** : Moyen (2)
- **Score** : 4
- **Mesures** :
  - HTTPS TLS 1.2/1.3 obligatoire
  - Redirection HTTP → HTTPS automatique
  - HSTS max-age=31536000
- **Risque résiduel** : Faible ✅

---

### R2 — Accès non autorisé au serveur (STRIDE : Spoofing)

- **Description** : Un attaquant tente de se connecter au serveur via SSH
- **Probabilité** : Élevée (3) — tentatives automatiques constantes sur Internet
- **Impact** : Critique (4) — accès total au serveur
- **Score** : 12
- **Mesures** :
  - Authentification par clé ED25519 uniquement (pas de mot de passe)
  - Fail2ban — bannissement après 5 tentatives échouées
  - UFW — seuls les ports 22, 80, 443 ouverts
- **Risque résiduel** : Faible ✅

---

### R3 — Défacement du site (STRIDE : Tampering)

- **Description** : Un attaquant exploite une faille Nginx pour modifier les fichiers du site
- **Probabilité** : Faible (2)
- **Impact** : Élevé (3)
- **Score** : 6
- **Mesures** :
  - Image Docker Alpine minimale (surface d'attaque réduite)
  - Conteneur sans privilèges (pas de privileged: true)
  - Conteneur éphémère — recréé à chaque déploiement
  - Trivy SCA — détection des CVE connues sur Nginx/Alpine
- **Risque résiduel** : Faible ✅

---

### R4 — Secrets exposés dans le code (STRIDE : Information Disclosure)

- **Description** : Des credentials (clés SSH, tokens) oubliés dans le code source
- **Probabilité** : Moyenne (2)
- **Impact** : Critique (4)
- **Score** : 8
- **Mesures** :
  - Gitleaks — scan automatique à chaque push
  - GitHub Secrets — credentials jamais en clair dans le code
  - Security Gate — déploiement bloqué si secret détecté
- **Risque résiduel** : Faible ✅

---

### R5 — Déni de service (STRIDE : Denial of Service)

- **Description** : Un attaquant sature le serveur de requêtes pour le rendre indisponible
- **Probabilité** : Moyenne (2)
- **Impact** : Élevé (3)
- **Score** : 6
- **Mesures** :
  - Fail2ban — bannissement automatique des IPs suspectes
  - Docker cgroups — limitation CPU/RAM du conteneur
  - Oracle Cloud — infrastructure réseau avec protection de base
- **Risque résiduel** : Moyen ⚠️ (pas de WAF ni CDN)

---

### R6 — Vulnérabilités des dépendances (STRIDE : Elevation of Privilege)

- **Description** : Une CVE connue dans Nginx ou Alpine Linux est exploitée
- **Probabilité** : Moyenne (2)
- **Impact** : Élevé (3)
- **Score** : 6
- **Mesures** :
  - Trivy SCA — scan automatique des CVE à chaque push
  - SBOM CycloneDX — inventaire complet des composants
  - Security Gate — déploiement bloqué si CVE critique détectée
  - Mises à jour système régulières (apt upgrade)
- **Risque résiduel** : Faible ✅

---

### R7 — Attaques navigateur (STRIDE : Tampering)

- **Description** : Clickjacking, XSS, MIME sniffing via le navigateur du visiteur
- **Probabilité** : Moyenne (2)
- **Impact** : Moyen (2)
- **Score** : 4
- **Mesures** :
  - X-Frame-Options: SAMEORIGIN
  - X-Content-Type-Options: nosniff
  - X-XSS-Protection: 1; mode=block
  - OWASP ZAP DAST — détection automatique après chaque déploiement
- **Risque résiduel** : Faible ✅

---

## Tableau récapitulatif

| ID | Risque | Score initial | Mesures | Risque résiduel |
|----|--------|--------------|---------|-----------------|
| R1 | Interception HTTP | 4 | HTTPS + HSTS | Faible ✅ |
| R2 | Accès SSH non autorisé | 12 | ED25519 + Fail2ban + UFW | Faible ✅ |
| R3 | Défacement site | 6 | Docker isolé + Trivy | Faible ✅ |
| R4 | Secrets dans le code | 8 | Gitleaks + GitHub Secrets | Faible ✅ |
| R5 | Déni de service | 6 | Fail2ban + cgroups | Moyen ⚠️ |
| R6 | Vulnérabilités dépendances | 6 | Trivy + SBOM + Security Gate | Faible ✅ |
| R7 | Attaques navigateur | 4 | Headers sécurité + ZAP | Faible ✅ |

---

## Risques acceptés

**R5 — Déni de service** : le risque résiduel est moyen. Une protection complète
nécessiterait un WAF (Web Application Firewall) ou un CDN (Cloudflare).
Ces solutions dépassent le cadre de ce projet d'apprentissage.
Ce risque est **accepté** pour la version 1.0.