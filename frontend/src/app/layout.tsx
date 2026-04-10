import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Inception Efficiency Dashboard',
  description: 'Real-time business intelligence platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const maintenanceMode = process.env.MAINTENANCE_MODE === 'true'

  if (maintenanceMode) {
    return (
      <html lang="en">
        <body style={{ margin: 0, padding: 0, background: '#0d0d0d' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a2e 100%)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                padding: '40px',
                maxWidth: '500px',
              }}
            >
              <div style={{ fontSize: '60px', marginBottom: '20px' }}>🛠️</div>
              <h1
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  marginBottom: '10px',
                }}
              >
                Maintenance in Progress
              </h1>
              <p
                style={{
                  fontSize: '16px',
                  color: '#9898B0',
                  marginBottom: '30px',
                  lineHeight: '1.6',
                }}
              >
                We&apos;re performing scheduled maintenance on the dashboard. We&apos;ll be
                back online shortly.
              </p>
              <div
                style={{
                  padding: '20px',
                  background: 'rgba(98, 94, 233, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(98, 94, 233, 0.2)',
                  color: '#b1affa',
                  fontSize: '14px',
                }}
              >
                Thank you for your patience! ✨
              </div>
            </div>
          </div>
        </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50">{children}</body>
    </html>
  )
}
