import routeConstants from '../routeConstants';
import get from 'lodash/get';
import find from 'lodash/find';
import TrieSearch from 'trie-search';
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
/**
 * Do a global search
 * @author tap0212
 * @param {array} array
 * @param {array} keys
 * @param {string} searchQuery
 * @returns {array}
 */
export const trieSearch = (array, keys, searchQuery) => {
  const ts = new TrieSearch(keys);
  ts.addAll(array);
  return ts.get(searchQuery);
};
