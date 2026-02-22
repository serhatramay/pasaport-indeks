# Gold Editoryal Backlog (Öncelikli 20 Ülke)

Amaç: `draft/fallback` durumundaki ülke rehberlerini, kaynaklı ve zengin içerikli `Gold` standardına taşımak.

## Mevcut Durum (2026-02-23)

- Gold: 33
- Gold olmayan (draft/fallback ağırlıklı): 120

## Önceliklendirme Mantığı

- Türk kullanıcı için seyahat/rota değeri yüksek ülkeler
- Turizm + iş + aktarma potansiyeli
- Pasaport sıralamasında görünürlüğü yüksek ülkeler
- Rota modülü / bütçe çevirici ile birlikte anlamlı kullanım üretmesi

## Faz 1 (İlk 10)

1. TH - Tayland
2. GE - Gürcistan
3. EG - Mısır
4. AZ - Azerbaycan
5. SA - Suudi Arabistan
6. RU - Rusya
7. UA - Ukrayna
8. ID - Endonezya
9. HK - Hong Kong
10. TW - Tayvan

## Faz 2 (İkinci 10)

11. IL - İsrail
12. BH - Bahreyn
13. MX - Meksika
14. BR - Brezilya
15. CR - Kosta Rika
16. MU - Mauritius
17. KZ - Kazakistan
18. SM - San Marino
19. AD - Andorra
20. BN - Brunei

---

## Gold Standard Checklist (Her Ülke İçin)

Bir ülke `Gold` sayılmadan önce aşağıdaki minimum şartlar sağlanmalı.

### 1) Temel Rehber İçeriği (zorunlu)

- [ ] `updatedAt` güncel tarih
- [ ] `schools` en az 5 kayıt (tercihen resmi site linkli)
- [ ] `places` en az 5 kayıt (gerçek, kullanıcı odaklı)
- [ ] `operators` en az 3 kayıt (resmi site linkli)
- [ ] `currency` dolu ve doğru
- [ ] `minimumWage` kısa ama doğru yönlendirici açıklama
- [ ] `livingCost` ülkeye özgü özet
- [ ] `government` net yönetim biçimi
- [ ] `inflation` güncellik uyarılı özet
- [ ] `foodCulture` özgün kısa açıklama
- [ ] `famousPeople` 10 kişi (gerçek, ülkeyle güçlü ilişkili)

### 2) Kaynak ve Güven Modeli (zorunlu)

- [ ] `source_registry.schools` kaynak URL + ad + checked_at + trust_score
- [ ] `source_registry.places` kaynak URL + ad + checked_at + trust_score
- [ ] `source_registry.operators` kaynak URL + ad + checked_at + trust_score
- [ ] `source_registry.famousPeople` kaynak URL + ad + checked_at + trust_score
- [ ] `fields.currency` source/checked/trust dolu
- [ ] `fields.minimumWage` source/checked/trust dolu
- [ ] `fields.livingCost` source/checked/trust dolu
- [ ] `fields.inflation` source/checked/trust dolu
- [ ] `fields.government` source/checked/trust dolu
- [ ] `fields.foodCulture` source/checked/trust dolu

### 3) Kullanıcı Fayda Kontrolü (zorunlu)

- [ ] Gezilecek yerler gerçekten seyahat planına yardımcı (şehir/rota odaklı)
- [ ] Operatörler turist/gezgin için pratik (SIM/eSIM açısından anlamlı)
- [ ] Ekonomi özetinde maliyet farkları/şehir farkları belirtilmiş
- [ ] İçerik “genel Wikipedia metni” gibi değil, kullanıcıya yön veren dilde

### 4) UI/İçerik Tutarlılığı (zorunlu)

- [ ] Türkçe karakter hatası yok (örn. `Turkiye`, `Ispanya` yok)
- [ ] Rehber kartlarında boş/zayıf içerik görünmüyor
- [ ] “İçerik Kalitesi Özeti” kartı anlamlı sayılar gösteriyor
- [ ] Kart aksiyonları çalışıyor (kaynak, rota, bütçe vb.)

### 5) Son Kontrol (zorunlu)

- [ ] `scripts/validate-site-consistency.sh` geçti
- [ ] Detay sayfa görsel kontrol (masaüstü + mobil)
- [ ] SEO görünür metin kontrolü (başlık, breadcrumb, rehber başlıkları)

---

## Ülke Bazlı Çalışma Notu Şablonu

Her ülke için aşağıdaki formatla ilerle:

### [KOD] Ülke Adı

- Durum: `draft` -> `gold`
- Son edit: YYYY-MM-DD
- Eksikler:
  - Okullar:
  - Gezilecek Yerler:
  - Operatörler:
  - Ekonomi:
  - Ünlüler:
- Kaynaklar:
  - Schools:
  - Places:
  - Operators:
  - Famous:
- Notlar:
  - 

---

## Hızlı Uygulama Planı (Pratik)

- Günlük hedef: 2 ülke
- Haftalık hedef: 10 ülke
- 2 haftada: bu listedeki 20 ülkenin `Gold` dönüşümü tamamlanabilir

Önerilen sıra:

1. Önce Faz 1 (Türk kullanıcı için yüksek fayda)
2. Sonra Faz 2 (global SEO + pasaport görünürlüğü yüksek ülkeler)
