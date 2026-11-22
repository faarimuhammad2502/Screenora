/**
 * SCREENORA — INSTANT CV BUILDER ENGINE (builder.js)
 * Client-Side Zero-Data Retention ATS CV Builder & Auto-Optimize XYZ Engine
 * Author: Muhammad Faari Akbar (Faari)
 */

(function () {
  'use strict';

  const PAYMENT_CONFIG = {
    amountText: 'Rp 25.000',
    bcaVaNumber: '8801085892344722',
    bcaVaDisplay: '8801 0858 9234 4722',
    qrisImageUrl: '',
    whatsappNumber: '6285892344722'
  };

  // --------------------------------------------------------------------------
  // 1. BASE TEMPLATES (4 CORE ATS FORMATS)
  // --------------------------------------------------------------------------
  const TEMPLATES = {
    classic_corporate: {
      id: 'classic_corporate',
      title: 'Classic Corporate Indonesia (BUMN & Swasta)',
      filename: 'CV_ATS_Classic_Corporate_Screenora.doc',
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
      filename: 'CV_ATS_Fresh_Graduate_Screenora.doc',
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
      filename: 'Resume_Global_Software_Engineer_Screenora.doc',
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
      filename: 'Resume_Global_Product_Manager_Screenora.doc',
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
    }
  };

  // --------------------------------------------------------------------------
  // 2. ROLE PRESETS (7 ROLES FOR 1-CLICK XYZ EXPERIENCE INSERTION)
  // --------------------------------------------------------------------------
  const ROLE_PRESETS = {
    hr: {
      id: [
        '- Memimpin siklus rekrutmen end-to-end untuk 30+ posisi strategis melalui sourcing aktif dan wawancara berbasis kompetensi (BEI), memangkas rata-rata Time-to-Hire sebesar 25%.',
        '- Mengelola program onboarding terstruktur bagi 80+ karyawan baru per tahun dan administrasi HRIS, meningkatkan skor kepuasan karyawan baru (CSAT) menjadi 4.8/5.0.'
      ],
      en: [
        '- Led end-to-end recruitment for 30+ strategic roles using proactive sourcing and competency-based interviews (BEI), reducing average Time-to-Hire by 25%.',
        '- Orchestrated structured onboarding workflows for 80+ new hires annually and maintained HRIS compliance, lifting new-hire satisfaction (CSAT) to 4.8/5.0.'
      ]
    },
    admin: {
      id: [
        '- Mengoptimalkan alur pengarsipan dokumen digital dan administrasi operasional harian untuk 100+ transaksi per minggu, memangkas waktu pencarian berkas hingga 40%.',
        '- Menyusun laporan inventaris kantor, jadwal rapat direksi, dan rekonsiliasi vendor bulanan dengan tingkat akurasi data 99.5% tanpa keterlambatan.'
      ],
      en: [
        '- Streamlined digital document archiving and daily operational administration for 100+ weekly requests, cutting file retrieval turnaround time by 40%.',
        '- Prepared office inventory logs, executive schedules, and monthly vendor reconciliations with 99.5% data accuracy and zero missed deadlines.'
      ]
    },
    data: {
      id: [
        '- Mengolah dan membersihkan 100.000+ baris data operasional menggunakan SQL dan Python (Pandas), mengidentifikasi 4 peluang efisiensi biaya senilai 18% per kuartal.',
        '- Membangun 5 dashboard analitik interaktif di Tableau/Power BI untuk pemantauan KPI harian manajemen, mempercepat pengambilan keputusan strategis hingga 35%.'
      ],
      en: [
        '- Queried and cleaned 100,000+ operational records using SQL and Python (Pandas), uncovering 4 cost-efficiency opportunities worth 18% quarterly savings.',
        '- Built 5 interactive Tableau/Power BI dashboards for daily executive KPI tracking, accelerating data-driven decision turnaround by 35%.'
      ]
    },
    edu: {
      id: [
        '- Merancang modul pembelajaran interaktif dan pendampingan belajar terstruktur bagi 35+ siswa/peserta didik, meningkatkan rata-rata capaian evaluasi akademik sebesar 22%.',
        '- Mengoordinasikan rencana asesmen individual (IEP) dan laporan perkembangan berkala bersama orang tua serta tim pengajar, mencapai tingkat keterlibatan kelas 94%.'
      ],
      en: [
        '- Designed interactive learning modules and structured mentoring plans for 35+ students, lifting average academic assessment outcomes by 22%.',
        '- Coordinated Individualized Education Plans (IEP) and bi-weekly progress reviews with parents and faculty, achieving 94% classroom engagement.'
      ]
    },
    marketing: {
      id: [
        '- Mengelola kampanye digital multi-kanal (Meta Ads, Google Ads, dan SEO) dengan anggaran bulanan terukur, meningkatkan perolehan leads berkualitas sebesar 42% dan menekan CAC sebesar 19%.',
        '- Merancang strategi konten media sosial dan kalender editorial berbasis analisis audiens, mendorong pertumbuhan jangkauan organik (reach) hingga 3.2x dalam 6 bulan.'
      ],
      en: [
        '- Executed multi-channel digital campaigns (Meta Ads, Google Ads, SEO) within target ROAS, increasing qualified lead generation by 42% while lowering CAC by 19%.',
        '- Spearheaded audience-driven social media strategy and editorial calendars, scaling organic reach by 3.2x over 6 months.'
      ]
    },
    tech: {
      id: [
        '- Merancang dan mengembangkan layanan REST API serta antarmuka web modular menggunakan TypeScript dan React, meningkatkan kecepatan muat halaman (LCP) sebesar 45%.',
        '- Mengimplementasikan automated testing dan pipeline CI/CD berbasis GitHub Actions, menurunkan insiden bug produksi dan rollback rilis hingga 40%.'
      ],
      en: [
        '- Architected modular web interfaces and scalable REST APIs using TypeScript and React, improving page load performance (LCP) by 45%.',
        '- Implemented automated test suites and CI/CD pipelines via GitHub Actions, reducing production defects and release rollbacks by 40%.'
      ]
    },
    finance: {
      id: [
        '- Menyusun laporan keuangan bulanan, rekonsiliasi bank, dan analisis varians anggaran tepat waktu sesuai standar PSAK dengan tingkat akurasi audit 100%.',
        '- Mengotomatiskan template pelacakan arus kas dan piutang (AR/AP) di Excel, mempercepat proses closing keuangan akhir bulan dari 7 hari menjadi 3 hari kerja.'
      ],
      en: [
        '- Prepared monthly financial statements, bank reconciliations, and budget variance analyses ahead of schedule with 100% audit compliance.',
        '- Automated cash-flow and AR/AP tracking models in Excel, shortening month-end financial closing cycles from 7 to 3 business days.'
      ]
    }
  };

  // --------------------------------------------------------------------------
  // 3. INTERNATIONALIZATION (i18n) DICTIONARY
  // --------------------------------------------------------------------------
  const i18n = {
    id: {
      navStudio: 'Studio Diagnostik',
      builderNavStudio: 'CV Builder',
      navSubtitle: 'Pembuat CV Instan Berstandar ATS',
      builderNavSubtitle: 'Editor Resume ATS & Formula XYZ',
      privacyBadge: 'Lokal & Terenkripsi',
      navScan: 'Skrining CV',
      navTemplates: 'Template ATS',
      navBuilder: 'Buat CV Instan',
      badgeNew: 'Baru',

      builderBadge: '100% LOKAL • FORMULA XYZ OTOMATIS',
      builderHeroBadge: 'Live ATS Workspace • Formula XYZ',
      builderTitle: 'Buat CV Instan Berstandar ATS',
      builderPageTitle: 'Buat CV Instan Berstandar ATS',
      builderSubtitle: 'Lengkapi data di kiri, sisipkan preset pengalaman atau optimasi kalimat tugas menjadi Formula XYZ dalam 1 klik, lalu pantau pratinjau dokumen Word secara langsung.',
      builderPageDesc: 'Susun resume 1-kolom berstandar rekruter dari awal atau ubah kalimat tugas menjadi pencapaian Formula XYZ terukur dalam 1 klik.',
      builderPrivacyPill: '100% Lokal di Browser (Tanpa Server)',
      builderBlankOption: 'Mulai dari Kosong (Blank)',
      builderTemplateLabel: 'Basis Template ATS:',
      builderLabelTemplate: 'Basis Template ATS',
      builderTemplateHint: 'Pilih struktur dokumen sesuai target perusahaan',
      builderLabelName: 'Nama Lengkap & Gelar',
      builderLabelContact: 'Kontak, Domisili & Tautan',
      builderLabelSummary: 'Ringkasan Profesional',
      builderLabelExperience: 'Pengalaman Kerja & Pencapaian',
      builderLabelEducation: 'Riwayat Pendidikan',
      builderLabelSkills: 'Keahlian & Sertifikasi',
      builderPresetLabel: 'Sisipkan Contoh Pengalaman Siap Pakai:',
      builderPresetsLabel: 'Sisipkan Contoh Pengalaman Siap Pakai',
      builderPresetsHint: 'Klik untuk isi otomatis',
      autoOptimizeBtn: 'Optimasi Otomatis ke Formula XYZ (ATS-Friendly)',
      mobileTabEditor: 'Editor CV',
      mobileTabPreview: 'Pratinjau A4',
      builderPreviewLabel: 'Pratinjau Dokumen Word (A4)',
      builderCopyBtn: 'Salin Teks',
      builderCheckAtsBtn: 'Cek Skor ATS',
      builderDownloadBtn: 'Unduh .doc (Rp 25.000)',
      builderCopiedToast: 'Teks CV berhasil disalin ke clipboard!',

      payModalTitle: 'Unduh Berkas Word (.doc) Siap Lamar',
      payModalSubtitle: 'Bebas watermark, margin standar 1-inci, dan format 1-kolom yang teruji lolos sistem ATS.',
      payTabQris: 'QRIS (Semua E-Wallet / Bank)',
      payTabBca: 'Virtual Account BCA',
      payQrisHint: 'Scan kode QRIS di atas melalui GoPay, OVO, DANA, ShopeePay, atau Mobile Banking lalu masukkan kode akses.',
      payConfirmWaBtn: 'Konfirmasi Pembayaran via WhatsApp',
      confirmPayWaBtn: 'Kirim Bukti Transfer via WhatsApp',
      payVerifyBtn: 'Verifikasi & Unduh .doc',
      verifyPayBtn: 'Verifikasi & Unduh .doc',
      payInvalidCodeToast: 'Kode akses tidak valid. Silakan konfirmasi pembayaran via WhatsApp terlebih dahulu.',
      paySuccessToast: 'Akses terverifikasi! Mengunduh berkas CV .doc Anda...',

      builderFooterDesc: 'Seluruh proses penyusunan CV dan konversi dokumen dilakukan 100% secara lokal di browser Anda (Zero-Data Retention).',
      tplFooterInquiry: 'Pertanyaan & Masukan:',

      autoOptimizeToast: 'Kalimat pengalaman berhasil dikonversi ke Formula XYZ!',
      autoOptimizeNoLinesToast: 'Tambahkan minimal satu baris pengalaman kerja untuk dioptimasi.',
      presetAddedToast: 'Contoh pencapaian XYZ berhasil disisipkan!',
      emptyCvToast: 'Isi minimal satu bagian CV terlebih dahulu.',
      isMinimalText: 'Isi minimal 40 karakter pada CV Anda sebelum mengecek skor ATS.',
      screenerDraftLoaded: 'Teks CV dari hasil skrining berhasil dimuat ke editor!'
    },
    en: {
      navStudio: 'Diagnostic Studio',
      builderNavStudio: 'CV Builder',
      navSubtitle: 'Instant ATS-Ready Resume Builder',
      builderNavSubtitle: 'ATS Resume Editor & XYZ Formula',
      privacyBadge: 'Local & Encrypted',
      navScan: 'CV Screening',
      navTemplates: 'ATS Templates',
      navBuilder: 'Instant CV Builder',
      badgeNew: 'New',

      builderBadge: '100% LOCAL • AUTO XYZ FORMULA',
      builderHeroBadge: 'Live ATS Workspace • XYZ Formula',
      builderTitle: 'Instant ATS Resume Builder',
      builderPageTitle: 'Instant ATS Resume Builder',
      builderSubtitle: 'Fill in your details on the left, insert role presets or convert duty lines into measurable XYZ bullets in 1 click, and preview your Word document live.',
      builderPageDesc: 'Build a recruiter-approved single-column resume from scratch or convert duty lines into measurable XYZ achievements in 1 click.',
      builderPrivacyPill: '100% Local in Browser (Zero Server)',
      builderBlankOption: 'Start from Blank',
      builderTemplateLabel: 'ATS Template Base:',
      builderLabelTemplate: 'ATS Template Base',
      builderTemplateHint: 'Select a document structure tailored to your target company',
      builderLabelName: 'Full Name & Credentials',
      builderLabelContact: 'Contact, Location & Links',
      builderLabelSummary: 'Professional Summary',
      builderLabelExperience: 'Work Experience & Achievements',
      builderLabelEducation: 'Education History',
      builderLabelSkills: 'Skills & Certifications',
      builderPresetLabel: 'Insert Ready-to-Use Role Presets:',
      builderPresetsLabel: 'Insert Ready-to-Use Role Presets',
      builderPresetsHint: 'Click to auto-fill',
      autoOptimizeBtn: 'Auto-Optimize to XYZ Formula (ATS-Friendly)',
      mobileTabEditor: 'CV Editor',
      mobileTabPreview: 'A4 Preview',
      builderPreviewLabel: 'Live Word Document Preview (A4)',
      builderCopyBtn: 'Copy Text',
      builderCheckAtsBtn: 'Check ATS Score',
      builderDownloadBtn: 'Download .doc (Rp 25.000)',
      builderCopiedToast: 'Resume text copied to clipboard!',

      payModalTitle: 'Download Ready-to-Apply Word (.doc)',
      payModalSubtitle: 'Watermark-free, standard 1-inch margins, and ATS-verified single-column formatting.',
      payTabQris: 'QRIS (All E-Wallets / Banks)',
      payTabBca: 'BCA Virtual Account',
      payQrisHint: 'Scan the QRIS code above via GoPay, OVO, DANA, ShopeePay, or Mobile Banking, then enter your access code.',
      payConfirmWaBtn: 'Confirm Payment via WhatsApp',
      confirmPayWaBtn: 'Send Payment Proof via WhatsApp',
      payVerifyBtn: 'Verify & Download .doc',
      verifyPayBtn: 'Verify & Download .doc',
      payInvalidCodeToast: 'Invalid access code. Please confirm your payment via WhatsApp first.',
      paySuccessToast: 'Access verified! Downloading your .doc resume...',

      builderFooterDesc: 'All resume authoring and document conversion runs 100% locally in your browser (Zero-Data Retention).',
      tplFooterInquiry: 'Questions & Feedback:',

      autoOptimizeToast: 'Experience bullets optimized into active XYZ Formula!',
      autoOptimizeNoLinesToast: 'Please add at least one experience line to optimize.',
      presetAddedToast: 'XYZ achievement preset inserted!',
      emptyCvToast: 'Please fill in at least one CV section first.',
      isMinimalText: 'Please enter at least 40 characters in your resume before checking the ATS score.',
      screenerDraftLoaded: 'CV text from screening loaded into editor!'
    }
  };

  // --------------------------------------------------------------------------
  // 4. APPLICATION STATE & DOM CACHE
  // --------------------------------------------------------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  const urlTemplate = urlParams.get('template');
  const storedLang = localStorage.getItem('screenora_lang');
  const initialLang = (urlLang === 'id' || urlLang === 'en')
    ? urlLang
    : ((storedLang === 'id' || storedLang === 'en') ? storedLang : 'id');

  if (urlLang === 'id' || urlLang === 'en') {
    localStorage.setItem('screenora_lang', urlLang);
  }

  const state = {
    theme: localStorage.getItem('screenora_theme') || 'dark',
    language: initialLang,
    currentBuilderTemplate: (urlTemplate && TEMPLATES[urlTemplate]) ? urlTemplate : '',
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
    mobileBuilderTabEditor: document.getElementById('mobileBuilderTabEditor'),
    mobileBuilderTabPreview: document.getElementById('mobileBuilderTabPreview'),
    builderEditorCol: document.getElementById('builderEditorCol'),
    builderPreviewCol: document.getElementById('builderPreviewCol'),
    builderTemplateSelect: document.getElementById('builderTemplateSelect'),
    builderName: document.getElementById('builderName'),
    builderContact: document.getElementById('builderContact'),
    builderSummary: document.getElementById('builderSummary'),
    builderExperience: document.getElementById('builderExperience'),
    builderEducation: document.getElementById('builderEducation'),
    builderSkills: document.getElementById('builderSkills'),
    builderRolePresets: document.getElementById('builderRolePresets'),
    autoOptimizeBtn: document.getElementById('autoOptimizeBtn'),
    builderLivePreview: document.getElementById('builderLivePreview'),
    builderCopyBtn: document.getElementById('builderCopyBtn'),
    builderCheckAtsBtn: document.getElementById('builderCheckAtsBtn'),
    builderDownloadBtn: document.getElementById('builderDownloadBtn'),
    builderAtsScorePanel: document.getElementById('builderAtsScorePanel'),
    builderAtsScoreValue: document.getElementById('builderAtsScoreValue'),
    builderAtsTierBadge: document.getElementById('builderAtsTierBadge'),
    builderAtsSummaryText: document.getElementById('builderAtsSummaryText'),
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
  // 5. THEME & LANGUAGE MANAGEMENT
  // --------------------------------------------------------------------------
  function applyTheme(theme) {
    state.theme = theme === 'light' ? 'light' : 'dark';
    localStorage.setItem('screenora_theme', state.theme);
    const htmlEl = document.documentElement;

    if (state.theme === 'dark') {
      htmlEl.classList.add('dark');
      if (DOM.themeIcon) {
        DOM.themeIcon.innerHTML = `<svg class="w-3.5 h-3.5 text-dark-textSec" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`;
      }
      if (DOM.themeLabel) DOM.themeLabel.textContent = 'Dark';
    } else {
      htmlEl.classList.remove('dark');
      if (DOM.themeIcon) {
        DOM.themeIcon.innerHTML = `<svg class="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`;
      }
      if (DOM.themeLabel) DOM.themeLabel.textContent = 'Light';
    }
  }

  function toggleTheme() {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  }

  function setLanguage(lang) {
    if (!i18n[lang]) return;
    state.language = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('screenora_lang', lang);

    if (DOM.langIdBtn && DOM.langEnBtn) {
      if (lang === 'id') {
        DOM.langIdBtn.className = 'px-2.5 py-1 rounded text-[11px] font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm transition-all';
        DOM.langEnBtn.className = 'px-2.5 py-1 rounded text-[11px] font-bold text-dark-textSec hover:text-dark-textPri transition-all';
      } else {
        DOM.langEnBtn.className = 'px-2.5 py-1 rounded text-[11px] font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm transition-all';
        DOM.langIdBtn.className = 'px-2.5 py-1 rounded text-[11px] font-bold text-dark-textSec hover:text-dark-textPri transition-all';
      }
    }

    const dict = i18n[lang];
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        if (dict[key].includes('<strong>')) {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    renderBuilderLivePreview();
  }

  let toastTimer = null;
  function showToast(msg) {
    if (!DOM.toast || !DOM.toastMsg) return;
    DOM.toastMsg.textContent = msg;
    DOM.toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-20');
    DOM.toast.classList.add('opacity-100', 'translate-y-0');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      DOM.toast.classList.remove('opacity-100', 'translate-y-0');
      DOM.toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-20');
    }, 3000);
  }

  // --------------------------------------------------------------------------
  // 6. PARSER, WORD HTML RENDERER & EXPORT ENGINE
  // --------------------------------------------------------------------------
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function isSectionHeaderLine(trimmed) {
    return (
      trimmed === trimmed.toUpperCase() &&
      trimmed.length > 3 &&
      !trimmed.startsWith('- ') &&
      !trimmed.includes('|') &&
      !trimmed.includes('@')
    );
  }

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

  function parsePlainTextIntoBuilderFields(rawText) {
    const result = {
      name: '',
      contact: '',
      summary: '',
      experience: '',
      education: '',
      skills: ''
    };
    if (!rawText || !rawText.trim()) return result;

    const lines = rawText.replace(/\r\n?/g, '\n').split('\n');
    const contactLines = [];
    const buckets = {
      summary: [],
      experience: [],
      education: [],
      skills: []
    };

    let currentSection = null;
    let firstSectionSeen = false;
    let nameAssigned = false;

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!nameAssigned) {
        if (!trimmed) return;
        result.name = trimmed;
        nameAssigned = true;
        return;
      }

      if (trimmed && isSectionHeaderLine(trimmed)) {
        const mapped = classifySectionHeader(trimmed.toUpperCase());
        if (mapped) {
          firstSectionSeen = true;
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

  function parseTemplateToBuilderFields(templateKey) {
    const tmpl = TEMPLATES[templateKey] || TEMPLATES.classic_corporate;
    return parsePlainTextIntoBuilderFields(tmpl && tmpl.plainText ? tmpl.plainText : '');
  }

  function assembleBuilderPlainText() {
    const name = DOM.builderName ? DOM.builderName.value.trim() : '';
    const contact = DOM.builderContact ? DOM.builderContact.value.trim() : '';
    const summary = DOM.builderSummary ? DOM.builderSummary.value.trim() : '';
    const experience = DOM.builderExperience ? DOM.builderExperience.value.trim() : '';
    const education = DOM.builderEducation ? DOM.builderEducation.value.trim() : '';
    const skills = DOM.builderSkills ? DOM.builderSkills.value.trim() : '';

    const isIntlTemplate = ['global_tech', 'global_product'].includes(state.currentBuilderTemplate);
    const useEnLabels = isIntlTemplate || state.language === 'en';

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

  function renderWordHtmlFromPlainText(plainText) {
    if (!plainText || !plainText.trim()) return '';

    const lines = plainText.split('\n');
    let htmlBody = '';

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        htmlBody += '<p style="margin: 0; line-height: 1.2;">&nbsp;</p>';
      } else if (isSectionHeaderLine(trimmed)) {
        htmlBody += `<h3 style="margin-top: 14pt; margin-bottom: 4pt; font-size: 11pt; font-family: Calibri, Arial, sans-serif; font-weight: bold; color: #0F172A; text-transform: uppercase; border-bottom: 1px solid #94A3B8; padding-bottom: 2pt;">${escapeHtml(trimmed)}</h3>`;
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
        const bulletText = trimmed.startsWith('- ') ? trimmed.substring(2) : trimmed.substring(2);
        htmlBody += `<p style="margin: 2pt 0 2pt 18pt; text-indent: -12pt; font-size: 10pt; font-family: Calibri, Arial, sans-serif; line-height: 1.35; color: #334155;">&bull; ${escapeHtml(bulletText)}</p>`;
      } else if (idx === 0) {
        htmlBody += `<h1 style="margin: 0 0 2pt 0; font-size: 18pt; font-family: Calibri, Arial, sans-serif; font-weight: bold; color: #0F172A; text-align: left;">${escapeHtml(trimmed)}</h1>`;
      } else if (idx === 1) {
        htmlBody += `<p style="margin: 0 0 10pt 0; font-size: 9.5pt; font-family: Calibri, Arial, sans-serif; color: #475569;">${escapeHtml(trimmed)}</p>`;
      } else if (trimmed.includes(' | ') || trimmed.includes(' — ')) {
        htmlBody += `<p style="margin-top: 6pt; margin-bottom: 2pt; font-size: 10.5pt; font-family: Calibri, Arial, sans-serif; font-weight: bold; color: #1E293B;">${escapeHtml(trimmed)}</p>`;
      } else {
        htmlBody += `<p style="margin: 3pt 0; font-size: 10pt; font-family: Calibri, Arial, sans-serif; line-height: 1.4; color: #334155;">${escapeHtml(trimmed)}</p>`;
      }
    });

    return htmlBody;
  }

  function renderBuilderLivePreview() {
    if (!DOM.builderLivePreview) return;

    const text = assembleBuilderPlainText();
    if (!text) {
      const emptyMsg = state.language === 'id'
        ? 'Isi form di sebelah kiri untuk melihat pratinjau dokumen Word standar ATS secara real-time...'
        : 'Fill out the form on the left to see a real-time Word document ATS resume preview...';
      DOM.builderLivePreview.innerHTML = `<div style="background:#ffffff;color:#64748b;font-family:Calibri,Arial,sans-serif;padding:28px 32px;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.08);min-height:420px;font-size:12px;font-style:italic;">${escapeHtml(emptyMsg)}</div>`;
      return;
    }

    const wordHtml = renderWordHtmlFromPlainText(text);
    DOM.builderLivePreview.innerHTML = `<div style="background:#ffffff;color:#1E293B;font-family:Calibri,Arial,sans-serif;padding:28px 32px;border-radius:8px;box-shadow:0 8px 28px rgba(0,0,0,0.14);min-height:420px;border:1px solid #e2e8f0;">${wordHtml}</div>`;
  }

  function exportPlainTextToWord(plainText, docTitle, fileName) {
    if (!plainText || !plainText.trim()) return;
    const htmlBody = renderWordHtmlFromPlainText(plainText);

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

  // --------------------------------------------------------------------------
  // 7. AUTO-OPTIMIZE XYZ FORMULA ENGINE
  // --------------------------------------------------------------------------
  function isRoleOrHeaderLine(trimmed) {
    if (!trimmed) return true;
    if (isSectionHeaderLine(trimmed)) return true;
    if (trimmed.includes(' | ') || trimmed.includes(' — ')) return true;
    if (!trimmed.startsWith('- ') && !trimmed.startsWith('• ') && /\b(19|20)\d{2}\b/.test(trimmed) && trimmed.length < 75) {
      return true;
    }
    return false;
  }

  function hasStrongXyzStructure(core) {
    const hasMetric = /(\d+%|\d+\+|Rp\s?\d+|\$\d+|\d+x|\d+\s?(hari|bulan|jam|minggu|poin|orang|kandidat|klien|siswa|days|hours|weeks|months|points|users|clients))/i.test(core);
    const startsWeak = /^(bertanggung\s+jawab|membantu|mengerjakan|melakukan|membuat|mengurus|mengikuti|mendukung|menangani|tugas\s+saya|responsible\s+for|helped|assisted|worked\s+on|did|handled|supported|participated)/i.test(core);
    const startsStrong = /^(memimpin|mengelola|merancang|membangun|mengoptimalkan|memangkas|meningkatkan|mengembangkan|menganalisis|mengoordinasikan|menginisiasi|mengotomatiskan|led|spearheaded|architected|engineered|built|designed|reduced|slashed|boosted|increased|optimized|analyzed|launched|streamlined)/i.test(core);
    return hasMetric && startsStrong && !startsWeak;
  }

  function convertLineToXyz(rawCore, lang) {
    let topic = rawCore
      .replace(/^[-•*]\s*/, '')
      .replace(/^(bertanggung\s+jawab\s+(untuk|atas|dalam)|tugas\s+saya\s+(adalah|untuk)|membantu\s+(tim\s+)?(dalam\s+)?|mengerjakan|melakukan|membuat|mengurus|mengikuti|mendukung|menangani|turut\s+serta\s+(dalam\s+)?)/i, '')
      .replace(/^(responsible\s+for|duties\s+included|helped\s+(with|to)?|assisted\s+(in|with)?|worked\s+on|handled|supported|participated\s+in|tasked\s+with)\s+/i, '')
      .replace(/\.+$/, '')
      .trim();

    if (!topic) topic = rawCore.replace(/^[-•*]\s*/, '').replace(/\.+$/, '').trim();
    const cleanTopic = topic.charAt(0).toLowerCase() + topic.slice(1);

    if (lang === 'en') {
      if (/\b(recruit|hiring|candidate|interview|cv|talent|onboarding|hr)\b/i.test(cleanTopic)) {
        return `- Spearheaded ${cleanTopic} using structured competency screening, cutting turnaround time by [X%] across [N candidates].`;
      }
      if (/\b(data|sql|python|dashboard|report|analysis|analytics|excel|kpi)\b/i.test(cleanTopic)) {
        return `- Analyzed and automated ${cleanTopic} with structured data pipelines, improving reporting accuracy to [X%] and saving [N hours/week].`;
      }
      if (/\b(teach|student|class|curriculum|mentor|training|module|education)\b/i.test(cleanTopic)) {
        return `- Designed and delivered ${cleanTopic} with measurable learning milestones, boosting mastery outcomes by [X%] across [N students].`;
      }
      if (/\b(market|campaign|social|content|ads|seo|sales|lead|client)\b/i.test(cleanTopic)) {
        return `- Executed data-driven ${cleanTopic} initiatives, driving a [X%] increase in qualified engagement and generating [$X K] / [N leads].`;
      }
      if (/\b(code|web|app|api|system|software|bug|feature|deploy)\b/i.test(cleanTopic)) {
        return `- Engineered and optimized ${cleanTopic} with automated quality checks, improving system performance by [X%] and saving [N hours/week].`;
      }
      if (/\b(finance|budget|invoice|audit|tax|payroll|accounting)\b/i.test(cleanTopic)) {
        return `- Streamlined ${cleanTopic} with standardized reconciliation controls, managing [$X K] budget and shortening closing cycles by [N hours/week].`;
      }
      return `- Optimized ${cleanTopic} through standardized workflow execution, improving operational efficiency by [X%] and saving [N hours/week].`;
    }

    // Indonesian XYZ conversion preserving user's original topic context with honest Guided Metric Slots
    if (/\b(rekrut|kandidat|wawancara|interview|hr|karyawan|onboarding|absensi|bpjs)\b/i.test(cleanTopic)) {
      return `- Mengoptimalkan ${cleanTopic} melalui penyaringan berbasis kompetensi terstruktur untuk [N kandidat], memangkas durasi proses hingga [X%].`;
    }
    if (/\b(data|sql|python|dashboard|laporan|analisis|excel|kpi|rekap)\b/i.test(cleanTopic)) {
      return `- Menganalisis dan menyusun ${cleanTopic} secara terstruktur untuk pemantauan KPI, meningkatkan akurasi pelaporan hingga [X%] dan menghemat [N jam/minggu].`;
    }
    if (/\b(ajar|siswa|murid|kelas|kurikulum|materi|training|pelatihan|pendamping)\b/i.test(cleanTopic)) {
      return `- Merancang dan memfasilitasi ${cleanTopic} dengan evaluasi berkala terukur bagi [N siswa], meningkatkan capaian pemahaman sebesar [X%].`;
    }
    if (/\b(marketing|kampanye|konten|sosial|iklan|ads|seo|penjualan|sales|klien|pelanggan)\b/i.test(cleanTopic)) {
      return `- Mengeksekusi strategi ${cleanTopic} berbasis evaluasi metrik audiens, mendongkrak konversi prospek hingga [X%] dengan nilai kontribusi [Rp X jt].`;
    }
    if (/\b(aplikasi|web|sistem|api|kode|software|fitur|bug|database)\b/i.test(cleanTopic)) {
      return `- Mengembangkan dan mengoptimalkan ${cleanTopic} dengan pengujian terstandar, meningkatkan performa sistem hingga [X%] dan menghemat [N jam/minggu].`;
    }
    if (/\b(keuangan|anggaran|invoice|audit|pajak|gaji|payroll|kas|akuntansi)\b/i.test(cleanTopic)) {
      return `- Mengelola dan menyederhanakan ${cleanTopic} senilai [Rp X jt] sesuai standar kepatuhan, mencapai akurasi rekonsiliasi [X%] dan menghemat [N jam/minggu].`;
    }
    return `- Mengoptimalkan ${cleanTopic} melalui alur kerja terstandar, meningkatkan efisiensi eksekusi tim sebesar [X%] dan menghemat [N jam/minggu].`;
  }

  function optimizeExperienceText(rawText, lang) {
    if (!rawText || !rawText.trim()) return '';
    const activeLang = lang === 'en' ? 'en' : 'id';
    const lines = rawText.split('\n');

    const optimizedLines = lines.map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      if (isRoleOrHeaderLine(trimmed)) return trimmed;

      const core = trimmed.replace(/^[-•*]\s*/, '').trim();
      if (!core) return '';

      if (hasStrongXyzStructure(core)) {
        return `- ${core}`;
      }

      return convertLineToXyz(core, activeLang);
    });

    return optimizedLines.join('\n');
  }

  function insertRolePreset(presetKey) {
    const preset = ROLE_PRESETS[presetKey];
    if (!preset || !DOM.builderExperience) return;

    const lines = preset[state.language] || preset.id;
    const snippet = lines.join('\n');
    const currentVal = DOM.builderExperience.value.trim();

    DOM.builderExperience.value = currentVal ? `${currentVal}\n${snippet}` : snippet;
    renderBuilderLivePreview();

    const dict = i18n[state.language] || i18n.id;
    showToast(dict.presetAddedToast);
  }

  // --------------------------------------------------------------------------
  // 8. TEMPLATE LOADING, IN-PAGE ATS SCORER, CLIPBOARD & PAYMENT GATE
  // --------------------------------------------------------------------------
  function ensureBlankTemplateOption() {
    if (!DOM.builderTemplateSelect) return;
    if (!DOM.builderTemplateSelect.querySelector('option[value=""]')) {
      const blankOpt = document.createElement('option');
      blankOpt.value = '';
      blankOpt.setAttribute('data-i18n', 'builderBlankOption');
      const dict = i18n[state.language] || i18n.id;
      blankOpt.textContent = dict.builderBlankOption;
      DOM.builderTemplateSelect.insertBefore(blankOpt, DOM.builderTemplateSelect.firstChild);
    }
  }

  function resetBuilderFields() {
    state.currentBuilderTemplate = '';
    if (DOM.builderTemplateSelect) {
      DOM.builderTemplateSelect.value = '';
    }
    if (DOM.builderName) DOM.builderName.value = '';
    if (DOM.builderContact) DOM.builderContact.value = '';
    if (DOM.builderSummary) DOM.builderSummary.value = '';
    if (DOM.builderExperience) DOM.builderExperience.value = '';
    if (DOM.builderEducation) DOM.builderEducation.value = '';
    if (DOM.builderSkills) DOM.builderSkills.value = '';
    if (DOM.builderAtsScorePanel) {
      DOM.builderAtsScorePanel.classList.add('hidden');
    }
    renderBuilderLivePreview();
  }

  function loadTemplateIntoBuilder(templateKey) {
    if (!templateKey || !TEMPLATES[templateKey]) {
      resetBuilderFields();
      return;
    }

    state.currentBuilderTemplate = templateKey;

    if (DOM.builderTemplateSelect) {
      DOM.builderTemplateSelect.value = templateKey;
    }

    const fields = parseTemplateToBuilderFields(templateKey);
    applyFieldsToBuilderInputs(fields);
    if (DOM.builderAtsScorePanel) {
      DOM.builderAtsScorePanel.classList.add('hidden');
    }

    renderBuilderLivePreview();
  }

  function applyFieldsToBuilderInputs(fields) {
    if (!fields) return;
    if (DOM.builderName) DOM.builderName.value = fields.name || '';
    if (DOM.builderContact) DOM.builderContact.value = fields.contact || '';
    if (DOM.builderSummary) DOM.builderSummary.value = fields.summary || '';
    if (DOM.builderExperience) DOM.builderExperience.value = fields.experience || '';
    if (DOM.builderEducation) DOM.builderEducation.value = fields.education || '';
    if (DOM.builderSkills) DOM.builderSkills.value = fields.skills || '';
  }

  function setMobileBuilderTab(tab) {
    const isPreview = tab === 'preview';
    if (DOM.builderEditorCol) {
      DOM.builderEditorCol.classList.toggle('hidden', isPreview);
      DOM.builderEditorCol.classList.toggle('block', !isPreview);
      DOM.builderEditorCol.classList.add('lg:block');
    }
    if (DOM.builderPreviewCol) {
      DOM.builderPreviewCol.classList.toggle('hidden', !isPreview);
      DOM.builderPreviewCol.classList.toggle('block', isPreview);
      DOM.builderPreviewCol.classList.add('lg:block');
    }
    const activeClasses = ['bg-dark-surface', 'text-dark-textPri', 'border-dark-border'];
    const inactiveClasses = ['text-dark-textSec', 'hover:text-dark-textPri', 'border-transparent'];
    if (DOM.mobileBuilderTabEditor) {
      DOM.mobileBuilderTabEditor.classList.add('whitespace-nowrap');
      activeClasses.forEach(c => DOM.mobileBuilderTabEditor.classList.toggle(c, !isPreview));
      inactiveClasses.forEach(c => DOM.mobileBuilderTabEditor.classList.toggle(c, isPreview));
    }
    if (DOM.mobileBuilderTabPreview) {
      DOM.mobileBuilderTabPreview.classList.add('whitespace-nowrap');
      activeClasses.forEach(c => DOM.mobileBuilderTabPreview.classList.toggle(c, isPreview));
      inactiveClasses.forEach(c => DOM.mobileBuilderTabPreview.classList.toggle(c, !isPreview));
    }
  }

  function evaluateBuilderAtsScore(plainText) {
    const lang = state.language === 'en' ? 'en' : 'id';
    const isId = lang === 'id';

    const nameVal = (DOM.builderName && DOM.builderName.value.trim()) || '';
    const contactVal = (DOM.builderContact && DOM.builderContact.value.trim()) || '';
    const summaryVal = (DOM.builderSummary && DOM.builderSummary.value.trim()) || '';
    const expVal = (DOM.builderExperience && DOM.builderExperience.value.trim()) || '';
    const eduVal = (DOM.builderEducation && DOM.builderEducation.value.trim()) || '';
    const skillsVal = (DOM.builderSkills && DOM.builderSkills.value.trim()) || '';

    const missingSuggestions = [];
    let sectionScore = 0;

    // 1. Kelengkapan 5 bagian CV (maks 35 poin, 7 poin/bagian)
    if (nameVal && contactVal) {
      sectionScore += 7;
    } else if (nameVal || contactVal) {
      sectionScore += 3.5;
      missingSuggestions.push(
        isId
          ? 'Lengkapi Nama Lengkap & Kontak (email, HP, LinkedIn).'
          : 'Complete both Full Name and Contact details (email, phone, LinkedIn).'
      );
    } else {
      missingSuggestions.push(
        isId
          ? 'Tambahkan Identitas & Kontak di bagian atas CV.'
          : 'Add your Identity & Contact details at the top of your resume.'
      );
    }

    if (summaryVal.length >= 40) {
      sectionScore += 7;
    } else if (summaryVal.length > 0) {
      sectionScore += 3.5;
      missingSuggestions.push(
        isId
          ? 'Perkuat Ringkasan Profesional (2-3 kalimat berisi pengalaman & nilai jual utama).'
          : 'Expand your Professional Summary (2-3 sentences highlighting years of experience and impact).'
      );
    } else {
      missingSuggestions.push(
        isId
          ? 'Isi bagian Ringkasan Profesional agar ATS langsung menangkap profil Anda.'
          : 'Add a Professional Summary so ATS immediately captures your target profile.'
      );
    }

    if (expVal.length >= 50) {
      sectionScore += 7;
    } else if (expVal.length > 0) {
      sectionScore += 3.5;
      missingSuggestions.push(
        isId
          ? 'Perjelas Pengalaman Kerja dengan poin pencapaian terukur.'
          : 'Expand Work Experience with structured achievement bullets.'
      );
    } else {
      missingSuggestions.push(
        isId
          ? 'Tambahkan Pengalaman Kerja/Magang atau sisipkan Preset Pengalaman 1-Klik.'
          : 'Add Work/Internship Experience or insert a 1-Click Role Preset.'
      );
    }

    if (eduVal.length >= 15) {
      sectionScore += 7;
    } else if (eduVal.length > 0) {
      sectionScore += 3.5;
    } else {
      missingSuggestions.push(
        isId
          ? 'Lengkapi Riwayat Pendidikan (institusi, jurusan, dan tahun lulus).'
          : 'Fill in Education History (institution, degree, and graduation year).'
      );
    }

    if (skillsVal.length >= 15) {
      sectionScore += 7;
    } else if (skillsVal.length > 0) {
      sectionScore += 3.5;
    } else {
      missingSuggestions.push(
        isId
          ? 'Tambahkan Keahlian Teknis, Tools, atau Sertifikasi yang relevan.'
          : 'Add relevant Technical Skills, Tools, or Certifications.'
      );
    }

    // 2. Kata kerja aksi aktif ID/EN (maks 20 poin)
    const actionVerbRegex = /\b(memimpin|mengelola|merancang|membangun|mengoptimalkan|memangkas|meningkatkan|mengembangkan|menganalisis|mengoordinasikan|menginisiasi|mengotomatiskan|mengeksekusi|memfasilitasi|menyusun|mengimplementasikan|mendongkrak|menekan|menyelenggarakan|menjalin|led|spearheaded|architected|engineered|built|designed|reduced|slashed|boosted|increased|optimized|analyzed|launched|streamlined|managed|executed|delivered|coordinated|automated|implemented|accelerated|mentored|authored|conducted)\b/gi;
    const verbMatches = plainText.match(actionVerbRegex) || [];
    const uniqueVerbs = new Set(verbMatches.map((v) => v.toLowerCase()));
    const verbScore = Math.min(20, Math.round((uniqueVerbs.size / 6) * 20));
    if (uniqueVerbs.size < 3) {
      missingSuggestions.push(
        isId
          ? 'Gunakan lebih banyak kata kerja aksi aktif (atau klik "Optimasi Otomatis ke Formula XYZ").'
          : 'Use stronger active action verbs (or click "Auto-Optimize to XYZ Formula").'
      );
    }

    // 3. Metrik angka terukur %, Rp, $, x, jumlah unit (maks 25 poin)
    const metricRegex = /(\d+(?:[.,]\d+)?%|\d+\+|Rp\s?\d[\d.,]*|\$\s?\d[\d.,]*[KMB]?|\d+(?:[.,]\d+)?x\b|\b\d+(?:[.,]\d+)?\s?(?:hari|bulan|tahun|jam|minggu|poin|orang|kandidat|klien|siswa|karyawan|transaksi|fitur|proyek|posisi|mahasiswa|peserta|perusahaan|days|hours|weeks|months|years|points|users|clients|engineers|squads|transactions|projects|roles|interviews))/gi;
    const metricMatches = plainText.match(metricRegex) || [];
    const metricScore = Math.min(25, metricMatches.length * 5);
    if (metricMatches.length < 2) {
      missingSuggestions.push(
        isId
          ? 'Sertakan minimal 2-3 metrik angka terukur (%, Rp, atau jumlah pencapaian).'
          : 'Include at least 2-3 quantifiable metrics (%, $, or numerical outcomes).'
      );
    }

    // 4. Kepadatan kata kunci profesional & kedalaman konten (maks 20 poin)
    const words = plainText.trim().split(/\s+/).filter(Boolean);
    const wordScore = words.length >= 160 ? 10 : (words.length >= 80 ? 6 : 3);
    const keywordRegex = /\b(recruitment|talent|hris|kpi|sql|python|react|typescript|javascript|excel|tableau|power bi|scrum|agile|prd|seo|roas|cac|b2b|saas|audit|psak|api|ci\/cd|aws|docker|kubernetes|strategi|analisis|manajemen|operasional|kolaborasi|sertifikasi|kompetensi|rekrutmen|evaluasi|akurasi|efisiensi|strategy|analysis|management|operations|certification|competency|accuracy|efficiency|analytics|leadership|stakeholder|onboarding|compliance|dashboard)\b/gi;
    const kwMatches = plainText.match(keywordRegex) || [];
    const uniqueKw = new Set(kwMatches.map((k) => k.toLowerCase()));
    const kwScore = Math.min(10, Math.round((uniqueKw.size / 6) * 10));
    if (uniqueKw.size < 3) {
      missingSuggestions.push(
        isId
          ? 'Perkaya kata kunci industri/tools spesifik pada Ringkasan dan Keahlian.'
          : 'Enrich industry-specific tools and competency keywords in Summary and Skills.'
      );
    }

    const rawScore = sectionScore + verbScore + metricScore + wordScore + kwScore;
    const score = Math.max(45, Math.min(95, Math.round(rawScore)));

    let tier = 3;
    let tierLabel = isId ? 'Tier 3 • Risiko Tinggi' : 'Tier 3 • High Risk';
    let tierClass = 'bg-rose-500/15 text-rose-400 border-rose-500/40';
    if (score >= 80) {
      tier = 1;
      tierLabel = isId ? 'Tier 1 • Prioritas Shortlist' : 'Tier 1 • Shortlist Priority';
      tierClass = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40';
    } else if (score >= 65) {
      tier = 2;
      tierLabel = isId ? 'Tier 2 • Kandidat Cadangan' : 'Tier 2 • Backup Pool';
      tierClass = 'bg-amber-500/15 text-amber-400 border-amber-500/40';
    }

    let summaryText = '';
    if (missingSuggestions.length > 0) {
      const prefix = isId ? 'Saran peningkatan: ' : 'Improvement tips: ';
      summaryText = prefix + missingSuggestions.slice(0, 3).join(' ');
    } else {
      summaryText = isId
        ? 'Struktur 5 bagian lengkap dengan kata kerja aktif, metrik terukur, dan kata kunci ATS yang kuat. Siap diunduh!'
        : 'All 5 sections are complete with strong action verbs, measurable metrics, and ATS keywords. Ready to download!';
    }

    return {
      score,
      tier,
      tierLabel,
      tierClass,
      summaryText
    };
  }

  function ensureBuilderAtsScorePanel() {
    if (DOM.builderAtsScorePanel) return DOM.builderAtsScorePanel;
    if (!DOM.builderCopyBtn) return null;

    const actionBar = DOM.builderCopyBtn.parentElement;
    if (!actionBar || !actionBar.parentElement) return null;

    const panel = document.createElement('div');
    panel.id = 'builderAtsScorePanel';
    panel.className = 'hidden bg-dark-surface border border-dark-border rounded-2xl p-4 space-y-2 shadow-lg';
    panel.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-2.5">
          <span class="text-[11px] font-heading font-semibold uppercase tracking-wider text-dark-textSec">ATS Readiness Score</span>
          <span id="builderAtsScoreValue" class="text-lg font-heading font-bold text-brand-emerald">0%</span>
        </div>
        <span id="builderAtsTierBadge" class="px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-semibold"></span>
      </div>
      <p id="builderAtsSummaryText" class="text-xs text-dark-textSec leading-relaxed"></p>
    `;

    actionBar.parentElement.insertBefore(panel, actionBar);
    DOM.builderAtsScorePanel = panel;
    DOM.builderAtsScoreValue = panel.querySelector('#builderAtsScoreValue');
    DOM.builderAtsTierBadge = panel.querySelector('#builderAtsTierBadge');
    DOM.builderAtsSummaryText = panel.querySelector('#builderAtsSummaryText');
    return panel;
  }

  function renderBuilderAtsScore(result) {
    const panel = ensureBuilderAtsScorePanel();
    if (DOM.builderAtsScoreValue) {
      DOM.builderAtsScoreValue.textContent = `${result.score}%`;
    }
    if (DOM.builderAtsTierBadge) {
      DOM.builderAtsTierBadge.textContent = result.tierLabel;
      DOM.builderAtsTierBadge.className = `px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-semibold whitespace-nowrap ${result.tierClass}`;
    }
    if (DOM.builderAtsSummaryText) {
      DOM.builderAtsSummaryText.textContent = result.summaryText;
    }
    if (panel) {
      panel.classList.remove('hidden');
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function copyTextToClipboard(text, successMsg) {
    const dict = i18n[state.language] || i18n.id;
    const msg = successMsg || dict.builderCopiedToast;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(msg);
      }).catch(() => fallbackCopy(text, msg));
    } else {
      fallbackCopy(text, msg);
    }
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
      showToast(successMsg);
    } catch (_) {
      showToast(state.language === 'id' ? 'Gagal menyalin teks.' : 'Failed to copy text.');
    }
    document.body.removeChild(textArea);
  }

  function setPayMethod(method) {
    state.payMethod = method === 'bca' ? 'bca' : 'qris';
    const isQris = state.payMethod === 'qris';

    if (DOM.payPanelQris) DOM.payPanelQris.classList.toggle('hidden', !isQris);
    if (DOM.payPanelBca) DOM.payPanelBca.classList.toggle('hidden', isQris);

    const activeClasses = ['bg-emerald-500/15', 'text-emerald-400', 'border-emerald-500/40', 'font-semibold'];
    const inactiveClasses = ['bg-transparent', 'text-slate-400', 'border-slate-700/60'];

    if (DOM.payTabQrisBtn) {
      DOM.payTabQrisBtn.setAttribute('aria-selected', isQris ? 'true' : 'false');
      activeClasses.forEach((cls) => DOM.payTabQrisBtn.classList.toggle(cls, isQris));
      inactiveClasses.forEach((cls) => DOM.payTabQrisBtn.classList.toggle(cls, !isQris));
    }
    if (DOM.payTabBcaBtn) {
      DOM.payTabBcaBtn.setAttribute('aria-selected', !isQris ? 'true' : 'false');
      activeClasses.forEach((cls) => DOM.payTabBcaBtn.classList.toggle(cls, !isQris));
      inactiveClasses.forEach((cls) => DOM.payTabBcaBtn.classList.toggle(cls, isQris));
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
    const dict = i18n[state.language] || i18n.id;
    if (!text) {
      showToast(dict.emptyCvToast);
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

  // --------------------------------------------------------------------------
  // 9. INITIALIZATION & EVENT BINDINGS
  // --------------------------------------------------------------------------
  function init() {
    applyTheme(state.theme);
    ensureBlankTemplateOption();
    setLanguage(state.language);

    if (urlParams.get('from') === 'screener') {
      let screenerDraft = null;
      try {
        screenerDraft = sessionStorage.getItem('screenora_screener_draft');
      } catch (_) {
        screenerDraft = null;
      }

      if (screenerDraft && screenerDraft.trim()) {
        const fields = parsePlainTextIntoBuilderFields(screenerDraft);
        state.currentBuilderTemplate = '';
        if (DOM.builderTemplateSelect) DOM.builderTemplateSelect.value = '';
        applyFieldsToBuilderInputs(fields);
        if (DOM.builderAtsScorePanel) {
          DOM.builderAtsScorePanel.classList.add('hidden');
        }
        try {
          sessionStorage.removeItem('screenora_screener_draft');
        } catch (_) {
          // Ignore storage errors silently
        }
        renderBuilderLivePreview();
        const dict = i18n[state.language] || i18n.id;
        showToast(dict.screenerDraftLoaded);
      } else if (urlTemplate && TEMPLATES[urlTemplate]) {
        loadTemplateIntoBuilder(urlTemplate);
      } else {
        resetBuilderFields();
      }
    } else if (urlTemplate && TEMPLATES[urlTemplate]) {
      loadTemplateIntoBuilder(urlTemplate);
    } else {
      resetBuilderFields();
    }

    if (DOM.mobileBuilderTabEditor) {
      DOM.mobileBuilderTabEditor.addEventListener('click', () => setMobileBuilderTab('editor'));
    }
    if (DOM.mobileBuilderTabPreview) {
      DOM.mobileBuilderTabPreview.addEventListener('click', () => setMobileBuilderTab('preview'));
    }

    if (DOM.themeToggleBtn) {
      DOM.themeToggleBtn.addEventListener('click', toggleTheme);
    }
    if (DOM.langIdBtn) {
      DOM.langIdBtn.addEventListener('click', () => setLanguage('id'));
    }
    if (DOM.langEnBtn) {
      DOM.langEnBtn.addEventListener('click', () => setLanguage('en'));
    }

    if (DOM.builderTemplateSelect) {
      DOM.builderTemplateSelect.addEventListener('change', (e) => {
        loadTemplateIntoBuilder(e.target.value);
      });
    }

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

    if (DOM.builderRolePresets) {
      DOM.builderRolePresets.addEventListener('click', (e) => {
        const presetBtn = e.target.closest('[data-preset]');
        if (presetBtn) {
          const presetKey = presetBtn.getAttribute('data-preset');
          if (presetKey) insertRolePreset(presetKey);
        }
      });
    }

    if (DOM.autoOptimizeBtn) {
      DOM.autoOptimizeBtn.addEventListener('click', () => {
        if (!DOM.builderExperience) return;
        const dict = i18n[state.language] || i18n.id;
        const raw = DOM.builderExperience.value;
        if (!raw || !raw.trim()) {
          showToast(dict.autoOptimizeNoLinesToast);
          return;
        }
        DOM.builderExperience.value = optimizeExperienceText(raw, state.language);
        renderBuilderLivePreview();
        showToast(dict.autoOptimizeToast);
      });
    }

    if (DOM.builderCopyBtn) {
      DOM.builderCopyBtn.addEventListener('click', () => {
        const dict = i18n[state.language] || i18n.id;
        const text = assembleBuilderPlainText();
        if (!text) {
          showToast(dict.emptyCvToast);
          return;
        }
        copyTextToClipboard(text, dict.builderCopiedToast);
      });
    }

    if (DOM.builderCheckAtsBtn) {
      DOM.builderCheckAtsBtn.addEventListener('click', () => {
        const dict = i18n[state.language] || i18n.id;
        const text = assembleBuilderPlainText();
        if (!text || text.trim().length < 40) {
          showToast(dict.isMinimalText);
          return;
        }
        const atsResult = evaluateBuilderAtsScore(text);
        renderBuilderAtsScore(atsResult);
      });
    }

    async function verifyWithServer(payload) {
      const res = await fetch('/api/verify-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      return { status: res.status, ok: res.ok && data.ok === true, data };
    }

    const handleBuilderDownloadClick = async () => {
      const dict = i18n[state.language] || i18n.id;
      const text = assembleBuilderPlainText();
      if (!text) {
        showToast(dict.emptyCvToast);
        return;
      }
      if (state.payToken) {
        try {
          const check = await verifyWithServer({ token: state.payToken });
          if (check.ok) {
            downloadBuilderDoc();
            return;
          }
        } catch (_) {
          // Fall through to payment modal if offline/expired
        }
        state.payToken = '';
        try { sessionStorage.removeItem('screenora_pay_token'); } catch (_) {}
      }
      openPayModal();
    };

    if (DOM.builderDownloadBtn) {
      DOM.builderDownloadBtn.addEventListener('click', handleBuilderDownloadClick);
    }

    const builderScoreDownloadBtn = document.getElementById('builderScoreDownloadBtn');
    if (builderScoreDownloadBtn) {
      builderScoreDownloadBtn.addEventListener('click', handleBuilderDownloadClick);
    }

    if (DOM.builderPayModalOverlay) {
      DOM.builderPayModalOverlay.addEventListener('click', (e) => {
        if (e.target === DOM.builderPayModalOverlay) closePayModal();
      });
    }
    if (DOM.closePayModalBtn) {
      DOM.closePayModalBtn.addEventListener('click', closePayModal);
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
          const result = await verifyWithServer({ code: inputCode });
          if (result.ok && result.data.token) {
            state.payToken = result.data.token;
            try {
              sessionStorage.setItem('screenora_pay_token', result.data.token);
            } catch (_) {
              // Ignore storage quota or privacy mode errors
            }
            closePayModal();
            showToast(dict.paySuccessToast);
            downloadBuilderDoc({ silentToast: true });
          } else if (result.status === 429) {
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

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closePayModal();
      }
    });

    window.optimizeExperienceText = optimizeExperienceText;
    window.openPayModal = openPayModal;
    window.closePayModal = closePayModal;
    window.setPayMethod = setPayMethod;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
