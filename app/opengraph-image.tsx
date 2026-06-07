import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Meckella Luxe - Premium Fragrances'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0B0B0B',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontFamily: 'serif',
            color: '#EDEDED',
            fontStyle: 'italic',
            marginBottom: 20,
          }}
        >
          Meckella
        </div>
        <div
          style={{
            fontSize: 40,
            color: '#C9A96E',
            textTransform: 'uppercase',
            letterSpacing: '0.4em',
          }}
        >
          Luxe
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
