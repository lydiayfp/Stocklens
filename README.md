<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover,user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="StockLens">
<meta name="theme-color" content="#090e1c">
<link rel="manifest" href="manifest.json">
<title>StockLens</title>
<style>
:root{
  --bg:#090e1c; --bg2:#0c1422; --card:#101c2e; --card2:#162538;
  --b1:#1c3050; --b2:#243d62;
  --gold:#e9bc52; --gx:rgba(233,188,82,.09); --gb:rgba(233,188,82,.3);
  --txt:#dce8f8; --dim:#8aaac8; --mut:#3d5878;
  --grn:#1dc96d; --gx2:rgba(29,201,109,.1); --gb2:rgba(29,201,109,.3);
  --red:#e85252; --rx:rgba(232,82,82,.1);   --rb:rgba(232,82,82,.3);
  --amb:#f09c2a; --ax:rgba(240,156,42,.1);  --ab:rgba(240,156,42,.3);
  --blu:#4e96f5; --blux:rgba(78,150,245,.1);--blub:rgba(78,150,245,.3);
  --pur:#a05fff;
  --f:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",sans-serif;
  --m:"SF Mono","Menlo","Courier New",monospace;
  --r:12px; --r2:8px; --r3:5px;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
html,body{height:100%;background:var(--bg);font-family:var(--f);color:var(--txt);font-size:14px}
#app{display:flex;flex-direction:column;min-height:100vh;min-height:-webkit-fill-available}

/* ══ HEADER ══════════════════════════════════════════ */
#hdr{flex:0 0 auto;z-index:200;background:rgba(9,14,28,.98);border-bottom:1px solid var(--b1);
  padding:10px 14px 12px;padding-top:calc(env(safe-area-inset-top,0px)+10px)}
.brand{display:flex;align-items:center;gap:8px;margin-bottom:10px}
.logo{font-size:18px;font-weight:700;color:var(--gold)}
.dot{width:8px;height:8px;border-radius:50%;background:var(--grn);
  box-shadow:0 0 8px var(--grn);animation:pulse 2.5s ease-in-out infinite;flex-shrink:0}
.dot.off{background:var(--red);box-shadow:0 0 8px var(--red);animation:none}
@keyframes pulse{0%,100%{opacity:1}55%{opacity:.1}}
#badge{margin-left:auto;font-size:10px;font-weight:700;padding:3px 10px;
  border-radius:10px;border:1px solid;white-space:nowrap}
#badge.ok{color:var(--grn);border-color:var(--gb2);background:var(--gx2)}
#badge.bad{color:var(--red);border-color:var(--rb);background:var(--rx)}
#badge.chk{color:var(--amb);border-color:var(--ab);background:var(--ax)}
.srow{display:flex;gap:8px;position:relative}
#si{flex:1;background:var(--card2);border:1.5px solid var(--b2);border-radius:var(--r);
  color:var(--txt);font:600 16px var(--m);letter-spacing:1.4px;text-transform:uppercase;
  padding:12px 14px;outline:none;-webkit-appearance:none;transition:border-color .2s}
#si::placeholder{font:400 13px var(--f);letter-spacing:0;text-transform:none;color:var(--mut)}
#si:focus{border-color:var(--gold)}
#sg{width:50px;height:50px;border-radius:var(--r);background:var(--gold);color:#000;
  border:none;font-size:22px;font-weight:700;cursor:pointer;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;transition:opacity .15s}
#sg:active{opacity:.7;transform:scale(.92)}
#sugg{position:absolute;top:calc(100%+5px);left:0;right:60px;z-index:600;
  background:var(--bg2);border:1px solid var(--b2);border-radius:var(--r);
  overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.8);display:none;
  max-height:280px;overflow-y:auto}
.sh{padding:5px 13px;font-size:9px;font-weight:700;letter-spacing:1.6px;
  text-transform:uppercase;color:var(--mut);background:rgba(9,14,28,.95)}
.sitem{display:flex;justify-content:space-between;align-items:center;
  padding:11px 13px;cursor:pointer;border-bottom:1px solid var(--b1)}
.sitem:last-child{border:none}.sitem:active,.sitem:hover{background:var(--gx)}
.sticker{font:700 13px var(--m);color:var(--gold)}
.sname{font-size:11px;color:var(--dim);margin-top:2px;max-width:165px;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.smeta{text-align:right;font-size:10px;color:var(--mut);flex-shrink:0;margin-left:8px}

/* ══ LAYOUT ══════════════════════════════════════════ */
#main{flex:1 1 auto;overflow-y:auto;overflow-x:hidden;
  -webkit-overflow-scrolling:touch;overscroll-behavior-y:contain}
#nav{flex:0 0 auto;z-index:100;background:rgba(7,11,22,.99);border-top:1px solid var(--b1);
  padding-bottom:env(safe-area-inset-bottom,0px);display:grid;grid-template-columns:repeat(3,1fr)}
.nb{background:none;border:none;cursor:pointer;display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:3px;padding:8px 4px 6px;
  color:var(--mut);font:700 9px var(--f);letter-spacing:.9px;text-transform:uppercase}
.nb svg{width:21px;height:21px;stroke-width:1.7;fill:none;stroke:currentColor}
.nb.on{color:var(--gold)}.nb.on svg{filter:drop-shadow(0 0 5px rgba(233,188,82,.4))}
.pg{padding:14px 14px 36px}

/* ══ SECTION HEADERS ════════════════════════════════ */
.sec{font-size:9px;font-weight:700;letter-spacing:2.2px;text-transform:uppercase;
  color:var(--mut);margin:20px 0 10px 2px;display:flex;align-items:center;gap:8px}
.sec:first-child{margin-top:0}
.sec::after{content:'';flex:1;height:1px;background:var(--b1)}

/* ══ METRIC FIELD — the core UI element ════════════ */
/* Each metric = label + populated value field + optional unit badge */
.mgroup{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:4px}
.mgroup.cols3{grid-template-columns:1fr 1fr 1fr}
.mgroup.cols1{grid-template-columns:1fr}
.mfield{display:flex;flex-direction:column;gap:3px;position:relative}
.mlabel{font-size:9px;font-weight:700;letter-spacing:1.1px;text-transform:uppercase;
  color:var(--mut);padding-left:1px;display:flex;justify-content:space-between;align-items:center}
.munit{font-size:8px;color:var(--mut);font-weight:400;letter-spacing:0;text-transform:none}
.mval{
  width:100%;background:var(--card2);border:1.5px solid var(--b1);border-radius:var(--r2);
  color:var(--txt);font:600 14px var(--m);padding:9px 11px;
  outline:none;-webkit-appearance:none;text-align:right;
  transition:border-color .2s,background .2s
}
.mval:focus{border-color:var(--gold);background:rgba(233,188,82,.04)}
.mval.editable{color:var(--gold)} /* user-editable fields in gold */
/* colour-coded borders based on value quality */
.mval.good{border-color:rgba(29,201,109,.4);color:var(--grn)}
.mval.warn{border-color:rgba(240,156,42,.35);color:var(--amb)}
.mval.bad{border-color:rgba(232,82,82,.35);color:var(--red)}
.mval.neutral{border-color:var(--b2);color:var(--dim)}
.mval.na{color:var(--mut);font-size:12px}
/* hint below field */
.mhint{font-size:9px;color:var(--mut);padding-left:1px;line-height:1.5}

/* ══ PRICE CARD ══════════════════════════════════════ */
.pcard{background:linear-gradient(150deg,var(--card),var(--card2));
  border:1px solid var(--b2);border-radius:var(--r);padding:16px;margin-bottom:4px}
.phead{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px}
.psym{font:700 11px var(--m);color:var(--gold);letter-spacing:2.5px}
.pname{font-size:14px;font-weight:600;color:var(--txt);margin-top:3px;line-height:1.3}
.pmeta{font-size:10px;color:var(--mut);margin-top:3px}
.tag{font:700 9px var(--f);letter-spacing:.7px;text-transform:uppercase;
  padding:3px 8px;border-radius:4px;flex-shrink:0;margin-top:2px}
.tag.etf{background:var(--blux);color:var(--blu);border:1px solid var(--blub)}
.tag.stock{background:var(--gx2);color:var(--grn);border:1px solid var(--gb2)}
.tag.ut{background:rgba(160,95,255,.1);color:var(--pur);border:1px solid rgba(160,95,255,.3)}
.prow{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;margin-bottom:12px}
.pval{font:700 40px var(--m);color:var(--txt);letter-spacing:-2px;line-height:1}
.pccy{font-size:13px;color:var(--dim);align-self:flex-end;margin-bottom:4px}
.pchg{font:600 13px var(--m);padding:4px 12px;border-radius:7px}
.pchg.up{background:var(--gx2);color:var(--grn);border:1px solid var(--gb2)}
.pchg.dn{background:var(--rx);color:var(--red);border:1px solid var(--rb)}
.pgrid{display:grid;grid-template-columns:1fr 1fr;gap:6px;
  border-top:1px solid var(--b1);padding-top:12px}
.kv .k{font-size:9px;color:var(--mut);text-transform:uppercase;letter-spacing:.8px;margin-bottom:2px}
.kv .v{font:600 12px var(--m);color:var(--dim)}
.kv .v.pos{color:var(--grn)}.kv .v.neg{color:var(--red)}

/* ══ INTRINSIC VALUE SECTION ════════════════════════ */
.ivresult{background:linear-gradient(135deg,rgba(233,188,82,.06),transparent 70%);
  border:1px solid var(--gb);border-radius:var(--r);padding:14px;margin-bottom:4px}
.ivrow{display:flex;justify-content:space-between;align-items:center;
  padding:7px 0;border-bottom:1px solid rgba(26,45,70,.55)}
.ivrow:last-of-type{border:none}
.ivlbl{font-size:12px;color:var(--dim);display:flex;flex-direction:column}
.ivlbl small{font-size:9px;color:var(--mut);margin-top:1px}
.ivval{font:700 16px var(--m);color:var(--gold)}
.ivval.na{font-size:12px!important;color:var(--mut)!important;font-weight:400!important}
.mosbar{height:5px;background:var(--b1);border-radius:3px;margin:12px 0 5px;overflow:hidden}
.mosfill{height:100%;border-radius:3px;transition:width 1s ease}
.mostext{display:flex;justify-content:space-between;font-size:10px;color:var(--mut)}
.ivbtn{width:100%;padding:11px;background:var(--gx);border:1.5px solid var(--gb);
  border-radius:var(--r2);color:var(--gold);font:700 11px var(--f);
  letter-spacing:.8px;text-transform:uppercase;cursor:pointer;margin:8px 0 4px}
.ivbtn:active{background:rgba(233,188,82,.18)}
.ivnote{font-size:9px;color:var(--mut);line-height:1.9;margin-bottom:14px}

/* ══ 10Y HISTORY TABLE ══════════════════════════════ */
.ytabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}
.ytab{font:700 10px var(--f);padding:6px 13px;background:var(--card);
  border:1px solid var(--b1);border-radius:16px;color:var(--mut);cursor:pointer;white-space:nowrap}
.ytab.on{background:var(--gx);border-color:var(--gb);color:var(--gold)}
.ytab:active{transform:scale(.95)}
.yscroll{overflow-x:auto;-webkit-overflow-scrolling:touch;
  border:1px solid var(--b1);border-radius:var(--r);background:var(--card)}
.yscroll table{border-collapse:collapse;font-size:11px;width:100%;min-width:460px}
.yscroll th{background:var(--bg2);color:var(--mut);font:700 8px var(--f);
  letter-spacing:1.3px;text-transform:uppercase;padding:7px 10px;
  border-bottom:1px solid var(--b1);text-align:right;white-space:nowrap}
.yscroll th:first-child{text-align:left;position:sticky;left:0;background:var(--bg2);z-index:2}
.yscroll td{padding:7px 10px;border-bottom:1px solid rgba(28,48,80,.3);
  font-family:var(--m);text-align:right;color:var(--dim);white-space:nowrap}
.yscroll td:first-child{text-align:left;font-family:var(--f);font-size:11px;
  color:var(--mut);position:sticky;left:0;background:var(--card);z-index:1}
.yscroll tr:last-child td{border:none}
.yscroll tr:hover td{background:rgba(233,188,82,.025)}
.yp{color:var(--grn)!important}.yn{color:var(--red)!important}.yx{color:var(--dim)!important}

/* ══ CHART WRAP ══════════════════════════════════════ */
.chbox{background:var(--card);border:1px solid var(--b1);border-radius:var(--r);
  padding:13px;margin-bottom:10px}
.chtitle{font-size:11px;font-weight:600;color:var(--dim);text-transform:uppercase;
  letter-spacing:.7px;margin-bottom:9px}
#chartWrap{position:relative;height:200px}

/* ══ SOURCE BADGES ═══════════════════════════════════ */
.srcs{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px}
.sb2{font-size:9px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;
  padding:2px 8px;border-radius:4px;border:1px solid}
.sb2.yf{color:#6e8fff;border-color:rgba(110,143,255,.28);background:rgba(110,143,255,.08)}
.sb2.ok{color:var(--grn);border-color:var(--gb2);background:var(--gx2)}
.sb2.warn{color:var(--amb);border-color:var(--ab);background:var(--ax)}
.sb2.sgx{color:#3ec89a;border-color:rgba(62,200,154,.28);background:rgba(62,200,154,.08)}

/* ══ LOADER / EMPTY / ERROR ══════════════════════════ */
.loader{display:flex;flex-direction:column;align-items:center;gap:13px;
  padding:64px 20px;text-align:center}
.spin{width:36px;height:36px;border:2.5px solid var(--b1);
  border-top-color:var(--gold);border-radius:50%;animation:rot .72s linear infinite}
@keyframes rot{to{transform:rotate(360deg)}}
.lp{color:var(--dim);font-size:14px}
.lstep{font-size:11px;color:var(--amb);font-family:var(--m)}
.lbar{width:220px;height:3px;background:var(--b1);border-radius:2px;overflow:hidden}
.lfill{height:100%;background:var(--gold);border-radius:2px;transition:width .4s}
.lhint{font-size:11px;color:var(--mut);max-width:300px;line-height:1.75}
.empty{text-align:center;padding:56px 20px}
.ei{font-size:44px;opacity:.17;margin-bottom:14px}
.empty h3{font-size:16px;font-weight:600;color:var(--dim);margin-bottom:8px}
.empty p{font-size:13px;color:var(--mut);line-height:2}
.empty em{color:var(--gold);font-style:normal}
.errbox{background:var(--rx);border:1px solid var(--rb);border-radius:var(--r);
  padding:16px;margin-bottom:12px}
.errbox h3{color:var(--red);font-size:14px;font-weight:600;margin-bottom:7px}
.errbox p{font-size:12px;color:var(--dim);line-height:1.8}
.errbox code{font-family:var(--m);font-size:11px;color:var(--gold)}
.dym{background:var(--card);border:1.5px solid var(--gb);border-radius:var(--r);
  padding:14px;margin-bottom:12px}
.dyt{font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;
  color:var(--mut);margin-bottom:9px}
.dyi{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;
  background:var(--card2);border:1px solid var(--b1);border-radius:var(--r2);
  margin-bottom:6px;cursor:pointer}
.dyi:last-child{margin:0}.dyi:active{background:var(--gx)}
.dys{font:700 14px var(--m);color:var(--gold)}
.dyn{font-size:11px;color:var(--dim);margin-top:2px}

/* ══ SETTINGS ════════════════════════════════════════ */
.strow{display:flex;justify-content:space-between;align-items:center;
  background:var(--card);border:1px solid var(--b1);border-radius:var(--r2);
  padding:12px 14px;margin-bottom:7px;gap:12px}
.stlbl{font-size:13px;font-weight:500;color:var(--txt)}
.stdesc{font-size:10px;color:var(--mut);margin-top:2px}
.stnum{background:var(--card2);border:1px solid var(--b2);border-radius:var(--r3);
  color:var(--txt);font:500 13px var(--m);padding:6px 10px;
  width:72px;text-align:right;outline:none;-webkit-appearance:none}
.stnum:focus{border-color:var(--gold)}
.stbtn{width:100%;padding:14px;background:var(--gold);color:#000;
  border:none;border-radius:var(--r);font:700 13px var(--f);cursor:pointer;margin-top:8px}
.stbtn:active{opacity:.82}
.infobox{background:var(--card);border:1px solid var(--b1);border-radius:var(--r);
  padding:14px;margin-bottom:8px;font-size:11px;color:var(--dim);line-height:2}
.infobox strong{color:var(--txt)}.infobox code{font-family:var(--m);font-size:10px;color:var(--gold)}

/* ══ LINKS GRID ══════════════════════════════════════ */
.lgrid{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:6px}
.lb{display:flex;align-items:center;gap:8px;background:var(--card);
  border:1px solid var(--b2);border-radius:var(--r2);padding:11px 13px;
  text-decoration:none;color:var(--dim);font-size:12px;font-weight:500}
.lb:active{background:var(--card2)}.lb span{font-size:15px}

/* ══ TOAST ════════════════════════════════════════════ */
#toast{position:fixed;bottom:calc(64px + env(safe-area-inset-bottom,0px)+10px);
  left:50%;transform:translateX(-50%) translateY(8px);
  background:var(--card);border:1px solid var(--b2);color:var(--txt);
  font-size:13px;padding:9px 20px;border-radius:22px;white-space:nowrap;
  z-index:900;box-shadow:0 4px 24px rgba(0,0,0,.65);
  opacity:0;pointer-events:none;transition:all .22s}
#toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:var(--b2);border-radius:2px}
</style>
</head>
<body>
<div id="app">

  <!-- HEADER -->
  <div id="hdr">
    <div class="brand">
      <div class="dot" id="dot"></div>
      <div class="logo">StockLens</div>
      <div id="badge" class="chk">Connecting…</div>
    </div>
    <div class="srow">
      <input id="si" type="text"
        placeholder="AAPL · NVDA · BRK-B · D05.SI · VWRL.L…"
        autocomplete="off" autocorrect="off"
        autocapitalize="characters" spellcheck="false">
      <button id="sg">→</button>
      <div id="sugg"></div>
    </div>
  </div>

  <!-- MAIN CONTENT -->
  <div id="main">
    <div class="pg">
      <div class="empty">
        <div class="ei">📊</div>
        <h3>Investment Analytics</h3>
        <p>All metrics auto-populated from audited data.<br>
        FCF · Margins · Debt · Intrinsic Value<br>
        10-Year financial history table<br><br>
        <em>AAPL</em> · <em>NVDA</em> · <em>BRK-B</em> · <em>D05.SI</em><br>
        <em>VWRL.L</em> · <em>CSPX.L</em> · <em>ES3.SI</em> · <em>IWDA.L</em></p>
      </div>
    </div>
  </div>

  <!-- BOTTOM NAV -->
  <nav id="nav">
    <button class="nb on" data-p="fund">
      <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
      Fundamentals
    </button>
    <button class="nb" data-p="hist">
      <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
      10Y History
    </button>
    <button class="nb" data-p="sett">
      <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06-.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      Settings
    </button>
  </nav>
</div>
<div id="toast"></div>

<script>
'use strict';
/* ═══════════════════════════════════════════════════════
   STOCKLENS v9 — All metrics auto-populated into fields
   ═══════════════════════════════════════════════════════ */

/* ══ PROXY POOL ═══════════════════════════════════════ */
var PX=[
  {n:'allorigins',   u:'https://api.allorigins.win/raw?url=',      enc:true, wrap:false},
  {n:'corsproxy.io', u:'https://corsproxy.io/?url=',               enc:true, wrap:false},
  {n:'codetabs',     u:'https://api.codetabs.com/v1/proxy?quest=', enc:true, wrap:false},
  {n:'corsproxy.org',u:'https://corsproxy.org/?',                  enc:true, wrap:false},
  {n:'thingproxy',   u:'https://thingproxy.freeboard.io/fetch/',   enc:false,wrap:false},
  {n:'cors.sh',      u:'https://proxy.cors.sh/',                   enc:false,wrap:false},
  {n:'crossorigin',  u:'https://crossorigin.me/',                  enc:false,wrap:false},
  {n:'allorigins2',  u:'https://api.allorigins.win/get?url=',      enc:true, wrap:true },
];

var YF1='https://query1.finance.yahoo.com/v8/finance/chart/';
var YF2='https://query2.finance.yahoo.com/v8/finance/chart/';
var YFQ='https://query2.finance.yahoo.com/v11/finance/quoteSummary/';
var YFS='https://query1.finance.yahoo.com/v1/finance/search?quotesCount=8&newsCount=0&q=';

/* Separate small module batches to stay under proxy size limits */
var MODS={
  A:'financialData',
  B:'defaultKeyStatistics,summaryDetail',
  C:'cashflowStatementHistory,cashflowStatementHistoryQuarterly',
  D:'incomeStatementHistory,balanceSheetHistory,earningsTrend',
};

/* ══ STATE ════════════════════════════════════════════ */
var S={
  page:'fund', sym:'', D:null,
  loading:false, pct:0, step:'',
  hTab:'fcf',
  chart:null, pxC:-1, pxF:-1,
  cfg:{bondYield:4.4, discount:10}
};
function saveS(){try{localStorage.setItem('sl9_cfg',JSON.stringify(S.cfg));localStorage.setItem('sl9_pc',S.pxC);localStorage.setItem('sl9_pf',S.pxF);}catch(e){}}
function loadS(){try{var c=localStorage.getItem('sl9_cfg');if(c)Object.assign(S.cfg,JSON.parse(c));var p=localStorage.getItem('sl9_pc');if(p!=null)S.pxC=+p||0;var f=localStorage.getItem('sl9_pf');if(f!=null)S.pxF=+f||0;}catch(e){}}

/* ══ FETCH ENGINE ════════════════════════════════════ */
async function apiFetch(url,savedPx,skipWrap,ms){
  ms=ms||12000; var errs=[];
  /* Direct */
  try{
    var ac=new AbortController(); setTimeout(()=>ac.abort(),Math.min(ms,7000));
    var r=await fetch(url,{signal:ac.signal,headers:{Accept:'application/json'}});
    if(!r.ok)throw new Error('HTTP '+r.status);
    var t=await r.text(); if(!t||t.length<5)throw new Error('empty');
    return {px:-1,d:JSON.parse(t)};
  }catch(e){errs.push('direct:'+e.message.slice(0,20));}
  /* Proxies */
  var ord=[];
  if(savedPx>=0&&savedPx<PX.length)ord.push(savedPx);
  for(var i=0;i<PX.length;i++)if(!ord.includes(i))ord.push(i);
  for(var idx of ord){
    var px=PX[idx];
    if(skipWrap&&px.wrap)continue;
    var pu=px.enc?px.u+encodeURIComponent(url):px.u+url;
    try{
      var ac2=new AbortController(); setTimeout(()=>ac2.abort(),ms+5000);
      var r2=await fetch(pu,{signal:ac2.signal,headers:{Accept:'application/json'}});
      if(!r2.ok)throw new Error('HTTP '+r2.status);
      var t2=await r2.text(); if(!t2||t2.length<5)throw new Error('empty');
      var parsed; if(px.wrap){var w=JSON.parse(t2);if(!w?.contents)throw new Error('no contents');parsed=JSON.parse(w.contents);}else{parsed=JSON.parse(t2);}
      return {px:idx,d:parsed};
    }catch(e){errs.push(px.n+':'+e.message.slice(0,18));}
  }
  throw new Error('All failed: '+errs.slice(0,4).join('|'));
}

/* ══ YF FETCHERS ══════════════════════════════════════ */
async function getChart(sym,range,interval){
  var params='?range='+range+'&interval='+interval+'&includePrePost=false';
  for(var base of[YF1,YF2]){
    try{
      var r=await apiFetch(base+sym+params,S.pxC,false,11000);
      var res=r.d?.chart?.result?.[0];
      if(res?.meta?.regularMarketPrice){
        if(r.px>=0){S.pxC=r.px;setBadge('✓ '+PX[r.px].n,'ok');}
        else setBadge('✓ Direct','ok');
        return res;
      }
    }catch(e){}
  }
  return null;
}
async function searchYF(q){
  try{var r=await apiFetch(YFS+encodeURIComponent(q),S.pxC,false,8000);
    return (r.d?.finance?.result?.[0]?.quotes||[]).filter(x=>x.quoteType&&x.symbol&&!x.symbol.includes('^'));}
  catch(e){return[];}
}
async function getQS(sym,mods){
  var url=YFQ+sym+'?modules='+mods+'&formatted=true&lang=en-US';
  try{
    var r=await apiFetch(url,S.pxF,true,22000);
    if(r.px>=0)S.pxF=r.px;
    var err=r.d?.quoteSummary?.error; if(err)return null;
    return r.d?.quoteSummary?.result?.[0]||null;
  }catch(e){return null;}
}
async function fetchAllFund(sym){
  setStep('Fetching fundamentals (4 sources)…'); setPct(40);
  var [rA,rB,rC,rD]=await Promise.allSettled([getQS(sym,MODS.A),getQS(sym,MODS.B),getQS(sym,MODS.C),getQS(sym,MODS.D)]);
  var merged={};
  for(var r of[rA,rB,rC,rD])if(r.status==='fulfilled'&&r.value)Object.assign(merged,r.value);
  setPct(80);
  return Object.keys(merged).length?merged:null;
}

/* ══ RAW VALUE EXTRACTOR ══════════════════════════════ */
/* Yahoo wraps ALL numbers: {raw:N, fmt:"S"} → extract .raw */
function rw(v){
  if(v==null)return null;
  if(typeof v==='object'&&'raw'in v){var n=v.raw;return(n!=null&&isFinite(n))?n:null;}
  if(typeof v==='number'&&isFinite(v))return v;
  return null;
}
function arr(o,path){
  if(!o||!path)return[];
  var c=o;
  for(var k of path.split('.'))c=c?.[k];
  return Array.isArray(c)?c:[];
}

/* ══ EXTRACT EVERYTHING ═══════════════════════════════ */
function extract(meta,fund){
  var M={};

  /* ── v8/chart meta (always works, no proxy) ── */
  M.price  = meta.regularMarketPrice||0;
  M.prev   = meta.chartPreviousClose||meta.previousClose||M.price;
  M.chg    = M.price-M.prev;
  M.chgPct = M.prev?(M.chg/M.prev*100):0;
  M.h52    = rw(meta.fiftyTwoWeekHigh)||meta.fiftyTwoWeekHigh||0;
  M.l52    = rw(meta.fiftyTwoWeekLow)||meta.fiftyTwoWeekLow||0;
  M.vol    = rw(meta.regularMarketVolume)||rw(meta.averageVolume)||0;
  M.mktCap = rw(meta.marketCap)||null;
  M.pe     = rw(meta.trailingPE)||null;
  M.eps    = rw(meta.epsTrailingTwelveMonths)||null;
  M.epsF   = rw(meta.epsForward)||null;
  M.bvps   = rw(meta.bookValue)||null;
  M.pb     = rw(meta.priceToBook)||null;
  M.beta   = rw(meta.beta)||null;
  M.divY   = rw(meta.dividendYield)||null;
  M.name   = meta.longName||meta.shortName||'';
  M.ccy    = meta.currency||'';
  M.exch   = meta.exchangeName||meta.fullExchangeName||'';
  M.qt     = meta.quoteType||meta.instrumentType||'';

  if(!fund)return M;

  /* ── financialData (Batch A) ── */
  var fd=fund.financialData||{};
  M.roe    = rw(fd.returnOnEquity);
  M.roa    = rw(fd.returnOnAssets);
  M.pm     = rw(fd.profitMargins);
  M.gm     = rw(fd.grossMargins);
  M.om     = rw(fd.operatingMargins);
  M.fcf    = rw(fd.freeCashflow);       /* direct if Yahoo provides it */
  M.opCF   = rw(fd.operatingCashflow);
  M.td     = rw(fd.totalDebt);
  M.cash   = rw(fd.totalCash);
  M.de     = rw(fd.debtToEquity);      /* Yahoo stores as e.g. 48.2 = 48.2% */
  M.cr     = rw(fd.currentRatio);
  M.qr     = rw(fd.quickRatio);
  M.rev    = rw(fd.totalRevenue);
  M.ebitda = rw(fd.ebitda);
  M.tgtMn  = rw(fd.targetMeanPrice);
  M.tgtLo  = rw(fd.targetLowPrice);
  M.tgtHi  = rw(fd.targetHighPrice);
  M.recKey = typeof fd.recommendationKey==='string'?fd.recommendationKey:'';
  M.numAn  = rw(fd.numberOfAnalystOpinions);

  /* ── defaultKeyStatistics + summaryDetail (Batch B) ── */
  var dks=fund.defaultKeyStatistics||{};
  var sd=fund.summaryDetail||{};
  M.peg     = rw(dks.pegRatio);
  M.shares  = rw(dks.sharesOutstanding);
  M.fwPE    = rw(dks.forwardPE)||rw(sd.forwardPE);
  M.fwEPS   = rw(dks.forwardEps)||M.epsF;
  M.shortR  = rw(dks.shortRatio);
  M.shortPct= rw(dks.shortPercentOfFloat);
  M.bvpsDKS = rw(dks.bookValue);
  M.betaDKS = rw(dks.beta);
  M.trailPS = rw(dks.trailingEps); /* from DKS – more reliable */
  M.aum     = rw(sd.totalAssets);
  M.payoutR = rw(sd.payoutRatio);
  M.divY5y  = rw(sd.fiveYearAvgDividendYield);
  M.exDiv   = rw(sd.exDividendDate); /* unix timestamp */
  M.pe2     = rw(sd.trailingPE);
  M.divYsd  = rw(sd.dividendYield);

  /* fill meta gaps */
  M.bvps  = M.bvps  || M.bvpsDKS;
  M.beta  = M.beta  || M.betaDKS;
  M.eps   = M.eps   || M.trailPS;
  M.pe    = M.pe    || M.pe2;
  M.divY  = M.divY  != null ? M.divY : M.divYsd;
  M.epsF  = M.epsF  || M.fwEPS;
  if(!M.fwPE && M.fwEPS && M.fwEPS>0 && M.price>0) M.fwPE=M.price/M.fwEPS;

  /* ── cashflow statements (Batch C) ── */
  /* Each field: {raw: NUMBER, fmt: "string"} — use rw() */
  var cfAnn = arr(fund,'cashflowStatementHistory.cashflowStatements');
  var cfQtr = arr(fund,'cashflowStatementHistoryQuarterly.cashflowStatements');
  M.cfAnn=cfAnn; M.cfQtr=cfQtr;

  if(M.fcf===null && cfAnn.length>0){
    var opA=rw(cfAnn[0].totalCashFromOperatingActivities);
    var cxA=rw(cfAnn[0].capitalExpenditures); /* NEGATIVE in Yahoo */
    if(opA!==null){M.fcf=(cxA!==null?opA+cxA:opA);if(M.opCF===null)M.opCF=opA;}
  }
  if(M.fcf===null && cfQtr.length>0){
    var so=0,sc=0,ho=false,hc=false;
    for(var i=0;i<Math.min(4,cfQtr.length);i++){
      var oq=rw(cfQtr[i].totalCashFromOperatingActivities);
      var cq=rw(cfQtr[i].capitalExpenditures);
      if(oq!=null){so+=oq;ho=true;} if(cq!=null){sc+=cq;hc=true;}
    }
    if(ho){M.fcf=(hc?so+sc:so);if(M.opCF===null)M.opCF=so;}
  }

  /* ── income + balance + trend (Batch D) ── */
  var isArr=arr(fund,'incomeStatementHistory.incomeStatementHistory');
  var bsArr=arr(fund,'balanceSheetHistory.balanceSheetStatements');
  M.isArr=isArr; M.bsArr=bsArr;
  if(isArr.length>0){
    M.ni   = rw(isArr[0].netIncome);
    M.revIS= rw(isArr[0].totalRevenue);
    M.gp   = rw(isArr[0].grossProfit);
    M.opInc= rw(isArr[0].operatingIncome)||null;
    M.rev  = M.rev||M.revIS;
  }
  if(bsArr.length>0){
    M.ta   = rw(bsArr[0].totalAssets);
    M.te   = rw(bsArr[0].totalStockholderEquity);
    M.tl   = rw(bsArr[0].totalLiab);
    M.ltDebt= rw(bsArr[0].longTermDebt)||null;
  }

  /* ── earnings trend → growth estimate ── */
  M.gEst=10; M.gSrc='default';
  var trends=arr(fund,'earningsTrend.trend');
  for(var t of trends){
    if((t.period==='5y'||t.period==='+5y')&&rw(t.growth)!=null){
      M.gEst=rw(t.growth)*100; M.gSrc='5Y growth est.'; break;
    }
  }
  if(M.gSrc==='default'){
    var eqg=rw(dks.earningsQuarterlyGrowth);
    if(eqg!=null){M.gEst=eqg*100;M.gSrc='quarterly growth';}
  }

  /* ── PEG: calculate if not from Yahoo ── */
  /* PEG = (P/E) / Annual EPS growth rate */
  if(!M.peg && M.pe && M.pe>0 && M.gEst>0) M.peg=M.pe/M.gEst;
  /* Also try Fwd P/E / growth for alt PEG */
  M.pegFwd=(M.fwPE&&M.fwPE>0&&M.gEst>0)?M.fwPE/M.gEst:null;

  /* ── Derived metrics ── */
  M.netDebt  = (M.td!=null&&M.cash!=null)?M.td-M.cash:null;
  M.debtRatio= (M.td!=null&&M.ta&&M.ta>0)?M.td/M.ta:null;
  M.fcfPS    = (M.fcf!=null&&M.shares&&M.shares>0)?M.fcf/M.shares:null;
  M.fcfYield = (M.fcf!=null&&M.mktCap&&M.mktCap>0)?M.fcf/M.mktCap:null;
  /* D/E stored as 48.2 meaning 0.482x  OR  48.2% depending on version */
  M.deRatio  = M.de!=null?(M.de>20?M.de/100:M.de):null;
  var ev     = (M.mktCap&&M.netDebt!=null)?M.mktCap+M.netDebt:(M.mktCap&&M.td)?M.mktCap+M.td:null;
  M.evEbitda = (ev&&M.ebitda&&M.ebitda>0)?ev/M.ebitda:null;
  M.evRev    = (ev&&M.rev&&M.rev>0)?ev/M.rev:null;
  /* EPS growth YoY (from statements) */
  if(isArr.length>=2){
    var ni0=rw(isArr[0].netIncome), ni1=rw(isArr[1].netIncome);
    M.niGrowth=(ni0!=null&&ni1!=null&&ni1>0)?((ni0-ni1)/Math.abs(ni1)*100):null;
  }

  return M;
}

/* ══ FORMATTERS ════════════════════════════════════════ */
var CC={USD:'$',GBP:'£',GBp:'p',SGD:'S$',EUR:'€',HKD:'HK$',AUD:'A$',CAD:'C$',JPY:'¥',CHF:'Fr',INR:'₹'};
function cs(c){return CC[c]||(c?c+' ':'');}
function n2(n,dp,pfx){
  if(n==null||!isFinite(n))return'N/A';
  dp=dp??2; pfx=pfx||'';
  var a=Math.abs(n);
  if(a>=1e12)return pfx+(n/1e12).toFixed(1)+'T';
  if(a>=1e9) return pfx+(n/1e9).toFixed(2)+'B';
  if(a>=1e6) return pfx+(n/1e6).toFixed(2)+'M';
  if(a>=1e3) return pfx+(n/1e3).toFixed(1)+'K';
  return pfx+n.toFixed(dp);
}
function p2(n,dp){if(n==null||!isFinite(n))return'N/A';return n.toFixed(dp??2);}
function pct(n,mul){if(n==null||!isFinite(n))return'N/A';return ((mul!==false?n*100:n)).toFixed(2)+'%';}
function exN(e,s){
  var m={NMS:'NASDAQ',NGM:'NASDAQ',NGS:'NASDAQ',NYQ:'NYSE',PCX:'NYSE Arca',NYSEArca:'NYSE Arca',
    SES:'SGX',LSE:'London SE',IOB:'LSE Intl',ASX:'ASX',FRA:'Frankfurt',PAR:'Euronext Paris',
    AMS:'Euronext AMS',HKG:'HKEX',TOR:'TSX'};
  if(e&&m[e])return m[e];
  if(s){if(s.endsWith('.SI'))return'SGX';if(s.endsWith('.L'))return'London SE';
    if(s.endsWith('.AX'))return'ASX';if(s.endsWith('.HK'))return'HKEX';
    if(s.endsWith('.PA'))return'Euronext';if(s.endsWith('.DE'))return'Frankfurt';}
  return e||'';
}
function ttag(qt){
  if(qt==='ETF')return'<span class="tag etf">ETF</span>';
  if(qt==='MUTUALFUND')return'<span class="tag ut">Unit Trust</span>';
  return'<span class="tag stock">Stock</span>';
}
function ago(ts){if(!ts)return'live';var s=Math.floor(Date.now()/1000-ts);if(s<120)return'live';if(s<3600)return Math.floor(s/60)+'m ago';return'';}
function rl(k){return{strongbuy:'Strong Buy',buy:'Buy',hold:'Hold',underperform:'Underperform',sell:'Sell'}[k?.toLowerCase()]||k||'—';}
function rc(k){return k?.includes('buy')?'var(--grn)':k==='sell'||k?.includes('under')?'var(--red)':'var(--amb)';}

/* ══ METRIC FIELD BUILDER ═════════════════════════════
   Creates a labelled input box pre-populated with data.
   cls: 'good'|'warn'|'bad'|'neutral'|'na'|'editable'
   ═══════════════════════════════════════════════════ */
function MF(label,value,cls,hint,unit,id){
  var v=value==null?'N/A':(value===''?'':value);
  var c2=v==='N/A'?'na':(cls||'neutral');
  return '<div class="mfield">' +
    '<div class="mlabel">'+label+(unit?'<span class="munit">'+unit+'</span>':'')+'</div>' +
    '<input class="mval '+c2+'"'+(id?' id="'+id+'"':'')+' type="text" value="'+v+'" readonly>' +
    (hint?'<div class="mhint">'+hint+'</div>':'') +
  '</div>';
}
/* Editable version — user can change for what-if */
function MFE(label,value,cls,hint,unit,id){
  var v=value==null?'':(value===''?'':value);
  return '<div class="mfield">' +
    '<div class="mlabel">'+label+(unit?'<span class="munit">'+unit+'</span>':'')+'</div>' +
    '<input class="mval editable" id="'+(id||'')+'" type="number" value="'+v+'" step="any">' +
    (hint?'<div class="mhint">'+hint+'</div>':'') +
  '</div>';
}

/* rate(): green/warn/bad based on thresholds */
function rate(v,lo,hi,lower){
  if(v==null||!isFinite(v))return'neutral';
  if(lower)return v<=lo?'good':v<=hi?'warn':'bad';
  return v>=hi?'good':v>=lo?'warn':'bad';
}

/* ══ IV FORMULAS ══════════════════════════════════════ */
function gV(e,g,by){if(!e||e<=0)return null;return e*(8.5+2*Math.min(Math.max(g||10,0),40))*4.4/(by||4.4);}
function gN(e,bv){if(!e||e<=0||!bv||bv<=0)return null;return Math.sqrt(22.5*Math.abs(e)*Math.abs(bv));}
function dcf(e,g,dr){
  if(!e||e<=0)return null;
  var gr=(g||10)/100,d=(dr||10)/100,pv=0;
  for(var i=1;i<=10;i++)pv+=e*Math.pow(1+gr,i)/Math.pow(1+d,i);
  return pv+e*Math.pow(1+gr,10)*15/Math.pow(1+d,10);
}
function dcfFCF(fcf,sh,g,dr){return(!fcf||fcf<=0||!sh||sh<=0)?null:dcf(fcf/sh,g,dr);}
function mos(iv,p){return(iv&&p&&iv>0)?((iv-p)/iv*100):null;}

function renderIV(ivG,ivGN,ivD,ivF,price,ccy){
  var best=ivG||ivD||ivF||ivGN, mosV=mos(best,price);
  function row(lbl,sub,iv){
    return '<div class="ivrow"><span class="ivlbl">'+lbl+'<small>'+sub+'</small></span>'+
      '<span class="ivval'+(iv==null?' na':'')+'">'+
      (iv!=null?ccy+p2(iv):' N/A')+'</span></div>';
  }
  return '<div class="ivresult">'+
    row('Graham Formula','EPS × (8.5+2g) × 4.4 / Y',ivG)+
    row('Graham Number','√ (22.5 × EPS × BV/Share)',ivGN)+
    row('DCF — EPS','10Y discounted + 15× terminal',ivD)+
    row('DCF — FCF/Share','10Y discounted + 15× terminal',ivF)+
  '</div>'+(mosV!=null?
  '<div class="mosbar"><div class="mosfill" style="width:'+Math.max(0,Math.min(100,mosV))+'%;background:'+
    (mosV>30?'var(--grn)':mosV>0?'var(--amb)':'var(--red)')+'"></div></div>'+
  '<div class="mostext">'+
    '<span style="color:'+(mosV>0?'var(--grn)':'var(--red)')+'">'+(mosV>0?'Undervalued '+p2(mosV,1)+'%':'Overvalued '+p2(-mosV,1)+'%')+'</span>'+
    '<span>Current: '+ccy+p2(price)+'</span>'+
  '</div>':'');
}

/* ══ BUILD FUNDAMENTALS PAGE ══════════════════════════ */
function buildFund(){
  var d=S.D, sym=d.sym, M=d.M, ccy=cs(M.ccy);
  var isETF=M.qt==='ETF'||M.qt==='MUTUALFUND';
  var BY=S.cfg.bondYield, DR=S.cfg.discount;
  var ivG=gV(M.eps,M.gEst,BY), ivGN=gN(M.eps,M.bvps);
  var ivD=dcf(M.eps,M.gEst,DR), ivF=dcfFCF(M.fcf,M.shares,M.gEst,DR);
  var up=M.chg>=0, bb=sym.replace(/\..+/,'');
  var isSGX=sym.endsWith('.SI'), isLSE=sym.endsWith('.L');
  var hasFund=!!d.fund;

  return (
  /* ── Source status ── */
  '<div class="srcs">'+
    '<span class="sb2 yf">YF v8/Chart</span>'+
    (hasFund?'<span class="sb2 ok">✓ Fundamentals</span>':'<span class="sb2 warn">⚠ Price only — proxy unavailable</span>')+
    (M.fcf!=null?'<span class="sb2 ok">✓ FCF</span>':'<span class="sb2 warn">No FCF</span>')+
    (M.cfAnn?.length?'<span class="sb2 ok">✓ Cashflow History</span>':'')+
    (M.isArr?.length?'<span class="sb2 ok">✓ Income History</span>':'')+
    (isSGX?'<span class="sb2 sgx">SGX</span>':'')+
  '</div>'+

  /* ── Price card ── */
  '<div class="pcard">'+
    '<div class="phead"><div>'+
      '<div class="psym">'+sym+'</div>'+
      '<div class="pname">'+M.name+'</div>'+
      '<div class="pmeta">'+exN(M.exch,sym)+(M.ccy?' · '+M.ccy:'')+' · '+ago(d.ts)+'</div>'+
    '</div>'+ttag(M.qt)+'</div>'+
    '<div class="prow">'+
      '<div class="pval">'+p2(M.price)+'</div>'+
      '<div class="pccy">'+M.ccy+'</div>'+
      '<div class="pchg '+(up?'up':'dn')+'">'+(up?'+':'')+p2(M.chg)+' ('+(up?'+':'')+p2(M.chgPct,2)+'%)</div>'+
    '</div>'+
    '<div class="pgrid">'+
      '<div class="kv"><div class="k">52W High</div><div class="v">'+p2(M.h52)+'</div></div>'+
      '<div class="kv"><div class="k">52W Low</div><div class="v">'+p2(M.l52)+'</div></div>'+
      '<div class="kv"><div class="k">Volume</div><div class="v">'+n2(M.vol,0)+'</div></div>'+
      (M.mktCap?'<div class="kv"><div class="k">Market Cap</div><div class="v">'+ccy+n2(M.mktCap)+'</div></div>':'')+
      (M.divY!=null?'<div class="kv"><div class="k">Div Yield</div><div class="v pos">'+(M.divY<1?pct(M.divY):p2(M.divY,2)+'%')+'</div></div>':'')+
      (M.beta!=null?'<div class="kv"><div class="k">Beta</div><div class="v">'+p2(M.beta)+'</div></div>':'')+
      (M.shares?'<div class="kv"><div class="k">Shares Out</div><div class="v">'+n2(M.shares,0)+'</div></div>':'')+
      (M.aum?'<div class="kv"><div class="k">AUM</div><div class="v">'+ccy+n2(M.aum)+'</div></div>':'')+
    '</div>'+
  '</div>'+

  /* ══════════════════════════════════════════════════
     SECTION 1: VALUATION RATIOS
     All fields are populated from fetched data.
  ══════════════════════════════════════════════════ */
  '<div class="sec">Valuation Ratios</div>'+
  (isETF?'<div style="font-size:10px;color:var(--blu);padding:6px 10px;background:var(--blux);border:1px solid var(--blub);border-radius:var(--r2);margin-bottom:10px">ℹ ETF/Unit Trust: P/E, EPS &amp; Graham N/A. FCF Yield, P/B and AUM apply.</div>':'')+
  '<div class="mgroup">'+
    MF('P/E Ratio (TTM)', M.pe!=null?p2(M.pe,1):null, isETF?'neutral':rate(M.pe,10,20,true), M.pe!=null?(M.pe<10?'Undervalued (<10)':M.pe<20?'Fair (10–20)':'Expensive (>20)'):'Need fundamentals data', 'times')+
    MF('P/E Ratio (Fwd)', M.fwPE!=null?p2(M.fwPE,1):null, isETF?'neutral':rate(M.fwPE,10,20,true), 'Based on forward EPS estimate', 'times')+
  '</div>'+
  '<div class="mgroup">'+
    MF('P/B Ratio', M.pb!=null?p2(M.pb,2):null, rate(M.pb,1,3,true), M.pb!=null?(M.pb<1?'Below book value':M.pb<1.5?'Value territory':'Above book'):'', 'times')+
    MF('PEG Ratio', M.peg!=null?p2(M.peg,2):null, rate(M.peg,0,1,true), M.peg!=null?'PEG = P/E ÷ Growth ('+(M.pe!=null?p2(M.pe,1):'?')+' ÷ '+p2(M.gEst,1)+'%)':'Calculated: P/E ÷ growth rate', 'times')+
  '</div>'+
  '<div class="mgroup">'+
    MF('EPS (TTM)', M.eps!=null?ccy+p2(M.eps,2):null, M.eps!=null?(M.eps>0?'good':M.eps<0?'bad':'neutral'):'neutral', 'Trailing 12 months earnings per share')+
    MF('EPS (Forward)', M.fwEPS!=null?ccy+p2(M.fwEPS,2):null, M.fwEPS!=null?(M.fwEPS>M.eps?'good':'warn'):'neutral', 'Consensus forward estimate')+
  '</div>'+
  '<div class="mgroup">'+
    MF('EV / EBITDA', M.evEbitda!=null?p2(M.evEbitda,1):null, rate(M.evEbitda,8,15,true), M.evEbitda!=null?(M.evEbitda<10?'Value (<10)':M.evEbitda<15?'Fair':'Expensive (>15)'):'EV = MktCap + Net Debt', 'times')+
    MF('EV / Revenue', M.evRev!=null?p2(M.evRev,1):null, rate(M.evRev,2,5,true), M.evRev!=null?(M.evRev<2?'Cheap (<2)':M.evRev<5?'Fair':'Rich (>5)'):'', 'times')+
  '</div>'+
  '<div class="mgroup">'+
    MF('FCF Yield', M.fcfYield!=null?pct(M.fcfYield):null, rate(M.fcfYield,0.03,0.08), M.fcfYield!=null?(M.fcfYield>0.08?'Very attractive (>8%)':M.fcfYield>0.03?'Decent (3–8%)':'Low (<3%)'):'FCF ÷ Market Cap', '%')+
    MF('Payout Ratio', M.payoutR!=null?pct(M.payoutR):null, rate(M.payoutR,0.3,0.6,true), M.payoutR!=null?(M.payoutR<0.3?'Low — retaining earnings':M.payoutR<0.6?'Sustainable':'High — check coverage'):'Dividends ÷ Earnings', '%')+
  '</div>'+
  '<div class="mgroup">'+
    MF('Book Value / Share', M.bvps!=null?ccy+p2(M.bvps,2):null, 'neutral', 'Net assets per share (from balance sheet)')+
    MF('Market Cap', M.mktCap!=null?ccy+n2(M.mktCap):null, 'neutral', 'Shares outstanding × price')+
  '</div>'+

  /* ══════════════════════════════════════════════════
     SECTION 2: PROFITABILITY
  ══════════════════════════════════════════════════ */
  '<div class="sec">Profitability (Current Year)</div>'+
  '<div class="mgroup">'+
    MF('Return on Equity', M.roe!=null?pct(M.roe):null, rate(M.roe,0.1,0.2), M.roe!=null?(M.roe>0.2?'Excellent (>20%)':M.roe>0.1?'Good (10–20%)':'Low (<10%)'):'Net Income ÷ Shareholder Equity', '%')+
    MF('Return on Assets', M.roa!=null?pct(M.roa):null, rate(M.roa,0.05,0.15), M.roa!=null?(M.roa>0.15?'Excellent (>15%)':M.roa>0.05?'Good (5–15%)':'Low (<5%)'):'Net Income ÷ Total Assets', '%')+
  '</div>'+
  '<div class="mgroup">'+
    MF('Gross Margin', M.gm!=null?pct(M.gm):null, rate(M.gm,0.2,0.4), M.gm!=null?(M.gm>0.4?'Strong (>40%)':M.gm>0.2?'Adequate':'Thin (<20%)'):'Gross Profit ÷ Revenue', '%')+
    MF('Operating Margin', M.om!=null?pct(M.om):null, rate(M.om,0.1,0.2), M.om!=null?(M.om>0.2?'Strong (>20%)':M.om>0.1?'Good':'Weak'):'Operating Income ÷ Revenue', '%')+
  '</div>'+
  '<div class="mgroup">'+
    MF('Net Profit Margin', M.pm!=null?pct(M.pm):null, rate(M.pm,0.05,0.2), M.pm!=null?(M.pm>0.2?'Excellent':M.pm>0.05?'Adequate':'Thin'):'Net Income ÷ Revenue', '%')+
    MF('Revenue (TTM)', M.rev!=null?n2(M.rev,2,ccy):null, M.rev!=null?(M.rev>0?'good':'bad'):'neutral', 'Trailing 12-month revenue')+
  '</div>'+
  '<div class="mgroup">'+
    MF('EBITDA', M.ebitda!=null?n2(M.ebitda,2,ccy):null, M.ebitda!=null?(M.ebitda>0?'good':'bad'):'neutral', 'Earnings before interest, taxes, depreciation &amp; amortisation')+
    MF('Net Income', M.ni!=null?n2(M.ni,2,ccy):null, M.ni!=null?(M.ni>0?'good':'bad'):'neutral', 'Bottom-line profit (latest annual)')+
  '</div>'+
  (M.niGrowth!=null?
  '<div class="mgroup cols1">'+
    MF('Net Income Growth (YoY)', p2(M.niGrowth,1)+'%', M.niGrowth>15?'good':M.niGrowth>0?'warn':'bad', 'Year-over-year net income change from annual statements')+
  '</div>':'')+

  /* ══════════════════════════════════════════════════
     SECTION 3: CASH FLOW & DEBT
  ══════════════════════════════════════════════════ */
  '<div class="sec">Cash Flow &amp; Debt (Current Year)</div>'+
  '<div class="mgroup">'+
    MF('Free Cash Flow', M.fcf!=null?n2(M.fcf,2,ccy):null, M.fcf!=null?(M.fcf>0?'good':M.fcf<0?'bad':'neutral'):'neutral', M.fcf!=null?(M.fcf>0?'Positive — cash generative':'Negative — burning cash'):'Calculated: OpCF − CapEx')+
    MF('FCF / Share', M.fcfPS!=null?ccy+p2(M.fcfPS,2):null, M.fcfPS!=null?(M.fcfPS>0?'good':'bad'):'neutral', 'Used in FCF-based DCF valuation')+
  '</div>'+
  '<div class="mgroup">'+
    MF('Operating Cash Flow', M.opCF!=null?n2(M.opCF,2,ccy):null, M.opCF!=null?(M.opCF>0?'good':'bad'):'neutral', 'Cash generated from core operations')+
    MF('Total Cash', M.cash!=null?n2(M.cash,2,ccy):null, 'neutral', 'Cash &amp; short-term equivalents')+
  '</div>'+
  '<div class="mgroup">'+
    MF('Total Debt', M.td!=null?n2(M.td,2,ccy):null, M.td!=null?(M.td>0?'bad':'good'):'neutral', 'Short-term + long-term debt combined')+
    MF('Net Debt', M.netDebt!=null?n2(M.netDebt,2,ccy):null, M.netDebt!=null?(M.netDebt<0?'good':M.netDebt>0?'bad':'neutral'):'neutral', M.netDebt!=null?(M.netDebt<0?'Net cash position (negative = good)':'Debt exceeds cash'):'Total Debt − Cash')+
  '</div>'+
  '<div class="mgroup">'+
    MF('Debt / Equity', M.deRatio!=null?p2(M.deRatio,2)+'×':null, M.deRatio!=null?rate(M.deRatio,0.5,1.5,true):'neutral', M.deRatio!=null?(M.deRatio<0.5?'Conservative (<0.5×)':M.deRatio<1.5?'Moderate':'Leveraged (>1.5×)'):'Total Debt ÷ Equity', 'times')+
    MF('Debt Ratio', M.debtRatio!=null?p2(M.debtRatio,3):null, M.debtRatio!=null?rate(M.debtRatio,0.3,0.6,true):'neutral', M.debtRatio!=null?(M.debtRatio<0.3?'Low leverage':M.debtRatio<0.6?'Moderate':'High leverage'):'Total Debt ÷ Total Assets', '×')+
  '</div>'+
  '<div class="mgroup">'+
    MF('Current Ratio', M.cr!=null?p2(M.cr,2):null, M.cr!=null?rate(M.cr,1.5,2.0):'neutral', M.cr!=null?(M.cr>=2?'Healthy (≥2)':M.cr>=1?'Adequate':'Below 1 — risk'):'Current Assets ÷ Current Liabilities', '×')+
    MF('Quick Ratio', M.qr!=null?p2(M.qr,2):null, M.qr!=null?rate(M.qr,1.0,1.5):'neutral', M.qr!=null?(M.qr>=1.5?'Strong':M.qr>=1?'Adequate':'Below 1'):'(Cash + Receivables) ÷ Current Liabilities', '×')+
  '</div>'+

  /* ══════════════════════════════════════════════════
     SECTION 4: INTRINSIC VALUE (editable inputs)
  ══════════════════════════════════════════════════ */
  (!isETF?
  '<div class="sec">Intrinsic Value Calculator</div>'+
  '<div class="mgroup">'+
    MFE('EPS (editable)', M.eps!=null?p2(M.eps,2):'', '', 'Trailing 12M EPS — edit to run scenarios', ccy, 'iv_eps')+
    MFE('EPS Growth % / yr', p2(M.gEst,1), '', M.gSrc+' — edit to adjust', '%/yr', 'iv_g')+
  '</div>'+
  '<div class="mgroup">'+
    MFE('Bond Yield %', p2(BY,1), '', 'Graham formula denominator (AAA yield)', '%', 'iv_by')+
    MFE('Discount Rate %', p2(DR,1), '', 'Required return for DCF model', '%', 'iv_dr')+
  '</div>'+
  '<button class="ivbtn" id="ivcalc">↻ Calculate Intrinsic Value</button>'+
  '<div id="ivout">'+renderIV(ivG,ivGN,ivD,ivF,M.price,ccy)+'</div>'+
  '<div class="ivnote">Graham V = EPS×(8.5+2g)×4.4/Y &nbsp;·&nbsp; Graham# = √(22.5×EPS×BV) &nbsp;·&nbsp; DCF = Σ[E×(1+g)ⁿ/(1+r)ⁿ] + 15× terminal. For education only.</div>'
  :'')+

  /* ══════════════════════════════════════════════════
     SECTION 5: ANALYST TARGETS
  ══════════════════════════════════════════════════ */
  (M.tgtMn?
  '<div class="sec">Analyst Consensus</div>'+
  '<div class="mgroup cols3">'+
    MF('Target Low', M.tgtLo!=null?ccy+p2(M.tgtLo):null, M.tgtLo&&M.tgtLo>M.price?'good':'neutral', 'Lowest analyst target')+
    MF('Target Mean', ccy+p2(M.tgtMn), M.tgtMn>M.price?'good':'warn', 'Consensus mean ('+( M.numAn||'N')+ ' analysts)')+
    MF('Target High', M.tgtHi!=null?ccy+p2(M.tgtHi):null, M.tgtHi&&M.tgtHi>M.price?'good':'neutral', 'Highest analyst target')+
  '</div>'+
  '<div class="mgroup cols1">'+
    MF('Recommendation', rl(M.recKey), null, 'Analyst consensus rating', '', '')+
  '</div>':'')+

  /* ══════════════════════════════════════════════════
     SECTION 6: OTHER METRICS
  ══════════════════════════════════════════════════ */
  '<div class="sec">Other Metrics</div>'+
  '<div class="mgroup">'+
    MF('Beta', M.beta!=null?p2(M.beta,2):null, M.beta!=null?(M.beta>1.5?'bad':M.beta<0.8?'warn':'good'):'neutral', M.beta!=null?(M.beta>1?'More volatile than market':'Less volatile than market'):'vs S&P 500')+
    MF('Short Ratio', M.shortR!=null?p2(M.shortR,1)+'d':null, M.shortR!=null?(M.shortR>5?'bad':M.shortR>2?'warn':'good'):'neutral', M.shortR!=null?(M.shortR>5?'High short interest':'Low short interest'):'Days to cover short positions')+
  '</div>'+
  '<div class="mgroup">'+
    MF('Total Assets', M.ta!=null?n2(M.ta,2,ccy):null, 'neutral', 'Total assets from latest balance sheet')+
    MF('Shareholder Equity', M.te!=null?n2(M.te,2,ccy):null, M.te!=null?(M.te>0?'good':'bad'):'neutral', 'Book value of equity')+
  '</div>'+
  (M.divY5y!=null?
  '<div class="mgroup cols1">'+
    MF('5Y Avg Dividend Yield', p2(M.divY5y,2)+'%', M.divY5y>3?'good':'neutral', '5-year average dividend yield')+
  '</div>':'')+

  /* ── Research links ── */
  '<div class="sec">Research Links</div>'+
  '<div class="lgrid">'+
    '<a class="lb" href="https://finance.yahoo.com/quote/'+sym+'" target="_blank"><span>📊</span>Yahoo Finance</a>'+
    '<a class="lb" href="https://stockanalysis.com/stocks/'+bb+'/" target="_blank"><span>📋</span>StockAnalysis</a>'+
    '<a class="lb" href="https://www.macrotrends.net/stocks/charts/'+bb+'/revenue" target="_blank"><span>📈</span>Macrotrends</a>'+
    '<a class="lb" href="https://www.morningstar.com/search?query='+sym+'" target="_blank"><span>⭐</span>Morningstar</a>'+
    (isSGX?'<a class="lb" href="https://www.sgx.com/securities/equities/'+sym.replace('.SI','')+'" target="_blank"><span>🇸🇬</span>SGX</a>':'')+
    (isLSE?'<a class="lb" href="https://www.londonstockexchange.com/stock/'+sym.replace('.L','')+'/analysis" target="_blank"><span>🇬🇧</span>LSE</a>':'')+
    '<a class="lb" href="https://simplywall.st/stocks/search?q='+sym+'" target="_blank"><span>🔍</span>SimplyWallSt</a>'+
    '<a class="lb" href="https://www.bloomberg.com/quote/'+bb+':US" target="_blank"><span>📰</span>Bloomberg</a>'+
  '</div>'
  );
}

function bindFund(){
  document.querySelectorAll('[data-s]').forEach(el=>el.addEventListener('click',()=>search(el.dataset.s)));
  var btn=document.getElementById('ivcalc'); if(!btn)return;
  btn.addEventListener('click',()=>{
    var M=S.D?.M; if(!M)return;
    var e=parseFloat(document.getElementById('iv_eps')?.value)||M.eps;
    var g=parseFloat(document.getElementById('iv_g')?.value)||M.gEst;
    var by=parseFloat(document.getElementById('iv_by')?.value)||S.cfg.bondYield;
    var dr=parseFloat(document.getElementById('iv_dr')?.value)||S.cfg.discount;
    var out=document.getElementById('ivout');
    if(out)out.innerHTML=renderIV(gV(e,g,by),gN(e,M.bvps),dcf(e,g,dr),dcfFCF(M.fcf,M.shares,g,dr),M.price,cs(M.ccy));
  });
}

/* ══ 10-YEAR HISTORY ══════════════════════════════════ */
function build10Y(fund){
  if(!fund)return null;
  var cfA=arr(fund,'cashflowStatementHistory.cashflowStatements');
  var isA=arr(fund,'incomeStatementHistory.incomeStatementHistory');
  var bsA=arr(fund,'balanceSheetHistory.balanceSheetStatements');
  if(!cfA.length&&!isA.length)return null;
  var by={};
  function fy(ts){return ts?new Date(ts*1000).getFullYear():null;}
  function en(yr){if(!by[yr])by[yr]={yr};return by[yr];}
  for(var s of isA){
    var yr=fy(rw(s.endDate)); if(!yr)continue;
    var r=en(yr);
    r.rev=rw(s.totalRevenue); r.ni=rw(s.netIncome);
    r.gp=rw(s.grossProfit); r.opInc=rw(s.operatingIncome)||null;
  }
  for(var s of cfA){
    var yr=fy(rw(s.endDate)); if(!yr)continue;
    var r=en(yr);
    r.opCF=rw(s.totalCashFromOperatingActivities);
    var cx=rw(s.capitalExpenditures); /* negative in Yahoo */
    r.capex=cx; r.fcf=rw(s.freeCashflow)||(r.opCF!=null&&cx!=null?r.opCF+cx:r.opCF);
  }
  for(var s of bsA){
    var yr=fy(rw(s.endDate)); if(!yr)continue;
    var r=en(yr);
    r.td=rw(s.totalDebt)||rw(s.longTermDebt)||null;
    r.cash=rw(s.cash)||null; r.ta=rw(s.totalAssets)||null;
    r.eq=rw(s.totalStockholderEquity)||null;
  }
  var yrs=Object.keys(by).map(Number).sort((a,b)=>b-a).slice(0,10);
  return{yrs,by};
}

var HTABS=[
  {k:'fcf',  l:'Free Cash Flow'},
  {k:'rev',  l:'Revenue'},
  {k:'ni',   l:'Net Profit'},
  {k:'opCF', l:'Operating CF'},
  {k:'gp',   l:'Gross Profit'},
  {k:'td',   l:'Total Debt'},
  {k:'price',l:'Price Chart (20Y)'},
];

function hHist(){
  var hasDat=S.D&&!S.D.err;
  return '<div class="pg">'+
    '<div class="ytabs">'+HTABS.map(t=>'<div class="ytab'+(t.k===S.hTab?' on':'')+'" data-ht="'+t.k+'">'+t.l+'</div>').join('')+'</div>'+
    (S.loading?'<div class="loader"><div class="spin"></div><div class="lp">Loading…</div></div>':
     !hasDat?'<div class="empty" style="padding:28px 0"><div class="ei">📈</div><h3>Search first</h3><p>Up to 10 years of annual data.</p></div>':
     renderHTab())+
    (hasDat?'<div class="sec">Sources</div><div class="lgrid">'+
      '<a class="lb" href="https://finance.yahoo.com/quote/'+S.sym+'/history/" target="_blank"><span>📊</span>YF History</a>'+
      '<a class="lb" href="https://www.macrotrends.net/stocks/charts/'+S.sym.replace(/\..+/,'')+'/revenue" target="_blank"><span>📈</span>Macrotrends 10Y</a>'+
    '</div>':'')+'</div>';
}

function renderHTab(){
  if(S.hTab==='price')return renderPriceChart();
  return renderFundTable();
}

function renderPriceChart(){
  var h=S.D?.hist; if(!h?.ts?.length)return'<div style="padding:20px;color:var(--mut);font-size:12px">No price history loaded.</div>';
  var cut=Date.now()/1000-20*365.25*86400, rows=[];
  for(var i=0;i<h.ts.length;i++)if(h.ts[i]>=cut&&h.close[i]!=null)rows.push({t:h.ts[i],v:h.close[i]});
  if(!rows.length)return'<div style="padding:20px;color:var(--mut)">No data.</div>';
  var ccy=cs(h.ccy||'');
  var tbl=rows.slice().reverse().map((r,i,a)=>{
    var pv=a[i+1]?.v; var ch=pv?((r.v-pv)/Math.abs(pv)*100):null;
    return'<tr><td>'+new Date(r.t*1000).toLocaleDateString('en-GB',{year:'numeric',month:'short'})+'</td>'+
      '<td class="yx">'+ccy+p2(r.v)+'</td>'+
      '<td class="'+(ch>0?'yp':ch<0?'yn':'yx')+'">'+(ch!=null?(ch>0?'+':'')+p2(ch,1)+'%':'—')+'</td></tr>';
  }).join('');
  return'<div class="chbox"><div class="chtitle">Stock Price — '+S.sym+'</div><div id="chartWrap"><canvas id="hcanvas"></canvas></div></div>'+
    '<div class="yscroll"><table><thead><tr><th>Date</th><th>Price</th><th>Change</th></tr></thead><tbody>'+tbl+'</tbody></table></div>';
}

function renderFundTable(){
  var h10=build10Y(S.D?.fund);
  if(!h10?.yrs.length)return'<div style="padding:20px;font-size:12px;color:var(--mut)">Annual data unavailable — proxy may not have connected. Try refreshing or visit <strong>Macrotrends.net</strong>.</div>';
  var {yrs,by}=h10, ccy=cs(S.D.M.ccy);
  var kMap={fcf:'Free Cash Flow',rev:'Revenue',ni:'Net Profit',opCF:'Operating CF',gp:'Gross Profit',td:'Total Debt'};
  var key=S.hTab, label=kMap[key]||key;
  function getV(r){return r[key]??null;}
  function vcls(v){if(key==='td')return v>0?'yn':'yx';return v>0?'yp':v<0?'yn':'yx';}

  /* main data rows */
  var rows=[
    {l:label, fn:r=>r[key]??null, fmt:v=>ccy+n2(v), cls:v=>key==='td'?(v>0?'yn':'yx'):(v>0?'yp':v<0?'yn':'yx')},
    {l:'Rev Growth', fn:(r,yr,i)=>{var c=r.rev,p=by[yrs[i+1]]?.rev;return(c&&p&&p>0)?((c-p)/Math.abs(p)*100):null;}, fmt:v=>(v>0?'+':'')+p2(v,1)+'%', cls:v=>v>5?'yp':v>0?'yx':'yn'},
    {l:'FCF Margin', fn:r=>(r.fcf!=null&&r.rev&&r.rev>0)?(r.fcf/r.rev*100):null, fmt:v=>p2(v,1)+'%', cls:v=>v>10?'yp':v>0?'yx':'yn'},
    {l:'Net Margin', fn:r=>(r.ni!=null&&r.rev&&r.rev>0)?(r.ni/r.rev*100):null, fmt:v=>p2(v,1)+'%', cls:v=>v>15?'yp':v>0?'yx':'yn'},
    {l:'Debt/Equity', fn:r=>(r.td!=null&&r.eq&&r.eq>0)?(r.td/r.eq):null, fmt:v=>p2(v,2)+'×', cls:v=>v<0.5?'yp':v<1.5?'yx':'yn'},
  ];

  var hdr='<tr><th>Metric</th>'+yrs.map(y=>'<th>'+y+'</th>').join('')+'</tr>';
  var body=rows.map(row=>'<tr><td>'+row.l+'</td>'+yrs.map((yr,i)=>{
    var v=row.fn(by[yr]||{},yr,i);
    if(v==null)return'<td class="yx">—</td>';
    return'<td class="'+row.cls(v)+'">'+row.fmt(v)+'</td>';
  }).join('')+'</tr>').join('');

  return'<div class="yscroll"><table><thead>'+hdr+'</thead><tbody>'+body+'</tbody></table></div>';
}

function bindHist(){
  document.querySelectorAll('[data-ht]').forEach(el=>el.addEventListener('click',()=>{
    S.hTab=el.dataset.ht;
    document.querySelectorAll('[data-ht]').forEach(x=>x.classList.toggle('on',x===el));
    var pg=document.querySelector('#main .pg'); if(!pg){paint();return;}
    var tabs=pg.querySelector('.ytabs');
    while(tabs?.nextSibling)pg.removeChild(tabs.nextSibling);
    var tmp=document.createElement('div');
    tmp.innerHTML=renderHTab()+
      '<div class="sec">Sources</div><div class="lgrid">'+
      '<a class="lb" href="https://finance.yahoo.com/quote/'+S.sym+'/history/" target="_blank"><span>📊</span>YF History</a>'+
      '<a class="lb" href="https://www.macrotrends.net/stocks/charts/'+S.sym.replace(/\..+/,'')+'/revenue" target="_blank"><span>📈</span>Macrotrends 10Y</a>'+
      '</div>';
    while(tmp.firstChild)pg.appendChild(tmp.firstChild);
    if(S.hTab==='price')setTimeout(drawChart,60);
  }));
  if(S.hTab==='price')setTimeout(drawChart,80);
}

async function drawChart(){
  var cv=document.getElementById('hcanvas'); if(!cv||!S.D)return;
  try{
    await new Promise((res,rej)=>{
      if(window.Chart){res();return;}
      var sc=document.createElement('script');
      sc.src='https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
      sc.onload=res;sc.onerror=()=>rej(new Error('Chart.js failed'));
      document.head.appendChild(sc);
    });
  }catch(e){var w=document.getElementById('chartWrap');if(w)w.innerHTML='<div style="padding:22px;text-align:center;color:var(--mut);font-size:12px">Chart unavailable — see table below.</div>';return;}
  if(S.chart){try{S.chart.destroy();}catch(e){} S.chart=null;}
  var h=S.D.hist; if(!h?.ts?.length)return;
  var cut=Date.now()/1000-20*365.25*86400, labels=[], vals=[];
  for(var i=0;i<h.ts.length;i++)if(h.ts[i]>=cut&&h.close[i]!=null){
    labels.push(new Date(h.ts[i]*1000).toLocaleDateString('en-GB',{year:'numeric',month:'short'}));
    vals.push(h.close[i]);
  }
  if(!vals.length)return;
  var lv=vals[vals.length-1],fv=vals[0], lc=lv>=fv?'#1dc96d':'#e85252';
  var ctx=cv.getContext('2d'), g=ctx.createLinearGradient(0,0,0,195);
  g.addColorStop(0,lv>=fv?'rgba(29,201,109,.15)':'rgba(232,82,82,.15)'); g.addColorStop(1,'rgba(0,0,0,0)');
  S.chart=new window.Chart(ctx,{type:'line',
    data:{labels,datasets:[{label:'Price',data:vals,borderColor:lc,backgroundColor:g,borderWidth:1.5,pointRadius:0,pointHoverRadius:4,fill:true,tension:.3}]},
    options:{responsive:true,maintainAspectRatio:false,
      interaction:{mode:'index',intersect:false},
      plugins:{legend:{display:false},tooltip:{backgroundColor:'#162538',titleColor:'#8aaac8',bodyColor:'#dce8f8',borderColor:'#1c3050',borderWidth:1,padding:11,callbacks:{label:c=>' '+cs(h.ccy||'')+p2(c.raw,2)}}},
      scales:{x:{grid:{color:'rgba(28,48,80,.35)',drawTicks:false},ticks:{color:'#3d5878',font:{size:10},maxTicksLimit:8},border:{color:'#1c3050'}},
        y:{grid:{color:'rgba(28,48,80,.35)',drawTicks:false},ticks:{color:'#3d5878',font:{family:'SF Mono,Menlo,monospace',size:10},callback:v=>cs(h.ccy||'')+n2(v,0),maxTicksLimit:6},border:{color:'#1c3050'}}}}
  });
}

/* ══ SETTINGS PAGE ════════════════════════════════════ */
function hSett(){
  var pn=n=>n>=0&&n<PX.length?PX[n].n:'auto';
  return '<div class="pg">'+
  '<div class="sec">Connection Status</div>'+
  '<div class="mgroup">'+
    MF('Chart Proxy', pn(S.pxC), 'neutral', 'Used for v8/finance/chart (price + basic ratios)')+
    MF('Fundamentals Proxy', pn(S.pxF), 'neutral', 'Used for v11/quoteSummary (FCF, margins, debt)')+
  '</div>'+
  '<div class="sec">Calculation Parameters</div>'+
  '<div class="strow"><div><div class="stlbl">Bond Yield % (AAA)</div><div class="stdesc">Graham formula denominator — default 4.4%</div></div>'+
    '<input class="stnum" id="s-b" type="number" value="'+S.cfg.bondYield+'" min="0" max="20" step="0.1"></div>'+
  '<div class="strow"><div><div class="stlbl">DCF Discount Rate %</div><div class="stdesc">Required annual return — default 10%</div></div>'+
    '<input class="stnum" id="s-d" type="number" value="'+S.cfg.discount+'" min="5" max="30" step="0.5"></div>'+
  '<button class="stbtn" id="ssave">Save Settings</button>'+
  '<div class="sec">Data Sources</div>'+
  '<div class="infobox">'+
    '<strong>All data auto-populated from:</strong><br>'+
    '<code>v8/chart meta</code> → Price, P/E, EPS, P/B, Beta, Div Yield, 52W, Book Value<br>'+
    '<code>financialData</code> → ROE, ROA, Margins, FCF, OpCF, Debt, Cash, Targets<br>'+
    '<code>defaultKeyStatistics</code> → PEG, Shares, Fwd P/E, Short Ratio<br>'+
    '<code>summaryDetail</code> → AUM (ETF), Payout Ratio, Div History<br>'+
    '<code>cashflowStatements</code> → FCF = OpCF + CapEx (CapEx negative in Yahoo)<br>'+
    '<code>incomeStatements</code> → 10Y Revenue, Net Profit, Gross Profit history<br>'+
    '<code>balanceSheetHistory</code> → Assets, Equity, Debt history<br>'+
    '<code>earningsTrend</code> → 5Y growth estimate for PEG &amp; IV calculations<br><br>'+
    '<strong>Calculated fields:</strong> PEG = P/E÷Growth · Net Debt · Debt Ratio · EV/EBITDA · EV/Rev · FCF Yield · FCF/Share · Graham V · Graham# · DCF(EPS) · DCF(FCF) · MoS%<br><br>'+
    '<strong>Proxy chain:</strong> '+PX.map(p=>p.n).join(' → ')+
  '</div>'+
  '<div class="sec">Deploy to GitHub Pages</div>'+
  '<div class="infobox">'+
    '1. Upload <code>index.html</code>, <code>manifest.json</code>, <code>sw.js</code><br>'+
    '2. Repo → Settings → Pages → Source: <code>main</code> branch<br>'+
    '3. iPhone Safari → Share → <strong>Add to Home Screen</strong>'+
  '</div></div>';
}
function bindSett(){
  document.getElementById('ssave')?.addEventListener('click',()=>{
    S.cfg.bondYield=parseFloat(document.getElementById('s-b').value)||4.4;
    S.cfg.discount=parseFloat(document.getElementById('s-d').value)||10;
    saveS(); toast('Settings saved ✓');
  });
}

/* ══ RENDER ENGINE ════════════════════════════════════ */
function setBadge(t,c){var el=document.getElementById('badge');if(el){el.textContent=t;el.className=c;}}
function setStep(s){S.step=s;var el=document.getElementById('lstep');if(el)el.textContent=s;}
function setPct(p){S.pct=p;var el=document.getElementById('lfill');if(el)el.style.width=p+'%';}
function paint(){
  try{
    if(S.chart){try{S.chart.destroy();}catch(e){}S.chart=null;}
    var el=document.getElementById('main');if(!el)return;
    if(S.page==='fund'){
      if(S.loading){el.innerHTML='<div class="pg"><div class="loader"><div class="spin"></div><div class="lp">Loading '+S.sym+'…</div><div class="lstep" id="lstep">'+S.step+'</div><div class="lbar"><div class="lfill" id="lfill" style="width:'+S.pct+'%"></div></div><div class="lhint">Fetching from Yahoo Finance. International tickers may take 20–30 s.</div></div></div>';return;}
      if(!S.sym){el.innerHTML='<div class="pg"><div class="empty"><div class="ei">📊</div><h3>Investment Analytics</h3><p>All ratios auto-populated from audited data<br>FCF · Margins · Debt · PEG · Intrinsic Value<br>10-Year history table<br><br><em>AAPL</em> · <em>NVDA</em> · <em>BRK-B</em> · <em>D05.SI</em><br><em>VWRL.L</em> · <em>CSPX.L</em> · <em>ES3.SI</em></p></div></div>';return;}
      if(!S.D){el.innerHTML='<div class="pg"><div class="loader"><div class="spin"></div><div class="lp">Resolving…</div></div></div>';return;}
      if(S.D.err){
        var sg=S.D.sugg||[];
        el.innerHTML='<div class="pg">'+
          '<div class="errbox"><h3>Not found: '+S.D.sym+'</h3>'+
          '<p>Try: <code>AAPL</code> · <code>BRK-B</code> · <code>D05.SI</code> · <code>VWRL.L</code></p></div>'+
          (sg.length?'<div class="dym"><div class="dyt">Did you mean?</div>'+
            sg.slice(0,4).map(r=>'<div class="dyi" data-s="'+r.symbol+'"><div><div class="dys">'+r.symbol+'</div><div class="dyn">'+(r.shortname||r.longname||'')+'</div></div><div style="color:var(--gold);font-size:18px;margin-left:8px">→</div></div>').join('')+'</div>':'')+'</div>';
        bindFund(); return;
      }
      el.innerHTML='<div class="pg">'+buildFund()+'</div>';
      bindFund();
    } else if(S.page==='hist'){el.innerHTML=hHist();bindHist();}
    else if(S.page==='sett'){el.innerHTML=hSett();bindSett();}
  }catch(err){
    var m=document.getElementById('main');
    if(m)m.innerHTML='<div class="pg"><div class="errbox"><h3>Error</h3><p>'+err.message+'</p></div></div>';
    console.error(err);
  }
}
function goPage(p){S.page=p;document.querySelectorAll('.nb').forEach(b=>b.classList.toggle('on',b.dataset.p===p));paint();}

/* ══ AUTOCOMPLETE ════════════════════════════════════ */
function hideSugg(){var s=document.getElementById('sugg');if(s)s.style.display='none';}
async function showSugg(q){
  var sugg=document.getElementById('sugg');if(!sugg||!q)return;
  try{
    var r=await searchYF(q); if(!r.length){hideSugg();return;}
    sugg.style.display='block';
    sugg.innerHTML='<div class="sh">Suggestions</div>'+
      r.slice(0,7).map(x=>'<div class="sitem" data-s="'+x.symbol+'"><div><div class="sticker">'+x.symbol+'</div><div class="sname">'+(x.shortname||x.longname||'')+'</div></div><div class="smeta">'+exN(x.exchDisp||x.exchange,x.symbol)+'<br>'+(x.quoteType||'')+'</div></div>').join('');
    sugg.querySelectorAll('.sitem').forEach(el=>{
      var go=()=>search(el.dataset.s);
      el.addEventListener('mousedown',go);
      el.addEventListener('touchstart',e=>{e.preventDefault();go();},{passive:false});
    });
  }catch(e){hideSugg();}
}

/* ══ MAIN SEARCH ══════════════════════════════════════ */
async function search(raw){
  if(!raw?.trim())return;
  var sym=raw.trim().toUpperCase();
  var inp=document.getElementById('si'); if(inp)inp.value=sym;
  hideSugg();
  S.sym=sym; S.D=null; S.loading=true; S.pct=0; S.step=''; paint();

  try{
    /* Step 1: price chart */
    setStep('Fetching live price…'); setPct(10);
    var chartRes=await getChart(sym,'1d','1m');

    /* Step 2: resolve if failed */
    if(!chartRes){
      setStep('Resolving ticker…'); setPct(20);
      var sr=await searchYF(sym);
      if(sr.length){var rs=sr[0].symbol;chartRes=await getChart(rs,'1d','1m');if(chartRes)sym=rs;}
    }

    if(!chartRes){
      var sg=await searchYF(raw.trim());
      S.D={err:true,sym:raw.trim().toUpperCase(),sugg:sg};
      S.loading=false;paint();return;
    }

    sym=(chartRes.meta?.symbol)||sym;
    S.sym=sym; if(inp)inp.value=sym;
    setBadge('Loading…','chk');

    /* Step 3: history + all fundamentals in parallel */
    setStep('Fetching 20Y history + all fundamentals…'); setPct(30);
    var [hRes,fRes]=await Promise.allSettled([
      getChart(sym,'20y','1mo'),
      fetchAllFund(sym)
    ]);

    var hist=null;
    if(hRes.status==='fulfilled'&&hRes.value){
      var hv=hRes.value;
      hist={ts:hv.timestamp||[],close:hv.indicators?.quote?.[0]?.close||[],ccy:hv.meta?.currency||''};
    }
    var fund=fRes.status==='fulfilled'?fRes.value:null;

    /* Step 4: extract all metrics */
    setStep('Processing…'); setPct(92);
    var M=extract(chartRes.meta,fund);
    S.D={sym,meta:chartRes.meta,fund,hist,M,ts:Math.floor(Date.now()/1000)};
    saveS();

  }catch(e){S.D={err:true,sym,sugg:[],msg:e.message};}

  S.loading=false; S.step=''; setPct(100); paint();
  if(S.page==='hist'&&S.hTab==='price')setTimeout(drawChart,90);
}

function toast(msg){var t=document.getElementById('toast');if(!t)return;t.textContent=msg;t.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove('show'),2800);}

/* ══ INIT ═════════════════════════════════════════════ */
window.addEventListener('load',()=>{
  try{
    loadS();
    function updDot(){var b=document.getElementById('dot');if(b)b.classList.toggle('off',!navigator.onLine);}
    updDot(); window.addEventListener('online',updDot); window.addEventListener('offline',updDot);
    document.querySelectorAll('.nb').forEach(b=>b.addEventListener('click',()=>goPage(b.dataset.p)));
    var inp=document.getElementById('si'), btn=document.getElementById('sg');
    btn?.addEventListener('click',()=>{hideSugg();search(inp.value);});
    inp?.addEventListener('keydown',e=>{if(e.key==='Enter'){hideSugg();search(inp.value);}});
    inp?.addEventListener('blur',()=>setTimeout(hideSugg,200));
    var dbt=null;
    inp?.addEventListener('input',()=>{clearTimeout(dbt);var v=inp.value.trim();if(v.length<1){hideSugg();return;}dbt=setTimeout(()=>showSugg(v),320);});
    if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
    paint();
    /* Background connection test */
    setTimeout(async()=>{
      setBadge('Checking…','chk');
      try{var r=await getChart('AAPL','1d','1d');setBadge(r?.meta?.regularMarketPrice?'✓ Live':'? Limited',r?.meta?'ok':'chk');}
      catch(e){setBadge('✗ Offline','bad');}
    },1000);
  }catch(e){var m=document.getElementById('main');if(m)m.innerHTML='<div class="pg"><div class="errbox"><h3>Startup Error</h3><p>'+e.message+'</p></div></div>';}
});
</script>
</body>
</html>
