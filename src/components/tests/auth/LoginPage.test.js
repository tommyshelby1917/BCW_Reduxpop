import { fireEvent, render } from '@testing-library/react';
import { LoginPage } from '../../auth/LoginPage/LoginPage';

describe('LoginPage', () => {
  test('snapshot', () => {
    const { container } = render(<LoginPage onLogin={() => {}} />);
    expect(container).toMatchSnapshot();
  });

  test('should call onLogin', () => {
    const onLogin = jest.fn().mockResolvedValue();
    const email = 'josep@josep.com';
    const password = '';
    const remember = false;

    const { getByLabelText, getByRole } = render(
      <LoginPage onLogin={onLogin} />
    );

    const emailField = getByLabelText(/Email/);
    const passwordField = getByLabelText(/Password/);
    const submitButton = getByRole('button');

    fireEvent.change(emailField, { target: { value: email } });
    fireEvent.change(passwordField, { target: { value: password } });

    fireEvent.click(submitButton);
    expect(onLogin).toHaveBeenCalledWith({ email, password, remember });
  });
});
