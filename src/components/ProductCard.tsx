// components/ProductCard.tsx - NK Estetik için özelleştirilmiş ürün kartı
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Eye, MessageCircle } from 'lucide-react'
import { Product, getExcerpt } from '@/lib/products'

interface ProductCardProps {
  product: Product
  viewMode?: 'grid' | 'list'
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  viewMode = 'grid' 
}) => {
  const [imageError, setImageError] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  // Ana görsel için .jpg kullan
  const mainImageUrl = `/images/products/${product.product_id}-main.jpg`
  const fallbackImageUrl = `/images/products/${product.product_id}-1.png`
  const excerpt = getExcerpt(product.description, 120)

  const handleImageError = () => {
    setImageError(true)
  }

  // WhatsApp mesajı oluştur
  const getWhatsAppMessage = (productName: string) => {
    return encodeURIComponent(
      `Merhaba! "${productName}" ürünü hakkında bilgi almak istiyorum. Fiyat ve stok durumunu öğrenebilir miyim?`
    );
  };

  const handleWhatsAppContact = () => {
    const whatsappUrl = `https://wa.me/905358726752?text=${getWhatsAppMessage(product.name)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg beauty-shadow border hover:beauty-shadow transition-all duration-300">
        <div className="flex">
          {/* Görsel */}
          <div className="w-48 h-48 flex-shrink-0">
            <Link href={`/products/${product.product_id}`}>
              <div className="relative w-full h-full overflow-hidden rounded-l-lg">
                <Image
                  src={imageError ? fallbackImageUrl : mainImageUrl}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  onError={handleImageError}
                />
              </div>
            </Link>
          </div>

          {/* İçerik */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <Link href={`/products/${product.product_id}`}>
                  <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>
                
                {product.size && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {product.size}
                  </p>
                )}
              </div>

              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full transition-colors beauty-transition ${
                  isLiked 
                    ? 'text-red-500 bg-red-50' 
                    : 'text-muted-foreground hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
              </button>
            </div>

            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
              {excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Link href={`/products/${product.product_id}`}>
                  <button className="flex items-center space-x-1 px-3 py-1.5 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors text-sm beauty-transition">
                    <Eye className="w-4 h-4" />
                    <span>İncele</span>
                  </button>
                </Link>
                
                <button 
                  onClick={handleWhatsAppContact}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors text-sm beauty-transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </button>
              </div>

              {product.brand && (
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  {product.brand}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid görünümü (default)
  return (
    <div className="bg-white rounded-lg beauty-shadow border hover:beauty-shadow transition-all duration-300 group overflow-hidden beauty-transition">
      {/* Görsel */}
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/products/${product.product_id}`}>
          <Image
            src={imageError ? fallbackImageUrl : mainImageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
          />
        </Link>

        {/* Hover butonları */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full shadow-sm transition-colors beauty-transition ${
              isLiked 
                ? 'text-white bg-red-500' 
                : 'text-muted-foreground bg-white hover:text-red-500'
            }`}
          >
            <Heart className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Boyut badge */}
        {product.size && (
          <div className="absolute bottom-2 left-2">
            <span className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
              {product.size}
            </span>
          </div>
        )}
      </div>

      {/* İçerik */}
      <div className="p-4">
        <div className="mb-2">
          <Link href={`/products/${product.product_id}`}>
            <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 leading-tight beauty-transition">
              {product.name}
            </h3>
          </Link>
        </div>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {excerpt}
        </p>

        {/* Alt kısım */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-1">
            {product.brand && (
              <span className="text-xs text-muted-foreground">
                {product.brand}
              </span>
            )}
          </div>

          <div className="flex space-x-1">
            <Link href={`/products/${product.product_id}`}>
              <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-colors beauty-transition">
                <Eye className="w-4 h-4" />
              </button>
            </Link>
            
            <button 
              onClick={handleWhatsAppContact}
              className="p-2 text-muted-foreground hover:text-green-600 hover:bg-green-50 rounded-full transition-colors beauty-transition"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}