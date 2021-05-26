import React from 'react';

/**
 * コンポーネントリストを入れ子にして連結したコンポーネントを返す
 * @param components
 * @returns {*|(function(...[*]): *)|(function(*): *)}
 */
export default (...components) => {
  if (components.length === 0) {
    return React.Fragment;
  }
  if (components.length === 1) {
    return components[0];
  }
  return components.reduce((A, B) => (props) => <A><B {...props} /></A>);
};
