import React from 'react';

export function ReportsSection({
  onOpenPre,
  onOpenSheet,
  rvbSaved
}) {
  const explore = [
    { id: 'property', label: 'Property', sub: 'Rooms, appliances, heating, flooring', icon: 'ph-duotone ph-house-line' },
    { id: 'schools', label: 'Schools', sub: 'Five schools · college readiness', icon: 'ph-duotone ph-graduation-cap' },
    { id: 'intel', label: 'Intelligence', sub: 'Heat map, owner position, sale history', icon: 'ph-duotone ph-map-trifold' },
    { id: 'forecast', label: 'Forecast', sub: 'Rate predictor · payment calculator', icon: 'ph-duotone ph-chart-line-up' },
    { id: 'rvb', label: 'Rent vs Buy', sub: rvbSaved ? `${rvbSaved} of 5 answered — resume` : 'Five questions, one verdict', icon: 'ph-duotone ph-scales' },
    { id: 'nbhd', label: 'Neighborhood', sub: 'What locals actually say', icon: 'ph-duotone ph-buildings' },
    { id: 'snaplife', label: 'SnapLife', sub: 'Simulate living here', icon: 'ph-duotone ph-compass-rose' }
  ];

  return (
    <>
      {/* Know What You Can Borrow Card */}
      <div style={{
        margin: '9px 10px 0',
        padding: '19px 15px',
        background: 'var(--color-bg)',
        borderRadius: 20,
        boxShadow: 'var(--lift)'
      }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, letterSpacing: '-.026em' }}>Know what you can borrow</h2>
        <p style={{ fontSize: 16, lineHeight: 1.5, color: 'rgba(var(--ink),.65)', margin: '6px 0 14px', textWrap: 'pretty' }}>
          Four questions, a soft check that does not touch your score, and a number you can put in front of this seller. Sellers here read a lender letter as seriousness.
        </p>
        <button
          onClick={onOpenPre}
          style={{
            minHeight: 50,
            padding: '0 22px',
            borderRadius: 25,
            border: 'none',
            background: 'var(--brand)',
            color: '#ffffff',
            fontSize: 17,
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Get pre-approved
        </button>
      </div>

      {/* Reports on this Address */}
      <div style={{
        margin: '9px 10px 0',
        padding: '19px 0',
        background: 'var(--color-bg)',
        borderRadius: 20,
        boxShadow: 'var(--lift)'
      }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 16px 4px', letterSpacing: '-.026em' }}>Reports on this address</h2>
        <p style={{ fontSize: 16, color: 'rgba(var(--ink),.65)', margin: '0 16px 14px' }}>Seven of them. Each opens full screen.</p>

        {explore.map(e => (
          <button
            key={e.id}
            onClick={() => onOpenSheet(e.id)}
            style={{
              width: '100%',
              minHeight: 60,
              display: 'flex',
              alignItems: 'center',
              gap: 13,
              padding: '12px 16px',
              background: 'none',
              border: 'none',
              borderTop: '1px solid rgba(var(--ink),.1)',
              cursor: 'pointer',
              textAlign: 'left',
              color: 'var(--color-text)'
            }}
          >
            <i class={e.icon} style={{ fontSize: 24, color: 'var(--brand)', flex: 'none' }}></i>
            <span style={{ flex: 1 }}>
              <span style={{ display: 'block', fontSize: 17, fontWeight: 600, color: 'var(--color-text)' }}>{e.label}</span>
              <span style={{ display: 'block', fontSize: 14, color: 'var(--color-neutral-700)', lineHeight: 1.35, marginTop: 1 }}>{e.sub}</span>
            </span>
            <i class="ph-duotone ph-caret-right" style={{ color: 'rgba(var(--ink),.3)', fontSize: 17 }}></i>
          </button>

        ))}
      </div>
    </>
  );
}
