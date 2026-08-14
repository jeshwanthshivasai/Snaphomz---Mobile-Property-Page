import React, { useState } from 'react';
import { PaymentCalculator } from './PaymentCalculator';
import { RentVsBuyWizard } from './RentVsBuyWizard';

export function ReportSheet({
  sheetId,
  onCloseSheet,
  calcState,
  setCalcState,
  rvbState,
  setRvbState,
  rvbSaved,
  onResetRvb,
  onDismissResume,
  rvbResume,
  onFlash
}) {
  const [topic, setTopic] = useState('Market');
  const [weight, setWeight] = useState('$/sqft');

  if (!sheetId) return null;

  const reportTabs = [
    { id: 'property', label: 'Property' },
    { id: 'schools', label: 'Schools' },
    { id: 'intel', label: 'Intelligence' },
    { id: 'forecast', label: 'Forecast' },
    { id: 'rvb', label: 'Rent vs Buy' },
    { id: 'nbhd', label: 'Neighborhood' },
    { id: 'snaplife', label: 'SnapLife' }
  ];

  const metaMap = {
    property: ['Property details', 'Rooms, structure, heating and cooling'],
    schools: ['Schools & college fit', 'Five assigned & nearby schools'],
    intel: ['Market intelligence', 'Price heat map, owner equity, history'],
    forecast: ['Forecast & calculator', '30yr rate predictor & payment tool'],
    rvb: ['Rent vs buy', '5 questions, one verdict'],
    nbhd: ['Neighborhood pulse', 'What locals actually say'],
    snaplife: ['SnapLife simulation', 'Simulate your life at this address']
  };

  const meta = metaMap[sheetId] || ['Report', 'Details'];

  const pill = active => ({
    minHeight: 38,
    padding: '0 14px',
    borderRadius: 19,
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: 14.5,
    fontWeight: active ? 600 : 400,
    background: active ? 'var(--brand)' : 'rgba(var(--ink),.06)',
    color: active ? '#ffffff' : 'var(--color-text)',
    whiteSpace: 'nowrap',
    flex: 'none'
  });

  const propertyGroups = [
    { title: 'Bedrooms & bathrooms', rows: [{ k: 'Bedrooms', v: '4' }, { k: 'Bathrooms', v: '2' }, { k: 'Full bathrooms', v: '2' }] },
    { title: 'Appliances', rows: [{ k: 'Included', v: 'Dryer, dishwasher, refrigerator, gas range, washer' }] },
    { title: 'Features', rows: [{ k: 'Flooring', v: 'Vinyl' }, { k: 'Basement', v: 'No' }, { k: 'Fireplace', v: 'Yes' }, { k: 'Garage', v: '2 car, attached' }] },
    { title: 'Heating & cooling', rows: [{ k: 'Heating', v: 'Forced air' }, { k: 'Cooling', v: 'Central AC' }] },
    { title: 'Construction', rows: [{ k: 'Year built', v: '1962' }, { k: 'Roof', v: 'New, main structure' }, { k: 'Plumbing', v: 'Copper, replaced' }, { k: 'Sewer', v: 'Newer line' }] }
  ];

  const schools = [
    { name: 'Lietz Elementary School', meta: 'Elementary · K–5 · 0.3 mi', rating: '8', good: true },
    { name: 'Dartmouth Middle School', meta: 'Middle · 6–8 · 0.4 mi', rating: '8', good: true },
    { name: 'Appleseed Almaden Montessori', meta: 'Elementary · 6–8 · 0.3 mi', rating: '4', good: false },
    { name: 'Stratford School Almaden', meta: 'Middle · K–4 · 0.3 mi', rating: '3', good: false },
    { name: 'Beacon School', meta: 'High · 6–12 · 0.8 mi · assigned', rating: '3', good: false }
  ];

  const colleges = [
    { rank: '1', name: 'California State University, Fresno', id: '993122' },
    { rank: '2', name: 'Loyola Marymount University', id: '818286' },
    { rank: '3', name: 'Pomona College', id: '615388' }
  ];

  const topicText = {
    Market: ['"The price is low because Gatewood is on the pocket edge, but the house itself is turnkey. It will sell before Sunday."', [
      { src: 'r/SanJose · 2 days ago', t: 'Cambrian Park is hot. $1.5M for a move-in 4-bed in Lietz attendance is standard now.' },
      { src: 'Nextdoor · 1 week ago', t: 'Traffic on Meridian slows down 8–9 AM but Gatewood itself is quiet.' }
    ]],
    Schools: ['"Lietz and Dartmouth are top tier. High school path is Beacon — solid test scores, though parents talk about overcrowding."', [
      { src: 'GreatSchools parent · 2025', t: 'Lietz principal is fantastic. Strong community involvement.' }
    ]],
    Vibe: ['"Quiet, kids riding bikes, neighbors actually talk to each other. Best pocket in 95118."', [
      { src: 'r/BayAreaRealEstate', t: 'Very safe, clean air, close to Butcher Park.' }
    ]],
    Traffic: ['"15 mins to Netflix HQ, 20 mins to Apple Infinite Loop. Commute is better than South San Jose."', [
      { src: 'Waze commuter log', t: 'Hwy 85 on-ramp is 3 minutes away.' }
    ]]
  };

  const tp = topicText[topic] || topicText.Market;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{ position: 'absolute', inset: 0, zIndex: 7, background: 'rgba(var(--ink),.3)', animation: 'fadeIn .25s ease' }}
        onClick={onCloseSheet}
      />

      {/* Slide-Up Sheet Container */}
      <div
        style={{
          position: 'absolute',
          top: 56,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 8,
          background: 'var(--color-bg)',
          borderRadius: '38px 38px 0 0',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 -12px 40px rgba(var(--ink),.22)',
          animation: 'sheetUp .34s cubic-bezier(.32,.72,0,1)'
        }}
      >
        {/* Sheet Top Header */}
        <div style={{ flex: 'none', position: 'relative', padding: '8px 16px 11px', background: 'rgba(var(--paper),.72)', backdropFilter: 'blur(28px) saturate(180%)', WebkitBackdropFilter: 'blur(28px) saturate(180%)', boxShadow: 'inset 0 -.5px 0 rgba(var(--ink),.12)', borderRadius: '38px 38px 0 0' }}>

          <div style={{ width: 36, height: 5, borderRadius: 999, background: 'rgba(var(--ink),.18)', margin: '0 auto 10px' }}></div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-.026em', lineHeight: 1.2 }}>{meta[0]}</div>
              <div style={{ fontSize: 13.5, color: 'var(--color-neutral-700)', marginTop: 1 }}>{meta[1]}</div>
            </div>
            <button
              onClick={onCloseSheet}
              aria-label="Close"
              style={{ width: 44, height: 44, flex: 'none', marginTop: -4, borderRadius: '50%', border: 'none', background: 'rgba(var(--ink),.07)', color: 'rgba(var(--ink),.55)', fontSize: 17, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <i class="ph-duotone ph-x"></i>
            </button>
          </div>

          {/* Horizontal Report Tabs Switcher */}
          <div className="nsb" style={{ display: 'flex', gap: 6, overflowX: 'auto', margin: '9px -16px -2px', padding: '2px 16px 2px', scrollSnapType: 'x proximity' }}>
            {reportTabs.map(r => (
              <button key={r.id} onClick={() => onFlash && onFlash(`Switched to ${r.label} tab`)} style={pill(sheetId === r.id)}>
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sheet Main Scroll Content */}
        <div className="nsb" style={{ flex: 1, overflowY: 'auto', padding: '4px 16px 120px' }}>
          {/* TAB 1: Property */}
          {sheetId === 'property' && (
            <>
              {propertyGroups.map((g, gi) => (
                <div key={gi} style={{ padding: '20px 0 4px' }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-neutral-700)', marginBottom: 4 }}>
                    {g.title}
                  </div>
                  {g.rows.map((r, ri) => (
                    <div key={ri} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, fontSize: 16, padding: '11px 0', lineHeight: 1.4, borderTop: '1px solid rgba(var(--ink),.1)' }}>
                      <span style={{ color: 'rgba(var(--ink),.55)', flex: 'none' }}>{r.k}</span>
                      <span style={{ textAlign: 'right' }}>{r.v}</span>
                    </div>
                  ))}
                </div>
              ))}
              <div style={{ marginTop: 22, fontSize: 14, color: 'var(--color-neutral-700)', lineHeight: 1.55 }}>
                Supplied by the listing agent and not verified by Snaphomz. Anything that matters to your offer should be confirmed in the disclosures.
              </div>
              <button
                onClick={() => onFlash('Review disclosures requested.')}
                style={{ marginTop: 16, width: '100%', minHeight: 50, borderRadius: 25, border: 'none', background: 'rgba(var(--ink),.07)', fontSize: 17, cursor: 'pointer', color: 'var(--color-text)' }}
              >
                Review disclosures
              </button>
            </>
          )}

          {/* TAB 2: Schools */}
          {sheetId === 'schools' && (
            <>
              <p style={{ fontSize: 17, lineHeight: 1.55, color: 'rgba(var(--ink),.75)', margin: '14px 0 18px', textWrap: 'pretty' }}>
                This home is within <strong style={{ fontWeight: 600, color: 'var(--color-text)' }}>Campbell Union High School District</strong>. Assignment can change year to year — confirm with the district before you buy on schools.
              </p>
              {schools.map((s, i) => (
                <div key={i} style={{ padding: '12px 0', borderTop: '1px solid rgba(var(--ink),.1)', display: 'flex', gap: 13, alignItems: 'center' }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    flex: 'none',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    fontWeight: 600,
                    fontFeatureSettings: "'tnum'",
                    background: s.good ? 'rgba(var(--brand-rgb),.09)' : 'rgba(var(--ink),.06)',
                    color: s.good ? 'var(--brand)' : 'var(--color-neutral-700)'
                  }}>
                    {s.rating}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16.5, fontWeight: 600, lineHeight: 1.3 }}>{s.name}</div>
                    <div style={{ fontSize: 14, color: 'var(--color-neutral-700)', marginTop: 1 }}>{s.meta}</div>
                  </div>
                </div>
              ))}
              <div style={{ fontSize: 12.5, color: 'var(--color-neutral-700)', marginTop: 11 }}>
                Ratings 1–10 from GreatSchools via SnapGrad · updated Jul 2026
              </div>

              <h3 style={{ fontSize: 20, fontWeight: 600, margin: '30px 0 3px', letterSpacing: '-.026em' }}>College readiness</h3>
              <div style={{ fontSize: 15, color: 'rgba(var(--ink),.55)', marginBottom: 8 }}>Where graduates of Beacon School enrolled</div>
              {colleges.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderTop: '1px solid rgba(var(--ink),.1)' }}>
                  <div style={{ fontSize: 21, fontWeight: 600, color: 'rgba(var(--ink),.28)', fontFeatureSettings: "'tnum'", width: 22 }}>{c.rank}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.3 }}>{c.name}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--color-neutral-700)', fontFeatureSettings: "'tnum'" }}>Institution ID {c.id}</div>
                  </div>
                </div>
              ))}

              {/* Demographic SVG Donut Chart */}
              <div style={{ display: 'flex', gap: 18, alignItems: 'center', marginTop: 22, paddingTop: 20, borderTop: '1px solid rgba(var(--ink),.1)' }}>
                <svg viewBox="0 0 42 42" style={{ width: 84, height: 84, flex: 'none' }}>
                  <circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--brand)" strokeWidth="7" strokeDasharray="46 54"></circle>
                  <circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--brand-soft)" strokeWidth="7" strokeDasharray="27 73" strokeDashoffset="-46"></circle>
                  <circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--color-accent-2-800)" strokeWidth="7" strokeDasharray="14 86" strokeDashoffset="-73"></circle>
                  <circle cx="21" cy="21" r="15.9" fill="none" stroke="rgba(var(--ink),.16)" strokeWidth="7" strokeDasharray="13 87" strokeDashoffset="-87"></circle>
                </svg>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14.5, color: 'rgba(var(--ink),.75)' }}>
                  <div style={{ display: 'flex', gap: 9, alignItems: 'center' }}><span style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--brand)' }}></span>Asian 46%</div>
                  <div style={{ display: 'flex', gap: 9, alignItems: 'center' }}><span style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--brand-soft)' }}></span>Hispanic 27%</div>
                  <div style={{ display: 'flex', gap: 9, alignItems: 'center' }}><span style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--color-accent-2-700)' }}></span>White 14%</div>
                  <div style={{ display: 'flex', gap: 9, alignItems: 'center' }}><span style={{ width: 10, height: 10, borderRadius: 3, background: 'rgba(var(--ink),.16)' }}></span>Other 13%</div>
                </div>
              </div>
            </>
          )}

          {/* TAB 3: Intelligence */}
          {sheetId === 'intel' && (
            <>
              <div className="nsb" style={{ display: 'flex', gap: 7, overflowX: 'auto', margin: '14px 0 12px' }}>
                {['$/sqft', 'Price', 'Noise', 'Weather risk', 'Air quality'].map(w => (
                  <button key={w} onClick={() => setWeight(w)} style={pill(weight === w)}>
                    {w}
                  </button>
                ))}
              </div>
              <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden' }}>
                <img src="img/map.png" alt="Price heat map around 5308 Gatewood Ln" style={{ width: '100%', display: 'block' }} />
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '7px 10px', background: 'rgba(var(--paper),.78)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', fontSize: 10.5, color: 'var(--color-neutral-700)' }}>
                  MapLibre · OpenFreeMap © OpenMapTiles · data from OpenStreetMap
                </div>
              </div>
              <p style={{ fontSize: 16, lineHeight: 1.55, color: 'rgba(var(--ink),.75)', margin: '11px 0 0', textWrap: 'pretty' }}>
                Warm areas carry the higher {weight.toLowerCase()}. This home sits on the cool edge of the hot block — the usual sign of a renovated house on a cheaper street.
              </p>

              <h3 style={{ fontSize: 20, fontWeight: 600, margin: '30px 0 4px', letterSpacing: '-.026em' }}>Owner position</h3>
              <div style={{ fontSize: 15, color: 'rgba(var(--ink),.55)', marginBottom: 6 }}>From recorded deeds. Tells you how much room the seller has.</div>
              {[
                { k: 'Assessed', v: '$364,777' }, { k: 'Equity', v: '37%' },
                { k: 'Mortgage balance', v: '$229,810' }, { k: 'Liens', v: '0' },
                { k: 'Distress', v: 'None' }
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, padding: '11px 0', borderTop: '1px solid rgba(var(--ink),.1)' }}>
                  <span style={{ color: 'rgba(var(--ink),.55)' }}>{r.k}</span>
                  <span style={{ fontFeatureSettings: "'tnum'" }}>{r.v}</span>
                </div>
              ))}

              <h3 style={{ fontSize: 20, fontWeight: 600, margin: '26px 0 4px', letterSpacing: '-.026em' }}>Comps</h3>
              {[
                { k: 'Estimate', v: '$1,725,000' }, { k: 'Per sqft', v: '$1,219' },
                { k: 'Comps used', v: '8' }, { k: 'Confidence', v: 'High' }
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, padding: '11px 0', borderTop: '1px solid rgba(var(--ink),.1)' }}>
                  <span style={{ color: 'rgba(var(--ink),.55)' }}>{r.k}</span>
                  <span style={{ fontFeatureSettings: "'tnum'" }}>{r.v}</span>
                </div>
              ))}

              <h3 style={{ fontSize: 20, fontWeight: 600, margin: '30px 0 0', letterSpacing: '-.026em' }}>Price & sale history</h3>
              <div style={{ padding: '26px 0 4px', textAlign: 'center' }}>
                <i class="ph-duotone ph-file-dashed" style={{ fontSize: 34, color: 'rgba(var(--ink),.28)' }}></i>
                <div style={{ fontSize: 17, fontWeight: 600, marginTop: 10 }}>No sale or tax record found</div>
                <p style={{ fontSize: 15.5, color: 'rgba(var(--ink),.6)', lineHeight: 1.55, margin: '6px auto 0', maxWidth: 280, textWrap: 'pretty' }}>
                  Santa Clara County has nothing filed against this parcel since 1998. That usually means a long-held family home, not a data error — but it does mean we can’t show a price trail.
                </p>
                <button
                  onClick={() => onFlash('Request sent. The agent usually replies same day.')}
                  style={{ marginTop: 16, minHeight: 48, padding: '0 20px', borderRadius: 24, border: 'none', background: 'rgba(var(--brand-rgb),.1)', color: 'var(--brand)', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}
                >
                  Ask the agent for history
                </button>
              </div>
            </>
          )}

          {/* TAB 4: Forecast */}
          {sheetId === 'forecast' && (
            <PaymentCalculator calcState={calcState} setCalcState={setCalcState} />
          )}

          {/* TAB 5: Rent vs Buy */}
          {sheetId === 'rvb' && (
            <RentVsBuyWizard
              rvbState={rvbState}
              setRvbState={setRvbState}
              rvbSaved={rvbSaved}
              onResetRvb={onResetRvb}
              onDismissResume={onDismissResume}
              rvbResume={rvbResume}
            />
          )}

          {/* TAB 6: Neighborhood */}
          {sheetId === 'nbhd' && (
            <>
              <p style={{ fontSize: 16, lineHeight: 1.55, color: 'rgba(var(--ink),.7)', margin: '14px 0 0' }}>
                Drawn from Reddit, local forums and city planning records. Opinions, not statistics.
              </p>
              <div className="nsb" style={{ display: 'flex', gap: 7, overflowX: 'auto', margin: '14px 0 18px' }}>
                {['Market', 'Schools', 'Vibe', 'Traffic'].map(t => (
                  <button key={t} onClick={() => setTopic(t)} style={pill(topic === t)}>
                    {t}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--brand)', marginBottom: 8 }}>
                {topic}
              </div>
              <p style={{ fontSize: 19, lineHeight: 1.5, margin: 0, fontStyle: 'italic', letterSpacing: '-.005em', textWrap: 'pretty' }}>
                {tp[0]}
              </p>
              <div style={{ marginTop: 22 }}>
                {tp[1].map((n, i) => (
                  <div key={i} style={{ padding: '14px 0', borderTop: '1px solid rgba(var(--ink),.1)' }}>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-neutral-700)', marginBottom: 5 }}>
                      {n.src}
                    </div>
                    <div style={{ fontSize: 16, lineHeight: 1.55, color: 'rgba(var(--ink),.85)', textWrap: 'pretty' }}>
                      {n.t}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--color-neutral-700)', marginTop: 16, lineHeight: 1.5 }}>
                Summarised by Snaphomz AI from public posts. Individual accounts, not verified fact.
              </div>
            </>
          )}

          {/* TAB 7: SnapLife */}
          {sheetId === 'snaplife' && (
            <>
              <img src="img/exterior.png" alt="Street view of the block" style={{ width: '100%', height: 186, objectFit: 'cover', display: 'block', borderRadius: 18, marginTop: 14 }} />
              <div style={{ fontSize: 23, fontWeight: 600, letterSpacing: '-.015em', lineHeight: 1.2, marginTop: 18 }}>
                Ever think what life at 5308 Gatewood Ln looks like?
              </div>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: 'rgba(var(--ink),.75)', margin: '10px 0 0', textWrap: 'pretty' }}>
                Answer a few quick questions and SnapAI builds a full picture of your life at this address — your commute, school fit, and weekend spots. See if this home actually fits your lifestyle before you make an offer.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                <span style={{ fontSize: 14, padding: '8px 13px', background: 'rgba(var(--ink),.06)', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 7 }}>
                  <i class="ph-duotone ph-car" style={{ color: 'var(--brand)' }}></i>Commute
                </span>
                <span style={{ fontSize: 14, padding: '8px 13px', background: 'rgba(var(--ink),.06)', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 7 }}>
                  <i class="ph-duotone ph-graduation-cap" style={{ color: 'var(--brand)' }}></i>School fit
                </span>
                <span style={{ fontSize: 14, padding: '8px 13px', background: 'rgba(var(--ink),.06)', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 7 }}>
                  <i class="ph-duotone ph-fork-knife" style={{ color: 'var(--brand)' }}></i>Dining
                </span>
              </div>
              <button
                onClick={() => onFlash('Simulation starts with your commute. Not built in this prototype.')}
                style={{ marginTop: 20, width: '100%', minHeight: 52, borderRadius: 26, border: 'none', background: 'var(--brand)', color: '#ffffff', fontSize: 17, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9 }}
              >
                Start lifestyle simulation <i class="ph-duotone ph-arrow-right"></i>
              </button>
              <div style={{ fontSize: 13, color: 'var(--color-neutral-700)', marginTop: 11, lineHeight: 1.5 }}>
                About two minutes. You can stop anywhere — we keep what you have answered.
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
