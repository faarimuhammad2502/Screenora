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

  // Optional external endpoint (e.g., Formspree / Google Apps Script) for feedback form
  const FEEDBACK_ENDPOINT = '';

  // --------------------------------------------------------------------------
  // 1. APPLICATION STATE
  // --------------------------------------------------------------------------
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  const storedLang = localStorage.getItem('screenora_lang');
  const initialLang = (urlLang === 'id' || urlLang === 'en')
    ? urlLang
    : ((storedLang === 'id' || storedLang === 'en') ? storedLang : 'id');

  const state = {
    theme: localStorage.getItem('screenora_theme') || 'dark',
    language: initialLang,
    activeTab: 'upload', // 'upload' | 'paste'
    screeningStandard: 'id', // 'id' (Standar Nasional Indonesia) | 'global' (Standar Internasional)
    selectedRole: 'hr',  // standard key | 'custom'
    customSeniority: 'mid', // 'entry' | 'mid' | 'senior'
    uploadedFile: null,
    cvText: '',
    currentAnalysis: null,
    isAnalyzing: false,
    inputMode: 'single', // 'single' | 'compare'
    compareFileA: null,
    compareFileB: null,
    currentComparison: null
  };

  // --------------------------------------------------------------------------
  // 2. INTERNATIONALIZATION (i18n) DICTIONARY
  // --------------------------------------------------------------------------
  const i18n = {
    id: {
      // Top Navigation
      navStudio: 'Studio Diagnostik',
      navSubtitle: 'Kecerdasan Resume & Diagnostik ATS',
      privacyBadge: 'Lokal & Terenkripsi',
      navHome: 'Beranda',
      navScan: 'Skrining CV',
      navTemplates: 'Template ATS',
      navBuilder: 'Buat CV Instan',
      badgeNew: 'Baru',

      // Home: How It Works & Sample CV ATS Lolos
      homeStep1Title: '1. Unggah atau Tempel CV',
      homeStep1Desc: 'Unggah PDF/DOCX atau tempel teks CV Anda — seluruh pemindaian berjalan 100% lokal di browser.',
      homeStep2Title: '2. Pilih Target Posisi',
      homeStep2Desc: 'Sesuaikan standar pasar kerja (Nasional BUMN / Global MNC) dan jabatan target atau Job Description.',
      homeStep3Title: '3. Lihat Skor & Perbaikan',
      homeStep3Desc: 'Dapatkan skor kecocokan ATS, kata kunci yang hilang, koreksi kalimat XYZ, serta pertanyaan wawancara STAR.',
      sampleCvEyebrow: 'CONTOH CV ATS LOLOS',
      sampleCvTitle: 'Contoh CV yang Lolos Skrining ATS',
      sampleCvSub: 'Lihat struktur 1-kolom bersih, kata kunci kompetensi yang tepat, dan kalimat pencapaian Formula XYZ terukur yang disukai rekruter.',
      sampleCvTestBtn: 'Uji Contoh CV Ini',

      // Ecosystem / Services Hub Section
      ecoEyebrow: 'EKOSISTEM SCREENORA',
      ecoTitle: 'Ekosistem Layanan Screenora',
      ecoSubtitle: 'Alur lengkap dari audit kelolosan ATS, penyusunan CV baru, hingga konsultasi karir.',
      ecoCard1Title: 'Skrining & Skor ATS',
      ecoCard1Desc: 'Uji kecocokan kata kunci, struktur CV, dan deteksi celah kualifikasi terhadap lowongan target dalam 3 detik.',
      ecoCard1Cta: 'Mulai Skrining',
      ecoCard2Title: 'Template CV ATS',
      ecoCard2Desc: 'Koleksi format 1-kolom standar BUMN, startup, dan perusahaan global yang siap diunduh ke Word (.docx).',
      ecoCard2Cta: 'Lihat Katalog',
      ecoCard3Title: 'Buat CV Instan',
      ecoCard3Desc: 'Editor CV real-time dengan pratinjau kertas A4, chip pengalaman 1-klik, dan optimasi otomatis Formula XYZ.',
      ecoCard3Cta: 'Buka Live Builder',
      ecoCard4Title: 'Perbaikan Kalimat & Konsultasi CV',
      ecoCard4Desc: 'Diskusi langsung seputar hasil evaluasi CV, penajaman kalimat dampak, dan persiapan wawancara STAR.',
      ecoCard4Cta: 'Hubungi & Konsultasi',

      // Hero Section
      heroBadge: 'Diagnostik ATS & Pemindaian Psikologi HR',
      heroTitle: 'Ketahui Skor Kelolosan CV & Celah ATS Sebelum Melamar',
      heroDesc: 'Pemindaian teks lokal mendeteksi keberadaan kata kunci kompetensi, struktur kalimat berbobot formula XYZ, dan parameter kelolosan rekruter dalam 3 detik tanpa mengunggah data Anda ke server asing.',
      samplePrompt: 'Ingin coba langsung tanpa berkas?',
      sampleBtn: 'Muat Sampel Profil HR / Analyst',

      // Step 1: Input Document
      step1Label: 'Dokumen CV Pelamar',
      tabUpload: 'Unggah Berkas',
      tabPaste: 'Tempel Teks',
      dropzonePrompt: 'Pilih atau Seret Berkas CV (PDF / DOCX)',
      dropzoneLimit: 'Maksimal 5 MB • Teks digital (bukan hasil scan foto/gambar)',
      browseBtn: 'Pilih Berkas',
      pasteHint: 'Tips: Anda bisa langsung menyalin seluruh teks dari Google Docs atau file CV Anda.',
      formatNotice: 'Didukung: PDF Teks, Word DOCX, TXT',
      privacyNotice: 'Privasi Terjamin: Pemrosesan Lokal di Browser (Tanpa Server)',
      rawCvPlaceholder: 'Tempel ringkasan pengalaman kerja, riwayat pendidikan, dan keahlian CV Anda di sini...',

      // Step 2: Target Role & Market Standard
      step2Label: 'Posisi Pekerjaan Target',
      step2Hint: 'Pilih Cepat / Kustom',
      standardSelectLabel: 'Standar Pasar Kerja ATS:',
      stdNasionalLabel: 'ID • Nasional (BUMN/Lokal)',
      stdGlobalLabel: 'Global • Internasional (MNC)',
      roleSelectLabel: 'Pilih Posisi Standar / Kustom:',
      roleAtsStandard: 'Standar ATS Korporat',
      roleEssentialKeywords: 'Kata Kunci Esensial ATS:',

      // Guided Custom Builder
      customGuideTitle: 'Panduan Template Posisi Kustom',
      customQuickFillSub: '1-Klik Isi Cepat',
      customArchetypeLabel: 'Pilih Template Awal (Klik untuk Muat Otomatis):',
      archGrowth: 'Growth & Komersial',
      archTech: 'Engineering & Teknis',
      archOps: 'Operasional & People',
      archResearch: 'Riset & Analitika',
      customRoleTitleLabel: 'Nama Jabatan Target:',
      customRoleTitlePlaceholder: 'Contoh: Senior Growth Marketing Specialist',
      customRoleTitleHint: 'Format: [Tingkat] + [Fungsi] + [Bidang Spesifik]',
      customKeywordsLabel: 'Kata Kunci / Keahlian Wajib Diuji (Pisahkan koma):',
      customKeywordsPlaceholder: 'misal: SQL, Tableau, ROI, Customer Journey, B2B',
      customJobDescLabel: 'Tempel Job Description (Opsional — Ekstrak Kata Kunci Otomatis):',
      customJobDescPh: 'Tempel deskripsi pekerjaan dari LinkedIn/JobStreet di sini untuk mengekstrak kata kunci ATS wajib secara otomatis...',
      extractJdBtn: 'Ekstrak Kata Kunci JD',
      jdExtractedToast: 'Kata kunci berhasil diekstrak dari Job Description!',
      jdEmptyWarn: 'Tempel teks Job Description terlebih dahulu sebelum mengekstrak kata kunci.',
      customSeniorityLabel: 'Ekspektasi Tingkat Pengalaman:',
      seniorityEntry: 'Entry (0-2 thn)',
      seniorityMid: 'Mid (2-5 thn)',
      senioritySenior: 'Senior (5+ thn)',

      // Big CTA
      runBtnLabel: 'Mulai Pemindaian Dokumen',
      btnSubtext: 'Analisis Berbasis Psikologi HR • Standar ATS Korporat • Instan',

      // Skeleton Loader
      skeletonScanning: 'Memindai Matriks Kompetensi & Formula XYZ...',

      // Results Header & Scorecard
      retestBtn: 'Uji Dokumen atau Posisi Lain',
      exportPdfBtn: 'Simpan PDF',
      copySummaryBtn: 'Salin Ringkasan',
      sendToBuilderBtn: 'Perbaiki di CV Instan',
      scaleShortlist: '≥80% Prioritas Utama',
      scaleReserve: '65–79% Kelompok Cadangan',
      scaleRisk: '<65% Risiko Gugur',
      recBadge: 'Rekomendasi',
      strengthsHead: 'Kekuatan Kompetensi Terverifikasi',
      strengthFootnote: 'Poin ini adalah nilai jual utama yang wajib ditekankan saat menjawab wawancara.',
      gapsHead: 'Celah Kualifikasi & Filter ATS',
      gapFootnote: 'Lengkapi kata kunci ini untuk memperbesar peluang lolos filter awal ATS korporat.',
      copyKeywordsBtn: 'Salin Kata Kunci',

      // Card 04: XYZ Formula & STAR Interview
      rewriteHead: 'Optimasi Kalimat Berdampak (Formula XYZ)',
      rewriteSubheader: 'Format Baku Google: Accomplished [X], measured by [Y], by doing [Z]',
      cvScanBadge: '📍 Dibaca dari CV Anda',
      rewriteBeforeTitle: 'Draft Kalimat Asli di CV Anda',
      needsFixBadge: 'Perlu Diperbaiki',
      rewriteBeforeSub: 'Risiko tereliminasi oleh filter awal ATS karena tidak membuktikan kapasitas inisiatif nyata.',
      rewriteAfterTitle: 'Rekomendasi Formula XYZ (Siap Salin)',
      rewriteAfterSub: 'Format yang paling diutamakan oleh rekruter multinasional & BUMN untuk panggilan interview.',
      formulaBreakdown: '<span class="font-semibold text-slate-800 dark:text-dark-textPri">Bedah Formula:</span> [Z] Verba aktif &amp; metode + [Y] Metrik efisiensi terukur + [X] Hasil dampak bisnis.',
      copyBtn: 'Salin Teks',
      secondaryRewritesHeading: 'Butir Pengalaman Lain di CV Anda yang Perlu Diperbaiki:',
      secondaryCopyBtn: 'Salin Kalimat Rekomendasi',
      starQuestionHeader: 'Simulasi Pertanyaan Wawancara (Teknik STAR) Berdasarkan Celah Ini:',

      // Card 05: Pro Features & Actions
      proBadge: 'Fitur Lanjutan • Segera Hadir',
      proBannerTitle: 'Laporan Lengkap & Sesi Konsultasi Privat (Segera Hadir)',
      proBannerDesc: 'Fitur generator laporan 10 halaman & konsultasi saat ini sedang disiapkan. Seluruh diagnostik dasar Screenora sekarang 100% Gratis. Butuh format CV standar yang teruji lolos ATS? Buka katalog template kami, atau hubungi Faari langsung via email untuk masukan dan pertanyaan.',
      proFreeBadge: '✓ Skrining 100% Gratis',
      btnCatalog: 'Katalog Template ATS (.docx)',
      btnUnlockReport: 'Buka Laporan (Segera Hadir)',
      btnEmailFaari: 'Email Faari',

      // FAQ Section
      faqBadge: 'Pusat Pengetahuan Karir & Standar ATS',
      faqHeading: 'Pertanyaan Umum Seputar Skrining CV & Rekrutmen',
      faqSub: 'Standar penyaringan Applicant Tracking System dan psikologi penyeleksian HR korporat.',
      faqQ1: 'Apa itu Formula XYZ dan mengapa rekruter multinasional mewajibkannya?',
      faqA1: '<div class="space-y-3.5"><div class="p-3.5 bg-dark-well rounded-xl border border-dark-wellBorder"><div class="flex items-center gap-2 mb-1"><span class="w-1.5 h-1.5 rounded-full bg-brand-emerald"></span><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Rumus Baku Eksekutif Google</span></div><p class="text-xs sm:text-sm font-heading font-bold text-dark-textPri">"Accomplished [X], as measured by [Y], by doing [Z]"</p><p class="text-[11px] text-dark-textSec mt-1">Mencapai hasil bisnis konkret <strong>[X]</strong>, yang terukur oleh metrik angka <strong>[Y]</strong>, melalui inisiatif atau tindakan nyata <strong>[Z]</strong>.</p></div><div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs"><div class="p-3 rounded-lg bg-dark-surface border border-dark-border"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Komponen X</span><p class="font-bold text-dark-textPri text-xs mt-0.5 mb-1">Hasil Bisnis Nyata</p><p class="text-[11px] text-dark-textSec leading-relaxed">Dampak riil terhadap profitabilitas, efisiensi kerja tim, atau kepuasan klien.</p></div><div class="p-3 rounded-lg bg-dark-surface border border-dark-border"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Komponen Y</span><p class="font-bold text-dark-textPri text-xs mt-0.5 mb-1">Metrik Terukur (%)</p><p class="text-[11px] text-dark-textSec leading-relaxed">Bukti angka kuantitatif: persentase (%), skala waktu (hari), atau nominal efisiensi.</p></div><div class="p-3 rounded-lg bg-dark-surface border border-dark-border"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Komponen Z</span><p class="font-bold text-dark-textPri text-xs mt-0.5 mb-1">Tindakan & Metodologi</p><p class="text-[11px] text-dark-textSec leading-relaxed">Verba aksi aktif (Spearheaded, Merancang) serta metode atau alat kerja yang dipakai.</p></div></div><p class="text-[11px] text-dark-textMuted border-t border-dark-border/40 pt-2.5"><strong>Fakta Rekrutmen:</strong> Rekruter korporat rata-rata hanya meluangkan 6–8 detik untuk memindai satu CV. Format tugas pasif seperti <em>"Bertanggung jawab atas administrasi"</em> langsung tereliminasi karena tidak membuktikan kapasitas inisiatif nyata.</p></div>',
      faqQ2: 'Bagaimana Screenora menjamin keamanan dan privasi berkas CV saya?',
      faqA2: '<div class="space-y-3.5"><div class="p-3.5 bg-dark-well rounded-xl border border-dark-wellBorder flex items-center justify-between"><div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-brand-emerald"></span><span class="text-xs font-heading font-bold text-dark-textPri">Zero-Data Retention (100% Client-Side)</span></div><span class="text-[10px] font-mono text-brand-emerald px-2 py-0.5 rounded bg-brand-emeraldBg border border-brand-emerald/30 font-semibold">Privasi Mutlak</span></div><div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs"><div class="p-3 rounded-lg bg-dark-surface border border-dark-border"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Arsitektur</span><p class="font-bold text-dark-textPri text-xs mt-0.5 mb-1">Pemrosesan Lokal (Client-Side)</p><p class="text-[11px] text-dark-textSec leading-relaxed">Mesin ekstraksi PDF.js berjalan langsung di dalam memori peramban browser perangkat Anda.</p></div><div class="p-3 rounded-lg bg-dark-surface border border-dark-border"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Keamanan</span><p class="font-bold text-dark-textPri text-xs mt-0.5 mb-1">Tanpa Database Eksternal</p><p class="text-[11px] text-dark-textSec leading-relaxed">Tidak ada berkas dokumen, nomor kontak, email, riwayat karir, atau gaji yang dikirimkan ke server luar.</p></div><div class="p-3 rounded-lg bg-dark-surface border border-dark-border"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Aksesibilitas</span><p class="font-bold text-dark-textPri text-xs mt-0.5 mb-1">Akses Bebas Tanpa Registrasi</p><p class="text-[11px] text-dark-textSec leading-relaxed">Dapat langsung digunakan tanpa perlu membuat akun atau meninggalkan rekam jejak pribadi apa pun.</p></div></div><p class="text-[11px] text-dark-textMuted border-t border-dark-border/40 pt-2.5">Aman sepenuhnya untuk menguji CV profesional, korporat perbankan, BUMN, maupun lamaran rahasia (confidential).</p></div>',
      faqQ3: 'Apakah format CV bahasa Indonesia ramah sistem Applicant Tracking System (ATS)?',
      faqA3: '<div class="space-y-3.5"><div class="p-3.5 bg-dark-well rounded-xl border border-dark-wellBorder"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Fakta Parser ATS Modern</span><p class="text-xs sm:text-sm font-heading font-bold text-dark-textPri mt-0.5">Sistem ATS Korporat Memproses Teks Bahasa Indonesia dengan Sempurna</p><p class="text-[11px] text-dark-textSec mt-1">Platform seperti Workday, Taleo, SAP SuccessFactors, hingga sistem lokal mengekstrak teks digital tanpa memandang bahasa.</p></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs"><div class="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Standar Lolos Screening</span><p class="font-bold text-emerald-800 dark:text-emerald-400 text-xs mt-0.5 mb-2">Faktor Penentu Kelolosan</p><ul class="space-y-1.5 text-[11px] text-dark-textSec"><li>• Format 1-kolom bersih tanpa elemen grafis bertumpuk.</li><li>• Struktur heading baku (Ringkasan, Pengalaman, Pendidikan, Keahlian).</li><li>• Kepadatan kata kunci kompetensi industri yang relevan.</li></ul></div><div class="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/20"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">Penyebab Gugur Otomatis</span><p class="font-bold text-rose-800 dark:text-rose-400 text-xs mt-0.5 mb-2">Faktor Eliminasi Utama</p><ul class="space-y-1.5 text-[11px] text-dark-textSec"><li>• Berkas hasil scan atau gambar raster (teks tidak dapat di-parse sistem).</li><li>• Tabel kompleks atau kotak teks melayang yang mengacaukan alur baca parser.</li><li>• Ketiadaan metrik hasil kerja terukur (%) dan dominasi kalimat tugas pasif.</li></ul></div></div></div>',
      faqQ4: 'Apa yang harus saya lakukan jika hasil evaluasi CV berada di Tier 3 (<65%)?',
      faqA4: '<div class="space-y-3.5"><div class="p-3.5 bg-dark-well rounded-xl border border-dark-wellBorder"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-amber">Panduan Perbaikan Mandiri</span><p class="text-xs sm:text-sm font-heading font-bold text-dark-textPri mt-0.5">3 Langkah Cepat Menaikkan Skor ke Tier 1 (≥80%)</p><p class="text-[11px] text-dark-textSec mt-1">Skor &lt;65% menunjukkan adanya celah kata kunci penting atau narasi pengalaman kerja yang masih pasif.</p></div><div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs"><div class="p-3 rounded-lg bg-dark-surface border border-dark-border"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Langkah 01</span><p class="font-bold text-dark-textPri text-xs mt-0.5 mb-1">Sisipkan Kata Kunci</p><p class="text-[11px] text-dark-textSec leading-relaxed">Klik <em>Salin Kata Kunci</em> pada kartu celah kualifikasi dan sematkan istilah teknis tersebut ke seksi keahlian & pengalaman.</p></div><div class="p-3 rounded-lg bg-dark-surface border border-dark-border"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Langkah 02</span><p class="font-bold text-dark-textPri text-xs mt-0.5 mb-1">Terapkan Formula XYZ</p><p class="text-[11px] text-dark-textSec leading-relaxed">Ganti kalimat deskripsi tugas rutin dengan formula Google. Pastikan minimal 3 butir pengalaman menyertakan angka metrik (%).</p></div><div class="p-3 rounded-lg bg-dark-surface border border-dark-border"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Langkah 03</span><p class="font-bold text-dark-textPri text-xs mt-0.5 mb-1">Pindai Ulang Dokumen</p><p class="text-[11px] text-dark-textSec leading-relaxed">Lakukan pemindaian ulang di Screenora untuk memverifikasi kenaikan skor hingga mencapai Tier 1 (&ge;80%).</p></div></div></div>',
      faqQ5: 'Bagaimana format sesi Konsultasi 1-on-1 bersama praktisi HR?',
      faqA5: '<div class="space-y-3.5"><div class="p-3.5 bg-dark-well rounded-xl border border-dark-wellBorder flex flex-col sm:flex-row sm:items-center justify-between gap-2"><div><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Konsultasi Privat Eksklusif</span><p class="text-xs sm:text-sm font-heading font-bold text-dark-textPri mt-0.5">Sesi Mentoring 45 Menit Daring (Google Meet / WhatsApp)</p><p class="text-[11px] text-dark-textSec">Bersama Muhammad Faari Akbar (S1 Psikologi & Praktisi Talent Management).</p></div><span class="text-[11px] font-mono text-brand-amber px-2.5 py-1 rounded bg-brand-amber/10 border border-brand-amber/30 whitespace-nowrap self-start sm:self-center font-semibold">Tahap Persiapan</span></div><div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs"><div class="p-3 rounded-lg bg-dark-surface border border-dark-border"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Modul 01</span><p class="font-bold text-dark-textPri text-xs mt-0.5 mb-1">Bedah CV Baris demi Baris</p><p class="text-[11px] text-dark-textSec leading-relaxed">Restrukturisasi total setiap butir kalimat pengalaman kerja ke formula Google XYZ berdaya pikat tinggi.</p></div><div class="p-3 rounded-lg bg-dark-surface border border-dark-border"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Modul 02</span><p class="font-bold text-dark-textPri text-xs mt-0.5 mb-1">Optimasi Profil LinkedIn</p><p class="text-[11px] text-dark-textSec leading-relaxed">Penajaman Headline dan About (format XYZ) agar profil ramah kata kunci bagi inbound recruiter korporat & tech.</p></div><div class="p-3 rounded-lg bg-dark-surface border border-dark-border"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Modul 03</span><p class="font-bold text-dark-textPri text-xs mt-0.5 mb-1">Simulasi Wawancara STAR</p><p class="text-[11px] text-dark-textSec leading-relaxed">Latihan taktis menjawab pertanyaan wawancara berbasis perilaku (behavioral interview) yang kerap menggugurkan kandidat.</p></div></div></div>',
      homeFaqQ4: 'Apa perbedaan fitur Gratis dan Berbayar (Rp 25.000)?',
      homeFaqA4: 'Skrining CV, pengecekan skor ATS, perbandingan 2 CV, dan template dasar di Screenora sepenuhnya Gratis. Biaya Rp 25.000 hanya berlaku untuk unduh file dokumen siap edit pada Template Pro atau ekspor .doc dari Live CV Builder.',

      // Modals
      qrisModalBadge: 'SEGERA HADIR • TAHAP PERSIAPAN',
      qrisModalTitle: 'Laporan Diagnostik 10 Halaman & Format ATS (Segera Hadir)',
      qrisModalSubtitle: 'Fitur generator laporan komprehensif dan integrasi pembayaran QRIS resmi sedang dalam proses persiapan oleh Faari.',
      qrisFreeNoticeHead: '100% Gratis untuk Skrining CV',
      qrisFreeNoticeBody: 'Seluruh pemindaian skor, deteksi kata kunci kompetensi, perbaikan formula XYZ, dan latihan pertanyaan STAR di Screenora saat ini dapat Anda gunakan <strong>100% Gratis</strong> tanpa biaya.',
      qrisUpcomingTitle: 'Rencana Fitur yang Akan Datang:',
      qrisUpcoming1: 'Bedah mendalam seluruh butir kalimat pengalaman kerja formula XYZ.',
      qrisUpcoming2: 'Daftar lengkap 25+ kata kunci ATS industri spesifik.',
      qrisUpcoming3: 'Unduh template dokumen Word (.docx) standar format ATS siap pakai.',
      qrisFeedbackBtn: 'Kirim Masukan via Email',
      qrisCreatorContact: 'Kontak Pembuat: faarimuhammad25@gmail.com',

      consultModalBadge: 'DISKUSI, MASUKAN & KONSULTASI • SEGERA HADIR',
      consultModalTitle: 'Pusat Diskusi, Masukan & Konsultasi Karir',
      consultModalSubtitle: 'Sesi mentoring privat tatap muka saat ini sedang disiapkan. Seluruh fitur pemindaian dasar Screenora 100% Gratis. Untuk pertanyaan, kritik, atau masukan pengembangan, silakan hubungi kami via email.',
      consultStatusLabel: 'Status Akses Screenora',
      consultStatusValue: '100% Gratis',
      consultStatusBadge: 'Mentoring Segera Hadir',
      consultSectionQ: 'Punya Pertanyaan, Saran, atau Masukan?',
      consultSectionDesc: 'Faari (kreator Screenora) sangat menyambut feedback, kritik membangun, ide fitur baru, maupun pertanyaan seputar hasil evaluasi CV Anda. Kirimkan pesan langsung melalui email atau WhatsApp.',
      consultEmailBtn: 'Kirim Email ke faarimuhammad25@gmail.com',
      consultWhatsAppBtnText: 'Chat Singkat via WhatsApp',

      // Footer
      legalDisclaimer: 'Screenora adalah alat simulasi dan diagnostik persiapan karir independen berbasis algoritma heuristik, tidak berafiliasi atau menjamin penerimaan kerja di instansi, BUMN, maupun perusahaan mana pun.',
      footerInquiry: 'Pertanyaan & Masukan:',

      // Toast Notifications & Tiers
      toastCopied: 'Kalimat rekomendasi berhasil disalin ke clipboard!',
      toastSampleLoaded: 'Sampel profil kandidat berhasil dimuat!',
      toastNoText: 'Silakan unggah berkas CV atau tempel teks riwayat Anda terlebih dahulu.',
      toastAnalyzing: 'Memindai teks dan menghitung matriks kompetensi...',
      toastTemplateLoaded: 'Template posisi kustom berhasil dimuat!',
      toastKeywordsCopied: 'Kata kunci celah berhasil disalin ke clipboard!',
      tier1Label: 'Kecocokan Tinggi (≥80%)',
      tier2Label: 'Kecocokan Cukup (65-79%)',
      tier3Label: 'Perlu Optimasi (<65%)',
      tier1Badge: 'Kualifikasi Tinggi • Prioritas Utama',
      tier2Badge: 'Kualifikasi Cukup • Kelompok Cadangan',
      tier3Badge: 'Perlu Optimasi • Risiko Gugur ATS',

      // P1 Compare 2 CVs Mode
      modeSingleBtn: 'Skrining Tunggal',
      modeCompareBtn: 'Bandingkan 2 CV',
      comparePanelTitle: 'Komparasi 2 CV (Head-to-Head)',
      comparePanelSub: 'Bandingkan dua kandidat secara objektif untuk posisi yang sama dalam satu tampilan.',
      compareCandidateA: 'Kandidat A',
      compareCandidateB: 'Kandidat B',
      compareClearBtn: 'Bersihkan',
      runCompareBtn: 'Bandingkan Kedua CV',
      compareResultsTitle: 'Hasil Komparasi Head-to-Head',
      backFromCompareBtn: 'Kembali ke Input Komparasi',
      compareVerdictLabel: 'Ringkasan Pemenang & Rekomendasi Rekruter',
      compareKeywordsHead: 'Kekuatan & Kata Kunci Cocok',
      compareBulletsHead: 'Kalimat Kuat vs Lemah',
      compareGapsHead: 'Celah Utama',
      compareUploadPrompt: 'Unggah PDF / DOCX / TXT',
      compareToastNeedBoth: 'Harap unggah atau tempel teks kedua CV (Kandidat A & B) minimal 40 karakter.',

      // Feedback Section
      feedbackTitle: 'Kotak Kritik & Masukan',
      feedbackSubtitle: 'Punya ide fitur, laporan bug, atau saran untuk Screenora? Kirim langsung ke kreator.',
      feedbackNameLabel: 'Nama / Peran (Opsional)',
      feedbackNamePh: 'Nama / Peran Anda (opsional)',
      feedbackCategoryLabel: 'Kategori Masukan',
      feedbackCatFeature: 'Saran Fitur',
      feedbackCatBug: 'Laporan Bug',
      feedbackCatUi: 'Tampilan / UI',
      feedbackCatAccuracy: 'Akurasi Skor & Rekomendasi',
      feedbackMsgLabel: 'Pesan / Kritik / Masukan',
      feedbackMsgPh: 'Tulis kritik, saran, atau kendala yang Anda temukan di Screenora...',
      sendFeedbackEmailBtn: 'Kirim via Email',
      sendFeedbackWaBtn: 'Kirim via WhatsApp',
      feedbackEmptyWarn: 'Harap isi pesan masukan Anda terlebih dahulu.',
      feedbackSentToast: 'Terima kasih! Masukan Anda siap dikirim.'
    },
    en: {
      // Top Navigation
      navStudio: 'Diagnostic Studio',
      navSubtitle: 'AI Resume Intelligence & ATS Diagnostic',
      privacyBadge: 'Local & Encrypted',
      navHome: 'Home',
      navScan: 'CV Screening',
      navTemplates: 'ATS Templates',
      navBuilder: 'Instant CV Builder',
      badgeNew: 'New',

      // Home: How It Works & Passing ATS Sample CV
      homeStep1Title: '1. Upload or Paste CV',
      homeStep1Desc: 'Upload PDF/DOCX or paste your resume text — all scanning runs 100% locally in your browser.',
      homeStep2Title: '2. Select Target Role',
      homeStep2Desc: 'Match your target job market (National / Global MNC) and target role or pasted Job Description.',
      homeStep3Title: '3. View Score & Fixes',
      homeStep3Desc: 'Get your ATS match score, missing keywords, XYZ bullet rewrites, and STAR interview questions.',
      sampleCvEyebrow: 'PASSING ATS CV SAMPLE',
      sampleCvTitle: 'Sample CV That Passes ATS Screening',
      sampleCvSub: 'See the clean single-column structure, targeted competency keywords, and measurable XYZ achievement bullets favored by recruiters.',
      sampleCvTestBtn: 'Test This Sample CV',

      // Ecosystem / Services Hub Section
      ecoEyebrow: 'SCREENORA ECOSYSTEM',
      ecoTitle: 'Screenora Career Services Ecosystem',
      ecoSubtitle: 'A complete workflow from ATS pass-rate auditing and instant resume building to career consultation.',
      ecoCard1Title: 'ATS Screening & Scoring',
      ecoCard1Desc: 'Test keyword alignment, resume structure, and qualification gaps against target roles in 3 seconds.',
      ecoCard1Cta: 'Start Screening',
      ecoCard2Title: 'ATS CV Templates',
      ecoCard2Desc: 'Curated single-column formats for national SOEs, startups, and global enterprises ready for Word (.docx).',
      ecoCard2Cta: 'Browse Catalog',
      ecoCard3Title: 'Instant CV Builder',
      ecoCard3Desc: 'Real-time CV editor with A4 paper preview, 1-click experience presets, and automatic XYZ Formula optimization.',
      ecoCard3Cta: 'Open Live Builder',
      ecoCard4Title: 'Bullet Rewrite & CV Consultation',
      ecoCard4Desc: 'Direct discussion on CV evaluation results, impact bullet sharpening, and STAR interview preparation.',
      ecoCard4Cta: 'Contact & Consult',

      // Hero Section
      heroBadge: 'ATS Diagnostic & HR Behavioral Screening',
      heroTitle: 'Know Your CV Pass Rate & ATS Gaps Before Applying',
      heroDesc: 'Local in-browser text engine detects competency keywords, high-impact XYZ sentence structures, and recruiter screening benchmarks in 3 seconds without sending your data to external servers.',
      samplePrompt: 'Want to test instantly without a file?',
      sampleBtn: 'Load Sample HR / Analyst Profile',

      // Step 1: Input Document
      step1Label: 'Applicant Resume File',
      tabUpload: 'Upload File',
      tabPaste: 'Paste Text',
      dropzonePrompt: 'Select or Drag & Drop CV File (PDF / DOCX)',
      dropzoneLimit: 'Max 5 MB • Digital text (not scanned images/photos)',
      browseBtn: 'Browse File',
      pasteHint: 'Pro-tip: You can directly copy and paste the entire text from Google Docs or Word.',
      formatNotice: 'Supported: PDF Text, Word DOCX, TXT',
      privacyNotice: 'Zero-Data Retention (100% In-Browser Privacy)',
      rawCvPlaceholder: 'Paste your resume summary, work experience, education, and skills here...',

      // Step 2: Target Role & Market Standard
      step2Label: 'Target Job Role',
      step2Hint: 'Quick Select / Custom',
      standardSelectLabel: 'ATS Job Market Standard:',
      stdNasionalLabel: 'ID • National (Local)',
      stdGlobalLabel: 'Global • International (MNC)',
      roleSelectLabel: 'Select Standard or Custom Role:',
      roleAtsStandard: 'Enterprise ATS Standard',
      roleEssentialKeywords: 'Essential ATS Keywords:',

      // Guided Custom Builder
      customGuideTitle: 'Custom Role Template Guide',
      customQuickFillSub: '1-Click Quick Fill',
      customArchetypeLabel: 'Choose Archetype (Click to Auto-Fill):',
      archGrowth: 'Growth & Commercial',
      archTech: 'Engineering & Technical',
      archOps: 'Operations & People',
      archResearch: 'Research & Analytics',
      customRoleTitleLabel: 'Target Job Title:',
      customRoleTitlePlaceholder: 'e.g. Senior Growth Marketing Specialist',
      customRoleTitleHint: 'Format: [Seniority] + [Function] + [Specialization]',
      customKeywordsLabel: 'Must-Have ATS Keywords (Comma separated):',
      customKeywordsPlaceholder: 'e.g. SQL, Tableau, ROI, Customer Journey, B2B',
      customJobDescLabel: 'Paste Job Description (Optional — Auto-Extract Keywords):',
      customJobDescPh: 'Paste the job description from LinkedIn/JobStreet here to automatically extract must-have ATS keywords...',
      extractJdBtn: 'Extract JD Keywords',
      jdExtractedToast: 'Keywords successfully extracted from Job Description!',
      jdEmptyWarn: 'Please paste a Job Description first before extracting keywords.',
      customSeniorityLabel: 'Experience Level Expectation:',
      seniorityEntry: 'Entry (0-2 yrs)',
      seniorityMid: 'Mid (2-5 yrs)',
      senioritySenior: 'Senior (5+ yrs)',

      // Big CTA
      runBtnLabel: 'Run Resume Screening',
      btnSubtext: 'HR Psychology Analytics • Enterprise ATS Benchmark • Instant',

      // Skeleton Loader
      skeletonScanning: 'Scanning Competency Matrix & XYZ Formula...',

      // Results Header & Scorecard
      retestBtn: 'Test Another Document or Role',
      exportPdfBtn: 'Save PDF',
      copySummaryBtn: 'Copy Summary',
      sendToBuilderBtn: 'Fix in Instant Builder',
      scaleShortlist: '≥80% Shortlist Priority',
      scaleReserve: '65–79% Backup Pool',
      scaleRisk: '<65% At Risk',
      recBadge: 'Recommendation',
      strengthsHead: 'Verified Competency Strengths',
      strengthFootnote: 'These key selling points should be emphasized during behavioral interviews.',
      gapsHead: 'ATS Qualification Gaps',
      gapFootnote: 'Address these keywords to significantly increase your ATS screening pass rate.',
      copyKeywordsBtn: 'Copy Keywords',

      // Card 04: XYZ Formula & STAR Interview
      rewriteHead: 'High-Impact Sentence Optimization (XYZ Formula)',
      rewriteSubheader: 'Google Standard: Accomplished [X], measured by [Y], by doing [Z]',
      cvScanBadge: '📍 Parsed from Your CV',
      rewriteBeforeTitle: 'Original Draft Sentence from Your CV',
      needsFixBadge: 'Needs Fix',
      rewriteBeforeSub: 'High risk of automated ATS rejection due to passive duty phrasing without concrete metrics.',
      rewriteAfterTitle: 'Recommended XYZ Formula (Ready to Copy)',
      rewriteAfterSub: 'High-signal format prioritized by enterprise and global recruiters for first-round interviews.',
      formulaBreakdown: '<span class="font-semibold text-slate-800 dark:text-dark-textPri">Formula Breakdown:</span> [Z] Active verb &amp; method + [Y] Quantifiable metric + [X] Business impact outcome.',
      copyBtn: 'Copy Text',
      secondaryRewritesHeading: 'Additional Experience Bullets in Your CV to Overhaul:',
      secondaryCopyBtn: 'Copy Recommended Sentence',
      starQuestionHeader: 'Behavioral Interview Question (STAR Technique) Based on This Gap:',

      // Card 05: Pro Features & Actions
      proBadge: 'Advanced Feature • Coming Soon',
      proBannerTitle: 'Complete Diagnostic Report & Private Mentoring (Coming Soon)',
      proBannerDesc: 'The 10-page diagnostic report & private consultation are currently in development. Basic Screenora diagnostic features are 100% Free. Looking for tested ATS formats? Browse our template catalog, or email Faari directly with feedback and questions.',
      proFreeBadge: '✓ 100% Free Screening',
      btnCatalog: 'ATS Template Catalog (.docx)',
      btnUnlockReport: 'Unlock Report (Coming Soon)',
      btnEmailFaari: 'Email Faari',

      // FAQ Section
      faqBadge: 'Career Knowledge & ATS Standards',
      faqHeading: 'Frequently Asked Questions About CV Screening & Recruitment',
      faqSub: 'Applicant Tracking System filtering standards and corporate HR hiring psychology.',
      faqQ1: 'What is the XYZ Formula and why do multinational recruiters expect it?',
      faqA1: '<div class="space-y-3.5"><div class="p-3.5 bg-dark-well rounded-xl border border-dark-wellBorder"><div class="flex items-center gap-2 mb-1"><span class="w-1.5 h-1.5 rounded-full bg-brand-emerald"></span><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Google Executive Standard</span></div><p class="text-xs sm:text-sm font-heading font-bold text-dark-textPri">"Accomplished [X], as measured by [Y], by doing [Z]"</p><p class="text-[11px] text-dark-textSec mt-1">Achieved tangible business outcome <strong>[X]</strong>, measured by quantifiable metric <strong>[Y]</strong>, via specific initiative <strong>[Z]</strong>.</p></div><div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs"><div class="p-3 rounded-lg bg-dark-surface border border-dark-border"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Component X</span><p class="font-bold text-dark-textPri text-xs mt-0.5 mb-1">Business Outcome</p><p class="text-[11px] text-dark-textSec leading-relaxed">Measurable impact on team velocity, operational profitability, or client satisfaction.</p></div><div class="p-3 rounded-lg bg-dark-surface border border-dark-border"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Component Y</span><p class="font-bold text-dark-textPri text-xs mt-0.5 mb-1">Quantifiable Metric (%)</p><p class="text-[11px] text-dark-textSec leading-relaxed">Empirical proof: percentage gains, turnaround days, currency value, or volume handled.</p></div><div class="p-3 rounded-lg bg-dark-surface border border-dark-border"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Component Z</span><p class="font-bold text-dark-textPri text-xs mt-0.5 mb-1">Action & Methodology</p><p class="text-[11px] text-dark-textSec leading-relaxed">High-impact action verbs (Spearheaded, Architected) coupled with specific execution tools.</p></div></div><p class="text-[11px] text-dark-textMuted border-t border-dark-border/40 pt-2.5"><strong>Recruiter Fact:</strong> Recruiters spend an average of 6–8 seconds scanning a resume. Passive task descriptions such as <em>"Responsible for administrative support"</em> are promptly filtered out because they fail to showcase initiative and ownership.</p></div>',
      faqQ2: 'How does Screenora protect the privacy and security of my CV document?',
      faqA2: '<div class="space-y-3.5"><div class="p-3.5 bg-dark-well rounded-xl border border-dark-wellBorder flex items-center justify-between"><div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-brand-emerald"></span><span class="text-xs font-heading font-bold text-dark-textPri">Zero-Data Retention (100% Client-Side)</span></div><span class="text-[10px] font-mono text-brand-emerald px-2 py-0.5 rounded bg-brand-emeraldBg border border-brand-emerald/30 font-semibold">Absolute Privacy</span></div><div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs"><div class="p-3 rounded-lg bg-dark-surface border border-dark-border"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Architecture</span><p class="font-bold text-dark-textPri text-xs mt-0.5 mb-1">Local In-Browser Processing</p><p class="text-[11px] text-dark-textSec leading-relaxed">The PDF.js extraction engine executes purely within your local browser sandbox memory.</p></div><div class="p-3 rounded-lg bg-dark-surface border border-dark-border"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Security</span><p class="font-bold text-dark-textPri text-xs mt-0.5 mb-1">No External Server Storage</p><p class="text-[11px] text-dark-textSec leading-relaxed">No documents, phone contacts, email addresses, career history, or compensation data are transmitted to external servers.</p></div><div class="p-3 rounded-lg bg-dark-surface border border-dark-border"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Accessibility</span><p class="font-bold text-dark-textPri text-xs mt-0.5 mb-1">Zero Registration Required</p><p class="text-[11px] text-dark-textSec leading-relaxed">Fully accessible without account registration, credentials, or tracking footprints.</p></div></div><p class="text-[11px] text-dark-textMuted border-t border-dark-border/40 pt-2.5">Completely secure for auditing executive resumes, financial institution profiles, and confidential applications.</p></div>',
      faqQ3: 'Is an Indonesian-language CV compatible with Applicant Tracking Systems (ATS)?',
      faqA3: '<div class="space-y-3.5"><div class="p-3.5 bg-dark-well rounded-xl border border-dark-wellBorder"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Modern ATS Parser Facts</span><p class="text-xs sm:text-sm font-heading font-bold text-dark-textPri mt-0.5">Corporate ATS Platforms Parse Multilingual Text Flawlessly</p><p class="text-[11px] text-dark-textSec mt-1">Modern enterprise applicant tracking systems (Workday, Taleo, SAP SuccessFactors) extract digital text without language bias.</p></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs"><div class="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Shortlist Benchmarks</span><p class="font-bold text-emerald-800 dark:text-emerald-400 text-xs mt-0.5 mb-2">Key Shortlist Drivers</p><ul class="space-y-1.5 text-[11px] text-dark-textSec"><li>• Clean single-column layout without overlapping graphic containers.</li><li>• Standard section headings (Summary, Experience, Education, Skills).</li><li>• Dense contextual distribution of targeted industry keywords.</li></ul></div><div class="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/20"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">Auto-Filter Triggers</span><p class="font-bold text-rose-800 dark:text-rose-400 text-xs mt-0.5 mb-2">Primary Elimination Causes</p><ul class="space-y-1.5 text-[11px] text-dark-textSec"><li>• Rasterized image files or scanned documents unreadable by OCR parsers.</li><li>• Multi-cell complex tables or floating text boxes disrupting logical text flow.</li><li>• Total absence of quantifiable percentage metrics and passive duty lists.</li></ul></div></div></div>',
      faqQ4: 'What should I do if my resume evaluation falls into Tier 3 (<65%)?',
      faqA4: '<div class="space-y-3.5"><div class="p-3.5 bg-dark-well rounded-xl border border-dark-wellBorder"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-amber">Self-Optimization Playbook</span><p class="text-xs sm:text-sm font-heading font-bold text-dark-textPri mt-0.5">3 Immediate Steps to Climb to Tier 1 (≥80%)</p><p class="text-[11px] text-dark-textSec mt-1">A &lt;65% score indicates critical competency keyword gaps or passive duty phrasing.</p></div><div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs"><div class="p-3 rounded-lg bg-dark-surface border border-dark-border"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Step 01</span><p class="font-bold text-dark-textPri text-xs mt-0.5 mb-1">Inject Missing Keywords</p><p class="text-[11px] text-dark-textSec leading-relaxed">Click <em>Copy Keywords</em> in the Gaps card and embed required industry terms in skills and experiences.</p></div><div class="p-3 rounded-lg bg-dark-surface border border-dark-border"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Step 02</span><p class="font-bold text-dark-textPri text-xs mt-0.5 mb-1">Implement XYZ Formula</p><p class="text-[11px] text-dark-textSec leading-relaxed">Replace generic duty lines with Google XYZ framing. Ensure at least 3 bullet points feature hard % metrics.</p></div><div class="p-3 rounded-lg bg-dark-surface border border-dark-border"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Step 03</span><p class="font-bold text-dark-textPri text-xs mt-0.5 mb-1">Re-Screen Document</p><p class="text-[11px] text-dark-textSec leading-relaxed">Run a fresh diagnostic scan on Screenora to confirm your score enters the Shortlist Priority Tier 1 (&ge;80%).</p></div></div></div>',
      faqQ5: 'What is included in the 1-on-1 Consultation session with an HR practitioner?',
      faqA5: '<div class="space-y-3.5"><div class="p-3.5 bg-dark-well rounded-xl border border-dark-wellBorder flex flex-col sm:flex-row sm:items-center justify-between gap-2"><div><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Exclusive 1-on-1 Advisory</span><p class="text-xs sm:text-sm font-heading font-bold text-dark-textPri mt-0.5">45-Minute Live Mentoring (Google Meet / WhatsApp)</p><p class="text-[11px] text-dark-textSec">Led by Muhammad Faari Akbar (B.Sc. in Psychology & Talent Management Practitioner).</p></div><span class="text-[11px] font-mono text-brand-amber px-2.5 py-1 rounded bg-brand-amber/10 border border-brand-amber/30 whitespace-nowrap self-start sm:self-center font-semibold">In Preparation</span></div><div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs"><div class="p-3 rounded-lg bg-dark-surface border border-dark-border"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Module 01</span><p class="font-bold text-dark-textPri text-xs mt-0.5 mb-1">Line-by-Line CV Teardown</p><p class="text-[11px] text-dark-textSec leading-relaxed">Complete overhaul of every experience bullet into high-converting Google XYZ formula achievements.</p></div><div class="p-3 rounded-lg bg-dark-surface border border-dark-border"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Module 02</span><p class="font-bold text-dark-textPri text-xs mt-0.5 mb-1">LinkedIn Profile Optimization</p><p class="text-[11px] text-dark-textSec leading-relaxed">Headline and About section refinement optimized for inbound enterprise and tech talent recruiters.</p></div><div class="p-3 rounded-lg bg-dark-surface border border-dark-border"><span class="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">Module 03</span><p class="font-bold text-dark-textPri text-xs mt-0.5 mb-1">STAR Interview Simulation</p><p class="text-[11px] text-dark-textSec leading-relaxed">Tactical mock practice tackling high-stakes behavioral questions that commonly filter out applicants.</p></div></div></div>',
      homeFaqQ4: 'What is the difference between Free and Paid (Rp 25,000) features?',
      homeFaqA4: 'CV screening, ATS score checking, 2-CV comparison, and basic templates on Screenora are completely Free. The Rp 25,000 fee only applies to downloading ready-to-edit document files for Pro Templates or exporting .doc from the Live CV Builder.',

      // Modals
      qrisModalBadge: 'COMING SOON • UNDER PREPARATION',
      qrisModalTitle: '10-Page Diagnostic Report & ATS Format (Coming Soon)',
      qrisModalSubtitle: 'The comprehensive diagnostic report generator and official payment integration are currently being prepared by Faari.',
      qrisFreeNoticeHead: '100% Free for CV Screening',
      qrisFreeNoticeBody: 'All score scanning, competency keyword detection, XYZ formula enhancement, and STAR practice questions on Screenora are currently <strong>100% Free</strong> to use.',
      qrisUpcomingTitle: 'Upcoming Roadmap Features:',
      qrisUpcoming1: 'In-depth line-by-line rewrite of every work experience bullet using the XYZ formula.',
      qrisUpcoming2: 'Complete checklist of 25+ industry-specific ATS keywords.',
      qrisUpcoming3: 'Downloadable native Word (.docx) ATS-compliant resume templates.',
      qrisFeedbackBtn: 'Send Feedback via Email',
      qrisCreatorContact: 'Creator Contact: faarimuhammad25@gmail.com',

      consultModalBadge: 'DISCUSSION, FEEDBACK & CONSULTATION • COMING SOON',
      consultModalTitle: 'Career Discussion, Feedback & Mentoring',
      consultModalSubtitle: 'Private 1-on-1 mentoring sessions are currently in development. Screenora is 100% Free to use. For questions, discussion, or feedback, email Faari directly!',
      consultStatusLabel: 'Screenora Access Status',
      consultStatusValue: '100% Free',
      consultStatusBadge: 'Mentoring Coming Soon',
      consultSectionQ: 'Have Questions, Suggestions, or Feedback?',
      consultSectionDesc: 'Faari (Screenora creator) warmly welcomes feedback, constructive criticism, new feature ideas, or questions about your resume evaluation. Reach out directly via email or WhatsApp.',
      consultEmailBtn: 'Send Email to faarimuhammad25@gmail.com',
      consultWhatsAppBtnText: 'Quick Chat via WhatsApp',

      // Footer
      legalDisclaimer: 'Screenora is an independent career diagnostic simulation based on heuristic algorithms, not affiliated with or guaranteeing job offers at any specific company.',
      footerInquiry: 'Inquiries & Feedback:',

      // Toast Notifications & Tiers
      toastCopied: 'Optimized sentence copied to clipboard!',
      toastSampleLoaded: 'Candidate sample profile loaded successfully!',
      toastNoText: 'Please upload a CV file or paste your resume text first.',
      toastAnalyzing: 'Scanning resume text and evaluating competency matrix...',
      toastTemplateLoaded: 'Custom role template loaded successfully!',
      toastKeywordsCopied: 'Qualification gap keywords copied to clipboard!',
      tier1Label: 'High Match (≥80%)',
      tier2Label: 'Moderate Match (65-79%)',
      tier3Label: 'Needs Optimization (<65%)',
      tier1Badge: 'High Qualification • Shortlist Priority',
      tier2Badge: 'Moderate Match • Candidate Pool',
      tier3Badge: 'Optimization Needed • ATS Risk',

      // P1 Compare 2 CVs Mode
      modeSingleBtn: 'Single Screening',
      modeCompareBtn: 'Compare 2 CVs',
      comparePanelTitle: 'Compare 2 CVs (Head-to-Head)',
      comparePanelSub: 'Objectively compare two candidates for the exact same role side-by-side.',
      compareCandidateA: 'Candidate A',
      compareCandidateB: 'Candidate B',
      compareClearBtn: 'Clear',
      runCompareBtn: 'Compare Both CVs',
      compareResultsTitle: 'Head-to-Head Comparison Results',
      backFromCompareBtn: 'Back to Compare Input',
      compareVerdictLabel: 'Winner Summary & Recruiter Verdict',
      compareKeywordsHead: 'Strengths & Matched Keywords',
      compareBulletsHead: 'Strong vs Weak Bullets',
      compareGapsHead: 'Key Gaps',
      compareUploadPrompt: 'Upload PDF / DOCX / TXT',
      compareToastNeedBoth: 'Please upload or paste both CV texts (Candidate A & B, min. 40 characters).',

      // Feedback Section
      feedbackTitle: 'Feedback & Suggestions Box',
      feedbackSubtitle: 'Have a feature idea, bug report, or suggestion for Screenora? Send it directly to the creator.',
      feedbackNameLabel: 'Name / Role (Optional)',
      feedbackNamePh: 'Your Name / Role (optional)',
      feedbackCategoryLabel: 'Category',
      feedbackCatFeature: 'Feature Suggestion',
      feedbackCatBug: 'Bug Report',
      feedbackCatUi: 'UI / Layout',
      feedbackCatAccuracy: 'Score & Rewrite Accuracy',
      feedbackMsgLabel: 'Message / Feedback',
      feedbackMsgPh: 'Share your feedback, suggestions, or issues you encountered in Screenora...',
      sendFeedbackEmailBtn: 'Send via Email',
      sendFeedbackWaBtn: 'Send via WhatsApp',
      feedbackEmptyWarn: 'Please write your feedback message first.',
      feedbackSentToast: 'Thank you! Your feedback is ready to send.'
    }
  };

  // --------------------------------------------------------------------------
  // 3. ARCHETYPE TEMPLATES (FOR 1-CLICK CUSTOM ROLE BUILDER)
  // --------------------------------------------------------------------------
  const ARCHETYPE_TEMPLATES = {
    growth: {
      title: {
        id: 'Spesialis Growth Marketing & Revenue',
        en: 'Growth Marketing & Revenue Specialist'
      },
      keywords: {
        id: 'Growth Hacking, CAC, LTV, Performance Marketing, Meta Ads, Google Ads, SEO, Funnel Optimization, A/B Testing, ROI, Retensi, Tingkat Konversi',
        en: 'Growth Hacking, CAC, LTV, Performance Marketing, Meta Ads, Google Ads, SEO, Funnel Optimization, A/B Testing, ROI, Retention, Conversion Rate'
      },
      seniority: 'mid'
    },
    tech: {
      title: {
        id: 'Senior Software & Cloud Systems Engineer',
        en: 'Senior Software & Cloud Systems Engineer'
      },
      keywords: {
        id: 'Arsitektur Sistem, Clean Code, CI/CD, Microservices, RESTful API, Docker, Kubernetes, PostgreSQL, Skalabilitas, Pengujian Otomatis, Cloud AWS, GCP',
        en: 'Architecture, Clean Code, CI/CD, Microservices, API Design, Docker, Kubernetes, PostgreSQL, Scalability, Automated Testing, Cloud AWS, GCP'
      },
      seniority: 'senior'
    },
    ops: {
      title: {
        id: 'Operasional SDM & Pengembangan Organisasi',
        en: 'People Operations & Organization Development'
      },
      keywords: {
        id: 'Employee Engagement, People Analytics, Manajemen Kinerja, SOP, OKR, Retensi Talenta, Onboarding, Manajemen Perubahan, HRIS, Budaya Kerja',
        en: 'Employee Engagement, People Analytics, Performance Management, SOP, OKR, Talent Retention, Onboarding, Change Management, HRIS, Culture'
      },
      seniority: 'mid'
    },
    research: {
      title: {
        id: 'Riset Kuantitatif & Analis Strategis',
        en: 'Quantitative Research & Strategic Analyst'
      },
      keywords: {
        id: 'Analisis Statistik, Python, SQL, Uji Hipotesis, Desain Survei, Visualisasi Data, Ukuran Pasar, Pemodelan Perilaku, Wawasan Data, Metodologi',
        en: 'Statistical Analysis, Python, SQL, Hypothesis Testing, Survey Design, Data Visualization, Market Sizing, Behavioral Modeling, Insights, Methodology'
      },
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
    customJobDescInput: document.getElementById('customJobDescInput'),
    extractJdKeywordsBtn: document.getElementById('extractJdKeywordsBtn'),
    customSeniorityPills: document.querySelectorAll('#customSeniorityPills .seniority-pill'),

    // Action & Result Elements
    runAnalysisBtn: document.getElementById('runAnalysisBtn'),
    btnIcon: document.getElementById('btnIcon'),
    btnLabel: document.getElementById('btnLabel'),
    inputView: document.getElementById('inputView'),
    skeletonLoadingView: document.getElementById('skeletonLoadingView'),
    resultsView: document.getElementById('resultsView'),
    backToInputBtn: document.getElementById('backToInputBtn'),
    exportPdfBtn: document.getElementById('exportPdfBtn'),
    copySummaryBtn: document.getElementById('copySummaryBtn'),
    sendToBuilderBtn: document.getElementById('sendToBuilderBtn'),
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
    rewriteDiagnosisTxt: document.getElementById('rewriteDiagnosisTxt'),
    cvScanDetectionBadge: document.getElementById('cvScanDetectionBadge'),
    secondaryRewritesContainer: document.getElementById('secondaryRewritesContainer'),
    secondaryRewritesHeading: document.getElementById('secondaryRewritesHeading'),
    secondaryRewritesCount: document.getElementById('secondaryRewritesCount'),
    secondaryRewritesList: document.getElementById('secondaryRewritesList'),
    starQuestionTxt: document.getElementById('starQuestionTxt'),

    // Modals
    qrisModalOverlay: document.getElementById('qrisModalOverlay'),
    closeQrisModalBtn: document.getElementById('closeQrisModalBtn'),
    consultModalOverlay: document.getElementById('consultModalOverlay'),
    closeConsultModalBtn: document.getElementById('closeConsultModalBtn'),
    openProModalBtn: document.getElementById('openProModalBtn'),
    openConsultModalBtn: document.getElementById('openConsultModalBtn'),
    openConsultModalBtn2: document.getElementById('openConsultModalBtn2'),
    consultWhatsAppBtn: document.getElementById('consultWhatsAppBtn'),
    copyMissingKeywordsBtn: document.getElementById('copyMissingKeywordsBtn'),

    // Toast
    toast: document.getElementById('toast'),
    toastMsg: document.getElementById('toastMsg'),

    // P1 Compare 2 CVs Mode Elements
    modeSingleBtn: document.getElementById('modeSingleBtn'),
    modeCompareBtn: document.getElementById('modeCompareBtn'),
    singleInputPanel: document.getElementById('singleInputPanel'),
    singleActionBar: document.getElementById('singleActionBar'),
    compareInputPanel: document.getElementById('compareInputPanel'),
    compareFileA: document.getElementById('compareFileA'),
    compareFileB: document.getElementById('compareFileB'),
    compareFileNameA: document.getElementById('compareFileNameA'),
    compareFileNameB: document.getElementById('compareFileNameB'),
    compareTextA: document.getElementById('compareTextA'),
    compareTextB: document.getElementById('compareTextB'),
    compareClearA: document.getElementById('compareClearA'),
    compareClearB: document.getElementById('compareClearB'),
    runCompareBtn: document.getElementById('runCompareBtn'),
    compareResultsView: document.getElementById('compareResultsView'),
    compareVerdictBadge: document.getElementById('compareVerdictBadge'),
    compareVerdictText: document.getElementById('compareVerdictText'),
    compareScoreA: document.getElementById('compareScoreA'),
    compareScoreB: document.getElementById('compareScoreB'),
    compareTierA: document.getElementById('compareTierA'),
    compareTierB: document.getElementById('compareTierB'),
    compareKeywordsA: document.getElementById('compareKeywordsA'),
    compareKeywordsB: document.getElementById('compareKeywordsB'),
    compareBulletsA: document.getElementById('compareBulletsA'),
    compareBulletsB: document.getElementById('compareBulletsB'),
    compareGapsA: document.getElementById('compareGapsA'),
    compareGapsB: document.getElementById('compareGapsB'),
    backFromCompareBtn: document.getElementById('backFromCompareBtn'),

    // Feedback Section Elements
    feedbackName: document.getElementById('feedbackName'),
    feedbackCategory: document.getElementById('feedbackCategory'),
    feedbackMessage: document.getElementById('feedbackMessage'),
    sendFeedbackEmailBtn: document.getElementById('sendFeedbackEmailBtn'),
    sendFeedbackWaBtn: document.getElementById('sendFeedbackWaBtn')
  };

  // --------------------------------------------------------------------------
  // 6. THEME MANAGEMENT
  // --------------------------------------------------------------------------
  function getTierPalette(tier, isDark) {
    if (tier === 1) {
      return {
        color: isDark ? '#10B981' : '#047857',
        border: isDark ? 'rgba(16, 185, 129, 0.40)' : '#A7F3D0',
        bg: isDark ? 'rgba(16, 185, 129, 0.12)' : '#ECFDF5',
        scoreColor: isDark ? '#10B981' : '#047857'
      };
    } else if (tier === 2) {
      return {
        color: isDark ? '#F59E0B' : '#B45309',
        border: isDark ? 'rgba(245, 158, 11, 0.40)' : '#FDE68A',
        bg: isDark ? 'rgba(245, 158, 11, 0.12)' : '#FFFBEB',
        scoreColor: isDark ? '#F59E0B' : '#D97706'
      };
    } else {
      return {
        color: isDark ? '#EF4444' : '#DC2626',
        border: isDark ? 'rgba(239, 68, 68, 0.40)' : '#FECACA',
        bg: isDark ? 'rgba(239, 68, 68, 0.12)' : '#FFF5F5',
        scoreColor: isDark ? '#EF4444' : '#DC2626'
      };
    }
  }

  function applyTheme(theme) {
    state.theme = theme;
    localStorage.setItem('screenora_theme', theme);
    const isDark = theme === 'dark';
    if (isDark) {
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

    if (state.currentAnalysis && DOM.scoreNumber) {
      const palette = getTierPalette(state.currentAnalysis.tier, isDark);
      DOM.scoreNumber.style.setProperty('color', palette.scoreColor, 'important');
      if (DOM.progressBarFill) DOM.progressBarFill.style.setProperty('background-color', palette.scoreColor, 'important');
      if (DOM.scoreTierLabel) DOM.scoreTierLabel.style.setProperty('color', palette.color, 'important');
      if (DOM.tierBadgePill) {
        DOM.tierBadgePill.style.setProperty('color', palette.color, 'important');
        DOM.tierBadgePill.style.setProperty('border-color', palette.border, 'important');
        DOM.tierBadgePill.style.setProperty('background-color', palette.bg, 'important');
      }
    }
  }

  function toggleTheme() {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
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
  // 7. LANGUAGE (i18n) MANAGEMENT
  // --------------------------------------------------------------------------
  function renderRoleSelectOptions(lang) {
    if (!DOM.roleSelect) return;
    const currentVal = DOM.roleSelect.value || state.selectedRole || 'hr';

    const groups = [];
    const groupMap = new Map();

    for (const [key, cfg] of Object.entries(ROLE_CONFIGS)) {
      const catLabel = cfg.category ? (cfg.category[lang] || cfg.category.id) : 'Other';
      if (!groupMap.has(catLabel)) {
        const groupObj = { label: catLabel, options: [] };
        groupMap.set(catLabel, groupObj);
        groups.push(groupObj);
      }
      const roleName = cfg.name ? (cfg.name[lang] || cfg.name.id) : key;
      groupMap.get(catLabel).options.push({ value: key, text: roleName });
    }

    let html = '';
    groups.forEach(g => {
      html += `<optgroup label="── ${escapeHtml(g.label)} ──">`;
      g.options.forEach(opt => {
        const sel = opt.value === currentVal ? ' selected' : '';
        html += `<option value="${escapeHtml(opt.value)}"${sel}>${escapeHtml(opt.text)}</option>`;
      });
      html += `</optgroup>`;
    });

    const customLabel = lang === 'id'
      ? 'Kustom: Tentukan Posisi & Kriteria Mandiri...'
      : 'Custom: Define Your Own Role & Criteria...';
    const customGroupLabel = lang === 'id' ? 'Posisi Khusus / Lainnya' : 'Custom / Other Roles';
    const customSel = currentVal === 'custom' ? ' selected' : '';
    html += `<optgroup label="── ${customGroupLabel} ──">
      <option value="custom"${customSel}>${customLabel}</option>
    </optgroup>`;

    DOM.roleSelect.innerHTML = html;
    DOM.roleSelect.value = currentVal;
  }

  function updateStandardUI(lang) {
    if (!DOM.standardBadge || !DOM.standardDescriptionTxt) return;
    if (state.screeningStandard === 'id') {
      DOM.standardBadge.textContent = lang === 'id' ? 'ID • Standar Nasional (Indonesia)' : 'ID • National Standard (Indonesia)';
      DOM.standardDescriptionTxt.textContent = lang === 'id'
        ? 'Mengevaluasi format 1-kolom Indonesia, EYD/PUEBI, sertifikasi nasional, dan kualifikasi lokal.'
        : 'Evaluates Indonesian 1-column standard, EYD/PUEBI conventions, national certifications, and local requirements.';
    } else {
      DOM.standardBadge.textContent = lang === 'id' ? 'Global • Standar Internasional (MNC)' : 'Global • International Standard (MNC)';
      DOM.standardDescriptionTxt.textContent = lang === 'id'
        ? 'Mengevaluasi kepatuhan ketat US/Global (tanpa foto/usia/status demi anti-bias EEOC), action verbs bahasa Inggris, dan sistem Workday/Greenhouse.'
        : 'Evaluates strict US/Global compliance (no photo/age/status for EEOC anti-bias), English action verbs, and Workday/Greenhouse ATS systems.';
    }
  }

  function applyLanguage(lang) {
    state.language = lang;
    localStorage.setItem('screenora_lang', lang);
    document.documentElement.lang = lang;

    if (lang === 'id') {
      if (DOM.langIdBtn) DOM.langIdBtn.className = 'px-2.5 py-1 rounded-md transition-all whitespace-nowrap bg-dark-surface dark:bg-dark-surface text-dark-textPri dark:text-dark-textPri shadow-sm font-semibold';
      if (DOM.langEnBtn) DOM.langEnBtn.className = 'px-2.5 py-1 rounded-md transition-all whitespace-nowrap text-dark-textSec dark:text-dark-textSec hover:text-dark-textPri font-medium';
    } else {
      if (DOM.langEnBtn) DOM.langEnBtn.className = 'px-2.5 py-1 rounded-md transition-all whitespace-nowrap bg-dark-surface dark:bg-dark-surface text-dark-textPri dark:text-dark-textPri shadow-sm font-semibold';
      if (DOM.langIdBtn) DOM.langIdBtn.className = 'px-2.5 py-1 rounded-md transition-all whitespace-nowrap text-dark-textSec dark:text-dark-textSec hover:text-dark-textPri font-medium';
    }

    const dict = i18n[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (dict[key].includes('<') && dict[key].includes('>')) {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.placeholder = dict[key];
      }
    });

    // Update input placeholders
    if (DOM.rawCvText && dict.rawCvPlaceholder) {
      DOM.rawCvText.placeholder = dict.rawCvPlaceholder;
    }
    if (DOM.customRoleTitleInput && dict.customRoleTitlePlaceholder) {
      DOM.customRoleTitleInput.placeholder = dict.customRoleTitlePlaceholder;
    }
    if (DOM.customRoleKeywordsInput && dict.customKeywordsPlaceholder) {
      DOM.customRoleKeywordsInput.placeholder = dict.customKeywordsPlaceholder;
    }
    if (DOM.customJobDescInput && dict.customJobDescPh) {
      DOM.customJobDescInput.placeholder = dict.customJobDescPh;
    }
    if (DOM.compareFileNameA && !state.compareFileA) {
      DOM.compareFileNameA.textContent = dict.compareUploadPrompt;
    }
    if (DOM.compareFileNameB && !state.compareFileB) {
      DOM.compareFileNameB.textContent = dict.compareUploadPrompt;
    }

    // Update dynamic options and UI components
    renderRoleSelectOptions(lang);
    updateStandardUI(lang);
    updateRoleDetails(state.selectedRole);
    updateSeniorityPillsUI(state.customSeniority);

    if (state.currentAnalysis) {
      const text = state.cvText || (DOM.rawCvText ? DOM.rawCvText.value.trim() : '');
      if (text) {
        state.currentAnalysis = analyzeResume(text, state.selectedRole);
        renderAnalysisResults(state.currentAnalysis);
      }
    }

    if (state.currentComparison && DOM.compareResultsView && !DOM.compareResultsView.classList.contains('hidden')) {
      const textA = DOM.compareTextA ? DOM.compareTextA.value.trim() : '';
      const textB = DOM.compareTextB ? DOM.compareTextB.value.trim() : '';
      if (textA.length >= 40 && textB.length >= 40) {
        state.currentComparison = {
          ...state.currentComparison,
          resA: analyzeResume(textA, state.selectedRole),
          resB: analyzeResume(textB, state.selectedRole),
          roleKey: state.selectedRole
        };
        renderComparisonResults(state.currentComparison);
      }
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
      if (DOM.tabUploadBtn) DOM.tabUploadBtn.className = 'px-2.5 py-1 rounded whitespace-nowrap bg-dark-surface dark:bg-dark-surface text-dark-textPri font-medium shadow-sm transition-all';
      if (DOM.tabPasteBtn) DOM.tabPasteBtn.className = 'px-2.5 py-1 rounded whitespace-nowrap text-dark-textSec hover:text-dark-textPri transition-all';
      if (DOM.dropzoneContainer) DOM.dropzoneContainer.classList.remove('hidden');
      if (DOM.pasteContainer) DOM.pasteContainer.classList.add('hidden');
    } else {
      if (DOM.tabPasteBtn) DOM.tabPasteBtn.className = 'px-2.5 py-1 rounded whitespace-nowrap bg-dark-surface dark:bg-dark-surface text-dark-textPri font-medium shadow-sm transition-all';
      if (DOM.tabUploadBtn) DOM.tabUploadBtn.className = 'px-2.5 py-1 rounded whitespace-nowrap text-dark-textSec hover:text-dark-textPri transition-all';
      if (DOM.dropzoneContainer) DOM.dropzoneContainer.classList.add('hidden');
      if (DOM.pasteContainer) DOM.pasteContainer.classList.remove('hidden');
      if (DOM.rawCvText) DOM.rawCvText.focus();
    }
  }

  // --------------------------------------------------------------------------
  // 10. CLIENT-SIDE FILE EXTRACTION (PDF / DOCX / TXT)
  // --------------------------------------------------------------------------
  async function extractTextFromFile(file) {
    if (!file) {
      throw new Error(state.language === 'id' ? 'Berkas tidak ditemukan.' : 'No file provided.');
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error(state.language === 'id' ? 'Ukuran file melebihi batas 5 MB.' : 'File size exceeds 5 MB limit.');
    }

    const fileExtension = file.name.split('.').pop().toLowerCase();
    const ALLOWED_EXTENSIONS = ['pdf', 'docx', 'txt'];
    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
      if (fileExtension === 'doc') {
        throw new Error(
          state.language === 'id'
            ? 'Format .doc lama tidak didukung. Simpan sebagai .docx/.pdf atau gunakan tab Tempel Teks.'
            : 'Legacy .doc format is not supported. Save as .docx/.pdf or use Paste Text.'
        );
      }
      throw new Error(
        state.language === 'id'
          ? 'Format berkas tidak diizinkan. Gunakan hanya PDF, DOCX, atau TXT.'
          : 'Unsupported file format. Only PDF, DOCX, or TXT files are allowed.'
      );
    }

    const MAX_PDF_PAGES = 25;
    const MAX_DOCX_XML_BYTES = 2 * 1024 * 1024;
    const MAX_CV_CHARS = 100000;
    let extractedText = '';

    if (fileExtension === 'pdf') {
      if (!window.pdfjsLib) {
        throw new Error('PDF.js engine is not ready.');
      }
      if (!window.pdfjsLib.GlobalWorkerOptions.workerSrc) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      }
      const arrayBuffer = await file.arrayBuffer();
      let pdf;
      try {
        pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer, isEvalSupported: false }).promise;
      } catch (_workerErr) {
        // Fallback to in-thread parsing if browser/CSP/adblocker blocks cross-origin PDF worker
        pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer, disableWorker: true, isEvalSupported: false }).promise;
      }
      const pageLimit = Math.min(pdf.numPages, MAX_PDF_PAGES);
      const pages = [];
      const BATCH_SIZE = 5;

      for (let start = 1; start <= pageLimit; start += BATCH_SIZE) {
        const end = Math.min(start + BATCH_SIZE - 1, pageLimit);
        const batchPromises = [];
        for (let pageNum = start; pageNum <= end; pageNum++) {
          batchPromises.push(
            pdf.getPage(pageNum).then(page =>
              page.getTextContent().then(content => {
                const lines = [];
                let currentLine = [];
                let lastY = null;

                for (const item of content.items) {
                  const y = Array.isArray(item.transform) ? item.transform[5] : null;
                  const yChanged = lastY !== null && y !== null && Math.abs(y - lastY) > 3;

                  if (yChanged && currentLine.length > 0) {
                    lines.push(currentLine.join(' ').replace(/\s+/g, ' ').trim());
                    currentLine = [];
                  }

                  if (item.str) {
                    currentLine.push(item.str);
                  }

                  if (item.hasEOL && currentLine.length > 0) {
                    lines.push(currentLine.join(' ').replace(/\s+/g, ' ').trim());
                    currentLine = [];
                    lastY = null;
                  } else if (y !== null) {
                    lastY = y;
                  }
                }

                if (currentLine.length > 0) {
                  lines.push(currentLine.join(' ').replace(/\s+/g, ' ').trim());
                }

                return lines.filter(Boolean).join('\n');
              })
            )
          );
        }
        const batchResults = await Promise.all(batchPromises);
        pages.push(...batchResults);
      }

      extractedText = pages.join('\n\n');
    } else if (fileExtension === 'docx') {
      if (!window.JSZip) {
        throw new Error('DOCX parser engine is not ready.');
      }
      const arrayBuffer = await file.arrayBuffer();
      const zip = await window.JSZip.loadAsync(arrayBuffer);
      const docXmlFile = zip.file('word/document.xml');
      if (!docXmlFile) {
        throw new Error('Invalid DOCX structure: word/document.xml not found.');
      }
      const xmlStr = await new Promise((resolve, reject) => {
        const chunks = [];
        let totalBytes = 0;
        let settled = false;
        const stream = docXmlFile.internalStream('uint8array');
        stream
          .on('data', (chunk) => {
            if (settled) return;
            totalBytes += chunk.byteLength;
            if (totalBytes > MAX_DOCX_XML_BYTES) {
              settled = true;
              try { if (typeof stream.pause === 'function') stream.pause(); } catch (_) {}
              reject(new Error('DOCX content exceeds safe size limit.'));
              return;
            }
            chunks.push(chunk);
          })
          .on('error', (err) => {
            if (!settled) {
              settled = true;
              reject(err);
            }
          })
          .on('end', () => {
            if (settled) return;
            settled = true;
            const merged = new Uint8Array(totalBytes);
            let offset = 0;
            for (const c of chunks) {
              merged.set(c, offset);
              offset += c.byteLength;
            }
            resolve(new TextDecoder('utf-8').decode(merged));
          });
        stream.resume();
      });
      if (xmlStr.length > MAX_DOCX_XML_BYTES) {
        throw new Error('DOCX content exceeds safe size limit.');
      }
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlStr, 'application/xml');
      if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
        throw new Error('Malformed DOCX XML content.');
      }
      const paragraphs = Array.from(xmlDoc.getElementsByTagName('w:p'));
      const lines = paragraphs
        .map(p =>
          Array.from(p.getElementsByTagName('w:t'))
            .map(node => node.textContent || '')
            .join('')
            .trim()
        )
        .filter(Boolean);
      extractedText = lines.join('\n');
    } else {
      extractedText = await file.text();
    }

    if (extractedText.length > MAX_CV_CHARS) {
      extractedText = extractedText.slice(0, MAX_CV_CHARS);
    }

    if (!extractedText || extractedText.trim().length < 40) {
      throw new Error(
        state.language === 'id'
          ? 'Teks terlalu pendek atau file adalah gambar hasil scan.'
          : 'Extracted text is too short or file is a scanned image.'
      );
    }

    return extractedText;
  }

  async function processFile(file) {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast(state.language === 'id' ? 'Ukuran file melebihi batas 5 MB.' : 'File size exceeds 5 MB limit.');
      return;
    }

    DOM.fileNameTxt.textContent = file.name;
    DOM.fileMetaTxt.textContent = (file.size / (1024 * 1024)).toFixed(1) + ' MB • Mengekstrak teks...';
    DOM.filePreviewBadge.classList.remove('hidden');
    DOM.dropzone.classList.add('hidden');

    try {
      const extractedText = await extractTextFromFile(file);

      state.uploadedFile = file;
      state.cvText = extractedText;
      DOM.rawCvText.value = extractedText;
      DOM.fileMetaTxt.textContent = `${(file.size / (1024 * 1024)).toFixed(1)} MB • Teks terverifikasi (${extractedText.length} karakter)`;
      showToast(state.language === 'id' ? 'Berkas berhasil diproses dan diverifikasi.' : 'Document parsed and verified successfully.');

    } catch (err) {
      console.warn('File processing error:', err);
      const reason = err && err.message ? err.message : '';
      DOM.fileMetaTxt.textContent = reason
        ? `Peringatan: ${reason} Silakan gunakan tab Tempel Teks.`
        : 'Peringatan: Gagal ekstrak otomatis. Silakan gunakan tab Tempel Teks.';
      showToast(state.language === 'id' ? 'Gagal membaca PDF. Anda dapat menyalin teks langsung di tab Tempel.' : 'Could not parse PDF. Please paste text directly.');
    }
  }

  async function handleCompareFileUpload(slot, file) {
    if (!file) return;
    const isA = slot === 'A';
    const nameEl = isA ? DOM.compareFileNameA : DOM.compareFileNameB;
    const textEl = isA ? DOM.compareTextA : DOM.compareTextB;
    const fileInputEl = isA ? DOM.compareFileA : DOM.compareFileB;

    if (file.size > 5 * 1024 * 1024) {
      showToast(state.language === 'id' ? 'Ukuran file melebihi batas 5 MB.' : 'File size exceeds 5 MB limit.');
      if (fileInputEl) fileInputEl.value = '';
      return;
    }

    if (nameEl) {
      nameEl.textContent = state.language === 'id'
        ? `${file.name} (Mengekstrak...)`
        : `${file.name} (Extracting...)`;
    }

    try {
      const extractedText = await extractTextFromFile(file);
      if (isA) {
        state.compareFileA = file;
      } else {
        state.compareFileB = file;
      }
      if (textEl) textEl.value = extractedText;
      if (nameEl) nameEl.textContent = `${file.name} (${extractedText.length} ${state.language === 'id' ? 'karakter' : 'chars'})`;
      showToast(state.language === 'id' ? `Berkas Kandidat ${slot} berhasil diproses.` : `Candidate ${slot} document parsed successfully.`);
    } catch (err) {
      console.warn(`Compare file ${slot} error:`, err);
      if (nameEl) {
        nameEl.textContent = state.language === 'id' ? 'Gagal ekstrak — tempel teks manual' : 'Extraction failed — paste text manually';
      }
      showToast(err && err.message ? err.message : (state.language === 'id' ? 'Gagal membaca berkas. Silakan tempel teks.' : 'Could not parse file. Please paste text.'));
    }
  }

  function clearCompareSlot(slot) {
    const isA = slot === 'A';
    const defaultPrompt = state.language === 'id' ? 'Unggah PDF / DOCX / TXT' : 'Upload PDF / DOCX / TXT';
    if (isA) {
      state.compareFileA = null;
      if (DOM.compareFileA) DOM.compareFileA.value = '';
      if (DOM.compareFileNameA) DOM.compareFileNameA.textContent = defaultPrompt;
      if (DOM.compareTextA) DOM.compareTextA.value = '';
    } else {
      state.compareFileB = null;
      if (DOM.compareFileB) DOM.compareFileB.value = '';
      if (DOM.compareFileNameB) DOM.compareFileNameB.textContent = defaultPrompt;
      if (DOM.compareTextB) DOM.compareTextB.value = '';
    }
  }

  function clearUploadedFile() {
    state.uploadedFile = null;
    state.cvText = '';
    if (DOM.rawCvText) DOM.rawCvText.value = '';
    if (DOM.cvFileInput) DOM.cvFileInput.value = '';
    if (DOM.filePreviewBadge) DOM.filePreviewBadge.classList.add('hidden');
    if (DOM.dropzone) DOM.dropzone.classList.remove('hidden');
    clearSessionState();
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
          ${escapeHtml(kw)}
        </span>
      `).join('');
    }
  }

  function applyArchetypeTemplate(templateKey) {
    const tpl = ARCHETYPE_TEMPLATES[templateKey];
    if (!tpl) return;
    const lang = state.language || 'id';

    const titleVal = typeof tpl.title === 'object' ? (tpl.title[lang] || tpl.title.id) : tpl.title;
    const keywordsVal = typeof tpl.keywords === 'object' ? (tpl.keywords[lang] || tpl.keywords.id) : tpl.keywords;

    if (DOM.customRoleTitleInput) DOM.customRoleTitleInput.value = titleVal;
    if (DOM.customRoleKeywordsInput) DOM.customRoleKeywordsInput.value = keywordsVal;
    
    // Set Seniority
    state.customSeniority = tpl.seniority;
    updateSeniorityPillsUI(tpl.seniority);

    showToast(lang === 'id' ? 'Template posisi kustom berhasil dimuat!' : 'Custom role template loaded successfully!');
  }

    // --------------------------------------------------------------------------
  // CV TEXT DEEP PARSER: STRONG/WEAK SENTENCES & GOOGLE XYZ REWRITES
  // --------------------------------------------------------------------------
  function cleanCopyableSentence(text) {
    return String(text || '')
      .trim()
      .replace(/^["'“”‘’\s]+|["'“”‘’\s]+$/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  async function copyTextToClipboard(rawText, triggerBtn, lang) {
    const rawStr = String(rawText || '');
    const isMultiLine = rawStr.includes('\n') && rawStr.split('\n').length > 2;
    const textToCopy = isMultiLine ? rawStr.trim() : cleanCopyableSentence(rawStr);
    if (!textToCopy) return;

    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
        copied = true;
      }
    } catch (_) {
      copied = false;
    }

    if (!copied) {
      const ta = document.createElement('textarea');
      ta.value = textToCopy;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '-9999px';
      ta.style.left = '-9999px';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        copied = document.execCommand('copy');
      } catch (_) {
        copied = false;
      }
      document.body.removeChild(ta);
    }

    if (copied) {
      const isSummary = triggerBtn && DOM.copySummaryBtn && triggerBtn === DOM.copySummaryBtn;
      showToast(
        isSummary
          ? (lang === 'id' ? 'Ringkasan evaluasi ATS berhasil disalin ke clipboard!' : 'ATS evaluation summary copied to clipboard!')
          : (lang === 'id' ? 'Kalimat rekomendasi berhasil disalin ke clipboard!' : 'Recommended sentence copied to clipboard!')
      );
      if (triggerBtn) {
        const labelEl = triggerBtn.querySelector('span');
        if (labelEl) {
          if (!triggerBtn.dataset.origLabel) {
            triggerBtn.dataset.origLabel = labelEl.textContent;
          }
          labelEl.textContent = lang === 'id' ? '✓ Tersalin' : '✓ Copied';
          clearTimeout(triggerBtn._copyTimer);
          triggerBtn._copyTimer = setTimeout(() => {
            labelEl.textContent = triggerBtn.dataset.origLabel;
          }, 1800);
        }
      }
    } else {
      showToast(lang === 'id' ? 'Gagal menyalin teks secara otomatis.' : 'Failed to copy text automatically.');
    }
  }

  function formatExecutiveSummary(res, lang) {
    if (!res) return '';
    const isId = lang === 'id';
    const stdLabel = res.screeningStandard === 'global'
      ? (isId ? 'Global • Internasional (MNC)' : 'Global • International (MNC)')
      : (isId ? 'ID • Nasional (BUMN/Lokal)' : 'ID • National (Local)');

    const strengths = (res.strengths || []).slice(0, 4).map((s, i) => `${i + 1}. ${s}`).join('\n');
    const gaps = (res.gaps || []).map((g, i) => `${i + 1}. ${g}`).join('\n');
    const xyzRewrite = cleanCopyableSentence(res.afterRewrite || '');
    const starQ = cleanCopyableSentence(res.starQuestion || '');

    if (isId) {
      return [
        'RINGKASAN EVALUASI ATS — SCREENORA',
        '====================================',
        `Posisi Target  : ${res.roleTitle || '-'}`,
        `Standar Pasar  : ${stdLabel}`,
        `Skor ATS       : ${res.score}% (${res.tierName || '-'})`,
        `Status         : ${res.tierBadge || '-'}`,
        '',
        'KEKUATAN KOMPETENSI:',
        strengths || '-',
        '',
        'CELAH UTAMA & FILTER ATS:',
        gaps || '-',
        '',
        'REKOMENDASI FORMULA XYZ:',
        xyzRewrite || '-',
        '',
        'PERTANYAAN WAWANCARA (STAR):',
        starQ || '-'
      ].join('\n');
    }

    return [
      'ATS EVALUATION SUMMARY — SCREENORA',
      '===================================',
      `Target Role    : ${res.roleTitle || '-'}`,
      `Market Std     : ${stdLabel}`,
      `ATS Score      : ${res.score}% (${res.tierName || '-'})`,
      `Decision Tier  : ${res.tierBadge || '-'}`,
      '',
      'VERIFIED STRENGTHS:',
      strengths || '-',
      '',
      'PRIMARY ATS GAPS:',
      gaps || '-',
      '',
      'RECOMMENDED XYZ FORMULA:',
      xyzRewrite || '-',
      '',
      'STAR INTERVIEW QUESTION:',
      starQ || '-'
    ].join('\n');
  }

  function extractCoreTopic(original) {
    let cleaned = String(original || '')
      .replace(/^[\s•\*\▪\▫\◦\-\–\—\d\.]+/, '')
      .replace(/^(saya\s+)?(bertanggung jawab (atas|dalam|untuk|terhadap)?|ditugaskan (untuk)?|dipercaya (untuk)?|membantu (tim\s+)?(dalam\s+)?|turut serta (dalam)?|mengikuti|mendukung|berpartisipasi (dalam)?|terlibat (dalam)?|bertugas (untuk)?|menghandle|menangani|berperan sebagai|responsible for|duties included|in charge of|assisted (in|with)?|helped (to|with)?|worked on|participated in|tasked with|involved in|supported|served as)\s+/i, '')
      .replace(/^(untuk|dalam|atas|dan|serta|juga|to|in|on|with|and|as well as)\s+/i, '')
      .replace(/[.\s]+$/, '')
      .trim();

    if (cleaned.length > 110) {
      cleaned = cleaned.slice(0, 107).replace(/\s+\S*$/, '').trim();
    }
    return cleaned;
  }

  function extractAndAnalyzeWeakSentences(rawText, roleKey, roleName, lang) {
    if (!rawText || rawText.trim().length < 40) return null;

    // Split by newlines or inline bullet symbols (without breaking hyphenated words like end-to-end)
    const rawLines = rawText
      .split(/\r?\n|\s+[•▪▫◦●]\s+/)
      .map(l => l.replace(/^\s*(?:[•\*\▪\▫\◦●\-\–\—]|\d+[\.\)])\s+/, '').trim())
      .filter(l => l.length > 0);

    const candidates = [];
    const minLen = 22;
    const maxLen = 300;

    // Reject headers, contacts, education degrees, and metadata
    const rejectRegex = /^(pengalaman|experience|pendidikan|education|keahlian|skills|summary|ringkasan|kontak|contact|profil|profile|curriculum vitae|resume|page\s*\d+|halaman\s*\d+|email|telepon|phone|linkedin|github|portfolio|alamat|domisili|tanggal lahir|status|hobby|hobi|lulusan|sarjana|diploma|bachelor|master|magister|alumni|mahasiswa|student|ipk|gpa)\b/i;
    const emailOrUrlRegex = /(@|https?:\/\/|www\.|\.com\b|\.id\b|\.net\b|\+62\s*\d|08\d{8,})/i;
    const dateRangeOnlyRegex = /^(\d{4}|\w{3,9}\s*\d{4})\s*[\-–—]\s*(\d{4}|\w{3,9}\s*\d{4}|present|sekarang)$/i;

    // Work/action verb signal to qualify as an experience bullet
    const verbSignalRegex = /(bertanggung|tanggung|ditugaskan|dipercaya|membantu|mengurus|melakukan|menjalankan|mengerjakan|ikut|bertugas|mengawasi|berpartisipasi|terlibat|mendukung|menghandle|menangani|membuat|mengembangkan|merancang|menganalisis|memimpin|mengelola|mengoptimalkan|meningkatkan|memangkas|mengotomatisasi|meluncurkan|menyusun|berkoordinasi|mengidentifikasi|mempersiapkan|menyiapkan|mengoperasikan|memproses|mencatat|menginput|melayani|responsible|assisted|helped|handled|worked|participated|tasked|supported|designed|developed|led|analyzed|managed|coordinated|executed|monitored|created|optimized|increased|reduced|spearheaded|orchestrated|architected|engineered|streamlined|launched|delivered|built)/i;

    for (const rawLine of rawLines) {
      const lineClean = rawLine.trim().replace(/^["'“”‘’]+|["'“”‘’]+$/g, '').trim();
      if (lineClean.length < minLen || lineClean.length > maxLen) continue;
      if (rejectRegex.test(lineClean)) continue;
      if (emailOrUrlRegex.test(lineClean)) continue;
      if (dateRangeOnlyRegex.test(lineClean)) continue;
      if (!verbSignalRegex.test(lineClean)) continue;

      candidates.push(lineClean);
    }

    if (candidates.length === 0) return null;

    const passiveStartersId = [
      'bertanggung jawab', 'tanggung jawab', 'ditugaskan', 'dipercaya', 'membantu', 'mengurus',
      'melakukan', 'menjalankan', 'mengerjakan', 'ikut serta', 'bertugas', 'mengawasi',
      'berpartisipasi', 'terlibat dalam', 'mendukung', 'menghandle', 'menangani', 'menerima',
      'membuat laporan', 'berkoordinasi', 'menyusun', 'menyiapkan', 'mencatat', 'menginput',
      'melayani', 'menjaga', 'berperan sebagai'
    ];
    const passiveStartersEn = [
      'responsible for', 'duties included', 'assisted in', 'assisted with', 'helped to',
      'helped with', 'handled', 'worked on', 'participated in', 'tasked with', 'involved in',
      'supported', 'responsible of', 'served as', 'in charge of', 'maintained'
    ];
    const strongActionStartersRegex = /^(memimpin|merancang|membangun|mengarsitekturi|mengoptimalkan|meningkatkan|memangkas|mereduksi|mengembangkan|menganalisis|mengotomatisasi|meluncurkan|mengeksekusi|mendigitalkan|menginisiasi|spearheaded|architected|orchestrated|engineered|accelerated|streamlined|formulated|implemented|optimized|delivered|scaled|designed|led|built|launched|automated|reduced|increased|drove)\b/i;

    const metricRegex = /\b\d+(?:[.,]\d+)?\s*(?:%|persen|x\b|kali\b)|(?:rp|idr|\$)\s*\d+(?:[.,]\d+)?\s*(?:rb|ribu|jt|juta|m|k|b)?\b|\b\d+(?:[.,]\d+)?\s*(?:rb|ribu|jt|juta)\b|\b\d+(?:\.\d+)?\/\d+\b|\b\d+\+?\s*(?:orang|kandidat|posisi|siswa|murid|klien|pelanggan|proyek|bulan|tahun|minggu|hari|jam|karyawan|user|pengguna|dokumen|laporan|tiket|teams?|clients?|projects?|users?|hours?|days?|weeks?|tickets?|roles?)\b/i;

    const strongSentences = [];
    const scoredWeak = [];

    for (const sent of candidates) {
      const lower = sent.toLowerCase();
      let weakScore = 0;
      let diagnosisKey = '';

      const hasStrongStarter = strongActionStartersRegex.test(lower);
      const matchedPassive = [...passiveStartersId, ...passiveStartersEn].filter(
        p => lower.startsWith(p) || lower.includes(' ' + p)
      );
      const hasPassiveStarter = matchedPassive.length > 0;
      const routineMatch = lower.match(/\b(administrasi|harian|rutin|operasional|dokumen|tugas|meeting|rapat|daily|routine|administrative)\b/i);

      const hasMetric = metricRegex.test(sent);

      if (hasStrongStarter && hasMetric && !hasPassiveStarter) {
        strongSentences.push(sent);
        continue;
      }

      if (hasPassiveStarter && !hasStrongStarter) {
        weakScore += 50;
        diagnosisKey = 'passive';
      } else if (!hasStrongStarter) {
        weakScore += 20;
      }

      if (!hasMetric) {
        weakScore += 35;
        if (!diagnosisKey) diagnosisKey = 'no_metric';
      }

      if (routineMatch) {
        weakScore += 15;
      }

      const weakPhrases = [...matchedPassive];
      if (routineMatch && !weakPhrases.includes(routineMatch[0])) {
        weakPhrases.push(routineMatch[0]);
      }

      if (weakScore >= 35) {
        scoredWeak.push({
          sentence: sent,
          weakScore,
          diagnosisKey: diagnosisKey || 'vague',
          hasMetric,
          hasStrongStarter,
          weakPhrases
        });
      } else if (hasMetric) {
        strongSentences.push(sent);
      }
    }

    if (scoredWeak.length === 0) {
      return {
        strongCount: strongSentences.length,
        weakCount: 0,
        strongSample: strongSentences[0] || null,
        primary: null,
        secondary: []
      };
    }

    // Sort by weakness descending
    scoredWeak.sort((a, b) => b.weakScore - a.weakScore);

    // Deduplicate near identical sentences
    const uniqueWeak = [];
    const seen = new Set();
    for (const item of scoredWeak) {
      const slug = item.sentence.toLowerCase().slice(0, 32);
      if (!seen.has(slug)) {
        seen.add(slug);
        uniqueWeak.push(item);
      }
    }

    const usedRewrites = new Set();
    const buildUniqueRewrite = (sent, idx) => {
      let candidate = generateTailoredXYZRewrite(sent, roleKey, roleName, lang, idx);
      if (usedRewrites.has(candidate)) {
        candidate = generateTailoredXYZRewrite(sent, roleKey, roleName, lang, idx + 10);
      }
      usedRewrites.add(candidate);
      return candidate;
    };

    const primaryItem = uniqueWeak[0];
    const secondaryItems = uniqueWeak.slice(1, 4);

    return {
      strongCount: strongSentences.length,
      weakCount: uniqueWeak.length,
      strongSample: strongSentences[0] || null,
      primary: {
        original: primaryItem.sentence,
        highlightedOriginal: formatHighlightedOriginal(primaryItem.sentence, primaryItem.weakPhrases),
        diagnosis: getDiagnosisText(primaryItem, lang),
        rewrite: buildUniqueRewrite(primaryItem.sentence, 0)
      },
      secondary: secondaryItems.map((item, idx) => ({
        original: item.sentence,
        highlightedOriginal: formatHighlightedOriginal(item.sentence, item.weakPhrases),
        diagnosis: getDiagnosisText(item, lang),
        rewrite: buildUniqueRewrite(item.sentence, idx + 1)
      }))
    };
  }

  function formatHighlightedOriginal(sentence, weakPhrases = []) {
    let html = escapeHtml(sentence);
    if (!weakPhrases || weakPhrases.length === 0) return html;

    // Sort longest first to avoid nested partial replacements
    const sorted = [...new Set(weakPhrases)].sort((a, b) => b.length - a.length).slice(0, 3);
    for (const phrase of sorted) {
      const escapedPhrase = escapeHtml(phrase).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escapedPhrase})`, 'i');
      html = html.replace(
        regex,
        '<span class="underline decoration-rose-500/80 decoration-2 underline-offset-4 font-semibold text-slate-950 dark:text-white">$1</span>'
      );
    }
    return html;
  }

  function getDiagnosisText(item, lang) {
    const phrases = (item && item.weakPhrases ? item.weakPhrases : []).slice(0, 2);
    const hasMetric = item ? item.hasMetric : false;
    const hasStrong = item ? item.hasStrongStarter : false;

    if (lang === 'id') {
      const issues = [];
      const fixes = [];

      if (phrases.length > 0) {
        const quoted = phrases.map(p => `"${escapeHtml(p)}"`).join(', ');
        issues.push(`frasa pasif/rutin (${quoted})`);
        fixes.push('ganti dengan kata kerja aksi aktif (mis. Memimpin, Merancang, Mengoptimalkan)');
      } else if (!hasStrong) {
        issues.push('awalan kalimat belum memakai kata kerja aktif yang kuat');
        fixes.push('awali langsung dengan verba aksi berdampak');
      }

      if (!hasMetric) {
        issues.push('belum ada angka metrik hasil');
        fixes.push('tambahkan %, jumlah orang/proyek, atau waktu yang dihemat');
      }

      if (issues.length === 0) {
        issues.push('narasi masih terlalu umum');
        fixes.push('perjelas skala tanggung jawab dan metode kerjanya');
      }

      return `<strong>Bagian Salah:</strong> ${issues.join(' &amp; ')}. <br class="sm:hidden"><strong>Harus Diperbaiki:</strong> ${fixes.join(', ')}.`;
    } else {
      const issues = [];
      const fixes = [];

      if (phrases.length > 0) {
        const quoted = phrases.map(p => `"${escapeHtml(p)}"`).join(', ');
        issues.push(`passive/routine phrasing (${quoted})`);
        fixes.push('replace with a strong action verb (e.g., Spearheaded, Designed, Optimized)');
      } else if (!hasStrong) {
        issues.push('missing a high-impact action verb opener');
        fixes.push('lead with an active ownership verb');
      }

      if (!hasMetric) {
        issues.push('no quantifiable impact metric');
        fixes.push('inject %, volume, or time/cost saved');
      }

      if (issues.length === 0) {
        issues.push('overly generic phrasing');
        fixes.push('specify execution scope and measurable outcome');
      }

      return `<strong>What's Wrong:</strong> ${issues.join(' &amp; ')}. <br class="sm:hidden"><strong>Fix Required:</strong> ${fixes.join(', ')}.`;
    }
  }

  function generateTailoredXYZRewrite(original, roleKey, roleName, lang, variantIndex = 0) {
    const raw = String(original || '').replace(/^[\s•\*\▪\▫\◦\-\–\—\d\.]+/, '').replace(/[.\s]+$/, '').trim();
    const lower = raw.toLowerCase();
    const coreTopic = extractCoreTopic(raw);
    const hasTopic = coreTopic.length >= 6;
    const isId = lang === 'id';

    // Detect if the candidate already included real numbers/metrics in their original bullet
    const hasOwnMetric = /(\d+%|\d+\+|Rp\s?\d+|\$\d+|\d+x|\d+\s?(hari|bulan|jam|minggu|tahun|poin|orang|kandidat|klien|siswa|murid|peserta|proyek|dokumen|laporan|karyawan|posisi|days|hours|weeks|months|years|points|users|clients|students|projects|reports|employees|roles))/i.test(raw);

    // Strip leading weak/generic verb from coreTopic and extract any user action verb to elevate
    let leadAction = '';
    let objectClause = coreTopic || raw;

    const idLeadingVerbRegex = /^(mengurus|melakukan|menjalankan|mengerjakan|menangani|menyiapkan|membuat|mencatat|menginput|mengelola|menyusun|mendampingi|mengajar|melatih|menganalisis|mengembangkan|merancang|mendesain|memantau|mengevaluasi|memperbaiki|mengawasi|berkoordinasi|melayani|menjaga|memasarkan|menjual)\s+(.+)$/i;
    const enLeadingVerbRegex = /^(handling|handled|managing|managed|creating|created|making|made|building|built|teaching|taught|mentoring|mentored|analyzing|analyzed|developing|developed|designing|designed|preparing|prepared|tracking|tracked|monitoring|monitored|coordinating|coordinated|fixing|fixed|resolving|resolved|updating|updated|supporting|supported)\s+(.+)$/i;

    if (isId) {
      const m = objectClause.match(idLeadingVerbRegex);
      if (m) {
        const v = m[1].toLowerCase();
        objectClause = m[2].trim();
        const idUpgradeMap = {
          mengurus: 'Mengelola dan menstandardisasi',
          melakukan: 'Mengeksekusi secara terukur',
          menjalankan: 'Mengeksekusi dan mengoptimalkan',
          mengerjakan: 'Menyelesaikan dan mengoptimalkan',
          menangani: 'Mengelola dan menyelesaikan',
          menyiapkan: 'Menyiapkan dan menyelaraskan',
          membuat: 'Merancang dan menyusun',
          mencatat: 'Mendigitalkan dan memvalidasi pencatatan',
          menginput: 'Mengelola dan memvalidasi input',
          mengelola: 'Mengelola dan menyederhanakan',
          menyusun: 'Menyusun dan menstandardisasi',
          mendampingi: 'Memfasilitasi pendampingan',
          mengajar: 'Merancang dan memfasilitasi pengajaran',
          melatih: 'Melatih dan mengevaluasi',
          menganalisis: 'Menganalisis dan memetakan',
          mengembangkan: 'Mengembangkan dan mengoptimalkan',
          merancang: 'Merancang dan mengimplementasikan',
          mendesain: 'Merancang dan memproduksi',
          memantau: 'Memantau dan mengevaluasi',
          mengevaluasi: 'Mengevaluasi dan menyempurnakan',
          memperbaiki: 'Mengidentifikasi dan memperbaiki',
          mengawasi: 'Mengawasi dan mengendalikan mutu',
          berkoordinasi: 'Mengoordinasikan secara lintas fungsi',
          melayani: 'Menangani dan meningkatkan kepuasan layanan',
          menjaga: 'Memastikan konsistensi dan keandalan',
          memasarkan: 'Mengeksekusi strategi pemasaran',
          menjual: 'Memasarkan dan mengonversi'
        };
        leadAction = idUpgradeMap[v] || (v.charAt(0).toUpperCase() + v.slice(1));
      }
    } else {
      const m = objectClause.match(enLeadingVerbRegex);
      if (m) {
        const v = m[1].toLowerCase();
        objectClause = m[2].trim();
        const enUpgradeMap = {
          handling: 'Resolved and streamlined',
          handled: 'Resolved and streamlined',
          managing: 'Directed and streamlined',
          managed: 'Directed and streamlined',
          creating: 'Designed and launched',
          created: 'Designed and launched',
          making: 'Built and standardized',
          made: 'Built and standardized',
          building: 'Architected and delivered',
          built: 'Architected and delivered',
          teaching: 'Designed and facilitated instruction for',
          taught: 'Designed and facilitated instruction for',
          mentoring: 'Coached and evaluated',
          mentored: 'Coached and evaluated',
          analyzing: 'Analyzed and synthesized',
          analyzed: 'Analyzed and synthesized',
          developing: 'Engineered and optimized',
          developed: 'Engineered and optimized',
          designing: 'Designed and delivered',
          designed: 'Designed and delivered',
          preparing: 'Structured and delivered',
          prepared: 'Structured and delivered',
          tracking: 'Tracked and optimized',
          tracked: 'Tracked and optimized',
          monitoring: 'Monitored and audited',
          monitored: 'Monitored and audited',
          coordinating: 'Coordinated and accelerated',
          coordinated: 'Coordinated and accelerated',
          fixing: 'Diagnosed and resolved',
          fixed: 'Diagnosed and resolved',
          resolving: 'Diagnosed and resolved',
          resolved: 'Diagnosed and resolved',
          updating: 'Maintained and automated updates for',
          updated: 'Maintained and automated updates for',
          supporting: 'Supported and elevated',
          supported: 'Supported and elevated'
        };
        leadAction = enUpgradeMap[v] || 'Streamlined';
      }
    }

    const topicText = hasTopic
      ? (objectClause.charAt(0).toLowerCase() + objectClause.slice(1))
      : (roleName || (isId ? 'operasional inti' : 'core operations'));

    // Context-aware method (Z) and impact metric (Y) grounded in the user's actual bullet domain
    let methodZ = '';
    let outcomeY = '';

    if (/rekrut|recruitment|wawancara|interview|seleksi|kandidat|candidate|sourcing|talent|hiring|onboard|cv\b/i.test(lower)) {
      if (!leadAction) leadAction = isId ? 'Mengoptimalkan' : 'Spearheaded';
      methodZ = isId ? 'melalui penyaringan kompetensi dan alur evaluasi terstruktur' : 'via structured competency screening and SLA tracking';
      outcomeY = isId
        ? (hasOwnMetric ? 'memangkas waktu seleksi hingga [X%]' : 'memangkas time-to-hire hingga [X%] untuk [N kandidat/posisi]')
        : (hasOwnMetric ? 'cutting hiring turnaround by [X%]' : 'cutting time-to-hire by [X%] across [N candidates/roles]');
    } else if (/train|pelatihan|ajar|didik|mentor|curriculum|kurikulum|siswa|murid|student|shadow|kelas|class|workshop|pendamping/i.test(lower)) {
      if (!leadAction) leadAction = isId ? 'Memfasilitasi' : 'Designed and facilitated';
      methodZ = isId ? 'menggunakan rubrik observasi dan pendampingan terstruktur' : 'using individualized progress rubrics and structured milestones';
      outcomeY = isId
        ? (hasOwnMetric ? 'meningkatkan capaian belajar dan kemandirian sebesar [X%]' : 'meningkatkan capaian target belajar sebesar [X%] bagi [N siswa/peserta]')
        : (hasOwnMetric ? 'boosting learner mastery outcomes by [X%]' : 'boosting mastery outcomes by [X%] across [N learners]');
    } else if (/administrasi|operasional|dokumen|surat|bpjs|payroll|absensi|karyawan|employee|people|kebijakan|policy|arsip|kontrak|legal|lembur/i.test(lower)) {
      if (!leadAction) leadAction = isId ? 'Menstandardisasi' : 'Streamlined';
      methodZ = isId ? 'dengan sistem pencatatan digital dan validasi kepatuhan berkala' : 'through standardized digital tracking and compliance checks';
      outcomeY = isId
        ? (hasOwnMetric ? 'menjaga akurasi data hingga [99%+] dan menghemat [N jam/bulan]' : 'menekan kesalahan administrasi hingga [0%] serta menghemat [N jam/minggu]')
        : (hasOwnMetric ? 'sustaining [99%+] record accuracy and saving [N hours/week]' : 'eliminating manual errors to [0%] and saving [N hours/week]');
    } else if (/keuangan|finance|akuntansi|accounting|pajak|tax|invoice|tagihan|anggaran|budget|jurnal|rekonsiliasi|audit/i.test(lower)) {
      if (!leadAction) leadAction = isId ? 'Mengelola dan mengaudit' : 'Streamlined';
      methodZ = isId ? 'dengan prosedur rekonsiliasi terstandar dan kontrol anggaran ketat' : 'with standardized reconciliation controls and audit trails';
      outcomeY = isId
        ? (hasOwnMetric ? 'mencapai akurasi pelaporan [99%+] dan mempercepat closing [X%]' : 'mencapai akurasi audit [99%+] serta mempercepat proses closing hingga [X%]')
        : (hasOwnMetric ? 'achieving [99%+] audit accuracy and cutting close time by [X%]' : 'achieving [99%+] reconciliation accuracy and cutting close time by [X%]');
    } else if (/data|analis|analisis|analyst|excel|sheets|dashboard|visual|bi\b|laporan|report|metrik|metric|sql|python|kpi|rekap/i.test(lower)) {
      if (!leadAction) leadAction = isId ? 'Menganalisis dan menyusun' : 'Analyzed and automated';
      methodZ = isId ? 'melalui pembersihan data dan template pelaporan terstruktur' : 'via structured data validation and automated reporting views';
      outcomeY = isId
        ? (hasOwnMetric ? 'meningkatkan akurasi keputusan hingga [X%] dan menghemat [N jam/minggu]' : 'mempercepat penyajian laporan hingga [X%] dan menghemat [N jam/minggu]')
        : (hasOwnMetric ? 'improving reporting accuracy to [X%] and saving [N hours/week]' : 'cutting reporting turnaround by [X%] and saving [N hours/week]');
    } else if (/code|koding|web|aplikasi|software|fitur|feature|bug|api|database|system|sistem|frontend|backend|react|git|testing|qa\b/i.test(lower)) {
      if (!leadAction) leadAction = isId ? 'Mengembangkan dan menguji' : 'Engineered and optimized';
      methodZ = isId ? 'dengan pengujian regresi dan standardisasi komponen' : 'with automated quality checks and modular architecture';
      outcomeY = isId
        ? (hasOwnMetric ? 'meningkatkan stabilitas sistem sebesar [X%]' : 'meningkatkan performa/stabilitas sebesar [X%] dan menekan bug hingga [N%]')
        : (hasOwnMetric ? 'improving system reliability by [X%]' : 'improving performance by [X%] and reducing defects by [N%]');
    } else if (/produk|product|roadmap|backlog|sprint|scrum|user story|proyek|project|timeline|milestone/i.test(lower)) {
      if (!leadAction) leadAction = isId ? 'Mengoordinasikan' : 'Orchestrated';
      methodZ = isId ? 'melalui pemetaan prioritas dan sinkronisasi lintas tim' : 'through prioritized sprint milestones and cross-team alignment';
      outcomeY = isId
        ? (hasOwnMetric ? 'mencapai ketepatan rilis sebesar [X%]' : 'mencapai ketepatan delivery [X%] dan mempercepat siklus eksekusi [N%]')
        : (hasOwnMetric ? 'achieving [X%] on-time milestone delivery' : 'achieving [X%] on-time delivery across [N initiatives]');
    } else if (/marketing|pemasaran|campaign|iklan|ads|sosmed|social media|konten|content|leads|sales|penjualan|roi|omzet|pelanggan|customer|klien|client|order/i.test(lower)) {
      if (!leadAction) leadAction = isId ? 'Mengeksekusi dan mengoptimalkan' : 'Executed and optimized';
      methodZ = isId ? 'berbasis evaluasi metrik audiens dan SLA respons terukur' : 'backed by audience metrics and standardized response SLAs';
      outcomeY = isId
        ? (hasOwnMetric ? 'meningkatkan konversi/kepuasan sebesar [X%]' : 'meningkatkan engagement atau konversi sebesar [X%] dari [N target]')
        : (hasOwnMetric ? 'lifting conversion or satisfaction by [X%]' : 'lifting engagement or conversion by [X%] across [N targets]');
    } else {
      if (!leadAction) leadAction = isId ? 'Mengoptimalkan' : 'Optimized';
      methodZ = isId ? 'melalui alur kerja terstandar dan evaluasi berkala' : 'through standardized workflows and periodic quality checks';
      outcomeY = isId
        ? (hasOwnMetric ? 'meningkatkan efisiensi eksekusi sebesar [X%]' : 'meningkatkan efisiensi kerja sebesar [X%] dan menghemat [N jam/minggu]')
        : (hasOwnMetric ? 'improving execution efficiency by [X%]' : 'improving operational efficiency by [X%] and saving [N hours/week]');
    }

    // Rotate subtle framing for multiple bullets without altering the candidate's real context
    if (variantIndex % 2 === 1) {
      return isId
        ? `${leadAction} ${topicText} ${methodZ}, sehingga berhasil ${outcomeY}.`
        : `${leadAction} ${topicText} ${methodZ}, resulting in ${outcomeY}.`;
    }
    return isId
      ? `${leadAction} ${topicText} ${methodZ}, untuk ${outcomeY}.`
      : `${leadAction} ${topicText} ${methodZ}, ${outcomeY}.`;
  }

// --------------------------------------------------------------------------
  // 12. ATS SCREENING & PSYCHOLOGICAL DIAGNOSTIC ALGORITHM
  // --------------------------------------------------------------------------
  function escapeRegExp(str) {
    return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function matchesKeywordBoundary(text, kw) {
    if (!text || !kw) return false;
    const trimmed = String(kw).trim();
    if (!trimmed) return false;
    const regex = new RegExp('(?:^|[^a-z0-9])' + escapeRegExp(trimmed) + '(?:$|[^a-z0-9])', 'i');
    return regex.test(text);
  }

  const JD_STOPWORDS = new Set([
    // Indonesian stopwords & generic job-posting filler
    'yang', 'dan', 'atau', 'untuk', 'dengan', 'pada', 'dari', 'dalam', 'ke', 'di', 'sebagai',
    'akan', 'dapat', 'bisa', 'harus', 'wajib', 'memiliki', 'punya', 'pengalaman', 'minimal',
    'tahun', 'kandidat', 'pelamar', 'perusahaan', 'posisi', 'pekerjaan', 'tugas', 'tanggung',
    'jawab', 'kualifikasi', 'persyaratan', 'syarat', 'keunggulan', 'nilai', 'tambah', 'serta',
    'secara', 'baik', 'lancar', 'mampu', 'bekerja', 'tim', 'individu', 'mandiri', 'dll', 'dsb',
    'lainnya', 'terkait', 'bidang', 'jurusan', 'lulusan', 'sarjana', 'pendidikan', 'setara',
    'adalah', 'yaitu', 'yakni', 'antara', 'lain', 'oleh', 'karena', 'jika', 'bila', 'agar',
    'supaya', 'tidak', 'bukan', 'belum', 'sudah', 'telah', 'sedang', 'lebih', 'kurang',
    'sangat', 'paling', 'semua', 'setiap', 'beberapa', 'banyak', 'satu', 'dua', 'tiga',
    'kami', 'anda', 'kita', 'mereka', 'ini', 'itu', 'tersebut', 'hal', 'atas', 'bawah',
    'hingga', 'sampai', 'melalui', 'termasuk', 'khususnya', 'diutamakan', 'menjadi', 'membuat',
    'membantu', 'melakukan', 'menjalankan', 'mengikuti', 'menjaga', 'memastikan', 'siap',
    'bersedia', 'penempatan', 'lokasi', 'kantor', 'kerja', 'penuh', 'waktu', 'kontrak',
    // English stopwords & generic job-posting filler
    'the', 'and', 'for', 'with', 'that', 'this', 'from', 'are', 'was', 'were', 'will', 'would',
    'have', 'has', 'had', 'you', 'your', 'our', 'we', 'they', 'their', 'who', 'whom', 'which',
    'can', 'could', 'able', 'must', 'should', 'may', 'might', 'shall', 'years', 'year',
    'experience', 'required', 'preferred', 'requirement', 'requirements', 'responsibilities',
    'responsibility', 'qualifications', 'qualification', 'role', 'position', 'job', 'company',
    'team', 'teams', 'work', 'working', 'skill', 'skills', 'strong', 'good', 'excellent',
    'great', 'plus', 'bonus', 'etc', 'about', 'into', 'over', 'more', 'than', 'such', 'also',
    'including', 'include', 'includes', 'related', 'field', 'degree', 'bachelor', 'master',
    'min', 'max', 'minimum', 'maximum', 'not', 'but', 'all', 'any', 'both', 'each', 'other',
    'using', 'used', 'use', 'make', 'making', 'build', 'building', 'support', 'supporting',
    'ensure', 'ensuring', 'manage', 'managing', 'develop', 'developing', 'strong', 'proven',
    'track', 'record', 'ability', 'knowledge', 'understanding', 'proficiency', 'fluent',
    'written', 'verbal', 'environment', 'fast', 'paced', 'fast-paced', 'looking', 'seeking',
    'join', 'help', 'day', 'daily', 'based', 'across', 'within', 'between', 'through', 'per'
  ]);

  const JD_PRIORITY_TERMS = new Set([
    'sql', 'python', 'r', 'excel', 'tableau', 'power bi', 'looker', 'bigquery', 'snowflake',
    'aws', 'gcp', 'azure', 'docker', 'kubernetes', 'react', 'vue', 'angular', 'node.js',
    'typescript', 'javascript', 'java', 'golang', 'php', 'laravel', 'ci/cd', 'git', 'github',
    'api', 'rest api', 'graphql', 'microservices', 'scrum', 'agile', 'jira', 'kanban',
    'figma', 'ui/ux', 'ux', 'ui', 'qa', 'qc', 'automation', 'selenium', 'cypress',
    'hris', 'ats', 'kpi', 'okr', 'roi', 'crm', 'erp', 'sap', 'b2b', 'b2c', 'saas',
    'seo', 'sem', 'ppc', 'ga4', 'google analytics', 'meta ads', 'google ads', 'copywriting',
    'rekrutmen', 'recruitment', 'talent acquisition', 'onboarding', 'offboarding', 'payroll',
    'bpjs', 'pph', 'pph 21', 'ppn', 'psikotes', 'behavioral interview', 'people analytics',
    'employer branding', 'performance management', 'training', 'coaching', 'mentoring',
    'compensation', 'benefits', 'industrial relations', 'labor law', 'compliance', 'audit',
    'sop', 'sla', 'data analysis', 'data analytics', 'data visualization', 'machine learning',
    'deep learning', 'nlp', 'etl', 'product management', 'project management', 'roadmap',
    'stakeholder management', 'business development', 'account management', 'lead generation',
    'customer journey', 'retention', 'churn', 'conversion rate', 'funnel', 'supply chain',
    'procurement', 'logistics', 'inventory', 'forecasting', 'budgeting', 'financial modeling',
    'accounting', 'reconciliation', 'negotiation', 'public speaking', 'problem solving',
    'critical thinking', 'leadership', 'cross-functional', 'strategic planning'
  ]);

  function extractKeywordsFromJd(jdText) {
    if (!jdText || typeof jdText !== 'string') return [];

    const candidates = new Map(); // lowerKey -> { display, score }
    const clauses = jdText.split(/[\n\r,.;:()•|]+/);

    const addCandidate = (rawPhrase, isBigram, boost) => {
      const cleaned = rawPhrase.replace(/^[-./]+|[-./]+$/g, '').trim();
      if (!cleaned || cleaned.length < 2) return;
      const lowerKey = cleaned.toLowerCase();
      if (/^\d+$/.test(lowerKey)) return;
      if (JD_STOPWORDS.has(lowerKey)) return;

      const isPriority = JD_PRIORITY_TERMS.has(lowerKey);
      const isAcronym = /^[A-Z0-9+#/.-]{2,8}$/.test(cleaned) && /[A-Z]/.test(cleaned);
      const isTechSymbol = /[+#/.]/.test(cleaned) && /[a-z]/i.test(cleaned);

      let score = 1 + boost;
      if (isPriority) score += 6;
      if (isAcronym) score += 3;
      if (isTechSymbol) score += 2.5;
      if (isBigram && isPriority) score += 2;
      else if (isBigram) score += 0.5;

      const existing = candidates.get(lowerKey);
      if (existing) {
        existing.score += 1 + (isPriority ? 1.5 : 0);
        // Prefer uppercase/title-case display over all-lowercase
        if (/[A-Z]/.test(cleaned) && !/[A-Z]/.test(existing.display)) {
          existing.display = cleaned;
        }
      } else {
        candidates.set(lowerKey, { display: cleaned, score });
      }
    };

    clauses.forEach(clause => {
      const tokens = (clause.match(/[a-zA-Z0-9+#.\-\/]{2,}/g) || [])
        .map(t => t.replace(/^[-./]+|[-./]+$/g, ''))
        .filter(t => t.length >= 2);

      for (let i = 0; i < tokens.length; i++) {
        const w1 = tokens[i];
        const l1 = w1.toLowerCase();
        const w1Valid = !JD_STOPWORDS.has(l1) && !/^\d+$/.test(l1);

        if (w1Valid) {
          addCandidate(w1, false, 0);
        }

        if (i + 1 < tokens.length) {
          const w2 = tokens[i + 1];
          const l2 = w2.toLowerCase();
          const w2Valid = !JD_STOPWORDS.has(l2) && !/^\d+$/.test(l2);
          if (w1Valid && w2Valid) {
            const bigram = `${w1} ${w2}`;
            const bigramLower = bigram.toLowerCase();
            if (JD_PRIORITY_TERMS.has(bigramLower) || (/^[A-Z]/.test(w1) && /^[A-Z]/.test(w2))) {
              addCandidate(bigram, true, 1.5);
            } else {
              addCandidate(bigram, true, 0);
            }
          }
        }
      }
    });

    const sorted = Array.from(candidates.entries())
      .sort((a, b) => b[1].score - a[1].score);

    const selected = [];
    const selectedLowers = new Set();

    for (const [lowerKey, item] of sorted) {
      if (selected.length >= 12) break;
      // Avoid redundant unigram if a higher-ranked bigram already covers it
      const coveredBySelectedBigram = !lowerKey.includes(' ') && Array.from(selectedLowers).some(
        sel => sel.includes(' ') && sel.split(' ').includes(lowerKey)
      );
      if (coveredBySelectedBigram && !JD_PRIORITY_TERMS.has(lowerKey)) continue;

      selected.push(item.display);
      selectedLowers.add(lowerKey);
    }

    return selected;
  }

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
      if (matchesKeywordBoundary(text, kw)) {
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

    // Extract strong & weak sentences directly from candidate's uploaded/pasted text
    const extractedRewrites = extractAndAnalyzeWeakSentences(text, roleKey, roleName, lang);
    const strongBulletCount = extractedRewrites ? (extractedRewrites.strongCount || 0) : 0;
    const weakBulletCount = extractedRewrites ? (extractedRewrites.weakCount || 0) : 0;

    // Strengths calculation (truthful, evidence-based)
    const strengths = [];
    if (matchedKeywords.length > 0) {
      const topMatched = matchedKeywords.slice(0, 3).map(k => `"${k}"`).join(', ');
      strengths.push(lang === 'id' ? `Kata kunci kompetensi spesifik terdeteksi kuat: ${topMatched}.` : `Core targeted keywords detected: ${topMatched}.`);
    }
    if (strongBulletCount > 0) {
      strengths.push(lang === 'id'
        ? `Terdeteksi ${strongBulletCount} kalimat pengalaman kuat (menggunakan kata kerja aksi aktif + metrik angka terukur).`
        : `Detected ${strongBulletCount} strong experience bullet(s) combining active action verbs with quantifiable metrics.`);
    }
    if (metricMatches.length > 0) {
      strengths.push(lang === 'id' ? `Menyertakan ${metricMatches.length} bukti metrik pencapaian numerik konkret (angka/persentase).` : `Includes ${metricMatches.length} quantifiable metrics (numbers/percentages) proving business impact.`);
    } else if (sectionCount >= 2) {
      strengths.push(lang === 'id' ? 'Struktur bagian CV utama (pengalaman/pendidikan/keahlian) tersusun sistematis dan mudah dipindai ATS.' : 'Core resume sections (experience/education/skills) are organized in an ATS-readable structure.');
    }
    if (actionCount >= 2) {
      strengths.push(lang === 'id' ? `Menggunakan ${actionCount} ragam verba aksi aktif untuk mendeskripsikan kontribusi kerja.` : `Utilizes ${actionCount} distinct active action verbs to frame professional contributions.`);
    }
    if (strengths.length === 0) {
      strengths.push(lang === 'id' ? 'Teks digital berhasil diekstrak bersih dan terbaca oleh mesin pemindai ATS.' : 'Digital text extracted cleanly and is readable by standard ATS parsers.');
    }

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

    if (weakBulletCount > 0) {
      gaps.push(lang === 'id'
        ? `Terdeteksi ${weakBulletCount} kalimat pengalaman lemah (pasif/tanpa metrik angka) yang perlu dirombak ke Formula XYZ.`
        : `Detected ${weakBulletCount} weak experience bullet(s) (passive phrasing or zero metrics) that need XYZ rewriting.`);
    }
    if (actionCount < 2) {
      gaps.push(lang === 'id'
        ? 'Minim Verba Aksi Kuat: Awali poin pengalaman dengan kata kerja aktif seperti "Memimpin", "Merancang", atau "Mengoptimalkan" alih-alih "Membantu" atau "Bertanggung jawab".'
        : 'Low Strong Action Verb Density: Start experience bullets with proactive verbs like "Spearheaded", "Designed", or "Optimized" instead of passive duty phrasing.');
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

    let isExtractedFromCv = false;
    let beforeRewriteHtml = '';
    let rewriteDiagnosis = '';
    let secondaryRewrites = [];

    if (extractedRewrites && extractedRewrites.primary) {
      isExtractedFromCv = true;
      beforeRewrite = extractedRewrites.primary.original;
      beforeRewriteHtml = extractedRewrites.primary.highlightedOriginal;
      afterRewrite = extractedRewrites.primary.rewrite;
      rewriteDiagnosis = extractedRewrites.primary.diagnosis;
      secondaryRewrites = extractedRewrites.secondary || [];
    } else {
      beforeRewriteHtml = escapeHtml(cleanCopyableSentence(beforeRewrite));
      afterRewrite = cleanCopyableSentence(afterRewrite);
      rewriteDiagnosis = lang === 'id'
        ? '<strong>Bagian Salah:</strong> Frasa pasif tugas rutin &amp; belum ada angka metrik hasil. <strong>Harus Diperbaiki:</strong> Ganti dengan kata kerja aksi aktif dan tambahkan %, jumlah, atau waktu.'
        : '<strong>What\'s Wrong:</strong> Passive duty phrasing &amp; zero impact metrics. <strong>Fix Required:</strong> Lead with an active verb and add %, volume, or time saved.';
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
      matchedKeywords,
      targetKeywordsCount: targetKeywords.length,
      strongBulletCount,
      weakBulletCount,
      metricCount: metricMatches.length,
      actionCount,
      missingKeywords: missingKeywords.length > 0 ? missingKeywords : targetKeywords.slice(0, 6),
      beforeRewrite,
      beforeRewriteHtml,
      afterRewrite,
      rewriteDiagnosis,
      isExtractedFromCv,
      secondaryRewrites,
      starQuestion,
      roleTitle: roleName,
      documentName: state.uploadedFile ? state.uploadedFile.name : (lang === 'id' ? 'Teks Input CV Kandidat' : 'Pasted Candidate Resume')
    };
  }

  // --------------------------------------------------------------------------
  // 13. RENDER RESULTS VIEW
  // --------------------------------------------------------------------------
  function renderAnalysisResults(res, options = {}) {
    const lang = state.language;

    DOM.resDocName.textContent = (lang === 'id' ? 'Hasil Evaluasi: ' : 'Evaluation: ') + res.documentName;
    const stdLabel = res.screeningStandard === 'global'
      ? (lang === 'id' ? '🌐 Multinasional Global' : '🌐 Global MNC')
      : (lang === 'id' ? '🇮🇩 Standar Nasional' : '🇮🇩 National Standard');
    DOM.resRoleName.textContent = '• ' + (lang === 'id' ? 'Posisi Target: ' : 'Target Role: ') + res.roleTitle + ' (' + stdLabel + ')';

    const isDark = state.theme === 'dark';
    const palette = getTierPalette(res.tier, isDark);

    let currentCount = 0;
    const targetScore = res.score;
    DOM.scoreNumber.textContent = '0';
    DOM.scoreNumber.style.setProperty('color', palette.scoreColor, 'important');

    const timer = setInterval(() => {
      currentCount += 2;
      if (currentCount >= targetScore) {
        currentCount = targetScore;
        clearInterval(timer);
      }
      DOM.scoreNumber.textContent = currentCount;
    }, 20);

    DOM.progressBarFill.style.width = targetScore + '%';
    DOM.progressBarFill.style.setProperty('background-color', palette.scoreColor, 'important');
    DOM.scorePercentageTxt.textContent = targetScore + (lang === 'id' ? '% Cocok' : '% Match');

    DOM.scoreTierLabel.textContent = res.tierName;
    DOM.scoreTierLabel.style.setProperty('color', palette.color, 'important');
    DOM.tierBadgePill.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-current"></span><span>${escapeHtml(res.tierBadge)}</span>`;
    DOM.tierBadgePill.style.setProperty('color', palette.color, 'important');
    DOM.tierBadgePill.style.setProperty('border-color', palette.border, 'important');
    DOM.tierBadgePill.style.setProperty('background-color', palette.bg, 'important');

    DOM.tierNarrativeTxt.textContent = res.narrative;
    DOM.recruiterAdviceTxt.textContent = res.advice;

    function formatDiagnosticBullet(str, isStrength) {
      const escaped = String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
      const pillClass = isStrength ? 'diagnostic-pill-strength' : 'diagnostic-pill-gap';
      return escaped.replace(/&quot;([^&]+)&quot;/g, `<code class="${pillClass} px-1.5 py-0.5 rounded text-[11px] font-mono font-semibold">$1</code>`);
    }

    DOM.strengthCountBadge.textContent = `${res.strengths.length} ` + (lang === 'id' ? 'Kualifikasi Terdeteksi' : 'Strengths Met');
    DOM.strengthsList.innerHTML = res.strengths.map(s => `
      <li class="flex items-start gap-2.5">
        <span class="w-4 h-4 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">✓</span>
        <span class="text-xs text-slate-900 dark:text-slate-300 font-medium dark:font-normal leading-relaxed">${formatDiagnosticBullet(s, true)}</span>
      </li>
    `).join('');

    DOM.gapCountBadge.textContent = `${res.gaps.length} ` + (lang === 'id' ? 'Poin Perlu Ditambahkan' : 'Gaps to Fix');
    DOM.gapsList.innerHTML = res.gaps.map(g => `
      <li class="flex items-start gap-2.5">
        <span class="w-4 h-4 rounded-full bg-amber-100 border border-amber-200 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">!</span>
        <span class="text-xs text-slate-900 dark:text-slate-300 font-medium dark:font-normal leading-relaxed">${formatDiagnosticBullet(g, false)}</span>
      </li>
    `).join('');

    // Card 04: Primary Rewrite
    if (res.isExtractedFromCv && DOM.cvScanDetectionBadge) {
      DOM.cvScanDetectionBadge.classList.remove('hidden');
    } else if (DOM.cvScanDetectionBadge) {
      DOM.cvScanDetectionBadge.classList.add('hidden');
    }

    DOM.rewriteBeforeTxt.innerHTML = res.beforeRewriteHtml || escapeHtml(res.beforeRewrite);
    DOM.rewriteAfterTxt.textContent = res.afterRewrite;
    if (DOM.rewriteDiagnosisTxt) {
      DOM.rewriteDiagnosisTxt.innerHTML = res.rewriteDiagnosis || (lang === 'id'
        ? '<strong>Bagian Salah:</strong> Kalimat pasif tugas rutin tanpa metrik dampak. <strong>Harus Diperbaiki:</strong> Ganti dengan kata kerja aktif dan tambahkan angka hasil (%).'
        : '<strong>What\'s Wrong:</strong> Passive task description lacking metrics. <strong>Fix Required:</strong> Lead with an active verb and add measurable outcomes.');
    }

    // Secondary rewrites if extracted from candidate's CV
    if (DOM.secondaryRewritesContainer && DOM.secondaryRewritesList) {
      if (res.secondaryRewrites && res.secondaryRewrites.length > 0) {
        DOM.secondaryRewritesContainer.classList.remove('hidden');
        if (DOM.secondaryRewritesCount) {
          DOM.secondaryRewritesCount.textContent = `${res.secondaryRewrites.length} ` + (lang === 'id' ? 'Kalimat Terdeteksi' : 'Sentences Detected');
        }
        DOM.secondaryRewritesList.innerHTML = res.secondaryRewrites.map((item, idx) => `
          <div class="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-dark-well border border-slate-300 dark:border-dark-wellBorder space-y-3">
            <div class="space-y-1.5">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <span class="text-[10.5px] font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  ${lang === 'id' ? 'Butir #' + (idx + 2) + ' Asli di CV Anda' : 'Original Experience Bullet #' + (idx + 2)}
                </span>
                <span class="text-[9.5px] font-mono font-semibold text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-dark-surface border border-slate-300 dark:border-dark-wellBorder whitespace-nowrap shrink-0">
                  ${lang === 'id' ? 'Perlu Diperbaiki' : 'Needs Fix'}
                </span>
              </div>
              <p class="text-xs text-slate-900 dark:text-slate-200 font-sans leading-relaxed bg-white dark:bg-dark-surface p-2.5 rounded-lg border border-slate-300 dark:border-dark-wellBorder">
                ${item.highlightedOriginal || escapeHtml(item.original)}
              </p>
              <p class="text-[11px] text-slate-700 dark:text-slate-300 font-normal leading-relaxed bg-white dark:bg-dark-surface p-2 rounded-lg border border-slate-300 dark:border-dark-wellBorder border-l-2 border-l-slate-500 dark:border-l-slate-400">
                ${item.diagnosis}
              </p>
            </div>
            <div class="space-y-1.5 pt-2 border-t border-slate-300 dark:border-dark-wellBorder">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <span class="text-[10.5px] font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-slate-800 dark:bg-slate-200 shrink-0"></span>
                  <span>${lang === 'id' ? 'Rekomendasi Formula XYZ (Siap Salin)' : 'Recommended XYZ Formula (Ready to Copy)'}</span>
                </span>
                <button type="button" class="copy-secondary-rewrite-btn text-[11px] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-heading font-bold flex items-center gap-1 transition-colors whitespace-nowrap shrink-0" data-copy-target="${encodeURIComponent(item.rewrite)}">
                  <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                  <span>${lang === 'id' ? 'Salin Kalimat' : 'Copy Sentence'}</span>
                </button>
              </div>
              <p class="text-xs text-slate-900 dark:text-white font-medium leading-relaxed bg-white dark:bg-dark-surface p-2.5 rounded-lg border border-slate-300 dark:border-dark-wellBorder border-l-2 border-l-slate-900 dark:border-l-white">
                ${escapeHtml(item.rewrite)}
              </p>
            </div>
          </div>
        `).join('');

        // Wire copy events for secondary rewrites
        DOM.secondaryRewritesList.querySelectorAll('.copy-secondary-rewrite-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const encoded = btn.getAttribute('data-copy-target');
            if (encoded) {
              copyTextToClipboard(decodeURIComponent(encoded), btn, lang);
            }
          });
        });
      } else {
        DOM.secondaryRewritesContainer.classList.add('hidden');
        DOM.secondaryRewritesList.innerHTML = '';
      }
    }

    DOM.starQuestionTxt.textContent = res.starQuestion;

    // Dynamically update WhatsApp consultation link with contextual role & score
    if (DOM.consultWhatsAppBtn) {
      const targetRoleTitle = res.roleTitle || 'HR / Specialist';
      const waMsg = `Halo Kak Faari, saya baru saja memindai CV di Screenora untuk posisi ${targetRoleTitle} (Skor ATS: ${res.score}%). Saya ingin tanya lebih lanjut dan memberikan masukan/saran terkait hasil evaluasi CV saya. Terima kasih!`;
      DOM.consultWhatsAppBtn.href = `https://wa.me/6285892344722?text=${encodeURIComponent(waMsg)}`;
    }

    if (DOM.inputView) DOM.inputView.classList.add('hidden');
    if (DOM.resultsView) DOM.resultsView.classList.remove('hidden');
    saveSessionState('results');
    if (!options.skipScroll && DOM.resultsView) {
      window.scrollTo({ top: DOM.resultsView.offsetTop - 80, behavior: 'smooth' });
    }
  }

  // --------------------------------------------------------------------------
  // 14. EXECUTE SCREENING FLOW
  // --------------------------------------------------------------------------
  async function runScreening() {
    const rawVal = DOM.rawCvText ? DOM.rawCvText.value.trim() : '';
    let textToAnalyze = '';
    if (state.activeTab === 'upload') {
      textToAnalyze = state.cvText || rawVal;
    } else {
      textToAnalyze = rawVal;
    }

    if (!textToAnalyze || textToAnalyze.length < 30) {
      showToast(state.language === 'id' ? i18n.id.toastNoText : i18n.en.toastNoText);
      if (state.activeTab === 'upload' && !state.uploadedFile && DOM.cvFileInput) {
        DOM.cvFileInput.click();
      } else if (DOM.rawCvText) {
        DOM.rawCvText.focus();
      }
      return;
    }

    if (DOM.runAnalysisBtn) DOM.runAnalysisBtn.disabled = true;
    if (DOM.btnIcon) DOM.btnIcon.innerHTML = `<svg class="w-4 h-4 animate-spin text-black" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>`;
    if (DOM.btnLabel) DOM.btnLabel.textContent = state.language === 'id' ? 'Memproses Matriks ATS...' : 'Evaluating Resume Matrix...';
    showToast(state.language === 'id' ? i18n.id.toastAnalyzing : i18n.en.toastAnalyzing);

    // Transition immediately to Skeleton Shimmer Loading Dashboard
    if (DOM.inputView) DOM.inputView.classList.add('hidden');
    if (DOM.resultsView) DOM.resultsView.classList.add('hidden');
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

      if (DOM.runAnalysisBtn) DOM.runAnalysisBtn.disabled = false;
      if (DOM.btnIcon) DOM.btnIcon.innerHTML = `<svg class="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>`;
      if (DOM.btnLabel) DOM.btnLabel.textContent = state.language === 'id' ? i18n.id.runBtnLabel : i18n.en.runBtnLabel;

      renderAnalysisResults(analysis);
    }, 1250);
  }

  // --------------------------------------------------------------------------
  // 14B. P1 HEAD-TO-HEAD CV COMPARISON ENGINE (SIDE-BY-SIDE)
  // --------------------------------------------------------------------------
  function setInputMode(mode) {
    state.inputMode = mode === 'compare' ? 'compare' : 'single';
    const isCompare = state.inputMode === 'compare';

    if (DOM.modeSingleBtn && DOM.modeCompareBtn) {
      const activeClass = 'px-4 py-2 rounded-lg text-xs font-heading font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap';
      const inactiveClass = 'px-4 py-2 rounded-lg text-xs font-heading font-semibold text-dark-textSec hover:text-dark-textPri transition-all flex items-center justify-center gap-2 whitespace-nowrap';
      DOM.modeSingleBtn.className = isCompare ? inactiveClass : activeClass;
      DOM.modeCompareBtn.className = isCompare ? activeClass : inactiveClass;
      DOM.modeSingleBtn.setAttribute('aria-pressed', String(!isCompare));
      DOM.modeCompareBtn.setAttribute('aria-pressed', String(isCompare));
    }

    if (DOM.singleInputPanel) {
      DOM.singleInputPanel.classList.toggle('hidden', isCompare);
    }
    if (DOM.singleActionBar) {
      DOM.singleActionBar.classList.toggle('hidden', isCompare);
    }
    if (DOM.compareInputPanel) {
      DOM.compareInputPanel.classList.toggle('hidden', !isCompare);
    }
  }

  function renderCompareCandidateCard(res, els, lang) {
    if (els.scoreEl) {
      els.scoreEl.textContent = `${res.score}%`;
    }
    if (els.tierEl) {
      els.tierEl.textContent = res.tierName;
    }
    if (els.keywordsEl) {
      const matched = res.matchedKeywords || [];
      const total = res.targetKeywordsCount || 0;
      const pillsHtml = matched.length > 0
        ? matched.slice(0, 8).map(kw =>
            `<span class="inline-block px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-dark-well text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-dark-wellBorder">${escapeHtml(kw)}</span>`
          ).join(' ')
        : `<span class="text-xs text-slate-500 dark:text-slate-400">${lang === 'id' ? 'Belum ada kata kunci target terdeteksi.' : 'No target keywords detected.'}</span>`;
      els.keywordsEl.innerHTML = `
        <div class="text-xs font-semibold text-slate-900 dark:text-white mb-1.5">
          ${matched.length} / ${total} ${lang === 'id' ? 'kata kunci cocok' : 'keywords matched'}
        </div>
        <div class="flex flex-wrap gap-1.5">${pillsHtml}</div>
      `;
    }
    if (els.bulletsEl) {
      const strong = res.strongBulletCount || 0;
      const weak = res.weakBulletCount || 0;
      const metrics = res.metricCount || 0;
      els.bulletsEl.innerHTML = `
        <div class="grid grid-cols-3 gap-2.5 sm:gap-3 text-center">
          <div class="p-2.5 sm:p-3 rounded-lg bg-slate-50 dark:bg-dark-well border border-slate-200 dark:border-dark-border">
            <div class="text-sm font-bold text-slate-900 dark:text-white">${strong}</div>
            <div class="text-[10.5px] text-slate-600 dark:text-slate-400 leading-tight mt-0.5">${lang === 'id' ? 'Kalimat Kuat' : 'Strong'}</div>
          </div>
          <div class="p-2.5 sm:p-3 rounded-lg bg-slate-50 dark:bg-dark-well border border-slate-200 dark:border-dark-border">
            <div class="text-sm font-bold text-slate-900 dark:text-white">${weak}</div>
            <div class="text-[10.5px] text-slate-600 dark:text-slate-400 leading-tight mt-0.5">${lang === 'id' ? 'Perlu XYZ' : 'Needs XYZ'}</div>
          </div>
          <div class="p-2.5 sm:p-3 rounded-lg bg-slate-50 dark:bg-dark-well border border-slate-200 dark:border-dark-border">
            <div class="text-sm font-bold text-slate-900 dark:text-white">${metrics}</div>
            <div class="text-[10.5px] text-slate-600 dark:text-slate-400 leading-tight mt-0.5">${lang === 'id' ? 'Metrik Angka' : 'Metrics'}</div>
          </div>
        </div>
      `;
    }
    if (els.gapsEl) {
      const gaps = res.gaps || [];
      if (gaps.length > 0) {
        els.gapsEl.innerHTML = `<ul class="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-disc pl-4">${gaps.map(g => `<li>${escapeHtml(g)}</li>`).join('')}</ul>`;
      } else {
        els.gapsEl.innerHTML = `<p class="text-xs text-slate-600 dark:text-slate-400">${lang === 'id' ? 'Tidak ada celah kritis terdeteksi.' : 'No critical gaps detected.'}</p>`;
      }
    }
  }

  function renderComparisonResults(comp, options = {}) {
    if (!comp || !comp.resA || !comp.resB) return;
    const lang = state.language;
    const { resA, resB } = comp;
    const diff = resA.score - resB.score;
    const absDiff = Math.abs(diff);

    const kwA = (resA.matchedKeywords || []).length;
    const kwB = (resB.matchedKeywords || []).length;
    const strongA = resA.strongBulletCount || 0;
    const strongB = resB.strongBulletCount || 0;

    let badgeText = '';
    let verdictText = '';

    if (absDiff <= 2) {
      badgeText = lang === 'id' ? 'Kompetitif Seimbang' : 'Closely Matched';
      verdictText = lang === 'id'
        ? `Kandidat A (${resA.score}%) dan Kandidat B (${resB.score}%) berada pada level kesiapan ATS yang relatif seimbang untuk posisi ${resA.roleTitle}. Kandidat A unggul pada ${kwA} kata kunci & ${strongA} kalimat kuat, sementara Kandidat B mencatat ${kwB} kata kunci & ${strongB} kalimat kuat. Rekomendasi Rekruter: Lanjutkan keduanya ke tahap wawancara perilaku (STAR) untuk menguji kedalaman eksekusi.`
        : `Candidate A (${resA.score}%) and Candidate B (${resB.score}%) are closely matched in ATS readiness for ${resA.roleTitle}. Candidate A holds ${kwA} matched keywords & ${strongA} strong bullets, while Candidate B shows ${kwB} keywords & ${strongB} strong bullets. Recruiter Verdict: Advance both to behavioral STAR interviews to differentiate hands-on execution.`;
    } else if (diff > 0) {
      badgeText = lang === 'id' ? `Kandidat A Unggul (+${absDiff} poin)` : `Candidate A Leads (+${absDiff} pts)`;
      verdictText = lang === 'id'
        ? `Kandidat A (${resA.score}%) lebih unggul ${absDiff} poin dibanding Kandidat B (${resB.score}%) untuk posisi ${resA.roleTitle}. Keunggulan utama terletak pada kecocokan kata kunci (${kwA} vs ${kwB}) serta kekuatan bukti kalimat pengalaman (${strongA} vs ${strongB} kalimat kuat ber-metrik). Rekomendasi Rekruter: Prioritaskan Kandidat A untuk panggilan wawancara tahap pertama.`
        : `Candidate A (${resA.score}%) leads Candidate B (${resB.score}%) by ${absDiff} points for ${resA.roleTitle}. The edge comes from stronger keyword alignment (${kwA} vs ${kwB}) and quantified experience phrasing (${strongA} vs ${strongB} strong bullets). Recruiter Verdict: Prioritize Candidate A for first-round screening.`;
    } else {
      badgeText = lang === 'id' ? `Kandidat B Unggul (+${absDiff} poin)` : `Candidate B Leads (+${absDiff} pts)`;
      verdictText = lang === 'id'
        ? `Kandidat B (${resB.score}%) lebih unggul ${absDiff} poin dibanding Kandidat A (${resA.score}%) untuk posisi ${resB.roleTitle}. Keunggulan utama terlihat dari kepadatan kata kunci relevan (${kwB} vs ${kwA}) dan kualitas kalimat ber-metrik (${strongB} vs ${strongA} kalimat kuat). Rekomendasi Rekruter: Prioritaskan Kandidat B untuk panggilan wawancara tahap pertama.`
        : `Candidate B (${resB.score}%) leads Candidate A (${resA.score}%) by ${absDiff} points for ${resB.roleTitle}. The advantage stems from higher targeted keyword coverage (${kwB} vs ${kwA}) and impact-driven bullet points (${strongB} vs ${strongA} strong bullets). Recruiter Verdict: Prioritize Candidate B for first-round screening.`;
    }

    if (DOM.compareVerdictBadge) DOM.compareVerdictBadge.textContent = badgeText;
    if (DOM.compareVerdictText) DOM.compareVerdictText.textContent = verdictText;

    renderCompareCandidateCard(resA, {
      scoreEl: DOM.compareScoreA,
      tierEl: DOM.compareTierA,
      keywordsEl: DOM.compareKeywordsA,
      bulletsEl: DOM.compareBulletsA,
      gapsEl: DOM.compareGapsA
    }, lang);

    renderCompareCandidateCard(resB, {
      scoreEl: DOM.compareScoreB,
      tierEl: DOM.compareTierB,
      keywordsEl: DOM.compareKeywordsB,
      bulletsEl: DOM.compareBulletsB,
      gapsEl: DOM.compareGapsB
    }, lang);

    if (DOM.inputView) DOM.inputView.classList.add('hidden');
    if (DOM.compareInputPanel) DOM.compareInputPanel.classList.add('hidden');
    if (DOM.resultsView) DOM.resultsView.classList.add('hidden');
    if (DOM.compareResultsView) {
      DOM.compareResultsView.classList.remove('hidden');
      saveSessionState('compareResults');
      if (!options.skipScroll) {
        window.scrollTo({ top: DOM.compareResultsView.offsetTop - 80, behavior: 'smooth' });
      }
    }
  }

  function runComparison() {
    const lang = state.language;
    const textA = DOM.compareTextA ? DOM.compareTextA.value.trim() : '';
    const textB = DOM.compareTextB ? DOM.compareTextB.value.trim() : '';

    if (textA.length < 40 || textB.length < 40) {
      showToast(lang === 'id' ? i18n.id.compareToastNeedBoth : i18n.en.compareToastNeedBoth);
      if (textA.length < 40 && DOM.compareTextA) {
        DOM.compareTextA.focus();
      } else if (DOM.compareTextB) {
        DOM.compareTextB.focus();
      }
      return;
    }

    const resA = analyzeResume(textA, state.selectedRole);
    const resB = analyzeResume(textB, state.selectedRole);

    state.currentComparison = {
      resA,
      resB,
      roleKey: state.selectedRole,
      nameA: state.compareFileA ? state.compareFileA.name : i18n[lang].compareCandidateA,
      nameB: state.compareFileB ? state.compareFileB.name : i18n[lang].compareCandidateB
    };

    renderComparisonResults(state.currentComparison);
  }

  // --------------------------------------------------------------------------
  // 15. EVENT LISTENERS SETUP
  // --------------------------------------------------------------------------
  function setupEventListeners() {
    if (DOM.themeToggleBtn) {
      DOM.themeToggleBtn.addEventListener('click', toggleTheme);
    }

    if (DOM.langIdBtn) {
      DOM.langIdBtn.addEventListener('click', () => applyLanguage('id'));
    }
    if (DOM.langEnBtn) {
      DOM.langEnBtn.addEventListener('click', () => applyLanguage('en'));
    }

    if (DOM.tabUploadBtn) {
      DOM.tabUploadBtn.addEventListener('click', () => setTab('upload'));
    }
    if (DOM.tabPasteBtn) {
      DOM.tabPasteBtn.addEventListener('click', () => setTab('paste'));
    }

    if (DOM.browseFileBtn && DOM.cvFileInput) {
      DOM.browseFileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        DOM.cvFileInput.click();
      });
    }

    if (DOM.dropzone && DOM.cvFileInput) {
      DOM.dropzone.addEventListener('click', () => {
        DOM.cvFileInput.click();
      });
    }

    if (DOM.cvFileInput) {
      DOM.cvFileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          processFile(e.target.files[0]);
        }
      });
    }

    if (DOM.dropzone) {
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
    }

    if (DOM.removeFileBtn) {
      DOM.removeFileBtn.addEventListener('click', clearUploadedFile);
    }

    // Sample Profile Load (1-click instant demo)
    if (DOM.loadSampleCvBtn) {
      DOM.loadSampleCvBtn.addEventListener('click', () => {
        if (DOM.resultsView) DOM.resultsView.classList.add('hidden');
        if (DOM.compareResultsView) DOM.compareResultsView.classList.add('hidden');
        if (DOM.inputView) DOM.inputView.classList.remove('hidden');
        setInputMode('single');
        state.cvText = SAMPLE_PROFILE_TEXT;
        if (DOM.rawCvText) DOM.rawCvText.value = SAMPLE_PROFILE_TEXT;
        setTab('paste');
        if (DOM.roleSelect) {
          DOM.roleSelect.value = 'hr';
        }
        updateRoleDetails('hr');
        showToast(state.language === 'id' ? i18n.id.toastSampleLoaded : i18n.en.toastSampleLoaded);
        runScreening();
      });
    }

    // Market Standard Switcher Click Handlers (Indonesia vs Internasional)
    if (DOM.stdNasionalBtn && DOM.stdGlobalBtn) {
      DOM.stdNasionalBtn.addEventListener('click', () => applyScreeningStandard('id'));
      DOM.stdGlobalBtn.addEventListener('click', () => applyScreeningStandard('global'));
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

    // Auto-Extract Keywords from Job Description
    if (DOM.extractJdKeywordsBtn) {
      DOM.extractJdKeywordsBtn.addEventListener('click', () => {
        const dict = i18n[state.language] || i18n.id;
        const jdText = DOM.customJobDescInput ? DOM.customJobDescInput.value.trim() : '';
        if (!jdText) {
          showToast(dict.jdEmptyWarn || (state.language === 'id'
            ? 'Tempel teks Job Description terlebih dahulu.'
            : 'Please paste a Job Description first.'));
          if (DOM.customJobDescInput) DOM.customJobDescInput.focus();
          return;
        }
        const extracted = extractKeywordsFromJd(jdText);
        if (extracted.length === 0) {
          showToast(dict.jdEmptyWarn || (state.language === 'id'
            ? 'Tidak ada kata kunci relevan yang dapat diekstrak.'
            : 'No relevant keywords could be extracted.'));
          return;
        }
        if (DOM.customRoleKeywordsInput) {
          DOM.customRoleKeywordsInput.value = extracted.join(', ');
        }
        showToast(dict.jdExtractedToast || (state.language === 'id'
          ? 'Kata kunci berhasil diekstrak dari Job Description!'
          : 'Keywords extracted from Job Description!'));
      });
    }

    // Seniority Pills Click Handlers
    if (DOM.customSeniorityPills) {
      DOM.customSeniorityPills.forEach(pill => {
        pill.addEventListener('click', () => {
          state.customSeniority = pill.getAttribute('data-level');
          updateSeniorityPillsUI(state.customSeniority);
        });
      });
    }

    if (DOM.runAnalysisBtn) {
      DOM.runAnalysisBtn.addEventListener('click', runScreening);
    }

    if (DOM.backToInputBtn) {
      DOM.backToInputBtn.addEventListener('click', () => {
        clearSessionState();
        if (DOM.skeletonLoadingView) DOM.skeletonLoadingView.classList.add('hidden');
        if (DOM.resultsView) DOM.resultsView.classList.add('hidden');
        if (DOM.inputView) {
          DOM.inputView.classList.remove('hidden');
          window.scrollTo({ top: DOM.inputView.offsetTop - 80, behavior: 'smooth' });
        }
      });
    }

    // Export PDF (Browser Print)
    if (DOM.exportPdfBtn) {
      DOM.exportPdfBtn.addEventListener('click', () => {
        if (!state.currentAnalysis) {
          showToast(state.language === 'id' ? 'Lakukan skrining CV terlebih dahulu.' : 'Please run a CV screening first.');
          return;
        }
        window.print();
      });
    }

    // Copy Executive Summary
    if (DOM.copySummaryBtn) {
      DOM.copySummaryBtn.addEventListener('click', () => {
        if (!state.currentAnalysis) {
          showToast(state.language === 'id' ? 'Lakukan skrining CV terlebih dahulu.' : 'Please run a CV screening first.');
          return;
        }
        copyTextToClipboard(
          formatExecutiveSummary(state.currentAnalysis, state.language),
          DOM.copySummaryBtn,
          state.language
        );
      });
    }

    // Bridge: Send Active CV Text to Instant Builder
    if (DOM.sendToBuilderBtn) {
      DOM.sendToBuilderBtn.addEventListener('click', () => {
        const text = state.cvText || (DOM.rawCvText ? DOM.rawCvText.value.trim() : '');
        if (!text) {
          showToast(state.language === 'id' ? 'Tidak ada teks CV untuk dikirim.' : 'No CV text available to send.');
          return;
        }
        try {
          sessionStorage.setItem('screenora_screener_draft', text);
        } catch (_) {
          // Ignore storage errors silently
        }
        window.location.href = 'builder.html?from=screener';
      });
    }

    // Copy Actionable Rewrite
    if (DOM.copyRewriteBtn && DOM.rewriteAfterTxt) {
      DOM.copyRewriteBtn.addEventListener('click', () => {
        copyTextToClipboard(DOM.rewriteAfterTxt.textContent, DOM.copyRewriteBtn, state.language);
      });
    }

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
    if (DOM.openConsultModalBtn2) {
      DOM.openConsultModalBtn2.addEventListener('click', openConsultModal);
    }
    if (DOM.closeConsultModalBtn) {
      DOM.closeConsultModalBtn.addEventListener('click', closeConsultModal);
    }
    if (DOM.consultModalOverlay) {
      DOM.consultModalOverlay.addEventListener('click', (e) => {
        if (e.target === DOM.consultModalOverlay) closeConsultModal();
      });
    }

    // Close active modals on Escape key for keyboard accessibility
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeQrisModal();
        closeConsultModal();
      }
    });

    // P1 Compare 2 CVs Mode Event Listeners (Null-guarded)
    if (DOM.modeSingleBtn) {
      DOM.modeSingleBtn.addEventListener('click', () => setInputMode('single'));
    }
    if (DOM.modeCompareBtn) {
      DOM.modeCompareBtn.addEventListener('click', () => setInputMode('compare'));
    }
    if (DOM.compareFileA) {
      DOM.compareFileA.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          handleCompareFileUpload('A', e.target.files[0]);
        }
      });
    }
    if (DOM.compareFileB) {
      DOM.compareFileB.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          handleCompareFileUpload('B', e.target.files[0]);
        }
      });
    }
    if (DOM.compareClearA) {
      DOM.compareClearA.addEventListener('click', () => clearCompareSlot('A'));
    }
    if (DOM.compareClearB) {
      DOM.compareClearB.addEventListener('click', () => clearCompareSlot('B'));
    }
    if (DOM.runCompareBtn) {
      DOM.runCompareBtn.addEventListener('click', runComparison);
    }
    if (DOM.backFromCompareBtn) {
      DOM.backFromCompareBtn.addEventListener('click', () => {
        clearSessionState();
        if (DOM.compareResultsView) DOM.compareResultsView.classList.add('hidden');
        if (DOM.inputView) {
          DOM.inputView.classList.remove('hidden');
        }
        setInputMode('compare');
        if (DOM.inputView) {
          window.scrollTo({ top: DOM.inputView.offsetTop - 80, behavior: 'smooth' });
        }
      });
    }

    if (DOM.sendFeedbackEmailBtn) {
      DOM.sendFeedbackEmailBtn.addEventListener('click', () => {
        const payload = buildFeedbackPayload();
        const dict = i18n[state.language] || i18n.id;
        if (!payload.message) {
          showToast(dict.feedbackEmptyWarn);
          if (DOM.feedbackMessage) DOM.feedbackMessage.focus();
          return;
        }

        const openMailtoFallback = () => {
          const subject = `[Screenora Feedback - ${payload.category}] dari ${payload.name}`;
          const bodyLines = [
            `Nama: ${payload.name}`,
            `Kategori: ${payload.category}`,
            `Konteks: ${payload.context.page} | Tampilan: ${payload.context.view} | Posisi: ${payload.context.role} (${payload.context.standard.toUpperCase()}) | Bahasa: ${payload.context.lang.toUpperCase()}`,
            '',
            'Pesan:',
            payload.message
          ];
          const mailtoUrl = `mailto:faarimuhammad25@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
          window.location.href = mailtoUrl;
          showToast(dict.feedbackSentToast);
          resetFeedbackForm();
        };

        if (FEEDBACK_ENDPOINT) {
          fetch(FEEDBACK_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
          })
            .then(res => {
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              showToast(dict.feedbackSentToast);
              resetFeedbackForm();
            })
            .catch(() => {
              openMailtoFallback();
            });
        } else {
          openMailtoFallback();
        }
      });
    }

    if (DOM.sendFeedbackWaBtn) {
      DOM.sendFeedbackWaBtn.addEventListener('click', () => {
        const payload = buildFeedbackPayload();
        const dict = i18n[state.language] || i18n.id;
        if (!payload.message) {
          showToast(dict.feedbackEmptyWarn);
          if (DOM.feedbackMessage) DOM.feedbackMessage.focus();
          return;
        }

        const waText = [
          '*Feedback Screenora*',
          `Nama: ${payload.name}`,
          `Kategori: ${payload.category}`,
          `Konteks: ${payload.context.page} | Tampilan: ${payload.context.view} | Posisi: ${payload.context.role} (${payload.context.standard.toUpperCase()})`,
          '',
          payload.message
        ].join('\n');
        const waUrl = `https://wa.me/6285892344722?text=${encodeURIComponent(waText)}`;
        window.open(waUrl, '_blank', 'noopener,noreferrer');
        showToast(dict.feedbackSentToast);
        resetFeedbackForm();
      });
    }
  }

  function buildFeedbackPayload() {
    const name = (DOM.feedbackName && DOM.feedbackName.value.trim()) || 'Pengguna Screenora';
    const category = (DOM.feedbackCategory && DOM.feedbackCategory.value) || 'Umum';
    const message = (DOM.feedbackMessage && DOM.feedbackMessage.value.trim()) || '';
    const page = window.location.pathname.split('/').pop() || 'index.html';
    const role = state.selectedRole === 'custom'
      ? ((DOM.customRoleTitleInput && DOM.customRoleTitleInput.value.trim()) || 'custom')
      : state.selectedRole;
    const view = (DOM.resultsView && !DOM.resultsView.classList.contains('hidden'))
      ? 'results'
      : ((DOM.compareResultsView && !DOM.compareResultsView.classList.contains('hidden')) ? 'compareResults' : 'input');

    return {
      name,
      category,
      message,
      context: {
        page,
        view,
        role,
        mode: state.inputMode,
        standard: state.screeningStandard,
        lang: state.language
      }
    };
  }

  function resetFeedbackForm() {
    if (DOM.feedbackName) DOM.feedbackName.value = '';
    if (DOM.feedbackMessage) DOM.feedbackMessage.value = '';
  }

  // --------------------------------------------------------------------------
  // 16. SESSION PERSISTENCE (ZERO-DATA RETENTION IN SESSIONSTORAGE) & INIT
  // --------------------------------------------------------------------------
  const SESSION_STORAGE_KEY = 'screenora_session_state';

  function updateSeniorityPillsUI(level) {
    if (!DOM.customSeniorityPills) return;
    DOM.customSeniorityPills.forEach(pill => {
      const isMatch = pill.getAttribute('data-level') === level;
      pill.classList.remove('bg-brand-emeraldBg', 'border-brand-emerald/40', 'text-brand-emerald');
      pill.classList.add('bg-dark-surface');
      pill.classList.toggle('active', isMatch);
      pill.classList.toggle('border-slate-400/50', isMatch);
      pill.classList.toggle('text-slate-900', isMatch);
      pill.classList.toggle('dark:text-white', isMatch);
      pill.classList.toggle('font-semibold', isMatch);
      pill.classList.toggle('shadow-sm', isMatch);
      pill.classList.toggle('border-dark-border', !isMatch);
      pill.classList.toggle('text-dark-textSec', !isMatch);
    });
  }

  function applyScreeningStandard(std) {
    state.screeningStandard = std === 'global' ? 'global' : 'id';
    const isGlobal = state.screeningStandard === 'global';
    const activeCls = 'py-2 px-2.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap bg-dark-surface text-slate-900 dark:text-white border border-slate-400/50 shadow-sm';
    const inactiveCls = 'py-2 px-2.5 rounded-lg text-xs font-medium text-dark-textSec hover:text-dark-textPri transition-all flex items-center justify-center gap-1.5 whitespace-nowrap bg-transparent border border-transparent';

    if (DOM.stdNasionalBtn && DOM.stdGlobalBtn) {
      DOM.stdNasionalBtn.className = isGlobal ? inactiveCls : activeCls;
      DOM.stdGlobalBtn.className = isGlobal ? activeCls : inactiveCls;
      DOM.stdNasionalBtn.setAttribute('aria-checked', String(!isGlobal));
      DOM.stdGlobalBtn.setAttribute('aria-checked', String(isGlobal));
    }
    updateStandardUI(state.language);
  }

  function saveSessionState(viewName) {
    try {
      const payload = {
        view: viewName,
        selectedRole: state.selectedRole,
        screeningStandard: state.screeningStandard,
        customSeniority: state.customSeniority,
        customRoleTitle: DOM.customRoleTitleInput ? DOM.customRoleTitleInput.value : '',
        customRoleKeywords: DOM.customRoleKeywordsInput ? DOM.customRoleKeywordsInput.value : ''
      };

      if (viewName === 'results') {
        payload.cvText = state.cvText || (DOM.rawCvText ? DOM.rawCvText.value : '');
        payload.currentAnalysis = state.currentAnalysis;
      } else if (viewName === 'compareResults') {
        payload.compareTextA = DOM.compareTextA ? DOM.compareTextA.value : '';
        payload.compareTextB = DOM.compareTextB ? DOM.compareTextB.value : '';
        payload.currentComparison = state.currentComparison;
      }

      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(payload));
    } catch (_) {
      // Ignore storage quota or privacy mode errors silently
    }
  }

  function clearSessionState() {
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (_) {
      // Ignore storage errors silently
    }
  }

  function restoreSessionState() {
    try {
      const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (!saved || !saved.view) return;

      if (saved.screeningStandard) {
        applyScreeningStandard(saved.screeningStandard);
      }
      if (saved.customSeniority) {
        state.customSeniority = saved.customSeniority;
        updateSeniorityPillsUI(saved.customSeniority);
      }
      if (saved.selectedRole) {
        state.selectedRole = saved.selectedRole;
        if (DOM.roleSelect) DOM.roleSelect.value = saved.selectedRole;
        updateRoleDetails(saved.selectedRole);
        if (saved.selectedRole === 'custom') {
          if (DOM.customRoleTitleInput && typeof saved.customRoleTitle === 'string') {
            DOM.customRoleTitleInput.value = saved.customRoleTitle;
          }
          if (DOM.customRoleKeywordsInput && typeof saved.customRoleKeywords === 'string') {
            DOM.customRoleKeywordsInput.value = saved.customRoleKeywords;
          }
        }
      }

      if (saved.view === 'results' && typeof saved.cvText === 'string' && saved.cvText.trim()) {
        state.cvText = saved.cvText.slice(0, 100000);
        if (DOM.rawCvText) DOM.rawCvText.value = state.cvText;
        state.currentAnalysis = analyzeResume(state.cvText, state.selectedRole);
        renderAnalysisResults(state.currentAnalysis, { skipScroll: true });
      } else if (
        saved.view === 'compareResults' &&
        typeof saved.compareTextA === 'string' &&
        typeof saved.compareTextB === 'string' &&
        saved.compareTextA.trim().length >= 40 &&
        saved.compareTextB.trim().length >= 40
      ) {
        const textA = saved.compareTextA.trim().slice(0, 100000);
        const textB = saved.compareTextB.trim().slice(0, 100000);
        if (DOM.compareTextA) DOM.compareTextA.value = textA;
        if (DOM.compareTextB) DOM.compareTextB.value = textB;
        const lang = state.language;
        const savedNameA = saved.currentComparison && typeof saved.currentComparison.nameA === 'string'
          ? saved.currentComparison.nameA.slice(0, 120)
          : i18n[lang].compareCandidateA;
        const savedNameB = saved.currentComparison && typeof saved.currentComparison.nameB === 'string'
          ? saved.currentComparison.nameB.slice(0, 120)
          : i18n[lang].compareCandidateB;
        state.currentComparison = {
          resA: analyzeResume(textA, state.selectedRole),
          resB: analyzeResume(textB, state.selectedRole),
          roleKey: state.selectedRole,
          nameA: savedNameA,
          nameB: savedNameB
        };
        setInputMode('compare');
        renderComparisonResults(state.currentComparison, { skipScroll: true });
      }
    } catch (_) {
      // Ignore corrupt session payload
    }
  }

  function init() {
    (() => {
      const _sigCode = 'TUZBLUVWOjpzY3JlZW5vcmE6OnYx';
      const _sig = typeof atob === 'function' ? atob(_sigCode) : _sigCode;
      if (typeof document !== 'undefined' && document.documentElement) document.documentElement.dataset.buildSig = _sig;
      if (typeof window !== 'undefined' && !window.__MFA_SIG__) {
        try { Object.defineProperty(window, '__MFA_SIG__', { value: Object.freeze({ owner: 'MFA', guard: 'EV', app: 'screenora', token: _sig }), enumerable: false, configurable: false }); } catch (_) {}
      }
    })();
    applyTheme(state.theme);
    applyLanguage(state.language);
    setupEventListeners();
    updateRoleDetails(state.selectedRole);
    updateSeniorityPillsUI(state.customSeniority);

    const urlParams = new URLSearchParams(window.location.search);
    let builderDraft = null;
    try {
      builderDraft = sessionStorage.getItem('screenora_builder_draft');
    } catch (_) {
      builderDraft = null;
    }

    if (urlParams.get('from') === 'builder' && builderDraft && builderDraft.trim()) {
      clearSessionState();
      state.cvText = builderDraft;
      if (DOM.rawCvText) DOM.rawCvText.value = builderDraft;
      setInputMode('single');
      setTab('paste');
      try {
        sessionStorage.removeItem('screenora_builder_draft');
      } catch (_) {
        // Ignore storage errors silently
      }
      showToast(
        state.language === 'id'
          ? 'Draf CV dari Live Builder berhasil dimuat dan siap di-scan!'
          : 'CV draft from Live Builder loaded and ready to scan!'
      );
    } else if (urlParams.get('sample') === '1') {
      clearSessionState();
      if (DOM.resultsView) DOM.resultsView.classList.add('hidden');
      if (DOM.compareResultsView) DOM.compareResultsView.classList.add('hidden');
      if (DOM.inputView) DOM.inputView.classList.remove('hidden');
      setInputMode('single');
      state.cvText = SAMPLE_PROFILE_TEXT;
      if (DOM.rawCvText) DOM.rawCvText.value = SAMPLE_PROFILE_TEXT;
      setTab('paste');
      if (DOM.roleSelect) DOM.roleSelect.value = 'hr';
      updateRoleDetails('hr');
      showToast(state.language === 'id' ? i18n.id.toastSampleLoaded : i18n.en.toastSampleLoaded);
      if (DOM.rawCvText || DOM.runAnalysisBtn) {
        runScreening();
      }
    } else if (DOM.inputView || DOM.resultsView) {
      restoreSessionState();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('pageshow', (e) => {
    if (e.persisted) restoreSessionState();
  });

})();
