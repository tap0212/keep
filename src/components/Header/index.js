/**
 *
 * Header
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fonts } from '../../themes/index';

const Wrapper = styled.div`
  height: 3rem;
  padding: 1rem;
  border-bottom: 1px solid ${colors.whiteSmoke};
  box-shadow: 0 1px 2px -2px black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: -webkit-sticky;
  position: sticky;
  top: -1px;
  background-color: white;
  z-index: 10;
`;
const HamburgerCover = styled.div`
  border-radius: 50%;
  height: 4rem;
  width: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 2;
  &:hover {
    background-color: ${colors.off1};
  }
`;
const HamburgerLine = styled.div`
  height: 0.25rem;
  width: 50%;
  margin: 0.125rem 0;
  border-radius: 0.125rem;
  background-color: ${colors.gray};
`;
const SelectedTab = styled.p`
  color: ${colors.gray};
  ${fonts.size.large()};
  ${fonts.weights.fontWeight(300)};
`;
const InputCover = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${colors.off2};
  padding: 0.5rem 1rem;
  border-radius: 0.275rem;
  width: 60%;
`;
const Input = styled.input`
  border: none;
  &:focus {
    border: none;
    outline: none;
  }
`;
const Cross = styled.p`
  cursor: pointer;
  border-radius: 50%;
  padding: 0.25rem;
  &:hover {
    background-color: ${colors.off1};
  }
`;
const SearchAndInputCover = styled.div`
  width: 90%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
function Header({ currentRouteDetails, toggleSideBar }) {
  return (
    <Wrapper>
      <HamburgerCover onClick={toggleSideBar}>
        <HamburgerLine />
        <HamburgerLine />
        <HamburgerLine />
      </HamburgerCover>
      <SearchAndInputCover>
        <SelectedTab>{currentRouteDetails.props.title}</SelectedTab>
        <InputCover>
          <Input type="text" placeholder="Search" />
          <Cross>X</Cross>
        </InputCover>
      </SearchAndInputCover>
    </Wrapper>
  );
}

Header.propTypes = {
  currentRouteDetails: PropTypes.object.isRequired,
  toggleSideBar: PropTypes.func.isRequired
};

export default memo(Header);
