import baseStyled, { ThemedStyledInterface } from 'styled-components';

export const theme = {
  primary: 'orange',
  secondary: '',
  warning: '#FAC661',
  error: '#F47961',
  background: '#ddd',
  backgroundAccent: '',
  text: '#000',
  textAccent: '#5f5f5f',
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
