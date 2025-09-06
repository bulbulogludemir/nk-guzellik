'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowLeft, 
  MessageCircle, 
  Heart, 
  Share2, 
  Eye, 
  ShoppingCart,
  Star,
  Calendar,
  Info,
  Package,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getProductById, getProductImages, getAllProducts, Product } from '@/lib/products'

interface ProductDetailPageProps {
  params: { id: string }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [isLiked, setIsLiked] = useState(false)
  
  const product = getProductById(params.id)
  
  if (!product) {
    notFound()
  }

  const productImages = getProductImages(product.product_id)
  const allProducts = getAllProducts()
  
  // İlgili ürünler (aynı kategoriden 4 ürün)
  const relatedProducts = allProducts
    .filter(p => p.product_id !== product.product_id)
    .filter(p => {
      const productName = product.name.toLowerCase()
      const pName = p.name.toLowerCase()
      return productName.split(' ').some(word => 
        word.length > 3 && pName.includes(word)
      )
    })
    .slice(0, 4)

  // WhatsApp mesajı oluştur
  const getWhatsAppMessage = () => {
    return encodeURIComponent(
      `Merhaba! "${product.name}" ürünü hakkında detaylı bilgi almak istiyorum. Fiyat, stok durumu ve kullanım şekli hakkında bilgi verebilir misiniz?`
    )
  }

  const handleWhatsAppContact = () => {
    const whatsappUrl = `https://wa.me/905358726752?text=${getWhatsAppMessage()}`
    window.open(whatsappUrl, '_blank')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.meta_description || product.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      // Burada toast notification gösterebilirsin
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-8 sm:py-16 px-4 sm:px-6 beauty-gradient">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-6 text-white/80"
          >
            <Link 
              href="/products" 
              className="flex items-center gap-2 hover:text-white transition-colors beauty-transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Ürünlere Dön</span>
            </Link>
            <span className="text-white/60">•</span>
            <span className="text-sm text-white/90">{product.name}</span>
          </motion.div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative aspect-square overflow-hidden rounded-2xl beauty-shadow bg-muted">
                <Image
                  src={`/images/products/${product.product_id}-main.jpg`}
                  alt={product.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/images/products/placeholder.svg'
                  }}
                />
                
                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-3 rounded-full backdrop-blur-xl transition-colors beauty-transition ${
                      isLiked 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/80 text-muted-foreground hover:text-red-500'
                    }`}
                  >
                    <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-3 rounded-full bg-white/80 text-muted-foreground hover:text-primary backdrop-blur-xl transition-colors beauty-transition"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Size badge */}
                {product.size && (
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-black/70 text-white border-0">
                      {product.size}
                    </Badge>
                  </div>
                )}
              </div>

            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Product Header */}
              <div>
                {product.brand && (
                  <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
                )}
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
                  {product.name}
                </h1>
                
                {/* Rating placeholder */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(NK Estetik Onaylı)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleWhatsAppContact}
                  size="lg"
                  className="flex-1 beauty-gradient text-white border-0 beauty-transition"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp ile İletişim
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleWhatsAppContact}
                  className="beauty-transition"
                >
                  <Info className="mr-2 h-4 w-4" />
                  Fiyat Al
                </Button>
              </div>

              {/* Product Description */}
              {product.description && (
                <Card className="beauty-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Package className="w-5 h-5 text-primary" />
                      Ürün Açıklaması
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {product.description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Product Features */}
              {product.features && product.features.length > 0 && (
                <Card className="beauty-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Sparkles className="w-5 h-5 text-primary" />
                      Özellikler
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Usage Instructions */}
              {product.usage_instructions && (
                <Card className="beauty-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Info className="w-5 h-5 text-primary" />
                      Kullanım Talimatları
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {product.usage_instructions}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Ingredients */}
              {product.ingredients && product.ingredients.length > 0 && (
                <Card className="beauty-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Eye className="w-5 h-5 text-primary" />
                      İçerik
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {product.ingredients.map((ingredient, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 sm:py-20 px-4 sm:px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Benzer Ürünler</h2>
              <p className="text-muted-foreground">Size önerebileceğimiz diğer ürünler</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.product_id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="beauty-shadow hover:beauty-shadow transition-all duration-300 group beauty-transition overflow-hidden">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Link href={`/products/${relatedProduct.product_id}`}>
                        <Image
                          src={`/images/products/${relatedProduct.product_id}-main.jpg`}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = '/images/products/placeholder.svg'
                          }}
                        />
                      </Link>
                    </div>
                    <CardContent className="p-3">
                      <Link href={`/products/${relatedProduct.product_id}`}>
                        <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 mb-1 text-sm beauty-transition">
                          {relatedProduct.name}
                        </h3>
                      </Link>
                      {relatedProduct.size && (
                        <p className="text-xs text-muted-foreground mb-2">
                          {relatedProduct.size}
                        </p>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full text-xs beauty-transition h-8"
                        asChild
                      >
                        <Link href={`/products/${relatedProduct.product_id}`}>
                          İncele
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

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
              Hemen İletişime Geçin
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              {product.name} hakkında detaylı bilgi almak ve fiyat öğrenmek için bizimle iletişime geçin
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={handleWhatsAppContact}
                className="bg-white text-primary hover:bg-white/90 beauty-transition"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp ile Yaz
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary beauty-transition"
                asChild
              >
                <Link href="/contact">
                  <Calendar className="mr-2 h-4 w-4" />
                  Randevu Al
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

