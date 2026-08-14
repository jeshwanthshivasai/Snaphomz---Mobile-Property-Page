import React from 'react';

export function HeroGallery({
  photo,
  heroHeight = 372,
  priceLabel,
  priceChanged,
  pending,
  onGalleryScroll,
  onOpenViewer,
  netEffect = "$125,000 under market"
}) {
  const slides = [
    { src: 'img/kitchen-hero.png', label: 'Kitchen & Island' },
    { src: 'img/exterior.png', label: 'Front Exterior' },
    { src: 'img/kitchen.png', label: 'Kitchen Angle 2' },
    { src: null, label: 'Living Room' },
    { src: null, label: 'Master Bedroom' },
    { src: null, label: 'Backyard & Patio' }
  ];

  const heroWrapStyle = {
    position: 'relative',
    height: heroHeight,
    background: 'var(--color-neutral-300)'
  };

  const statusStyle = {
    fontSize: '12.5px',
    padding: '5px 11px',
    borderRadius: 999,
    fontWeight: 600,
    letterSpacing: '.02em',
    background: pending ? 'var(--color-accent-2-200)' : 'rgba(var(--brand-rgb),.09)',
    color: pending ? 'var(--color-accent-2-800)' : 'var(--brand)'
  };

  return (
    <div style={heroWrapStyle}>
      {/* Scroll Snap Carousel */}
      <div
        className="nsb"
        onScroll={onGalleryScroll}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          height: heroHeight
        }}
      >
        {slides.map((s, index) => (
          <div
            key={index}
            onClick={onOpenViewer}
            style={{
              flex: 'none',
              width: 390,
              height: heroHeight,
              scrollSnapAlign: 'start',
              position: 'relative',
              cursor: 'pointer',
              background: s.src ? `url('${s.src}') center/cover` : 'var(--color-neutral-300)'
            }}
          >
            {!s.src && (
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 7,
                background: 'var(--color-neutral-300)',
                backgroundImage: 'radial-gradient(circle,rgba(var(--ink),.11) 30%,transparent 32%)',
                backgroundSize: '5px 5px'
              }}>
                <i class="ph-duotone ph-image" style={{ fontSize: 28, color: 'rgba(var(--ink),.35)' }}></i>
                <div style={{ fontSize: 13, color: 'var(--color-neutral-800)' }}>{s.label}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 122,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none'
      }}>
        <div style={{
          display: 'flex',
          gap: 6,
          alignItems: 'center',
          padding: '7px 12px',
          borderRadius: 999,
          background: 'rgba(var(--ink),.32)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          boxShadow: 'inset 0 .5px 0 rgba(255,255,255,.28)'
        }}>
          {[0, 1, 2, 3, 4, 5].map(i => (
            <span
              key={i}
              style={{
                width: i === photo ? 16 : 5,
                height: 5,
                borderRadius: 999,
                background: `rgba(255,255,255,${i === photo ? 0.95 : 0.5})`,
                transition: 'width .2s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Photo Counter Pill */}
      <button
        onClick={onOpenViewer}
        style={{
          position: 'absolute',
          right: 14,
          bottom: 112,
          minHeight: 34,
          padding: '0 13px',
          borderRadius: 999,
          border: 'none',
          background: 'rgba(var(--ink),.32)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          boxShadow: 'inset 0 .5px 0 rgba(255,255,255,.28)',
          color: '#ffffff',
          fontSize: 13.5,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontFeatureSettings: "'tnum'"
        }}
      >
        <i class="ph-duotone ph-squares-four"></i>
        {photo + 1} / 48
      </button>

      {/* Floating Liquid Glass Price Card */}
      <div style={{
        position: 'absolute',
        left: 10,
        right: 10,
        bottom: 10,
        padding: '12px 15px 13px',
        borderRadius: 20,
        background: 'rgba(var(--paper),.74)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        boxShadow: 'inset 0 .5px 0 rgba(255,255,255,.9),inset 0 -.5px 0 rgba(var(--ink),.06),0 12px 34px rgba(var(--ink),.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
          <span style={statusStyle}>{pending ? 'Sale pending' : 'For sale'}</span>
          <span style={{ fontSize: 12.5, color: 'rgba(var(--ink),.55)' }}>7 days on Snaphomz</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <h1 style={{ fontSize: 34, lineHeight: 1, fontWeight: 600, letterSpacing: '-.035em', margin: 0, color: 'var(--color-text)' }}>
              {priceLabel}
            </h1>
            {priceChanged && (
              <span style={{ fontSize: 14, color: 'rgba(var(--ink),.42)', textDecoration: 'line-through' }}>
                $1,588,000
              </span>
            )}
          </div>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--brand)', textAlign: 'right', maxWidth: '100%', wordBreak: 'break-word' }}>
            {netEffect} in your favour
          </span>
        </div>

      </div>
    </div>
  );
}
