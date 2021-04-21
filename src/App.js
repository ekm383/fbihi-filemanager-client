import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// components
import Header from "./components/Header";
import Upload from "./components/Upload";
import Medicare from "./pages/Medicare";
import AlohaCare from "./pages/AlohaCare";
import HMSA from "./pages/HMSA";
import Humana from "./pages/Humana";
import HumanaBenefits from "./pages/HumanaBenefits";
import Kaiser from "./pages/Kaiser";
import UnitedHealthcare from "./pages/UnitedHealthcare";
import UnitedHealthcareBenefits from "./pages/UnitedHealthcareBenefits";
import Ohana from "./pages/Ohana";

const App = () => (
  <BrowserRouter>
    <div className='container'>
      <Header />
      <div className='main-content'>
        <Switch>
          <Route exact component={Upload} path='/' />
          <Route exact component={Medicare} path='/medicare' />
          <Route exact component={AlohaCare} path='/aloha-care' />
          <Route exact component={HMSA} path='/hmsa' />
          <Route exact component={Humana} path='/humana' />
          <Route exact component={HumanaBenefits} path='/humana-benefits' />
          <Route exact component={Kaiser} path='/kaiser' />
          <Route exact component={UnitedHealthcare} path='/united-healthcare' />
          <Route
            exact
            component={UnitedHealthcareBenefits}
            path='/united-healthcare-benefits'
          />
          <Route exact component={Ohana} path='/ohana' />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default App;
