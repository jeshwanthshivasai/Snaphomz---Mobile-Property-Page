import React, { useState } from 'react';

export function SimilarHomes({
  compare,
  onToggleCompareItem,
  onToggleCompareAll,
  onFlash
}) {
  const [peek, setPeek] = useState(null);

  const similar = [
    { price: '$1,899,900', addr: '1532 Kooser Road', specs: '4 bd · 3 ba · 1,844 sqft', delta: '$311,900 more · $1,030/sqft', up: true },
    { price: '$1,550,000', addr: '5267 Woodstock Way', specs: '3 bd · 2 ba · 1,383 sqft', delta: '$38,000 less · $1,121/sqft', up: false },
    { price: '$1,349,950', addr: '1562 Kooser Road', specs: '3 bd · 2 ba · 1,211 sqft', delta: '$238,050 less · $1,115/sqft', up: false },
    { price: '$1,599,000', addr: '3288 Payne Avenue', specs: '4 bd · 2 ba · 1,502 sqft', delta: '$11,000 more · $1,064/sqft', up: true }
  ];

  const compareLabel = compare.length ? `Compare ${compare.length}` : 'Compare';

  return (
    <div
      className="liquid-glass"
      style={{
        margin: '9px 10px 0',
        padding: '19px 0',
        borderRadius: 20
      }}
    >

      {/* Header */}
      <div style={{ padding: '0 16px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, letterSpacing: '-.026em' }}>Similar homes</h2>
        <button
          onClick={() => {
            if (compare.length) {
              onFlash(`${compare.length} homes selected. Side-by-side opens next.`);
            } else {
              onFlash('Tap the cards you want to compare.');
            }
          }}
          style={{
            minHeight: 38,
            padding: '0 14px',
            borderRadius: 19,
            border: 'none',
            background: 'rgba(var(--brand-rgb),.1)',
            color: 'var(--brand)',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 7
          }}
        >
          <i class="ph-duotone ph-columns" style={{ fontSize: 16 }}></i>
          {compareLabel}
        </button>
      </div>

      <p style={{ fontSize: 16, color: 'rgba(var(--ink),.65)', margin: '0 16px 14px' }}>Tap to add to a comparison.</p>

      {/* Horizontal Cards Carousel */}
      <div className="nsb" style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '0 16px 4px', scrollSnapType: 'x mandatory', scrollPaddingLeft: 16 }}>
        {similar.map((h, i) => {
          const isSelected = compare.includes(i);
          return (
            <div
              key={i}
              onClick={() => onToggleCompareItem(i)}
              onContextMenu={e => {
                e.preventDefault();
                setPeek(h);
              }}
              style={{
                flex: 'none',
                width: 212,
                scrollSnapAlign: 'start',
                background: 'var(--color-neutral-100)',
                borderRadius: 18,
                overflow: 'hidden',
                cursor: 'pointer',
                border: isSelected ? '2px solid var(--brand)' : '2px solid transparent',
                boxShadow: '0 1px 3px rgba(var(--ink),.08)',
                color: 'var(--color-text)'
              }}
            >
              <div style={{ height: 112, background: 'rgba(var(--ink),.08)', backgroundImage: 'radial-gradient(circle,rgba(var(--ink),.12) 30%,transparent 32%)', backgroundSize: '5px 5px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <i class="ph-duotone ph-house-line" style={{ fontSize: 26, color: 'rgba(var(--ink),.32)' }}></i>
                {isSelected && (
                  <div style={{ position: 'absolute', top: 9, right: 9, width: 26, height: 26, borderRadius: '50%', background: 'var(--brand)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, boxShadow: '0 2px 8px rgba(var(--ink),.25)' }}>
                    ✓
                  </div>
                )}
              </div>
              <div style={{ padding: '12px 13px 14px' }}>
                <div style={{ fontSize: 18, fontWeight: 600, fontFeatureSettings: "'tnum'", color: 'var(--color-text)' }}>{h.price}</div>
                <div style={{ fontSize: 14, color: 'var(--color-neutral-700)', lineHeight: 1.35, marginTop: 2 }}>{h.addr}</div>
                <div style={{ fontSize: 14, color: 'rgba(var(--ink),.75)', marginTop: 7, fontFeatureSettings: "'tnum'" }}>{h.specs}</div>
                <div style={{ fontSize: 13.5, marginTop: 6, fontWeight: 600, color: h.up ? 'var(--color-accent-2-700)' : 'var(--brand)', fontFeatureSettings: "'tnum'" }}>
                  {h.delta}
                </div>
              </div>
            </div>

          );
        })}
      </div>

      {/* Peek Preview Modal */}
      {peek && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'rgba(var(--ink),.42)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 36, animation: 'fadeIn .18s ease' }} onClick={() => setPeek(null)}>
          <div style={{ width: '100%', background: 'var(--color-bg)', borderRadius: 26, overflow: 'hidden', boxShadow: '0 30px 70px rgba(0,0,0,.4)', animation: 'popIn .26s cubic-bezier(.32,1.36,.52,1)' }}>
            <div style={{ height: 150, background: 'var(--color-neutral-300)', backgroundImage: 'radial-gradient(circle,rgba(var(--ink),.1) 30%,transparent 32%)', backgroundSize: '5px 5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i class="ph-duotone ph-house-line" style={{ fontSize: 30, color: 'rgba(var(--ink),.32)' }}></i>
            </div>
            <div style={{ padding: '15px 16px 17px' }}>
              <div style={{ fontSize: 23, fontWeight: 600, letterSpacing: '-.026em' }}>{peek.price}</div>
              <div style={{ fontSize: 15, color: 'var(--color-neutral-700)', marginTop: 2 }}>{peek.addr}</div>
              <div style={{ fontSize: 15, marginTop: 9 }}>{peek.specs}</div>
              <div style={{ fontSize: 14.5, fontWeight: 600, marginTop: 5, color: peek.up ? 'var(--color-accent-2-700)' : 'var(--brand)' }}>{peek.delta}</div>
              <div style={{ display: 'flex', gap: 9, marginTop: 15 }}>
                <button
                  onClick={() => {
                    setPeek(null);
                    onFlash('Added to comparison.');
                  }}
                  style={{ flex: 1, minHeight: 46, borderRadius: 23, border: 'none', background: 'var(--brand)', color: '#ffffff', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}
                >
                  Add to compare
                </button>
                <button onClick={() => setPeek(null)} style={{ minHeight: 46, padding: '0 18px', borderRadius: 23, border: 'none', background: 'rgba(var(--ink),.07)', color: 'var(--color-text)', fontSize: 16, cursor: 'pointer' }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
