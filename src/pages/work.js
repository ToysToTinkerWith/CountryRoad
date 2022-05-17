import React from "react"

import Head from "next/head"

import NewPost from "../components/Post/NewPost"
import PostsDisplay from "../components/Post/PostsDisplay"
import PostsDatabase from "../components/Post/PostsDatabase"



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

                <Grid container alignItems="center" >
                    <Grid item xs={12} sm={6} md={6}>
                        <>
                        <Typography align="center" variant="h2" style={{fontFamily: "Anton", color: "#FFFFFF", margin: "5%"}}> OUR WORK </Typography>
                        </>
                        
                        
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        
                    <Typography align="center" variant="h6" style={{fontFamily: "Signika", color: "#000000", margin: "5%", marginTop: "5%"}}> As a local company, we’ve seen the positive impact our solutions have had on the wellbeing of our neighbors and the community at large, and we are looking forward to continuing to work with our customers to enhance their travels around Whidbey Island.</Typography>

                    </Grid>
                </Grid>

                

                <div style={{backgroundColor: "#000000"}}>
                <Typography align="left" variant="h3" style={{fontFamily: "Anton", color: "#E5650F", padding: "5%", marginBottom: 0}}> RECENT JOBS</Typography>

                  <Button 
                      variant="contained"
                      onClick={() => this.setState({newPost: !this.state.newPost})}
                      style={{color: "#E5650F", backgroundColor: "#FFFFFF", margin: "2%"}}
                  > 
                  New Post 
                  </Button>
                  <PostsDisplay />
                </div>

                <div style={{backgroundColor: "#FFFFFF"}}>
                  <Typography align="left" variant="h3" style={{fontFamily: "Anton", color: "#000000", padding: "5%", marginBottom: 0}}> JOB DATABASE</Typography>

                  <PostsDatabase />
                </div>


                



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