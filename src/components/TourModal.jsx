import React, { useState } from 'react';

export function TourModal({
  isOpen,
  onClose,
  onTourDone
}) {
  const [step, setStep] = useState(0);
  const [tourType, setTourType] = useState('In person');
  const [tourDate, setTourDate] = useState('Sat 8/15');
  const [tourTime, setTourTime] = useState('10:00 AM');
  const [err, setErr] = useState('');

  if (!isOpen) return null;

  const dates = [
    ['Wed', '12'], ['Thu', '13'], ['Fri', '14'], ['Sat', '15'],
    ['Sun', '16'], ['Mon', '17'], ['Tue', '18'], ['Wed', '19']
  ];

  const times = [
    '9:00 AM', '10:00 AM', '11:30 AM',
    '1:00 PM', '3:00 PM', '5:00 PM'
  ];

  const titles = [
    'How do you want to see it?',
    'Pick a day',
    'Pick a time',
    'Confirm your request'
  ];

  const tourTypes = [
    { label: 'In person', sub: 'An agent meets you at the house', icon: 'ph-duotone ph-house' },
    { label: 'Video tour', sub: 'An agent walks it on a call', icon: 'ph-duotone ph-video-camera' },
    { label: 'Open house Sat 8/15', sub: 'Just turn up · 7–10 PM', icon: 'ph-duotone ph-door-open' }
  ];

  const optStyle = active => ({
    width: '100%',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '16px 18px',
    borderRadius: 18,
    cursor: 'pointer',
    fontFamily: 'inherit',
    border: '1.5px solid ' + (active ? 'var(--brand)' : 'transparent'),
    background: active ? 'rgba(var(--brand-rgb),.09)' : 'rgba(var(--ink),.05)',
    color: 'var(--color-text)'
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onTourDone();
      onClose();
    }
  };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 9, background: 'rgba(var(--ink),.32)', display: 'flex', alignItems: 'flex-end', animation: 'fadeIn .2s ease' }}>
      <div style={{ width: '100%', background: 'var(--color-bg)', borderRadius: '38px 38px 0 0', maxHeight: '88%', display: 'flex', flexDirection: 'column', boxShadow: '0 -12px 40px rgba(var(--ink),.22)', animation: 'sheetUp .34s cubic-bezier(.32,.72,0,1)' }}>
        {/* Header */}
        <div style={{ flex: 'none', padding: '8px 16px 12px', background: 'rgba(var(--paper),.72)', backdropFilter: 'blur(28px) saturate(180%)', WebkitBackdropFilter: 'blur(28px) saturate(180%)', boxShadow: 'inset 0 -.5px 0 rgba(var(--ink),.12)', borderRadius: '38px 38px 0 0' }}>
          <div style={{ width: 36, height: 5, borderRadius: 999, background: 'rgba(var(--ink),.18)', margin: '0 auto 10px' }}></div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-.026em', lineHeight: 1.2 }}>{titles[step]}</div>
              <div style={{ fontSize: 13, color: 'var(--color-neutral-700)', marginTop: 1, fontFeatureSettings: "'tnum'" }}>Step {step + 1} of 4</div>
            </div>
            <button onClick={onClose} aria-label="Close" style={{ width: 44, height: 44, flex: 'none', marginTop: -4, borderRadius: '50%', border: 'none', background: 'rgba(var(--ink),.07)', color: 'rgba(var(--ink),.55)', fontSize: 17, cursor: 'pointer' }}>
              <i class="ph-duotone ph-x"></i>
            </button>
          </div>
        </div>

        {/* Step Contents */}
        <div className="nsb" style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          {step === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {tourTypes.map(t => (
                <button key={t.label} onClick={() => { setTourType(t.label); setErr(''); }} style={optStyle(tourType === t.label)}>
                  <i class={t.icon} style={{ fontSize: 24, color: 'var(--brand)' }}></i>
                  <span style={{ flex: 1 }}>
                    <span style={{ display: 'block', fontSize: 17, fontWeight: 600 }}>{t.label}</span>
                    <span style={{ display: 'block', fontSize: 14, color: 'var(--color-neutral-700)', lineHeight: 1.35, marginTop: 1 }}>{t.sub}</span>
                  </span>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 9 }}>
                {dates.map(([dow, day]) => {
                  const dateStr = `${dow} 8/${day}`;
                  const isDisabled = day === '12' || day === '18';
                  return (
                    <button
                      key={day}
                      onClick={() => {
                        if (isDisabled) {
                          setErr(`The seller is not showing on the ${day}th.`);
                        } else {
                          setTourDate(dateStr);
                          setErr('');
                        }
                      }}
                      style={{
                        minHeight: 58,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        borderRadius: 14,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        border: '1.5px solid ' + (tourDate === dateStr ? 'var(--brand)' : 'transparent'),
                        background: tourDate === dateStr ? 'rgba(var(--brand-rgb),.09)' : 'rgba(var(--ink),.05)',
                        opacity: isDisabled ? 0.35 : 1
                      }}
                    >
                      <span style={{ fontSize: 12, color: 'var(--color-neutral-700)' }}>{dow}</span>
                      <span style={{ fontSize: 19, fontWeight: 600, fontFeatureSettings: "'tnum'" }}>{day}</span>
                    </button>
                  );
                })}
              </div>
              <div style={{ fontSize: 14, color: 'var(--color-neutral-700)', marginTop: 13, lineHeight: 1.5 }}>
                Dimmed days are outside the seller's showing window. The open house on Sat 8/15 needs no appointment.
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 9 }}>
                {times.map(t => (
                  <button
                    key={t}
                    onClick={() => { setTourTime(t); setErr(''); }}
                    style={{
                      minHeight: 48,
                      borderRadius: 14,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      fontSize: 15.5,
                      border: '1.5px solid ' + (tourTime === t ? 'var(--brand)' : 'transparent'),
                      background: tourTime === t ? 'rgba(var(--brand-rgb),.09)' : 'rgba(var(--ink),.05)',
                      color: 'var(--color-text)'
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 14, color: 'var(--color-neutral-700)', marginTop: 13, lineHeight: 1.5 }}>
                Times refresh every 30 seconds. Booking one holds it for 10 minutes.
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-neutral-700)' }}>You're requesting</div>
              <div style={{ fontSize: 22, fontWeight: 600, marginTop: 7, lineHeight: 1.25, letterSpacing: '-.026em' }}>
                {tourType} · {tourDate} {tourTime}
              </div>
              <div style={{ fontSize: 16, color: 'rgba(var(--ink),.6)', marginTop: 4 }}>5308 Gatewood Ln, San Jose</div>
              <p style={{ fontSize: 16, lineHeight: 1.55, color: 'rgba(var(--ink),.75)', margin: '16px 0 0', paddingTop: 16, borderTop: '1px solid rgba(var(--ink),.1)', textWrap: 'pretty' }}>
                A Snaphomz agent confirms within two hours. Nothing is booked until they do — you will get a text either way, and cancelling costs nothing.
              </p>
            </>
          )}

          {err && (
            <div style={{ marginTop: 14, paddingLeft: 13, borderLeft: '2px solid var(--color-accent-2-700)', fontSize: 15, lineHeight: 1.45, color: 'var(--color-accent-2-700)' }}>
              {err}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div style={{ flex: 'none', padding: '12px 16px 28px', display: 'flex', gap: 10 }}>
          {step > 0 && (
            <button onClick={() => { setStep(step - 1); setErr(''); }} style={{ minHeight: 52, padding: '0 22px', borderRadius: 26, border: 'none', background: 'rgba(var(--ink),.07)', fontSize: 17, cursor: 'pointer', color: 'var(--color-text)' }}>
              Back
            </button>
          )}
          <button onClick={handleNext} style={{ flex: 1, minHeight: 52, borderRadius: 26, border: 'none', background: 'var(--brand)', color: '#ffffff', fontSize: 17, fontWeight: 600, cursor: 'pointer' }}>
            {step === 3 ? 'Request this tour' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
