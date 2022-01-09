
/**
 * Generates cryptographically safe float
 * Source: https://stackoverflow.com/a/34577886/1381666
 */
export const getRandomFloat = (): number => {
  // A buffer with just the right size to convert to Float64
  let buffer = new ArrayBuffer(8)

  // View it as an Int8Array and fill it with 8 random ints
  let ints = new Int8Array(buffer)
  crypto.getRandomValues(ints)

  // Set the sign (ints[7][7]) to 0 and the
  // exponent (ints[7][6]-[6][5]) to just the right size 
  // (all ones except for the highest bit)
  ints[7] = 63
  ints[6] |= 0xf0

  // Now view it as a Float64Array, and read the one float from it
  let float = new DataView(buffer).getFloat64(0, true) - 1
  return float
}