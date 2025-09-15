'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Crown,
  Menu,
  X,
  Phone,
  MapPin,
  Instagram,
  MessageCircle,
  Calendar,
  Home,
  Sparkles,
  ShoppingBag,
  Mail
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Ana Sayfa', href: '/', icon: Home },
  { name: 'Hizmetler', href: '/services', icon: Sparkles },
  { name: 'Ürünler', href: '/products', icon: ShoppingBag },
  { name: 'İletişim', href: '/contact', icon: Mail }
];

const contactInfo = [
  { icon: Phone, text: '+90 535 872 67 52', href: 'tel:+905358726752' },
  { icon: MapPin, text: 'Çankaya/Ankara', href: '#' },
  { icon: Instagram, text: '@nkguzellik', href: 'https://instagram.com/nkguzellik' }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Contact Bar */}
      <div className="hidden lg:block bg-muted/50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              {contactInfo.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary beauty-transition"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden xl:block">{item.text}</span>
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" asChild>
                <Link href="https://wa.me/905358726752" target="_blank">
                  <MessageCircle className="mr-1 h-3 w-3" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`sticky top-0 z-50 w-full border-b beauty-transition ${
          scrolled 
            ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60' 
            : 'bg-background'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="w-16 h-12 sm:w-20 sm:h-16 relative group-hover:scale-105 beauty-transition">
                <Image
                  src="/images/nk-beauty-logo-transparent.png"
                  alt="NK Beauty Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 text-sm font-medium beauty-transition relative ${
                      isActive 
                        ? 'text-primary' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-6 left-0 right-0 h-0.5 bg-primary"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/services">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Hizmetler
                </Link>
              </Button>
              <Button size="sm" className="beauty-gradient text-white" asChild>
                <Link href="https://wa.me/905358726752" target="_blank">
                  <Calendar className="mr-1 h-3 w-3" />
                  Randevu Al
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t bg-background/95 backdrop-blur"
            >
              <div className="px-4 py-4 space-y-4">
                {/* Mobile Navigation */}
                <nav className="space-y-3">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg beauty-transition ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>

                {/* Mobile Contact Info */}
                <div className="pt-4 border-t space-y-3">
                  {contactInfo.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground beauty-transition"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.text}</span>
                    </Link>
                  ))}
                </div>

                {/* Mobile CTA Buttons */}
                <div className="pt-4 border-t space-y-3">
                  <Button className="w-full beauty-gradient text-white" asChild>
                    <Link href="https://wa.me/905358726752" target="_blank">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp ile Randevu Al
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/services">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Hizmetlerimizi İncele
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}