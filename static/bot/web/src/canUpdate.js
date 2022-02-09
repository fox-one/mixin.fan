import isEqual from 'lodash.isequal';

export default function canUpdate(ref, state, keys) {
  let needUpdated = false;
  if (keys && keys.length > 0) {
    for (const key of keys) {
      if (!isEqual(ref.current[key], state[key])) {
        needUpdated = true;
        break;
      }
    }
  } else {
    needUpdated = isEqual(ref.current, state);
  }

  ref.current = state;

  return needUpdated;
}
