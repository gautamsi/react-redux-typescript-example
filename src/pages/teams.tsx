import * as React from 'react'
import { connect } from 'react-redux'
import { Router } from '@reach/router'

import TeamsIndexPage from './teams/index'
import ShowTeamsPage from './teams/show'

import { ApplicationState, ConnectedReduxProps } from '../store'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  errors: string
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & ConnectedReduxProps

class TeamsPage extends React.Component<AllProps> {
  public render() {
    return (
      <Router>
        <TeamsIndexPage path="/" />
        <ShowTeamsPage path=":id" />
      </Router>
    )
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ teams }: ApplicationState) => ({
  loading: teams.loading,
  errors: teams.errors
})

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(mapStateToProps)(TeamsPage)
