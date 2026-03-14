// src/components/Layout/StatusBar.tsx
export function StatusBar() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '36px',
        zIndex: 40,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 22px',
        gap: '16px',
      }}
    >
      <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-gold)', letterSpacing: '0.15em', textTransform: 'uppercase', marginRight: 'auto' }}>
        TBP.DEV
      </span>
      <span className="gold-pulse" style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--color-gold)', boxShadow: '0 0 6px var(--color-gold)', flexShrink: 0 }} />
      <span className="hud-caption">Available</span>
      <span className="hud-caption" style={{ opacity: 0.4 }}>Portfolio v4</span>
      <span className="hud-caption" style={{ opacity: 0.4 }}>2026</span>
    </div>
  )
}
