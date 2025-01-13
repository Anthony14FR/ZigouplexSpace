import React from "react";
import { useState } from "react";
import {
  ChevronDown,
  Rocket,
  Globe2,
  Target,
  Sparkles,
  Server,
  Shield,
  Clock,
  Menu,
  X,
} from "lucide-react";
import Head from "next/head";
import Navigation from "../components/Navigation";

const SpacePage = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
    setActiveSection(sectionId);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["WebSite", "Organization"],
        "@id": "https://www.zigouplex.space/#website",
        url: "https://www.zigouplex.space",
        name: "Zigouplex",
        description:
          "Leader dans le développement de lanceurs spatiaux innovants",
        sameAs: [
          "https://twitter.com/zigouplex",
          "https://linkedin.com/company/zigouplex",
          "https://facebook.com/zigouplex",
        ],
        founder: {
          "@type": "Person",
          name: "Dr. Lukas Zigouplex",
          jobTitle: "CEO & Fondateur",
        },
        foundingDate: "2024-01-01",
        location: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressCountry: "FR",
            addressLocality: "Paris",
            addressRegion: "Île-de-France",
            postalCode: "75012",
          },
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://www.zigouplex.space/#webpage",
        url: "https://www.zigouplex.space",
        name: "Zigouplex - Lanceurs Spatiaux de Nouvelle Génération",
        description:
          "Découvrez les fusées Zigouplex 2000 et 301, la nouvelle génération de lanceurs spatiaux combinant performance exceptionnelle et innovation technologique.",
        isPartOf: { "@id": "https://www.zigouplex.space/#website" },
        primaryImageOfPage: {
          "@type": "ImageObject",
          "@id": "https://www.zigouplex.space/#primaryimage",
          url: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7",
          width: 1920,
          height: 1080,
          caption: "Lancement nocturne d'une fusée Zigouplex",
        },
        inLanguage: "fr-FR",
        datePublished: "2024-01-01T00:00:00+00:00",
        dateModified: new Date().toISOString(),
        keywords: [
          "lanceur spatial réutilisable",
          "technologie spatiale française",
          "propulsion spatiale",
          "Zigouplex 2000",
          "Zigouplex 301",
          "satellite mise en orbite",
          "fusée nouvelle génération",
          "exploration spatiale durable",
          "innovation aérospatiale",
          "transport spatial commercial",
          "entreprise spatiale paris",
          "développement spatial île-de-france",
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.zigouplex.space/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: "https://www.zigouplex.space",
          },
        ],
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Zigouplex - Lanceurs Spatiaux de Nouvelle Génération</title>
        <meta
          name="description"
          content="Découvrez les fusées Zigouplex 2000 et 301, la nouvelle génération de lanceurs spatiaux combinant performance exceptionnelle et innovation technologique"
        />
        <meta
          name="keywords"
          content="lanceur spatial réutilisable, technologie spatiale française, propulsion spatiale, Zigouplex 2000, Zigouplex 301, satellite mise en orbite, fusée nouvelle génération, exploration spatiale durable, innovation aérospatiale, transport spatial commercial"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          property="og:title"
          content="Zigouplex - Révolutionner le Transport Spatial | Lanceurs Nouvelle Génération"
        />
        <meta
          property="og:description"
          content="Découvrez comment Zigouplex révolutionne l'accès à l'espace avec ses lanceurs réutilisables de nouvelle génération."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.zigouplex.space/favicon.png"
        />
        <meta property="og:url" content="https://www.zigouplex.space" />
        <meta property="og:site_name" content="Zigouplex" />
        <meta property="og:locale" content="fr_FR" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@zigouplex" />
        <meta name="twitter:creator" content="@zigouplex" />
        <meta
          name="twitter:title"
          content="Zigouplex - L'Innovation dans le Transport Spatial"
        />
        <meta
          name="twitter:description"
          content="Explorez l'avenir du transport spatial avec les lanceurs Zigouplex."
        />
        <meta
          name="twitter:image"
          content="https://www.zigouplex.space/favicon.png"
        />

        <link rel="canonical" href="https://www.zigouplex.space" />

        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify(structuredData)
          }}
        />
      </Head>

      <main className="min-h-screen bg-slate-900 text-white">
        <header className="relative h-screen">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=1920&q=80"
              alt="Lancement spatial nocturne"
              className="object-cover w-full h-full"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
          </div>

          <Navigation />

          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                Découvrez l'Espace grâce aux lanceurs Zigouplex
              </h1>
              <h2 className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto">
                Les lanceurs Zigouplex représentent une révolution dans le
                domaine spatial, combinant performance exceptionnelle et
                innovation technologique.
              </h2>
              <button
                onClick={() => scrollToSection("features")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-3 rounded-full flex items-center mx-auto transition-colors"
              >
                Découvrir nos technologies
                <ChevronDown className="ml-2" />
              </button>
            </div>
          </div>
        </header>

        <section
          id="overview"
          className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-800"
        >
          <div className="container mx-auto px-4">
            <article>
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                La Nouvelle Génération de Lanceurs Spatiaux
              </h2>
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                <div className="space-y-6">
                  <img
                    src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=800&q=80"
                    alt="Zigouplex 2000"
                    className="rounded-lg w-full h-64 md:h-80 object-cover"
                    loading="lazy"
                  />
                  <div className="bg-slate-700 rounded-lg p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-bold mb-4">
                      Zigouplex 2000
                    </h3>
                    <p className="mb-6 text-gray-300">
                      Le Zigouplex 2000 représente l'aboutissement de décennies
                      de recherche en propulsion spatiale. Ce lanceur lourd
                      redéfinit les standards de l'industrie avec sa capacité de
                      charge exceptionnelle et son système de récupération
                      révolutionnaire.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Target className="w-4 h-4 mr-2 text-blue-400" /> Charge
                        utile LEO : 25 tonnes
                      </li>
                      <li className="flex items-center">
                        <Globe2 className="w-4 h-4 mr-2 text-blue-400" />{" "}
                        Orbites : LEO, GTO, TLI
                      </li>
                      <li className="flex items-center">
                        <Sparkles className="w-4 h-4 mr-2 text-blue-400" />{" "}
                        Réutilisabilité : 80%
                      </li>
                      <li className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-blue-400" /> Temps
                        de reconditionnement : 30 jours
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <img
                    src="https://images.unsplash.com/photo-1457364559154-aa2644600ebb?auto=format&fit=crop&w=800&q=80"
                    alt="Zigouplex 301"
                    className="rounded-lg w-full h-64 md:h-80 object-cover"
                    loading="lazy"
                  />
                  <div className="bg-slate-700 rounded-lg p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-bold mb-4">
                      Zigouplex 301
                    </h3>
                    <p className="mb-6 text-gray-300">
                      Le Zigouplex 301 incarne l'efficacité et la polyvalence.
                      Optimisé pour les constellations de satellites et les
                      missions scientifiques, ce lanceur moyen combine agilité
                      opérationnelle et fiabilité exceptionnelle.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Target className="w-4 h-4 mr-2 text-blue-400" /> Charge
                        utile LEO : 8 tonnes
                      </li>
                      <li className="flex items-center">
                        <Globe2 className="w-4 h-4 mr-2 text-blue-400" />{" "}
                        Orbites : LEO, SSO
                      </li>
                      <li className="flex items-center">
                        <Sparkles className="w-4 h-4 mr-2 text-blue-400" />{" "}
                        Réutilisabilité : 95%
                      </li>
                      <li className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-blue-400" /> Temps
                        de reconditionnement : 15 jours
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="features" className="py-16 md:py-24 bg-slate-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Technologies Innovantes
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 text-center">
              <article className="bg-slate-700 rounded-lg p-6 transform hover:scale-105 transition-transform">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Rocket className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">
                  Propulsion de Nouvelle Génération
                </h3>
                <p className="text-gray-300">
                  Nos moteurs Quantum-X utilisent un mélange propergol optimisé
                  et une chambre de combustion à géométrie variable, permettant
                  une efficacité accrue de 30% par rapport aux systèmes
                  conventionnels.
                </p>
              </article>

              <article className="bg-slate-700 rounded-lg p-6 transform hover:scale-105 transition-transform">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">
                  Protection Thermique Adaptative
                </h3>
                <p className="text-gray-300">
                  Le système de bouclier thermique multicouche s'adapte
                  dynamiquement aux conditions de rentrée atmosphérique. Les
                  matériaux composites auto-réparants garantissent une
                  protection optimale.
                </p>
              </article>

              <article className="bg-slate-700 rounded-lg p-6 transform hover:scale-105 transition-transform">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Server className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">
                  Intelligence Embarquée
                </h3>
                <p className="text-gray-300">
                  L'ordinateur de bord quantique Zigouplex-D730 traite en temps
                  réel des millions de paramètres de vol. Les algorithmes
                  d'apprentissage automatique optimisent la trajectoire et la
                  consommation.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          id="missions"
          className="py-16 md:py-24 bg-gradient-to-b from-slate-800 to-slate-900"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Applications et Missions
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <article className="bg-slate-700 rounded-lg p-6 md:p-8">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
                  alt="Mission scientifique"
                  className="rounded-lg w-full h-48 md:h-64 object-cover mb-6"
                  loading="lazy"
                />
                <h3 className="text-xl md:text-2xl font-bold mb-4">
                  Missions Scientifiques
                </h3>
                <p className="text-gray-300">
                  Les lanceurs Zigouplex sont conçus pour supporter une large
                  gamme de missions scientifiques, de l'observation terrestre à
                  l'exploration du système solaire. Leur précision
                  exceptionnelle et leur fiabilité en font des vecteurs idéaux
                  pour le déploiement d'instruments scientifiques sophistiqués.
                </p>
                <ul className="mt-4 space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <Target className="w-4 h-4 mr-2 text-blue-400" /> Satellites
                    d'observation
                  </li>
                  <li className="flex items-center">
                    <Target className="w-4 h-4 mr-2 text-blue-400" /> Télescopes
                    spatiaux
                  </li>
                  <li className="flex items-center">
                    <Target className="w-4 h-4 mr-2 text-blue-400" /> Sondes
                    interplanétaires
                  </li>
                </ul>
              </article>

              <article className="bg-slate-700 rounded-lg p-6 md:p-8">
                <img
                  src="https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?auto=format&fit=crop&w=800&q=80"
                  alt="Satellites de télécommunication"
                  className="rounded-lg w-full h-48 md:h-64 object-cover mb-6"
                  loading="lazy"
                />
                <h3 className="text-xl md:text-2xl font-bold mb-4">
                  Télécommunications
                </h3>
                <p className="text-gray-300">
                  Le déploiement de constellations de satellites de
                  communication bénéficie de la capacité unique des Zigouplex à
                  effectuer des lancements multiples précis. Notre technologie
                  de dispersion optimisée permet le placement de plusieurs
                  satellites en une seule mission.
                </p>
                <ul className="mt-4 space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <Target className="w-4 h-4 mr-2 text-blue-400" />{" "}
                    Constellations LEO
                  </li>
                  <li className="flex items-center">
                    <Target className="w-4 h-4 mr-2 text-blue-400" /> Satellites
                    géostationnaires
                  </li>
                  <li className="flex items-center">
                    <Target className="w-4 h-4 mr-2 text-blue-400" /> Internet
                    spatial
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="compare" className="py-16 md:py-24 bg-slate-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Spécifications Techniques Détaillées
            </h2>
            <div className="bg-slate-800 rounded-lg p-4 md:p-6 overflow-x-auto">
              <table
                className="w-full text-left"
                role="grid"
                aria-label="Comparaison des modèles Zigouplex"
              >
                <thead>
                  <tr className="border-b border-slate-700">
                    <th scope="col" className="px-4 py-3 font-bold">
                      Caractéristiques
                    </th>
                    <th scope="col" className="px-4 py-3 font-bold text-center">
                      Zigouplex 2000
                    </th>
                    <th scope="col" className="px-4 py-3 font-bold text-center">
                      Zigouplex 301
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  <tr>
                    <th scope="row" className="px-4 py-3">
                      Charge utile (LEO)
                    </th>
                    <td className="px-4 py-3 text-center">25 tonnes</td>
                    <td className="px-4 py-3 text-center">8 tonnes</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-3">
                      Charge utile (GTO)
                    </th>
                    <td className="px-4 py-3 text-center">12 tonnes</td>
                    <td className="px-4 py-3 text-center">Non applicable</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-3">
                      Hauteur
                    </th>
                    <td className="px-4 py-3 text-center">70m</td>
                    <td className="px-4 py-3 text-center">45m</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-3">
                      Diamètre
                    </th>
                    <td className="px-4 py-3 text-center">5.2m</td>
                    <td className="px-4 py-3 text-center">3.8m</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-3">
                      Poussée au décollage
                    </th>
                    <td className="px-4 py-3 text-center">2,200 kN</td>
                    <td className="px-4 py-3 text-center">1,100 kN</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-3">
                      Étages
                    </th>
                    <td className="px-4 py-3 text-center">3</td>
                    <td className="px-4 py-3 text-center">2</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-3">
                      Réutilisabilité
                    </th>
                    <td className="px-4 py-3 text-center">80%</td>
                    <td className="px-4 py-3 text-center">95%</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-3">
                      Temps de préparation
                    </th>
                    <td className="px-4 py-3 text-center">30 jours</td>
                    <td className="px-4 py-3 text-center">15 jours</td>
                  </tr>
                  <tr>
                    <th scope="row" className="px-4 py-3">
                      Carburant
                    </th>
                    <td className="px-4 py-3 text-center">LOX/LH2</td>
                    <td className="px-4 py-3 text-center">LOX/CH4</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                L'Avenir du Transport Spatial
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-12">
                Les lanceurs Zigouplex représentent l'avant-garde de la
                technologie spatiale, combinant innovation, fiabilité et respect
                de l'environnement. Notre engagement envers l'excellence
                technique et la durabilité ouvre la voie à une nouvelle ère
                d'exploration et de commercialisation de l'espace.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <article className="bg-slate-700 p-6 rounded-lg transform hover:scale-105 transition-transform">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">100+</h3>
                  <p className="text-gray-300">Missions réussies</p>
                </article>
                <article className="bg-slate-700 p-6 rounded-lg transform hover:scale-105 transition-transform">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">95%</h3>
                  <p className="text-gray-300">Taux de réutilisation</p>
                </article>
                <article className="bg-slate-700 p-6 rounded-lg transform hover:scale-105 transition-transform">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">30%</h3>
                  <p className="text-gray-300">Réduction des coûts</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-8 bg-slate-900 border-t border-slate-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400">
                &copy; 2025 Zigouplex. Tous droits réservés.
              </p>
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <p className="text-gray-400 hover:text-gray-300 transition-colors">
                      Mentions légales
                    </p>
                  </li>
                  <li>
                    <p className="text-gray-400 hover:text-gray-300 transition-colors">
                      Confidentialité
                    </p>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default SpacePage;
