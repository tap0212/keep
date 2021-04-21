import { createBrowserHistory } from 'history';
const baseUrl = process.env.NODE_ENV === 'production' ? '/keep' : '/';
const history = createBrowserHistory({ basename: baseUrl });
export default history;
