import * as colorUtil from './color-util'

function text(ctx, text, x: number, y: number, fontSize, fontColor: string) {
  ctx.font = '14px Arial'
  ctx.fillStyle = fontColor
  ctx.fillText(text, x, y)
}

export function uuid(): string {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  return s.join('')
}

function wrapText(
  context,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  fontColor: string
) {
  context.fillStyle = fontColor
  const words = text.split(' ')
  let line = ''
  for (let n = 0; n < words.length; n++) {
    let testLine = `${line + words[n]} `
    let metrics = context.measureText(testLine)
    let testWidth = metrics.width
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y)
      line = `${words[n]} `
      y += lineHeight
    } else {
      line = testLine
    }
  }
  context.fillText(line, x, y)
}

function roundRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: any,
  fill: boolean,
  stroke: boolean
): void {
  if (typeof stroke === 'undefined') {
    stroke = true
  }
  if (typeof radius === 'undefined') {
    radius = 5
  }
  if (typeof radius === 'number') {
    radius = { tl: radius, tr: radius, br: radius, bl: radius }
  } else {
    let defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 }
    for (let side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side]
    }
  }
  context.beginPath()
  context.moveTo(x + radius.tl, y)
  context.lineTo(x + width - radius.tr, y)
  context.quadraticCurveTo(x + width, y, x + width, y + radius.tr)
  context.lineTo(x + width, y + height - radius.br)
  context.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius.br,
    y + height
  )
  context.lineTo(x + radius.bl, y + height)
  context.quadraticCurveTo(x, y + height, x, y + height - radius.bl)
  context.lineTo(x, y + radius.tl)
  context.quadraticCurveTo(x, y, x + radius.tl, y)
  context.closePath()
  if (fill) {
    context.fill()
  }
  if (stroke) {
    context.stroke()
  }
}

export default {
  ...colorUtil,
  text,
  wrapText,
  roundRect
}
