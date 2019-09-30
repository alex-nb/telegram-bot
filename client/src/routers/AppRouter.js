import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Navbar from '../components/Navbar'
import ChatBots from '../components/ChatBots/ChatBots'
import ChatBot from '../components/ChatBots/ChatBot'
import Tests from '../components/Tests/Tests'
import Employees from '../components/Employees/Employees'
import NotFoundPage from '../components/NotFoundPage'
import WelcomeScreen from '../components/WelcomeScreen'


const AppRouter = () => (
  <Router>
    <div>
      <Navbar />
      <Switch>
        <Route path="/" component={WelcomeScreen} exact={true} />
        <Route path="/employees" component={Employees} />
        <Route path="/chatbots/:id" component={ChatBot} />
        <Route path="/chatbots" component={ChatBots} />
        <Route path="/tests" component={Tests} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;