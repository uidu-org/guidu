// @flow

const toObject = keys =>
  keys.reduce((object, key) => {
    const o = object;
    o[key] = undefined;

    return object;
  }, {});

// Pick certain keys from an existing object
// Taken from https://github.com/facebook/flow/issues/3367#issuecomment-414503215
export type Pick<
  Origin: Object,
  Keys: $ReadOnlyArray<$Keys<Origin>>,
> = $ObjMapi<
  $Call<typeof toObject, Keys>,
  <Key>(k: Key) => $ElementType<Origin, Key>,
>;
