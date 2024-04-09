import { createStitches } from '@stitches/react'

export const {
  config,
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
} = createStitches({
  theme: {
    colors: {
      white: '#FFF',

      gray900: '#121214',
      gray800: '#202024',
      gray700: '#29292E',
      gray300: '#c4c4cc',
      gray100: '#e1e1e6',

      green500: '#04D361',
      green300: '#00b37e',
      purple500: '#8257E5',
    },

    fontSizes: {
      medium: '1.125rem',
      large: '1.25rem',
      xlarge: '1.5rem',
      '2xlarge': '2rem',
      },
   }
  }
)