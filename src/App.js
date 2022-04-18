import "./global.scss";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import NewUser from "./pages/newUser/NewUser";
import Single from "./pages/single/Single";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Login from "./pages/login/Login";
import { AuthContext } from "./context/AuthContext";
import ProductList from "./pages/productList/ProductList";
import NewProduct from "./pages/newProduct/NewProduct";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  const client = new ApolloClient({
    cache: new InMemoryCache(),
      uri: "http://localhost:9002/graphql",
      fetch,
  
  });

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <RequireAuth>
                  
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
              <Route
                path=":userId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewUser inputs={userInputs} title="Add New User" />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="products">
              <Route
                index
                element={
                  <RequireAuth>
                    <ProductList />
                  </RequireAuth>
                }
              />
              <Route
                path=":productId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewProduct
                      inputs={productInputs}
                      title="Add New Product"
                    />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
        </ApolloProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
