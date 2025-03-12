const tintColorLight = '#2f95dc'
const tintColorDark = '#fff'

export default {
  light: {
    text: '#000',
    text200: '#222',
    background: '#fff',
    background200: '#eee',
    background300: '#efefef',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    shadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    borderColor: '#ccc',
    transparent: 'transparent',
  },
  dark: {
    text: '#fff',
    text200: '#aaa',
    background: '#121212',
    background200: '#222',
    background300: '#bbb',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    shadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    borderColor: '#444',
    transparent: 'transparent',
  },
} as const
