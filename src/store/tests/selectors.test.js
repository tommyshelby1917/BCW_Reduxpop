import { getIsLoading } from '../selectors';

import { defaultState } from '../reducers';

describe('selectors.js', () => {
  test('should return isLoading from UI state', () => {
    const expected = defaultState.ui.isLoading;
    const result = getIsLoading(defaultState);

    expect(result).toEqual(expected);
  });
});
