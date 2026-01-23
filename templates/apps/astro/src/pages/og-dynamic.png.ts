import satori from 'satori'
import { html } from 'satori-html'
import sharp from 'sharp'

export async function GET() {
  const markup = html(`
    <div style="height: 100%; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: rgb(45,26,84); font-size: 32px; font-weight: 600;">
    </div>
  `)

  // eslint-disable-next-line no-undef
  const svg: string = await satori(markup as React.ReactNode, {
    width: 1200,
    height: 630,
    fonts: [],
  })

  const png = sharp(Buffer.from(svg)).png()
  const response = await png.toBuffer()

  return new Response(new Uint8Array(response), {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
