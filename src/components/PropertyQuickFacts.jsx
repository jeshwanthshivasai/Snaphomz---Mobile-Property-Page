import React from 'react';

export function PropertyQuickFacts() {
  const factRows = [
    { k: 'Year built', v: '1962' },
    { k: 'Lot', v: '5,952 sqft' },
    { k: 'Price per sqft', v: '$1,122' },
    { k: 'HOA', v: '$562/mo' }
  ];

  return (
    <div
      className="liquid-glass"
      style={{
        margin: '9px 10px 0',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: 'var(--lift)',
        background: 'var(--color-bg)',
        position: 'relative'
      }}
    >
      {/* Title & Address */}
      <div style={{ padding: '17px 15px 0' }}>
        <div style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-.02em', lineHeight: 1.3 }}>
          5308 Gatewood Ln<span style={{ color: 'rgba(var(--ink),.55)' }}>, San Jose, CA 95118</span>
        </div>
        <div style={{ fontSize: 15, color: 'rgba(var(--ink),.55)', marginTop: 8, display: 'flex', alignItems: 'center', gap: 7 }}>
          <i class="ph-duotone ph-calendar-dot" style={{ fontSize: 17, color: 'var(--brand)' }}></i>
          Open house Sat 8/15, 7–10 PM
        </div>
      </div>

      {/* Bed / Bath / Sqft Grid */}
      <div style={{ padding: '15px 15px 0', display: 'flex', alignItems: 'stretch' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 24, fontWeight: 600, fontFeatureSettings: "'tnum'", lineHeight: 1.1 }}>4</div>
          <div style={{ fontSize: 13, color: 'var(--color-neutral-700)', marginTop: 2 }}>beds</div>
        </div>
        <div style={{ width: 1, background: 'rgba(var(--ink),.12)', margin: '2px 14px' }}></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 24, fontWeight: 600, fontFeatureSettings: "'tnum'", lineHeight: 1.1 }}>2</div>
          <div style={{ fontSize: 13, color: 'var(--color-neutral-700)', marginTop: 2 }}>baths</div>
        </div>
        <div style={{ width: 1, background: 'rgba(var(--ink),.12)', margin: '2px 14px' }}></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 24, fontWeight: 600, fontFeatureSettings: "'tnum'", lineHeight: 1.1 }}>1,415</div>
          <div style={{ fontSize: 13, color: 'var(--color-neutral-700)', marginTop: 2 }}>sqft</div>
        </div>
      </div>

      {/* Fact Rows */}
      <div style={{ padding: '13px 15px 15px' }}>
        {factRows.map((f, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              padding: '11px 0',
              borderTop: '1px solid rgba(var(--ink),.1)',
              fontSize: 16
            }}
          >
            <span style={{ color: 'rgba(var(--ink),.55)' }}>{f.k}</span>
            <span style={{ fontFeatureSettings: "'tnum'" }}>{f.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
