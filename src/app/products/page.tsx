'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MessageCircle, Calendar } from 'lucide-react'

export default function ProductsPage() {
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
              Profesyonel Ürünlerimiz
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Kaliteli Kozmetik Ürünleri
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-6 sm:mb-8">
              Tedavilerimizde kullandığımız premium markaların ürünlerini keşfedin
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ürün Kataloğumuz Yenileniyor
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              NK Beauty olarak size en iyi ürünleri sunmak için ürün kataloğumuzu yeniden düzenliyoruz.
              Genosys, Theraderm, MeLine ve pHformula markalarının özel ürünleri hakkında detaylı bilgi
              almak için bizimle iletişime geçin.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold mb-3">Genosys</h3>
                <p className="text-muted-foreground text-sm">
                  NANOLİPO teknolojisi ile dermise kadar nüfuz eden profesyonel cilt bakım ürünleri
                </p>
              </div>
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold mb-3">Theraderm</h3>
                <p className="text-muted-foreground text-sm">
                  Amerika ve Kore laboratuvar standartlarında organik içerikli ürünler
                </p>
              </div>
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold mb-3">MeLine</h3>
                <p className="text-muted-foreground text-sm">
                  Traneksamik Asit ile güçlendirilmiş leke karşıtı bakım protokolü
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="beauty-gradient text-white border-0 beauty-transition"
                asChild
              >
                <a href="https://wa.me/905358726752" target="_blank">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp ile Ürün Danışmanlığı
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="beauty-transition"
                asChild
              >
                <a href="/contact">
                  <Calendar className="mr-2 h-4 w-4" />
                  Randevu Al
                </a>
              </Button>
            </div>
          </motion.div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Size Özel Ürün Önerileri
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Cilt tipinize ve ihtiyaçlarınıza en uygun ürünleri seçmenizde size yardımcı olmak için
              WhatsApp üzerinden bizimle iletişime geçin
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 beauty-transition"
              asChild
            >
              <a href="https://wa.me/905358726752" target="_blank">
                Hemen İletişime Geç
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}