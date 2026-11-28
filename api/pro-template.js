const {
  applyApiHeaders,
  getClientIp,
  isRateLimited,
  recordFailure,
  clearFailures,
  getSigningSecret,
  verifySessionToken,
  parseJsonRequest
} = require('./_auth');

// Pro templates stored server-side and released only for verified HMAC session tokens
const PRO_TEMPLATES = {
  executive_leadership: {
    id: 'executive_leadership',
    title: 'Executive & P&L Leadership',
    filename: 'CV_ATS_Executive_Leadership_Screenora.doc',
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
    filename: 'Resume_Silicon_Valley_Startup_Screenora.doc',
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

module.exports = async function handler(req, res) {
  applyApiHeaders(res);

  if (!getSigningSecret()) {
    return res.status(503).json({
      ok: false,
      error: 'Template delivery service is not configured'
    });
  }

  const body = parseJsonRequest(req, res);
  if (!body) return;

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({
      ok: false,
      error: 'Too many failed attempts. Please wait 5 minutes before trying again.'
    });
  }

  if (typeof body.token !== 'string' || body.token.length === 0 || body.token.length > 512) {
    return res.status(401).json({ ok: false, error: 'Pro access token is required' });
  }

  if (!verifySessionToken(body.token)) {
    recordFailure(ip);
    return res.status(401).json({ ok: false, error: 'Session token expired or invalid' });
  }

  clearFailures(ip);

  const key = typeof body.templateKey === 'string' ? body.templateKey.trim() : '';
  if (!key || !Object.hasOwn(PRO_TEMPLATES, key)) {
    return res.status(404).json({ ok: false, error: 'Pro template not found' });
  }

  return res.status(200).json({
    ok: true,
    template: PRO_TEMPLATES[key]
  });
};
