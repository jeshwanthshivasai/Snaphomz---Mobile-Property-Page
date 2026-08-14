import React, { useState } from 'react';

export function RentVsBuyWizard({
  rvbState,
  setRvbState,
  rvbSaved,
  onResetRvb,
  onDismissResume,
  rvbResume
}) {
  const [verdict, setVerdict] = useState(null);

  const getVerdict = () => {
    const income = parseFloat(rvbState.income.replace(/[^0-9.]/g, '')) || 120000;
    const debts = parseFloat(rvbState.debts.replace(/[^0-9.]/g, '')) || 400;
    const monthlyGross = income / 12;
    const estMortgage = 5800; // estimated monthly payment for Gatewood Ln
    const dti = (estMortgage + debts) / monthlyGross;

    if (dti <= 0.45) {
      setVerdict({
        buy: true,
        dti,
        headline: 'Buying wins after about four years.',
        body: `At ${Math.round(dti * 100)}% of gross income the payment is inside what lenders will write, and the rent you would pay instead is rising faster than this carrying cost. Below four years, selling costs eat the gain.`
      });
    } else {
      setVerdict({
        buy: false,
        dti,
        headline: 'Renting wins at this price.',
        body: `The payment lands at ${Math.round(dti * 100)}% of gross income, past the 45% most lenders stop at. Renting nearby and revisiting when rates ease is the cheaper year.`
      });
    }
  };

  const INP = 'width:100%;box-sizing:border-box;min-height:50px;border-radius:12px;padding:0 14px;font-size:18px;background:rgba(var(--ink),.05);color:var(--color-text);border:none;';

  const incomeTypes = ['W2 employee', 'Self-employed'];

  return (
    <div>
      {/* Resume Progress Banner */}
      {rvbResume && rvbSaved && (
        <div style={{ margin: '16px 0 4px', paddingLeft: 14, borderLeft: '2px solid var(--brand)' }}>
          <div style={{ fontSize: 17, fontWeight: 600, color: 'var(--brand)' }}>
            You were {rvbSaved} of 5 questions in
          </div>
          <div style={{ fontSize: 15, color: 'rgba(var(--ink),.7)', lineHeight: 1.5, marginTop: 3 }}>
            We kept your answers on this device. Nothing was sent anywhere.
          </div>
          <div style={{ display: 'flex', gap: 18, marginTop: 8 }}>
            <button onClick={onDismissResume} style={{ minHeight: 44, border: 'none', background: 'none', padding: 0, color: 'var(--brand)', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
              Keep going
            </button>
            <button onClick={onResetRvb} style={{ minHeight: 44, border: 'none', background: 'none', padding: 0, color: 'rgba(var(--ink),.55)', fontSize: 16, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Start over
            </button>
          </div>
        </div>
      )}

      {/* Verdict Results Banner */}
      {verdict && (
        <div style={{ margin: '18px 0 6px' }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--brand)' }}>
            Verdict
          </div>
          <div style={{ fontSize: 25, fontWeight: 600, marginTop: 6, lineHeight: 1.2, letterSpacing: '-.015em' }}>
            {verdict.headline}
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: 'rgba(var(--ink),.75)', margin: '9px 0 0', textWrap: 'pretty' }}>
            {verdict.body}
          </p>
          <div style={{ fontSize: 12.5, color: 'var(--color-neutral-700)', marginTop: 10 }}>
            Estimate · your inputs · 36% DTI guideline · not a lending decision
          </div>
        </div>
      )}

      {/* Questionnaire Form */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 15, paddingTop: 20 }}>
        {/* Income Type */}
        <div>
          <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-neutral-700)', marginBottom: 7 }}>
            Income type
          </label>
          <div style={{ display: 'flex', borderRadius: 12, background: 'rgba(var(--ink),.05)' }}>
            {incomeTypes.map(t => (
              <button
                key={t}
                onClick={() => setRvbState({ ...rvbState, type: t })}
                style={{
                  flex: 1,
                  minHeight: 44,
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 15.5,
                  borderRadius: 10,
                  margin: 3,
                  background: rvbState.type === t ? 'var(--seg-on)' : 'transparent',
                  color: 'var(--color-text)',
                  fontWeight: rvbState.type === t ? '600' : '400',
                  boxShadow: rvbState.type === t ? '0 1px 3px rgba(var(--ink),.14)' : 'none'
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Gross Annual Income */}
        <div>
          <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-neutral-700)', marginBottom: 6 }}>
            Gross annual income ($)
          </label>
          <input
            value={rvbState.income}
            onChange={e => setRvbState({ ...rvbState, income: e.target.value })}
            placeholder="120,000"
            inputMode="numeric"
            style={{ cssText: INP }}
          />
        </div>

        {/* Monthly Debts & Reserves */}
        <div style={{ display: 'flex', gap: 11 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-neutral-700)', marginBottom: 6 }}>
              Monthly debts
            </label>
            <input
              value={rvbState.debts}
              onChange={e => setRvbState({ ...rvbState, debts: e.target.value })}
              placeholder="400"
              inputMode="numeric"
              style={{ cssText: INP }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-neutral-700)', marginBottom: 6 }}>
              Reserves (mo)
            </label>
            <input
              value={rvbState.reserves}
              onChange={e => setRvbState({ ...rvbState, reserves: e.target.value })}
              placeholder="6"
              inputMode="numeric"
              style={{ cssText: INP }}
            />
          </div>
        </div>

        {/* Credit Score */}
        <div>
          <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-neutral-700)', marginBottom: 6 }}>
            Credit score
          </label>
          <input
            value={rvbState.credit}
            onChange={e => setRvbState({ ...rvbState, credit: e.target.value })}
            placeholder="720"
            inputMode="numeric"
            style={{ cssText: INP }}
          />
          <div style={{ fontSize: 13, color: 'var(--color-neutral-700)', marginTop: 6 }}>
            A soft estimate is fine. Nothing here touches your credit file.
          </div>
        </div>

        <button
          onClick={getVerdict}
          style={{
            minHeight: 52,
            borderRadius: 26,
            border: 'none',
            background: 'var(--brand)',
            color: '#ffffff',
            fontSize: 17,
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Get the verdict
        </button>

        <div style={{ fontSize: 13, color: 'var(--color-neutral-700)', lineHeight: 1.5 }}>
          Answers stay on this device until you ask for a verdict. Leave any time — we keep your place.
        </div>
      </div>
    </div>
  );
}
