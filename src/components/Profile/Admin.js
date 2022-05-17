import React from "react"

import { auth } from "../../../Firebase/FirebaseInit"
import { signOut } from "firebase/auth";

import User from "./User"
import RequestsDatabase from "../Request/RequestsDatabase";
import NewRequest from "../Request/NewRequest"


import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';


import { Typography, Button, IconButton, Modal, Card } from "@mui/material"

export default class Employee extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            page: "user",
            newRequest: false
        }
            
        this.handleChange = this.handleChange.bind(this)
        
    }

    componentDidMount() {
        
    }


    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
        [name]: value,
        success: "",
        error: ""
        });
      }


     

    render() {
        
        
            return (

               

                <div style={{textAlign: "center"}}>
                   
                    <br />
                    <br />
                    <Button 
                    variant="contained" 
                    onClick={async () => await signOut(auth).then(window.location.href = "/")}
                    style={{ display: "flex", float: "right", backgroundColor: "#E5650F", borderRadius: 15, marginRight: 10, padding: 10 }}
                    >
                    Log Out
                    </Button>
                    <Typography variant="h5" align="left" style={{paddingLeft: 20}}> Admin </Typography>

                    <Button 
                    variant="contained" 
                    onClick={() => this.setState({newRequest: true})}
                    style={{ display: "flex", float: "left", backgroundColor: "#E5650F", borderRadius: 15, margin: 10, padding: 10 }}
                    >
                    New Request
                    </Button>
                        
                    <br />
                    <br />

                    <IconButton 
                    style={{width: 100, borderRadius: 15, backgroundColor: this.state.page == "user" ? "#E5650F" : null}} 
                    onClick={() => this.setState({page: "user"})}> 
                    <AccountCircleIcon />
                    </IconButton>

                    <IconButton 
                    style={{width: 100, borderRadius: 15, backgroundColor: this.state.page == "requests" ? "#E5650F" : null}} 
                    onClick={() => this.setState({page: "requests"})}> 
                    <HelpCenterIcon />
                    </IconButton>

                    <br />
                    <br />

                    {this.state.page == "user" ? 
                        <User profile={this.props.profile} profileId={this.props.profileId} />
                        :
                        null
                    }

                    {this.state.page == "requests" ? 
                        <RequestsDatabase profile={this.props.profile} profileId={this.props.profileId} />
                        :
                        null
                    }

                    {this.state.newRequest ? 
                    <Modal 
                    open={true} 
                    onClose={() => this.setState({newRequest: null})}
                    style={{
                        overflowY: "auto",
                        overflowX: "hidden"
                    }}>
                        <Card>
                        <Button variant="contained" color="primary" style={{margin: "5%"}} onClick={() => this.setState({newRequest: null})}> Back </Button>
                        <NewRequest closeModal={() => this.setState({newRequest: null})} />
                        </Card>
                    
                    </Modal>
                    
                        :
                        null
                    }
                 
                       
                    <br />
                    <br />
                    

                
                </div>
                
            )
        }
        
    }