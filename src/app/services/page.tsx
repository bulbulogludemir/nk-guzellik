'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Calendar,
  Crown,
  Heart,
  MessageCircle,
  Palette,
  Search,
  ShieldCheck,
  Sparkles,
  Wand2,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const serviceCategories = [
  {
    id: 'permanent-makeup',
    icon: Palette,
    title: 'Kalıcı Makyaj',
    lead: 'PhiBrows Master Farzaneh Naderali ile doğal ve yüz hatlarına uygun sonuçlar.',
    treatments: [
      'PhiBrows microblading & pudra kaş kombinasyonları',
      'Kalıcı eyeliner ve dipliner uygulamaları',
      'Renk dengeli kalıcı dudak renklendirme',
    ],
    highlights: [
      'Altın oran analiziyle kişiye özel tasarım',
      '12-18 ay kalıcılık ve kontrol randevuları',
    ],
  },
  {
    id: 'skin-health',
    icon: Heart,
    title: 'Cilt Sağlığı Protokolleri',
    lead: 'Hydrafacial, pHformula, Genosys ve Theraderm protokolleri ile klinik cilt bakımı.',
    treatments: [
      'Leke, akne ve hassasiyet odaklı özel bakım seansları',
      'MeLine ve pHformula kimyasal peeling uygulamaları',
      'Genosys nano iğneleme ve Theraderm onarım protokolleri',
    ],
    highlights: [
      'Visia destekli cilt analizi ve takip planı',
      'Ev bakımı için profesyonel ürün yönlendirmesi',
    ],
  },
  {
    id: 'laser',
    icon: Sparkles,
    title: 'Lazer Epilasyon',
    lead: 'Soprano ICE Platinum teknolojisi ile dört mevsim konforlu epilasyon.',
    treatments: [
      'Kadın ve erkek tüm vücut epilasyon programları',
      'Hassas bölgeler için düşük ısı kontrollü uygulamalar',
      'Seans başına 3 dalga boyu ile farklı kıl tiplerinde etkinlik',
    ],
    highlights: [
      'Buz başlıkla ağrısız deneyim',
      'Tüm cilt tiplerine uygun FDA onaylı cihaz',
    ],
  },
  {
    id: 'lamination',
    icon: Crown,
    title: 'My Lamination',
    lead: 'Kirpik ve kaş laminasyonunda İtalya menşeli My Lamination sistemleri.',
    treatments: [
      'Kirpik lifting ve yoğun besleyici bakım',
      'Kaş laminasyonu ve şekillendirme',
      'Serum destekli bakım protokolü',
    ],
    highlights: [
      '6-8 hafta kalıcı sonuç',
      'Keratin ve vitamin kompleksli bakım ürünleri',
    ],
  },
]

const workflow = [
  {
    icon: Search,
    title: 'Keşif & Analiz',
    description:
      'İlk görüşmede cilt analizi ve beklentilerinizi dinleyerek kişiye özel plan oluşturuyoruz.',
  },
  {
    icon: Wand2,
    title: 'Uygulama & Protokol',
    description:
      'Her işlem öncesi hijyen protokolü uygulanır, seans boyunca adımları birlikte takip ederiz.',
  },
  {
    icon: ShieldCheck,
    title: 'Takip & Destek',
    description:
      'İşlem sonrası bakım önerileri, kontrol randevuları ve WhatsApp desteği sunuyoruz.',
  },
]

const studioHighlights = [
  {
    icon: Heart,
    title: 'Uzman Dokunuşu',
    description: 'Deneyimli PhiBrows master ve lazer uzmanlarından oluşan seçkin ekip.',
  },
  {
    icon: ShieldCheck,
    title: 'Güvenli Teknoloji',
    description: 'FDA onaylı cihazlar ve orijinal ürünlerle hijyenik uygulama alanı.',
  },
  {
    icon: Sparkles,
    title: 'Kişiye Özel Yaklaşım',
    description: 'Her hizmet öncesi ücretsiz danışma ve ev bakımı yönlendirmesi.',
  },
]

const whatsappUrl = 'https://wa.me/905358726752'

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-muted/10">
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 beauty-gradient opacity-80" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Badge className="bg-white/20 px-4 py-1 text-sm text-white shadow-sm backdrop-blur">
              NK Beauty Hizmetleri
            </Badge>
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Klinik Standartlarında Güzellik Deneyimi
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/90 sm:text-xl">
              Kalıcı makyajdan gelişmiş cilt protokollerine kadar tüm uygulamalarımızı uzman ekibimiz ve
              premium ürünlerle gerçekleştiriyoruz.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href={whatsappUrl} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp ile Danış
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/60 bg-white/10 text-white" asChild>
                <Link href="/contact">
                  <Calendar className="mr-2 h-4 w-4" />
                  Randevu Talep Et
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative -mt-12 pb-20">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border bg-card/90 p-6 shadow-xl shadow-primary/5 backdrop-blur"
          >
            <div className="mb-10 space-y-3 text-center">
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
                Uzmanlık Alanlarımız
              </h2>
              <p className="mx-auto max-w-3xl text-sm text-muted-foreground sm:text-base">
                Her kategori için önce cilt ve beklenti analizi yapıyor, ardından kişiye özel seans planı
                oluşturuyoruz. Tüm uygulamalar kalite standartlarımıza uygun olarak aynı gün içinde kayıt altına alınır.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {serviceCategories.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full overflow-hidden rounded-3xl border border-border/70 bg-background/70 p-0 shadow-md shadow-primary/10">
                    <CardHeader className="flex flex-col gap-4 px-6 pt-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <service.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-semibold text-foreground">
                            {service.title}
                          </CardTitle>
                          <CardDescription className="text-sm text-muted-foreground">
                            {service.lead}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 px-6 pb-6">
                      <div className="space-y-2">
                        {service.treatments.map((item) => (
                          <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Sparkles className="mt-0.5 h-4 w-4 text-primary/70" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {service.highlights.map((highlight) => (
                          <Badge
                            key={highlight}
                            variant="outline"
                            className="rounded-full border-dashed border-primary/40 text-xs text-primary"
                          >
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                      <div className="pt-4">
                        <Button variant="ghost" size="sm" className="text-sm font-semibold" asChild>
                          <Link href={whatsappUrl} target="_blank" rel="noreferrer">
                            Bu hizmet için danışın
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 lg:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full rounded-3xl border bg-card p-6 shadow-md shadow-primary/5 lg:w-2/5"
          >
            <Badge variant="secondary" className="rounded-full">
              Adım Adım Deneyim
            </Badge>
            <h2 className="mt-4 text-2xl font-semibold text-foreground">
              NK Beauty süreci nasıl ilerliyor?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              İlk danışmadan bakım sonrası desteğe kadar her aşamayı şeffaf şekilde planlıyor, sizi yalnız
              bırakmıyoruz.
            </p>
            <div className="mt-6 space-y-6">
              {workflow.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-foreground">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="w-full rounded-3xl border bg-muted/30 p-6 shadow-inner lg:w-3/5"
          >
            <h2 className="text-2xl font-semibold text-foreground">
              Sık tercih edilen kombinasyon paketleri
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Seans programınızı birlikte oluşturuyor, işlem günleri arasında ev bakımı desteği veriyoruz.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Card className="rounded-2xl border border-primary/30 bg-background/80 p-0 shadow-sm">
                <CardHeader className="space-y-2 px-5 pt-5">
                  <Badge variant="outline" className="w-fit rounded-full border-primary/40 text-primary">
                    Profesyonel Bakım
                  </Badge>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    Leke & Işıltı Programı
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    MeLine peeling + Genosys bakım + ev ürünü seti
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-5 pb-5 text-sm text-muted-foreground">
                  3 seanslık protokol; her seans öncesi cilt analizi ve ürün yönlendirmesi dahildir.
                </CardContent>
              </Card>

              <Card className="rounded-2xl border border-primary/30 bg-background/80 p-0 shadow-sm">
                <CardHeader className="space-y-2 px-5 pt-5">
                  <Badge variant="outline" className="w-fit rounded-full border-primary/40 text-primary">
                    Kombine Hizmet
                  </Badge>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    Kalıcı Kaş & Kirpik Bakımı
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    PhiBrows kalıcı kaş tasarımı + My Lamination bakım seansı
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-5 pb-5 text-sm text-muted-foreground">
                  Aynı gün prova, 6 hafta sonra kontrol randevusu ve bakım seti önerisi içerir.
                </CardContent>
              </Card>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Badge variant="outline" className="rounded-full border-dashed">
                Uzman danışmanlık
              </Badge>
              <Badge variant="outline" className="rounded-full border-dashed">
                Kişiye özel planlama
              </Badge>
              <Badge variant="outline" className="rounded-full border-dashed">
                Ev bakımı ürün desteği
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-3xl border bg-card/90 p-8 text-center shadow-xl shadow-primary/5"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-wrap items-center justify-center gap-3">
                {studioHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-primary"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
                Tüm işlemlerimizde güven, deneyim ve kaliteyi bir arada sunuyoruz.
              </h2>
              <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">
                Ankara Çankaya&apos;daki merkezimizde; sterilizasyon protokollerine bağlı, kişiye özel bakım anlayışıyla
                çalışıyoruz. Randevu planlamak veya hizmetler hakkında detaylı bilgi almak için bizimle iletişime
                geçebilirsiniz.
              </p>
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <Button className="beauty-gradient border-none text-white" asChild>
                  <Link href={whatsappUrl} target="_blank" rel="noreferrer">
                    WhatsApp üzerinden sor
                  </Link>
                </Button>
                <Button variant="outline" className="text-sm" asChild>
                  <Link href="/products">Profesyonel ürünlerimizi keşfedin</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
