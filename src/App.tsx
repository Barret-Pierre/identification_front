import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Signup } from "./components/Signup";

function Main() {
  return (
    <div>
      <Signup />
    </div>
  );
}

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
}

export default App;
