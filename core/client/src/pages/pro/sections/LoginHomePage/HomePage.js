import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
import {
  MDBMask,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBAnimation,
  MDBSelect 
} from 'mdbreact';
import './HomePage.css';
import { Link } from 'react-router-dom'
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
//import { SigninUser } from '../../../../actions/authActions';
import { RegisterUser, SigninUser, UpdatePass } from '../../../../actions/authActions';

const myHeaders =
{
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
}

class HomePage extends React.Component {
  state = {
    collapseID: '',
    nameReg: '',
    emailReg: '',
    passwordReg: '',
    emailSign: '',
    passwordSign: '',
    passwordForget: '',
    EmailForget: '',
    EmailforgetError: '',
    passwordForgetConfirm: '',
    passwordForgetError: '',
    passwordForgetConfirmError: '',
    nameErrorReg: '',
    emailErrorReg: '',
    passwordErrorReg: '',
    nameErrorSign: '',
    emailErrorSign: '',
    passwordErrorSign: '',
    currentForm: 0,
    optionRole: [],
    selectedValue: '',
    roleErrReg:''
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    }));

  componentDidMount() {
    document.querySelector('nav').style.height = '65px';
    fetch(`/role`, { headers: myHeaders })
            .then(response => response.json())
            .then(opt =>
               this.setState({ optionRole: opt.response })   
            )
  }

  componentWillUnmount() {
    document.querySelector('nav').style.height = 'auto';
  }

  validateReg = () => {
    //debugger;
    let emailErrorReg = "", passwordErrorReg = "", nameErrorReg = "" , roleErrReg = ""

    if (!this.state.nameReg) {
      nameErrorReg = 'name cannot be empty';
    }

    if(!this.state.selectedValue){
      roleErrReg = 'role cannot be empty'
    }

    if (!this.state.emailReg.includes('@') || !this.state.emailReg.includes('.')) {
      emailErrorReg = 'please enter a valid email address';
    }
    if (!this.state.passwordReg) {
      passwordErrorReg = 'password cannot be empty';
    }
    else if (this.state.passwordReg.length < 6) {
      passwordErrorReg = 'Please enter a password with min. 6 chars '
    }

    if (nameErrorReg || emailErrorReg || passwordErrorReg || roleErrReg) {
      this.setState({ nameErrorReg, emailErrorReg, passwordErrorReg, roleErrReg });
      return false;
    }
    return true;
  }

  validateSign = () => {
    //debugger;
    let emailErrorSign = "", passwordErrorSign = ""

    if (!this.state.emailSign.includes('@') || !this.state.emailSign.includes('.')) {
      emailErrorSign = 'please enter a valid email address';
    }
    if (!this.state.passwordSign) {
      passwordErrorSign = 'password cannot be empty';
    }
    if (emailErrorSign || passwordErrorSign) {
      this.setState({ emailErrorSign, passwordErrorSign });
      return false;
    }
    return true;
  }

  validatePass = () => {
    //debugger;
    let EmailforgetError = "", passwordForgetError = "", passwordForgetConfirmError = "";

    if (!this.state.EmailForget) {
      EmailforgetError = 'email cannot be empty';
    }
    else if (!this.state.EmailForget.includes('@') || !this.state.EmailForget.includes('.')) {
      EmailforgetError = 'please enter a valid email address';
    }
    if (!this.state.passwordForget) {
      passwordForgetError = 'password cannot be empty';
    }

    if (!this.state.passwordForgetConfirm) {
      passwordForgetConfirmError = 'password cannot be empty';
    }

    else if (this.state.passwordForgetConfirm !== this.state.passwordForget) {
      passwordForgetConfirmError = 'Passwords must match';
    }

    if (EmailforgetError || passwordForgetError || passwordForgetConfirmError) {
      this.setState({ EmailforgetError, passwordForgetError, passwordForgetConfirmError });
      return false;
    }
    return true;
  }

  onChangeReg = e => {
    //console.log('hello' +e.target.id);
    switch (e.target.id) {
      case 'nameReg': this.setState({ nameErrorReg: '' });
        break;
      case 'emailReg': this.setState({ emailErrorReg: '' });
        break;
      case 'passwordReg': this.setState({ passwordErrorReg: '' });
        break;
      default:
        break;
    }
    this.setState({ [e.target.id]: e.target.value });
  }

  onChangeSign = e => {
    // console.log('hello' +e);
    switch (e.target.id) {
      case 'emailSign': this.setState({ emailErrorSign: '' });
        break;
      case 'passwordSign': this.setState({ passwordErrorSign: '' });
        break;
      default:
        break;
    }
    this.setState({ [e.target.id]: e.target.value });
  }

  onChangeForgetpass = e => {
    // e.preventDefault();
    //console.log(e.target.id)
    switch (e.target.id) {
      case 'EmailForget': this.setState({ EmailforgetError: '' });
        break;
      case 'passwordForget': this.setState({ passwordForgetError: '' });
        break;
      case 'passwordForgetConfirm': this.setState({ passwordForgetConfirmError: '' });
        break;
      default:
        break;
    }
    this.setState({ [e.target.id]: e.target.value });
  }

  OptionHandler = e => {
    this.setState({ selectedValue: e[0] })
}

  onSubmitReg = e => {
    e.preventDefault();
    const isValid = this.validateReg();
    if (isValid) {
      const userData = {
        name: this.state.nameReg,
        email: this.state.emailReg,
        password: this.state.passwordReg,
        role: this.state.selectedValue
      };
      //console.log(userData);
      this.props.RegisterUser(userData);
      this.setState({ nameReg: '', emailReg: '', passwordReg: '', selectedValue: ''  })
    }
  };

  onSubmitSign = e => {
    e.preventDefault();
    //  alert('hello');
    //  console.log('hello' +e);
    const isValid = this.validateSign();
    if (isValid) {
      const userData = {
        email: this.state.emailSign,
        password: this.state.passwordSign
      };
      this.props.SigninUser(userData, this.props.history);
      this.setState({ emailSign: '', passwordSign: '' })
    }
  };

  onSubmitPass = e => {
    e.preventDefault();
    const isValid = this.validatePass();
    //console.log('here');
    if (isValid) {
      // console.log('valid');
      const userData = {
        email: this.state.EmailForget,
        password: this.state.passwordForget
        //confirmPassword: this.state.passwordForgetConfirm
      };
      this.props.UpdatePass(userData);
      this.setState({ EmailForget: '', passwordForget: '', passwordForgetConfirm: '' })
    }
  }

  renderSwitch(param) {
    var currentValue = '';
    //console.log(param);
    switch (param) {
      case 'register':
        currentValue = 1;
        break;
      case 'signIn':
        currentValue = 0;
        break;
      case 'forgetPass':
        currentValue = 2;
        break;
      default:
      // return 'register';
    }
    this.setState({ currentForm: currentValue })
  }

  render() {
    const { nameErrorReg,emailErrorReg, passwordErrorReg, emailErrorSign, optionRole, passwordErrorSign, roleErrReg,  } = this.state;
    let isEnabledCheck = emailErrorReg || passwordErrorReg || emailErrorSign || passwordErrorSign ;
    let isEnabled = false;
    if (isEnabledCheck.length > 0) {
      isEnabled = true;
    } else {
      isEnabled = false;
    }
 
    return (
      <div id='classicformpage'>
        
        <MDBView>
          <MDBMask className='d-flex justify-content-center align-items-center gradient' />
          <MDBContainer
            className='d-flex justify-content-center align-items-center containerStyle'
          >
            <MDBRow>
              <MDBCol md='12' xl='12' className='mb-12'>
                <MDBAnimation type='fadeInRight' delay='.3s'>
                  <MDBCard id='classic-card'>
                    {this.state.currentForm === 1 ?
                      <MDBCardBody className='white-text'>
                        <h3 className='text-center'>
                          <MDBIcon icon='user' /> Register
                        </h3>
                        <hr className='hr-light' />
                        {/* register */}
                        <form className='errorstyle' onSubmit={this.onSubmitReg} >
                          <div>
                            <MDBInput
                              className='white-text'
                              iconClass='white-text'
                              label='Please enter your name'
                              value={this.state.nameReg}
                              onChange={this.onChangeReg}
                              id="nameReg"
                              type="text"
                              icon='user'
                            />
                            <div>{nameErrorReg}</div>

                            <MDBInput
                              className='white-text'
                              iconClass='white-text'
                              label='Please enter your email'
                              type="email"
                              id="emailReg"
                              value={this.state.emailReg}
                              onChange={this.onChangeReg}
                              icon='envelope'
                            />
                            <div>{emailErrorReg}</div>

                            <MDBInput
                              className='white-text'
                              iconClass='white-text'
                              label='Enter password'
                              type="password"
                              id="passwordReg"
                              value={this.state.passwordReg}
                              onChange={this.onChangeReg}
                              icon='lock'
                            />
                            <div>{passwordErrorReg}</div>

                            <MDBSelect
                              options={optionRole}
                              label="Role"
                              getValue={this.OptionHandler}
                            />
                              <div>{roleErrReg}</div>

                            <div className='text-center mt-4 black-text'>
                              <MDBBtn color='indigo' type="submit" disabled={isEnabled}>Sign Up</MDBBtn>
                              <div className='text-center'>
                                <Link to='' className="tag" onClick={() => this.renderSwitch('signIn')} >Already Registered ?</Link>
                              </div>
                            </div>
                          </div>
                        </form>
                      </MDBCardBody>
                      :
                      this.state.currentForm === 0 ?
                        <MDBCardBody className='white-text'>
                          <h3 className='text-center'>
                            <MDBIcon icon='user' /> Sign In
                      </h3>
                          <hr className='hr-light' />
                          <form className='errorstyle' onSubmit={this.onSubmitSign}>
                            <div>
                              <MDBInput
                                className='white-text'
                                iconClass='white-text'
                                label='Enter Your email'
                                type="email"
                                id="emailSign"
                                value={this.state.emailSign}
                                onChange={this.onChangeSign}
                                icon='envelope'
                              />
                              <div>{this.state.emailErrorSign}</div>
                              <MDBInput
                                className='white-text'
                                iconClass='white-text'
                                label='Enter Your password'
                                type="password"
                                id="passwordSign"
                                value={this.state.passwordSign}
                                onChange={this.onChangeSign}
                                icon='lock'
                              />
                              <div>{this.state.passwordErrorSign}</div>
                              <div className='text-center mt-4 black-text'>
                                <MDBBtn color='indigo' type="submit" disabled={isEnabled}>Log In</MDBBtn>
                                <div className='text-center'>
                                  <Link to='' className="tag" onClick={() => this.renderSwitch('forgetPass')}>Forgot password ?</Link>
                                  <Link to='' className="tag leftalign" onClick={() => this.renderSwitch('register')}>Not Registered Yet?</Link>
                                </div>
                              </div>
                            </div>
                          </form>
                        </MDBCardBody>
                        :
                        <MDBCardBody className='white-text'>
                          <h3 className='text-center'>
                            <MDBIcon icon='user' /> Forget Password
                          </h3>
                          <hr className='hr-light' />
                          <form className='errorstyle' onSubmit={this.onSubmitPass}>
                            <div>
                              <MDBInput
                                className='white-text'
                                iconClass='white-text'
                                label='Email'
                                type="text"
                                id="EmailForget"
                                value={this.state.EmailForget}
                                onChange={this.onChangeForgetpass}
                                icon='envelope'
                              />
                              <div>{this.state.EmailforgetError}</div>
                              <MDBInput
                                className='white-text'
                                iconClass='white-text'
                                label='New password'
                                type="password"
                                id="passwordForget"
                                value={this.state.passwordForget}
                                onChange={this.onChangeForgetpass}
                                icon='lock'
                              />
                              <div>{this.state.passwordForgetError}</div>
                              <MDBInput
                                className='white-text'
                                iconClass='white-text'
                                label='Confirm password'
                                type="password"
                                id="passwordForgetConfirm"
                                value={this.state.passwordForgetConfirm}
                                onChange={this.onChangeForgetpass}
                                icon='lock'
                              />
                              <div>{this.state.passwordForgetConfirmError}</div>
                              <div className='text-center mt-4 black-text'>
                                <MDBBtn color='indigo' type="submit" disabled={isEnabled} >Submit</MDBBtn>
                                <div className='text-center'>
                                  <Link to='' className="tag" onClick={() => this.renderSwitch('signIn')} >Back to SignIn</Link>
                                  <Link to='' className="tag leftalign" onClick={() => this.renderSwitch('register')} >Back to Registered</Link>
                                </div>
                              </div>
                            </div>
                          </form>
                        </MDBCardBody>
                    }
                  </MDBCard>
                </MDBAnimation>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBView>
      </div>
    );
  }
}
HomePage.propTypes = {
  RegisterUser: PropTypes.func.isRequired,
  SigninUser: PropTypes.func.isRequired,
  UpdatePass: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});


export default connect(
  mapStateToProps,
  { RegisterUser, SigninUser, UpdatePass }
)(withRouter(HomePage));

