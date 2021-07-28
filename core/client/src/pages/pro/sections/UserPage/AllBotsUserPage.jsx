import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact";
import { CardList } from '../../../../components/card-list/CardList.component';
import workBenchLogo from '../../../../assets/workbench_logo_name.png';
import '../../../../pages/pro/sections/UserPage/AllBotsUserPage.css';

const myHeaders =
{
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
}

class AllBotsUserPage extends React.Component {
    constructor() {
        super()
        this.state = {
            BusinessProcess: [],
            application: [],
            categories: [],
            bots: [],
            botsFilter: [],
            searchField: '',
            // hover: false
        }
    }

    // toggleHover = () => {
    //     this.setState({hover: !this.state.hover})
    // }

    changeBusinessHandler = (type, id) => {
        let itemId = id;
        let bot;
        if (type === "category") {
            bot = this.state.bots.filter(item => item.cat_id.toString().includes(itemId))
        }
        else if (type === "application") {
            bot = this.state.bots.filter(item => item.app_id.toString().includes(itemId))
        }
        else {
            bot = this.state.bots.filter(item => item.bu_id.toString().includes(itemId))
        }
        this.setState({ botsFilter: bot });
    }

    showDetail = (botid) => {
        //console.log(botid);
        this.props.history.push({
                pathname: `/detail`,
                search: '?bot_id='+botid 
        })
    }

    componentDidMount() {
        fetch(`/businessprocess`, { headers: myHeaders })
            .then(response => response.json())
            .then(bu =>
                //console.log(bu.response)
                this.setState({ BusinessProcess: bu.response })
            )

        fetch(`/application`, { headers: myHeaders })
            .then(response => response.json())
            .then(app =>
                // console.log(app.response)
                this.setState({ application: app.response })
            )

        fetch(`/categories`, { headers: myHeaders })
            .then(response => response.json())
            .then(cat =>
                // console.log(cat.response)
                this.setState({ categories: cat.response })
            )

        fetch(`/bots`, { headers: myHeaders })
            .then(response => response.json())
            .then(bot =>
                // console.log(bot.response)
                this.setState({ bots: bot.response })
            )
    }

    render() {
        const { BusinessProcess, application, categories, bots, botsFilter, searchField } = this.state;
        const filteredBots = bots.filter(items => items.title.toLowerCase().includes(searchField.toLowerCase()))
        // var linkStyle;
        // if (this.state.hover) {
        //     linkStyle = {color: 'blue',cursor: 'pointer'}
        //   } else {
        //     linkStyle = {color: '#000'}
        //   }
        
        //console.log(localStorage.getItem('token'));

        return (
            <MDBContainer fluid>
                <MDBRow>
                    <MDBCol md='3'>
                        <div className='logoStyle'>
                            <img src={workBenchLogo} alt='logo' />
                        </div>
                    </MDBCol>
                    <MDBCol md="9" className='searchStyle'>
                        <div className='input-group md-form form-sm form-1 pl-0'>
                            <div className='input-group-prepend'>
                                <span
                                    className='input-group-text cyan lighten-2'
                                    id='basic-text1'>
                                    <MDBIcon icon='search' className='text-grey' />
                                </span>
                            </div>
                            <input
                                className='form-control my-0 py-1'
                                type='text'
                                placeholder='Search'
                                aria-label='Search'
                                onChange={e => this.setState({ searchField: e.target.value })} />
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBRow className='tilePad'>
                    <MDBCol md="2">
                        <MDBRow className='leftNav'>
                            <h6 className='leftText'>Business Process</h6>
                            <div className='renderTextStyle'>
                                {BusinessProcess.map(business =>
                                    <p className='leftAlign'
                                        // onClick={() => this.changeBusinessHandler(business.bu_id)}
                                        key={business.bu_id}>{business.bu_name}</p>
                                )}
                            </div>
                        </MDBRow>
                        <MDBRow className='leftNav'>
                            <h6 className='leftText'>Categories</h6>
                            <div className='renderTextStyle'>
                                {categories.map(cate =>
                                    <p className='leftAlign'
                                        onClick={() => this.changeBusinessHandler('category', cate.cat_id)}
                                        key={cate.cat_id}>{cate.cat_name}</p>
                                )}
                            </div>
                        </MDBRow>
                        <MDBRow className='leftNav'>
                            <h6 className='leftText'>Application</h6>
                            <div className='renderTextStyle'>
                                {application.map(appl =>
                                    <p className='leftAlign'
                                        // style={linkStyle}
                                        onClick={() => this.changeBusinessHandler('application', appl.app_id)}
                                        key={appl.app_id}>{appl.app_name}</p>
                                )}
                            </div>
                        </MDBRow>
                    </MDBCol>
                    <MDBCol md="10">
                        <CardList
                            showDetail={this.showDetail}
                            bots={botsFilter.length > 0 ? botsFilter : filteredBots} />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}
export default AllBotsUserPage