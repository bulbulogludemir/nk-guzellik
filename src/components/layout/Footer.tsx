'use client';

import { Button } from '@/components/ui/button';
import { 
  Crown, 
  Phone, 
  MapPin, 
  Mail,
  Instagram,
  MessageCircle,
  Clock,
  Heart,
  Scissors,
  ShoppingBag,
  Star,
  Calendar,
  ArrowUp
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const navigation = {
  main: [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Hizmetler', href: '/services' },
    { name: 'Ürünler', href: '/products' },
    { name: 'İletişim', href: '/contact' }
  ],
  services: [
    { name: 'Cilt Bakımı', href: '/services#cilt-bakim' }
  ],
  social: [
    {
      name: 'Instagram',
      href: 'https://instagram.com/nkguzellik',
      icon: Instagram
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/905358726752',
      icon: MessageCircle
    }
  ]
};

const workingHours = [
  { day: 'Pazartesi - Cumartesi', time: '10:00 - 19:30' },
  { day: 'Pazar', time: 'Kapalı' }
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative">
      {/* Newsletter Section */}
      <section className="py-16 px-6 beauty-gradient">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Heart className="w-12 h-12 mx-auto mb-6 text-white/80" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Güzellik Dünyamıza Katılın
            </h3>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Yeni hizmetlerimiz, özel kampanyalarımız ve güzellik ipuçlarımızdan haberdar olun
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 beauty-transition flex-1"
                asChild
              >
                <Link href="https://wa.me/905358726752" target="_blank">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp&apos;tan Takip Et
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="bg-card border-t">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-xl beauty-gradient flex items-center justify-center">
                  <Crown className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">NK Beauty</h3>
                  <p className="text-sm text-muted-foreground">Beauty & Güzellik Merkezi</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Ankara Çankaya&apos;da bulunan NK Beauty ile daha ışıltılı,
                daha sağlıklı ve genç görünen bir cilde kavuşun. Profesyonel ekibimiz ve hijyenik ortamımızla hizmetinizdeyiz.
              </p>
              <div className="flex items-center space-x-4">
                {navigation.social.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white beauty-transition"
                  >
                    <item.icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-6 flex items-center">
                <Star className="w-4 h-4 mr-2 text-primary" />
                Hızlı Menü
              </h4>
              <ul className="space-y-3">
                {navigation.main.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-primary beauty-transition"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-foreground mb-6 flex items-center">
                <Heart className="w-4 h-4 mr-2 text-primary" />
                Hizmetlerimiz
              </h4>
              <ul className="space-y-3">
                {navigation.services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-primary beauty-transition"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Hours */}
            <div>
              <h4 className="font-semibold text-foreground mb-6 flex items-center">
                <Clock className="w-4 h-4 mr-2 text-primary" />
                İletişim & Saatler
              </h4>
              
              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Piyade Sokak No:32/4<br />
                      Çankaya/Ankara
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <Link 
                    href="tel:+905358726752"
                    className="text-sm text-muted-foreground hover:text-primary beauty-transition"
                  >
                    +90 535 872 67 52
                  </Link>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <Link 
                    href="mailto:nkestetik@gmail.com"
                    className="text-sm text-muted-foreground hover:text-primary beauty-transition"
                  >
                    nkestetik@gmail.com
                  </Link>
                </div>
              </div>

              {/* Working Hours */}
              <div className="space-y-2">
                {workingHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{schedule.day}</span>
                    <span className="font-medium">{schedule.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t bg-muted/30">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <p>&copy; 2024 NK Beauty. Tüm hakları saklıdır.</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="beauty-gradient text-white border-0"
                  asChild
                >
                  <Link href="https://wa.me/905358726752" target="_blank">
                    <Calendar className="mr-1 h-3 w-3" />
                    Hemen Randevu Al
                  </Link>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={scrollToTop}
                  className="text-muted-foreground hover:text-primary"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}