import React from 'react';
import { MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBDataTableV5 } from 'mdbreact';
import SectionContainer from './sectionContainer';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const myHeaders =
{
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
}

class Files extends React.Component {
    constructor() {
        super();
        this.state = {
            dropDownDetails: [],
            data: {
                columns: [],
                rows: []
            },
            selectedFile: null,
            selectedBotId: '',
            checkBoxCount: 0
        }
    }

    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        }, console.log(this.state.selectedFile))
    }


    onClickVideoHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        data.append('type', "video")
        data.append('bot_det_id', this.state.selectedBotId)
        axios.post(`/upload`, data, { headers: myHeaders })
            .then(res => { // then print response status
                toast(res.data.message)
                this.setState({ selectedFile: '' })
            })
        this.setState({ selectedFile: '' })
    }

    onClickFileHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        data.append('type', "file")
        data.append('bot_det_id', this.state.selectedBotId)
        axios.post(`/upload`, data, { headers: myHeaders })
            .then(res => { // then print response status
                toast(res.data.message)
                this.setState({ selectedFile: '' })
            })
        this.setState({ selectedFile: '' })
    }

    showLogs = e => {
      if(e.checked){
        this.setState({checkBoxCount: 1})
      }else{
        this.setState({checkBoxCount: 0})
      }
        this.setState({ filestore: e, selectedBotId: e.bot_det_id, isDelete: true, isUpdate: true }, console.log(this.state.filestore));
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
                        label: 'Artefact',
                        field: 'artefact_path',
                        width: 150,
                        sort: ''
                    },
                    {
                        label: 'Video',
                        field: 'video_path',
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

        // fetch('/botTitleDropDown', { headers: myHeaders })
        //     .then(response => response.json())
        //     .then(opt =>
        //         this.setState({ dropDownDetails: opt.response }, ()=>console.log(this.state.dropDownDetails))
        //     )
    }

    render() {
        const { data } = this.state;
        return (
            <div>
                <div>
                    <form>
                    { this.state.checkBoxCount ? <MDBRow>
                            <MDBCol md='4' tag='section' style={{ marginRight: '56px' }}>
                                <h5 style={{ fontSize: '26px', fontWeight: 'Bold' }}>Artefact</h5>
                                <input type="file" name="file" onChange={this.onChangeHandler} />
                            </MDBCol>
                            <MDBBtn  onClick={this.onClickFileHandler} color='indigo'>upload</MDBBtn>
                        </MDBRow>: null }

                        { this.state.checkBoxCount ? <MDBRow style={{ marginTop: '10px' }}>
                            <MDBCol md='4' tag='section' style={{ marginLeft: '15px' }}>
                                <h5 style={{ fontSize: '26px', fontWeight: 'bold' }}>Video</h5>
                                <input type="file" name="file" onChange={this.onChangeHandler} />
                            </MDBCol>
                          <MDBBtn style={{ float: 'left' }} onClick={this.onClickVideoHandler} color='indigo'> upload</MDBBtn>
                        </MDBRow> : null }
                    </form>
                </div>
                <div>
                    <MDBRow className='py-3'>
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


export default Files; 