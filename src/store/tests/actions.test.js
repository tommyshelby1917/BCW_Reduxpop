import { authLoginRequest, authLogin } from '../actions';
import { AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS } from '../types';

describe('authLoginRequest', () => {
  test('should return AUTH_LOGIN_REQUEST', () => {
    const expectedResult = {
      type: AUTH_LOGIN_REQUEST,
    };
    const result = authLoginRequest();
    expect(result).toEqual(expectedResult);
  });
});

describe('authLogin', () => {
  const credentials = 'credentials';
  const action = authLogin(credentials);
  describe('when login api resolves', () => {
    const api = { auth: { login: jest.fn().mockResolvedValue() } };
    const dispatch = jest.fn();
    const getState = () => {};
    const history = {
      location: {},
      replace: jest.fn(),
    };

    test('should dispatch AUTH_LOGIN_REQUEST', () => {
      action(dispatch, getState, { api, history });
      expect(dispatch).toHaveBeenCalledWith({ type: AUTH_LOGIN_REQUEST });
    });

    test('should redirect to homepage', async () => {
      await action(dispatch, getState, { api, history });
      expect(history.replace).toHaveBeenCalledWith({ pathname: '/' });
    });
  });
});
