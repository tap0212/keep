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
import { selectIsSidebarActive } from './selectors';
import { appCreators } from './reducer';
import { getCurrentRouteDetails } from '../../utils';
const Wrapper = styled.div`
  padding-left: 6rem;
`;
const App = ({ isSidebarActive, location }) => {
  const currentRouteDetails = getCurrentRouteDetails(location);
  const toggleSideBar = () => {
    console.log('toggleSideBar');
  };
  return (
    <>
      <Header
        toggleSideBar={toggleSideBar}
        currentRouteDetails={currentRouteDetails}
      />
      <SideBar
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
                  <Wrapper>
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
  location: PropTypes.object
};
const mapStateToProps = createStructuredSelector({
  isSidebarActive: selectIsSidebarActive()
});
function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withRouter)(App);
