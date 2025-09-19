# MATH&TEX 📚

Une plateforme de blog moderne pour partager des corrigés LaTeX de haute qualité, conçue pour aider les étudiants universitaires dans leur apprentissage des mathématiques et de l'informatique.

## ✨ Fonctionnalités

- **📄 Gestion de PDFs**: Upload et affichage de documents PDF avec visionneuse intégrée
- **🎨 Design Neo-Brutalism**: Interface moderne et audacieuse avec typographie bold
- **📱 Responsive**: Optimisé pour desktop et mobile
- **⚡ Performance**: Prefetch Next.js pour navigation ultra-rapide
- **🔧 Admin Panel**: Interface d'administration complète
- **📧 Newsletter**: Système d'abonnement email
- **🔍 Filtres**: Catégorisation Math/Info avec filtres dynamiques

## 🛠️ Technologies

- **Framework**: Next.js 14 (App Router)
- **Base de données**: MongoDB avec Mongoose ODM
- **Styling**: Tailwind CSS
- **Upload**: Gestion native des fichiers PDF
- **Fonts**: Google Fonts (Outfit)
- **Icons**: Favicon dynamique généré
- **State**: React hooks + react-toastify

## 🚀 Installation

1. **Cloner le projet**
   ```bash
   git clone https://github.com/votre-username/math-tex-blog.git
   cd math-tex-blog
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration MongoDB**
   Créer un fichier `.env.local`:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

5. **Ouvrir dans le navigateur**
   ```
   http://localhost:3000
   ```

## 📂 Structure du projet

```
math-tex-blog/
├── app/                    # Next.js App Router
│   ├── admin/             # Pages d'administration
│   ├── blogs/[id]/        # Pages de détail des blogs
│   ├── api/               # Routes API
│   └── globals.css        # Styles globaux
├── Components/            # Composants React
│   ├── AdminComponents/   # Composants admin
│   ├── Header.jsx         # En-tête principal
│   ├── Footer.jsx         # Pied de page
│   ├── BlogList.jsx       # Liste des blogs
│   └── BlogItem.jsx       # Carte de blog
├── lib/                   # Utilitaires serveur
│   ├── config/db.js       # Configuration MongoDB
│   └── models/            # Modèles Mongoose
├── Assets/                # Images et icônes
└── public/                # Fichiers statiques
    └── pdfs/              # PDFs uploadés
```

## 🎨 Design System

### Couleurs Neo-Brutalism
- **Jaune**: `#facc15` (yellow-400) - Couleur principale
- **Cyan**: `#22d3ee` (cyan-400) - Catégorie Math
- **Rose**: `#f472b6` (pink-400) - Catégorie Info
- **Noir**: `#000000` - Bordures et texte
- **Blanc**: `#ffffff` - Arrière-plans

### Typographie
- **Font**: Outfit (Google Fonts)
- **Poids**: 400, 500, 600, 700
- **Style**: Bold, uppercase, tracking-tight

## 📝 Usage

### Ajouter un blog
1. Aller sur `/admin/addBlog`
2. Uploader un PDF
3. Remplir titre, description, catégorie
4. Publier

### Catégories
- **Math**: Corrigés de mathématiques
- **Info**: Ressources informatique

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
npm run build
npx vercel --prod
```

### Autres plateformes
```bash
npm run build
npm start
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push sur la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**upset blum** - Développeur Full-Stack

---

Fait avec ❤️ pour la communauté étudiante
