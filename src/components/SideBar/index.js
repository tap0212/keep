/**
 *
 * SideBar
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../themes';
import { menuOptions } from '../../utils/constants';
import { areEqual } from '../../utils';

const Wrapper = styled.div`
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
function SideBar({ selectedMenuOption, isSidebarActive, changeMenuOption }) {
  return (
    <Wrapper>
      {menuOptions.map((e, i) => (
        <OptionIcon
          onClick={() => {
            changeMenuOption(i);
          }}
          selected={selectedMenuOption === i}
          key={e.title}
          src={e.icon}
        />
      ))}
    </Wrapper>
  );
}

SideBar.propTypes = {
  selectedMenuOption: PropTypes.number.isRequired,
  isSidebarActive: PropTypes.bool.isRequired,
  changeMenuOption: PropTypes.func.isRequired
};

export default memo(SideBar, areEqual);
