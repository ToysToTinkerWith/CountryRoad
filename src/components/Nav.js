import React from "react"

import CombineAll from "./CombineAll"

import { Grid, Card, Button, Modal, Typography } from "@mui/material"

export default class Nav extends React.Component {

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
                <div >
                   
                    
                   
                        <Button href="/" style={{ marginLeft: "5%"}} >
                        <img src="/SmallLogo.svg" alt="smalllogo" style={{width: "10vw", minWidth: 50, maxWidth: 150}} />
                        </Button>

                        {this.state.width < 500 ?
                        <CombineAll />
                        :
                        <>
                            <Button 
                            variant="text"
                            style={{
                            color: window.location.pathname == "/Contact" ? "#FFFFFF" : "#000000",
                            float: "right",
                            padding: "2%",
                            marginTop: "2%",
                            marginRight: "2%"
                            }}
                
                            href="/Contact"
                            
                            > 
                            <Typography variant="h5" style={{fontFamily: "Anton"}}>
                            Contact
                            </Typography>
                            </Button>

                            <Button 
                            variant="text"
                            style={{
                            color: window.location.pathname == "/Work" ? "#FFFFFF" : "#000000",
                            float: "right",
                            padding: "2%",
                            marginTop: "2%"
                            }}
                
                            href="/Work"
                            
                            > 
                            <Typography variant="h5" style={{fontFamily: "Anton"}}>
                            Our Work
                            </Typography>
                            </Button>

                            <Button 
                            variant="text"
                            style={{
                            color: window.location.pathname == "/About" ? "#FFFFFF" : "#000000",
                            float: "right",
                            padding: "2%",
                            marginTop: "2%"
                            }}
                
                            href="/About"
                            
                            > 
                            <Typography align="right" variant="h5" style={{fontFamily: "Anton"}}>
                            About us
                            </Typography>
                            </Button>
                        
                        
                            <Button 
                            variant="text"
                            style={{
                            color: window.location.pathname == "/" ? "#FFFFFF" : "#000000",
                            float: "right",
                            padding: "2%",
                            marginTop: "2%"
                            }}
                
                            href="/"
                            > 
                            <Typography variant="h5" style={{fontFamily: "Anton"}}>
                            Home
                            </Typography>
                            </Button>
                        </>
                        }
                        <hr />
          
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