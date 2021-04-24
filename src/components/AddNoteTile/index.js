/**
 *
 * AddNoteTile
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, media } from '../../themes';

const Tile = styled.div`
  width: 40%;
  height: 3rem;
  display: flex;
  margin: 2rem 0;
  cursor: pointer;
  align-items: center;
  padding: 0rem 0.5rem;
  color: ${colors.off3};
  border-radius: 0.5rem;
  border-width: 1px 1px 1px 6px;
  justify-content: space-between;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  background-color: ${(props) => props.theme.primary};
  border: 1px solid ${(props) => props.theme.secondary};
  ${media.largeDesktop.max(`
    width: 75%;
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
    </Tile>
  );
}

AddNoteTile.propTypes = {
  setIsExpanded: PropTypes.func.isRequired
};

export default memo(AddNoteTile);
