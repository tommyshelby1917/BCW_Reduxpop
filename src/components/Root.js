import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'connected-react-router';

// in this way we wrap the entire application so that it can benefit from the store
const Root = ({ children, store, history }) => {
  return (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );
};

export default Root;
