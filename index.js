/* @flow */
function remap(mapping, key) {
  if (!mapping) return key;
  var result = mapping[key];
  if (process.env.NODE_ENV === 'development') {
    console.error(`Key ${key} not found in className mapping:`, mapping);
  }
  return result;
}

function go(name, mods, mapping) {
  var baseName = remap(mapping, name);
  if (!mods) return baseName;
  var keys = Object.keys(mods);
  var n = keys.length + 1;
  var classNames = new Array(n);
  classNames[0] = baseName;
  var i;
  for (i = 1; i < n; i++) {
    var key = keys[i - 1];
    var value = mods[key];
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

/*::
type Elem = string;
type Mods = { [string]: string | boolean | void | null };
*/

module.exports =
  function (blockName/*: string*/, mapping/*: ?{ [string]: string } */) {
    return function (_1/*: ?(Elem | Mods) */, _2/*: ?Mods */) {
      return typeof _1 === 'string'
        ? go(blockName + '__' + _1, _2, mapping)
        : go(blockName, _1, mapping);
    }
  }
