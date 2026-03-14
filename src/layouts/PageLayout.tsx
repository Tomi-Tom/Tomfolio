// src/layouts/PageLayout.tsx
import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface PageLayoutProps {
  children: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-void-deep)' }}>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '48px',
          zIndex: 40,
          background: 'rgba(0,0,0,0.9)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          gap: '16px',
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', padding: '4px 12px', border: '1px solid var(--color-border-active)', borderRadius: '4px', transition: 'border-color 0.2s, background 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-gold)'; e.currentTarget.style.background = 'var(--color-gold-ghost)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-active)'; e.currentTarget.style.background = 'transparent' }}
        >
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: 'var(--color-gold)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
            &larr; Home
          </span>
        </Link>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-gold)', letterSpacing: '0.15em', textTransform: 'uppercase', marginLeft: 'auto' }}>
          TBP.DEV
        </span>
      </header>
      <main style={{ paddingTop: '48px' }}>
        {children}
      </main>
    </div>
  )
}
