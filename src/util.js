class Util {
  static appendFront0 (numStr) {
    if (numStr.length !== 2) {
      return '0' + numStr
    } else {
      return numStr
    }
  }

  static randomColor () {
    let letters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  static getColorStrFromCanvas (context, xIndex, yIndex) {
    let pixelData = context.getImageData(xIndex, yIndex, 1, 1).data
    return '#' + Util.appendFront0(pixelData[0].toString(16)) +
      Util.appendFront0(pixelData[1].toString(16)) +
      Util.appendFront0(pixelData[2].toString(16))
  }
}

export default Util
