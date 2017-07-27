/* @flow */
const remap = (mapping, key) => {
  if (!mapping) return key;
  const result = mapping[key];
  if (process.env.NODE_ENV === 'development') {
    console.error(`Key ${key} not found in className mapping:`, mapping);
  }
  return result;
}

const go = (name, mods, mapping) => {
  const baseName = remap(mapping, name);
  if (!mods) return baseName;
  const keys = Object.keys(mods);
  const n = keys.length + 1;
  const classNames = new Array(n);
  classNames[0] = baseName;
  for (let i = 1; i < n; i++) {
    const key = keys[i];
    const value = mods[key];
    classNames[i] = remap(
      mapping,
      typeof value === 'string'
        ? [name, key, value].join('_')
        : value
          ? name + '_' + key
          : ''
    );
  }
  return classNames.join(' ');
};

type Elem = string;
type Mods = { [string]: string | boolean };

export default
  (blockName: string, mapping?: { [string]: string }) =>
  (_1?: Elem | Mods, _2?: Mods) =>
    typeof _1 === 'string'
      ? go(blockName + '__' + _1, _2, mapping)
      : go(blockName, _1, mapping);
