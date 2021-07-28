import React from 'react';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle   } from "mdbreact";
import '../card/card.styles.scss';
// import {Link} from 'react-router-dom';

export const Card = ({list,showDetail}) =>{
 // console.log(list.title);
    return(
        <MDBCard cascade>
          <MDBCardBody cascade>
           <MDBCardTitle onClick={showDetail} className='cardHeader'>{list.title}</MDBCardTitle> 
            <hr/>
            <MDBCardText>
            Application: {list.app_name}<br/>
            Version: 
            </MDBCardText>
          </MDBCardBody>
          <div className='rounded-bottom mdb-color lighten-3 text-center pt-3'>
            <ul className='list-unstyled list-inline font-small'>
              <li className='list-inline-item pr-2 white-text'>
                {/* <MDBIcon far icon='clock' /> 05/10/2015 */}
              </li>
              <li className='list-inline-item pr-2'>
                {/* <a href='#!' className='white-text'>
                   <MDBIcon far icon='comments' className='mr-1' />
                  12 
                </a> */}
              </li>
              <li className='list-inline-item pr-2'>
                {/* <a href='#!' className='white-text'>
                  <MDBIcon fab icon='facebook-f' className='mr-1' />
                  21
                </a> */}
              </li>
              <li className='list-inline-item'>
                {/* <a href='#!' className='white-text'>
                  <MDBIcon fab icon='twitter' className='mr-1' />5
                </a> */}
              </li>
            </ul>
          </div>
        </MDBCard>
    )
}