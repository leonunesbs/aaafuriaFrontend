import { theme, DefaultTheme } from '@chakra-ui/core';

const customTheme: DefaultTheme = {
    ...theme,
    fonts: {
        body: 'Lato, system-ui, sans-serif',
        heading: 'Lato, system-ui, sans-serif',
        mono: 'Menlo, monospace'
    },
    fontWeights: {
        ...theme.fontWeights,
        thin: 300,
        normal: 400,
        bold: 700
    },
    radii: {
        ...theme.radii,
        sm: '4px',
        md: '8px',
    },
    fontSizes: {
        ...theme.fontSizes,
        '2xl': '34px',
        '3xl': '54px'
    },
    colors: {
        ...theme.colors,
        green: {
            ...theme.colors.green,
            300: '#9aca3c',
            600: '#14783c',
        },
        gray: {
            ...theme.colors.gray,
            300: '#c2bea7',
            500: '#4a4d4d',
            700: '#202024',
            900: '#888888',
        }
    }
}

export default customTheme;