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
  --bg:#090e1c;--bg2:#0c1220;--card:#101b2c;--card2:#142030;
  --b1:#1a2d44;--b2:#203550;
  --gold:#e9bc52;--gx:rgba(233,188,82,.1);--gb:rgba(233,188,82,.28);
  --txt:#dce8f5;--dim:#7a96b5;--mut:#364d66;
  --grn:#1dc96d;--gx2:rgba(29,201,109,.1);--gb2:rgba(29,201,109,.28);
  --red:#e85252;--rx:rgba(232,82,82,.1);--rb:rgba(232,82,82,.28);
  --amb:#f09c2a;--ax:rgba(240,156,42,.1);--ab:rgba(240,156,42,.28);
  --blu:#4e96f5;--blux:rgba(78,150,245,.1);--blub:rgba(78,150,245,.28);
  --pur:#a05fff;--px2:rgba(160,95,255,.1);--pb2:rgba(160,95,255,.28);
  --f:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",sans-serif;
  --m:"SF Mono","Menlo","Courier New",monospace;
  --r:13px;--r2:9px;--r3:6px;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
html,body{height:100%;background:var(--bg);font-family:var(--f);font-size:15px;color:var(--txt)}
#app{display:flex;flex-direction:column;min-height:100vh;min-height:-webkit-fill-available}

/* ── HEADER ─────────────────────────────────────────── */
#hdr{flex:0 0 auto;z-index:200;background:rgba(9,14,28,.98);
  border-bottom:1px solid var(--b1);
  padding:10px 14px 12px;
  padding-top:calc(env(safe-area-inset-top,0px) + 10px)}
.brand{display:flex;align-items:center;gap:8px;margin-bottom:10px}
.logo{font-size:18px;font-weight:700;color:var(--gold);letter-spacing:-.3px}
.dot{width:8px;height:8px;border-radius:50%;background:var(--grn);
  box-shadow:0 0 7px var(--grn);animation:pulse 2.5s ease-in-out infinite;flex-shrink:0}
.dot.off{background:var(--red);box-shadow:0 0 7px var(--red);animation:none}
@keyframes pulse{0%,100%{opacity:1}55%{opacity:.12}}
#badge{margin-left:auto;font-size:10px;font-weight:700;padding:3px 10px;
  border-radius:10px;border:1px solid;white-space:nowrap;letter-spacing:.2px}
#badge.ok{color:var(--grn);border-color:var(--gb2);background:var(--gx2)}
#badge.bad{color:var(--red);border-color:var(--rb);background:var(--rx)}
#badge.chk{color:var(--amb);border-color:var(--ab);background:var(--ax)}
.srow{display:flex;gap:8px;position:relative}
#si{flex:1;background:var(--card2);border:1.5px solid var(--b2);border-radius:var(--r);
  color:var(--txt);font:600 17px var(--m);letter-spacing:1.5px;text-transform:uppercase;
  padding:12px 14px;outline:none;-webkit-appearance:none;transition:border-color .2s}
#si::placeholder{font:400 13px var(--f);letter-spacing:0;text-transform:none;color:var(--mut)}
#si:focus{border-color:var(--gold)}
#sg{width:50px;height:50px;border-radius:var(--r);background:var(--gold);color:#000;
  border:none;font-size:22px;font-weight:700;cursor:pointer;flex-shrink:0;
  display:flex;align-items:center;justify-content:center}
#sg:active{opacity:.72;transform:scale(.91)}
/* suggestions */
#sugg{position:absolute;top:calc(100% + 5px);left:0;right:60px;z-index:500;
  background:var(--bg2);border:1px solid var(--b2);border-radius:var(--r);
  overflow:hidden;box-shadow:0 18px 54px rgba(0,0,0,.75);display:none;
  max-height:280px;overflow-y:auto}
.sh{padding:5px 13px;font-size:9px;font-weight:700;letter-spacing:1.6px;
  text-transform:uppercase;color:var(--mut);background:rgba(9,14,28,.9)}
.si2{display:flex;justify-content:space-between;align-items:center;
  padding:11px 13px;cursor:pointer;border-bottom:1px solid var(--b1)}
.si2:last-child{border:none}.si2:active,.si2:hover{background:var(--gx)}
.ss2{font:700 13px var(--m);color:var(--gold)}
.sn2{font-size:11px;color:var(--dim);margin-top:2px;max-width:160px;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sr4{text-align:right;font-size:10px;color:var(--mut);flex-shrink:0;margin-left:8px}

/* ── MAIN / NAV ─────────────────────────────────────── */
#main{flex:1 1 auto;overflow-y:auto;overflow-x:hidden;
  -webkit-overflow-scrolling:touch;overscroll-behavior-y:contain}
#nav{flex:0 0 auto;z-index:100;background:rgba(8,13,24,.99);
  border-top:1px solid var(--b1);
  padding-bottom:env(safe-area-inset-bottom,0px);
  display:grid;grid-template-columns:repeat(3,1fr)}
.nb{background:none;border:none;cursor:pointer;display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:3px;padding:8px 4px 6px;
  color:var(--mut);font:700 9px var(--f);letter-spacing:.9px;text-transform:uppercase}
.nb svg{width:21px;height:21px;stroke-width:1.65;fill:none;stroke:currentColor}
.nb.on{color:var(--gold)}.nb.on svg{filter:drop-shadow(0 0 5px rgba(233,188,82,.4))}

/* ── SHARED PAGE LAYOUT ─────────────────────────────── */
.pg{padding:14px;padding-bottom:32px}
.sec{font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;
  color:var(--mut);margin:18px 0 8px 1px}
.sec:first-child{margin-top:0}
.note{background:var(--ax);border:1px solid var(--ab);border-radius:var(--r2);
  padding:10px 13px;margin-bottom:10px;display:flex;gap:9px;
  font-size:11px;color:var(--dim);line-height:1.65;align-items:flex-start}
.note.blue{background:var(--blux);border-color:var(--blub);color:var(--blu)}
.note.grn{background:var(--gx2);border-color:var(--gb2);color:var(--grn)}

/* ── LOADER ─────────────────────────────────────────── */
.loader{display:flex;flex-direction:column;align-items:center;
  gap:12px;padding:60px 20px;text-align:center}
.spin{width:36px;height:36px;border:2.5px solid var(--b1);
  border-top-color:var(--gold);border-radius:50%;animation:rot .72s linear infinite}
@keyframes rot{to{transform:rotate(360deg)}}
.lp{color:var(--dim);font-size:14px}
.lstep{font-size:11px;color:var(--amb);font-family:var(--m)}
.lhint{font-size:11px;color:var(--mut);max-width:300px;line-height:1.75}
.lprog{width:200px;height:3px;background:var(--b1);border-radius:2px;overflow:hidden}
.lbar{height:100%;background:var(--gold);border-radius:2px;transition:width .4s ease}

/* ── EMPTY / ERROR ──────────────────────────────────── */
.empty{text-align:center;padding:52px 20px}
.ei{font-size:42px;opacity:.18;margin-bottom:14px}
.empty h3{font-size:16px;font-weight:600;color:var(--dim);margin-bottom:8px}
.empty p{font-size:13px;color:var(--mut);line-height:1.95}
.empty em{color:var(--gold);font-style:normal}
.errbox{background:var(--rx);border:1px solid var(--rb);border-radius:var(--r);
  padding:16px;margin-bottom:12px}
.errbox h3{color:var(--red);font-size:14px;font-weight:600;margin-bottom:7px}
.errbox p{font-size:12px;color:var(--dim);line-height:1.75}
.errbox code{font-family:var(--m);font-size:11px;color:var(--gold)}
/* did you mean */
.dym{background:var(--card);border:1.5px solid var(--gb);border-radius:var(--r);
  padding:14px;margin-bottom:12px}
.dyt{font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;
  color:var(--mut);margin-bottom:9px}
.dyi{display:flex;align-items:center;justify-content:space-between;
  padding:11px 13px;background:var(--card2);border:1px solid var(--b1);
  border-radius:var(--r2);margin-bottom:6px;cursor:pointer}
.dyi:last-child{margin:0}.dyi:active{background:var(--gx)}
.dys{font:700 14px var(--m);color:var(--gold)}
.dyn{font-size:11px;color:var(--dim);margin-top:2px}
.dyarr{color:var(--gold);font-size:18px;margin-left:8px;flex-shrink:0}

/* ── PRICE CARD ─────────────────────────────────────── */
.pc{background:linear-gradient(150deg,var(--card) 0%,var(--card2) 100%);
  border:1px solid var(--b2);border-radius:var(--r);padding:16px;
  margin-bottom:10px;position:relative;overflow:hidden}
.pc::after{content:'';position:absolute;right:-20px;top:-20px;width:110px;height:110px;
  border-radius:50%;background:radial-gradient(circle,rgba(233,188,82,.04),transparent 70%);
  pointer-events:none}
.phead{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px}
.psym{font:700 11px var(--m);color:var(--gold);letter-spacing:2.2px}
.pname{font-size:14px;font-weight:600;color:var(--txt);margin-top:3px;line-height:1.3}
.pmeta{font-size:10px;color:var(--mut);margin-top:3px}
.tag{font:700 9px var(--f);letter-spacing:.8px;text-transform:uppercase;
  padding:3px 8px;border-radius:4px;flex-shrink:0}
.tag.etf{background:var(--blux);color:var(--blu);border:1px solid var(--blub)}
.tag.stock{background:var(--gx2);color:var(--grn);border:1px solid var(--gb2)}
.tag.ut{background:var(--px2);color:var(--pur);border:1px solid var(--pb2)}
.prow{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;margin-bottom:13px}
.pval{font:700 38px var(--m);color:var(--txt);letter-spacing:-1.8px;line-height:1}
.pccy{font-size:13px;color:var(--dim);align-self:flex-end;margin-bottom:3px}
.pchg{font:600 13px var(--m);padding:4px 12px;border-radius:7px}
.pchg.up{background:var(--gx2);color:var(--grn);border:1px solid var(--gb2)}
.pchg.dn{background:var(--rx);color:var(--red);border:1px solid var(--rb)}
.pgrid{display:grid;grid-template-columns:1fr 1fr;gap:6px;
  border-top:1px solid var(--b1);padding-top:12px}
.kv .k{font-size:9px;color:var(--mut);text-transform:uppercase;
  letter-spacing:.8px;margin-bottom:2px}
.kv .v{font:500 12px var(--m);color:var(--dim)}
.kv .v.pos{color:var(--grn)}.kv .v.neg{color:var(--red)}

/* ── SOURCE BADGES ──────────────────────────────────── */
.srcs{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px}
.sbadge{font-size:9px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;
  padding:2px 8px;border-radius:4px;border:1px solid}
.sbadge.yf{color:#6e8fff;border-color:rgba(110,143,255,.28);background:rgba(110,143,255,.08)}
.sbadge.ok{color:var(--grn);border-color:var(--gb2);background:var(--gx2)}
.sbadge.warn{color:var(--amb);border-color:var(--ab);background:var(--ax)}
.sbadge.sgx{color:#3ec89a;border-color:rgba(62,200,154,.28);background:rgba(62,200,154,.08)}

/* ── RATIO CARDS ────────────────────────────────────── */
.rg{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:4px}
.rc{background:var(--card2);border:1px solid var(--b1);border-radius:var(--r2);
  padding:11px 12px;position:relative;overflow:hidden}
.rc::before{content:'';position:absolute;top:0;left:0;right:0;height:2.5px;border-radius:2px 2px 0 0}
.rc.g::before{background:var(--grn)}.rc.n::before{background:var(--amb)}
.rc.b::before{background:var(--red)}.rc.x::before{background:var(--mut)}
.rl{font-size:9px;color:var(--mut);text-transform:uppercase;letter-spacing:.8px;margin-bottom:4px}
.rv{font:600 17px var(--m)}
.rv.g{color:var(--grn)}.rv.n{color:var(--amb)}.rv.b{color:var(--red)}.rv.x{color:var(--dim)}
.rv.na{font-size:13px!important;color:var(--mut)!important}
.rs{font-size:9px;color:var(--mut);margin-top:3px;line-height:1.4}

/* ── INTRINSIC VALUE ────────────────────────────────── */
.ivcont{background:linear-gradient(135deg,rgba(233,188,82,.05),transparent 70%);
  border:1px solid var(--gb);border-radius:var(--r);padding:14px;margin-bottom:6px}
.ivrow{display:flex;justify-content:space-between;align-items:center;
  padding:8px 0;border-bottom:1px solid rgba(26,45,68,.5)}
.ivrow:last-of-type{border:none}
.ivlabel{font-size:12px;color:var(--dim)}
.ivlabel small{font-size:10px;color:var(--mut);margin-left:4px}
.ivval{font:600 14px var(--m);color:var(--gold)}
.ivval.na{color:var(--mut);font-size:12px!important}
.mosbar{height:5px;background:var(--b1);border-radius:3px;margin:10px 0 4px;overflow:hidden}
.mosfill{height:100%;border-radius:3px;transition:width .9s ease}
.mosrow{display:flex;justify-content:space-between;font-size:10px;color:var(--mut)}
.ivgrid{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:9px}
.ivlb{display:block;font-size:9px;color:var(--mut);text-transform:uppercase;
  letter-spacing:.5px;margin-bottom:3px}
.ivinput{width:100%;background:var(--card);border:1px solid var(--b2);
  border-radius:var(--r3);color:var(--txt);font:500 13px var(--m);
  padding:7px 10px;outline:none;-webkit-appearance:none}
.ivinput:focus{border-color:var(--gold)}
.ivbtn{width:100%;padding:10px;background:var(--gx);border:1px solid var(--gb);
  border-radius:var(--r2);color:var(--gold);font:700 11px var(--f);
  letter-spacing:.8px;text-transform:uppercase;cursor:pointer;margin-bottom:6px}
.ivbtn:active{background:rgba(233,188,82,.2)}
.ivfooter{font-size:9px;color:var(--mut);line-height:1.9;margin:4px 0 14px}

/* ── TABLE ──────────────────────────────────────────── */
.tbl{background:var(--card);border:1px solid var(--b1);border-radius:var(--r);
  overflow:hidden;margin-bottom:6px}
.tr2{display:flex;justify-content:space-between;align-items:center;
  padding:10px 14px;border-bottom:1px solid rgba(26,45,68,.35)}
.tr2:last-child{border:none}
.tl2{font-size:12px;color:var(--dim)}.tv2{font:500 12px var(--m);color:var(--txt)}
.tv2.g{color:var(--grn)}.tv2.b{color:var(--red)}.tv2.n{color:var(--amb)}

/* ── 10Y TABLE ──────────────────────────────────────── */
.ytbl{overflow-x:auto;-webkit-overflow-scrolling:touch;margin-bottom:8px;border-radius:var(--r);border:1px solid var(--b1)}
.ytbl table{width:100%;border-collapse:collapse;font-size:11px;min-width:500px}
.ytbl th{background:var(--bg2);color:var(--mut);font:700 9px var(--f);
  letter-spacing:1.2px;text-transform:uppercase;padding:7px 10px;
  border-bottom:1px solid var(--b1);text-align:right;white-space:nowrap}
.ytbl th:first-child{text-align:left;position:sticky;left:0;background:var(--bg2);z-index:2}
.ytbl td{padding:7px 10px;border-bottom:1px solid rgba(26,45,68,.3);
  color:var(--dim);font-family:var(--m);text-align:right;white-space:nowrap}
.ytbl td:first-child{text-align:left;color:var(--mut);font-family:var(--f);
  position:sticky;left:0;background:var(--card);z-index:1}
.ytbl tr:last-child td{border:none}
.ytbl .yp{color:var(--grn)}.ytbl .yn{color:var(--red)}.ytbl .yx{color:var(--dim)}
.ytbl tr:hover td{background:rgba(233,188,82,.03)}

/* ── CHART AREA ─────────────────────────────────────── */
.chbox{background:var(--card);border:1px solid var(--b1);border-radius:var(--r);
  padding:13px;margin-bottom:10px}
.chtitle{font-size:11px;font-weight:600;color:var(--dim);
  text-transform:uppercase;letter-spacing:.7px;margin-bottom:9px}
#chartWrap{position:relative;height:210px}
.pills{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}
.pill{font:700 11px var(--f);padding:7px 15px;background:var(--card);
  border:1px solid var(--b1);border-radius:20px;color:var(--mut);cursor:pointer}
.pill.on{background:var(--gx);border-color:var(--gb);color:var(--gold)}
.pill:active{transform:scale(.95)}

/* ── LINKS GRID ─────────────────────────────────────── */
.lgrid{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:6px}
.lb{display:flex;align-items:center;gap:8px;background:var(--card);
  border:1px solid var(--b2);border-radius:var(--r2);padding:11px 13px;
  text-decoration:none;color:var(--dim);font-size:12px;font-weight:500}
.lb:active{background:var(--card2)}.lb span{font-size:15px}

/* ── SETTINGS ───────────────────────────────────────── */
.srow2{display:flex;justify-content:space-between;align-items:center;
  background:var(--card);border:1px solid var(--b1);border-radius:var(--r2);
  padding:13px 15px;margin-bottom:7px;gap:12px}
.sl2{font-size:14px;font-weight:500;color:var(--txt)}
.sdesc{font-size:11px;color:var(--mut);margin-top:2px}
.snum{background:var(--card2);border:1px solid var(--b2);border-radius:var(--r3);
  color:var(--txt);font:500 13px var(--m);padding:6px 10px;
  width:72px;text-align:right;outline:none;-webkit-appearance:none}
.snum:focus{border-color:var(--gold)}
.sbtn{width:100%;padding:14px;background:var(--gold);color:#000;
  border:none;border-radius:var(--r);font:700 13px var(--f);cursor:pointer;margin-top:8px}
.sbtn:active{opacity:.82}
.infobox{background:var(--card);border:1px solid var(--b1);border-radius:var(--r);
  padding:15px;margin-bottom:8px;font-size:12px;color:var(--dim);line-height:2}
.infobox strong{color:var(--txt)}.infobox code{font-family:var(--m);font-size:11px;color:var(--gold)}

/* ── TOAST ──────────────────────────────────────────── */
#toast{position:fixed;bottom:calc(64px + env(safe-area-inset-bottom,0px) + 10px);
  left:50%;transform:translateX(-50%) translateY(6px);
  background:var(--card);border:1px solid var(--b2);color:var(--txt);
  font-size:13px;padding:9px 20px;border-radius:22px;white-space:nowrap;
  z-index:900;box-shadow:0 4px 24px rgba(0,0,0,.6);
  opacity:0;pointer-events:none;transition:all .22s}
#toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:var(--b2);border-radius:2px}
</style>
</head>
<body>
<div id="app">
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

  <div id="main">
    <div class="pg">
      <div class="empty">
        <div class="ei">📊</div>
        <h3>Investment Analytics</h3>
        <p>Live price · Valuation ratios · FCF<br>
        10Y financial history · Intrinsic value<br><br>
        <em>AAPL</em> · <em>NVDA</em> · <em>BRK-B</em> · <em>D05.SI</em><br>
        <em>VWRL.L</em> · <em>CSPX.L</em> · <em>ES3.SI</em> · <em>IWDA.L</em></p>
      </div>
    </div>
  </div>

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
/* ═══════════════════════════════════════════════════════════
   STOCKLENS v8  |  Re-engineered from ground up
   Data strategy:
     Tier 1: v8/chart (direct, no proxy) → price + basic ratios
     Tier 2: v11/quoteSummary via proxy → FCF, margins, debt
             Batched into 4 small requests to avoid size limits
     Tier 3: Calculated metrics (FCF/sh, EV, net debt, IV)
   ═══════════════════════════════════════════════════════════ */

/* ── 8 CORS PROXY OPTIONS ────────────────────────────────
   Rule: NEVER use /get (wrapped) for quoteSummary — size limit.
   Always use /raw or direct-passthrough proxies.
──────────────────────────────────────────────────────── */
var PX = [
  {n:'allorigins',    u:'https://api.allorigins.win/raw?url=',       enc:true,  wrap:false},
  {n:'corsproxy.io',  u:'https://corsproxy.io/?url=',                enc:true,  wrap:false},
  {n:'codetabs',      u:'https://api.codetabs.com/v1/proxy?quest=',  enc:true,  wrap:false},
  {n:'corsproxy.org', u:'https://corsproxy.org/?',                   enc:true,  wrap:false},
  {n:'thingproxy',    u:'https://thingproxy.freeboard.io/fetch/',    enc:false, wrap:false},
  {n:'cors.sh',       u:'https://proxy.cors.sh/',                    enc:false, wrap:false},
  {n:'crossorigin',   u:'https://crossorigin.me/',                   enc:false, wrap:false},
  {n:'allorigins2',   u:'https://api.allorigins.win/get?url=',       enc:true,  wrap:true},  // last resort
];

var YF_CHART1  = 'https://query1.finance.yahoo.com/v8/finance/chart/';
var YF_CHART2  = 'https://query2.finance.yahoo.com/v8/finance/chart/';
var YF_QS      = 'https://query2.finance.yahoo.com/v11/finance/quoteSummary/';
var YF_SEARCH  = 'https://query1.finance.yahoo.com/v1/finance/search?quotesCount=8&newsCount=0&q=';

/* Module batches — kept small to avoid proxy size limits */
var QS_MODS = {
  A: 'financialData',                         // ~35KB: margins, FCF, debt, targets
  B: 'defaultKeyStatistics,summaryDetail',    // ~25KB: PEG, shares, AUM, fwdPE
  C: 'cashflowStatementHistory,cashflowStatementHistoryQuarterly', // ~40KB: FCF history
  D: 'incomeStatementHistory,balanceSheetHistory,earningsTrend',   // ~60KB: P&L, BS, growth
};

/* ── APP STATE ───────────────────────────────────────── */
var ST = {
  page: 'fund',
  sym: '', data: null,
  loading: false, loadPct: 0, step: '',
  hMetric: 'fcf', hPeriod: '10y',
  chart: null,
  pxChart: -1,   // best proxy index for chart calls
  pxFund:  -1,   // best proxy index for quoteSummary calls
  settings: {bondYield: 4.4, discountRate: 10}
};

function saveState(){
  try{
    localStorage.setItem('sl8s', JSON.stringify(ST.settings));
    localStorage.setItem('sl8pc', String(ST.pxChart));
    localStorage.setItem('sl8pf', String(ST.pxFund));
  }catch(e){}
}
function loadState(){
  try{
    var s=localStorage.getItem('sl8s'); if(s) Object.assign(ST.settings, JSON.parse(s));
    var c=localStorage.getItem('sl8pc'); if(c!=null) ST.pxChart=parseInt(c)||0;
    var f=localStorage.getItem('sl8pf'); if(f!=null) ST.pxFund=parseInt(f)||0;
  }catch(e){}
}

/* ══════════════════════════════════════════════════════
   CORE FETCH ENGINE
   ══════════════════════════════════════════════════════ */
async function apiFetch(url, savedPx, skipWrap, ms){
  ms = ms||12000;
  var errs = [];

  /* Direct first */
  try{
    var ac = new AbortController();
    var tid = setTimeout(()=>ac.abort(), Math.min(ms, 7000));
    var r = await fetch(url, {signal:ac.signal,
      headers:{'Accept':'application/json',
               'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'}});
    clearTimeout(tid);
    if(!r.ok) throw new Error('HTTP '+r.status);
    var t = await r.text();
    if(!t||t.length<5) throw new Error('empty');
    return JSON.parse(t);
  }catch(e){ errs.push('direct:'+e.message.slice(0,20)); }

  /* Build proxy order: best known first */
  var order = [];
  if(savedPx>=0 && savedPx<PX.length) order.push(savedPx);
  for(var i=0;i<PX.length;i++) if(order.indexOf(i)<0) order.push(i);

  for(var j=0;j<order.length;j++){
    var idx = order[j], px = PX[idx];
    if(skipWrap && px.wrap) continue;
    var purl = px.enc ? px.u+encodeURIComponent(url) : px.u+url;
    try{
      var ac2 = new AbortController();
      var tid2 = setTimeout(()=>ac2.abort(), ms+5000);
      var r2 = await fetch(purl, {signal:ac2.signal, headers:{Accept:'application/json'}});
      clearTimeout(tid2);
      if(!r2.ok) throw new Error('HTTP '+r2.status);
      var t2 = await r2.text();
      if(!t2||t2.length<5) throw new Error('empty');
      var parsed;
      if(px.wrap){
        var w = JSON.parse(t2);
        if(!w||!w.contents) throw new Error('no contents');
        parsed = JSON.parse(w.contents);
      } else {
        parsed = JSON.parse(t2);
      }
      /* Remember this proxy */
      return {_px:idx, data:parsed};
    }catch(e){ errs.push(px.n+':'+e.message.slice(0,20)); }
  }
  throw new Error('All proxies failed: '+errs.slice(0,4).join(' | '));
}

/* Convenience wrapper that extracts data and tracks proxy */
async function fetch2(url, pxSaved, skipWrap, ms){
  var r = await apiFetch(url, pxSaved, skipWrap, ms);
  if(r && r._px!==undefined){ /* came from proxy */
    return {px:r._px, data:r.data};
  }
  return {px:-1, data:r}; /* came from direct */
}

/* ══════════════════════════════════════════════════════
   YAHOO FINANCE FETCHERS
   ══════════════════════════════════════════════════════ */

/* v8/chart — direct where possible, proxy as fallback */
async function getChart(sym, range, interval){
  var params = '?range='+range+'&interval='+interval+'&includePrePost=false&events=div,splits';
  for(var base of [YF_CHART1, YF_CHART2]){
    try{
      var r = await fetch2(base+sym+params, ST.pxChart, false, 10000);
      var res = r.data && r.data.chart && r.data.chart.result && r.data.chart.result[0];
      if(res && res.meta && res.meta.regularMarketPrice){
        if(r.px>=0) ST.pxChart = r.px;
        setBadge('✓ '+PX[r.px>=0?r.px:0].n, 'ok');
        return res;
      }
    }catch(e){}
  }
  return null;
}

/* v1/search — for autocomplete */
async function searchYF(q){
  try{
    var r = await fetch2(YF_SEARCH+encodeURIComponent(q), ST.pxChart, false, 8000);
    var quotes = r.data&&r.data.finance&&r.data.finance.result&&
                 r.data.finance.result[0]&&r.data.finance.result[0].quotes||[];
    return quotes.filter(q=>q.quoteType&&q.symbol&&!q.symbol.includes('^'));
  }catch(e){ return []; }
}

/* v11/quoteSummary — one module batch at a time */
async function getQS(sym, mods){
  var url = YF_QS+sym+'?modules='+mods+'&formatted=true&lang=en-US&region=US&crumb=';
  try{
    /* skipWrap=true = never use allorigins /get for quoteSummary (size limit) */
    var r = await fetch2(url, ST.pxFund, true, 20000);
    if(r.px>=0) ST.pxFund = r.px;
    var qsr = r.data&&r.data.quoteSummary;
    /* Check for YF error response */
    if(qsr && qsr.error){
      console.warn('QS error for '+sym+':', JSON.stringify(qsr.error).slice(0,80));
      return null;
    }
    return (qsr&&qsr.result&&qsr.result[0]) || null;
  }catch(e){
    console.warn('QS failed ('+mods.slice(0,20)+'):', e.message.slice(0,50));
    return null;
  }
}

/* Fetch all 4 module batches concurrently, merge */
async function getAllFundamentals(sym){
  setStep('Fetching fundamentals…'); setProgress(40);

  /* Run all 4 batches in parallel */
  var [rA, rB, rC, rD] = await Promise.allSettled([
    getQS(sym, QS_MODS.A),
    getQS(sym, QS_MODS.B),
    getQS(sym, QS_MODS.C),
    getQS(sym, QS_MODS.D),
  ]);

  var merged = {};
  for(var result of [rA,rB,rC,rD]){
    if(result.status==='fulfilled' && result.value){
      Object.assign(merged, result.value);
    }
  }
  setProgress(80);
  return Object.keys(merged).length>0 ? merged : null;
}

/* ══════════════════════════════════════════════════════
   DATA EXTRACTION HELPERS
   All Yahoo Finance fields come wrapped as {raw:N, fmt:"S"}
   rw() extracts the .raw numeric value safely.
   ══════════════════════════════════════════════════════ */

function rw(v){
  if(v===null||v===undefined) return null;
  if(typeof v==='object' && 'raw' in v){
    var n=v.raw; return (n===null||n===undefined||n==='Infinity'||!isFinite(n))?null:n;
  }
  if(typeof v==='number' && isFinite(v)) return v;
  return null;
}

/* Deep safe path traversal: 'a.b.0.c' on nested objects/arrays */
function dig(obj, path){
  if(!obj||!path) return null;
  var cur = obj;
  for(var k of path.split('.')){
    if(cur===null||cur===undefined) return null;
    cur = Array.isArray(cur) ? cur[parseInt(k)||0] : cur[k];
  }
  return rw(cur);
}

/* Get array from path, return [] if not found */
function arr(obj, path){
  if(!obj||!path) return [];
  var cur = obj;
  for(var k of path.split('.')){
    if(!cur) return [];
    cur = cur[k];
  }
  return Array.isArray(cur) ? cur : [];
}

/* ══════════════════════════════════════════════════════
   EXTRACT ALL METRICS FROM FETCHED DATA
   ══════════════════════════════════════════════════════ */
function extractMetrics(meta, fund){
  var M = {}; /* all metrics go here */

  /* ── FROM v8/chart META (always available) ── */
  M.price   = meta.regularMarketPrice || 0;
  M.prev    = meta.chartPreviousClose || meta.previousClose || M.price;
  M.chg     = M.price - M.prev;
  M.chgPct  = M.prev ? (M.chg/M.prev)*100 : 0;
  M.h52     = rw(meta.fiftyTwoWeekHigh)||meta.fiftyTwoWeekHigh||0;
  M.l52     = rw(meta.fiftyTwoWeekLow)||meta.fiftyTwoWeekLow||0;
  M.vol     = rw(meta.regularMarketVolume)||rw(meta.averageVolume)||0;
  M.mktCap  = rw(meta.marketCap)||null;
  M.pe      = rw(meta.trailingPE)||null;
  M.eps     = rw(meta.epsTrailingTwelveMonths)||null;
  M.epsF    = rw(meta.epsForward)||null;
  M.bvps    = rw(meta.bookValue)||null;
  M.pb      = rw(meta.priceToBook)||null;
  M.beta    = rw(meta.beta)||null;
  M.divY    = rw(meta.dividendYield)||null;
  M.name    = meta.longName||meta.shortName||'';
  M.ccy     = meta.currency||'';
  M.exch    = meta.exchangeName||meta.fullExchangeName||'';
  M.qt      = meta.quoteType||meta.instrumentType||'';

  if(!fund) return M;

  /* ── FROM financialData (Batch A) ── */
  var fd = fund.financialData||{};
  M.roe     = rw(fd.returnOnEquity);
  M.roa     = rw(fd.returnOnAssets);
  M.pm      = rw(fd.profitMargins);
  M.gm      = rw(fd.grossMargins);
  M.om      = rw(fd.operatingMargins);
  M.fcf     = rw(fd.freeCashflow);    /* direct FCF if available */
  M.opCF    = rw(fd.operatingCashflow);
  M.td      = rw(fd.totalDebt);
  M.cash    = rw(fd.totalCash);
  M.de      = rw(fd.debtToEquity);   /* stored as e.g. 45.2 meaning 45.2% or 0.452x */
  M.cr      = rw(fd.currentRatio);
  M.qr      = rw(fd.quickRatio);
  M.rev     = rw(fd.totalRevenue);
  M.ebitda  = rw(fd.ebitda);
  M.tgtMean = rw(fd.targetMeanPrice);
  M.tgtLow  = rw(fd.targetLowPrice);
  M.tgtHigh = rw(fd.targetHighPrice);
  M.recKey  = (typeof fd.recommendationKey==='string')?fd.recommendationKey:'';
  M.recMean = rw(fd.recommendationMean);

  /* ── FROM defaultKeyStatistics (Batch B) ── */
  var dks = fund.defaultKeyStatistics||{};
  M.peg     = rw(dks.pegRatio);
  M.shares  = rw(dks.sharesOutstanding);
  M.fwPE    = rw(dks.forwardPE);
  M.fwEPS   = rw(dks.forwardEps)||M.epsF;
  M.shortR  = rw(dks.shortRatio);
  M.bvpsDKS = rw(dks.bookValue);
  M.betaDKS = rw(dks.beta);

  /* FROM summaryDetail (Batch B) */
  var sd = fund.summaryDetail||{};
  M.aum       = rw(sd.totalAssets);
  M.payoutR   = rw(sd.payoutRatio);
  M.divY5y    = rw(sd.fiveYearAvgDividendYield);

  /* Fill meta gaps */
  M.bvps  = M.bvps  || M.bvpsDKS;
  M.beta  = M.beta  || M.betaDKS;
  M.pe    = M.pe    || rw(sd.trailingPE);
  M.divY  = M.divY  != null ? M.divY : rw(sd.dividendYield);
  if(!M.fwPE && M.fwEPS && M.fwEPS>0 && M.price>0) M.fwPE = M.price/M.fwEPS;

  /* ── FROM cashflow statements (Batch C) ── */
  var cfAnn  = arr(fund,'cashflowStatementHistory.cashflowStatements');
  var cfQtr  = arr(fund,'cashflowStatementHistoryQuarterly.cashflowStatements');
  M.cfAnn    = cfAnn;
  M.cfQtr    = cfQtr;

  /* FCF from annual statements if financialData didn't have it */
  if(M.fcf===null && cfAnn.length>0){
    var opA = rw(cfAnn[0].totalCashFromOperatingActivities);
    var cxA = rw(cfAnn[0].capitalExpenditures); /* negative in Yahoo */
    if(opA!==null){
      M.fcf = (cxA!==null) ? opA+cxA : opA;
      if(M.opCF===null) M.opCF = opA;
    }
  }
  /* FCF from trailing 4 quarters if annual still null */
  if(M.fcf===null && cfQtr.length>0){
    var sop=0,scx=0,hop=false,hcx=false;
    for(var i=0;i<Math.min(4,cfQtr.length);i++){
      var oq=rw(cfQtr[i].totalCashFromOperatingActivities);
      var cq=rw(cfQtr[i].capitalExpenditures);
      if(oq!==null){sop+=oq;hop=true;}
      if(cq!==null){scx+=cq;hcx=true;}
    }
    if(hop){ M.fcf=(hcx?sop+scx:sop); if(M.opCF===null)M.opCF=sop; }
  }

  /* ── FROM income + balance (Batch D) ── */
  var isStmts = arr(fund,'incomeStatementHistory.incomeStatementHistory');
  var bsStmts = arr(fund,'balanceSheetHistory.balanceSheetStatements');
  M.isStmts   = isStmts;
  M.bsStmts   = bsStmts;

  /* Latest year from income statement */
  if(isStmts.length>0){
    M.niLatest   = rw(isStmts[0].netIncome);
    M.revLatest  = rw(isStmts[0].totalRevenue);
    M.gpLatest   = rw(isStmts[0].grossProfit);
    M.rev        = M.rev || M.revLatest;
  }
  if(bsStmts.length>0){
    M.ta = rw(bsStmts[0].totalAssets);
    M.te = rw(bsStmts[0].totalStockholderEquity);
    M.tl = rw(bsStmts[0].totalLiab);
  }

  /* ── Earnings trend for growth estimate ── */
  var trends = arr(fund,'earningsTrend.trend');
  M.gEst = 10; M.gSrc = 'default';
  for(var t of trends){
    if(t.period==='5y'||t.period==='+5y'){
      var g5=rw(t.growth); if(g5!==null){M.gEst=g5*100;M.gSrc='5Y est';break;}
    }
  }
  if(M.gSrc==='default'){
    var eqGr = rw(dks.earningsQuarterlyGrowth);
    if(eqGr!==null){M.gEst=eqGr*100;M.gSrc='qtrly';}
  }
  if(!M.peg && M.pe && M.pe>0 && M.gEst>0) M.peg = M.pe/M.gEst;

  /* ── DERIVED METRICS ── */
  M.netDebt   = (M.td!==null&&M.cash!==null) ? M.td-M.cash : null;
  M.debtR     = (M.td!==null&&M.ta&&M.ta>0) ? M.td/M.ta : null;
  M.fcfPS     = (M.fcf!==null&&M.shares&&M.shares>0) ? M.fcf/M.shares : null;
  M.fcfYield  = (M.fcf!==null&&M.mktCap&&M.mktCap>0) ? M.fcf/M.mktCap : null;
  var ev      = M.mktCap&&M.netDebt!==null ? M.mktCap+M.netDebt :
                M.mktCap&&M.td ? M.mktCap+M.td : null;
  M.evEbitda  = (ev&&M.ebitda&&M.ebitda>0) ? ev/M.ebitda : null;
  M.evRev     = (ev&&M.rev&&M.rev>0) ? ev/M.rev : null;

  /* D/E — Yahoo stores as e.g. 45.2 meaning 45.2 (already ×100 in some cases) */
  /* normalise: if de > 20 it's likely stored as percentage, convert to ratio */
  if(M.de!==null) M.deRatio = M.de>20 ? M.de/100 : M.de;
  else M.deRatio = null;

  return M;
}

/* ══════════════════════════════════════════════════════
   BUILD 10-YEAR HISTORY TABLES
   ══════════════════════════════════════════════════════ */
function build10YHistory(fund, mktCap){
  if(!fund) return null;
  var isStmts = arr(fund,'incomeStatementHistory.incomeStatementHistory');
  var cfStmts = arr(fund,'cashflowStatementHistory.cashflowStatements');
  var bsStmts = arr(fund,'balanceSheetHistory.balanceSheetStatements');

  if(!isStmts.length && !cfStmts.length) return null;

  /* Build year-keyed map */
  var byYear = {};
  function fy(ts){ return ts ? new Date(ts*1000).getFullYear() : null; }
  function ensure(yr){ if(!byYear[yr]) byYear[yr]={yr}; return byYear[yr]; }

  /* Income statement */
  for(var s of isStmts){
    var yr = fy(rw(s.endDate)); if(!yr) continue;
    var r = ensure(yr);
    r.rev    = rw(s.totalRevenue);
    r.ni     = rw(s.netIncome);
    r.gp     = rw(s.grossProfit);
    r.ebitda = rw(s.ebitda)||rw(s.normalizedEBITDA)||null;
    r.opInc  = rw(s.operatingIncome)||null;
  }
  /* Cashflow */
  for(var s of cfStmts){
    var yr = fy(rw(s.endDate)); if(!yr) continue;
    var r = ensure(yr);
    r.opCF  = rw(s.totalCashFromOperatingActivities);
    r.capex = rw(s.capitalExpenditures); /* negative */
    r.fcf   = rw(s.freeCashflow) || (r.opCF!==null&&r.capex!==null ? r.opCF+r.capex : r.opCF);
  }
  /* Balance sheet */
  for(var s of bsStmts){
    var yr = fy(rw(s.endDate)); if(!yr) continue;
    var r = ensure(yr);
    r.td   = rw(s.totalDebt)||rw(s.longTermDebt)||null;
    r.cash = rw(s.cash)||null;
    r.ta   = rw(s.totalAssets)||null;
    r.eq   = rw(s.totalStockholderEquity)||null;
  }

  /* Sort years descending */
  var years = Object.keys(byYear).map(Number).sort((a,b)=>b-a).slice(0,10);
  return {years, byYear};
}

/* ══════════════════════════════════════════════════════
   FORMATTING HELPERS
   ══════════════════════════════════════════════════════ */
var CURRENCIES = {USD:'$',GBP:'£',GBp:'p',SGD:'S$',EUR:'€',HKD:'HK$',AUD:'A$',CAD:'C$',JPY:'¥',CHF:'Fr',INR:'₹'};
function cs(c){ return CURRENCIES[c]||(c?c+' ':''); }
function fN(n,dp){
  if(n===null||n===undefined||!isFinite(n)) return 'N/A';
  dp=dp==null?2:dp;
  var a=Math.abs(n);
  if(a>=1e12) return (n/1e12).toFixed(1)+'T';
  if(a>=1e9)  return (n/1e9).toFixed(2)+'B';
  if(a>=1e6)  return (n/1e6).toFixed(2)+'M';
  if(a>=1e3)  return (n/1e3).toFixed(1)+'K';
  return n.toFixed(dp);
}
function fP(n,dp){ if(n===null||n===undefined||!isFinite(n)) return 'N/A'; return n.toFixed(dp==null?2:dp); }
function fPct(n,mul){ if(n===null||!isFinite(n)) return 'N/A'; return ((mul!==false?n*100:n)).toFixed(2)+'%'; }
function exchangeName(e,s){
  var m={NMS:'NASDAQ',NGM:'NASDAQ',NGS:'NASDAQ',NYQ:'NYSE',PCX:'NYSE Arca',
    NYSEArca:'NYSE Arca',SES:'SGX',LSE:'London SE',IOB:'LSE Intl',
    ASX:'ASX',FRA:'Frankfurt',PAR:'Euronext Paris',AMS:'Euronext AMS',HKG:'HKEX',TOR:'TSX'};
  if(e&&m[e]) return m[e];
  if(s){
    if(s.endsWith('.SI')) return 'SGX';
    if(s.endsWith('.L'))  return 'London SE';
    if(s.endsWith('.AX')) return 'ASX';
    if(s.endsWith('.HK')) return 'HKEX';
    if(s.endsWith('.PA')) return 'Euronext';
    if(s.endsWith('.DE')) return 'Frankfurt';
  }
  return e||'';
}
function typeTag(qt){
  if(qt==='ETF')         return '<span class="tag etf">ETF</span>';
  if(qt==='MUTUALFUND')  return '<span class="tag ut">Unit Trust</span>';
  return '<span class="tag stock">Stock</span>';
}
function ago(ts){
  if(!ts) return 'live';
  var s=Math.floor(Date.now()/1000-ts);
  if(s<120) return 'live';
  if(s<3600) return Math.floor(s/60)+'m ago';
  if(s<86400) return Math.floor(s/3600)+'h ago';
  return '';
}

/* ── Rating helper ── */
function rate(v, lo, hi, lowerBetter){
  if(v===null||!isFinite(v)) return 'x';
  if(lowerBetter) return v<=lo?'g':v<=hi?'n':'b';
  return v>=hi?'g':v>=lo?'n':'b';
}

/* ── Render helpers ── */
function RC(label, val, cls, sub){
  var naC = (val==='N/A'||val===null||val===undefined) ? ' na' : '';
  var disp = (val===null||val===undefined)?'N/A':val;
  return '<div class="rc '+(cls||'x')+'">' +
    '<div class="rl">'+label+'</div>' +
    '<div class="rv '+(cls||'x')+naC+'">'+disp+'</div>' +
    (sub?'<div class="rs">'+sub+'</div>':'') +
  '</div>';
}
function TR(label, val, cls){
  return '<div class="tr2"><div class="tl2">'+label+'</div>'+
    '<div class="tv2'+(cls?' '+cls:'')+'">'+val+'</div></div>';
}

/* ══════════════════════════════════════════════════════
   INTRINSIC VALUE CALCULATIONS
   ══════════════════════════════════════════════════════ */
function gV(eps,g,by){ if(!eps||eps<=0) return null; return eps*(8.5+2*Math.min(Math.max(g||10,0),40))*4.4/(by||4.4); }
function gN(eps,bv){   if(!eps||eps<=0||!bv||bv<=0) return null; return Math.sqrt(22.5*Math.abs(eps)*Math.abs(bv)); }
function dcf(e,g,dr){
  if(!e||e<=0) return null;
  var gr=(g||10)/100, d=(dr||10)/100, pv=0;
  for(var i=1;i<=10;i++) pv += e*Math.pow(1+gr,i)/Math.pow(1+d,i);
  return pv + e*Math.pow(1+gr,10)*15/Math.pow(1+d,10);
}
function dcfFCF(fcf,shares,g,dr){ return (!fcf||fcf<=0||!shares||shares<=0)?null:dcf(fcf/shares,g,dr); }
function mosCalc(iv,p){ return (iv&&p&&iv>0)?((iv-p)/iv)*100:null; }

function renderIV(ivG,ivGN,ivD,ivF,price,ccy){
  var best = ivG||ivD||ivF||ivGN;
  var mosV = mosCalc(best,price);
  return '<div class="ivcont">' +
    ivRow('Graham Formula','EPS×(8.5+2g)×4.4/Y', ivG, ccy) +
    ivRow('Graham Number','√(22.5×EPS×BV/sh)',    ivGN, ccy) +
    ivRow('DCF — EPS','10Y growth + 15× terminal', ivD, ccy) +
    ivRow('DCF — FCF/Share','10Y growth + 15× terminal', ivF, ccy) +
  '</div>' + (mosV!==null ?
  '<div style="margin-top:4px">' +
    '<div style="font-size:10px;color:var(--mut);margin-bottom:5px">Margin of Safety vs current price</div>' +
    '<div class="mosbar"><div class="mosfill" style="width:'+Math.max(0,Math.min(100,mosV))+'%;background:'+
      (mosV>30?'var(--grn)':mosV>0?'var(--amb)':'var(--red)')+'"></div></div>' +
    '<div class="mosrow">' +
      '<span style="color:'+(mosV>0?'var(--grn)':'var(--red)')+'">' +
        (mosV>0?'Undervalued '+fP(mosV,1)+'%':'Overvalued '+fP(-mosV,1)+'%')+'</span>' +
      '<span>Price: '+ccy+fP(price)+'</span>' +
    '</div>' +
  '</div>' : '');
}
function ivRow(label,sub,val,ccy){
  return '<div class="ivrow"><span class="ivlabel">'+label+' <small>'+sub+'</small></span>' +
    '<span class="ivval'+(val===null?' na':'')+'">'+
    (val!==null ? ccy+fP(val) : 'N/A')+'</span></div>';
}

/* ══════════════════════════════════════════════════════
   FUNDAMENTALS PAGE
   ══════════════════════════════════════════════════════ */
function hFund(){
  if(ST.loading){
    return '<div class="pg"><div class="loader">' +
      '<div class="spin"></div>' +
      '<div class="lp">Loading '+ST.sym+'…</div>' +
      '<div class="lstep" id="lstep">'+ST.step+'</div>' +
      '<div class="lprog"><div class="lbar" id="lbar" style="width:'+ST.loadPct+'%"></div></div>' +
      '<div class="lhint">Fetching from Yahoo Finance via multiple proxy fallbacks.<br>International tickers may take 20–30 s.</div>' +
    '</div></div>';
  }
  if(!ST.sym){
    return '<div class="pg"><div class="empty"><div class="ei">📊</div>' +
      '<h3>Investment Analytics</h3>' +
      '<p>Live price · Current-year ratios from audited data<br>FCF · Margins · Debt · Intrinsic Value<br>10Y financial history<br><br>' +
      '<em>AAPL</em> · <em>NVDA</em> · <em>BRK-B</em> · <em>D05.SI</em><br>' +
      '<em>VWRL.L</em> · <em>CSPX.L</em> · <em>ES3.SI</em></p></div></div>';
  }
  if(!ST.data) return '<div class="pg"><div class="loader"><div class="spin"></div><div class="lp">Resolving…</div></div></div>';
  if(ST.data.err){
    var suggs = ST.data.sugg||[];
    return '<div class="pg">' +
      '<div class="errbox"><h3>Not found: '+ST.data.sym+'</h3>' +
      '<p>Examples: <code>AAPL</code> · <code>BRK-B</code> · <code>D05.SI</code> · <code>VWRL.L</code></p></div>' +
      (suggs.length ? '<div class="dym"><div class="dyt">Did you mean?</div>' +
        suggs.slice(0,4).map(r =>
          '<div class="dyi" data-s="'+r.symbol+'">' +
            '<div><div class="dys">'+r.symbol+'</div><div class="dyn">'+(r.shortname||r.longname||'')+'</div></div>' +
            '<div style="text-align:right;font-size:10px;color:var(--mut)">'+exchangeName(r.exchDisp||r.exchange,r.symbol)+'<br>'+(r.quoteType||'')+'</div>' +
            '<div class="dyarr">→</div>' +
          '</div>'
        ).join('') + '</div>' : '') +
    '</div>';
  }
  return '<div class="pg">'+buildFundamentals()+'</div>';
}

function buildFundamentals(){
  var d = ST.data, sym = d.sym;
  var M = d.metrics;
  var ccy = cs(M.ccy);
  var isETF = M.qt==='ETF'||M.qt==='MUTUALFUND';
  var BY=ST.settings.bondYield, DR=ST.settings.discountRate;

  var ivG  = gV(M.eps, M.gEst, BY);
  var ivGN = gN(M.eps, M.bvps);
  var ivD  = dcf(M.eps, M.gEst, DR);
  var ivF  = dcfFCF(M.fcf, M.shares, M.gEst, DR);

  var hasFund = !!(d.fund);
  var bb = sym.replace(/\..+/,'');
  var isSGX = sym.endsWith('.SI'), isLSE = sym.endsWith('.L');
  var up = M.chg>=0;

  return (
    /* ── SOURCE STATUS ── */
    '<div class="srcs">' +
      '<span class="sbadge yf">YF v8/Chart</span>' +
      (hasFund ?
        '<span class="sbadge ok">✓ Fundamentals</span>' +
        (M.fcf!==null ? '<span class="sbadge ok">✓ FCF</span>' : '<span class="sbadge warn">No FCF</span>') +
        (M.cfAnn&&M.cfAnn.length ? '<span class="sbadge ok">✓ Cashflow History</span>' : '') +
        (M.isStmts&&M.isStmts.length ? '<span class="sbadge ok">✓ Income History</span>' : '') :
        '<span class="sbadge warn">Price Only — proxy unavailable</span>') +
      (isSGX?'<span class="sbadge sgx">SGX</span>':'')+
    '</div>'+

    /* ── PRICE CARD ── */
    '<div class="pc">'+
      '<div class="phead"><div>'+
        '<div class="psym">'+sym+'</div>'+
        '<div class="pname">'+M.name+'</div>'+
        '<div class="pmeta">'+exchangeName(M.exch,sym)+(M.ccy?' · '+M.ccy:'')+' · '+ago(d.ts)+'</div>'+
      '</div>'+typeTag(M.qt)+'</div>'+
      '<div class="prow">'+
        '<div class="pval">'+fP(M.price)+'</div>'+
        '<div class="pccy">'+M.ccy+'</div>'+
        '<div class="pchg '+(up?'up':'dn')+'">'+(up?'+':'')+fP(M.chg)+' ('+(up?'+':'')+fP(M.chgPct,2)+'%)</div>'+
      '</div>'+
      '<div class="pgrid">'+
        '<div class="kv"><div class="k">52W High</div><div class="v">'+fP(M.h52)+'</div></div>'+
        '<div class="kv"><div class="k">52W Low</div><div class="v">'+fP(M.l52)+'</div></div>'+
        '<div class="kv"><div class="k">Volume</div><div class="v">'+fN(M.vol,0)+'</div></div>'+
        (M.mktCap?'<div class="kv"><div class="k">Market Cap</div><div class="v">'+ccy+fN(M.mktCap)+'</div></div>':'')+
        (M.divY!==null?'<div class="kv"><div class="k">Div Yield</div><div class="v pos">'+(M.divY<1?fPct(M.divY):M.divY.toFixed(2)+'%')+'</div></div>':'')+
        (M.beta!==null?'<div class="kv"><div class="k">Beta</div><div class="v">'+fP(M.beta)+'</div></div>':'')+
        (M.shares?'<div class="kv"><div class="k">Shares Out</div><div class="v">'+fN(M.shares,0)+'</div></div>':'')+
        (M.bvps!==null?'<div class="kv"><div class="k">Book Value/sh</div><div class="v">'+ccy+fP(M.bvps)+'</div></div>':'')+
        (M.aum?'<div class="kv"><div class="k">AUM</div><div class="v">'+ccy+fN(M.aum)+'</div></div>':'')+
        (M.cash?'<div class="kv"><div class="k">Cash</div><div class="v">'+ccy+fN(M.cash)+'</div></div>':'')+
        (M.tgtMean?'<div class="kv"><div class="k">Analyst Target</div><div class="v '+(M.tgtMean>M.price?'pos':'neg')+'">'+ccy+fP(M.tgtMean)+'</div></div>':'')+
      '</div>'+
    '</div>'+

    /* ── VALUATION ── */
    '<div class="sec">Valuation Ratios — Current Year</div>'+
    (isETF?'<div class="note blue">ℹ️ ETF/Unit Trust: P/E, EPS &amp; Graham not applicable. FCF Yield, P/B and AUM shown where available.</div>':'')+
    '<div class="rg">'+
      RC('P/E (TTM)',   M.pe!==null?fP(M.pe,1):'N/A',  isETF?'x':rate(M.pe,10,20,true), isETF?'Not applicable':'&lt;15 = value, &gt;30 expensive')+
      RC('P/E (Fwd)',   M.fwPE!==null?fP(M.fwPE,1):'N/A', isETF?'x':rate(M.fwPE,10,20,true), 'Based on fwd EPS est.')+
      RC('P/B Ratio',   M.pb!==null?fP(M.pb,2):'N/A',   rate(M.pb,1,3,true), '&lt;1.5 undervalued')+
      RC('PEG Ratio',   M.peg!==null?fP(M.peg,2):'N/A', rate(M.peg,0,1,true), '&lt;1 = growth at value')+
      RC('EPS (TTM)',   M.eps!==null?ccy+fP(M.eps,2):'N/A', M.eps!==null?(M.eps>0?'g':M.eps<0?'b':'x'):'x', 'Trailing 12 months')+
      RC('EPS (Fwd)',   M.fwEPS!==null?ccy+fP(M.fwEPS,2):'N/A', M.fwEPS!==null?(M.fwEPS>0?'g':M.fwEPS<0?'b':'x'):'x', 'Forward estimate')+
      RC('EV/EBITDA',  M.evEbitda!==null?fP(M.evEbitda,1):'N/A', rate(M.evEbitda,8,15,true), '&lt;10 = value, &gt;20 expensive')+
      RC('EV/Revenue', M.evRev!==null?fP(M.evRev,1):'N/A', rate(M.evRev,2,5,true), '&lt;2 undervalued')+
      RC('FCF Yield',  M.fcfYield!==null?fPct(M.fcfYield):'N/A', rate(M.fcfYield,0.03,0.08), '&gt;5% attractive')+
      (M.payoutR!==null?RC('Payout Ratio',fPct(M.payoutR),rate(M.payoutR,0.3,0.6,true),'Div ÷ EPS'):'')+
    '</div>'+

    /* ── INTRINSIC VALUE ── */
    (!isETF?
    '<div class="sec">Intrinsic Value</div>'+
    '<div class="ivgrid">'+
      '<div><label class="ivlb">Growth Rate % <span style="color:var(--mut)">('+M.gSrc+')</span></label>'+
        '<input class="ivinput" id="iv-g" type="number" value="'+fP(M.gEst,1)+'" min="0" max="50" step="0.5"></div>'+
      '<div><label class="ivlb">Bond Yield %</label>'+
        '<input class="ivinput" id="iv-b" type="number" value="'+BY+'" min="0" max="20" step="0.1"></div>'+
      '<div><label class="ivlb">Discount Rate %</label>'+
        '<input class="ivinput" id="iv-d" type="number" value="'+DR+'" min="5" max="30" step="0.5"></div>'+
      '<div><label class="ivlb">EPS (editable)</label>'+
        '<input class="ivinput" id="iv-e" type="number" value="'+(M.eps!==null?fP(M.eps):'')+'" step="0.01" placeholder="auto"></div>'+
    '</div>'+
    '<button class="ivbtn" id="ivc">↻ Recalculate</button>'+
    '<div id="ivo">'+renderIV(ivG,ivGN,ivD,ivF,M.price,ccy)+'</div>'+
    '<div class="ivfooter">Graham V=EPS×(8.5+2g)×4.4/Y &nbsp;·&nbsp; Graham#=√(22.5×EPS×BV) &nbsp;·&nbsp; DCF=Σ10Y+15× terminal. Not financial advice.</div>'
    :'')+

    /* ── PROFITABILITY ── */
    '<div class="sec">Profitability — Current Year (Audited)</div>'+
    '<div class="rg">'+
      RC('ROE',         M.roe!==null?fPct(M.roe):'N/A',  rate(M.roe,0.1,0.2), '>20% excellent')+
      RC('ROA',         M.roa!==null?fPct(M.roa):'N/A',  rate(M.roa,0.05,0.15), '>15% strong')+
      RC('Net Margin',  M.pm!==null?fPct(M.pm):'N/A',    rate(M.pm,0.05,0.2), '>20% excellent')+
      RC('Gross Margin',M.gm!==null?fPct(M.gm):'N/A',   rate(M.gm,0.2,0.4), '>40% strong')+
      RC('Op. Margin',  M.om!==null?fPct(M.om):'N/A',   rate(M.om,0.1,0.2), '>20% strong')+
      RC('Revenue TTM', M.rev!==null?ccy+fN(M.rev):'N/A', M.rev&&M.rev>0?'n':'x', 'Trailing 12M')+
      (M.ebitda!==null?RC('EBITDA',ccy+fN(M.ebitda),M.ebitda>0?'g':'b','Earnings before I/T/D/A'):'')+
      (M.niLatest!==null?RC('Net Income',ccy+fN(M.niLatest),M.niLatest>0?'g':'b','Latest annual'):'')+
    '</div>'+

    /* ── CASH FLOW & DEBT ── */
    '<div class="sec">Cash Flow &amp; Debt — Current Year</div>'+
    '<div class="rg">'+
      RC('Free Cash Flow', M.fcf!==null?ccy+fN(M.fcf):'N/A', M.fcf!==null?(M.fcf>0?'g':M.fcf<0?'b':'x'):'x','OpCF − CapEx')+
      RC('FCF / Share',    M.fcfPS!==null?ccy+fP(M.fcfPS,2):'N/A', M.fcfPS!==null?(M.fcfPS>0?'g':'b'):'x','For DCF model')+
      RC('Op. Cash Flow',  M.opCF!==null?ccy+fN(M.opCF):'N/A', M.opCF!==null?(M.opCF>0?'g':'b'):'x','Operating activities')+
      RC('Total Cash',     M.cash!==null?ccy+fN(M.cash):'N/A', 'n', 'Cash &amp; equivalents')+
      RC('Total Debt',     M.td!==null?ccy+fN(M.td):'N/A', M.td&&M.td>0?'b':'x', 'Short + long term')+
      RC('Net Debt',       M.netDebt!==null?ccy+fN(M.netDebt):'N/A', M.netDebt!==null?(M.netDebt<0?'g':M.netDebt>0?'b':'n'):'x','Debt − Cash')+
      RC('Debt/Equity',    M.deRatio!==null?fP(M.deRatio,2)+'×':'N/A', M.deRatio!==null?rate(M.deRatio,0.5,1.5,true):'x','&lt;0.5 conservative')+
      RC('Debt Ratio',     M.debtR!==null?fP(M.debtR,3):'N/A', M.debtR!==null?rate(M.debtR,0.3,0.6,true):'x','Debt ÷ Assets')+
      RC('Current Ratio',  M.cr!==null?fP(M.cr,2):'N/A', M.cr!==null?rate(M.cr,1.5,2.0):'x', '>2 healthy')+
      RC('Quick Ratio',    M.qr!==null?fP(M.qr,2):'N/A', M.qr!==null?rate(M.qr,1.0,1.5):'x', '>1.5 strong')+
    '</div>'+

    /* ── ANALYST VIEW ── */
    (M.tgtMean?
    '<div class="sec">Analyst Consensus</div>'+
    '<div class="tbl">'+
      TR('Price Target (Mean)', ccy+fP(M.tgtMean), M.tgtMean>M.price?'g':'b')+
      TR('Price Target (Low)',  M.tgtLow?ccy+fP(M.tgtLow):'')+
      TR('Price Target (High)', M.tgtHigh?ccy+fP(M.tgtHigh):'')+
      (M.recKey?TR('Consensus Rating', '<span style="color:'+recColor(M.recKey)+'">'+recLabel(M.recKey)+'</span>'):'')+
    '</div>':'') +

    /* ── RESEARCH LINKS ── */
    '<div class="sec">Research &amp; Deep Dive</div>'+
    '<div class="lgrid">'+
      '<a class="lb" href="https://finance.yahoo.com/quote/'+sym+'" target="_blank"><span>📊</span>Yahoo Finance</a>'+
      '<a class="lb" href="https://stockanalysis.com/stocks/'+bb+'/" target="_blank"><span>📋</span>StockAnalysis</a>'+
      '<a class="lb" href="https://www.macrotrends.net/stocks/charts/'+bb+'/revenue" target="_blank"><span>📈</span>Macrotrends 10Y</a>'+
      '<a class="lb" href="https://www.morningstar.com/search?query='+sym+'" target="_blank"><span>⭐</span>Morningstar</a>'+
      (isSGX?'<a class="lb" href="https://www.sgx.com/securities/equities/'+sym.replace('.SI','')+'" target="_blank"><span>🇸🇬</span>SGX</a>':'')+
      (isLSE?'<a class="lb" href="https://www.londonstockexchange.com/stock/'+sym.replace('.L','')+'/analysis" target="_blank"><span>🇬🇧</span>LSE</a>':'')+
      '<a class="lb" href="https://simplywall.st/stocks/search?q='+sym+'" target="_blank"><span>🔍</span>SimplyWallSt</a>'+
      '<a class="lb" href="https://www.bloomberg.com/quote/'+bb+':US" target="_blank"><span>📰</span>Bloomberg</a>'+
    '</div>'
  );
}

function recLabel(k){ return {strongbuy:'Strong Buy',buy:'Buy',hold:'Hold',underperform:'Underperform',sell:'Sell'}[k.toLowerCase()]||k; }
function recColor(k){ return k.includes('buy')?'var(--grn)':k==='sell'||k.includes('under')?'var(--red)':'var(--amb)'; }

function bindFund(){
  document.querySelectorAll('[data-s]').forEach(el=>el.addEventListener('click',()=>doSearch(el.dataset.s)));
  var btn=document.getElementById('ivc'); if(!btn) return;
  btn.addEventListener('click',()=>{
    var d=ST.data, M=d&&d.metrics;
    if(!M) return;
    var ge=parseFloat(document.getElementById('iv-g').value)||10;
    var b=parseFloat(document.getElementById('iv-b').value)||ST.settings.bondYield;
    var dr=parseFloat(document.getElementById('iv-d').value)||ST.settings.discountRate;
    var ep=parseFloat(document.getElementById('iv-e').value)||null;
    var out=document.getElementById('ivo');
    if(out) out.innerHTML=renderIV(gV(ep,ge,b),gN(ep,M.bvps),dcf(ep,ge,dr),dcfFCF(M.fcf,M.shares,ge,dr),M.price,cs(M.ccy));
  });
}

/* ══════════════════════════════════════════════════════
   10Y HISTORY PAGE
   ══════════════════════════════════════════════════════ */
function hHist(){
  var hasDat = ST.data && !ST.data.err;
  var sym = ST.sym||'';
  var metrics = [
    {v:'fcf',     l:'Free Cash Flow'},
    {v:'rev',     l:'Revenue'},
    {v:'ni',      l:'Net Profit'},
    {v:'opCF',    l:'Operating CF'},
    {v:'ebitda',  l:'EBITDA'},
    {v:'gp',      l:'Gross Profit'},
    {v:'td',      l:'Total Debt'},
    {v:'price',   l:'Stock Price (20Y)'},
  ];
  return '<div class="pg">' +
    '<div class="pills">' +
      metrics.map(m=>'<div class="pill'+(m.v===ST.hMetric?' on':'')+'" data-hm="'+m.v+'">'+m.l+'</div>').join('') +
    '</div>' +
    (ST.loading?'<div class="loader"><div class="spin"></div><div class="lp">Loading…</div></div>':
     !hasDat?'<div class="empty" style="padding:28px 0"><div class="ei">📈</div><h3>Search a ticker first</h3><p>Up to 10Y annual history.</p></div>':
     renderHistSection()) +
    (hasDat?
    '<div class="sec">Sources</div>'+
    '<div class="lgrid">'+
      '<a class="lb" href="https://finance.yahoo.com/quote/'+sym+'/history/" target="_blank"><span>📊</span>YF History</a>'+
      '<a class="lb" href="https://www.macrotrends.net/stocks/charts/'+sym.replace(/\..+/,'')+'/revenue" target="_blank"><span>📈</span>Macrotrends 10Y</a>'+
    '</div>':'') +
  '</div>';
}

function renderHistSection(){
  var d = ST.data;
  if(ST.hMetric==='price') return renderPriceChart(d);
  return renderFundTable(d);
}

function renderPriceChart(d){
  var h=d.hist; if(!h||!h.ts||!h.ts.length) return '<div class="note">⚠️ No price history.</div>';
  var cut=Date.now()/1000-20*365.25*86400;
  var rows=[];
  for(var i=0;i<h.ts.length;i++){
    if(h.ts[i]>=cut&&h.close[i]!=null) rows.push({t:h.ts[i],v:h.close[i]});
  }
  if(!rows.length) return '<div class="note">⚠️ No price data.</div>';
  var ccy=cs(h.ccy||'');
  var tblRows=rows.slice().reverse().map((r,i,arr)=>{
    var pv=arr[i+1]?arr[i+1].v:null;
    var chg=pv?(((r.v-pv)/Math.abs(pv))*100):null;
    return '<tr><td>'+new Date(r.t*1000).toLocaleDateString('en-GB',{year:'numeric',month:'short'})+'</td>'+
      '<td class="yx">'+ccy+fP(r.v,2)+'</td>'+
      '<td class="'+(chg>0?'yp':chg<0?'yn':'yx')+'">'+
      (chg!==null?(chg>0?'+':'')+chg.toFixed(1)+'%':'—')+'</td></tr>';
  }).join('');
  return '<div class="chbox">'+
    '<div class="chtitle">Stock Price (20Y) — '+d.sym+'</div>'+
    '<div id="chartWrap"><canvas id="hcanvas"></canvas></div>'+
  '</div>'+
  '<div class="ytbl"><table><thead><tr><th>Date</th><th>Price</th><th>Change</th></tr></thead><tbody>'+tblRows+'</tbody></table></div>';
}

function renderFundTable(d){
  var hy = build10YHistory(d.fund, d.metrics&&d.metrics.mktCap);
  if(!hy||!hy.years.length) return '<div class="note">⚠️ No fundamental history loaded. Fundamentals require a successful proxy connection.<br><br>Try visiting <strong>Macrotrends.net</strong> for 10–20Y history.</div>';

  var sym=d.sym, M=d.metrics, ccy=cs(M.ccy);
  var {years,byYear}=hy;

  var metricDefs = {
    fcf:   {l:'FCF (M)',    fn:v=>v.fcf,   fmt:(v,c)=>c+fN(v),   cls:v=>v>0?'yp':v<0?'yn':'yx'},
    rev:   {l:'Revenue (M)',fn:v=>v.rev,   fmt:(v,c)=>c+fN(v),   cls:()=>'yx'},
    ni:    {l:'Net Income', fn:v=>v.ni,    fmt:(v,c)=>c+fN(v),   cls:v=>v>0?'yp':v<0?'yn':'yx'},
    opCF:  {l:'Operating CF',fn:v=>v.opCF,fmt:(v,c)=>c+fN(v),   cls:v=>v>0?'yp':v<0?'yn':'yx'},
    ebitda:{l:'EBITDA',     fn:v=>v.ebitda,fmt:(v,c)=>c+fN(v),  cls:v=>v&&v>0?'yp':'yx'},
    gp:    {l:'Gross Profit',fn:v=>v.gp,  fmt:(v,c)=>c+fN(v),   cls:()=>'yx'},
    td:    {l:'Total Debt', fn:v=>v.td,   fmt:(v,c)=>c+fN(v),   cls:v=>v&&v>0?'yn':'yx'},
  };

  var mList = ['fcf','rev','ni','opCF','ebitda','gp','td'].filter(k=>metricDefs[k]);

  /* Build header row */
  var hdr='<tr><th>Metric</th>'+years.map(yr=>'<th>'+yr+'</th>').join('')+'</tr>';

  /* Build data rows */
  var dataRows=mList.map(k=>{
    var def=metricDefs[k];
    var cells=years.map(yr=>{
      var row=byYear[yr]||{};
      var v=def.fn(row);
      if(v===null||v===undefined) return '<td class="yx">—</td>';
      return '<td class="'+def.cls(v)+'">'+def.fmt(v,ccy)+'</td>';
    }).join('');
    return '<tr><td>'+def.l+'</td>'+cells+'</tr>';
  }).join('');

  /* FCF Margin row (if both fcf and rev available) */
  var marginRow=years.map(yr=>{
    var row=byYear[yr]||{};
    if(row.fcf!=null&&row.rev!=null&&row.rev>0){
      var m=(row.fcf/row.rev*100);
      return '<td class="'+(m>0?'yp':m<0?'yn':'yx')+'">'+m.toFixed(1)+'%</td>';
    }
    return '<td class="yx">—</td>';
  }).join('');

  /* Revenue growth row */
  var revGrowthRow='';
  if(years.length>1){
    revGrowthRow='<tr><td>Rev Growth</td>'+years.map((yr,i)=>{
      var cur=byYear[yr]&&byYear[yr].rev;
      var prev=byYear[years[i+1]]&&byYear[years[i+1]].rev;
      if(cur&&prev&&prev>0){
        var g=((cur-prev)/Math.abs(prev)*100);
        return '<td class="'+(g>0?'yp':g<0?'yn':'yx')+'">'+(g>0?'+':'')+g.toFixed(1)+'%</td>';
      }
      return '<td class="yx">—</td>';
    }).join('')+'</tr>';
  }

  return '<div class="note grn">✓ Showing '+years.length+' years of annual data from Yahoo Finance audited reports.</div>'+
    '<div class="ytbl"><table><thead>'+hdr+'</thead><tbody>'+
      dataRows+
      '<tr><td>FCF Margin</td>'+marginRow+'</tr>'+
      revGrowthRow+
    '</tbody></table></div>';
}

function bindHist(){
  document.querySelectorAll('[data-hm]').forEach(p=>p.addEventListener('click',()=>{
    ST.hMetric=p.dataset.hm;
    document.querySelectorAll('[data-hm]').forEach(x=>x.classList.toggle('on',x===p));
    var pg=document.querySelector('#main .pg'); if(!pg){paint();return;}
    var pills=pg.querySelector('.pills');
    /* Re-render content after pills */
    while(pills&&pills.nextSibling) pg.removeChild(pills.nextSibling);
    var tmp=document.createElement('div');
    tmp.innerHTML=renderHistSection()+
      '<div class="sec">Sources</div><div class="lgrid">'+
        '<a class="lb" href="https://finance.yahoo.com/quote/'+ST.sym+'/history/" target="_blank"><span>📊</span>YF History</a>'+
        '<a class="lb" href="https://www.macrotrends.net/stocks/charts/'+ST.sym.replace(/\..+/,'')+'/revenue" target="_blank"><span>📈</span>Macrotrends 10Y</a>'+
      '</div>';
    while(tmp.firstChild) pg.appendChild(tmp.firstChild);
    if(ST.hMetric==='price') setTimeout(drawPriceChart,60);
  }));
  if(ST.hMetric==='price') setTimeout(drawPriceChart,80);
}

/* Chart.js price chart */
async function drawPriceChart(){
  var canvas=document.getElementById('hcanvas'); if(!canvas||!ST.data) return;
  try{
    await new Promise((res,rej)=>{
      if(window.Chart){res();return;}
      var s=document.createElement('script');
      s.src='https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
      s.onload=res; s.onerror=()=>rej(new Error('Chart.js failed'));
      document.head.appendChild(s);
    });
  }catch(e){
    var w=document.getElementById('chartWrap');
    if(w) w.innerHTML='<div style="padding:22px;text-align:center;color:var(--mut);font-size:12px">Chart unavailable — see table below.</div>';
    return;
  }
  if(ST.chart){try{ST.chart.destroy();}catch(e){} ST.chart=null;}
  var h=ST.data.hist; if(!h||!h.ts||!h.ts.length) return;
  var cut=Date.now()/1000-20*365.25*86400;
  var labels=[],values=[];
  for(var i=0;i<h.ts.length;i++){
    if(h.ts[i]>=cut&&h.close[i]!=null){
      labels.push(new Date(h.ts[i]*1000).toLocaleDateString('en-GB',{year:'numeric',month:'short'}));
      values.push(h.close[i]);
    }
  }
  if(!values.length) return;
  var lv=values[values.length-1],fv=values[0];
  var lineC=lv>=fv?'#1dc96d':'#e85252';
  var ctx=canvas.getContext('2d');
  var grad=ctx.createLinearGradient(0,0,0,200);
  grad.addColorStop(0,lv>=fv?'rgba(29,201,109,.15)':'rgba(232,82,82,.15)');
  grad.addColorStop(1,'rgba(0,0,0,0)');
  ST.chart=new window.Chart(ctx,{
    type:'line',
    data:{labels,datasets:[{label:'Price',data:values,
      borderColor:lineC,backgroundColor:grad,borderWidth:1.5,
      pointRadius:0,pointHoverRadius:4,fill:true,tension:.3}]},
    options:{responsive:true,maintainAspectRatio:false,
      interaction:{mode:'index',intersect:false},
      plugins:{legend:{display:false},
        tooltip:{backgroundColor:'#142030',titleColor:'#7a96b5',bodyColor:'#dce8f5',
          borderColor:'#1a2d44',borderWidth:1,padding:11,
          callbacks:{label:c=>' '+cs(h.ccy||'')+fP(c.raw,2)}}},
      scales:{
        x:{grid:{color:'rgba(26,45,68,.35)',drawTicks:false},ticks:{color:'#364d66',font:{size:10},maxTicksLimit:8},border:{color:'#1a2d44'}},
        y:{grid:{color:'rgba(26,45,68,.35)',drawTicks:false},ticks:{color:'#364d66',font:{family:'SF Mono,Menlo,monospace',size:10},callback:v=>cs(h.ccy||'')+fN(v,0),maxTicksLimit:6},border:{color:'#1a2d44'}}
      }
    }
  });
}

/* ══════════════════════════════════════════════════════
   SETTINGS PAGE
   ══════════════════════════════════════════════════════ */
function hSett(){
  var pn=n=>n>=0&&n<PX.length?PX[n].n:'auto';
  return '<div class="pg">' +
  '<div class="sec">Connection Status</div>'+
  '<div class="tbl">'+
    TR('Chart Proxy', pn(ST.pxChart))+
    TR('Fundamentals Proxy', pn(ST.pxFund))+
    TR('Proxies Available', PX.length+' options')+
  '</div>'+
  '<div class="sec">Calculation Parameters</div>'+
  '<div class="srow2"><div><div class="sl2">Bond Yield % (AAA)</div><div class="sdesc">Graham Formula denominator — default 4.4%</div></div>'+
    '<input class="snum" id="s-b" type="number" value="'+ST.settings.bondYield+'" min="0" max="20" step="0.1"></div>'+
  '<div class="srow2"><div><div class="sl2">DCF Discount Rate %</div><div class="sdesc">Required annual return — default 10%</div></div>'+
    '<input class="snum" id="s-d" type="number" value="'+ST.settings.discountRate+'" min="5" max="30" step="0.5"></div>'+
  '<button class="sbtn" id="ssave">Save Settings</button>'+
  '<div class="sec">Data Architecture</div>'+
  '<div class="infobox">'+
    '<strong>Tier 1 — v8/chart (direct, no auth needed):</strong><br>'+
    'Price · Change · 52W · Volume · Market Cap · P/E · EPS · P/B · Beta · Div Yield · Book Value · 20Y price history<br><br>'+
    '<strong>Tier 2 — v11/quoteSummary (4 small batches via proxy):</strong><br>'+
    '<code>financialData</code> → ROE, ROA, margins, FCF, OpCF, debt ratios, cash, analyst targets<br>'+
    '<code>defaultKeyStatistics + summaryDetail</code> → PEG, shares, fwdPE, AUM, payout ratio<br>'+
    '<code>cashflowStatements (annual + quarterly)</code> → FCF = OpCF + CapEx (CapEx stored negative in YF)<br>'+
    '<code>incomeStatements + balanceSheets + earningsTrend</code> → 10Y revenue, profit, debt history<br><br>'+
    '<strong>Tier 3 — Calculated:</strong><br>'+
    'FCF/Share · Net Debt · Debt Ratio · EV/EBITDA · EV/Rev · FCF Yield · Rev Growth<br>'+
    'Graham V · Graham# · DCF(EPS) · DCF(FCF/sh) · Margin of Safety<br><br>'+
    '<strong>Proxy failover: </strong>'+PX.map(p=>p.n).join(' → ')+
  '</div>'+
  '<div class="sec">Deploy to GitHub Pages</div>'+
  '<div class="infobox">'+
    '1. Upload <code>index.html</code>, <code>manifest.json</code>, <code>sw.js</code><br>'+
    '2. Settings → Pages → Source: <code>main</code> branch → Save<br>'+
    '3. iPhone Safari → Share → <strong>Add to Home Screen</strong>'+
  '</div>'+
  '</div>';
}
function bindSett(){
  document.getElementById('ssave')&&document.getElementById('ssave').addEventListener('click',()=>{
    ST.settings.bondYield=parseFloat(document.getElementById('s-b').value)||4.4;
    ST.settings.discountRate=parseFloat(document.getElementById('s-d').value)||10;
    saveState(); toast('Settings saved ✓');
  });
}

/* ══════════════════════════════════════════════════════
   RENDER ENGINE
   ══════════════════════════════════════════════════════ */
function setBadge(t,c){ var el=document.getElementById('badge'); if(el){el.textContent=t;el.className=c;} }
function setStep(s){ ST.step=s; var el=document.getElementById('lstep'); if(el)el.textContent=s; }
function setProgress(p){ ST.loadPct=p; var el=document.getElementById('lbar'); if(el)el.style.width=p+'%'; }

function paint(){
  try{
    if(ST.chart){try{ST.chart.destroy();}catch(e){} ST.chart=null;}
    var el=document.getElementById('main'); if(!el) return;
    if(ST.page==='fund'){el.innerHTML=hFund();bindFund();}
    else if(ST.page==='hist'){el.innerHTML=hHist();bindHist();}
    else if(ST.page==='sett'){el.innerHTML=hSett();bindSett();}
  }catch(err){
    var m=document.getElementById('main');
    if(m) m.innerHTML='<div class="pg"><div class="errbox"><h3>Render Error</h3><p>'+err.message+'</p></div></div>';
  }
}
function goPage(p){ ST.page=p; document.querySelectorAll('.nb').forEach(b=>b.classList.toggle('on',b.dataset.p===p)); paint(); }

/* ══════════════════════════════════════════════════════
   AUTOCOMPLETE
   ══════════════════════════════════════════════════════ */
function hideSugg(){ var s=document.getElementById('sugg'); if(s) s.style.display='none'; }
async function showSugg(raw){
  var sugg=document.getElementById('sugg'); if(!sugg||!raw) return;
  try{
    var results=await searchYF(raw);
    if(!results.length){hideSugg();return;}
    sugg.style.display='block';
    sugg.innerHTML='<div class="sh">Suggestions</div>'+
      results.slice(0,7).map(r=>
        '<div class="si2" data-s="'+r.symbol+'">'+
          '<div><div class="ss2">'+r.symbol+'</div>'+
               '<div class="sn2">'+(r.shortname||r.longname||'')+'</div></div>'+
          '<div class="sr4">'+exchangeName(r.exchDisp||r.exchange,r.symbol)+'<br>'+(r.quoteType||'')+'</div>'+
        '</div>'
      ).join('');
    sugg.querySelectorAll('.si2').forEach(item=>{
      var go=()=>doSearch(item.dataset.s);
      item.addEventListener('mousedown',go);
      item.addEventListener('touchstart',e=>{e.preventDefault();go();},{passive:false});
    });
  }catch(e){hideSugg();}
}

/* ══════════════════════════════════════════════════════
   MAIN SEARCH FLOW
   ══════════════════════════════════════════════════════ */
async function doSearch(raw){
  if(!raw||!raw.trim()) return;
  var sym = raw.trim().toUpperCase();
  var inp = document.getElementById('si');
  if(inp) inp.value=sym;
  hideSugg();

  ST.sym=sym; ST.data=null; ST.loading=true; ST.loadPct=0; ST.step=''; paint();

  try{
    /* ── Step 1: Get live price from chart ── */
    setStep('Fetching live price…'); setProgress(10);
    var chartRes = await getChart(sym, '1d', '1m');

    /* ── Step 2: Resolve via search if direct failed ── */
    if(!chartRes){
      setStep('Resolving ticker…'); setProgress(20);
      var sr = await searchYF(sym);
      if(sr&&sr.length){
        var resolved=sr[0].symbol;
        chartRes = await getChart(resolved,'1d','1m');
        if(chartRes) sym=resolved;
      }
    }

    if(!chartRes){
      var sugg=await searchYF(raw.trim());
      ST.data={err:true, sym:raw.trim().toUpperCase(), sugg};
      ST.loading=false; paint(); return;
    }

    /* Canonical symbol */
    sym = (chartRes.meta&&chartRes.meta.symbol)||sym;
    ST.sym=sym; if(inp) inp.value=sym;
    setBadge('Loading…','chk');

    /* ── Step 3: Price history + fundamentals (concurrent) ── */
    setStep('Fetching 20Y history + fundamentals…'); setProgress(30);
    var [histResult, fundResult] = await Promise.allSettled([
      getChart(sym, '20y', '1mo'),
      getAllFundamentals(sym),
    ]);

    var hist=null;
    if(histResult.status==='fulfilled'&&histResult.value){
      var hv=histResult.value;
      hist={
        ts:    hv.timestamp||[],
        close: (hv.indicators&&hv.indicators.quote&&hv.indicators.quote[0]&&hv.indicators.quote[0].close)||[],
        ccy:   (hv.meta&&hv.meta.currency)||''
      };
    }
    var fund = fundResult.status==='fulfilled' ? fundResult.value : null;

    /* ── Step 4: Extract all metrics ── */
    setStep('Processing data…'); setProgress(90);
    var metrics = extractMetrics(chartRes.meta, fund);

    ST.data={sym, meta:chartRes.meta, fund, hist, metrics, ts:Math.floor(Date.now()/1000)};
    saveState();

  }catch(err){
    ST.data={err:true, sym, sugg:[], msg:err.message};
  }

  ST.loading=false; ST.step=''; setProgress(100); paint();
  if(ST.page==='hist'&&ST.hMetric==='price') setTimeout(drawPriceChart,90);
}

function toast(msg){
  var t=document.getElementById('toast'); if(!t) return;
  t.textContent=msg; t.classList.add('show');
  clearTimeout(toast._t);
  toast._t=setTimeout(()=>t.classList.remove('show'),2800);
}

/* ══════════════════════════════════════════════════════
   INIT
   ══════════════════════════════════════════════════════ */
window.addEventListener('load',()=>{
  try{
    loadState();

    /* Online indicator */
    function updDot(){ var b=document.getElementById('dot'); if(b) b.classList.toggle('off',!navigator.onLine); }
    updDot();
    window.addEventListener('online', updDot);
    window.addEventListener('offline', updDot);

    /* Navigation */
    document.querySelectorAll('.nb').forEach(b=>b.addEventListener('click',()=>goPage(b.dataset.p)));

    /* Search */
    var inp=document.getElementById('si'), btn=document.getElementById('sg');
    btn&&btn.addEventListener('click',()=>{hideSugg();doSearch(inp.value);});
    inp&&inp.addEventListener('keydown',e=>{if(e.key==='Enter'){hideSugg();doSearch(inp.value);}});
    inp&&inp.addEventListener('blur',()=>setTimeout(hideSugg,200));
    var dbt=null;
    inp&&inp.addEventListener('input',()=>{
      clearTimeout(dbt);
      var v=inp.value.trim();
      if(v.length<1){hideSugg();return;}
      dbt=setTimeout(()=>showSugg(v),320);
    });

    /* Service worker */
    if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(()=>{});

    paint();

    /* Background connection check */
    setTimeout(async()=>{
      setBadge('Checking…','chk');
      try{
        var r=await getChart('AAPL','1d','1d');
        setBadge(r&&r.meta&&r.meta.regularMarketPrice?'✓ Live':'? Check',
                 r&&r.meta?'ok':'chk');
      }catch(e){ setBadge('✗ Offline','bad'); }
    },1200);

  }catch(e){
    var m=document.getElementById('main');
    if(m) m.innerHTML='<div class="pg"><div class="errbox"><h3>Startup Error</h3><p>'+e.message+'</p></div></div>';
  }
});
</script>
</body>
</html>
