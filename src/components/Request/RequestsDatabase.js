import React from "react"

import { db } from "../../../Firebase/FirebaseInit"
import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";

import RequestDisplay from "../Request/RequestDisplay"

import { Card, Grid, Typography, Modal, Button, ImageList, ImageListItem, ListSubheader, ImageListItemBar, IconButton } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';

import { DataGrid } from '@mui/x-data-grid';

export default class RequestsDatabase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            requests: [],
            request: null,
            editrequest: null
        };
        
    }

    componentDidMount() {
        
        const requestRef = collection(db, "requests")

        this.unsub = onSnapshot(requestRef, (requestSnap) => {

        this.setState({
            requests: []
        })
            
        requestSnap.forEach(async (request) => {

            let requestData = request.data()
            requestData.id = request.id

            console.log(request.data().created.toDate().toLocaleDateString())

            let requestDate = new Date(request.data().created.toDate())
            requestData.created = requestDate.toLocaleDateString()

            this.setState(prevState => ({
                requests: [...prevState.requests, requestData]
            }))
        });


        });

    }

    componentWillUnmount() {
        this.unsub()
      }

    render() {

        console.log(this.state.requests)

        const Columns = [
  
            { 
            field: 'email', 
            headerName: <Typography variant="h6" style={{fontFamily: "Signika", color: "#000000"}}> Email </Typography>, 
            flex: 1,
            minWidth: 50, 
            renderCell: (params) => (
                  
                <Button
                variant="contained"
                color="secondary"
                size="small"
                style={{ padding: 10 }}
                onClick={() => [this.setState({request: params.row.id})]}
              >
                {params.row.email} 
                </Button>
            ),
            },
            { 
            field: 'address', 
            headerName: <Typography variant="h6" style={{fontFamily: "Signika", color: "#000000"}}> Address </Typography>, 
            type: "text",
            flex: 1,
            minWidth: 50, 
            renderCell: (params) => (
                    
                <Typography style={{color: "#000000"}}> {params.row.address} </Typography>
            ),
            },
            { 
            field: 'created', 
            headerName: <Typography variant="h6" style={{fontFamily: "Signika", color: "#000000"}}> Created </Typography>, 
            type: "date",
            flex: 1,
            minWidth: 50, 
            renderCell: (params) => (
                  
              <Typography style={{color: "#000000"}}> {params.row.created} </Typography>
            ),
            }
          ]

        return (
            <>
                <DataGrid
                    autoHeight
                    pageSize={5}
                    rows={this.state.requests} 
                    columns={Columns} 
                />

                {this.state.request ? 
                <Modal 
                open={true} 
                onClose={() => this.setState({request: null})}
                style={{
                    overflowY: "auto",
                    overflowX: "hidden"
                }}>
                    <Card>
                    <Button variant="contained" color="primary" style={{margin: "5%"}} onClick={() => this.setState({request: null})}> Back </Button>
                    <RequestDisplay closeModal={() => this.setState({request: null})} requestId={this.state.request} />
                    </Card>
                
                </Modal>
                
                    :
                    null
                }
                
            </>
            
        )
    }
}