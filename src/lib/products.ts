// lib/products.ts - Local JSON ile ürün yönetimi
import productsData from '@/data/products_data.json'

export interface Product {
  url: string
  product_id: string
  name: string
  description: string
  price: string
  currency: string
  category: string
  brand: string
  size: string
  ingredients: string[]
  usage_instructions: string
  features: string[]
  benefits: string[]
  images: string[]
  image_paths: string[]
  meta_title: string
  meta_description: string
  scraped_at: string
}

// Tüm ürünleri getir
export const getAllProducts = (): Product[] => {
  return productsData.products as Product[]
}

// ID ile ürün bul
export const getProductById = (id: string): Product | undefined => {
  return productsData.products.find(p => p.product_id === id) as Product | undefined
}

// Kategori ile ürün filtrele
export const getProductsByCategory = (category: string): Product[] => {
  return productsData.products.filter(p => 
    p.name.toLowerCase().includes(category.toLowerCase()) ||
    p.description?.toLowerCase().includes(category.toLowerCase())
  ) as Product[]
}

// Arama fonksiyonu
export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase().trim()
  if (!searchTerm) return getAllProducts()
  
  return productsData.products.filter(p => 
    p.name.toLowerCase().includes(searchTerm) ||
    p.description?.toLowerCase().includes(searchTerm) ||
    p.size?.toLowerCase().includes(searchTerm)
  ) as Product[]
}

// Görsel URL'si oluştur
export const getProductImageUrl = (productId: string, imageIndex: number = 0): string => {
  // Ana görsel için önce .jpg dene
  if (imageIndex === 0) {
    return `/images/products/${productId}-main.jpg`
  }
  
  // Diğer görseller için önce .png dene
  return `/images/products/${productId}-${imageIndex}.png`
}

// Ürün için tüm mevcut görselleri getir
export const getProductImages = (productId: string): string[] => {
  const images: string[] = []
  const extensions = ['png', 'jpg', 'jpeg']
  
  // Ana görsel
  for (const ext of extensions) {
    images.push(`/images/products/${productId}-main.${ext}`)
  }
  
  // Ek görseller (genellikle 1-5 arası)
  for (let i = 1; i <= 5; i++) {
    for (const ext of extensions) {
      images.push(`/images/products/${productId}-${i}.${ext}`)
    }
  }
  
  return images
}

// Kategorileri otomatik çıkar
export const getCategories = (): string[] => {
  const categories = new Set<string>()
  
  productsData.products.forEach(product => {
    const name = product.name.toLowerCase()
    const description = product.description?.toLowerCase() || ''
    
    // Temizleyici ürünler
    if (name.includes('cleanse') || name.includes('temizley') || name.includes('clean')) {
      categories.add('Temizleyiciler')
    }
    // Serumlar ve çözümler
    else if (name.includes('serum') || name.includes('solution') || name.includes('çözüm')) {
      categories.add('Serumlar & Çözümler')
    }
    // Kremler
    else if (name.includes('cream') || name.includes('krem') || name.includes('balm')) {
      categories.add('Kremler')
    }
    // Maskeler
    else if (name.includes('mask') || name.includes('maske')) {
      categories.add('Maskeler')
    }
    // Güneş koruma
    else if (name.includes('spf') || name.includes('protect') || name.includes('sun') || name.includes('u.v.')) {
      categories.add('Güneş Koruma')
    }
    // Recovery ürünleri
    else if (name.includes('recovery') || name.includes('repair') || name.includes('restorative')) {
      categories.add('Recovery Bakım')
    }
    // Göz bakımı
    else if (name.includes('eye') || name.includes('göz')) {
      categories.add('Göz Bakımı')
    }
    // Yağlar
    else if (name.includes('oil') || name.includes('yağ')) {
      categories.add('Yağlar')
    }
    // Tonikler ve essenceler
    else if (name.includes('tonic') || name.includes('essence') || name.includes('tonik')) {
      categories.add('Tonikler')
    }
    // Primerlar
    else if (name.includes('primer') || name.includes('base')) {
      categories.add('Primerler')
    }
    // Özel bakım
    else if (name.includes('complex') || name.includes('formula') || name.includes('active')) {
      categories.add('Özel Bakım')
    }
    // Age care
    else if (name.includes('age') || name.includes('anti-aging') || name.includes('yaşlanma')) {
      categories.add('Yaşlanma Karşıtı')
    }
    // Masaj ürünleri
    else if (name.includes('massage') || name.includes('masaj')) {
      categories.add('Masaj')
    }
    // Dermabrazyon
    else if (name.includes('dermabrasion') || name.includes('exfo') || name.includes('peeling')) {
      categories.add('Peeling & Dermabrazyon')
    }
    // Diğerleri
    else {
      categories.add('Diğer')
    }
  })
  
  return Array.from(categories).sort()
}

// Ürün boyutlarını çıkar
export const getSizes = (): string[] => {
  const sizes = new Set<string>()
  
  productsData.products.forEach(product => {
    if (product.size) {
      sizes.add(product.size)
    }
    
    // Ürün adından boyut çıkar
    const sizeMatch = product.name.match(/(\d+(?:[.,]\d+)?\s*(?:ml|gr|g|mg))/i)
    if (sizeMatch) {
      sizes.add(sizeMatch[1])
    }
  })
  
  return Array.from(sizes).sort()
}

// Fiyat formatla (Türk Lirası)
export const formatPrice = (price: string | number): string => {
  if (!price) return 'Fiyat bilgisi yok'
  
  const numPrice = typeof price === 'string' ? parseFloat(price) : price
  
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  }).format(numPrice)
}

// Açıklama özetini oluştur
export const getExcerpt = (description: string, maxLength: number = 150): string => {
  if (!description) return ''
  
  if (description.length <= maxLength) {
    return description
  }
  
  const sentences = description.split(/[.!?]+/)
  const excerpt = sentences[0]
  
  if (excerpt.length > maxLength) {
    return description.substring(0, maxLength) + '...'
  }
  
  return excerpt + '.'
}

// URL-friendly slug oluştur
export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g') 
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}