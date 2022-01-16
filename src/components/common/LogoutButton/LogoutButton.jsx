import './LogoutButton.css';

import { useState } from 'react';

import Button from '../Button/Button';
import ConfirmAction from '../ConfirmAction/ConfirmAction';

import { logout } from '../../../components/auth/service';

import { useDispatch } from 'react-redux';
import { authLogout } from '../../../store/actions';

function LogoutButton() {
  // const { handleLogout } = useContext(AuthContext);
  const dispatch = useDispatch();

  const [displayConfirmation, setDisplayConfirmation] = useState(null);
  // TODO: change this for the error from redux
  const [message, setMessage] = useState(null);

  const showDisplayConfirmation = () => {
    setMessage('Are you sure do you want to logout?');
    setDisplayConfirmation(true);
  };

  const hideConfirmationModal = () => {
    setDisplayConfirmation(false);
  };

  const handleLogout = () => {
    logout().then(() => {
      dispatch(authLogout());
    });
  };

  return (
    <div className="logout-button-container">
      <Button className="logout-button" onClick={showDisplayConfirmation}>
        Logout
      </Button>
      {displayConfirmation && (
        <ConfirmAction
          message={message}
          action={handleLogout}
          hide={hideConfirmationModal}
        />
      )}
    </div>
  );
}

export default LogoutButton;
