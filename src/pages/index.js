import React from "react"

import Head from "next/head"

import { db } from "../../Firebase/FirebaseInit"
import { doc, collection, onSnapshot, addDoc, updateDoc, serverTimestamp, arrayUnion } from "firebase/firestore";

import { motion } from "framer-motion"

import { Grid, Card, Button, Modal, Typography } from "@material-ui/core"

export default class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            imgs: []
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
        
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      }


    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        const postsRef = collection(db, "posts")

        this.unsub = onSnapshot(postsRef, (postSnap) => {

            this.setState({imgs: []})
                
            postSnap.forEach((post) => {
                console.log(post.id)
                const imgsRef = collection(db, "posts", post.id, "imgs")
                
                this.unsub2 = onSnapshot(imgsRef, (imgsSnap) => {

                    imgsSnap.forEach((img) => {
                        if (img.data().message && this.state.imgs.length < 10) {
                            this.setState(prevState => ({
                                imgs: [...prevState.imgs, img.data()]
                            }))
                        }
                    });
                });
            });
    
    
        });


    }
    
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        this.unsub()
        this.unsub2()

    }
      
    render() {

        console.log(this.state)


        return (
            <div>
                <Head>
                <title>Country Road</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Web applications have expanded throughout the development of the internet. Users expect their experience to be fast, reliable, and easy. Bergquist Applications is a suite of libraries, built on the cloud, to deliver on these expectations." />
                <meta name="keywords" content="Progressive Web Development, Modern Development Tools, Database, Styled Components, Authentication, Payment Processing" />

                
                </Head>

                <Grid container style={{position: "relative", top: "10vh"}}>
                    <Grid item xs={12} sm={12} md={6}>
                        {this.state.width < 960 ? 
                        <>
                        <Typography align="center" variant="h1" style={{fontFamily: "Anton", color: "#FFFFFF", marginLeft: "5%", marginRight: "5%"}}> COUNTRY ROAD</Typography>
                        <Typography align="center" variant="h2" style={{fontFamily: "Anton", color: "#E5650F", marginLeft: "5%", marginRight: "5%"}}> DRIVEWAYS</Typography>
                        </>
                        :
                        <>
                        <Typography align="right" variant="h1" style={{fontFamily: "Anton", color: "#FFFFFF", marginLeft: "5%", marginRight: "5%"}}> COUNTRY ROAD</Typography>
                        <Typography align="right" variant="h2" style={{fontFamily: "Anton", color: "#E5650F", marginLeft: "5%", marginRight: "5%"}}> DRIVEWAYS</Typography>
                        </>
                        }
                        <Typography align="center" variant="h5" style={{fontFamily: "Signika", color: "#000000", margin: "5%", marginTop: "15%"}}> Gravel Driveways and Roads.</Typography>
                        <Typography align="center" variant="h5" style={{fontFamily: "Signika", color: "#000000", margin: "5%"}}> Maintenance and New Construction.</Typography>
                        <Typography align="center" variant="h5" style={{fontFamily: "Signika", color: "#000000", margin: "5%"}}> Serving Whidbey Island.</Typography>
                        <Typography align="center" variant="h5" style={{fontFamily: "Signika", color: "#000000", margin: "5%", marginBottom: "15%"}}> Affordable. Efficient. Local.</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        {this.state.imgs.length > 0 ? this.state.imgs.map((img, index) => {
                            
                            return (
                                <div key={index}>
                                    <motion.img animate={{width: ["0%", "70%", "70%", "70%","70%", "0%"]}} transition={{duration: 10, delay: index * 10}} src={img.url} alt={img.message} style={{width: "0%", borderRadius: 15, maxHeight: 800, display: "flex", margin: "auto"}} />
                                </div>
                            )
                        })
                        :
                        null
                        }
                    </Grid>
                </Grid>



     
                        


                           
            </div>
        )
    }
    
}