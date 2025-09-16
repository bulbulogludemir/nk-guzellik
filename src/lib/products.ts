import rawProducts from "@/data/products.enriched.json"

export type Product = {
  name: string
  brand: string
  category: string
  description: string
  slug: string
  summary: string
  tags: string[]
  image: string | null
  gallery: string[]
}

export const products: Product[] = rawProducts satisfies Product[]

export const productBrands = Array.from(new Set(products.map((product) => product.brand))).sort()

export const productCategories = Array.from(new Set(products.map((product) => product.category))).sort()

export const productSearchIndex = products.map((product) => ({
  slug: product.slug,
  content: normalizeText(
    [product.name, product.brand, product.category, product.summary, product.description].join(" ")
  ),
}))

export function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[ıİ]/g, "i")
    .replace(/[ğĞ]/g, "g")
    .replace(/[üÜ]/g, "u")
    .replace(/[öÖ]/g, "o")
    .replace(/[şŞ]/g, "s")
    .replace(/[çÇ]/g, "c")
    .replace(/&/g, " ve ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug) || null
}

export function getRelatedProducts(slug: string, limit = 4) {
  const target = getProductBySlug(slug)
  if (!target) return []

  const related = products
    .filter((product) => product.slug !== slug)
    .map((product) => {
      const brandScore = product.brand === target.brand ? 2 : 0
      const categoryScore = product.category === target.category ? 3 : 0
      const nameOverlap = overlapScore(target.name, product.name)
      const totalScore = brandScore + categoryScore + nameOverlap
      return { product, score: totalScore }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ product }) => product)

  if (related.length < limit) {
    const missing = limit - related.length
    const fallback = products
      .filter((product) => product.slug !== slug && !related.includes(product))
      .slice(0, missing)
    return [...related, ...fallback]
  }

  return related
}

function overlapScore(a: string, b: string) {
  const wordsA = new Set(
    normalizeText(a)
      .split(" ")
      .filter((chunk) => chunk.length > 2)
  )
  const wordsB = new Set(
    normalizeText(b)
      .split(" ")
      .filter((chunk) => chunk.length > 2)
  )

  let score = 0
  for (const word of wordsA) {
    if (wordsB.has(word)) {
      score += 1
    }
  }
  return score
}
