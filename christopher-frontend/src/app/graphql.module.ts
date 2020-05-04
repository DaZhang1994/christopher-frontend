import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, from } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';

const uri = 'http://localhost:3000/graphql'; // <-- add the URL of the GraphQL server here

const httpLink = createHttpLink({ uri: uri });

// Setup the header for the request
const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');

  const authorizationHeader = token ? `Bearer ${token}` : null;
  operation.setContext({
    headers: {
      authorization: authorizationHeader,
    },
  });
  return forward(operation);
});

//After the backend responds, we take the refreshToken from headers if it exists, and save it in the cookie.
const tokenLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;

    if (headers) {
      const authorization = headers.get('authorization');

      let refreshToken = null;
      if (authorization) {
        refreshToken = authorization.replace('Bearer ', '');
      }

      if (refreshToken) {
        localStorage.setItem('token', refreshToken);
      }
    }

    return response;
  });
});

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: () => {
        return {
          cache: new InMemoryCache(),
          link: from([authLink, tokenLink, httpLink]),
        };
      },
    },
  ],
})
export class GraphQLModule {}
