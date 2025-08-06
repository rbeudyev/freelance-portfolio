# Portfolio Freelance - Développeur Web & Mobile

Un portfolio moderne et professionnel pour développeurs freelances, conçu avec HTML, Tailwind CSS et JavaScript vanilla.

## 🚀 Caractéristiques

### Design & UX

- **Design moderne et minimaliste** inspiré de Vercel, Linear, Framer
- **Responsive design** optimisé pour desktop, tablette et mobile
- **Animations fluides** au scroll et au hover
- **Navigation fixe** avec menu mobile
- **Bouton retour en haut** avec animation

### Fonctionnalités

- **Sections complètes** : Hero, Services, Projets, À propos, Contact
- **Formulaire de contact** avec validation et notifications
- **Animations au scroll** avec Intersection Observer
- **Menu mobile** avec toggle et fermeture automatique
- **Navigation active** qui suit le scroll
- **Accessibilité** optimisée (a11y)

### Technologies

- **HTML5** sémantique
- **Tailwind CSS** pour le styling
- **JavaScript vanilla** (aucun framework)
- **Font Awesome** pour les icônes
- **Google Fonts** (Inter)

## 📁 Structure du projet

```
portfolio_pro/
├── index.html          # Page principale
├── styles.css          # Styles personnalisés et animations
├── script.js           # JavaScript interactif
└── README.md          # Documentation
```

## 🛠️ Installation et utilisation

### 1. Cloner ou télécharger le projet

```bash
git clone [url-du-repo]
cd portfolio_pro
```

### 2. Ouvrir le projet

Ouvrez simplement le fichier `index.html` dans votre navigateur, ou utilisez un serveur local :

```bash
# Avec Python
python -m http.server 8000

# Avec Node.js (si vous avez http-server installé)
npx http-server

# Avec PHP
php -S localhost:8000
```

### 3. Personnalisation

#### Modifier les informations personnelles

1. **Dans `index.html`** :

   - Remplacez "Votre Nom" par votre nom
   - Modifiez l'email de contact
   - Ajoutez vos vrais liens vers LinkedIn, GitHub, etc.

2. **Personnaliser les couleurs** :

   - Modifiez la couleur primaire dans la config Tailwind (ligne 30)
   - Ajustez les couleurs dans `styles.css` si nécessaire

3. **Ajouter vos projets** :
   - Remplacez les projets d'exemple par vos vrais projets
   - Ajoutez vos vraies images (remplacez les icônes Font Awesome)

#### Modifier le contenu

- **Section Hero** : Adaptez le titre et la description
- **Services** : Modifiez selon vos spécialités
- **Projets** : Remplacez par vos vrais projets avec liens
- **À propos** : Personnalisez votre présentation
- **Contact** : Ajoutez vos vraies informations

## 🎨 Personnalisation avancée

### Changer la couleur principale

Dans `index.html`, ligne 30 :

```javascript
colors: {
    primary: '#6366F1', // Changez cette couleur
    secondary: '#1F2937',
}
```

### Ajouter de nouvelles animations

Dans `styles.css`, ajoutez vos keyframes :

```css
@keyframes votreAnimation {
  from {
    /* état initial */
  }
  to {
    /* état final */
  }
}
```

### Modifier les animations au scroll

Dans `script.js`, section "ANIMATIONS AU SCROLL" :

```javascript
function animateOnScroll() {
  // Ajoutez vos sélecteurs ici
  const elements = document.querySelectorAll(".votre-classe");
  // ...
}
```

## 📱 Responsive Design

Le portfolio est optimisé pour :

- **Desktop** : 1024px et plus
- **Tablette** : 768px - 1023px
- **Mobile** : 767px et moins

### Breakpoints Tailwind utilisés

- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px

## ♿ Accessibilité

Le portfolio respecte les bonnes pratiques d'accessibilité :

- **Navigation au clavier** : Tab, Enter, Escape
- **Focus visible** : Outlines sur les éléments interactifs
- **Contraste** : Couleurs respectant les standards WCAG
- **Sémantique HTML** : Balises appropriées
- **Alt text** : Pour les images (à ajouter)

## 🚀 Déploiement

### Options de déploiement gratuites

1. **GitHub Pages** :

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin [votre-repo]
   git push -u origin main
   ```

   Puis activez GitHub Pages dans les paramètres du repo.

2. **Netlify** :

   - Glissez-déposez le dossier sur netlify.com
   - Ou connectez votre repo GitHub

3. **Vercel** :

   - Importez votre repo sur vercel.com
   - Déploiement automatique

4. **Surge.sh** :
   ```bash
   npm install -g surge
   surge
   ```

## 🔧 Optimisations possibles

### Performance

- **Images optimisées** : Utilisez WebP et différentes tailles
- **Lazy loading** : Pour les images
- **Minification** : CSS et JS pour la production
- **CDN** : Pour les ressources externes

### SEO

- **Meta tags** : Ajoutez vos propres meta descriptions
- **Open Graph** : Pour le partage sur les réseaux sociaux
- **Schema.org** : Données structurées
- **Sitemap** : Pour les moteurs de recherche

### Fonctionnalités bonus

- **Mode sombre** : Toggle dark/light theme
- **Blog section** : Pour partager vos articles
- **Testimonials** : Avis clients
- **Pricing** : Tarifs de vos services
- **Portfolio gallery** : Plus de projets avec filtres

## 📞 Support

Pour toute question ou suggestion d'amélioration :

- Ouvrez une issue sur GitHub
- Contactez-moi via le formulaire du portfolio

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser et le modifier selon vos besoins.

---

**Créé avec ❤️ pour les développeurs freelances**

_Dernière mise à jour : 2024_
