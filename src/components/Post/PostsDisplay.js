import React from "react"

import { db } from "../../../Firebase/FirebaseInit"
import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";

import EditPost from "./EditPost"

import { Card, Grid, Typography, Modal, Button, ImageList, ImageListItem, ListSubheader, ImageListItemBar, IconButton } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';

import { motion } from "framer-motion"
import ImgsDisplay from "./ImgsDisplay";

export default class PostsDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            editPost: null
        };
        
    }

    componentDidMount() {
        
        const postRef = collection(db, "posts")

        const postQuery = query(postRef, orderBy("completed", "desc"), limit(4))

        this.unsub = onSnapshot(postQuery, (postSnap) => {

        this.setState({
            posts: []
        })
            
        postSnap.forEach(async (post) => {
            this.setState(prevState => ({
                posts: [...prevState.posts, [post.data(), post.id]]
            }))
        });


        });

    }

    componentWillUnmount() {
        this.unsub()
      }

    render() {

        return (
            <>
            <Grid container >
            {this.state.posts.length > 0 ?
            this.state.posts.map((post, index) => {
                console.log(post[0].completed)
                let postDate = new Date(post[0].completed.replace(/-/g, '\/'))
                console.log(postDate)
                return (
                    <Grid item xs={12} sm={6} style={{padding: "2%", borderRight: "1px solid white"}}>
                        <IconButton onClick={() => this.setState({editPost: post[1]})} style={{float: "right"}}> <EditIcon style={{color: "#FFFFFF"}} /> </IconButton>
                        <Typography variant="h3" style={{color: "#E5650F", fontFamily: "Anton", margin: "10%", marginTop: "2%", marginBottom: "2%"}}> {post[0].title}</Typography>
                        <Typography variant="h6" style={{color: "#FFFFFF", fontFamily: "Signika", margin: "10%", marginTop: "2%", marginBottom: "2%"}}> {post[0].description}</Typography>
                        <Typography variant="h4" style={{color: "#FFFFFF", fontFamily: "Signika", margin: "10%", marginTop: "2%", marginBottom: "2%"}}> {postDate.toDateString()}</Typography>
                        <ImgsDisplay postId={post[1]} />
                    </Grid>
                        
                        
                        )
                    })
                    
                    :
                    null
                    }
            </Grid>

            {this.state.editPost ? 
               <Modal 
               open={true} 
               onClose={() => this.setState({editPost: null})}
               style={{
                 overflowY: "auto",
                 overflowX: "hidden"
               }}>
                 <Card>
                   <Button variant="contained" color="primary" style={{margin: "5%"}} onClick={() => this.setState({editPost: null})}> Back </Button>
                   <EditPost closeModal={() => this.setState({editPost: null})} postId={this.state.editPost} />
                 </Card>
               
               </Modal>
               
                :
                null
                }
            </>
        )
    }
}