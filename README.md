## react-masonry

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![@nju33/react-masonry](https://img.shields.io/npm/v/@nju33/react-masonry.svg)](https://www.npmjs.com/package/@nju33/react-masonry)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Install

```bash
yarn add @nju33/react-masonry react react-dom styled-components
```

This library includes the `d.ts`.

## Demo

https://nju33.github.io/react-masonry/

## Sample Code

```ts
import React from 'react';
import {render} from 'react-dom';
import {Masonry} from '@nju33/react-masonry';

render(
  (
    <Masonry
      col={3} 
      gap={16} 
    >
      <div style={{width: '100%', height: '100px'}}>
        <Something />
      </div>
      <div style={{width: '100%', height: '100px'}}>
        <Something />
      </div>
      {/* ... */}
    </Masonry>
  ),
  document.body
)
```
