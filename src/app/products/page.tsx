'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Grid, List, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ProductCard } from '@/components/ProductCard'
import { 
  getAllProducts, 
  searchProducts, 
  getCategories, 
  getSizes, 
  Product 
} from '@/lib/products'

type ViewMode = 'grid' | 'list'
type SortOption = 'name-asc' | 'name-desc' | 'newest' | 'oldest'

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSize, setSelectedSize] = useState('all')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState<SortOption>('name-asc')

  const allProducts = getAllProducts()
  const categories = getCategories()
  const sizes = getSizes()

  // Filtrelenmiş ve sıralanmış ürünler
  const filteredProducts = useMemo(() => {
    let products = allProducts

    // Arama filtresi
    if (searchQuery.trim()) {
      products = searchProducts(searchQuery)
    }

    // Kategori filtresi
    if (selectedCategory !== 'all') {
      products = products.filter(product => {
        const name = product.name.toLowerCase()
        const description = product.description?.toLowerCase() || ''
        const category = selectedCategory.toLowerCase()
        
        // Kategori isimlerine göre ürünleri filtrele
        if (category === 'temizleyiciler') {
          return name.includes('cleanse') || name.includes('temizley') || name.includes('clean')
        } else if (category === 'serumlar & çözümler') {
          return name.includes('serum') || name.includes('solution') || name.includes('çözüm')
        } else if (category === 'kremler') {
          return name.includes('cream') || name.includes('krem') || name.includes('balm')
        } else if (category === 'güneş koruma') {
          return name.includes('spf') || name.includes('protect') || name.includes('sun') || name.includes('u.v.')
        } else if (category === 'recovery bakım') {
          return name.includes('recovery') || name.includes('repair') || name.includes('restorative')
        } else if (category === 'göz bakımı') {
          return name.includes('eye') || name.includes('göz')
        } else if (category === 'yağlar') {
          return name.includes('oil') || name.includes('yağ')
        } else if (category === 'tonikler') {
          return name.includes('tonic') || name.includes('essence') || name.includes('tonik')
        } else if (category === 'primerler') {
          return name.includes('primer') || name.includes('base')
        } else if (category === 'özel bakım') {
          return name.includes('complex') || name.includes('formula') || name.includes('active')
        } else if (category === 'yaşlanma karşıtı') {
          return name.includes('age') || name.includes('anti-aging') || name.includes('yaşlanma')
        } else if (category === 'masaj') {
          return name.includes('massage') || name.includes('masaj')
        } else if (category === 'peeling & dermabrazyon') {
          return name.includes('dermabrasion') || name.includes('exfo') || name.includes('peeling')
        } else {
          // Genel arama için eski mantığı kullan
          return name.includes(category) || description.includes(category)
        }
      })
    }

    // Boyut filtresi
    if (selectedSize !== 'all') {
      products = products.filter(product => {
        const name = product.name.toLowerCase()
        const size = product.size?.toLowerCase() || ''
        const selectedSizeStr = selectedSize.toLowerCase()
        
        // Boyut alanında veya ürün adında belirtilen boyutu ara
        return size.includes(selectedSizeStr) || 
               name.includes(selectedSizeStr) ||
               // Esnek boyut arama (ml, gr gibi ölçü birimlerini de kontrol et)
               (selectedSizeStr.includes('ml') && (size.includes('ml') || name.includes('ml'))) ||
               (selectedSizeStr.includes('gr') && (size.includes('gr') || name.includes('gr'))) ||
               (selectedSizeStr.includes('g') && !selectedSizeStr.includes('gr') && (size.includes('g') || name.includes('g')))
      })
    }

    // Sıralama
    products.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name, 'tr')
        case 'name-desc':
          return b.name.localeCompare(a.name, 'tr')
        case 'newest':
          return new Date(b.scraped_at).getTime() - new Date(a.scraped_at).getTime()
        case 'oldest':
          return new Date(a.scraped_at).getTime() - new Date(b.scraped_at).getTime()
        default:
          return 0
      }
    })

    return products
  }, [allProducts, searchQuery, selectedCategory, selectedSize, sortBy])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedSize('all')
  }

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedSize !== 'all'

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

      {/* Filters and Search */}
      <section className="py-6 px-4 sm:px-6 bg-muted/30 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Arama */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Ürün ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filtreler */}
            <div className="flex flex-wrap gap-2 lg:gap-4">
              {/* Kategori */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm"
              >
                <option value="all">Tüm Kategoriler</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Boyut */}
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm"
              >
                <option value="all">Tüm Boyutlar</option>
                {sizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>

              {/* Sıralama */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm"
              >
                <option value="name-asc">A-Z</option>
                <option value="name-desc">Z-A</option>
                <option value="newest">En Yeni</option>
                <option value="oldest">En Eski</option>
              </select>

              {/* Görünüm Modu */}
              <div className="flex border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'} transition-colors`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'} transition-colors`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Aktif filtreler */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-4 items-center">
              <span className="text-sm text-muted-foreground">Aktif filtreler:</span>
              {searchQuery && (
                <Badge variant="secondary" className="text-xs">
                  Arama: {searchQuery}
                </Badge>
              )}
              {selectedCategory !== 'all' && (
                <Badge variant="secondary" className="text-xs">
                  Kategori: {selectedCategory}
                </Badge>
              )}
              {selectedSize !== 'all' && (
                <Badge variant="secondary" className="text-xs">
                  Boyut: {selectedSize}
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="text-xs h-6 px-2"
              >
                <X className="w-3 h-3 mr-1" />
                Temizle
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Products Grid/List */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Sonuç sayısı */}
          <div className="mb-8 text-center">
            <p className="text-muted-foreground">
              <span className="font-semibold text-primary">{filteredProducts.length}</span> ürün listeleniyor
            </p>
          </div>

          {/* Ürün listesi */}
          {filteredProducts.length > 0 ? (
            <motion.div
              key={`${viewMode}-${filteredProducts.length}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={
                viewMode === 'grid'
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                  : "space-y-6"
              }
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.product_id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ProductCard product={product} viewMode={viewMode} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-muted-foreground">
                <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Ürün bulunamadı</h3>
                <p className="mb-4">Arama kriterlerinizi değiştirerek tekrar deneyin</p>
                <Button onClick={clearFilters} variant="outline">
                  Filtreleri Temizle
                </Button>
              </div>
            </motion.div>
          )}
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
              Ürün Danışmanlığı
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Size en uygun ürünleri seçmenizde yardımcı olmak için WhatsApp üzerinden bizimle iletişime geçin
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 beauty-transition"
              asChild
            >
              <a href="https://wa.me/905358726752" target="_blank">
                WhatsApp ile İletişime Geç
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}