/**
 * Guizima Group Services — Site content & i18n
 * Bilingual content (FR / EN) for all sections
 */

export type Lang = "fr" | "en";

export type Section =
  | "home"
  | "about"
  | "services"
  | "products"
  | "projects"
  | "team"
  | "blog"
  | "events"
  | "careers"
  | "donations"
  | "faq"
  | "contact";

export const content = {
  fr: {
    nav: {
      home: "Accueil",
      about: "À Propos",
      services: "Services",
      products: "Solutions",
      projects: "Réalisations",
      team: "Le Groupe",
      blog: "Actualités",
      events: "Événements",
      careers: "Carrières",
      donations: "Engagement",
      faq: "FAQ",
      contact: "Contact",
      cta: "Demander un Devis",
    },
    hero: {
      badge: "GUIZIMA GROUP SERVICES / GUINÉE",
      title1: "Une force,",
      title2: "plusieurs métiers.",
      title3: "Un même niveau d'exigence.",
      subtitle:
        "Du commerce général aux travaux publics, Guizima Group Services met en mouvement les projets qui font avancer la Guinée.",
      primaryCta: "Explorer nos domaines",
      secondaryCta: "Voir nos réalisations",
      stats: [
        { value: 8, suffix: "", label: "Domaines d'activité" },
        { value: 1, suffix: "", label: "Groupe intégré" },
        { value: 100, suffix: "%", label: "Engagement qualité" },
        { value: 24, suffix: "/7", label: "Esprit de service" },
      ],
    },
    about: {
      tag: "À propos de Guizima",
      title: "Un groupe intégré au service des ambitions guinéennes",
      lead: "GUIZIMA GROUP SERVICES est un partenaire multisectoriel qui relie approvisionnement, mobilité, construction et développement local avec une exigence constante de fiabilité.",
      paragraphs: [
        "Nous accompagnons les entreprises, les institutions et les particuliers avec des solutions concrètes, une organisation agile et une connaissance fine des réalités du terrain.",
        "Notre modèle repose sur la complémentarité de huit métiers: commerce général, hydrocarbures, services, transport, immobilier, construction, agriculture et élevage.",
        "Chaque mission est pensée pour créer une valeur durable, avec une attention particulière portée à la qualité d'exécution, au respect des engagements et au développement des communautés.",
      ],
      mission: {
        title: "Notre Mission",
        text: "Transformer les besoins de nos clients en solutions fiables, utiles et créatrices de valeur pour la Guinée.",
      },
      vision: {
        title: "Notre Vision",
        text: "Devenir une référence guinéenne des services intégrés, reconnue pour son sérieux, son impact et sa capacité à faire grandir les projets.",
      },
      values: [
        { title: "Fiabilité", desc: "Des engagements clairs, tenus avec méthode et constance." },
        { title: "Agilité", desc: "Une réponse rapide et adaptée à chaque contexte." },
        { title: "Intégrité", desc: "Des relations professionnelles bâties sur la confiance." },
        { title: "Impact local", desc: "Des activités qui contribuent au développement de la Guinée." },
      ],
    },
    services: {
      tag: "Nos domaines d'activité",
      title: "Huit métiers. Une seule signature: faire avancer vos projets.",
      subtitle:
        "Un portefeuille d'activités complémentaire pour répondre aux besoins des entreprises, des institutions et des communautés.",
      items: [
        { 
          icon: "compass", 
          title: "Commerce général (import-export)", 
          desc: "Approvisionnement, négoce et mise en relation pour accompagner les besoins des entreprises et des institutions.",
          features: ["Importation et exportation", "Approvisionnement professionnel", "Sourcing de produits", "Distribution et représentation"]
        },
        { 
          icon: "hard-hat", 
          title: "Hydrocarbures & lubrifiants", 
          desc: "Vente d'hydrocarbures et de produits lubrifiants pour les besoins de la mobilité, de l'industrie et des opérations.",
          features: ["Fourniture d'hydrocarbures", "Produits lubrifiants", "Approvisionnement régulier", "Solutions adaptées aux flottes"]
        },
        { 
          icon: "pickaxe", 
          title: "Prestations de services", 
          desc: "Des prestations souples et professionnelles pour simplifier vos opérations et vous permettre de rester concentré sur votre cœur de métier.",
          features: ["Services aux entreprises", "Appui opérationnel", "Gestion de besoins ponctuels", "Solutions sur mesure"]
        },
        { 
          icon: "leaf", 
          title: "Transport & logistique", 
          desc: "Nous organisons le déplacement des personnes et des marchandises avec une logistique pensée pour la fiabilité.",
          features: ["Transport de marchandises", "Organisation logistique", "Gestion des flux", "Solutions pour entreprises"]
        },
        { 
          icon: "shield", 
          title: "Immobilier", 
          desc: "Des opportunités et services immobiliers pensés pour accompagner l'installation, l'habitat et l'activité professionnelle.",
          features: ["Conseil immobilier", "Mise en relation", "Accompagnement de projets", "Solutions pour particuliers et entreprises"]
        },
        { 
          icon: "truck", 
          title: "Construction & travaux publics", 
          desc: "Nous contribuons à bâtir et rénover les infrastructures qui structurent les territoires.",
          features: ["Construction de bâtiments", "Rénovation", "Travaux publics", "Suivi et coordination de projets"]
        },
        { 
          icon: "graduation", 
          title: "Agriculture", 
          desc: "Des activités et partenariats agricoles qui participent à la production et à la sécurité alimentaire.",
          features: ["Production agricole", "Approvisionnement", "Valorisation des filières", "Partenariats locaux"]
        },
        { 
          icon: "clipboard", 
          title: "Élevage", 
          desc: "Nous développons des activités d'élevage et des partenariats qui renforcent les chaînes de valeur locales.",
          features: ["Élevage et production", "Développement de cheptels", "Partenariats agricoles", "Valorisation des produits"]
        },
      ],
    },
    products: {
      tag: "Boutique & Fournitures",
      title: "Catégories de produits & solutions",
      subtitle:
        "Notre module e-commerce couvre 7 catégories de produits et solutions dédiées au secteur minier et industriel.",
      categories: [
        { name: "Équipements et Fournitures Minières", count: 48 },
        { name: "Formation et Solutions HSE", count: 32 },
        { name: "Fourniture et Maintenance des Équipements HSE", count: 26 },
        { name: "Solutions Environnementales", count: 19 },
        { name: "Solutions Numériques", count: 14 },
        { name: "Documentation et Système de Gestion HSE : Conception et Mise en place du Système de Gestion HSE – en conformité avec les normes ISO", count: 22 },
        { name: "Solutions Personnalisées", count: 8 },
      ],
      items: [
        { name: "Kit EPI Premium Minier", category: "Formation et Solutions HSE", price: 285000, badge: "Best-seller" },
        { name: "Pompe Centrifuge Industrielle", category: "Équipements et Fournitures Minières", price: 4500000 },
        { name: "Logiciel de Surveillance HSE", category: "Solutions Numériques", price: 1200000, badge: "Nouveau" },
        { name: "Module Formation SSE Niveau 1", category: "Documentation et Système de Gestion HSE : Conception et Mise en place du Système de Gestion HSE – en conformité avec les normes ISO", price: 350000 },
        { name: "Station de Traitement d'Eau", category: "Solutions Environnementales", price: 18500000 },
        { name: "Fourniture et Maintenance des Équipements HSE", category: "Fourniture et Maintenance des Équipements HSE", price: 920000 },
        { name: "Audit Énergétique Personnalisé", category: "Solutions Personnalisées", price: 3500000, badge: "Sur-mesure" },
        { name: "Détecteur Multi-Gaz Portable", category: "Formation et Solutions HSE", price: 680000 },
      ],
    },
    projects: {
      tag: "Réalisations",
      title: "Des projets qui créent une valeur durable",
      subtitle:
        "Sélection de projets illustrant notre engagement pour l'excellence opérationnelle et le développement responsable.",
      items: [
        { name: "Programme d'Exploration Boké", sector: "Exploration", year: "2024", status: "Livré" },
        { name: "Audit HSE Complexe Minier Kalia", sector: "HSE", year: "2024", status: "Livré" },
        { name: "Plan de Gestion Environnementale Nimba", sector: "Environnement", year: "2023", status: "En cours" },
        { name: "Centre de Formation Technique Conakry", sector: "Formation", year: "2023", status: "Livré" },
        { name: "Optimisation Logistique Port de Conakry", sector: "Logistique", year: "2025", status: "En cours" },
        { name: "Maintenance Industrielle SIMFER", sector: "Maintenance", year: "2024", status: "Livré" },
      ],
    },
    stats: {
      tag: "Impact",
      title: "Une présence qui compte",
      items: [
        { value: 100, suffix: "%", label: "Conformité HSE" },
        { value: 7, suffix: "", label: "Catégories de Produits" },
        { value: 12, suffix: "+", label: "Domaines d'Expertise" },
        { value: 24, suffix: "/7", label: "Support Disponible" },
      ],
    },
    team: {
      tag: "Notre Équipe",
      title: "Des talents engagés pour l'excellence",
      subtitle:
        "Ingénieurs, techniciens, spécialistes HSE et experts désireux de contribuer à des projets miniers innovants dans un environnement fondé sur l'excellence, la sécurité et l'intégrité.",
      members: [
        { name: "Direction Générale", role: "CEO & Fondateur", expertise: "Stratégie • Ingénierie Minière" },
        { name: "Direction Technique", role: "Directrice des Opérations", expertise: "Exploitation • HSE" },
        { name: "Direction HSE", role: "Responsable Santé-Sécurité", expertise: "Environnement • Conformité" },
        { name: "Direction Ingénierie", role: "Ingénieur en Chef", expertise: "Conception • Construction" },
        { name: "Direction Formation", role: "Responsable Capacités", expertise: "Formation • Développement" },
        { name: "Direction Logistique", role: "Responsable Supply Chain", expertise: "Logistique • Maintenance" },
      ],
    },
    testimonials: {
      tag: "Témoignages",
      title: "La confiance de nos partenaires",
      items: [
        { quote: "Guizima a compris nos contraintes et a livré une réponse fiable, avec une vraie qualité de suivi.", author: "Directeur des Opérations", company: "Entreprise partenaire, Guinée" },
        { quote: "Un partenaire stratégique qui combine innovation technique et responsabilité sociale. Nos projets n'ont jamais été aussi performants.", author: "CEO", company: "Investisseur Minier, Afrique de l'Ouest" },
        { quote: "Le programme de formation a renforcé durablement les compétences de nos équipes locales. Un véritable transfert de savoir-faire.", author: "Responsable RH", company: "Groupe Industriel, Conakry" },
      ],
    },
    partners: {
      tag: "Ils nous font confiance",
      title: "Partenaires & Collaborateurs",
      items: ["MINISTRY OF MINES", "CBG", "RIO TINTO", "SMB", "SIMFER", "ANGLOGOLD ASHANTI", "GUINEA ALUMINA", "WORLD BANK", "UNDP"],
    },
    blog: {
      tag: "Actualités",
      title: "Insights & publications",
      subtitle: "Analyses, retours d'expérience et actualités du secteur minier guinéen et international.",
      items: [
        { title: "L'avenir de l'exploitation minière durable en Guinée", category: "Stratégie", date: "12 Juin 2026", readTime: "8 min" },
        { title: "Standards HSE : comment dépasser les exigences internationales", category: "HSE", date: "28 Mai 2026", readTime: "6 min" },
        { title: "Renforcement des capacités : le levier du développement local", category: "Formation", date: "15 Mai 2026", readTime: "10 min" },
        { title: "Digitalisation des opérations minières : état des lieux 2026", category: "Innovation", date: "02 Mai 2026", readTime: "7 min" },
      ],
    },
    events: {
      tag: "Agenda",
      title: "Événements à venir",
      subtitle: "Rencontres, partenariats et temps forts qui font vivre l'écosystème Guizima.",
      items: [
        { name: "Forum des entrepreneurs guinéens", date: "15-17 Septembre 2026", location: "Conakry, Guinée", type: "Forum" },
        { name: "Formation HSE Niveau 2", date: "08-10 Octobre 2026", location: "Matoto, Conakry", type: "Formation" },
        { name: "Conférence Industrie Minière Durable", date: "22 Novembre 2026", location: "Abidjan, Côte d'Ivoire", type: "Conférence" },
        { name: "Workshop Digitalisation Minière", date: "05 Décembre 2026", location: "En ligne", type: "Workshop" },
      ],
    },
    faq: {
      tag: "Questions Fréquentes",
      title: "Tout ce que vous devez savoir",
      items: [
        { q: "Quels types de clients accompagnez-vous ?", a: "Nous accompagnons les entreprises, les institutions, les investisseurs et les particuliers qui recherchent un partenaire fiable en Guinée." },
        { q: "Dans quels domaines intervient Guizima ?", a: "Notre groupe intervient dans le commerce général, les hydrocarbures, les prestations de services, le transport, l'immobilier, la construction, l'agriculture et l'élevage." },
        { q: "Où intervenez-vous ?", a: "Basé en Guinée, Guizima développe des partenariats et des opérations selon les besoins de ses clients sur le territoire national et dans la sous-région." },
        { q: "Comment obtenir un devis ?", a: "Écrivez-nous via le formulaire de contact en précisant votre besoin. Notre équipe vous répondra rapidement avec une proposition adaptée." },
        { q: "Proposez-vous des solutions sur mesure ?", a: "Oui. Notre organisation multisectorielle nous permet de composer une réponse adaptée à chaque projet et à chaque budget." },
        { q: "Comment devenir partenaire ?", a: "Présentez-nous votre activité et vos capacités via la page Contact. Nous étudierons ensemble les synergies possibles." },
      ],
    },
    careers: {
      tag: "Recrutement",
      title: "Rejoignez l'aventure Guizima",
      subtitle: "Nous recrutons des talents désireux de contribuer à des projets miniers innovants dans un environnement fondé sur l'excellence, la sécurité et l'intégrité.",
      openings: [
        { title: "Ingénieur Minier Senior", location: "Conakry, Guinée", type: "CDI", dept: "Ingénierie" },
        { title: "Spécialiste HSE", location: "Site Boké", type: "CDI", dept: "HSE" },
        { title: "Formateur Technique", location: "Conakry, Guinée", type: "CDD", dept: "Formation" },
        { title: "Responsable Logistique", location: "Conakry, Guinée", type: "CDI", dept: "Logistique" },
      ],
    },
    donations: {
      tag: "Dons & Soutien",
      title: "Soutenir le développement des communautés",
      subtitle: "Vos contributions financent des initiatives génératrices de valeur pour les communautés d'accueil : formation, emploi local, infrastructures sociales.",
      tiers: [
        { amount: 50000, perks: ["Certificat de contribution", "Newsletter communautaire"] },
        { amount: 250000, perks: ["Certificat signé", "Rapport d'impact annuel", "Visite de projet (1)"] },
        { amount: 1000000, perks: ["Statut Partenaire", "Rapport trimestriel", "Visites guidées (4)", "Reconnaissance publique"] },
      ],
    },
    contact: {
      tag: "Contact",
      title: "Parlons de votre projet",
      subtitle: "Notre équipe vous répond sous 48 heures avec une proposition adaptée à vos besoins.",
      form: {
        name: "Nom complet",
        email: "Email professionnel",
        phone: "Téléphone",
        company: "Société",
        subject: "Sujet",
        message: "Votre message",
        submit: "Envoyer la demande",
        success: "Merci ! Votre message a bien été envoyé. Nous vous répondrons sous 48h.",
      },
      info: {
        address: "Matoto Centre, Commune Urbaine de Matoto\nConakry",
        phone: "+224 624 56 72 72",
        email: "contact@guizimagroup.com",
        hours: "Lun – Ven : 08h00 — 18h00\nSam : 09h00 — 13h00",
      },
    },
    footer: {
      tagline: "GUIZIMA GROUP SERVICES",
      description: "Un groupe guinéen multisectoriel au service du commerce, des infrastructures, de la mobilité et du développement local.",
      columns: {
        company: "Société",
        services: "Services",
        shop: "Boutique",
        resources: "Ressources",
      },
      newsletter: {
        title: "Newsletter",
        text: "Recevez nos analyses et actualités du secteur minier.",
        placeholder: "Votre email",
        cta: "S'abonner",
      },
      rights: "Tous droits réservés.",
      legal: ["Mentions légales", "Confidentialité", "CGV", "Cookies"],
    },
    chatbot: {
      title: "Guizima Assistant",
      subtitle: "Réponse en quelques secondes",
      greeting: "Bonjour 👋 Je suis l'assistant Guizima. Comment puis-je vous aider aujourd'hui ?",
      placeholder: "Tapez votre message...",
      quick: ["Vos services ?", "Demander un devis", "Nous contacter", "Nos formations"],
      response:
        "Merci pour votre message ! Notre équipe vous recontactera rapidement. Appelez le +224 624 56 72 72 ou écrivez à contact@guizimagroup.com.",
    },
    common: {
      learnMore: "En savoir plus",
      viewAll: "Voir tout",
      requestQuote: "Demander un devis",
      contactUs: "Nous contacter",
      explore: "Explorer",
      readMore: "Lire plus",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      products: "Shop",
      projects: "Projects",
      team: "Team",
      blog: "Blog",
      events: "Events",
      careers: "Careers",
      donations: "Donations",
      faq: "FAQ",
      contact: "Contact",
      cta: "Request a Quote",
    },
    hero: {
      badge: "Mining Engineering",
      title1: "Mining",
      title2: "Excellence",
      title3: "Shaped for the Future",
      subtitle:
        "Our commitment is to help our partners improve their performance, manage their risks, and deliver sustainable projects that comply with the best international and local practices and standards.",
      primaryCta: "Discover our Services",
      secondaryCta: "Our Projects",
      stats: [
        { value: 12, suffix: "+", label: "Expertise Domains" },
        { value: 7, suffix: "", label: "Product Categories" },
        { value: 100, suffix: "%", label: "HSE Commitment" },
        { value: 5, suffix: "", label: "Professional Emails" },
      ],
    },
    about: {
      tag: "About IREX Mining",
      title: "A trusted strategic partner for the mining sector",
      lead: "IREX Mining Limited was created to promote sustainable and integrated development through specialized services in engineering, construction, research, expertise, consulting, investigation and professional training for public, private and mixed sectors.",
      paragraphs: [
        "IREX Mining supports organizations in achieving their strategic and operational goals by providing innovative solutions, high-level technical expertise and professional support tailored to their needs.",
        "Through the mobilization of multidisciplinary skills and the sharing of best practices, IREX Mining operates in engineering, construction, mining, environment, occupational health and safety, research and capacity building.",
        "Our ambition is to become a trusted strategic partner offering integrated services covering exploration, mining project development, operations, environmental management, occupational health and safety, logistics, maintenance and capacity building.",
      ],
      mission: {
        title: "Our Mission",
        text: "Develop responsible and value-creating mining projects, placing operational excellence, environmental protection and community development at the heart of every engagement.",
      },
      vision: {
        title: "Our Vision",
        text: "Build a future where economic performance, innovation, social responsibility and environmental protection evolve together to create lasting value for our clients, partners and future generations.",
      },
      values: [
        { title: "Operational Excellence", desc: "Best international practices serving high-performing and safe projects." },
        { title: "Environmental Responsibility", desc: "Promoting sustainable exploitation of natural resources." },
        { title: "Integrity & Transparency", desc: "Lasting partnerships based on trust and performance." },
        { title: "Local Development", desc: "Strengthening local skills and fostering national employment." },
      ],
    },
    services: {
      tag: "Our Expertise",
      title: "Integrated services across the mining value chain",
      subtitle:
        "IREX Mining mobilizes multidisciplinary skills to cover the entire mining cycle — from exploration to mine closure.",
      items: [
        { 
          icon: "compass", 
          title: "Exploration & Research", 
          desc: "Exploration programs, geological investigations and deposit evaluation with the best international practices.",
          features: ["Detailed geological mapping", "Precision drilling and sampling", "3D deposit modeling", "Technical feasibility studies"]
        },
        { 
          icon: "hard-hat", 
          title: "Engineering & Construction", 
          desc: "Design, sizing and execution of mining and industrial projects end-to-end, with tailored professional support.",
          features: ["Preliminary engineering studies", "Construction supervision", "EPC project management", "Commissioning and optimization"]
        },
        { 
          icon: "pickaxe", 
          title: "Mining Operations", 
          desc: "Optimized, high-performing and responsible mining solutions, tailored to our partners' needs.",
          features: ["Open-pit and underground mine planning", "Drill and blast optimization", "Equipment fleet management", "Real-time production monitoring"]
        },
        { 
          icon: "leaf", 
          title: "Environmental Management", 
          desc: "Impact studies, management plans and environmental monitoring for sustainable operations.",
          features: ["Environmental and Social Impact Assessments (ESIA)", "Water and mine tailings management", "Rehabilitation and closure plans", "Air and water quality monitoring"]
        },
        { 
          icon: "shield", 
          title: "Health & Safety (HSE)", 
          desc: "Guaranteeing the highest Health, Safety and Environment standards compliant with the most demanding norms.",
          features: ["HSE compliance audits", "Risk management plan development", "First aid and rescue training", "Incident investigation and root cause analysis"]
        },
        { 
          icon: "truck", 
          title: "Logistics & Maintenance", 
          desc: "Logistics optimization and industrial maintenance for efficient and continuous operations.",
          features: ["Supply chain management", "Predictive and preventive maintenance", "Transport flow optimization", "Spare parts inventory management"]
        },
        { 
          icon: "graduation", 
          title: "Capacity Building", 
          desc: "Professional training and development of local skills to support national employment.",
          features: ["Tailored training programs", "Technical skills transfer", "Coaching and mentoring", "Skills assessment and certifications"]
        },
        { 
          icon: "clipboard", 
          title: "Consulting & Expertise", 
          desc: "Technical advice, audit and high-level expertise to secure and valorize your investments.",
          features: ["Technical and financial due diligence", "Independent operational audits", "Project management assistance", "Mining development strategy consulting"]
        },
      ],
    },
    products: {
      tag: "Shop & Supplies",
      title: "Product & solution categories",
      subtitle:
        "Our e-commerce module covers 7 product and solution categories dedicated to the mining and industrial sector.",
      categories: [
        { name: "Mining Equipment & Supplies", count: 48 },
        { name: "HSE Solutions", count: 32 },
        { name: "Industrial Maintenance", count: 26 },
        { name: "Environmental Solutions", count: 19 },
        { name: "Digital Solutions", count: 14 },
        { name: "Documentation & Training", count: 22 },
        { name: "Custom Solutions", count: 8 },
      ],
      items: [
        { name: "Premium Mining PPE Kit", category: "HSE Solutions", price: 285000, badge: "Best-seller" },
        { name: "Industrial Centrifugal Pump", category: "Mining Equipment & Supplies", price: 4500000 },
        { name: "HSE Monitoring Software", category: "Digital Solutions", price: 1200000, badge: "New" },
        { name: "HSE Training Module Level 1", category: "Documentation & Training", price: 350000 },
        { name: "Water Treatment Plant", category: "Environmental Solutions", price: 18500000 },
        { name: "Heavy Maintenance Tooling", category: "Industrial Maintenance", price: 920000 },
        { name: "Custom Energy Audit", category: "Custom Solutions", price: 3500000, badge: "Made-to-measure" },
        { name: "Portable Multi-Gas Detector", category: "HSE Solutions", price: 680000 },
      ],
    },
    projects: {
      tag: "Achievements",
      title: "Projects that create lasting value",
      subtitle:
        "A selection of projects illustrating our commitment to operational excellence and responsible development.",
      items: [
        { name: "Boké Exploration Program", sector: "Exploration", year: "2024", status: "Delivered" },
        { name: "Kalia Mining Complex HSE Audit", sector: "HSE", year: "2024", status: "Delivered" },
        { name: "Nimba Environmental Management Plan", sector: "Environment", year: "2023", status: "Ongoing" },
        { name: "Conakry Technical Training Center", sector: "Training", year: "2023", status: "Delivered" },
        { name: "Conakry Port Logistics Optimization", sector: "Logistics", year: "2025", status: "Ongoing" },
        { name: "SIMFER Industrial Maintenance", sector: "Maintenance", year: "2024", status: "Delivered" },
      ],
    },
    stats: {
      tag: "Impact",
      title: "A presence that matters",
      items: [
        { value: 100, suffix: "%", label: "HSE Compliance" },
        { value: 7, suffix: "", label: "Product Categories" },
        { value: 12, suffix: "+", label: "Expertise Domains" },
        { value: 24, suffix: "/7", label: "Support Available" },
      ],
    },
    team: {
      tag: "Our Team",
      title: "Talents committed to excellence",
      subtitle:
        "Engineers, technicians, HSE specialists and experts eager to contribute to innovative mining projects in an environment built on excellence, safety and integrity.",
      members: [
        { name: "General Management", role: "CEO & Founder", expertise: "Strategy • Mining Engineering" },
        { name: "Technical Management", role: "Operations Director", expertise: "Operations • HSE" },
        { name: "HSE Management", role: "Health-Safety Manager", expertise: "Environment • Compliance" },
        { name: "Engineering Management", role: "Chief Engineer", expertise: "Design • Construction" },
        { name: "Training Management", role: "Capacity Manager", expertise: "Training • Development" },
        { name: "Logistics Management", role: "Supply Chain Manager", expertise: "Logistics • Maintenance" },
      ],
    },
    testimonials: {
      tag: "Testimonials",
      title: "Our partners' trust",
      items: [
        { quote: "IREX Mining transformed our safety approach. Their rigor and technical expertise took our HSE compliance to an unprecedented level.", author: "Operations Director", company: "Mining Company, Guinea" },
        { quote: "A strategic partner combining technical innovation and social responsibility. Our projects have never been so successful.", author: "CEO", company: "Mining Investor, West Africa" },
        { quote: "The training program durably strengthened the skills of our local teams. A true know-how transfer.", author: "HR Manager", company: "Industrial Group, Conakry" },
      ],
    },
    partners: {
      tag: "They trust us",
      title: "Partners & Collaborators",
      items: ["MINISTRY OF MINES", "CBG", "RIO TINTO", "SMB", "SIMFER", "ANGLOGOLD ASHANTI", "GUINEA ALUMINA", "WORLD BANK", "UNDP"],
    },
    blog: {
      tag: "News",
      title: "Insights & publications",
      subtitle: "Analyses, case studies and news from the Guinean and international mining sector.",
      items: [
        { title: "The future of sustainable mining in Guinea", category: "Strategy", date: "June 12, 2026", readTime: "8 min" },
        { title: "HSE standards: exceeding international requirements", category: "HSE", date: "May 28, 2026", readTime: "6 min" },
        { title: "Capacity building: the lever for local development", category: "Training", date: "May 15, 2026", readTime: "10 min" },
        { title: "Mining operations digitalization: 2026 overview", category: "Innovation", date: "May 02, 2026", readTime: "7 min" },
      ],
    },
    events: {
      tag: "Agenda",
      title: "Upcoming events",
      subtitle: "Trade shows, conferences and training sessions organized or co-organized by IREX Mining.",
      items: [
        { name: "Guinea Mining Summit 2026", date: "September 15-17, 2026", location: "Conakry, Guinea", type: "Summit" },
        { name: "HSE Training Level 2", date: "October 08-10, 2026", location: "Matoto, Conakry", type: "Training" },
        { name: "Sustainable Mining Industry Conference", date: "November 22, 2026", location: "Abidjan, Côte d'Ivoire", type: "Conference" },
        { name: "Mining Digitalization Workshop", date: "December 05, 2026", location: "Online", type: "Workshop" },
      ],
    },
    faq: {
      tag: "Frequently Asked Questions",
      title: "Everything you need to know",
      items: [
        { q: "What types of clients does IREX Mining support?", a: "We support mining companies, investors and project developers, governments and public institutions, industrial partners, international organizations, local communities and sector talents." },
        { q: "In which areas does IREX Mining operate?", a: "Our interventions cover engineering, construction, mining, environment, occupational health and safety, research and capacity building, as well as specialized consulting and expertise." },
        { q: "What are your geographic intervention zones?", a: "Our headquarters is at Matoto Centre, Commune Urbaine de Matoto, Conakry — Republic of Guinea. We mainly operate in West Africa and collaborate with international partners." },
        { q: "How can I get a custom quote?", a: "You can contact us via the contact form, by phone at 626868323, or by email at irexmine1@outlook.com. Our team will respond within 48h with a tailored proposal." },
        { q: "Do you offer professional training?", a: "Yes. Capacity building is a pillar of our offering, with HSE, technical and managerial training adapted to the needs of the Guinean mining sector." },
        { q: "What HSE standards do you follow?", a: "We apply the best international practices and guarantee the highest Health, Safety and Environment standards, compliant with the most demanding sector norms." },
      ],
    },
    careers: {
      tag: "Careers",
      title: "Join the IREX Mining adventure",
      subtitle: "We recruit talents eager to contribute to innovative mining projects in an environment built on excellence, safety and integrity.",
      openings: [
        { title: "Senior Mining Engineer", location: "Conakry, Guinea", type: "Permanent", dept: "Engineering" },
        { title: "HSE Specialist", location: "Boké Site", type: "Permanent", dept: "HSE" },
        { title: "Technical Trainer", location: "Conakry, Guinea", type: "Fixed-term", dept: "Training" },
        { title: "Logistics Manager", location: "Conakry, Guinea", type: "Permanent", dept: "Logistics" },
      ],
    },
    donations: {
      tag: "Donations & Support",
      title: "Supporting community development",
      subtitle: "Your contributions fund value-creating initiatives for host communities: training, local employment, social infrastructure.",
      tiers: [
        { amount: 50000, perks: ["Contribution certificate", "Community newsletter"] },
        { amount: 250000, perks: ["Signed certificate", "Annual impact report", "Project visit (1)"] },
        { amount: 1000000, perks: ["Partner status", "Quarterly report", "Guided tours (4)", "Public recognition"] },
      ],
    },
    contact: {
      tag: "Contact",
      title: "Let's talk about your project",
      subtitle: "Our team responds within 48 hours with a proposal tailored to your needs.",
      form: {
        name: "Full name",
        email: "Professional email",
        phone: "Phone",
        company: "Company",
        subject: "Subject",
        message: "Your message",
        submit: "Send request",
        success: "Thank you! Your message has been sent. We will respond within 48h.",
      },
      info: {
        address: "Matoto Centre, Commune Urbaine de Matoto\nConakry",
        phone: "+224 626 86 83 23",
        email: "irexmine1@outlook.com",
        hours: "Mon – Fri: 8:00 AM — 6:00 PM\nSat: 9:00 AM — 1:00 PM",
      },
    },
    footer: {
      tagline: "IREX Mining Limited",
      description: "Innovative, sustainable and responsible mining engineering solutions for the development of the mining sector in Guinea and West Africa.",
      columns: {
        company: "Company",
        services: "Services",
        shop: "Shop",
        resources: "Resources",
      },
      newsletter: {
        title: "Newsletter",
        text: "Receive our analyses and mining sector news.",
        placeholder: "Your email",
        cta: "Subscribe",
      },
      rights: "All rights reserved.",
      legal: ["Legal notice", "Privacy", "Terms", "Cookies"],
    },
    chatbot: {
      title: "IREX Assistant",
      subtitle: "Response in seconds",
      greeting: "Hello 👋 I'm the IREX Mining assistant. How can I help you today?",
      placeholder: "Type your message...",
      quick: ["Your services?", "Request a quote", "Contact us", "Our training"],
      response:
        "Thank you for your message! Our team will contact you within 48h. For an immediate response, call +224 626 86 83 23 or write to irexmine1@outlook.com.",
    },
    common: {
      learnMore: "Learn more",
      viewAll: "View all",
      requestQuote: "Request a quote",
      contactUs: "Contact us",
      explore: "Explore",
      readMore: "Read more",
    },
  },
} as const;

export type SiteContent = typeof content.fr;
