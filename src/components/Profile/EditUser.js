import React from "react"

import { db } from "../../../Firebase/FirebaseInit"
import { doc, collection, addDoc, updateDoc, serverTimestamp, onSnapshot, arrayUnion, deleteDoc, getDocs } from "firebase/firestore";

import { storage } from "../../../Firebase/FirebaseInit"
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";



import { Modal, Button, TextField, Typography, Card, Grid} from "@mui/material"


export default class EditPost extends React.Component {

    

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            phone: "",
            description: "",
            newPic: null,
            profilePic: null,
           

        }
        this.handleChange = this.handleChange.bind(this)
        this.handlePicture = this.handlePicture.bind(this)
    

        this.updateProfile = this.updateProfile.bind(this)



   
    }

    componentDidMount() {

        console.log(this.props.profileId)

        const profileRef = doc(db, "profiles", this.props.profileId)

        this.unsub = onSnapshot(profileRef, (doc) => {
            this.setState({
                name: doc.data().name,
                phone: doc.data().phone,
                description: doc.data().description,
                profilePic: doc.data().profilePic
            })
            
        });
        
    }

    componentWillUnmount() {
        this.unsub()
    }

    


    async updateProfile() {

        const profileRef = doc(db, "profiles", this.props.profileId)

        await updateDoc(profileRef, {
            name: this.state.name,
            phone: this.state.phone,
            description: this.state.description,
            updated: serverTimestamp()
            
        }).then((doc) => {

            if (this.state.newPic) {
                const uploadPicture = this.state.newPic

                const imgRef = ref(storage, "profileImages/" + uploadPicture.id)
        
                uploadBytes(imgRef, uploadPicture)

                const uploadTask = uploadBytesResumable(imgRef, uploadPicture)
        
                uploadTask.on("state_changed", (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                },
                (error) => {
                alert(error.message)
                },
                () => {

                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                
                    updateDoc(profileRef, {
                        profilePic: downloadURL
                        
                    })
                });
        
                })
            }

            })

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
        
        const newPicture = e.target.files[0];
        newPicture["id"] = Math.random().toString(20);
        console.log(newPicture)
        this.setState({newPic: newPicture});
        
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
                    label={"Name"}
                    name={"name"}
                    style={{width: "50%", display: "flex", margin: "auto"}}
                    onChange={this.handleChange}
                    />

                    <br />
                    <br />

                    <TextField
                    value={this.state.phone}
                    style={{display: "flex", margin: "auto", width: "60%", marginTop: 10, marginBottom: 10}}
                    type="phone"
                    label="Phone"
                    name="phone"
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
                    label={"Bio"}
                    name={"description"}
                    style={{width: "80%", display: "flex", margin: "auto"}}
                    onChange={this.handleChange}
                    />

                    <br />
                    <br />
                    
                    <Button variant="contained" component="label" color="secondary" style={{width: 100, display: "flex", margin: "auto"}}>
                    Profile Pic
                    <input type="file" onChange={this.handlePicture} style={{width: 0, opacity: 0}}/>

                    </Button>
                    
                    
                    
                    
                    <br />

                    {this.state.newPic ?
                        <img src={URL.createObjectURL(this.state.newPic)} alt="img" style={{display: "flex", margin: "auto", height: 100, width: 100, borderRadius: 15}}/>
                        :
                        null
                    }

                    {this.state.profilePic && !this.state.newPic ?
                        <img src={this.state.profilePic} alt="img" style={{display: "flex", margin: "auto", height: 100, width: 100, borderRadius: 15}}/>
                        :
                        null
                    }

                    
                    <br />
                        
                <Button
                color="secondary"
                variant="contained"
                style={{width: 100, display: "flex", margin: "auto"}}
                onClick={() => 
                    [this.updateProfile(), this.props.closeModal()]
                    }
                > 
                Update
                </Button>

                <br />
                <br />
               
            
            

           

            
            </div>
        )
        }
          
    

}