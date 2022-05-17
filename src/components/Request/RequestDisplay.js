import React from "react"

import { db } from "../../../Firebase/FirebaseInit"
import { collection, query, orderBy, onSnapshot, doc } from "firebase/firestore";

import EditRequest from "./EditRequest";


import { Card, Grid, Typography, Button, ImageList, ImageListItem, ListSubheader, ImageListItemBar, IconButton, Modal } from "@mui/material"

import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';



export default class RequestDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            request: null,
            editRequest: null,
            imgs: [],
            img: null
        };
        
    }

    componentDidMount() {

        const requestRef = doc(db, "requests", this.props.requestId)

        this.unsub = onSnapshot(requestRef, (requestSnap) => {

            this.setState({
                request: requestSnap.data()
            })


        })
        
        const imgsRef = collection(db, "requests", this.props.requestId, "imgs")

        const imgsQuery = query(imgsRef, orderBy("created", "asc"))

        this.unsub2 = onSnapshot(imgsQuery, (imgsSnap) => {

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

        let requestDate

        if (this.state.request) {
            requestDate = new Date(this.state.request.created.toDate())
        }

        return (
            <>
            {this.state.request ?
            <>
            <IconButton onClick={() => this.setState({editRequest: this.props.requestId})} style={{float: "right", margin: 30}}> <EditIcon /> </IconButton>
            <Typography variant="h5" style={{color: "#E5650F", fontFamily: "Signika", margin: "10%", marginTop: "2%", marginBottom: "2%"}}> {this.state.request.title}</Typography>
            <Typography variant="h5" style={{color: "#E5650F", fontFamily: "Signika", margin: "10%", marginTop: "2%", marginBottom: "2%"}}> {this.state.request.email}</Typography>
            <Typography variant="h4" style={{color: "#E5650F", fontFamily: "Signika", margin: "10%", marginTop: "2%", marginBottom: "2%"}}> {this.state.request.phone}</Typography>
            <Typography variant="h5" style={{color: "#E5650F", fontFamily: "Signika", margin: "10%", marginTop: "2%", marginBottom: "2%"}}> {this.state.request.address}</Typography>


            <Typography variant="h6" style={{color: "#000000", fontFamily: "Signika", margin: "10%", marginTop: "2%", marginBottom: "2%"}}> {this.state.request.description}</Typography>
            <Typography variant="h5" style={{color: "#000000", fontFamily: "Signika", margin: "10%", marginTop: "2%", marginBottom: "2%"}}> Recieved: {requestDate.toDateString()}</Typography>
            <Typography variant="h5" style={{color: "#000000", fontFamily: "Signika", margin: "10%", marginTop: "2%", marginBottom: "2%"}}> Scheduled: {new Date(this.state.request.scheduled + "T16:00").toDateString()}</Typography>
            <Typography variant="h3" style={{color: "#000000", fontFamily: "Signika", margin: "10%", marginTop: "2%", marginBottom: "2%"}}> ${this.state.request.estimate}</Typography>


            
            </>
            :
            null
            }
            
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
                    onClick={() => this.setState({img: null})}
                    style={{
                        overflowY: "auto",
                        overflowX: "hidden"
                    }}>
                        <img src={this.state.img[0].url} alt={"RequestImg"} />
                    
                    </Modal>
                    
                        :
                        null
                    }

                    {this.state.editRequest ? 
                    <Modal 
                    open={true} 
                    onClose={() => this.setState({editRequest: null})}
                    
                    style={{
                        overflowY: "auto",
                        overflowX: "hidden"
                    }}>
                        <Card>
                        <Button variant="contained" color="primary" style={{margin: "5%"}} onClick={() => this.setState({editRequest: null})}> Back </Button>
                        <EditRequest closeModal={() => this.setState({editRequest: null})} requestId={this.state.editRequest} />
                        </Card>
                    
                    </Modal>
                    
                        :
                        null
                    }
                        
                  
            </>
        )
    }
}