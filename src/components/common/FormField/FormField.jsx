import classNames from 'classnames';
import { useState, useEffect, useRef } from 'react';

import './FormField.css';

function FormField({ className, label, autofocus, ...props }) {
  const [focus, setFocus] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (autofocus) {
      ref.current.focus();
    }
  }, [autofocus]);

  return (
    <div
      className={classNames(
        'formField',
        { 'formField--focused:': focus },
        className
      )}
    >
      <label className="labelform">
        <span>{label}</span>
        <input
          className="formField-input"
          autoComplete="off"
          onFocus={() => setFocus(true)}
          ref={ref}
          {...props}
        ></input>
      </label>
    </div>
  );
}

export default FormField;
