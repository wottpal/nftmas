import Image from 'next/image'
import twitterImg from 'public/icons/twitter.png'
import { FC } from 'react'
import tw from 'twin.macro'
import { EightBitBox } from './EightBitBox'

export interface TwitterEightBitButtonProps {
  tweetText: string
}
export const TwitterEightBitButton: FC<TwitterEightBitButtonProps> = ({ tweetText }: TwitterEightBitButtonProps) => {
  const tweetLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
  return <>
    <a href={tweetLink} target="_blank">
      <EightBitBox
        borderWidth={4} borderColor='#1f97cf' background='#27a8e1'
        css={[
          tw`h-[48px] relative flex items-center pr-3.5 outline-none select-none`,
          tw`font-mono font-black text-christwhite`,
          tw`hover:(-translate-y-1.5)`,
        ]}
      >
        <div tw="transform translate-x-[-8px] h-[64px] mr-1">
          <Image src={twitterImg} width={64} height={64} className='pixel-img' />
        </div>
        <span>Post on Twitter</span>
      </EightBitBox>
    </a>
  </>
}


export interface TwitterEightBitButtonAndPreviewProps {
  tweetText: string
  tweetTextPreview?: string
}
export const TwitterEightBitButtonAndPreview: FC<TwitterEightBitButtonAndPreviewProps> = ({ tweetText, tweetTextPreview, ...props }: TwitterEightBitButtonAndPreviewProps) => {
  return <>
    <div tw="flex flex-col justify-center items-center mt-4 mb-6" {...props}>
      <div tw="mb-8 font-sans font-semibold text-center max-w-prose text-christdarkgray"
        dangerouslySetInnerHTML={{ __html: tweetTextPreview || tweetText }} />
      <TwitterEightBitButton tweetText={tweetText} />
    </div>
  </>
}