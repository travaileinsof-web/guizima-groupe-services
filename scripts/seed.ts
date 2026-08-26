/**
 * IREX Mining — Seed script
 * Populates DB with initial content matching the existing static content.ts
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  console.log("🌱 Seeding IREX Mining database...");

  // 1. Admin user (default: admin@irexmining.com / admin123)
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await db.adminUser.upsert({
    where: { email: "admin@irexmining.com" },
    update: {},
    create: {
      email: "admin@irexmining.com",
      name: "IREX Admin",
      password: hashedPassword,
      role: "admin",
    },
  });
  console.log(`✓ Admin user: ${admin.email}`);

  // 2. Categories
  const categories = [
    { name: "Équipements et Fournitures Minières", nameEn: "Mining Equipment & Supplies", icon: "pickaxe", order: 1 },
    { name: "Solutions HSE", nameEn: "HSE Solutions", icon: "shield", order: 2 },
    { name: "Maintenance Industrielle", nameEn: "Industrial Maintenance", icon: "wrench", order: 3 },
    { name: "Solutions Environnementales", nameEn: "Environmental Solutions", icon: "leaf", order: 4 },
    { name: "Solutions Numériques", nameEn: "Digital Solutions", icon: "monitor", order: 5 },
    { name: "Documentation et Formation", nameEn: "Documentation & Training", icon: "book-open", order: 6 },
    { name: "Solutions Personnalisées", nameEn: "Custom Solutions", icon: "sparkles", order: 7 },
  ];
  for (const cat of categories) {
    await db.category.upsert({ where: { name: cat.name }, update: {}, create: cat });
  }
  console.log(`✓ ${categories.length} categories`);

  // 3. Products
  const products = [
    { name: "Kit EPI Premium Minier", nameEn: "Premium Mining PPE Kit", description: "Kit complet d'équipement de protection individuelle pour environnements miniers.", descriptionEn: "Complete personal protective equipment kit for mining environments.", price: 285000, badge: "Best-seller", type: "product", categoryName: "Solutions HSE", image: "https://sfile.chatglm.cn/images-ppt/45e8b6cc5e07.jpg" },
    { name: "Pompe Centrifuge Industrielle", nameEn: "Industrial Centrifugal Pump", description: "Pompe centrifuge haute performance pour applications minières et industrielles.", descriptionEn: "High-performance centrifugal pump for mining and industrial applications.", price: 4500000, type: "product", categoryName: "Équipements et Fournitures Minières", image: "https://sfile.chatglm.cn/images-ppt/7488c76bd6cc.png" },
    { name: "Logiciel de Surveillance HSE", nameEn: "HSE Monitoring Software", description: "Plateforme digitale de surveillance et gestion HSE en temps réel.", descriptionEn: "Real-time HSE monitoring and management digital platform.", price: 1200000, badge: "Nouveau", type: "software", categoryName: "Solutions Numériques", image: "https://sfile.chatglm.cn/images-ppt/a7122f749665.jpg" },
    { name: "Module Formation HSE Niveau 1", nameEn: "HSE Training Module Level 1", description: "Formation initiale en Santé, Sécurité et Environnement pour équipes terrain.", descriptionEn: "Initial Health, Safety and Environment training for field teams.", price: 350000, type: "service", categoryName: "Documentation et Formation", image: "https://sfile.chatglm.cn/images-ppt/62ffc9fb8e1e.jpg" },
    { name: "Station de Traitement d'Eau", nameEn: "Water Treatment Plant", description: "Station modulaire de traitement d'eau pour sites miniers isolés.", descriptionEn: "Modular water treatment plant for isolated mining sites.", price: 18500000, type: "product", categoryName: "Solutions Environnementales", image: "https://sfile.chatglm.cn/images-ppt/6b8a65fdc1e9.jpg" },
    { name: "Outillage de Maintenance Lourde", nameEn: "Heavy Maintenance Tooling", description: "Ensemble d'outils spécialisés pour maintenance d'équipements lourds.", descriptionEn: "Specialized tool set for heavy equipment maintenance.", price: 920000, type: "product", categoryName: "Maintenance Industrielle", image: "https://sfile.chatglm.cn/images-ppt/e0ba0d7600aa.jpeg" },
    { name: "Audit Énergétique Personnalisé", nameEn: "Custom Energy Audit", description: "Audit énergétique complet avec recommandations sur-mesure.", descriptionEn: "Complete energy audit with tailored recommendations.", price: 3500000, badge: "Sur-mesure", type: "service", categoryName: "Solutions Personnalisées", image: "https://sfile.chatglm.cn/images-ppt/05f6c556a525.jpg" },
    { name: "Détecteur Multi-Gaz Portable", nameEn: "Portable Multi-Gas Detector", description: "Détecteur portable de gaz multiples pour sécurité minière.", descriptionEn: "Portable multi-gas detector for mining safety.", price: 680000, type: "product", categoryName: "Solutions HSE", image: "https://sfile.chatglm.cn/images-ppt/ad275eddf4ad.jpeg" },
  ];
  for (const p of products) {
    const category = await db.category.findFirst({ where: { name: p.categoryName } });
    if (!category) continue;
    const { categoryName, ...productData } = p;
    await db.product.upsert({ where: { name: p.name }, update: {}, create: { ...productData, categoryId: category.id } });
  }
  console.log(`✓ ${products.length} products`);

  // 4. Projects
  const projects = [
    { name: "Programme d'Exploration Boké", nameEn: "Boké Exploration Program", description: "Programme d'exploration géologique dans la région de Boké avec évaluation de gisements bauxitiques.", descriptionEn: "Geological exploration program in the Boké region with bauxite deposit evaluation.", sector: "Exploration", year: "2024", status: "Livré", image: "https://sfile.chatglm.cn/images-ppt/0514a15d1fe1.jpeg", client: "CBG", location: "Boké, Guinea" },
    { name: "Audit HSE Complexe Minier Kalia", nameEn: "Kalia Mining Complex HSE Audit", description: "Audit complet des standards HSE du complexe minier de Kalia.", descriptionEn: "Complete HSE standards audit of the Kalia mining complex.", sector: "HSE", year: "2024", status: "Livré", image: "https://sfile.chatglm.cn/images-ppt/ad275eddf4ad.jpeg", client: "Bellzone", location: "Kalia, Guinea" },
    { name: "Plan de Gestion Environnementale Nimba", nameEn: "Nimba Environmental Management Plan", description: "Élaboration d'un plan de gestion environnementale pour la réserve du Nimba.", descriptionEn: "Development of an environmental management plan for the Nimba reserve.", sector: "Environnement", year: "2023", status: "En cours", image: "https://sfile.chatglm.cn/images-ppt/a8a5929c0251.png", client: "UNESCO", location: "Nimba, Guinea" },
    { name: "Centre de Formation Technique Conakry", nameEn: "Conakry Technical Training Center", description: "Conception et supervision de la construction d'un centre de formation technique.", descriptionEn: "Design and supervision of a technical training center construction.", sector: "Formation", year: "2023", status: "Livré", image: "https://sfile.chatglm.cn/images-ppt/62ffc9fb8e1e.jpg", client: "Ministry of Mines", location: "Conakry, Guinea" },
    { name: "Optimisation Logistique Port de Conakry", nameEn: "Conakry Port Logistics Optimization", description: "Optimisation des flux logistiques miniers via le Port Autonome de Conakry.", descriptionEn: "Optimization of mining logistics flows through the Conakry Autonomous Port.", sector: "Logistique", year: "2025", status: "En cours", image: "https://sfile.chatglm.cn/images-ppt/4b7f5b68b5f9.png", client: "Port Autonome", location: "Conakry, Guinea" },
    { name: "Maintenance Industrielle SIMFER", nameEn: "SIMFER Industrial Maintenance", description: "Programme de maintenance préventive pour équipements SIMFER.", descriptionEn: "Preventive maintenance program for SIMFER equipment.", sector: "Maintenance", year: "2024", status: "Livré", image: "https://sfile.chatglm.cn/images-ppt/690b24f0e8de.jpeg", client: "SIMFER/Rio Tinto", location: "Simandou, Guinea" },
  ];
  for (const p of projects) {
    await db.project.upsert({ where: { name: p.name }, update: {}, create: p });
  }
  console.log(`✓ ${projects.length} projects`);

  // 5. Team members
  const team = [
    { name: "Direction Générale", role: "CEO & Fondateur", roleEn: "CEO & Founder", expertise: "Stratégie • Ingénierie Minière", expertiseEn: "Strategy • Mining Engineering", photo: "https://sfile.chatglm.cn/images-ppt/62ffc9fb8e1e.jpg" },
    { name: "Direction Technique", role: "Directrice des Opérations", roleEn: "Operations Director", expertise: "Exploitation • HSE", expertiseEn: "Operations • HSE", photo: "https://sfile.chatglm.cn/images-ppt/2dadb83f90c1.jpg" },
    { name: "Direction HSE", role: "Responsable Santé-Sécurité", roleEn: "Health-Safety Manager", expertise: "Environnement • Conformité", expertiseEn: "Environment • Compliance", photo: "https://sfile.chatglm.cn/images-ppt/9ce72928993d.jpeg" },
    { name: "Direction Ingénierie", role: "Ingénieur en Chef", roleEn: "Chief Engineer", expertise: "Conception • Construction", expertiseEn: "Design • Construction", photo: "https://sfile.chatglm.cn/images-ppt/73086b6933ab.jpg" },
    { name: "Direction Formation", role: "Responsable Capacités", roleEn: "Capacity Manager", expertise: "Formation • Développement", expertiseEn: "Training • Development", photo: "https://sfile.chatglm.cn/images-ppt/e509d0089bf9.jpg" },
    { name: "Direction Logistique", role: "Responsable Supply Chain", roleEn: "Supply Chain Manager", expertise: "Logistique • Maintenance", expertiseEn: "Logistics • Maintenance", photo: "https://sfile.chatglm.cn/images-ppt/480f3f31f20c.jpg" },
  ];
  for (const m of team) {
    await db.teamMember.upsert({ where: { name: m.name }, update: {}, create: m });
  }
  console.log(`✓ ${team.length} team members`);

  // 6. Blog posts
  const posts = [
    { title: "L'avenir de l'exploitation minière durable en Guinée", titleEn: "The future of sustainable mining in Guinea", excerpt: "Analyse des enjeux et opportunités du secteur minier guinéen en 2026.", excerptEn: "Analysis of challenges and opportunities in the Guinean mining sector in 2026.", content: "L'exploitation minière durable en Guinée représente un enjeu majeur pour l'économie du pays. Avec ses vastes réserves de bauxite, de fer et d'or, la Guinée se positionne comme un acteur clé du secteur minier ouest-africain. Cependant, l'exploitation de ces ressources doit se faire dans le respect des normes environnementales et sociales les plus strictes.", contentEn: "Sustainable mining in Guinea represents a major challenge for the country's economy. With its vast reserves of bauxite, iron and gold, Guinea positions itself as a key player in the West African mining sector. However, exploiting these resources must be done in compliance with the strictest environmental and social standards.", category: "Stratégie", coverImage: "https://sfile.chatglm.cn/images-ppt/7a1718685b10.jpg", author: "IREX Mining", readTime: "8 min" },
    { title: "Standards HSE : comment dépasser les exigences internationales", titleEn: "HSE standards: exceeding international requirements", excerpt: "Retours d'expérience sur l'application des standards HSE.", excerptEn: "Feedback on applying HSE standards.", content: "Les standards HSE internationaux servent de base, mais les meilleures entreprises minières vont au-delà.", contentEn: "International HSE standards serve as a baseline, but the best mining companies go beyond.", category: "HSE", coverImage: "https://sfile.chatglm.cn/images-ppt/e6348a09b7be.jpg", author: "IREX Mining", readTime: "6 min" },
    { title: "Renforcement des capacités : le levier du développement local", titleEn: "Capacity building: the lever for local development", excerpt: "Comment la formation professionnelle transforme les communautés.", excerptEn: "How vocational training transforms communities.", content: "Le renforcement des capacités locales est un pilier essentiel du développement durable.", contentEn: "Building local capacity is an essential pillar of sustainable development.", category: "Formation", coverImage: "https://sfile.chatglm.cn/images-ppt/23a0ac40d35d.jpg", author: "IREX Mining", readTime: "10 min" },
    { title: "Digitalisation des opérations minières : état des lieux 2026", titleEn: "Mining operations digitalization: 2026 overview", excerpt: "Tour d'horizon des technologies qui transforment la mine.", excerptEn: "Overview of technologies transforming mining.", content: "La digitalisation transforme profondément les opérations minières modernes.", contentEn: "Digitalization is profoundly transforming modern mining operations.", category: "Innovation", coverImage: "https://sfile.chatglm.cn/images-ppt/690b24f0e8de.jpeg", author: "IREX Mining", readTime: "7 min" },
  ];
  for (const p of posts) {
    await db.blogPost.upsert({ where: { title: p.title }, update: {}, create: p });
  }
  console.log(`✓ ${posts.length} blog posts`);

  // 7. Events
  const events = [
    { name: "Guinea Mining Summit 2026", nameEn: "Guinea Mining Summit 2026", description: "Sommet annuel du secteur minier guinéen.", descriptionEn: "Annual Guinean mining sector summit.", date: "15-17 Septembre 2026", location: "Conakry, Guinée", type: "Sommet", image: "https://sfile.chatglm.cn/images-ppt/9f4d2bdea171.jpg" },
    { name: "Formation HSE Niveau 2", nameEn: "HSE Training Level 2", description: "Formation avancée HSE pour professionnels.", descriptionEn: "Advanced HSE training for professionals.", date: "08-10 Octobre 2026", location: "Matoto, Conakry", type: "Formation", image: "https://sfile.chatglm.cn/images-ppt/a1abd893bc83.jpg" },
    { name: "Conférence Industrie Minière Durable", nameEn: "Sustainable Mining Industry Conference", description: "Conférence régionale sur la durabilité minière.", descriptionEn: "Regional conference on mining sustainability.", date: "22 Novembre 2026", location: "Abidjan, Côte d'Ivoire", type: "Conférence", image: "https://sfile.chatglm.cn/images-ppt/28c01f758d65.jpg" },
    { name: "Workshop Digitalisation Minière", nameEn: "Mining Digitalization Workshop", description: "Atelier pratique sur la digitalisation minière.", descriptionEn: "Practical workshop on mining digitalization.", date: "05 Décembre 2026", location: "En ligne", type: "Workshop", image: "https://sfile.chatglm.cn/images-ppt/95c12cc7484e.jpg" },
  ];
  for (const e of events) {
    await db.event.upsert({ where: { name: e.name }, update: {}, create: e });
  }
  console.log(`✓ ${events.length} events`);

  // 8. Job openings
  const jobs = [
    { title: "Ingénieur Minier Senior", titleEn: "Senior Mining Engineer", description: "Pilote de projets miniers, vous supervisez l'exploration et l'exploitation.", descriptionEn: "Leading mining projects, supervising exploration and operations.", location: "Conakry, Guinée", type: "CDI", dept: "Ingénierie" },
    { title: "Spécialiste HSE", titleEn: "HSE Specialist", description: "Garant des standards HSE sur site minier.", descriptionEn: "Guarantor of HSE standards on mining site.", location: "Site Boké", type: "CDI", dept: "HSE" },
    { title: "Formateur Technique", titleEn: "Technical Trainer", description: "Anime des formations techniques pour équipes locales.", descriptionEn: "Conducts technical training for local teams.", location: "Conakry, Guinée", type: "CDD", dept: "Formation" },
    { title: "Responsable Logistique", titleEn: "Logistics Manager", description: "Supervise la chaîne logistique minière.", descriptionEn: "Supervises the mining logistics chain.", location: "Conakry, Guinée", type: "CDI", dept: "Logistique" },
  ];
  for (const j of jobs) {
    await db.jobOpening.upsert({ where: { title: j.title }, update: {}, create: j });
  }
  console.log(`✓ ${jobs.length} job openings`);

  // 9. Donation tiers
  const tiers = [
    { amount: 50000, title: "Contributeur", titleEn: "Contributor", perks: "Certificat de contribution\nNewsletter communautaire", perksEn: "Contribution certificate\nCommunity newsletter", popular: false, order: 1 },
    { amount: 250000, title: "Soutien", titleEn: "Supporter", perks: "Certificat signé\nRapport d'impact annuel\nVisite de projet (1)", perksEn: "Signed certificate\nAnnual impact report\nProject visit (1)", popular: true, order: 2 },
    { amount: 1000000, title: "Partenaire", titleEn: "Partner", perks: "Statut Partenaire\nRapport trimestriel\nVisites guidées (4)\nReconnaissance publique", perksEn: "Partner status\nQuarterly report\nGuided tours (4)\nPublic recognition", popular: false, order: 3 },
  ];
  for (const t of tiers) {
    await db.donationTier.upsert({ where: { amount: t.amount }, update: {}, create: t });
  }
  console.log(`✓ ${tiers.length} donation tiers`);

  // 10. FAQ items
  const faqs = [
    { question: "Quels types de clients IREX Mining accompagne-t-elle ?", questionEn: "What types of clients does IREX Mining support?", answer: "Nous accompagnons les sociétés minières, les investisseurs et développeurs de projets, les gouvernements et institutions publiques, les partenaires industriels, les organisations internationales, les communautés locales et les talents du secteur.", answerEn: "We support mining companies, investors and project developers, governments and public institutions, industrial partners, international organizations, local communities and sector talents.", order: 1 },
    { question: "Dans quels domaines intervient IREX Mining ?", questionEn: "In which areas does IREX Mining operate?", answer: "Nos interventions couvrent l'ingénierie, la construction, les mines, l'environnement, la santé et sécurité au travail, la recherche et le développement des capacités, ainsi que la consultation et l'expertise spécialisée.", answerEn: "Our interventions cover engineering, construction, mining, environment, occupational health and safety, research and capacity building, as well as specialized consulting and expertise.", order: 2 },
    { question: "Quelles sont vos zones d'intervention géographiques ?", questionEn: "What are your geographic intervention zones?", answer: "Notre siège est à Matoto Centre, Commune Urbaine de Matoto, Conakry. Nous opérons principalement en Afrique de l'Ouest et collaborons avec des partenaires internationaux.", answerEn: "Our headquarters is at Matoto Centre, Commune Urbaine de Matoto, Conakry. We mainly operate in West Africa and collaborate with international partners.", order: 3 },
    { question: "Comment puis-je obtenir un devis personnalisé ?", questionEn: "How can I get a custom quote?", answer: "Vous pouvez nous contacter via le formulaire de contact, par téléphone au 626868323 ou par email à irexmine1@outlook.com. Notre équipe vous répondra sous 48h avec une proposition adaptée.", answerEn: "You can contact us via the contact form, by phone at 626868323, or by email at irexmine1@outlook.com. Our team will respond within 48h with a tailored proposal.", order: 4 },
    { question: "Proposez-vous des formations professionnelles ?", questionEn: "Do you offer professional training?", answer: "Oui. Le renforcement des capacités est un pilier de notre offre, avec des formations HSE, techniques et managériales adaptées aux besoins du secteur minier guinéen.", answerEn: "Yes. Capacity building is a pillar of our offering, with HSE, technical and managerial training adapted to the needs of the Guinean mining sector.", order: 5 },
    { question: "Quels standards HSE suivez-vous ?", questionEn: "What HSE standards do you follow?", answer: "Nous appliquons les meilleures pratiques internationales et garantissons les plus hauts standards en Santé, Sécurité et Environnement, conformes aux normes les plus exigeantes du secteur.", answerEn: "We apply the best international practices and guarantee the highest Health, Safety and Environment standards, compliant with the most demanding sector norms.", order: 6 },
  ];
  for (const f of faqs) {
    await db.faqItem.upsert({ where: { question: f.question }, update: {}, create: f });
  }
  console.log(`✓ ${faqs.length} FAQ items`);

  // 11. Site stats
  const stats = [
    { key: "complianceRate", label: "Conformité HSE", labelEn: "HSE Compliance", value: 100, suffix: "%", icon: "shield", order: 1 },
    { key: "productCategories", label: "Catégories de Produits", labelEn: "Product Categories", value: 7, suffix: "", icon: "package", order: 2 },
    { key: "yearsExpertise", label: "Domaines d'Expertise", labelEn: "Expertise Domains", value: 12, suffix: "+", icon: "award", order: 3 },
    { key: "supportAvailability", label: "Support Disponible", labelEn: "Support Available", value: 24, suffix: "/7", icon: "headphones", order: 4 },
  ];
  for (const s of stats) {
    await db.siteStat.upsert({ where: { key: s.key }, update: {}, create: s });
  }
  console.log(`✓ ${stats.length} site stats`);

  // 12. Partners
  const partners = [
    { name: "MINISTRY OF MINES", order: 1 },
    { name: "CBG", order: 2 },
    { name: "RIO TINTO", order: 3 },
    { name: "SMB", order: 4 },
    { name: "SIMFER", order: 5 },
    { name: "ANGLOGOLD ASHANTI", order: 6 },
    { name: "GUINEA ALUMINA", order: 7 },
    { name: "WORLD BANK", order: 8 },
    { name: "UNDP", order: 9 },
  ];
  for (const p of partners) {
    await db.partner.upsert({ where: { name: p.name }, update: {}, create: p });
  }
  console.log(`✓ ${partners.length} partners`);

  // 13. Contact info
  await db.contactInfo.upsert({
    where: { id: "contact-info-single" },
    update: {},
    create: {
      id: "contact-info-single",
      address: "Matoto Centre, Commune Urbaine de Matoto\nConakry",
      phones: "224 624 56 72 72",
      emails: "irexmine1@outlook.com",
      hours: "Lun – Ven : 08h00 — 18h00\nSam : 09h00 — 13h00",
      hoursEn: "Mon – Fri: 8:00 AM — 6:00 PM\nSat: 9:00 AM — 1:00 PM",
      mapUrl: "https://www.google.com/maps?q=Matoto+Centre+Conakry+Guinea&output=embed",
    },
  });
  console.log(`✓ Contact info`);

  console.log("\n✅ Seed complete!");
  console.log("   Admin login: admin@irexmining.com / admin123");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
