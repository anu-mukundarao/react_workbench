import React from 'react';
import { useHistory } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBView, MDBMask, MDBCardBody, MDBBtn } from 'mdbreact';
import RPD from '../../../../assets/rapid process discovery.jpg';
import icon from '../../../../assets/workbench_icon.png';
import SectionContainer from '../../../../components/sectionContainer';


  // handler=() =>{
  //   // e.preventDefault();
  //  localStorage.getItem('token');
  // if ('token' === 'AD') {
  //    history.push('/master')
  // }
  // else {
  //    history.push('/botstore')
  // }
  // };

const LandingPage = () => {
  const history = useHistory();
  return (
    <MDBContainer>
      <SectionContainer tag='section' className='text-center'>
        <h2 className='h1-responsive font-weight-bold my-5'>
          Our Applications
        </h2>
        <p className='grey-text w-responsive mx-auto mb-5'>
          Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt mollit
          est laborum.
        </p>
        <MDBRow className='text-center'>
          <MDBCol lg='4' md='12' className='mb-lg-0 mb-4'>
            <MDBView className='overlay rounded z-depth-1' waves>
              <img
                src={RPD}
                alt=''
                className='img-fluid'
              />
              <a href='#!'>
                <MDBMask overlay='white-slight' />
              </a>
            </MDBView>
            <MDBCardBody className='pb-0'>
              <h4 className='font-weight-bold my-3'>RAP</h4>
              <p className='grey-text'>
                "Rapid Assessment Platform” (RAP) is a web-based toolkit that can be leveraged for remote Automation Assessments.
                RAP provides recommendations for automation opportunities and solutions based on response to the assessment questionnaire.
              </p>
              <MDBBtn color='indigo' size='sm'>
                select
              </MDBBtn>
            </MDBCardBody>
          </MDBCol>
          <MDBCol lg='4' md='12' className='mb-lg-0 mb-4'>
            <MDBView className='overlay rounded z-depth-1' waves>
              <img
                src={icon}
                alt=''
                className='img-fluid'
              />
              <a href='#!'>
                <MDBMask overlay='white-slight' />
              </a>
            </MDBView>
            <MDBCardBody className='pb-0'>
              <h4 className='font-weight-bold my-3'>Workbench</h4>
              <p className='grey-text'>
                Automation Inventory is a platform to manage reusable assets. Search, Watch,
              download and leverage with detailed description that you can readily integrate for your Automation tasks.<br /><br /><br />
              </p>
              {/* onClick={() => history.push('/botstore')} */}
              <MDBBtn color='indigo' size='sm' onClick={() => history.push('/botstore')}>
                Select
              </MDBBtn>
            </MDBCardBody>
          </MDBCol>
          <MDBCol lg='4' md='12' className='mb-lg-0 mb-4'>
            <MDBView className='overlay rounded z-depth-1' waves>
              <img
                src={RPD}
                alt=''
                className='img-fluid'
              />
              <a href='#!'>
                <MDBMask overlay='white-slight' />
              </a>
            </MDBView>
            <MDBCardBody className='pb-0'>
              <h4 className='font-weight-bold my-3'>Dr Bot</h4>
              <p className='grey-text'>
                Temporibus autem quibusdam et aut officiis debitis aut rerum
                necessitatibus saepe eveniet ut et voluptates repudiandae.<br /><br /><br /><br /><br />
              </p>
              <MDBBtn color='indigo' size='sm'>
                Select
              </MDBBtn>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </SectionContainer>
    </MDBContainer>
  );
}
export default LandingPage;
