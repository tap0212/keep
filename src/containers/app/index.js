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
import styled from 'styled-components';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import GlobalStyle from '../../global-styles';
import SideBar from '../../components/SideBar';
import {
  selectIsSidebarActive,
  selectNotes,
  selectSearchQuery
} from './selectors';
import { appCreators } from './reducer';
import { getCurrentRouteDetails, trieSearch } from '../../utils';
const Wrapper = styled.div`
  ${(props) => props.paddingLeft && `padding-left: ${props.paddingLeft}rem;`}
  transition: padding-left 0.5s ease;
`;
const App = ({
  isSidebarActive,
  location,
  notes,
  searchedQuery,
  dispatchSetSearchResult,
  dispatchToggleSideBar
}) => {
  const currentRouteDetails = getCurrentRouteDetails(location);

  const handleSearch = (searchQuery) => {
    const searchResp =
      trieSearch(Object.values(notes), ['note', 'title'], searchQuery) ?? [];
    dispatchSetSearchResult({ searchResp, searchQuery });
  };
  const sidebarRange = [5, 15];
  return (
    <>
      <Header
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
    </>
  );
};

App.propTypes = {
  isSidebarActive: PropTypes.bool,
  location: PropTypes.object,
  notes: PropTypes.object,
  dispatchSetSearchResult: PropTypes.func,
  searchedQuery: PropTypes.string,
  dispatchToggleSideBar: PropTypes.func
};
const mapStateToProps = createStructuredSelector({
  isSidebarActive: selectIsSidebarActive(),
  notes: selectNotes(),
  searchedQuery: selectSearchQuery()
});
function mapDispatchToProps(dispatch) {
  return {
    dispatchSetSearchResult: (data) => dispatch(appCreators.searchResult(data)),
    dispatchToggleSideBar: () => dispatch(appCreators.toggleSidebar())
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withRouter)(App);
