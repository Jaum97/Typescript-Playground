/**
 * getRange - get an array of numbers inside the provided range 
 * @param n1 range's starting number (included)
 * @param n2 range's limit value (not included)
 * @param step by how much should the next value increase in range
 * @return an array containing numbers inside the range
 */

type getRange = (n1: number, n2: number, step: number) => Array<number>

const getRange: getRange = (n1, n2, step = 1) => {
  if (n1 > n2) return []

  const resp = []
  let [last, i] = [0, 0]

  while (last < n2 - 1) {
    last = n1 + (i * step)
    i++
    if (last < n2) resp.push(last)
  }

  return resp
}

const t = getRange(5, 100, 5)
