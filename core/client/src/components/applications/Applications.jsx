import React from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBDataTableV5, MDBCardBody, MDBCard } from 'mdbreact';
import SectionContainer from '../sectionContainer';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createApplication, updateApplication, deleteApplication } from '../../actions/authActions';

const myHeaders =
{
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
}

class Applications extends React.Component {
    state = {
        app_name: '',
        data: {
            columns: [],
            rows: []
        },
        isUpdate: false,
        isDelete: false,
        app_details: []
    };

    changeHandler = e => {
        e.preventDefault();
        this.setState({ [e.target.id]: e.target.value })
    }

    submitHandler = e => {
        e.preventDefault();
        if (this.state.isUpdate) {
            const updateApp = {
                app_id: this.state.app_details.app_id,
                app_name: this.state.app_name
            }
            this.props.updateApplication(updateApp);
        } else {
            const newApp = {
                app_name: this.state.app_name
            }
            this.props.createApplication(newApp);
            this.setState({ app_name: '' })
        }
    }

    deleteHandler = e =>{
        const deleteApp = {
            app_id : this.state.app_details.app_id 
        }
        // console.log(this.state.cat_details.cat_id);
        this.props.deleteApplication(deleteApp);
    }

    showLogs = e => {
        this.setState({ app_details: e, app_name: e.app_name, isDelete: true, isUpdate: true });
    };

    componentDidMount() {
        fetch('/application', { headers: myHeaders })
            .then(response => response.json())
            .then(result => {
                const row = result.response.map(Key => {
                    return Key;
                });

                let col = [];
                col.push(
                    {
                        label: 'Name',
                        field: 'app_name',
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
                // console.log("columns" + JSON.stringify(row));
                this.setState({ data });
            }
            );
    }

    render() {
        const { app_name, data } = this.state;

        return (
            <div>
                <div>
                    <h1>Applications Table</h1>
                    <form
                        className='needs-validation'
                        onSubmit={this.submitHandler}
                    >
                        <MDBRow>
                            <MDBCol md='4'>
                                <MDBInput
                                    value={app_name}
                                    name='name'
                                    onChange={this.changeHandler}
                                    type='text'
                                    id='app_name'
                                    label='Application name'
                                    required
                                >
                                </MDBInput>
                            </MDBCol>
                        </MDBRow>
                        {this.state.isUpdate ?
                            <MDBBtn
                                color='success'
                                type='submit'
                                >Update</MDBBtn>
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
        )
    }
}

Applications.propTypes = {
    createApplication: PropTypes.func.isRequired,
    updateApplication: PropTypes.func.isRequired,
    deleteApplication: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { createApplication,updateApplication,deleteApplication })(withRouter(Applications));