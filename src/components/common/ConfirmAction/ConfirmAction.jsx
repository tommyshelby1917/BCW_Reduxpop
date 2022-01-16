import Button from '../Button/Button';
import { Fragment, useEffect } from 'react';

import './ConfirmAction.css';
function ConfirmAction({ message, action, hide }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    disableScrolling();

    return () => enableScrolling();
  });

  function disableScrolling() {
    var x = window.scrollX;
    var y = window.scrollY;
    window.onscroll = function () {
      window.scrollTo(x, y);
    };
  }

  function enableScrolling() {
    window.onscroll = function () {};
  }

  return (
    <div className="main-container">
      <div className="confirm-action-container">
        <Fragment>
          <h2>{message}?</h2>
          <div className="confirm-buttons-container">
            <Button onClick={action}>Yes, Im sure!</Button>
            <Button onClick={hide}>No</Button>
          </div>
        </Fragment>
      </div>
    </div>
  );
}

export default ConfirmAction;
