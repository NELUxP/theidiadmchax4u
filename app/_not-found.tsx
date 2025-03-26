import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="minecraft-ui-container w-full max-w-md">
        {/* Minecraft-style window header */}
        <div className="minecraft-header">
          <h1 className="minecraft-title">404 ERROR</h1>
          <div className="minecraft-window-controls">
            <div className="minecraft-btn red"></div>
            <div className="minecraft-btn yellow"></div>
            <div className="minecraft-btn green"></div>
          </div>
        </div>

        {/* Main content area */}
        <div className="minecraft-content-area text-center">
          <div className="minecraft-section">
            <h2 className="minecraft-section-title">
              <span className="minecraft-icon">⚠️</span>
              Page Not Found
            </h2>
            
            <p className="minecraft-text mb-6">
              The block you're looking for has been mined or never existed!
            </p>

            <div className="flex justify-center">
              <Link 
                href="/" 
                className="minecraft-download-btn flex items-center justify-center"
              >
                <span className="minecraft-cursor"></span>
                Return to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="minecraft-footer">
          <span>MCHAX4U v2.1.0</span>
          <span>© 2025 Minecraft PS4 Edition</span>
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-static';