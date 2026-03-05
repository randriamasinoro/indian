# ⚠️ EXEMPLE — Déclaration de conformité CRA (à des fins pédagogiques)

> **Ce document est un exemple créé dans le cadre d'un projet d'apprentissage
> DevSecOps. Il ne constitue pas une vraie déclaration de conformité légale.
> Une vraie déclaration CRA nécessite un audit par un organisme notifié.**

---


# Déclaration de conformité — Cyber Resilience Act

## Identification du produit

- **Nom** : Indian Food — Landing page restaurant
- **Version** : 1.0
- **Date** : 2026-03-05
- **Auteur** : Elisa Randriamasinoro
- **URL** : https://indian-food.duckdns.org
- **Dépôt** : https://github.com/randriamasinoro/indian

---

## Déclaration

Je soussignée Elisa Randriamasinoro, déclare que le produit logiciel
**Indian Food v1.0** a été développé en conformité avec les exigences
essentielles de cybersécurité définies à l'**Annexe I du Cyber Resilience Act**.

---

## Exigences CRA Annexe I — État de conformité

### 1. Pas de vulnérabilités connues exploitables

| Mesure | Outil | Statut |
|--------|-------|--------|
| Scan des vulnérabilités des dépendances | Trivy SCA | ✅ Automatisé |
| SBOM des composants | Trivy CycloneDX | ✅ Généré à chaque déploiement |
| Mises à jour système | apt upgrade | ✅ Appliquées |

### 2. Configuration sécurisée par défaut

| Mesure | Détail | Statut |
|--------|--------|--------|
| Pare-feu | UFW — ports 22, 80, 443 uniquement | ✅ |
| Authentification | SSH clé ED25519, pas de mot de passe | ✅ |
| Conteneur | Sans privilèges, image minimale Alpine | ✅ |
| HTTPS | TLS 1.2/1.3 obligatoire, HSTS activé | ✅ |

### 3. Protection des données

| Mesure | Détail | Statut |
|--------|--------|--------|
| Chiffrement en transit | HTTPS TLS 1.3 | ✅ |
| Données collectées | Aucune (site 100% statique) | ✅ |
| Cookies | Aucun | ✅ |

### 4. Gestion des accès

| Mesure | Détail | Statut |
|--------|--------|--------|
| Authentification serveur | Clé ED25519 uniquement | ✅ |
| Anti brute-force | Fail2ban | ✅ |
| Credentials pipeline | GitHub Secrets chiffrés | ✅ |
| Scan secrets code | Gitleaks automatisé | ✅ |

### 5. Intégrité du système

| Mesure | Détail | Statut |
|--------|--------|--------|
| Analyse code statique | Semgrep SAST | ✅ Automatisé |
| Tests dynamiques | OWASP ZAP DAST | ✅ Automatisé |
| Security Gate | Déploiement bloqué si vulnérabilité critique | ✅ |
| Historique modifications | Git — traçabilité complète | ✅ |

### 6. Disponibilité et continuité

| Mesure | Détail | Statut |
|--------|--------|--------|
| Redémarrage automatique | Docker restart: unless-stopped | ✅ |
| Renouvellement certificat | Cron automatique tous les jours à 3h | ✅ |
| Déploiement continu | GitHub Actions CD | ✅ |

---

## Preuves de conformité

Les preuves suivantes sont générées automatiquement à chaque déploiement
et archivées dans GitHub Actions (conservation 90 jours) :

| Document | Outil | Localisation |
|----------|-------|--------------|
| SBOM CycloneDX | Trivy | Artifact : sca-sbom-reports |
| Rapport vulnérabilités | Trivy | Artifact : sca-sbom-reports |
| Rapport SAST | Semgrep | Artifact : sast-report |
| Rapport DAST | OWASP ZAP | Artifact : dast-report |

---

## Risques résiduels acceptés

| Risque | Justification |
|--------|---------------|
| Déni de service (R5) | Protection complète (WAF/CDN) hors périmètre v1.0 |

---

## Engagement de maintenance

Je m'engage à :
- Appliquer les mises à jour de sécurité dans un délai de **30 jours**
  après publication d'une CVE critique
- Renouveler et maintenir les scans de sécurité automatisés
- Mettre à jour cette déclaration à chaque nouvelle version majeure

---

*Déclaration établie le 2026-03-05 par Elisa Randriamasinoro*