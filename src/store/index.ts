import { combineReducers, Dispatch, Action, AnyAction, createStore, applyMiddleware } from 'redux'
import { all, fork } from 'redux-saga/effects'

import { LayoutState, layoutReducer } from './layout'

import heroesSaga from './heroes/sagas'
import { heroesReducer } from './heroes/reducer'
import { HeroesState } from './heroes/types'
import teamsSaga from './teams/sagas'
import { TeamsState } from './teams/types'
import { teamsReducer } from './teams/reducer'

// We'll be using Redux Devtools. We can use the `composeWithDevTools()`
// directive so we can pass our middleware along with it
import { composeWithDevTools } from 'redux-devtools-extension'

import createSagaMiddleware from 'redux-saga'

import createHistory from 'history/createBrowserHistory'

import { createReduxHistoryContext, reachify } from 'redux-first-history'

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createHistory()
  //others options if needed
})

// The top-level state object
export interface ApplicationState {
  router: any
  layout: LayoutState
  heroes: HeroesState
  teams: TeamsState
}

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const rootReducer = combineReducers<ApplicationState>({
  router: routerReducer,
  layout: layoutReducer,
  heroes: heroesReducer,
  teams: teamsReducer
})

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
export function* rootSaga() {
  yield all([fork(heroesSaga), fork(teamsSaga)])
}

// create the composing function for our middlewares
const composeEnhancers = composeWithDevTools({})
// create the redux-saga middleware
const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(routerMiddleware, sagaMiddleware))
)

// Don't forget to run the root saga, and return the store object.
sagaMiddleware.run(rootSaga)

const history = createReduxHistory(store)
//if you use @reach/router
export const reachHistory = reachify(history)
