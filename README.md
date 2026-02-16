# pasaport-indeks
Türkiye'nin ilk Türkçe Pasaport Güç Endeksi. Ülkelerin vize durumu, pasaport sıralaması ve karşılaştırma aracı.

## Veri Dogrulama
`js/data.js` icin hizli kalite kontrolu:

```bash
./scripts/validate-data.sh
```

Kontroller:
- Beyan edilen ulke sayisi vs gercek kayit sayisi
- Tekrarlanan `kod` (ISO2) ve `iso3`
- `puan = vizesiz + varistaSiz + evize`
- `vizesiz + varistaSiz + evize + vizeGerekli = 198`
