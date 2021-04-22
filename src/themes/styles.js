import { css } from 'styled-components';

const row = () => css`
  display: flex;
  flex: 1;
  flex-direction: row;
`;
const column = () => css`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const configureFlex = (
  direction = 'row',
  justifyContent = 'center',
  alignItems = 'center',
  alignContent = 'center',
  flexBasis = 0,
  flexGrow = 1,
  flexShrink = 0
) => css`
  ${direction === 'row' ? row() : column()}
  flex-direction: ${direction};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  align-content: ${alignContent};
  flex-basis: ${flexBasis};
  flex-grow: ${flexGrow};
  flex-shrink: ${flexShrink};
`;

export default {
  row,
  column,
  configureFlex
};
