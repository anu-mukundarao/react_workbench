import React from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBDataTableV5, MDBSelect } from 'mdbreact';
import SectionContainer from '../sectionContainer';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createBotDetails, updateBotDetails, deleteBotDetails } from '../../actions/authActions';

const myHeaders =
{
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
}

class BotDetails extends React.Component {
    state = {
        features: '',
        tasks: '',
        detailed_des: '',
        version: '',
        support: '',
        data: {
            columns: [],
            rows: []
        },
        title: '',
        isUpdate: false,
        isDelete: false,
        botStore: [],
        options: [],
        selectedValue:''
    };

    changeHandler = e => {
        e.preventDefault();
        this.setState({ [e.target.id]: e.target.value })
    }

    optionHandler = t =>{
        console.log(t[0]);
        this.setState({selectedValue: t[0]})
    }
    
    submitHandler = e => {
        e.preventDefault();
        if (this.state.isUpdate) {
            const updateBotDet = {
                bot_det_id: this.state.botStore.bot_det_id,
                features: this.state.features,
                tasks: this.state.tasks,
                detailed_des: this.state.detailed_des,
                version: this.state.version,
                support: this.state.support,
                bot_id: this.state.selectedValue
            }
            this.props.updateBotDetails(updateBotDet);
        } else {
            const newbotDet = {
                features: this.state.features,
                tasks: this.state.tasks,
                detailed_des: this.state.detailed_des,
                version: this.state.version,
                support: this.state.support,
                bot_id: this.state.selectedValue
            }
            this.props.createBotDetails(newbotDet);
            this.setState({ features: '', tasks: '', detailed_des: '', version: '', support: '' , options: ''  })
        }
    }

    deleteHandler = e => {
        const deleteBotDet = {
            bot_det_id: this.state.botStore.bot_det_id
        }
        // console.log(this.state.cat_details.cat_id);
        this.props.deleteBotDetails(deleteBotDet);
    }

    showLogs = e => {
        this.setState({ botStore: e, features: e.features, tasks: e.tasks, detailed_des:e.detailed_des,
            support: e.support, video: e.video, version: e.version, isDelete: true, isUpdate: true });
            const foundOption = this.state.options.findIndex((element) => {
                return element.value === e.bot_id;
            }); 
            let temp = this.state.options;
            if (foundOption >= 0) {
                 this.state.options.filter((element) => 
                      element.checked = false
                )
                Object.assign(temp[foundOption], { checked: true });
                this.setState(prevState => {
                    let prevOptions = [...prevState.options];
                    prevOptions[foundOption].checked = true;
                    return { options: prevOptions };
                })
            }
           //console.log(this.state.options);    
    };

    componentDidMount() {
        fetch('/botdetail', { headers: myHeaders })
            .then(response => response.json())
            .then(result => {
                const row = result.response.map(Key => {
                    return Key;
                });

                let col = [];

                col.push(
                    
                    {
                        label: 'Bot Title',
                        field: 'title',
                        width: 150,
                        sort: ''
                    },
                    {
                        label: 'Features',
                        field: 'features',
                        width: 300,
                        sort: ''
                    },
                    {
                        label: 'Tasks',
                        field: 'tasks',
                        width: 250,
                        sort: ''
                    },
                    {
                        label: 'Detailed Description',
                        field: 'detailed_des',
                        width: 400,
                        sort: ''
                    },
                    {
                        label: 'Version',
                        field: 'version',
                        width: 150,
                        sort: ''
                    },
                    {
                        label: 'Support',
                        field: 'support',
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
    
        fetch(`/botsTitle`, { headers: myHeaders })
        .then(response => response.json())
        .then(opt=> 
             this.setState({options:opt.response})
            )}

    render() {
        const { features, tasks, detailed_des, version, support, data, options} = this.state;
        return (
            <div>
                <div>
                    <h1>Bot Details Table</h1>
                    <form
                        className='needs-validation'
                        onSubmit={this.submitHandler}>
                        <MDBRow>
                            <MDBCol md='4'>
                                <MDBSelect
                                options={options}
                                label="Bot Title"
                                getValue = {this.optionHandler}
                                />
                            </MDBCol>
                        </MDBRow>

                        <MDBRow>
                            <MDBCol md='4'>
                                <MDBInput
                                    value={version}
                                    name='version'
                                    onChange={this.changeHandler}
                                    type='text'
                                    id='version'
                                    label='Version'
                                    required />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md='4' tag='section'>
                                <MDBInput
                                    value={features}
                                    labelClass='labelBg'
                                    outline type='textarea'
                                    onChange={this.changeHandler}
                                    id='features'
                                    label='Features'
                                    rows='2' />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md='4' tag='section'>
                                <MDBInput
                                    value={tasks}
                                    labelClass='labelBg'
                                    onChange={this.changeHandler}
                                    outline type='textarea'
                                    id='tasks'
                                    label='Tasks'
                                    rows='2' />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md='4' tag='section'>
                                <MDBInput
                                    value={detailed_des}
                                    labelClass='labelBg'
                                    onChange={this.changeHandler}
                                    outline type='textarea'
                                    id='detailed_des'
                                    label='Detailed Descriptions'
                                    rows='2' />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md='4' tag='section'>
                                <MDBInput
                                    value={support}
                                    labelClass='labelBg'
                                    onChange={this.changeHandler}
                                    outline type='textarea'
                                    id='support'
                                    label='Support'
                                    rows='2' />
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

BotDetails.propTypes = {
    createBotDetails: PropTypes.func.isRequired,
    updateBotDetails: PropTypes.func.isRequired,
    deleteBotDetails: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { createBotDetails, updateBotDetails, deleteBotDetails })
    (withRouter(BotDetails));
