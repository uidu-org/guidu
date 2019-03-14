import resetView from '../../resetView';

describe('resetView reducer', () => {
  const action = { type: 'RESET_VIEW' };

  it('should not change the state for an unknown action', () => {
    const otherAction = { type: 'SOME_OTHER_TYPE' };

    const stateBase: any = { a: 12, b: 'line' };
    const oldState = { ...stateBase };
    const newState = resetView(oldState, otherAction);

    expect(newState).toEqual(stateBase);
  });

  it('should not change uploads if they were empty', () => {
    const oldState: any = {
      uploads: {},
    };

    const newState = resetView(oldState, action);

    expect(newState.uploads).toEqual({});
  });

  it('should not drop upload with progress 0', () => {
    const oldState: any = {
      uploads: {
        'some-file-id': { progress: 0 },
      },
    };

    const newState = resetView(oldState, action);

    expect(newState.uploads).toEqual({
      'some-file-id': { progress: 0 },
    });
  });

  it('should drop upload with progress undefined', () => {
    const oldState: any = {
      uploads: {
        'some-file-id': {},
      },
    };

    const newState = resetView(oldState, action);

    expect(newState.uploads).toEqual({});
  });

  it('should leave only uncompleted uploads', () => {
    const oldState: any = {
      uploads: {
        'first-file-id': { progress: 1 },
        'second-file-id': { progress: 0.85 },
        'third-file-id': { progress: 0.15 },
      },
    };

    const newState = resetView(oldState, action);

    expect(newState.uploads).toEqual({
      'second-file-id': { progress: 0.85 },
      'third-file-id': { progress: 0.15 },
    });
  });

  it('should set empty selectedItems', () => {
    const oldState: any = {
      uploads: {},
      selectedItems: ['first', 'second'],
    };

    const newState = resetView(oldState, action);

    expect(newState.selectedItems).toEqual([]);
  });

  it('should preserve the unrelated state fields', () => {
    const stateData = {
      a: 12,
      b: 'some-string',
    };
    const oldState: any = {
      ...stateData,
      uploads: {},
    };

    const newState = resetView(oldState, action);

    expect(newState).toEqual(expect.objectContaining(stateData));
  });
});
