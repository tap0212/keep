/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { routeConfig } from '../../routeConfig';
import styled, { ThemeProvider } from 'styled-components';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import GlobalStyle from '../../global-styles';
import SideBar from '../../components/SideBar';
import {
  selectIsDarkModeActive,
  selectIsSidebarActive,
  selectNotes,
  selectSearchQuery
} from './selectors';
import { appCreators } from './reducer';
import {
  getCurrentRouteDetails,
  trieSearch,
  getPersistedData
} from '../../utils';
import { colors } from '../../themes';
const Wrapper = styled.div`
  ${(props) => props.paddingLeft && `padding-left: ${props.paddingLeft}rem;`}
  transition: background-color 0.3s,  padding-left 0.3s ease;
  min-height: 100vh;
  background-color: ${(props) => props.theme.secondary};
`;
const App = ({
  isSidebarActive,
  location,
  notes,
  searchedQuery,
  dispatchSetSearchResult,
  dispatchToggleSideBar,
  isDarkModeActive,
  dispatchToggleDarkMode
}) => {
  const currentRouteDetails = getCurrentRouteDetails(location);
  const handleSearch = (searchQuery) => {
    const searchResp =
      trieSearch(Object.values(notes), ['note', 'title'], searchQuery) ?? [];
    dispatchSetSearchResult({ searchResp, searchQuery });
  };
  const sidebarRange = [5, 15];
  return (
    <ThemeProvider
      theme={isDarkModeActive ? colors.theme.darkMode : colors.theme.lightMode}
    >
      <Header
        isDarkModeActive={isDarkModeActive}
        toggleDarkMode={dispatchToggleDarkMode}
        searchQuery={searchedQuery}
        search={handleSearch}
        toggleSideBar={dispatchToggleSideBar}
        currentRouteDetails={currentRouteDetails}
      />
      <SideBar
        sidebarRange={sidebarRange}
        isSidebarActive={isSidebarActive}
        currentRouteDetails={currentRouteDetails?.props}
      />
      <Switch>
        {Object.keys(routeConfig).map((routeKey, index) => {
          const Component = routeConfig[routeKey].component;
          return (
            <Route
              exact={routeConfig[routeKey].exact}
              key={index}
              path={routeConfig[routeKey].route}
              render={(props) => {
                const updatedProps = {
                  ...props,
                  ...routeConfig[routeKey].props
                };
                return (
                  <Wrapper
                    paddingLeft={
                      isSidebarActive ? sidebarRange[1] : sidebarRange[0]
                    }
                  >
                    <Component {...updatedProps} />
                  </Wrapper>
                );
              }}
            />
          );
        })}
      </Switch>
      <GlobalStyle />
    </ThemeProvider>
  );
};

App.propTypes = {
  isSidebarActive: PropTypes.bool,
  location: PropTypes.object,
  notes: PropTypes.object,
  dispatchSetSearchResult: PropTypes.func,
  searchedQuery: PropTypes.string,
  dispatchToggleSideBar: PropTypes.func,
  isDarkModeActive: PropTypes.bool,
  dispatchToggleDarkMode: PropTypes.func
};
const mapStateToProps = createStructuredSelector({
  isSidebarActive: selectIsSidebarActive(),
  notes: selectNotes(),
  searchedQuery: selectSearchQuery(),
  isDarkModeActive: selectIsDarkModeActive()
});
function mapDispatchToProps(dispatch) {
  return {
    dispatchSetSearchResult: (data) => dispatch(appCreators.searchResult(data)),
    dispatchToggleSideBar: () => dispatch(appCreators.toggleSidebar()),
    dispatchToggleDarkMode: () => dispatch(appCreators.toggleDarkMode())
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withRouter)(App);
