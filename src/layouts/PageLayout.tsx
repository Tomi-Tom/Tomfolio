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
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', color: 'var(--color-gold-dim)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            &larr; Back
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
