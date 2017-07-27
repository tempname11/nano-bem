# nano-bem
A tiny library to generate BEM-style class names. Influenced by bem-cn: https://github.com/albburtsev/bem-cn.

## Example Usage
```jsx
import React from 'react';
import block from 'nano-bem';
import './index.css';

const b = block('my-block');

class MyBlock extends React.PureComponent {
  render() {
    return (
      <div className={b()}>
        I am ".my-block"
        <div className={b('top')>
          I am ".my-block__top"
        </div>
        <div className={b('bottom', { foo: true, bar: 'orange' })>
          I am ".my-block__bottom .my-block__bottom_foo .my-block__bottom_bar_orange"
        </div>
      </div>
    );
  }
}

```

With css-loader's "modules" setting (https://github.com/webpack-contrib/css-loader#modules):
```jsx
import React from 'react';
import block from 'nano-bem';
import css from './index.css';

const b = block('my-block', css);
// local class names will be mapped to unique identifiers
...
```
