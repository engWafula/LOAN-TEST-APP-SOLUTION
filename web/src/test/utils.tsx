import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

const createTestApolloClient = () => {
  return new ApolloClient({
    uri: 'http://localhost:2024/graphql',
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
      query: {
        errorPolicy: 'all',
      },
    },
  });
};

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  mocks?: MockedResponse[];
  useRealApollo?: boolean;
}

export const renderWithProviders = (
  ui: ReactElement,
  {
    mocks = [],
    useRealApollo = false,
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    if (useRealApollo) {
      const client = createTestApolloClient();
      return <ApolloProvider client={client}>{children}</ApolloProvider>;
    }

    return (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { renderWithProviders as render };

