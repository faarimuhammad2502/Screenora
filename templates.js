/**
 * SCREENORA — ATS RESUME TEMPLATES ENGINE (templates.js)
 * Standar Nasional & Internasional ATS Architecture
 * Author: Muhammad Faari Akbar (Faari)
 * Anti-Slop, High Performance, Zero-Telemetry Privacy
 */

(function () {
  'use strict';

  const PAYMENT_CONFIG = {
    amountText: 'Rp 25.000',
    bcaVaNumber: '8801085892344722',
    bcaVaDisplay: '8801 0858 9234 4722',
    qrisImageUrl: '', // Isi path gambar QRIS (mis. 'qris.png') saat sudah siap
    whatsappNumber: '6285892344722'
  };

  // --------------------------------------------------------------------------
  // 1. TEMPLATE REPOSITORY (AUTHENTIC & PRACTICAL ATS STANDARDS)
  // --------------------------------------------------------------------------
  const TEMPLATES = {
    classic_corporate: {
      id: 'classic_corporate',
      title: 'Classic Corporate Indonesia (BUMN & Swasta)',
      tag: 'STANDAR NASIONAL • 1-KOLOM RESMI',
      category: 'nasional',
      filename: 'CV_ATS_Classic_Corporate_Screenora.doc',
      description: 'Format 1-kolom konservatif resmi yang paling disukai rekruter BUMN, Perbankan, FMCG, dan korporat swasta besar di Indonesia.',
      plainText: `RIAN PRATAMA, S.Psi.
Jakarta Timur, DKI Jakarta | +62 812-3456-7890 | rian.pratama@email.com | linkedin.com/in/rianpratama

RINGKASAN PROFESIONAL
Praktisi Talent Acquisition & HR Generalist dengan 3+ tahun pengalaman mengelola siklus rekrutmen penuh (end-to-end recruitment), analisis kebutuhan tenaga kerja, dan administrasi kepatuhan ketenagakerjaan. Berhasil memangkas Time-to-Hire sebesar 28% melalui optimalisasi pipeline sourcing digital dan otomasi asesmen kompetensi. Terampil dalam pengoperasian software HRIS (Talenta, GreatDay HR) dan penerapan psikotes industri terstandarisasi.

PENGALAMAN KERJA

PT MAHABUDI NUSANTARA — Jakarta Selatan
Talent Acquisition Specialist | Januari 2024 – Sekarang
- Memimpin pemenuhan 45+ posisi strategis di divisi Komersial dan Operasional dengan mencapai rasio penerimaan penawaran kerja (Offer Acceptance Rate) sebesar 92%.
- Memangkas rata-rata durasi rekrutmen (Time-to-Hire) dari 38 hari menjadi 27 hari melalui penerapan sistem penyaringan berbasis kompetensi formula STAR.
- Mengelola implementasi modul pelacakan kandidat (ATS) baru, meningkatkan akurasi screening kecocokan kualifikasi awal hingga 35%.
- Menyusun laporan analisis retensi dan turn-over karyawan kuartalan untuk rekomendasi strategis kepada jajaran Direksi.

PT SINAR ANUGERAH ABADI — Jakarta Barat
Junior HR Generalist | Juli 2022 – Desember 2023
- Mengelola proses orientasi dan onboarding terstruktur bagi 120+ karyawan baru per tahun, meningkatkan kepuasan onboarding (CSAT) ke skor 4.8/5.0.
- Mengoordinasikan kepatuhan BPJS Ketenagakerjaan & Kesehatan, serta pemeliharaan data absensi dan lembur untuk 250+ staf secara tepat waktu.
- Memfasilitasi 14 sesi evaluasi kinerja tahunan (KPI Review) dan menyusun draft Perjanjian Kerja Waktu Tertentu (PKWT) sesuai regulasi ketenagakerjaan.

RIWAYAT PENDIDIKAN

UNIVERSITAS INDONESIA (UI) — Depok
Sarjana Psikologi (S.Psi.) | IPK: 3.65 / 4.00 | Lulus: 2022
- Fokus Peminatan: Psikologi Industri & Organisasi (PIO).
- Judul Skripsi: Pengaruh Iklim Organisasi dan Budaya Feedback terhadap Retensi Karyawan Generasi Z.

KEAHLIAN & SERTIFIKASI
- Keahlian Teknis: End-to-End Recruitment, Behavioral Event Interview (BEI), Competency Mapping, Talent Sourcing, Payroll & BPJS.
- Software & Alat: Talenta HRIS, GreatDay HR, LinkedIn Recruiter, Google Workspace, Microsoft Excel (VLOOKUP, Pivot Table).
- Sertifikasi: Certified Talent Acquisition Practitioner (BNSP / MSDM) – 2023.`
    },

    fresh_graduate: {
      id: 'fresh_graduate',
      title: 'Fresh Graduate & Kampus Merdeka',
      tag: 'STANDAR NASIONAL • ENTRY LEVEL',
      category: 'nasional',
      filename: 'CV_ATS_Fresh_Graduate_Screenora.doc',
      description: 'Format yang mengutamakan riwayat pendidikan, proyek skripsi/penelitian, magang mandiri/MSIB, dan kepemimpinan organisasi.',
      plainText: `ANISA PUTRI LARASATI, S.Kom.
Bandung, Jawa Barat | +62 821-9876-5432 | anisa.larasati@email.com | linkedin.com/in/anisalarasati

RINGKASAN PROFIL
Lulusan Sarjana Ilmu Komputer yang berfokus pada Analisis Sistem dan Business Intelligence. Memiliki pengalaman magang bersertifikat (MSIB) selama 6 bulan di industri teknologi finansial, terbiasa mengolah dataset besar dengan SQL, Tableau, dan Python untuk menghasilkan insight bisnis yang dapat ditindaklanjuti. Memiliki kemampuan komunikasi lintas fungsi yang terasah melalui kepemimpinan himpunan mahasiswa.

RIWAYAT PENDIDIKAN

UNIVERSITAS PADJADJARAN (UNPAD) — Bandung
Sarjana Ilmu Komputer (S.Kom.) | IPK: 3.78 / 4.00 | Lulus: September 2024
- Predikat: Pujian (Cum Laude).
- Penelitian Akhir: Implementasi Algoritma Machine Learning untuk Prediksi Pola Churn Pelanggan E-Commerce (Akurasi Model: 89.4%).
- Mata Kuliah Relevan: Analisis & Perancangan Sistem, Basis Data Lanjutan, Statistika Bisnis, Rekayasa Perangkat Lunak.

PENGALAMAN MAGANG & PROYEK

PT FINTEK KARYA NUSANTARA — Jakarta (Remote)
Business Analyst Intern (Magang Bersertifikat MSIB) | Februari 2024 – Juli 2024
- Menganalisis 50.000+ data transaksi harian pengguna untuk mengidentifikasi 3 titik hambatan (drop-off) utama pada alur checkout aplikasi.
- Membangun 4 dashboard interaktif Tableau yang digunakan tim Product Management untuk memantau metrik Daily Active Users (DAU) dan nilai transaksi rata-rata.
- Menyusun dokumen spesifikasi kebutuhan sistem (PRD & User Stories) untuk 2 fitur pembayaran baru yang berhasil diluncurkan tepat waktu.

LABORATORIUM SISTEM INFORMASI UNPAD — Bandung
Asisten Dosen & Koordinator Praktikum Basis Data | Agustus 2023 – Januari 2024
- Membimbing 70+ mahasiswa tingkat 2 dalam pemahaman perancangan Entity Relationship Diagram (ERD), normalisasi data, dan kueri SQL kompleks.
- Memeriksa serta mengevaluasi 15 tugas proyek akhir basis data dengan tingkat ketepatan evaluasi 95%.

PENGALAMAN ORGANISASI
Himpunan Mahasiswa Ilmu Komputer (HIMATIF) — Kepala Divisi Hubungan Eksternal (2023)
- Memimpin tim beranggotakan 8 staf dalam menyelenggarakan seminar teknologi nasional yang dihadiri 450+ peserta dari 15 universitas.
- Menjalin kolaborasi sponsorship dengan 5 perusahaan teknologi, mengamankan pendanaan kegiatan sebesar Rp 35.000.000.

KEAHLIAN TEKNIS & SERTIFIKASI
- Bahasa Kueri & Pemrograman: SQL (PostgreSQL, MySQL), Python (Pandas, NumPy, Scikit-Learn), Git.
- Alat Visualisasi & Produktivitas: Tableau, Microsoft Power BI, Google Data Studio, Trello, Notion, Microsoft Office.
- Sertifikasi: Google Data Analytics Professional Certificate (Coursera) – 2024.`
    },

    global_tech: {
      id: 'global_tech',
      title: 'Global Tech & Software Engineering Resume',
      tag: 'INTERNATIONAL ATS • WORKDAY & GREENHOUSE READY',
      category: 'internasional',
      filename: 'Resume_Global_Software_Engineer_Screenora.doc',
      description: 'Format standar internasional US/EU/Remote. 100% bebas bias EEOC (tanpa foto/usia), kategorisasi tech stack padat, dan bullet point berbasis formula XYZ.',
      plainText: `ALEXANDER TAN
Jakarta, Indonesia (Open to Relocation & Remote) | +62 811-2345-6789 | alex.tan.dev@email.com
GitHub: github.com/alextan-dev | LinkedIn: linkedin.com/in/alextandev | Portfolio: alextan.io

PROFESSIONAL SUMMARY
Senior Full Stack Engineer with 5+ years of experience designing and scaling distributed web applications and high-throughput microservices. Proven track record of boosting system performance by 40% and reducing AWS infrastructure spend by 22% across multi-region cloud deployments. Specialized in TypeScript, React, Node.js, Golang, and event-driven architectures (Kafka/RabbitMQ).

TECHNICAL SKILLS
- Languages: TypeScript, JavaScript (ES6+), Golang, Python, SQL (PostgreSQL), HTML5/CSS3.
- Frontend: React.js, Next.js, Redux Toolkit, Tailwind CSS, Webpack, Vite, Jest, Playwright.
- Backend & Cloud: Node.js, Express, NestJS, Go-Fiber, Docker, Kubernetes, AWS (ECS, Lambda, S3, RDS), Redis, Kafka.
- Architecture: RESTful APIs, GraphQL, Microservices, CI/CD (GitHub Actions), Event-Driven Architecture.

PROFESSIONAL EXPERIENCE

GLOBAL CLOUD SOLUTIONS INC. — Singapore (Remote)
Senior Software Engineer | March 2023 – Present
- Architected and deployed an event-driven payment ledger processing over 1.2M transactions daily with 99.99% uptime SLA.
- Reduced API p99 latency from 420ms to 85ms by introducing Redis caching layers and optimizing database indexing strategies.
- Spearheaded the frontend migration from monolithic legacy framework to Next.js 14, improving Largest Contentful Paint (LCP) from 3.8s to 1.1s.
- Mentored 4 mid-level engineers, established automated code quality gates via GitHub Actions, decreasing production rollback incidents by 45%.

NEXA LABS TECHNOLOGIES — Jakarta, Indonesia
Full Stack Engineer | July 2020 – February 2023
- Engineered real-time collaborative workspace dashboard used by 25,000+ daily active users using WebSockets and React.
- Built reusable modular component design system adopted by 3 internal engineering squads, cutting frontend feature delivery time by 30%.
- Integrated Stripe & Local QRIS Virtual Account payment gateway with webhook retry logic, securing 100% zero-transaction-loss audit.

EDUCATION

INSTITUTE OF TECHNOLOGY BANDUNG (ITB) — Bandung, Indonesia
Bachelor of Science in Computer Science | GPA: 3.72 / 4.00 | Graduated: 2020
- Relevant Coursework: Distributed Systems, Data Structures & Algorithms, Network Security, Database Engineering.

KEY PROJECTS & OPEN SOURCE
- Screenora Open-Source Core: Built lightweight client-side heuristic resume screening engine in vanilla JavaScript with 0 external telemetry.
- Go-Queue Worker: Lightweight distributed background worker package in Golang with over 300+ GitHub stars.`
    },

    global_product: {
      id: 'global_product',
      title: 'International Product & Business Operations',
      tag: 'INTERNATIONAL ATS • METRIC & KPI FOCUSED',
      category: 'internasional',
      filename: 'Resume_Global_Product_Manager_Screenora.doc',
      description: 'Didesain khusus untuk Product Manager dan Business Operations berskala global. Kaya akan metrik terukur: MRR, CAC, Retention, dan Growth.',
      plainText: `NADIA KUSUMA
Jakarta, Indonesia | +62 813-8899-7766 | nadia.kusuma@email.com | linkedin.com/in/nadiakusuma

PROFESSIONAL SUMMARY
Data-driven Product Manager with 4+ years of experience leading cross-functional squads (Engineering, Design, Data, Growth) in high-growth B2B SaaS and consumer tech. Adept at turning qualitative customer discovery into validated product roadmaps that lifted customer retention by 24% and generated $450K in annual recurring revenue (ARR). Certified Scrum Product Owner (CSPO).

CORE COMPETENCIES
- Product Strategy: Product Discovery, User Journey Mapping, MVP Scoping, PRD Authoring, A/B Testing, Feature Prioritization.
- Data & Analytics: Amplitude, Mixpanel, Google Analytics 4, SQL, Tableau, Customer Retention Analysis, Cohort Modeling.
- Agile Leadership: Scrum / Kanban Frameworks, Sprint Planning, Backlog Grooming, Jira, Confluence, Linear.

PROFESSIONAL EXPERIENCE

SCALEFLOW TECHNOLOGIES — Singapore (Remote)
Product Manager | August 2022 – Present
- Led discovery and execution of automated billing and subscription onboarding flow, boosting self-serve trial-to-paid conversion from 4.2% to 7.8%.
- Collaborated with 8 engineers and 2 UX designers across 3 time zones to deliver enterprise SSO and audit-log compliance features ahead of Q3 deadline.
- Conducted 60+ in-depth user interviews and analyzed 100,000+ session recordings to redesign navigation taxonomy, decreasing product churn by 18%.
- Defined and monitored North Star metrics (Weekly Active Accounts & Net Revenue Retention), presenting quarterly progress to C-suite stakeholders.

GROWTHBOX MEDIA — Jakarta, Indonesia
Associate Product Manager | June 2020 – July 2022
- Managed end-to-end launch of mobile content recommendation engine, resulting in a 35% lift in average session duration within 90 days.
- Designed 12 multivariable A/B tests on signup landing page, optimizing customer acquisition cost (CAC) by 21%.
- Authored 30+ comprehensive Product Requirements Documents (PRDs) with clear user stories and Given/When/Then acceptance criteria.

EDUCATION

GADJAH MADA UNIVERSITY (UGM) — Yogyakarta, Indonesia
Bachelor of Economics (Management) | GPA: 3.68 / 4.00 | Graduated: 2020
- Focus: Strategic Management & Business Analytics.

CERTIFICATIONS
- Certified Scrum Product Owner (CSPO) – Scrum Alliance (2023)
- Product Analytics Certification – Amplitude Academy (2022)`
    },

    executive_leadership: {
      id: 'executive_leadership',
      title: 'Executive & P&L Leadership',
      tag: 'STANDAR NASIONAL • DIREKTUR & MANAJERIAL',
      category: 'nasional',
      filename: 'CV_ATS_Executive_Leadership_Screenora.doc',
      description: 'Format 2-halaman berdensitas tinggi untuk Head of Department, General Manager, dan Direktur dengan tanggung jawab anggaran dan tim besar.',
      plainText: `HENDRA WIJAYA, M.M.
Jakarta Selatan, DKI Jakarta | +62 811-7788-9900 | hendra.wijaya@email.com | linkedin.com/in/hendrawijaya

RINGKASAN EKSEKUTIF
Executive Leader dengan 10+ tahun rekam jejak memimpin transformasi operasional multi-cabang, restrukturisasi proses bisnis, dan pengelolaan anggaran P&L hingga Rp 45 Miliar. Sukses meningkatkan margin operasional sebesar 18% dan memangkas biaya rantai pasok (supply chain) senilai Rp 8.2 Miliar melalui implementasi Lean Six Sigma dan otomatisasi ERP. Berpengalaman membina dan menyelaraskan 180+ staf lintas divisi Komersial, Supply Chain, dan People Operations.

PENGALAMAN KEPEMIMPINAN

PT ASTRA NUSANTARA MEGAH — Jakarta
Head of Operations | Januari 2021 – Sekarang
- Memegang akuntabilitas penuh atas anggaran operasional tahunan sebesar Rp 45 Miliar di 4 kantor cabang regional, mencatatkan efisiensi budget 14% di bawah plafon.
- Memimpin transformasi digital alur gudang dan inventaris ke sistem ERP modern, mempercepat perputaran inventaris (Inventory Turnover) dari 3.2x menjadi 5.1x per tahun.
- Mengembangkan program retensi talenta kunci bersama tim HR, menurunkan angka turn-over staf level supervisor dan manajerial dari 16% menjadi 4.5%.

PT MULTI SARANA LOGISTIK — Surabaya
Senior Operations Manager | Juni 2016 – Desember 2020
- Mengawasi armada distribusi 60+ unit logistik dan 120 tenaga kerja lapangan dengan On-Time Delivery Rate 98.7%.
- Menegosiasikan ulang kontrak 15 vendor pihak ketiga, menghasilkan penghematan biaya tahunan sebesar Rp 3.4 Miliar.

PENDIDIKAN TINGGI
UNIVERSITAS AIRLANGGA — Magister Manajemen (M.M.) | Lulus: 2016
UNIVERSITAS BRAWIJAYA — Sarjana Teknik Industri (S.T.) | Lulus: 2013`
    },

    silicon_valley: {
      id: 'silicon_valley',
      title: 'Silicon Valley Startup Elite',
      tag: 'INTERNATIONAL ATS • SEED-TO-SERIES C',
      category: 'internasional',
      filename: 'Resume_Silicon_Valley_Startup_Screenora.doc',
      description: 'Layout 1-halaman ultra-padat dengan teknik penulisan high-signal low-noise untuk kandidat senior di ekosistem startup Seri A hingga Pra-IPO.',
      plainText: `MARCUS VANCE
San Francisco, CA (Open to Remote / Relocation) | marcus.vance@email.com | github.com/mvance | marcusvance.com

EXECUTIVE SUMMARY
Staff Systems Architect with 8+ years scaling infrastructure from Seed to Series C ($80M ARR). Designed fault-tolerant Kubernetes mesh processing 40K req/sec at sub-50ms latency. Reduced cloud compute spend by $1.2M annually via spot-instance orchestration and eBPF kernel profiling.

CORE EXPERTISE
- Distributed Systems: Kubernetes, Terraform, AWS/GCP, Kafka, Envoy, eBPF, Go, Rust, PostgreSQL, Redis.
- Architecture: High-Throughput Microservices, Zero-Trust Mesh, Multi-Region Active-Active DR.

VENTURE EXPERIENCE

HYPERSCALE AI (YC S21) — San Francisco, CA
Staff Systems Architect | March 2022 – Present
- Scaled core inference cluster from 20 to 500 GPUs with automated dynamic batching, saving $1.2M/yr in compute.
- Engineered global edge proxy reducing p99 latency by 68% across US, EU, and APAC endpoints.
- Mentored 14 core engineers, establishing 100% automated CI/CD canary deployments with zero production downtime.

NEBULA CORE NETWORKS — Seattle, WA
Lead Platform Engineer | January 2019 – February 2022
- Architected multi-tenant Kubernetes platform supporting 12 internal engineering squads, cutting cluster deploy time by 75%.
- Implemented distributed tracing with OpenTelemetry, decreasing mean-time-to-resolution (MTTR) by 55%.

EDUCATION
UNIVERSITY OF WASHINGTON — B.S. in Computer Engineering | 2018`
    }
  };

  // --------------------------------------------------------------------------
  // 2. INTERNATIONALIZATION (i18n) DICTIONARY
  // --------------------------------------------------------------------------
  const i18n = {
    id: {
      tplNavHub: 'Pusat Template',
      tplNavSubtitle: 'Katalog Template Resume ATS Teruji',
      navHome: 'Beranda',
      navScan: 'Skrining CV',
      navTemplates: 'Template ATS',
      navBuilder: 'Buat CV Instan',
      badgeNew: 'Baru',
      tplBackBtn: '← Kembali ke Skrining CV',
      tplHeroBadge: 'Koleksi Format Tervalidasi • Workday, Taleo, Greenhouse & BUMN',
      tplHeroTitle: 'Katalog Template CV ATS Standar Nasional & Internasional',
      tplHeroDesc: 'Setiap template di bawah ini dirancang dengan struktur 1-kolom resmi, formula XYZ terukur, dan margin proporsional. Dilengkapi pratinjau lembar resume nyata dan berkas Word (.docx) siap unduh.',
      tplPill1: 'Hierarki 1-Kolom Resmi',
      tplPill2: 'Formula XYZ & Verba Aksi',
      tplPill3: 'Format Word (.docx) Asli',

      // Page Switcher & Filter tabs
      tplPageFreeTab: 'Template Gratis (4)',
      tplPageProTab: 'Template Berbayar / Pro (2)',
      filterAll: 'Semua Template',
      filterNasional: 'Standar Nasional (BUMN & Lokal)',
      filterInternasional: 'Standar Internasional (Global MNC)',
      filterFree: 'Akses Gratis',
      filterPro: 'Pro (Segera Hadir)',

      // Common card elements
      btnDownloadDocx: 'Unduh Format Word (.docx)',
      btnCopyText: 'Salin Teks',
      btnPreview: 'Pratinjau',
      hoverPreview: 'Pratinjau Dokumen Lengkap',
      hoverProComingSoon: 'Segera Hadir (Pro • Rp 25.000)',
      btnComingSoon: 'Berbayar (Pro • Rp 25.000) — Segera Hadir',
      cardProBadge: 'Pro • Rp 25.000',
      match98: '98% Cocok ATS',
      match97: '97% Cocok ATS',
      match99: '99% Cocok ATS',

      // Card 1: Classic Corporate
      c1Meta: 'Standar BUMN & Nasional',
      c1Title: 'Classic Corporate Indonesia',
      c1Desc: 'Format 1-kolom konservatif resmi yang paling disukai rekruter BUMN, Perbankan, FMCG, dan korporat swasta besar. Struktur rapi dengan pembagian section baku.',
      c1Spec1: '<strong>Hierarki Font:</strong> Calibri / Arial (Bebas font glitch)',
      c1Spec2: '<strong>Bagian Baku:</strong> Ringkasan, Pengalaman XYZ, Edukasi, Keahlian',
      c1Spec3: '<strong>Cocok untuk:</strong> HR, Keuangan, Operasional, Penjualan, Legal',
      c1PaperBadge: 'Format 1-Kolom BUMN',
      c1PaperPage: 'Halaman 1 dari 1',

      // Card 2: Fresh Grad
      c2Meta: 'Lulusan Baru & Pengalihan Karir',
      c2Title: 'Fresh Grad & Kampus Merdeka',
      c2Desc: 'Format yang menonjolkan riwayat pendidikan, skripsi/penelitian, magang mandiri/MSIB, dan kepemimpinan organisasi untuk kandidat dengan jam terbang awal.',
      c2Spec1: '<strong>Hierarki:</strong> Riwayat Edukasi & Proyek ditempatkan di atas',
      c2Spec2: '<strong>Sorotan Khusus:</strong> Sertifikasi pelatihan, kursus, & tools',
      c2Spec3: '<strong>Cocok untuk:</strong> Lulusan Baru, Pendidik, Intern, Switcher',
      c2PaperBadge: 'Utamakan Edukasi & Proyek',
      c2PaperPage: 'Halaman 1 dari 1',

      // Card 3: Executive Leadership
      c3Meta: 'Eksekutif & Manajerial',
      c3Title: 'Executive & P&L Leadership',
      c3Desc: 'Struktur 2-halaman berdensitas tinggi untuk Head of Department, General Manager, dan Direktur yang butuh menonjolkan tanggung jawab anggaran dan tim besar.',
      c3Spec1: '<strong>Fokus:</strong> Metrik P&L, Pertumbuhan Omset, & Skalabilitas Tim',
      c3Spec2: '<strong>Format:</strong> Ringkasan Eksekutif + Matriks Kompetensi Inti',
      c3Spec3: '<strong>Cocok untuk:</strong> VP, Direktur, General Manager, Senior Lead',
      c3PaperBadge: 'Standar Direktur & P&L',
      c3PaperPage: 'Halaman 1 dari 2',

      // Card 4: Global Tech
      c4Meta: 'Teknologi Global & Remote',
      c4Title: 'Global Tech & Software Engineer',
      c4Desc: 'Standar US & EU remote work. 0% data pribadi sensitif (bebas foto/usia demi kepatuhan anti-bias EEOC), dengan tautan GitHub, serta kategorisasi Tech Stack.',
      c4Spec1: '<strong>Bahasa Dokumen:</strong> Bahasa Inggris (Kata Kerja: Architected, Engineered)',
      c4Spec2: '<strong>Matriks Keahlian:</strong> Bahasa Pemrograman, Framework, Cloud, Basis Data',
      c4Spec3: '<strong>Cocok untuk:</strong> Fullstack, Backend, DevOps, Data Engineer',
      c4PaperBadge: 'Sesuai Standar Workday & Greenhouse',
      c4PaperPage: 'Halaman 1 dari 1',

      // Card 5: Global Product
      c5Meta: 'Produk Global & Operasional',
      c5Title: 'International Product & Operations',
      c5Desc: 'Format yang diformulasikan untuk Product Manager, Business Analyst, dan Growth Lead. Padat metrik kuantitatif (MRR, retensi, konversi, CAC).',
      c5Spec1: '<strong>Bahasa Dokumen:</strong> Bahasa Inggris (Kata Kerja: Spearheaded, Scaled)',
      c5Spec2: '<strong>Fokus:</strong> Riset Pengguna, Roadmap Produk, & Analisis Data',
      c5Spec3: '<strong>Cocok untuk:</strong> Product Manager, Business Analyst, Strategi & Operasional',
      c5PaperBadge: 'Fokus Metrik & Pertumbuhan ARR',
      c5PaperPage: 'Halaman 1 dari 1',

      // Card 6: Silicon Valley
      c6Meta: 'Startup Silicon Valley & Venture',
      c6Title: 'Silicon Valley Startup Elite',
      c6Desc: 'Layout 1-halaman ultra-padat dengan teknik penulisan high-signal low-noise untuk kandidat senior di ekosistem startup Seri A hingga Pra-IPO.',
      c6Spec1: '<strong>Format:</strong> 1 Halaman Berdensitas Tinggi Standar Silicon Valley',
      c6Spec2: '<strong>Fokus:</strong> Fase Inkubasi hingga Skala Besar, Kepemilikan Penuh',
      c6Spec3: '<strong>Cocok untuk:</strong> Staff Engineer, Growth Architect, Founding Ops',
      c6PaperBadge: 'Format Elite 1 Halaman',
      c6PaperPage: 'Halaman 1 dari 1',

      // Guide Section
      guideBadge: 'PANDUAN PRAKTISI REKRUTER',
      guideTitle: 'Perbedaan Kritis CV ATS Indonesia vs Internasional',
      guideSub: 'Banyak pelamar salah kaprah menyamakan seluruh CV ATS. Rekruter korporat lokal dan global memiliki kepatuhan sistem yang sangat berbeda.',
      guideIdTitle: 'Standar Nasional (BUMN & Swasta Lokal)',
      guideIdPoint1: '<strong>Domisili Kota Wajib:</strong> Cantumkan kota tinggal (misal: <em>Jakarta Timur, DKI Jakarta</em>) karena sering menjadi filter awal logistik penempatan kerja.',
      guideIdPoint2: '<strong>Gelar & IPK:</strong> Untuk BUMN dan perbankan, penulisan gelar formal (S.Psi., S.Kom.) dan IPK masih menjadi syarat administratif filter awal.',
      guideIdPoint3: '<strong>Sertifikasi Nasional:</strong> Sertifikasi BNSP, Brevet Pajak, atau sertifikasi lokal sangat dihargai dan perlu ditulis lengkap dengan nomor lisensi.',
      guideIntlTitle: 'Standar Internasional (US, EU & Global Remote)',
      guideIntlPoint1: '<strong>Anti-Bias EEOC (Strict):</strong> Dilarang memasukkan foto, tanggal lahir, usia, status perkawinan, atau agama. Pelanggaran ini memicu diskualifikasi otomatis sistem ATS global.',
      guideIntlPoint2: '<strong>Action Verbs Lampau:</strong> Setiap butir wajib diawali kata kerja berdaya tinggi (e.g., <em>Spearheaded, Accelerated, Formulated, Built</em>) bukan kalimat tugas rutin.',
      guideIntlPoint3: '<strong>Standar 1 Halaman:</strong> Di pasar AS/Eropa, kandidat di bawah 7 tahun pengalaman wajib memadatkan resume menjadi tepat 1 halaman (<em>single-page rule</em>).',

      // Modals
      tplModalTag: 'STANDAR FORMAT ATS',
      tplModalTitle: 'Pratinjau Struktur Template',
      tplModalSubtitle: 'Salin teks struktur ini ke Google Docs / Word Anda atau unduh langsung dalam berkas .docx siap edit.',
      tplModalDownload: 'Unduh Berkas .docx',
      tplModalCopy: 'Salin Teks Bersih',

      tplCsBadge: 'FITUR LANJUTAN • SEGERA HADIR',
      tplCsTitle: 'Template Sedang Disiapkan',
      tplCsDesc: 'Format ini sedang difinalisasi agar memenuhi regulasi terbaru rekruter. Punya permintaan format industri khusus atau ingin berkonsultasi langsung dengan Faari?',
      tplCsEmailBtn: 'Kirim Masukan via Email ke Faari',
      tplCsClose: 'Tutup',

      // Footer
      tplFooterDesc: 'Seluruh template disusun berdasarkan standar algoritma parser ATS industri terbuka (Workday, Taleo, Greenhouse, Lever). Bebas digunakan tanpa biaya lisensi.',
      tplFooterInquiry: 'Pertanyaan & Masukan:',
      tplFooterCopyright: '© 2026 Screenora. Built for High-Impact Job Seekers & Modern HR Teams by Faari.',

      // Toasts & Builder
      toastDownloaded: 'Template berhasil diunduh!',
      toastCopied: 'Format teks template berhasil disalin ke clipboard!',
      toastCopyFailed: 'Gagal menyalin teks secara otomatis.',
      btnBuildInstant: 'Buat CV Instan',
      btnBuildFromPreview: 'Edit di Live Builder',
      builderModalTitle: 'Live CV Builder (Standar ATS)',
      builderCopyBtn: 'Salin Teks',
      builderCheckAtsBtn: 'Cek Skor ATS →',
      builderDownloadBtn: 'Unduh .doc (Rp 25.000)',
      builderCopiedToast: 'Draf CV dari builder berhasil disalin ke clipboard!',
      builderLabelName: 'Nama Lengkap',
      builderLabelContact: 'Kontak, Domisili & LinkedIn',
      builderLabelSummary: 'Ringkasan Profil',
      builderLabelExperience: 'Pengalaman Kerja / Magang (Formula XYZ)',
      builderLabelEducation: 'Pendidikan',
      builderLabelSkills: 'Keahlian & Sertifikasi',
      builderPreviewLabel: 'Pratinjau Kertas A4 (Real-Time)',
      payModalTitle: 'Unduh CV ATS Siap Lamar (Rp 25.000)',
      payTabQris: 'QRIS (Semua E-Wallet & Bank)',
      payTabBca: 'VA Bank BCA',
      payQrisHint: 'Scan kode QRIS di atas menggunakan GoPay, OVO, DANA, ShopeePay, atau Mobile Banking (Nominal: Rp 25.000).',
      confirmPayWaBtn: 'Konfirmasi Pembayaran via WhatsApp',
      verifyPayBtn: 'Verifikasi & Unduh .doc',
      payInvalidCodeToast: 'Kode akses tidak valid. Silakan konfirmasi pembayaran via WhatsApp terlebih dahulu.',
      paySuccessToast: 'Akses terverifikasi! Mengunduh berkas CV .doc Anda...'
    },
    en: {
      tplNavHub: 'Templates Hub',
      tplNavSubtitle: 'Tested ATS Resume Template Catalog',
      navHome: 'Home',
      navScan: 'CV Screening',
      navTemplates: 'ATS Templates',
      navBuilder: 'Instant CV Builder',
      badgeNew: 'New',
      tplBackBtn: '← Back to CV Screening',
      tplHeroBadge: 'Validated Format Collection • Workday, Taleo, Greenhouse & SOE',
      tplHeroTitle: 'ATS Resume Template Catalog — National & International Standards',
      tplHeroDesc: 'Every template below is engineered with official single-column hierarchy, quantifiable XYZ bullet points, and recruiter-approved margins. Includes realistic paper previews and ready-to-use Word (.docx) downloads.',
      tplPill1: 'Single-Column Hierarchy',
      tplPill2: 'Formula XYZ & Action Verbs',
      tplPill3: 'Native Word (.docx) Format',

      // Page Switcher & Filter tabs
      tplPageFreeTab: 'Free Templates (4)',
      tplPageProTab: 'Paid / Pro Templates (2)',
      filterAll: 'All Templates',
      filterNasional: 'National Standard (SOE & Local)',
      filterInternasional: 'International Standard (Global MNC)',
      filterFree: 'Free Access',
      filterPro: 'Pro (Coming Soon)',

      // Common card elements
      btnDownloadDocx: 'Download Word Format (.docx)',
      btnCopyText: 'Copy Text',
      btnPreview: 'Preview',
      hoverPreview: 'Full Document Preview',
      hoverProComingSoon: 'Coming Soon (Pro • Rp 25.000)',
      btnComingSoon: 'Paid (Pro • Rp 25.000) — Coming Soon',
      cardProBadge: 'Pro • Rp 25.000',
      match98: '98% ATS Match',
      match97: '97% ATS Match',
      match99: '99% ATS Match',

      // Card 1: Classic Corporate
      c1Meta: 'SOE & National Standard',
      c1Title: 'Classic Corporate Indonesia',
      c1Desc: 'Official conservative single-column format favored by Indonesian SOEs (BUMN), Banking, FMCG, and major corporations. Clean layout with standard sections.',
      c1Spec1: '<strong>Font Hierarchy:</strong> Calibri / Arial (Glitch-free parsing)',
      c1Spec2: '<strong>Standard Sections:</strong> Summary, XYZ Experience, Education, Skills',
      c1Spec3: '<strong>Best For:</strong> HR, Finance, Operations, Sales, Legal',
      c1PaperBadge: 'SOE 1-Column Standard',
      c1PaperPage: 'Page 1 of 1',

      // Card 2: Fresh Grad
      c2Meta: 'Fresh Graduate & Career Switcher',
      c2Title: 'Fresh Graduate & MSIB Internship',
      c2Desc: 'Engineered to emphasize education, thesis research, verified internships, and leadership roles for early-career professionals.',
      c2Spec1: '<strong>Hierarchy:</strong> Education & Projects placed at the top',
      c2Spec2: '<strong>Highlights:</strong> Certifications, coursework, and practical tools',
      c2Spec3: '<strong>Best For:</strong> Fresh Graduates, Educators, Interns, Switchers',
      c2PaperBadge: 'Education & Project-First',
      c2PaperPage: 'Page 1 of 1',

      // Card 3: Executive Leadership
      c3Meta: 'Executive & Management',
      c3Title: 'Executive & P&L Leadership',
      c3Desc: 'High-density 2-page layout designed for Heads of Department, General Managers, and Directors highlighting large-scale P&L and team stewardship.',
      c3Spec1: '<strong>Focus:</strong> P&L metrics, Revenue Growth, and Team Scalability',
      c3Spec2: '<strong>Format:</strong> Executive Summary + Competencies Matrix',
      c3Spec3: '<strong>Best For:</strong> VP, Director, GM, Senior Department Lead',
      c3PaperBadge: 'Director & P&L Standard',
      c3PaperPage: 'Page 1 of 2',

      // Card 4: Global Tech
      c4Meta: 'Global Tech & Remote',
      c4Title: 'Global Tech & Software Engineer',
      c4Desc: 'US & EU remote work standard. 100% EEOC compliant (zero photo/age), verified GitHub links, and dense tech stack categorization.',
      c4Spec1: '<strong>Language:</strong> English (Action Verbs: Architected, Engineered)',
      c4Spec2: '<strong>Skills Matrix:</strong> Languages, Frameworks, Cloud, Databases',
      c4Spec3: '<strong>Best For:</strong> Fullstack, Backend, DevOps, Data Engineers',
      c4PaperBadge: 'Workday & Greenhouse Compliant',
      c4PaperPage: 'Page 1 of 1',

      // Card 5: Global Product
      c5Meta: 'Global Product & Ops',
      c5Title: 'International Product & Operations',
      c5Desc: 'Tailored for Product Managers, Business Analysts, and Growth Leads. Packed with quantitative outcome metrics (MRR, retention, conversion, CAC).',
      c5Spec1: '<strong>Language:</strong> English (Action Verbs: Spearheaded, Scaled)',
      c5Spec2: '<strong>Focus:</strong> User discovery, product roadmaps, data analytics',
      c5Spec3: '<strong>Best For:</strong> Product Managers, Business Analysts, Strategy & Ops',
      c5PaperBadge: 'Metrics & ARR Focused',
      c5PaperPage: 'Page 1 of 1',

      // Card 6: Silicon Valley
      c6Meta: 'Silicon Valley & Venture',
      c6Title: 'Silicon Valley Startup Elite',
      c6Desc: 'Ultra-dense 1-page layout with high-signal low-noise writing technique for senior talent in Series A to Pre-IPO startup ecosystems.',
      c6Spec1: '<strong>Format:</strong> 1-Page High-Density Silicon Valley Standard',
      c6Spec2: '<strong>Focus:</strong> Seed-to-Scale, 0-to-1 building, high ownership',
      c6Spec3: '<strong>Best For:</strong> Staff Engineers, Growth Architects, Founding Ops',
      c6PaperBadge: 'Elite 1-Page Layout',
      c6PaperPage: 'Page 1 of 1',

      // Guide Section
      guideBadge: 'RECRUITER PRACTITIONER GUIDE',
      guideTitle: 'Critical Differences: Indonesian vs International ATS Resumes',
      guideSub: 'Many applicants mistakenly treat all ATS resumes the same. Local Indonesian corporate recruiters and global multinational systems have vastly different compliance rules.',
      guideIdTitle: 'National Standard (Indonesian SOE & Local Corporate)',
      guideIdPoint1: '<strong>City of Residence Mandatory:</strong> Include your city of residence (e.g. <em>East Jakarta, DKI Jakarta</em>) as it often serves as an initial logistical filter for local placement.',
      guideIdPoint2: '<strong>Academic Degree & GPA:</strong> For Indonesian SOEs and banking, formal degree acronyms (S.Psi., S.Kom.) and GPA remain standard administrative gatekeeping criteria.',
      guideIdPoint3: '<strong>National Certifications:</strong> BNSP, Tax Brevet, or authorized local professional certifications carry high weight and should be listed with license numbers.',
      guideIntlTitle: 'International Standard (US, EU & Global Remote)',
      guideIntlPoint1: '<strong>Strict EEOC Anti-Bias:</strong> Never include photos, date of birth, age, marital status, or religion. Doing so triggers immediate automated rejection in US/EU ATS platforms.',
      guideIntlPoint2: '<strong>Past-Tense Action Verbs:</strong> Every bullet must start with strong power verbs (e.g., <em>Spearheaded, Accelerated, Formulated, Built</em>) instead of passive responsibility statements.',
      guideIntlPoint3: '<strong>Single-Page Rule:</strong> For US/European markets, candidates with under 7 years of experience must condense their resume into exactly 1 page.',

      // Modals
      tplModalTag: 'ATS RESUME STANDARD',
      tplModalTitle: 'Template Structure Preview',
      tplModalSubtitle: 'Copy this structural text directly into Google Docs / Word or download as an editable .docx file.',
      tplModalDownload: 'Download .docx File',
      tplModalCopy: 'Copy Clean Text',

      tplCsBadge: 'ADVANCED FEATURE • COMING SOON',
      tplCsTitle: 'Template Under Preparation',
      tplCsDesc: 'This format is currently being finalized to meet the latest recruiter criteria. Have a specific industry request or want to consult directly with Faari?',
      tplCsEmailBtn: 'Send Feedback via Email to Faari',
      tplCsClose: 'Close',

      // Footer
      tplFooterDesc: 'All templates are structured according to open enterprise ATS parser specifications (Workday, Taleo, Greenhouse, Lever). Free to use with zero licensing fees.',
      tplFooterInquiry: 'Inquiries & Feedback:',
      tplFooterCopyright: '© 2026 Screenora. Built for High-Impact Job Seekers & Modern HR Teams by Faari.',

      // Toasts & Builder
      toastDownloaded: 'Template downloaded successfully!',
      toastCopied: 'Template text copied to clipboard!',
      toastCopyFailed: 'Failed to copy text automatically.',
      btnBuildInstant: 'Build Instant CV',
      btnBuildFromPreview: 'Edit in Live Builder',
      builderModalTitle: 'Live CV Builder (ATS Standard)',
      builderCopyBtn: 'Copy Text',
      builderCheckAtsBtn: 'Check ATS Score →',
      builderDownloadBtn: 'Download .doc (Rp 25.000)',
      builderCopiedToast: 'CV draft from builder copied to clipboard!',
      builderLabelName: 'Full Name',
      builderLabelContact: 'Contact, Location & LinkedIn',
      builderLabelSummary: 'Professional Summary',
      builderLabelExperience: 'Work / Internship Experience (XYZ Formula)',
      builderLabelEducation: 'Education',
      builderLabelSkills: 'Skills & Certifications',
      builderPreviewLabel: 'A4 Paper Preview (Real-Time)',
      payModalTitle: 'Download ATS-Ready CV (Rp 25.000)',
      payTabQris: 'QRIS (All E-Wallets & Banks)',
      payTabBca: 'BCA Virtual Account',
      payQrisHint: 'Scan the QRIS code above using GoPay, OVO, DANA, ShopeePay, or Mobile Banking (Amount: Rp 25.000).',
      confirmPayWaBtn: 'Confirm Payment via WhatsApp',
      verifyPayBtn: 'Verify & Download .doc',
      payInvalidCodeToast: 'Invalid access code. Please confirm your payment via WhatsApp first.',
      paySuccessToast: 'Access verified! Downloading your .doc CV file...'
    }
  };

  // --------------------------------------------------------------------------
  // 3. STATE & INITIALIZATION
  // --------------------------------------------------------------------------
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  const storedLang = localStorage.getItem('screenora_lang');
  const initialLang = (urlLang === 'id' || urlLang === 'en')
    ? urlLang
    : ((storedLang === 'id' || storedLang === 'en') ? storedLang : 'id');

  const state = {
    theme: localStorage.getItem('screenora_theme') || 'dark',
    language: initialLang,
    activeFilter: 'all',
    currentActiveTemplate: null,
    currentBuilderTemplate: 'classic_corporate',
    payToken: (() => {
      try {
        return sessionStorage.getItem('screenora_pay_token') || '';
      } catch (_) {
        return '';
      }
    })(),
    payMethod: 'qris'
  };

  const DOM = {
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    themeIcon: document.getElementById('themeIcon'),
    themeLabel: document.getElementById('themeLabel'),
    langIdBtn: document.getElementById('langIdBtn'),
    langEnBtn: document.getElementById('langEnBtn'),
    filterBar: document.getElementById('filterBar'),
    templatesGrid: document.getElementById('templatesGrid'),
    previewModalOverlay: document.getElementById('previewModalOverlay'),
    previewTag: document.getElementById('previewTag'),
    previewTitle: document.getElementById('previewTitle'),
    previewSubtitle: document.getElementById('previewSubtitle'),
    previewModalContent: document.getElementById('previewModalContent'),
    previewTextContent: document.getElementById('previewTextContent'),
    previewDownloadBtn: document.getElementById('previewDownloadBtn'),
    previewCopyBtn: document.getElementById('previewCopyBtn'),
    previewToBuilderBtn: document.getElementById('previewToBuilderBtn'),
    comingSoonModalOverlay: document.getElementById('comingSoonModalOverlay'),
    comingSoonTitle: document.getElementById('comingSoonTitle'),
    builderModalOverlay: document.getElementById('builderModalOverlay'),
    closeBuilderModalBtn: document.getElementById('closeBuilderModalBtn'),
    builderTemplateSelect: document.getElementById('builderTemplateSelect'),
    builderName: document.getElementById('builderName'),
    builderContact: document.getElementById('builderContact'),
    builderSummary: document.getElementById('builderSummary'),
    builderExperience: document.getElementById('builderExperience'),
    builderEducation: document.getElementById('builderEducation'),
    builderSkills: document.getElementById('builderSkills'),
    builderLivePreview: document.getElementById('builderLivePreview'),
    builderCopyBtn: document.getElementById('builderCopyBtn'),
    builderCheckAtsBtn: document.getElementById('builderCheckAtsBtn'),
    builderDownloadBtn: document.getElementById('builderDownloadBtn'),
    builderPayModalOverlay: document.getElementById('builderPayModalOverlay'),
    closePayModalBtn: document.getElementById('closePayModalBtn'),
    payTabQrisBtn: document.getElementById('payTabQrisBtn'),
    payTabBcaBtn: document.getElementById('payTabBcaBtn'),
    payPanelQris: document.getElementById('payPanelQris'),
    payPanelBca: document.getElementById('payPanelBca'),
    builderQrisImg: document.getElementById('builderQrisImg'),
    builderQrisPlaceholder: document.getElementById('builderQrisPlaceholder'),
    payVaNumber: document.getElementById('payVaNumber'),
    copyVaBcaBtn: document.getElementById('copyVaBcaBtn'),
    confirmPayWaBtn: document.getElementById('confirmPayWaBtn'),
    builderAccessCodeInput: document.getElementById('builderAccessCodeInput'),
    verifyPayBtn: document.getElementById('verifyPayBtn'),
    toast: document.getElementById('toast'),
    toastMsg: document.getElementById('toastMsg')
  };

  // --------------------------------------------------------------------------
  // 3. THEME MANAGEMENT
  // --------------------------------------------------------------------------
  function applyTheme(theme) {
    state.theme = theme;
    localStorage.setItem('screenora_theme', theme);
    const htmlEl = document.documentElement;

    if (theme === 'dark') {
      htmlEl.classList.add('dark');
      if (DOM.themeIcon) {
        DOM.themeIcon.innerHTML = `<svg class="w-3.5 h-3.5 text-dark-textSec" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`;
      }
      if (DOM.themeLabel) DOM.themeLabel.textContent = 'Dark';
    } else {
      htmlEl.classList.remove('dark');
      if (DOM.themeIcon) {
        DOM.themeIcon.innerHTML = `<svg class="w-3.5 h-3.5 text-dark-textSec" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" stroke-width="2"></circle><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>`;
      }
      if (DOM.themeLabel) DOM.themeLabel.textContent = 'Light';
    }
  }

  function toggleTheme() {
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  }

  // --------------------------------------------------------------------------
  // 4. LANGUAGE MANAGEMENT
  // --------------------------------------------------------------------------
  function setLanguage(lang) {
    state.language = lang;
    localStorage.setItem('screenora_lang', lang);
    document.documentElement.lang = lang;

    if (lang === 'id') {
      if (DOM.langIdBtn) {
        DOM.langIdBtn.className = 'px-2.5 py-1 rounded-md transition-all bg-dark-surface dark:bg-dark-surface text-dark-textPri dark:text-dark-textPri shadow-sm font-semibold';
      }
      if (DOM.langEnBtn) {
        DOM.langEnBtn.className = 'px-2.5 py-1 rounded-md transition-all text-dark-textSec dark:text-dark-textSec hover:text-dark-textPri';
      }
    } else {
      if (DOM.langEnBtn) {
        DOM.langEnBtn.className = 'px-2.5 py-1 rounded-md transition-all bg-dark-surface dark:bg-dark-surface text-dark-textPri dark:text-dark-textPri shadow-sm font-semibold';
      }
      if (DOM.langIdBtn) {
        DOM.langIdBtn.className = 'px-2.5 py-1 rounded-md transition-all text-dark-textSec dark:text-dark-textSec hover:text-dark-textPri';
      }
    }

    const dict = i18n[lang];
    if (dict) {
      document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
          if (key === 'filterAll') {
            const cardCount = document.querySelectorAll('.template-card').length;
            el.textContent = `${dict[key]} (${cardCount})`;
          } else if (dict[key].includes('<') && dict[key].includes('>')) {
            el.innerHTML = dict[key];
          } else {
            el.textContent = dict[key];
          }
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // 5. TOAST NOTIFICATION
  // --------------------------------------------------------------------------
  let toastTimer = null;
  function showToast(msg) {
    if (!DOM.toast || !DOM.toastMsg) return;
    DOM.toastMsg.textContent = msg;
    DOM.toast.classList.remove('translate-y-20', 'opacity-0');
    DOM.toast.classList.add('translate-y-0', 'opacity-100');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      DOM.toast.classList.remove('translate-y-0', 'opacity-100');
      DOM.toast.classList.add('translate-y-20', 'opacity-0');
    }, 3200);
  }

  // --------------------------------------------------------------------------
  // 6. FILTERING LOGIC
  // --------------------------------------------------------------------------
  function applyFilter(filter) {
    state.activeFilter = filter;
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach((btn) => {
      if (btn.getAttribute('data-filter') === filter) {
        btn.className = 'filter-btn active px-4 py-2 rounded-xl text-xs font-heading font-semibold transition-all bg-dark-surface border border-slate-400/50 text-slate-900 dark:text-white shadow-sm whitespace-nowrap';
      } else {
        btn.className = 'filter-btn px-4 py-2 rounded-xl text-xs font-heading font-medium text-dark-textSec hover:text-dark-textPri hover:bg-dark-surface/60 border border-transparent transition-all whitespace-nowrap';
      }
    });

    const cards = document.querySelectorAll('.template-card');
    cards.forEach((card) => {
      const category = (card.getAttribute('data-category') || '').trim();
      const categories = category ? category.split(/\s+/) : [];
      const isVisible = filter === 'all' || categories.includes(filter);
      card.classList.remove('hidden');
      card.style.display = isVisible ? 'flex' : 'none';
    });
  }

  // --------------------------------------------------------------------------
  // 7. DOWNLOAD ENGINE (GENERATE CLEAN NATIVE WORD DOCUMENT)
  // --------------------------------------------------------------------------
  function isSectionHeaderLine(trimmed) {
    return (
      trimmed === trimmed.toUpperCase() &&
      trimmed.length > 3 &&
      !trimmed.startsWith('- ') &&
      !trimmed.includes('|') &&
      !trimmed.includes('@')
    );
  }

  function renderPlainTextAsWordHtml(plainText) {
    if (!plainText || !plainText.trim()) return '';

    const lines = plainText.split('\n');
    let htmlBody = '';

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        htmlBody += '<p style="margin: 0; line-height: 1.2;">&nbsp;</p>';
      } else if (isSectionHeaderLine(trimmed)) {
        // Section Header (RINGKASAN, PENGALAMAN, etc.)
        htmlBody += `<h3 style="margin-top: 14pt; margin-bottom: 4pt; font-size: 11pt; font-family: Calibri, Arial, sans-serif; font-weight: bold; color: #0F172A; text-transform: uppercase; border-bottom: 1px solid #94A3B8; padding-bottom: 2pt;">${escapeHtml(trimmed)}</h3>`;
      } else if (trimmed.startsWith('- ')) {
        // Bullet point
        htmlBody += `<p style="margin: 2pt 0 2pt 18pt; text-indent: -12pt; font-size: 10pt; font-family: Calibri, Arial, sans-serif; line-height: 1.35; color: #334155;">&bull; ${escapeHtml(trimmed.substring(2))}</p>`;
      } else if (idx === 0) {
        // Candidate Name (Title)
        htmlBody += `<h1 style="margin: 0 0 2pt 0; font-size: 18pt; font-family: Calibri, Arial, sans-serif; font-weight: bold; color: #0F172A; text-align: left;">${escapeHtml(trimmed)}</h1>`;
      } else if (idx === 1) {
        // Contact details subtitle
        htmlBody += `<p style="margin: 0 0 10pt 0; font-size: 9.5pt; font-family: Calibri, Arial, sans-serif; color: #475569;">${escapeHtml(trimmed)}</p>`;
      } else if (trimmed.includes(' | ') || trimmed.includes(' — ')) {
        // Role & Company Subhead
        htmlBody += `<p style="margin-top: 6pt; margin-bottom: 2pt; font-size: 10.5pt; font-family: Calibri, Arial, sans-serif; font-weight: bold; color: #1E293B;">${escapeHtml(trimmed)}</p>`;
      } else {
        // Regular paragraph
        htmlBody += `<p style="margin: 3pt 0; font-size: 10pt; font-family: Calibri, Arial, sans-serif; line-height: 1.4; color: #334155;">${escapeHtml(trimmed)}</p>`;
      }
    });

    return htmlBody;
  }

  function exportPlainTextToWord(plainText, docTitle, fileName) {
    if (!plainText || !plainText.trim()) return;

    // Convert plain text into formatted Word-compatible HTML document with standard 1-inch margins
    const htmlBody = renderPlainTextAsWordHtml(plainText);

    const fullDocumentContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${escapeHtml(docTitle || 'CV ATS')}</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page Section1 {
            size: 8.5in 11.0in;
            margin: 1.0in 1.0in 1.0in 1.0in;
            mso-header-margin: 0.5in;
            mso-footer-margin: 0.5in;
            mso-paper-source: 0;
          }
          div.Section1 { page: Section1; }
          body { font-family: Calibri, Arial, sans-serif; }
        </style>
      </head>
      <body>
        <div class="Section1">
          ${htmlBody}
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', fullDocumentContent], {
      type: 'application/msword;charset=utf-8'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || 'CV_ATS_Screenora.doc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function downloadTemplate(templateKey) {
    const tmpl = TEMPLATES[templateKey];
    if (!tmpl) {
      showToast(state.language === 'id' ? 'Template tidak ditemukan.' : 'Template not found.');
      return;
    }

    exportPlainTextToWord(tmpl.plainText, tmpl.title, tmpl.filename);
    showToast(state.language === 'id' ? `Template ${tmpl.title} berhasil diunduh!` : `Template ${tmpl.title} downloaded successfully!`);
  }

  // --------------------------------------------------------------------------
  // 8. COPY PLAIN TEXT ENGINE
  // --------------------------------------------------------------------------
  function copyTextToClipboard(text, successMsg) {
    const msg = successMsg || (state.language === 'id' ? i18n.id.toastCopied : i18n.en.toastCopied);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(msg);
      }).catch(() => fallbackCopy(text, msg));
    } else {
      fallbackCopy(text, msg);
    }
  }

  function copyTemplateText(templateKey) {
    const tmpl = TEMPLATES[templateKey];
    if (!tmpl) return;
    copyTextToClipboard(tmpl.plainText);
  }

  function fallbackCopy(text, successMsg) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(successMsg || (state.language === 'id' ? i18n.id.toastCopied : i18n.en.toastCopied));
    } catch (e) {
      showToast(state.language === 'id' ? i18n.id.toastCopyFailed : i18n.en.toastCopyFailed);
    }
    document.body.removeChild(textArea);
  }

  // --------------------------------------------------------------------------
  // 9. MODALS (PREVIEW & COMING SOON)
  // --------------------------------------------------------------------------
  function openPreviewModal(templateKey) {
    const tmpl = TEMPLATES[templateKey];
    if (!tmpl || !DOM.previewModalOverlay) return;

    state.currentActiveTemplate = templateKey;
    const lang = state.language || 'id';
    const dict = i18n[lang] || i18n.id;

    const metaMap = {
      classic_corporate: { titleKey: 'c1Title', descKey: 'c1Desc', tag: lang === 'en' ? 'NATIONAL STANDARD • OFFICIAL 1-COLUMN' : 'STANDAR NASIONAL • 1-KOLOM RESMI' },
      fresh_graduate: { titleKey: 'c2Title', descKey: 'c2Desc', tag: lang === 'en' ? 'NATIONAL STANDARD • ENTRY LEVEL' : 'STANDAR NASIONAL • ENTRY LEVEL' },
      global_tech: { titleKey: 'c4Title', descKey: 'c4Desc', tag: 'INTERNATIONAL ATS • WORKDAY & GREENHOUSE READY' },
      global_product: { titleKey: 'c5Title', descKey: 'c5Desc', tag: lang === 'en' ? 'INTERNATIONAL ATS • METRIC & KPI FOCUSED' : 'STANDAR INTERNASIONAL • METRIC & KPI' }
    };

    const meta = metaMap[templateKey];
    if (DOM.previewTag) DOM.previewTag.textContent = meta ? meta.tag : tmpl.tag;
    if (DOM.previewTitle) DOM.previewTitle.textContent = (meta && dict[meta.titleKey]) ? dict[meta.titleKey] : tmpl.title;
    if (DOM.previewSubtitle) DOM.previewSubtitle.textContent = (meta && dict[meta.descKey]) ? dict[meta.descKey] : tmpl.description;
    const previewContainer = DOM.previewModalContent || DOM.previewTextContent;
    if (previewContainer) {
      previewContainer.innerHTML = `<div style="background:#ffffff;color:#1E293B;font-family:Calibri,Arial,sans-serif;padding:24px 28px;border-radius:8px;border:1px solid #e2e8f0;box-shadow:0 4px 16px rgba(0,0,0,0.08);overflow-x:auto;word-break:break-word;">${renderPlainTextAsWordHtml(tmpl.plainText)}</div>`;
      previewContainer.scrollTop = 0;
    }

    if (DOM.previewDownloadBtn) {
      DOM.previewDownloadBtn.onclick = () => downloadTemplate(templateKey);
    }
    if (DOM.previewCopyBtn) {
      DOM.previewCopyBtn.onclick = () => copyTemplateText(templateKey);
    }

    DOM.previewModalOverlay.classList.remove('hidden');
    DOM.previewModalOverlay.classList.add('flex');
  }

  function closePreviewModal() {
    if (DOM.previewModalOverlay) {
      DOM.previewModalOverlay.classList.add('hidden');
    }
  }

  function openComingSoonModal(templateName) {
    if (!DOM.comingSoonModalOverlay) return;
    if (DOM.comingSoonTitle) {
      DOM.comingSoonTitle.textContent = state.language === 'id' ? `Template ${templateName} Sedang Disiapkan` : `Template ${templateName} Under Preparation`;
    }
    DOM.comingSoonModalOverlay.classList.remove('hidden');
  }

  function closeComingSoonModal() {
    if (DOM.comingSoonModalOverlay) {
      DOM.comingSoonModalOverlay.classList.add('hidden');
    }
  }

  // --------------------------------------------------------------------------
  // 9B. LIVE CV BUILDER ENGINE
  // --------------------------------------------------------------------------
  function classifySectionHeader(headerUpper) {
    if (/^(RINGKASAN|SUMMARY|PROFESSIONAL SUMMARY|EXECUTIVE SUMMARY|PROFIL)/.test(headerUpper)) {
      return 'summary';
    }
    if (/^(PENGALAMAN|EXPERIENCE|PROFESSIONAL EXPERIENCE|VENTURE EXPERIENCE)/.test(headerUpper)) {
      return 'experience';
    }
    if (/^(RIWAYAT PENDIDIKAN|PENDIDIKAN|EDUCATION)/.test(headerUpper)) {
      return 'education';
    }
    if (/^(KEAHLIAN|SKILLS|TECHNICAL SKILLS|CORE COMPETENCIES|CORE EXPERTISE|CERTIFICATIONS|SERTIFIKASI|KEY PROJECTS)/.test(headerUpper)) {
      return 'skills';
    }
    return null;
  }

  function parseTemplateToBuilderFields(templateKey) {
    const tmpl = TEMPLATES[templateKey] || TEMPLATES.classic_corporate;
    const result = {
      name: '',
      contact: '',
      summary: '',
      experience: '',
      education: '',
      skills: ''
    };
    if (!tmpl || !tmpl.plainText) return result;

    const lines = tmpl.plainText.split('\n');
    const contactLines = [];
    const buckets = {
      summary: [],
      experience: [],
      education: [],
      skills: []
    };

    let currentSection = null;
    let firstSectionSeen = false;

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (idx === 0) {
        result.name = trimmed;
        return;
      }

      if (trimmed && isSectionHeaderLine(trimmed)) {
        const mapped = classifySectionHeader(trimmed.toUpperCase());
        if (mapped) {
          firstSectionSeen = true;
          // Preserve sub-header if this bucket already has content (e.g., PENGALAMAN ORGANISASI or CERTIFICATIONS)
          if (buckets[mapped].length > 0) {
            buckets[mapped].push('', trimmed);
          }
          currentSection = mapped;
          return;
        }
      }

      if (!firstSectionSeen) {
        if (trimmed) contactLines.push(trimmed);
        return;
      }

      if (currentSection && buckets[currentSection]) {
        buckets[currentSection].push(line);
      }
    });

    result.contact = contactLines.join('\n').trim();
    result.summary = buckets.summary.join('\n').trim();
    result.experience = buckets.experience.join('\n').trim();
    result.education = buckets.education.join('\n').trim();
    result.skills = buckets.skills.join('\n').trim();
    return result;
  }

  function assembleBuilderPlainText() {
    const name = DOM.builderName ? DOM.builderName.value.trim() : '';
    const contact = DOM.builderContact ? DOM.builderContact.value.trim() : '';
    const summary = DOM.builderSummary ? DOM.builderSummary.value.trim() : '';
    const experience = DOM.builderExperience ? DOM.builderExperience.value.trim() : '';
    const education = DOM.builderEducation ? DOM.builderEducation.value.trim() : '';
    const skills = DOM.builderSkills ? DOM.builderSkills.value.trim() : '';

    const isIntlTemplate = ['global_tech', 'global_product', 'silicon_valley'].includes(state.currentBuilderTemplate);
    const useEnLabels = isIntlTemplate || (!TEMPLATES[state.currentBuilderTemplate] && state.language === 'en');

    const headers = useEnLabels
      ? {
          summary: 'PROFESSIONAL SUMMARY',
          experience: 'PROFESSIONAL EXPERIENCE',
          education: 'EDUCATION',
          skills: 'SKILLS & CERTIFICATIONS'
        }
      : {
          summary: 'RINGKASAN PROFESIONAL',
          experience: 'PENGALAMAN KERJA',
          education: 'RIWAYAT PENDIDIKAN',
          skills: 'KEAHLIAN & SERTIFIKASI'
        };

    const blocks = [];
    const headerLines = [];
    if (name) headerLines.push(name);
    if (contact) headerLines.push(contact);
    if (headerLines.length > 0) blocks.push(headerLines.join('\n'));

    if (summary) blocks.push(`${headers.summary}\n${summary}`);
    if (experience) blocks.push(`${headers.experience}\n${experience}`);
    if (education) blocks.push(`${headers.education}\n${education}`);
    if (skills) blocks.push(`${headers.skills}\n${skills}`);

    return blocks.join('\n\n').trim();
  }

  function renderBuilderLivePreview() {
    if (!DOM.builderLivePreview) return;

    const text = assembleBuilderPlainText();
    if (!text) {
      const emptyMsg = state.language === 'id'
        ? 'Isi form di sebelah kiri untuk melihat pratinjau CV standar ATS secara real-time...'
        : 'Fill out the form on the left to see a real-time ATS resume preview...';
      DOM.builderLivePreview.innerHTML = `<p style="color:#64748b;font-size:12px;font-style:italic;">${escapeHtml(emptyMsg)}</p>`;
      return;
    }

    const lines = text.split('\n');
    let html = '';
    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        html += '<div style="height:6px;"></div>';
      } else if (isSectionHeaderLine(trimmed)) {
        html += `<h3 style="margin-top:12px;margin-bottom:4px;font-size:11px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.04em;border-bottom:1px solid #cbd5e1;padding-bottom:2px;">${escapeHtml(trimmed)}</h3>`;
      } else if (trimmed.startsWith('- ')) {
        html += `<p style="margin:2px 0 2px 14px;text-indent:-10px;font-size:10.5px;line-height:1.4;color:#334155;">&bull; ${escapeHtml(trimmed.substring(2))}</p>`;
      } else if (idx === 0) {
        html += `<h1 style="margin:0 0 2px 0;font-size:16px;font-weight:800;color:#0f172a;letter-spacing:-0.01em;">${escapeHtml(trimmed)}</h1>`;
      } else if (idx === 1) {
        html += `<p style="margin:0 0 8px 0;font-size:10px;color:#475569;">${escapeHtml(trimmed)}</p>`;
      } else if (trimmed.includes(' | ') || trimmed.includes(' — ')) {
        html += `<p style="margin:6px 0 2px 0;font-size:10.5px;font-weight:700;color:#1e293b;">${escapeHtml(trimmed)}</p>`;
      } else {
        html += `<p style="margin:2px 0;font-size:10.5px;line-height:1.45;color:#334155;">${escapeHtml(trimmed)}</p>`;
      }
    });

    DOM.builderLivePreview.innerHTML = html;
  }

  function openCvBuilder(templateKey = 'classic_corporate') {
    const resolvedKey = TEMPLATES[templateKey] ? templateKey : 'classic_corporate';
    state.currentBuilderTemplate = resolvedKey;

    if (DOM.builderTemplateSelect) {
      DOM.builderTemplateSelect.value = resolvedKey;
    }

    const fields = parseTemplateToBuilderFields(resolvedKey);
    if (DOM.builderName) DOM.builderName.value = fields.name;
    if (DOM.builderContact) DOM.builderContact.value = fields.contact;
    if (DOM.builderSummary) DOM.builderSummary.value = fields.summary;
    if (DOM.builderExperience) DOM.builderExperience.value = fields.experience;
    if (DOM.builderEducation) DOM.builderEducation.value = fields.education;
    if (DOM.builderSkills) DOM.builderSkills.value = fields.skills;

    renderBuilderLivePreview();

    if (DOM.builderModalOverlay) {
      DOM.builderModalOverlay.classList.remove('hidden');
    }
  }

  function closeBuilderModal() {
    if (DOM.builderModalOverlay) {
      DOM.builderModalOverlay.classList.add('hidden');
    }
  }

  function setPayMethod(method) {
    state.payMethod = method === 'bca' ? 'bca' : 'qris';
    const isQris = state.payMethod === 'qris';

    if (DOM.payPanelQris) {
      DOM.payPanelQris.classList.toggle('hidden', !isQris);
    }
    if (DOM.payPanelBca) {
      DOM.payPanelBca.classList.toggle('hidden', isQris);
    }

    const baseClass = 'py-2 px-2.5 rounded-lg text-[11px] font-heading tracking-tight transition-colors text-center';
    const activeClass = `${baseClass} font-semibold bg-dark-surface text-slate-900 dark:text-white border border-slate-400/50 shadow-sm`;
    const inactiveClass = `${baseClass} font-medium bg-transparent text-dark-textSec hover:text-dark-textPri border border-transparent`;

    if (DOM.payTabQrisBtn) {
      DOM.payTabQrisBtn.setAttribute('aria-selected', isQris ? 'true' : 'false');
      DOM.payTabQrisBtn.className = isQris ? activeClass : inactiveClass;
    }
    if (DOM.payTabBcaBtn) {
      DOM.payTabBcaBtn.setAttribute('aria-selected', !isQris ? 'true' : 'false');
      DOM.payTabBcaBtn.className = !isQris ? activeClass : inactiveClass;
    }
  }

  function openPayModal() {
    if (DOM.payVaNumber) {
      DOM.payVaNumber.textContent = PAYMENT_CONFIG.bcaVaDisplay;
    }

    const hasQrisImg = Boolean(PAYMENT_CONFIG.qrisImageUrl && PAYMENT_CONFIG.qrisImageUrl.trim());
    if (DOM.builderQrisImg) {
      if (hasQrisImg) {
        DOM.builderQrisImg.src = PAYMENT_CONFIG.qrisImageUrl.trim();
        DOM.builderQrisImg.classList.remove('hidden');
      } else {
        DOM.builderQrisImg.classList.add('hidden');
      }
    }
    if (DOM.builderQrisPlaceholder) {
      DOM.builderQrisPlaceholder.classList.toggle('hidden', hasQrisImg);
    }

    setPayMethod(state.payMethod || 'qris');

    if (DOM.builderPayModalOverlay) {
      DOM.builderPayModalOverlay.classList.remove('hidden');
    }
  }

  function closePayModal() {
    if (DOM.builderPayModalOverlay) {
      DOM.builderPayModalOverlay.classList.add('hidden');
    }
  }

  function downloadBuilderDoc(options) {
    const silentToast = options && options.silentToast;
    const text = assembleBuilderPlainText();
    if (!text) {
      showToast(state.language === 'id' ? 'Isi minimal satu bagian CV terlebih dahulu.' : 'Please fill in at least one CV section first.');
      return false;
    }
    const name = (DOM.builderName && DOM.builderName.value.trim()) || 'CV_ATS';
    const safeSlug = name.replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'CV_ATS';
    const fileName = `CV_ATS_${safeSlug}_Screenora.doc`;
    exportPlainTextToWord(text, name, fileName);
    if (!silentToast) {
      showToast(state.language === 'id' ? `Berhasil mengunduh ${fileName}!` : `Downloaded ${fileName} successfully!`);
    }
    return true;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --------------------------------------------------------------------------
  // 10. BIND EVENTS & INITIALIZE
  // --------------------------------------------------------------------------
  function init() {
    // Apply saved theme
    applyTheme(state.theme);

    // Apply saved language
    setLanguage(state.language);

    // Theme toggle
    if (DOM.themeToggleBtn) {
      DOM.themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // Language buttons
    if (DOM.langIdBtn) {
      DOM.langIdBtn.addEventListener('click', () => setLanguage('id'));
    }
    if (DOM.langEnBtn) {
      DOM.langEnBtn.addEventListener('click', () => setLanguage('en'));
    }

    // Filter clicks
    if (DOM.filterBar) {
      DOM.filterBar.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (btn) {
          const filter = btn.getAttribute('data-filter');
          if (filter) applyFilter(filter);
        }
      });
    }

    // Modal background clicks
    if (DOM.previewModalOverlay) {
      DOM.previewModalOverlay.addEventListener('click', (e) => {
        if (e.target === DOM.previewModalOverlay) closePreviewModal();
      });
    }
    if (DOM.comingSoonModalOverlay) {
      DOM.comingSoonModalOverlay.addEventListener('click', (e) => {
        if (e.target === DOM.comingSoonModalOverlay) closeComingSoonModal();
      });
    }
    if (DOM.builderModalOverlay) {
      DOM.builderModalOverlay.addEventListener('click', (e) => {
        if (e.target === DOM.builderModalOverlay) closeBuilderModal();
      });
    }
    if (DOM.closeBuilderModalBtn) {
      DOM.closeBuilderModalBtn.addEventListener('click', closeBuilderModal);
    }
    if (DOM.builderPayModalOverlay) {
      DOM.builderPayModalOverlay.addEventListener('click', (e) => {
        if (e.target === DOM.builderPayModalOverlay) closePayModal();
      });
    }
    if (DOM.closePayModalBtn) {
      DOM.closePayModalBtn.addEventListener('click', closePayModal);
    }

    // Live CV Builder form bindings
    [
      DOM.builderName,
      DOM.builderContact,
      DOM.builderSummary,
      DOM.builderExperience,
      DOM.builderEducation,
      DOM.builderSkills
    ].forEach((inputEl) => {
      if (inputEl) {
        inputEl.addEventListener('input', renderBuilderLivePreview);
      }
    });

    if (DOM.builderTemplateSelect) {
      DOM.builderTemplateSelect.addEventListener('change', (e) => {
        openCvBuilder(e.target.value);
      });
    }

    if (DOM.previewToBuilderBtn) {
      DOM.previewToBuilderBtn.addEventListener('click', () => {
        window.location.href = 'builder.html?template=' + encodeURIComponent(state.currentActiveTemplate || 'classic_corporate');
      });
    }

    if (DOM.builderCopyBtn) {
      DOM.builderCopyBtn.addEventListener('click', () => {
        const text = assembleBuilderPlainText();
        if (!text) {
          showToast(state.language === 'id' ? 'Isi minimal satu bagian CV terlebih dahulu.' : 'Please fill in at least one CV section first.');
          return;
        }
        const dict = i18n[state.language] || i18n.id;
        copyTextToClipboard(text, dict.builderCopiedToast);
      });
    }

    if (DOM.builderDownloadBtn) {
      DOM.builderDownloadBtn.addEventListener('click', async () => {
        const text = assembleBuilderPlainText();
        if (!text) {
          showToast(state.language === 'id' ? 'Isi minimal satu bagian CV terlebih dahulu.' : 'Please fill in at least one CV section first.');
          return;
        }
        if (state.payToken) {
          try {
            const res = await fetch('/api/verify-download', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token: state.payToken })
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok && data.ok) {
              downloadBuilderDoc();
              return;
            }
          } catch (_) {
            // Fall through to payment modal
          }
          state.payToken = '';
          try { sessionStorage.removeItem('screenora_pay_token'); } catch (_) {}
        }
        openPayModal();
      });
    }

    if (DOM.payTabQrisBtn) {
      DOM.payTabQrisBtn.addEventListener('click', () => setPayMethod('qris'));
    }
    if (DOM.payTabBcaBtn) {
      DOM.payTabBcaBtn.addEventListener('click', () => setPayMethod('bca'));
    }
    if (DOM.copyVaBcaBtn) {
      DOM.copyVaBcaBtn.addEventListener('click', () => {
        const msg = state.language === 'id' ? 'Nomor VA BCA berhasil disalin!' : 'BCA Virtual Account number copied!';
        copyTextToClipboard(PAYMENT_CONFIG.bcaVaNumber, msg);
      });
    }
    if (DOM.confirmPayWaBtn) {
      DOM.confirmPayWaBtn.addEventListener('click', () => {
        const methodLabel = state.payMethod === 'bca' ? 'VA Bank BCA' : 'QRIS';
        const candidateName = (DOM.builderName && DOM.builderName.value.trim()) || '-';
        const message = state.language === 'id'
          ? `Halo Admin Screenora, saya sudah melakukan pembayaran untuk Unduh CV Builder (.doc).\n• Metode: ${methodLabel}\n• Nominal: ${PAYMENT_CONFIG.amountText}\n• Nama Kandidat: ${candidateName}\nMohon verifikasi dan kirimkan kode aksesnya. Terima kasih!`
          : `Hello Screenora Admin, I have completed the payment for CV Builder Download (.doc).\n• Method: ${methodLabel}\n• Amount: ${PAYMENT_CONFIG.amountText}\n• Candidate Name: ${candidateName}\nPlease verify and send the access code. Thank you!`;
        const waUrl = `https://wa.me/${PAYMENT_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      });
    }
    if (DOM.verifyPayBtn) {
      DOM.verifyPayBtn.addEventListener('click', async () => {
        const dict = i18n[state.language] || i18n.id;
        const inputCode = (DOM.builderAccessCodeInput && DOM.builderAccessCodeInput.value || '').trim().toUpperCase();
        if (!inputCode) {
          showToast(dict.payInvalidCodeToast);
          return;
        }
        DOM.verifyPayBtn.disabled = true;
        try {
          const res = await fetch('/api/verify-download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: inputCode })
          });
          const data = await res.json().catch(() => ({}));
          if (res.ok && data.ok && data.token) {
            state.payToken = data.token;
            try {
              sessionStorage.setItem('screenora_pay_token', data.token);
            } catch (_) {
              // Ignore storage quota or privacy mode errors
            }
            closePayModal();
            showToast(dict.paySuccessToast);
            downloadBuilderDoc({ silentToast: true });
          } else if (res.status === 429) {
            showToast(state.language === 'id' ? 'Terlalu banyak percobaan. Tunggu 5 menit.' : 'Too many attempts. Please wait 5 minutes.');
          } else {
            showToast(dict.payInvalidCodeToast);
          }
        } catch (_) {
          showToast(state.language === 'id' ? 'Verifikasi butuh koneksi server aktif (Vercel).' : 'Verification requires active server connection.');
        } finally {
          DOM.verifyPayBtn.disabled = false;
        }
      });
    }

    if (DOM.builderCheckAtsBtn) {
      DOM.builderCheckAtsBtn.addEventListener('click', () => {
        const text = assembleBuilderPlainText();
        if (!text) {
          showToast(state.language === 'id' ? 'Isi minimal satu bagian CV terlebih dahulu.' : 'Please fill in at least one CV section first.');
          return;
        }
        try {
          sessionStorage.setItem('screenora_builder_draft', text);
        } catch (_) {
          // Ignore storage quota or privacy mode errors
        }
        window.location.href = 'screener.html?from=builder';
      });
    }

    // Close active modals on Escape key for keyboard accessibility
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closePreviewModal();
        closeComingSoonModal();
        closeBuilderModal();
        closePayModal();
      }
    });

    // Expose functions to window for onclick attributes
    window.downloadTemplate = downloadTemplate;
    window.copyTemplateText = copyTemplateText;
    window.openPreviewModal = openPreviewModal;
    window.closePreviewModal = closePreviewModal;
    window.openComingSoonModal = openComingSoonModal;
    window.closeComingSoonModal = closeComingSoonModal;
    window.openCvBuilder = openCvBuilder;
    window.closeBuilderModal = closeBuilderModal;
    window.openPayModal = openPayModal;
    window.closePayModal = closePayModal;
    window.setPayMethod = setPayMethod;
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
