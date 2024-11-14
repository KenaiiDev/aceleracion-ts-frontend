import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    // Es recomendable cambiar esto a false en producción
    ignoreDuringBuilds: false,
  },
}

export default nextConfig