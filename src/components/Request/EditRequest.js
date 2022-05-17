import React from "react"

import { db } from "../../../Firebase/FirebaseInit"
import { doc, collection, addDoc, updateDoc, serverTimestamp, onSnapshot, arrayUnion, deleteDoc, getDocs } from "firebase/firestore";

import { storage } from "../../../Firebase/FirebaseInit"
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";



import { Modal, Button, TextField, Typography, Card, Grid} from "@mui/material"


export default class EditRequest extends React.Component {

    

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            title: "",
            description: "",
            scheduled: "",
            estimate: 0,
            oldPictures: [],
            newPictures: [],
            pictureWarning: false,
            requestWarning: false,
            confirm: false,
            viewPicture: false,
            loading: false

        }
        this.handleChange = this.handleChange.bind(this)
        this.handlePicture = this.handlePicture.bind(this)
        this.deletePicture = this.deletePicture.bind(this)
        this.deletePictureFirebase = this.deletePictureFirebase.bind(this)

        this.updateRequest = this.updateRequest.bind(this)



   
    }

    componentDidMount() {

        const requestRef = doc(db, "requests", this.props.requestId)

        this.unsub = onSnapshot(requestRef, (doc) => {
            this.setState({
                name: doc.data().name,
                title: doc.data().title,
                description: doc.data().description,
                scheduled: doc.data().scheduled,
                estimate: doc.data().estimate
            })
            const imgsRef = collection(db, "requests", this.props.requestId, "imgs")
            this.unsub2 = onSnapshot(imgsRef, (query) => {
                this.setState({oldPictures: []})
                query.forEach((doc) => {
                    this.setState(prevState => ({
                        oldPictures: [...prevState.oldPictures, [doc.data(), doc.id]]
                    }))
                })
            })
        });
        
    }

    componentWillUnmount() {
        this.unsub()
        this.unsub2()
    }

    


    async updateRequest() {

        const imgsRef = collection(db, "requests", this.props.requestId, "imgs")

        const imgQuery = await getDocs(imgsRef)
      
        imgQuery.forEach(async (img) => {
            let imgMessage = this.state[img.id] || this.state[img.id] == "" ? this.state[img.id] : img.data().message
            console.log(imgMessage)

            const imgRef = doc(db, "requests", this.props.requestId, "imgs", img.id)
                await updateDoc(imgRef, {
                message: imgMessage, 
                })
        })
       

        


        const requestRef = doc(db, "requests", this.props.requestId)

        await updateDoc(requestRef, {
            title: this.state.title,
            description: this.state.description,
            scheduled: this.state.scheduled,
            estimate: this.state.estimate,
            updated: serverTimestamp()
            
        }).then((doc) => {

            const uploadPictures = this.state.newPictures

                for (let y = 0; y < uploadPictures.length; y++) {

                const imgRef = ref(storage, "requestImages/" + uploadPictures[y].id)
        
                uploadBytes(imgRef, uploadPictures[y])

                const uploadTask = uploadBytesResumable(imgRef, uploadPictures[y])
        
                uploadTask.on("state_changed", (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                },
                (error) => {
                alert(error.message)
                },
                () => {

                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                    const imgCol = collection(db, "requests", this.props.requestId, "imgs")
                    
                    let imgMessage = this.state[uploadPictures[y].id] ? this.state[uploadPictures[y].id] : ""
                    console.log(imgMessage)
                
                    addDoc(imgCol, {
                        url: downloadURL, 
                        message: imgMessage, 
                        created: uploadPictures[y].lastModified
                    })
                });
        
                })
        
            }
        
            })

      }

      deletePicture(pictureId) {

        const imgs = this.state.newPictures
        let index = 0
        let delIndex

        imgs.forEach(img => {
            if (img.id == pictureId) {
                delIndex = index
            }
            index++
        })
    
        imgs.splice(delIndex, 1)
    
        this.setState({
          pictures: imgs,
          [pictureId]: ""
        })

    
      }

      async deletePictureFirebase() {

        console.log("here")

        const imgRef = doc(db, "requests", this.props.requestId, "imgs", this.state.pictureWarning)


        await deleteDoc(imgRef)

        this.setState({pictureWarning: false})

    
      }


      handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
        [name]: value

        });
      }
      
      handlePicture = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
          const newPicture = e.target.files[i];
          newPicture["id"] = Math.random().toString(20);
          console.log(newPicture)
          this.setState(prevState => ({newPictures: [...prevState.newPictures, newPicture], "newPicture.id": ""}));
        }
        e.target.value = null
      };

    render() {

        console.log(this.state)

        

        return (
            <div >

                    <TextField
                    color="primary"
                    variant="outlined"
                    value={this.state.name}
                    type="text"
                    label={"Client Name"}
                    name={"name"}
                    style={{width: "50%", display: "flex", margin: "auto"}}
                    onChange={this.handleChange}
                    />

                    <br />
                    <br />

                    <TextField
                    color="primary"
                    variant="outlined"
                    value={this.state.title}
                    type="text"
                    label={"Request Title"}
                    name={"title"}
                    style={{width: "50%", display: "flex", margin: "auto"}}
                    onChange={this.handleChange}
                    />

                    <br />
                    <br />

                    <TextField
                    color="primary"
                    variant="outlined"
                    multiline
                    rows={5}
                    value={this.state.description}
                    type="text"
                    label={"Request Description"}
                    name={"description"}
                    style={{width: "80%", display: "flex", margin: "auto"}}
                    onChange={this.handleChange}
                    />

                    <br />
                    <br />

                    <TextField
                    color="primary"
                    variant="outlined"
                    value={this.state.scheduled}
                    type="date"
                    label={"Schedule"}
                    name={"scheduled"}
                    style={{width: "50%", display: "flex", margin: "auto"}}
                    onChange={this.handleChange}
                    />

                    <br />
                    <br />  

                    <TextField
                    color="primary"
                    variant="outlined"
                    value={this.state.estimate}
                    type="number"
                    label={"Estimate"}
                    name={"estimate"}
                    style={{width: "50%", display: "flex", margin: "auto"}}
                    onChange={this.handleChange}
                    />

                    <br />
                    <br />
                    
                    <Button variant="contained" component="label" color="secondary" style={{width: 100, display: "flex", margin: "auto"}}>
                    Add Photos
                    <input type="file" multiple onChange={this.handlePicture} style={{width: 0, opacity: 0}}/>

                    </Button>
                    <br />
                    

                    <div style={{textAlign: "center"}}>
                    {this.state.newPictures.length > 0 ? this.state.newPictures.map((picture, index) => {
                        return (
                            <div key={index} style={{display: "inline-block", border: "1px solid black", borderRadius: 5, margin: 5, padding: 10}}>
                                <Button onClick={() => this.setState({viewPicture: URL.createObjectURL(picture)})}> 
                            <img src={URL.createObjectURL(picture)} alt="img" style={{height: 100, width: 100, borderRadius: 15}}/>
                            </Button>
                            <TextField
                                onChange={this.handleChange}
                                multiline
                                rows={3}
                                value={this.state.newPictures.id}
                                variant="outlined"
                                type="text"
                                label="Description"
                                name={picture.id}
                                style={{
                                display: "flex",
                                margin: "auto",
                                width: "70%"
                                }}
                            />
                            <Button variant="contained" color="primary" style={{margin: 10}} onClick={() => this.deletePicture(picture.id)}>
                                Del
                            </Button>   
                            </div>
                        )
                        })  
                        :
                        null
                        }
                        <hr />
                        {this.state.oldPictures.length > 0 ? this.state.oldPictures.map((picture, index) => {
                        return (
                            <div key={index} style={{display: "inline-block", border: "1px solid black", borderRadius: 5, margin: 5, padding: 10}}>
                                <Button onClick={() => this.setState({viewPicture: picture[0].url})}> 
                            <img src={picture[0].url} alt="img" style={{height: 100, width: 100, borderRadius: 15}}/>
                            </Button>
                            <TextField
                                onChange={this.handleChange}
                                multiline
                                rows={3}
                                defaultValue={picture[0].message}
                                variant="outlined"
                                type="text"
                                label="Description"
                                name={picture[1]}
                                style={{
                                display: "flex",
                                margin: "auto",
                                width: "70%"
                                }}
                            />
                            <Button variant="contained" color="primary" style={{margin: 10}} onClick={() => this.setState({pictureWarning: picture[1]})}>
                                Del
                            </Button>
                            
                            </div>
                        )
                        })  
                        :
                        null
                        }
                    </div>

                    <br />
                    <br />
                        
                <Button
                color="secondary"
                variant="contained"
                style={{width: 100, display: "flex", margin: "auto"}}
                onClick={() => 
                    [this.updateRequest(), this.props.closeModal()]
                    }
                > 
                Update
                </Button>

                <br />
                <br />
               
            {this.state.pictureWarning ? 
                <Modal 
                open={true} 
                onClose={() => this.setState({pictureWarning: false})}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <div style={{backgroundColor: "#FFFFFF", borderRadius: 15, padding: 20}}>
                    <Typography variant="body1" style={{padding: 20}} >  Delete this picture? </Typography>
                    <Button variant="contained" color="secondary" style={{width: "50%"}} onClick={() => this.setState({pictureWarning: false})}> Back </Button>
                    <Button variant="contained" color="secondary" style={{width: "50%"}} onClick={() => this.deletePictureFirebase()}> Yes </Button>
                </div>
                
                </Modal>
            :
            null
            }
            

            {this.state.requestWarning ? 
            <Modal 
            open={true} 
            onClose={() => this.setState({requestWarning: false})}
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <div style={{backgroundColor: "#FFFFFF", borderRadius: 15, padding: 20}}>
                <Typography variant="body1" style={{padding: 20}} >  Upload this request? </Typography>
                <Button variant="contained" color="secondary" style={{width: "50%"}} onClick={() => this.setState({requestWarning: false})}> Back </Button>
                <Button variant="contained" color="secondary" style={{width: "50%"}} onClick={() => [this.sendrequest(), this.props.closeModal()]}> Yes </Button>
            </div>
            
            </Modal>
            :
            null
            }

                {this.state.viewPicture ?
                    <Modal 
                    open={true} 
                    onClose={() => this.setState({viewPicture: null})}
                    onClick={() => this.setState({viewPicture: null})}
                    style={{
                        overflowY: "auto",
                        overflowX: "hidden"
                    }}>
                    <img src={this.state.viewPicture} alt="" variant="square" style={{ width: "100%", height: "auto" }} />
                    </Modal>
                    
                    :
                    null
                }

            
            </div>
        )
        }
          
    

}