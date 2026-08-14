import React from 'react';

export function ValuationModels() {
  return (
    <div style={{
      margin: '9px 10px 0',
      padding: '19px 15px',
      background: 'var(--color-bg)',
      borderRadius: 20,
      boxShadow: 'var(--lift)'
    }}>
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, letterSpacing: '-.026em' }}>Four models, four numbers</h2>
      <p style={{ fontSize: 16, lineHeight: 1.5, color: 'rgba(var(--ink),.65)', margin: '6px 0 16px', textWrap: 'pretty' }}>
        They disagree by $144,000. The comps figure is the one lenders care about; the projection is the one to trust least.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 22px' }}>
        {/* Model 1: House value */}
        <div>
          <div style={{ fontSize: 13, color: 'var(--color-neutral-700)' }}>House value</div>
          <div style={{ fontSize: 21, fontWeight: 600, marginTop: 1, fontFeatureSettings: "'tnum'" }}>$1,580,818</div>
          <svg viewBox="0 0 120 30" style={{ width: '100%', height: 30, marginTop: 5 }}>
            <path d="M0 26 L14 23 L28 24 L42 17 L56 19 L70 12 L84 14 L98 7 L112 9 L120 3" fill="none" stroke="var(--brand)" strokeWidth="1.6"></path>
          </svg>
          <div style={{ fontSize: 12, color: 'var(--color-neutral-700)', marginTop: 3 }}>AVM · 2016–2026</div>
        </div>

        {/* Model 2: Appraisal, comps */}
        <div>
          <div style={{ fontSize: 13, color: 'var(--color-neutral-700)' }}>Appraisal, comps</div>
          <div style={{ fontSize: 21, fontWeight: 600, marginTop: 1, fontFeatureSettings: "'tnum'" }}>$1,725,000</div>
          <svg viewBox="0 0 120 30" style={{ width: '100%', height: 30, marginTop: 5 }}>
            <path d="M0 26 L30 22 L60 16 L90 10 L120 2" fill="none" stroke="var(--brand)" strokeWidth="1.6"></path>
          </svg>
          <div style={{ fontSize: 12, color: 'var(--color-neutral-700)', marginTop: 3 }}>8 comps · high confidence</div>
        </div>

        {/* Model 3: Estimated rent */}
        <div>
          <div style={{ fontSize: 13, color: 'var(--color-neutral-700)' }}>Estimated rent</div>
          <div style={{ fontSize: 21, fontWeight: 600, marginTop: 1, fontFeatureSettings: "'tnum'" }}>$3,282</div>
          <svg viewBox="0 0 120 30" style={{ width: '100%', height: 30, marginTop: 5 }}>
            <path d="M0 11 L20 9 L40 13 L52 23 L64 21 L82 19 L100 16 L120 7" fill="none" stroke="var(--color-accent-2-800)" strokeWidth="1.6"></path>
          </svg>
          <div style={{ fontSize: 12, color: 'var(--color-neutral-700)', marginTop: 3 }}>+$742 vs Jul 2026</div>
        </div>

        {/* Model 4: 5-year projection */}
        <div>
          <div style={{ fontSize: 13, color: 'var(--color-neutral-700)' }}>5-year projection</div>
          <div style={{ fontSize: 21, fontWeight: 600, marginTop: 1, fontFeatureSettings: "'tnum'" }}>$1,809,549</div>
          <svg viewBox="0 0 120 30" style={{ width: '100%', height: 30, marginTop: 5 }}>
            <path d="M0 25 L20 19 L40 22 L58 12" fill="none" stroke="var(--color-text)" strokeWidth="1.6"></path>
            <path d="M58 12 L80 10 L100 7 L120 4" fill="none" stroke="var(--brand)" strokeWidth="1.6" strokeDasharray="3 3"></path>
          </svg>
          <div style={{ fontSize: 12, color: 'var(--color-neutral-700)', marginTop: 3 }}>+5.7% modelled</div>
        </div>
      </div>
    </div>
  );
}
