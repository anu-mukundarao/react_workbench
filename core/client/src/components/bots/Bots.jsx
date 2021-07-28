import React from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBDataTableV5, MDBCard, MDBCardBody, MDBSelect } from 'mdbreact';
import SectionContainer from '../sectionContainer';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createBotStore, updateBotStore, deleteBotStore } from '../../actions/authActions';

const myHeaders =
{
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
}

class Bots extends React.Component {
    state = {
        title: '',
        data: {
            columns: [],
            rows: []
        },
        isUpdate: false,
        isDelete: false,
        bots: [],
        optionCat: [],
        optionApp: [],
        optionBu: [],
        selectedAppValue: '',
        selectedCatValue: '',
        selectedBuValue: '',
        isCheckBoxCount: 0
    };

    changeHandler = e => {
        e.preventDefault();
        this.setState({ [e.target.id]: e.target.value })
    }

    AppOptionHandler = t => {
        this.setState({ selectedAppValue: t[0] })
    }

    CatOptionHandler = t => {
        this.setState({ selectedCatValue: t[0] })
    }

    BuOptionHandler = t => {
        this.setState({ selectedBuValue: t[0] })
    }

    submitHandler = e => {
        e.preventDefault();
        if (this.state.isUpdate) {
            const updateBot = {
                bot_id: this.state.bots.bot_id,
                title: this.state.title,
                app_id: this.state.selectedAppValue,
                cat_id: this.state.selectedCatValue,
                bu_id: this.state.selectedBuValue
            }
            this.props.updateBotStore(updateBot);
        } else {
            const newBot = {
                title: this.state.title,
                app_id: this.state.selectedAppValue,
                cat_id: this.state.selectedCatValue,
                bu_id: this.state.selectedBuValue
            }
            this.props.createBotStore(newBot);
            this.setState({ title: '', selectedAppValue: '', selectedCatValue: '', selectedBuValue: '' })
        }
    }

    showLogs = e => {
        this.setState({ bots: e, title: e.title, isDelete: true, isUpdate: true });
        const foundCat = this.state.optionCat.findIndex((element) => {
            //console.log(element);
            return element.value === e.cat_id;
        })
        let tempCat = this.state.optionCat;
        //console.log(foundCat);
        // console.log(this.state.optionCat);
        if (foundCat >= 0) {
             this.state.optionCat.filter((element) => 
                  element.checked = false
            )
            Object.assign(tempCat[foundCat], { checked: true });
            this.setState(prevState => {
                let prevOptions = [...prevState.optionCat];
                prevOptions[foundCat].checked = true;
                return { optionCat: prevOptions };
            })
        }
       // console.log(this.state.optionCat);

    const foundApp = this.state.optionApp.findIndex((element) => {
        return element.value === e.app_id;
    })
    let tempApp = this.state.optionApp;
    console.log(foundApp);
      
    if (foundApp >= 0) {
         this.state.optionApp.filter((element) => 
            element.checked = false
       )
        Object.assign(tempApp[foundApp], { checked: true });
        this.setState(prevState => {
            let prevOptions = [...prevState.optionApp];
            prevOptions[foundApp].checked = true;
            return { optionApp: prevOptions };
        })
        
    }

    const foundBu = this.state.optionBu.findIndex((element) => {
        //console.log(element);
        return element.value === e.bu_id;
    })
    let tempBu = this.state.optionBu;
    // console.log(found);
    //console.log(this.state.optionBu);
    if (foundBu >= 0) {
         this.state.optionBu.filter((element) => 
            element.checked = false
        )
        Object.assign(tempBu[foundBu], { checked: true });
        this.setState(prevState => {
            let prevOptions = [...prevState.optionBu];
            prevOptions[foundBu].checked = true;
            return { optionBu: prevOptions };
        })
    }
    };

    deleteHandler = e => {
        const deleteBot = {
            bot_id: this.state.bots.bot_id,
            title: this.state.title,
            app_id: this.state.selectedAppValue,
            cat_id: this.state.selectedCatValue,
            bu_id: this.state.selectedBuValue
        }
        this.props.deleteBotStore(deleteBot);
    }

    componentDidMount() {
        fetch('/bots', { headers: myHeaders })
            .then(response => response.json())
            .then(result => {
                const row = result.response.map(Key => {
                    return Key;
                });

                let col = [];
                col.push(
                    {
                        label: 'Title',
                        field: 'title',
                        width: 200,
                        sort: ''
                    },
                    {
                        label: 'Category Name',
                        field: 'cat_name',
                        width: 150,
                        sort: ''
                    },
                    {
                        label: 'Application Name',
                        field: 'app_name',
                        width: 200,
                        sort: ''
                    },
                    {
                        label: 'Business Name',
                        field: 'bu_name',
                        width: 200,
                        sort: ''
                    }
                );

                let data = {
                    columns: col,
                    rows: row
                }
                //console.log("columns" + JSON.stringify(row));
                this.setState({ data });
            });

        fetch(`/catDropdown`, { headers: myHeaders })
            .then(response => response.json())
            .then(opt =>
                this.setState({ optionCat: opt.response })
            )

        fetch(`/appDropdown`, { headers: myHeaders })
            .then(response => response.json())
            .then(opt =>
                this.setState({ optionApp: opt.response })
            )

        fetch(`/buDropdown`, { headers: myHeaders })
            .then(response => response.json())
            .then(opt =>
                this.setState({ optionBu: opt.response })
            )
    }

    render() {
        const { title, data, optionApp, optionCat, optionBu } = this.state;
        //console.log(this.state.bots.cat_name);
        return (
            <div>
                <div>
                    <h1>Bots Table</h1>
                    <form
                        className='needs-validation'
                        onSubmit={this.submitHandler}
                    >
                        <MDBRow>
                            <MDBCol md='4'>
                                <MDBInput
                                    value={title}
                                    name='name'
                                    onChange={this.changeHandler}
                                    type='text'
                                    id='title'
                                    label='Title'
                                    required
                                >
                                </MDBInput>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md='4'>
                                <MDBSelect
                                    options={optionApp}
                                    label="Application Name"
                                    getValue={this.AppOptionHandler}
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md='4'>
                                <MDBSelect
                                    options={optionCat}
                                    // selected={this.state.cat_name}
                                    label="Category Name"
                                    getValue={this.CatOptionHandler}
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md='4'>
                                <MDBSelect
                                    options={optionBu}
                                    label="Business Name"
                                    getValue={this.BuOptionHandler}
                                />
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

Bots.propTypes = {
    createBotStore: PropTypes.func.isRequired,
    updateBotStore: PropTypes.func.isRequired,
    deleteBotStore: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { createBotStore, updateBotStore, deleteBotStore })(withRouter(Bots));