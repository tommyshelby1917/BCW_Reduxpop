import { AUTH_LOGIN_SUCCESS } from '../types';
import { auth } from '../reducers';
import { defaultState } from '../reducers';

describe('reducers', () => {
  describe('reducer of auth', () => {
    test('should execute AUTH_LOGIN_SUCCES action', () => {
      const action = {
        type: AUTH_LOGIN_SUCCESS,
      };
      expect(auth(defaultState, action)).toBe(true);
    });
  });
});
