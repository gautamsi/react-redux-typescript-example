// @ts-check

// Why does this file use the `.js` extension instead of `.tsx`? It's because Parcel only accepts an
// `index.js` file as an entry point. However, we can enable TS typechecking by adding the
// `@ts-check` comment at the beginning of our file.

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Main from './main'
import * as serviceWorker from './serviceWorker'

import 'typeface-ibm-plex-sans'
import './styles'
import { store, reachHistory }from './store'

ReactDOM.render(<Main store={store} history={reachHistory} />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
