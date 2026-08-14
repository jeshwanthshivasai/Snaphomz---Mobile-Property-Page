import React, { useState, useRef } from 'react';
import './styles/app.css';

import { IOSDevice } from './components/IOSFrame';
import { HeaderNav } from './components/HeaderNav';
import { HeroGallery } from './components/HeroGallery';
import { PropertyQuickFacts } from './components/PropertyQuickFacts';
import { AIVerdict } from './components/AIVerdict';
import { DecisionSignals } from './components/DecisionSignals';
import { ValuationModels } from './components/ValuationModels';
import { HomeHighlights } from './components/HomeHighlights';
import { ReportsSection } from './components/ReportsSection';
import { ReportSheet } from './components/ReportSheet';
import { SimilarHomes } from './components/SimilarHomes';
import { TourModal } from './components/TourModal';
import { PreApprovalModal } from './components/PreApprovalModal';
import { AIChatDrawer } from './components/AIChatDrawer';
import { PhotoViewerModal } from './components/PhotoViewerModal';
import { DemoPanel } from './components/DemoPanel';
import { ToastNotification } from './components/ToastNotification';

const PMT = (p, r, n) => {
  const i = r / 1200;
  return i === 0 ? p / n : (p * i) / (1 - Math.pow(1 + i, -n));
};
const OTHER = { tax: 1654, hoa: 562, ins: 463, util: 290, pest: 55, maint: 1323 };
const money = n => '$' + Math.round(n).toLocaleString('en-US');

export default function App() {
  const [dark, setDark] = useState(false);
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);
  const [navSolid, setNavSolid] = useState(false);
  const [photo, setPhoto] = useState(0);
  const [signal, setSignal] = useState(0);

  const [price, setPrice] = useState(1588000);
  const [priceChanged, setPriceChanged] = useState(false);
  const [pending, setPending] = useState(false);
  const [alert, setAlert] = useState(null);

  const [saved, setSaved] = useState(false);
  const [savePrompt, setSavePrompt] = useState(false);
  const [share, setShare] = useState(false);
  const [chat, setChat] = useState(false);
  const [viewer, setViewer] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const [tourDone, setTourDone] = useState(false);
  const [preOpen, setPreOpen] = useState(false);
  const [sheet, setSheet] = useState(null);
  const [compare, setCompare] = useState([]);

  const [toast, setToast] = useState('');
  const [toastAction, setToastAction] = useState('');
  const [toastFn, setToastFn] = useState(null);
  const toastTimeoutRef = useRef(null);

  const [expHighlights, setExpHighlights] = useState(false);
  const [promo, setPromo] = useState(false);
  const [promoDone, setPromoDone] = useState(false);

  const [calcState, setCalcState] = useState({
    price: '1588000',
    down: '20',
    mode: '%',
    term: '30',
    rate: '6.69'
  });

  const [rvbState, setRvbState] = useState({
    type: 'W2 employee',
    income: '',
    debts: '',
    reserves: '',
    credit: ''
  });
  const [rvbSaved, setRvbSaved] = useState(null);
  const [rvbResume, setRvbResume] = useState(false);

  const flash = (msg, action, fn) => {
    setToast(msg);
    setToastAction(action || '');
    setToastFn(() => fn || null);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToast('');
    }, 4200);
  };

  const monthlyCalc = () => {
    return PMT(price * 0.8, 6.69, 360) + OTHER.tax + OTHER.hoa + OTHER.ins + OTHER.util + OTHER.pest + OTHER.maint;
  };
  const monthly = monthlyCalc();

  const handlePageScroll = e => {
    const y = e.target.scrollTop;
    if (!promoDone && y > 900) {
      setPromo(true);
      setPromoDone(true);
    }
    const solid = y > 250;
    if (solid !== navSolid) {
      setNavSolid(solid);
    }
  };

  const handleGalleryScroll = e => {
    const i = Math.round(e.target.scrollLeft / 390);
    if (i !== photo) setPhoto(i);
  };

  const handleSignalScroll = e => {
    const el = e.target;
    const k = el.children;
    const n = k.length;
    const pitch = k[1] ? k[1].offsetLeft - k[0].offsetLeft : 294;
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
    const i = atEnd ? n - 1 : Math.min(n - 1, Math.max(0, Math.round(el.scrollLeft / pitch)));
    if (i !== signal) setSignal(i);
  };

  const handlePriceDrop = () => {
    setPriceChanged(true);
    setPrice(1565000);
    setAlert({
      title: 'The price changed while you were reading',
      body: 'The seller dropped it $23,000 about a minute ago. Every number on this page still shows the old price until you refresh.',
      action: 'Use the new price'
    });
  };

  const handleGoPending = () => {
    setPending(true);
    setAlert({
      title: 'This home is now sale pending',
      body: 'The seller accepted an offer. Tours are paused, but roughly 1 in 8 pending sales falls through — we can watch it for you.',
      action: 'Notify me if it returns'
    });
  };

  const handleAcceptAlert = () => {
    setAlert(null);
    flash(pending ? 'Watching this listing. We’ll text you if it comes back.' : `Updated. Monthly cost is now ${money(monthly)}.`);
  };

  const handleToggleSave = () => {
    if (!saved) {
      setSavePrompt(true);
    } else {
      setSaved(false);
      flash('Removed from saved homes.');
    }
  };

  const handleToggleCompareItem = index => {
    if (compare.includes(index)) {
      setCompare(compare.filter(x => x !== index));
    } else {
      setCompare([...compare, index]);
    }
  };

  const costRows = [
    { k: 'Mortgage (P&I)', v: money(PMT(price * 0.8, 6.69, 360)) },
    { k: 'Property tax', v: money(OTHER.tax) },
    { k: 'HOA', v: money(OTHER.hoa) },
    { k: 'Home insurance', v: money(OTHER.ins) },
    { k: 'Utilities', v: money(OTHER.util) },
    { k: 'Pest control', v: money(OTHER.pest) },
    { k: 'Maintenance', v: money(OTHER.maint) }
  ];

  const nearby = [
    { name: 'Garudas Indian Mart', dist: '0.5 mi', icon: 'ph-duotone ph-shopping-cart' },
    { name: 'Meridian & Dentwood', dist: '0.4 mi', icon: 'ph-duotone ph-bus' },
    { name: 'De Anza Playground', dist: '0.4 mi', icon: 'ph-duotone ph-tree' },
    { name: 'Competitive EDGE', dist: '0.5 mi', icon: 'ph-duotone ph-first-aid-kit' },
    { name: 'Cambrian Park Plaza', dist: '0.6 mi', icon: 'ph-duotone ph-storefront' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-neutral-200)',
      padding: isPhoneFrame ? '46px 52px 90px' : '0',
      display: 'flex',
      gap: 46,
      alignItems: 'flex-start',
      justifyContent: 'center',
      fontFamily: 'var(--font-body)',
      color: 'var(--color-text)'
    }}>
      {/* Phone Container */}
      <div style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
        {/* Mode Switcher Tabs */}
        <div style={{ display: 'flex', gap: 5, padding: 4, borderRadius: 14, background: 'rgba(var(--ink),.06)' }}>
          <button
            onClick={() => setDark(false)}
            style={{
              padding: '6px 14px',
              borderRadius: 10,
              border: 'none',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
              background: !dark ? 'var(--seg-on)' : 'transparent',
              color: !dark ? 'var(--color-text)' : 'var(--color-neutral-700)',
              boxShadow: !dark ? '0 1px 3px rgba(var(--ink),.12)' : 'none'
            }}
          >
            Light
          </button>
          <button
            onClick={() => setDark(true)}
            style={{
              padding: '6px 14px',
              borderRadius: 10,
              border: 'none',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
              background: dark ? 'var(--seg-on)' : 'transparent',
              color: dark ? 'var(--color-text)' : 'var(--color-neutral-700)',
              boxShadow: dark ? '0 1px 3px rgba(var(--ink),.12)' : 'none'
            }}
          >
            Dark
          </button>
          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            style={{
              padding: '6px 14px',
              borderRadius: 10,
              border: 'none',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
              background: 'transparent',
              color: 'var(--brand)'
            }}
          >
            {isPhoneFrame ? 'Full Width' : 'Frame View'}
          </button>
        </div>

        {/* Main iPhone Device */}
        <IOSDevice width={390} height={844} dark={dark} isPhoneFrame={isPhoneFrame}>
          <div className={`app ${dark ? 'dark' : ''}`} style={{ height: '100%', position: 'relative', overflow: 'hidden', background: 'var(--color-neutral-300)', display: 'flex', flexDirection: 'column', color: 'var(--color-text)' }}>
            
            {/* Main Scrollable View */}
            <div className="nsb" onScroll={handlePageScroll} style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
              
              {/* Alert Banner */}
              {alert && (
                <div style={{ margin: '0 10px', padding: '104px 16px 16px', background: 'var(--color-accent-2-200)', borderRadius: '0 0 22px 22px', display: 'flex', gap: 11, alignItems: 'flex-start', animation: 'fadeIn .3s ease' }}>
                  <i class="ph-duotone ph-warning-circle" style={{ fontSize: 20, color: 'var(--color-accent-2-700)', marginTop: 2 }}></i>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-accent-2-800)', lineHeight: 1.3 }}>{alert.title}</div>
                    <div style={{ fontSize: 14, color: 'var(--color-accent-2-800)', lineHeight: 1.45, marginTop: 4 }}>{alert.body}</div>
                    <div style={{ display: 'flex', gap: 16, marginTop: 11, alignItems: 'center' }}>
                      <button onClick={handleAcceptAlert} style={{ minHeight: 44, border: 'none', background: 'none', padding: 0, color: 'var(--color-accent-2-700)', fontSize: 15, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                        {alert.action}
                      </button>
                      <button onClick={() => setAlert(null)} style={{ minHeight: 44, border: 'none', background: 'none', padding: 0, color: 'var(--color-accent-2-800)', fontSize: 15, cursor: 'pointer' }}>
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Hero Gallery */}
              <HeroGallery
                photo={photo}
                priceLabel={money(price)}
                priceChanged={priceChanged}
                pending={pending}
                onGalleryScroll={handleGalleryScroll}
                onOpenViewer={() => setViewer(true)}
              />

              {/* Quick Facts */}
              <PropertyQuickFacts />

              {/* AI Verdict */}
              <AIVerdict
                pending={pending}
                monthlyLabel={money(monthly)}
                monthlyNote={`${money(monthly - PMT(price * 0.8, 6.69, 360))} of that is tax, HOA and upkeep`}
              />

              {/* Decision Signals */}
              <DecisionSignals
                signal={signal}
                onSignalScroll={handleSignalScroll}
                monthlyLabel={money(monthly)}
                costRows={costRows}
                nearby={nearby}
                onOpenForecast={() => setSheet('forecast')}
                onOpenNeighborhood={() => setSheet('nbhd')}
              />

              {/* Valuation Models */}
              <ValuationModels />

              {/* Home Highlights */}
              <HomeHighlights
                expHighlights={expHighlights}
                onToggleHighlights={() => setExpHighlights(!expHighlights)}
              />

              {/* Reports Section */}
              <ReportsSection
                onOpenPre={() => setPreOpen(true)}
                onOpenSheet={id => {
                  setSheet(id);
                  if (id === 'rvb' && rvbSaved) setRvbResume(true);
                }}
                rvbSaved={rvbSaved}
              />

              {/* Similar Homes */}
              <SimilarHomes
                compare={compare}
                onToggleCompareItem={handleToggleCompareItem}
                onFlash={flash}
              />

              {/* Legal Disclaimer Footer */}
              <div style={{ margin: '22px 15px 0', paddingTop: 4 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-neutral-800)', marginBottom: 8 }}>
                  Where these numbers come from
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--color-neutral-800)', margin: 0, textWrap: 'pretty' }}>
                  Values, rents and forecasts are model estimates, not appraisals or offers. Rates are pulled live and change daily. Tax and sale history come from public records and can lag. Snaphomz is not a lender, broker or financial advisor.
                </p>
                <div style={{ fontSize: 13, color: 'var(--color-neutral-800)', marginTop: 10, fontFeatureSettings: "'tnum'" }}>
                  Listing updated 8/12/26 09:37 · MLS 10646119810
                </div>
              </div>

              <div style={{ height: 150 }}></div>
            </div>

            {/* Top Navigation */}
            <HeaderNav
              navSolid={navSolid}
              priceLabel={money(price)}
              saved={saved}
              onToggleSave={handleToggleSave}
              onOpenShare={() => setShare(true)}
            />

            {/* Bottom Bar Gradient */}
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 96, zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(to top,rgba(var(--paper),1) 26%,rgba(var(--paper),.86) 52%,rgba(var(--paper),0))' }} />

            {/* Floating CTA Bar */}
            <div style={{ position: 'absolute', left: 16, right: 16, bottom: 26, zIndex: 3, display: 'flex', gap: 9, alignItems: 'center', padding: 8, borderRadius: 32, background: 'rgba(var(--paper),.62)', backdropFilter: 'blur(28px) saturate(180%)', WebkitBackdropFilter: 'blur(28px) saturate(180%)', boxShadow: 'inset 0 .5px 0 rgba(255,255,255,.9),inset 0 -.5px 0 rgba(var(--ink),.06),0 8px 28px rgba(var(--ink),.14)' }}>
              <button onClick={() => setChat(true)} aria-label="Ask Snaphomz AI" style={{ width: 48, height: 48, flex: 'none', borderRadius: '50%', border: 'none', background: 'rgba(var(--brand-rgb),.1)', color: 'var(--brand)', fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i class="ph-duotone ph-sparkle"></i>
              </button>

              <button
                onClick={() => {
                  if (pending) {
                    flash('Tours are paused while this sale is pending.');
                  } else {
                    setTourOpen(true);
                  }
                }}
                disabled={false}
                style={{
                  flex: 1,
                  minHeight: 48,
                  borderRadius: 24,
                  fontSize: 17,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  border: 'none',
                  background: pending ? 'rgba(var(--ink),.08)' : 'var(--brand)',
                  color: pending ? 'var(--color-neutral-700)' : '#ffffff'
                }}
              >
                {pending ? 'Notify me if it returns' : tourDone ? 'Tour requested ✓' : 'Schedule a tour'}
              </button>
            </div>

            {/* Toast Notification */}
            <ToastNotification
              message={toast}
              actionText={toastAction}
              onAction={() => {
                if (toastFn) toastFn();
                setToast('');
              }}
            />

            {/* Slide-Up Report Sheet */}
            <ReportSheet
              sheetId={sheet}
              onCloseSheet={() => setSheet(null)}
              calcState={calcState}
              setCalcState={setCalcState}
              rvbState={rvbState}
              setRvbState={setRvbState}
              rvbSaved={rvbSaved}
              onResetRvb={() => {
                setRvbState({ type: 'W2 employee', income: '', debts: '', reserves: '', credit: '' });
                setRvbSaved(null);
                setRvbResume(false);
              }}
              onDismissResume={() => setRvbResume(false)}
              rvbResume={rvbResume}
              onFlash={flash}
            />

            {/* Photo Viewer Modal */}
            <PhotoViewerModal
              isOpen={viewer}
              onClose={() => setViewer(false)}
            />

            {/* Tour Booking Sheet */}
            <TourModal
              isOpen={tourOpen}
              onClose={() => setTourOpen(false)}
              onTourDone={() => {
                setTourDone(true);
                flash('Tour requested! A Snaphomz agent will confirm via text within 2 hours.');
              }}
            />

            {/* Pre-Approval Modal */}
            <PreApprovalModal
              isOpen={preOpen}
              onClose={() => setPreOpen(false)}
              onFlash={flash}
              priceLabel={money(price)}
            />

            {/* Ask AI Chat Drawer */}
            <AIChatDrawer
              isOpen={chat}
              onClose={() => setChat(false)}
            />

            {/* Save Listing Modal Prompt */}
            {savePrompt && (
              <div style={{ position: 'absolute', inset: 0, zIndex: 9, background: 'rgba(var(--ink),.32)', display: 'flex', alignItems: 'flex-end', animation: 'fadeIn .2s ease' }}>
                <div style={{ width: '100%', background: 'var(--color-bg)', borderRadius: '38px 38px 0 0', padding: '10px 18px 30px', boxShadow: '0 -12px 40px rgba(var(--ink),.22)', animation: 'sheetUp .34s cubic-bezier(.32,.72,0,1)' }}>
                  <div style={{ width: 36, height: 5, borderRadius: 999, background: 'rgba(var(--ink),.18)', margin: '0 auto 18px' }}></div>
                  <div style={{ fontSize: 25, fontWeight: 600, lineHeight: 1.2, letterSpacing: '-.015em' }}>Save this home to your account</div>
                  <p style={{ fontSize: 17, lineHeight: 1.55, color: 'rgba(var(--ink),.7)', margin: '9px 0 0', textWrap: 'pretty' }}>
                    An account lets us alert you when the price moves or the status changes. This listing is a week old and already below comps, so that matters here.
                  </p>
                  <button
                    onClick={() => {
                      setSaved(true);
                      setSavePrompt(false);
                      flash('Saved to your account.');
                    }}
                    style={{ marginTop: 20, width: '100%', minHeight: 54, borderRadius: 27, border: 'none', background: 'var(--brand)', color: '#ffffff', fontSize: 17, fontWeight: 600, cursor: 'pointer' }}
                  >
                    Continue with email
                  </button>
                  <button
                    onClick={() => {
                      setSaved(true);
                      setSavePrompt(false);
                      flash('Saved on this device.');
                    }}
                    style={{ marginTop: 10, width: '100%', minHeight: 54, borderRadius: 27, border: 'none', background: 'rgba(var(--ink),.07)', color: 'var(--color-text)', fontSize: 17, cursor: 'pointer' }}
                  >
                    Just save it on this device
                  </button>
                  <button onClick={() => setSavePrompt(false)} style={{ marginTop: 6, width: '100%', minHeight: 48, border: 'none', background: 'none', color: 'rgba(var(--ink),.55)', fontSize: 16, cursor: 'pointer' }}>
                    Not now
                  </button>
                </div>
              </div>
            )}

            {/* Share Modal */}
            {share && (
              <div style={{ position: 'absolute', inset: 0, zIndex: 9, background: 'rgba(var(--ink),.32)', display: 'flex', alignItems: 'flex-end', animation: 'fadeIn .2s ease' }}>
                <div style={{ width: '100%', background: 'var(--color-bg)', borderRadius: '38px 38px 0 0', padding: '10px 18px 30px', boxShadow: '0 -12px 40px rgba(var(--ink),.22)', animation: 'sheetUp .34s cubic-bezier(.32,.72,0,1)' }}>
                  <div style={{ width: 36, height: 5, borderRadius: 999, background: 'rgba(var(--ink),.18)', margin: '0 auto 18px' }}></div>
                  <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-.026em' }}>Share 5308 Gatewood Ln</div>
                  <div style={{ display: 'flex', gap: 11, marginTop: 18 }}>
                    {[
                      { label: 'Copy link', icon: 'ph-duotone ph-link' },
                      { label: 'Message', icon: 'ph-duotone ph-chat-circle' },
                      { label: 'Email', icon: 'ph-duotone ph-envelope' },
                      { label: 'My agent', icon: 'ph-duotone ph-user-circle' }
                    ].map((t, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setShare(false);
                          flash(t.label === 'Copy link' ? 'Link copied.' : `Shared via ${t.label.toLowerCase()}.`);
                        }}
                        style={{ flex: 1, minHeight: 82, borderRadius: 18, border: 'none', background: 'rgba(var(--ink),.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 7, cursor: 'pointer', fontSize: 13, color: 'rgba(var(--ink),.75)' }}
                      >
                        <i class={t.icon} style={{ fontSize: 24, color: 'var(--brand)' }}></i>
                        {t.label}
                      </button>
                    ))}
                  </div>
                  <div style={{ marginTop: 16, fontSize: 15, color: 'rgba(var(--ink),.6)', lineHeight: 1.55 }}>
                    Anyone with the link sees the listing and the public estimates. Your saved notes and pre-approval stay private.
                  </div>
                  <button onClick={() => setShare(false)} style={{ marginTop: 14, width: '100%', minHeight: 50, border: 'none', background: 'rgba(var(--ink),.07)', borderRadius: 25, color: 'var(--color-text)', fontSize: 17, cursor: 'pointer' }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Rebate Promo Banner */}
            {promo && (
              <div style={{ position: 'absolute', left: 16, right: 16, bottom: 92, zIndex: 6, borderRadius: 24, padding: 17, background: 'rgba(var(--paper),.82)', backdropFilter: 'blur(30px) saturate(180%)', WebkitBackdropFilter: 'blur(30px) saturate(180%)', boxShadow: 'inset 0 .5px 0 rgba(255,255,255,.9),0 12px 36px rgba(var(--ink),.2)', animation: 'popIn .3s cubic-bezier(.32,.72,0,1)' }}>
                <button onClick={() => setPromo(false)} aria-label="Dismiss" style={{ position: 'absolute', top: 9, right: 9, width: 36, height: 36, borderRadius: '50%', border: 'none', background: 'rgba(var(--ink),.07)', color: 'var(--color-neutral-700)', fontSize: 14, cursor: 'pointer' }}>
                  <i class="ph-duotone ph-x"></i>
                </button>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-accent-2-700)' }}>
                  Snaphomz offer
                </div>
                <div style={{ fontSize: 19, fontWeight: 600, marginTop: 6, lineHeight: 1.25, letterSpacing: '-.026em', paddingRight: 30 }}>
                  $1,200 back, and up to $25,000 in potential savings
                </div>
                <div style={{ fontSize: 15, color: 'rgba(var(--ink),.6)', lineHeight: 1.5, marginTop: 5 }}>
                  Buy with a Snaphomz agent and we rebate part of our commission at close.
                </div>
                <div style={{ display: 'flex', gap: 16, marginTop: 14, alignItems: 'center' }}>
                  <button onClick={() => setPromo(false)} style={{ minHeight: 46, padding: '0 20px', borderRadius: 23, border: 'none', background: 'var(--brand)', color: '#ffffff', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
                    See the terms
                  </button>
                  <button onClick={() => setPromo(false)} style={{ minHeight: 46, border: 'none', background: 'none', color: 'rgba(var(--ink),.55)', fontSize: 16, cursor: 'pointer' }}>
                    No thanks
                  </button>
                </div>
              </div>
            )}
          </div>
        </IOSDevice>
      </div>

      {/* Side Demo Trigger Panel */}
      {isPhoneFrame && (
        <DemoPanel
          onPriceDrop={handlePriceDrop}
          onGoPending={handleGoPending}
          onBreakCalc={() => {
            setCalcState({ ...calcState, price: '-1588000', down: '0' });
            setSheet('forecast');
          }}
          onAbandonRvb={() => {
            setRvbState({ ...rvbState, income: '240000', debts: '850' });
            setRvbSaved(2);
            setSheet(null);
          }}
          onSaveSignedOut={() => {
            setSaved(false);
            setSavePrompt(true);
          }}
          onResetAll={() => {
            setPrice(1588000);
            setPriceChanged(false);
            setPending(false);
            setAlert(null);
            setSaved(false);
            setRvbSaved(null);
            setRvbState({ type: 'W2 employee', income: '', debts: '', reserves: '', credit: '' });
            setCalcState({ price: '1588000', down: '20', mode: '%', term: '30', rate: '6.69' });
            setSheet(null);
            setCompare([]);
            setTourDone(false);
            setPromoDone(false);
            setPromo(false);
            setToast('');
            setTourOpen(false);
            setPreOpen(false);
            setChat(false);
            setViewer(false);
            setShare(false);
            setSavePrompt(false);
            setExpHighlights(false);
          }}
        />
      )}
    </div>
  );
}
