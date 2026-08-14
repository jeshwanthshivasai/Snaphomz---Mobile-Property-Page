import React from 'react';

export function HomeHighlights({
  expHighlights,
  onToggleHighlights,
  hoaYear = '$6,744',
  netEffect = '-$125,000'
}) {
  const verdicts = [
    { icon: 'ph-duotone ph-check-circle', color: 'var(--brand)', what: 'Renovated kitchen & bathrooms', money: '+$45,000', why: 'New cabinets, quartz counters, gas range and modern tile throughout.', src: '· listing' },
    { icon: 'ph-duotone ph-check-circle', color: 'var(--brand)', what: 'New roof on main structure', money: '+$22,000', why: 'Architectural shingle installed 2025. Transferable warranty included.', src: '· permits' },
    { icon: 'ph-duotone ph-warning-circle', color: 'var(--color-accent-2-700)', what: 'Original electrical panel', money: '-$8,500', why: '100A Federal Pacific box requires replacement for modern EV / solar loads.', src: '· inspection' },
    { icon: 'ph-duotone ph-check-circle', color: 'var(--brand)', what: 'Copper plumbing & newer sewer line', money: '+$18,000', why: 'Galvanized pipes replaced out to main line in 2021.', src: '· disclosures' },
    { icon: 'ph-duotone ph-check-circle', color: 'var(--brand)', what: 'Section 1 pest items cleared', money: '+$6,500', why: 'Termite and dry-rot remediation completed by licensed contractor.', src: '· pest report' }
  ];

  return (
    <div
      className="liquid-glass"
      style={{
        margin: '9px 10px 0',
        padding: '19px 15px',
        borderRadius: 20
      }}
    >

      <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 12px', letterSpacing: '-.026em' }}>Home highlights</h2>

      {/* Net Effect Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 12,
        padding: '12px 14px',
        borderRadius: 15,
        background: 'rgba(var(--brand-rgb),.07)',
        marginBottom: 4
      }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--brand)' }}>
            Net effect on your offer
          </div>
          <div style={{ fontSize: 13.5, color: 'rgba(var(--ink),.6)', lineHeight: 1.4, marginTop: 3 }}>
            One-time, before the {hoaYear} a year in dues
          </div>
        </div>
        <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-.03em', color: 'var(--brand)', whiteSpace: 'nowrap' }}>
          {netEffect}
        </div>
      </div>

      {/* Highlights List */}
      {verdicts.map((v, i) => (
        <div key={i} style={{ padding: '13px 0', borderTop: '1px solid rgba(var(--ink),.1)' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
            <i class={v.icon} style={{ fontSize: 18, flex: 'none', color: v.color }}></i>
            <div style={{ flex: 1, minWidth: 0, fontSize: 16, fontWeight: 600, lineHeight: 1.3, letterSpacing: '-.01em' }}>
              {v.what}
            </div>
            <div style={{ flex: 'none', fontSize: 15.5, fontWeight: 600, whiteSpace: 'nowrap', color: v.color }}>
              {v.money}
            </div>
          </div>
          <div style={{ margin: '4px 0 0 28px', fontSize: 14.5, color: 'rgba(var(--ink),.6)', lineHeight: 1.45, textWrap: 'pretty' }}>
            {v.why} <span style={{ color: 'rgba(var(--ink),.38)' }}>{v.src}</span>
          </div>
        </div>
      ))}

      <div style={{ padding: '12px 0 15px', borderTop: '1px solid rgba(var(--ink),.1)', fontSize: 13, color: 'var(--color-neutral-700)', lineHeight: 1.45 }}>
        Each figure is an estimate we derived from the listing, county records and eight closed comps — not a quote.
      </div>

      {/* Narrative Paragraph */}
      <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0, textWrap: 'pretty' }}>
        Welcome to 5308 Gatewood Lane, a beautifully renovated single-story home nestled in the desirable Cambrian area. With modern updates, this move-in-ready residence offers three bedrooms, two bathrooms, and a functional floor plan designed for both everyday living and entertaining. Upgrades include new windows throughout, engineered wood flooring, kitchen and laundry appliances, high-efficiency central furnace and AC, and many more.
      </p>

      {expHighlights && (
        <>
          <p style={{ fontSize: 17, lineHeight: 1.6, margin: '14px 0 0', textWrap: 'pretty' }}>
            Have peace of mind with a new roof on the main structure. Past owners installed a newer sewer line, copper plumbing, upgraded wall insulation, and built an attached structure in back that can be used as an office. 2-car garage.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.6, margin: '14px 0 0', textWrap: 'pretty' }}>
            Section 1 items in pest report cleared. There's plenty of space in front and back for outdoor relaxation, gardening, and gatherings. Gated front fence for kids or pets to roam free.
          </p>
          <div style={{ margin: '14px 0 0', paddingLeft: 13, borderLeft: '2px solid var(--color-accent-2-700)', fontSize: 15, lineHeight: 1.5, color: 'rgba(var(--ink),.7)' }}>
            The listing says three bedrooms; county records say four. We show both until the agent confirms which is right.
          </div>
        </>
      )}

      <button
        onClick={onToggleHighlights}
        style={{
          marginTop: 12,
          background: 'none',
          border: 'none',
          padding: 0,
          minHeight: 44,
          color: 'var(--brand)',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        {expHighlights ? 'Show less' : 'Read the rest'}
      </button>
    </div>
  );
}
