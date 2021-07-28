import React from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBDataTableV5, MDBCard, MDBCardBody } from 'mdbreact';
import SectionContainer from '../sectionContainer';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {createCategory, updateCategory, deleteCategory} from '../../actions/authActions';

const myHeaders =
{
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
}

class Categories extends React.Component {
    state = {
        cat_name: '',
        data: {
            columns: [],
            rows: []
         },
        isUpdate: false,
        isDelete: false,
        cat_details: []
    };

    changeHandler = e => {
        e.preventDefault();
        // console.log(e.target.value);
        this.setState({[e.target.id]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault();
        if (this.state.isUpdate) {
            const updateCat = {
                cat_id: this.state.cat_details.cat_id,
                cat_name: this.state.cat_name
            }
            this.props.updateCategory(updateCat);
        } else {
            const newCat = {
                cat_name: this.state.cat_name
            }
            this.props.createCategory(newCat);
            this.setState({ cat_name: '' })
        }
    }

    deleteHandler = e => {
        const deleteCat = {
            cat_id : this.state.cat_details.cat_id 
        }
        // console.log(this.state.cat_details.cat_id);
        this.props.deleteCategory(deleteCat);
    }

    showLogs = e => {
        this.setState({ cat_details: e, cat_name: e.cat_name, isDelete: true, isUpdate: true });
    };

    componentDidMount() {
        fetch('/categories', { headers: myHeaders })
            .then(response => response.json())
            .then(result => {
                const row = result.response.map(Key => {
                    return Key;
                });

                let col = [];
                col.push(
                    {
                        label: 'Name',
                        field: 'cat_name',
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
        const { cat_name, data } = this.state;

        return(
           <div>
               <div>
                <h1>Categories Table</h1>
                <form
                    className='needs-validation'
                    onSubmit={this.submitHandler} >
                    <MDBRow>
                        <MDBCol md='4'>
                            <MDBInput
                                value={cat_name}
                                name='name'
                                onChange={this.changeHandler}
                                type='text'
                                id='cat_name'
                                label='Category name'
                                required />
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

Categories.propTypes = {
    createCategory: PropTypes.func.isRequired,
    updateCategory: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect (mapStateToProps,{createCategory,updateCategory,deleteCategory})(withRouter(Categories));