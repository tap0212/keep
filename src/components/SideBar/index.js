/**
 *
 * SideBar
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../themes';
import { areEqual } from '../../utils';
import { useHistory } from 'react-router';
import routeConstants from '../../routeConstants';

const Wrapper = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  padding-top: 6rem;
  height: 100vh;
  width: 6rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;
const OptionIcon = styled.img`
  width: 30%;
  cursor: pointer;
  margin: 1rem 0;
  border-radius: 50%;
  padding: 1rem;
  &:hover {
    background-color: ${colors.primary};
  }
  ${(props) => props.selected && `background-color: ${colors.primary};`}
`;
function SideBar({ isSidebarActive, currentRouteDetails }) {
  const history = useHistory();
  return (
    <Wrapper>
      {Object.values(routeConstants).map((e, i) => {
        return (
          <OptionIcon
            onClick={() => {
              history.push(e.route);
            }}
            selected={e.props.title === currentRouteDetails.title}
            key={e.props.title}
            src={e.props.icon}
          />
        );
      })}
    </Wrapper>
  );
}

SideBar.propTypes = {
  isSidebarActive: PropTypes.bool.isRequired,
  currentRouteDetails: PropTypes.object.isRequired
};

export default memo(SideBar, areEqual);
