import React from "react"

import CombineAll from "./CombineAll"

import { Grid, Card, Button, Modal, Typography } from "@mui/material"

export default class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 1000,
            height: 1000
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
      }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      }


    componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    }
    
    componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    }
      
    render() {

        if(typeof window !== "undefined") {
            return (
                <div style={{backgroundColor: "#000000"}}>
                       <Grid container >
                            <Grid item xs={12} sm={9} md={9} style={{ padding: "2%"}}>
                                
                                <Button style={{display: "block"}} href="/" >
                                <Typography 
                                variant="h3" 
                                align="center"
                                style={{
                                    fontFamily: "Anton",
                                    color: "#FFFFFF",
                                    
                                }}
                                > 
                                <b>Country Road</b>
                                </Typography>
                                

                                </Button>
                                <Typography 
                                variant="h4" 
                                align="center"
                                style={{
                                    fontFamily: "Anton",
                                    color: "#E5650F",
                                    
                                }}
                                > 
                                <b>DRIVEWAYS</b>
                                </Typography>
                                
                            </Grid>
                            
                            <Grid item xs={12} sm={3} md={3} style={{display: "grid", margin: "auto", padding: "2%"}}>

                                <>
                                    <Button 
                                    variant="text"
                                    style={{
                                    color: window.location.pathname == "/" ? "#E5650F" : "#FFFFFF",
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                    textTransform: "unset"
                                    }}
                        
                                    href="/"
                                    
                                    > 
                                    <Typography variant="h6" style={{fontFamily: "Anton", letterSpacing: "1px"}}>
                                    <b>Home </b>
                                    </Typography>
                                    </Button>
                                    <Button 
                                    variant="text"
                                    style={{
                                    color: window.location.pathname == "/about" ? "#E5650F" : "#FFFFFF",
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                    textTransform: "unset"
                                    }}
                        
                                    href="/about"
                                    
                                    > 
                                    <Typography variant="h6" style={{fontFamily: "Anton", letterSpacing: "1px"}}>
                                    <b>About us</b>
                                    </Typography>
                                    </Button>
                                    <Button 
                                    variant="text"
                                    style={{
                                    color: window.location.pathname == "/work" ? "#E5650F" : "#FFFFFF",
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                    textTransform: "unset"
                    
                                    }}
                            
                                    href="/work"
                        
                                    > 
                                    <Typography variant="h6" style={{fontFamily: "Anton", letterSpacing: "1px"}}>
                                    <b>Our Work</b>
                                    </Typography>
                                    </Button>
                                    
                                    
                                    <Button 
                                    variant="text"
                                    style={{
                                        color: window.location.pathname == "/contact" ? "#E5650F" : "#FFFFFF",
                                        paddingLeft: 20,
                                        paddingRight: 20,
                                        textTransform: "unset"
                                    }}
                                    href="/contact"
                                    > 
                                    <Typography variant="h6" style={{fontFamily: "Anton", letterSpacing: "1px"}}>
                                    <b>Contact</b>
                                    </Typography>
                                    </Button>
                                </>
                                
                            </Grid>
                    </Grid> 

                        <Typography variant="body1" style={{color: "#FFFFFF", fontFamily: "Signika", letterSpacing: "1px", marginLeft: "5%"}}>
                            <b>#COUNTRL835PD</b>
                        </Typography>
                        <Typography variant="body1" style={{color: "#FFFFFF", fontFamily: "Signika", letterSpacing: "1px", marginLeft: "5%", paddingBottom: "2%"}}>
                            <b>Copyright © 2022 Country Road Driveways - All Rights Reserved.</b>
                        </Typography>
                </div>
            )
        }

        else {
            return (
                <></>
            )
        }


        
    }
    
}