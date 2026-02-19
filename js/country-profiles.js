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
  },
  ES: {
    updatedAt: '2026-02-18',
    schools: [
      { name: 'Universitat de Barcelona', url: 'https://web.ub.edu/' },
      { name: 'Universidad Autónoma de Madrid', url: 'https://www.uam.es/' },
      { name: 'Universitat Autònoma de Barcelona', url: 'https://www.uab.cat/' },
      { name: 'Universidad Complutense de Madrid', url: 'https://www.ucm.es/' },
      { name: 'Universidad de Navarra', url: 'https://www.unav.edu/' }
    ],
    places: ['Barcelona Sagrada Família', 'Madrid Prado Müzesi', 'Sevilla Alcázar', 'Granada Elhamra', 'Valencia Şehir Sanatları Merkezi'],
    operators: [
      { name: 'Movistar', url: 'https://www.movistar.es/' },
      { name: 'Vodafone Spain', url: 'https://www.vodafone.es/' },
      { name: 'Orange España', url: 'https://www.orange.es/' }
    ],
    currency: 'Euro (EUR)',
    minimumWage: 'SMI olarak yıllık güncellenir; resmi duyuru takip edilmelidir.',
    livingCost: 'Madrid ve Barcelona yüksek; diğer şehirlerde daha dengeli olabilir.',
    government: 'Parlamenter monarşi',
    inflation: 'Euro Bölgesi ve INE verilerine göre dönemsel değişir.',
    foodCulture: 'Tapas kültürü, zeytinyağı kullanımı ve bölgesel mutfak çeşitliliği öne çıkar.',
    famousPeople: ['Pablo Picasso', 'Salvador Dalí', 'Miguel de Cervantes', 'Rafael Nadal', 'Antonio Gaudí', 'Penélope Cruz', 'Pedro Almodóvar', 'Fernando Alonso', 'Sergio Ramos', 'Rosalía']
  },
  JP: {
    updatedAt: '2026-02-18',
    schools: [
      { name: 'The University of Tokyo', url: 'https://www.u-tokyo.ac.jp/en/' },
      { name: 'Kyoto University', url: 'https://www.kyoto-u.ac.jp/en' },
      { name: 'Osaka University', url: 'https://www.osaka-u.ac.jp/en' },
      { name: 'Tohoku University', url: 'https://www.tohoku.ac.jp/en/' },
      { name: 'Tokyo Institute of Technology', url: 'https://www.isct.ac.jp/en' }
    ],
    places: ['Tokyo Shibuya', 'Kyoto Tapınakları', 'Osaka Dotonbori', 'Fuji Dağı', 'Hokkaido'],
    operators: [
      { name: 'NTT Docomo', url: 'https://www.docomo.ne.jp/english/' },
      { name: 'KDDI au', url: 'https://www.au.com/english/' },
      { name: 'SoftBank', url: 'https://www.softbank.jp/en/' }
    ],
    currency: 'Japon Yeni (JPY)',
    minimumWage: 'Eyalet bazında saatlik ücretler dönemsel güncellenir.',
    livingCost: 'Tokyo yüksek maliyetli; şehirler arası fark belirgindir.',
    government: 'Parlamenter monarşi',
    inflation: 'Japonya istatistik kurumları verileriyle güncel takip önerilir.',
    foodCulture: 'Sushi, ramen, izakaya kültürü ve mevsimsel ürün odaklı mutfak öne çıkar.',
    famousPeople: ['Akira Kurosawa', 'Hayao Miyazaki', 'Yayoi Kusama', 'Haruki Murakami', 'Naomi Osaka', 'Hokusai', 'Shinzo Abe', 'Yuzuru Hanyu', 'Ryuichi Sakamoto', 'Marie Kondo']
  },
  SG: {
    updatedAt: '2026-02-18',
    schools: [
      { name: 'National University of Singapore', url: 'https://www.nus.edu.sg/' },
      { name: 'Nanyang Technological University', url: 'https://www.ntu.edu.sg/' },
      { name: 'Singapore Management University', url: 'https://www.smu.edu.sg/' },
      { name: 'Singapore University of Technology and Design', url: 'https://www.sutd.edu.sg/' },
      { name: 'Singapore Institute of Technology', url: 'https://www.singaporetech.edu.sg/' }
    ],
    places: ['Marina Bay', 'Gardens by the Bay', 'Sentosa', 'Chinatown', 'Singapore Botanic Gardens'],
    operators: [
      { name: 'Singtel', url: 'https://www.singtel.com/' },
      { name: 'StarHub', url: 'https://www.starhub.com/' },
      { name: 'M1', url: 'https://www.m1.com.sg/' }
    ],
    currency: 'Singapur Doları (SGD)',
    minimumWage: 'Genel ulusal asgari ücret modeli yerine sektör bazlı düzenlemeler bulunur.',
    livingCost: 'Kira ve konut giderleri yüksektir; toplu taşıma güçlüdür.',
    government: 'Parlamenter cumhuriyet',
    inflation: 'MAS ve resmi istatistik verileriyle güncel takip edilmelidir.',
    foodCulture: 'Hawker center kültürü, Çin-Malay-Hint etkili çok kültürlü mutfak öne çıkar.',
    famousPeople: ['Lee Kuan Yew', 'Joseph Schooling', 'JJ Lin', 'Stefanie Sun', 'Tan Swie Hian', 'Fandi Ahmad', 'Taufik Batisah', 'Lim Yew Hock', 'Ng Eng Hen', 'Kit Chan']
  },
  CA: {
    updatedAt: '2026-02-18',
    schools: [
      { name: 'University of Toronto', url: 'https://www.utoronto.ca/' },
      { name: 'University of British Columbia', url: 'https://www.ubc.ca/' },
      { name: 'McGill University', url: 'https://www.mcgill.ca/' },
      { name: 'University of Waterloo', url: 'https://uwaterloo.ca/' },
      { name: 'University of Alberta', url: 'https://www.ualberta.ca/' }
    ],
    places: ['Toronto Downtown', 'Banff National Park', 'Vancouver Stanley Park', 'Québec Old Town', 'Niagara Şelalesi'],
    operators: [
      { name: 'Rogers', url: 'https://www.rogers.com/' },
      { name: 'Bell', url: 'https://www.bell.ca/' },
      { name: 'Telus', url: 'https://www.telus.com/' }
    ],
    currency: 'Kanada Doları (CAD)',
    minimumWage: 'Federal ve eyalet düzeyinde değişir; eyalet bazında takip edilmelidir.',
    livingCost: 'Toronto ve Vancouver yüksek maliyetli; diğer bölgelerde daha dengelidir.',
    government: 'Federal parlamenter monarşi',
    inflation: 'Kanada merkez bankası ve istatistik kurumu verileriyle izlenir.',
    foodCulture: 'Çok kültürlü mutfak yapısı, deniz ürünleri ve bölgesel farklılıklar belirgindir.',
    famousPeople: ['Celine Dion', 'Drake', 'Justin Bieber', 'Ryan Reynolds', 'Keanu Reeves', 'Margaret Atwood', 'Wayne Gretzky', 'The Weeknd', 'Jim Carrey', 'Michael J. Fox']
  },
  AU: {
    updatedAt: '2026-02-18',
    schools: [
      { name: 'University of Melbourne', url: 'https://www.unimelb.edu.au/' },
      { name: 'University of Sydney', url: 'https://www.sydney.edu.au/' },
      { name: 'UNSW Sydney', url: 'https://www.unsw.edu.au/' },
      { name: 'Australian National University', url: 'https://www.anu.edu.au/' },
      { name: 'Monash University', url: 'https://www.monash.edu/' }
    ],
    places: ['Sydney Opera House', 'Great Barrier Reef', 'Melbourne City Centre', 'Uluru', 'Gold Coast'],
    operators: [
      { name: 'Telstra', url: 'https://www.telstra.com.au/' },
      { name: 'Optus', url: 'https://www.optus.com.au/' },
      { name: 'Vodafone Australia', url: 'https://www.vodafone.com.au/' }
    ],
    currency: 'Avustralya Doları (AUD)',
    minimumWage: 'Ulusal saatlik ücret modeli bulunur ve dönemsel güncellenir.',
    livingCost: 'Sydney ve Melbourne yüksek maliyetli; eyaletler arası fark görülür.',
    government: 'Federal parlamenter monarşi',
    inflation: 'ABS ve merkez bankası verilerine göre dönemsel değişir.',
    foodCulture: 'Kafe kültürü, deniz ürünleri ve Asya etkili modern mutfak yaygındır.',
    famousPeople: ['Hugh Jackman', 'Nicole Kidman', 'Chris Hemsworth', 'Margot Robbie', 'Cate Blanchett', 'Steve Irwin', 'Kylie Minogue', 'Heath Ledger', 'Russell Crowe', 'Ashleigh Barty']
  },
  IT: {
    updatedAt: '2026-02-18',
    schools: [
      { name: 'Sapienza University of Rome', url: 'https://www.uniroma1.it/en' },
      { name: 'University of Bologna', url: 'https://www.unibo.it/en' },
      { name: 'Politecnico di Milano', url: 'https://www.polimi.it/en/' },
      { name: 'University of Padua', url: 'https://www.unipd.it/en/' },
      { name: 'Scuola Normale Superiore', url: 'https://www.sns.it/en' }
    ],
    places: ['Roma Colosseum', 'Floransa Tarihi Merkez', 'Venedik Kanalları', 'Amalfi Kıyıları', 'Milano Duomo'],
    operators: [
      { name: 'TIM', url: 'https://www.tim.it/' },
      { name: 'Vodafone Italy', url: 'https://www.vodafone.it/' },
      { name: 'WindTre', url: 'https://www.windtre.it/' },
      { name: 'Iliad Italia', url: 'https://www.iliad.it/' }
    ],
    currency: 'Euro (EUR)',
    minimumWage: 'Sektörel toplu sözleşmeler ağırlıktadır; resmi güncel düzenleme takip edilmelidir.',
    livingCost: 'Milan ve Roma daha pahalı; güneyde nispeten düşüktür.',
    government: 'Parlamenter cumhuriyet',
    inflation: 'ISTAT ve Eurostat verileriyle dönemsel izlenir.',
    foodCulture: 'Pasta, pizza, bölgesel peynir ve zeytinyağı odaklı mutfak kültürü güçlüdür.',
    famousPeople: ['Leonardo da Vinci', 'Michelangelo', 'Galileo Galilei', 'Sofia Loren', 'Giorgio Armani', 'Andrea Bocelli', 'Roberto Baggio', 'Monica Bellucci', 'Ennio Morricone', 'Valentino Rossi']
  },
  NL: {
    updatedAt: '2026-02-18',
    schools: [
      { name: 'University of Amsterdam', url: 'https://www.uva.nl/en' },
      { name: 'Delft University of Technology', url: 'https://www.tudelft.nl/en/' },
      { name: 'Leiden University', url: 'https://www.universiteitleiden.nl/en' },
      { name: 'Utrecht University', url: 'https://www.uu.nl/en' },
      { name: 'Erasmus University Rotterdam', url: 'https://www.eur.nl/en' }
    ],
    places: ['Amsterdam Kanalları', 'Rotterdam Modern Merkez', 'Keukenhof', 'The Hague', 'Giethoorn'],
    operators: [
      { name: 'KPN', url: 'https://www.kpn.com/' },
      { name: 'VodafoneZiggo', url: 'https://www.vodafoneziggo.nl/' },
      { name: 'Odido', url: 'https://www.odido.nl/' }
    ],
    currency: 'Euro (EUR)',
    minimumWage: 'Ulusal asgari ücret dönemsel güncellenir.',
    livingCost: 'Amsterdam konut maliyetleri yüksek; diğer şehirlerde daha dengeli olabilir.',
    government: 'Parlamenter monarşi',
    inflation: 'CBS ve Eurostat verileriyle güncel takip önerilir.',
    foodCulture: 'Peynir, fırın ürünleri ve çok kültürlü şehir mutfağı öne çıkar.',
    famousPeople: ['Vincent van Gogh', 'Johan Cruyff', 'Erasmus', 'Rembrandt', 'Anne Frank', 'Max Verstappen', 'Armin van Buuren', 'Martin Garrix', 'Ruud Gullit', 'Wesley Sneijder']
  },
  SE: {
    updatedAt: '2026-02-18',
    schools: [
      { name: 'Karolinska Institutet', url: 'https://ki.se/en' },
      { name: 'Uppsala University', url: 'https://www.uu.se/en/' },
      { name: 'Lund University', url: 'https://www.lunduniversity.lu.se/' },
      { name: 'KTH Royal Institute of Technology', url: 'https://www.kth.se/en' },
      { name: 'Stockholm University', url: 'https://www.su.se/english/' }
    ],
    places: ['Stockholm Gamla Stan', 'Göteborg', 'Kiruna ve Kuzey Işıkları', 'Gotland', 'Malmö'],
    operators: [
      { name: 'Telia', url: 'https://www.telia.se/' },
      { name: 'Tele2', url: 'https://www.tele2.se/' },
      { name: 'Telenor Sweden', url: 'https://www.telenor.se/' }
    ],
    currency: 'İsveç Kronu (SEK)',
    minimumWage: 'Merkezi ulusal asgari ücret yerine toplu sözleşme yapısı baskındır.',
    livingCost: 'Stockholm yüksek maliyetlidir; kuzey bölgelerde yaşam tarzı farklılaşır.',
    government: 'Parlamenter monarşi',
    inflation: 'Riksbank ve resmi istatistik verileriyle dönemsel takip edilir.',
    foodCulture: 'Deniz ürünleri, tarçınlı hamur işleri ve sade/yerel ürün odaklı mutfak yaygındır.',
    famousPeople: ['Alfred Nobel', 'Greta Thunberg', 'Zlatan Ibrahimović', 'Ingmar Bergman', 'ABBA', 'Astrid Lindgren', 'Avicii', 'Alexander Skarsgård', 'Björn Borg', 'Robin Carlsson']
  },
  CH: {
    updatedAt: '2026-02-18',
    schools: [
      { name: 'ETH Zurich', url: 'https://ethz.ch/en.html' },
      { name: 'EPFL', url: 'https://www.epfl.ch/en/' },
      { name: 'University of Zurich', url: 'https://www.uzh.ch/en.html' },
      { name: 'University of Geneva', url: 'https://www.unige.ch/en/' },
      { name: 'University of Basel', url: 'https://www.unibas.ch/en.html' }
    ],
    places: ['Zürih Gölü', 'Luzern', 'Matterhorn', 'Cenevre Gölü', 'Interlaken'],
    operators: [
      { name: 'Swisscom', url: 'https://www.swisscom.ch/en/' },
      { name: 'Sunrise', url: 'https://www.sunrise.ch/en/' },
      { name: 'Salt', url: 'https://www.salt.ch/en/' }
    ],
    currency: 'İsviçre Frangı (CHF)',
    minimumWage: 'Kanton bazlı farklılık gösterebilir; bölgesel resmi kaynaklar takip edilmelidir.',
    livingCost: 'Dünyanın en yüksek yaşam maliyeti olan ülkelerindendir.',
    government: 'Federal cumhuriyet (doğrudan demokrasi unsurları güçlü)',
    inflation: 'SNB ve resmi istatistik kurumlarıyla dönemsel takip edilir.',
    foodCulture: 'Peynir fondü, çikolata ve bölgesel Alp mutfağı öne çıkar.',
    famousPeople: ['Roger Federer', 'Albert Einstein', 'Jean-Jacques Rousseau', 'Le Corbusier', 'Carl Jung', 'Urs Fischer', 'Martina Hingis', 'Nemo', 'Stephan Eicher', 'Xherdan Shaqiri']
  },
  AE: {
    updatedAt: '2026-02-18',
    schools: [
      { name: 'United Arab Emirates University', url: 'https://www.uaeu.ac.ae/en/' },
      { name: 'Khalifa University', url: 'https://www.ku.ac.ae/' },
      { name: 'American University of Sharjah', url: 'https://www.aus.edu/' },
      { name: 'University of Sharjah', url: 'https://www.sharjah.ac.ae/' },
      { name: 'Abu Dhabi University', url: 'https://www.adu.ac.ae/' }
    ],
    places: ['Dubai Downtown', 'Abu Dhabi Sheikh Zayed Camii', 'Desert Safari', 'Louvre Abu Dhabi', 'Hatta'],
    operators: [
      { name: 'e& (Etisalat)', url: 'https://www.etisalat.ae/' },
      { name: 'du', url: 'https://www.du.ae/' }
    ],
    currency: 'BAE Dirhemi (AED)',
    minimumWage: 'Sektör ve sözleşmeye göre değişkenlik gösterir; resmi kaynak teyidi önerilir.',
    livingCost: 'Dubai ve Abu Dhabi’de kira maliyetleri yüksek olabilir.',
    government: 'Federal monarşi',
    inflation: 'Resmi istatistik kurumları ve merkez bankası verileriyle izlenmelidir.',
    foodCulture: 'Arap mutfağı ile uluslararası mutfakların birlikte güçlü olduğu bir yapı vardır.',
    famousPeople: ['Muhammed bin Zayid Al Nahyan', 'Muhammed bin Raşid Al Maktum', 'Ahlam', 'Hussain Al Jassmi', 'Omar Abdulrahman', 'Mona Al Marri', 'Noura Al Kaabi', 'Abdulla Al Naboodah', 'Rashed Al Majed', 'Ahmed Al Falasi']
  },
  CN: {
    updatedAt: '2026-02-18',
    schools: [
      { name: 'Tsinghua University', url: 'https://www.tsinghua.edu.cn/en/' },
      { name: 'Peking University', url: 'https://english.pku.edu.cn/' },
      { name: 'Fudan University', url: 'https://www.fudan.edu.cn/en/' },
      { name: 'Shanghai Jiao Tong University', url: 'https://en.sjtu.edu.cn/' },
      { name: 'Zhejiang University', url: 'https://www.zju.edu.cn/english/' }
    ],
    places: ['Pekin Yasak Şehir', 'Şanghay Bund', 'Çin Seddi', 'Xi’an Terracotta Ordusu', 'Guilin'],
    operators: [
      { name: 'China Mobile', url: 'https://www.chinamobileltd.com/en/global/home.php' },
      { name: 'China Telecom', url: 'https://www.chinatelecom-h.com/en/' },
      { name: 'China Unicom', url: 'https://www.chinaunicom.com.hk/en/' }
    ],
    currency: 'Çin Yuanı (CNY)',
    minimumWage: 'Yerel yönetimlerce bölgesel olarak belirlenir ve değişebilir.',
    livingCost: 'Şanghay ve Pekin yüksek; ikinci kademe şehirlerde daha dengeli olabilir.',
    government: 'Tek partili sosyalist cumhuriyet',
    inflation: 'Ulusal istatistik verileriyle dönemsel olarak izlenir.',
    foodCulture: 'Bölgesel mutfak çeşitliliği çok güçlüdür; Sichuan, Kanton ve Kuzey mutfakları öne çıkar.',
    famousPeople: ['Konfüçyüs', 'Jackie Chan', 'Yao Ming', 'Xi Jinping', 'Fan Bingbing', 'Jet Li', 'Lang Lang', 'Ai Weiwei', 'Eileen Gu', 'Mo Yan']
  },
  IN: {
    updatedAt: '2026-02-18',
    schools: [
      { name: 'Indian Institute of Science', url: 'https://iisc.ac.in/' },
      { name: 'IIT Bombay', url: 'https://www.iitb.ac.in/' },
      { name: 'IIT Delhi', url: 'https://home.iitd.ac.in/' },
      { name: 'University of Delhi', url: 'https://www.du.ac.in/' },
      { name: 'Jawaharlal Nehru University', url: 'https://www.jnu.ac.in/' }
    ],
    places: ['Taj Mahal', 'Jaipur Pembe Şehir', 'Kerala Backwaters', 'Goa Sahilleri', 'Varanasi'],
    operators: [
      { name: 'Jio', url: 'https://www.jio.com/' },
      { name: 'Airtel', url: 'https://www.airtel.in/' },
      { name: 'Vi (Vodafone Idea)', url: 'https://www.myvi.in/' }
    ],
    currency: 'Hindistan Rupisi (INR)',
    minimumWage: 'Eyalet ve sektör bazında farklılaşır; resmi kaynaktan teyit edilmelidir.',
    livingCost: 'Metro şehirlerde kira yüksek; küçük şehirlerde daha düşük olabilir.',
    government: 'Federal parlamenter cumhuriyet',
    inflation: 'RBI ve resmi istatistik verileriyle dönemsel takip önerilir.',
    foodCulture: 'Baharatlı ve bölgesel çeşitliliği yüksek mutfak kültürü baskındır.',
    famousPeople: ['Mahatma Gandhi', 'Rabindranath Tagore', 'Narendra Modi', 'Shah Rukh Khan', 'A.R. Rahman', 'Virat Kohli', 'Priyanka Chopra', 'Sundar Pichai', 'Satya Nadella', 'Deepika Padukone']
  },
  KR: {
    updatedAt: '2026-02-20',
    schools: [
      { name: 'Seoul National University', url: 'https://en.snu.ac.kr/' },
      { name: 'KAIST', url: 'https://www.kaist.ac.kr/en/' },
      { name: 'POSTECH', url: 'https://www.postech.ac.kr/eng/' },
      { name: 'Yonsei University', url: 'https://www.yonsei.ac.kr/en_sc/' },
      { name: 'Korea University', url: 'https://www.korea.edu/' }
    ],
    places: ['Seul Gyeongbokgung', 'Busan Haeundae', 'Jeju Adası', 'Gyeongju Tarihi Alanları', 'DMZ Turları'],
    operators: [
      { name: 'SK Telecom', url: 'https://www.sktelecom.com/en/' },
      { name: 'KT', url: 'https://corp.kt.com/eng/' },
      { name: 'LG U+', url: 'https://www.lguplus.com/' }
    ],
    currency: 'Güney Kore Wonu (KRW)',
    minimumWage: 'Ulusal saatlik ücret her yıl güncellenir; resmi duyurularla teyit edilmelidir.',
    livingCost: 'Seul’de konut maliyeti yüksektir; şehirler arasında fark belirgindir.',
    government: 'Başkanlık sistemi',
    inflation: 'Kore İstatistik Servisi ve merkez bankası verileriyle izlenmelidir.',
    foodCulture: 'Kimchi, barbecue ve sokak yemeği kültürü güçlüdür.',
    famousPeople: ['BTS', 'Son Heung-min', 'Bong Joon-ho', 'Park Chan-wook', 'Kim Yuna', 'PSY', 'IU', 'Lee Min-ho', 'Yuna Kim', 'Ban Ki-moon']
  },
  AT: {
    updatedAt: '2026-02-20',
    schools: [
      { name: 'University of Vienna', url: 'https://www.univie.ac.at/en/' },
      { name: 'TU Wien', url: 'https://www.tuwien.at/en/' },
      { name: 'Medical University of Vienna', url: 'https://www.meduniwien.ac.at/web/en/' },
      { name: 'University of Graz', url: 'https://www.uni-graz.at/en/' },
      { name: 'University of Innsbruck', url: 'https://www.uibk.ac.at/en/' }
    ],
    places: ['Viyana Schönbrunn', 'Salzburg Eski Şehir', 'Hallstatt', 'Innsbruck Alpleri', 'Graz Merkez'],
    operators: [
      { name: 'A1 Telekom Austria', url: 'https://www.a1.net/' },
      { name: 'Magenta Telekom', url: 'https://www.magenta.at/' },
      { name: 'Drei (3 Austria)', url: 'https://www.drei.at/' }
    ],
    currency: 'Euro (EUR)',
    minimumWage: 'Ulusal asgari ücret yerine sektörel toplu sözleşme sistemi yaygındır.',
    livingCost: 'Viyana Avrupa ortalamasının üzerinde; öğrenci şehirlerinde görece daha dengelidir.',
    government: 'Federal parlamenter cumhuriyet',
    inflation: 'Statistik Austria ve Eurostat üzerinden takip edilmelidir.',
    foodCulture: 'Kahvehane kültürü, şinitzel ve hamur işi geleneği öne çıkar.',
    famousPeople: ['Wolfgang Amadeus Mozart', 'Sigmund Freud', 'Gustav Klimt', 'Arnold Schwarzenegger', 'Niki Lauda', 'Joseph Haydn', 'Stefan Zweig', 'Hedy Lamarr', 'Dominic Thiem', 'Franz Kafka']
  },
  BE: {
    updatedAt: '2026-02-20',
    schools: [
      { name: 'KU Leuven', url: 'https://www.kuleuven.be/english/' },
      { name: 'Ghent University', url: 'https://www.ugent.be/en' },
      { name: 'Université catholique de Louvain', url: 'https://uclouvain.be/en/index.html' },
      { name: 'Vrije Universiteit Brussel', url: 'https://www.vub.be/en' },
      { name: 'University of Antwerp', url: 'https://www.uantwerpen.be/en/' }
    ],
    places: ['Brüksel Grand Place', 'Brugge Kanalları', 'Gent Tarihi Merkez', 'Antwerp Limanı', 'Ardennes'],
    operators: [
      { name: 'Proximus', url: 'https://www.proximus.com/' },
      { name: 'Orange Belgium', url: 'https://www.orange.be/' },
      { name: 'Telenet', url: 'https://www.telenet.be/' }
    ],
    currency: 'Euro (EUR)',
    minimumWage: 'Asgari ücret endeksleme mekanizmalarıyla dönemsel güncellenir.',
    livingCost: 'Brüksel ve Antwerp daha pahalı; küçük şehirlerde daha dengeli olabilir.',
    government: 'Federal parlamenter monarşi',
    inflation: 'Belçika istatistik kurumu ve Eurostat verileriyle takip edilir.',
    foodCulture: 'Waffle, çikolata, patates kızartması ve bira kültürü belirgindir.',
    famousPeople: ['Audrey Hepburn', 'Hergé', 'Eddy Merckx', 'Kevin De Bruyne', 'Jean-Claude Van Damme', 'Georges Simenon', 'Stromae', 'Eden Hazard', 'René Magritte', 'Romelu Lukaku']
  },
  DK: {
    updatedAt: '2026-02-20',
    schools: [
      { name: 'University of Copenhagen', url: 'https://www.ku.dk/english/' },
      { name: 'Technical University of Denmark', url: 'https://www.dtu.dk/english/' },
      { name: 'Aarhus University', url: 'https://international.au.dk/' },
      { name: 'Copenhagen Business School', url: 'https://www.cbs.dk/en' },
      { name: 'Aalborg University', url: 'https://www.en.aau.dk/' }
    ],
    places: ['Kopenhag Nyhavn', 'Tivoli Bahçeleri', 'Aarhus ARoS', 'Odense', 'Skagen'],
    operators: [
      { name: 'TDC NET', url: 'https://tdcnet.dk/' },
      { name: 'Telenor Denmark', url: 'https://www.telenor.dk/' },
      { name: '3 Denmark', url: 'https://www.3.dk/' }
    ],
    currency: 'Danimarka Kronu (DKK)',
    minimumWage: 'Merkezi asgari ücret yerine toplu sözleşmeler belirleyicidir.',
    livingCost: 'Kopenhag konut ve hizmet maliyetleri yüksektir.',
    government: 'Parlamenter monarşi',
    inflation: 'Danmarks Statistik ve merkez bankası verileriyle takip edilmelidir.',
    foodCulture: 'Smørrebrød, deniz ürünleri ve yeni nordik mutfak yaklaşımı öne çıkar.',
    famousPeople: ['Hans Christian Andersen', 'Niels Bohr', 'Søren Kierkegaard', 'Mads Mikkelsen', 'Caroline Wozniacki', 'Lars Ulrich', 'Viggo Mortensen', 'Nikolaj Coster-Waldau', 'Bjarne Stroustrup', 'Lukas Graham']
  },
  FI: {
    updatedAt: '2026-02-20',
    schools: [
      { name: 'University of Helsinki', url: 'https://www.helsinki.fi/en' },
      { name: 'Aalto University', url: 'https://www.aalto.fi/en' },
      { name: 'University of Turku', url: 'https://www.utu.fi/en' },
      { name: 'Tampere University', url: 'https://www.tuni.fi/en' },
      { name: 'University of Oulu', url: 'https://www.oulu.fi/en' }
    ],
    places: ['Helsinki Design District', 'Lapland Kuzey Işıkları', 'Turku', 'Saimaa Göl Bölgesi', 'Rovaniemi'],
    operators: [
      { name: 'Elisa', url: 'https://elisa.fi/' },
      { name: 'Telia Finland', url: 'https://www.telia.fi/' },
      { name: 'DNA', url: 'https://www.dna.fi/' }
    ],
    currency: 'Euro (EUR)',
    minimumWage: 'Sektörel sözleşme ağırlıklı model bulunur.',
    livingCost: 'Helsinki pahalı; kuzey bölgelerde maliyet yapısı farklılaşır.',
    government: 'Parlamenter cumhuriyet',
    inflation: 'Tilastokeskus ve Eurostat üzerinden düzenli izlenmelidir.',
    foodCulture: 'Balık, çavdar ve orman ürünleri temelli sade mutfak kültürü güçlüdür.',
    famousPeople: ['Jean Sibelius', 'Kimi Räikkönen', 'Mika Häkkinen', 'Linus Torvalds', 'Alvar Aalto', 'Tarja Halonen', 'Mika Waltari', 'Lordi', 'Sanna Marin', 'Sauli Niinistö']
  },
  PT: {
    updatedAt: '2026-02-20',
    schools: [
      { name: 'University of Porto', url: 'https://www.up.pt/portal/en/' },
      { name: 'University of Lisbon', url: 'https://www.ulisboa.pt/en' },
      { name: 'NOVA University Lisbon', url: 'https://www.unl.pt/en' },
      { name: 'University of Coimbra', url: 'https://www.uc.pt/en/' },
      { name: 'University of Minho', url: 'https://www.uminho.pt/EN' }
    ],
    places: ['Lizbon Alfama', 'Porto Ribeira', 'Sintra', 'Algarve Kıyıları', 'Madeira'],
    operators: [
      { name: 'MEO', url: 'https://www.meo.pt/' },
      { name: 'NOS', url: 'https://www.nos.pt/' },
      { name: 'Vodafone Portugal', url: 'https://www.vodafone.pt/' }
    ],
    currency: 'Euro (EUR)',
    minimumWage: 'Ulusal asgari ücret yıllık olarak revize edilir.',
    livingCost: 'Lizbon ve Porto artan kira baskısı nedeniyle daha maliyetlidir.',
    government: 'Yarı başkanlık sistemi',
    inflation: 'INE ve Eurostat kaynaklarıyla düzenli kontrol edilmelidir.',
    foodCulture: 'Deniz ürünleri, bacalhau ve pastel de nata kültürü belirgindir.',
    famousPeople: ['Cristiano Ronaldo', 'Fernando Pessoa', 'José Saramago', 'Luís de Camões', 'Amália Rodrigues', 'Eusébio', 'João Félix', 'Paula Rego', 'António Guterres', 'Rui Costa']
  },
  IE: {
    updatedAt: '2026-02-20',
    schools: [
      { name: 'Trinity College Dublin', url: 'https://www.tcd.ie/' },
      { name: 'University College Dublin', url: 'https://www.ucd.ie/' },
      { name: 'University of Galway', url: 'https://www.universityofgalway.ie/' },
      { name: 'University College Cork', url: 'https://www.ucc.ie/en/' },
      { name: 'Dublin City University', url: 'https://www.dcu.ie/' }
    ],
    places: ['Dublin Temple Bar', 'Cliffs of Moher', 'Ring of Kerry', 'Galway', 'Giant’s Causeway'],
    operators: [
      { name: 'Vodafone Ireland', url: 'https://n.vodafone.ie/' },
      { name: 'Three Ireland', url: 'https://www.three.ie/' },
      { name: 'eir', url: 'https://www.eir.ie/' }
    ],
    currency: 'Euro (EUR)',
    minimumWage: 'Ulusal saatlik ücret yapısı düzenli güncellenir.',
    livingCost: 'Dublin kira maliyetleri yüksek; ülke içinde bölgesel fark vardır.',
    government: 'Parlamenter cumhuriyet',
    inflation: 'CSO Ireland ve Eurostat üzerinden takip edilir.',
    foodCulture: 'Pub kültürü, et-güveç yemekleri ve modern füzyon mutfak yaygındır.',
    famousPeople: ['James Joyce', 'Bono', 'Cillian Murphy', 'Saoirse Ronan', 'Conor McGregor', 'Enya', 'Liam Neeson', 'Niall Horan', 'Michael D. Higgins', 'Katie Taylor']
  },
  NO: {
    updatedAt: '2026-02-20',
    schools: [
      { name: 'University of Oslo', url: 'https://www.uio.no/english/' },
      { name: 'Norwegian University of Science and Technology', url: 'https://www.ntnu.edu/' },
      { name: 'University of Bergen', url: 'https://www.uib.no/en' },
      { name: 'BI Norwegian Business School', url: 'https://www.bi.edu/' },
      { name: 'UiT The Arctic University of Norway', url: 'https://en.uit.no/' }
    ],
    places: ['Oslo Opera Binası', 'Geirangerfjord', 'Lofoten Adaları', 'Bergen', 'Tromsø'],
    operators: [
      { name: 'Telenor Norway', url: 'https://www.telenor.no/' },
      { name: 'Telia Norway', url: 'https://www.telia.no/' },
      { name: 'ice', url: 'https://www.ice.no/' }
    ],
    currency: 'Norveç Kronu (NOK)',
    minimumWage: 'Sektörel sözleşmeler baskındır; bazı sektörlerde yasal taban ücret uygulanır.',
    livingCost: 'Kuzey Avrupa ortalamasının üzerindedir; konut ve hizmet maliyetleri yüksektir.',
    government: 'Parlamenter monarşi',
    inflation: 'Statistics Norway ve Norges Bank verileriyle takip edilmelidir.',
    foodCulture: 'Balık, somon ve sade kuzey mutfağı öne çıkar.',
    famousPeople: ['Henrik Ibsen', 'Edvard Munch', 'Magnus Carlsen', 'Erling Haaland', 'A-ha', 'Roald Amundsen', 'Fridtjof Nansen', 'Sigrid', 'Lene Marlin', 'Jo Nesbø']
  },
  GR: {
    updatedAt: '2026-02-20',
    schools: [
      { name: 'National and Kapodistrian University of Athens', url: 'https://en.uoa.gr/' },
      { name: 'Aristotle University of Thessaloniki', url: 'https://www.auth.gr/en/' },
      { name: 'National Technical University of Athens', url: 'https://www.ntua.gr/en/' },
      { name: 'University of Crete', url: 'https://en.uoc.gr/' },
      { name: 'Athens University of Economics and Business', url: 'https://www.aueb.gr/index_en' }
    ],
    places: ['Atina Akropolis', 'Santorini', 'Mikonos', 'Selanik', 'Meteora'],
    operators: [
      { name: 'COSMOTE', url: 'https://www.cosmote.gr/' },
      { name: 'Vodafone Greece', url: 'https://www.vodafone.gr/' },
      { name: 'Nova', url: 'https://nova.gr/' }
    ],
    currency: 'Euro (EUR)',
    minimumWage: 'Ulusal asgari ücret dönemsel olarak revize edilir.',
    livingCost: 'Atina ve turistik adalarda maliyet yükselir; iç bölgelerde daha dengelidir.',
    government: 'Parlamenter cumhuriyet',
    inflation: 'ELSTAT ve Eurostat verileriyle izlenmelidir.',
    foodCulture: 'Zeytinyağı, deniz ürünleri, meze ve Akdeniz mutfağı temel yapıyı oluşturur.',
    famousPeople: ['Aristoteles', 'Sokrates', 'Platon', 'Maria Callas', 'Mikis Theodorakis', 'Giannis Antetokounmpo', 'Odysseas Elytis', 'Yorgos Lanthimos', 'Stefanos Tsitsipas', 'Nana Mouskouri']
  },
  CZ: {
    updatedAt: '2026-02-20',
    schools: [
      { name: 'Charles University', url: 'https://cuni.cz/UKEN-1.html' },
      { name: 'Czech Technical University in Prague', url: 'https://www.cvut.cz/en' },
      { name: 'Masaryk University', url: 'https://www.muni.cz/en' },
      { name: 'Brno University of Technology', url: 'https://www.vut.cz/en/' },
      { name: 'University of Chemistry and Technology Prague', url: 'https://www.vscht.cz/?jazyk=en' }
    ],
    places: ['Prag Eski Şehir', 'Karlovy Vary', 'Český Krumlov', 'Brno', 'Bohemia Kaleleri'],
    operators: [
      { name: 'T-Mobile Czech Republic', url: 'https://www.t-mobile.cz/' },
      { name: 'O2 Czech Republic', url: 'https://www.o2.cz/' },
      { name: 'Vodafone Czech Republic', url: 'https://www.vodafone.cz/' }
    ],
    currency: 'Çek Korunası (CZK)',
    minimumWage: 'Ulusal asgari ücret yıllık güncellenir.',
    livingCost: 'Prag’da konut maliyeti yüksek; diğer şehirlerde daha erişilebilir olabilir.',
    government: 'Parlamenter cumhuriyet',
    inflation: 'Çek istatistik kurumu ve merkez bankası verileriyle takip edilir.',
    foodCulture: 'Et yemekleri, hamur işi ve bira kültürü öne çıkar.',
    famousPeople: ['Franz Kafka', 'Antonín Dvořák', 'Milan Kundera', 'Václav Havel', 'Petr Čech', 'Jaromír Jágr', 'Martina Navratilova', 'Alfons Mucha', 'Karel Čapek', 'Tomáš Rosický']
  },
  HU: {
    updatedAt: '2026-02-20',
    schools: [
      { name: 'Eötvös Loránd University', url: 'https://www.elte.hu/en/' },
      { name: 'Budapest University of Technology and Economics', url: 'https://www.bme.hu/?language=en' },
      { name: 'University of Szeged', url: 'https://u-szeged.hu/english' },
      { name: 'University of Debrecen', url: 'https://www.unideb.hu/en' },
      { name: 'Corvinus University of Budapest', url: 'https://www.uni-corvinus.hu/main-page/' }
    ],
    places: ['Budapeşte Parlamento', 'Buda Kalesi', 'Balaton Gölü', 'Eger', 'Szeged'],
    operators: [
      { name: 'Magyar Telekom', url: 'https://www.telekom.hu/' },
      { name: 'Yettel Hungary', url: 'https://www.yettel.hu/' },
      { name: 'Vodafone Hungary', url: 'https://www.vodafone.hu/' }
    ],
    currency: 'Macar Forinti (HUF)',
    minimumWage: 'Ulusal düzeyde belirlenir ve periyodik olarak güncellenir.',
    livingCost: 'Budapeşte ülke ortalamasının üzerindedir; taşrada daha düşüktür.',
    government: 'Parlamenter cumhuriyet',
    inflation: 'KSH ve merkez bankası verileriyle yakından izlenmelidir.',
    foodCulture: 'Gulaş, paprika kullanımı ve et ağırlıklı Orta Avrupa mutfağı belirgindir.',
    famousPeople: ['Ferenc Puskás', 'Béla Bartók', 'Imre Kertész', 'Harry Houdini', 'Zsa Zsa Gabor', 'László Bíró', 'Judit Polgár', 'Katalin Karikó', 'Miklós Rózsa', 'Ágnes Keleti']
  },
  PL: {
    updatedAt: '2026-02-20',
    schools: [
      { name: 'University of Warsaw', url: 'https://www.uw.edu.pl/en/' },
      { name: 'Jagiellonian University', url: 'https://en.uj.edu.pl/' },
      { name: 'Warsaw University of Technology', url: 'https://www.pw.edu.pl/engpw' },
      { name: 'AGH University of Science and Technology', url: 'https://www.agh.edu.pl/en/' },
      { name: 'Adam Mickiewicz University', url: 'https://amu.edu.pl/en' }
    ],
    places: ['Varşova Eski Şehir', 'Kraków', 'Wrocław', 'Gdańsk', 'Tatra Dağları'],
    operators: [
      { name: 'Orange Polska', url: 'https://www.orange.pl/' },
      { name: 'Play', url: 'https://www.play.pl/' },
      { name: 'Plus', url: 'https://www.plus.pl/' },
      { name: 'T-Mobile Poland', url: 'https://www.t-mobile.pl/' }
    ],
    currency: 'Polonya Zlotisi (PLN)',
    minimumWage: 'Ulusal taban ücret yılda birden fazla kez revize edilebilir.',
    livingCost: 'Varşova ve Kraków’da maliyet daha yüksek; diğer şehirlerde daha dengelidir.',
    government: 'Parlamenter cumhuriyet',
    inflation: 'GUS ve merkez bankası verileriyle güncel takip önerilir.',
    foodCulture: 'Pierogi, çorba kültürü ve et ağırlıklı Orta Avrupa mutfağı öne çıkar.',
    famousPeople: ['Frédéric Chopin', 'Marie Curie', 'Robert Lewandowski', 'Andrzej Wajda', 'Wisława Szymborska', 'Lech Wałęsa', 'Iga Świątek', 'Krzysztof Kieślowski', 'Olga Tokarczuk', 'Zbigniew Brzezinski']
  },
  NZ: {
    updatedAt: '2026-02-20',
    schools: [
      { name: 'University of Auckland', url: 'https://www.auckland.ac.nz/' },
      { name: 'University of Otago', url: 'https://www.otago.ac.nz/' },
      { name: 'Victoria University of Wellington', url: 'https://www.wgtn.ac.nz/' },
      { name: 'University of Canterbury', url: 'https://www.canterbury.ac.nz/' },
      { name: 'Massey University', url: 'https://www.massey.ac.nz/' }
    ],
    places: ['Auckland', 'Queenstown', 'Milford Sound', 'Wellington', 'Rotorua'],
    operators: [
      { name: 'Spark NZ', url: 'https://www.spark.co.nz/' },
      { name: 'One NZ', url: 'https://one.nz/' },
      { name: '2degrees', url: 'https://www.2degrees.nz/' }
    ],
    currency: 'Yeni Zelanda Doları (NZD)',
    minimumWage: 'Ulusal saatlik ücret modeli bulunur ve düzenli güncellenir.',
    livingCost: 'Auckland ve Wellington’da kira maliyetleri görece yüksektir.',
    government: 'Parlamenter monarşi',
    inflation: 'Stats NZ ve merkez bankası verileriyle takip edilmelidir.',
    foodCulture: 'Deniz ürünleri, kuzu eti ve çok kültürlü modern mutfak öne çıkar.',
    famousPeople: ['Peter Jackson', 'Jacinda Ardern', 'Lorde', 'Taika Waititi', 'Russell Crowe', 'Sam Neill', 'Dan Carter', 'Richie McCaw', 'Kiri Te Kanawa', 'Ernest Rutherford']
  },
  LI: {
    updatedAt: '2026-02-20',
    schools: [
      { name: 'University of Liechtenstein', url: 'https://www.uni.li/en' },
      { name: 'UZH (yakın akademik merkez)', url: 'https://www.uzh.ch/en.html' },
      { name: 'University of Innsbruck (yakın akademik merkez)', url: 'https://www.uibk.ac.at/en/' },
      { name: 'ETH Zurich (bölgesel seçenek)', url: 'https://ethz.ch/en.html' },
      { name: 'FH Vorarlberg (bölgesel seçenek)', url: 'https://www.fhv.at/en/' }
    ],
    places: ['Vaduz', 'Malbun', 'Liechtenstein Şatosu', 'Ren Vadisi', 'Gutenberg Kalesi'],
    operators: [
      { name: 'Telecom Liechtenstein', url: 'https://www.li-life.li/' },
      { name: 'Salt Liechtenstein', url: 'https://www.salt.li/' },
      { name: 'FL1', url: 'https://www.fl1.li/' }
    ],
    currency: 'İsviçre Frangı (CHF)',
    minimumWage: 'Mikro devlet yapısı nedeniyle sektör bazlı sözleşmeler belirleyicidir.',
    livingCost: 'Konut ve günlük giderler yüksektir; çevre ülkelerle bağlantılıdır.',
    government: 'Anayasal monarşi',
    inflation: 'İsviçre/yerel istatistik kaynaklarıyla birlikte değerlendirilir.',
    foodCulture: 'İsviçre-Avusturya etkili Alp mutfağı yaygındır.',
    famousPeople: ['Hans-Adam II', 'Alois von Liechtenstein', 'Hanni Wenzel', 'Marco Büchel', 'Tina Weirather', 'Ivana Trump (aile bağı)', 'Josef Hoop', 'Otmar Hasler', 'Adrian Hasler', 'Frick ailesi temsilcileri']
  },
  MY: {
    updatedAt: '2026-02-20',
    schools: [
      { name: 'University of Malaya', url: 'https://um.edu.my/' },
      { name: 'Universiti Putra Malaysia', url: 'https://www.upm.edu.my/' },
      { name: 'Universiti Kebangsaan Malaysia', url: 'https://www.ukm.my/' },
      { name: 'Universiti Sains Malaysia', url: 'https://www.usm.my/' },
      { name: 'Universiti Teknologi Malaysia', url: 'https://www.utm.my/' }
    ],
    places: ['Kuala Lumpur Petronas', 'Penang George Town', 'Langkawi', 'Kota Kinabalu', 'Malakka'],
    operators: [
      { name: 'Maxis', url: 'https://www.maxis.com.my/' },
      { name: 'CelcomDigi', url: 'https://www.celcomdigi.com/' },
      { name: 'U Mobile', url: 'https://www.u.com.my/' },
      { name: 'Unifi Mobile', url: 'https://unifi.com.my/mobile' }
    ],
    currency: 'Malezya Ringgiti (MYR)',
    minimumWage: 'Ulusal asgari ücret dönemsel olarak güncellenir.',
    livingCost: 'Kuala Lumpur’da maliyet yüksek; diğer bölgelerde daha düşük olabilir.',
    government: 'Federal anayasal monarşi',
    inflation: 'DOSM ve merkez bankası verileriyle takip edilmelidir.',
    foodCulture: 'Malay, Çin ve Hint mutfaklarının harmanlandığı çok kültürlü yapı baskındır.',
    famousPeople: ['Mahathir Mohamad', 'Michelle Yeoh', 'Lee Chong Wei', 'Nicol David', 'P. Ramlee', 'Siti Nurhaliza', 'Jimmy Choo', 'Yuna', 'Anwar Ibrahim', 'Lat']
  },
  MC: {
    updatedAt: '2026-02-20',
    schools: [
      { name: 'International University of Monaco', url: 'https://www.monaco.edu/' },
      { name: 'Université Côte d’Azur (yakın akademik seçenek)', url: 'https://univ-cotedazur.eu/' },
      { name: 'Sciences Po Menton', url: 'https://www.sciencespo.fr/' },
      { name: 'University of Nice Sophia Antipolis (bölgesel)', url: 'https://www.univ-cotedazur.fr/' },
      { name: 'Monaco Scientific Center', url: 'https://www.centrescientifique.mc/en/' }
    ],
    places: ['Monte Carlo', 'Monaco-Ville', 'Oceanographic Museum', 'Larvotto', 'Prince’s Palace'],
    operators: [
      { name: 'Monaco Telecom', url: 'https://www.monaco-telecom.mc/' },
      { name: 'Free Monaco', url: 'https://mobile.free.fr/' },
      { name: 'Orange (roaming/region)', url: 'https://www.orange.com/' }
    ],
    currency: 'Euro (EUR)',
    minimumWage: 'Fransa ile uyumlu sözleşme ve sektörel çerçeveler etkili olabilir.',
    livingCost: 'Dünyanın en yüksek konut maliyetlerinden birine sahiptir.',
    government: 'Anayasal monarşi',
    inflation: 'Monako/Fransa/Eurostat veri setleri birlikte değerlendirilmelidir.',
    foodCulture: 'Akdeniz-French Riviera mutfak etkisi baskındır.',
    famousPeople: ['Prens II. Albert', 'Prenses Charlene', 'Grace Kelly', 'Charles Leclerc', 'Louis Chiron', 'Stéphanie of Monaco', 'Caroline of Monaco', 'Rainier III', 'Jean-Michel Jarre (Monako bağlantısı)', 'Nico Rosberg (Monako yerleşik)']
  }
};

function buildWikiSearchUrl(query) {
  return `https://tr.wikipedia.org/w/index.php?search=${encodeURIComponent(query)}`;
}

function buildAutoCountryProfile(country) {
  const name = country.ulke;
  return {
    updatedAt: '2026-02-18 (otomatik temel profil)',
    schools: [
      { name: `${name} Üniversiteleri (Wikipedia araması)`, url: buildWikiSearchUrl(`${name} üniversiteleri`) },
      { name: 'QS World University Rankings', url: 'https://www.topuniversities.com/' },
      { name: 'Times Higher Education Rankings', url: 'https://www.timeshighereducation.com/world-university-rankings' },
      { name: `${name} Eğitim Sistemi (Wikipedia araması)`, url: buildWikiSearchUrl(`${name} eğitim sistemi`) },
      { name: `${name} Öğrenci Rehberi (Wikipedia araması)`, url: buildWikiSearchUrl(`${name} yükseköğretim`) }
    ],
    places: [
      `${name} başkent ve tarihi merkez`,
      `${name} doğa ve milli park rotaları`,
      `${name} müze ve kültür alanları`,
      `${name} sahil/göl/dağ destinasyonları`,
      `${name} yerel pazar ve şehir deneyimi`
    ],
    operators: [
      { name: `${name} mobil operatörleri (Wikipedia araması)`, url: buildWikiSearchUrl(`${name} mobile network operators`) },
      { name: 'Speedtest Global Index', url: 'https://www.speedtest.net/global-index' },
      { name: 'GSMA Mobile Connectivity', url: 'https://www.gsma.com/' }
    ],
    currency: `${name} para birimi (güncel resmi kaynakla teyit önerilir)`,
    minimumWage: `${name} için asgari ücret değeri dönemsel değişebilir; resmi kurum verisiyle güncel teyit edilmelidir.`,
    livingCost: `${name} içinde şehirler arasında yaşam maliyeti farkı olabilir; konut ve ulaşım kalemleri özellikle kontrol edilmelidir.`,
    government: `${name} yönetim biçimi (resmi kaynaklarla doğrulanmalıdır)`,
    inflation: `${name} için enflasyon oranı dönemsel değişir; merkez bankası/istatistik kurumu verisiyle takip edilmelidir.`,
    foodCulture: `${name} mutfak kültürü bölgesel farklılıklar içerir; yerel yemek alışkanlıkları şehirden şehre değişebilir.`,
    famousPeople: ['Editoryal liste hazırlanıyor']
  };
}

// Detaylı manuel içerikler korunur, eksik ülkeler için otomatik temel profil üretilir.
(function buildAutoProfiles() {
  if (typeof PASAPORT_DATA === 'undefined') return;
  const allCountries = [...PASAPORT_DATA]
    .sort((a, b) => a.sira - b.sira || a.ulke.localeCompare(b.ulke, 'tr'));

  allCountries.forEach(country => {
    if (COUNTRY_PROFILES[country.kod]) return;
    COUNTRY_PROFILES[country.kod] = buildAutoCountryProfile(country);
  });
})();

function extractIsoDate(value) {
  const match = String(value || '').match(/\d{4}-\d{2}-\d{2}/);
  return match ? match[0] : '2026-02-18';
}

function addDays(isoDate, days) {
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return isoDate;
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function getCountryNameByCode(code) {
  if (typeof PASAPORT_DATA === 'undefined') return code;
  const country = PASAPORT_DATA.find(item => item.kod === code);
  return country ? country.ulke : code;
}

function buildField(value, options) {
  const safe = options || {};
  return {
    value: value || '-',
    source_url: safe.source_url || 'https://www.wikipedia.org/',
    source_name: safe.source_name || 'Wikipedia',
    checked_at: safe.checked_at || '2026-02-18',
    trust_score: typeof safe.trust_score === 'number' ? safe.trust_score : 70,
    note: safe.note || ''
  };
}

function enrichProfileWithSourceModel(code, profile) {
  const countryName = getCountryNameByCode(code);
  const checkedAt = extractIsoDate(profile.updatedAt);
  const isAuto = String(profile.updatedAt || '').includes('otomatik temel profil');
  const editorialStatus = isAuto ? 'draft' : 'gold';
  const nextReviewAt = addDays(checkedAt, editorialStatus === 'gold' ? 30 : 21);
  const currencyWiki = `https://tr.wikipedia.org/w/index.php?search=${encodeURIComponent(countryName + ' para birimi')}`;
  const economyWiki = `https://tr.wikipedia.org/w/index.php?search=${encodeURIComponent(countryName + ' ekonomi')}`;
  const governmentWiki = `https://tr.wikipedia.org/w/index.php?search=${encodeURIComponent(countryName + ' yönetim biçimi')}`;
  const foodWiki = `https://tr.wikipedia.org/w/index.php?search=${encodeURIComponent(countryName + ' mutfak')}`;

  return {
    ...profile,
    schema_version: '2.0',
    editorial_status: editorialStatus,
    updatedAt: checkedAt,
    next_review_at: nextReviewAt,
    source_registry: {
      schools: {
        source_url: 'https://www.topuniversities.com/world-university-rankings',
        source_name: 'QS Rankings',
        checked_at: checkedAt,
        trust_score: isAuto ? 60 : 78
      },
      places: {
        source_url: `https://tr.wikipedia.org/w/index.php?search=${encodeURIComponent(countryName + ' gezilecek yerler')}`,
        source_name: 'Wikipedia / Gezi İçeriği',
        checked_at: checkedAt,
        trust_score: isAuto ? 58 : 72
      },
      operators: {
        source_url: 'https://www.speedtest.net/global-index',
        source_name: 'Speedtest Global Index',
        checked_at: checkedAt,
        trust_score: isAuto ? 60 : 75
      },
      famousPeople: {
        source_url: `https://tr.wikipedia.org/w/index.php?search=${encodeURIComponent(countryName + ' ünlü kişiler')}`,
        source_name: 'Wikipedia / Biyografi',
        checked_at: checkedAt,
        trust_score: isAuto ? 55 : 70
      }
    },
    fields: {
      currency: buildField(profile.currency, {
        source_url: currencyWiki,
        source_name: 'Wikipedia / Para Birimi',
        checked_at: checkedAt,
        trust_score: isAuto ? 65 : 82
      }),
      minimumWage: buildField(profile.minimumWage, {
        source_url: economyWiki,
        source_name: 'Wikipedia / Ekonomi Özeti',
        checked_at: checkedAt,
        trust_score: isAuto ? 60 : 78,
        note: 'Asgari ücret değerleri dönemsel değişebilir.'
      }),
      livingCost: buildField(profile.livingCost, {
        source_url: 'https://www.numbeo.com/cost-of-living/',
        source_name: 'Numbeo',
        checked_at: checkedAt,
        trust_score: isAuto ? 62 : 75
      }),
      inflation: buildField(profile.inflation, {
        source_url: 'https://www.imf.org/en/Publications/WEO',
        source_name: 'IMF WEO',
        checked_at: checkedAt,
        trust_score: isAuto ? 64 : 80
      }),
      government: buildField(profile.government, {
        source_url: governmentWiki,
        source_name: 'Wikipedia / Yönetim',
        checked_at: checkedAt,
        trust_score: isAuto ? 62 : 80
      }),
      foodCulture: buildField(profile.foodCulture, {
        source_url: foodWiki,
        source_name: 'Wikipedia / Mutfak',
        checked_at: checkedAt,
        trust_score: isAuto ? 58 : 74
      })
    }
  };
}

(function upgradeProfilesToSourceModel() {
  Object.keys(COUNTRY_PROFILES).forEach(code => {
    COUNTRY_PROFILES[code] = enrichProfileWithSourceModel(code, COUNTRY_PROFILES[code]);
  });
})();
