/**
 *
 * Header
 *
 */

import React, { memo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fonts, media } from '../../themes/index';
import { indexes } from '../../themes/zIndex';
import debounce from 'lodash/debounce';
import CrossIcon from '../../Images/cross.png';
const Wrapper = styled.div`
  height: 3rem;
  padding: 1rem;
  box-shadow: 0 1px 2px -2px black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: -webkit-sticky;
  position: sticky;
  top: -1px;
  z-index: ${indexes.MID};
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
  z-index: ${indexes.LOW};
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
  ${media.largeMobile.max(`
    ${fonts.size.big()};
  `)}
`;
const InputCover = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 1rem;
  height: 2.5rem;
  border-radius: 0.275rem;
  width: 50%;
  background-color: ${colors.primary};
`;
const Input = styled.input`
  border: none;
  background-color: ${colors.primary};
  color: ${colors.purple};
  &:focus {
    border: none;
    outline: none;
  }
`;
const Cross = styled.img`
  cursor: pointer;
  width: 2rem;
  border-radius: 50%;
  padding: 0.25rem;
`;
const SearchAndInputCover = styled.div`
  width: 90%;
  padding: 1rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${media.largeMobile.max(`
    padding: 0.25rem;
  `)}
`;
function Header({ currentRouteDetails, toggleSideBar, search, searchQuery }) {
  const debouncedSearch = debounce(search, 200);
  const searchInputEl = useRef(null);
  useEffect(() => {
    searchInputEl.current.value = searchQuery;
  }, [searchQuery]);
  const cancelSearch = () => {
    search('');
    searchInputEl.current.value = '';
  };
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
          <Input
            ref={searchInputEl}
            onChange={(e) => {
              debouncedSearch(e.target.value);
            }}
            type="text"
            placeholder="Search"
          />
          {searchQuery && <Cross src={CrossIcon} onClick={cancelSearch} />}
        </InputCover>
      </SearchAndInputCover>
    </Wrapper>
  );
}

Header.propTypes = {
  currentRouteDetails: PropTypes.object.isRequired,
  toggleSideBar: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired
};

export default memo(Header);
