import React from "react"

import Head from "next/head"

import NewPost from "../components/NewPost"
import PostsDisplay from "../components/PostsDisplay"


import { Grid, Card, Button, Modal, Typography } from "@mui/material"

export default class Work extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            newPost: false
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

        console.log(this.state)


        return (
            <div >
                <Head>
                <title>Our Work</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Web applications have expanded throughout the development of the internet. Users expect their experience to be fast, reliable, and easy. Bergquist Applications is a suite of libraries, built on the cloud, to deliver on these expectations." />
                <meta name="keywords" content="Progressive Web Development, Modern Development Tools, Database, Styled Components, Authentication, Payment Processing" />

                
                </Head>

                <Button 
                    variant="contained"
                    onClick={() => this.setState({newPost: !this.state.newPost})}
                    style={{color: "#E5650F", backgroundColor: "#FFFFFF", margin: "2%"}}
                > 
                New Post 
                </Button>

                <PostsDisplay />



               {this.state.newPost ? 
               <Modal 
               open={true} 
               onClose={() => this.setState({newPost: false})}
               style={{
                 overflowY: "auto",
                 overflowX: "hidden"
               }}>
                 <Card>
                   <Button variant="contained" color="primary" style={{margin: "5%"}} onClick={() => this.setState({newPost: false})}> Back </Button>
                   <NewPost closeModal={() => this.setState({newPost: false})} />
                 </Card>
               
               </Modal>
               
                :
                null
                }
                           
            </div>
        )
    }
    
}