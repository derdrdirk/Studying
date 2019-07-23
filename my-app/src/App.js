import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import gql from 'graphql-tag'
import appSyncConfig from './AppSync'
import { ApolloProvider, graphql } from 'react-apollo'
import AWSAppSyncClient from 'aws-appsync'
import { Rehydrated } from 'aws-appsync-react'

const MutationCreateMeeting = gql(`
  mutation {
    createMeeting(
      companyId: "Company-abfack"
      meeting: {
        id: "Meeting-abfack"
        start: "start"
        end: "end"
        agreements: [{
          name: "Agreement 1"
        }]
      }
    ) {
      id
    }
  }
`)


class App extends Component {
  componentDidMount() {
    this.props.createMeeting()
      .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const client = new AWSAppSyncClient({
  url: appSyncConfig.graphqlEndpoint,
  region: appSyncConfig.region,
  auth: {
    type: appSyncConfig.authenticationType,
    apiKey:  appSyncConfig.apiKey,
  },
})

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <WithData />
    </Rehydrated>
  </ApolloProvider>
)

const WithData = graphql(
  MutationCreateMeeting,
  {
    props: (props) => ({
      createMeeting: () => props.mutate()
    })
  }
)(App)

export default WithProvider
