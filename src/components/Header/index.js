/**
 *
 * Header
 *
 */

import React, { memo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { indexes } from '../../themes/zIndex';
import CrossIcon from '../../Images/cross.png';
import { colors, fonts, media } from '../../themes/index';

const Wrapper = styled.div`
  top: -1px;
  height: 3rem;
  padding: 1rem;
  display: flex;
  position: sticky;
  align-items: center;
  z-index: ${indexes.MID};
  position: -webkit-sticky;
  justify-content: space-between;
  box-shadow: 0 1px 2px -2px black;
  background-color: ${(props) => props.theme.primary};
`;

const HamburgerCover = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  cursor: pointer;
  border-radius: 50%;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  z-index: ${indexes.LOW};
`;
const HamburgerLine = styled.div`
  width: 50%;
  height: 0.25rem;
  margin: 0.125rem 0;
  border-radius: 0.125rem;
  background-color: ${colors.accent};
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
  width: 50%;
  height: 2.5rem;
  align-items: center;
  padding: 0rem 1rem;
  border-radius: 0.275rem;
  justify-content: space-between;
  background-color: ${(props) => props.theme.secondary};
`;
const Input = styled.input`
  border: none;
  width: 100%;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.secondary};
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
const Toggler = styled.button`
  border: 0;
  width: 4rem;
  height: 2rem;
  background: 0;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0);
  &:focus {
    outline: none;
  }
`;
const CustomSpan1 = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 4rem;
  height: 2rem;
  border-radius: 1.25rem;
  background-color: ${colors.off2};
  box-shadow: inset 1px 1px 3px 0 rgb(0 0 0 / 40%);
  transition: 0.3s;
  ${(props) =>
    props.isDarkModeActive &&
    `
    background-color: ${colors.off2};
    color: ${colors.secondaryDark};
  `}
`;
const CustomSpan2 = styled.span`
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  width: 1.5rem;
  height: 1.5rem;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 1px 1px 2px 0 rgb(0 0 0 / 40%);
  transition: 0.3s;
  ${(props) =>
    props.isDarkModeActive &&
    `
    left: 36px;
    background-color: ${colors.secondaryDark};
  `}
`;
function Header({
  search,
  searchQuery,
  toggleSideBar,
  toggleDarkMode,
  isDarkModeActive,
  currentRouteDetails
}) {
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
      <Toggler onClick={toggleDarkMode}>
        <CustomSpan1 isDarkModeActive={isDarkModeActive}></CustomSpan1>
        <CustomSpan2 isDarkModeActive={isDarkModeActive}></CustomSpan2>
      </Toggler>
    </Wrapper>
  );
}

Header.propTypes = {
  currentRouteDetails: PropTypes.object.isRequired,
  toggleSideBar: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
  isDarkModeActive: PropTypes.bool.isRequired
};

export default memo(Header);
