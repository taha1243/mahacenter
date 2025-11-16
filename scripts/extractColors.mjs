import * as VibrantNamespace from 'node-vibrant'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const imgPath = path.resolve(__dirname, '../src/assets/clinic-logo.png')

try {
  const Vibrant = VibrantNamespace.default ?? VibrantNamespace
  const palette = await Vibrant.from(imgPath).getPalette()
  const result = Object.fromEntries(
    Object.entries(palette).map(([key, swatch]) => [
      key,
      swatch ? swatch.getHex() : null,
    ])
  )
  console.log(JSON.stringify(result, null, 2))
} catch (error) {
  console.error('Failed to extract palette:', error)
  process.exitCode = 1
}
