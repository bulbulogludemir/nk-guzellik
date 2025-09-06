'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Heart, 
  Star, 
  Calendar, 
  Phone, 
  MapPin, 
  Instagram,
  MessageCircle,
  Clock,
  Award,
  Users,
  Scissors,
  Palette,
  Crown,
  Trophy,
  ThumbsUp,
  UserCheck,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: Palette,
    title: 'Kalıcı Makyaj',
    description: 'Phibrows tekniği ile doğal kalıcı kaş, eyeliner ve dudak uygulamaları',
    color: 'beauty-rose'
  },
  {
    icon: Sparkles,
    title: 'Lazer Epilasyon',
    description: 'Soprano ICE Platinum ile ağrısız ve etkili kalıcı tüy azaltma',
    color: 'beauty-gold'
  },
  {
    icon: Heart,
    title: 'Cilt Bakım',
    description: 'Hydrafacial, Dermapen ve pHformula ile profesyonel cilt tedavileri',
    color: 'beauty-lavender'
  },
  {
    icon: Crown,
    title: 'Medikal Estetik',
    description: 'Doktor kontrolünde botoks, dolgu ve cilt gençleştirme uygulamaları',
    color: 'beauty-sage'
  }
];

const features = [
  {
    icon: Award,
    title: 'Uzman Kadro',
    description: 'Alanında uzman, sertifikalı güzellik profesyonelleri'
  },
  {
    icon: Heart,
    title: 'Hijyenik Ortam',
    description: 'Sterilizasyon kurallarına uygun, temiz ve güvenli ortam'
  },
  {
    icon: Star,
    title: 'Premium Ürünler',
    description: 'Sadece tanınmış markaların kaliteli ürünlerini kullanıyoruz'
  },
  {
    icon: Clock,
    title: 'Esnek Randevu',
    description: 'Pazartesi-Cumartesi 10:00-20:00 arası hızlı randevu imkanı'
  }
];

const aboutUsStats = [
  {
    icon: Trophy,
    title: '4.8/5.0',
    subtitle: 'Müşteri Memnuniyeti',
    description: '385 değerli müşterimizin deneyimi'
  },
  {
    icon: ThumbsUp,
    title: '4.9/5.0',
    subtitle: 'Personel Kalitesi',
    description: 'Uzman kadromuzun profesyonelliği'
  },
  {
    icon: UserCheck,
    title: 'Nur Kaman',
    subtitle: 'Kurucu & İşletme Sahibi',
    description: 'Yılların deneyimi ile hizmetinizde'
  },
  {
    icon: TrendingUp,
    title: 'Sürekli Gelişim',
    subtitle: 'Son Teknoloji',
    description: 'En güncel cihaz ve teknikler'
  }
];

const expertTeam = [
  {
    name: 'Nur Kaman',
    title: 'Kurucu & İşletme Sahibi',
    specialty: 'Güzellik Uzmanı',
    experience: 'Yılların tecrübesi'
  },
  {
    name: 'Farzaneh Naderali',
    title: 'Phibrows Master',
    specialty: 'Kalıcı Makyaj Uzmanı',
    experience: 'Uluslararası sertifikalı'
  },
  {
    name: 'Selenay Altaş',
    title: 'Lazer Uzmanı',
    specialty: 'Soprano ICE Specialist',
    experience: 'Medikal cihaz uzmanı'
  },
  {
    name: 'Zeynep Kaynar',
    title: 'Güzellik Uzmanı',
    specialty: 'Cilt Bakım Specialist',
    experience: 'Hydrafacial sertifikalı'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/main-bg.avif)' }}
        />
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 beauty-gradient opacity-90" />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Animated Elements */}
        <div className="absolute top-4 sm:top-10 left-4 sm:left-10 animate-bounce">
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white/70" />
        </div>
        <div className="absolute top-8 sm:top-20 right-4 sm:right-20 animate-pulse">
          <Star className="w-4 h-4 sm:w-6 sm:h-6 text-white/60" />
        </div>
        <div className="absolute bottom-16 sm:bottom-20 left-4 sm:left-20 animate-bounce delay-1000">
          <Heart className="w-5 h-5 sm:w-7 sm:h-7 text-white/50" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 sm:mb-6 bg-white/20 text-white border-white/30 text-sm">
              NK Estetik & Güzellik Merkezi
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              Güzelliğinizde
              <br />
              <span className="beauty-transition hover:scale-105 inline-block">
                Profesyonel Dokunuş
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Ankara Çankaya&apos;da bulunan NK Estetik ile daha ışıltılı, daha sağlıklı ve genç görünen bir cilde kavuşun
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 beauty-transition"
                asChild
              >
                <Link href="#randevu">
                  <Calendar className="mr-2 h-5 w-5" />
                  Randevu Al
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary beauty-transition"
                asChild
              >
                <Link href="#hizmetler">
                  Hizmetlerimizi İncele
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-white/70 rounded-full mt-1 sm:mt-2"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="hizmetler" className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-16"
          >
            <Badge className="mb-4">Hizmetlerimiz</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
              Size Özel Güzellik Hizmetleri
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Her bir hizmetimiz, kişisel ihtiyaçlarınıza göre özel olarak tasarlanmıştır
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="beauty-transition hover:scale-105 hover:beauty-shadow border-border/50">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-${service.color} flex items-center justify-center`}>
                      <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{service.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-16"
          >
            <Badge className="mb-4">Neden Biz?</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Farkımızı Keşfedin
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Stats Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-16"
          >
            <Badge className="mb-4">Hakkımızda</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              NK Estetik & Güzellik Merkezi
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              Ankara Çankaya&apos;da, uzman kadromuz ve modern teknolojimizle size en kaliteli güzellik hizmetini sunuyoruz. 
              Müşteri memnuniyetini ön planda tutarak, her detayı özenle planlıyoruz.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {aboutUsStats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-1 text-primary">{stat.title}</h3>
                <h4 className="text-base sm:text-lg font-semibold mb-2">{stat.subtitle}</h4>
                <p className="text-sm sm:text-base text-muted-foreground">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Team Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-16"
          >
            <Badge className="mb-4">Uzman Kadromuz</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Profesyonel Ekibimiz
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Alanlarında uzman, sertifikalı profesyonellerden oluşan ekibimizle size en iyi hizmeti sunuyoruz
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {expertTeam.map((expert, index) => (
              <motion.div
                key={expert.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center beauty-transition hover:beauty-shadow h-full">
                  <CardContent className="p-4 sm:p-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <Users className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1">{expert.name}</h3>
                    <h4 className="text-sm sm:text-base font-semibold text-primary mb-2">{expert.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{expert.specialty}</p>
                    <p className="text-xs text-muted-foreground">{expert.experience}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="randevu" className="py-12 sm:py-20 px-4 sm:px-6 beauty-gradient">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Randevunuzu Hemen Alın
            </h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-white/90">
              Size en uygun tarih ve saatte güzellik deneyimini yaşayın
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 beauty-transition"
                asChild
              >
                <Link href="https://wa.me/905358726752" target="_blank">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp ile Randevu
                </Link>
              </Button>
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 beauty-transition"
                asChild
              >
                <Link href="tel:+905358726752">
                  <Phone className="mr-2 h-5 w-5" />
                  Hemen Ara
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-6 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <MapPin className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Adres</h3>
              <p className="text-sm text-muted-foreground text-center">
                Piyade Sokak No:32/4<br />
                Çankaya/Ankara
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <Phone className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Telefon</h3>
              <p className="text-sm text-muted-foreground">
                +90 535 872 67 52
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <Instagram className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Sosyal Medya</h3>
              <Link 
                href="https://instagram.com/nkguzellik" 
                target="_blank"
                className="text-sm text-muted-foreground hover:text-primary beauty-transition"
              >
                @nkguzellik
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}