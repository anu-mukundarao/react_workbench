import React from 'react';
import {
  MDBNavbar,
  MDBFooter
} from 'mdbreact';
import { BrowserRouter as Router} from 'react-router-dom';
import Routes from './Routes';
import mphasis_logo from './assets/mphasis_logo.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './app.css';

toast.configure();
function App () {
  // state = {
  //   collapseID: '',

  // };

  // toggleCollapse = collapseID => () =>
  //   this.setState(prevState => ({
  //     collapseID: prevState.collapseID !== collapseID ? collapseID : ''
  //   }));

  // closeCollapse = collID => () => {
  //   const { collapseID } = this.state;
  //   window.scrollTo(0, 0);
  //   collapseID === collID && this.setState({ collapseID: '' });
  // };

  // render() {
    // toast('hello');
    // const overlay = (
    //   <div
    //     id='sidenav-overlay'
    //     style={{ backgroundColor: 'transparent' }}
    //     onClick={this.toggleCollapse('mainNavbarCollapse')}
    //   />
    // );
    //const { collapseID } = this.state;
    
    return (
      <Router>
        <div className='flyout'>
          <MDBNavbar color='indigo' dark expand='md' fixed='top' scrolling>
          <img id="logo" src={mphasis_logo} alt="your logo" height="40px"/>
            {/* <MDBNavbarToggler
              onClick={this.toggleCollapse('mainNavbarCollapse')}
            /> */}
          </MDBNavbar>
          {/* {collapseID && overlay} */}
          <main className='mainImage'>
            <Routes />
          </main>
          <MDBFooter color='indigo'>
              <p className='footer-copyright mb-0 py-3 text-center'>
                &copy; {new Date().getFullYear()}
                <a href='https://www.mphasis.com'> Mphasis. </a> All rights reserved
            </p>
            </MDBFooter>
        </div>
      </Router>
    );
  // }
}

export default App;
