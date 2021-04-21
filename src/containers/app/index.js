import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import GlobalStyle from '../../global-styles';
import SideBar from '../../components/SideBar';
import { selectIsSidebarActive, selectMenuOption } from './selectors';
import { appCreators } from './reducer';

const App = ({
  selectedMenuOption,
  isSidebarActive,
  dispatchSelectMenuOption
}) => {
  return (
    <>
      <Header selectTab={selectedMenuOption} />
      <SideBar
        changeMenuOption={dispatchSelectMenuOption}
        isSidebarActive={isSidebarActive}
        selectedMenuOption={selectedMenuOption}
      />
      <GlobalStyle />
    </>
  );
};

App.propTypes = {
  selectedMenuOption: PropTypes.number,
  isSidebarActive: PropTypes.bool,
  dispatchSelectMenuOption: PropTypes.func
};
const mapStateToProps = createStructuredSelector({
  selectedMenuOption: selectMenuOption(),
  isSidebarActive: selectIsSidebarActive()
});
function mapDispatchToProps(dispatch) {
  return {
    dispatchSelectMenuOption: (index) =>
      dispatch(appCreators.selectMenuOption(index))
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(App);
