import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from './router/router'
import './app.css'

class App extends Component {
  constructor () {
    super()
    this.state = {
    }
  }
  
  render() {
    return (
      <Router>
        <div className="container"> 
          <div className="siderBar">
            <ul>
              <li className="siderBar_btn"><Link to={{
                  pathname: '/',
                  state: 'index'
              }}>机蜜首页</Link></li>
              <li className="siderBar_btn"><Link to="/goods">商品专区</Link></li>
              <li className="siderBar_btn"><Link to="/detail">商品详情</Link></li>
              <li className="siderBar_btn"><Link to="/active">机蜜活动</Link></li>
            </ul>
          </div>
          
          <div className="content">
            <h1 className="title">机蜜解码器1.0</h1>  
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
            <div className="footer"><img src={require('./assets/logo.png')} /></div>
          </div>
        </div>
      </Router>
    )
  }

}

export default App;
