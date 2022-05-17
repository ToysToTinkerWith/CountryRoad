import React from "react"

import { db } from "../../../Firebase/FirebaseInit"
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";

import ImgDisplay from "./CommentsDisplay"

import { Card, Grid, Typography, TextField, Button, ImageList, ImageListItem, ListSubheader, ImageListItemBar, IconButton, Modal } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info';

import { motion } from "framer-motion"

export default class CommentsDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: "",
            comments: [],
            comment: null
        };
        this.sendComment = this.sendComment.bind(this)
        this.handleChange = this.handleChange.bind(this)
        
    }

    componentDidMount() {
        
        const commentsRef = collection(db, "posts", this.props.postId, "imgs", this.props.img[1], "comments")

        const commentsQuery = query(commentsRef, orderBy("created", "desc"))

        this.unsub = onSnapshot(commentsQuery, (commentsSnap) => {

        this.setState({
            comments: []
        })
            
        commentsSnap.forEach(async (comment) => {
            this.setState(prevState => ({
                comments: [...prevState.comments, comment.data()]
            }))
        });


        });

    }

    componentWillUnmount() {
        this.unsub()
      }

    async sendComment() {

        if (this.state.message !== "") {
            const commentsRef = collection(db, "posts", this.props.postId, "imgs", this.props.img[1], "comments")

            await addDoc(commentsRef, {
                message: this.state.message,
                created: serverTimestamp()
                
            }).then(
                this.setState({
                    message: ""
                })
            )

        }

        

    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
        [name]: value

        });
    }
    

    render() {

        console.log(this.props)
        return (
            <>
            <Typography variant="h4" style={{fontFamily: "Anton", margin: "5%", marginTop: "2%", marginBottom: "2%"}} > {this.props.img[0].message} </Typography>
            <img src={this.props.img[0].url} alt="img" style={{width: "100%"}} />
            <br />
            <br />
            <TextField
                color="primary"
                variant="outlined"
                multiline
                rows={5}
                value={this.state.message}
                type="text"
                label={"Comment"}
                name={"message"}
                style={{width: "80%", display: "flex", margin: "auto"}}
                onChange={this.handleChange}
            />
            <Button variant="contained" style={{position: "relative", backgroundColor: "#E5650F", float: "right", marginRight: "10%"}} onClick={() => this.sendComment()} > send </Button>
            <br />
            <br />
            {this.state.comments.length > 0 ?
            this.state.comments.map((comment, index) => {
                return (
                    <Typography variant="h6" style={{border : "1px solid black", borderRadius: 5, marginLeft: "10%", marginRight: "10%", marginTop: "2%", marginBottom: "2%", padding: "2%"}}> {comment.message} </Typography>
                )
                    
                    
                      
            })
            :
            null
            }    
                
                  
            </>
        )
    }
}