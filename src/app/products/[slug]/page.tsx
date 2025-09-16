import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

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
  getProductBySlug,
  getRelatedProducts,
  normalizeText,
  products,
} from '@/lib/products'

const whatsappUrl = 'https://wa.me/905358726752'

type ProductPageProps = {
  params: {
    slug: string
  }
}

type DescriptionBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'list'; title?: string; items: string[] }

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProductBySlug(params.slug)
  if (!product) {
    return {
      title: 'Ürün bulunamadı | NK Beauty',
    }
  }

  return {
    title: `${product.name} | NK Beauty`,
    description: product.summary,
    openGraph: {
      title: `${product.name} | NK Beauty`,
      description: product.summary,
      images: product.image ? [{ url: product.image, alt: product.name }] : undefined,
    },
  }
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const descriptionBlocks = parseDescription(product.description, product.name)
  const relatedProducts = getRelatedProducts(product.slug, 4)

  return (
    <div className="min-h-screen bg-muted/10 pb-20">
      <div className="beauty-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-3">
              <Badge className="bg-white/20 px-3 py-1 text-white shadow-sm backdrop-blur">
                {product.brand}
              </Badge>
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
                {product.name}
              </h1>
              <p className="max-w-2xl text-base text-white/90 sm:text-lg">
                {product.summary}
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="rounded-full border-white/60 text-white">
                  {product.category}
                </Badge>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary shadow-lg shadow-primary/20 hover:bg-white/90"
              >
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  WhatsApp ile bilgi alın
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/60 bg-white/10 text-white hover:bg-white/20"
              >
                <Link href="/products">Tüm Ürünlere Dön</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl px-4">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-3xl border bg-white shadow-xl shadow-primary/10">
              <div className="relative aspect-[4/5] w-full">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-10"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    Ürün görseli bulunamadı
                  </div>
                )}
              </div>
            </div>
            {product.gallery.length > 1 && (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {product.gallery.map((imagePath) => (
                  <div
                    key={imagePath}
                    className="relative aspect-square overflow-hidden rounded-2xl border"
                  >
                    <Image
                      src={imagePath}
                      alt={`${product.name} görseli`}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-contain p-4"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card className="gap-0 rounded-3xl border border-border/70 bg-background/80 p-0 shadow-lg">
              <CardHeader className="space-y-3 px-8 pt-8">
                <CardTitle className="text-xl font-semibold text-foreground">
                  Ürün Detayları
                </CardTitle>
                <CardDescription className="text-base leading-7 text-muted-foreground">
                  {product.summary}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 px-8 pb-10 text-sm leading-7 text-muted-foreground">
                {descriptionBlocks.map((block, index) => {
                  if (block.type === 'paragraph') {
                    return <p key={index}>{block.content}</p>
                  }

                  return (
                    <div key={index} className="space-y-2">
                      {block.title && (
                        <h3 className="text-base font-semibold text-foreground">
                          {block.title}
                        </h3>
                      )}
                      <ul className="list-disc space-y-1.5 pl-5">
                        {block.items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <div className="rounded-3xl border border-dashed border-primary/40 bg-primary/5 p-8 text-sm leading-6 text-primary">
              Uzman ekibimiz cilt tipinize ve bakım ihtiyaçlarınıza uygun ürünü seçmenize yardımcı olur.
              WhatsApp üzerinden mesaj gönderin; size özel uygulama protokolünü birlikte belirleyelim.
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="beauty-gradient flex-1 text-white" asChild>
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  WhatsApp ile danış
                </a>
              </Button>
              <Button size="lg" variant="outline" className="flex-1" asChild>
                <Link href="/contact">Uzmanla Görüş</Link>
              </Button>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">
                Benzer ürünlere göz atın
              </h2>
              <Button variant="ghost" asChild>
                <Link href="/products">Tüm ürünler</Link>
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {relatedProducts.map((related) => (
                <Card
                  key={related.slug}
                  className="group overflow-hidden rounded-3xl border border-border/80 bg-background/80 p-0"
                >
                  <div className="flex items-center gap-6 p-6">
                    <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-muted">
                      {related.image ? (
                        <Image
                          src={related.image}
                          alt={related.name}
                          fill
                          sizes="128px"
                          className="object-contain p-4"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                          Görsel yok
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <Badge variant="outline" className="rounded-full border-primary/30 text-xs">
                        {related.brand}
                      </Badge>
                      <CardTitle className="text-base font-semibold leading-snug text-foreground">
                        {related.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {related.summary}
                      </CardDescription>
                      <Button variant="link" className="px-0 text-sm font-semibold" asChild>
                        <Link href={`/products/${related.slug}`}>Ürün detayını incele</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function parseDescription(description: string, productName: string): DescriptionBlock[] {
  const sections = description
    .split(/\n\s*\n/)
    .map((section) => section.trim())
    .filter(Boolean)

  const blocks: DescriptionBlock[] = []

  for (const section of sections) {
    const lines = section
      .split(/\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && !isProductTitle(line, productName))

    if (lines.length === 0) {
      continue
    }

    const isList = lines.every((line) => /^[-•]/.test(line))
    const isTitledList =
      lines.length > 1 && !lines[0].startsWith('-') && lines.slice(1).every((line) => /^[-•]/.test(line))

    if (isTitledList) {
      blocks.push({
        type: 'list',
        title: cleanLine(lines[0]),
        items: lines.slice(1).map(cleanLine),
      })
      continue
    }

    if (isList) {
      blocks.push({
        type: 'list',
        items: lines.map(cleanLine),
      })
      continue
    }

    blocks.push({
      type: 'paragraph',
      content: lines.join(' '),
    })
  }

  return blocks
}

function isProductTitle(line: string, productName: string) {
  return normalizeText(line) === normalizeText(productName)
}

function cleanLine(line: string) {
  return line.replace(/^[-•\u2022\u2013\u2014\s]+/, '').trim()
}
