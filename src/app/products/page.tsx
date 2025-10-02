'use client'

import { useMemo, useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { SlidersHorizontal, MessageCircle, ChevronDown } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  productBrands,
  productCategories,
  products,
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

type BrandFilterState = string[]

type CategoryFilterState = string | 'all'

function ProductsPageContent() {
  const searchParams = useSearchParams()
  const [selectedBrands, setSelectedBrands] = useState<BrandFilterState>([])
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilterState>('all')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Initialize filters from URL parameters
  useEffect(() => {
    const brandParam = searchParams.get('brand')
    if (brandParam && productBrands.includes(brandParam)) {
      setSelectedBrands([brandParam])
    }
  }, [searchParams])

  const filteredProducts = useMemo(() => {
    const brandSet = new Set(selectedBrands)

    const filtered = products.filter((product) => {
      const matchesBrand = brandSet.size === 0 || brandSet.has(product.brand)
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory
      return matchesBrand && matchesCategory
    })

    return filtered.sort((a, b) => {
      const brandCompare = a.brand.localeCompare(b.brand, 'tr')
      if (brandCompare !== 0) return brandCompare
      return a.name.localeCompare(b.name, 'tr')
    })
  }, [selectedBrands, selectedCategory])

  const activeFilters = selectedBrands.length + (selectedCategory === 'all' ? 0 : 1)
  const hasActiveFilters = activeFilters > 0

  const toggleBrand = (brand: string) => {
    setSelectedBrands((current) =>
      current.includes(brand)
        ? current.filter((item) => item !== brand)
        : [...current, brand]
    )
  }

  const clearFilters = () => {
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
              pHformula, Genosys, Theraderm ve Meline markalarına ait 200&apos;den fazla ürünü;
              içerik notları, kullanım önerileri ve dinamik filtreler ile kolayca inceleyin.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
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

      <section className="relative pb-16 pt-8 sm:pb-20">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border bg-card/80 p-4 shadow-xl shadow-primary/5 backdrop-blur sm:p-6"
          >
            <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-muted/20 p-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="text-base font-semibold text-foreground">Filtrele</span>
                  <span className="text-sm text-muted-foreground">
                    ({filteredProducts.length} ürün)
                  </span>
                </div>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform duration-200',
                        isFilterOpen && 'rotate-180'
                      )}
                    />
                    <span className="sr-only">Filtreleri aç/kapat</span>
                  </Button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent className="mt-4 space-y-4">
                <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 sm:p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Markalar
                        </label>
                        {selectedBrands.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setSelectedBrands([])}
                            className="text-xs text-primary underline-offset-4 hover:underline"
                          >
                            Temizle
                          </button>
                        )}
                      </div>
                      <div className="flex gap-2 overflow-x-auto pb-1">
                        {brandStats.map((brand) => {
                          const isActive = selectedBrands.includes(brand.name)
                          return (
                            <button
                              key={brand.name}
                              type="button"
                              onClick={() => toggleBrand(brand.name)}
                              className={cn(
                                'flex items-center gap-1 whitespace-nowrap rounded-full border px-3 py-2 text-xs font-medium transition',
                                isActive
                                  ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                                  : 'border-border bg-background/80 text-muted-foreground hover:bg-background'
                              )}
                            >
                              <span>{brand.name}</span>
                              <span className="text-[10px] opacity-70">{brand.count}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Kategori
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
                  {hasActiveFilters && (
                    <div className="flex flex-wrap items-center gap-2 pt-4 text-xs text-muted-foreground">
                      {selectedBrands.map((brand) => (
                        <span key={brand} className="rounded-full bg-background px-3 py-1">
                          #{brand}
                        </span>
                      ))}
                      {selectedCategory !== 'all' && (
                        <span className="rounded-full bg-background px-3 py-1">Kategori: #{selectedCategory}</span>
                      )}
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="rounded-full bg-primary/10 px-3 py-1 text-primary hover:bg-primary/20"
                      >
                        Tümünü temizle
                      </button>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
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

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-muted/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Ürünler yükleniyor...</p>
        </div>
      </div>
    }>
      <ProductsPageContent />
    </Suspense>
  )
}

type ProductCardProps = {
  product: (typeof products)[number]
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-background shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square w-full overflow-hidden bg-muted/20">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-6 transition duration-500 group-hover:scale-110"
            priority={false}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Görsel bulunamadı
          </div>
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge variant="secondary" className="rounded-full bg-white/95 text-xs font-medium shadow-sm backdrop-blur">
            {product.brand}
          </Badge>
        </div>
      </div>
      <CardHeader className="flex-1 space-y-2 px-5 pb-3 pt-5">
        <Badge variant="outline" className="w-fit rounded-full border-primary/40 px-3 py-0.5 text-xs font-medium text-primary">
          {product.category}
        </Badge>
        <CardTitle className="line-clamp-2 text-base font-bold leading-tight text-foreground sm:text-lg">
          {product.name}
        </CardTitle>
        <CardDescription className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {product.summary}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 px-5 pb-5">
        <div className="flex flex-wrap gap-1.5">
          {product.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="outline" className="rounded-full border-dashed px-2.5 py-0.5 text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t pt-3">
          <Button variant="default" asChild className="flex-1 rounded-full text-sm font-medium">
            <Link href={`/products/${product.slug}`}>Detayları Gör</Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            asChild
            className="rounded-full border-green-500/40 text-green-600 hover:bg-green-50 hover:text-green-700"
          >
            <a href="https://wa.me/905358726752" target="_blank" rel="noreferrer" title="WhatsApp ile iletişime geç">
              <MessageCircle className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
