import React from 'react';

export function PhotoViewerModal({
  isOpen,
  onClose
}) {
  if (!isOpen) return null;

  const viewerGroups = [
    { title: 'Kitchen · 7', items: [0, 1, 2, 3] },
    { title: 'Living · 6', items: [0, 1, 2, 3] },
    { title: 'Exterior · 12', items: [0, 1, 2, 3] }
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 70, background: '#151413', display: 'flex', flexDirection: 'column', animation: 'fadeIn .2s ease' }}>
      {/* Top Bar */}
      <div style={{ flex: 'none', padding: '56px 14px 10px', display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(21,20,19,.6)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
        <button onClick={onClose} aria-label="Close" style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,.14)', color: '#ffffff', fontSize: 17, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <i class="ph-duotone ph-x"></i>
        </button>
        <div style={{ flex: 1, color: 'var(--color-bg)', fontSize: 17, fontWeight: 600 }}>
          All photos <span style={{ color: 'rgba(255,255,255,.5)', fontWeight: 400, fontFeatureSettings: "'tnum'" }}>48</span>
        </div>
        <button style={{ minHeight: 38, padding: '0 14px', borderRadius: 999, border: 'none', background: 'rgba(255,255,255,.14)', color: '#ffffff', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          <i class="ph-duotone ph-sparkle"></i>By room
        </button>
      </div>

      {/* Grid of Photos */}
      <div className="nsb" style={{ flex: 1, overflowY: 'auto', padding: '0 12px 34px' }}>
        {viewerGroups.map((g, gi) => (
          <div key={gi} style={{ marginBottom: 22 }}>
            <div style={{ position: 'sticky', top: 0, padding: '12px 2px 8px', fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,.55)', zIndex: 2, background: '#151413' }}>
              {g.title}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
              {g.items.map((p, i) => (
                <div
                  key={i}
                  style={{
                    height: 106,
                    borderRadius: 10,
                    background: gi === 0 && i === 0
                      ? "url('img/kitchen.png') center/cover"
                      : gi === 2 && i === 0
                        ? "url('img/exterior.png') center/cover"
                        : gi === 0 && i === 1
                          ? "url('img/kitchen-hero.png') center/cover"
                          : 'rgba(255,255,255,.1)'
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
