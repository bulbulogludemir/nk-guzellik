'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Grid, List, Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Heart, 
  Star, 
  MessageCircle,
  Info,
  ShoppingBag,
  Palette,
  Flower2,
  Sun,
  Moon,
  Droplets,
  Scissors,
  Eye,
  Crown,
  Gem,
  Zap,
  Shield,
  Award,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const productCategories = [
  {
    id: 'skincare',
    title: 'Cilt Bakım Ürünleri',
    icon: Droplets,
    description: 'Hydrafacial, Dermapen ve pHformula tedavilerinde kullandığımız profesyonel ürünler',
    color: 'beauty-gold',
    products: [
      {
        name: 'Hydrafacial Serumu',
        brand: 'HydraFacial',
        description: 'Cilt temizliği ve nemlendirme için özel formül serum',
        features: ['Antioksidan içerik', 'Peptid kompleksi', 'Hyaluronik asit'],
        suitableFor: 'Tüm cilt tipleri için uygun'
      },
      {
        name: 'pHformula Peeling',
        brand: 'pHformula',
        description: 'Profesyonel kimyasal peeling çözümleri',
        features: ['Kontrollü formül', 'Leke tedavisi', 'Cilt yenileme'],
        suitableFor: 'Leke ve yaşlanma belirtileri'
      },
      {
        name: 'Greenpeel Bitkisel',
        brand: 'Greenpeel',
        description: 'Doğal bitkisel peeling sistemi',
        features: ['100% doğal', 'Cilt yenileme', '5 günlük program'],
        suitableFor: 'Doğal çözüm arayanlar'
      },
      {
        name: 'Dermapen Serum',
        brand: 'Dermapen World',
        description: 'Mikro iğneleme sonrası iyileşme serumu',
        features: ['Büyüme faktörleri', 'Hızlı iyileşme', 'Kolajen desteği'],
        suitableFor: 'Mikro iğneleme tedavisi sonrası'
      }
    ]
  },
  {
    id: 'permanent-makeup',
    title: 'Kalıcı Makyaj Ürünleri',
    icon: Palette,
    description: 'Phibrows tekniği ve kalıcı makyaj uygulamalarında kullandığımız profesyonel pigmentler',
    color: 'beauty-rose',
    products: [
      {
        name: 'Phibrows Pigmentler',
        brand: 'PhiBrows',
        description: 'Kalıcı kaş uygulaması için özel pigmentler',
        features: ['FDA onaylı', '12-18 ay dayanım', 'Doğal renkler'],
        suitableFor: 'Kalıcı kaş isteyenler'
      },
      {
        name: 'Kalıcı Eyeliner Pigmenti',
        brand: 'BioTouch',
        description: 'Göz çevresi için güvenli kalıcı pigment',
        features: ['Hassas cilt uyumlu', 'Solmayan formül', 'Siyah ve kahverengi'],
        suitableFor: 'Kalıcı göz makyajı isteyenler'
      },
      {
        name: 'Dudak Renklendirme',
        brand: 'Perma Blend',
        description: 'Dudaklar için özel kalıcı pigmentler',
        features: ['Doğal tonlar', 'Güvenli formül', 'Uzun süreli'],
        suitableFor: 'Dudak rengi ve şekil düzeltme'
      },
      {
        name: 'Microblading Bıçakları',
        brand: 'Tina Davies',
        description: 'Tek kullanımlık steril microblading bıçakları',
        features: ['Steril ambalaj', 'Keskin uç', 'Tek kullanımlık'],
        suitableFor: 'Microblading tekniği'
      }
    ]
  },
  {
    id: 'laser-epilasyon',
    title: 'Lazer Epilasyon Sistemi',
    icon: Sparkles,
    description: 'Soprano ICE Platinum teknolojisi ile ağrısız epilasyon',
    color: 'beauty-lavender',
    products: [
      {
        name: 'Soprano ICE Platinum',
        brand: 'Alma Lasers',
        description: 'En gelişmiş diyot lazer teknolojisi',
        features: ['3 dalga boyu', 'Ağrısız uygulama', 'Tüm cilt tiplerine uygun'],
        suitableFor: 'Kalıcı tüy azaltma isteyenler'
      },
      {
        name: 'Soğutma Jeli',
        brand: 'Cooling Gel Pro',
        description: 'Lazer öncesi ve sonrası soğutma jeli',
        features: ['Aloe vera içerik', 'Yatıştırıcı etki', 'Kızarıklık önler'],
        suitableFor: 'Lazer epilasyon tedavisi'
      },
      {
        name: 'Koruyucu Gözlük',
        brand: 'LaserSafe',
        description: 'Lazer ışığından koruma sağlayan özel gözlük',
        features: ['UV koruma', 'Tam güvenlik', 'Sterilize edilebilir'],
        suitableFor: 'Lazer güvenliği için zorunlu'
      }
    ]
  },
  {
    id: 'lash-lamination',
    title: 'Kirpik Laminasyon Ürünleri',
    icon: Eye,
    description: 'MY Lamination sistemi ile kirpik kaldırma ve boyama ürünleri',
    color: 'beauty-sage',
    products: [
      {
        name: 'MY Lamination Kiti',
        brand: 'MY Lamination',
        description: 'Profesyonel kirpik laminasyon sistem kiti',
        features: ['3 aşamalı sistem', '6-8 hafta dayanım', 'Besleyici formül'],
        suitableFor: 'Düz ve kısa kirpikler'
      },
      {
        name: 'Kirpik Boyası',
        brand: 'RefectoCil',
        description: 'Kirpik ve kaş boyama için profesyonel boya',
        features: ['Uzun dayanım', 'Doğal renkler', 'Hassasiyet testi yapılmış'],
        suitableFor: 'Kirpik ve kaş boyama'
      },
      {
        name: 'Besleyici Serum',
        brand: 'Lash Nutrition',
        description: 'Kirpik bakımı için besleyici serum',
        features: ['Peptid içerik', 'Güçlendirici', 'Günlük kullanım'],
        suitableFor: 'Zayıf ve dökülgen kirpikler'
      }
    ]
  }
];

const whyOurProducts = [
  {
    icon: Shield,
    title: 'Güvenilir Markalar',
    description: 'Sadece test edilmiş, güvenilir markaların ürünlerini sunuyoruz'
  },
  {
    icon: Award,
    title: 'Profesyonel Kalite',
    description: 'Salonda kullandığımız aynı kalitede ürünler'
  },
  {
    icon: Heart,
    title: 'Cilt Dostu',
    description: 'Hassas ciltler için uygun, hipoalerjenik formüller'
  },
  {
    icon: Star,
    title: 'Uzman Önerisi',
    description: 'Güzellik uzmanlarımız tarafından seçilmiş ürünler'
  }
];

export default function ProductsPage() {
  const getWhatsAppMessage = (productName: string, category: string) => {
    return encodeURIComponent(
      `Merhaba! ${category} kategorisindeki "${productName}" hakkında bilgi almak istiyorum. Fiyat ve stok durumunu öğrenebilir miyim?`
    );
  };

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
              Ürün Kataloğu
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Profesyonel Ürün Gamımız
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-6 sm:mb-8">
              NK Estetik olarak, tedavilerimizde sadece dünya standardındaki premium markaları kullanıyoruz
            </p>
            <div className="flex items-center justify-center gap-2 text-white/80 text-sm sm:text-base">
              <Info className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-center">Fiyat ve stok bilgisi için WhatsApp üzerinden iletişime geçin</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {productCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="mb-12 sm:mb-20"
            >
              {/* Category Header */}
              <div className="text-center mb-8 sm:mb-12">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-${category.color} flex items-center justify-center`}>
                  <category.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{category.title}</h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {category.products.map((product, productIndex) => (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: productIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full beauty-transition hover:beauty-shadow group">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {product.brand}
                          </Badge>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                        </div>
                        <CardTitle className="text-lg leading-tight group-hover:text-primary beauty-transition">
                          {product.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.description}
                        </p>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Features */}
                        <div>
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-primary" />
                            Özellikler
                          </h4>
                          <ul className="space-y-1">
                            {product.features.map((feature, idx) => (
                              <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                                <Zap className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Suitable For */}
                        <div>
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                            <Heart className="w-3 h-3 text-primary" />
                            Kimler İçin
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {product.suitableFor}
                          </p>
                        </div>

                        {/* Action Button */}
                        <Button 
                          size="sm" 
                          className="w-full beauty-transition text-xs"
                          asChild
                        >
                          <Link 
                            href={`https://wa.me/905358726752?text=${getWhatsAppMessage(product.name, category.title)}`}
                            target="_blank"
                          >
                            <MessageCircle className="mr-1 h-3 w-3" />
                            Bilgi Al & Fiyat Öğren
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Our Products */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">Neden Bizim Ürünlerimiz?</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Kalite Güvencesi
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tüm ürünlerimizi uzman ekibimiz titizlikle seçer ve test eder
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyOurProducts.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
            <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-white/80" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Kişiye Özel Ürün Önerisi
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Cilt tipinize ve ihtiyaçlarınıza en uygun ürünleri seçmenizde size yardımcı olabiliriz
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 beauty-transition"
                asChild
              >
                <Link href="https://wa.me/905358726752" target="_blank">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Ürün Danışmanlığı Al
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary beauty-transition"
                asChild
              >
                <Link href="/services">
                  Hizmetlerimizi İncele
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}