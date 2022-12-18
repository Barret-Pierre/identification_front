import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  useQuery,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Signup } from "./components/Signup";
import { Signin } from "./components/Signin";
import { Dashboard } from "./components/Dashboard";
import { useEffect, useState } from "react";
import { IUser } from "./interfaces";
import { ME } from "./graphql/me";

function Main() {
  const [user, setUser] = useState<IUser | null | undefined>(undefined);

  const { data, refetch } = useQuery(ME);

  useEffect(() => {
    console.log("Got data:", data);
    if (data) {
      if (data.me) {
        setUser(data.me);
      } else {
        setUser(null);
      }
    }
  }, [data]);

  function onTokenChange(token?: string) {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    setUser(undefined);
    refetch();
  }

  return (
    <div style={{ padding: 16 }}>
      {user ? (
        <div>
          <Dashboard user={user} onTokenChange={onTokenChange} />
        </div>
      ) : user === null ? (
        <div>
          <Signup />
          <hr />
          <Signin onTokenChange={onTokenChange} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
