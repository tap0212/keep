/**
 *
 * Overlay
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { indexes } from '../../themes/zIndex';
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  opacity: 0.9;
  transition: opacity 0.3s ease-in;
  z-index: ${indexes.MID_UPPER};
  ${(props) => props.color && `background-color: ${props.color};`}
`;
function Overlay({ close, color }) {
  return <Wrapper color={color} onClick={close} />;
}

Overlay.propTypes = {
  close: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired
};

export default memo(Overlay);
