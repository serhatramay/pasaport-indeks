// Country knowledge cards for detail pages (pilot dataset).
// Expand this map progressively; unknown countries use fallback UI.
const COUNTRY_PROFILES = {
  TR: {
    updatedAt: '2026-02-18',
    schools: [
      { name: 'Koç Üniversitesi', url: 'https://www.ku.edu.tr/' },
      { name: 'Boğaziçi Üniversitesi', url: 'https://www.boun.edu.tr/' },
      { name: 'Orta Doğu Teknik Üniversitesi', url: 'https://www.metu.edu.tr/' },
      { name: 'İstanbul Teknik Üniversitesi', url: 'https://www.itu.edu.tr/' },
      { name: 'Sabancı Üniversitesi', url: 'https://www.sabanciuniv.edu/' }
    ],
    places: ['İstanbul Tarihi Yarımada', 'Kapadokya', 'Pamukkale', 'Efes Antik Kenti', 'Antalya Kaleiçi'],
    operators: [
      { name: 'Turkcell', url: 'https://www.turkcell.com.tr/' },
      { name: 'Vodafone TR', url: 'https://www.vodafone.com.tr/' },
      { name: 'Türk Telekom', url: 'https://www.turktelekom.com.tr/' }
    ],
    currency: 'Türk Lirası (TRY)',
    minimumWage: 'Dönemsel olarak güncellenir; resmi kaynakla teyit edilmelidir.',
    livingCost: 'Büyük şehirlerde kira ve ulaşım maliyeti yüksektir; bölgesel farklar belirgindir.',
    government: 'Cumhuriyet, başkanlık sistemi',
    inflation: 'Yıllık oran dönemsel değişir; resmi kurum verisiyle güncel kontrol önerilir.',
    foodCulture: 'Kahvaltı kültürü güçlüdür; kebap, zeytinyağlılar ve bölgesel mutfak çeşitliliği öne çıkar.',
    famousPeople: ['Mustafa Kemal Atatürk', 'Nazım Hikmet', 'Orhan Pamuk', 'Aziz Sancar', 'Nuri Bilge Ceylan', 'Sabiha Gökçen', 'Mimar Sinan', 'Elif Şafak', 'Arda Güler', 'Fazıl Say']
  },
  DE: {
    updatedAt: '2026-02-18',
    schools: [
      { name: 'Technical University of Munich', url: 'https://www.tum.de/' },
      { name: 'LMU Munich', url: 'https://www.lmu.de/en/' },
      { name: 'Heidelberg University', url: 'https://www.uni-heidelberg.de/en' },
      { name: 'RWTH Aachen University', url: 'https://www.rwth-aachen.de/' },
      { name: 'Humboldt-Universität zu Berlin', url: 'https://www.hu-berlin.de/en' }
    ],
    places: ['Berlin Müzeler Adası', 'Neuschwanstein Şatosu', 'Köln Katedrali', 'Bavyera Alpleri', 'Hamburg Limanı'],
    operators: [
      { name: 'Deutsche Telekom', url: 'https://www.telekom.com/' },
      { name: 'Vodafone Germany', url: 'https://www.vodafone.de/' },
      { name: 'O2 Telefónica Germany', url: 'https://www.telefonica.de/' }
    ],
    currency: 'Euro (EUR)',
    minimumWage: 'Ulusal asgari ücret saatlik bazda güncellenir; resmi duyurular takip edilmelidir.',
    livingCost: 'Münih ve Frankfurt pahalıdır; orta ölçekli şehirlerde maliyet daha dengelidir.',
    government: 'Federal parlamenter cumhuriyet',
    inflation: 'Euro Bölgesi ve ulusal istatistik kurumları üzerinden güncel takip edilmelidir.',
    foodCulture: 'Ekmek, sosis, patates ve bölgesel bira kültürü yaygındır.',
    famousPeople: ['Albert Einstein', 'Johann Wolfgang von Goethe', 'Ludwig van Beethoven', 'Immanuel Kant', 'Angela Merkel', 'Michael Schumacher', 'Thomas Müller', 'Claudia Schiffer', 'Boris Becker', 'Karl Marx']
  },
  US: {
    updatedAt: '2026-02-18',
    schools: [
      { name: 'Harvard University', url: 'https://www.harvard.edu/' },
      { name: 'Massachusetts Institute of Technology', url: 'https://www.mit.edu/' },
      { name: 'Stanford University', url: 'https://www.stanford.edu/' },
      { name: 'University of California, Berkeley', url: 'https://www.berkeley.edu/' },
      { name: 'Princeton University', url: 'https://www.princeton.edu/' }
    ],
    places: ['New York Manhattan', 'Grand Canyon', 'Yellowstone', 'San Francisco Golden Gate', 'Washington DC National Mall'],
    operators: [
      { name: 'AT&T', url: 'https://www.att.com/' },
      { name: 'Verizon', url: 'https://www.verizon.com/' },
      { name: 'T-Mobile US', url: 'https://www.t-mobile.com/' }
    ],
    currency: 'US Dollar (USD)',
    minimumWage: 'Federal ve eyalet bazında değişir; eyalet düzeyinde kontrol edilmelidir.',
    livingCost: 'New York ve San Francisco gibi şehirlerde yüksek, eyaletlere göre farklıdır.',
    government: 'Federal başkanlık sistemi',
    inflation: 'CPI verileri dönemsel değişir; resmi istatistiklerle güncel kontrol gerekir.',
    foodCulture: 'Göçmen mutfaklarının etkisi güçlü; fast-casual ve bölgesel mutfak çeşitliliği yaygın.',
    famousPeople: ['Abraham Lincoln', 'Martin Luther King Jr.', 'Elon Musk', 'Oprah Winfrey', 'Michael Jordan', 'Taylor Swift', 'Meryl Streep', 'Mark Zuckerberg', 'Beyoncé', 'Steven Spielberg']
  },
  GB: {
    updatedAt: '2026-02-18',
    schools: [
      { name: 'University of Oxford', url: 'https://www.ox.ac.uk/' },
      { name: 'University of Cambridge', url: 'https://www.cam.ac.uk/' },
      { name: 'Imperial College London', url: 'https://www.imperial.ac.uk/' },
      { name: 'UCL', url: 'https://www.ucl.ac.uk/' },
      { name: 'London School of Economics', url: 'https://www.lse.ac.uk/' }
    ],
    places: ['Londra Westminster', 'Edinburgh Old Town', 'Lake District', 'Stonehenge', 'Oxford'],
    operators: [
      { name: 'EE', url: 'https://ee.co.uk/' },
      { name: 'Vodafone UK', url: 'https://www.vodafone.co.uk/' },
      { name: 'O2 UK', url: 'https://www.o2.co.uk/' },
      { name: 'Three UK', url: 'https://www.three.co.uk/' }
    ],
    currency: 'Pound Sterling (GBP)',
    minimumWage: 'National Minimum Wage / National Living Wage olarak yaşa göre güncellenir.',
    livingCost: 'Londra oldukça pahalıdır; kuzey şehirlerinde daha dengelidir.',
    government: 'Parlamenter monarşi',
    inflation: 'BoE ve ONS verilerine göre dönemsel değişir.',
    foodCulture: 'Pub kültürü, kahvaltı geleneği ve çok kültürlü restoran çeşitliliği yaygındır.',
    famousPeople: ['William Shakespeare', 'Isaac Newton', 'Charles Darwin', 'Winston Churchill', 'David Beckham', 'Adele', 'J.K. Rowling', 'Stephen Hawking', 'Emma Watson', 'Freddie Mercury']
  },
  FR: {
    updatedAt: '2026-02-18',
    schools: [
      { name: 'Sorbonne University', url: 'https://www.sorbonne-universite.fr/en' },
      { name: 'École Polytechnique', url: 'https://www.polytechnique.edu/en' },
      { name: 'PSL University', url: 'https://www.psl.eu/en' },
      { name: 'Sciences Po', url: 'https://www.sciencespo.fr/en/' },
      { name: 'Université Paris-Saclay', url: 'https://www.universite-paris-saclay.fr/en' }
    ],
    places: ['Paris Eiffel Çevresi', 'Louvre Müzesi', 'Nice Sahil Şeridi', 'Mont Saint-Michel', 'Bordeaux'],
    operators: [
      { name: 'Orange', url: 'https://www.orange.com/' },
      { name: 'SFR', url: 'https://www.sfr.com/' },
      { name: 'Bouygues Telecom', url: 'https://www.bouyguestelecom.fr/' },
      { name: 'Free Mobile', url: 'https://mobile.free.fr/' }
    ],
    currency: 'Euro (EUR)',
    minimumWage: 'SMIC olarak güncellenir; resmi değer yıllık revize edilir.',
    livingCost: 'Paris pahalıdır; bölgesel şehirlerde maliyet daha düşüktür.',
    government: 'Yarı başkanlık sistemi',
    inflation: 'Ulusal istatistik kurumu ve Eurostat verileriyle takip edilmelidir.',
    foodCulture: 'Peynir, ekmek, şarap ve uzun öğün kültürü güçlüdür.',
    famousPeople: ['Napoléon Bonaparte', 'Victor Hugo', 'Marie Curie', 'Coco Chanel', 'Zinedine Zidane', 'Kylian Mbappé', 'Claude Monet', 'Brigitte Bardot', 'Jean-Paul Sartre', 'Daft Punk']
  }
};
