import React, { useState } from 'react';

const OTHER = { tax: 1654, hoa: 562, ins: 463, util: 290, pest: 55, maint: 1323 };

const money = n => '$' + Math.round(n).toLocaleString('en-US');
const PMT = (p, r, n) => {
  const i = r / 1200;
  return i === 0 ? p / n : (p * i) / (1 - Math.pow(1 + i, -n));
};

export function PaymentCalculator({ calcState, setCalcState, sourceLines = true }) {
  const [range, setRange] = useState('6 months');
  const c = calcState;

  const num = v => parseFloat(String(v).replace(/[^0-9.\-]/g, ''));
  const price = num(c.price);
  const rate = parseFloat(c.rate);
  const term = parseInt(c.term, 10) || 30;
  const downRaw = num(c.down);

  const errs = {};
  if (!price || price <= 0) errs.price = 'Enter a price above $0. We can’t estimate a payment without one.';
  else if (price > 50000000) errs.price = 'That’s above the range we model. Try $50,000,000 or less.';

  const downAmt = c.mode === '%' ? ((price || 0) * (downRaw || 0)) / 100 : (downRaw || 0);
  if (isNaN(downRaw) || downRaw < 0) errs.down = 'Down payment can’t be negative.';
  else if (!errs.price && price > 0 && downAmt >= price) errs.down = 'That covers the whole price — there’s no loan left to estimate.';

  if (!rate || rate <= 0) errs.rate = 'Enter a rate above 0%.';
  else if (rate > 25) errs.rate = 'Above 25% is outside anything we can source. Check the number.';

  const loan = Math.max(0, (price || 0) - downAmt);
  const ltv = price ? loan / price : 0;
  let pmi = 0;
  let note = '';

  if (!Object.keys(errs).length) {
    if (ltv > 0.8) {
      pmi = (loan * 0.0055) / 12;
      note = 'Under 20% down, lenders add PMI. We’ve included ' + money(pmi) + '/mo.';
    }
    if (downRaw === 0) {
      note = '0% down is rare outside VA and USDA loans. We kept the estimate, but treat it as a ceiling. PMI of ' + money(pmi) + '/mo is included.';
    }
  }

  const ok = !Object.keys(errs).length;
  const pi = ok ? PMT(loan, rate, term * 12) : 0;
  const total = pi + pmi + OTHER.tax + OTHER.hoa + OTHER.ins + OTHER.util + OTHER.pest + OTHER.maint;

  const INP = 'width:100%;box-sizing:border-box;min-height:50px;border-radius:12px;padding:0 14px;font-size:18px;background:rgba(var(--ink),.05);color:var(--color-text);border:1.5px solid ';

  const downPct = c.mode === '%' ? Math.min(40, Math.max(0, downRaw || 0)) : (price ? Math.min(40, Math.max(0, (downAmt / price) * 100)) : 20);

  const pill = active => ({
    flex: 1,
    minHeight: 44,
    borderRadius: 12,
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: 15,
    background: active ? 'var(--seg-on)' : 'rgba(var(--ink),.05)',
    color: active ? 'var(--color-text)' : 'var(--color-neutral-700)',
    boxShadow: active ? '0 1px 3px rgba(var(--ink),.14)' : 'none'
  });

  return (
    <div>
      {/* Rate Predictor Section */}
      <div style={{ padding: '16px 0 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-.026em' }}>Rate predictor</div>
            <div style={{ fontSize: 14, color: 'var(--color-neutral-700)' }}>30-year fixed, national average</div>
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, fontFeatureSettings: "'tnum'" }}>6.69%</div>
        </div>

        <div style={{ display: 'flex', gap: 7, margin: '14px 0 4px' }}>
          {['6 months', '12 months', '24 months'].map(r => (
            <button key={r} onClick={() => setRange(r)} style={pill(range === r)}>
              {r}
            </button>
          ))}
        </div>

        <svg viewBox="0 0 300 130" style={{ width: '100%', height: 150 }}>
          <line x1="0" y1="110" x2="300" y2="110" stroke="rgba(var(--ink),.12)"></line>
          <path d="M4 84 L28 70 L52 62 L76 70 L100 58 L124 74 L140 46 L156 30" fill="none" stroke="var(--color-text)" strokeWidth="2"></path>
          <path d="M156 30 L184 48 L212 68 L240 84 L268 92 L296 70" fill="none" stroke="var(--brand)" strokeWidth="2" strokeDasharray="5 4"></path>
          <circle cx="156" cy="30" r="3.5" fill="var(--color-text)"></circle>
        </svg>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: 'var(--color-neutral-700)', fontFeatureSettings: "'tnum'" }}>
          <span>May '26</span>
          <span>today</span>
          <span>Jan '27</span>
        </div>

        <p style={{ fontSize: 16, lineHeight: 1.55, color: 'rgba(var(--ink),.75)', margin: '12px 0 0', textWrap: 'pretty' }}>
          The model has rates easing to about 6.2% by November. On this loan that is roughly $520 a month — worth knowing before you lock, not worth waiting on.
        </p>

        {sourceLines && (
          <div style={{ fontSize: 12.5, color: 'var(--color-neutral-700)', marginTop: 10 }}>
            Forecast · updated 8/12/26 09:37 · a model, not a guarantee
          </div>
        )}
      </div>

      {/* Payment Calculator Section */}
      <h3 style={{ fontSize: 20, fontWeight: 600, margin: '32px 0 14px', letterSpacing: '-.026em' }}>Payment calculator</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        {/* Price Input */}
        <div>
          <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-neutral-700)', marginBottom: 6 }}>
            Home price ($)
          </label>
          <input
            value={c.price}
            onChange={e => setCalcState({ ...c, price: e.target.value })}
            inputMode="numeric"
            style={{ cssText: INP + (errs.price ? 'var(--color-accent-2-700)' : 'transparent') }}
          />
          {errs.price && (
            <div style={{ fontSize: 14, color: 'var(--color-accent-2-700)', marginTop: 7, lineHeight: 1.4, display: 'flex', gap: 7 }}>
              <i class="ph-duotone ph-warning-circle" style={{ fontSize: 17 }}></i>
              <span>{errs.price}</span>
            </div>
          )}
        </div>

        {/* Down Payment Input & Slider */}
        <div>
          <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-neutral-700)', marginBottom: 6 }}>
            Down payment
          </label>
          <div style={{ display: 'flex', gap: 9 }}>
            <input
              value={c.down}
              onChange={e => setCalcState({ ...c, down: e.target.value })}
              inputMode="numeric"
              style={{ flex: 1, cssText: INP + (errs.down ? 'var(--color-accent-2-700)' : 'transparent') }}
            />
            <div style={{ display: 'flex', borderRadius: 12, background: 'rgba(var(--ink),.05)', flex: 'none' }}>
              <button
                onClick={() => setCalcState({ ...c, mode: '%', down: '20' })}
                style={{
                  width: 46,
                  minHeight: 44,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 16,
                  borderRadius: 10,
                  margin: 3,
                  background: c.mode === '%' ? 'var(--seg-on)' : 'transparent',
                  color: c.mode === '%' ? 'var(--color-text)' : 'var(--color-neutral-700)',
                  boxShadow: c.mode === '%' ? '0 1px 3px rgba(var(--ink),.14)' : 'none'
                }}
              >
                %
              </button>
              <button
                onClick={() => setCalcState({ ...c, mode: '$', down: '317600' })}
                style={{
                  width: 46,
                  minHeight: 44,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 16,
                  borderRadius: 10,
                  margin: 3,
                  background: c.mode === '$' ? 'var(--seg-on)' : 'transparent',
                  color: c.mode === '$' ? 'var(--color-text)' : 'var(--color-neutral-700)',
                  boxShadow: c.mode === '$' ? '0 1px 3px rgba(var(--ink),.14)' : 'none'
                }}
              >
                $
              </button>
            </div>
          </div>

          {errs.down && (
            <div style={{ fontSize: 14, color: 'var(--color-accent-2-700)', marginTop: 7, lineHeight: 1.4, display: 'flex', gap: 7 }}>
              <i class="ph-duotone ph-warning-circle" style={{ fontSize: 17 }}></i>
              <span>{errs.down}</span>
            </div>
          )}

          <div style={{ marginTop: 13 }}>
            <input
              className="rng"
              type="range"
              min="0"
              max="40"
              step="0.5"
              value={downPct}
              onInput={e => {
                const pct = parseFloat(e.target.value);
                if (c.mode === '%') {
                  setCalcState({ ...c, down: String(pct) });
                } else {
                  const amt = Math.round(((price || 0) * pct) / 100);
                  setCalcState({ ...c, down: String(amt) });
                }
              }}
              aria-label="Down payment percent"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 6, fontSize: 12, color: 'rgba(var(--ink),.5)' }}>
              <span>0%</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)' }}>
                {c.mode === '%' ? `${downRaw || 0}% (${money(downAmt)})` : `${money(downRaw || 0)} (${Math.round(downPct)}%)`}
              </span>
              <span>40%</span>
            </div>
          </div>
        </div>

        {/* Term & Rate Inputs */}
        <div style={{ display: 'flex', gap: 11 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-neutral-700)', marginBottom: 6 }}>
              Term
            </label>
            <select
              value={c.term}
              onChange={e => setCalcState({ ...c, term: e.target.value })}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                minHeight: 50,
                border: 'none',
                borderRadius: 12,
                padding: '0 12px',
                fontSize: 17,
                background: 'rgba(var(--ink),.05)',
                color: 'var(--color-text)'
              }}
            >
              <option value="30">30 years</option>
              <option value="20">20 years</option>
              <option value="15">15 years</option>
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-neutral-700)', marginBottom: 6 }}>
              Rate (%)
            </label>
            <input
              value={c.rate}
              onChange={e => setCalcState({ ...c, rate: e.target.value })}
              inputMode="decimal"
              style={{ cssText: INP + (errs.rate ? 'var(--color-accent-2-700)' : 'transparent') }}
            />
          </div>
        </div>

        {errs.rate && (
          <div style={{ fontSize: 14, color: 'var(--color-accent-2-700)', marginTop: -6, lineHeight: 1.4, display: 'flex', gap: 7 }}>
            <i class="ph-duotone ph-warning-circle" style={{ fontSize: 17 }}></i>
            <span>{errs.rate}</span>
          </div>
        )}
      </div>

      {/* Calculated Total Result */}
      <div style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid rgba(var(--ink),.14)' }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-neutral-700)' }}>
          Estimated monthly payment
        </div>
        <div style={{ fontSize: 34, fontWeight: 600, fontFeatureSettings: "'tnum'", marginTop: 4, letterSpacing: '-.02em', color: ok ? 'var(--color-text)' : 'rgba(var(--ink),.35)' }}>
          {ok ? money(total) : '—'}
        </div>
        <div style={{ fontSize: 15, color: 'rgba(var(--ink),.6)', lineHeight: 1.5, marginTop: 5 }}>
          {ok
            ? `${money(pi)} loan · ${money(OTHER.tax + OTHER.hoa + OTHER.ins + OTHER.util + OTHER.pest + OTHER.maint)} tax, HOA, insurance and upkeep`
            : 'Fix the fields above and the estimate comes back. Nothing you typed is lost.'}
        </div>

        {note && (
          <div style={{ marginTop: 13, paddingLeft: 13, borderLeft: '2px solid var(--brand)', fontSize: 15, lineHeight: 1.5, color: 'var(--brand)' }}>
            {note}
          </div>
        )}

        {!ok && (
          <button
            onClick={() => setCalcState({ price: '1588000', down: '20', mode: '%', term: '30', rate: '6.69' })}
            style={{
              marginTop: 16,
              minHeight: 48,
              width: '100%',
              borderRadius: 24,
              border: 'none',
              background: 'rgba(var(--brand-rgb),.1)',
              color: 'var(--brand)',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Reset to this listing
          </button>
        )}
      </div>
    </div>
  );
}
