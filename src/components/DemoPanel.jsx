import React from 'react';

export function DemoPanel({
  onPriceDrop,
  onGoPending,
  onBreakCalc,
  onAbandonRvb,
  onSaveSignedOut,
  onResetAll
}) {
  const triggers = [
    { label: 'Price changes mid-read', note: 'Drops $23,000 while the page is open. The banner names exactly what is now stale.', run: onPriceDrop },
    { label: 'Listing goes pending', note: 'Verdict, status and the toolbar action all change. Nothing dead-ends.', run: onGoPending },
    { label: 'Break the calculator', note: 'Negative price, 0% down. Opens Forecast so you can see the errors.', run: onBreakCalc },
    { label: 'Abandon Rent vs Buy', note: 'Two answers in, then out. Progress is kept and offered back.', run: onAbandonRvb },
    { label: 'Save while signed out', note: 'Account prompt with a guest escape hatch. The tap is never thrown away.', run: onSaveSignedOut },
    { label: 'Reset everything', note: 'Back to a clean first load.', run: onResetAll }
  ];

  return (
    <div style={{ width: 320, flex: 'none', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-neutral-700)' }}>
          Break it on purpose
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.5, color: 'rgba(var(--ink),.65)', margin: '8px 0 0' }}>
          Each is a real state with its own copy. Tap one, then use the phone.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {triggers.map((g, i) => (
          <button
            key={i}
            onClick={g.run}
            style={{
              textAlign: 'left',
              background: 'none',
              border: 'none',
              borderTop: '1px solid rgba(var(--ink),.12)',
              padding: '14px 0',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: 3
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text)' }}>{g.label}</span>
            <span style={{ fontSize: 13.5, lineHeight: 1.45, color: 'rgba(var(--ink),.6)' }}>{g.note}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
