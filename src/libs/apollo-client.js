/* eslint-disable array-callback-return */
/* eslint-disable no-alert */
import { InMemoryCache } from 'apollo-boost';
import { ApolloClient, split, HttpLink } from '@apollo/client';
// import { split, HttpLink } from 'apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const link = new HttpLink({ uri: 'http://localhost:3000/graphql' });

const authLink = setContext((_, { headers }) => {
  // get the authentication token if it's exists

  const token = localStorage.getItem('token');
  // eslint-disable-next-line no-console
  // console.log('token', token);
  // return the headers to the context so httplink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
    },
  };
});
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3000/graphql',
  options: {
    reconnect: true,
  },
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
    && definition.operation === 'subscription'
    );
  },
  wsLink,
  link,
);

const Apolloclient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(splitLink),
});

export default Apolloclient;
