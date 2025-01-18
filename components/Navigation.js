import Link from 'next/link';
import { useState } from 'react';
import { X, Menu } from 'lucide-react';
import { useRouter } from 'next/router';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Définition des liens de navigation en fonction de la route
  const getMenuItems = () => {
    if (router.pathname === '/blog') {
      return [];
    } else if (router.pathname === '/blog/[slug]') {
      return [{ href: '/blog', label: 'Blog' }];
    } else {
      return [
        { href: "#overview", label: "Aperçu" },
        { href: "#features", label: "Technologie" },
        { href: "#missions", label: "Missions" },
        { href: "#compare", label: "Comparaison" },
        { href: "/blog", label: "Blog" },
      ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <nav
      className="fixed top-0 left-0 right-0 shadow-lg z-50"
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl md:text-3xl lg:text-4xl font-bold ml-4 py-4"
        >
          <span className="hover:text-blue-400 transition-colors">
            Zigouplex
          </span>
          <img
            src="/favicon.webp"
            alt="Logo Zigouplex"
            className="h-12 md:h-14 lg:h-16 inline-block ml-3"
          />
        </Link>
        {menuItems.length > 0 && (
          <>
            <button
              className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Menu principal"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <ul className="hidden md:flex space-x-6 mr-8">
              {menuItems.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-blue-400 px-4 py-2 transition-colors inline-block"
                    onClick={
                      href.startsWith("#")
                        ? (e) => {
                            e.preventDefault();
                            scrollToSection(href.slice(1));
                          }
                        : undefined
                    }
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      {isMenuOpen && menuItems.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-slate-900 border-t border-slate-800 p-4 md:hidden">
          <ul className="space-y-4">
            {menuItems.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="w-full text-left hover:text-blue-400 px-4 py-2 transition-colors inline-block"
                  onClick={
                    href.startsWith("#")
                      ? (e) => {
                          e.preventDefault();
                          scrollToSection(href.slice(1));
                          setIsMenuOpen(false);
                        }
                      : () => setIsMenuOpen(false)
                  }
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}