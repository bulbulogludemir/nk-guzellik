import rawProducts from "@/data/products.enriched.json"

type RawProduct = (typeof rawProducts)[number]

const categoryGroupMap: Record<string, string> = {
  "Temizleyici ve Tonikler": "Temizleme & Hazırlık",
  "Temizleyici, Tonikler & Peeling": "Temizleme & Hazırlık",
  Temizleyici: "Temizleme & Hazırlık",
  Hazırlayıcılar: "Temizleme & Hazırlık",
  Neutralizer: "Temizleme & Hazırlık",

  "Organik Peelingler": "Peeling & Klinik Protokoller",
  Peeling: "Peeling & Klinik Protokoller",
  "Profesyonel Peelingler": "Peeling & Klinik Protokoller",
  "Dermaterapi Solüsyonları": "Peeling & Klinik Protokoller",
  Snowcell: "Peeling & Klinik Protokoller",

  Maskeler: "Maskeler & Spa",
  "Profesyonel Maskeler": "Maskeler & Spa",
  "Krem Maskeler": "Maskeler & Spa",
  Maske: "Maskeler & Spa",
  "Yosun Özlü Peel off Maskeler": "Maskeler & Spa",

  "Günlük Bakım Serumları": "Serum & Ampuller",
  Serumlar: "Serum & Ampuller",
  "Serum Serisi": "Serum & Ampuller",
  "Vitamin Serisi": "Serum & Ampuller",
  "Vita C Serisi": "Serum & Ampuller",
  "Cilt Yapılandırıcı Gece Serumu": "Serum & Ampuller",
  "Anti-Aging Serisi": "Serum & Ampuller",
  "Rozasea Serisi": "Serum & Ampuller",
  "Point Serisi": "Serum & Ampuller",
  "Akne Serisi": "Serum & Ampuller",
  Leke: "Serum & Ampuller",
  "Leke Serisi": "Serum & Ampuller",
  "SOS Serisi": "Serum & Ampuller",
  "VDR Serisi": "Serum & Ampuller",
  "Güneş Çili": "Serum & Ampuller",
  "Aydınlatma Ürünleri": "Serum & Ampuller",

  "Günlük Bakım Kremleri": "Nemlendirme & Bariyer",
  "Nemlendirici ve Onarıcı Kremler": "Nemlendirme & Bariyer",
  "Onarıcı ve Nemlendirici": "Nemlendirme & Bariyer",
  "Onarıcı Kremler": "Nemlendirme & Bariyer",
  "İşlem Sonrası Bakım Kremleri": "Nemlendirme & Bariyer",
  "Profesyonel Bakım Sonrası Ürünler": "Nemlendirme & Bariyer",

  "Güneş Koruyucular": "Güneş Koruması",
  "Güneş Kremleri": "Güneş Koruması",
  "Güneş Kremleri Serisi": "Güneş Koruması",

  "Saç Bakım Ürünleri": "Saç & Vücut Bakımı",
  "Vücut El ,Boyun ve Dudak Serisi": "Saç & Vücut Bakımı",
  "İntim Bölge": "Saç & Vücut Bakımı",

  "Göz Bakım Ürünleri": "Göz & Bölgesel Bakım",
  "Göz Serisi": "Göz & Bölgesel Bakım",
  "Gözaltı Koyu Halkaları": "Göz & Bölgesel Bakım",
  "Boyun ve Dekolte Bakım Ürünleri": "Göz & Bölgesel Bakım",

  "Ev Bakım Kitleri": "Profesyonel Kitler & Setler",
  "Dermal Kitler": "Profesyonel Kitler & Setler",
}

const fallbackCategory = "Diğer Profesyonel Ürünler"

const mapCategory = (category: string) => categoryGroupMap[category] ?? fallbackCategory

export type Product = Omit<RawProduct, "category"> & {
  category: string
  originalCategory: string
}

export const products: Product[] = rawProducts.map((product) => {
  const originalCategory = product.category
  const category = mapCategory(originalCategory)
  const tags = Array.from(
    new Set(
      [category, product.brand, ...product.tags.filter((tag) => tag !== originalCategory)].filter(
        Boolean
      )
    )
  )

  return {
    ...product,
    category,
    originalCategory,
    tags,
  }
})

// Marka sıralaması - özel sırayla
const brandOrder = ['pHformula', 'Genosys', 'Meline', 'Theraderm', 'My Lamination']
const allBrands = Array.from(new Set(products.map((product) => product.brand)))
export const productBrands = [
  ...brandOrder.filter(brand => allBrands.includes(brand)),
  ...allBrands.filter(brand => !brandOrder.includes(brand)).sort()
]

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
