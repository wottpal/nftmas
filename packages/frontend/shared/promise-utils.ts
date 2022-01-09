
/**
 * Helper that wraps async image-loading in a Promise.
 */
export const loadImg = (url: string) => new Promise<HTMLImageElement>(resolve => {
  const img = new Image()
  img.onload = () => resolve(img)
  img.src = url
})


/**
 * Helper that wraps `setTimeout` in a Promise.
 */
export const waitTime = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))