/**
 *
 * AddNoteTile
 *
 */

import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { colors, media } from '../../themes';
import PlusIcon from '../../Images/plus.svg';

const Tile = styled.div`
  border: 1px solid ${colors.off1};
  width: 40%;
  margin: 2rem 0;
  padding: 0rem 0.5rem;
  color: ${colors.off3};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.5rem;
  border-width: 1px 1px 1px 6px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  ${media.largeDesktop.max(`
    width: 75%;
  `)}
`;
const StyledIcon = styled.img`
  width: 10%;
  border-radius: 50%;
  ${media.largeDesktop.max(`
   width: 25%;
  `)}
`;
function AddNoteTile({ setIsExpanded }) {
  return (
    <Tile
      onClick={() => {
        setIsExpanded(true);
      }}
    >
      <p>Take a note...</p>
      <StyledIcon src={PlusIcon} />
    </Tile>
  );
}

AddNoteTile.propTypes = {
  setIsExpanded: PropTypes.func.isRequired
};

export default memo(AddNoteTile);
