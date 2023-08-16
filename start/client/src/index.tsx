import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  gql,
  useQuery,
} from "@apollo/client";
import { cache } from "./cache";
import ReactDOM from "react-dom/client";
import Pages from "./pages";
import injectStyles from "./styles";
import Login from "./pages/login";

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]
  }
`;

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  console.log("data from IS_LOGGED_IN", data);
  return data.isLoggedIn ? <Pages /> : <Login />;
}

// Initialize ApolloClient
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  // uri: "http://localhost:4999/graphql",
  uri: "https://getting-started-apollo-server-9c01bc1d6f87.herokuapp.com/graphql",
  headers: {
    authorization: localStorage.getItem("token") || "",
  },
  typeDefs,
});

injectStyles();

// Find our rootElement or throw an error if it doesn't exist
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");
const root = ReactDOM.createRoot(rootElement);

//  Pass the ApolloClient instance to the ApolloProvider component
root.render(
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>
);
