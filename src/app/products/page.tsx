'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  productBrands,
  productCategories,
  productSearchIndex,
  products,
  normalizeText,
} from '@/lib/products'
import { cn } from '@/lib/utils'

const brandStats = productBrands.map((brand) => ({
  name: brand,
  count: products.filter((product) => product.brand === brand).length,
}))

const categoryOptions: { label: string; value: CategoryFilterState }[] = [
  { label: 'Tüm Kategoriler', value: 'all' },
  ...productCategories.map((category) => ({
    label: category,
    value: category,
  })),
]

type PreparedProduct = {
  product: (typeof products)[number]
  searchContent: string
}

type BrandFilterState = string[]

type CategoryFilterState = string | 'all'

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBrands, setSelectedBrands] = useState<BrandFilterState>([])
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilterState>('all')

  const searchMap = useMemo(() => {
    const map = new Map<string, string>()
    for (const entry of productSearchIndex) {
      map.set(entry.slug, entry.content)
    }
    return map
  }, [])

  const preparedProducts = useMemo<PreparedProduct[]>(() => {
    return products.map((product) => ({
      product,
      searchContent: searchMap.get(product.slug) ?? '',
    }))
  }, [searchMap])

  const filteredProducts = useMemo(() => {
    const brandSet = new Set(selectedBrands)
    const normalizedQuery = normalizeText(searchTerm)
    const tokens = normalizedQuery.split(' ').filter(Boolean)

    const filtered = preparedProducts.filter(({ product, searchContent }) => {
      const matchesBrand = brandSet.size === 0 || brandSet.has(product.brand)
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory
      const matchesSearch =
        tokens.length === 0 || tokens.every((token) => searchContent.includes(token))
      return matchesBrand && matchesCategory && matchesSearch
    })

    return filtered
      .map(({ product }) => product)
      .sort((a, b) => {
        const brandCompare = a.brand.localeCompare(b.brand, 'tr')
        if (brandCompare !== 0) return brandCompare
        return a.name.localeCompare(b.name, 'tr')
      })
  }, [preparedProducts, searchTerm, selectedBrands, selectedCategory])

  const activeFilters = selectedBrands.length + (selectedCategory === 'all' ? 0 : 1)
  const hasActiveFilters = activeFilters > 0 || searchTerm.length > 0

  const toggleBrand = (brand: string) => {
    setSelectedBrands((current) =>
      current.includes(brand)
        ? current.filter((item) => item !== brand)
        : [...current, brand]
    )
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedBrands([])
    setSelectedCategory('all')
  }

  return (
    <div className="min-h-screen bg-muted/10">
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 beauty-gradient opacity-80" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Badge className="bg-white/20 px-4 py-1 text-sm text-white shadow-sm backdrop-blur">
              Profesyonel Ürün Kataloğu
            </Badge>
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              NK Beauty Ürün Dünyasını Keşfedin
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-white/90 sm:text-xl">
              GENOSYS, Theraderm, MeLine ve pHformula markalarına ait 200’den fazla ürünü;
              içerik notları, kullanım önerileri ve dinamik filtreler ile kolayca inceleyin.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="beauty-gradient border-none text-white shadow-lg shadow-primary/30"
                asChild
              >
                <a href="https://wa.me/905358726752" target="_blank" rel="noreferrer">
                  Uzmanımızla WhatsApp üzerinden görüşün
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/70 bg-white/10 text-white hover:bg-white/20"
                asChild
              >
                <a href="/contact">Randevu Al</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative -mt-8 pb-16 sm:-mt-12 sm:pb-20">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border bg-card/80 p-6 shadow-xl shadow-primary/5 backdrop-blur"
          >
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                  <span className="flex items-center gap-1 text-base font-semibold text-foreground">
                    <SlidersHorizontal className="h-4 w-4" /> Akıllı Filtreler
                  </span>
                  <span>{filteredProducts.length} ürün listeleniyor</span>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-muted-foreground">
                      Anahtar kelimeyle arayın
                    </label>
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Ürün adı, içerik veya problem arayın"
                        className="h-12 rounded-xl border-input bg-background pl-10 text-base shadow-sm focus-visible:ring-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-muted-foreground">
                      Marka seçin
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {brandStats.map((brand) => {
                        const isActive = selectedBrands.includes(brand.name)
                        return (
                          <Button
                            key={brand.name}
                            variant={isActive ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => toggleBrand(brand.name)}
                            className={cn(
                              'rounded-full border transition-all',
                              isActive
                                ? 'shadow-lg shadow-primary/20'
                                : 'bg-background/60'
                            )}
                          >
                            <span>{brand.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {brand.count}
                            </span>
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-muted-foreground">
                      Kategori filtreleyin
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(event) =>
                        setSelectedCategory(event.target.value as CategoryFilterState)
                      }
                      className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm font-medium text-foreground shadow-sm focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                    >
                      {categoryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-5 rounded-2xl border border-border/60 bg-muted/20 p-6">
                <div>
                  <h3 className="text-base font-semibold text-foreground">Katalog Özeti</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Toplam {products.length} ürün, {productCategories.length} kategori ve{' '}
                    {productBrands.length} profesyonel markayı kapsayan geniş bir koleksiyon.
                    Filtreleri kullanarak ihtiyacınıza uygun ürünü saniyeler içinde bulun.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categoryOptions.slice(1, 6).map((option) => (
                    <Badge key={option.value} variant="secondary" className="rounded-full">
                      {option.label}
                    </Badge>
                  ))}
                  {productCategories.length > 5 && (
                    <Badge variant="outline" className="rounded-full border-dashed">
                      ve {productCategories.length - 5} kategori daha
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <Badge variant="outline" className="rounded-full border-primary/40 text-primary">
                    {filteredProducts.length} sonuç
                  </Badge>
                  {searchTerm && <span>Arama: “{searchTerm}”</span>}
                  {selectedBrands.length > 0 && (
                    <span>
                      Markalar: {selectedBrands.map((brand) => `#${brand}`).join(' ')}
                    </span>
                  )}
                  {selectedCategory !== 'all' && <span>Kategori: #{selectedCategory}</span>}
                </div>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Filtreleri temizle
                  </Button>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mt-12"
          >
            {filteredProducts.length === 0 ? (
              <div className="rounded-3xl border border-dashed bg-muted/30 p-12 text-center">
                <h3 className="text-2xl font-semibold text-foreground">
                  Aramanızla eşleşen ürün bulunamadı
                </h3>
                <p className="mt-3 text-muted-foreground">
                  Farklı anahtar kelimeler deneyin veya filtreleri sıfırlayarak tüm ürünleri görüntüleyin.
                </p>
                <div className="mt-6 flex justify-center">
                  <Button onClick={clearFilters} variant="outline">
                    Filtreleri sıfırla
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

type ProductCardProps = {
  product: (typeof products)[number]
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group h-full overflow-hidden rounded-2xl border border-border/60 bg-background p-0 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-background">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-4 transition duration-500 group-hover:scale-105 sm:p-6"
            priority={false}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Görsel bulunamadı
          </div>
        )}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <Badge variant="secondary" className="rounded-full bg-white/90 text-foreground">
            {product.brand}
          </Badge>
        </div>
      </div>
      <CardHeader className="space-y-3 px-4 pt-4 sm:px-6 sm:pt-6">
        <Badge variant="outline" className="w-fit rounded-full border-primary/40 text-xs font-semibold text-primary">
          {product.category}
        </Badge>
        <CardTitle className="text-base font-semibold leading-snug text-foreground sm:text-lg">
          {product.name}
        </CardTitle>
        <CardDescription className="text-sm leading-6 text-muted-foreground">
          {product.summary}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="flex flex-wrap gap-2">
          {product.tags.slice(0, 5).map((tag) => (
            <Badge key={tag} variant="outline" className="rounded-full border-dashed text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Button variant="ghost" asChild className="px-0 text-sm font-semibold">
            <Link href={`/products/${product.slug}`}>Detayları Gör</Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="rounded-full border-primary/40 px-4 text-xs font-semibold text-primary shadow-sm"
          >
            <a href="https://wa.me/905358726752" target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
