import client, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from '../../api/client';

import storage from '../../utils/storage';

export const login = (data) => {
  const credentials = { email: data.email, password: data.password };
  return client.post('api/auth/login', credentials).then(({ accessToken }) => {
    setAuthorizationHeader(accessToken);
    if (data.remember) {
      console.log('saving your token...', accessToken);
      storage.set('auth', accessToken);
    }
  });
};

export const logout = () =>
  Promise.resolve().then(() => {
    removeAuthorizationHeader();
    storage.remove('auth');
  });
