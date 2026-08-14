import React, { useState } from 'react';

export function AIChatDrawer({
  isOpen,
  onClose
}) {
  const [chatLog, setChatLog] = useState([]);
  const [draft, setDraft] = useState('');

  if (!isOpen) return null;

  const quickQs = [
    'What should I offer on this home?',
    'How are the schools here, really?',
    'Would this work as a rental?'
  ];

  const ask = questionText => {
    if (!questionText.trim()) return;
    const userMsg = { t: questionText, me: true };
    setDraft('');
    setChatLog(prev => [...prev, userMsg]);

    setTimeout(() => {
      let reply = 'Snaphomz AI is analyzing live comps and district data for 5308 Gatewood Ln...';
      if (questionText.includes('offer')) {
        reply = 'Given the 8 recent sales averaging $1,139/sqft and current 7-day age, an offer at $1.55M-$1.57M is competitive while capturing strong equity upside.';
      } else if (questionText.includes('schools')) {
        reply = 'Lietz Elementary (8/10) and Dartmouth Middle (8/10) are among the strongest in Campbell Union. High school enrollment is at Beacon High.';
      } else if (questionText.includes('rental')) {
        reply = 'Estimated monthly rent for 4-bed single family homes in this pocket ranges $3,282–$3,600/mo. At current price, cap rate is ~2.5%.';
      }
      setChatLog(prev => [...prev, { t: reply, me: false }]);
    }, 600);
  };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 9, background: 'rgba(var(--ink),.32)', display: 'flex', alignItems: 'flex-end', animation: 'fadeIn .2s ease' }}>
      <div style={{ width: '100%', height: '80%', background: 'var(--color-bg)', borderRadius: '38px 38px 0 0', display: 'flex', flexDirection: 'column', boxShadow: '0 -12px 40px rgba(var(--ink),.22)', animation: 'sheetUp .34s cubic-bezier(.32,.72,0,1)' }}>
        {/* Header */}
        <div style={{ flex: 'none', padding: '8px 16px 12px', background: 'rgba(var(--paper),.72)', backdropFilter: 'blur(28px) saturate(180%)', WebkitBackdropFilter: 'blur(28px) saturate(180%)', boxShadow: 'inset 0 -.5px 0 rgba(var(--ink),.12)', borderRadius: '38px 38px 0 0' }}>
          <div style={{ width: 36, height: 5, borderRadius: 999, background: 'rgba(var(--ink),.18)', margin: '0 auto 10px' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(var(--brand-rgb),.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand)', fontSize: 19 }}>
              <i class="ph-duotone ph-sparkle"></i>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>
                Ask Snaphomz AI <span style={{ fontSize: 10, letterSpacing: '.1em', background: 'rgba(var(--brand-rgb),.1)', color: 'var(--brand)', padding: '3px 6px', borderRadius: 5, verticalAlign: 'middle' }}>BETA</span>
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--color-neutral-700)' }}>Answers about this address only</div>
            </div>
            <button onClick={onClose} aria-label="Close" style={{ width: 44, height: 44, flex: 'none', borderRadius: '50%', border: 'none', background: 'rgba(var(--ink),.07)', color: 'rgba(var(--ink),.55)', fontSize: 17, cursor: 'pointer' }}>
              <i class="ph-duotone ph-x"></i>
            </button>
          </div>
        </div>

        {/* Chat History / Quick Questions */}
        <div className="nsb" style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 11 }}>
          {chatLog.length === 0 && (
            <>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-neutral-700)' }}>Quick questions</div>
              {quickQs.map((q, i) => (
                <button
                  key={i}
                  onClick={() => ask(q)}
                  style={{ width: '100%', textAlign: 'left', background: 'rgba(var(--ink),.05)', border: 'none', borderRadius: 18, padding: '14px 16px', fontSize: 16, cursor: 'pointer', color: 'var(--color-text)', lineHeight: 1.4 }}
                >
                  {q}
                </button>
              ))}
            </>
          )}

          {chatLog.map((m, i) => (
            <div
              key={i}
              style={{
                maxWidth: '84%',
                fontSize: 16,
                lineHeight: 1.5,
                padding: '12px 15px',
                borderRadius: 20,
                alignSelf: m.me ? 'flex-end' : 'flex-start',
                background: m.me ? 'var(--brand)' : 'rgba(var(--ink),.06)',
                color: m.me ? '#ffffff' : 'var(--color-text)',
                fontFamily: m.me ? 'inherit' : 'var(--font-body)',
                fontVariantNumeric: m.me ? 'inherit' : 'proportional-nums'
              }}
            >
              {m.t}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div style={{ flex: 'none', padding: '12px 16px 28px', display: 'flex', gap: 10, alignItems: 'center', boxShadow: 'inset 0 .5px 0 rgba(var(--ink),.1)' }}>
          <input
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') ask(draft); }}
            placeholder="Ask about this home"
            style={{ flex: 1, minHeight: 48, border: 'none', borderRadius: 24, padding: '0 17px', fontSize: 17, background: 'rgba(var(--ink),.05)', color: 'var(--color-text)' }}
          />
          <button
            onClick={() => ask(draft)}
            aria-label="Send"
            style={{ width: 48, height: 48, flex: 'none', borderRadius: '50%', border: 'none', background: 'var(--brand)', color: '#ffffff', fontSize: 19, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <i class="ph-duotone ph-arrow-up"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
