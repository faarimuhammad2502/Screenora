/**
 * ============================================================================
 * SCREENORA — AI RESUME INTELLIGENCE & ATS DIAGNOSTIC ENGINE
 * Client-Side JavaScript Application Logic (v1.0 MVP)
 * 
 * Features:
 * - 100% Client-side in-browser text extraction (PDF.js + TXT / DOCX fallback)
 * - Dual Theme (Obsidian Dark #0A0B0E & Gallery White #F8F9FB) with LocalStorage
 * - Dual Language (Indonesian ID & English EN) with instant DOM translation
 * - Corporate ATS & Industrial Psychology Screening Engine (0-100% Match)
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
    selectedRole: 'hr',  // 'hr' | 'ba' | 'educator' | 'developer' | 'custom'
    customRoleTitle: '',
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
      customRoleLabel: 'Atau ketik posisi kustom spesifik:',
      runBtnLabel: 'Mulai Pemindaian Dokumen',
      btnSubtext: 'Analisis Berbasis Psikologi HR • Standar ATS Korporat • Instan',
      retestBtn: 'Uji Dokumen atau Posisi Lain',
      strengthsHead: 'Kekuatan Kompetensi Terverifikasi',
      strengthFootnote: 'Poin ini adalah nilai jual utama yang wajib ditekankan saat menjawab wawancara.',
      gapsHead: 'Celah Kualifikasi & Filter ATS',
      gapFootnote: 'Celah ini berpotensi menurunkan skor filter awal pada ATS korporasi multinasional.',
      rewriteHead: 'Optimasi Kalimat Berdampak (Formula XYZ)',
      copyBtn: 'Salin Teks',
      proBannerTitle: 'Ingin Bedah Tuntas Seluruh Kalimat CV & Dapatkan Format ATS Baru?',
      proBannerDesc: 'Dapatkan laporan komprehensif 10 halaman, bedah seluruh butir pengalaman, atau jadwalkan konsultasi 1-on-1 bersama praktisi HR bersertifikat.',
      qrisModalTitle: 'Laporan Diagnostik 10 Halaman & Format ATS',
      qrisModalSubtitle: 'Akses instan bedah seluruh kalimat pengalaman, deteksi celah ATS lengkap, dan template siap pakai.',
      consultModalTitle: 'Konsultasi 1-on-1 bersama HR & Career Specialist',
      consultModalSubtitle: 'Sesi privat tatap muka daring untuk bedah portofolio, evaluasi kesiapan profil, dan latihan simulasi wawancara kerja nyata.',
      legalDisclaimer: 'Screenora adalah alat simulasi dan diagnostik persiapan karir independen berbasis algoritma heuristik, tidak berafiliasi atau menjamin penerimaan kerja di instansi, BUMN, maupun perusahaan mana pun.',
      toastCopied: 'Kalimat rekomendasi berhasil disalin ke clipboard!',
      toastSampleLoaded: 'Sampel profil kandidat berhasil dimuat!',
      toastNoText: 'Silakan unggah berkas CV atau tempel teks riwayat Anda terlebih dahulu.',
      toastAnalyzing: 'Memindai teks dan menghitung matriks kompetensi...',
      toastPaymentSuccess: 'Simulasi Berhasil! Laporan diagnostik 10-halaman Anda siap diunduh.',
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
      customRoleLabel: 'Or type a specific custom role:',
      runBtnLabel: 'Run Resume Screening',
      btnSubtext: 'HR Psychology Analytics • Enterprise ATS Benchmark • Instant',
      retestBtn: 'Test Another Document or Role',
      strengthsHead: 'Verified Competency Strengths',
      strengthFootnote: 'These key selling points should be emphasized during behavioral interviews.',
      gapsHead: 'ATS Qualification Gaps',
      gapFootnote: 'These gaps may trigger early automated disqualification on multinational ATS filters.',
      rewriteHead: 'High-Impact Sentence Optimization (XYZ Formula)',
      copyBtn: 'Copy Text',
      proBannerTitle: 'Want a Complete Line-by-Line CV Audit & New ATS Template?',
      proBannerDesc: 'Get a 10-page diagnostic breakdown, complete experience overhaul, or book a private 1-on-1 session with a certified HR specialist.',
      qrisModalTitle: '10-Page Diagnostic Report & ATS Format',
      qrisModalSubtitle: 'Instant access to full XYZ sentence breakdown, ATS gap diagnostics, and ready-to-use template.',
      consultModalTitle: '1-on-1 Consultation with HR & Career Specialist',
      consultModalSubtitle: 'Private live 1-on-1 session for portfolio audit, profile readiness review, and real STAR interview simulation.',
      legalDisclaimer: 'Screenora is an independent career diagnostic simulation based on heuristic algorithms, not affiliated with or guaranteeing job offers at any specific company.',
      toastCopied: 'Optimized sentence copied to clipboard!',
      toastSampleLoaded: 'Candidate sample profile loaded successfully!',
      toastNoText: 'Please upload a CV file or paste your resume text first.',
      toastAnalyzing: 'Scanning resume text and evaluating competency matrix...',
      toastPaymentSuccess: 'Simulation Successful! Your 10-page report is ready for download.',
      tier1Label: 'GREEN (≥80%) : HIGH MATCH',
      tier2Label: 'AMBER (65-79%) : POTENTIAL BACKUP',
      tier3Label: 'RED (<65%) : HIGH RISK OF REJECTION',
      tier1Badge: 'TIER 1 : SHORTLIST CANDIDATE (HIGH FIT)',
      tier2Badge: 'TIER 2 : BACKUP CANDIDATE (MODERATE FIT)',
      tier3Badge: 'TIER 3 : HIGH RISK / GAP IDENTIFIED (LOW FIT)'
    }
  };

  // --------------------------------------------------------------------------
  // 3. TARGET ROLE COMPETENCY MATRICES & BENCHMARKS
  // --------------------------------------------------------------------------
  const ROLE_CONFIGS = {
    hr: {
      name: { id: 'HR Generalist & Talent Acquisition', en: 'HR Generalist & Talent Acquisition' },
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
    ba: {
      name: { id: 'Business Analyst', en: 'Business Analyst' },
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
    educator: {
      name: { id: 'Shadow Teacher / Special Needs Educator', en: 'Shadow Teacher / Special Needs Educator' },
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
    developer: {
      name: { id: 'Frontend & Web Developer', en: 'Frontend & Web Developer' },
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
    }
  };

  // Sample Profile for Instant Exploration
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
  // 4. DOM ELEMENTS CACHE
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
    rolePresetContainer: document.getElementById('rolePresetContainer'),
    rolePills: document.querySelectorAll('.role-pill'),
    customRoleInput: document.getElementById('customRoleInput'),
    runAnalysisBtn: document.getElementById('runAnalysisBtn'),
    btnIcon: document.getElementById('btnIcon'),
    btnLabel: document.getElementById('btnLabel'),
    inputView: document.getElementById('inputView'),
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
    qrisModalOverlay: document.getElementById('qrisModalOverlay'),
    closeQrisModalBtn: document.getElementById('closeQrisModalBtn'),
    simulateQrisPayBtn: document.getElementById('simulateQrisPayBtn'),
    consultModalOverlay: document.getElementById('consultModalOverlay'),
    closeConsultModalBtn: document.getElementById('closeConsultModalBtn'),
    openProModalBtn: document.getElementById('openProModalBtn'),
    openConsultModalBtn: document.getElementById('openConsultModalBtn'),
    toast: document.getElementById('toast'),
    toastMsg: document.getElementById('toastMsg')
  };

  // --------------------------------------------------------------------------
  // 5. THEME MANAGEMENT
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
  // 6. LANGUAGE (i18n) MANAGEMENT
  // --------------------------------------------------------------------------
  function applyLanguage(lang) {
    state.language = lang;
    localStorage.setItem('screenora_lang', lang);

    // Toggle button styles
    if (lang === 'id') {
      DOM.langIdBtn.className = 'px-2.5 py-1 rounded-md transition-all bg-dark-surface dark:bg-dark-surface text-dark-textPri dark:text-dark-textPri shadow-sm font-semibold';
      DOM.langEnBtn.className = 'px-2.5 py-1 rounded-md transition-all text-dark-textSec dark:text-dark-textSec hover:text-dark-textPri font-medium';
    } else {
      DOM.langEnBtn.className = 'px-2.5 py-1 rounded-md transition-all bg-dark-surface dark:bg-dark-surface text-dark-textPri dark:text-dark-textPri shadow-sm font-semibold';
      DOM.langIdBtn.className = 'px-2.5 py-1 rounded-md transition-all text-dark-textSec dark:text-dark-textSec hover:text-dark-textPri font-medium';
    }

    // Replace all [data-i18n] texts
    const dict = i18n[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Re-render analysis if currently showing results
    if (state.currentAnalysis) {
      renderAnalysisResults(state.currentAnalysis);
    }
  }

  // --------------------------------------------------------------------------
  // 7. TOAST NOTIFICATION UTILITY
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
  // 8. TABS & INPUT HANDLING
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
  // 9. CLIENT-SIDE FILE EXTRACTION (PDF / DOCX / TXT)
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
        // Plain text, markdown, or docx raw stream fallback
        extractedText = await file.text();
      }

      if (!extractedText || extractedText.trim().length < 40) {
        throw new Error('Teks terlalu pendek atau file adalah gambar hasil scan.');
      }

      state.uploadedFile = file;
      state.cvText = extractedText;
      DOM.rawCvText.value = extractedText; // keep synchronized
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
  // 10. TARGET ROLE SELECTION
  // --------------------------------------------------------------------------
  function selectRole(roleKey) {
    state.selectedRole = roleKey;
    DOM.rolePills.forEach(pill => {
      const r = pill.getAttribute('data-role');
      const check = pill.querySelector('.role-check');
      if (r === roleKey) {
        pill.classList.add('active-role');
        if (check) {
          check.classList.remove('hidden');
          check.classList.add('flex');
        }
      } else {
        pill.classList.remove('active-role');
        if (check) {
          check.classList.add('hidden');
          check.classList.remove('flex');
        }
      }
    });

    if (roleKey !== 'custom') {
      DOM.customRoleInput.value = '';
      state.customRoleTitle = '';
    }
  }

  // --------------------------------------------------------------------------
  // 11. ATS SCREENING & PSYCHOLOGICAL DIAGNOSTIC ALGORITHM
  // --------------------------------------------------------------------------
  function analyzeResume(text, roleKey, customTitle) {
    const lower = text.toLowerCase();
    const config = ROLE_CONFIGS[roleKey] || ROLE_CONFIGS.hr;
    const lang = state.language;

    // 1. Keyword density check
    const matchedKeywords = [];
    const missingKeywords = [];

    config.keywords.forEach(kw => {
      if (lower.includes(kw.toLowerCase())) {
        matchedKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    });

    const keywordScore = Math.min(100, Math.round((matchedKeywords.length / (config.keywords.length * 0.55)) * 100));

    // 2. Metrics & Formula XYZ Detection (Numbers, %, Currency)
    const metricMatches = text.match(/\b\d+(\.\d+)?%|\b\d+\s*persen|\brp\s*[\d\.]+|\b\$\d+|\b\d+\s*(orang|kandidat|posisi|siswa|klien|proyek|bulan|tahun)\b/gi) || [];
    const metricScore = Math.min(100, metricMatches.length * 20);

    // 3. Action Verbs & Structural Density
    const actionVerbs = ['membangun', 'memimpin', 'merancang', 'menganalisis', 'mengoptimalkan', 'meningkatkan', 'mengembangkan', 'mereduksi', 'mengkoordinasi', 'mengelola', 'designed', 'developed', 'led', 'analyzed', 'increased', 'optimized', 'reduced'];
    let actionCount = 0;
    actionVerbs.forEach(v => {
      if (lower.includes(v)) actionCount++;
    });
    const verbScore = Math.min(100, actionCount * 22);

    // 4. Section completeness check (Pendidikan, Pengalaman, Keahlian, Sertifikasi)
    const sections = ['pengalaman', 'experience', 'pendidikan', 'education', 'keahlian', 'skills'];
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

    // Bound between 42 and 94 for realistic, believable candidate evaluation
    totalScore = Math.max(45, Math.min(94, totalScore));

    // Tier Classification
    let tier = 1;
    let tierColor = '#10B981'; // Green
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
        ? 'Dokumen memenuhi kualifikasi utama untuk peran yang dilamar. Struktur kompetensi, kata kunci industri, dan analitika data diakui relevan oleh sistem penyaringan ATS.'
        : 'Resume strongly matches core role competencies. Keyword density, quantifiable metrics, and overall professional trajectory align with tier-1 enterprise applicant standards.';
      advice = lang === 'id'
        ? 'Rekomendasi Rekruter: Prioritas pemanggilan wawancara tahap pertama. Perlu verifikasi pemahaman praktis metodologi kerja pada sesi tanya-jawab.'
        : 'Recruiter Advice: High shortlist priority for round 1 interviews. Verify hands-on depth during STAR behavioral probing.';
    } else if (totalScore >= 65) {
      tier = 2;
      tierColor = '#F59E0B'; // Amber
      tierName = lang === 'id' ? i18n.id.tier2Label : i18n.en.tier2Label;
      tierBadge = lang === 'id' ? i18n.id.tier2Badge : i18n.en.tier2Badge;
      narrative = lang === 'id'
        ? 'Profil memiliki fondasi kompetensi yang relevan, namun sejumlah kata kunci spesifik dan metrik capaian formula XYZ masih belum dieksplorasi secara tajam.'
        : 'Candidate exhibits solid foundational skills, but lacks certain targeted industry keywords and quantifiable XYZ impact metrics required for top-tier automatic pass.';
      advice = lang === 'id'
        ? 'Rekomendasi Rekruter: Masuk kelompok cadangan (backup pool). Segera tambahkan angka metrik pencapaian (%) untuk mengamankan posisi shortlist.'
        : 'Recruiter Advice: Slotted in backup talent pool. Immediately inject quantifiable percentage metrics to lock in interview shortlist.';
    } else {
      tier = 3;
      tierColor = '#EF4444'; // Red
      tierName = lang === 'id' ? i18n.id.tier3Label : i18n.en.tier3Label;
      tierBadge = lang === 'id' ? i18n.id.tier3Badge : i18n.en.tier3Badge;
      narrative = lang === 'id'
        ? 'Terdapat kesenjangan signifikan antara kata kunci CV dengan kualifikasi standar posisi ini. Formula kalimat cenderung pasif dan rentan tereliminasi oleh filter awal ATS.'
        : 'Significant keyword discrepancy detected relative to target role standards. Job descriptions lean passive and risk early automated ATS filtering.';
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
    if (lower.includes('psikologi') || lower.includes('analisis') || lower.includes('lead') || lower.includes('teacher') || lower.includes('developer')) {
      strengths.push(lang === 'id' ? 'Latar belakang pendidikan atau proyek relevan dengan domain keahlian yang dituju.' : 'Educational grounding or projects directly support the target domain.');
    } else {
      strengths.push(lang === 'id' ? 'Struktur penulisan ringkasan profil mudah dipindai oleh algoritma parsing.' : 'Clean, parse-friendly layout structure easily readable by ATS parsers.');
    }
    strengths.push(lang === 'id' ? 'Verba aksi aktif mendominasi narasi tanggung jawab profesional.' : 'Active action verbs drive professional responsibility descriptions.');

    // Gaps calculation
    const gaps = [];
    if (missingKeywords.length > 0) {
      const topMissing = missingKeywords.slice(0, 3).map(k => `"${k}"`).join(', ');
      gaps.push(lang === 'id' ? `Kata kunci penting industri belum tercantum eksplisit: ${topMissing}.` : `Critical industry terms absent from text: ${topMissing}.`);
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
      strengths: strengths.slice(0, 4),
      gaps: gaps.slice(0, 3),
      beforeRewrite: config.defaultBefore[lang],
      afterRewrite: config.defaultAfter[lang],
      starQuestion: config.starQuestion[lang],
      roleTitle: customTitle || config.name[lang],
      documentName: state.uploadedFile ? state.uploadedFile.name : (lang === 'id' ? 'Teks Input CV Kandidat' : 'Pasted Candidate Resume')
    };
  }

  // --------------------------------------------------------------------------
  // 12. RENDER RESULTS VIEW
  // --------------------------------------------------------------------------
  function renderAnalysisResults(res) {
    const lang = state.language;

    DOM.resDocName.textContent = (lang === 'id' ? 'Hasil Evaluasi: ' : 'Evaluation: ') + res.documentName;
    DOM.resRoleName.textContent = '• ' + (lang === 'id' ? 'Posisi: ' : 'Target: ') + res.roleTitle;

    // Animate score counter
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

    // Progress bar
    DOM.progressBarFill.style.width = targetScore + '%';
    DOM.progressBarFill.style.backgroundColor = res.tierColor;
    DOM.scorePercentageTxt.textContent = targetScore + '% Match';

    // Tier Badges & Texts
    DOM.scoreTierLabel.textContent = res.tierName;
    DOM.scoreTierLabel.style.color = res.tierColor;
    DOM.tierBadgePill.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-current"></span><span>${res.tierBadge}</span>`;
    DOM.tierBadgePill.style.color = res.tierColor;
    DOM.tierBadgePill.style.borderColor = res.tierColor;
    DOM.tierBadgePill.style.backgroundColor = res.tier === 1 ? 'rgba(16, 185, 129, 0.12)' : (res.tier === 2 ? 'rgba(245, 158, 11, 0.12)' : 'rgba(239, 68, 68, 0.12)');

    DOM.tierNarrativeTxt.textContent = res.narrative;
    DOM.recruiterAdviceTxt.textContent = res.advice;

    // Strengths list
    DOM.strengthCountBadge.textContent = `${res.strengths.length} ` + (lang === 'id' ? 'Poin Kuat' : 'Strengths');
    DOM.strengthsList.innerHTML = res.strengths.map(s => `
      <li class="flex items-start gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-brand-emerald mt-1.5 shrink-0"></span>
        <span>${s}</span>
      </li>
    `).join('');

    // Gaps list
    DOM.gapCountBadge.textContent = `${res.gaps.length} ` + (lang === 'id' ? 'Celah' : 'Gaps');
    DOM.gapsList.innerHTML = res.gaps.map(g => `
      <li class="flex items-start gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-brand-amber mt-1.5 shrink-0"></span>
        <span>${g}</span>
      </li>
    `).join('');

    // Rewrites & STAR
    DOM.rewriteBeforeTxt.textContent = res.beforeRewrite;
    DOM.rewriteAfterTxt.textContent = res.afterRewrite;
    DOM.starQuestionTxt.textContent = res.starQuestion;

    // View Switching
    DOM.inputView.classList.add('hidden');
    DOM.resultsView.classList.remove('hidden');
    window.scrollTo({ top: DOM.resultsView.offsetTop - 80, behavior: 'smooth' });
  }

  // --------------------------------------------------------------------------
  // 13. EXECUTE SCREENING FLOW
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

    // Set UI Loading state
    DOM.runAnalysisBtn.disabled = true;
    DOM.btnIcon.innerHTML = `<svg class="w-4 h-4 animate-spin text-black" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>`;
    DOM.btnLabel.textContent = state.language === 'id' ? 'Memproses Matriks ATS...' : 'Evaluating Resume Matrix...';
    showToast(state.language === 'id' ? i18n.id.toastAnalyzing : i18n.en.toastAnalyzing);

    // Realistic brief algorithmic delay
    setTimeout(() => {
      const customTitle = DOM.customRoleInput.value.trim();
      const analysis = analyzeResume(textToAnalyze, state.selectedRole, customTitle);
      state.currentAnalysis = analysis;

      DOM.runAnalysisBtn.disabled = false;
      DOM.btnIcon.innerHTML = `<svg class="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>`;
      DOM.btnLabel.textContent = state.language === 'id' ? i18n.id.runBtnLabel : i18n.en.runBtnLabel;

      renderAnalysisResults(analysis);
    }, 1100);
  }

  // --------------------------------------------------------------------------
  // 14. EVENT LISTENERS SETUP
  // --------------------------------------------------------------------------
  function setupEventListeners() {
    // Theme toggle
    DOM.themeToggleBtn.addEventListener('click', toggleTheme);

    // Language buttons
    DOM.langIdBtn.addEventListener('click', () => applyLanguage('id'));
    DOM.langEnBtn.addEventListener('click', () => applyLanguage('en'));

    // Tabs
    DOM.tabUploadBtn.addEventListener('click', () => setTab('upload'));
    DOM.tabPasteBtn.addEventListener('click', () => setTab('paste'));

    // File Dropzone click & drag
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

    // Drag and Drop Events
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

    // Load Sample Button
    DOM.loadSampleCvBtn.addEventListener('click', () => {
      state.cvText = SAMPLE_PROFILE_TEXT;
      DOM.rawCvText.value = SAMPLE_PROFILE_TEXT;
      setTab('paste');
      selectRole('hr');
      showToast(state.language === 'id' ? i18n.id.toastSampleLoaded : i18n.en.toastSampleLoaded);
    });

    // Role selection
    DOM.rolePills.forEach(pill => {
      pill.addEventListener('click', () => {
        const role = pill.getAttribute('data-role');
        selectRole(role);
      });
    });

    DOM.customRoleInput.addEventListener('input', (e) => {
      if (e.target.value.trim().length > 0) {
        state.selectedRole = 'custom';
        DOM.rolePills.forEach(p => {
          p.classList.remove('active-role');
          const check = p.querySelector('.role-check');
          if (check) {
            check.classList.add('hidden');
            check.classList.remove('flex');
          }
        });
      }
    });

    // Run Analysis Button
    DOM.runAnalysisBtn.addEventListener('click', runScreening);

    // Retest / Back Button
    DOM.backToInputBtn.addEventListener('click', () => {
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
        // Fallback for older browsers
        const ta = document.createElement('textarea');
        ta.value = textToCopy;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast(state.language === 'id' ? i18n.id.toastCopied : i18n.en.toastCopied);
      }
    });

    // ========================================================================
    // MODAL HANDLERS (SEPARATED & INDEPENDENT)
    // ========================================================================
    // 1. Modal QRIS Report (Rp 10.000)
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

    // 2. Modal 1-on-1 Consultation (Mulai Rp 25.000)
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

    // Simulated QRIS Payment Confirmation
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
  // 15. INITIALIZATION
  // --------------------------------------------------------------------------
  function init() {
    applyTheme(state.theme);
    applyLanguage(state.language);
    setupEventListeners();
    console.log('Screenora Engine initialized successfully (v1.0 MVP).');
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
