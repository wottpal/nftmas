import { FC } from 'react'
import 'twin.macro'
import tw, { styled, theme } from 'twin.macro'


interface EightBitBoxProps {
  background?: string
  borderColor?: string
  borderWidth?: number
}
export const EightBitBox = styled.div(({ background, borderColor, borderWidth }: EightBitBoxProps) => [
  tw`block relative z-10 text-christblack`,
  `
  border-left-width: ${borderWidth ?? 8}px;
  border-right-width: ${borderWidth ?? 8}px;
  border-color: ${borderColor || theme`colors.christblack`}
  `,
  `&:after {
    content: "";
    display: block;
    top: -${borderWidth ?? 8}px;
    bottom: -${borderWidth ?? 8}px;
    left: 0;
    right: 0;
    background: ${borderColor || theme`colors.christblack`};
    position: absolute;
    z-index: -10;
  }`,
  `&:before {
    content: "";
    display: block;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${background || theme`colors.christsand`};
    position: absolute;
    z-index: -5;
  }`,
  `&, &:after {
    box-shadow: 0 ${borderWidth ?? 8}px 0 0 rgba(0,0,0,.2);
  }`,
])


export interface EightBitBoxTabButtonProps {
  selected?: boolean
}
export const EightBitBoxTabButton: FC<EightBitBoxTabButtonProps> = ({ selected, children }) => <>
  <EightBitBox
    css={[
      tw`text-center px-4 py-3 font-mono text-christblack outline-none select-none`,
      !selected && tw`hover:(-translate-y-1.5)`,
      selected ? tw`font-black` : tw`font-normal`,
    ]}
    background={selected ? theme`colors.christyello` : undefined}
  >
    {children}
  </EightBitBox>
</>