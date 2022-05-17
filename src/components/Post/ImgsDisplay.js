import React from "react"

import { db } from "../../../Firebase/FirebaseInit"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

import CommentsDisplay from "./CommentsDisplay"

import { Card, Grid, Typography, Button, ImageList, ImageListItem, ListSubheader, ImageListItemBar, IconButton, Modal } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info';

import { motion } from "framer-motion"

export default class ImgsDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imgs: [],
            img: null
        };
        
    }

    componentDidMount() {
        
        const imgsRef = collection(db, "posts", this.props.postId, "imgs")

        const imgsQuery = query(imgsRef, orderBy("created", "asc"))

        this.unsub = onSnapshot(imgsQuery, (imgsSnap) => {

        this.setState({
            imgs: []
        })
            
    imgsSnap.forEach(async (img) => {
            this.setState(prevState => ({
                imgs: [...prevState.imgs, [img.data(), img.id]]
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
            <ImageList >
            {this.state.imgs.length > 0 ?
            this.state.imgs.map((img, index) => {
                return (
                    <ImageListItem key={index}>
                    <img
                        src={img[0].url}
                        alt="img"
                        loading="lazy"
                    />
                    
                    <ImageListItemBar
                        title={img[0].message}
                        actionIcon={
                        <IconButton
                            onClick={() => this.setState({img: img})}
                        >
                            <InfoIcon color="secondary" />
                        </IconButton>
                        }
                    />
                    </ImageListItem>
                )
                    })
                    :
                    null
                    }
                    </ImageList>
                        
                    {this.state.img ? 
                    <Modal 
                    open={true} 
                    onClose={() => this.setState({img: null})}
                    style={{
                        overflowY: "auto",
                        overflowX: "hidden"
                    }}>
                        <Card>
                        <Button variant="contained" color="primary" style={{margin: "5%", marginTop: "2%", marginBottom: "2%"}} onClick={() => this.setState({img: null})}> Back </Button>
                        <CommentsDisplay postId={this.props.postId} img={this.state.img} />
                        </Card>
                    
                    </Modal>
                    
                        :
                        null
                    }    
                        
                  
            </>
        )
    }
}