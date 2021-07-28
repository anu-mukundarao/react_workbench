import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/pro/sections/LoginHomePage/HomePage';
import LandingPage from './pages/pro/sections/LandingPage/LandingPage';
import MasterTable from './pages/pro/sections/AdminPage/MasterTablePage';
import AllBotsUserPage from './pages/pro/sections/UserPage/AllBotsUserPage';
import Details from './components/detailsPage/DetailPage';

function Routes () {
  // const {token, setToken} = useState([]);

  // useEffect(()=>[
  //  JSON.parse(localStorage.getItem("token"))
  // ])

  // if(token == null ){
  //  return <Route exact path='/' component={HomePage} />
  // }
  //   else  if(!token){
  //   return <Route
  //   render={function() {
  //     return <h1>Not Found</h1>;
  //   }}
  // />
  //   }
  //   else {
  //     return (
  //       <Switch>
  //       <Route exact path='/' component={HomePage} />
  //       <Route  path='/icons' component={LandingPage} />
  //       <Route  path='/master' component={MasterTable} />
  //       <Route  path='/botstore' component={AllBotsUserPage} />
  //       <Route  path='/detail' component={Details} />
  //     </Switch>
  //       );
   
  //   }
  // }

  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route  path='/icons' component={LandingPage} />
      <Route  path='/master' component={MasterTable} />
      <Route  path='/botstore' component={AllBotsUserPage} />
      <Route  path='/detail' component={Details} />
      <Route
        render={function() {
          return <h1>Not Found</h1>;
        }}
      />
    </Switch>
  );
      }
export default Routes;
