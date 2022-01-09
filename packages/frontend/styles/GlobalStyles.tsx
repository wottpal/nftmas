import { Global } from '@emotion/react'
import 'nprogress/nprogress.css'
import React from 'react'
import tw, { css, GlobalStyles as BaseStyles } from 'twin.macro'

const customStyles = css`
  body {
    ${tw`antialiased bg-christred font-mono`}
    font-variant-ligatures: no-common-ligatures;
  }
  #__next {
    ${tw`min-h-screen h-screen relative flex flex-col`}
  }
  #nprogress > .bar {
    ${tw`bg-christwhite`}
  }
  #nprogress > .spinner {
    ${tw`hidden!`}
  }
  .pixel-img {
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }
`

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
)

export default GlobalStyles
