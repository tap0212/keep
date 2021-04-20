import { createBrowserHistory } from 'history';
const baseUrl = process.env.NODE_ENV === 'production' ? '/pong-keeper' : '/';
const history = createBrowserHistory({ basename: baseUrl });
export default history;
