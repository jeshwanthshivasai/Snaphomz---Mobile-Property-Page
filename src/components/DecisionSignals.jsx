import React from 'react';

export function DecisionSignals({
  signal,
  onSignalScroll,
  monthlyLabel,
  costRows,
  nearby,
  sourceLines = true,
  onOpenForecast,
  onOpenNeighborhood
}) {
  const signalBarStyle = {
    height: 5,
    borderRadius: 999,
    background: 'var(--brand)',
    width: '20%',
    marginLeft: `${signal * 20}%`,
    transition: 'margin-left .28s cubic-bezier(.32,.72,0,1)'
  };

  return (
    <div
      className="liquid-glass"
      style={{
        margin: '9px 10px 0',
        padding: '19px 0',
        borderRadius: 20
      }}
    >

      {/* Section Header & Progress Bar */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0 16px 14px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, letterSpacing: '-.026em' }}>Decision signals</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 66, height: 5, borderRadius: 999, background: 'var(--color-neutral-300)', overflow: 'hidden' }}>
            <div style={signalBarStyle}></div>
          </div>
          <span style={{ fontSize: 13, color: 'var(--color-neutral-700)', fontFeatureSettings: "'tnum'" }}>
            {signal + 1} of 5
          </span>
        </div>
      </div>

      {/* Horizontal Cards Carousel */}
      <div
        className="nsb"
        onScroll={onSignalScroll}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollPaddingLeft: 16,
          padding: '0 16px',
          gap: 12
        }}
      >
        {/* Card 1: Market Position */}
        <div style={{ flex: 'none', width: 282, padding: 16, background: 'var(--color-neutral-100)', borderRadius: 18, boxShadow: 'var(--shadow-sm)', scrollSnapAlign: 'start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-neutral-700)' }}>
            <i class="ph-duotone ph-tag" style={{ fontSize: 15, color: 'var(--brand)' }}></i>Market position
          </div>
          <div style={{ fontSize: 27, fontWeight: 600, color: 'var(--brand)', marginTop: 6, letterSpacing: '-.026em', fontFeatureSettings: "'tnum'" }}>
            7.3% below market
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.55, color: 'rgba(var(--ink),.75)', margin: '9px 0 0', textWrap: 'pretty' }}>
            The seller is asking $125,000 less than what similar homes in this area are currently worth, a significant discount that puts you in a strong position as a buyer. The home is a week old and already priced below value, so move quickly — you should not need to stretch to negotiate.
          </p>
          <button style={{
            marginTop: 14,
            width: '100%',
            minHeight: 52,
            borderRadius: 14,
            border: 'none',
            background: 'rgba(var(--brand-rgb),.06)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '11px 12px',
            cursor: 'pointer',
            textAlign: 'left',
            color: 'var(--color-text)'
          }}>
            <i class="ph-duotone ph-gauge" style={{ flex: 'none', fontSize: 21, color: 'var(--brand)' }}></i>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 15, fontWeight: 600, lineHeight: 1.25, letterSpacing: '-.005em', color: 'var(--color-text)' }}>Is your offer strong?</span>
              <span style={{ display: 'block', fontSize: 13, lineHeight: 1.35, marginTop: 2, color: 'var(--color-neutral-700)' }}>Score it before you submit</span>
            </span>
            <i class="ph-duotone ph-caret-right" style={{ flex: 'none', fontSize: 15, color: 'var(--color-neutral-700)' }}></i>
          </button>

          {sourceLines && (
            <div style={{ fontSize: 12.5, color: 'var(--color-neutral-700)', marginTop: 12 }}>
              Estimate · 8 sold comps · high confidence
            </div>
          )}
        </div>

        {/* Card 2: Total Monthly Cost */}
        <div style={{ flex: 'none', width: 282, padding: 16, background: 'var(--color-neutral-100)', borderRadius: 18, boxShadow: 'var(--shadow-sm)', scrollSnapAlign: 'start', color: 'var(--color-text)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-neutral-700)' }}>
            <i class="ph-duotone ph-wallet" style={{ fontSize: 15, color: 'var(--brand)' }}></i>Total monthly cost
          </div>
          <div style={{ fontSize: 27, fontWeight: 600, marginTop: 6, letterSpacing: '-.026em', fontFeatureSettings: "'tnum'", color: 'var(--color-text)' }}>
            {monthlyLabel}<span style={{ fontSize: 15, color: 'var(--color-neutral-700)', fontWeight: 400 }}> /mo</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--color-neutral-700)', marginTop: 3 }}>
            20% down · 30yr · 6.69% live rate
          </div>
          <div style={{ marginTop: 12 }}>
            {costRows.map((c, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, padding: '8px 0', borderTop: '1px solid rgba(var(--ink),.1)' }}>
                <span style={{ color: 'rgba(var(--ink),.65)' }}>{c.k}</span>
                <span style={{ fontFeatureSettings: "'tnum'" }}>{c.v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 600, padding: '10px 0 0', borderTop: '1px solid rgba(var(--ink),.28)' }}>
              <span>Total</span>
              <span style={{ fontFeatureSettings: "'tnum'" }}>{monthlyLabel}</span>
            </div>
          </div>
          <button onClick={onOpenForecast} style={{ marginTop: 13, background: 'none', border: 'none', padding: 0, minHeight: 44, color: 'var(--brand)', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
            Open the calculator
          </button>
        </div>

        {/* Card 3: Sold Nearby */}
        <div style={{ flex: 'none', width: 282, padding: 16, background: 'var(--color-neutral-100)', borderRadius: 18, boxShadow: 'var(--shadow-sm)', scrollSnapAlign: 'start', color: 'var(--color-text)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-neutral-700)' }}>
            <i class="ph-duotone ph-map-pin" style={{ fontSize: 15, color: 'var(--brand)' }}></i>Sold nearby
          </div>
          <div style={{ fontSize: 27, fontWeight: 600, marginTop: 6, letterSpacing: '-.026em', fontFeatureSettings: "'tnum'", color: 'var(--color-text)' }}>
            $1,139<span style={{ fontSize: 15, color: 'var(--color-neutral-700)', fontWeight: 400 }}> /sqft avg</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--color-neutral-700)', marginTop: 3 }}>
            3 comparable sales, this listing asks $1,122
          </div>
          <div style={{ marginTop: 12 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 0', borderTop: '1px solid rgba(var(--ink),.1)' }}>
              <div style={{ width: 56, height: 42, borderRadius: 6, background: 'var(--color-neutral-300)', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i class="ph-duotone ph-house" style={{ color: 'rgba(var(--ink),.35)', fontSize: 18 }}></i>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, fontFeatureSettings: "'tnum'", color: 'var(--color-text)' }}>$1,549,875</div>
                <div style={{ fontSize: 13, color: 'var(--color-neutral-700)', lineHeight: 1.3 }}>5265 Joseph Ln · 1,372 sqft</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 0', borderTop: '1px solid rgba(var(--ink),.1)' }}>
              <img src="img/sold-harvard.png" alt="5477 Harvard Drive" style={{ width: 56, height: 42, borderRadius: 6, objectFit: 'cover', flex: 'none' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, fontFeatureSettings: "'tnum'", color: 'var(--color-text)' }}>$1,599,999</div>
                <div style={{ fontSize: 13, color: 'var(--color-neutral-700)', lineHeight: 1.3 }}>5477 Harvard Dr · 1,317 sqft</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 0', borderTop: '1px solid rgba(var(--ink),.1)' }}>
              <img src="img/sold-calinoma.png" alt="1554 Calinoma Drive" style={{ width: 56, height: 42, borderRadius: 6, objectFit: 'cover', flex: 'none' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, fontFeatureSettings: "'tnum'", color: 'var(--color-text)' }}>$1,499,000</div>
                <div style={{ fontSize: 13, color: 'var(--color-neutral-700)', lineHeight: 1.3 }}>1554 Calinoma Dr · 1,400 sqft</div>
              </div>
            </div>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.5, color: 'rgba(var(--ink),.75)', margin: '12px 0 0', textWrap: 'pretty' }}>
            <em>The street supports the ask.</em> Your offer strategy can focus on terms and timing rather than fighting the price.
          </p>
        </div>

        {/* Card 4: Neighborhood */}
        <div style={{ flex: 'none', width: 282, padding: 16, background: 'var(--color-neutral-100)', borderRadius: 18, boxShadow: 'var(--shadow-sm)', scrollSnapAlign: 'start', color: 'var(--color-text)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-neutral-700)' }}>
            <i class="ph-duotone ph-person-simple-walk" style={{ fontSize: 15, color: 'var(--brand)' }}></i>Neighborhood
          </div>
          <div style={{ fontSize: 27, fontWeight: 600, color: 'var(--brand)', marginTop: 6, letterSpacing: '-.026em', fontFeatureSettings: "'tnum'" }}>
            100 · very walkable
          </div>
          <div style={{ marginTop: 12 }}>
            {nearby.map((n, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 15, padding: '9px 0', borderTop: '1px solid rgba(var(--ink),.1)' }}>
                <span style={{ display: 'flex', gap: 9, alignItems: 'center', color: 'rgba(var(--ink),.75)' }}>
                  <i class={n.icon} style={{ color: 'var(--brand)', fontSize: 17 }}></i>{n.name}
                </span>
                <span style={{ color: 'var(--color-neutral-700)', fontFeatureSettings: "'tnum'" }}>{n.dist}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 15, color: 'rgba(var(--ink),.75)', marginTop: 11, lineHeight: 1.5 }}>
            Air quality index <strong style={{ color: 'var(--brand)', fontWeight: 600 }}>87</strong>, excellent. No tree or grass pollen today.
          </div>
          <button onClick={onOpenNeighborhood} style={{ marginTop: 11, background: 'none', border: 'none', padding: 0, minHeight: 44, color: 'var(--brand)', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
            What locals say
          </button>
        </div>

        {/* Card 5: Home Value Trend */}
        <div style={{ flex: 'none', width: 282, padding: 16, background: 'var(--color-neutral-100)', borderRadius: 18, boxShadow: 'var(--shadow-sm)', scrollSnapAlign: 'start', color: 'var(--color-text)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-neutral-700)' }}>
            <i class="ph-duotone ph-trend-up" style={{ fontSize: 15, color: 'var(--brand)' }}></i>Home value trend
          </div>
          <div style={{ fontSize: 27, fontWeight: 600, marginTop: 6, letterSpacing: '-.026em', color: 'var(--color-text)' }}>
            Outpacing the metro
          </div>

          <div style={{ fontSize: 13, color: 'var(--color-neutral-700)', marginTop: 3 }}>
            Indexed 2021 to today
          </div>
          <svg viewBox="0 0 260 120" style={{ width: '100%', height: 130, marginTop: 12 }}>
            <line x1="0" y1="100" x2="260" y2="100" stroke="rgba(var(--ink),.12)"></line>
            <path d="M2 92 L40 88 L78 74 L116 58 L154 40 L192 34 L230 24 L256 18" fill="none" stroke="var(--brand)" strokeWidth="2"></path>
            <path d="M2 96 L40 93 L78 84 L116 72 L154 60 L192 56 L230 50 L256 46" fill="none" stroke="rgba(var(--ink),.4)" strokeWidth="1.5" strokeDasharray="4 3"></path>
            <path d="M2 98 L40 96 L78 92 L116 86 L154 80 L192 78 L230 74 L256 71" fill="none" stroke="rgba(var(--ink),.18)" strokeWidth="1.5"></path>
          </svg>
          <div style={{ display: 'flex', gap: 14, fontSize: 13, color: 'var(--color-neutral-700)', flexWrap: 'wrap', marginTop: 2 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 14, height: 2, background: 'var(--brand)', display: 'inline-block' }}></span>This home
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 14, height: 2, background: 'rgba(var(--ink),.4)', display: 'inline-block' }}></span>Neighborhood
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 14, height: 2, background: 'rgba(var(--ink),.18)', display: 'inline-block' }}></span>Metro
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
