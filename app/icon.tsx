import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#facc15', // yellow-400
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '3px solid #000',
          borderRadius: '4px',
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 900,
            color: '#000',
            fontFamily: 'system-ui, sans-serif',
            transform: 'rotate(-5deg)',
          }}
        >
          &
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}