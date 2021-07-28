import React from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBDataTableV5, MDBCard, MDBCardBody } from 'mdbreact';
import SectionContainer from '../sectionContainer';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createbusinessProcess, updatebusinessProcess, deletebusinessProcess } from '../../actions/authActions';
import '../business/business.css';

const myHeaders =
{
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
}

class Business extends React.Component {
    state = {
        bu_name: '',
        isUpdate: false,
        isDelete: false,
        bu_details: [],
        data: {
            columns: [],
            rows: []
        },
        newData: []
    };

    changeHandler = e => {
        e.preventDefault();
        this.setState({ [e.target.id]: e.target.value })
    }

    deleteHandler = e => {
        const deleteprocess = {
            bu_id: this.state.bu_details.bu_id,
        }
        //console.log(deleteBusinessProcess);
        this.props.deletebusinessProcess(deleteprocess);
    }

    submitHandler = e => {
        e.preventDefault();
        if (this.state.isUpdate) {
            const updateprocess = {
                bu_id: this.state.bu_details.bu_id,
                bu_name: this.state.bu_name
            }
            this.props.updatebusinessProcess(updateprocess);
        } else {
            const newprocess = {
                bu_name: this.state.bu_name
            }
            this.props.createbusinessProcess(newprocess);
            //reset
            this.setState({ bu_name: '' })
        }
    }

    showLogs = e => {
        this.setState({ bu_details: e, isDelete: true, isUpdate: true, bu_name: e.bu_name });
    };
        
    componentDidMount() {
        fetch('/businessprocess', { headers: myHeaders })
            .then(response => response.json())
            .then(result => {
                const row = result.response.map(Key => {
                    return Key;
                });

                let col = [];
                col.push(
                    {
                        label: 'Name',
                        field: 'bu_name',
                        width: 150,
                        sort: ''
                    },
                    {
                        label: 'Status',
                        field: 'status',
                        width: 150,
                        sort: ''
                    }
                );

                let data = {
                    columns: col,
                    rows: row
                }
                //console.log("columns" + JSON.stringify(row));
                this.setState({ data });
            }
            );
    }

    render() {
        const { bu_name, data } = this.state;
        return (
            <div>
                <div>
                    <h1>Bussiness Process Table</h1>
                    <form
                        className='needs-validation'
                        onSubmit={this.submitHandler}>
                        <MDBRow>
                            <MDBCol md='4'>
                                <MDBInput
                                    value={bu_name}
                                    name='name'
                                    onChange={this.changeHandler}
                                    type='text'
                                    id='bu_name'
                                    label='Business name'
                                    required >
                                </MDBInput>
                            </MDBCol>
                        </MDBRow>

                        {this.state.isUpdate ?
                            <MDBBtn
                                color='success'
                                type='submit' >Update</MDBBtn>
                            : <MDBBtn color='success' type='submit'>
                                Submit Form
                    </MDBBtn>}
                    </form>
                </div>
                <div>
                    <MDBRow className='py-3'>
                        {this.state.isDelete ?
                            <MDBBtn
                                color='danger'
                                onClick={this.deleteHandler}
                                style={{ marginLeft: '700px' }}>Delete</MDBBtn>
                            : null}

                        <MDBCol md='12'>
                            <SectionContainer title='' noBorder>
                                <MDBCard>
                                    <MDBCardBody>
                                        {data['rows'].length > 0 ?
                                            <MDBDataTableV5
                                                hover
                                                scrollX
                                                scrollY
                                                maxHeight='50vh'
                                                entriesOptions={[5, 20, 25]}
                                                entries={5}
                                                pagesAmount={4}
                                                data={data}
                                                checkbox="true"
                                                headCheckboxID='id3'
                                                bodyCheckboxID='checkboxes3'
                                                getValueCheckBox={e => {
                                                    this.showLogs(e);
                                                }}
                                                checkboxFirstColumn
                                                proCheckboxes
                                                filledCheckboxes
                                                proSelect
                                            />
                                            : null}
                                    </MDBCardBody>
                                </MDBCard>
                            </SectionContainer>
                        </MDBCol>
                    </MDBRow>
                </div>
            </div>
        );
    }
}

Business.propTypes = {
    createbusinessProcess: PropTypes.func.isRequired,
    updatebusinessProcess: PropTypes.func.isRequired,
    deletebusinessProcess: PropTypes.func.isRequired,
    // auth: PropTypes.object.isRequired,
    // errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    // auth: state.auth,
    // errors: state.errors
    // bu_name: state.name.bu_name
});

export default connect(
    mapStateToProps,
    { createbusinessProcess, updatebusinessProcess, deletebusinessProcess }
)(withRouter(Business));
