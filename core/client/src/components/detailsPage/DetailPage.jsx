import React, { Component } from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBTabContent,
} from 'mdbreact';
//import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SectionContainer from '../sectionContainer';

const myHeaders =
{
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
}

class eCommercePage extends Component {
  state = {
    details: [],
    contents: []
  };
 
  // downloadEmployeeData = () => {
  //   fetch("%PUBLIC_URL%/logo192.png")
  //     .then(response => {
  //       response.blob().then(blob => {
  //         let url = window.URL.createObjectURL(blob);
  //         let a = document.createElement('a');
  //         a.href = url;
  //         a.download = 'employees.json';
  //         a.click();
  //       });
  //       //window.location.href = response.url;
  //     });
  // }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const token = query.get('bot_id')
    //console.log(token)//123
    fetch(`/detailbyid/` + token, { headers: myHeaders })
      .then(response => response.json())
      .then(result =>
        //console.log(result)
        this.setState({ details: result.response })
      )

    // fetch(`/download`, { headers: myHeaders })
    //   // .then(response => response.json())
    //   .then(result =>
    //     // console.log(result);
    //     toast('file is downloaded')
    //   )

  }

  render() {
    const { details } = this.state
    //console.log(details);
    return (
      <MDBContainer className='mb-12'>
        <SectionContainer header='' className='px-4' noBorder>
          <MDBRow className='my-2' center>
            <MDBCard className='w-100'>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol lg='8' className='mb-4'>
                    <MDBTabContent className='pt-4'>

                      {details.map(det => (
                        <div key={det}>
                          <h6 style={{ fontSize: '2.5rem' }} >{det.title}</h6>
                          <span>{det.detailed_des}</span>

                          <div style={{ marginTop: '20px', backgroundColor: '#4C6A8D', paddingTop: '10px' }}>
                            <ul style={{ color: 'white' }}> Features
                              <li style={{ color: '#D8AA1F' }}>Remove Duplicate records from multiple columns</li>
                              <li style={{ color: '#D8AA1F' }}>Fast and Effeciency</li>
                              <li style={{ color: '#D8AA1F' }}>Saves Time and gives 100% accurate output</li>
                              <li style={{ color: '#D8AA1F', paddingBottom: '10px' }}>Useful for any business functionality that uses excel</li>
                            </ul>
                          </div>
                          
                          <div style={{ marginTop: '20px', backgroundColor: '#4C6A8D', paddingTop: '10px' }}>
                            <ul style={{ color: 'white' }}> Tasks
                             <li style={{ color: '#D8AA1F' }}>Read and fetch data from the input file or files</li>
                              <li style={{ color: '#D8AA1F' }}>Remove duplicate records from the file</li>
                              <li style={{ color: '#D8AA1F', paddingBottom: '10px' }}>Save the output in folder</li>
                            </ul>
                          </div>
                          <div>
                          {/* {"http://localhost:3000/download/samplefile.zip"} */}
                           Source Code: <a href={"http://localhost:5000/download/" + det.artefact_path}>Zip file download</a>
                          </div>
                          <br />
                          <div class="row">
                            <div class="col-md-3 col-md-offset-3">
                              <video id="videoPlayer" controls muted="muted" autoPlay>
                                <source src={"http://localhost:3000/video/" + det.video_path} type="video/mp4"></source>
                              </video>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* <span>This bot exports Salesforce reports and emails them to your intended recipients.
                         You can schedule to do this on any frequency using the bot scheduler.</span> */}
                         
                    </MDBTabContent>
                  </MDBCol>

                  <MDBCol lg='4' className='mb-4'>
                    <MDBCard>
                      <MDBCardBody>
                        {/* <h4 className='mb-4 mt-1 h5 text-center font-weight-bold'>
                          Summary
                        </h4>
                        <hr /> */}
                        <MDBRow>
                          <MDBCol sm='6'>Applications</MDBCol>
                          {details.map(det => (
                            <MDBCol sm='6' key={det}>{det.app_name}</MDBCol>
                          ))}
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm='6'>Businness Process</MDBCol>
                          {details.map(det => (
                            <MDBCol sm='6' key={det} >{det.bu_name}</MDBCol>
                          ))}
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm='6'>Category</MDBCol>
                          {details.map(det => (
                            <MDBCol sm='6' key={det} >{det.cat_name}</MDBCol>
                          ))}
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm='6'>Enterprise version</MDBCol>
                          {details.map(det => (
                            <MDBCol sm='6' key={det}>{det.version}</MDBCol>
                          ))}
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm='6'>Support</MDBCol>
                          {details.map(det => (
                            <MDBCol sm='6' key={det}>
                              {det.support}</MDBCol>
                          ))}
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
        </SectionContainer>
      </MDBContainer>
    );
  }
}

export default eCommercePage;
