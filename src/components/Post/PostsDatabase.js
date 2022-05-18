import React from "react"

import { db } from "../../../Firebase/FirebaseInit"
import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";

import EditPost from "./EditPost"
import PostDisplay from "./PostDisplay";

import { Card, Grid, Typography, Modal, Button, ImageList, ImageListItem, ListSubheader, ImageListItemBar, IconButton } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';

import { DataGrid } from '@mui/x-data-grid';

import ImgsDisplay from "./ImgsDisplay";

export default class PostsDatabase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            post: null,
            editPost: null
        };
        
    }

    componentDidMount() {
        
        const postRef = collection(db, "posts")

        this.unsub = onSnapshot(postRef, (postSnap) => {

        this.setState({
            posts: []
        })
            
        postSnap.forEach(async (post) => {

            let postData = post.data()
            postData.id = post.id

            let postDate = new Date(post.data().completed.replace(/-/g, '\/'))
            postData.completed = postDate.toLocaleDateString()

            this.setState(prevState => ({
                posts: [...prevState.posts, postData]
            }))
        });


        });

    }

    componentWillUnmount() {
        this.unsub()
      }

    render() {

        console.log(this.state.posts)

        const Columns = [
  
            { 
            field: 'title', 
            headerName: <Typography variant="h6" style={{fontFamily: "Signika", color: "#000000"}}> Title </Typography>, 
            flex: 1,
            minWidth: 50, 
            renderCell: (params) => (
                  
                <Button
                variant="contained"
                color="secondary"
                size="small"
                style={{ padding: 10, backgroundColor: "#" }}
                onClick={() => [this.setState({post: params.row.id})]}
              >
                {params.row.title} 
                </Button>
            ),
            },
            
            { 
            field: 'completed', 
            headerName: <Typography variant="h6" style={{fontFamily: "Signika", color: "#000000"}}> Completed </Typography>, 
            type: "date",
            flex: 1,
            minWidth: 50, 
            renderCell: (params) => (
                  
              <Typography style={{color: "#000000"}}> {params.row.completed} </Typography>
            ),
            }
          ]

        return (
            <>
                <DataGrid
                    autoHeight
                    pageSize={5}
                    rows={this.state.posts} 
                    columns={Columns} 
                />

                {this.state.post ? 
                <Modal 
                open={true} 
                onClose={() => this.setState({post: null})}
                style={{
                    overflowY: "auto",
                    overflowX: "hidden"
                }}>
                    <Card>
                    <Button variant="contained" color="primary" style={{margin: "5%"}} onClick={() => this.setState({post: null})}> Back </Button>
                    <PostDisplay closeModal={() => this.setState({post: null})} postId={this.state.post} />
                    </Card>
                
                </Modal>
                
                    :
                    null
                }
                
            </>
            
        )
    }
}