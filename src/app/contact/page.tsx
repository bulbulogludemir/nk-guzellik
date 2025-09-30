'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Phone,
  MapPin,
  Mail,
  Instagram,
  MessageCircle,
  Clock,
  Calendar,
  Send,
  Heart,
  Sparkles,
  Navigation,
  Info
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const contactInfo = [
  {
    icon: Phone,
    title: 'Telefon',
    info: '+90 535 872 67 52',
    subInfo: 'Pazartesi-Cumartesi 10:00-20:00',
    href: 'tel:+905358726752',
    color: 'beauty-rose'
  },
  {
    icon: MapPin,
    title: 'Adres',
    info: 'Piyade Sokak No:32/4',
    subInfo: 'Çankaya/Ankara',
    href: 'https://maps.google.com/?q=Piyade+Sokak+No:32/4,+Çankaya,+Ankara',
    color: 'beauty-gold'
  },
  {
    icon: Mail,
    title: 'E-posta',
    info: 'nkestetik@gmail.com',
    subInfo: '24 saat içinde yanıtlıyoruz',
    href: 'mailto:nkestetik@gmail.com',
    color: 'beauty-lavender'
  },
  {
    icon: Instagram,
    title: 'Instagram',
    info: '@nkguzellik',
    subInfo: 'Günlük paylaşımlarımızı takip edin',
    href: 'https://instagram.com/nkguzellik',
    color: 'beauty-sage'
  }
];

const workingHours = [
  { day: 'Pazartesi', hours: '10:00 - 20:00', isToday: false },
  { day: 'Salı', hours: '10:00 - 20:00', isToday: false },
  { day: 'Çarşamba', hours: '10:00 - 20:00', isToday: true },
  { day: 'Perşembe', hours: '10:00 - 20:00', isToday: false },
  { day: 'Cuma', hours: '10:00 - 20:00', isToday: false },
  { day: 'Cumartesi', hours: '10:00 - 20:00', isToday: false },
  { day: 'Pazar', hours: 'Kapalı', isToday: false }
];

const quickActions = [
  {
    icon: Calendar,
    title: 'Randevu Al',
    description: 'WhatsApp üzerinden hızlı randevu',
    action: 'WhatsApp\'ta Aç',
    href: 'https://wa.me/905358726752',
    color: 'beauty-rose'
  },
  {
    icon: Navigation,
    title: 'Yol Tarifi',
    description: 'Google Maps ile kolay ulaşım',
    action: 'Haritada Görüntüle',
    href: 'https://maps.google.com/?q=Piyade+Sokak+No:32/4,+Çankaya,+Ankara',
    color: 'beauty-gold'
  },
  {
    icon: Instagram,
    title: 'Sosyal Medya',
    description: 'En son çalışmalarımızı görün',
    action: 'Instagram\'ı Ziyaret Et',
    href: 'https://instagram.com/nkguzellik',
    color: 'beauty-lavender'
  }
];

const faqItems = [
  {
    question: 'Randevu almak için ne yapmalıyım?',
    answer: 'WhatsApp, telefon veya Instagram üzerinden bize ulaşabilirsiniz. Size en uygun saati bulup randevunuzu oluşturabiliriz.'
  },
  {
    question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
    answer: 'Nakit, kredi kartı ve banka kartı ile ödeme yapabilirsiniz. Taksitli ödeme seçenekleri de mevcuttur.'
  },
  {
    question: 'Gelin paketi için ne kadar önceden randevu almalıyım?',
    answer: 'Gelin paketleri için en az 1 ay önceden randevu almanızı tavsiye ediyoruz. Böylece prova randevularınızı da rahatça planlayabiliriz.'
  },
  {
    question: 'Ürünlerinizi satın alabilir miyim?',
    answer: 'Evet, salonumuzda kullandığımız profesyonel ürünleri sizin için temin edebiliriz. Fiyat ve stok bilgisi için iletişime geçin.'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = encodeURIComponent(
      `Merhaba! Web sitesinden iletişim kuruyorum.
      
Ad Soyad: ${formData.name}
Telefon: ${formData.phone}
E-posta: ${formData.email}
İlgilendiğim Hizmet: ${formData.service}
Mesaj: ${formData.message}

Lütfen benimle iletişime geçin.`
    );
    window.open(`https://wa.me/905358726752?text=${whatsappMessage}`, '_blank');
  };

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
              İletişim
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Bizimle İletişime Geçin
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Sorularınız için buradayız. Size en iyi hizmeti sunmak için sabırsızlanıyoruz
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center beauty-transition hover:beauty-shadow group cursor-pointer">
                  <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl bg-${item.color} flex items-center justify-center group-hover:scale-110 beauty-transition`}>
                      <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <CardTitle className="text-base sm:text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <Link href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}>
                      <p className="text-sm sm:text-base font-semibold text-primary group-hover:text-primary/80 beauty-transition">
                        {item.info}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        {item.subInfo}
                      </p>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="beauty-shadow">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
                    <Send className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    Mesaj Gönderin
                  </CardTitle>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Formu doldurun, size WhatsApp üzerinden ulaşalım
                  </p>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Ad Soyad *</label>
                        <Input
                          placeholder="Adınız ve soyadınız"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Telefon *</label>
                        <Input
                          placeholder="0500 123 45 67"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">E-posta</label>
                      <Input
                        type="email"
                        placeholder="ornek@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">İlgilendiğiniz Hizmet</label>
                      <select 
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground"
                        value={formData.service}
                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                      >
                        <option value="">Hizmet seçin</option>
                        <option value="Kalıcı Makyaj">Kalıcı Makyaj (Phibrows)</option>
                        <option value="Lazer Epilasyon">Lazer Epilasyon (Soprano ICE)</option>
                        <option value="Cilt Bakım">Cilt Bakım Tedavileri</option>
                        <option value="Kirpik Laminasyon">Kirpik Laminasyon</option>
                        <option value="Medikal Estetik">Medikal Estetik</option>
                        <option value="Gelin Paketi">Özel Bakım Paketleri</option>
                        <option value="Diğer">Diğer</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Mesajınız</label>
                      <Textarea
                        placeholder="Mesajınızı yazın..."
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full beauty-gradient text-white">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp ile Gönder
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Working Hours & Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Working Hours */}
              <Card className="beauty-shadow">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Çalışma Saatleri
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {workingHours.map((schedule, index) => (
                      <div 
                        key={index} 
                        className={`flex justify-between items-center p-3 rounded-lg beauty-transition ${
                          schedule.isToday 
                            ? 'bg-primary/10 border border-primary/20' 
                            : 'hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${schedule.isToday ? 'text-primary' : ''}`}>
                            {schedule.day}
                          </span>
                          {schedule.isToday && (
                            <Badge variant="secondary" className="text-xs">Bugün</Badge>
                          )}
                        </div>
                        <span className={`text-sm ${schedule.isToday ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>
                          {schedule.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Hızlı Erişim
                </h3>
                {quickActions.map((action, index) => (
                  <Card key={index} className="beauty-transition hover:beauty-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-${action.color} flex items-center justify-center`}>
                          <action.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{action.title}</h4>
                          <p className="text-sm text-muted-foreground">{action.description}</p>
                        </div>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={action.href} target="_blank">
                            {action.action}
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">Sık Sorulan Sorular</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Merak Ettikleriniz
            </h2>
            <p className="text-lg text-muted-foreground">
              En çok sorulan soruların yanıtlarını buradan bulabilirsiniz
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full beauty-transition hover:beauty-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3 flex items-start gap-2">
                      <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      {item.question}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
            <Heart className="w-16 h-16 mx-auto mb-6 text-white/80" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Güzellik Yolculuğunuz Başlasın
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Size özel güzellik deneyimi için hemen randevunuzu alın
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 beauty-transition"
                asChild
              >
                <Link href="https://wa.me/905358726752" target="_blank">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Hemen Randevu Al
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary beauty-transition"
                asChild
              >
                <Link href="/services">
                  Hizmetlerimizi İncele
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}