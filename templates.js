/**
 * SCREENORA — ATS RESUME TEMPLATES ENGINE (templates.js)
 * Standar Nasional & Internasional ATS Architecture
 * Author: Muhammad Faari Akbar (Faari)
 * Anti-Slop, High Performance, Zero-Telemetry Privacy
 */

(function () {
  'use strict';

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
  // 2. STATE & INITIALIZATION
  // --------------------------------------------------------------------------
  const state = {
    theme: localStorage.getItem('screenora_theme') || 'dark',
    language: localStorage.getItem('screenora_lang') || 'id',
    activeFilter: 'all',
    currentActiveTemplate: null
  };

  const DOM = {
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    themeLabel: document.getElementById('themeLabel'),
    langIdBtn: document.getElementById('langIdBtn'),
    langEnBtn: document.getElementById('langEnBtn'),
    filterBar: document.getElementById('filterBar'),
    templatesGrid: document.getElementById('templatesGrid'),
    previewModalOverlay: document.getElementById('previewModalOverlay'),
    previewTag: document.getElementById('previewTag'),
    previewTitle: document.getElementById('previewTitle'),
    previewSubtitle: document.getElementById('previewSubtitle'),
    previewTextContent: document.getElementById('previewTextContent'),
    previewDownloadBtn: document.getElementById('previewDownloadBtn'),
    previewCopyBtn: document.getElementById('previewCopyBtn'),
    comingSoonModalOverlay: document.getElementById('comingSoonModalOverlay'),
    comingSoonTitle: document.getElementById('comingSoonTitle'),
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
      if (DOM.themeLabel) DOM.themeLabel.textContent = 'Dark';
    } else {
      htmlEl.classList.remove('dark');
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
        btn.className = 'filter-btn active px-4 py-2 rounded-xl text-xs font-heading font-semibold transition-all bg-dark-surface border border-brand-emerald/40 text-brand-emerald shadow-sm whitespace-nowrap';
      } else {
        btn.className = 'filter-btn px-4 py-2 rounded-xl text-xs font-heading font-medium text-dark-textSec hover:text-dark-textPri hover:bg-dark-surface/60 border border-transparent transition-all whitespace-nowrap';
      }
    });

    const cards = document.querySelectorAll('.template-card');
    cards.forEach((card) => {
      const category = card.getAttribute('data-category') || '';
      if (filter === 'all') {
        card.style.display = 'flex';
      } else if (category.includes(filter)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // --------------------------------------------------------------------------
  // 7. DOWNLOAD ENGINE (GENERATE CLEAN NATIVE WORD DOCUMENT)
  // --------------------------------------------------------------------------
  function downloadTemplate(templateKey) {
    const tmpl = TEMPLATES[templateKey];
    if (!tmpl) {
      showToast('Template tidak ditemukan.');
      return;
    }

    // Convert plain text into formatted Word-compatible HTML document with standard 1-inch margins
    const lines = tmpl.plainText.split('\n');
    let htmlBody = '';

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) {
        htmlBody += '<p style="margin: 0; line-height: 1.2;">&nbsp;</p>';
      } else if (trimmed === trimmed.toUpperCase() && trimmed.length > 3 && !trimmed.includes('|') && !trimmed.includes('@')) {
        // Section Header (RINGKASAN, PENGALAMAN, etc.)
        htmlBody += `<h3 style="margin-top: 14pt; margin-bottom: 4pt; font-size: 11pt; font-family: Calibri, Arial, sans-serif; font-weight: bold; color: #0F172A; text-transform: uppercase; border-bottom: 1px solid #94A3B8; padding-bottom: 2pt;">${escapeHtml(trimmed)}</h3>`;
      } else if (trimmed.startsWith('- ')) {
        // Bullet point
        htmlBody += `<p style="margin: 2pt 0 2pt 18pt; text-indent: -12pt; font-size: 10pt; font-family: Calibri, Arial, sans-serif; line-height: 1.35; color: #334155;">&bull; ${escapeHtml(trimmed.substring(2))}</p>`;
      } else if (lines.indexOf(line) === 0) {
        // Candidate Name (Title)
        htmlBody += `<h1 style="margin: 0 0 2pt 0; font-size: 18pt; font-family: Calibri, Arial, sans-serif; font-weight: bold; color: #0F172A; text-align: left;">${escapeHtml(trimmed)}</h1>`;
      } else if (lines.indexOf(line) === 1) {
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

    const fullDocumentContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${tmpl.title}</title>
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
    a.download = tmpl.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast(`Template ${tmpl.title} berhasil diunduh!`);
  }

  // --------------------------------------------------------------------------
  // 8. COPY PLAIN TEXT ENGINE
  // --------------------------------------------------------------------------
  function copyTemplateText(templateKey) {
    const tmpl = TEMPLATES[templateKey];
    if (!tmpl) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(tmpl.plainText).then(() => {
        showToast('Format teks template berhasil disalin ke clipboard!');
      }).catch(() => fallbackCopy(tmpl.plainText));
    } else {
      fallbackCopy(tmpl.plainText);
    }
  }

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('Format teks template berhasil disalin ke clipboard!');
    } catch (e) {
      showToast('Gagal menyalin teks secara otomatis.');
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
    if (DOM.previewTag) DOM.previewTag.textContent = tmpl.tag;
    if (DOM.previewTitle) DOM.previewTitle.textContent = tmpl.title;
    if (DOM.previewSubtitle) DOM.previewSubtitle.textContent = tmpl.description;
    if (DOM.previewTextContent) DOM.previewTextContent.textContent = tmpl.plainText;

    if (DOM.previewDownloadBtn) {
      DOM.previewDownloadBtn.onclick = () => downloadTemplate(templateKey);
    }
    if (DOM.previewCopyBtn) {
      DOM.previewCopyBtn.onclick = () => copyTemplateText(templateKey);
    }

    DOM.previewModalOverlay.classList.remove('hidden');
  }

  function closePreviewModal() {
    if (DOM.previewModalOverlay) {
      DOM.previewModalOverlay.classList.add('hidden');
    }
  }

  function openComingSoonModal(templateName) {
    if (!DOM.comingSoonModalOverlay) return;
    if (DOM.comingSoonTitle) {
      DOM.comingSoonTitle.textContent = `Template ${templateName} Sedang Disiapkan`;
    }
    DOM.comingSoonModalOverlay.classList.remove('hidden');
  }

  function closeComingSoonModal() {
    if (DOM.comingSoonModalOverlay) {
      DOM.comingSoonModalOverlay.classList.add('hidden');
    }
  }

  function escapeHtml(str) {
    return str
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

    // Expose functions to window for onclick attributes
    window.downloadTemplate = downloadTemplate;
    window.copyTemplateText = copyTemplateText;
    window.openPreviewModal = openPreviewModal;
    window.closePreviewModal = closePreviewModal;
    window.openComingSoonModal = openComingSoonModal;
    window.closeComingSoonModal = closeComingSoonModal;
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
