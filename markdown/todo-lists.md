# Todo Lists - Blog Mathématique

## 🎯 Todo Principal - Transformation du Blog

### Phase 1: Modification des Catégories
- [ ] Changer les catégories de blog de "Startup, Technology, Lifestyle" vers "Math, Info"
- [ ] Modifier `app/admin/addBlog/page.jsx` lignes 66-68
- [ ] Mettre à jour les valeurs par défaut dans le state (ligne 14 et 42)
- [ ] Tester l'ajout de blogs avec nouvelles catégories
- [ ] Vérifier l'affichage dans la liste des blogs

### Phase 2: Extension du Schéma MongoDB
- [ ] Étendre `lib/models/BlogModel.js` avec nouveaux champs :
  - [ ] `content` (String, required) - Contenu principal
  - [ ] `latexContent` (String, optional) - Contenu LaTeX
  - [ ] `isPdf` (Boolean, default: false)
  - [ ] `pdfPath` (String, optional)
- [ ] Modifier l'enum des catégories pour limiter à ['Math', 'Info']
- [ ] Créer migration pour les données existantes
- [ ] Tester les nouveaux schémas en base

### Phase 3: Support des Formules Mathématiques
- [ ] Installer MathJax : `npm install mathjax-full react-mathjax`
- [ ] Créer `Components/MathComponents/MathRenderer.jsx`
- [ ] Intégrer MathJax dans le layout principal
- [ ] Créer `Components/MathComponents/MathEditor.jsx`
- [ ] Tester le rendu des formules LaTeX simples
- [ ] Créer des exemples de formules pour tester

### Phase 4: Éditeur de Contenu Enrichi
- [ ] Installer un éditeur riche : `npm install react-quill` ou `npm install @tinymce/tinymce-react`
- [ ] Créer `Components/AdminComponents/BlogEditor.jsx`
- [ ] Intégrer l'éditeur dans `app/admin/addBlog/page.jsx`
- [ ] Ajouter support pour insertion de formules LaTeX
- [ ] Créer prévisualisation en temps réel
- [ ] Tester l'édition et sauvegarde

### Phase 5: Génération PDF
- [ ] Installer Puppeteer : `npm install puppeteer`
- [ ] Créer `lib/utils/pdfUtils.js`
- [ ] Créer `Components/MathComponents/PdfGenerator.jsx`
- [ ] Ajouter bouton "Convertir en PDF" dans l'interface
- [ ] Créer dossier `public/pdfs/` pour stockage
- [ ] Implémenter génération PDF côté serveur
- [ ] Tester génération avec formules mathématiques

### Phase 6: Visualiseur PDF Intégré
- [ ] Installer React PDF : `npm install react-pdf`
- [ ] Créer `Components/MathComponents/PdfViewer.jsx`
- [ ] Ajouter option d'affichage PDF dans les pages de blog
- [ ] Créer navigation entre vue HTML et PDF
- [ ] Optimiser le chargement des PDFs
- [ ] Tester sur différents navigateurs

## 🔧 Todo Technique

### Configuration et Setup
- [ ] Créer variables d'environnement pour LaTeX et PDF
- [ ] Configurer Tailwind pour les nouveaux composants
- [ ] Mettre à jour `CLAUDE.md` avec nouvelles informations
- [ ] Créer documentation API pour nouveaux endpoints
- [ ] Configurer GitHub Actions pour tests automatisés

### API et Backend
- [ ] Créer `app/api/pdf/route.js` pour génération PDF
- [ ] Créer `app/api/latex/route.js` pour validation LaTeX
- [ ] Modifier `app/api/blog/route.js` pour nouveaux champs
- [ ] Ajouter middleware de validation pour contenu LaTeX
- [ ] Créer endpoint pour suppression des PDFs

### Base de Données
- [ ] Créer script de migration pour données existantes
- [ ] Ajouter indexes pour optimisation des requêtes
- [ ] Créer backup avant modifications majeures
- [ ] Tester performances avec gros volumes de données
- [ ] Documenter nouveau schéma

## 🎨 Todo Interface Utilisateur

### Admin Panel
- [ ] Redesigner interface d'ajout de blog
- [ ] Ajouter onglets pour "Contenu" et "LaTeX"
- [ ] Créer prévisualisation côte-à-côte
- [ ] Ajouter validation en temps réel
- [ ] Améliorer messages d'erreur
- [ ] Ajouter indicateurs de progression

### Interface Publique
- [ ] Ajouter filtres par catégorie (Math/Info)
- [ ] Créer templates spéciaux pour contenu mathématique
- [ ] Ajouter bouton de téléchargement PDF
- [ ] Optimiser affichage mobile des formules
- [ ] Ajouter partage social pour PDFs
- [ ] Créer mode sombre pour lecture

## 🧪 Todo Tests et Qualité

### Tests Unitaires
- [ ] Tester composants MathRenderer
- [ ] Tester génération PDF
- [ ] Tester validation LaTeX
- [ ] Tester nouveaux endpoints API
- [ ] Tester migration de données

### Tests d'Intégration
- [ ] Tester flux complet ajout blog → PDF
- [ ] Tester affichage sur différents navigateurs
- [ ] Tester performances avec formules complexes
- [ ] Tester gestion d'erreurs LaTeX
- [ ] Tester sauvegarde et récupération

### Tests Utilisateur
- [ ] Tester UX d'édition de formules
- [ ] Tester téléchargement PDF
- [ ] Tester navigation mobile
- [ ] Tester accessibilité
- [ ] Récolter feedback utilisateurs

## 📚 Todo Documentation

### Documentation Technique
- [ ] Documenter nouveaux composants
- [ ] Créer guide d'utilisation LaTeX
- [ ] Documenter API endpoints
- [ ] Créer troubleshooting guide
- [ ] Documenter processus de déploiement

### Documentation Utilisateur
- [ ] Créer tutoriel d'utilisation
- [ ] Documenter syntaxe LaTeX supportée
- [ ] Créer exemples de formules courantes
- [ ] Créer FAQ pour problèmes courants
- [ ] Créer vidéos explicatives

## 🚀 Todo Déploiement

### Préparation Production
- [ ] Optimiser bundle size
- [ ] Configurer variables d'environnement production
- [ ] Tester sur environnement de staging
- [ ] Préparer rollback plan
- [ ] Configurer monitoring des erreurs

### Mise en Production
- [ ] Sauvegarder base de données
- [ ] Déployer backend en premier
- [ ] Déployer frontend
- [ ] Vérifier fonctionnalités critiques
- [ ] Monitorer performances post-déploiement

---

## 📋 Suivi Global

**Priorité Haute :**
- Modification catégories (Phase 1)
- Support formules mathématiques (Phase 3)
- Génération PDF basique (Phase 5)

**Priorité Moyenne :**
- Extension schéma (Phase 2)
- Éditeur enrichi (Phase 4)
- Interface améliorée

**Priorité Basse :**
- Optimisations avancées
- Tests exhaustifs
- Documentation complète

**Estimation Temps :**
- Phase 1-2 : 1-2 jours
- Phase 3-4 : 3-5 jours
- Phase 5-6 : 2-3 jours
- Tests et polish : 2-3 jours

**Total estimé : 8-13 jours de développement**