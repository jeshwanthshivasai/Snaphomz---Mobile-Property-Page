import React from 'react';

export function ToastNotification({
  message,
  actionText,
  onAction
}) {
  if (!message) return null;

  return (
    <div style={{
      position: 'absolute',
      left: 16,
      right: 16,
      bottom: 92,
      zIndex: 60,
      background: 'rgba(var(--ink),.86)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      boxShadow: 'inset 0 .5px 0 rgba(255,255,255,.2),0 8px 24px rgba(var(--ink),.2)',
      color: 'var(--color-bg)',
      padding: '13px 15px',
      borderRadius: 18,
      fontSize: 15,
      lineHeight: 1.4,
      display: 'flex',
      gap: 11,
      alignItems: 'center',
      animation: 'popIn .25s ease'
    }}>
      <i class="ph-duotone ph-info" style={{ fontSize: 19 }}></i>
      <span style={{ flex: 1 }}>{message}</span>
      {actionText && (
        <button
          onClick={onAction}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-accent-300)',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            padding: 0,
            minHeight: 44,
            whiteSpace: 'nowrap'
          }}
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
