import './App.css';
import React, { Component } from 'react';
import NavBar from './Components/NavBar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

/*
Route Matching and Component Rendering
When a user clicks on one of the links in the navigation bar, the URL changes to the corresponding path.
 The Routes component in App.js listens for this URL change and matches it to one of the Route components.
  When a match is found, the Route component renders the News component with the appropriate props.

For example, if the user clicks on the "Business" link, the URL changes to /business. 
The Routes component matches this URL to the Route component with path="/business" and 
renders the News component with category="business".
*/ 

export default class App extends Component {

   pageSize = this.pageSize

  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<News key="general" heading="Top Headlines" pageSize={this.pageSize} country="in" category="general" />} />
            <Route path="/business" element={<News key="business" heading="Top Business Headlines" pageSize={this.pageSize} country="in" category="business" />} />
            <Route path="/entertainment" element={<News key="entertainment" heading="Top Entertainment Headlines" pageSize={this.pageSize} country="in" category="entertainment" />} />
            <Route path="/general" element={<News key="general" heading="Top General Headlines" pageSize={this.pageSize} country="in" category="general" />} />
            <Route path="/health" element={<News key="health" heading="Top  Health Headlines" pageSize={this.pageSize} country="in" category="health" />} />
            <Route path="/science" element={<News key="science" heading="Top Science Headlines" pageSize={this.pageSize} country="in" category="science" />} />
            <Route path="/sports" element={<News key="sports" heading="Top Sports Headlines" pageSize={this.pageSize} country="in" category="sports" />} />
            <Route path="/technology" element={<News key="technology" heading="Top Technology Headlines" pageSize={this.pageSize} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
