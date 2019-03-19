export function randomColor() {
  let letters = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f'
  ]
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function appendFront0(numStr: string): string {
  if (numStr.length !== 2) {
    return '0' + numStr
  } else {
    return numStr
  }
}

export function getColorStrFromCanvas(
  context: any,
  xIndex: number,
  yIndex: number
): string {
  let pixelData = context.getImageData(xIndex, yIndex, 1, 1).data
  return (
    '#' +
    appendFront0(pixelData[0].toString(16)) +
    appendFront0(pixelData[1].toString(16)) +
    appendFront0(pixelData[2].toString(16))
  )
}
