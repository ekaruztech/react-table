# @voomsway/react-table

> React table for voomsway web application

[![NPM](https://img.shields.io/npm/v/@voomsway/react-table.svg)](https://www.npmjs.com/package/@voomsway/react-table) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @voomsway/react-table
```

or

```bash
yarn add @voomsway/react-table
```

## Usage

```tsx
import React, { Component } from 'react'

import {DataTable} from '@voomsway/react-table'
import '@voomsway/react-table/dist/index.css'

class Example extends Component {
  render() {
    const columns = [
      {type: 'date', key: 'date of birth', dataIndex: 1, title: 'Date of Birth', presentationType: 'tag', presentationColor: 'geekblue'},
      {type: 'string', key: 'place of birth', dataIndex: 2, title: 'Place of Birth'},
      {type: 'currency', key: 'salary', dataIndex: 3, title: 'Monthly salary', presentationColor: 'gold'},
    ]
    return <DataTable columns={columns} dataSource={dataSource} />
  }
}
```

## License

MIT © [Ekaruztech](https://github.com/Ekaruztech)
