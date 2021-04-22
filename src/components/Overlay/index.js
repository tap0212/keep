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
  background-color: #202124;
  opacity: 0.6;
  transition: opacity 0.218s ease-in;
  z-index: ${indexes.MID_UPPER};
`;
function Overlay({ close }) {
  return <Wrapper onClick={close} />;
}

Overlay.propTypes = {
  close: PropTypes.func.isRequired
};

export default memo(Overlay);
