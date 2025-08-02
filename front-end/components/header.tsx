'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

import { Menu, Building, FlaskConical, X } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    {
      title: "Ecosistema",
      description: "Impulsando la ciencia con transparencia, hitos y tecnología blockchain",
      items: [
        {
          title: "Para Instituciones",
          href: "/institutions",
          description: "Cree becas descentralizadas, supervise el progreso por hitos y asegure el uso ético de los fondos.",
          icon: Building,
        },
        {
          title: "Para Investigadores",
          href: "/researchers",
          description: "Convierte tu avance científico en financiación validada y recompensas on-chain, con autonomía y confianza.",
          icon: FlaskConical,
        },
      ],
    },
    {
      title: "Acerca de",
      href: "/about",
      description: "",
    },
  ];

  return (
    <header className="w-full bg-stellar-white-600/95 backdrop-blur-sm border-b border-stellar-black-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <span className="text-2xl font-black text-stellar-black-900">
                Stellarbeca
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-6">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.href ? (
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className="text-stellar-black-600 hover:text-stellar-black-900 transition-colors font-medium"
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    ) : (
                      <>
                        <NavigationMenuTrigger className="text-stellar-black-600 hover:text-stellar-black-900 font-medium">
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="!w-[400px] p-6">
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-lg font-semibold text-stellar-black-900 mb-2">
                                {item.title}
                              </h3>
                              <p className="text-sm text-stellar-black-600 mb-4">
                                {item.description}
                              </p>
                            </div>
                            <div className="grid gap-3">
                              {item.items?.map((subItem) => (
                                <NavigationMenuLink key={subItem.title} asChild>
                                  <Link
                                    href={subItem.href}
                                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-stellar-gold-50 transition-colors group"
                                  >
                                    <div className="w-10 h-10 bg-stellar-gold-50 rounded-lg flex items-center justify-center group-hover:bg-stellar-gold-100 transition-colors">
                                      <subItem.icon className="w-5 h-5 text-stellar-gold-600" />
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-stellar-black-900 mb-1">
                                        {subItem.title}
                                      </h4>
                                      <p className="text-sm text-stellar-black-600">
                                        {subItem.description}
                                      </p>
                                    </div>
                                  </Link>
                                </NavigationMenuLink>
                              ))}
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Launch App Button */}
          <div className="flex items-center space-x-4">
            <Link href="/admin">
              <Button className="bg-stellar-gold-500 hover:bg-stellar-gold-600 text-stellar-black-900 border-0 font-semibold px-6 py-2 rounded-xl transition-all duration-300">
                Lanzar App
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-stellar-white-600 border-t border-stellar-black-100">
              {navigationItems.map((item) => (
                <div key={item.title} className="space-y-2">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="block px-3 py-2 text-stellar-black-600 hover:text-stellar-black-900 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <>
                      <div className="px-3 py-2">
                        <p className="font-medium text-stellar-black-900 mb-2">{item.title}</p>
                        <div className="space-y-2 ml-4">
                          {item.items?.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className="flex items-center space-x-2 text-stellar-black-600 hover:text-stellar-black-900 py-1"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <subItem.icon className="w-4 h-4" />
                              <span>{subItem.title}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}