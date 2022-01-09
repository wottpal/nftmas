import { CSSProperties, FC, useCallback, useEffect, useRef } from 'react'
import ReactCanvasConfetti from 'react-canvas-confetti'
import 'twin.macro'

export const GiftNftTabConfetti: FC = () => {
  const confettiAnimationRef = useRef(null)
  const getconfettiAnimationInstance = useCallback((instance) => {
    confettiAnimationRef.current = instance
  }, [])
  const confettiAnimationOptions: CSSProperties = {
    position: 'absolute',
    pointerEvents: 'none',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0
  }
  const makeShot = useCallback((particleRatio, opts) => {
    (confettiAnimationRef?.current as any)?.({
      ...opts,
      origin: { y: 0.5 },
      particleCount: Math.floor(200 * particleRatio)
    })
  }, [])
  const fire = useCallback(() => {
    makeShot(.6, {
      spread: 200,
      decay: 0.75,
      scalar: 1,
    })
  }, [makeShot])

  useEffect(() => {
    fire()
  }, [])

  return <>
    <ReactCanvasConfetti
      refConfetti={getconfettiAnimationInstance} style={confettiAnimationOptions} />
  </>
}