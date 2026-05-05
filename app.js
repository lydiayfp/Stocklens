/* ============================================================
   StockLens — app.js
   All data fetching, extraction, and calculation logic.
   ============================================================ */
'use strict';

/* ── CORS PROXY POOL ────────────────────────────────────────
   8 proxies tried in order. /raw always preferred over /get
   for large quoteSummary calls (avoids ~1MB size limit).
   ─────────────────────────────────────────────────────────── */
const PROXIES = [
  { n: 'allorigins',   url: u => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,      wrap: false },
  { n: 'corsproxy.io', url: u => `https://corsproxy.io/?url=${encodeURIComponent(u)}`,               wrap: false },
  { n: 'codetabs',     url: u => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`, wrap: false },
  { n: 'corsproxy.org',url: u => `https://corsproxy.org/?${encodeURIComponent(u)}`,                  wrap: false },
  { n: 'thingproxy',   url: u => `https://thingproxy.freeboard.io/fetch/${u}`,                       wrap: false },
  { n: 'cors.sh',      url: u => `https://proxy.cors.sh/${u}`,                                       wrap: false },
  { n: 'crossorigin',  url: u => `https://crossorigin.me/${u}`,                                      wrap: false },
  { n: 'allorigins2',  url: u => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`,      wrap: true  },
];

const YF = {
  chart1:  'https://query1.finance.yahoo.com/v8/finance/chart/',
  chart2:  'https://query2.finance.yahoo.com/v8/finance/chart/',
  qs:      'https://query2.finance.yahoo.com/v11/finance/quoteSummary/',
  search:  'https://query1.finance.yahoo.com/v1/finance/search?quotesCount=8&newsCount=0&q=',
  /* Four small module batches — avoids proxy size limits */
  MOD_A: 'financialData',
  MOD_B: 'defaultKeyStatistics,summaryDetail',
  MOD_C: 'cashflowStatementHistory,cashflowStatementHistoryQuarterly',
  MOD_D: 'incomeStatementHistory,balanceSheetHistory,earningsTrend',
};

/* ── STATE ──────────────────────────────────────────────────── */
const APP = {
  sym: '', data: null, loading: false, pct: 0, step: '',
  tab: 'overview',        // overview | history | valuation | cashflow
  histTab: 'fcf',
  chart: null,
  pxChart: -1, pxFund: -1,
  cfg: { bondYield: 4.4, discount: 10 },
};

function saveApp() {
  try {
    localStorage.setItem('sl_cfg', JSON.stringify(APP.cfg));
    localStorage.setItem('sl_pxc', APP.pxChart);
    localStorage.setItem('sl_pxf', APP.pxFund);
  } catch (e) {}
}
function loadApp() {
  try {
    const c = localStorage.getItem('sl_cfg'); if (c) Object.assign(APP.cfg, JSON.parse(c));
    const p = localStorage.getItem('sl_pxc'); if (p != null) APP.pxChart = +p || 0;
    const f = localStorage.getItem('sl_pxf'); if (f != null) APP.pxFund  = +f || 0;
  } catch (e) {}
}

/* ── CORE FETCH ──────────────────────────────────────────────
   Tries direct fetch first, then 8 proxies in order.
   savedPx: index of last-known-good proxy (-1 = none)
   skipWrap: true for large QS calls (skip allorigins /get)
   ─────────────────────────────────────────────────────────── */
async function apiFetch(url, savedPx = -1, skipWrap = false, ms = 12000) {
  /* 1. Direct */
  try {
    const ac = new AbortController();
    setTimeout(() => ac.abort(), Math.min(ms, 7000));
    const r = await fetch(url, { signal: ac.signal, headers: { Accept: 'application/json' } });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const t = await r.text(); if (!t || t.length < 5) throw new Error('empty');
    return { px: -1, data: JSON.parse(t) };
  } catch (e) {}

  /* 2. Proxies — best-known first */
  const order = [];
  if (savedPx >= 0 && savedPx < PROXIES.length) order.push(savedPx);
  for (let i = 0; i < PROXIES.length; i++) if (!order.includes(i)) order.push(i);

  for (const idx of order) {
    const px = PROXIES[idx];
    if (skipWrap && px.wrap) continue;
    try {
      const ac2 = new AbortController();
      setTimeout(() => ac2.abort(), ms + 5000);
      const r2 = await fetch(px.url(url), { signal: ac2.signal, headers: { Accept: 'application/json' } });
      if (!r2.ok) throw new Error('HTTP ' + r2.status);
      const t2 = await r2.text(); if (!t2 || t2.length < 5) throw new Error('empty');
      let parsed;
      if (px.wrap) { const w = JSON.parse(t2); if (!w?.contents) throw new Error('no contents'); parsed = JSON.parse(w.contents); }
      else parsed = JSON.parse(t2);
      return { px: idx, data: parsed };
    } catch (e) {}
  }
  throw new Error('All proxies failed for: ' + url.slice(0, 60));
}

/* ── YAHOO FETCHERS ──────────────────────────────────────── */
async function fetchChart(sym, range, interval) {
  const params = `?range=${range}&interval=${interval}&includePrePost=false`;
  for (const base of [YF.chart1, YF.chart2]) {
    try {
      const r = await apiFetch(base + sym + params, APP.pxChart, false, 11000);
      const res = r.data?.chart?.result?.[0];
      if (res?.meta?.regularMarketPrice) {
        if (r.px >= 0) { APP.pxChart = r.px; setBadge('✓ ' + PROXIES[r.px].n, 'ok'); }
        else setBadge('✓ Direct', 'ok');
        return res;
      }
    } catch (e) {}
  }
  return null;
}

async function fetchSearch(q) {
  try {
    const r = await apiFetch(YF.search + encodeURIComponent(q), APP.pxChart, false, 8000);
    return (r.data?.finance?.result?.[0]?.quotes || [])
      .filter(x => x.quoteType && x.symbol && !x.symbol.includes('^'));
  } catch (e) { return []; }
}

async function fetchQS(sym, mods) {
  const url = `${YF.qs}${sym}?modules=${mods}&formatted=true&lang=en-US`;
  try {
    const r = await apiFetch(url, APP.pxFund, true, 22000);
    if (r.px >= 0) APP.pxFund = r.px;
    if (r.data?.quoteSummary?.error) return null;
    return r.data?.quoteSummary?.result?.[0] || null;
  } catch (e) { return null; }
}

async function fetchAllFundamentals(sym) {
  setStep('Fetching fundamentals (4 batches)…'); setPct(40);
  const [rA, rB, rC, rD] = await Promise.allSettled([
    fetchQS(sym, YF.MOD_A),
    fetchQS(sym, YF.MOD_B),
    fetchQS(sym, YF.MOD_C),
    fetchQS(sym, YF.MOD_D),
  ]);
  const merged = {};
  for (const r of [rA, rB, rC, rD])
    if (r.status === 'fulfilled' && r.value) Object.assign(merged, r.value);
  setPct(80);
  return Object.keys(merged).length ? merged : null;
}

/* ── RAW VALUE EXTRACTOR ─────────────────────────────────────
   Yahoo Finance wraps ALL numbers: { raw: N, fmt: "string" }
   rw() safely pulls the numeric .raw value.
   ─────────────────────────────────────────────────────────── */
function rw(v) {
  if (v == null) return null;
  if (typeof v === 'object' && 'raw' in v) {
    const n = v.raw; return (n != null && isFinite(n)) ? n : null;
  }
  if (typeof v === 'number' && isFinite(v)) return v;
  return null;
}

function getArr(obj, path) {
  if (!obj || !path) return [];
  let c = obj;
  for (const k of path.split('.')) c = c?.[k];
  return Array.isArray(c) ? c : [];
}

/* ── EXTRACT ALL METRICS ──────────────────────────────────── */
function extractMetrics(meta, fund) {
  const M = {};

  /* ══ FROM v8/chart META (always available, no proxy needed) ══ */
  M.price   = meta.regularMarketPrice || 0;
  M.prev    = meta.chartPreviousClose || meta.previousClose || M.price;
  M.chg     = M.price - M.prev;
  M.chgPct  = M.prev ? (M.chg / M.prev * 100) : 0;
  M.h52     = rw(meta.fiftyTwoWeekHigh)  || meta.fiftyTwoWeekHigh  || 0;
  M.l52     = rw(meta.fiftyTwoWeekLow)   || meta.fiftyTwoWeekLow   || 0;
  M.vol     = rw(meta.regularMarketVolume) || rw(meta.averageVolume) || 0;
  M.avgVol  = rw(meta.averageDailyVolume3Month) || rw(meta.averageVolume) || 0;
  M.mktCap  = rw(meta.marketCap) || null;
  M.pe      = rw(meta.trailingPE) || null;
  M.eps     = rw(meta.epsTrailingTwelveMonths) || null;
  M.epsF    = rw(meta.epsForward) || null;
  M.bvps    = rw(meta.bookValue) || null;
  M.pb      = rw(meta.priceToBook) || null;
  M.beta    = rw(meta.beta) || null;
  M.divY    = rw(meta.dividendYield) || null;
  M.name    = meta.longName || meta.shortName || '';
  M.ccy     = meta.currency || '';
  M.exch    = meta.exchangeName || meta.fullExchangeName || '';
  M.qt      = meta.quoteType || meta.instrumentType || '';

  if (!fund) return M;

  /* ══ financialData (Batch A) ══ */
  const fd = fund.financialData || {};
  M.roe     = rw(fd.returnOnEquity);
  M.roa     = rw(fd.returnOnAssets);
  M.pm      = rw(fd.profitMargins);
  M.gm      = rw(fd.grossMargins);
  M.om      = rw(fd.operatingMargins);
  M.fcf     = rw(fd.freeCashflow);        // direct FCF
  M.opCF    = rw(fd.operatingCashflow);
  M.td      = rw(fd.totalDebt);
  M.cash    = rw(fd.totalCash);
  M.de      = rw(fd.debtToEquity);        // stored as e.g. 48.2
  M.cr      = rw(fd.currentRatio);
  M.qr      = rw(fd.quickRatio);
  M.rev     = rw(fd.totalRevenue);
  M.ebitda  = rw(fd.ebitda);
  M.tgtLo   = rw(fd.targetLowPrice);
  M.tgtMn   = rw(fd.targetMeanPrice);
  M.tgtHi   = rw(fd.targetHighPrice);
  M.recKey  = typeof fd.recommendationKey === 'string' ? fd.recommendationKey : '';
  M.numAn   = rw(fd.numberOfAnalystOpinions);
  M.eps2    = rw(fd.trailingEps);

  /* ══ defaultKeyStatistics + summaryDetail (Batch B) ══ */
  const dks = fund.defaultKeyStatistics || {};
  const sd  = fund.summaryDetail || {};
  M.peg       = rw(dks.pegRatio);
  M.shares    = rw(dks.sharesOutstanding);
  M.fwPE      = rw(dks.forwardPE) || rw(sd.forwardPE);
  M.fwEPS     = rw(dks.forwardEps) || M.epsF;
  M.shortR    = rw(dks.shortRatio);
  M.shortPct  = rw(dks.shortPercentOfFloat);
  M.bvpsDKS   = rw(dks.bookValue);
  M.betaDKS   = rw(dks.beta);
  M.trailEPS  = rw(dks.trailingEps);
  M.aum       = rw(sd.totalAssets);
  M.payoutR   = rw(sd.payoutRatio);
  M.divY5y    = rw(sd.fiveYearAvgDividendYield);
  M.divYsd    = rw(sd.dividendYield);
  M.pe2       = rw(sd.trailingPE);
  M.exDivTs   = rw(sd.exDividendDate);
  M.divRate   = rw(sd.dividendRate);

  /* Fill gaps using fallbacks */
  M.bvps  = M.bvps  || M.bvpsDKS;
  M.beta  = M.beta  || M.betaDKS;
  M.eps   = M.eps   || M.trailEPS || M.eps2;
  M.pe    = M.pe    || M.pe2;
  M.divY  = M.divY  != null ? M.divY : M.divYsd;
  M.epsF  = M.epsF  || M.fwEPS;
  if (!M.fwPE && M.fwEPS && M.fwEPS > 0 && M.price > 0) M.fwPE = M.price / M.fwEPS;

  /* ══ cashflowStatements (Batch C) ══
     CRITICAL: capitalExpenditures is stored as NEGATIVE in Yahoo Finance.
     FCF = totalCashFromOperatingActivities + capitalExpenditures (= OpCF - |CapEx|) */
  const cfAnn = getArr(fund, 'cashflowStatementHistory.cashflowStatements');
  const cfQtr = getArr(fund, 'cashflowStatementHistoryQuarterly.cashflowStatements');
  M.cfAnn = cfAnn;
  M.cfQtr = cfQtr;

  if (M.fcf === null && cfAnn.length > 0) {
    const opA = rw(cfAnn[0].totalCashFromOperatingActivities);
    const cxA = rw(cfAnn[0].capitalExpenditures); // negative
    if (opA !== null) {
      M.fcf = cxA !== null ? opA + cxA : opA;
      if (M.opCF === null) M.opCF = opA;
    }
  }
  if (M.fcf === null && cfQtr.length > 0) {
    let sOp = 0, sCx = 0, hOp = false, hCx = false;
    for (let i = 0; i < Math.min(4, cfQtr.length); i++) {
      const oq = rw(cfQtr[i].totalCashFromOperatingActivities);
      const cq = rw(cfQtr[i].capitalExpenditures);
      if (oq !== null) { sOp += oq; hOp = true; }
      if (cq !== null) { sCx += cq; hCx = true; }
    }
    if (hOp) { M.fcf = hCx ? sOp + sCx : sOp; if (M.opCF === null) M.opCF = sOp; }
  }

  /* ══ incomeStatements + balanceSheet + earningsTrend (Batch D) ══ */
  const isArr = getArr(fund, 'incomeStatementHistory.incomeStatementHistory');
  const bsArr = getArr(fund, 'balanceSheetHistory.balanceSheetStatements');
  M.isArr = isArr; M.bsArr = bsArr;

  if (isArr.length > 0) {
    M.ni    = rw(isArr[0].netIncome);
    M.revIS = rw(isArr[0].totalRevenue);
    M.gp    = rw(isArr[0].grossProfit);
    M.opInc = rw(isArr[0].operatingIncome) || null;
    M.rev   = M.rev || M.revIS;
    if (isArr.length >= 2) {
      const n0 = rw(isArr[0].netIncome), n1 = rw(isArr[1].netIncome);
      M.niGrowth = (n0 != null && n1 != null && n1 > 0) ? ((n0 - n1) / Math.abs(n1) * 100) : null;
      const r0 = rw(isArr[0].totalRevenue), r1 = rw(isArr[1].totalRevenue);
      M.revGrowth = (r0 != null && r1 != null && r1 > 0) ? ((r0 - r1) / Math.abs(r1) * 100) : null;
    }
  }
  if (bsArr.length > 0) {
    M.ta  = rw(bsArr[0].totalAssets);
    M.te  = rw(bsArr[0].totalStockholderEquity);
    M.tl  = rw(bsArr[0].totalLiab);
    M.ltd = rw(bsArr[0].longTermDebt) || null;
  }

  /* ══ Earnings trend → growth estimate for PEG & IV ══ */
  M.gEst = 10; M.gSrc = 'default 10%';
  const trends = getArr(fund, 'earningsTrend.trend');
  for (const t of trends) {
    if ((t.period === '5y' || t.period === '+5y') && rw(t.growth) != null) {
      M.gEst = rw(t.growth) * 100; M.gSrc = '5Y analyst est.'; break;
    }
  }
  if (M.gSrc === 'default 10%') {
    const eqg = rw(dks.earningsQuarterlyGrowth);
    if (eqg != null) { M.gEst = eqg * 100; M.gSrc = 'quarterly growth'; }
  }

  /* ══ PEG RATIO — calculated if Yahoo doesn't supply it ══
     PEG = (P/E TTM) ÷ Annual EPS Growth Rate
     Forward PEG = (Fwd P/E) ÷ Annual EPS Growth Rate      */
  if (!M.peg && M.pe && M.pe > 0 && M.gEst > 0) M.peg = M.pe / M.gEst;
  M.pegFwd = (M.fwPE && M.fwPE > 0 && M.gEst > 0) ? M.fwPE / M.gEst : null;

  /* ══ DERIVED / CALCULATED METRICS ══ */
  M.netDebt    = (M.td != null && M.cash != null) ? M.td - M.cash : null;
  M.debtRatio  = (M.td != null && M.ta && M.ta > 0) ? M.td / M.ta : null;
  M.fcfPS      = (M.fcf != null && M.shares && M.shares > 0) ? M.fcf / M.shares : null;
  M.fcfYield   = (M.fcf != null && M.mktCap && M.mktCap > 0) ? M.fcf / M.mktCap : null;
  // D/E: Yahoo stores as 48.2 meaning 0.482× (already ×100). Normalise.
  M.deRatio    = M.de != null ? (M.de > 20 ? M.de / 100 : M.de) : null;
  const ev     = (M.mktCap && M.netDebt != null) ? M.mktCap + M.netDebt
               : (M.mktCap && M.td)              ? M.mktCap + M.td : null;
  M.evEbitda   = (ev && M.ebitda && M.ebitda > 0)  ? ev / M.ebitda  : null;
  M.evRev      = (ev && M.rev    && M.rev    > 0)  ? ev / M.rev     : null;
  M.roe2       = (M.ni != null && M.te && M.te > 0) ? M.ni / M.te   : M.roe;
  M.roa2       = (M.ni != null && M.ta && M.ta > 0) ? M.ni / M.ta   : M.roa;

  /* 52-week position (where is price between L52 and H52) */
  M.pos52 = (M.h52 && M.l52 && M.h52 > M.l52)
    ? Math.round((M.price - M.l52) / (M.h52 - M.l52) * 100) : null;

  return M;
}

/* ══ 10-YEAR ANNUAL HISTORY BUILD ═══════════════════════════ */
function build10Y(fund) {
  if (!fund) return null;
  const cfA = getArr(fund, 'cashflowStatementHistory.cashflowStatements');
  const isA = getArr(fund, 'incomeStatementHistory.incomeStatementHistory');
  const bsA = getArr(fund, 'balanceSheetHistory.balanceSheetStatements');
  if (!cfA.length && !isA.length) return null;

  const fy  = ts => ts ? new Date(ts * 1000).getFullYear() : null;
  const by  = {};
  const en  = yr => { if (!by[yr]) by[yr] = { yr }; return by[yr]; };

  for (const s of isA) {
    const yr = fy(rw(s.endDate)); if (!yr) continue;
    const r = en(yr);
    r.rev   = rw(s.totalRevenue);
    r.ni    = rw(s.netIncome);
    r.gp    = rw(s.grossProfit);
    r.opInc = rw(s.operatingIncome) || null;
    r.ebit  = rw(s.ebit) || null;
  }
  for (const s of cfA) {
    const yr = fy(rw(s.endDate)); if (!yr) continue;
    const r = en(yr);
    r.opCF  = rw(s.totalCashFromOperatingActivities);
    const cx = rw(s.capitalExpenditures); // negative in Yahoo
    r.capex = cx != null ? Math.abs(cx) : null; // store as positive for display
    r.fcf   = rw(s.freeCashflow) ?? (r.opCF != null && cx != null ? r.opCF + cx : r.opCF);
  }
  for (const s of bsA) {
    const yr = fy(rw(s.endDate)); if (!yr) continue;
    const r = en(yr);
    r.td   = rw(s.totalDebt)               || rw(s.longTermDebt) || null;
    r.cash = rw(s.cash)                    || null;
    r.ta   = rw(s.totalAssets)             || null;
    r.eq   = rw(s.totalStockholderEquity)  || null;
  }

  const yrs = Object.keys(by).map(Number).sort((a, b) => b - a).slice(0, 10);
  return { yrs, by };
}

/* ══ INTRINSIC VALUE FORMULAS ════════════════════════════════ */
function grahamV(eps, g, by)    { if (!eps || eps <= 0) return null; return eps * (8.5 + 2 * Math.min(Math.max(g || 10, 0), 40)) * 4.4 / (by || 4.4); }
function grahamNum(eps, bv)     { if (!eps || eps <= 0 || !bv || bv <= 0) return null; return Math.sqrt(22.5 * Math.abs(eps) * Math.abs(bv)); }
function dcfEPS(eps, g, dr)     {
  if (!eps || eps <= 0) return null;
  const gr = (g || 10) / 100, d = (dr || 10) / 100;
  let pv = 0;
  for (let i = 1; i <= 10; i++) pv += eps * Math.pow(1 + gr, i) / Math.pow(1 + d, i);
  return pv + eps * Math.pow(1 + gr, 10) * 15 / Math.pow(1 + d, 10);
}
function dcfFCF(fcf, sh, g, dr) { return (!fcf || fcf <= 0 || !sh || sh <= 0) ? null : dcfEPS(fcf / sh, g, dr); }
function mosCalc(iv, p)         { return (iv && p && iv > 0) ? (iv - p) / iv * 100 : null; }

/* ══ FORMATTING HELPERS ═══════════════════════════════════════ */
const CC = { USD:'$', GBP:'£', GBp:'p', SGD:'S$', EUR:'€', HKD:'HK$', AUD:'A$', CAD:'C$', JPY:'¥', CHF:'Fr', INR:'₹' };
const cs   = c  => CC[c] || (c ? c + ' ' : '');
const fN   = (n, dp = 2, pfx = '') => {
  if (n == null || !isFinite(n)) return 'N/A';
  const a = Math.abs(n);
  if (a >= 1e12) return pfx + (n / 1e12).toFixed(1) + 'T';
  if (a >= 1e9)  return pfx + (n / 1e9).toFixed(2)  + 'B';
  if (a >= 1e6)  return pfx + (n / 1e6).toFixed(2)  + 'M';
  if (a >= 1e3)  return pfx + (n / 1e3).toFixed(1)  + 'K';
  return pfx + n.toFixed(dp);
};
const fP   = (n, dp = 2) => (n == null || !isFinite(n)) ? 'N/A' : n.toFixed(dp);
const fPct = (n, mul = true) => (n == null || !isFinite(n)) ? 'N/A' : ((mul ? n * 100 : n)).toFixed(2) + '%';
const exN  = (e, s) => {
  const m = { NMS:'NASDAQ', NGM:'NASDAQ', NGS:'NASDAQ', NYQ:'NYSE', PCX:'NYSE Arca',
    NYSEArca:'NYSE Arca', SES:'SGX', LSE:'London SE', IOB:'LSE Intl', ASX:'ASX',
    FRA:'Frankfurt', PAR:'Euronext Paris', AMS:'Euronext AMS', HKG:'HKEX', TOR:'TSX' };
  if (e && m[e]) return m[e];
  if (s) {
    if (s.endsWith('.SI')) return 'SGX'; if (s.endsWith('.L'))  return 'London SE';
    if (s.endsWith('.AX')) return 'ASX'; if (s.endsWith('.HK')) return 'HKEX';
    if (s.endsWith('.PA')) return 'Euronext'; if (s.endsWith('.DE')) return 'Frankfurt';
  }
  return e || '';
};
const rl  = k => ({ strongbuy:'Strong Buy', buy:'Buy', hold:'Hold', underperform:'Underperform', sell:'Sell' })[k?.toLowerCase()] || k || '—';
const rc  = k => k?.includes('buy') ? 'pos' : (k === 'sell' || k?.includes('under')) ? 'neg' : 'neu';
const ago = ts => { if (!ts) return 'live'; const s = Math.floor(Date.now()/1000 - ts); if (s < 120) return 'live'; if (s < 3600) return Math.floor(s/60) + 'm ago'; return ''; };

/* ══ UI HELPERS ═══════════════════════════════════════════════ */
function setBadge(t, c) { const el = document.getElementById('badge'); if (el) { el.textContent = t; el.className = c; } }
function setStep(s)     { APP.step = s; const el = document.getElementById('lstep'); if (el) el.textContent = s; }
function setPct(p)      { APP.pct  = p; const el = document.getElementById('lfill');  if (el) el.style.width = p + '%'; }
function toast(msg)     { const t = document.getElementById('toast'); if (!t) return; t.textContent = msg; t.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2800); }

function hideSugg()     { const s = document.getElementById('sugg'); if (s) s.style.display = 'none'; }

/* ══ MAIN SEARCH ══════════════════════════════════════════════ */
async function runSearch(raw) {
  if (!raw?.trim()) return;
  let sym = raw.trim().toUpperCase();
  const inp = document.getElementById('si'); if (inp) inp.value = sym;
  hideSugg();
  APP.sym = sym; APP.data = null; APP.loading = true; APP.pct = 0; APP.step = '';
  render();

  try {
    setStep('Fetching live price…'); setPct(10);
    let chartRes = await fetchChart(sym, '1d', '1m');

    if (!chartRes) {
      setStep('Resolving ticker…'); setPct(20);
      const sr = await fetchSearch(sym);
      if (sr.length) { const rs = sr[0].symbol; chartRes = await fetchChart(rs, '1d', '1m'); if (chartRes) sym = rs; }
    }

    if (!chartRes) {
      const sg = await fetchSearch(raw.trim());
      APP.data = { err: true, sym: raw.trim().toUpperCase(), sugg: sg };
      APP.loading = false; render(); return;
    }

    sym = chartRes.meta?.symbol || sym;
    APP.sym = sym; if (inp) inp.value = sym;
    setBadge('Loading…', 'chk');

    setStep('Fetching 20Y history + all fundamentals…'); setPct(30);
    const [hRes, fRes] = await Promise.allSettled([
      fetchChart(sym, '20y', '1mo'),
      fetchAllFundamentals(sym),
    ]);

    let hist = null;
    if (hRes.status === 'fulfilled' && hRes.value) {
      const hv = hRes.value;
      hist = { ts: hv.timestamp || [], close: hv.indicators?.quote?.[0]?.close || [], ccy: hv.meta?.currency || '' };
    }
    const fund = fRes.status === 'fulfilled' ? fRes.value : null;

    setStep('Calculating metrics…'); setPct(92);
    const M = extractMetrics(chartRes.meta, fund);
    APP.data = { sym, meta: chartRes.meta, fund, hist, M, ts: Math.floor(Date.now() / 1000) };
    saveApp();

  } catch (e) {
    APP.data = { err: true, sym, sugg: [], msg: e.message };
  }

  APP.loading = false; APP.step = ''; setPct(100); render();
}

async function showSugg(q) {
  const sugg = document.getElementById('sugg'); if (!sugg || !q) return;
  try {
    const results = await fetchSearch(q); if (!results.length) { hideSugg(); return; }
    sugg.style.display = 'block';
    sugg.innerHTML = '<div class="sh">Suggestions</div>' +
      results.slice(0, 7).map(r => `
        <div class="sitem" data-s="${r.symbol}">
          <div><div class="sticker">${r.symbol}</div>
          <div class="sname">${r.shortname || r.longname || ''}</div></div>
          <div class="smeta">${exN(r.exchDisp || r.exchange, r.symbol)}<br>${r.quoteType || ''}</div>
        </div>`).join('');
    sugg.querySelectorAll('.sitem').forEach(el => {
      const go = () => runSearch(el.dataset.s);
      el.addEventListener('mousedown', go);
      el.addEventListener('touchstart', e => { e.preventDefault(); go(); }, { passive: false });
    });
  } catch (e) { hideSugg(); }
