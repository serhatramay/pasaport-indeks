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
  },
  TH: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'Chulalongkorn University', url: 'https://www.chula.ac.th/en/' },
      { name: 'Mahidol University', url: 'https://mahidol.ac.th/en/' },
      { name: 'Chiang Mai University', url: 'https://www.cmu.ac.th/en/' },
      { name: 'Thammasat University', url: 'https://tu.ac.th/en' },
      { name: 'Kasetsart University', url: 'https://www.ku.ac.th/en' }
    ],
    places: ['Bangkok Grand Palace', 'Phuket sahilleri', 'Chiang Mai Eski Şehir', 'Krabi / Railay', 'Ayutthaya Tarihi Parkı'],
    operators: [
      { name: 'AIS', url: 'https://www.ais.th/en/' },
      { name: 'True', url: 'https://www.true.th/en' },
      { name: 'dtac', url: 'https://www.dtac.co.th/en/' }
    ],
    currency: 'Tayland Bahtı (THB)',
    minimumWage: 'Asgari ücret il/bölge bazında günlük taban ücret olarak farklılaşabilir; resmi güncel tablo kontrol edilmelidir.',
    livingCost: 'Bangkok ve turistik adalarda konaklama maliyeti yükselir; kuzey şehirlerde daha dengeli olabilir.',
    government: 'Anayasal monarşi (parlamenter yapı unsurlarıyla)',
    inflation: 'Bank of Thailand ve resmi istatistik kurumu verileriyle dönemsel takip edilmelidir.',
    foodCulture: 'Sokak yemekleri, baharatlı tatlar, noodle ve deniz ürünü odaklı güçlü bir yemek kültürü vardır.',
    famousPeople: ['Bhumibol Adulyadej', 'Vajiralongkorn', 'Lisa (BLACKPINK)', 'Tony Jaa', 'BamBam', 'Apichatpong Weerasethakul', 'Buakaw Banchamek', 'Sorn (CLC)', 'Bright Vachirawit', 'Mew Suppasit']
  },
  GE: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'Tbilisi State University', url: 'https://www.tsu.ge/en' },
      { name: 'Ilia State University', url: 'https://iliauni.edu.ge/en/' },
      { name: 'Georgian Technical University', url: 'https://gtu.ge/Eng/' },
      { name: 'Free University of Tbilisi', url: 'https://freeuni.edu.ge/en' },
      { name: 'Caucasus University', url: 'https://cu.edu.ge/en' }
    ],
    places: ['Tiflis Eski Şehir', 'Batum sahil hattı', 'Kazbegi / Gergeti', 'Kakheti şarap rotası', 'Mtskheta'],
    operators: [
      { name: 'Magti', url: 'https://magticom.ge/' },
      { name: 'Silknet', url: 'https://silknet.com/' },
      { name: 'Cellfie Mobile', url: 'https://cellfie.ge/' }
    ],
    currency: 'Gürcistan Larisi (GEL)',
    minimumWage: 'Tek bir modern ulusal asgari ücret referansı pratikte sınırlı olabilir; sektör bazlı ücretler ve resmi kaynaklar birlikte takip edilmelidir.',
    livingCost: 'Tiflis ve Batum’da kiralar artabilir; uzun konaklamada mahalle bazlı fark belirgindir.',
    government: 'Parlamenter cumhuriyet',
    inflation: 'National Bank of Georgia ve Geostat verileriyle güncel takip önerilir.',
    foodCulture: 'Haçapuri, hinkali ve şarap kültürü ülke mutfağının temel unsurlarıdır.',
    famousPeople: ['Şota Rustaveli', 'Nino Katamadze', 'Katie Melua', 'Mikheil Saakashvili', 'Zurab Tsereteli', 'Kakha Kaladze', 'Khvicha Kvaratskhelia', 'Merab Dvalishvili', 'Nino Haratişvili', 'Salome Zurabishvili']
  },
  EG: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'Cairo University', url: 'https://cu.edu.eg/Home' },
      { name: 'Ain Shams University', url: 'https://www.asu.edu.eg/' },
      { name: 'Alexandria University', url: 'https://www.alexu.edu.eg/' },
      { name: 'The American University in Cairo', url: 'https://www.aucegypt.edu/' },
      { name: 'Mansoura University', url: 'https://www.mans.edu.eg/en' }
    ],
    places: ['Gize Piramitleri', 'Kahire Mısır Müzesi', 'Luksor Tapınakları', 'Asvan / Nil hattı', 'Şarm El-Şeyh'],
    operators: [
      { name: 'Vodafone Egypt', url: 'https://web.vodafone.com.eg/' },
      { name: 'Orange Egypt', url: 'https://www.orange.eg/en/' },
      { name: 'Etisalat by e& Egypt', url: 'https://www.etisalat.eg/' },
      { name: 'WE', url: 'https://te.eg/wps/portal/te/Personal' }
    ],
    currency: 'Mısır Lirası (EGP)',
    minimumWage: 'Kamu/özel sektör uygulamaları ve resmi düzenlemeler dönemsel değişebildiği için güncel resmi kaynak teyidi gerekir.',
    livingCost: 'Kahire ve turistik kıyı bölgelerinde maliyet yükselir; şehir içi semt farkları belirgindir.',
    government: 'Yarı başkanlık sistemi',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle düzenli takip edilmelidir.',
    foodCulture: 'Ful medames, koshari ve ızgara ağırlıklı Arap-Akdeniz etkili mutfak yaygındır.',
    famousPeople: ['Kleopatra', 'Muhammed Salah', 'Necib Mahfuz', 'Ömer Şerif', 'Maged El Kedwany', 'Amr Diab', 'Youssef Chahine', 'Ahmed Zewail', 'Naguib Sawiris', 'Taha Hussein']
  },
  AZ: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'Baku State University', url: 'http://bsu.edu.az/en/' },
      { name: 'ADA University', url: 'https://www.ada.edu.az/en' },
      { name: 'Azerbaijan State Oil and Industry University', url: 'https://asoiu.edu.az/en' },
      { name: 'Khazar University', url: 'https://www.khazar.org/en/' },
      { name: 'Azerbaijan University of Languages', url: 'https://adu.edu.az/' }
    ],
    places: ['Bakü İçerişehir', 'Ateşgah ve Yanardağ', 'Gobustan', 'Şeki Han Sarayı', 'Qəbələ doğa rotaları'],
    operators: [
      { name: 'Azercell', url: 'https://www.azercell.com/' },
      { name: 'Bakcell', url: 'https://www.bakcell.com/' },
      { name: 'Nar', url: 'https://www.nar.az/' }
    ],
    currency: 'Azerbaycan Manatı (AZN)',
    minimumWage: 'Ulusal asgari ücret resmi kararlarla güncellenir; güncel tutar için resmi kaynak kontrol edilmelidir.',
    livingCost: 'Bakü’de konut ve hizmet maliyeti ülke ortalamasının üzerindedir.',
    government: 'Başkanlık sistemi',
    inflation: 'Merkez bankası ve resmi istatistik komitesi verileriyle takip edilmelidir.',
    foodCulture: 'Pilav, kebap, dolma ve Kafkas mutfağı etkileri belirgindir.',
    famousPeople: ['Haydar Aliyev', 'İlham Aliyev', 'Nizami Gencevi', 'Üzeyir Hacıbeyli', 'Rəşid Behbudov', 'Gara Garayev', 'Kasparov (Bakü doğumlu)', 'Şahriyar Memmedyarov', 'Togrul Asgarov', 'Aygün Kazımova']
  },
  SA: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'King Saud University', url: 'https://ksu.edu.sa/' },
      { name: 'King Abdulaziz University', url: 'https://www.kau.edu.sa/' },
      { name: 'King Fahd University of Petroleum and Minerals', url: 'https://www.kfupm.edu.sa/' },
      { name: 'Princess Nourah bint Abdulrahman University', url: 'https://www.pnu.edu.sa/' },
      { name: 'Imam Abdulrahman Bin Faisal University', url: 'https://www.iau.edu.sa/en' }
    ],
    places: ['Riyad Boulevard / Diriyah', 'Cidde tarihi bölge (Al-Balad)', 'AlUla', 'Mekke çevresi (ziyaret kurallı)', 'Medine çevresi (ziyaret kurallı)'],
    operators: [
      { name: 'STC', url: 'https://www.stc.com.sa/' },
      { name: 'Mobily', url: 'https://www.mobily.com.sa/' },
      { name: 'Zain KSA', url: 'https://sa.zain.com/' }
    ],
    currency: 'Suudi Arabistan Riyali (SAR)',
    minimumWage: 'Vatandaş/çalışma statüsüne göre uygulama farkları olabilir; resmi çalışma otoritesi kaynakları takip edilmelidir.',
    livingCost: 'Riyad ve Cidde’de kira ve yaşam maliyeti daha yüksektir; bölgelere göre değişir.',
    government: 'Mutlak monarşi',
    inflation: 'Saudi Central Bank ve resmi istatistik verileriyle dönemsel takip gerekir.',
    foodCulture: 'Arap mutfağı, pirinç-et yemekleri ve hurma/kahve kültürü öne çıkar.',
    famousPeople: ['Muhammed bin Selman', 'Kral Selman', 'Turki Alalshikh', 'Yasser Al-Qahtani', 'Salem Al-Dawsari', 'Tarek Hamedi', 'Reema bint Bandar', 'Abdullah Al-Sadhan', 'Fahad Albutairi', 'Nasser Al-Qasabi']
  },
  RU: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'Lomonosov Moscow State University', url: 'https://www.msu.ru/en/' },
      { name: 'Saint Petersburg State University', url: 'https://english.spbu.ru/' },
      { name: 'HSE University', url: 'https://www.hse.ru/en/' },
      { name: 'MIPT', url: 'https://mipt.ru/english/' },
      { name: 'ITMO University', url: 'https://en.itmo.ru/' }
    ],
    places: ['Moskova Kızıl Meydan', 'St. Petersburg Hermitage', 'Kazan', 'Baikal Gölü', 'Soçi'],
    operators: [
      { name: 'MTS', url: 'https://moskva.mts.ru/' },
      { name: 'MegaFon', url: 'https://megafon.ru/' },
      { name: 'Beeline', url: 'https://beeline.ru/' },
      { name: 'Tele2 Russia', url: 'https://tele2.ru/' }
    ],
    currency: 'Rus Rublesi (RUB)',
    minimumWage: 'Ulusal taban ücret vardır; bölgesel ve sektörel farklılıklar görülebilir.',
    livingCost: 'Moskova ve St. Petersburg daha pahalı; şehirler arası fark yüksektir.',
    government: 'Federal yarı başkanlık sistemi',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle güncel takip önerilir.',
    foodCulture: 'Çorba, hamur işi ve et ağırlıklı Slav mutfağı ile bölgesel çeşitlilik öne çıkar.',
    famousPeople: ['Vladimir Putin', 'Lev Tolstoy', 'Fyodor Dostoyevski', 'Pyotr Tchaikovsky', 'Yuri Gagarin', 'Maria Sharapova', 'Anna Netrebko', 'Roman Abramovich', 'Andrey Rublev', 'Daniil Medvedev']
  },
  UA: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'Taras Shevchenko National University of Kyiv', url: 'https://knu.ua/en/' },
      { name: 'National Technical University of Ukraine (Igor Sikorsky KPI)', url: 'https://kpi.ua/en' },
      { name: 'Lviv Polytechnic National University', url: 'https://lpnu.ua/en' },
      { name: 'V.N. Karazin Kharkiv National University', url: 'https://karazin.ua/en/' },
      { name: 'Odesa I.I. Mechnikov National University', url: 'https://onu.edu.ua/en/' }
    ],
    places: ['Kyiv tarihi merkez', 'Lviv Eski Şehir', 'Odesa sahil hattı', 'Karpat rotaları', 'Kamyanets-Podilskyi'],
    operators: [
      { name: 'Kyivstar', url: 'https://kyivstar.ua/' },
      { name: 'Vodafone Ukraine', url: 'https://www.vodafone.ua/' },
      { name: 'lifecell', url: 'https://www.lifecell.ua/' }
    ],
    currency: 'Ukrayna Grivnası (UAH)',
    minimumWage: 'Ulusal asgari ücret resmi duyurularla güncellenir; güncel koşullar ayrıca kontrol edilmelidir.',
    livingCost: 'Güvenlik ve bölgesel koşullar nedeniyle maliyet ve erişilebilirlik şehir bazında ciddi farklılık gösterebilir.',
    government: 'Yarı başkanlık sistemi',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle dönemsel takip edilmelidir.',
    foodCulture: 'Borscht, varenyky ve Doğu Avrupa mutfak etkileri yaygındır.',
    famousPeople: ['Taras Shevchenko', 'Volodimir Zelenski', 'Andriy Shevchenko', 'Serhiy Bubka', 'Mila Kunis', 'Loboda', 'Jamala', 'Valeriy Lobanovskyi', 'Ruslana', 'Vitali Klitschko']
  },
  ID: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'Universitas Indonesia', url: 'https://www.ui.ac.id/en/' },
      { name: 'Gadjah Mada University', url: 'https://ugm.ac.id/en/' },
      { name: 'Bandung Institute of Technology', url: 'https://www.itb.ac.id/?lang=en' },
      { name: 'Airlangga University', url: 'https://www.unair.ac.id/en/' },
      { name: 'Binus University', url: 'https://binus.ac.id/' }
    ],
    places: ['Bali (Ubud / Seminyak)', 'Jakarta eski şehir ve modern merkez', 'Yogyakarta / Borobudur', 'Komodo National Park', 'Lombok / Gili rotaları'],
    operators: [
      { name: 'Telkomsel', url: 'https://www.telkomsel.com/en' },
      { name: 'Indosat Ooredoo Hutchison', url: 'https://indosatooredoo.com/' },
      { name: 'XL Axiata', url: 'https://www.xl.co.id/' },
      { name: 'Smartfren', url: 'https://www.smartfren.com/' }
    ],
    currency: 'Endonezya Rupiahı (IDR)',
    minimumWage: 'Asgari ücret il/provins düzeyinde farklılaşır; yerel resmi kaynak teyidi önemlidir.',
    livingCost: 'Bali turistik bölgeler ve Jakarta merkezde maliyet yükselebilir; ada/şehir bazında fark büyüktür.',
    government: 'Başkanlık sistemi',
    inflation: 'Bank Indonesia ve resmi istatistik kurumu verileriyle takip edilmelidir.',
    foodCulture: 'Nasi goreng, satay, rendang ve bölgesel ada mutfaklarıyla çok çeşitlidir.',
    famousPeople: ['Joko Widodo', 'Prabowo Subianto', 'Anggun', 'Joe Taslim', 'Iko Uwais', 'Rich Brian', 'Agnez Mo', 'Raden Saleh', 'B.J. Habibie', 'Sri Mulyani Indrawati']
  },
  HK: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'The University of Hong Kong', url: 'https://www.hku.hk/' },
      { name: 'The Chinese University of Hong Kong', url: 'https://www.cuhk.edu.hk/english/' },
      { name: 'The Hong Kong University of Science and Technology', url: 'https://hkust.edu.hk/' },
      { name: 'City University of Hong Kong', url: 'https://www.cityu.edu.hk/' },
      { name: 'Hong Kong Polytechnic University', url: 'https://www.polyu.edu.hk/' }
    ],
    places: ['Victoria Peak', 'Tsim Sha Tsui', 'Lantau / Tian Tan Buddha', 'Central & Soho', 'Hong Kong Disneyland çevresi'],
    operators: [
      { name: 'CSL', url: 'https://www.hkcsl.com/en/' },
      { name: 'SmarTone', url: 'https://www.smartone.com/' },
      { name: '3 Hong Kong', url: 'https://www.three.com.hk/' },
      { name: 'China Mobile Hong Kong', url: 'https://www.hk.chinamobile.com/en/' }
    ],
    currency: 'Hong Kong Doları (HKD)',
    minimumWage: 'Yasal saatlik asgari ücret düzenli aralıklarla revize edilir; resmi duyuru kontrol edilmelidir.',
    livingCost: 'Kira ve yaşam maliyeti çok yüksektir; bölgeye göre ciddi fark görülebilir.',
    government: 'Özel İdari Bölge (Çin’e bağlı idari yapı)',
    inflation: 'Resmi istatistik ve para otoritesi verileriyle dönemsel izleme önerilir.',
    foodCulture: 'Kanton mutfağı, dim sum ve yoğun şehir içi yeme-içme kültürü öne çıkar.',
    famousPeople: ['Bruce Lee', 'Jackie Chan', 'Donnie Yen', 'Maggie Cheung', 'Tony Leung', 'Andy Lau', 'Stephen Chow', 'Eason Chan', 'Michelle Yeoh', 'Wong Kar-wai']
  },
  TW: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'National Taiwan University', url: 'https://www.ntu.edu.tw/english/' },
      { name: 'National Tsing Hua University', url: 'https://www.nthu.edu.tw/en/' },
      { name: 'National Yang Ming Chiao Tung University', url: 'https://www.nycu.edu.tw/nycu/en/' },
      { name: 'National Cheng Kung University', url: 'https://en.ncku.edu.tw/' },
      { name: 'National Taiwan Normal University', url: 'https://en.ntnu.edu.tw/' }
    ],
    places: ['Taipei 101 ve Xinyi', 'Jiufen', 'Taroko (erişim durumu kontrolü)', 'Kaohsiung liman bölgesi', 'Sun Moon Lake'],
    operators: [
      { name: 'Chunghwa Telecom', url: 'https://www.cht.com.tw/en/home/cht' },
      { name: 'Taiwan Mobile', url: 'https://www.taiwanmobile.com/' },
      { name: 'Far EasTone', url: 'https://www.fetnet.net/' }
    ],
    currency: 'Yeni Tayvan Doları (TWD)',
    minimumWage: 'Ulusal asgari ücret resmi kararlarla güncellenir; iş türüne göre farklı uygulamalar olabilir.',
    livingCost: 'Taipei diğer şehirlere göre daha pahalıdır; ulaşım altyapısı bütçe planında avantaj sağlar.',
    government: 'Yarı başkanlık sistemi',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle izlenmelidir.',
    foodCulture: 'Gece pazarları, noodle, deniz ürünleri ve çay kültürü belirgindir.',
    famousPeople: ['Tsai Ing-wen', 'Ang Lee', 'Jay Chou', 'A-mei', 'Jeremy Lin', 'Hou Hsiao-hsien', 'Tzuyu', 'Yani Tseng', 'Stan Shih', 'Cher Wang']
  },
  IL: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'Hebrew University of Jerusalem', url: 'https://new.huji.ac.il/en' },
      { name: 'Tel Aviv University', url: 'https://english.tau.ac.il/' },
      { name: 'Technion - Israel Institute of Technology', url: 'https://www.technion.ac.il/en/home-2/' },
      { name: 'Weizmann Institute of Science', url: 'https://www.weizmann.ac.il/pages/' },
      { name: 'Ben-Gurion University of the Negev', url: 'https://in.bgu.ac.il/en/' }
    ],
    places: ['Kudüs Eski Şehir (erişim koşulu kontrolü)', 'Tel Aviv sahil hattı', 'Hayfa ve Bahai Bahçeleri', 'Masada / Ölü Deniz', 'Akka'],
    operators: [
      { name: 'Cellcom', url: 'https://www.cellcom.co.il/' },
      { name: 'Partner', url: 'https://www.partner.co.il/' },
      { name: 'Pelephone', url: 'https://www.pelephone.co.il/' },
      { name: 'HOT Mobile', url: 'https://www.hotmobile.co.il/' }
    ],
    currency: 'İsrail Şekeli (ILS)',
    minimumWage: 'Ulusal asgari ücret resmi kararlarla güncellenir; güncel rakam teyidi önerilir.',
    livingCost: 'Tel Aviv ve Kudüs yüksek maliyetlidir; konut ve yeme-içme giderleri yükselebilir.',
    government: 'Parlamenter demokrasi',
    inflation: 'Merkez bankası ve resmi istatistik bürosu verileriyle takip edilmelidir.',
    foodCulture: 'Akdeniz-Ortadoğu etkili mutfak; humus, falafel, sabich ve modern füzyon öne çıkar.',
    famousPeople: ['David Ben-Gurion', 'Golda Meir', 'Natalie Portman', 'Gal Gadot', 'Yuval Noah Harari', 'Noa Kirel', 'Ofra Haza', 'Amos Oz', 'A.B. Yehoshua', 'Itzhak Perlman']
  },
  BH: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'University of Bahrain', url: 'https://www.uob.edu.bh/' },
      { name: 'Arab Open University - Bahrain', url: 'https://www.aou.org.bh/' },
      { name: 'Royal University for Women', url: 'https://www.ruw.edu.bh/' },
      { name: 'Bahrain Polytechnic', url: 'https://www.polytechnic.bh/' },
      { name: 'Ahlia University', url: 'https://www.ahlia.edu.bh/' }
    ],
    places: ['Manama şehir merkezi', 'Bahrain National Museum', 'Al Fateh Grand Mosque', 'Muharraq', 'Bahrain Fort (Qal’at al-Bahrain)'],
    operators: [
      { name: 'Batelco', url: 'https://www.batelco.com/' },
      { name: 'stc Bahrain', url: 'https://www.stc.com.bh/' },
      { name: 'Zain Bahrain', url: 'https://www.bh.zain.com/' }
    ],
    currency: 'Bahreyn Dinarı (BHD)',
    minimumWage: 'Çalışma statüsü ve sektör bazlı koşullar farklılık gösterebilir; resmi kaynak teyidi gerekir.',
    livingCost: 'Manama ve iş merkezlerine yakın bölgelerde konaklama maliyeti yükselebilir.',
    government: 'Anayasal monarşi',
    inflation: 'Resmi istatistik ve merkez bankası verileriyle dönemsel takip önerilir.',
    foodCulture: 'Körfez mutfağı, deniz ürünleri, pirinç yemekleri ve Arap kahvesi kültürü öne çıkar.',
    famousPeople: ['Kral Hamad bin Isa Al Khalifa', 'Veliaht Salman bin Hamad Al Khalifa', 'Maya Al Khalifa', 'Mariam bint Hassan Al Khalifa', 'Hamad Al Fardan', 'Mahmood Al Yousif', 'Alaa Hubail', 'Hakeem Al Araibi', 'Rashed Al Mannai', 'Aisha bint Rashid Al Khalifa']
  },
  MX: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'UNAM', url: 'https://www.unam.mx/' },
      { name: 'Tecnológico de Monterrey', url: 'https://tec.mx/en' },
      { name: 'IPN', url: 'https://www.ipn.mx/' },
      { name: 'Universidad de Guadalajara', url: 'https://www.udg.mx/en' },
      { name: 'Universidad Iberoamericana', url: 'https://ibero.mx/' }
    ],
    places: ['Mexico City tarihi merkez', 'Cancún / Riviera Maya', 'Chichen Itza', 'Guadalajara', 'Oaxaca'],
    operators: [
      { name: 'Telcel', url: 'https://www.telcel.com/' },
      { name: 'AT&T México', url: 'https://www.att.com.mx/' },
      { name: 'Movistar México', url: 'https://www.movistar.com.mx/' }
    ],
    currency: 'Meksika Pesosu (MXN)',
    minimumWage: 'Ulusal asgari ücret yıllık düzenlemelerle güncellenir; resmi işgücü kaynakları kontrol edilmelidir.',
    livingCost: 'Mexico City ve turistik kıyı bölgelerinde maliyet artar; şehirler arasında belirgin fark vardır.',
    government: 'Federal başkanlık sistemi',
    inflation: 'Banxico ve resmi istatistik kurumu verileriyle takip edilmelidir.',
    foodCulture: 'Taco, mole, mısır bazlı yemekler ve bölgesel sos kültürü çok güçlüdür.',
    famousPeople: ['Frida Kahlo', 'Diego Rivera', 'Guillermo del Toro', 'Salma Hayek', 'Carlos Slim', 'Chespirito', 'Luis Miguel', 'Canelo Álvarez', 'Hugo Sánchez', 'Octavio Paz']
  },
  BR: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'Universidade de São Paulo (USP)', url: 'https://www5.usp.br/' },
      { name: 'Universidade Estadual de Campinas (UNICAMP)', url: 'https://www.unicamp.br/unicamp/english' },
      { name: 'Universidade Federal do Rio de Janeiro (UFRJ)', url: 'https://ufrj.br/en/' },
      { name: 'Universidade Estadual Paulista (UNESP)', url: 'https://www2.unesp.br/' },
      { name: 'FGV', url: 'https://portal.fgv.br/en' }
    ],
    places: ['Rio de Janeiro (Copacabana / Corcovado)', 'São Paulo', 'Iguaçu Şelaleleri', 'Salvador', 'Florianópolis'],
    operators: [
      { name: 'Vivo', url: 'https://www.vivo.com.br/' },
      { name: 'Claro Brasil', url: 'https://www.claro.com.br/' },
      { name: 'TIM Brasil', url: 'https://www.tim.com.br/' }
    ],
    currency: 'Brezilya Reali (BRL)',
    minimumWage: 'Ulusal asgari ücret yıllık güncellenir; eyalet düzeyinde ek düzenlemeler olabilir.',
    livingCost: 'São Paulo ve Rio’da konut/ulaşım maliyetleri yüksek; bölgesel farklılıklar geniştir.',
    government: 'Federal başkanlık sistemi',
    inflation: 'Merkez bankası ve IBGE verileriyle düzenli takip önerilir.',
    foodCulture: 'Feijoada, churrasco ve bölgesel tropikal mutfak çeşitliliği belirgindir.',
    famousPeople: ['Pelé', 'Ayrton Senna', 'Neymar', 'Paulo Coelho', 'Gisele Bündchen', 'Anitta', 'Oscar Niemeyer', 'Ronaldinho', 'Clarice Lispector', 'Jorge Amado']
  },
  CR: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'University of Costa Rica', url: 'https://www.ucr.ac.cr/' },
      { name: 'National University of Costa Rica', url: 'https://www.una.ac.cr/' },
      { name: 'Tecnológico de Costa Rica', url: 'https://www.tec.ac.cr/' },
      { name: 'EARTH University', url: 'https://earth.ac.cr/en/' },
      { name: 'ULACIT', url: 'https://www.ulacit.ac.cr/' }
    ],
    places: ['San José', 'Arenal Volcano', 'Monteverde', 'Manuel Antonio', 'Tamarindo / Guanacaste'],
    operators: [
      { name: 'Kolbi (ICE)', url: 'https://www.kolbi.cr/' },
      { name: 'Claro Costa Rica', url: 'https://www.claro.cr/' },
      { name: 'Liberty Costa Rica', url: 'https://www.libertycr.com/' }
    ],
    currency: 'Kosta Rika Kolonu (CRC)',
    minimumWage: 'Asgari ücret meslek/iş kolu bazında farklı kategorilerde uygulanabilir; resmi tablo kontrolü gerekir.',
    livingCost: 'Turistik kıyı bölgeleri ve expat yoğun alanlarda maliyet artabilir.',
    government: 'Başkanlık sistemi',
    inflation: 'Merkez bankası ve resmi istatistik kurumuyla dönemsel takip edilmelidir.',
    foodCulture: 'Pirinç-fasulye tabanlı günlük mutfak, tropikal meyveler ve deniz ürünleri yaygındır.',
    famousPeople: ['Óscar Arias', 'Keylor Navas', 'Franklin Chang-Díaz', 'Claudia Poll', 'Joel Campbell', 'Bryan Ruiz', 'Giannina Facio', 'Maribel Guardia', 'Juan Santamaría', 'Epsy Campbell']
  },
  MU: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'University of Mauritius', url: 'https://www.uom.ac.mu/' },
      { name: 'Middlesex University Mauritius', url: 'https://www.mdx.ac.mu/' },
      { name: 'University of Technology, Mauritius', url: 'https://www.utm.ac.mu/' },
      { name: 'Curtin Mauritius', url: 'https://curtinmauritius.ac.mu/' },
      { name: 'Open University of Mauritius', url: 'https://open.ac.mu/' }
    ],
    places: ['Port Louis', 'Grand Baie', 'Le Morne', 'Black River Gorges', 'Île aux Cerfs'],
    operators: [
      { name: 'my.t', url: 'https://www.myt.mu/' },
      { name: 'Emtel', url: 'https://www.emtel.com/' },
      { name: 'MTML/Chili', url: 'https://www.chili.mu/' }
    ],
    currency: 'Mauritius Rupisi (MUR)',
    minimumWage: 'Ulusal taban ücret ve sektör uygulamaları için resmi kaynak teyidi önerilir.',
    livingCost: 'Turistik sahil bölgeleri iç kesimlere göre daha pahalı olabilir.',
    government: 'Parlamenter cumhuriyet',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle takip edilmelidir.',
    foodCulture: 'Hint, Afrika, Fransız ve Çin etkilerinin birleştiği ada mutfağı öne çıkar.',
    famousPeople: ['Sir Seewoosagur Ramgoolam', 'Navin Ramgoolam', 'Ameenah Gurib-Fakim', 'Kailash Purryag', 'Cassam Uteem', 'Vikash Dhorasoo', 'Nita Deerpalsing', 'Khal Torabully', 'Jean-Georges Prosper', 'Gaëtan Duval']
  },
  KZ: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'Al-Farabi Kazakh National University', url: 'https://www.kaznu.kz/en' },
      { name: 'Nazarbayev University', url: 'https://nu.edu.kz/' },
      { name: 'Satbayev University', url: 'https://satbayev.university/en' },
      { name: 'L.N. Gumilyov Eurasian National University', url: 'https://enu.kz/en/' },
      { name: 'KIMEP University', url: 'https://www.kimep.kz/' }
    ],
    places: ['Almatı', 'Astana', 'Charyn Canyon', 'Türkistan (Yesevi Türbesi)', 'Kaindy / Kolsai gölleri'],
    operators: [
      { name: 'Kcell', url: 'https://www.kcell.kz/' },
      { name: 'Beeline Kazakhstan', url: 'https://beeline.kz/' },
      { name: 'Tele2/Altel', url: 'https://tele2.kz/' }
    ],
    currency: 'Kazakistan Tengesi (KZT)',
    minimumWage: 'Ulusal asgari ücret resmi kararlarla güncellenir; güncel tutar teyidi gerekir.',
    livingCost: 'Almatı ve Astana diğer şehirlere göre daha maliyetlidir.',
    government: 'Başkanlık sistemi',
    inflation: 'Ulusal banka ve resmi istatistik verileriyle düzenli takip edilmelidir.',
    foodCulture: 'Et ve hamur işi ağırlıklı Orta Asya mutfağı, süt ürünleri ve çay kültürü öne çıkar.',
    famousPeople: ['Nursultan Nazarbayev', 'Kassym-Jomart Tokayev', 'Gennady Golovkin', 'Dimash Qudaibergen', 'Ilya Ilyin', 'Elena Rybakina', 'Abai Kunanbayuly', 'Kurmangazy Sagyrbayuly', 'Shavkat Rakhmonov', 'Olzhas Suleimenov']
  },
  SM: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'University of the Republic of San Marino', url: 'https://www.unirsm.sm/' },
      { name: 'University of Bologna (yakın akademik ağ)', url: 'https://www.unibo.it/en' },
      { name: 'University of Urbino', url: 'https://www.uniurb.it/en' },
      { name: 'University of San Marino Design Institute (UNIRSM birimleri)', url: 'https://www.unirsm.sm/en/' },
      { name: 'European University Institute (bölgesel akademik referans)', url: 'https://www.eui.eu/' }
    ],
    places: ['San Marino Historic Centre', 'Guaita Kulesi', 'Cesta Kulesi', 'Titano Dağı manzaraları', 'Basilica di San Marino'],
    operators: [
      { name: 'TIM San Marino', url: 'https://www.timsm.com/' },
      { name: 'San Marino Telecom', url: 'https://www.sanmarinotelecom.com/' },
      { name: 'Vodafone Italia (roaming/çevre kapsama)', url: 'https://www.vodafone.it/' }
    ],
    currency: 'Euro (EUR)',
    minimumWage: 'Asgari ücret yapısı sektörel/sözleşme temelli olabilir; güncel mevzuat ve iş sözleşmesi kaynakları kontrol edilmelidir.',
    livingCost: 'Küçük ülke ölçeği nedeniyle konut ve günlük yaşam maliyetleri yakın İtalya şehirleriyle birlikte değerlendirilmelidir.',
    government: 'Parlamenter cumhuriyet',
    inflation: 'Euro bölgesi ve yerel fiyat dinamikleri birlikte izlenmelidir.',
    foodCulture: 'İtalyan-Romagna etkili mutfak; makarna, peynir ve bölgesel et ürünleri öne çıkar.',
    famousPeople: ['Marino (Aziz)', 'Valentina Monetta', 'Alessandra Perilli', 'Gian Nicola Berti', 'Mara Maffi', 'Manuel Poggiali', 'Little Tony', 'Denise Bronzetti', 'Alessandro Rossi', 'Federico Pedini Amati']
  },
  AD: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'University of Andorra', url: 'https://www.uda.ad/' },
      { name: 'Andorra School of Nursing (UdA birimleri)', url: 'https://www.uda.ad/' },
      { name: 'Andorra School of Computer Science (UdA birimleri)', url: 'https://www.uda.ad/' },
      { name: 'University of Barcelona (bölgesel akademik ağ)', url: 'https://www.ub.edu/web/ub/en/' },
      { name: 'Autonomous University of Barcelona', url: 'https://www.uab.cat/web/universitat-autonoma-de-barcelona-1345467954774.html' }
    ],
    places: ['Andorra la Vella', 'Caldea Spa', 'Grandvalira', 'Vallnord / Pal Arinsal', 'Madriu-Perafita-Claror Vadisi'],
    operators: [
      { name: 'Andorra Telecom', url: 'https://www.andorratelecom.ad/' },
      { name: 'Orange/Movistar roaming (İspanya/Fransa geçişleri)', url: 'https://www.orange.es/' },
      { name: 'SFR roaming (Fransa bağlantıları)', url: 'https://www.sfr.fr/' }
    ],
    currency: 'Euro (EUR)',
    minimumWage: 'Ulusal ücret tabanı dönemsel güncellenir; resmi iş/çalışma mevzuatı kaynaklarından teyit edilmelidir.',
    livingCost: 'Turizm sezonunda konaklama maliyeti yükselir; kayak döneminde fiyatlar belirgin artabilir.',
    government: 'Eş-prenslik (parlamenter demokrasi)',
    inflation: 'Fiyatlar turizm ve komşu ülke etkileriyle değişebilir; resmi istatistik takibi önerilir.',
    foodCulture: 'Katalan ve Pirene mutfak etkisi; et yemekleri, dağ mutfağı ve peynirler öne çıkar.',
    famousPeople: ['Joan Enric Vives Sicília', 'Xavier Espot Zamora', 'Albert Llovera', 'Mònica Doria', 'Marc Forné', 'Antoni Martí', 'Ildefons Lima', 'Ludmilla Lacueva Canut', 'Sonia Araujo', 'Clàudia Cornella']
  },
  BN: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'Universiti Brunei Darussalam', url: 'https://ubd.edu.bn/' },
      { name: 'Universiti Teknologi Brunei', url: 'https://www.utb.edu.bn/' },
      { name: 'Universiti Islam Sultan Sharif Ali', url: 'https://unissa.edu.bn/' },
      { name: 'Politeknik Brunei', url: 'https://pb.edu.bn/' },
      { name: 'Laksamana College of Business', url: 'https://www.lcb.edu.bn/' }
    ],
    places: ['Bandar Seri Begawan', 'Sultan Omar Ali Saifuddien Mosque', 'Kampong Ayer', 'Ulu Temburong National Park', 'Jerudong çevresi'],
    operators: [
      { name: 'DST', url: 'https://www.dst.com.bn/' },
      { name: 'Progresif', url: 'https://www.progresif.com/' },
      { name: 'imagine', url: 'https://imagine.com.bn/' }
    ],
    currency: 'Brunei Doları (BND)',
    minimumWage: 'Sektörel ve çalışma izni koşullarına göre uygulamalar değişebilir; resmi iş gücü kaynakları kontrol edilmelidir.',
    livingCost: 'Konut ve ithal ürün fiyatları yaşam maliyetini etkileyebilir; araç kullanımı yaygındır.',
    government: 'Mutlak monarşi',
    inflation: 'Resmi istatistik ve para otoritesi verileriyle dönemsel takip önerilir.',
    foodCulture: 'Malay mutfağı, pirinç yemekleri, deniz ürünleri ve komşu Borneo etkisi öne çıkar.',
    famousPeople: ['Sultan Hassanal Bolkiah', 'Prens Al-Muhtadee Billah', 'Prens Abdul Mateen', 'Aziz Harun', 'Wu Chun', 'Dato Paduka Steven Chong', 'Pengiran Anak Saleha', 'Yura Halim', 'Shaikh Jamaluddin', 'Hj. Md. Daud Yusof']
  },
  DO: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'Universidad Autónoma de Santo Domingo (UASD)', url: 'https://uasd.edu.do/' },
      { name: 'Pontificia Universidad Católica Madre y Maestra (PUCMM)', url: 'https://www.pucmm.edu.do/' },
      { name: 'Instituto Tecnológico de Santo Domingo (INTEC)', url: 'https://www.intec.edu.do/' },
      { name: 'Universidad Iberoamericana (UNIBE)', url: 'https://unibe.edu.do/' },
      { name: 'Universidad APEC', url: 'https://unapec.edu.do/' }
    ],
    places: ['Santo Domingo Zona Colonial', 'Punta Cana', 'Samaná', 'Puerto Plata', 'Jarabacoa'],
    operators: [
      { name: 'Claro Dominicana', url: 'https://www.claro.com.do/' },
      { name: 'Altice Dominicana', url: 'https://www.altice.com.do/' },
      { name: 'Viva Dominicana', url: 'https://www.viva.com.do/' }
    ],
    currency: 'Dominik Pesosu (DOP)',
    minimumWage: 'Asgari ücret şirket ölçeği/sektöre göre farklı kategorilerde uygulanabilir; resmi tablo teyidi önerilir.',
    livingCost: 'Turistik bölgelerde konaklama ve hizmet fiyatları yerel şehir merkezlerine göre yüksektir.',
    government: 'Başkanlık sistemi',
    inflation: 'Merkez bankası ve resmi istatistik kurumunun dönemsel verileri takip edilmelidir.',
    foodCulture: 'Karayip mutfağı; pirinç-fasulye, muz, deniz ürünleri ve tavuk yemekleri yaygındır.',
    famousPeople: ['Juan Luis Guerra', 'David Ortiz', 'Pedro Martínez', 'Milly Quezada', 'Amelia Vega', 'Romeo Santos', 'Manny Cruz', 'Zoe Saldaña', 'Manny Ramírez', 'Felix Sanchez']
  },
  SC: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'University of Seychelles', url: 'https://www.unisey.ac.sc/' },
      { name: 'Seychelles Institute of Technology', url: 'https://sit.edu.sc/' },
      { name: 'Seychelles Maritime Academy', url: 'https://sma.edu.sc/' },
      { name: 'Seychelles Tourism Academy', url: 'https://sta.edu.sc/' },
      { name: 'UniSey School of Business and Sustainable Development', url: 'https://www.unisey.ac.sc/' }
    ],
    places: ['Mahé / Victoria', 'Praslin (Vallée de Mai)', 'La Digue (Anse Source d’Argent)', 'Morne Seychellois National Park', 'Curieuse Island'],
    operators: [
      { name: 'Cable & Wireless Seychelles', url: 'https://www.cwseychelles.com/' },
      { name: 'Airtel Seychelles', url: 'https://www.airtel.sc/' },
      { name: 'Intelvision', url: 'https://intelvision.sc/' }
    ],
    currency: 'Seyşeller Rupisi (SCR)',
    minimumWage: 'Çalışma piyasası ve sektör bazlı ücretler için resmi istihdam kaynaklarıyla teyit önerilir.',
    livingCost: 'Ada ekonomisi ve ithal ürün bağımlılığı nedeniyle yaşam maliyeti yüksek olabilir.',
    government: 'Başkanlık sistemi',
    inflation: 'Merkez bankası ve ulusal istatistik verileriyle dönemsel takip edilmelidir.',
    foodCulture: 'Creole mutfağı; deniz ürünleri, baharatlar ve tropikal meyveler öne çıkar.',
    famousPeople: ['Wavel Ramkalawan', 'Danny Faure', 'James Michel', 'Patrick Victor', 'David Andre', 'Jean-Marc Volcy', 'Philip Toussaint', 'Kevin Vidot', 'Niko Vidot', 'Judith Sinon']
  },
  VA: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'Pontifical Gregorian University', url: 'https://www.unigre.it/en' },
      { name: 'Pontifical Lateran University', url: 'https://www.pul.it/' },
      { name: 'Pontifical Urbaniana University', url: 'https://www.urbaniana.edu/' },
      { name: 'Pontifical University of St. Thomas Aquinas', url: 'https://angelicum.it/' },
      { name: 'Pontifical Biblical Institute', url: 'https://www.biblico.it/' }
    ],
    places: ['Aziz Petrus Bazilikası', 'Aziz Petrus Meydanı', 'Vatikan Müzeleri', 'Sistine Şapeli', 'Vatikan Bahçeleri (rezervasyonlu)'],
    operators: [
      { name: 'TIM Italia', url: 'https://www.tim.it/' },
      { name: 'Vodafone Italia', url: 'https://www.vodafone.it/' },
      { name: 'WindTre', url: 'https://www.windtre.it/' }
    ],
    currency: 'Euro (EUR)',
    minimumWage: 'Vatikan içinde çalışma koşulları kurum bazlıdır; klasik ulusal asgari ücret yaklaşımından farklı değerlendirilebilir.',
    livingCost: 'Seyahat planı pratikte Roma üzerinden yapılır; konaklama ve ulaşım maliyetleri Roma fiyatlarına göre hesaplanmalıdır.',
    government: 'Teokratik seçilmiş monarşi',
    inflation: 'Fiyat dinamikleri İtalya ve Euro Bölgesi koşullarından etkilenir.',
    foodCulture: 'Ziyaret deneyimi Roma mutfağı ile birlikte değerlendirilir; Vatikan içinde seçenekler sınırlıdır.',
    famousPeople: ['Papa Franciscus', 'Papa XVI. Benedictus', 'Papa II. Ioannes Paulus', 'Papa VI. Paulus', 'Papa XXIII. Ioannes', 'Michelangelo', 'Raphael', 'Gian Lorenzo Bernini', 'Papa XIII. Leo', 'Papa XII. Pius']
  },
  AR: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'Universidad de Buenos Aires (UBA)', url: 'https://www.uba.ar/' },
      { name: 'Universidad Nacional de La Plata', url: 'https://unlp.edu.ar/' },
      { name: 'Universidad Nacional de Córdoba', url: 'https://www.unc.edu.ar/' },
      { name: 'Universidad Torcuato Di Tella', url: 'https://www.utdt.edu/' },
      { name: 'Universidad Austral', url: 'https://www.austral.edu.ar/' }
    ],
    places: ['Buenos Aires', 'Patagonya (Bariloche / El Calafate)', 'Iguazú Şelaleleri', 'Mendoza', 'Ushuaia'],
    operators: [
      { name: 'Personal', url: 'https://www.personal.com.ar/' },
      { name: 'Movistar Argentina', url: 'https://www.movistar.com.ar/' },
      { name: 'Claro Argentina', url: 'https://www.claro.com.ar/' }
    ],
    currency: 'Arjantin Pesosu (ARS)',
    minimumWage: 'Yasal taban ücret düzenli güncellenir; yüksek enflasyon ortamında güncel resmi kaynak teyidi önemlidir.',
    livingCost: 'Kur oynaklığı nedeniyle kısa sürede değişebilir; şehir ve ödeme yöntemine göre bütçe farkı oluşur.',
    government: 'Federal başkanlık sistemi',
    inflation: 'Yüksek oynaklık görülebilir; merkez bankası ve resmi istatistik verileri yakından izlenmelidir.',
    foodCulture: 'Et ağırlıklı mutfak, asado kültürü, empanada ve İtalyan etkili şehir mutfağı belirgindir.',
    famousPeople: ['Lionel Messi', 'Diego Maradona', 'Papa Franciscus', 'Jorge Luis Borges', 'Eva Perón', 'Juan Perón', 'Martha Argerich', 'Manu Ginóbili', 'Sergio Agüero', 'Astor Piazzolla']
  },
  UY: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'Universidad de la República', url: 'https://udelar.edu.uy/portal/' },
      { name: 'Universidad ORT Uruguay', url: 'https://www.ort.edu.uy/' },
      { name: 'Universidad Católica del Uruguay', url: 'https://www.ucu.edu.uy/' },
      { name: 'Universidad de Montevideo', url: 'https://www.um.edu.uy/' },
      { name: 'Universidad Tecnológica del Uruguay', url: 'https://utec.edu.uy/' }
    ],
    places: ['Montevideo', 'Punta del Este', 'Colonia del Sacramento', 'José Ignacio', 'Rocha kıyıları'],
    operators: [
      { name: 'Antel', url: 'https://www.antel.com.uy/' },
      { name: 'Movistar Uruguay', url: 'https://www.movistar.com.uy/' },
      { name: 'Claro Uruguay', url: 'https://www.claro.com.uy/' }
    ],
    currency: 'Uruguay Pesosu (UYU)',
    minimumWage: 'Ulusal asgari ücret resmi kararlarla güncellenir; sektör anlaşmaları da ücretleri etkileyebilir.',
    livingCost: 'Montevideo ve sahil bölgelerinde yaşam maliyeti daha yüksek olabilir.',
    government: 'Başkanlık sistemi',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle dönemsel takip önerilir.',
    foodCulture: 'Et, mate kültürü ve Río de la Plata etkili mutfak öne çıkar.',
    famousPeople: ['José Mujica', 'Luis Suárez', 'Edinson Cavani', 'Diego Forlán', 'Jorge Drexler', 'Natalia Oreiro', 'Mario Benedetti', 'Eduardo Galeano', 'Tabaré Vázquez', 'Juan Manuel Blanes']
  },
  MO: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'University of Macau', url: 'https://www.um.edu.mo/' },
      { name: 'Macau University of Science and Technology', url: 'https://www.must.edu.mo/' },
      { name: 'City University of Macau', url: 'https://www.cityu.edu.mo/' },
      { name: 'Macau Polytechnic University', url: 'https://www.mpu.edu.mo/' },
      { name: 'Kiang Wu Nursing College of Macau', url: 'https://www.kwnc.edu.mo/' }
    ],
    places: ['Historic Centre of Macao', 'Ruins of St. Paul', 'Cotai Strip', 'A-Ma Temple', 'Taipa Village'],
    operators: [
      { name: 'CTM', url: 'https://www.ctm.net/' },
      { name: 'China Telecom Macau', url: 'https://www.chinatelecom.com.mo/' },
      { name: '3 Macau', url: 'https://www.three.com.mo/' }
    ],
    currency: 'Makao Patakası (MOP)',
    minimumWage: 'Asgari ücret ve sektör uygulamaları resmi işgücü mevzuatına göre teyit edilmelidir.',
    livingCost: 'Konaklama ve turistik dönem fiyatları yükselebilir; Hong Kong bağlantılı planlar bütçeyi etkiler.',
    government: 'Özel İdari Bölge (Çin’e bağlı idari yapı)',
    inflation: 'Resmi istatistik ve para otoritesi verileriyle takip önerilir.',
    foodCulture: 'Portekiz-Çin füzyon mutfağı; Macanese yemekleri ve sokak lezzetleri öne çıkar.',
    famousPeople: ['Stanley Ho', 'Pansy Ho', 'Lawrence Ho', 'Edmund Ho', 'Ho Iat Seng', 'Fernando Chui', 'Maria Cordero', 'Lio Kuokman', 'Sio Hon Pan', 'Leong On Kei']
  },
  KN: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'University of Medicine and Health Sciences (St. Kitts)', url: 'https://www.umhs-sk.org/' },
      { name: 'Ross University School of Veterinary Medicine', url: 'https://veterinary.rossu.edu/' },
      { name: 'International University of the Health Sciences', url: 'https://www.iuhs.edu/' },
      { name: 'Clarence Fitzroy Bryant College', url: 'https://www.cfbc.edu.kn/' },
      { name: 'Medical University of the Americas (Nevis)', url: 'https://www.mua.edu/' }
    ],
    places: ['Basseterre', 'Brimstone Hill Fortress', 'Frigate Bay', 'Nevis Peak çevresi', 'Pinney’s Beach'],
    operators: [
      { name: 'The Cable', url: 'https://www.thecable.net/' },
      { name: 'Digicel St. Kitts & Nevis', url: 'https://www.digicelgroup.com/kn/en.html' },
      { name: 'Flow Caribbean', url: 'https://discoverflow.co/' }
    ],
    currency: 'Doğu Karayip Doları (XCD)',
    minimumWage: 'Ücret düzenlemeleri ve çalışma şartları için resmi çalışma otoritesi kaynakları kontrol edilmelidir.',
    livingCost: 'Ada ekonomisi ve ithal ürün bağımlılığı nedeniyle yaşam maliyeti yüksek olabilir.',
    government: 'Parlamenter demokrasi (anayasal monarşi)',
    inflation: 'ECCB ve yerel resmi verilerle dönemsel takip önerilir.',
    foodCulture: 'Karayip mutfağı; deniz ürünleri, keçi eti yemekleri ve tropikal meyveler öne çıkar.',
    famousPeople: ['Terrance Drew', 'Timothy Harris', 'Kim Collins', 'Joan Armatrading', 'Elquemedo Willett', 'Byron Messia', 'Marlon Asher (bölgesel bağlantı)', 'Jermaine Hobson', 'Carlton Brangman', 'Kennedy Simmonds']
  },
  AG: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'University of Health Sciences Antigua', url: 'https://uhsa.ag/' },
      { name: 'American University of Antigua', url: 'https://www.auamed.org/' },
      { name: 'Antigua State College', url: 'https://antiguastatecollege.edu.ag/' },
      { name: 'Antigua and Barbuda International Institute of Technology', url: 'https://abiit.edu.ag/' },
      { name: 'University of the West Indies (regional)', url: 'https://www.uwi.edu/' }
    ],
    places: ['St. John’s', 'English Harbour', 'Nelson’s Dockyard', 'Shirley Heights', 'Dickenson Bay'],
    operators: [
      { name: 'Flow Antigua', url: 'https://discoverflow.co/antigua/' },
      { name: 'Digicel Antigua', url: 'https://www.digicelgroup.com/ag/en.html' },
      { name: 'APUA Inet', url: 'https://apuainet.ag/' }
    ],
    currency: 'Doğu Karayip Doları (XCD)',
    minimumWage: 'Asgari ücret ve sektör uygulamaları için resmi çalışma mevzuatı teyidi önerilir.',
    livingCost: 'Turistik kıyı bölgelerinde konaklama ve hizmet maliyetleri yüksektir.',
    government: 'Parlamenter demokrasi (anayasal monarşi)',
    inflation: 'ECCB ve yerel resmi verilerle takip edilmelidir.',
    foodCulture: 'Karayip mutfağı; deniz ürünleri ve baharatlı ada yemekleri yaygındır.',
    famousPeople: ['Viv Richards', 'Curtly Ambrose', 'Andy Roberts', 'Gaston Browne', 'Baldwin Spencer', 'Rakeem Cornwall', 'Claudette Peters', 'Asot Michael', 'Tim Hector', 'Mellisa Phelps']
  },
  PA: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'Universidad de Panamá', url: 'https://www.up.ac.pa/' },
      { name: 'Universidad Tecnológica de Panamá', url: 'https://utp.ac.pa/' },
      { name: 'Universidad Católica Santa María La Antigua', url: 'https://usma.ac.pa/' },
      { name: 'Universidad Latina de Panamá', url: 'https://ulatina.edu.pa/' },
      { name: 'Florida State University Panama', url: 'https://international.fsu.edu/panama/' }
    ],
    places: ['Panama City', 'Panama Kanalı (Miraflores)', 'Casco Viejo', 'Bocas del Toro', 'Boquete'],
    operators: [
      { name: 'Tigo Panama', url: 'https://www.tigo.com.pa/' },
      { name: 'Más Móvil Panamá', url: 'https://www.masmovilpanama.com/' },
      { name: 'Digicel Panama', url: 'https://www.digicelgroup.com/pa/es.html' }
    ],
    currency: 'Panama Balboası / ABD Doları (PAB/USD)',
    minimumWage: 'Asgari ücret bölge ve sektör bazında farklı kategorilerde belirlenebilir; resmi tablo teyidi gerekir.',
    livingCost: 'Panama City ve expat bölgelerinde maliyet yükselir; kırsal alanlarda daha düşüktür.',
    government: 'Başkanlık sistemi',
    inflation: 'Resmi istatistik ve ekonomi bakanlığı verileriyle takip önerilir.',
    foodCulture: 'Karayip-Latin etkili mutfak; deniz ürünleri, pirinç yemekleri ve tropikal tatlar öne çıkar.',
    famousPeople: ['Rubén Blades', 'Mariano Rivera', 'Roberto Durán', 'Mireya Moscoso', 'Omar Torrijos', 'Irving Saladino', 'Sech', 'Danilo Pérez', 'Román Torres', 'Erika Ender']
  },
  GD: {
    updatedAt: '2026-02-23',
    schools: [
      { name: "St. George's University", url: 'https://www.sgu.edu/' },
      { name: 'T.A. Marryshow Community College', url: 'https://tamcc.edu.gd/' },
      { name: 'University of the West Indies Open Campus', url: 'https://www.open.uwi.edu/' },
      { name: "St. George's University School of Medicine", url: 'https://www.sgu.edu/academic-programs/school-of-medicine/' },
      { name: 'Grenada National Training Agency (resmi eğitim referansı)', url: 'https://www.gov.gd/' }
    ],
    places: ["St. George's", 'Grand Anse Beach', 'Underwater Sculpture Park', 'Annandale Falls', 'Carriacou'],
    operators: [
      { name: 'Digicel Grenada', url: 'https://www.digicelgroup.com/gd/en.html' },
      { name: 'Flow Grenada', url: 'https://discoverflow.co/grenada/' },
      { name: 'Grenada Cooperative Bank / ISP refs', url: 'https://www.gov.gd/' }
    ],
    currency: 'Doğu Karayip Doları (XCD)',
    minimumWage: 'Ücret düzenlemeleri için resmi çalışma bakanlığı ve iş mevzuatı kaynakları kontrol edilmelidir.',
    livingCost: 'Turistik dönemlerde sahil bölgelerinde fiyatlar yükselir; ithal ürün bağımlılığı maliyeti artırabilir.',
    government: 'Parlamenter demokrasi (anayasal monarşi)',
    inflation: 'ECCB ve yerel resmi verilerle dönemsel takip önerilir.',
    foodCulture: 'Baharat adası mutfağı; hindistan cevizi, deniz ürünleri ve baharat kullanımı güçlüdür.',
    famousPeople: ['Maurice Bishop', 'Keith Mitchell', 'Kirani James', 'Anderson Peters', 'Merle Collins', 'Teddyson John', 'Tillman Thomas', 'Carlyle Glean', 'Alicia Modestine', 'Nazim Burke']
  },
  LC: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'Sir Arthur Lewis Community College', url: 'https://salcc.edu.lc/' },
      { name: 'University of the West Indies Open Campus', url: 'https://www.open.uwi.edu/' },
      { name: 'American International Medical University', url: 'https://www.aimu-edu.us/' },
      { name: 'Monroe College Saint Lucia', url: 'https://www.monroecollege.edu/' },
      { name: 'Regional nursing and training institutes (official references)', url: 'https://www.govt.lc/' }
    ],
    places: ['Castries', 'Gros Islet', 'Pitons', 'Soufrière', 'Pigeon Island'],
    operators: [
      { name: 'Flow Saint Lucia', url: 'https://discoverflow.co/st-lucia/' },
      { name: 'Digicel Saint Lucia', url: 'https://www.digicelgroup.com/lc/en.html' },
      { name: 'Government ICT / local providers', url: 'https://www.govt.lc/' }
    ],
    currency: 'Doğu Karayip Doları (XCD)',
    minimumWage: 'Asgari ücret ve sektörel ücret uygulamaları için resmi çalışma otoritesi kaynakları teyit edilmelidir.',
    livingCost: 'Turistik sahil ve resort bölgelerinde maliyet yükselir; yerel bölgelerde daha dengelidir.',
    government: 'Parlamenter demokrasi (anayasal monarşi)',
    inflation: 'ECCB ve resmi verilerle dönemsel takip önerilir.',
    foodCulture: 'Karayip-Creole mutfağı; deniz ürünleri, baharatlar ve tropikal ürünler öne çıkar.',
    famousPeople: ['Derek Walcott', 'Arthur Lewis', 'Daren Sammy', 'Julien Alfred', 'Levern Spencer', 'Winston Duke', 'Kenson Casimir', 'Ronald Boo Hinkson', 'Philip J. Pierre', 'Kezia Frederick']
  },
  BB: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'University of the West Indies Cave Hill', url: 'https://www.cavehill.uwi.edu/' },
      { name: 'Barbados Community College', url: 'https://www.bcc.edu.bb/' },
      { name: 'UWI Open Campus Barbados', url: 'https://www.open.uwi.edu/' },
      { name: 'Codrington College', url: 'https://www.codrington.edu.bb/' },
      { name: 'Samuel Jackman Prescod Institute of Technology', url: 'https://sjpi.edu.bb/' }
    ],
    places: ['Bridgetown', 'Carlisle Bay', 'Bathsheba', 'Oistins', 'Hunte’s Gardens'],
    operators: [
      { name: 'Flow Barbados', url: 'https://discoverflow.co/barbados/' },
      { name: 'Digicel Barbados', url: 'https://www.digicelgroup.com/bb/en.html' },
      { name: 'Cable Bahamas / regional ISP references', url: 'https://www.barbados.gov.bb/' }
    ],
    currency: 'Barbados Doları (BBD)',
    minimumWage: 'Ücret tabanı ve sektörel uygulamalar resmi kaynaklardan doğrulanmalıdır.',
    livingCost: 'Ada ekonomisi ve turistik bölgeler nedeniyle konaklama/yeme-içme maliyeti yükselebilir.',
    government: 'Parlamenter cumhuriyet',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle takip edilmelidir.',
    foodCulture: 'Karayip mutfağı, flying fish, deniz ürünleri ve rom kültürü öne çıkar.',
    famousPeople: ['Rihanna', 'Mia Mottley', 'Garfield Sobers', 'Obadele Thompson', 'Shontelle', 'Jofra Archer', 'Clyde Walcott', 'Desree', 'Grantley Adams', 'Barbados Joe']
  },
  DM: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'Dominica State College', url: 'https://dsc.edu.dm/' },
      { name: 'All Saints University School of Medicine', url: 'https://allsaintsu.org/' },
      { name: 'Ross University School of Medicine (regional reference)', url: 'https://medical.rossu.edu/' },
      { name: 'University of the West Indies Open Campus', url: 'https://www.open.uwi.edu/' },
      { name: 'IUGS Dominica', url: 'https://iugrad.edu.dm/' }
    ],
    places: ['Roseau', 'Boiling Lake', 'Trafalgar Falls', 'Cabrits National Park', 'Champagne Reef'],
    operators: [
      { name: 'Digicel Dominica', url: 'https://www.digicelgroup.com/dm/en.html' },
      { name: 'Flow Dominica', url: 'https://discoverflow.co/dominica/' },
      { name: 'Marpin Telecoms', url: 'https://www.marpin.dm/' }
    ],
    currency: 'Doğu Karayip Doları (XCD)',
    minimumWage: 'Resmi çalışma mevzuatı ve ücret düzenlemeleri kaynaklarından teyit edilmelidir.',
    livingCost: 'Ada lojistiği ve ithal ürün etkisi nedeniyle fiyatlar bölgesel olarak yükselebilir.',
    government: 'Parlamenter demokrasi',
    inflation: 'ECCB ve yerel resmi verilerle takip önerilir.',
    foodCulture: 'Karayip-Creole mutfağı; kök sebzeler, deniz ürünleri ve tropikal tatlar yaygındır.',
    famousPeople: ['Roosevelt Skerrit', 'Eugenia Charles', 'Jean Rhys', 'Thea LaFond', 'Lennox Honychurch', 'Ophelia Marie', 'Gordon Henderson', 'Kassav members (regional influence)', 'Benoit Bardouille', 'Alick Lazare']
  },
  MD: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'Moldova State University', url: 'https://usm.md/' },
      { name: 'Technical University of Moldova', url: 'https://utm.md/en/' },
      { name: 'Nicolae Testemițanu State University of Medicine and Pharmacy', url: 'https://usmf.md/en' },
      { name: 'Academy of Economic Studies of Moldova', url: 'https://ase.md/' },
      { name: 'Free International University of Moldova', url: 'https://ulim.md/' }
    ],
    places: ['Kişinev', 'Orheiul Vechi', 'Cricova Şarap Mahzenleri', 'Soroca Kalesi', 'Tiraspol (geçiş koşulu kontrolü)'],
    operators: [
      { name: 'Orange Moldova', url: 'https://www.orange.md/' },
      { name: 'Moldcell', url: 'https://www.moldcell.md/' },
      { name: 'Moldtelecom (Unite)', url: 'https://www.moldtelecom.md/' }
    ],
    currency: 'Moldova Leyi (MDL)',
    minimumWage: 'Asgari ücret ve sektör uygulamaları için resmi çalışma/ekonomi kurumlarının duyuruları teyit edilmelidir.',
    livingCost: 'Kişinev diğer şehirlere göre daha pahalıdır; konaklama ve ulaşım kalemleri bölgeye göre değişir.',
    government: 'Parlamenter cumhuriyet',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle dönemsel takip önerilir.',
    foodCulture: 'Doğu Avrupa-Balkan etkili mutfak; et, hamur işi ve şarap kültürü öne çıkar.',
    famousPeople: ['Maia Sandu', 'Igor Dodon', 'Dan Balan', 'Natalia Barbu', 'Dorin Chirtoacă', 'Sergiu Celibidache', 'Vladimir Voronin', 'Pavel Stratan', 'O-Zone', 'Ion Suruceanu']
  },
  VC: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'St. Vincent and the Grenadines Community College', url: 'https://svgcc.vc/' },
      { name: 'University of the West Indies Open Campus', url: 'https://www.open.uwi.edu/' },
      { name: 'St. James School of Medicine (Caribbean reference)', url: 'https://www.sjsm.org/' },
      { name: 'Teacher Education programmes (official refs)', url: 'https://www.gov.vc/' },
      { name: 'SVG Technical College references', url: 'https://www.gov.vc/' }
    ],
    places: ['Kingstown', 'Bequia', 'Mustique', 'Tobago Cays', 'La Soufrière Volcano'],
    operators: [
      { name: 'Flow SVG', url: 'https://discoverflow.co/st-vincent/' },
      { name: 'Digicel SVG', url: 'https://www.digicelgroup.com/vc/en.html' },
      { name: 'Government ICT references', url: 'https://www.gov.vc/' }
    ],
    currency: 'Doğu Karayip Doları (XCD)',
    minimumWage: 'Resmi çalışma mevzuatı ve ücret düzenlemeleri kaynaklarından teyit edilmelidir.',
    livingCost: 'Ada ekonomisi ve ithal ürün bağımlılığı nedeniyle maliyetler yükselebilir.',
    government: 'Parlamenter demokrasi (anayasal monarşi)',
    inflation: 'ECCB ve yerel resmi verilerle dönemsel takip önerilir.',
    foodCulture: 'Karayip mutfağı; deniz ürünleri, kök sebzeler ve baharatlı yerel yemekler öne çıkar.',
    famousPeople: ['Ralph Gonsalves', 'Shafiqua Maloney', 'Adonal Foyle', 'Kevin Lyttle', 'Hasely Crawford', 'Ellsworth Keane', 'Franklyn Stephenson', 'Kezia George', 'Basil Charles', 'Hugh Mulzac']
  },
  PY: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'Universidad Nacional de Asunción', url: 'https://www.una.py/' },
      { name: 'Universidad Católica Nuestra Señora de la Asunción', url: 'https://www.uc.edu.py/' },
      { name: 'Universidad Americana', url: 'https://americana.edu.py/' },
      { name: 'Universidad del Norte', url: 'https://www.uninorte.edu.py/' },
      { name: 'Universidad Autónoma de Asunción', url: 'https://www.uaa.edu.py/' }
    ],
    places: ['Asunción', 'Ciudad del Este', 'Encarnación', 'Itaipú çevresi', 'Jesuit Missions (Trinidad)'],
    operators: [
      { name: 'Tigo Paraguay', url: 'https://www.tigo.com.py/' },
      { name: 'Personal Paraguay', url: 'https://www.personal.com.py/' },
      { name: 'Claro Paraguay', url: 'https://www.claro.com.py/' }
    ],
    currency: 'Paraguay Guaranisi (PYG)',
    minimumWage: 'Ulusal asgari ücret resmi kararlarla güncellenir; güncel resmi duyuru teyidi gerekir.',
    livingCost: 'Asunción ve sınır ticaret bölgelerinde maliyet farklılık gösterebilir.',
    government: 'Başkanlık sistemi',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle takip önerilir.',
    foodCulture: 'Guaraní etkili mutfak; mısır, et ve peynirli yerel yemekler öne çıkar.',
    famousPeople: ['José Asunción Flores', 'Augusto Roa Bastos', 'Roque Santa Cruz', 'Carlos Antonio López', 'Alfredo Stroessner', 'Leryn Franco', 'Derlis González', 'Arsenio Erico', 'Berta Rojas', 'Lucas Barrios']
  },
  GT: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'Universidad de San Carlos de Guatemala', url: 'https://www.usac.edu.gt/' },
      { name: 'Universidad del Valle de Guatemala', url: 'https://www.uvg.edu.gt/' },
      { name: 'Universidad Francisco Marroquín', url: 'https://www.ufm.edu/' },
      { name: 'Universidad Rafael Landívar', url: 'https://principal.url.edu.gt/' },
      { name: 'Universidad Galileo', url: 'https://www.galileo.edu/' }
    ],
    places: ['Guatemala City', 'Antigua Guatemala', 'Lake Atitlán', 'Tikal', 'Semuc Champey'],
    operators: [
      { name: 'Tigo Guatemala', url: 'https://www.tigo.com.gt/' },
      { name: 'Claro Guatemala', url: 'https://www.claro.com.gt/' },
      { name: 'Telefónica / Movistar legacy references', url: 'https://www.telefonica.com/' }
    ],
    currency: 'Guatemala Quetzalı (GTQ)',
    minimumWage: 'Asgari ücret sektör ve iş koluna göre farklılaşabilir; resmi tablo teyidi önerilir.',
    livingCost: 'Antigua ve turistik bölgeler Guatemala City dışındaki yerlere göre pahalı olabilir.',
    government: 'Başkanlık sistemi',
    inflation: 'Merkez bankası ve resmi istatistik kurumuyla dönemsel takip edilmelidir.',
    foodCulture: 'Maya-Latin etkili mutfak; mısır, fasulye, tamale ve bölgesel soslar öne çıkar.',
    famousPeople: ['Rigoberta Menchú', 'Miguel Ángel Asturias', 'Bernardo Arévalo', 'Jimmy Morales', 'Carlos Ruiz', 'Ricardo Arjona', 'Óscar Isaac', 'Erick Barrondo', 'Luis von Ahn', 'Efraín Ríos Montt']
  },
  SV: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'Universidad de El Salvador', url: 'https://www.ues.edu.sv/' },
      { name: 'UCA El Salvador', url: 'https://uca.edu.sv/' },
      { name: 'Universidad Don Bosco', url: 'https://www.udb.edu.sv/' },
      { name: 'Universidad Tecnológica de El Salvador', url: 'https://www.utec.edu.sv/' },
      { name: 'ESEN', url: 'https://esen.edu.sv/' }
    ],
    places: ['San Salvador', 'Suchitoto', 'Ruta de las Flores', 'El Tunco / El Zonte', 'Santa Ana Volkanı çevresi'],
    operators: [
      { name: 'Tigo El Salvador', url: 'https://www.tigo.com.sv/' },
      { name: 'Claro El Salvador', url: 'https://www.claro.com.sv/' },
      { name: 'Telefónica legacy / local references', url: 'https://www.telefonica.com/' }
    ],
    currency: 'ABD Doları (USD)',
    minimumWage: 'Asgari ücret sektör bazında kategorilere ayrılabilir; resmi çalışma bakanlığı kaynakları kontrol edilmelidir.',
    livingCost: 'San Salvador ve sahil/turistik bölgelerde maliyet artabilir; güvenlik ve ulaşım planı önemlidir.',
    government: 'Başkanlık sistemi',
    inflation: 'Resmi veriler ve merkez bankası açıklamalarıyla dönemsel takip önerilir.',
    foodCulture: 'Pupusa başta olmak üzere mısır bazlı yemekler ve Orta Amerika mutfağı öne çıkar.',
    famousPeople: ['Nayib Bukele', 'Óscar Romero', 'Claudia Lars', 'Jorge González', 'Roque Dalton', 'Mauricio Funes', 'Ana Vilma de Escobar', 'Alfredo Cristiani', 'María Isabel Rodríguez', 'Alex Pineda Chacón']
  },
  BS: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'University of The Bahamas', url: 'https://www.ub.edu.bs/' },
      { name: 'Bahamas Technical and Vocational Institute', url: 'https://btvi.edu.bs/' },
      { name: 'UWI Open Campus Bahamas', url: 'https://www.open.uwi.edu/' },
      { name: 'Bahamas Baptist Community College', url: 'https://www.bbccbahamas.com/' },
      { name: 'National training and hospitality institutes (official refs)', url: 'https://www.bahamas.gov.bs/' }
    ],
    places: ['Nassau', 'Paradise Island', 'Exuma Cays', 'Eleuthera', 'Grand Bahama'],
    operators: [
      { name: 'BTC Bahamas', url: 'https://www.btcbahamas.com/' },
      { name: 'Aliv', url: 'https://www.bealiv.com/' },
      { name: 'REV', url: 'https://www.rev.bs/' }
    ],
    currency: 'Bahama Doları (BSD)',
    minimumWage: 'Ücret tabanı ve iş sözleşmesi koşulları için resmi iş gücü kaynakları teyit edilmelidir.',
    livingCost: 'Turistik adalarda yaşam maliyeti ve konaklama bedelleri yüksektir.',
    government: 'Parlamenter demokrasi (anayasal monarşi)',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle takip önerilir.',
    foodCulture: 'Karayip deniz ürünleri, conch yemekleri ve ada mutfağı öne çıkar.',
    famousPeople: ['Sidney Poitier', 'Lenny Kravitz', 'Shaunae Miller-Uibo', 'Buddy Hield', 'Deandre Ayton', 'Perry Christie', 'Hubert Ingraham', 'Linden Pindling', 'Rudy Grant', 'Nassau musicians (Baha Men)']
  },
  HN: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'Universidad Nacional Autónoma de Honduras', url: 'https://www.unah.edu.hn/' },
      { name: 'Universidad Tecnológica Centroamericana', url: 'https://www.unitec.edu/' },
      { name: 'Universidad Católica de Honduras', url: 'https://www.unicah.edu/' },
      { name: 'Universidad de San Pedro Sula', url: 'https://www.usap.edu/' },
      { name: 'Zamorano', url: 'https://www.zamorano.edu/' }
    ],
    places: ['Tegucigalpa', 'San Pedro Sula', 'Copán Ruinas', 'Roatán', 'Utila'],
    operators: [
      { name: 'Tigo Honduras', url: 'https://www.tigo.com.hn/' },
      { name: 'Claro Honduras', url: 'https://www.claro.com.hn/' },
      { name: 'Hondutel', url: 'https://www.hondutel.hn/' }
    ],
    currency: 'Honduras Lempirası (HNL)',
    minimumWage: 'Asgari ücret sektör ve ölçek bazında farklılaşabilir; resmi kaynaklar üzerinden teyit edilmelidir.',
    livingCost: 'Turistik adalar ve büyük şehir merkezlerinde maliyet daha yüksek olabilir.',
    government: 'Başkanlık sistemi',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle düzenli takip önerilir.',
    foodCulture: 'Orta Amerika mutfağı; tortilla, fasulye, deniz ürünleri ve muz bazlı yemekler yaygındır.',
    famousPeople: ['Francisco Morazán', 'Xiomara Castro', 'Juan Orlando Hernández', 'Carlos Mencia', 'David Suazo', 'Maynor Figueroa', 'Berta Cáceres', 'Amado Guevara', 'Teófimo López', 'José Cecilio del Valle']
  },
  TT: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'The University of the West Indies St. Augustine', url: 'https://sta.uwi.edu/' },
      { name: 'University of Trinidad and Tobago', url: 'https://utt.edu.tt/' },
      { name: 'COSTAATT', url: 'https://www.costaatt.edu.tt/' },
      { name: 'UWI Open Campus Trinidad and Tobago', url: 'https://www.open.uwi.edu/' },
      { name: 'University of the Southern Caribbean', url: 'https://usc.edu.tt/' }
    ],
    places: ['Port of Spain', 'San Fernando', 'Maracas Bay', 'Tobago / Pigeon Point', 'Asa Wright Nature Centre'],
    operators: [
      { name: 'bmobile', url: 'https://bmobile.co.tt/' },
      { name: 'Digicel Trinidad and Tobago', url: 'https://www.digicelgroup.com/tt/en.html' },
      { name: 'Flow Trinidad and Tobago', url: 'https://discoverflow.co/trinidad/' }
    ],
    currency: 'Trinidad ve Tobago Doları (TTD)',
    minimumWage: 'Asgari ücret ve iş hukuku detayları için resmi çalışma bakanlığı kaynakları kontrol edilmelidir.',
    livingCost: 'Port of Spain ve enerji sektörüne bağlı bölgelerde maliyet artabilir.',
    government: 'Parlamenter cumhuriyet',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle dönemsel takip önerilir.',
    foodCulture: 'Karayip-Hint etkili mutfak; doubles, roti ve sokak yemekleri öne çıkar.',
    famousPeople: ['Brian Lara', 'Nicki Minaj', 'Machel Montano', 'Ato Boldon', 'Hasely Crawford', 'V.S. Naipaul', 'Calypso Rose', 'Dwight Yorke', 'Sundar Popo', 'Shivnarine Chanderpaul']
  },
  ZA: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'University of Cape Town', url: 'https://www.uct.ac.za/' },
      { name: 'University of the Witwatersrand', url: 'https://www.wits.ac.za/' },
      { name: 'Stellenbosch University', url: 'https://www.sun.ac.za/english' },
      { name: 'University of Pretoria', url: 'https://www.up.ac.za/' },
      { name: 'University of Johannesburg', url: 'https://www.uj.ac.za/' }
    ],
    places: ['Cape Town', 'Johannesburg', 'Kruger National Park', 'Garden Route', 'Durban'],
    operators: [
      { name: 'Vodacom', url: 'https://www.vodacom.co.za/' },
      { name: 'MTN South Africa', url: 'https://www.mtn.co.za/' },
      { name: 'Cell C', url: 'https://www.cellc.co.za/' },
      { name: 'Telkom Mobile', url: 'https://www.telkom.co.za/' }
    ],
    currency: 'Güney Afrika Randı (ZAR)',
    minimumWage: 'Ulusal asgari ücret resmi kararlarla güncellenir; sektör istisnaları için resmi mevzuat kontrol edilmelidir.',
    livingCost: 'Cape Town ve Johannesburg’da konut/mobilite maliyetleri yükselir; konum seçimi bütçeyi etkiler.',
    government: 'Parlamenter cumhuriyet',
    inflation: 'SARB ve resmi istatistik kurumu verileriyle dönemsel takip önerilir.',
    foodCulture: 'Çok kültürlü mutfak; braai, Cape Malay etkisi ve bölgesel et yemekleri öne çıkar.',
    famousPeople: ['Nelson Mandela', 'Desmond Tutu', 'Charlize Theron', 'Trevor Noah', 'Elon Musk', 'Caster Semenya', 'Siya Kolisi', 'Miriam Makeba', 'Nadine Gordimer', 'J.R.R. Tolkien']
  },
  JM: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'University of the West Indies Mona', url: 'https://www.mona.uwi.edu/' },
      { name: 'University of Technology, Jamaica', url: 'https://www.utech.edu.jm/' },
      { name: 'University of the Commonwealth Caribbean', url: 'https://ucc.edu.jm/' },
      { name: 'Northern Caribbean University', url: 'https://www.ncu.edu.jm/' },
      { name: 'Edna Manley College', url: 'https://emc.edu.jm/' }
    ],
    places: ['Kingston', 'Montego Bay', 'Negril', 'Ocho Rios', 'Blue Mountains'],
    operators: [
      { name: 'Digicel Jamaica', url: 'https://www.digicelgroup.com/jm/en.html' },
      { name: 'Flow Jamaica', url: 'https://discoverflow.co/jamaica/' },
      { name: 'Government telecom references', url: 'https://www.gov.jm/' }
    ],
    currency: 'Jamaika Doları (JMD)',
    minimumWage: 'Asgari ücret düzenlemeleri resmi çalışma bakanlığı kaynaklarından teyit edilmelidir.',
    livingCost: 'Turistik kıyı bölgelerinde maliyet yükselir; şehir ve resort farkı belirgindir.',
    government: 'Parlamenter demokrasi (anayasal monarşi)',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle takip edilmelidir.',
    foodCulture: 'Jerk mutfağı, ackee and saltfish ve Karayip baharat profili öne çıkar.',
    famousPeople: ['Bob Marley', 'Usain Bolt', 'Shelly-Ann Fraser-Pryce', 'Sean Paul', 'Jimmy Cliff', 'Shaggy', 'Marcus Garvey', 'Portia Simpson-Miller', 'Yohan Blake', 'Louise Bennett-Coverley']
  },
  NI: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'UNAN', url: 'https://www.unan.edu.ni/' },
      { name: 'UCA Nicaragua', url: 'https://www.uca.edu.ni/' },
      { name: 'UAM Nicaragua', url: 'https://uam.edu.ni/' },
      { name: 'Universidad Nacional de Ingeniería', url: 'https://www.uni.edu.ni/' },
      { name: 'INCAE Business School', url: 'https://www.incae.edu/' }
    ],
    places: ['Managua', 'Granada', 'León', 'Ometepe', 'San Juan del Sur'],
    operators: [
      { name: 'Claro Nicaragua', url: 'https://www.claro.com.ni/' },
      { name: 'Tigo Nicaragua', url: 'https://www.tigo.com.ni/' },
      { name: 'Telcor resmi iletişim referansı', url: 'https://www.telcor.gob.ni/' }
    ],
    currency: 'Nikaragua Córdoba’sı (NIO)',
    minimumWage: 'Asgari ücret sektör bazında kategorilere göre belirlenebilir; resmi kaynak teyidi gereklidir.',
    livingCost: 'Turistik bölgeler ve şehir merkezlerinde konaklama maliyeti artabilir.',
    government: 'Başkanlık sistemi',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle dönemsel takip önerilir.',
    foodCulture: 'Mısır, fasulye, et ve tropikal ürün ağırlıklı Orta Amerika mutfağı yaygındır.',
    famousPeople: ['Rubén Darío', 'Daniel Ortega', 'Violeta Chamorro', 'Bianca Jagger', 'Alexis Argüello', 'Ernesto Cardenal', 'Gioconda Belli', 'Carlos Mejía Godoy', 'Román González', 'Sergio Ramírez']
  },
  VU: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'University of the South Pacific (Vanuatu campus)', url: 'https://www.usp.ac.fj/' },
      { name: 'Vanuatu Institute of Technology', url: 'https://www.vit.edu.vu/' },
      { name: 'Vanuatu Agriculture College (official references)', url: 'https://www.gov.vu/' },
      { name: 'USP Emalus Campus', url: 'https://www.usp.ac.fj/index.php?id=emalus' },
      { name: 'Ministry of Education training references', url: 'https://moet.gov.vu/' }
    ],
    places: ['Port Vila', 'Espiritu Santo', 'Champagne Beach', 'Mount Yasur', 'Blue Holes'],
    operators: [
      { name: 'Vodafone Vanuatu', url: 'https://www.vodafone.com.vu/' },
      { name: 'Digicel Vanuatu', url: 'https://www.digicelgroup.com/vu/en.html' },
      { name: 'TVL', url: 'https://www.tvl.vu/' }
    ],
    currency: 'Vanuatu Vatusu (VUV)',
    minimumWage: 'Çalışma koşulları ve ücret düzenlemeleri için resmi kurum kaynaklarıyla teyit önerilir.',
    livingCost: 'Ada lojistiği ve ithalat nedeniyle maliyetler yüksek olabilir; turistik adalarda fark artar.',
    government: 'Parlamenter cumhuriyet',
    inflation: 'Merkez bankası ve resmi verilerle dönemsel takip edilmelidir.',
    foodCulture: 'Melanezya etkili ada mutfağı; kök sebzeler, deniz ürünleri ve yerel pişirme yöntemleri yaygındır.',
    famousPeople: ['Walter Lini', 'Charlot Salwai', 'Ralph Regenvanu', 'Grace Mera Molisa', 'Joe Natuman', 'Ishmael Kalsakau', 'Moses Kahu', 'Sela Molisa', 'Bule Jitamas', 'Bing Obed']
  },
  BO: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'Universidad Mayor de San Andrés (UMSA)', url: 'https://www.umsa.bo/' },
      { name: 'Universidad Mayor de San Simón', url: 'https://www.umss.edu.bo/' },
      { name: 'Universidad Católica Boliviana', url: 'https://www.ucb.edu.bo/' },
      { name: 'Universidad Privada Boliviana', url: 'https://www.upb.edu/' },
      { name: 'Universidad Autónoma Gabriel René Moreno', url: 'https://www.uagrm.edu.bo/' }
    ],
    places: ['La Paz', 'Salar de Uyuni', 'Sucre', 'Santa Cruz de la Sierra', 'Titicaca Gölü (Bolivya tarafı)'],
    operators: [
      { name: 'Entel Bolivia', url: 'https://www.entel.bo/' },
      { name: 'Tigo Bolivia', url: 'https://www.tigo.com.bo/' },
      { name: 'Viva Bolivia', url: 'https://www.viva.com.bo/' }
    ],
    currency: 'Bolivya Bolivianosu (BOB)',
    minimumWage: 'Ulusal asgari ücret düzenli güncellenir; resmi çalışma/ekonomi kaynaklarından teyit edilmelidir.',
    livingCost: 'La Paz ve Santa Cruz arasında maliyet farkı olabilir; rakım ve ulaşım planı bütçeyi etkiler.',
    government: 'Başkanlık sistemi',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle takip önerilir.',
    foodCulture: 'And bölgesi ve yerel topluluk etkili mutfak; mısır, patates ve et yemekleri öne çıkar.',
    famousPeople: ['Evo Morales', 'Luis Arce', 'Marcelo Martins', 'Jaime Escalante', 'Alcides Arguedas', 'Marina Núñez del Prado', 'Eduardo Abaroa', 'Sonia Falcone', 'Lidia Gueiler', 'Carlos Mesa']
  },
  BZ: {
    updatedAt: '2026-02-23',
    schools: [
      { name: 'University of Belize', url: 'https://www.ub.edu.bz/' },
      { name: 'Galen University', url: 'https://galen.edu.bz/' },
      { name: 'Sacred Heart Junior College', url: 'https://www.shjc.edu.bz/' },
      { name: 'Belize Medical College', url: 'https://www.belizemedicalcollege.org/' },
      { name: 'UWI Open Campus (Belize references)', url: 'https://www.open.uwi.edu/' }
    ],
    places: ['Belize City', 'Ambergris Caye (San Pedro)', 'Caye Caulker', 'Great Blue Hole', 'San Ignacio / Maya kalıntıları'],
    operators: [
      { name: 'Digi Belize', url: 'https://www.livedigi.com/' },
      { name: 'Smart Belize', url: 'https://www.smart.com.bz/' },
      { name: 'Belize Telemedia', url: 'https://www.btl.com.bz/' }
    ],
    currency: 'Belize Doları (BZD)',
    minimumWage: 'Asgari ücret ve çalışma koşulları için resmi iş gücü kaynaklarıyla teyit önerilir.',
    livingCost: 'Adalar ve turistik kıyı bölgeleri iç bölgelere göre daha pahalı olabilir.',
    government: 'Parlamenter demokrasi (anayasal monarşi)',
    inflation: 'Merkez bankası ve resmi verilerle dönemsel takip edilmelidir.',
    foodCulture: 'Karayip, Maya ve Latin etkili mutfak; deniz ürünleri ve pirinç-fasulye yaygındır.',
    famousPeople: ['George Cadle Price', 'Dean Barrow', 'John Briceño', 'Andy Palacio', 'Philip Goldson', 'Wilfred Peters', 'Marion Jones', 'Thea Garcia-Ramirez', 'Jules Vasquez', 'Leila Vernon']
  },
  GY: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'University of Guyana', url: 'https://uog.edu.gy/' },
      { name: 'Texila American University (Guyana campus)', url: 'https://tauedu.org/' },
      { name: 'Government Technical Institute (education refs)', url: 'https://education.gov.gy/' },
      { name: 'Cyril Potter College of Education', url: 'https://education.gov.gy/' },
      { name: 'UG Berbice Campus', url: 'https://uog.edu.gy/' }
    ],
    places: ['Georgetown', 'Kaieteur Şelalesi', 'Iwokrama Rainforest', 'Essequibo kıyıları', 'Rupununi Savannah'],
    operators: [
      { name: 'GTT', url: 'https://gtt.co.gy/' },
      { name: 'Digicel Guyana', url: 'https://www.digicelgroup.com/gy/en.html' },
      { name: 'ENet', url: 'https://www.enetgy.com/' }
    ],
    currency: 'Guyana Doları (GYD)',
    minimumWage: 'Asgari ücret ve kamu/özel sektör farklılıkları için resmi çalışma kaynakları teyit edilmelidir.',
    livingCost: 'Georgetown ve petrol ekonomisi etkili bölgelerde konut maliyetleri artabilir.',
    government: 'Başkanlık sistemi',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle dönemsel takip önerilir.',
    foodCulture: 'Hint-Karayip etkili mutfak; köri, pirinç ve deniz ürünleri öne çıkar.',
    famousPeople: ['Cheddi Jagan', 'Forbes Burnham', 'Irfaan Ali', 'Shivnarine Chanderpaul', 'Rohan Kanhai', 'Eddy Grant', 'Clive Lloyd', 'CCH Pounder', 'Walter Rodney', 'Mia Mottley']
  },
  AM: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'Yerevan State University', url: 'https://www.ysu.am/en' },
      { name: 'American University of Armenia', url: 'https://aua.am/' },
      { name: 'National Polytechnic University of Armenia', url: 'https://polytech.am/en/' },
      { name: 'Yerevan State Medical University', url: 'https://ysmu.am/en/' },
      { name: 'French University in Armenia', url: 'https://ufar.am/' }
    ],
    places: ['Erivan', 'Garni Tapınağı', 'Geghard Manastırı', 'Sevan Gölü', 'Dilijan'],
    operators: [
      { name: 'Viva Armenia', url: 'https://www.viva.am/' },
      { name: 'Team Telecom Armenia', url: 'https://www.telecomarmenia.am/' },
      { name: 'Ucom', url: 'https://www.ucom.am/' }
    ],
    currency: 'Ermenistan Dramı (AMD)',
    minimumWage: 'Ulusal asgari ücret resmi kararlarla güncellenir; güncel rakam resmi kaynaklardan teyit edilmelidir.',
    livingCost: 'Erivan diğer şehirlere göre daha maliyetlidir; kısa dönem kiralarda fiyatlar artabilir.',
    government: 'Parlamenter cumhuriyet',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle takip önerilir.',
    foodCulture: 'Kafkas mutfağı; et, hamur işi, otlar ve tandır benzeri pişirme kültürü öne çıkar.',
    famousPeople: ['Serj Tankian', 'Charles Aznavour', 'Henrikh Mkhitaryan', 'Nikol Pashinyan', 'Aram Khachaturian', 'Tigran Petrosian', 'Parajanov', 'Levon Aronian', 'Sirusho', 'Hovhannes Tumanyan']
  },
  WS: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'National University of Samoa', url: 'https://nus.edu.ws/' },
      { name: 'Samoa Polytechnic legacy (NUS faculties)', url: 'https://nus.edu.ws/' },
      { name: 'Leififi College / teacher training refs', url: 'https://www.mesc.gov.ws/' },
      { name: 'USP Samoa campus (regional)', url: 'https://www.usp.ac.fj/' },
      { name: 'Samoa Qualifications Authority refs', url: 'https://www.sqa.gov.ws/' }
    ],
    places: ['Apia', 'To Sua Ocean Trench', 'Lalomanu Beach', 'Upolu adası şelaleleri', 'Savai’i'],
    operators: [
      { name: 'Digicel Samoa', url: 'https://www.digicelgroup.com/ws/en.html' },
      { name: 'Vodafone Samoa', url: 'https://vodafone.ws/' },
      { name: 'Bluesky Samoa', url: 'https://blueskysamoa.ws/' }
    ],
    currency: 'Samoa Talası (WST)',
    minimumWage: 'Resmi ücret düzenlemeleri ve kamu/özel sektör koşulları için resmi kaynak teyidi önerilir.',
    livingCost: 'Ada lojistiği ve ithal ürün etkisi nedeniyle maliyetler yükselir.',
    government: 'Parlamenter demokrasi',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle takip edilmelidir.',
    foodCulture: 'Polinezya ada mutfağı; deniz ürünleri, hindistancevizi ve kök sebzeler öne çıkar.',
    famousPeople: ['Fiame Naomi Mataʻafa', 'Malietoa Tanumafili II', 'David Tua', 'Dwayne Johnson (Samoa köken bağlantısı)', 'Tofilau Eti Alesana', 'Valerie Adams (Samoa kökeni)', 'Brian Lima', 'Albert Wendt', 'Lemi Ponifasio', 'Samoa rugby oyuncuları']
  },
  FJ: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'University of the South Pacific', url: 'https://www.usp.ac.fj/' },
      { name: 'Fiji National University', url: 'https://www.fnu.ac.fj/' },
      { name: 'University of Fiji', url: 'https://www.unifiji.ac.fj/' },
      { name: 'Sangam Institute of Technology refs', url: 'https://www.education.gov.fj/' },
      { name: 'Fiji School of Medicine history/health faculties', url: 'https://www.fnu.ac.fj/' }
    ],
    places: ['Nadi', 'Suva', 'Mamanuca Adaları', 'Yasawa Adaları', 'Pacific Harbour'],
    operators: [
      { name: 'Vodafone Fiji', url: 'https://www.vodafone.com.fj/' },
      { name: 'Digicel Fiji', url: 'https://www.digicelgroup.com/fj/en.html' },
      { name: 'Inkk Mobile', url: 'https://www.inkk.com.fj/' }
    ],
    currency: 'Fiji Doları (FJD)',
    minimumWage: 'Asgari ücret ve sektör uygulamaları resmi çalışma mevzuatı kaynaklarından doğrulanmalıdır.',
    livingCost: 'Turistik adalar ve resort bölgelerinde maliyet yüksektir; ana adalarda daha dengelidir.',
    government: 'Parlamenter cumhuriyet',
    inflation: 'Merkez bankası ve resmi verilerle dönemsel takip önerilir.',
    foodCulture: 'Hint-Pasifik ada etkili mutfak; deniz ürünleri, köri ve tropikal ürünler öne çıkar.',
    famousPeople: ['Waisale Serevi', 'Frank Bainimarama', 'Sitiveni Rabuka', 'Semi Radradra', 'Nemani Nadolo', 'Vilimoni Delasau', 'Litia Cava', 'Mick Beddoes', 'Jese Saukuru', 'Bula FM artists']
  },
  SR: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'Anton de Kom University of Suriname', url: 'https://www.uvs.edu/' },
      { name: 'Institute for Graduate Studies and Research (Anton de Kom)', url: 'https://www.uvs.edu/' },
      { name: 'Polytechnic College Suriname refs', url: 'https://gov.sr/' },
      { name: 'Teacher training institutes (official refs)', url: 'https://gov.sr/' },
      { name: 'Medical training institutions references', url: 'https://gov.sr/' }
    ],
    places: ['Paramaribo', 'Brownsberg', 'Commewijne', 'Galibi', 'Suriname Nehri rotaları'],
    operators: [
      { name: 'Telesur', url: 'https://www.telesur.sr/' },
      { name: 'Digicel Suriname', url: 'https://www.digicelgroup.com/sr/en.html' },
      { name: 'Parbonet', url: 'https://www.parbo.net/' }
    ],
    currency: 'Surinam Doları (SRD)',
    minimumWage: 'Asgari ücret ve çalışma koşulları için resmi çalışma kurumlarının güncel duyuruları teyit edilmelidir.',
    livingCost: 'Paramaribo merkezinde maliyet daha yüksek olabilir; ithal ürünler bütçeyi etkiler.',
    government: 'Başkanlık sistemi',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle yakından takip önerilir.',
    foodCulture: 'Çok kültürlü mutfak; Hint, Cava, Creole ve Hollanda etkileri birlikte görülür.',
    famousPeople: ['Desi Bouterse', 'Chan Santokhi', 'Clarence Seedorf', 'Ruud Gullit (Surinam kökeni)', 'Edgar Davids (Surinam kökeni)', 'Astrid Roemer', 'Anthony Nesty', 'Ronnie Brunswijk', 'Tyrone Spong', 'Jeangu Macrooy']
  },
  BW: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'University of Botswana', url: 'https://www.ub.bw/' },
      { name: 'Botswana International University of Science and Technology', url: 'https://www.biust.ac.bw/' },
      { name: 'Botswana Open University', url: 'https://www.bou.ac.bw/' },
      { name: 'Botswana Accountancy College', url: 'https://www.bac.ac.bw/' },
      { name: 'Limkokwing University Botswana', url: 'https://www.limkokwing.net/botswana/' }
    ],
    places: ['Gaborone', 'Okavango Delta', 'Chobe National Park', 'Makgadikgadi Pans', 'Kasane'],
    operators: [
      { name: 'Mascom', url: 'https://www.mascom.bw/' },
      { name: 'Orange Botswana', url: 'https://www.orange.co.bw/' },
      { name: 'BTC Mobile', url: 'https://www.btc.bw/' }
    ],
    currency: 'Botsvana Pulası (BWP)',
    minimumWage: 'Asgari ücret ve sektör koşulları için resmi çalışma bakanlığı kaynaklarıyla teyit edilmelidir.',
    livingCost: 'Gaborone ve safari odaklı bölgelerde konaklama maliyeti yükselir.',
    government: 'Parlamenter cumhuriyet',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle dönemsel takip önerilir.',
    foodCulture: 'Güney Afrika etkili mutfak; et, mısır unu yemekleri ve yerel geleneksel tabaklar öne çıkar.',
    famousPeople: ['Ian Khama', 'Mokgweetsi Masisi', 'Amantle Montsho', 'Letsile Tebogo', 'Mpule Kwelagobe', 'Unity Dow', 'Samantha Mogwe', 'Duma Boko', 'Refilwe Modiselle', 'Tshepo Mmolotsi']
  },
  TO: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'University of the South Pacific (Tonga campus)', url: 'https://www.usp.ac.fj/' },
      { name: 'Tonga Institute of Higher Education', url: 'https://www.tieh.to/' },
      { name: 'Tonga National University references', url: 'https://www.gov.to/' },
      { name: 'Teacher training institutions (official refs)', url: 'https://www.education.gov.to/' },
      { name: 'Atenisi University', url: 'https://www.atenisi.edu.to/' }
    ],
    places: ['Nukuʻalofa', 'Tongatapu', 'Vavaʻu', 'Haʻapai', 'Mapuʻa ʻa Vaea blowholes'],
    operators: [
      { name: 'Digicel Tonga', url: 'https://www.digicelgroup.com/to/en.html' },
      { name: 'TCC (UCall)', url: 'https://www.tcc.to/' },
      { name: 'Tonga Communications Corporation ISP', url: 'https://www.tcc.to/' }
    ],
    currency: 'Tonga Paʻangası (TOP)',
    minimumWage: 'Ücret düzenlemeleri ve kamu/özel sektör uygulamaları için resmi kaynak teyidi önerilir.',
    livingCost: 'Ada lojistiği ve ithalat maliyetleri günlük yaşam giderlerini yükseltebilir.',
    government: 'Anayasal monarşi',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle takip edilmelidir.',
    foodCulture: 'Polinezya mutfağı; kök sebzeler, deniz ürünleri ve ortak ada pişirme kültürü öne çıkar.',
    famousPeople: ['Kral Tupou VI', 'ʻAkilisi Pōhiva', 'Pita Taufatofua', 'Israel Folau (Tonga kökeni)', 'Mako Vunipola (Tonga kökeni)', 'Sonatane Takulua', 'Feʻao Vunipola', 'Uli Latukefu', 'Taufaʻahau Tupou IV', 'Princess Pilolevu']
  },
  PW: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'Palau Community College', url: 'https://pcc.palau.edu/' },
      { name: 'Palau High School / education ministry refs', url: 'https://www.palaumoe.net/' },
      { name: 'PCC School of Nursing', url: 'https://pcc.palau.edu/' },
      { name: 'USP / regional higher education references', url: 'https://www.usp.ac.fj/' },
      { name: 'Palau Ministry of Education training refs', url: 'https://www.palaumoe.net/' }
    ],
    places: ['Koror', 'Rock Islands', 'Jellyfish Lake (erişim durumu kontrolü)', 'Peleliu', 'Ngardmau Waterfall'],
    operators: [
      { name: 'Palau National Communications Corp (PNCC)', url: 'https://www.pnccpalau.com/' },
      { name: 'PalauTel / PNCC mobile', url: 'https://www.pnccpalau.com/' },
      { name: 'Regional eSIM/roaming providers', url: 'https://www.palaugov.pw/' }
    ],
    currency: 'ABD Doları (USD)',
    minimumWage: 'Asgari ücret ve iş koşulları için resmi çalışma mevzuatı kaynaklarıyla teyit önerilir.',
    livingCost: 'Ada lojistiği ve turizm nedeniyle konaklama ve gıda maliyeti yüksek olabilir.',
    government: 'Başkanlık sistemi',
    inflation: 'Resmi veriler ve ABD dolar bazlı fiyat hareketleri birlikte izlenmelidir.',
    foodCulture: 'Pasifik ada mutfağı; deniz ürünleri, tropikal ürünler ve Asya etkili yemekler görülür.',
    famousPeople: ['Surangel Whipps Jr.', 'Tommy Remengesau Jr.', 'Kuniwo Nakamura', 'Johnson Toribiong', 'Sandra Pierantozzi', 'Ngiratkel Etpison', 'Elbuchel Sadang', 'Bethwel Henry', 'Caleb Otto', 'Palau kamu figürleri']
  },
  NA: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'University of Namibia', url: 'https://www.unam.edu.na/' },
      { name: 'Namibia University of Science and Technology', url: 'https://www.nust.na/' },
      { name: 'International University of Management', url: 'https://www.ium.edu.na/' },
      { name: 'Welwitchia University', url: 'https://welwitchia.com.na/' },
      { name: 'Namibia College of Open Learning refs', url: 'https://www.namcol.edu.na/' }
    ],
    places: ['Windhoek', 'Etosha National Park', 'Swakopmund', 'Sossusvlei', 'Skeleton Coast'],
    operators: [
      { name: 'MTC Namibia', url: 'https://www.mtc.com.na/' },
      { name: 'Telecom Namibia', url: 'https://www.telecom.na/' },
      { name: 'TN Mobile / Leo', url: 'https://www.telecom.na/' }
    ],
    currency: 'Namibya Doları (NAD)',
    minimumWage: 'Sektör bazlı ücret uygulamaları farklılaşabilir; resmi çalışma kaynakları teyit edilmelidir.',
    livingCost: 'Windhoek ve turistik rota şehirlerinde maliyet artabilir; araç kiralama bütçesi önemlidir.',
    government: 'Yarı başkanlık sistemi',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle dönemsel takip önerilir.',
    foodCulture: 'Güney Afrika etkili mutfak; et, oyun eti ve Alman kolonyal etkili tatlar görülür.',
    famousPeople: ['Hage Geingob', 'Sam Nujoma', 'Nangolo Mbumba', 'Frank Fredericks', 'The Dogg', 'Top Cheri', 'Patricia Olivier', 'Behati Prinsloo', 'Netumbo Nandi-Ndaitwah', 'Brave Warriors oyuncuları']
  },
  BY: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'Belarusian State University', url: 'https://bsu.by/en/' },
      { name: 'Belarusian National Technical University', url: 'https://bntu.by/en' },
      { name: 'Belarusian State Medical University', url: 'https://www.bsmu.by/en/' },
      { name: 'Yanka Kupala State University of Grodno', url: 'https://en.grsu.by/' },
      { name: 'Belarus State Economic University', url: 'http://bseu.by/en/' }
    ],
    places: ['Minsk', 'Nesvizh Castle', 'Mir Castle', 'Brest Fortress', 'Belovezhskaya Pushcha'],
    operators: [
      { name: 'A1 Belarus', url: 'https://www.a1.by/' },
      { name: 'MTS Belarus', url: 'https://www.mts.by/' },
      { name: 'life:) Belarus', url: 'https://www.life.com.by/' }
    ],
    currency: 'Belarus Rublesi (BYN)',
    minimumWage: 'Asgari ücret resmi kararlarla güncellenir; yaptırım ve ekonomik koşullar nedeniyle güncel teyit önemlidir.',
    livingCost: 'Minsk merkezinde maliyet diğer şehirlere göre daha yüksektir.',
    government: 'Başkanlık sistemi',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle dönemsel takip önerilir.',
    foodCulture: 'Doğu Avrupa mutfağı; patates, et ve çorba kültürü öne çıkar.',
    famousPeople: ['Alexander Lukashenko', 'Svetlana Alexievich', 'Aryna Sabalenka', 'Victoria Azarenka', 'Marc Chagall', 'Maksim Mirnyi', 'Darya Domracheva', 'Ruslan Salei', 'Pyotr Klimuk', 'Yanka Kupala']
  },
  KG: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'Kyrgyz National University', url: 'https://www.knu.kg/' },
      { name: 'American University of Central Asia', url: 'https://auca.kg/' },
      { name: 'Kyrgyz State Technical University', url: 'https://kstu.kg/' },
      { name: 'Kyrgyz State Medical Academy', url: 'https://kgma.kg/' },
      { name: 'OSCE Academy in Bishkek', url: 'https://osce-academy.net/' }
    ],
    places: ['Bişkek', 'Issık Göl', 'Karakol', 'Ala Archa National Park', 'Song-Köl'],
    operators: [
      { name: 'Beeline Kyrgyzstan', url: 'https://beeline.kg/' },
      { name: 'O!', url: 'https://o.kg/' },
      { name: 'MegaCom', url: 'https://megacom.kg/' }
    ],
    currency: 'Kırgızistan Somu (KGS)',
    minimumWage: 'Asgari ücret ve sektör koşulları için resmi çalışma kaynaklarıyla teyit önerilir.',
    livingCost: 'Bişkek ve turistik dağ/rezerv bölgelerinde maliyet artabilir; sezon etkisi yüksektir.',
    government: 'Parlamenter-başkanlık karışık yapı (cumhuriyet)',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle takip edilmelidir.',
    foodCulture: 'Orta Asya mutfağı; et, hamur işi, süt ürünleri ve çay kültürü öne çıkar.',
    famousPeople: ['Cengiz Aytmatov', 'Kurmanjan Datka', 'Sadyr Japarov', 'Roza Otunbayeva', 'Toktogul Satylganov', 'Ormon Khan', 'Valentina Shevchenko (Kırgız doğumlu)', 'Aisuluu Tynybekova', 'Denis Petrashov', 'Sapar Isakov']
  },
  MN: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'National University of Mongolia', url: 'https://www.num.edu.mn/en/' },
      { name: 'Mongolian University of Science and Technology', url: 'https://www.must.edu.mn/en/' },
      { name: 'Mongolian National University of Medical Sciences', url: 'https://mnums.edu.mn/' },
      { name: 'University of Finance and Economics', url: 'https://www.ufe.edu.mn/' },
      { name: 'Mongolian State University of Education', url: 'https://msue.edu.mn/' }
    ],
    places: ['Ulan Batur', 'Terelj National Park', 'Gobi Çölü', 'Khuvsgul Gölü', 'Karakorum'],
    operators: [
      { name: 'MobiCom', url: 'https://www.mobicom.mn/' },
      { name: 'Unitel', url: 'https://www.unitel.mn/' },
      { name: 'Skytel', url: 'https://www.skytel.mn/' },
      { name: 'G-Mobile', url: 'https://www.gmobile.mn/' }
    ],
    currency: 'Moğol Tugriki (MNT)',
    minimumWage: 'Ulusal asgari ücret resmi kararlarla güncellenir; güncel tutar resmi kaynaklardan doğrulanmalıdır.',
    livingCost: 'Ulan Batur ve kış sezonunda ısınma/ulaşım maliyetleri bütçeyi etkiler.',
    government: 'Parlamenter cumhuriyet',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle dönemsel takip önerilir.',
    foodCulture: 'Bozkır kültürü etkili mutfak; et, süt ürünleri ve hamur işi ağırlıklıdır.',
    famousPeople: ['Cengiz Han', 'Sühbaatar', 'Khaltmaagiin Battulga', 'Ukhnaagiin Khürelsükh', 'The Hu (müzik grubu)', 'G. Mend-Ooyo', 'Naran (şarkıcı)', 'Munkhbat Urantsetseg', 'Dolgorsürengiin Dagvadorj (Asashoryu)', 'Mongolian throat singers']
  },
  UZ: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'National University of Uzbekistan', url: 'https://nuu.uz/en/' },
      { name: 'Tashkent State Technical University', url: 'https://tdtu.uz/' },
      { name: 'Westminster International University in Tashkent', url: 'https://www.wiut.uz/' },
      { name: 'Tashkent Medical Academy', url: 'https://tma.uz/' },
      { name: 'University of World Economy and Diplomacy', url: 'https://uwed.uz/en/' }
    ],
    places: ['Taşkent', 'Semerkant', 'Buhara', 'Hive', 'Çimgan / Charvak'],
    operators: [
      { name: 'Beeline Uzbekistan', url: 'https://beeline.uz/' },
      { name: 'Ucell', url: 'https://ucell.uz/' },
      { name: 'Mobiuz', url: 'https://mobi.uz/' },
      { name: 'Uzmobile', url: 'https://uztelecom.uz/' }
    ],
    currency: 'Özbek Somu (UZS)',
    minimumWage: 'Asgari ücret ve ücret tabanı resmi kararlarla güncellenir; resmi kaynak teyidi önerilir.',
    livingCost: 'Taşkent diğer şehirlere göre daha pahalı olabilir; turistik şehirlerde sezon etkisi görülebilir.',
    government: 'Başkanlık sistemi',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle dönemsel takip önerilir.',
    foodCulture: 'Orta Asya mutfağı; pilav, kebap, hamur işleri ve çay kültürü belirgindir.',
    famousPeople: ['İslam Kerimov', 'Şevket Mirziyoyev', 'Alisher Navoi', 'Amir Timur', 'Ulug Bey', 'Yulduz Usmonova', 'Oksana Chusovitina', 'Server Jeparov', 'Behzod Abduraimov', 'Ravshan Irmatov']
  },
  SN: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'Cheikh Anta Diop University', url: 'https://www.ucad.sn/' },
      { name: 'Gaston Berger University', url: 'https://ugb.sn/' },
      { name: 'Université Alioune Diop de Bambey', url: 'https://uadb.edu.sn/' },
      { name: 'Université Assane Seck de Ziguinchor', url: 'https://www.univ-zig.sn/' },
      { name: 'Institut Supérieur de Management (ISM)', url: 'https://www.groupeism.sn/' }
    ],
    places: ['Dakar', 'Île de Gorée', 'Saint-Louis', 'Saly', 'Lac Rose çevresi'],
    operators: [
      { name: 'Orange Sénégal', url: 'https://www.orange.sn/' },
      { name: 'Free Sénégal', url: 'https://www.free.sn/' },
      { name: 'Expresso Sénégal', url: 'https://www.expressotelecom.sn/' }
    ],
    currency: 'Batı Afrika CFA Frangı (XOF)',
    minimumWage: 'Ücret tabanı ve sektör uygulamaları için resmi çalışma kaynaklarından teyit önerilir.',
    livingCost: 'Dakar ve turistik kıyı bölgelerinde maliyet daha yüksektir.',
    government: 'Başkanlık sistemi',
    inflation: 'BCEAO ve resmi istatistik verileriyle dönemsel takip önerilir.',
    foodCulture: 'Batı Afrika mutfağı; pirinç, balık, yer fıstığı sosları ve baharatlar öne çıkar.',
    famousPeople: ['Léopold Sédar Senghor', 'Youssou N\'Dour', 'Sadio Mané', 'Ousmane Sonko', 'Macky Sall', 'Akon', 'Omar Pene', 'Djibril Diop Mambéty', 'Aminata Sow Fall', 'Cheikh Anta Diop']
  },
  KI: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'University of the South Pacific (Kiribati campus)', url: 'https://www.usp.ac.fj/' },
      { name: 'Kiribati Teachers College', url: 'https://www.education.gov.ki/' },
      { name: 'Marine Training Centre', url: 'https://www.mtc.edu.ki/' },
      { name: 'KITS / technical institutes refs', url: 'https://www.mfet.gov.ki/' },
      { name: 'Ministry of Education training references', url: 'https://www.education.gov.ki/' }
    ],
    places: ['Tarawa (South Tarawa)', 'Kiritimati Island', 'Abaiang', 'Butaritari', 'Atol plajları ve lagünler'],
    operators: [
      { name: 'ATHKL / Vodafone Kiribati', url: 'https://www.mic.gov.ki/' },
      { name: 'Ocean Link / internet refs', url: 'https://www.mic.gov.ki/' },
      { name: 'Government telecom references', url: 'https://www.mic.gov.ki/' }
    ],
    currency: 'Avustralya Doları (AUD)',
    minimumWage: 'Ücret düzenlemeleri ve kamu/özel sektör uygulamaları için resmi kaynak teyidi önerilir.',
    livingCost: 'Ada lojistiği ve ithal ürün bağımlılığı maliyetleri yükseltebilir.',
    government: 'Başkanlık sistemi',
    inflation: 'Resmi veriler ve ithalat fiyat etkileri birlikte izlenmelidir.',
    foodCulture: 'Pasifik ada mutfağı; balık, hindistancevizi ve kök sebzeler öne çıkar.',
    famousPeople: ['Anote Tong', 'Taneti Maamau', 'Teburoro Tito', 'Ieremia Tabai', 'Teuea Toatu', 'David Katoatau', 'Kabure Tikoma', 'Kiribati iklim aktivistleri', 'Kiribati kamu figürleri', 'Bairiki yerel liderleri']
  },
  MV: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'Maldives National University', url: 'https://mnu.edu.mv/' },
      { name: 'Islamic University of Maldives', url: 'https://ium.edu.mv/' },
      { name: 'Villa College', url: 'https://www.villacollege.edu.mv/' },
      { name: 'Avid College', url: 'https://avid.edu.mv/' },
      { name: 'Cyryx College', url: 'https://cyryxcollege.edu.mv/' }
    ],
    places: ['Male', 'Hulhumalé', 'Ari Atoll', 'Baa Atoll', 'Resort / lokal ada rotaları'],
    operators: [
      { name: 'Dhiraagu', url: 'https://www.dhiraagu.com.mv/' },
      { name: 'Ooredoo Maldives', url: 'https://www.ooredoo.mv/' },
      { name: 'eSIM/roaming providers (travel refs)', url: 'https://visitmaldives.com/' }
    ],
    currency: 'Maldiv Rufiyaası (MVR)',
    minimumWage: 'Çalışma izinleri ve sektör bazlı ücret uygulamaları için resmi kaynak teyidi önerilir.',
    livingCost: 'Resort bölgeleri ile yerel adalar arasında çok ciddi maliyet farkı vardır.',
    government: 'Başkanlık sistemi',
    inflation: 'Merkez bankası ve resmi verilerle dönemsel takip önerilir.',
    foodCulture: 'Deniz ürünleri, hindistancevizi ve Güney Asya etkili ada mutfağı öne çıkar.',
    famousPeople: ['Mohamed Nasheed', 'Ibrahim Mohamed Solih', 'Mohamed Muizzu', 'Abdulla Yameen', 'Aminath Faiza', 'Ali Ashfaq', 'Niuma Mohamed', 'Ahmed Nihan', 'Aishath Rishmy', 'Mariya Didi']
  },
  NR: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'University of the South Pacific (Nauru campus refs)', url: 'https://www.usp.ac.fj/' },
      { name: 'Nauru TVET / education department refs', url: 'https://www.naurugov.nr/' },
      { name: 'Nauru secondary-tertiary training references', url: 'https://www.naurugov.nr/' },
      { name: 'Regional scholarships and higher ed refs', url: 'https://www.naurugov.nr/' },
      { name: 'Education ministry resources', url: 'https://www.naurugov.nr/' }
    ],
    places: ['Yaren (idari merkez)', 'Anibare Bay', 'Buada Lagoon', 'Command Ridge', 'Ada çevresi kıyı rotası'],
    operators: [
      { name: 'Digicel Nauru (regional refs)', url: 'https://www.digicelgroup.com/' },
      { name: 'CenpacNet / local telecom refs', url: 'https://www.naurugov.nr/' },
      { name: 'Government ICT references', url: 'https://www.naurugov.nr/' }
    ],
    currency: 'Avustralya Doları (AUD)',
    minimumWage: 'Ücret ve çalışma koşulları için resmi devlet kaynaklarından teyit önerilir.',
    livingCost: 'Küçük ada ekonomisi ve ithalat nedeniyle temel ürün maliyetleri yüksek olabilir.',
    government: 'Parlamenter cumhuriyet',
    inflation: 'Resmi veriler sınırlı olabilir; bölgesel fiyat hareketleri izlenmelidir.',
    foodCulture: 'Ada mutfağı; deniz ürünleri ve ithal gıda ağırlıklı günlük tüketim yaygındır.',
    famousPeople: ['Russ Kun', 'David Adeang', 'Baron Waqa', 'Marcus Stephen', 'Ludwig Scotty', 'Sprent Dabwido', 'Hammer DeRoburt', 'Kieren Keke', 'Charmaine Scotty', 'Nauru sports representatives']
  },
  CV: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'University of Cape Verde', url: 'https://www.unicv.edu.cv/' },
      { name: 'Universidade Jean Piaget de Cabo Verde', url: 'https://www.unipiaget.edu.cv/' },
      { name: 'Universidade de Santiago', url: 'https://www.usantiago.edu.cv/' },
      { name: 'ISECMAR / maritime refs', url: 'https://www.governo.cv/' },
      { name: 'Technical institutes references', url: 'https://www.governo.cv/' }
    ],
    places: ['Praia', 'Mindelo', 'Sal Adası', 'Santo Antão', 'Fogo Volkanı'],
    operators: [
      { name: 'CVMóvel', url: 'https://www.cvtelecom.cv/' },
      { name: 'Unitel T+', url: 'https://www.uniteltmais.cv/' },
      { name: 'Cabo Verde Telecom', url: 'https://www.cvtelecom.cv/' }
    ],
    currency: 'Cape Verde Eskudosu (CVE)',
    minimumWage: 'Asgari ücret ve sektör koşulları için resmi çalışma kaynaklarıyla teyit önerilir.',
    livingCost: 'Turistik adalarda konaklama maliyetleri artabilir; ada bazında fiyat farkları belirgindir.',
    government: 'Yarı başkanlık sistemi',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle dönemsel takip edilmelidir.',
    foodCulture: 'Atlantik ada mutfağı; deniz ürünleri, mısır ve Portekiz etkili yemekler öne çıkar.',
    famousPeople: ['Cesária Évora', 'Mayra Andrade', 'Jorge Carlos Fonseca', 'Amílcar Cabral', 'Pedro Pires', 'Sara Tavares', 'Elida Almeida', 'Lura', 'Nani (Cape Verde kökeni)', 'Ryan Mendes']
  },
  CI: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'Université Félix Houphouët-Boigny', url: 'https://www.ufhb.edu.ci/' },
      { name: 'Institut National Polytechnique Félix Houphouët-Boigny', url: 'https://inphb.ci/' },
      { name: 'Université Nangui Abrogoua', url: 'https://www.una.edu.ci/' },
      { name: 'Université Alassane Ouattara', url: 'https://uao.edu.ci/' },
      { name: 'Université Internationale de Grand-Bassam', url: 'https://www.uigb.edu.ci/' }
    ],
    places: ['Abidjan', 'Grand-Bassam', 'Yamoussoukro', 'Assinie', 'Taï National Park'],
    operators: [
      { name: 'Orange Côte d’Ivoire', url: 'https://www.orange.ci/' },
      { name: 'MTN Côte d’Ivoire', url: 'https://www.mtn.ci/' },
      { name: 'Moov Africa Côte d’Ivoire', url: 'https://www.moov-africa.ci/' }
    ],
    currency: 'Batı Afrika CFA Frangı (XOF)',
    minimumWage: 'Asgari ücret ve sektör uygulamaları için resmi çalışma kurumlarının güncel tabloları teyit edilmelidir.',
    livingCost: 'Abidjan başta olmak üzere büyük şehirlerde konut ve ulaşım maliyetleri daha yüksektir.',
    government: 'Başkanlık sistemi',
    inflation: 'BCEAO ve resmi istatistik verileriyle dönemsel takip önerilir.',
    foodCulture: 'Batı Afrika mutfağı; attiéké, ızgara etler ve baharatlı soslar öne çıkar.',
    famousPeople: ['Didier Drogba', 'Yaya Touré', 'Kolo Touré', 'Alpha Blondy', 'Magic System', 'Alassane Ouattara', 'Laurent Gbagbo', 'Aïcha Koné', 'Serges Kassy', 'Marie-Josée Ta Lou']
  },
  MH: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'College of the Marshall Islands', url: 'https://www.cmi.edu/' },
      { name: 'University of the South Pacific (Marshall Islands refs)', url: 'https://www.usp.ac.fj/' },
      { name: 'Marshall Islands High School / education refs', url: 'https://www.rmiembassyus.org/' },
      { name: 'Teacher training and public education refs', url: 'https://www.pssra.com/' },
      { name: 'CMI vocational programmes', url: 'https://www.cmi.edu/' }
    ],
    places: ['Majuro', 'Arno Atoll', 'Laura Beach', 'Ebeye (geçiş/lojistik planı)', 'Lagün adaları'],
    operators: [
      { name: 'National Telecommunications Authority', url: 'https://www.ntamar.net/' },
      { name: 'MINTA / local mobile services', url: 'https://www.ntamar.net/' },
      { name: 'Regional satellite internet references', url: 'https://www.rmiembassyus.org/' }
    ],
    currency: 'ABD Doları (USD)',
    minimumWage: 'Ücret tabanı ve çalışma koşulları için resmi kamu kurumlarının duyuruları teyit edilmelidir.',
    livingCost: 'Ada lojistiği ve ithal ürün bağımlılığı yaşam maliyetini yükseltebilir.',
    government: 'Başkanlık sistemi',
    inflation: 'Resmi veriler ve ithalat fiyat hareketleri birlikte izlenmelidir.',
    foodCulture: 'Pasifik ada mutfağı; balık, hindistancevizi ve ithal gıda kombinasyonu yaygındır.',
    famousPeople: ['Hilda Heine', 'David Kabua', 'Amata Kabua', 'Casten Nemra', 'Litokwa Tomeing', 'Christopher Loeak', 'Amenta Matthew', 'Brenson Wase', 'Tony deBrum', 'Jack Niedenthal']
  },
  PK: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'LUMS', url: 'https://lums.edu.pk/' },
      { name: 'NUST', url: 'https://nust.edu.pk/' },
      { name: 'University of the Punjab', url: 'https://pu.edu.pk/' },
      { name: 'COMSATS University Islamabad', url: 'https://www.comsats.edu.pk/' },
      { name: 'Aga Khan University', url: 'https://www.aku.edu/' }
    ],
    places: ['Lahor', 'İslamabad Faisal Camii', 'Hunza Vadisi', 'Karakurum Otoyolu', 'Karaçi sahili'],
    operators: [
      { name: 'Jazz', url: 'https://jazz.com.pk/' },
      { name: 'Zong', url: 'https://www.zong.com.pk/' },
      { name: 'Telenor Pakistan', url: 'https://www.telenor.com.pk/' },
      { name: 'Ufone', url: 'https://www.ufone.com/' }
    ],
    currency: 'Pakistan Rupisi (PKR)',
    minimumWage: 'Asgari ücret federal ve eyalet düzeyinde dönemsel güncellenir; resmi kaynakla teyit edilmelidir.',
    livingCost: 'Karaçi, Lahor ve İslamabad arasında kira ve yaşam maliyeti farkları belirgindir.',
    government: 'Federal parlamenter cumhuriyet',
    inflation: 'Pakistan Bureau of Statistics ve merkez bankası verileriyle takip edilmelidir.',
    foodCulture: 'Biryani, karahi, kebap ve naan çeşitleri ülke mutfağında öne çıkar.',
    famousPeople: ['Muhammed Ali Cinnah', 'Benazir Butto', 'İmran Khan', 'Malala Yousafzai', 'Nusrat Fateh Ali Khan', 'Abdus Salam', 'Wasim Akram', 'Babar Azam', 'Atif Aslam', 'Mahira Khan']
  },
  AF: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'Kabul University', url: 'https://www.google.com/search?q=Kabul+University+Afghanistan' },
      { name: 'American University of Afghanistan', url: 'https://www.auaf.edu.af/' },
      { name: 'Kabul Polytechnic University', url: 'https://www.google.com/search?q=Kabul+Polytechnic+University' },
      { name: 'Herat University', url: 'https://www.google.com/search?q=Herat+University+Afghanistan' },
      { name: 'Balkh University', url: 'https://www.google.com/search?q=Balkh+University+Afghanistan' }
    ],
    places: ['Kabil', 'Bamyan Vadisi', 'Band-e Amir Milli Parkı', 'Herat Kalesi', 'Mezar-ı Şerif'],
    operators: [
      { name: 'AWCC', url: 'https://www.afghan-wireless.com/' },
      { name: 'Roshan', url: 'https://www.roshan.af/' },
      { name: 'Etisalat Afghanistan', url: 'https://www.etisalat.af/' },
      { name: 'Salaam', url: 'https://www.google.com/search?q=Salaam+Afghanistan+telecom' }
    ],
    currency: 'Afganisi (AFN)',
    minimumWage: 'Ücret yapısı kamu/özel sektör ve bölgeye göre değişebilir; resmi kaynak teyidi gerekir.',
    livingCost: 'Güvenlik ve lojistik koşulları şehir bazında maliyeti ciddi şekilde etkileyebilir.',
    government: 'Fiili yönetim yapısı güncel uluslararası ve yerel kaynaklarla birlikte değerlendirilmelidir.',
    inflation: 'Merkez bankası ve uluslararası kuruluş raporlarıyla takip önerilir.',
    foodCulture: 'Pilav, kebap, mantu ve naan Afgan mutfağının temel örnekleri arasındadır.',
    famousPeople: ['Ahmed Şah Mesud', 'Hamid Karzai', 'Ahmad Zahir', 'Khaled Hosseini', 'Rohullah Nikpai', 'Abdul Ahad Mohmand', 'Ariana Sayeed', 'Habiba Sarabi', 'Amrullah Saleh', 'Abdullah Abdullah']
  },
  IQ: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'University of Baghdad', url: 'https://en.uobaghdad.edu.iq/' },
      { name: 'University of Basrah', url: 'https://uobasrah.edu.iq/' },
      { name: 'University of Mosul', url: 'https://uomosul.edu.iq/' },
      { name: 'University of Kufa', url: 'https://uokufa.edu.iq/' },
      { name: 'Salahaddin University-Erbil', url: 'https://su.edu.krd/' }
    ],
    places: ['Bağdat', 'Erbil Kalesi', 'Basra', 'Necef', 'Süleymaniye'],
    operators: [
      { name: 'Zain Iraq', url: 'https://www.iq.zain.com/' },
      { name: 'Asiacell', url: 'https://www.asiacell.com/' },
      { name: 'Korek Telecom', url: 'https://www.korektel.com/' }
    ],
    currency: 'Irak Dinarı (IQD)',
    minimumWage: 'Kamu ve özel sektör uygulamaları farklılaşabilir; resmi çalışma kurumları kaynaklarıyla teyit edilmelidir.',
    livingCost: 'Bağdat, Erbil ve Basra arasında konut ve hizmet maliyetleri farklılık gösterir.',
    government: 'Federal parlamenter cumhuriyet',
    inflation: 'Irak Merkez Bankası ve resmi istatistik verileriyle takip önerilir.',
    foodCulture: 'Masgouf, kebaplar, pirinç yemekleri ve Mezopotamya mutfak etkileri öne çıkar.',
    famousPeople: ['Saddam Hüseyin', 'Muhammed Şiya es-Sudani', 'Mustafa el-Kazımi', 'Nadhim Zahawi', 'Ahmed Radhi', 'Kazem Al Saher', 'Nazik al-Malaika', 'Alaa Bashir', 'Hammurabi', 'Muhammed Mehdi el-Cevahiri']
  },
  IR: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'University of Tehran', url: 'https://ut.ac.ir/en' },
      { name: 'Sharif University of Technology', url: 'https://www.sharif.edu/en/' },
      { name: 'Amirkabir University of Technology', url: 'https://aut.ac.ir/en' },
      { name: 'Iran University of Science and Technology', url: 'https://www.iust.ac.ir/en' },
      { name: 'Shiraz University', url: 'https://shirazu.ac.ir/en' }
    ],
    places: ['Tahran', 'İsfahan', 'Persepolis', 'Yezd', 'Şiraz'],
    operators: [
      { name: 'MCI', url: 'https://mci.ir/' },
      { name: 'MTN Irancell', url: 'https://irancell.ir/' },
      { name: 'Rightel', url: 'https://www.rightel.ir/' }
    ],
    currency: 'İran Riyali (IRR)',
    minimumWage: 'Ulusal asgari ücret resmi kararlarla düzenli güncellenir; güncel tutar resmi kaynaktan kontrol edilmelidir.',
    livingCost: 'Tahran ve büyük şehirlerde kira ile özel hizmet maliyetleri daha yüksektir.',
    government: 'İslami cumhuriyet',
    inflation: 'İran resmi kurumları ve uluslararası raporlarla birlikte izlenmelidir.',
    foodCulture: 'Kebap, pilav, safranlı yemekler ve çay kültürü İran mutfağında belirgindir.',
    famousPeople: ['Rumi', 'Ömer Hayyam', 'Hafız', 'Asghar Farhadi', 'Abbas Kiarostami', 'Şirin Ebadi', 'Ali Daei', 'Googoosh', 'Muhammed Rıza Şeceryan', 'Forough Farrokhzad']
  },
  LK: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'University of Colombo', url: 'https://cmb.ac.lk/' },
      { name: 'University of Peradeniya', url: 'https://www.pdn.ac.lk/' },
      { name: 'University of Moratuwa', url: 'https://uom.lk/' },
      { name: 'University of Sri Jayewardenepura', url: 'https://www.sjp.ac.lk/' },
      { name: 'University of Kelaniya', url: 'https://www.kln.ac.lk/' }
    ],
    places: ['Kolombo', 'Kandy', 'Sigiriya', 'Ella', 'Galle Fort'],
    operators: [
      { name: 'Dialog', url: 'https://www.dialog.lk/' },
      { name: 'Mobitel', url: 'https://mobitel.lk/' },
      { name: 'Airtel Sri Lanka', url: 'https://www.airtel.lk/' },
      { name: 'Hutch', url: 'https://www.hutch.lk/' }
    ],
    currency: 'Sri Lanka Rupisi (LKR)',
    minimumWage: 'Asgari ücret ve ücret kuralları dönemsel mevzuat değişiklikleriyle güncellenebilir.',
    livingCost: 'Kolombo ve turistik sahil bölgelerinde maliyetler ülke ortalamasına göre yükselebilir.',
    government: 'Cumhuriyet (başkanlık/parlamenter unsurlar)',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle düzenli takip önerilir.',
    foodCulture: 'Köri çeşitleri, pirinç, hopper ve deniz ürünleri Sri Lanka mutfağında öne çıkar.',
    famousPeople: ['Kumar Sangakkara', 'Mahela Jayawardene', 'Muttiah Muralitharan', 'Angelo Mathews', 'Yohani', 'Anagarika Dharmapala', 'Mahinda Rajapaksa', 'Gotabaya Rajapaksa', 'Chandrika Kumaratunga', 'Jacqueline Fernandez']
  },
  NP: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'Tribhuvan University', url: 'https://tu.edu.np/' },
      { name: 'Kathmandu University', url: 'https://ku.edu.np/' },
      { name: 'Pokhara University', url: 'https://pu.edu.np/' },
      { name: 'Purbanchal University', url: 'https://www.pu.edu.np/' },
      { name: 'Nepal Open University', url: 'https://nou.edu.np/' }
    ],
    places: ['Katmandu', 'Pokhara', 'Chitwan', 'Lumbini', 'Everest trekking bölgesi'],
    operators: [
      { name: 'Ncell', url: 'https://www.ncell.com.np/' },
      { name: 'Nepal Telecom', url: 'https://www.ntc.net.np/' },
      { name: 'Smart Telecom', url: 'https://www.google.com/search?q=Smart+Telecom+Nepal' }
    ],
    currency: 'Nepal Rupisi (NPR)',
    minimumWage: 'Ulusal ücret düzenlemeleri dönemsel olarak güncellenir; resmi kaynak kontrolü önerilir.',
    livingCost: 'Katmandu ve turizm odaklı bölgelerde konaklama maliyeti daha yüksek olabilir.',
    government: 'Federal parlamenter cumhuriyet',
    inflation: 'Nepal Rastra Bank ve resmi istatistik kurumları verileriyle takip edilmelidir.',
    foodCulture: 'Dal bhat, momo ve Himalaya etkili yemek kültürü yaygındır.',
    famousPeople: ['KP Sharma Oli', 'Pushpa Kamal Dahal', 'Bidhya Devi Bhandari', 'Nirmal Purja', 'Mira Rai', 'Paras Khadka', 'Sandeep Lamichhane', 'Ani Choying Drolma', 'Manisha Koirala', 'Bhanubhakta Acharya']
  },
  KH: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'Royal University of Phnom Penh', url: 'http://www.rupp.edu.kh/' },
      { name: 'Institute of Technology of Cambodia', url: 'https://itc.edu.kh/' },
      { name: 'Royal University of Law and Economics', url: 'https://www.rule.edu.kh/' },
      { name: 'University of Health Sciences', url: 'https://www.google.com/search?q=University+of+Health+Sciences+Cambodia' },
      { name: 'Norton University', url: 'https://www.google.com/search?q=Norton+University+Cambodia' }
    ],
    places: ['Angkor Wat', 'Phnom Penh', 'Siem Reap', 'Kampot', 'Koh Rong'],
    operators: [
      { name: 'Smart', url: 'https://www.smart.com.kh/' },
      { name: 'Cellcard', url: 'https://www.cellcard.com.kh/' },
      { name: 'Metfone', url: 'https://metfone.com.kh/' }
    ],
    currency: 'Kamboçya Rieli (KHR)',
    minimumWage: 'Sektörel taban ücretler düzenli güncellenebilir; resmi çalışma kurumları duyuruları takip edilmelidir.',
    livingCost: 'Phnom Penh ve Siem Reap’te kiralar ve turistik maliyetler daha yüksek olabilir.',
    government: 'Anayasal monarşi',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle takip önerilir.',
    foodCulture: 'Amok, noodle, pirinç ve Güneydoğu Asya baharat dengesi mutfakta öne çıkar.',
    famousPeople: ['Hun Sen', 'Norodom Sihamoni', 'Sinn Sisamouth', 'Vann Molyvann', 'Aok Sokunkanha', 'Loung Ung', 'Rithy Panh', 'Keo Surath', 'Chan Dara', 'Norodom Sihanouk']
  },
  LA: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'National University of Laos', url: 'https://www.google.com/search?q=National+University+of+Laos' },
      { name: 'Souphanouvong University', url: 'https://www.google.com/search?q=Souphanouvong+University+Laos' },
      { name: 'Champasak University', url: 'https://www.google.com/search?q=Champasak+University+Laos' },
      { name: 'Savannakhet University', url: 'https://www.google.com/search?q=Savannakhet+University+Laos' },
      { name: 'University of Health Sciences (Laos)', url: 'https://www.google.com/search?q=University+of+Health+Sciences+Laos' }
    ],
    places: ['Vientiane', 'Luang Prabang', 'Vang Vieng', 'Pakse', '4000 Adalar'],
    operators: [
      { name: 'Lao Telecom', url: 'https://www.google.com/search?q=Lao+Telecom' },
      { name: 'Unitel Laos', url: 'https://www.google.com/search?q=Unitel+Laos' },
      { name: 'ETL', url: 'https://www.google.com/search?q=ETL+Laos+telecom' }
    ],
    currency: 'Laos Kipi (LAK)',
    minimumWage: 'Ulusal ücret tabanı dönemsel olarak güncellenebilir; resmi kaynak teyidi önemlidir.',
    livingCost: 'Başkent ve turistik kentlerde konaklama maliyetleri daha yüksektir.',
    government: 'Tek partili sosyalist cumhuriyet',
    inflation: 'Merkez bankası ve resmi istatistik kaynaklarıyla takip edilmelidir.',
    foodCulture: 'Yapışkan pirinç, otlar, balık sosu ve Mekong etkili yemekler öne çıkar.',
    famousPeople: ['Thongloun Sisoulith', 'Kaysone Phomvihane', 'Khamtai Siphandone', 'Bounnhang Vorachith', 'Anousone Phothisan', 'Alexandra Bounxouei', 'Aluna Thavonsouk', 'Sombath Somphone', 'Sounthone Pathammavong', 'Dokdara']
  },
  TJ: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'Tajik National University', url: 'https://www.google.com/search?q=Tajik+National+University' },
      { name: 'Russian-Tajik Slavonic University', url: 'https://www.google.com/search?q=Russian-Tajik+Slavonic+University' },
      { name: 'Tajik Technical University', url: 'https://www.google.com/search?q=Tajik+Technical+University' },
      { name: 'Tajik State Medical University', url: 'https://www.google.com/search?q=Tajik+State+Medical+University' },
      { name: 'Khujand State University', url: 'https://www.google.com/search?q=Khujand+State+University' }
    ],
    places: ['Duşanbe', 'İskenderkul', 'Pamir Otoyolu', 'Khujand', 'Pamir dağ rotaları'],
    operators: [
      { name: 'Tcell', url: 'https://www.tcell.tj/' },
      { name: 'MegaFon Tajikistan', url: 'https://www.google.com/search?q=MegaFon+Tajikistan' },
      { name: 'Babilon-Mobile', url: 'https://www.google.com/search?q=Babilon-Mobile+Tajikistan' }
    ],
    currency: 'Tacik Somonisi (TJS)',
    minimumWage: 'Ulusal ücret tabanı ve kamu kararları dönemsel değişebilir; resmi teyit gereklidir.',
    livingCost: 'Duşanbe’de konut ve hizmet maliyetleri diğer şehirlere göre daha yüksektir.',
    government: 'Başkanlık sistemi',
    inflation: 'Resmi istatistik ve merkez bankası verileriyle düzenli takip önerilir.',
    foodCulture: 'Pilav (osh), etli yemekler ve Orta Asya mutfağı gelenekleri öne çıkar.',
    famousPeople: ['Emomali Rahmon', 'Rustam Emomali', 'Dilshod Nazarov', 'Shabnam Surayo', 'Manizha', 'Farzona', 'Davlatmand Kholov', 'Abduroziq', 'Mukhammadkodir Toshtemirov', 'Parviz Yusufi']
  },
  TM: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'Turkmen State University', url: 'https://www.google.com/search?q=Turkmen+State+University' },
      { name: 'Oguz Han Engineering and Technology University', url: 'https://www.google.com/search?q=Oguz+Han+University+Turkmenistan' },
      { name: 'International University for Humanities and Development', url: 'https://www.google.com/search?q=International+University+for+Humanities+and+Development+Turkmenistan' },
      { name: 'Turkmen State Medical University', url: 'https://www.google.com/search?q=Turkmen+State+Medical+University' },
      { name: 'Turkmen State Institute of Economics and Management', url: 'https://www.google.com/search?q=Turkmen+economics+management+institute' }
    ],
    places: ['Aşkabat', 'Darvaza Krateri', 'Merv', 'Türkmenbaşı kıyısı', 'Kunya-Urgenç'],
    operators: [
      { name: 'Altyn Asyr (TM Cell)', url: 'https://www.google.com/search?q=TM+Cell+Turkmenistan' },
      { name: 'Turkmentelecom', url: 'https://www.google.com/search?q=Turkmentelecom' },
      { name: 'AGTS', url: 'https://www.google.com/search?q=Ashgabat+telecom+Turkmenistan' }
    ],
    currency: 'Türkmenistan Manatı (TMT)',
    minimumWage: 'Ücret düzenlemeleri resmi kararlarla güncellenebilir; güncel kaynak kontrol edilmelidir.',
    livingCost: 'Aşkabat merkezinde maliyetler daha yüksek olabilir; veri şeffaflığı sınırlı olabilir.',
    government: 'Başkanlık sistemi',
    inflation: 'Resmi açıklamalar ve uluslararası raporlar birlikte değerlendirilmelidir.',
    foodCulture: 'Etli yemekler, pilav ve Orta Asya hamur işi kültürü öne çıkar.',
    famousPeople: ['Serdar Berdimuhamedov', 'Gurbanguli Berdimuhamedov', 'Saparmurat Niyazov', 'Mahtumkulu Firaki', 'Polina Guryeva', 'Maysa Yazmuhammedova', 'Begenchmuhamed Kulyyev', 'Myrat Garryyev', 'Gulshat Mammedova', 'Döwletmyrat Orazmyradow']
  },
  UG: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'Makerere University', url: 'https://www.mak.ac.ug/' },
      { name: 'Mbarara University of Science and Technology', url: 'https://www.must.ac.ug/' },
      { name: 'Kyambogo University', url: 'https://kyu.ac.ug/' },
      { name: 'Uganda Christian University', url: 'https://www.ucu.ac.ug/' },
      { name: 'Islamic University in Uganda', url: 'https://www.iuiu.ac.ug/' }
    ],
    places: ['Kampala', 'Bwindi', 'Murchison Falls', 'Jinja', 'Queen Elizabeth National Park'],
    operators: [
      { name: 'MTN Uganda', url: 'https://www.mtn.co.ug/' },
      { name: 'Airtel Uganda', url: 'https://www.airtel.co.ug/' },
      { name: 'Lyca Mobile Uganda', url: 'https://www.lycamobile.ug/' }
    ],
    currency: 'Uganda Şilini (UGX)',
    minimumWage: 'Ücret mevzuatı ve sektör uygulamaları için resmi kaynakların güncel hali kontrol edilmelidir.',
    livingCost: 'Kampala’da konut ve özel hizmet maliyetleri bölgesel şehirlere göre yüksektir.',
    government: 'Başkanlık sistemi',
    inflation: 'UBOS ve merkez bankası verileriyle dönemsel takip önerilir.',
    foodCulture: 'Matoke, posho, et yemekleri ve Doğu Afrika etkili mutfak öne çıkar.',
    famousPeople: ['Yoweri Museveni', 'Bobi Wine', 'Joshua Cheptegei', 'John Akii-Bua', 'Halimah Nakaayi', 'Winnie Nanyondo', 'Juliana Kanyomozi', 'Jose Chameleone', 'Eddy Kenzo', 'Amin Dada']
  },
  RW: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'University of Rwanda', url: 'https://www.ur.ac.rw/' },
      { name: 'African Leadership University', url: 'https://www.alueducation.com/' },
      { name: 'ULK', url: 'https://www.ulk.ac.rw/' },
      { name: 'Adventist University of Central Africa', url: 'https://www.auca.ac.rw/' },
      { name: 'CMU Africa', url: 'https://www.africa.engineering.cmu.edu/' }
    ],
    places: ['Kigali', 'Volcanoes National Park', 'Lake Kivu', 'Nyungwe', 'Akagera'],
    operators: [
      { name: 'MTN Rwanda', url: 'https://www.mtn.co.rw/' },
      { name: 'Airtel Rwanda', url: 'https://www.airtel.co.rw/' },
      { name: 'Irembo (kamu dijital hizmetleri)', url: 'https://www.irembo.gov.rw/' }
    ],
    currency: 'Ruanda Frangı (RWF)',
    minimumWage: 'Sektörel ücret yapıları için resmi çalışma ve mevzuat kaynakları teyit edilmelidir.',
    livingCost: 'Kigali’de konut ve hizmet maliyetleri ülke ortalamasına göre yüksektir.',
    government: 'Başkanlık sistemi',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle takip edilmelidir.',
    foodCulture: 'Muz, fasulye, et ve Doğu Afrika mutfak gelenekleri yaygındır.',
    famousPeople: ['Paul Kagame', 'Diane Shima Rwigara', 'Gaël Faye', 'Salima Mukansanga', 'Meddy', 'The Ben', 'Jean-Paul Samputu', 'Paul Rusesabagina', 'Teta Diana', 'Michaella Rugwizangoga']
  },
  MG: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'University of Antananarivo', url: 'https://www.google.com/search?q=University+of+Antananarivo' },
      { name: 'University of Fianarantsoa', url: 'https://www.google.com/search?q=University+of+Fianarantsoa' },
      { name: 'University of Toamasina', url: 'https://www.google.com/search?q=University+of+Toamasina' },
      { name: 'University of Mahajanga', url: 'https://www.google.com/search?q=University+of+Mahajanga' },
      { name: 'CNTEMAD', url: 'https://www.google.com/search?q=CNTEMAD+Madagascar' }
    ],
    places: ['Antananarivo', 'Baobab Yolu', 'Nosy Be', 'Isalo', 'Andasibe'],
    operators: [
      { name: 'Telma', url: 'https://www.telma.mg/' },
      { name: 'Orange Madagascar', url: 'https://www.orange.mg/' },
      { name: 'Airtel Madagascar', url: 'https://www.airtel.mg/' }
    ],
    currency: 'Ariary (MGA)',
    minimumWage: 'Asgari ücret ve sektör tabanları için resmi çalışma kaynaklarıyla teyit önerilir.',
    livingCost: 'Başkent ve turistik adalarda konaklama maliyeti farklılaşır.',
    government: 'Yarı başkanlık sistemi',
    inflation: 'Merkez bankası ve resmi istatistik kaynaklarıyla izlenmelidir.',
    foodCulture: 'Pirinç, deniz ürünleri ve Fransız etkili ada mutfağı öne çıkar.',
    famousPeople: ['Andry Rajoelina', 'Marc Ravalomanana', 'Didier Ratsiraka', 'Hery Rajaonarimampianina', 'Dama Mahaleo', 'Poopy', 'Ahmad Ahmad', 'Noeline Razafindrainy', 'Rossy', 'Rija Ramanantoanina']
  },
  AO: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'Universidade Agostinho Neto', url: 'https://www.google.com/search?q=Universidade+Agostinho+Neto+Angola' },
      { name: 'Universidade Católica de Angola', url: 'https://www.google.com/search?q=Universidade+Catolica+de+Angola' },
      { name: 'Universidade Óscar Ribas', url: 'https://www.google.com/search?q=Universidade+Oscar+Ribas' },
      { name: 'Universidade Metodista de Angola', url: 'https://www.google.com/search?q=Universidade+Metodista+de+Angola' },
      { name: 'Universidade Jean Piaget de Angola', url: 'https://www.google.com/search?q=Jean+Piaget+Angola+University' }
    ],
    places: ['Luanda', 'Kalandula Şelaleleri', 'Benguela', 'Kissama', 'Lubango'],
    operators: [
      { name: 'Unitel', url: 'https://www.unitel.ao/' },
      { name: 'Africell Angola', url: 'https://africell.ao/' },
      { name: 'Movicel', url: 'https://www.google.com/search?q=Movicel+Angola' }
    ],
    currency: 'Angola Kvanzası (AOA)',
    minimumWage: 'Sektörel taban ücretler resmi kararlarla güncellenebilir; resmi kaynak teyidi gerekir.',
    livingCost: 'Luanda konut ve ithal ürün maliyetleri nedeniyle pahalı olabilir.',
    government: 'Başkanlık sistemi',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle takip önerilir.',
    foodCulture: 'Deniz ürünleri, manyok ve Portekiz etkili yemekler yaygındır.',
    famousPeople: ['João Lourenço', 'José Eduardo dos Santos', 'Bonga', 'Anselmo Ralph', 'Leila Lopes', 'Paulo Flores', 'Rui Mingas', 'Mantorras', 'Bastos', 'Aline Frazão']
  },
  MZ: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'Universidade Eduardo Mondlane', url: 'https://www.google.com/search?q=Universidade+Eduardo+Mondlane' },
      { name: 'Universidade Pedagógica de Maputo', url: 'https://www.google.com/search?q=Universidade+Pedagogica+Maputo' },
      { name: 'Universidade Católica de Moçambique', url: 'https://www.google.com/search?q=Universidade+Catolica+de+Mocambique' },
      { name: 'Universidade Lúrio', url: 'https://www.google.com/search?q=Universidade+Lurio' },
      { name: 'Universidade Zambeze', url: 'https://www.google.com/search?q=Universidade+Zambeze' }
    ],
    places: ['Maputo', 'Bazaruto', 'Tofo', 'Gorongosa', 'Ilha de Moçambique'],
    operators: [
      { name: 'Vodacom Mozambique', url: 'https://www.google.com/search?q=Vodacom+Mozambique' },
      { name: 'Movitel', url: 'https://www.google.com/search?q=Movitel+Mozambique' },
      { name: 'Tmcel', url: 'https://www.google.com/search?q=Tmcel+Mozambique' }
    ],
    currency: 'Mozambik Metikali (MZN)',
    minimumWage: 'Sektörel asgari ücretler resmi kararlarla güncellenebilir; resmi kaynak kontrolü gerekir.',
    livingCost: 'Maputo ve turistik kıyı bölgelerinde maliyetler daha yüksek olabilir.',
    government: 'Başkanlık sistemi',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle takip edilmelidir.',
    foodCulture: 'Deniz ürünleri, peri-peri etkileri ve mısır/manyok temelli yemekler öne çıkar.',
    famousPeople: ['Samora Machel', 'Joaquim Chissano', 'Graça Machel', 'Mia Couto', 'Maria de Lurdes Mutola', 'Filipe Nyusi', 'Lizha James', 'Neyma', 'Eusébio (Mozambik doğumlu)', 'José Craveirinha']
  },
  ZW: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'University of Zimbabwe', url: 'https://www.uz.ac.zw/' },
      { name: 'NUST Zimbabwe', url: 'https://www.nust.ac.zw/' },
      { name: 'Midlands State University', url: 'https://www.google.com/search?q=Midlands+State+University+Zimbabwe' },
      { name: 'Chinhoyi University of Technology', url: 'https://www.cut.ac.zw/' },
      { name: 'Africa University', url: 'https://www.africau.edu/' }
    ],
    places: ['Victoria Falls', 'Harare', 'Great Zimbabwe', 'Hwange', 'Matobo Hills'],
    operators: [
      { name: 'Econet Wireless Zimbabwe', url: 'https://www.econet.co.zw/' },
      { name: 'NetOne', url: 'https://www.netone.co.zw/' },
      { name: 'Telecel Zimbabwe', url: 'https://www.google.com/search?q=Telecel+Zimbabwe' }
    ],
    currency: 'Zimbabwe Doları / çoklu para kullanımı (uygulamaya göre değişebilir)',
    minimumWage: 'Sektörel ücret yapıları ve resmi düzenlemeler sık değişebildiği için güncel teyit gerekir.',
    livingCost: 'Kur dalgalanmaları ve şehir farkları günlük maliyet hesaplarını etkileyebilir.',
    government: 'Başkanlık sistemi',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle yakın takip önerilir.',
    foodCulture: 'Sadza, et yemekleri ve Güney Afrika bölge mutfağı etkileri yaygındır.',
    famousPeople: ['Robert Mugabe', 'Emmerson Mnangagwa', 'Kirsty Coventry', 'Strive Masiyiwa', 'Oliver Mtukudzi', 'Thomas Mapfumo', 'Danai Gurira', 'Morgan Tsvangirai', 'NoViolet Bulawayo', 'Tendai Biti']
  },
  PG: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'University of Papua New Guinea', url: 'https://www.google.com/search?q=University+of+Papua+New+Guinea' },
      { name: 'PNG University of Technology', url: 'https://www.google.com/search?q=Papua+New+Guinea+University+of+Technology' },
      { name: 'Divine Word University', url: 'https://www.google.com/search?q=Divine+Word+University+Papua+New+Guinea' },
      { name: 'Pacific Adventist University', url: 'https://www.google.com/search?q=Pacific+Adventist+University+PNG' },
      { name: 'University of Goroka', url: 'https://www.google.com/search?q=University+of+Goroka' }
    ],
    places: ['Port Moresby', 'Kokoda Track', 'Mount Hagen', 'Madang', 'Milne Bay dalış rotaları'],
    operators: [
      { name: 'Digicel PNG', url: 'https://www.digicelgroup.com/pg/en.html' },
      { name: 'Telikom PNG', url: 'https://www.google.com/search?q=Telikom+PNG' },
      { name: 'bmobile', url: 'https://www.google.com/search?q=bmobile+PNG' }
    ],
    currency: 'Kina (PGK)',
    minimumWage: 'Resmi çalışma ve ücret düzenlemeleri için güncel kamu kaynakları teyit edilmelidir.',
    livingCost: 'Port Moresby güvenlik ve ithalat maliyetleri nedeniyle pahalı olabilir.',
    government: 'Parlamenter demokrasi',
    inflation: 'Merkez bankası ve resmi istatistik verileriyle takip edilmelidir.',
    foodCulture: 'Kök bitkiler, deniz ürünleri ve ada mutfak gelenekleri öne çıkar.',
    famousPeople: ['Michael Somare', 'James Marape', 'Peter O Neill', 'Justin Olam', 'Toea Wisil', 'John Momis', 'Peter Ipatas', 'Sir Julius Chan', 'Theo Zurenuoc', 'Allan Bird']
  },
  HT: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'Université d État d Haïti', url: 'https://www.google.com/search?q=Universite+dEtat+dHaiti' },
      { name: 'Université Quisqueya', url: 'https://www.google.com/search?q=Universite+Quisqueya+Haiti' },
      { name: 'Université Notre Dame d Haïti', url: 'https://www.google.com/search?q=Universite+Notre+Dame+dHaiti' },
      { name: 'Université Lumière', url: 'https://www.google.com/search?q=Universite+Lumiere+Haiti' },
      { name: 'Université Caraïbe', url: 'https://www.google.com/search?q=Universite+Caraibe+Haiti' }
    ],
    places: ['Port-au-Prince', 'Cap-Haïtien', 'Citadelle Laferrière', 'Jacmel', 'Labadee'],
    operators: [
      { name: 'Digicel Haiti', url: 'https://www.digicelgroup.com/ht/en.html' },
      { name: 'Natcom', url: 'https://natcom.com.ht/' },
      { name: 'Haiti ISP araması', url: 'https://www.google.com/search?q=Haiti+internet+providers' }
    ],
    currency: 'Haiti Gourdesi (HTG)',
    minimumWage: 'Sektörel asgari ücretler ve resmi kararlar dönemsel değişebilir; güncel teyit gerekir.',
    livingCost: 'Güvenlik ve lojistik koşulları şehir bazında maliyet hesaplarını etkileyebilir.',
    government: 'Cumhuriyet; güncel siyasi/kurumsal durum resmi kaynaklarla birlikte izlenmelidir.',
    inflation: 'Merkez bankası ve uluslararası veri kaynaklarıyla takip önerilir.',
    foodCulture: 'Kreol mutfağı; pirinç-fasulye, deniz ürünleri ve baharatlı yemekler öne çıkar.',
    famousPeople: ['Toussaint Louverture', 'Jean Jacques Dessalines', 'Wyclef Jean', 'Michaelle Jean', 'Edwidge Danticat', 'Dany Laferriere', 'Rutshelle Guillaume', 'Jovenel Moise', 'Jean Michel Basquiat (Haiti kökeni)', 'Naomi Osaka (Haiti kökeni)']
  },
  PS: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'Birzeit University', url: 'https://www.birzeit.edu/' },
      { name: 'An-Najah National University', url: 'https://www.najah.edu/' },
      { name: 'Islamic University of Gaza', url: 'https://www.iugaza.edu.ps/' },
      { name: 'Al-Quds University', url: 'https://www.alquds.edu/' },
      { name: 'Hebron University', url: 'https://www.hebron.edu/' }
    ],
    places: ['Bethlehem', 'Ramallah', 'Nablus', 'Jericho', 'Kudüs çevresi (erişim koşullu)'],
    operators: [
      { name: 'Jawwal', url: 'https://www.jawwal.ps/' },
      { name: 'Ooredoo Palestine', url: 'https://www.ooredoo.ps/' },
      { name: 'Paltel', url: 'https://www.paltel.ps/' }
    ],
    currency: 'Çoklu kullanım (ILS, JOD, USD vb.)',
    minimumWage: 'Çalışma koşulları ve ücret düzenlemeleri için güncel resmi kaynak ve mevzuat kontrolü önemlidir.',
    livingCost: 'Şehir ve erişim koşullarına göre yaşam maliyeti belirgin şekilde değişebilir.',
    government: 'Yönetim yapısı bölgesel ve siyasi koşullara göre farklı uygulamalar içerebilir.',
    inflation: 'Resmi istatistik ve uluslararası kaynaklarla birlikte değerlendirilmelidir.',
    foodCulture: 'Levant mutfağı; humus, falafel, zeytinyağlılar ve fırın ürünleri öne çıkar.',
    famousPeople: ['Yasir Arafat', 'Mahmud Derviş', 'Hanan Aşravi', 'Leila Khaled', 'Mohammed Assaf', 'Rashid Khalidi', 'Suheir Hammad', 'Bella Hadid (Filistin kökeni)', 'Muna El-Kurd', 'Ahed Tamimi']
  },
  TL: {
    updatedAt: '2026-02-24',
    schools: [
      { name: 'Universidade Nacional Timor Lorosae', url: 'https://www.google.com/search?q=Universidade+Nacional+Timor+Lorosae' },
      { name: 'Dili Institute of Technology', url: 'https://www.google.com/search?q=Dili+Institute+of+Technology' },
      { name: 'Timor-Leste universities directory', url: 'https://www.google.com/search?q=Timor-Leste+universities' },
      { name: 'UNTL education resources', url: 'https://www.google.com/search?q=UNTL+Timor-Leste' },
      { name: 'Timor-Leste higher education', url: 'https://www.google.com/search?q=Timor-Leste+higher+education' }
    ],
    places: ['Dili', 'Atauro Adası', 'Jaco Island', 'Baucau', 'Maubisse'],
    operators: [
      { name: 'Telemor', url: 'https://www.google.com/search?q=Telemor+Timor-Leste' },
      { name: 'Timor Telecom', url: 'https://www.google.com/search?q=Timor+Telecom' },
      { name: 'Timor-Leste mobile operators', url: 'https://www.google.com/search?q=Timor-Leste+mobile+operators' }
    ],
    currency: 'ABD Doları (USD)',
    minimumWage: 'Asgari ücret ve çalışma kuralları için resmi iş/çalışma kurumları kaynakları teyit edilmelidir.',
    livingCost: 'Dili’de ithal ürün ve konaklama maliyetleri daha yüksek olabilir.',
    government: 'Yarı başkanlık sistemi',
    inflation: 'Resmi veriler ve uluslararası kaynaklarla düzenli takip önerilir.',
    foodCulture: 'Portekiz ve Güneydoğu Asya etkili ada mutfağı; pirinç ve deniz ürünleri öne çıkar.',
    famousPeople: ['Jose Ramos Horta', 'Xanana Gusmao', 'Mari Alkatiri', 'Taur Matan Ruak', 'Francisco Guterres', 'Kirsty Sword Gusmao', 'Ego Lemos', 'Aniceto Guterres Lopes', 'Berta Nunes', 'Maria de Lourdes Martins Cruz']
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
