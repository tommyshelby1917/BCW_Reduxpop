import { fireEvent, render } from '@testing-library/react';
import { LoginPage } from '../../auth/LoginPage/LoginPage';

describe('LoginPage', () => {
  test('snapshot', () => {
    const { container } = render(<LoginPage onLogin={() => {}} />);
    expect(container).toMatchSnapshot();
  });

  test('should call onLogin', async () => {
    const onLogin = jest.fn().mockResolvedValue();
    const email = 'example@example.com';
    const password = '1234';
    const remember = true;

    const { getByLabelText, getByRole } = render(
      <LoginPage onLogin={onLogin} />
    );

    const emailField = getByLabelText(/Email/);
    const passwordField = getByLabelText(/Password/);
    const rememberField = getByLabelText(/Remember/);
    const submitButton = getByRole('button');

    fireEvent.change(passwordField, { target: { value: password } });
    fireEvent.change(emailField, { target: { value: email } });
    fireEvent.click(rememberField, { target: { value: remember } });

    fireEvent.click(submitButton);

    expect(onLogin).toHaveBeenCalledWith({ email, password, remember });
  });
});
