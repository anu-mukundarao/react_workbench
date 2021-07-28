import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Business from '../../../../components/business/Business';
import Categories from '../../../../components/categories/Categories';
import Applications from '../../../../components/applications/Applications';
import Bots from '../../../../components/bots/Bots';
import BotDetails from '../../../../components/bot-detail/BotDetails';
import mphasisLogo from '../../../../assets/mphasis_logo.png';
import Files from '../../../../components/Files';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBIcon,
  MDBSideNavItem,
  MDBSideNavCat,
  MDBSideNavNav,
  MDBSideNav,
  MDBContainer
} from 'mdbreact';

class MasterTable extends Component {
  state = {
    toggleStateA: false,
    breakWidth: 1300,
    windowWidth: 0,
    currentComponent: ''
  };

  componentDidMount = () => {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize);
  };

  handleResize = () =>
    this.setState({
      windowWidth: window.innerWidth
    });

  handleToggleClickA = () => {
    const { toggleStateA } = this.state;
    this.setState({
      toggleStateA: !toggleStateA
    });
  };

  handleClickfor = (comp)=>{
    // console.log(comp);
    this.setState({currentComponent:comp});
    }

  render() {
    const { breakWidth, toggleStateA, windowWidth } = this.state;
    const navStyle = {
      paddingLeft: windowWidth > breakWidth ? '210px' : '16px'
    };
    const mainStyle = {
      margin: '0 6%',
      paddingTop: '5.5rem',
      paddingLeft: windowWidth > breakWidth ? '240px' : '0'
    };

    return (
      <Router>
        <div className='fixed-sn light-blue-skin' >
        {/* <Link to='/'>
          <img id="logo" src={mphasisLogo} alt="your logo" height="50px"/>
          </Link> */}
          <MDBSideNav
            logo={mphasisLogo}
            triggerOpening={toggleStateA}
            breakWidth={breakWidth}
            bg='https://mdbootstrap.com/img/Photos/Others/sidenav1.jpg'
            mask='strong'
            fixed
          >
            <MDBSideNavNav>
              <MDBSideNavCat name='Asset' id='submit-blog-cat' icon='chevron-right'>
              <MDBSideNavItem onClick={() => this.handleClickfor('business')}>Business Process</MDBSideNavItem>
                <MDBSideNavItem onClick={() => this.handleClickfor('categories')}>Category</MDBSideNavItem>
                <MDBSideNavItem onClick={() => this.handleClickfor('applications')}>Applications</MDBSideNavItem>
              <MDBSideNavItem onClick={() => this.handleClickfor('bots')}>Bot Info Main</MDBSideNavItem>
                <MDBSideNavItem onClick={() => this.handleClickfor('botdet')}>Bot Details</MDBSideNavItem>
                <MDBSideNavItem onClick={() => this.handleClickfor('files')}>Artefacts</MDBSideNavItem>
              </MDBSideNavCat>
            </MDBSideNavNav>
          </MDBSideNav>

          <MDBNavbar style={navStyle} double expand='md' fixed='top' scrolling>
            <MDBNavbarNav left>
              <MDBNavItem>
                <div
                  onClick={this.handleToggleClickA}
                  key='sideNavToggleA'
                  style={{
                    lineHeight: '32px',
                    marginRight: '1em',
                    verticalAlign: 'middle'
                    }}
                >
                  <MDBIcon icon='bars' color='white' size='2x' />
                </div>
              </MDBNavItem>
              <MDBNavItem className='d-none d-md-inline' style={{ paddingTop: 5 }}>
              Asset Details Page
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBNavbar>


          <main style={mainStyle}>
            <MDBContainer fluid style={{ height: 1300 }} className='mt-5'>
            {this.state.currentComponent === 'business'  ? <Business></Business>   : null}
            {this.state.currentComponent === 'categories'  ? <Categories></Categories>   : null}
            {this.state.currentComponent === 'applications' ? <Applications></Applications> : null }
            {this.state.currentComponent === 'bots' ? <Bots></Bots> : null }
            {this.state.currentComponent === 'botdet' ? <BotDetails></BotDetails> : null }
            {this.state.currentComponent === 'files' ? <Files></Files> : null }
            </MDBContainer>
          </main>
        </div>
      </Router>
    );
  }
}

export default MasterTable;




