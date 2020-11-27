import React, { FC } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ProductScreen from "./screens/ProductScreen/ProductScreen";
import CartScreen from "./screens/CartScreen/CartScreen";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            {/* NOTE
             * /cart/:id? means that id is optional
             */}
            <Route path="/cart/:id?" component={CartScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
