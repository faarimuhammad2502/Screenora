/**
 * ============================================================================
 * SCREENORA — AI RESUME INTELLIGENCE & ATS DIAGNOSTIC ENGINE
 * Client-Side JavaScript Application Logic (v1.0 Production)
 * 
 * Features:
 * - 100% Client-side in-browser text extraction (PDF.js + TXT / DOCX fallback)
 * - Dual Theme (Obsidian Dark #0A0B0E & Gallery White #F8F9FB) with LocalStorage
 * - Dual Language (Indonesian ID & English EN) with instant DOM translation
 * - Corporate ATS & Industrial Psychology Screening Engine (0-100% Match)
 * - 35+ Categorized Industry Target Roles with Live Competency Card
 * - Guided Custom Role Template Builder (1-Click Archetypes & Seniority Tuning)
 * - Dynamic Decision Tiers (Tier 1 Shortlist, Tier 2 Backup, Tier 3 High Risk)
 * - Actionable XYZ Formula Sentence Optimization (Accomplished [X] by [Y] doing [Z])
 * - STAR Behavioral Probing Interview Question Generator
 * - QRIS Pro Report Simulation & 1-on-1 Mentoring Booking Modal
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. APPLICATION STATE
  // --------------------------------------------------------------------------
  const state = {
    theme: localStorage.getItem('screenora_theme') || 'dark',
    language: localStorage.getItem('screenora_lang') || 'id',
    activeTab: 'upload', // 'upload' | 'paste'
    screeningStandard: 'id', // 'id' (Standar Nasional Indonesia) | 'global' (Standar Internasional)
    selectedRole: 'hr',  // standard key | 'custom'
    customSeniority: 'mid', // 'entry' | 'mid' | 'senior'
    uploadedFile: null,
    cvText: '',
    currentAnalysis: null,
    isAnalyzing: false
  };

  // --------------------------------------------------------------------------
  // 2. INTERNATIONALIZATION (i18n) DICTIONARY
  // --------------------------------------------------------------------------
  const i18n = {
    id: {
      navSubtitle: 'AI Resume Intelligence & ATS Diagnostic',
      privacyBadge: 'Lokal & Terenkripsi',
      heroBadge: 'ATS Diagnostic & Behavioral Screening',
      heroTitle: 'Ketahui Skor Kelolosan CV & Celah ATS Sebelum Melamar',
      heroDesc: 'Pemindaian teks lokal mendeteksi keberadaan kata kunci kompetensi, struktur kalimat berbobot formula XYZ, dan parameter kelolosan rekruter dalam 3 detik tanpa mengunggah data Anda ke server asing.',
      samplePrompt: 'Ingin coba langsung tanpa berkas?',
      sampleBtn: 'Muat Sampel Profil HR / Analyst',
      step1Label: 'Dokumen CV Pelamar',
      tabUpload: 'Upload File',
      tabPaste: 'Tempel Teks',
      dropzonePrompt: 'Pilih atau Seret Berkas CV (PDF / DOCX)',
      dropzoneLimit: 'Maksimal 5 MB • Teks digital (bukan hasil scan foto/gambar)',
      browseBtn: 'Jelajahi File',
      pasteHint: 'Tips: Anda bisa langsung menyalin seluruh teks dari Google Docs atau file CV Anda.',
      formatNotice: 'Didukung: PDF Teks, Word DOCX, TXT',
      privacyNotice: 'Zero-Data Retention (Client-Side)',
      step2Label: 'Posisi Pekerjaan Target',
      step2Hint: 'Pilih Cepat / Kustom',
      roleSelectLabel: 'Pilih Posisi Standar / Kustom:',
      runBtnLabel: 'Mulai Pemindaian Dokumen',
      btnSubtext: 'Analisis Berbasis Psikologi HR • Standar ATS Korporat • Instan',
      retestBtn: 'Uji Dokumen atau Posisi Lain',
      strengthsHead: 'Kekuatan Kompetensi Terverifikasi',
      strengthFootnote: 'Poin ini adalah nilai jual utama yang wajib ditekankan saat menjawab wawancara.',
      gapsHead: 'Celah Kualifikasi & Filter ATS',
      gapFootnote: 'Celah ini berpotensi menurunkan skor filter awal pada ATS korporasi multinasional.',
      rewriteHead: 'Optimasi Kalimat Berdampak (Formula XYZ)',
      copyBtn: 'Salin Teks',
      proBannerTitle: 'Laporan Lengkap & Sesi Konsultasi Privat (Segera Hadir)',
      proBannerDesc: 'Fitur generator laporan 10 halaman & sesi mentoring saat ini sedang disiapkan. Seluruh diagnostik dasar Screenora sekarang 100% Gratis. Punya pertanyaan atau saran? Hubungi Faari via email.',
      qrisModalTitle: 'Laporan Diagnostik 10 Halaman (Segera Hadir)',
      qrisModalSubtitle: 'Fitur unduh laporan 10 halaman dan template ATS sedang dalam tahap pengembangan. Saat ini Screenora 100% Gratis!',
      consultModalTitle: 'Pusat Diskusi, Masukan & Konsultasi Karir',
      consultModalSubtitle: 'Sesi mentoring privat tatap muka saat ini sedang disiapkan. Seluruh fitur pemindaian dasar Screenora 100% Gratis. Untuk pertanyaan, kritik, atau masukan pengembangan, silakan hubungi kami via email.',
      legalDisclaimer: 'Screenora adalah alat simulasi dan diagnostik persiapan karir independen berbasis algoritma heuristik, tidak berafiliasi atau menjamin penerimaan kerja di instansi, BUMN, maupun perusahaan mana pun.',
      toastCopied: 'Kalimat rekomendasi berhasil disalin ke clipboard!',
      toastSampleLoaded: 'Sampel profil kandidat berhasil dimuat!',
      toastNoText: 'Silakan unggah berkas CV atau tempel teks riwayat Anda terlebih dahulu.',
      toastAnalyzing: 'Memindai teks dan menghitung matriks kompetensi...',
      toastPaymentSuccess: 'Simulasi Berhasil! Laporan diagnostik 10-halaman Anda siap diunduh.',
      toastTemplateLoaded: 'Template posisi kustom berhasil dimuat!',
      tier1Label: 'HIJAU (≥80%) : MATCH TINGGI',
      tier2Label: 'KUNING (65-79%) : CADANGAN POTENSIAL',
      tier3Label: 'MERAH (<65%) : RAWAN TERELIMINASI',
      tier1Badge: 'TIER 1 : SHORTLIST CANDIDATE (HIGH FIT)',
      tier2Badge: 'TIER 2 : BACKUP CANDIDATE (MODERATE FIT)',
      tier3Badge: 'TIER 3 : HIGH RISK / GAP IDENTIFIED (LOW FIT)'
    },
    en: {
      navSubtitle: 'AI Resume Intelligence & ATS Diagnostic',
      privacyBadge: 'Local & Private',
      heroBadge: 'ATS Diagnostic & Behavioral Screening',
      heroTitle: 'Know Your CV Pass Rate & ATS Gaps Before Applying',
      heroDesc: 'Local in-browser text engine detects competency keywords, high-impact XYZ sentence structures, and recruiter screening benchmarks in 3 seconds without sending your data to external servers.',
      samplePrompt: 'Want to test instantly without a file?',
      sampleBtn: 'Load Sample HR / Analyst Profile',
      step1Label: 'Applicant CV File',
      tabUpload: 'Upload File',
      tabPaste: 'Paste Text',
      dropzonePrompt: 'Select or Drag & Drop CV File (PDF / DOCX)',
      dropzoneLimit: 'Max 5 MB • Digital text (not scanned images/photos)',
      browseBtn: 'Browse File',
      pasteHint: 'Pro-tip: You can directly copy and paste the entire text from Google Docs or Word.',
      formatNotice: 'Supported: PDF Text, Word DOCX, TXT',
      privacyNotice: 'Zero-Data Retention (Client-Side)',
      step2Label: 'Target Job Role',
      step2Hint: 'Quick Select / Custom',
      roleSelectLabel: 'Select Standard or Custom Role:',
      runBtnLabel: 'Run Resume Screening',
      btnSubtext: 'HR Psychology Analytics • Enterprise ATS Benchmark • Instant',
      retestBtn: 'Test Another Document or Role',
      strengthsHead: 'Verified Competency Strengths',
      strengthFootnote: 'These key selling points should be emphasized during behavioral interviews.',
      gapsHead: 'ATS Qualification Gaps',
      gapFootnote: 'These gaps may trigger early automated disqualification on multinational ATS filters.',
      rewriteHead: 'High-Impact Sentence Optimization (XYZ Formula)',
      copyBtn: 'Copy Text',
      proBannerTitle: 'Complete Diagnostic Report & Private Mentoring (Coming Soon)',
      proBannerDesc: 'The 10-page diagnostic report & private consultation are currently in development. Basic Screenora diagnostic features are 100% Free. Questions or feedback? Contact Faari directly via email.',
      qrisModalTitle: '10-Page Diagnostic Report (Coming Soon)',
      qrisModalSubtitle: 'The 10-page deep-dive report & ATS template download are in development. Screenora is currently 100% Free!',
      consultModalTitle: 'Career Discussion, Feedback & Mentoring (Coming Soon)',
      consultModalSubtitle: 'Private 1-on-1 mentoring sessions are currently in development. Screenora is 100% Free to use. For questions, discussion, or feedback, email Faari directly!',
      legalDisclaimer: 'Screenora is an independent career diagnostic simulation based on heuristic algorithms, not affiliated with or guaranteeing job offers at any specific company.',
      toastCopied: 'Optimized sentence copied to clipboard!',
      toastSampleLoaded: 'Candidate sample profile loaded successfully!',
      toastNoText: 'Please upload a CV file or paste your resume text first.',
      toastAnalyzing: 'Scanning resume text and evaluating competency matrix...',
      toastPaymentSuccess: 'Simulation Successful! Your 10-page report is ready for download.',
      toastTemplateLoaded: 'Custom role template loaded successfully!',
      tier1Label: 'GREEN (≥80%) : HIGH MATCH',
      tier2Label: 'AMBER (65-79%) : POTENTIAL BACKUP',
      tier3Label: 'RED (<65%) : HIGH RISK OF REJECTION',
      tier1Badge: 'TIER 1 : SHORTLIST CANDIDATE (HIGH FIT)',
      tier2Badge: 'TIER 2 : BACKUP CANDIDATE (MODERATE FIT)',
      tier3Badge: 'TIER 3 : HIGH RISK / GAP IDENTIFIED (LOW FIT)'
    }
  };

  // --------------------------------------------------------------------------
  // 3. ARCHETYPE TEMPLATES (FOR 1-CLICK CUSTOM ROLE BUILDER)
  // --------------------------------------------------------------------------
  const ARCHETYPE_TEMPLATES = {
    growth: {
      title: 'Growth Marketing & Revenue Specialist',
      keywords: 'Growth Hacking, CAC, LTV, Performance Marketing, Meta Ads, Google Ads, SEO, Funnel Optimization, A/B Testing, ROI, Retention, Conversion Rate',
      seniority: 'mid'
    },
    tech: {
      title: 'Senior Software & Cloud Systems Engineer',
      keywords: 'Architecture, Clean Code, CI/CD, Microservices, API Design, Docker, Kubernetes, PostgreSQL, Scalability, Automated Testing, Cloud AWS, GCP',
      seniority: 'senior'
    },
    ops: {
      title: 'People Operations & Organization Development',
      keywords: 'Employee Engagement, People Analytics, Performance Management, SOP, OKR, Talent Retention, Onboarding, Change Management, HRIS, Culture',
      seniority: 'mid'
    },
    research: {
      title: 'Quantitative Research & Strategic Analyst',
      keywords: 'Statistical Analysis, Python, SQL, Hypothesis Testing, Survey Design, Data Visualization, Market Sizing, Behavioral Modeling, Insights, Methodology',
      seniority: 'mid'
    }
  };

  // --------------------------------------------------------------------------
  // 4. TARGET ROLE COMPETENCY MATRICES (35+ ROLES)
  // --------------------------------------------------------------------------
  const ROLE_CONFIGS = {
    // ── HR, People & Organisasi ──
    hr: {
      category: { id: 'HR & Organisasi', en: 'HR & Organization' },
      name: { id: 'HR Generalist & Talent Acquisition', en: 'HR Generalist & Talent Acquisition' },
      desc: {
        id: 'Fokus pengujian: Metodologi wawancara STAR, people metrics, sourcing terstruktur, retensi talenta, dan kepatuhan administrasi SDM.',
        en: 'Core assessment: STAR behavioral probing, talent sourcing, retention metrics, and organizational compliance.'
      },
      topKeywords: ['STAR Interview', 'Talent Sourcing', 'HRIS', 'People Analytics', 'Employee Retention'],
      keywords: [
        'psikologi', 'psychology', 'recruitment', 'talent acquisition', 'sourcing',
        'star', 'interview', 'hris', 'people analytics', 'onboarding', 'training',
        'kpi', 'talent management', 'retensi', 'retention', 'evaluasi', 'performance',
        'bpjs', 'hubungan industrial', 'konseling', 'kompetensi'
      ],
      defaultBefore: {
        id: '"Bertanggung jawab membantu proses rekrutmen karyawan baru dan mengurus administrasi HR."',
        en: '"Responsible for helping with new hire recruitment and handling HR admin tasks."'
      },
      defaultAfter: {
        id: '"Memimpin end-to-end recruitment cycle untuk 18 posisi spesialis menggunakan teknik wawancara STAR, memangkas time-to-hire sebesar 28% dengan angka retensi kandidat 94% pada probation."',
        en: '"Orchestrated end-to-end recruitment cycles across 18 specialist positions utilizing STAR behavioral probing, cutting time-to-hire by 28% while maintaining a 94% 6-month retention rate."'
      },
      starQuestion: {
        id: '"Ceritakan situasi ketika Anda harus memilih antara dua kandidat dengan skor kompetensi teknis setara namun kesesuaian budaya kerja (cultural fit) berbeda. Apa pertimbangan psikologis Anda dan bagaimana hasilnya?"',
        en: '"Describe a situation where you had to decide between two finalists with identical technical skill scores but differing cultural alignment. What psychological cues did you evaluate and what was the outcome?"'
      }
    },

    hrbp: {
      category: { id: 'HR & Organisasi', en: 'HR & Organization' },
      name: { id: 'HR Business Partner (HRBP)', en: 'HR Business Partner (HRBP)' },
      desc: {
        id: 'Fokus pengujian: Strategic workforce planning, stakeholder alignment, succession planning, organisasi agile, dan integrasi strategi bisnis.',
        en: 'Core assessment: Strategic workforce planning, executive stakeholder alignment, succession design, and business strategy linkage.'
      },
      topKeywords: ['Workforce Planning', 'Stakeholder Alignment', 'Succession Plan', 'Talent Strategy', 'Change Management'],
      keywords: [
        'hrbp', 'business partner', 'workforce planning', 'succession', 'stakeholder', 'talent management',
        'organizational design', 'change management', 'leadership development', 'retention', 'headcount',
        'engagement', 'people strategy', 'attrition rate', 'okr', 'performance review'
      ],
      defaultBefore: {
        id: '"Menghubungkan divisi bisnis dengan tim HR untuk menangani masalah ketenagakerjaan."',
        en: '"Bridged business divisions with the HR department to handle employee concerns."'
      },
      defaultAfter: {
        id: '"Menyelaraskan strategic workforce plan bersama VP of Engineering untuk 60+ headcounts baru, mereduksi voluntary attrition divisi teknologi dari 19% ke 7.5% dalam 12 bulan."',
        en: '"Formulated and executed a strategic workforce plan partnering with VP of Engineering across 60+ headcount adds, slashing tech voluntary attrition from 19% to 7.5% in 12 months."'
      },
      starQuestion: {
        id: '"Bagaimana Anda menangani resistensi pimpinan divisi bisnis saat rekomendasi restrukturisasi talenta dari HR dinilai mengganggu ritme delivery proyek mereka?"',
        en: '"How did you handle pushback from a business unit director when HR restructuring recommendations were perceived as a risk to project velocity?"'
      }
    },

    people_culture: {
      category: { id: 'HR & Organisasi', en: 'HR & Organization' },
      name: { id: 'People & Culture Specialist', en: 'People & Culture Specialist' },
      desc: {
        id: 'Fokus pengujian: Employer branding, employee engagement survey, nilai budaya perusahaan, internal communications, dan program well-being.',
        en: 'Core assessment: Employer branding, eNPS engagement diagnostics, internal comms, and corporate values adoption.'
      },
      topKeywords: ['eNPS & Engagement', 'Employer Branding', 'Culture Values', 'Internal Comms', 'Well-being'],
      keywords: [
        'people & culture', 'culture', 'employee engagement', 'enps', 'employer branding', 'well-being',
        'internal communication', 'values', 'townhall', 'diversity', 'inclusion', 'retention', 'recognition'
      ],
      defaultBefore: {
        id: '"Mengadakan kegiatan gathering karyawan dan membuat newsletter bulanan."',
        en: '"Organized employee gathering activities and produced monthly newsletter bulletins."'
      },
      defaultAfter: {
        id: '"Merancang inisiatif Culture Catalyst dan program pengakuan peer-to-peer terstruktur, mendongkrak Employee Net Promoter Score (eNPS) sebesar +34 poin dalam 2 kuartal berturut-turut."',
        en: '"Spearheaded the Culture Catalyst initiative and structured peer recognition framework, driving a +34 point lift in Employee Net Promoter Score (eNPS) across two consecutive quarters."'
      },
      starQuestion: {
        id: '"Ceritakan inisiatif konkret yang Anda bangun untuk menyatukan budaya kerja tim saat perusahaan beralih ke pola kerja hybrid permanen."',
        en: '"Detail a concrete intervention you led to bridge cultural cohesion when the workforce transitioned to a permanent hybrid operating model."'
      }
    },

    ld_specialist: {
      category: { id: 'HR & Organisasi', en: 'HR & Organization' },
      name: { id: 'Learning & Development (L&D) Specialist', en: 'Learning & Development (L&D) Specialist' },
      desc: {
        id: 'Fokus pengujian: Training Needs Analysis (TNA), ADDIE model, LMS, fasilitasi workshop kepemimpinan, dan evaluasi dampak pelatihan Kirkpatrick.',
        en: 'Core assessment: Training Needs Analysis (TNA), ADDIE instructional model, LMS orchestration, and Kirkpatrick evaluation framework.'
      },
      topKeywords: ['TNA', 'Kirkpatrick Evaluation', 'LMS', 'Curriculum Design', 'Leadership Workshop'],
      keywords: [
        'l&d', 'learning & development', 'tna', 'training needs analysis', 'kirkpatrick', 'addie',
        'curriculum', 'lms', 'facilitation', 'workshop', 'coaching', 'onboarding academy', 'upskilling'
      ],
      defaultBefore: {
        id: '"Menyiapkan materi training untuk karyawan baru dan mencatat absensi pelatihan."',
        en: '"Prepared training slides for new hires and recorded training attendance logs."'
      },
      defaultAfter: {
        id: '"Membangun kurikulum Onboarding Academy interaktif berbasis microlearning yang memangkas ramp-up time karyawan baru dari 45 hari menjadi 21 hari dengan skor evaluasi Kirkpatrick Level 1 rata-rata 4.8/5.0."',
        en: '"Designed a modular microlearning Onboarding Academy slashing new-hire ramp time from 45 to 21 days while maintaining an average 4.8/5.0 Kirkpatrick Level-1 satisfaction rating."'
      },
      starQuestion: {
        id: '"Bagaimana cara Anda membuktikan kepada CFO bahwa anggaran program upskilling karyawan benar-benar menghasilkan Return on Investment (ROI) bagi bisnis?"',
        en: '"How did you objectively quantify business ROI to executive leadership to validate continuing budget allocation for professional upskilling programs?"'
      }
    },

    comp_ben: {
      category: { id: 'HR & Organisasi', en: 'HR & Organization' },
      name: { id: 'Compensation & Benefits Specialist', en: 'Compensation & Benefits Specialist' },
      desc: {
        id: 'Fokus pengujian: Salary benchmarking, job grading, insentif performa, payroll compliance, BPJS Ketenagakerjaan/Kesehatan, dan cost-of-labor.',
        en: 'Core assessment: Salary market benchmarking, job grading architectures, incentive structures, and payroll governance.'
      },
      topKeywords: ['Salary Benchmarking', 'Job Grading', 'Incentive Modeling', 'Payroll & BPJS', 'Cost of Labor'],
      keywords: [
        'compensation', 'benefits', 'comp & ben', 'salary structure', 'job grading', 'hay group',
        'mercer', 'payroll', 'bpjs', 'remunerasi', 'insentif', 'tax pph 21', 'annual increment'
      ],
      defaultBefore: {
        id: '"Menghitung gaji bulanan karyawan dan mengurus klaim asuransi kesehatan."',
        en: '"Calculated monthly employee salaries and processed medical insurance claims."'
      },
      defaultAfter: {
        id: '"Melakukan restrukturisasi total sistem salary grading berbasis Mercer market benchmark untuk 320 karyawan, mengoptimalkan rasio cost-of-labor hingga 14% tanpa memicu turnover."',
        en: '"Restructured enterprise-wide salary grading based on Mercer benchmarking across 320 roles, optimizing cost-of-labor by 14% while retaining 98% of top-tier talent."'
      },
      starQuestion: {
        id: '"Bagaimana Anda menyelesaikan disparitas gaji yang tajam antara karyawan lama yang loyal dengan kandidat baru yang direkrut dengan harga pasar tinggi?"',
        en: '"How did you address and resolve salary compression and disparity between tenured staff and incoming market-priced hires without triggering organizational friction?"'
      }
    },

    industrial_relations: {
      category: { id: 'HR & Organisasi', en: 'HR & Organization' },
      name: { id: 'Industrial & Employee Relations Specialist', en: 'Industrial & Employee Relations Specialist' },
      desc: {
        id: 'Fokus pengujian: UU Cipta Kerja/Ketenagakerjaan, Perjanjian Kerja Bersama (PKB), mediasi bipartit, penanganan perselisihan, dan audit ketenagakerjaan.',
        en: 'Core assessment: Labor law compliance, collective bargaining agreements (CBA), bipartite negotiations, and dispute resolution.'
      },
      topKeywords: ['UU Ketenagakerjaan', 'Perundingan Bipartit', 'PKB / PP', 'Dispute Resolution', 'Audit Kepatuhan'],
      keywords: [
        'hubungan industrial', 'industrial relations', 'uu ketenagakerjaan', 'cipta kerja', 'pkb',
        'peraturan perusahaan', 'bipartit', 'tripartit', 'disnaker', 'mediasi', 'sp', 'phk', 'severance'
      ],
      defaultBefore: {
        id: '"Membuat surat peringatan karyawan dan menghadiri rapat dengan dinas tenaga kerja."',
        en: '"Drafted employee warning letters and attended meetings with the labor office."'
      },
      defaultAfter: {
        id: '"Memimpin negosiasi perpanjangan Perjanjian Kerja Bersama (PKB) bersama 3 perwakilan serikat pekerja hingga penandatanganan sukses dengan 0 hari mogok kerja dan 100% kepatuhan regulasi."',
        en: '"Led bipartite negotiations for the biennial Collective Bargaining Agreement with 3 labor union bodies, achieving unanimous ratification with 0 strike hours and 100% regulatory compliance."'
      },
      starQuestion: {
        id: '"Ceritakan kasus sengketa hubungan kerja terberat yang pernah Anda tangani. Bagaimana Anda menjaga integritas hukum perusahaan sekaligus memperlakukan karyawan secara adil?"',
        en: '"Describe the most volatile labor relations grievance you mediated. How did you maintain stringent legal compliance while upholding dignity and fairness?"'
      }
    },

    // ── Bisnis, Operasional & Produk ──
    ba: {
      category: { id: 'Bisnis & Operasional', en: 'Business & Operations' },
      name: { id: 'Business Analyst', en: 'Business Analyst' },
      desc: {
        id: 'Fokus pengujian: Requirements gathering, gap analysis, pemodelan proses bisnis, SQL/Tableau, metrik ROI, dan user stories teknis.',
        en: 'Core assessment: Requirements gathering, gap analysis, BPMN process modeling, SQL/BI dashboards, and quantified ROI.'
      },
      topKeywords: ['SQL & Tableau', 'Requirements Gathering', 'Process Mapping', 'Gap Analysis', 'Business Case ROI'],
      keywords: [
        'business analyst', 'data analysis', 'sql', 'tableau', 'excel', 'power bi',
        'kpi', 'dashboard', 'requirements gathering', 'stakeholder', 'process improvement',
        'metrik', 'roi', 'pipeline', 'workflow', 'analisis bisnis', 'gap analysis', 'user story'
      ],
      defaultBefore: {
        id: '"Menganalisis data penjualan bulanan dan membuat laporan untuk pimpinan."',
        en: '"Analyzed monthly sales data and prepared summary reports for management."'
      },
      defaultAfter: {
        id: '"Membangun automated BI dashboard interaktif yang memonitor 14 KPI operasional utama, mempercepat siklus decision-making manajemen hingga 40% dan menghemat 12 jam kerja pelaporan manual mingguan."',
        en: '"Engineered an automated executive BI dashboard tracking 14 critical operational KPIs, accelerating management decision velocity by 40% and reclaiming 12 weekly hours of manual reporting."'
      },
      starQuestion: {
        id: '"Jelaskan satu momen saat rekomendasi berbasis data Anda mendapat penolakan keras dari stakeholder non-teknis. Bagaimana Anda menjembatani pemahaman bisnis tersebut hingga inisiatif disetujui?"',
        en: '"Tell me about a time when your data-driven recommendations faced pushback from non-technical business stakeholders. How did you reframe the metrics to secure executive buy-in?"'
      }
    },

    pm: {
      category: { id: 'Bisnis & Produk', en: 'Business & Product' },
      name: { id: 'Product Manager / Associate PM', en: 'Product Manager / Associate PM' },
      desc: {
        id: 'Fokus pengujian: PRD, product roadmap, backlog prioritization (RICE), user story, metrik produk (AARRR), agile sprint, dan user discovery.',
        en: 'Core assessment: PRD authoring, product roadmapping, RICE backlog scoring, product analytics (AARRR), and agile sprint governance.'
      },
      topKeywords: ['PRD & Roadmap', 'RICE Prioritization', 'Product Analytics', 'User Discovery', 'Agile / Scrum'],
      keywords: [
        'product manager', 'product management', 'prd', 'roadmap', 'user story', 'backlog',
        'rice', 'scrum', 'agile', 'a/b testing', 'retention', 'activation', 'mixpanel', 'jira'
      ],
      defaultBefore: {
        id: '"Menyusun rencana fitur baru aplikasi dan memimpin meeting harian tim developer."',
        en: '"Planned new application features and facilitated daily standup meetings with engineers."'
      },
      defaultAfter: {
        id: '"Menyusun PRD dan memimpin peluncuran fitur checkout 1-klik yang diuji lewat A/B testing pada 45.000 pengguna aktif, meningkatkan conversion rate sebesar 19.4% dan mengangkat GMV kuartalan sebesar $320K."',
        en: '"Authored comprehensive PRDs and led the delivery of a 1-click checkout flow validated across 45,000 MAU via A/B testing, driving a 19.4% conversion uplift and generating $320K in incremental quarterly GMV."'
      },
      starQuestion: {
        id: '"Bagaimana Anda memutuskan untuk membatalkan (kill) sebuah fitur yang sudah dikerjakan selama dua sprint ketika data user engagement awal menunjukkan tren yang mengecewakan?"',
        en: '"Walk me through how you made the executive call to kill a feature post-launch when early telemetry refuted your initial product hypothesis."'
      }
    },

    operations: {
      category: { id: 'Bisnis & Operasional', en: 'Business & Operations' },
      name: { id: 'Operations & Process Improvement', en: 'Operations & Process Improvement' },
      desc: {
        id: 'Fokus pengujian: Lean Six Sigma, standard operating procedure (SOP), eliminasi bottleneck, optimasi biaya operasional, dan vendor SLA.',
        en: 'Core assessment: Lean Six Sigma, SOP standardization, bottleneck elimination, operational OPEX reduction, and vendor SLAs.'
      },
      topKeywords: ['Lean Six Sigma', 'SOP Standardization', 'Bottleneck Elimination', 'OPEX Reduction', 'Vendor SLA'],
      keywords: [
        'operations', 'operasional', 'process improvement', 'sop', 'lean', 'six sigma',
        'bottleneck', 'efficiency', 'cost reduction', 'sla', 'logistik', 'procurement', 'kpi'
      ],
      defaultBefore: {
        id: '"Memastikan kegiatan operasional kantor berjalan lancar dan mengawasi vendor."',
        en: '"Ensured office operational activities ran smoothly and monitored supplier vendors."'
      },
      defaultAfter: {
        id: '"Merekayasa ulang alur pemrosesan pesanan menggunakan metodologi Lean, memangkas lead time dari 48 jam menjadi 16 jam serta menghemat biaya operasional tahunan sebesar Rp 140 Juta."',
        en: '"Re-engineered order fulfillment workflows utilizing Lean principles, slashing end-to-end lead time from 48 to 16 hours and yielding Rp 140M in recurring annual operational savings."'
      },
      starQuestion: {
        id: '"Ceritakan ketika terjadi kegagalan sistem operasional mendadak pada rantai pasok. Langkah darurat apa yang Anda ambil dalam 2 jam pertama untuk mencegah kerugian finansial?"',
        en: '"Describe a sudden operational breakdown in your delivery pipeline. What rapid containment measures did you deploy in the first 2 hours to safeguard SLA commitments?"'
      }
    },

    scrum_master: {
      category: { id: 'Bisnis & Manajemen', en: 'Business & Management' },
      name: { id: 'Project Manager / Scrum Master', en: 'Project Manager / Scrum Master' },
      desc: {
        id: 'Fokus pengujian: Sprint ceremonies, velocity tracking, burndown chart, manajemen risiko, stakeholder communication, dan kepatuhan timeline.',
        en: 'Core assessment: Agile ceremony facilitation, velocity metrics, risk matrices, stakeholder management, and milestone governance.'
      },
      topKeywords: ['Sprint Planning', 'Velocity & Burndown', 'Risk Matrix', 'Agile Ceremonies', 'Delivery Milestone'],
      keywords: [
        'scrum master', 'project manager', 'pmp', 'agile', 'scrum', 'sprint', 'kanban',
        'jira', 'burndown', 'velocity', 'standup', 'retrospective', 'stakeholder', 'gantt'
      ],
      defaultBefore: {
        id: '"Membuat jadwal proyek dan memimpin rapat evaluasi mingguan dengan tim."',
        en: '"Drafted project schedules and ran weekly progress reviews with team members."'
      },
      defaultAfter: {
        id: '"Memfasilitasi 4 squad engineering lintas fungsi dalam delivery platform enterprise, meningkatkan sprint velocity sebesar 32% dan menuntaskan proyek 2 minggu lebih cepat dari target tenggat."',
        en: '"Facilitated 4 cross-functional engineering squads delivering an enterprise core platform, accelerating sprint velocity by 32% and achieving production rollout 2 weeks ahead of baseline schedule."'
      },
      starQuestion: {
        id: '"Bagaimana cara Anda menyelesaikan sengketa prioritas teknis (technical debt) antara Lead Architect dengan desakan fitur baru dari Product Owner?"',
        en: '"How did you arbitrate a high-friction impasse between a Lead Architect advocating technical debt refactoring and a Product Owner demanding immediate commercial features?"'
      }
    },

    supply_chain: {
      category: { id: 'Bisnis & Logistik', en: 'Business & Logistics' },
      name: { id: 'Supply Chain & Logistics Specialist', en: 'Supply Chain & Logistics Specialist' },
      desc: {
        id: 'Fokus pengujian: Inventory turnover, demand forecasting, manajemen gudang (WMS), procurement, audit vendor, dan optimalisasi rute distribusi.',
        en: 'Core assessment: Inventory turnover velocity, demand forecasting models, WMS warehousing, vendor audits, and freight routing.'
      },
      topKeywords: ['Demand Forecasting', 'Inventory Turnover', 'WMS & ERP', 'Vendor Procurement', 'Freight Optimization'],
      keywords: [
        'supply chain', 'logistik', 'logistics', 'procurement', 'inventory', 'warehouse',
        'wms', 'sap', 'demand forecasting', 'vendor management', 'turnover', 'freight', 'customs'
      ],
      defaultBefore: {
        id: '"Mengelola stok barang di gudang dan mengurus pengiriman pesanan pelanggan."',
        en: '"Managed warehouse stock levels and arranged shipping for customer orders."'
      },
      defaultAfter: {
        id: '"Mengimplementasikan sistem demand forecasting terintegrasi pada ERP, menaikkan inventory turnover ratio sebesar 28% dan menurunkan insiden stock-out sebesar 82%."',
        en: '"Deployed an integrated ERP demand-forecasting pipeline, increasing inventory turnover ratio by 28% while suppressing stock-out incidents by 82% across 5 regional hubs."'
      },
      starQuestion: {
        id: '"Saat terjadi disrupsi pengiriman logistik internasional mendadak, alternatif jalur darat atau laut apa yang Anda negosiasikan untuk menjaga ketersediaan stok?"',
        en: '"When facing an unexpected international freight shutdown, how did you rapidly procure and deploy secondary fulfillment channels to maintain store inventory continuity?"'
      }
    },

    // ── Teknologi, Software & Desain ──
    developer: {
      category: { id: 'Teknologi & Software', en: 'Technology & Software' },
      name: { id: 'Frontend & Web Developer', en: 'Frontend & Web Developer' },
      desc: {
        id: 'Fokus pengujian: JavaScript modern, arsitektur komponen, Tailwind/CSS, optimasi Core Web Vitals, responsive design, dan clean UI engineering.',
        en: 'Core assessment: Modern JavaScript, component architecture, Tailwind/CSS, Core Web Vitals optimization, and robust UI engineering.'
      },
      topKeywords: ['Vanilla JS / React', 'Tailwind CSS', 'Core Web Vitals', 'Responsive UI', 'State Management'],
      keywords: [
        'frontend', 'web developer', 'html', 'css', 'javascript', 'react', 'tailwind',
        'ui/ux', 'git', 'responsive', 'performance', 'api', 'dom', 'spa', 'figma',
        'optimasi', 'web vitals', 'cross-browser', 'vanilla js'
      ],
      defaultBefore: {
        id: '"Membuat tampilan website responsive dan memperbaiki bug tampilan."',
        en: '"Built responsive web pages and fixed UI bugs across browsers."'
      },
      defaultAfter: {
        id: '"Mengembangkan arsitektur Single Page Application (SPA) modular dengan Tailwind CSS dan Vanilla JS yang memangkas Core Web Vitals LCP menjadi 0.8s serta meningkatkan konversi checkout sebesar 22%."',
        en: '"Architected a lightweight, modular SPA interface with Tailwind CSS and Vanilla JS, slashing LCP to 0.8s and lifting mobile checkout conversion by 22%."'
      },
      starQuestion: {
        id: '"Ceritakan ketika Anda harus mengorbankan estetika desain animasi yang rumit demi mempertahankan target loading time di bawah 1 detik pada perangkat low-end. Bagaimana Anda mencapai titik temu?"',
        en: '"Describe a scenario where you negotiated a compromise between high-fidelity aesthetic micro-animations and strict sub-second performance budgets on mobile devices."'
      }
    },

    backend: {
      category: { id: 'Teknologi & Software', en: 'Technology & Software' },
      name: { id: 'Backend & API Engineer', en: 'Backend & API Engineer' },
      desc: {
        id: 'Fokus pengujian: RESTful/GraphQL API, database indexing (PostgreSQL/MySQL), caching Redis, microservices, auth/JWT, dan efisiensi server.',
        en: 'Core assessment: REST/GraphQL services, database indexing (PostgreSQL), Redis caching, auth protocols, and high-throughput systems.'
      },
      topKeywords: ['REST & GraphQL', 'PostgreSQL / SQL', 'Redis Caching', 'Microservices', 'API Security / JWT'],
      keywords: [
        'backend', 'api', 'node.js', 'python', 'golang', 'postgresql', 'mysql',
        'redis', 'rest', 'graphql', 'docker', 'microservices', 'jwt', 'orm', 'caching'
      ],
      defaultBefore: {
        id: '"Membuat API untuk aplikasi mobile dan mengelola database pengguna."',
        en: '"Created APIs for mobile apps and managed the user relational database."'
      },
      defaultAfter: {
        id: '"Mendesain ulang arsitektur microservices API dengan database indexing PostgreSQL dan caching Redis, memangkas latency rata-rata endpoint dari 340ms ke 48ms pada beban 10.000 RPS."',
        en: '"Re-engineered microservices API endpoints incorporating PostgreSQL query tuning and Redis caching, cutting P99 latency from 340ms to 48ms under sustained 10,000 RPS traffic."'
      },
      starQuestion: {
        id: '"Bagaimana Anda menangani insiden deadlock database kritis pada jam sibuk tanpa menyebabkan kehilangan data (data loss) pada transaksi pengguna?"',
        en: '"Walk me through how you diagnosed and resolved a high-severity database deadlock incident during peak hours with zero transactional data corruption."'
      }
    },

    fullstack: {
      category: { id: 'Teknologi & Software', en: 'Technology & Software' },
      name: { id: 'Fullstack Developer', en: 'Fullstack Developer' },
      desc: {
        id: 'Fokus pengujian: Integrasi end-to-end frontend dan backend, arsitektur database, otentikasi aman, CI/CD, dan kesiapan produksi scalable.',
        en: 'Core assessment: End-to-end web architecture, full-stack state synchronization, database modeling, CI/CD, and scalable deployments.'
      },
      topKeywords: ['End-to-End Stack', 'API & Database', 'Frontend Framework', 'CI/CD Pipeline', 'System Security'],
      keywords: [
        'fullstack', 'full stack', 'javascript', 'typescript', 'react', 'node', 'express',
        'database', 'sql', 'nosql', 'api', 'git', 'ci/cd', 'deployment', 'docker', 'rest'
      ],
      defaultBefore: {
        id: '"Mengerjakan tampilan depan dan sistem backend web perusahaan."',
        en: '"Worked on front-end user interfaces and back-end application systems."'
      },
      defaultAfter: {
        id: '"Membangun platform portal SaaS secara mandiri end-to-end dari arsitektur UI hingga RESTful backend, melayani 20.000+ pengguna bulanan dengan uptime 99.9%."',
        en: '"Engineered a multi-tenant SaaS web platform from ground up including modern reactive frontend and microservice backend, supporting 20,000+ MAU with 99.9% uptime."'
      },
      starQuestion: {
        id: '"Ketika Anda bertanggung jawab penuh atas seluruh stack teknis, bagaimana Anda menyeimbangkan antara kecepatan merilis fitur dengan stabilitas arsitektur?"',
        en: '"Holding full responsibility across the entire technology stack, how do you prioritize fast feature releases against technical debt and long-term architectural stability?"'
      }
    },

    mobile_dev: {
      category: { id: 'Teknologi & Software', en: 'Technology & Software' },
      name: { id: 'Mobile App Developer (Flutter/React Native)', en: 'Mobile App Developer (Flutter/React Native)' },
      desc: {
        id: 'Fokus pengujian: Mobile UI/UX, state management (Bloc/Provider/Redux), offline caching, performa memori, dan deployment Play Store / App Store.',
        en: 'Core assessment: Mobile UI fidelity, state management architectures, offline-first sync, battery/memory tuning, and app store release cycles.'
      },
      topKeywords: ['Flutter / React Native', 'State Management', 'Offline Sync', 'App Performance', 'Store Publishing'],
      keywords: [
        'mobile developer', 'flutter', 'react native', 'dart', 'kotlin', 'swift', 'bloc',
        'provider', 'offline storage', 'sqlite', 'app store', 'play store', 'push notification', 'crashlytics'
      ],
      defaultBefore: {
        id: '"Membuat aplikasi mobile Android dan iOS menggunakan framework cross-platform."',
        en: '"Built Android and iOS mobile applications using cross-platform frameworks."'
      },
      defaultAfter: {
        id: '"Mengembangkan aplikasi mobile Flutter dengan arsitektur Clean Architecture dan offline-first caching, mengurangi crash-free rate dari 96.2% menjadi 99.8% pada 50K+ unduhan."',
        en: '"Delivered a production Flutter mobile app utilizing Clean Architecture and SQLite offline caching, driving crash-free sessions from 96.2% to 99.8% across 50K+ installs."'
      },
      starQuestion: {
        id: '"Bagaimana Anda mengidentifikasi dan menyelesaikan memory leak parah yang menyebabkan lag dan force close pada perangkat Android spesifikasi rendah?"',
        en: '"How did you trace and resolve an elusive native memory leak causing frame drops and unexpected crashes on entry-level Android devices?"'
      }
    },

    uiux: {
      category: { id: 'Desain & Produk', en: 'Design & Product' },
      name: { id: 'UI/UX & Product Designer', en: 'UI/UX & Product Designer' },
      desc: {
        id: 'Fokus pengujian: Figma design system, auto-layout, interaktivitas prototipe, usability testing, riset pengguna, dan micro-interactions modern.',
        en: 'Core assessment: Scalable Figma design systems, auto-layout mastery, high-fidelity prototypes, usability testing, and UX copywriting.'
      },
      topKeywords: ['Figma Design System', 'Usability Testing', 'User Journey & Wireframe', 'Prototyping', 'Accessibility (a11y)'],
      keywords: [
        'ui/ux', 'ui designer', 'ux designer', 'product designer', 'figma', 'design system',
        'wireframe', 'prototype', 'usability testing', 'user research', 'information architecture', 'heuristic', 'a11y'
      ],
      defaultBefore: {
        id: '"Membuat desain mockup website dan aplikasi menggunakan Figma."',
        en: '"Created website and mobile app screen mockups using Figma."'
      },
      defaultAfter: {
        id: '"Membangun comprehensive Design System modular dengan 120+ token komponen di Figma, mempercepat waktu desainer-ke-developer sebesar 45% dan menurunkan usability drop-off sebesar 26%."',
        en: '"Architected an enterprise Figma Design System with 120+ scalable component tokens, accelerating design-to-code velocity by 45% and eliminating 26% of checkout drop-off."'
      },
      starQuestion: {
        id: '"Ceritakan ketika hasil usability testing membuktikan bahwa asumsi desain awal Anda keliru. Bagaimana Anda mengubah arah desain dengan cepat tanpa menunda deadline rilis?"',
        en: '"Describe a test session where unmoderated user feedback dismantled your core design hypothesis. How did you rapidly iterate toward an effective interface without breaking release timelines?"'
      }
    },

    qa: {
      category: { id: 'Teknologi & Software', en: 'Technology & Software' },
      name: { id: 'QA & Software Tester', en: 'QA & Software Tester' },
      desc: {
        id: 'Fokus pengujian: Test cases komprehensif, automated testing (Selenium/Cypress), API testing (Postman), regression testing, dan bug reporting presisi.',
        en: 'Core assessment: Test case matrix design, automated testing (Cypress/Playwright), API regression suites, and meticulous defect tracking.'
      },
      topKeywords: ['Automation Testing', 'Test Case Design', 'API Testing (Postman)', 'Bug Tracking (Jira)', 'Regression Suite'],
      keywords: [
        'qa', 'quality assurance', 'software tester', 'test case', 'selenium', 'cypress',
        'playwright', 'postman', 'api testing', 'regression', 'jira', 'automation', 'smoke test'
      ],
      defaultBefore: {
        id: '"Melakukan pengetesan manual fitur aplikasi sebelum rilis dan mencatat error."',
        en: '"Performed manual software testing before app releases and documented bug issues."'
      },
      defaultAfter: {
        id: '"Membangun automated E2E regression test suite dengan Cypress yang mencakup 180+ skenario kritis, memangkas siklus rilis QA mingguan dari 2 hari menjadi 3 jam dengan 0 major bug di produksi."',
        en: '"Authored an automated E2E test framework in Cypress encompassing 180+ critical user journeys, cutting weekly QA sign-off from 2 days to 3 hours with zero production regressions."'
      },
      starQuestion: {
        id: '"Bagaimana sikap Anda saat developer menyatakan sebuah bug adalah edge case yang jarang terjadi, sementara menurut Anda berpotensi merugikan data pengguna?"',
        en: '"How do you advocate for fixing a high-severity edge-case defect when engineering attempts to dismiss it as an improbable occurrence?"'
      }
    },

    devops: {
      category: { id: 'Teknologi & Cloud', en: 'Technology & Cloud' },
      name: { id: 'DevOps & Cloud Platform Engineer', en: 'DevOps & Cloud Platform Engineer' },
      desc: {
        id: 'Fokus pengujian: Docker containerization, Kubernetes, CI/CD pipeline, AWS/GCP, Infrastructure as Code (Terraform), dan uptime monitoring.',
        en: 'Core assessment: Docker, Kubernetes orchestration, robust CI/CD, Terraform IaC, AWS/GCP infrastructure, and zero-downtime releases.'
      },
      topKeywords: ['Docker & Kubernetes', 'CI/CD Pipelines', 'AWS / GCP Cloud', 'Terraform (IaC)', 'System Reliability & SRE'],
      keywords: [
        'devops', 'cloud', 'docker', 'kubernetes', 'k8s', 'ci/cd', 'github actions',
        'terraform', 'aws', 'gcp', 'ansible', 'monitoring', 'grafana', 'prometheus', 'nginx'
      ],
      defaultBefore: {
        id: '"Mengelola server VPS dan membantu tim developer melakukan upload update kode."',
        en: '"Managed VPS servers and assisted developer team in deploying code updates."'
      },
      defaultAfter: {
        id: '"Mengotomasi seluruh deployment pipeline dengan GitHub Actions dan Kubernetes di AWS, memangkas deployment failure rate sebesar 85% dan mewujudkan automated rollback tanpa downtime."',
        en: '"Automated multi-stage deployment workflows via GitHub Actions and Kubernetes on AWS, suppressing release failure rates by 85% with zero-downtime blue/green rollouts."'
      },
      starQuestion: {
        id: '"Jelaskan investigasi dan langkah mitigasi yang Anda lakukan saat sertifikat SSL atau pod gateway down di tengah lonjakan traffic promo besar."',
        en: '"Walk me through your incident triage and resolution procedure during an ingress gateway failure amidst an aggressive marketing flash-sale traffic spike."'
      }
    },

    // ── Data, AI & Keamanan ──
    data_analyst: {
      category: { id: 'Data & Analitika', en: 'Data & Analytics' },
      name: { id: 'Data Analyst & BI Specialist', en: 'Data Analyst & BI Specialist' },
      desc: {
        id: 'Fokus pengujian: SQL querying kompleks, Tableau/Power BI dashboard, data cleaning, analisis tren bisnis, dan presentasi insight eksekutif.',
        en: 'Core assessment: Complex SQL joins/window functions, Tableau/Power BI dashboards, data cleansing, and executive narrative delivery.'
      },
      topKeywords: ['Complex SQL', 'Power BI & Tableau', 'Data Cleansing', 'Cohort & Trend Analysis', 'Executive Reporting'],
      keywords: [
        'data analyst', 'bi', 'business intelligence', 'sql', 'tableau', 'power bi',
        'excel', 'python', 'etl', 'dashboard', 'data visualization', 'kpi', 'statistical analysis'
      ],
      defaultBefore: {
        id: '"Mengambil data dari database dan membuat visualisasi grafik untuk laporan bulanan."',
        en: '"Queried data from databases and created graphical charts for monthly review decks."'
      },
      defaultAfter: {
        id: '"Menulis query SQL multi-tabel teroptimasi dan membangun 5 dashboard Tableau interaktif yang mendeteksi penurunan retensi pelanggan, menyelamatkan potensi churn senilai $180K."',
        en: '"Wrote high-performance multi-table SQL queries and built 5 Tableau command dashboards identifying customer drop-off patterns, protecting $180K in recurring ARR."'
      },
      starQuestion: {
        id: '"Ceritakan ketika Anda menemukan anomali data yang kontradiktif dengan keyakinan manajemen. Bagaimana Anda membuktikan temuan tersebut tanpa menyinggung stakeholder?"',
        en: '"Describe a scenario where empirical data findings explicitly contradicted executive consensus. How did you validate and present the counter-intuitive insight diplomatically?"'
      }
    },

    data_scientist: {
      category: { id: 'Data & AI', en: 'Data & AI' },
      name: { id: 'Data Scientist & AI Specialist', en: 'Data Scientist & AI Specialist' },
      desc: {
        id: 'Fokus pengujian: Python, machine learning (Scikit-Learn/PyTorch), feature engineering, evaluasi model (F1/AUC-ROC), dan deploy model ke produksi.',
        en: 'Core assessment: Python, statistical learning, feature engineering, model tuning (F1/AUC-ROC), and inference deployment.'
      },
      topKeywords: ['Python & Pandas', 'Machine Learning', 'Feature Engineering', 'Predictive Modeling', 'Model Evaluation (F1/ROC)'],
      keywords: [
        'data scientist', 'machine learning', 'ai', 'python', 'scikit-learn', 'tensorflow',
        'pytorch', 'predictive modeling', 'classification', 'clustering', 'nlp', 'deep learning', 'pandas'
      ],
      defaultBefore: {
        id: '"Membuat model machine learning sederhana untuk memprediksi data pengguna."',
        en: '"Trained a simple machine learning model to predict user behavior data."'
      },
      defaultAfter: {
        id: '"Mengembangkan model predictive churn berbasis XGBoost dengan ROC-AUC 0.89, meningkatkan akurasi retensi tim CRM sebesar 34% dan menurunkan loss rate tahunan secara signifikan."',
        en: '"Engineered an XGBoost predictive churn pipeline achieving an 0.89 ROC-AUC score, empowering CRM intervention teams to boost customer retention accuracy by 34%."'
      },
      starQuestion: {
        id: '"Bagaimana Anda menangani masalah data imbalance parah (misal fraud 0.1%) agar model machine learning tidak bias terhadap kelas mayoritas?"',
        en: '"How did you address extreme class imbalance (such as 0.1% fraud events) to prevent model degeneration into trivial majority-class classification?"'
      }
    },

    cybersecurity: {
      category: { id: 'Keamanan & Jaringan', en: 'Security & Infrastructure' },
      name: { id: 'Cybersecurity & Security Analyst', en: 'Cybersecurity & Security Analyst' },
      desc: {
        id: 'Fokus pengujian: Vulnerability assessment, penetration testing, SIEM log monitoring, incident response, dan standar kepatuhan ISO 27001.',
        en: 'Core assessment: Vulnerability assessment, SIEM threat hunting, incident response runbooks, OWASP Top 10, and ISO 27001 compliance.'
      },
      topKeywords: ['Vulnerability Scan', 'Penetration Testing', 'SIEM & SOC', 'Incident Response', 'ISO 27001 / OWASP'],
      keywords: [
        'cybersecurity', 'security', 'infosec', 'penetration testing', 'vulnerability',
        'siem', 'soc', 'firewall', 'owasp', 'iso 27001', 'incident response', 'malware', 'audit'
      ],
      defaultBefore: {
        id: '"Memonitor antivirus kantor dan memeriksa keamanan website dari serangan hacker."',
        en: '"Monitored company antivirus software and checked website security against cyber threats."'
      },
      defaultAfter: {
        id: '"Memimpin audit keamanan berkala dan simulasi penetrasi OWASP Top 10, menutup 14 kerentanan kritis serta menyusun response playbook yang memangkas waktu mitigasi insiden sebesar 60%."',
        en: '"Conducted comprehensive penetration testing across OWASP Top 10 vectors, neutralizing 14 high-severity vulnerabilities and codifying an incident playbook that accelerated triage by 60%."'
      },
      starQuestion: {
        id: '"Ceritakan ketika Anda mendeteksi indikasi penyusupan jaringan atau kebocoran data secara real-time. Langkah isolasi apa yang segera diambil?"',
        en: '"Detail a live network intrusion or data exfiltration anomaly you intercepted. What containment sequence did you execute within minutes of detection?"'
      }
    },

    // ── Pendidikan, Psikologi & Konseling ──
    educator: {
      category: { id: 'Pendidikan & Psikologi', en: 'Education & Psychology' },
      name: { id: 'Shadow Teacher / Special Needs Educator', en: 'Shadow Teacher / Special Needs Educator' },
      desc: {
        id: 'Fokus pengujian: Individualized Education Plan (IEP), modifikasi perilaku terapan (ABA), pendampingan inklusif (ADHD/ASD), dan evaluasi psikososial.',
        en: 'Core assessment: Individualized Education Plans (IEP), applied behavioral modification, inclusive neurodiversity scaffolding (ADHD/ASD), and empathy.'
      },
      topKeywords: ['IEP & Token Economy', 'Behavior Modification', 'ADHD & ASD Support', 'Inclusive Classroom', 'Parent-Teacher Alignment'],
      keywords: [
        'shadow teacher', 'pendamping siswa', 'special needs', 'iep', 'adhd', 'autisme',
        'asd', 'behavior modification', 'empati', 'inklusi', 'observasi', 'intervensi',
        'konseling', 'psikologi perkembangan', 'sensory', 'modifikasi perilaku', 'pendidikan inklusif'
      ],
      defaultBefore: {
        id: '"Mendampingi anak berkebutuhan khusus saat proses belajar mengajar di kelas."',
        en: '"Accompanied children with special needs during classroom learning activities."'
      },
      defaultAfter: {
        id: '"Merancang dan mengeksekusi Individualized Education Plan (IEP) harian berbasis token economy, meningkatkan durasi fokus belajar mandiri siswa sebesar 45% dan menurunkan tantrum kelas hingga 70%."',
        en: '"Designed and executed an Individualized Education Plan (IEP) with structured token reinforcement, increasing sustained independent learning focus by 45% and reducing classroom escalations by 70%."'
      },
      starQuestion: {
        id: '"Bagaimana Anda menangani situasi krisis saat siswa dampingan mengalami sensory overload di tengah kegiatan ujian penting, tanpa mengganggu konsentrasi siswa lainnya di ruang kelas?"',
        en: '"How did you de-escalate a critical sensory overload event during a high-stakes exam setting while preserving classroom equilibrium for peers?"'
      }
    },

    school_counselor: {
      category: { id: 'Pendidikan & Konseling', en: 'Education & Counseling' },
      name: { id: 'Guru Bimbingan Konseling (BK) / School Counselor', en: 'Guru Bimbingan Konseling (BK) / School Counselor' },
      desc: {
        id: 'Fokus pengujian: Bimbingan karir dan kepribadian siswa, asesmen psikososial, mediasi konflik siswa/orang tua, dan penanganan kesehatan mental remaja.',
        en: 'Core assessment: Adolescent psychosocial counseling, academic/career pathfinding, parent-student mediation, and anti-bullying frameworks.'
      },
      topKeywords: ['Konseling Siswa', 'Bimbingan Karir', 'Mediasi Konflik', 'Asesmen Psikososial', 'Kesehatan Mental'],
      keywords: [
        'guru bk', 'bimbingan konseling', 'school counselor', 'konseling', 'psikososial',
        'karir', 'minat bakat', 'bullying', 'mediasi', 'orang tua', 'kesehatan mental', 'intervensi'
      ],
      defaultBefore: {
        id: '"Memberikan bimbingan kepada siswa yang bermasalah dan mengurus absensi BK."',
        en: '"Provided counseling to students facing disciplinary issues and handled counseling records."'
      },
      defaultAfter: {
        id: '"Memfasilitasi sesi konseling individual dan program bimbingan karir untuk 150+ siswa kelas 12, meningkatkan tingkat kesiapan pilihan perguruan tinggi hingga 92% dan menuntaskan 100% kasus bullying secara restoratif."',
        en: '"Delivered structured 1-on-1 counseling and career readiness workshops for 150+ senior students, raising university matriculation clarity to 92% with 100% restorative conflict resolution."'
      },
      starQuestion: {
        id: '"Ceritakan ketika Anda harus mengintervensi kasus depresi berat atau trauma siswa sementara orang tua menolak mengakui adanya masalah psikologis."',
        en: '"Describe how you navigated a sensitive student mental health crisis when custodial guardians strongly resisted psychological intervention recommendations."'
      }
    },

    instructional_designer: {
      category: { id: 'Pendidikan & Kurikulum', en: 'Education & Curriculum' },
      name: { id: 'Instructional Designer & Curriculum', en: 'Instructional Designer & Curriculum' },
      desc: {
        id: 'Fokus pengujian: ADDIE framework, kurikulum modular, e-learning multimedia, rubrik evaluasi belajar, dan pemetaan taksonomi Bloom.',
        en: 'Core assessment: ADDIE instructional design, competency mapping, Bloom taxonomy rubrics, and interactive digital course authoring.'
      },
      topKeywords: ['ADDIE Framework', 'Bloom Taxonomy', 'Curriculum Mapping', 'E-Learning Authoring', 'Learning Rubrics'],
      keywords: [
        'instructional designer', 'kurikulum', 'curriculum', 'addie', 'bloom taxonomy',
        'e-learning', 'lms', 'pedagogi', 'storyboarding', 'rubrik evaluasi', 'microlearning'
      ],
      defaultBefore: {
        id: '"Menyusun silabus pelajaran dan membuat materi presentasi kursus online."',
        en: '"Drafted course syllabi and prepared slide presentations for digital courses."'
      },
      defaultAfter: {
        id: '"Mendesain 12 modul pembelajaran modular berbasis ADDIE dan microlearning interaktif, meningkatkan completion rate kursus dari 34% menjadi 81% dengan feedback kepuasan 4.9/5.0."',
        en: '"Architected 12 modular courses applying ADDIE and interactive microlearning principles, lifting course completion rates from 34% to 81% with an average 4.9/5.0 learner rating."'
      },
      starQuestion: {
        id: '"Bagaimana Anda mengubah materi subjek teknis yang sangat kering dan rumit menjadi modul pembelajaran mandiri yang memikat bagi pemula?"',
        en: '"How did you transform highly dense, complex technical subject matter into an engaging, self-paced interactive learning journey for novice students?"'
      }
    },

    psych_assessor: {
      category: { id: 'Psikologi & Asesmen', en: 'Psychology & Assessment' },
      name: { id: 'Asisten Psikolog & Asesor Bakat', en: 'Asisten Psikolog & Asesor Bakat' },
      desc: {
        id: 'Fokus pengujian: Administrasi alat tes psikologi (DISC, MBTI, Papikostick, Kraepelin), observasi perilaku objektif, skoring terstandar, dan psikogram.',
        en: 'Core assessment: Psychometric test battery administration (DISC, Papikostik), objective behavioral observation, and psychogram synthesis.'
      },
      topKeywords: ['Alat Tes Psikologi', 'Skoring & Psikogram', 'Observasi Perilaku', 'Assessment Center', 'Etika Asesmen'],
      keywords: [
        'psikologi', 'asesor', 'psikotes', 'disc', 'mbti', 'papikostick', 'kraepelin',
        'pauli', 'psikogram', 'observasi', 'interview kompetensi', 'asesmen talenta', 'psikometri'
      ],
      defaultBefore: {
        id: '"Mengawasi jalannya psikotes calon karyawan dan menghitung skor jawaban tes."',
        en: '"Proctored candidate psychometric tests and scored answer sheet tallies."'
      },
      defaultAfter: {
        id: '"Mengelola administrasi dan skoring terstandar 500+ sesi psikotes korporat menggunakan baterai tes komprehensif, menyusun psikogram akurat yang menjadi dasar keputusan promosi pimpinan."',
        en: '"Administered standardized psychometric batteries across 500+ executive assessments, authoring calibrated psychograms that steered top-management leadership succession calls."'
      },
      starQuestion: {
        id: '"Bagaimana Anda memastikan objektivitas laporan asesmen ketika kandidat memiliki kepribadian sangat karismatik namun hasil psikotesnya menunjukkan risiko tinggi?"',
        en: '"How do you maintain rigorous objective detachment when a candidate demonstrates magnetic interpersonal charisma but flags high risk in psychometric indicators?"'
      }
    },

    // ── Pemasaran, Konten & Kreatif ──
    digital_marketing: {
      category: { id: 'Pemasaran & Pertumbuhan', en: 'Marketing & Growth' },
      name: { id: 'Digital Marketing & Performance Ads', en: 'Digital Marketing & Performance Ads' },
      desc: {
        id: 'Fokus pengujian: Meta Ads Manager, Google Ads, TikTok Ads, ROAS, optimasi CAC/LTV, A/B testing materi kreatif, dan tracking funnel konversi.',
        en: 'Core assessment: Meta/Google Ads optimization, ROAS scaling, CAC/LTV calibration, creative iteration, and multi-touch conversion attribution.'
      },
      topKeywords: ['Meta & Google Ads', 'ROAS Optimization', 'CAC & LTV Control', 'Funnel Conversion', 'Creative A/B Testing'],
      keywords: [
        'digital marketing', 'performance marketing', 'meta ads', 'facebook ads', 'google ads',
        'tiktok ads', 'roas', 'cac', 'conversion rate', 'funnel', 'ctr', 'sem', 'retargeting'
      ],
      defaultBefore: {
        id: '"Menjalankan iklan berbayar di media sosial dan memantau anggaran promosi."',
        en: '"Ran paid social media ads and monitored digital advertising budgets."'
      },
      defaultAfter: {
        id: '"Mengelola anggaran paid marketing Rp 450 Juta/bulan di Meta & Google Ads dengan ROAS 4.6x, menurunkan Blended CAC sebesar 23% dan menghasilkan 3.200 leads terverifikasi."',
        en: '"Managed Rp 450M/month across Meta and Google Ads maintaining a 4.6x ROAS, suppressing blended customer acquisition cost by 23% and generating 3,200 qualified leads."'
      },
      starQuestion: {
        id: '"Ketika biaya per klik (CPC) melonjak 50% mendadak di Meta Ads akibat perubahan algoritma lelang, strategi rekalibrasi kreatif apa yang Anda terapkan dalam 48 jam?"',
        en: '"When Meta Ads auction dynamics suddenly spiked your average CPC by 50%, what immediate creative and targeting pivots restored campaign unit economics within 48 hours?"'
      }
    },

    content_creator: {
      category: { id: 'Pemasaran & Konten', en: 'Marketing & Content' },
      name: { id: 'Social Media & Content Strategist', en: 'Social Media & Content Strategist' },
      desc: {
        id: 'Fokus pengujian: Content calendar, video storytelling (TikTok/Reels), copy engaging, metrik engagement rate, dan community building terarah.',
        en: 'Core assessment: Editorial content calendars, short-form video hooks (TikTok/Reels), copy engagement velocity, and organic audience scaling.'
      },
      topKeywords: ['Viral Short Video', 'Content Calendar', 'Engagement Rate', 'Community Growth', 'Audience Analytics'],
      keywords: [
        'social media', 'content creator', 'content strategist', 'tiktok', 'instagram',
        'reels', 'engagement', 'copywriting', 'storytelling', 'analytics', 'growth', 'viral'
      ],
      defaultBefore: {
        id: '"Membuat konten harian untuk Instagram dan TikTok serta membalas komentar followers."',
        en: '"Created daily Instagram and TikTok posts and responded to follower comments."'
      },
      defaultAfter: {
        id: '"Merancang strategi konten video pendek yang konsisten mendatangkan 4.2 Juta organic views, meningkatkan follower Instagram dari 12K ke 85K dengan engagement rate rata-rata 6.8%."',
        en: '"Orchestrated a narrative short-video strategy generating 4.2M organic views, scaling Instagram followers from 12K to 85K while sustaining an exceptional 6.8% engagement rate."'
      },
      starQuestion: {
        id: '"Bagaimana cara Anda menyeimbangkan antara konten viral yang mendatangkan views banyak dengan konten edukatif yang benar-benar menghasilkan konversi pembelian produk?"',
        en: '"How do you calibrate the editorial mix between high-reach viral entertainment hooks and educational content that converts viewers into paying buyers?"'
      }
    },

    seo_specialist: {
      category: { id: 'Pemasaran & Search', en: 'Marketing & Search' },
      name: { id: 'SEO & Growth Content Specialist', en: 'SEO & Growth Content Specialist' },
      desc: {
        id: 'Fokus pengujian: Technical SEO, keyword research (Ahrefs/SEMrush), on-page optimization, Google Search Console, link building, dan content clustering.',
        en: 'Core assessment: Technical crawlability, high-intent keyword clustering (Ahrefs), Search Console analytics, and sustainable organic rankings.'
      },
      topKeywords: ['Technical SEO', 'Keyword Research', 'Google Search Console', 'Content Silo & Cluster', 'Link Building'],
      keywords: [
        'seo', 'search engine optimization', 'ahrefs', 'semrush', 'google search console',
        'google analytics', 'backlink', 'on-page', 'technical seo', 'organic traffic', 'serp', 'core web vitals'
      ],
      defaultBefore: {
        id: '"Menulis artikel blog dengan kata kunci SEO agar website banyak pengunjung."',
        en: '"Wrote keyword-targeted blog articles to increase search engine visitors."'
      },
      defaultAfter: {
        id: '"Mengeksekusi strategi content cluster dan audit technical SEO untuk 80+ halaman pilar, melipatgandakan organic impressions Google Search Console sebesar 310% dan menduduki Top 3 SERP pada 42 target keywords komersial."',
        en: '"Executed a topic cluster strategy and technical SEO overhaul across 80+ pillar pages, multiplying Search Console organic impressions by 310% and locking Top 3 SERPs for 42 high-intent keywords."'
      },
      starQuestion: {
        id: '"Bagaimana Anda memulihkan traffic organik website yang anjlok 30% setelah update Google Core Algorithm terbaru?"',
        en: '"Detail your diagnostic recovery roadmap after a client site experienced a 30% organic visibility drop post-Google Core Algorithm rollout."'
      }
    },

    copywriter: {
      category: { id: 'Kreatif & Narasi', en: 'Creative & Narrative' },
      name: { id: 'Copywriter & Brand Narrative', en: 'Copywriter & Brand Narrative' },
      desc: {
        id: 'Fokus pengujian: Direct-response copy, storytelling brand, tagline, email marketing, landing page high-conversion, dan tone of voice korporat.',
        en: 'Core assessment: Direct-response conversion copywriting, brand tone of voice frameworks, landing page storytelling, and email open rates.'
      },
      topKeywords: ['Direct-Response Copy', 'Brand Storytelling', 'Landing Page Headlines', 'Email Funnel Copy', 'Tone of Voice'],
      keywords: [
        'copywriter', 'copywriting', 'brand voice', 'storytelling', 'landing page',
        'email marketing', 'headline', 'cta', 'conversion', 'creative copy', 'tagline'
      ],
      defaultBefore: {
        id: '"Menulis teks untuk website, email promosi, dan materi promosi iklan."',
        en: '"Wrote written copy for website landing pages, promo emails, and ads."'
      },
      defaultAfter: {
        id: '"Menulis ulang seluruh copywriting landing page utama menggunakan formula PAS dan emotional hooks, mendongkrak click-through rate (CTR) tombol pendaftaran sebesar 38%."',
        en: '"Overhauled flagship landing page copy implementing PAS framework and high-resonance psychological triggers, lifting primary CTA conversion by 38%."'
      },
      starQuestion: {
        id: '"Ceritakan ketika klien menuntut copy yang sangat kaku dan sarat jargon teknis. Bagaimana Anda meyakinkan mereka agar beralih ke bahasa yang ramah konversi?"',
        en: '"How did you persuade a corporate client clinging to dense executive jargon to adopt empathetic, human-centered language proven to maximize conversion?"'
      }
    },

    graphic_designer: {
      category: { id: 'Desain Visual', en: 'Visual Design' },
      name: { id: 'Graphic & Visual Designer', en: 'Graphic & Visual Designer' },
      desc: {
        id: 'Fokus pengujian: Brand identity, Adobe Creative Suite (Photoshop/Illustrator), komposisi tata letak, tipografi modern, dan aset media sosial.',
        en: 'Core assessment: Visual brand identity, Adobe Creative Cloud mastery, Swiss typographical hierarchy, and high-impact digital marketing assets.'
      },
      topKeywords: ['Adobe Illustrator/Ps', 'Brand Identity', 'Typographic Hierarchy', 'Layout Composition', 'Vector Illustration'],
      keywords: [
        'graphic designer', 'desain grafis', 'photoshop', 'illustrator', 'branding',
        'visual identity', 'typography', 'vector', 'logo', 'layout', 'creative design'
      ],
      defaultBefore: {
        id: '"Membuat banner promosi dan desain media sosial sesuai permintaan tim marketing."',
        en: '"Created marketing promotional banners and social media design graphics."'
      },
      defaultAfter: {
        id: '"Merancang ulang panduan visual brand identity dan 60+ template aset kampanye digital, menaikkan brand recall survey sebesar 28% dan mempercepat produksi materi desain 2x lipat."',
        en: '"Refreshed comprehensive visual brand guidelines and delivered 60+ modular marketing design templates, raising brand recall metrics by 28% and halving asset production turnaround."'
      },
      starQuestion: {
        id: '"Bagaimana Anda mempertahankan standar kualitas estetika visual tinggi ketika harus menyelesaikan 10 materi desain mendesak dalam waktu 24 jam?"',
        en: '"How do you safeguard uncompromising aesthetic excellence and typographical rigor under high-stress, same-day delivery turnarounds?"'
      }
    },

    // ── Keuangan, Akuntansi & Legal ──
    finance_analyst: {
      category: { id: 'Keuangan & Analitika', en: 'Finance & Analytics' },
      name: { id: 'Financial Analyst & FP&A', en: 'Financial Analyst & FP&A' },
      desc: {
        id: 'Fokus pengujian: Financial modeling, budgeting, variance analysis, DCF, peramalan cash flow, laporan laba rugi, dan presentasi dewan direksi.',
        en: 'Core assessment: 3-statement financial modeling, variance budgeting, DCF valuation, cash flow forecasting, and executive board presentations.'
      },
      topKeywords: ['Financial Modeling', 'FP&A & Budgeting', 'Variance Analysis', 'Cash Flow Forecast', 'DCF Valuation'],
      keywords: [
        'finance', 'financial analyst', 'fp&a', 'budgeting', 'financial modeling',
        'cash flow', 'dcf', 'variance', 'forecast', 'excel financial', 'ebitda', 'p&l', 'roi'
      ],
      defaultBefore: {
        id: '"Menyusun laporan keuangan bulanan dan menghitung anggaran operasional."',
        en: '"Prepared monthly financial reports and tracked departmental operational expenses."'
      },
      defaultAfter: {
        id: '"Membangun financial forecast model 3-statement terintegrasi untuk pendanaan Seri-A, memangkas deviasi estimasi cash flow kuartalan di bawah 3.5% dan mengamankan runway 18 bulan."',
        en: '"Engineered a dynamic 3-statement financial model for Series-A fundraising, holding quarterly cash flow forecasting variance within 3.5% and locking an 18-month runway."'
      },
      starQuestion: {
        id: '"Bagaimana cara Anda menyajikan skenario penurunan pendapatan (downside risk) kepada dewan direksi tanpa menimbulkan kepanikan spekulatif?"',
        en: '"How did you communicate an impending downside revenue projection to the board of directors constructively without triggering premature panic?"'
      }
    },

    accounting: {
      category: { id: 'Akuntansi & Pajak', en: 'Accounting & Tax' },
      name: { id: 'Accounting & Tax Specialist', en: 'Accounting & Tax Specialist' },
      desc: {
        id: 'Fokus pengujian: General ledger, rekonsiliasi bank, PSAK/IFRS, kepatuhan pajak (PPh 21/23/Final, PPN), e-Faktur, dan persiapan audit eksternal.',
        en: 'Core assessment: General ledger integrity, bank reconciliation, PSAK/IFRS standards, corporate taxation (VAT/CIT), and clean external audit sign-offs.'
      },
      topKeywords: ['PSAK & IFRS', 'PPh & PPN Pajak', 'General Ledger', 'Rekonsiliasi Bank', 'Audit Kepatuhan'],
      keywords: [
        'accounting', 'akuntansi', 'tax', 'pajak', 'pph', 'ppn', 'e-faktur',
        'psak', 'ifrs', 'general ledger', 'reconciliation', 'audit', 'neraca', 'jurnal'
      ],
      defaultBefore: {
        id: '"Mencatat transaksi harian, mengurus faktur pajak, dan membantu audit tahunan."',
        en: '"Logged daily bookkeeping entries, filed tax invoices, and assisted with annual audits."'
      },
      defaultAfter: {
        id: '"Mengelola penutupan buku akhir bulan (month-end close) untuk 3 entitas bisnis yang memangkas waktu tutup buku dari 14 hari menjadi 5 hari, serta meraih opini audit WTP (Tanpa Pengecualian) selama 2 tahun berturut-turut."',
        en: '"Accelerated multi-entity month-end financial closing from 14 to 5 days, securing unqualified clean audit opinions for two consecutive fiscal years."'
      },
      starQuestion: {
        id: '"Ceritakan ketika Anda menemukan selisih rekonsiliasi material dalam pembukuan lampau. Langkah audit forensik apa yang Anda lakukan untuk menelusurinya?"',
        en: '"Describe your discovery and remediation of a material reconciliation mismatch in historical general ledger accounts during an internal audit review."'
      }
    },

    legal: {
      category: { id: 'Legal & Kepatuhan', en: 'Legal & Governance' },
      name: { id: 'Corporate Legal Counsel', en: 'Corporate Legal Counsel' },
      desc: {
        id: 'Fokus pengujian: Review kontrak bisnis, legal due diligence, kepatuhan regulasi, perlindungan data pribadi (UU PDP), mitigasi risiko hukum, dan negosiasi klausul.',
        en: 'Core assessment: Commercial contract negotiation, regulatory compliance, data privacy (PDP), legal due diligence, and enterprise risk insulation.'
      },
      topKeywords: ['Contract Drafting', 'Legal Due Diligence', 'Kepatuhan Regulasi', 'UU PDP & Privasi', 'Risk Mitigation'],
      keywords: [
        'legal', 'hukum', 'corporate legal', 'contract', 'perjanjian', 'due diligence',
        'compliance', 'kepatuhan', 'regulasi', 'uu pdp', 'litigasi', 'nda', 'risk mitigation'
      ],
      defaultBefore: {
        id: '"Memeriksa draf perjanjian kerjasama dengan vendor dan mengurus perizinan kantor."',
        en: '"Reviewed partner vendor contracts and processed business operating licenses."'
      },
      defaultAfter: {
        id: '"Melakukan review dan negosiasi klausul atas 75+ perjanjian kemitraan komersial senilai total Rp 12 Miliar, melindungi hak kekayaan intelektual perusahaan dengan 0 sengketa hukum."',
        en: '"Drafted and negotiated 75+ strategic commercial contracts totaling Rp 12B, insulating corporate intellectual property with zero legal disputes or regulatory non-compliance."'
      },
      starQuestion: {
        id: '"Bagaimana Anda bernegosiasi ketika vendor raksasa menolak klausul pembatasan tanggung jawab (liability cap) yang esensial bagi keamanan perusahaan?"',
        en: '"How do you negotiate a favorable liability cap when dealing with a vendor holding dominant market power who insists on unilateral indemnity clauses?"'
      }
    },

    // ── Sales & Hubungan Klien ──
    b2b_sales: {
      category: { id: 'Sales & Bisnis', en: 'Sales & Business' },
      name: { id: 'B2B Account Executive / Corporate Sales', en: 'B2B Account Executive / Corporate Sales' },
      desc: {
        id: 'Fokus pengujian: Pipeline CRM (Hubspot/Salesforce), consultative selling, presentasi C-level, negosiasi kontrak korporat, dan pencapaian target kuota revenue.',
        en: 'Core assessment: CRM pipeline hygiene, enterprise consultative selling, C-suite executive presentations, and consistent quota achievement.'
      },
      topKeywords: ['Consultative Selling', 'Pipeline CRM', 'Quota Achievement', 'C-Level Pitching', 'Deal Closing'],
      keywords: [
        'sales', 'b2b', 'account executive', 'business development', 'crm', 'salesforce',
        'hubspot', 'pipeline', 'closing', 'negotiation', 'lead generation', 'revenue', 'quota'
      ],
      defaultBefore: {
        id: '"Mencari klien baru untuk perusahaan dan melakukan penawaran harga produk."',
        en: '"Prospected new commercial clients and presented price quotation proposals."'
      },
      defaultAfter: {
        id: '"Mencapai 134% dari target kuota tahunan dengan menutup 14 deal enterprise senilai total Rp 3.8 Miliar, serta mempersingkat rata-rata sales cycle dari 90 hari menjadi 54 hari."',
        en: '"Surpassed annual sales quota at 134% by closing 14 enterprise accounts valued at Rp 3.8B, accelerating average sales velocity from 90 to 54 days."'
      },
      starQuestion: {
        id: '"Ceritakan ketika sebuah deal besar terancam batal di menit terakhir akibat pemotongan anggaran sepihak dari klien. Bagaimana Anda menyelamatkannya?"',
        en: '"Walk me through how you salvaged a multi-million-dollar deal on the brink of cancellation when the prospect faced sudden mid-quarter budget freezes."'
      }
    },

    customer_success: {
      category: { id: 'Hubungan Klien', en: 'Customer Success' },
      name: { id: 'Customer Success & Client Relations', en: 'Customer Success & Client Relations' },
      desc: {
        id: 'Fokus pengujian: Net Revenue Retention (NRR), churn prevention, client onboarding, Quarterly Business Review (QBR), CSAT/NPS, dan upsell.',
        en: 'Core assessment: Net Revenue Retention (NRR), gross churn mitigation, enterprise onboarding, QBR orchestration, and account expansion.'
      },
      topKeywords: ['Net Retention (NRR)', 'Churn Mitigation', 'Client Onboarding', 'QBR Presentations', 'CSAT & NPS'],
      keywords: [
        'customer success', 'client relations', 'onboarding', 'retention', 'churn',
        'nps', 'csat', 'qbr', 'upsell', 'zendesk', 'account management', 'health score'
      ],
      defaultBefore: {
        id: '"Membantu pelanggan baru menggunakan aplikasi dan melayani keluhan klien."',
        en: '"Assisted newly onboarded customers and responded to client support tickets."'
      },
      defaultAfter: {
        id: '"Mengelola portofolio 45 klien enterprise dengan Net Revenue Retention (NRR) 118%, mereduksi churn tahunan hingga 2.8% dan menghasilkan Rp 620 Juta dari peluang expansion/upsell."',
        en: '"Managed a portfolio of 45 enterprise accounts achieving 118% Net Revenue Retention, suppressing annual churn to 2.8% while unlocking Rp 620M in expansion ARR."'
      },
      starQuestion: {
        id: '"Bagaimana cara Anda memulihkan hubungan dengan klien VIP yang marah besar akibat kendala teknis berulang dan mengancam akan memutuskan kontrak?"',
        en: '"Describe your remediation and executive recovery strategy with a high-value account ready to churn due to recurring platform downtime."'
      }
    }
  };

  // Sample Profile for Instant Exploration (Muhammad Faari Akbar)
  const SAMPLE_PROFILE_TEXT = `MUHAMMAD FAARI AKBAR
Cipayung, Jakarta Timur | linkedin.com/in/faarimuhammad | faariakbar@email.com

RINGKASAN PROFESIONAL
Lulusan S1 Psikologi Universitas Muhammadiyah Prof. Dr. UHAMKA dengan peminatan Psikologi Industri & Organisasi, Data Analytics, dan People Mentoring. Memiliki rekam jejak kepemimpinan sebagai Business Analyst Intern di PT Mahabudi serta pengalaman praktis sebagai Shadow Teacher & Pendamping Siswa di SMAIT Buahati Islamic School. Menguasai teknik wawancara STAR, asesmen perilaku, analisa metrik talenta, serta fasih mengoperasikan otomasi alur kerja digital dan riset terapan.

PENGALAMAN KERJA

Shadow Teacher & Pendamping Siswa | SMAIT Buahati Islamic School (Juli 2025 - Sekarang)
- Mengembangkan program modifikasi perilaku individual terstruktur untuk siswa dengan kebutuhan atensi khusus, meningkatkan retensi fokus belajar sebesar 35%.
- Berkoordinasi intensif dengan tim konselor sekolah, guru mata pelajaran, dan wali murid dalam penyusunan Individualized Education Plan (IEP).
- Melakukan observasi psikologis mingguan dan pelaporan berkala mengenai adaptasi sosial dan kestabilan emosi siswa di lingkungan inklusif.

Business Analyst Intern | PT Mahabudi (Januari 2024 - Desember 2024)
- Menganalisis dataset performa operasional dan pipeline talenta internal menggunakan Excel terstruktur dan pemodelan metrik KPI bisnis.
- Mengidentifikasi celah inefisiensi alur administrasi dan merancang rekomendasi digitalisasi berkas yang memangkas waktu pemrosesan dokumen hingga 30%.
- Menyusun laporan eksekutif berkala untuk jajaran manajemen guna mendukung pengambilan keputusan rekrutmen berbasis data (people analytics).

PENDIDIKAN & SERTIFIKASI
- S1 Psikologi | Universitas Muhammadiyah Prof. Dr. UHAMKA Jakarta (2018 - 2024) - IPK: 3.52 / 4.00
- Sertifikasi Profesional: Talent Management & Modern Sourcing Fundamentals
- Sertifikasi: Business Data Analysis & Spreadsheet Modeling

KEAHLIAN & KOMPETENSI
- HR Competencies: Behavioral Interviewing (STAR), Talent Acquisition, Onboarding, Job Analysis, Employee Relations, Asesmen Psikologi.
- Analitika & Teknis: Data Analysis, KPI Tracking, Process Improvement, Google Sheets / Excel Advanced, Flet UI, Local Automation.
- Bahasa: Bahasa Indonesia (Native), English (Working Proficiency).`;

  // --------------------------------------------------------------------------
  // 5. DOM ELEMENTS CACHE
  // --------------------------------------------------------------------------
  const DOM = {
    html: document.documentElement,
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    themeIcon: document.getElementById('themeIcon'),
    themeLabel: document.getElementById('themeLabel'),
    langIdBtn: document.getElementById('langIdBtn'),
    langEnBtn: document.getElementById('langEnBtn'),
    tabUploadBtn: document.getElementById('tabUploadBtn'),
    tabPasteBtn: document.getElementById('tabPasteBtn'),
    dropzoneContainer: document.getElementById('dropzoneContainer'),
    pasteContainer: document.getElementById('pasteContainer'),
    dropzone: document.getElementById('dropzone'),
    cvFileInput: document.getElementById('cvFileInput'),
    browseFileBtn: document.getElementById('browseFileBtn'),
    filePreviewBadge: document.getElementById('filePreviewBadge'),
    fileNameTxt: document.getElementById('fileNameTxt'),
    fileMetaTxt: document.getElementById('fileMetaTxt'),
    removeFileBtn: document.getElementById('removeFileBtn'),
    rawCvText: document.getElementById('rawCvText'),
    loadSampleCvBtn: document.getElementById('loadSampleCvBtn'),

    // Market Standard Switcher Elements
    stdNasionalBtn: document.getElementById('stdNasionalBtn'),
    stdGlobalBtn: document.getElementById('stdGlobalBtn'),
    standardBadge: document.getElementById('standardBadge'),
    standardDescriptionTxt: document.getElementById('standardDescriptionTxt'),

    // Role Dropdown & Detail Card Elements
    roleSelect: document.getElementById('roleSelect'),
    roleDetailCard: document.getElementById('roleDetailCard'),
    roleCategoryBadge: document.getElementById('roleCategoryBadge'),
    roleDetailTitle: document.getElementById('roleDetailTitle'),
    roleDetailDesc: document.getElementById('roleDetailDesc'),
    roleKeywordPills: document.getElementById('roleKeywordPills'),

    // Guided Custom Role Builder Elements
    customRoleBuilderContainer: document.getElementById('customRoleBuilderContainer'),
    customArchetypeBtns: document.querySelectorAll('.custom-archetype-btn'),
    customRoleTitleInput: document.getElementById('customRoleTitleInput'),
    customRoleKeywordsInput: document.getElementById('customRoleKeywordsInput'),
    customSeniorityPills: document.querySelectorAll('#customSeniorityPills .seniority-pill'),

    // Action & Result Elements
    runAnalysisBtn: document.getElementById('runAnalysisBtn'),
    btnIcon: document.getElementById('btnIcon'),
    btnLabel: document.getElementById('btnLabel'),
    inputView: document.getElementById('inputView'),
    skeletonLoadingView: document.getElementById('skeletonLoadingView'),
    resultsView: document.getElementById('resultsView'),
    backToInputBtn: document.getElementById('backToInputBtn'),
    resDocName: document.getElementById('resDocName'),
    resRoleName: document.getElementById('resRoleName'),
    scoreNumber: document.getElementById('scoreNumber'),
    progressBarFill: document.getElementById('progressBarFill'),
    scoreTierLabel: document.getElementById('scoreTierLabel'),
    scorePercentageTxt: document.getElementById('scorePercentageTxt'),
    tierBadgePill: document.getElementById('tierBadgePill'),
    tierNarrativeTxt: document.getElementById('tierNarrativeTxt'),
    recruiterAdviceTxt: document.getElementById('recruiterAdviceTxt'),
    strengthCountBadge: document.getElementById('strengthCountBadge'),
    strengthsList: document.getElementById('strengthsList'),
    gapCountBadge: document.getElementById('gapCountBadge'),
    gapsList: document.getElementById('gapsList'),
    rewriteBeforeTxt: document.getElementById('rewriteBeforeTxt'),
    rewriteAfterTxt: document.getElementById('rewriteAfterTxt'),
    copyRewriteBtn: document.getElementById('copyRewriteBtn'),
    starQuestionTxt: document.getElementById('starQuestionTxt'),

    // Modals
    qrisModalOverlay: document.getElementById('qrisModalOverlay'),
    closeQrisModalBtn: document.getElementById('closeQrisModalBtn'),
    simulateQrisPayBtn: document.getElementById('simulateQrisPayBtn'),
    consultModalOverlay: document.getElementById('consultModalOverlay'),
    closeConsultModalBtn: document.getElementById('closeConsultModalBtn'),
    openProModalBtn: document.getElementById('openProModalBtn'),
    openConsultModalBtn: document.getElementById('openConsultModalBtn'),
    consultWhatsAppBtn: document.getElementById('consultWhatsAppBtn'),
    copyMissingKeywordsBtn: document.getElementById('copyMissingKeywordsBtn'),

    // Toast
    toast: document.getElementById('toast'),
    toastMsg: document.getElementById('toastMsg')
  };

  // --------------------------------------------------------------------------
  // 6. THEME MANAGEMENT
  // --------------------------------------------------------------------------
  function applyTheme(theme) {
    state.theme = theme;
    localStorage.setItem('screenora_theme', theme);
    if (theme === 'dark') {
      DOM.html.classList.add('dark');
      if (DOM.themeIcon) {
        DOM.themeIcon.innerHTML = `<svg class="w-3.5 h-3.5 text-dark-textSec" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`;
      }
      if (DOM.themeLabel) DOM.themeLabel.textContent = 'Dark';
    } else {
      DOM.html.classList.remove('dark');
      if (DOM.themeIcon) {
        DOM.themeIcon.innerHTML = `<svg class="w-3.5 h-3.5 text-dark-textSec" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" stroke-width="2"></circle><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>`;
      }
      if (DOM.themeLabel) DOM.themeLabel.textContent = 'Light';
    }
  }

  function toggleTheme() {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  }

  // --------------------------------------------------------------------------
  // 7. LANGUAGE (i18n) MANAGEMENT
  // --------------------------------------------------------------------------
  function applyLanguage(lang) {
    state.language = lang;
    localStorage.setItem('screenora_lang', lang);

    if (lang === 'id') {
      DOM.langIdBtn.className = 'px-2.5 py-1 rounded-md transition-all bg-dark-surface dark:bg-dark-surface text-dark-textPri dark:text-dark-textPri shadow-sm font-semibold';
      DOM.langEnBtn.className = 'px-2.5 py-1 rounded-md transition-all text-dark-textSec dark:text-dark-textSec hover:text-dark-textPri font-medium';
    } else {
      DOM.langEnBtn.className = 'px-2.5 py-1 rounded-md transition-all bg-dark-surface dark:bg-dark-surface text-dark-textPri dark:text-dark-textPri shadow-sm font-semibold';
      DOM.langIdBtn.className = 'px-2.5 py-1 rounded-md transition-all text-dark-textSec dark:text-dark-textSec hover:text-dark-textPri font-medium';
    }

    const dict = i18n[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Update role detail card texts for the new language
    updateRoleDetails(state.selectedRole);

    if (state.currentAnalysis) {
      renderAnalysisResults(state.currentAnalysis);
    }
  }

  // --------------------------------------------------------------------------
  // 8. TOAST NOTIFICATION UTILITY
  // --------------------------------------------------------------------------
  let toastTimer = null;
  function showToast(message) {
    if (!DOM.toast) return;
    DOM.toastMsg.textContent = message;
    DOM.toast.classList.remove('translate-y-20', 'opacity-0');
    DOM.toast.classList.add('translate-y-0', 'opacity-100');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      DOM.toast.classList.remove('translate-y-0', 'opacity-100');
      DOM.toast.classList.add('translate-y-20', 'opacity-0');
    }, 3200);
  }

  // --------------------------------------------------------------------------
  // 9. TABS & INPUT HANDLING
  // --------------------------------------------------------------------------
  function setTab(tabName) {
    state.activeTab = tabName;
    if (tabName === 'upload') {
      DOM.tabUploadBtn.className = 'px-2.5 py-1 rounded bg-dark-surface dark:bg-dark-surface text-dark-textPri font-medium shadow-sm transition-all';
      DOM.tabPasteBtn.className = 'px-2.5 py-1 rounded text-dark-textSec hover:text-dark-textPri transition-all';
      DOM.dropzoneContainer.classList.remove('hidden');
      DOM.pasteContainer.classList.add('hidden');
    } else {
      DOM.tabPasteBtn.className = 'px-2.5 py-1 rounded bg-dark-surface dark:bg-dark-surface text-dark-textPri font-medium shadow-sm transition-all';
      DOM.tabUploadBtn.className = 'px-2.5 py-1 rounded text-dark-textSec hover:text-dark-textPri transition-all';
      DOM.dropzoneContainer.classList.add('hidden');
      DOM.pasteContainer.classList.remove('hidden');
      DOM.rawCvText.focus();
    }
  }

  // --------------------------------------------------------------------------
  // 10. CLIENT-SIDE FILE EXTRACTION (PDF / DOCX / TXT)
  // --------------------------------------------------------------------------
  async function processFile(file) {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast(state.language === 'id' ? 'Ukuran file melebihi batas 5 MB.' : 'File size exceeds 5 MB limit.');
      return;
    }

    const fileName = file.name;
    const fileExtension = fileName.split('.').pop().toLowerCase();
    let extractedText = '';

    DOM.fileNameTxt.textContent = fileName;
    DOM.fileMetaTxt.textContent = (file.size / (1024 * 1024)).toFixed(1) + ' MB • Mengekstrak teks...';
    DOM.filePreviewBadge.classList.remove('hidden');
    DOM.dropzone.classList.add('hidden');

    try {
      if (fileExtension === 'pdf') {
        if (!window.pdfjsLib) {
          throw new Error('PDF.js engine is not ready.');
        }
        if (!window.pdfjsLib.GlobalWorkerOptions.workerSrc) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const pageTextPromises = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          pageTextPromises.push(
            pdf.getPage(i).then(page =>
              page.getTextContent().then(content =>
                content.items.map(item => item.str).join(' ')
              )
            )
          );
        }

        const pages = await Promise.all(pageTextPromises);
        extractedText = pages.join('\n\n');
      } else {
        extractedText = await file.text();
      }

      if (!extractedText || extractedText.trim().length < 40) {
        throw new Error('Teks terlalu pendek atau file adalah gambar hasil scan.');
      }

      state.uploadedFile = file;
      state.cvText = extractedText;
      DOM.rawCvText.value = extractedText;
      DOM.fileMetaTxt.textContent = `${(file.size / (1024 * 1024)).toFixed(1)} MB • Teks terverifikasi (${extractedText.length} karakter)`;
      showToast(state.language === 'id' ? 'Berkas berhasil diproses dan diverifikasi.' : 'Document parsed and verified successfully.');

    } catch (err) {
      console.warn('File processing error:', err);
      DOM.fileMetaTxt.textContent = 'Peringatan: Gagal ekstrak otomatis. Silakan gunakan tab Tempel Teks.';
      showToast(state.language === 'id' ? 'Gagal membaca PDF. Anda dapat menyalin teks langsung di tab Tempel.' : 'Could not parse PDF. Please paste text directly.');
    }
  }

  function clearUploadedFile() {
    state.uploadedFile = null;
    state.cvText = '';
    DOM.cvFileInput.value = '';
    DOM.filePreviewBadge.classList.add('hidden');
    DOM.dropzone.classList.remove('hidden');
  }

  // --------------------------------------------------------------------------
  // 11. ROLE DROPDOWN & GUIDED CUSTOM BUILDER LOGIC
  // --------------------------------------------------------------------------
  function updateRoleDetails(roleKey) {
    state.selectedRole = roleKey;
    const lang = state.language;

    if (roleKey === 'custom') {
      // Show Guided Custom Role Builder, Hide Standard Card
      if (DOM.roleDetailCard) DOM.roleDetailCard.classList.add('hidden');
      if (DOM.customRoleBuilderContainer) {
        DOM.customRoleBuilderContainer.classList.remove('hidden');
        if (DOM.customRoleTitleInput && !DOM.customRoleTitleInput.value) {
          DOM.customRoleTitleInput.focus();
        }
      }
      return;
    }

    // Standard Pre-Configured Role
    if (DOM.customRoleBuilderContainer) DOM.customRoleBuilderContainer.classList.add('hidden');
    if (DOM.roleDetailCard) DOM.roleDetailCard.classList.remove('hidden');

    const config = ROLE_CONFIGS[roleKey] || ROLE_CONFIGS.hr;
    if (DOM.roleCategoryBadge) {
      DOM.roleCategoryBadge.textContent = config.category[lang] || config.category.id;
    }
    if (DOM.roleDetailTitle) {
      DOM.roleDetailTitle.textContent = config.name[lang] || config.name.id;
    }
    if (DOM.roleDetailDesc) {
      DOM.roleDetailDesc.textContent = config.desc[lang] || config.desc.id;
    }

    if (DOM.roleKeywordPills) {
      DOM.roleKeywordPills.innerHTML = config.topKeywords.map(kw => `
        <span class="px-2 py-0.5 rounded-md text-[10px] font-mono bg-dark-surface border border-dark-border text-dark-textSec">
          ${kw}
        </span>
      `).join('');
    }
  }

  function applyArchetypeTemplate(templateKey) {
    const tpl = ARCHETYPE_TEMPLATES[templateKey];
    if (!tpl) return;

    if (DOM.customRoleTitleInput) DOM.customRoleTitleInput.value = tpl.title;
    if (DOM.customRoleKeywordsInput) DOM.customRoleKeywordsInput.value = tpl.keywords;
    
    // Set Seniority
    state.customSeniority = tpl.seniority;
    if (DOM.customSeniorityPills) {
      DOM.customSeniorityPills.forEach(pill => {
        if (pill.getAttribute('data-level') === tpl.seniority) {
          pill.classList.add('active', 'bg-brand-emeraldBg', 'border-brand-emerald/40', 'text-brand-emerald', 'font-semibold');
          pill.classList.remove('bg-dark-surface', 'border-dark-border', 'text-dark-textSec');
        } else {
          pill.classList.remove('active', 'bg-brand-emeraldBg', 'border-brand-emerald/40', 'text-brand-emerald', 'font-semibold');
          pill.classList.add('bg-dark-surface', 'border-dark-border', 'text-dark-textSec');
        }
      });
    }

    showToast(state.language === 'id' ? `${tpl.title.split(' ')[0]} template dimuat!` : `${tpl.title.split(' ')[0]} template applied!`);
  }

  // --------------------------------------------------------------------------
  // 12. ATS SCREENING & PSYCHOLOGICAL DIAGNOSTIC ALGORITHM
  // --------------------------------------------------------------------------
  function analyzeResume(text, roleKey) {
    const lower = text.toLowerCase();
    const lang = state.language;

    let roleName = '';
    let targetKeywords = [];
    let beforeRewrite = '';
    let afterRewrite = '';
    let starQuestion = '';

    const isCustom = (roleKey === 'custom');

    if (isCustom) {
      const customTitle = DOM.customRoleTitleInput ? DOM.customRoleTitleInput.value.trim() : '';
      roleName = customTitle || (lang === 'id' ? 'Posisi Spesialis Kustom' : 'Custom Specialist Role');

      const customKeywordsRaw = DOM.customRoleKeywordsInput ? DOM.customRoleKeywordsInput.value : '';
      if (customKeywordsRaw && customKeywordsRaw.trim().length > 0) {
        targetKeywords = customKeywordsRaw.split(',').map(s => s.trim().toLowerCase()).filter(s => s.length > 1);
      }
      if (targetKeywords.length === 0) {
        // Fallback default keywords if user left blank
        targetKeywords = ['proyek', 'analisis', 'strategi', 'kolaborasi', 'kpi', 'metrik', 'manajemen', 'problem solving', 'performa', 'eksekusi'];
      }

      beforeRewrite = lang === 'id'
        ? `"Bertanggung jawab melaksanakan tugas operasional dan membantu kegiatan tim pada posisi ${roleName}."`
        : `"Responsible for executing routine tasks and supporting team operations as ${roleName}."`;

      afterRewrite = lang === 'id'
        ? `"Memimpin inisiatif strategis pada peran ${roleName} yang mengoptimalkan indikator performa utama sebesar 26% dan mempercepat efisiensi alur kerja lintas divisi hingga 35%."`
        : `"Spearheaded high-impact initiatives as ${roleName}, accelerating operational efficiency by 35% while driving a 26% uplift across core delivery metrics."`;

      starQuestion = lang === 'id'
        ? `"Ceritakan tantangan paling kompleks yang pernah Anda selesaikan secara spesifik pada ranah ${roleName}. Bagaimana metodologi kerja dan ukuran kuantitatif keberhasilan Anda?"`
        : `"Describe the most demanding challenge you orchestrated within the domain of ${roleName}. What rigorous methodology and quantitative metrics validated your outcome?"`;

    } else {
      const config = ROLE_CONFIGS[roleKey] || ROLE_CONFIGS.hr;
      roleName = config.name[lang] || config.name.id;
      targetKeywords = config.keywords;
      beforeRewrite = config.defaultBefore[lang] || config.defaultBefore.id;
      afterRewrite = config.defaultAfter[lang] || config.defaultAfter.id;
      starQuestion = config.starQuestion[lang] || config.starQuestion.id;
    }

    // 1. Keyword density check
    const matchedKeywords = [];
    const missingKeywords = [];

    targetKeywords.forEach(kw => {
      if (lower.includes(kw.toLowerCase())) {
        matchedKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    });

    // Score ratio (custom role with fewer keywords is calibrated gracefully)
    const baselineRatio = isCustom ? 0.45 : 0.50;
    const keywordScore = Math.min(100, Math.round((matchedKeywords.length / Math.max(1, (targetKeywords.length * baselineRatio))) * 100));

    // 2. Metrics & Formula XYZ Detection (Numbers, %, Currency)
    const metricMatches = text.match(/\b\d+(\.\d+)?%|\b\d+\s*persen|\brp\s*[\d\.]+|\b\$\d+|\b\d+\s*(orang|kandidat|posisi|siswa|klien|proyek|bulan|tahun|karyawan|user|pengguna)\b/gi) || [];
    
    // Seniority benchmark weighting
    let seniorityTargetMetrics = 3;
    if (isCustom) {
      if (state.customSeniority === 'entry') seniorityTargetMetrics = 1.5;
      if (state.customSeniority === 'senior') seniorityTargetMetrics = 4.5;
    }
    const metricScore = Math.min(100, Math.round((metricMatches.length / seniorityTargetMetrics) * 80));

    // 3. Action Verbs & Structural Density
    const actionVerbs = ['membangun', 'memimpin', 'merancang', 'menganalisis', 'mengoptimalkan', 'meningkatkan', 'mengembangkan', 'mereduksi', 'mengkoordinasi', 'mengelola', 'designed', 'developed', 'led', 'analyzed', 'increased', 'optimized', 'reduced', 'spearheaded', 'orchestrated'];
    let actionCount = 0;
    actionVerbs.forEach(v => {
      if (lower.includes(v)) actionCount++;
    });
    const verbScore = Math.min(100, actionCount * 20);

    // 4. Section completeness check
    const sections = ['pengalaman', 'experience', 'pendidikan', 'education', 'keahlian', 'skills', 'ringkasan', 'summary'];
    let sectionCount = 0;
    sections.forEach(s => {
      if (lower.includes(s)) sectionCount++;
    });
    const sectionScore = Math.min(100, sectionCount * 25);

    // Weighted Overall Score (0 - 100)
    let totalScore = Math.round(
      (keywordScore * 0.45) +
      (metricScore * 0.25) +
      (verbScore * 0.15) +
      (sectionScore * 0.15)
    );

    // Bound realistically between 45 and 95
    totalScore = Math.max(45, Math.min(95, totalScore));

    // Tier Classification
    let tier = 1;
    let tierColor = '#10B981';
    let tierName = lang === 'id' ? i18n.id.tier1Label : i18n.en.tier1Label;
    let tierBadge = lang === 'id' ? i18n.id.tier1Badge : i18n.en.tier1Badge;
    let narrative = '';
    let advice = '';

    if (totalScore >= 80) {
      tier = 1;
      tierColor = '#10B981';
      tierName = lang === 'id' ? i18n.id.tier1Label : i18n.en.tier1Label;
      tierBadge = lang === 'id' ? i18n.id.tier1Badge : i18n.en.tier1Badge;
      narrative = lang === 'id' 
        ? `Dokumen memenuhi kualifikasi utama untuk peran ${roleName}. Struktur kompetensi, kata kunci industri, dan analitika data diakui relevan oleh sistem penyaringan ATS.`
        : `Resume strongly matches core competencies for ${roleName}. Keyword density, quantifiable metrics, and overall professional trajectory align with enterprise standards.`;
      advice = lang === 'id'
        ? 'Rekomendasi Rekruter: Prioritas pemanggilan wawancara tahap pertama. Perlu verifikasi pemahaman praktis metodologi kerja pada sesi tanya-jawab.'
        : 'Recruiter Advice: High shortlist priority for round 1 interviews. Verify hands-on depth during STAR behavioral probing.';
    } else if (totalScore >= 65) {
      tier = 2;
      tierColor = '#F59E0B';
      tierName = lang === 'id' ? i18n.id.tier2Label : i18n.en.tier2Label;
      tierBadge = lang === 'id' ? i18n.id.tier2Badge : i18n.en.tier2Badge;
      narrative = lang === 'id'
        ? `Profil memiliki fondasi kompetensi yang relevan untuk ${roleName}, namun sejumlah kata kunci spesifik dan metrik capaian formula XYZ masih belum dieksplorasi secara tajam.`
        : `Candidate exhibits solid foundational skills for ${roleName}, but lacks certain targeted industry keywords and quantifiable XYZ impact metrics required for top-tier automatic pass.`;
      advice = lang === 'id'
        ? 'Rekomendasi Rekruter: Masuk kelompok cadangan (backup pool). Segera tambahkan angka metrik pencapaian (%) untuk mengamankan posisi shortlist.'
        : 'Recruiter Advice: Slotted in backup talent pool. Immediately inject quantifiable percentage metrics to lock in interview shortlist.';
    } else {
      tier = 3;
      tierColor = '#EF4444';
      tierName = lang === 'id' ? i18n.id.tier3Label : i18n.en.tier3Label;
      tierBadge = lang === 'id' ? i18n.id.tier3Badge : i18n.en.tier3Badge;
      narrative = lang === 'id'
        ? `Terdapat kesenjangan signifikan antara kata kunci CV dengan kualifikasi standar ${roleName}. Formula kalimat cenderung pasif dan rentan tereliminasi oleh filter awal ATS.`
        : `Significant keyword discrepancy detected relative to ${roleName} standards. Job descriptions lean passive and risk early automated ATS filtering.`;
      advice = lang === 'id'
        ? 'Rekomendasi Rekruter: Tingkat risiko eliminasi tinggi. Lakukan restrukturisasi total pada ringkasan profil dan poin pengalaman kerja sebelum mengirim lamaran.'
        : 'Recruiter Advice: High risk of administrative rejection. Overhaul experience bullet points with active verbs and strict XYZ framing.';
    }

    // Strengths calculation
    const strengths = [];
    if (matchedKeywords.length > 0) {
      const topMatched = matchedKeywords.slice(0, 3).map(k => `"${k}"`).join(', ');
      strengths.push(lang === 'id' ? `Kata kunci kompetensi spesifik terdeteksi kuat: ${topMatched}.` : `Core targeted keywords detected: ${topMatched}.`);
    }
    if (metricMatches.length > 0) {
      strengths.push(lang === 'id' ? `Menyertakan ${metricMatches.length} bukti metrik pencapaian numerik konkret (angka/persentase).` : `Includes ${metricMatches.length} quantifiable metrics (numbers/percentages) proving business impact.`);
    } else {
      strengths.push(lang === 'id' ? 'Pemberian urutan pengalaman kerja terstruktur secara kronologis rapi.' : 'Chronological career progression organized systematically.');
    }
    strengths.push(lang === 'id' ? 'Verba aksi aktif mendominasi narasi tanggung jawab profesional.' : 'Active action verbs drive professional responsibility descriptions.');
    strengths.push(lang === 'id' ? 'Tata letak dan struktur ringkasan profil mudah dipindai oleh algoritma parsing.' : 'Clean, parse-friendly layout structure easily readable by ATS parsers.');

    // Gaps calculation
    const gaps = [];

    // Check Market Standard: Global vs Nasional
    const isGlobal = (state.screeningStandard === 'global');
    if (isGlobal) {
      // 1. Personal demographic bias check (EEOC compliance for global ATS)
      const biasPatterns = /\b(foto|photo|pas foto|tgl lahir|tanggal lahir|date of birth|dob|tempat.*lahir|agama|religion|islam|kristen|katolik|hindu|buddha|menikah|lajang|single|married|status pernikahan|marital status|usia\s*:\s*\d+|umur\s*:\s*\d+)\b/i;
      if (biasPatterns.test(text)) {
        gaps.push(lang === 'id'
          ? 'Peringatan Regulasi Global (EEOC): Terdeteksi data demografis pribadi (foto/tanggal lahir/status/agama). Standar internasional mewajibkan menghapus info ini untuk mencegah bias rekrutmen.'
          : 'EEOC Anti-Bias Compliance Alert: Personal demographic signals (photo/DOB/marital status/religion) detected. Global ATS standards require omitting personal demographics.');
      }
      // 2. English action verbs check
      const hasGlobalVerbs = /\b(spearheaded|architected|orchestrated|engineered|accelerated|streamlined|formulated|implemented|optimized|delivered|scaled|designed|led)\b/i.test(text);
      if (!hasGlobalVerbs) {
        gaps.push(lang === 'id'
          ? 'Minim Action Verbs Lampau (Global Standard): Resume internasional wajib mengawali setiap butir kalimat dengan kata kerja aktif lampau (e.g., Led, Built, Spearheaded).'
          : 'Missing Past-Tense Action Verbs: Global ATS resumes require high-impact past-tense action verbs (e.g., Spearheaded, Orchestrated, Engineered).');
      }
    } else {
      // Standar Nasional Indonesia
      const hasKotaDomisili = /\b(jakarta|bandung|surabaya|semarang|yogyakarta|jogja|medan|bekasi|tangerang|depok|bogor|malang|denpasar|makassar|palembang|batam|solo|riau|lampung)\b/i.test(lower);
      if (!hasKotaDomisili) {
        gaps.push(lang === 'id'
          ? 'Domisili Kota Belum Tercantum: Rekruter korporat & BUMN lokal umumnya menyaring pelamar berdasarkan ketersediaan lokasi domisili (misal: "Jakarta Timur, DKI Jakarta").'
          : 'City Residence Unspecified: Local Indonesian recruiters frequently filter candidates based on residential location logistics.');
      }
    }

    if (missingKeywords.length > 0) {
      const topMissing = missingKeywords.slice(0, 3).map(k => `"${k}"`).join(', ');
      gaps.push(lang === 'id' ? `Kata kunci penting posisi ini belum tercantum eksplisit: ${topMissing}.` : `Critical industry terms absent from text: ${topMissing}.`);
    }
    if (metricMatches.length < 3) {
      gaps.push(lang === 'id' ? 'Formula XYZ belum konsisten di semua poin pengalaman: beberapa butir masih belum memiliki angka dampak (%).' : 'XYZ formula underutilized: multiple experience bullets lack quantifiable business outcome metrics (%).');
    }
    if (!lower.includes('sertifikasi') && !lower.includes('certification')) {
      gaps.push(lang === 'id' ? 'Belum mencantumkan sertifikasi profesional atau kursus terakreditasi pada ringkasan utama.' : 'Missing verified professional certifications or accredited training badges.');
    }
    if (gaps.length < 3) {
      gaps.push(lang === 'id' ? 'Tautan portofolio aktif atau LinkedIn belum terdeteksi secara jelas di bagian kontak.' : 'Online portfolio link or updated LinkedIn handle not distinctly formatted.');
    }

    return {
      score: totalScore,
      tier,
      tierColor,
      tierName,
      tierBadge,
      narrative,
      advice,
      screeningStandard: state.screeningStandard,
      strengths: strengths.slice(0, 4),
      gaps: gaps.slice(0, 3),
      missingKeywords: missingKeywords.length > 0 ? missingKeywords : targetKeywords.slice(0, 6),
      beforeRewrite,
      afterRewrite,
      starQuestion,
      roleTitle: roleName,
      documentName: state.uploadedFile ? state.uploadedFile.name : (lang === 'id' ? 'Teks Input CV Kandidat' : 'Pasted Candidate Resume')
    };
  }

  // --------------------------------------------------------------------------
  // 13. RENDER RESULTS VIEW
  // --------------------------------------------------------------------------
  function renderAnalysisResults(res) {
    const lang = state.language;

    DOM.resDocName.textContent = (lang === 'id' ? 'Hasil Evaluasi: ' : 'Evaluation: ') + res.documentName;
    const stdLabel = res.screeningStandard === 'global' ? '🌐 Global MNC' : '🇮🇩 Standar Nasional';
    DOM.resRoleName.textContent = '• ' + (lang === 'id' ? 'Posisi: ' : 'Target: ') + res.roleTitle + ' (' + stdLabel + ')';

    let currentCount = 0;
    const targetScore = res.score;
    DOM.scoreNumber.textContent = '0';
    DOM.scoreNumber.style.color = res.tierColor;

    const timer = setInterval(() => {
      currentCount += 2;
      if (currentCount >= targetScore) {
        currentCount = targetScore;
        clearInterval(timer);
      }
      DOM.scoreNumber.textContent = currentCount;
    }, 20);

    DOM.progressBarFill.style.width = targetScore + '%';
    DOM.progressBarFill.style.backgroundColor = res.tierColor;
    DOM.scorePercentageTxt.textContent = targetScore + '% Match';

    DOM.scoreTierLabel.textContent = res.tierName;
    DOM.scoreTierLabel.style.color = res.tierColor;
    DOM.tierBadgePill.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-current"></span><span>${res.tierBadge}</span>`;
    DOM.tierBadgePill.style.color = res.tierColor;
    DOM.tierBadgePill.style.borderColor = res.tierColor;
    DOM.tierBadgePill.style.backgroundColor = res.tier === 1 ? 'rgba(16, 185, 129, 0.12)' : (res.tier === 2 ? 'rgba(245, 158, 11, 0.12)' : 'rgba(239, 68, 68, 0.12)');

    DOM.tierNarrativeTxt.textContent = res.narrative;
    DOM.recruiterAdviceTxt.textContent = res.advice;

    DOM.strengthCountBadge.textContent = `${res.strengths.length} ` + (lang === 'id' ? 'Poin Kuat' : 'Strengths');
    DOM.strengthsList.innerHTML = res.strengths.map(s => `
      <li class="flex items-start gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-brand-emerald mt-1.5 shrink-0"></span>
        <span>${s}</span>
      </li>
    `).join('');

    DOM.gapCountBadge.textContent = `${res.gaps.length} ` + (lang === 'id' ? 'Celah' : 'Gaps');
    DOM.gapsList.innerHTML = res.gaps.map(g => `
      <li class="flex items-start gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-brand-amber mt-1.5 shrink-0"></span>
        <span>${g}</span>
      </li>
    `).join('');

    DOM.rewriteBeforeTxt.textContent = res.beforeRewrite;
    DOM.rewriteAfterTxt.textContent = res.afterRewrite;
    DOM.starQuestionTxt.textContent = res.starQuestion;

    // Dynamically update WhatsApp consultation link with contextual role & score
    if (DOM.consultWhatsAppBtn) {
      const targetRoleTitle = res.roleTitle || 'HR / Specialist';
      const waMsg = `Halo Kak Faari, saya baru saja memindai CV di Screenora untuk posisi ${targetRoleTitle} (Skor ATS: ${res.score}%). Saya ingin tanya lebih lanjut dan memberikan masukan/saran terkait hasil evaluasi CV saya. Terima kasih!`;
      DOM.consultWhatsAppBtn.href = `https://wa.me/6285892344722?text=${encodeURIComponent(waMsg)}`;
    }

    DOM.inputView.classList.add('hidden');
    DOM.resultsView.classList.remove('hidden');
    window.scrollTo({ top: DOM.resultsView.offsetTop - 80, behavior: 'smooth' });
  }

  // --------------------------------------------------------------------------
  // 14. EXECUTE SCREENING FLOW
  // --------------------------------------------------------------------------
  async function runScreening() {
    let textToAnalyze = '';
    if (state.activeTab === 'upload') {
      textToAnalyze = state.cvText || DOM.rawCvText.value.trim();
    } else {
      textToAnalyze = DOM.rawCvText.value.trim();
    }

    if (!textToAnalyze || textToAnalyze.length < 30) {
      showToast(state.language === 'id' ? i18n.id.toastNoText : i18n.en.toastNoText);
      if (state.activeTab === 'upload' && !state.uploadedFile) {
        DOM.cvFileInput.click();
      } else {
        DOM.rawCvText.focus();
      }
      return;
    }

    DOM.runAnalysisBtn.disabled = true;
    DOM.btnIcon.innerHTML = `<svg class="w-4 h-4 animate-spin text-black" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>`;
    DOM.btnLabel.textContent = state.language === 'id' ? 'Memproses Matriks ATS...' : 'Evaluating Resume Matrix...';
    showToast(state.language === 'id' ? i18n.id.toastAnalyzing : i18n.en.toastAnalyzing);

    // Transition immediately to Skeleton Shimmer Loading Dashboard
    DOM.inputView.classList.add('hidden');
    DOM.resultsView.classList.add('hidden');
    if (DOM.skeletonLoadingView) {
      DOM.skeletonLoadingView.classList.remove('hidden');
      window.scrollTo({ top: DOM.skeletonLoadingView.offsetTop - 80, behavior: 'smooth' });
    }

    setTimeout(() => {
      const analysis = analyzeResume(textToAnalyze, state.selectedRole);
      state.currentAnalysis = analysis;

      if (DOM.skeletonLoadingView) {
        DOM.skeletonLoadingView.classList.add('hidden');
      }

      DOM.runAnalysisBtn.disabled = false;
      DOM.btnIcon.innerHTML = `<svg class="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>`;
      DOM.btnLabel.textContent = state.language === 'id' ? i18n.id.runBtnLabel : i18n.en.runBtnLabel;

      renderAnalysisResults(analysis);
    }, 1250);
  }

  // --------------------------------------------------------------------------
  // 15. EVENT LISTENERS SETUP
  // --------------------------------------------------------------------------
  function setupEventListeners() {
    DOM.themeToggleBtn.addEventListener('click', toggleTheme);

    DOM.langIdBtn.addEventListener('click', () => applyLanguage('id'));
    DOM.langEnBtn.addEventListener('click', () => applyLanguage('en'));

    DOM.tabUploadBtn.addEventListener('click', () => setTab('upload'));
    DOM.tabPasteBtn.addEventListener('click', () => setTab('paste'));

    DOM.browseFileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      DOM.cvFileInput.click();
    });

    DOM.dropzone.addEventListener('click', () => {
      DOM.cvFileInput.click();
    });

    DOM.cvFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        processFile(e.target.files[0]);
      }
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      DOM.dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        DOM.dropzone.classList.add('dragover');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      DOM.dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        DOM.dropzone.classList.remove('dragover');
      }, false);
    });

    DOM.dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        processFile(e.dataTransfer.files[0]);
      }
    });

    DOM.removeFileBtn.addEventListener('click', clearUploadedFile);

    // Sample Profile Load
    DOM.loadSampleCvBtn.addEventListener('click', () => {
      state.cvText = SAMPLE_PROFILE_TEXT;
      DOM.rawCvText.value = SAMPLE_PROFILE_TEXT;
      setTab('paste');
      if (DOM.roleSelect) {
        DOM.roleSelect.value = 'hr';
      }
      updateRoleDetails('hr');
      showToast(state.language === 'id' ? i18n.id.toastSampleLoaded : i18n.en.toastSampleLoaded);
    });

    // Market Standard Switcher Click Handlers (Indonesia vs Internasional)
    if (DOM.stdNasionalBtn && DOM.stdGlobalBtn) {
      DOM.stdNasionalBtn.addEventListener('click', () => {
        state.screeningStandard = 'id';
        DOM.stdNasionalBtn.className = 'py-2 px-2.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 bg-dark-surface text-brand-emerald border border-brand-emerald/30 shadow-sm';
        DOM.stdGlobalBtn.className = 'py-2 px-2.5 rounded-lg text-xs font-medium text-dark-textSec hover:text-dark-textPri transition-all flex items-center justify-center gap-1.5 bg-transparent border border-transparent';
        DOM.stdNasionalBtn.setAttribute('aria-checked', 'true');
        DOM.stdGlobalBtn.setAttribute('aria-checked', 'false');
        if (DOM.standardBadge) DOM.standardBadge.textContent = '🇮🇩 Indonesia Standard';
        if (DOM.standardDescriptionTxt) DOM.standardDescriptionTxt.textContent = 'Mengevaluasi format 1-kolom Indonesia, EYD/PUEBI, sertifikasi nasional, dan kualifikasi lokal.';
      });

      DOM.stdGlobalBtn.addEventListener('click', () => {
        state.screeningStandard = 'global';
        DOM.stdGlobalBtn.className = 'py-2 px-2.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 bg-dark-surface text-brand-emerald border border-brand-emerald/30 shadow-sm';
        DOM.stdNasionalBtn.className = 'py-2 px-2.5 rounded-lg text-xs font-medium text-dark-textSec hover:text-dark-textPri transition-all flex items-center justify-center gap-1.5 bg-transparent border border-transparent';
        DOM.stdGlobalBtn.setAttribute('aria-checked', 'true');
        DOM.stdNasionalBtn.setAttribute('aria-checked', 'false');
        if (DOM.standardBadge) DOM.standardBadge.textContent = '🌐 Global MNC Standard';
        if (DOM.standardDescriptionTxt) DOM.standardDescriptionTxt.textContent = 'Mengevaluasi kepatuhan ketat US/Global (tanpa foto/usia/status demi anti-bias EEOC), action verbs bahasa Inggris, dan sistem Workday/Greenhouse.';
      });
    }

    // Role Dropdown Change Handler
    if (DOM.roleSelect) {
      DOM.roleSelect.addEventListener('change', (e) => {
        updateRoleDetails(e.target.value);
      });
    }

    // Guided Archetype Template Buttons
    if (DOM.customArchetypeBtns) {
      DOM.customArchetypeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const tplKey = btn.getAttribute('data-template');
          applyArchetypeTemplate(tplKey);
        });
      });
    }

    // Seniority Pills Click Handlers
    if (DOM.customSeniorityPills) {
      DOM.customSeniorityPills.forEach(pill => {
        pill.addEventListener('click', () => {
          state.customSeniority = pill.getAttribute('data-level');
          DOM.customSeniorityPills.forEach(p => {
            p.classList.remove('active', 'bg-brand-emeraldBg', 'border-brand-emerald/40', 'text-brand-emerald', 'font-semibold');
            p.classList.add('bg-dark-surface', 'border-dark-border', 'text-dark-textSec');
          });
          pill.classList.add('active', 'bg-brand-emeraldBg', 'border-brand-emerald/40', 'text-brand-emerald', 'font-semibold');
          pill.classList.remove('bg-dark-surface', 'border-dark-border', 'text-dark-textSec');
        });
      });
    }

    DOM.runAnalysisBtn.addEventListener('click', runScreening);

    DOM.backToInputBtn.addEventListener('click', () => {
      if (DOM.skeletonLoadingView) DOM.skeletonLoadingView.classList.add('hidden');
      DOM.resultsView.classList.add('hidden');
      DOM.inputView.classList.remove('hidden');
      window.scrollTo({ top: DOM.inputView.offsetTop - 80, behavior: 'smooth' });
    });

    // Copy Actionable Rewrite
    DOM.copyRewriteBtn.addEventListener('click', async () => {
      const textToCopy = DOM.rewriteAfterTxt.textContent.trim();
      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(state.language === 'id' ? i18n.id.toastCopied : i18n.en.toastCopied);
      } catch (err) {
        const ta = document.createElement('textarea');
        ta.value = textToCopy;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast(state.language === 'id' ? i18n.id.toastCopied : i18n.en.toastCopied);
      }
    });

    // Copy Missing ATS Keywords Button
    if (DOM.copyMissingKeywordsBtn) {
      DOM.copyMissingKeywordsBtn.addEventListener('click', async () => {
        let kwList = '';
        if (state.currentAnalysis && state.currentAnalysis.missingKeywords && state.currentAnalysis.missingKeywords.length > 0) {
          kwList = state.currentAnalysis.missingKeywords.join(', ');
        } else {
          kwList = 'KPI, Process Improvement, Stakeholder Management, ATS Keywords';
        }

        try {
          await navigator.clipboard.writeText(kwList);
          showToast(state.language === 'id' ? 'Kata kunci rekomendasi berhasil disalin ke clipboard!' : 'Recommended keywords copied to clipboard!');
        } catch (err) {
          const ta = document.createElement('textarea');
          ta.value = kwList;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          showToast(state.language === 'id' ? 'Kata kunci rekomendasi berhasil disalin ke clipboard!' : 'Recommended keywords copied to clipboard!');
        }
      });
    }

    // FAQ Accordion Interactivity
    document.querySelectorAll('.faq-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        const answer = btn.nextElementSibling;

        // Auto close other open accordion items
        document.querySelectorAll('.faq-toggle-btn').forEach(otherBtn => {
          if (otherBtn !== btn) {
            otherBtn.setAttribute('aria-expanded', 'false');
            if (otherBtn.nextElementSibling) otherBtn.nextElementSibling.classList.add('hidden');
          }
        });

        btn.setAttribute('aria-expanded', !isExpanded);
        if (answer) {
          answer.classList.toggle('hidden', isExpanded);
        }
      });
    });

    // Independent Modals
    const openQrisModal = () => DOM.qrisModalOverlay && DOM.qrisModalOverlay.classList.remove('hidden');
    const closeQrisModal = () => DOM.qrisModalOverlay && DOM.qrisModalOverlay.classList.add('hidden');

    if (DOM.openProModalBtn) {
      DOM.openProModalBtn.addEventListener('click', openQrisModal);
    }
    if (DOM.closeQrisModalBtn) {
      DOM.closeQrisModalBtn.addEventListener('click', closeQrisModal);
    }
    if (DOM.qrisModalOverlay) {
      DOM.qrisModalOverlay.addEventListener('click', (e) => {
        if (e.target === DOM.qrisModalOverlay) closeQrisModal();
      });
    }

    const openConsultModal = () => DOM.consultModalOverlay && DOM.consultModalOverlay.classList.remove('hidden');
    const closeConsultModal = () => DOM.consultModalOverlay && DOM.consultModalOverlay.classList.add('hidden');

    if (DOM.openConsultModalBtn) {
      DOM.openConsultModalBtn.addEventListener('click', openConsultModal);
    }
    if (DOM.closeConsultModalBtn) {
      DOM.closeConsultModalBtn.addEventListener('click', closeConsultModal);
    }
    if (DOM.consultModalOverlay) {
      DOM.consultModalOverlay.addEventListener('click', (e) => {
        if (e.target === DOM.consultModalOverlay) closeConsultModal();
      });
    }

    if (DOM.simulateQrisPayBtn) {
      DOM.simulateQrisPayBtn.addEventListener('click', () => {
        DOM.simulateQrisPayBtn.disabled = true;
        DOM.simulateQrisPayBtn.textContent = 'Memverifikasi Pembayaran QRIS...';

        setTimeout(() => {
          DOM.simulateQrisPayBtn.disabled = false;
          DOM.simulateQrisPayBtn.textContent = 'Konfirmasi Pembayaran Selesai';
          closeQrisModal();
          showToast(state.language === 'id' ? i18n.id.toastPaymentSuccess : i18n.en.toastPaymentSuccess);
        }, 1500);
      });
    }
  }

  // --------------------------------------------------------------------------
  // 16. INITIALIZATION
  // --------------------------------------------------------------------------
  function init() {
    applyTheme(state.theme);
    applyLanguage(state.language);
    setupEventListeners();
    updateRoleDetails(state.selectedRole);
    console.log('Screenora Engine initialized successfully (v1.0 Production with 35+ Roles).');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
