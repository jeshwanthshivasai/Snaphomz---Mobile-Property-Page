import React, { useState } from 'react';

export function PreApprovalModal({
  isOpen,
  onClose,
  onFlash,
  priceLabel = '$1,588,000'
}) {
  const [step, setStep] = useState(0);
  const [pre, setPre] = useState({
    employment: 'W2 employee',
    income: '240,000',
    debts: '850',
    credit: '760+',
    down: '317600',
    name: 'Jordan Ellis',
    phone: '(408) 555-0148',
    consent: true
  });
  const [err, setErr] = useState('');

  if (!isOpen) return null;

  const preQs = [
    ['What is your employment status?', 'Helps us pick the underwriting guidelines.'],
    ['Income and debts', 'Use gross income before taxes, and total monthly debt payments.'],
    ['Credit score & down payment', 'Pick an estimate for credit. Down payment cash available.'],
    ['Confirm details', 'Enter your contact info to receive your pre-approval letter.'],
    ['Your pre-approval estimate', 'Based on your soft credit evaluation.']
  ];

  const employmentTypes = ['W2 employee', 'Self-employed', 'Both'];
  const creditBands = [['760+', '6.49%'], ['700–759', '6.69%'], ['640–699', '7.15%'], ['Below 640', '7.90%']];

  const INP = 'width:100%;box-sizing:border-box;min-height:50px;border-radius:12px;padding:0 14px;font-size:18px;background:rgba(var(--ink),.05);color:var(--color-text);border:none;';

  const opt = active => ({
    width: '100%',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 18px',
    borderRadius: 18,
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: 16,
    border: '1.5px solid ' + (active ? 'var(--brand)' : 'transparent'),
    background: active ? 'rgba(var(--brand-rgb),.09)' : 'rgba(var(--ink),.05)',
    color: 'var(--color-text)'
  });

  const handleNext = () => {
    if (step === 3 && !pre.consent) {
      setErr('Please check the consent box to proceed with the soft check.');
      return;
    }
    if (step < 4) {
      setStep(step + 1);
      setErr('');
    } else {
      onFlash('A lender will call within one business day.');
      onClose();
      setStep(0);
    }
  };

  return (
    <div style={{ position: 'absolute', top: 56, left: 0, right: 0, bottom: 0, zIndex: 8, background: 'var(--color-bg)', borderRadius: '38px 38px 0 0', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 -12px 40px rgba(var(--ink),.22)', animation: 'sheetUp .34s cubic-bezier(.32,.72,0,1)' }}>
      {/* Header */}
      <div style={{ flex: 'none', padding: '8px 16px 12px', background: 'rgba(var(--paper),.72)', backdropFilter: 'blur(28px) saturate(180%)', WebkitBackdropFilter: 'blur(28px) saturate(180%)', boxShadow: 'inset 0 -.5px 0 rgba(var(--ink),.12)' }}>
        <div style={{ width: 36, height: 5, borderRadius: 999, background: 'rgba(var(--ink),.18)', margin: '0 auto 10px' }}></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-.026em' }}>Get pre-approved</div>
            <div style={{ fontSize: 13, color: 'var(--color-neutral-700)', fontFeatureSettings: "'tnum'" }}>{step === 4 ? 'Result' : `Step ${step + 1} of 4`}</div>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ width: 44, height: 44, flex: 'none', borderRadius: '50%', border: 'none', background: 'rgba(var(--ink),.07)', color: 'rgba(var(--ink),.55)', fontSize: 17, cursor: 'pointer' }}>
            <i class="ph-duotone ph-x"></i>
          </button>
        </div>
        <div style={{ height: 3, background: 'rgba(var(--ink),.1)', borderRadius: 999, marginTop: 11 }}>
          <div style={{ height: 3, borderRadius: 999, background: 'var(--brand)', width: `${((step + 1) / 5) * 100}%`, transition: 'width .25s' }}></div>
        </div>
      </div>

      {/* Main Body */}
      <div className="nsb" style={{ flex: 1, overflowY: 'auto', padding: '22px 16px 30px' }}>
        <div style={{ fontSize: 25, fontWeight: 600, lineHeight: 1.2, letterSpacing: '-.015em' }}>{preQs[step][0]}</div>
        <div style={{ fontSize: 16, color: 'rgba(var(--ink),.6)', lineHeight: 1.5, marginTop: 7 }}>{preQs[step][1]}</div>

        <div style={{ marginTop: 20 }}>
          {step === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {employmentTypes.map(e => (
                <button key={e} onClick={() => setPre({ ...pre, employment: e })} style={opt(pre.employment === e)}>
                  {e}
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <>
              <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-neutral-700)', marginBottom: 6 }}>
                Gross annual income ($)
              </label>
              <input value={pre.income} onChange={e => setPre({ ...pre, income: e.target.value })} placeholder="240,000" inputMode="numeric" style={{ cssText: INP }} />

              <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-neutral-700)', margin: '16px 0 6px' }}>
                Monthly debt payments ($)
              </label>
              <input value={pre.debts} onChange={e => setPre({ ...pre, debts: e.target.value })} placeholder="850" inputMode="numeric" style={{ cssText: INP }} />
              <div style={{ fontSize: 14, color: 'var(--color-neutral-700)', marginTop: 8, lineHeight: 1.5 }}>
                Car, student and card minimums. Skip rent — that is the thing you would be replacing.
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {creditBands.map(([label, rate]) => (
                  <button key={label} onClick={() => setPre({ ...pre, credit: label })} style={opt(pre.credit === label)}>
                    <span style={{ flex: 1 }}>{label}</span>
                    <span style={{ fontSize: 14, color: 'var(--color-neutral-700)', fontFeatureSettings: "'tnum'" }}>{rate}</span>
                  </button>
                ))}
              </div>

              <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-neutral-700)', margin: '20px 0 6px' }}>
                Cash for down payment ($)
              </label>
              <input value={pre.down} onChange={e => setPre({ ...pre, down: e.target.value })} inputMode="numeric" style={{ cssText: INP }} />
            </>
          )}

          {step === 3 && (
            <>
              <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-neutral-700)', marginBottom: 6 }}>Full name</label>
              <input value={pre.name} onChange={e => setPre({ ...pre, name: e.target.value })} placeholder="Jordan Ellis" style={{ cssText: INP }} />

              <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-neutral-700)', margin: '16px 0 6px' }}>Mobile</label>
              <input value={pre.phone} onChange={e => setPre({ ...pre, phone: e.target.value })} placeholder="(408) 555-0148" inputMode="tel" style={{ cssText: INP }} />

              <button
                onClick={() => setPre({ ...pre, consent: !pre.consent })}
                style={{ marginTop: 20, width: '100%', display: 'flex', gap: 12, alignItems: 'flex-start', textAlign: 'left', background: 'rgba(var(--ink),.04)', border: 'none', borderRadius: 14, padding: 15, cursor: 'pointer' }}
              >
                <span style={{ width: 24, height: 24, flex: 'none', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, background: pre.consent ? 'var(--brand)' : 'rgba(var(--ink),.08)', color: pre.consent ? '#ffffff' : 'transparent' }}>
                  ✓
                </span>
                <span style={{ flex: 1, fontSize: 15, lineHeight: 1.5, color: 'rgba(var(--ink),.75)' }}>
                  Run a soft credit check. It does not affect your score, and Snaphomz never sells this data. You can withdraw it any time.
                </span>
              </button>
            </>
          )}

          {step === 4 && (
            <>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--brand)' }}>Indicative only</div>
              <div style={{ fontSize: 38, fontWeight: 600, marginTop: 6, fontFeatureSettings: "'tnum'", letterSpacing: '-.02em' }}>$1,840,000</div>
              <p style={{ fontSize: 17, color: 'rgba(var(--ink),.75)', lineHeight: 1.55, margin: '8px 0 0', textWrap: 'pretty' }}>
                That clears this listing with room to spare. Ask the lender to put it in writing before you tour — sellers here read a letter as seriousness.
              </p>
              <div style={{ marginTop: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, padding: '11px 0', borderTop: '1px solid rgba(var(--ink),.1)' }}>
                  <span style={{ color: 'rgba(var(--ink),.55)' }}>Rate used</span>
                  <span style={{ fontFeatureSettings: "'tnum'" }}>6.49%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, padding: '11px 0', borderTop: '1px solid rgba(var(--ink),.1)' }}>
                  <span style={{ color: 'rgba(var(--ink),.55)' }}>This listing</span>
                  <span style={{ fontFeatureSettings: "'tnum'" }}>{priceLabel}</span>
                </div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--color-neutral-700)', marginTop: 14, lineHeight: 1.5 }}>
                Estimate from what you told us · 36% DTI guideline · not a commitment to lend. A lender letter takes about a day.
              </div>
            </>
          )}
        </div>

        {err && (
          <div style={{ marginTop: 16, paddingLeft: 13, borderLeft: '2px solid var(--color-accent-2-700)', fontSize: 15, lineHeight: 1.45, color: 'var(--color-accent-2-700)' }}>
            {err}
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div style={{ flex: 'none', padding: '12px 16px 30px', display: 'flex', gap: 10 }}>
        {step > 0 && step < 4 && (
          <button onClick={() => setStep(step - 1)} style={{ minHeight: 52, padding: '0 22px', borderRadius: 26, border: 'none', background: 'rgba(var(--ink),.07)', fontSize: 17, cursor: 'pointer', color: 'var(--color-text)' }}>
            Back
          </button>
        )}
        <button onClick={handleNext} style={{ flex: 1, minHeight: 52, borderRadius: 26, border: 'none', background: 'var(--brand)', color: '#ffffff', fontSize: 17, fontWeight: 600, cursor: 'pointer' }}>
          {step === 3 ? 'Run the soft check' : step === 4 ? 'Have a lender call me' : 'Continue'}
        </button>
      </div>
    </div>
  );
}
