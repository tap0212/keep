import routeConstants from '../routeConstants';
import get from 'lodash/get';
import find from 'lodash/find';

export function areEqual(prevProps, nextProps) {
  return prevProps === nextProps;
}

export const getCurrentRouteDetails = (location) => {
  if (!get(location, 'pathname')) {
    return null;
  }
  const route = find(
    Object.keys(routeConstants),
    (key) =>
      routeConstants[key].route === location.pathname ||
      `${routeConstants[key].route}/` === location.pathname
  );
  if (route) {
    return routeConstants[route];
  }
  return null;
};
