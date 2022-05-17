import React from "react"

import { auth } from "../../../Firebase/FirebaseInit"
import { signOut } from "firebase/auth";

import User from "./User"


import AccountCircleIcon from '@mui/icons-material/AccountCircle';


import { Typography, Button, IconButton } from "@mui/material"

export default class Employee extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            page: "user",
            name: this.props.profile.name,
            email: this.props.profile.email,
            phone: this.props.profile.phone
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
                    <Typography variant="h5" align="left" style={{paddingLeft: 20}}> Employee </Typography>
                        
                    <br />
                    <br />

                    <IconButton 
                    style={{width: 100, borderRadius: 15, backgroundColor: this.state.page == "user" ? "#E5650F" : null}} 
                    onClick={() => this.setState({page: "clients"})}> 
                    <AccountCircleIcon />
                    </IconButton>

                    <br />
                    <br />
                 
                    <User profile={this.props.profile} profileId={this.props.profileId} />
                       
                    <br />
                    <br />
                    

                
                </div>
                
            )
        }
        
    }