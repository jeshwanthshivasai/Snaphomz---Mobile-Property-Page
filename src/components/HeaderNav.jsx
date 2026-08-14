import React from 'react';

export function HeaderNav({
  navSolid,
  priceLabel,
  saved,
  onToggleSave,
  onOpenShare
}) {
  const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 96,
    zIndex: 5,
    display: 'flex',
    alignItems: 'center',
    padding: '48px 14px 0',
    gap: 8,
    transition: 'background .25s, box-shadow .25s',
    background: navSolid ? 'rgba(var(--paper),.88)' : 'transparent',
    backdropFilter: navSolid ? 'blur(20px) saturate(180%)' : 'none',
    WebkitBackdropFilter: navSolid ? 'blur(20px) saturate(180%)' : 'none',
    boxShadow: navSolid ? 'inset 0 -.5px 0 rgba(var(--ink),.12)' : 'none'
  };

  const navBtnStyle = {
    width: 42,
    height: 42,
    flex: 'none',
    borderRadius: '50%',
    border: navSolid ? 'none' : '1px solid rgba(255,255,255,.22)',
    cursor: 'pointer',
    fontSize: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all .25s ease',
    color: navSolid ? 'var(--color-text)' : '#ffffff',
    background: navSolid ? 'transparent' : 'rgba(0,0,0,.48)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    boxShadow: navSolid ? 'none' : '0 4px 14px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.28)'
  };

  const saveBtnStyle = {
    ...navBtnStyle,
    color: saved ? '#ff458e' : navSolid ? 'var(--color-text)' : '#ffffff'
  };


  return (
    <div style={navStyle}>
      <button aria-label="Back" style={navBtnStyle} onClick={() => {}}>
        <i class="ph-duotone ph-caret-left"></i>
      </button>

      <div style={{ flex: 1, textAlign: 'center', minWidth: 0, padding: '0 4px' }}>
        {navSolid && (
          <div style={{ animation: 'fadeIn .2s ease' }}>
            <div style={{ fontSize: 17, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              5308 Gatewood Ln
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-neutral-700)', fontFeatureSettings: "'tnum'" }}>
              {priceLabel}
            </div>
          </div>
        )}
      </div>

      <button onClick={onOpenShare} aria-label="Share" style={navBtnStyle}>
        <i class="ph-duotone ph-share-network"></i>
      </button>

      <button onClick={onToggleSave} aria-label="Save" style={saveBtnStyle}>
        <i class={saved ? 'ph-duotone ph-heart-straight-fill' : 'ph-duotone ph-heart-straight'}></i>
      </button>
    </div>
  );
}
