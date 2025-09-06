'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Scissors, 
  Sparkles, 
  Palette, 
  Crown, 
  Clock,
  Star,
  CheckCircle,
  MessageCircle,
  Heart,
  Zap,
  Gem,
  Flower2,
  Eye,
  Sun,
  Waves,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    id: 'kalici-makyaj',
    icon: Palette,
    title: 'Kalıcı Makyaj (Phibrows)',
    subtitle: 'Profesyonel kalıcı makyaj uygulamaları',
    description: 'Phibrows tekniği ile doğal ve estetik kalıcı kaş, eyeliner ve dudak uygulamaları',
    color: 'beauty-rose',
    duration: '2-3 saat',
    services: [
      'Phibrows Kalıcı Kaş',
      'Kalıcı Eyeliner',
      'Kalıcı Dudak Renklendirme',
      'Microblading Tekniği',
      'Ombre Kaş Tekniği',
      'Kaş Düzeltme ve Yenileme'
    ],
    benefits: [
      '12-18 ay dayanım',
      'Doğal görünüm',
      'FDA onaylı pigmentler',
      'Kontrol randevuları dahil'
    ]
  },
  {
    id: 'lazer-epilasyon',
    icon: Sparkles,
    title: 'Lazer Epilasyon (Soprano ICE)',
    subtitle: 'Kalıcı tüy azaltma sistemi',
    description: 'Soprano ICE Platinum teknolojisi ile ağrısız ve etkili kalıcı epilasyon',
    color: 'beauty-gold',
    duration: '30-90 dk',
    services: [
      'Yüz bölgesi epilasyon',
      'Bacak epilasyonu',
      'Kol epilasyonu',
      'Bikini bölgesi epilasyon',
      'Koltukaltı epilasyonu',
      'Erkekler için epilasyon'
    ],
    benefits: [
      'Ağrısız uygulama',
      'Tüm cilt tiplerine uygun',
      '6-8 seansda %90 azalma',
      'FDA onaylı teknoloji'
    ]
  },
  {
    id: 'cilt-bakim',
    icon: Flower2,
    title: 'Cilt Bakım Tedavileri',
    subtitle: 'Gelişmiş cilt bakım sistemleri',
    description: 'Hydrafacial, Dermapen ve pHformula ile profesyonel cilt bakım tedavileri',
    color: 'beauty-lavender',
    duration: '45-90 dk',
    services: [
      'Hydrafacial Tedavisi',
      'Dermapen (Mikro İğneleme)',
      'pHformula Kimyasal Peeling',
      'Greenpeel Bitkisel Peeling',
      'Pumpkin Peel (Kabak Peeling)',
      'Göz Çevresi Özel Bakım',
      'Cilt Analizi ve Tanı',
      'Anti-aging Tedaviler',
      'Akne ve Leke Tedavisi'
    ],
    benefits: [
      'Anında görülebilir sonuç',
      'Kişiye özel program',
      'Klinik ortamda uygulama',
      'Uzman denetiminde'
    ]
  },
  {
    id: 'kirpik-lamination',
    icon: Eye,
    title: 'Kirpik Laminasyon (MY Lamination)',
    subtitle: 'Kirpik kaldırma ve boyama',
    description: 'MY Lamination sistemi ile doğal kirpiklerinizi kaldırıp boyuyoruz',
    color: 'beauty-sage',
    duration: '60-90 dk',
    services: [
      'Kirpik Laminasyon',
      'Kirpik Lifting',
      'Kirpik Boyama',
      'Kaş Laminasyonu',
      'Kaş ve Kirpik Bakımı',
      'Besleyici Serum Uygulaması'
    ],
    benefits: [
      '6-8 hafta dayanım',
      'Doğal görünüm',
      'Maskara ihtiyacını azaltır',
      'Kirpikleri besler'
    ]
  },
  {
    id: 'medikal-estetik',
    icon: Heart,
    title: 'Medikal Estetik',
    subtitle: 'Tıbbi estetik uygulamalar',
    description: 'Doktor kontrolünde uygulanan tıbbi estetik prosedürler',
    color: 'beauty-rose',
    duration: '30-60 dk',
    services: [
      'Botoks Uygulamaları',
      'Dolgu Uygulamaları',
      'Mezoterapi',
      'PRP (Plazma Tedavisi)',
      'İplikli Yüz Germe',
      'Cilt Gençleştirme'
    ],
    benefits: [
      'Doktor kontrolünde',
      'Orijinal ürün garantisi',
      'Güvenli uygulama',
      'Doğal sonuçlar'
    ]
  },
  {
    id: 'ozel-bakim',
    icon: Crown,
    title: 'Özel Bakım Paketleri',
    subtitle: 'Gelin ve özel gün paketleri',
    description: 'Özel günleriniz için tasarlanmış komple güzellik paketleri',
    color: 'beauty-gold',
    duration: '3-5 saat',
    services: [
      'Gelin Güzellik Paketi',
      'Özel Gün Makyajı',
      'Cilt Hazırlık Programı',
      'Saç Şekillendirme',
      'Manikür-Pedikür',
      'Prova Randevuları'
    ],
    benefits: [
      'Komple hizmet paketi',
      'Prova dahil',
      'Fotoğraf uyumlu sonuç',
      'Gün boyu dayanıklılık'
    ]
  }
];

const whyChooseUs = [
  {
    icon: Star,
    title: 'Uzman Kadro',
    description: 'Alanında uzman, sertifikalı güzellik profesyonelleri'
  },
  {
    icon: Heart,
    title: 'Hijyenik Ortam',
    description: 'Sterilizasyon kurallarına uygun, temiz ve güvenli ortam'
  },
  {
    icon: Gem,
    title: 'Premium Ürünler',
    description: 'Sadece tanınmış markaların kaliteli ürünlerini kullanıyoruz'
  },
  {
    icon: Clock,
    title: 'Randevu Sistemi',
    description: 'Esnek saatler ve hızlı randevu alma imkanı'
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 beauty-gradient">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 sm:mb-6 bg-white/20 text-white border-white/30 text-sm">
              Hizmetlerimiz
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Güzellik Hizmetleri
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Size özel tasarlanmış profesyonel güzellik hizmetlerimizi keşfedin
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full beauty-transition hover:beauty-shadow group">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
                      <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-${service.color} flex items-center justify-center group-hover:scale-110 beauty-transition flex-shrink-0`}>
                        <service.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <CardTitle className="text-xl sm:text-2xl mb-2">{service.title}</CardTitle>
                        <p className="text-sm sm:text-base text-muted-foreground">{service.subtitle}</p>
                        <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{service.duration}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>

                    {/* Services List */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        Hizmet Detayları
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {service.services.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Star className="w-4 h-4 text-primary" />
                        Avantajları
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {service.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm">
                            <Zap className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button className="w-full beauty-transition" asChild>
                      <Link href="https://wa.me/905358726752" target="_blank">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Bu Hizmet İçin Randevu Al
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">Neden NK Güzellik?</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Güvenilir Hizmet Kalitesi
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Yıllarca tecrübemiz ve müşteri memnuniyeti odaklı yaklaşımımızla size en iyi hizmeti sunuyoruz
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 beauty-gradient">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Flower2 className="w-16 h-16 mx-auto mb-6 text-white/80" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Size Uygun Hizmeti Keşfedin
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Hangi hizmeti seçeceğiniz konusunda kararsız mısınız? Uzman ekibimiz size en uygun paketleri önerebilir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 beauty-transition"
                asChild
              >
                <Link href="https://wa.me/905358726752" target="_blank">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp ile Danış
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary beauty-transition"
                asChild
              >
                <Link href="/">
                  Ana Sayfaya Dön
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}