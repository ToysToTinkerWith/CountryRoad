import React from "react"

import { auth } from "../../../Firebase/FirebaseInit"
import { signOut } from "firebase/auth";

import EditUser from "./EditUser"


import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';



import { Typography, Button, IconButton, Modal, Card, Avatar } from "@mui/material"

export default class User extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            editUser: null
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
        
        console.log(this.props.profileId)
        
            return (

               

                <div style={{textAlign: "center"}}>
                   
                   <IconButton onClick={() => this.setState({editUser: true})} style={{position: "relative", left: "40%"}}> <EditIcon style={{color: "#E5650F"}} /> </IconButton>
                   
                   <Avatar src={this.props.profile.profilePic} style={{display: "flex", margin: "auto", width: 200, height: "auto"}} />

                    <Typography variant="h3" align="center"> {this.props.profile.name} </Typography>
                    <Typography variant="h4" align="center"> {this.props.profile.email}  </Typography>
                    
                    <Typography variant="h4" align="center"> {this.props.profile.phone} </Typography>
                    <Typography variant="h4" align="center"> {this.props.profile.description} </Typography>



                    {this.state.editUser ? 
                        <Modal 
                        open={true} 
                        onClose={() => this.setState({editUser: null})}
                        style={{
                            overflowY: "auto",
                            overflowX: "hidden"
                        }}>
                            <Card>
                            <Button variant="contained" color="primary" style={{margin: "5%"}} onClick={() => this.setState({editUser: null})}> Back </Button>
                            <EditUser closeModal={() => this.setState({editUser: null})} profileId={this.props.profileId} />
                            </Card>
                        
                        </Modal>
                    
                        :
                        null
                    }
                   

                       
                   
                </div>
                
            )
        }
        
    }