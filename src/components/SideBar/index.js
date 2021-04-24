/**
 *
 * SideBar
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../themes';
import { useHistory } from 'react-router';
import routeConstants from '../../routeConstants';
import { indexes } from '../../themes/zIndex';

const OptionIcon = styled.img`
  width: 1.5rem;
  margin: 0 0.5rem;
  position: relative;
  left: -25px;
  cursor: pointer;
  border-radius: 50%;
  padding: 0.75rem;
  transition: border 0.3s ease;
  border: 0.5px solid white;
  ${(props) =>
    props.selected &&
    `
  background-color: ${colors.accentDefault};
  border: 0.5px solid  ${colors.accent};
  `}
  &:hover {
    background-color: ${colors.accentDefault};
    border: 0.5px solid ${colors.accent};
  }
`;
const NavCont = styled.nav`
  top: 5rem;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  background-color: white;
  z-index: ${indexes.LOWEST};
  transition: all 0.3s ease;
  background-color: ${(props) => props.theme.secondary};
  ${(props) => props.width && `width: ${props.width}rem`}
`;
const Nav = styled.ul`
  color: white;
  list-style-type: none;
`;
const NavItemWrapper = styled.li`
  margin: 1rem 0;
`;
const NavItem = styled.div`
  color: #000;
  height: 3rem;
  display: flex;
  align-items: center;
  border-radius: 1.5rem;
  ${(props) => props.selected && `background-color: ${colors.accentDefault};`}
  ${(props) =>
    props.isSidebarActive &&
    `
  &:hover {
    background-color: ${colors.accentDefault};
    cursor: pointer;
  }
  &:hover ${OptionIcon} {
    border: 0.5px solid ${colors.accent};
    background-color: ${colors.accentDefault};
  }
  `}

  &:after {
    width: 100%;
    height: 100%;
    transition: all 0.75s ease;
  }
`;
function SideBar({ isSidebarActive, currentRouteDetails, sidebarRange }) {
  const history = useHistory();
  return (
    <NavCont width={isSidebarActive ? sidebarRange[1] : sidebarRange[0]}>
      <Nav>
        {Object.values(routeConstants).map((e, i) => {
          return (
            <NavItemWrapper
              onClick={() => {
                history.push(e.route);
              }}
              key={e.props.title}
              selected={e.props.title === currentRouteDetails.title}
            >
              <NavItem
                selected={
                  e.props.title === currentRouteDetails.title && isSidebarActive
                }
                isSidebarActive={isSidebarActive}
              >
                <OptionIcon
                  selected={e.props.title === currentRouteDetails.title}
                  src={e.props.icon}
                />
                <p>{e.props.title}</p>
              </NavItem>
            </NavItemWrapper>
          );
        })}
      </Nav>
    </NavCont>
  );
}

SideBar.propTypes = {
  isSidebarActive: PropTypes.bool.isRequired,
  currentRouteDetails: PropTypes.object.isRequired,
  sidebarRange: PropTypes.array.isRequired
};

export default memo(SideBar);
