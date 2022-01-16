import { Redirect, Route } from 'react-router';
import { connect } from 'react-redux';
import { getIsLogged } from '../../store/selectors';

const PrivateRoute = ({ isLogged, ...props }) => {
  return isLogged ? (
    <Route {...props} />
  ) : (
    <Route>
      {({ location }) => (
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      )}
    </Route>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isLogged: getIsLogged(state),
  };
};

const ConnectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);

export default ConnectedPrivateRoute;
