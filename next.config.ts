import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	// Disable PPR to fix Vercel deployment database connection issues
	experimental: {
		ppr: 'incremental'
	}
}

export default nextConfig
