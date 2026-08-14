import React from 'react';

export function AIVerdict({
  pending,
  monthlyLabel,
  monthlyNote,
  sourceLines = true
}) {
  const verdictHeadline = pending ? 'Worth watching, not touring.' : 'Worth the Saturday.';
  const verdictBody = pending
    ? 'The seller accepted an offer, so you cannot tour it today. The reasons it was a good buy still hold, which is why it went in seven days — we will tell you if it comes back.'
    : 'Priced under what the block has been paying, in a walkable pocket, and only a week old. The catch is the carrying cost, not the price.';

  return (
    <div
      className="liquid-glass"
      style={{
        margin: '9px 10px 0',
        padding: '19px 15px',
        borderRadius: 20
      }}
    >

      <div style={{
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '.18em',
        textTransform: 'uppercase',
        color: 'var(--brand)',
        marginBottom: 9
      }}>
        Snaphomz AI · the short answer
      </div>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: 27,
        lineHeight: 1.2,
        fontWeight: 500,
        letterSpacing: '-.012em',
        fontVariantNumeric: 'proportional-nums',
        textWrap: 'pretty'
      }}>
        {verdictHeadline}
      </div>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 16.5,
        lineHeight: 1.62,
        color: 'rgba(var(--ink),.72)',
        margin: '10px 0 0',
        fontVariantNumeric: 'proportional-nums',
        textWrap: 'pretty'
      }}>
        {verdictBody}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 16 }}>
        <div style={{
          display: 'flex',
          gap: 11,
          fontSize: 16,
          lineHeight: 1.4,
          padding: '11px 0',
          borderTop: '1px solid rgba(var(--ink),.1)'
        }}>
          <i class="ph-duotone ph-arrow-down-right" style={{ color: 'var(--brand)', fontSize: 19, flex: 'none' }}></i>
          <span><strong style={{ fontWeight: 600 }}>$125,000 under</strong> what comparable homes are worth today</span>
        </div>

        <div style={{
          display: 'flex',
          gap: 11,
          fontSize: 16,
          lineHeight: 1.4,
          padding: '11px 0',
          borderTop: '1px solid rgba(var(--ink),.1)'
        }}>
          <i class="ph-duotone ph-arrow-up-right" style={{ color: 'var(--color-accent-2-700)', fontSize: 19, flex: 'none' }}></i>
          <span><strong style={{ fontWeight: 600 }}>{monthlyLabel} a month</strong> all in — {monthlyNote}</span>
        </div>

        <div style={{
          display: 'flex',
          gap: 11,
          fontSize: 16,
          lineHeight: 1.4,
          padding: '11px 0',
          borderTop: '1px solid rgba(var(--ink),.1)'
        }}>
          <i class="ph-duotone ph-person-simple-walk" style={{ color: 'var(--brand)', fontSize: 19, flex: 'none' }}></i>
          <span><strong style={{ fontWeight: 600 }}>100 walk score</strong>, groceries and a playground inside half a mile</span>
        </div>
      </div>

      {sourceLines && (
        <div style={{ fontSize: 12.5, color: 'var(--color-neutral-700)', marginTop: 12, lineHeight: 1.45 }}>
          Written by Snaphomz AI from 8 comps, live rates and public records. Not an appraisal.
        </div>
      )}
    </div>
  );
}
