import React, { Component } from 'react';
import Business from '../../../../components/business/Business';
import Categories from '../../../../components/categories/Categories';
import Applications from '../../../../components/applications/Applications';
import Bots from '../../../../components/bots/Bots';
import BotDetails from '../../../../components/bot-detail/BotDetails';
import Files from '../../../../components/Files';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { tokenHandler } from '../../../../actions/authActions';

import {
  MDBTreeview,
  MDBTreeviewList,
  MDBTreeviewItem,
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBBtnGroup,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBDropdown,
  MDBDropdownMenu
} from 'mdbreact';

class MasterTable extends Component {
  state = {
    currentComponent: '',
    token: ''
  }

  handleClickfor = (comp) => {
    this.setState({ currentComponent: comp });
  }

  buttonHandler = (e) => {
    // this.setState({ token: e });
    const token = localStorage.getItem('token');
    const userData = {
      data: token
    }
    this.props.tokenHandler(userData);
    console.log(userData);
  }

  render() {
    const item = localStorage.getItem('token');
    return (
      <MDBContainer fluid>
        <MDBRow>
          <MDBCol md="3">
            <MDBTreeview
              theme='animated'
              header='Asset Details Page'
              className='border-secondary w-15 '
            // getValue={value => console.log(value)}
            >
              <MDBTreeviewList icon='gem' title='Section 1' opened far>
                <MDBTreeviewItem onClick={() => this.handleClickfor('bots')} title='Bots' />
                <MDBTreeviewItem onClick={() => this.handleClickfor('botdet')} title='Bot Details' far />
                <MDBTreeviewItem onClick={() => this.handleClickfor('files')} title='Artefacts' />
              </MDBTreeviewList>
              <MDBTreeviewList icon='folder-open' title='Section 2' opened far>
                <MDBTreeviewItem onClick={() => this.handleClickfor('business')} title='Business Process' />
                <MDBTreeviewItem onClick={() => this.handleClickfor('applications')} far title='Applications' opened />
                <MDBTreeviewItem onClick={() => this.handleClickfor('categories')} far title='Category' opened />
              </MDBTreeviewList>
            </MDBTreeview>
          </MDBCol>
          <MDBCol md="9">

            <div className="pull-right" style={{ float: "right" }}>
              <MDBBtnGroup>
                <MDBBtnGroup>
                  <MDBDropdown>
                    <MDBDropdownToggle caret color='info' className='h-100'>
                      Account
                </MDBDropdownToggle>
                    <MDBDropdownMenu basic color='info'>
                      <MDBDropdownItem>user</MDBDropdownItem>
                      <MDBDropdownItem onClick={() => this.buttonHandler(item)}>logout</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBBtnGroup>
              </MDBBtnGroup>
            </div>

            <MDBContainer fluid className='mt-5'>
              {this.state.currentComponent === 'business' ? <Business></Business> : null}
              {this.state.currentComponent === 'categories' ? <Categories></Categories> : null}
              {this.state.currentComponent === 'applications' ? <Applications></Applications> : null}
              {this.state.currentComponent === 'bots' ? <Bots></Bots> : null}
              {this.state.currentComponent === 'botdet' ? <BotDetails></BotDetails> : null}
              {this.state.currentComponent === 'files' ? <Files></Files> : null}
            </MDBContainer>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    
    )
  }
}

MasterTable.propTypes = {
  tokenHandler: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { tokenHandler }
)(withRouter(MasterTable));


