/* ============================================================
   StockLens — ui.js
   All page rendering, component building, chart drawing.
   ============================================================ */
'use strict';

/* ══ METRIC ROW BUILDER ═══════════════════════════════════════
   Creates a labelled row with a populated value box.
   cls: 'pos'|'neg'|'neu'|'na'
   ─────────────────────────────────────────────────────────── */
function MRow(label, value, cls, hint) {
  const v    = (value == null || value === '') ? 'N/A' : String(value);
  const cCls = v === 'N/A' ? 'na' : (cls || 'neu');
  return `
  <div class="mrow">
    <div class="mrow__label">${label}</div>
    <div class="mrow__val ${cCls}">${v}</div>
    ${hint ? `<div class="mrow__hint">${hint}</div>` : ''}
  </div>`;
}

/* Editable row — for IV inputs */
function MRowE(label, value, id, hint, unit) {
  const v = (value == null || value === '') ? '' : value;
  return `
  <div class="mrow mrow--edit">
    <div class="mrow__label">${label}${unit ? `<span class="mrow__unit">${unit}</span>` : ''}</div>
    <input class="mrow__val editable" id="${id}" type="number" value="${v}" step="any">
    ${hint ? `<div class="mrow__hint">${hint}</div>` : ''}
  </div>`;
}

/* Section header */
function SEC(title, icon) {
  return `<div class="sec"><span class="sec__icon">${icon}</span><span class="sec__title">${title}</span></div>`;
}

/* Rating → css class */
function clsRate(v, lo, hi, lowerBetter) {
  if (v == null || !isFinite(v)) return 'na';
  if (lowerBetter) return v <= lo ? 'pos' : v <= hi ? 'neu' : 'neg';
  return v >= hi ? 'pos' : v >= lo ? 'neu' : 'neg';
}

/* ══ OVERVIEW TAB ══════════════════════════════════════════════ */
function buildOverview(d) {
  const M = d.M, sym = d.sym, ccy = cs(M.ccy);
  const isETF = M.qt === 'ETF' || M.qt === 'MUTUALFUND';
  const up = M.chg >= 0;
  const hasFund = !!d.fund;

  const tag = M.qt === 'ETF' ? '<span class="badge badge--etf">ETF</span>'
            : M.qt === 'MUTUALFUND' ? '<span class="badge badge--ut">Unit Trust</span>'
            : '<span class="badge badge--stock">Stock</span>';

  /* 52-week bar */
  const pos52Html = M.pos52 != null ? `
    <div class="w52">
      <div class="w52__bar"><div class="w52__fill" style="left:${M.pos52}%"></div></div>
      <div class="w52__labels"><span>${ccy}${fP(M.l52)}</span><span>${M.pos52}% of range</span><span>${ccy}${fP(M.h52)}</span></div>
    </div>` : '';

  return `
  <!-- TICKER HERO -->
  <div class="hero">
    <div class="hero__left">
      <div class="hero__sym">${sym}</div>
      <div class="hero__name">${M.name}</div>
      <div class="hero__meta">${exN(M.exch, sym)}${M.ccy ? ' · ' + M.ccy : ''} · ${ago(d.ts)}</div>
    </div>
    ${tag}
  </div>

  <!-- PRICE BLOCK -->
  <div class="price-block">
    <div class="price-block__main">
      <span class="price-block__val">${fP(M.price)}</span>
      <span class="price-block__ccy">${M.ccy}</span>
      <span class="price-block__chg ${up ? 'pos' : 'neg'}">${up ? '+' : ''}${fP(M.chg)} (${up ? '+' : ''}${fP(M.chgPct, 2)}%)</span>
    </div>
    ${pos52Html}
  </div>

  <!-- KPI STRIP -->
  <div class="kpi-strip">
    <div class="kpi"><div class="kpi__k">Market Cap</div><div class="kpi__v">${M.mktCap ? ccy + fN(M.mktCap) : 'N/A'}</div></div>
    <div class="kpi"><div class="kpi__k">Volume</div><div class="kpi__v">${fN(M.vol, 0)}</div></div>
    <div class="kpi"><div class="kpi__k">Beta</div><div class="kpi__v">${M.beta != null ? fP(M.beta) : 'N/A'}</div></div>
    <div class="kpi"><div class="kpi__k">Div Yield</div><div class="kpi__v ${M.divY > 0 ? 'pos' : ''}">${M.divY != null ? (M.divY < 1 ? fPct(M.divY) : fP(M.divY, 2) + '%') : 'N/A'}</div></div>
    ${M.aum ? `<div class="kpi"><div class="kpi__k">AUM</div><div class="kpi__v">${ccy + fN(M.aum)}</div></div>` : ''}
    ${M.shares ? `<div class="kpi"><div class="kpi__k">Shares Out</div><div class="kpi__v">${fN(M.shares, 0)}</div></div>` : ''}
  </div>

  <!-- STATUS PILLS -->
  <div class="pills">
    <span class="pill pill--blue">YF v8/Chart</span>
    ${hasFund ? '<span class="pill pill--green">✓ Fundamentals</span>' : '<span class="pill pill--amber">⚠ Price Only</span>'}
    ${M.fcf != null ? '<span class="pill pill--green">✓ FCF</span>' : '<span class="pill pill--amber">No FCF</span>'}
    ${M.cfAnn?.length ? '<span class="pill pill--green">✓ Cashflow History</span>' : ''}
    ${M.isArr?.length ? '<span class="pill pill--green">✓ Income History</span>' : ''}
  </div>

  <!-- VALUATION METRICS -->
  ${SEC('Valuation Ratios', '📐')}
  ${isETF ? '<div class="etf-note">ℹ ETF/Unit Trust — P/E, EPS &amp; Graham formulas not applicable. FCF Yield, P/B &amp; AUM shown where available.</div>' : ''}

  <div class="mcard">
    ${MRow('P/E Ratio (TTM)',    M.pe    != null ? fP(M.pe, 1)    : null, isETF ? 'na' : clsRate(M.pe, 10, 20, true),   M.pe ? (M.pe < 10 ? '✓ Undervalued (<10)' : M.pe < 20 ? '~ Fair value (10–20)' : '✗ Expensive (>20)') : 'Requires fundamentals data')}
    ${MRow('P/E Ratio (Forward)',M.fwPE  != null ? fP(M.fwPE, 1)  : null, isETF ? 'na' : clsRate(M.fwPE, 10, 20, true), M.fwPE ? 'Based on forward EPS consensus estimate' : '')}
    ${MRow('P/B Ratio',          M.pb    != null ? fP(M.pb, 2)    : null, clsRate(M.pb, 1, 3, true),   M.pb ? (M.pb < 1 ? '✓ Below book value' : M.pb < 1.5 ? '✓ Value territory' : M.pb < 3 ? '~ Fair' : '✗ Above 3× book') : '')}
    ${MRow('PEG Ratio',          M.peg   != null ? fP(M.peg, 2)   : null, clsRate(M.peg, 0, 1, true),  M.peg != null ? `P/E (${fP(M.pe, 1)}) ÷ Growth (${fP(M.gEst, 1)}%) · ${M.gSrc}` : `Calculated: P/E ÷ growth. Source: ${M.gSrc}`)}
    ${MRow('Fwd PEG',            M.pegFwd!= null ? fP(M.pegFwd,2) : null, clsRate(M.pegFwd,0,1,true),  M.pegFwd != null ? `Fwd P/E (${fP(M.fwPE, 1)}) ÷ Growth (${fP(M.gEst, 1)}%)` : '')}
    ${MRow('EV / EBITDA',        M.evEbitda != null ? fP(M.evEbitda, 1) : null, clsRate(M.evEbitda, 8, 15, true), M.evEbitda ? (M.evEbitda < 10 ? '✓ Value (<10×)' : M.evEbitda < 15 ? '~ Fair (10–15×)' : '✗ Expensive (>15×)') : 'EV = Market Cap + Net Debt')}
    ${MRow('EV / Revenue',       M.evRev    != null ? fP(M.evRev, 2)    : null, clsRate(M.evRev, 2, 5, true),     M.evRev ? (M.evRev < 2 ? '✓ Cheap (<2×)' : M.evRev < 5 ? '~ Fair (2–5×)' : '✗ Rich (>5×)') : '')}
    ${MRow('FCF Yield',          M.fcfYield != null ? fPct(M.fcfYield)  : null, clsRate(M.fcfYield, 0.03, 0.08),  M.fcfYield ? (M.fcfYield > 0.08 ? '✓ Very attractive (>8%)' : M.fcfYield > 0.03 ? '~ Decent (3–8%)' : '✗ Low (<3%)') : 'FCF ÷ Market Cap')}
    ${MRow('Payout Ratio',       M.payoutR  != null ? fPct(M.payoutR)   : null, clsRate(M.payoutR, 0.3, 0.6, true), M.payoutR ? (M.payoutR < 0.3 ? 'Low — retaining earnings' : M.payoutR < 0.6 ? 'Sustainable' : '✗ High — check coverage') : 'Dividends ÷ Earnings')}
    ${MRow('Book Value / Share', M.bvps     != null ? ccy + fP(M.bvps, 2) : null, 'neu', 'Net assets per share from balance sheet')}
    ${MRow('Shares Outstanding', M.shares   != null ? fN(M.shares, 0)    : null, 'neu', 'Total shares issued')}
  </div>

  <!-- EPS -->
  ${SEC('Earnings Per Share', '💰')}
  <div class="mcard">
    ${MRow('EPS (TTM)',     M.eps  != null ? ccy + fP(M.eps, 2)  : null, M.eps  != null ? (M.eps  > 0 ? 'pos' : 'neg') : 'na', 'Trailing 12-month earnings per share')}
    ${MRow('EPS (Forward)', M.fwEPS!= null ? ccy + fP(M.fwEPS, 2): null, M.fwEPS!= null ? (M.fwEPS > M.eps ? 'pos' : 'neu') : 'na', 'Consensus forward EPS estimate')}
    ${MRow('EPS Growth Est.', M.gEst != null ? fP(M.gEst, 1) + '%' : null, clsRate(M.gEst, 5, 15), `Source: ${M.gSrc}`)}
    ${MRow('Net Income Growth (YoY)', M.niGrowth != null ? (M.niGrowth > 0 ? '+' : '') + fP(M.niGrowth, 1) + '%' : null, M.niGrowth != null ? clsRate(M.niGrowth, 0, 15) : 'na', 'Year-over-year net income change')}
    ${MRow('Revenue Growth (YoY)',    M.revGrowth!= null ? (M.revGrowth > 0 ? '+' : '') + fP(M.revGrowth, 1) + '%' : null, M.revGrowth!= null ? clsRate(M.revGrowth, 0, 10) : 'na', 'Year-over-year revenue change')}
  </div>

  <!-- PROFITABILITY -->
  ${SEC('Profitability', '📈')}
  <div class="mcard">
    ${MRow('Return on Equity (ROE)',  M.roe   != null ? fPct(M.roe)  : null, clsRate(M.roe, 0.10, 0.20),  M.roe  ? (M.roe > 0.20 ? '✓ Excellent (>20%)' : M.roe > 0.10 ? '~ Good (10–20%)' : '✗ Low (<10%)') : 'Net Income ÷ Shareholders\' Equity')}
    ${MRow('Return on Assets (ROA)', M.roa   != null ? fPct(M.roa)  : null, clsRate(M.roa, 0.05, 0.15),  M.roa  ? (M.roa > 0.15 ? '✓ Excellent (>15%)' : M.roa > 0.05 ? '~ Good (5–15%)' : '✗ Low (<5%)') : 'Net Income ÷ Total Assets')}
    ${MRow('Gross Margin',           M.gm    != null ? fPct(M.gm)   : null, clsRate(M.gm, 0.20, 0.40),   M.gm   ? (M.gm > 0.40 ? '✓ Strong (>40%)' : M.gm > 0.20 ? '~ Adequate (20–40%)' : '✗ Thin (<20%)') : 'Gross Profit ÷ Revenue')}
    ${MRow('Operating Margin',       M.om    != null ? fPct(M.om)   : null, clsRate(M.om, 0.10, 0.20),   M.om   ? (M.om > 0.20 ? '✓ Strong (>20%)' : M.om > 0.10 ? '~ Good (10–20%)' : '✗ Weak (<10%)') : 'Operating Income ÷ Revenue')}
    ${MRow('Net Profit Margin',      M.pm    != null ? fPct(M.pm)   : null, clsRate(M.pm, 0.05, 0.20),   M.pm   ? (M.pm > 0.20 ? '✓ Excellent (>20%)' : M.pm > 0.05 ? '~ Adequate' : '✗ Thin (<5%)') : 'Net Income ÷ Revenue')}
    ${MRow('Revenue (TTM)',          M.rev   != null ? ccy + fN(M.rev) : null, M.rev != null ? (M.rev > 0 ? 'pos' : 'neg') : 'na', 'Trailing 12-month revenue')}
    ${MRow('EBITDA',                 M.ebitda!= null ? ccy + fN(M.ebitda) : null, M.ebitda != null ? (M.ebitda > 0 ? 'pos' : 'neg') : 'na', 'Earnings before interest, taxes, depreciation & amortisation')}
    ${MRow('Net Income',             M.ni    != null ? ccy + fN(M.ni) : null, M.ni != null ? (M.ni > 0 ? 'pos' : 'neg') : 'na', 'Bottom-line profit (latest annual report)')}
  </div>

  <!-- ANALYST -->
  ${M.tgtMn != null ? `
  ${SEC('Analyst Consensus', '🎯')}
  <div class="mcard">
    ${MRow('Price Target (Low)',  M.tgtLo != null ? ccy + fP(M.tgtLo) : null, M.tgtLo && M.tgtLo > M.price ? 'pos' : 'neu', 'Lowest analyst 12-month target')}
    ${MRow('Price Target (Mean)', ccy + fP(M.tgtMn), M.tgtMn > M.price ? 'pos' : 'neu', `Consensus mean — ${M.numAn || 'N'} analysts`)}
    ${MRow('Price Target (High)', M.tgtHi != null ? ccy + fP(M.tgtHi) : null, M.tgtHi && M.tgtHi > M.price ? 'pos' : 'neu', 'Highest analyst 12-month target')}
    ${MRow('Upside / Downside', M.tgtMn != null ? (((M.tgtMn - M.price) / M.price) * 100 > 0 ? '+' : '') + fP((M.tgtMn - M.price) / M.price * 100, 1) + '%' : null, M.tgtMn > M.price ? 'pos' : 'neg', 'vs mean analyst target')}
    ${MRow('Recommendation', rl(M.recKey), rc(M.recKey), 'Analyst consensus rating')}
  </div>` : ''}

  <!-- DIVIDEND -->
  ${M.divY != null || M.divRate != null ? `
  ${SEC('Dividend', '💵')}
  <div class="mcard">
    ${MRow('Dividend Yield',          M.divY    != null ? (M.divY < 1 ? fPct(M.divY) : fP(M.divY, 2) + '%') : null, M.divY != null && M.divY > 0.03 ? 'pos' : 'neu', 'Annual dividend ÷ price')}
    ${MRow('Dividend Rate (Annual)',   M.divRate != null ? ccy + fP(M.divRate, 2) : null, 'neu', 'Annualised dividend per share')}
    ${MRow('5-Year Avg Yield',        M.divY5y  != null ? fP(M.divY5y, 2) + '%' : null, 'neu', '5-year average dividend yield')}
    ${MRow('Payout Ratio',            M.payoutR != null ? fPct(M.payoutR) : null, clsRate(M.payoutR, 0.3, 0.6, true), 'Dividends ÷ Earnings')}
  </div>` : ''}

  <!-- OTHER -->
  ${SEC('Other Metrics', '📊')}
  <div class="mcard">
    ${MRow('Beta',          M.beta    != null ? fP(M.beta, 2)   : null, M.beta != null ? (M.beta > 1.5 ? 'neg' : M.beta < 0.8 ? 'neu' : 'pos') : 'na', M.beta != null ? (M.beta > 1 ? 'More volatile than market' : 'Less volatile than market') : 'vs S&P 500')}
    ${MRow('Short Ratio',   M.shortR  != null ? fP(M.shortR, 1) + 'd' : null, M.shortR != null ? (M.shortR > 5 ? 'neg' : M.shortR > 2 ? 'neu' : 'pos') : 'na', M.shortR != null ? (M.shortR > 5 ? '✗ High short interest' : '✓ Low short interest') : 'Days to cover shorts')}
    ${MRow('Short % Float', M.shortPct!= null ? fPct(M.shortPct) : null, M.shortPct != null ? clsRate(M.shortPct, 0.05, 0.15, true) : 'na', 'Short interest as % of float')}
    ${MRow('Total Assets',  M.ta      != null ? ccy + fN(M.ta) : null, 'neu', 'Total assets (latest balance sheet)')}
    ${MRow('Total Equity',  M.te      != null ? ccy + fN(M.te) : null, M.te != null ? (M.te > 0 ? 'pos' : 'neg') : 'na', 'Shareholders\' equity')}
    ${MRow('Total Liabilities', M.tl  != null ? ccy + fN(M.tl) : null, 'neu', 'Total liabilities')}
  </div>
  `;
}

/* ══ VALUATION TAB ════════════════════════════════════════════ */
function buildValuation(d) {
  const M = d.M, ccy = cs(M.ccy);
  const BY = APP.cfg.bondYield, DR = APP.cfg.discount;
  const ivG  = grahamV(M.eps, M.gEst, BY);
  const ivGN = grahamNum(M.eps, M.bvps);
  const ivD  = dcfEPS(M.eps, M.gEst, DR);
  const ivF  = dcfFCF(M.fcf, M.shares, M.gEst, DR);
  const best = ivG || ivD || ivF || ivGN;
  const mosV = mosCalc(best, M.price);

  function ivRow(label, sub, iv) {
    const upside = iv != null ? mosCalc(iv, M.price) : null;
    return `
    <div class="iv-row">
      <div class="iv-row__left">
        <div class="iv-row__label">${label}</div>
        <div class="iv-row__sub">${sub}</div>
      </div>
      <div class="iv-row__right">
        <div class="iv-row__val ${iv == null ? 'na' : ''}">${iv != null ? ccy + fP(iv) : 'N/A'}</div>
        ${upside != null ? `<div class="iv-row__mos ${upside > 0 ? 'pos' : 'neg'}">${upside > 0 ? '+' : ''}${fP(upside, 1)}% MoS</div>` : ''}
      </div>
    </div>`;
  }

  return `
  ${SEC('Intrinsic Value Calculator', '🧮')}
  <div class="iv-inputs">
    ${MRowE('EPS (editable)', M.eps != null ? fP(M.eps, 2) : '', 'iv_eps', `Trailing EPS — edit for scenarios`, ccy)}
    ${MRowE('EPS Growth %/yr', fP(M.gEst, 1), 'iv_g', M.gSrc + ' — edit to adjust', '%/yr')}
    ${MRowE('Bond Yield %',   fP(BY, 1), 'iv_by', 'Graham formula denominator (AAA yield)', '%')}
    ${MRowE('Discount Rate %',fP(DR, 1), 'iv_dr', 'Required annual return for DCF', '%')}
  </div>
  <button class="iv-btn" id="ivcalc">↻ Calculate All Intrinsic Values</button>
  <div id="ivout">
    <div class="iv-results">
      ${ivRow('Graham Formula', 'EPS × (8.5 + 2g) × 4.4 / Y', ivG)}
      ${ivRow('Graham Number',  '√ (22.5 × EPS × Book Value/Share)', ivGN)}
      ${ivRow('DCF — EPS',      '10Y discounted cash flows + 15× terminal', ivD)}
      ${ivRow('DCF — FCF/Share','10Y discounted free cash flow + 15× terminal', ivF)}
    </div>
    ${mosV != null ? `
    <div class="mos-block">
      <div class="mos-block__title">Overall Margin of Safety (best IV estimate vs current price)</div>
      <div class="mos-bar"><div class="mos-fill" style="width:${Math.max(0, Math.min(100, mosV))}%;background:${mosV > 30 ? 'var(--grn)' : mosV > 0 ? 'var(--amb)' : 'var(--red)'}"></div></div>
      <div class="mos-labels">
        <span style="color:${mosV > 0 ? 'var(--grn)' : 'var(--red)'}">${mosV > 0 ? 'Undervalued ' + fP(mosV, 1) + '%' : 'Overvalued ' + fP(-mosV, 1) + '%'}</span>
        <span>Current Price: ${ccy}${fP(M.price)}</span>
      </div>
    </div>` : ''}
  </div>
  <div class="iv-note">Graham V = EPS×(8.5+2g)×4.4/Y &nbsp;·&nbsp; Graham# = √(22.5×EPS×BV) &nbsp;·&nbsp; DCF = Σ[EPS×(1+g)ⁿ/(1+r)ⁿ] + 15× terminal value. Educational only — not financial advice.</div>

  ${SEC('Current Valuation vs History', '📉')}
  <div class="mcard">
    ${MRow('Current Price',        ccy + fP(M.price),         'neu',  '')}
    ${MRow('52-Week Range',        `${ccy}${fP(M.l52)} – ${ccy}${fP(M.h52)}`, 'neu', `Price is at ${M.pos52 ?? 'N/A'}% of 52-week range`)}
    ${MRow('P/E vs 5Y Avg',        M.pe != null ? fP(M.pe, 1) + '×' : null,  clsRate(M.pe, 10, 20, true), 'Current trailing P/E')}
    ${MRow('P/B Ratio',            M.pb != null ? fP(M.pb, 2) + '×' : null,  clsRate(M.pb, 1, 3, true), 'Price-to-book value')}
    ${MRow('EV / EBITDA',          M.evEbitda != null ? fP(M.evEbitda, 1) + '×' : null, clsRate(M.evEbitda, 8, 15, true), 'Enterprise value multiple')}
    ${MRow('PEG Ratio',            M.peg  != null ? fP(M.peg, 2)  : null, clsRate(M.peg, 0, 1, true), `P/E ÷ growth. ${M.gSrc}`)}
    ${MRow('FCF Yield',            M.fcfYield != null ? fPct(M.fcfYield) : null, clsRate(M.fcfYield, 0.03, 0.08), 'FCF ÷ Market Cap')}
  </div>
  `;
}

/* ══ CASH FLOW & DEBT TAB ══════════════════════════════════════ */
function buildCashflow(d) {
  const M = d.M, ccy = cs(M.ccy);
  return `
  ${SEC('Free Cash Flow', '💸')}
  <div class="mcard">
    ${MRow('Free Cash Flow',         M.fcf   != null ? ccy + fN(M.fcf)   : null, M.fcf   != null ? (M.fcf   > 0 ? 'pos' : 'neg') : 'na', M.fcf != null ? (M.fcf > 0 ? '✓ Cash generative' : '✗ Burning cash') : 'Calculated: OpCF − CapEx (CapEx stored negative in Yahoo)')}
    ${MRow('FCF / Share',            M.fcfPS != null ? ccy + fP(M.fcfPS, 2) : null, M.fcfPS != null ? (M.fcfPS > 0 ? 'pos' : 'neg') : 'na', 'FCF ÷ Shares outstanding — used in DCF model')}
    ${MRow('FCF Yield',              M.fcfYield != null ? fPct(M.fcfYield) : null, clsRate(M.fcfYield, 0.03, 0.08), 'FCF ÷ Market Cap. >5% attractive')}
    ${MRow('Operating Cash Flow',    M.opCF  != null ? ccy + fN(M.opCF)  : null, M.opCF  != null ? (M.opCF  > 0 ? 'pos' : 'neg') : 'na', 'Cash generated from core business operations')}
    ${MRow('Total Cash & Equiv.',    M.cash  != null ? ccy + fN(M.cash)  : null, 'pos',  'Cash and short-term investments')}
  </div>

  ${SEC('Debt & Leverage', '🏦')}
  <div class="mcard">
    ${MRow('Total Debt',             M.td  != null ? ccy + fN(M.td)  : null, M.td  != null && M.td  > 0 ? 'neg' : 'pos', 'Short-term + long-term debt')}
    ${MRow('Long-Term Debt',         M.ltd != null ? ccy + fN(M.ltd) : null, 'neu', 'Long-term portion of total debt')}
    ${MRow('Net Debt',               M.netDebt != null ? ccy + fN(M.netDebt) : null, M.netDebt != null ? (M.netDebt < 0 ? 'pos' : M.netDebt > 0 ? 'neg' : 'neu') : 'na', M.netDebt != null ? (M.netDebt < 0 ? '✓ Net cash position' : '✗ Debt exceeds cash') : 'Total Debt − Cash')}
    ${MRow('Debt / Equity',          M.deRatio != null ? fP(M.deRatio, 2) + '×' : null, clsRate(M.deRatio, 0.5, 1.5, true), M.deRatio != null ? (M.deRatio < 0.5 ? '✓ Conservative (<0.5×)' : M.deRatio < 1.5 ? '~ Moderate (0.5–1.5×)' : '✗ Leveraged (>1.5×)') : 'Total Debt ÷ Shareholders\' Equity')}
    ${MRow('Debt Ratio',             M.debtRatio != null ? fP(M.debtRatio, 3) : null, clsRate(M.debtRatio, 0.3, 0.6, true), M.debtRatio != null ? (M.debtRatio < 0.3 ? '✓ Low leverage' : M.debtRatio < 0.6 ? '~ Moderate' : '✗ High leverage') : 'Total Debt ÷ Total Assets')}
    ${MRow('Current Ratio',          M.cr != null ? fP(M.cr, 2) + '×' : null, clsRate(M.cr, 1.5, 2.0), M.cr != null ? (M.cr >= 2 ? '✓ Healthy (≥2)' : M.cr >= 1 ? '~ Adequate (1–2)' : '✗ Below 1 — liquidity risk') : 'Current Assets ÷ Current Liabilities')}
    ${MRow('Quick Ratio',            M.qr != null ? fP(M.qr, 2) + '×' : null, clsRate(M.qr, 1.0, 1.5), M.qr != null ? (M.qr >= 1.5 ? '✓ Strong (≥1.5)' : M.qr >= 1 ? '~ Adequate (1–1.5)' : '✗ Below 1') : '(Cash + Receivables) ÷ Current Liabilities')}
    ${MRow('EV / EBITDA',            M.evEbitda != null ? fP(M.evEbitda, 1) + '×' : null, clsRate(M.evEbitda, 8, 15, true), M.evEbitda != null ? (M.evEbitda < 10 ? '✓ Value (<10×)' : M.evEbitda < 15 ? '~ Fair (10–15×)' : '✗ Expensive (>15×)') : '')}
    ${MRow('EV / Revenue',           M.evRev != null ? fP(M.evRev, 2) + '×' : null, clsRate(M.evRev, 2, 5, true), '')}
    ${MRow('Total Assets',           M.ta != null ? ccy + fN(M.ta) : null, 'neu', '')}
    ${MRow('Shareholders\' Equity',  M.te != null ? ccy + fN(M.te) : null, M.te != null ? (M.te > 0 ? 'pos' : 'neg') : 'na', '')}
  </div>
  `;
}

/* ══ 10-YEAR HISTORY TAB ══════════════════════════════════════ */
const H_TABS = [
  { k: 'fcf',   l: 'Free Cash Flow' },
  { k: 'rev',   l: 'Revenue' },
  { k: 'ni',    l: 'Net Profit' },
  { k: 'opCF',  l: 'Operating CF' },
  { k: 'gp',    l: 'Gross Profit' },
  { k: 'td',    l: 'Total Debt' },
  { k: 'price', l: '20Y Price' },
];

function buildHistory(d) {
  const h10 = build10Y(d.fund);
  const hasDat = !!(h10?.yrs.length);
  const ccy = cs(d.M.ccy);

  const tabs = H_TABS.map(t =>
    `<button class="htab${t.k === APP.histTab ? ' on' : ''}" data-ht="${t.k}">${t.l}</button>`
  ).join('');

  let content = '';

  if (APP.histTab === 'price') {
    /* 20-year price chart */
    const h = d.hist;
    if (h?.ts?.length) {
      const cut  = Date.now() / 1000 - 20 * 365.25 * 86400;
      const rows = [];
      for (let i = 0; i < h.ts.length; i++)
        if (h.ts[i] >= cut && h.close[i] != null) rows.push({ t: h.ts[i], v: h.close[i] });
      const tbl = rows.slice().reverse().map((r, i, a) => {
        const pv = a[i + 1]?.v;
        const ch = pv ? ((r.v - pv) / Math.abs(pv) * 100) : null;
        return `<tr><td>${new Date(r.t * 1000).toLocaleDateString('en-GB', { year: 'numeric', month: 'short' })}</td>
          <td class="yx">${ccy}${fP(r.v)}</td>
          <td class="${ch > 0 ? 'yp' : ch < 0 ? 'yn' : 'yx'}">${ch != null ? (ch > 0 ? '+' : '') + fP(ch, 1) + '%' : '—'}</td></tr>`;
      }).join('');
      content = `
      <div class="chbox"><div class="chtitle">20Y Stock Price — ${d.sym}</div><div id="chartWrap"><canvas id="hcanvas"></canvas></div></div>
      <div class="ytbl"><table>
        <thead><tr><th>Date</th><th>Price</th><th>Chg</th></tr></thead>
        <tbody>${tbl}</tbody>
      </table></div>`;
    } else {
      content = '<div class="empty-msg">Price history unavailable.</div>';
    }
  } else if (hasDat) {
    const { yrs, by } = h10;
    const keyMap = { fcf: 'fcf', rev: 'rev', ni: 'ni', opCF: 'opCF', gp: 'gp', td: 'td' };
    const key = keyMap[APP.histTab] || 'fcf';

    /* YoY growth calculator */
    const growth = (cur, prev) => (cur != null && prev != null && prev > 0)
      ? ((cur - prev) / Math.abs(prev) * 100) : null;

    /* Header */
    const hdr = `<tr><th>Metric</th>${yrs.map(y => `<th>${y}</th>`).join('')}</tr>`;

    /* Rows */
    const rows = [
      {
        l: H_TABS.find(t => t.k === APP.histTab)?.l || key,
        fn: r => r[key],
        fmt: v => key === 'td' ? ccy + fN(v) : ccy + fN(v),
        cls: v => key === 'td' ? (v > 0 ? 'yn' : 'yx') : v > 0 ? 'yp' : v < 0 ? 'yn' : 'yx',
      },
      {
        l: 'YoY Growth',
        fn: (r, yr, i) => growth(r[key], by[yrs[i + 1]]?.[key]),
        fmt: v => (v > 0 ? '+' : '') + fP(v, 1) + '%',
        cls: v => v > 5 ? 'yp' : v > 0 ? 'yx' : 'yn',
      },
      {
        l: 'FCF Margin',
        fn: r => (r.fcf != null && r.rev && r.rev > 0) ? r.fcf / r.rev * 100 : null,
        fmt: v => fP(v, 1) + '%',
        cls: v => v > 10 ? 'yp' : v > 0 ? 'yx' : 'yn',
      },
      {
        l: 'Net Margin',
        fn: r => (r.ni != null && r.rev && r.rev > 0) ? r.ni / r.rev * 100 : null,
        fmt: v => fP(v, 1) + '%',
        cls: v => v > 15 ? 'yp' : v > 0 ? 'yx' : 'yn',
      },
      {
        l: 'Debt/Equity',
        fn: r => (r.td != null && r.eq && r.eq > 0) ? r.td / r.eq : null,
        fmt: v => fP(v, 2) + '×',
        cls: v => v < 0.5 ? 'yp' : v < 1.5 ? 'yx' : 'yn',
      },
    ];

    const body = rows.map(row =>
      `<tr><td>${row.l}</td>${yrs.map((yr, i) => {
        const v = row.fn(by[yr] || {}, yr, i);
        if (v == null) return `<td class="yx">—</td>`;
        return `<td class="${row.cls(v)}">${row.fmt(v)}</td>`;
      }).join('')}</tr>`
    ).join('');

    content = `
    <div class="ytbl"><table>
      <thead>${hdr}</thead>
      <tbody>${body}</tbody>
    </table></div>
    <div class="hist-note">✓ ${yrs.length} years of annual audited data from Yahoo Finance financial statements.</div>`;
  } else {
    content = `<div class="empty-msg">Annual financial data unavailable — proxy may not have connected.<br>For 10–20Y data visit <a href="https://www.macrotrends.net" target="_blank">Macrotrends.net</a></div>`;
  }

  return `
  <div class="htabs">${tabs}</div>
  ${content}
  <div class="link-grid">
    <a class="link-btn" href="https://finance.yahoo.com/quote/${d.sym}/history/" target="_blank">📊 YF History</a>
    <a class="link-btn" href="https://www.macrotrends.net/stocks/charts/${d.sym.replace(/\..+/, '')}/revenue" target="_blank">📈 Macrotrends</a>
  </div>`;
}

/* ══ SETTINGS TAB ══════════════════════════════════════════════ */
function buildSettings() {
  const pn = n => n >= 0 && n < PROXIES.length ? PROXIES[n].n : 'auto';
  return `
  ${SEC('Connection Status', '🌐')}
  <div class="mcard">
    ${MRow('Chart Proxy',        pn(APP.pxChart), 'neu', 'v8/finance/chart — price, basic ratios')}
    ${MRow('Fundamentals Proxy', pn(APP.pxFund),  'neu', 'v11/quoteSummary — FCF, margins, debt, history')}
    ${MRow('Proxies Available',  PROXIES.length + ' options', 'neu', PROXIES.map(p => p.n).join(' → '))}
  </div>

  ${SEC('Calculation Parameters', '⚙️')}
  <div class="mcard">
    <div class="mrow mrow--edit">
      <div class="mrow__label">Bond Yield % (AAA)<span class="mrow__unit">%</span></div>
      <input class="mrow__val editable" id="s-b" type="number" value="${APP.cfg.bondYield}" min="0" max="20" step="0.1">
      <div class="mrow__hint">Graham formula denominator — default 4.4%</div>
    </div>
    <div class="mrow mrow--edit">
      <div class="mrow__label">DCF Discount Rate<span class="mrow__unit">%</span></div>
      <input class="mrow__val editable" id="s-d" type="number" value="${APP.cfg.discount}" min="5" max="30" step="0.5">
      <div class="mrow__hint">Required annual return for DCF — default 10%</div>
    </div>
    <button class="iv-btn" id="ssave">Save Settings</button>
  </div>

  ${SEC('Data Architecture', '🗂️')}
  <div class="mcard">
    ${MRow('Source 1 — v8/chart',              'Direct, no auth needed', 'neu', 'Price · Change · 52W · Volume · Market Cap · P/E · EPS · P/B · Beta · Div Yield · Book Value · 20Y price')}
    ${MRow('Source 2 — financialData',          'Via proxy (Batch A ~35KB)', 'neu', 'ROE · ROA · All margins · FCF · OpCF · Debt · Cash · Analyst targets · Recommendation')}
    ${MRow('Source 3 — keyStats + summaryDetail','Via proxy (Batch B ~25KB)', 'neu', 'PEG · Shares · Fwd P/E · Short ratio · AUM · Payout ratio · 5Y div yield')}
    ${MRow('Source 4 — cashflowStatements',     'Via proxy (Batch C ~40KB)', 'neu', 'FCF = OpCF + CapEx (CapEx negative in Yahoo) · Annual + quarterly fallback')}
    ${MRow('Source 5 — income + balance + trend','Via proxy (Batch D ~60KB)', 'neu', '10Y Revenue · Net Profit · Gross Profit · Assets · Equity · 5Y growth estimate')}
    ${MRow('Calculated',                         'Client-side', 'neu', 'PEG · Fwd PEG · Net Debt · Debt Ratio · EV/EBITDA · EV/Rev · FCF Yield · FCF/Share · Graham V · Graham# · DCF(EPS) · DCF(FCF/sh) · Margin of Safety')}
  </div>

  ${SEC('GitHub Pages Deploy', '🚀')}
  <div class="mcard">
    ${MRow('Step 1', 'Upload index.html, app.js, ui.js, manifest.json, sw.js', 'neu', '')}
    ${MRow('Step 2', 'Repo → Settings → Pages → Source: main branch → Save', 'neu', '')}
    ${MRow('Step 3', 'iPhone Safari → Share → Add to Home Screen', 'neu', '')}
  </div>
  `;
}

/* ══ MAIN RENDER ENGINE ═══════════════════════════════════════ */
function render() {
  try {
    if (APP.chart) { try { APP.chart.destroy(); } catch (e) {} APP.chart = null; }
    const el = document.getElementById('main'); if (!el) return;

    /* Loading state */
    if (APP.loading) {
      el.innerHTML = `<div class="pg"><div class="loader">
        <div class="spin"></div>
        <div class="lp">Loading ${APP.sym}…</div>
        <div class="lstep" id="lstep">${APP.step}</div>
        <div class="lbar"><div class="lfill" id="lfill" style="width:${APP.pct}%"></div></div>
        <div class="lhint">Fetching from Yahoo Finance via 8 proxy fallbacks.<br>International tickers may take 20–30 s.</div>
      </div></div>`;
      return;
    }

    /* Welcome */
    if (!APP.sym) {
      el.innerHTML = `<div class="pg"><div class="welcome">
        <div class="welcome__icon">📊</div>
        <h2>StockLens</h2>
        <p>All financial ratios auto-populated<br>from Yahoo Finance audited data.</p>
        <div class="welcome__examples">
          ${['AAPL','NVDA','BRK-B','D05.SI','VWRL.L','CSPX.L','ES3.SI','IWDA.L'].map(s =>
            `<span class="ex-chip" data-sym="${s}">${s}</span>`).join('')}
        </div>
      </div></div>`;
      document.querySelectorAll('.ex-chip').forEach(c => c.addEventListener('click', () => runSearch(c.dataset.sym)));
      return;
    }

    /* Error state */
    if (!APP.data) { el.innerHTML = '<div class="pg"><div class="loader"><div class="spin"></div></div></div>'; return; }
    if (APP.data.err) {
      const sg = APP.data.sugg || [];
      el.innerHTML = `<div class="pg">
        <div class="errbox"><h3>Not found: ${APP.data.sym}</h3>
        <p>Try: <code>AAPL</code> · <code>BRK-B</code> · <code>D05.SI</code> · <code>VWRL.L</code></p></div>
        ${sg.length ? '<div class="dym"><div class="dyt">Did you mean?</div>' +
          sg.slice(0, 4).map(r => `<div class="dyi" data-s="${r.symbol}">
            <div><div class="dys">${r.symbol}</div><div class="dyn">${r.shortname || r.longname || ''}</div></div>
            <div class="dyarr">→</div></div>`).join('') + '</div>' : ''}
      </div>`;
      document.querySelectorAll('[data-s]').forEach(e => e.addEventListener('click', () => runSearch(e.dataset.s)));
      return;
    }

    /* Build tab content */
    const d = APP.data;
    const tabs = ['overview','valuation','cashflow','history'];
    const tabLabels = { overview:'Overview', valuation:'Valuation', cashflow:'Cashflow', history:'10Y History' };
    const tabBar = `<div class="tabbar">${tabs.map(t =>
      `<button class="tabbtn${APP.tab === t ? ' on' : ''}" data-tab="${t}">${tabLabels[t]}</button>`
    ).join('')}</div>`;

    let content = '';
    if (APP.tab === 'overview')   content = buildOverview(d);
    else if (APP.tab === 'valuation') content = buildValuation(d);
    else if (APP.tab === 'cashflow')  content = buildCashflow(d);
    else if (APP.tab === 'history')   content = buildHistory(d);

    el.innerHTML = `<div class="pg">${tabBar}${content}
      <div class="link-grid">
        <a class="link-btn" href="https://finance.yahoo.com/quote/${d.sym}" target="_blank">📊 Yahoo Finance</a>
        <a class="link-btn" href="https://stockanalysis.com/stocks/${d.sym.replace(/\..+/,'')}/" target="_blank">📋 StockAnalysis</a>
        <a class="link-btn" href="https://www.morningstar.com/search?query=${d.sym}" target="_blank">⭐ Morningstar</a>
        <a class="link-btn" href="https://simplywall.st/stocks/search?q=${d.sym}" target="_blank">🔍 SimplyWallSt</a>
      </div>
    </div>`;

    /* Bind tab buttons */
    document.querySelectorAll('[data-tab]').forEach(b => b.addEventListener('click', () => { APP.tab = b.dataset.tab; render(); }));

    /* Bind history tab pills */
    document.querySelectorAll('[data-ht]').forEach(b => b.addEventListener('click', () => { APP.histTab = b.dataset.ht; render(); }));

    /* Bind DYM */
    document.querySelectorAll('[data-s]').forEach(e => e.addEventListener('click', () => runSearch(e.dataset.s)));

    /* Bind IV recalc */
    document.getElementById('ivcalc')?.addEventListener('click', () => {
      const M = APP.data?.M; if (!M) return;
      const eps = parseFloat(document.getElementById('iv_eps')?.value) || M.eps;
      const g   = parseFloat(document.getElementById('iv_g')?.value)   || M.gEst;
      const by  = parseFloat(document.getElementById('iv_by')?.value)  || APP.cfg.bondYield;
      const dr  = parseFloat(document.getElementById('iv_dr')?.value)  || APP.cfg.discount;
      const ccy = cs(M.ccy);
      const ivG  = grahamV(eps, g, by), ivGN = grahamNum(eps, M.bvps);
      const ivD  = dcfEPS(eps, g, dr),  ivF  = dcfFCF(M.fcf, M.shares, g, dr);
      const best = ivG || ivD || ivF || ivGN, mosV = mosCalc(best, M.price);

      function ivRow(label, sub, iv) {
        const upside = iv != null ? mosCalc(iv, M.price) : null;
        return `<div class="iv-row">
          <div class="iv-row__left"><div class="iv-row__label">${label}</div><div class="iv-row__sub">${sub}</div></div>
          <div class="iv-row__right">
            <div class="iv-row__val ${iv == null ? 'na' : ''}">${iv != null ? ccy + fP(iv) : 'N/A'}</div>
            ${upside != null ? `<div class="iv-row__mos ${upside > 0 ? 'pos' : 'neg'}">${upside > 0 ? '+' : ''}${fP(upside, 1)}% MoS</div>` : ''}
          </div></div>`;
      }
      const out = document.getElementById('ivout');
      if (out) out.innerHTML = `
        <div class="iv-results">
          ${ivRow('Graham Formula','EPS × (8.5 + 2g) × 4.4 / Y', ivG)}
          ${ivRow('Graham Number','√ (22.5 × EPS × Book Value/Share)', ivGN)}
          ${ivRow('DCF — EPS','10Y discounted cash flows + 15× terminal', ivD)}
          ${ivRow('DCF — FCF/Share','10Y discounted free cash flow + 15× terminal', ivF)}
        </div>
        ${mosV != null ? `<div class="mos-block">
          <div class="mos-block__title">Margin of Safety</div>
          <div class="mos-bar"><div class="mos-fill" style="width:${Math.max(0, Math.min(100, mosV))}%;background:${mosV > 30 ? 'var(--grn)' : mosV > 0 ? 'var(--amb)' : 'var(--red)'}"></div></div>
          <div class="mos-labels">
            <span style="color:${mosV > 0 ? 'var(--grn)' : 'var(--red)'}">${mosV > 0 ? 'Undervalued ' + fP(mosV, 1) + '%' : 'Overvalued ' + fP(-mosV, 1) + '%'}</span>
            <span>Price: ${ccy}${fP(M.price)}</span>
          </div></div>` : ''}`;
    });

    /* Bind settings save */
    document.getElementById('ssave')?.addEventListener('click', () => {
      APP.cfg.bondYield = parseFloat(document.getElementById('s-b').value) || 4.4;
      APP.cfg.discount  = parseFloat(document.getElementById('s-d').value) || 10;
      saveApp(); toast('Settings saved ✓');
    });

    /* Draw price chart if needed */
    if (APP.tab === 'history' && APP.histTab === 'price') setTimeout(drawPriceChart, 80);

  } catch (err) {
    const m = document.getElementById('main');
    if (m) m.innerHTML = `<div class="pg"><div class="errbox"><h3>Render Error</h3><p>${err.message}</p></div></div>`;
    console.error(err);
  }
}

/* ══ PRICE CHART ══════════════════════════════════════════════ */
async function drawPriceChart() {
  const canvas = document.getElementById('hcanvas'); if (!canvas || !APP.data) return;
  try {
    await new Promise((res, rej) => {
      if (window.Chart) { res(); return; }
      const sc = document.createElement('script');
      sc.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
      sc.onload = res; sc.onerror = () => rej(new Error('Chart.js failed'));
      document.head.appendChild(sc);
    });
  } catch (e) {
    const w = document.getElementById('chartWrap');
    if (w) w.innerHTML = '<div style="padding:22px;text-align:center;color:var(--mut);font-size:12px">Chart unavailable — see table below.</div>';
    return;
  }
  if (APP.chart) { try { APP.chart.destroy(); } catch (e) {} APP.chart = null; }
  const h = APP.data.hist; if (!h?.ts?.length) return;
  const cut = Date.now() / 1000 - 20 * 365.25 * 86400;
  const labels = [], vals = [];
  for (let i = 0; i < h.ts.length; i++)
    if (h.ts[i] >= cut && h.close[i] != null) {
      labels.push(new Date(h.ts[i] * 1000).toLocaleDateString('en-GB', { year: 'numeric', month: 'short' }));
      vals.push(h.close[i]);
    }
  if (!vals.length) return;
  const lv = vals[vals.length - 1], fv = vals[0], lc = lv >= fv ? '#1dc96d' : '#e85252';
  const ctx = canvas.getContext('2d'), g = ctx.createLinearGradient(0, 0, 0, 195);
  g.addColorStop(0, lv >= fv ? 'rgba(29,201,109,.15)' : 'rgba(232,82,82,.15)'); g.addColorStop(1, 'rgba(0,0,0,0)');
  const ccy = cs(h.ccy || '');
  APP.chart = new window.Chart(ctx, {
    type: 'line',
    data: { labels, datasets: [{ data: vals, borderColor: lc, backgroundColor: g, borderWidth: 1.5, pointRadius: 0, pointHoverRadius: 4, fill: true, tension: .3 }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: { legend: { display: false }, tooltip: { backgroundColor: '#162030', titleColor: '#8aaac8', bodyColor: '#dce8f5', borderColor: '#1c3050', borderWidth: 1, padding: 11, callbacks: { label: c => ' ' + ccy + fP(c.raw, 2) } } },
      scales: {
        x: { grid: { color: 'rgba(28,48,80,.35)', drawTicks: false }, ticks: { color: '#3d5878', font: { size: 10 }, maxTicksLimit: 8 }, border: { color: '#1c3050' } },
        y: { grid: { color: 'rgba(28,48,80,.35)', drawTicks: false }, ticks: { color: '#3d5878', font: { family: 'SF Mono,Menlo,monospace', size: 10 }, callback: v => ccy + fN(v, 0), maxTicksLimit: 6 }, border: { color: '#1c3050' } }
      }
    }
  });
}
