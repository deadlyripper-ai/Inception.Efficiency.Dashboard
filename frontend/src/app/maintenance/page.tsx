'use client'

export default function MaintenancePage() {
  return (
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
        <div
          style={{
            fontSize: '60px',
            marginBottom: '20px',
          }}
        >
          🛠️
        </div>

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
          We're performing scheduled maintenance on the dashboard. We'll be back
          online shortly.
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
  )
}
