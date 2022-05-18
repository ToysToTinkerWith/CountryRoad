import React from "react"

import Head from "next/head"

import { db } from "../../Firebase/FirebaseInit"
import { doc, collection, addDoc, updateDoc, serverTimestamp, arrayUnion } from "firebase/firestore";

import { storage } from "../../Firebase/FirebaseInit"
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { Grid, Button, Typography, TextField, Modal } from "@mui/material"


export default class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            name: "",
            email: "",
            phone: "",
            address: "",
            description: "",
            pictures: [],
            alert: "",
            confirm: false,
            viewPicture: false,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handlePicture = this.handlePicture.bind(this)
        this.deletePicture = this.deletePicture.bind(this)

        this.sendRequest = this.sendRequest.bind(this)
        
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

    async sendRequest() {

        if (this.state.email == "" && this.state.phone == "") {
            this.setState({confirm: false, alert: "Please provide an email or phone number for us to contact you."})
        }

        else {

            const postRef = collection(db, "requests")

            await addDoc(postRef, {
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                address: this.state.address,
                title: "",
                description: this.state.description,
                scheduled: "",
                estimate: 0,
                completed: false,
                created: serverTimestamp()
                
            }).then(doc => {
    
                const uploadPictures = this.state.pictures

                this.setState({confirm: false, name: "", email: "", phone: "", address: "", description: "", pictures: [], alert: "Thank you! We have recieved your request. A Country Roads employee will be in touch."})
    
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
    
                        const imgCol = collection(db, "requests", doc.id, "imgs")
                        
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

        

      }

      deletePicture(pictureId) {

        const imgs = this.state.pictures
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
          this.setState(prevState => ({pictures: [...prevState.pictures, newPicture], "newPicture.id": ""}));
        }
        e.target.value = null
      };
      
    render() {


        

        return (
            <div>
                <Head>
                <title>Contact</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Web applications have expanded throughout the development of the internet. Users expect their experience to be fast, reliable, and easy. Bergquist Applications is a suite of libraries, built on the cloud, to deliver on these expectations." />
                <meta name="keywords" content="Progressive Web Development, Modern Development Tools, Database, Styled Components, Authentication, Payment Processing" />

                
                </Head>

                <Grid container alignItems="center" >
                    <Grid item xs={12} sm={6} md={6}>
                        <>
                        <Typography align="center" variant="h2" style={{fontFamily: "Anton", color: "#FFFFFF", margin: "5%"}}> CONTACT</Typography>
                        </>
                        
                        
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        
                    <Typography align="center" variant="h6" style={{fontFamily: "Signika", color: "#000000", margin: "5%", marginTop: "5%"}}> Thank you for your interest. Please complete and submit the Online Request information below, be sure to click SUBMIT. We will respond promptly! Estimates are always free. We service all locations on Whidbey Island. If you prefer, contact us by phone at 360-421-0670 or email countryroadnw@gmail.com.</Typography>

                    </Grid>
                </Grid>
                
                <div style={{backgroundColor: "#000000"}}>
                <Typography align="left" variant="h3" style={{fontFamily: "Anton", color: "#E5650F", padding: "5%", marginBottom: 0}}> CONTACT US BY</Typography>

                <Button
                    style={{width: "100%"}}
                    href="tel:+3604210670"
                >
                <Grid container alignItems="center" style={{ padding: "2%", border: "1px solid #E5650F"}} >
                    <Grid item xs={12} sm={3} md={3}>
                        
                        <img src={"/Phone.svg"} alt={"Phone"} style={{ width: "50%", display: "flex", margin: "auto", padding: "5%", maxHeight: 150}} />
                   
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                        
                        <Typography align="center" variant="h3" style={{fontFamily: "Anton", color: "#E5650F", padding: "5%"}}> PHONE </Typography>
             
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        
                        <Typography align="center" variant="h4" style={{fontFamily: "Anton", color: "#E5650F", padding: "5%"}}> 360-421-0670 </Typography>
             
                    </Grid>
                    
                </Grid>

                </Button>

                <Button
                    style={{width: "100%"}}
                    href="mailto:countryroadnw@gmail.com"
                >
                <Grid container alignItems="center" style={{ padding: "2%", border: "1px solid #E5650F"}} >
                    <Grid item xs={12} sm={3} md={3}>
                        
                        <img src={"/Email.svg"} alt={"Email"} style={{ width: "50%", display: "flex", margin: "auto", padding: "5%", maxHeight: 150}} />
                   
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                        
                        <Typography align="center" variant="h3" style={{fontFamily: "Anton", color: "#E5650F", padding: "5%"}}> Email </Typography>
             
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        
                        <Typography align="center" variant="h5" style={{fontFamily: "Anton", color: "#E5650F", padding: "5%"}}> countryroadnw@gmail.com </Typography>
             
                    </Grid>
                    
                </Grid>

                </Button>

                <div
                    style={{padding: 8}}
                >
                <Grid container alignItems="center" style={{ padding: "2%", border: "1px solid #E5650F"}} >
                    <Grid item xs={12} sm={3} md={3}>
                        
                        <img src={"/Online.svg"} alt={"Online"} style={{ width: "50%", display: "flex", margin: "auto", padding: "5%", maxHeight: 150}} />
                   
                    </Grid>
                    <Grid item xs={12} sm={9} md={9}>
                        
                        <Typography align="center" variant="h3" style={{fontFamily: "Anton", color: "#E5650F", padding: "5%"}}> ONLINE REQUEST </Typography>
             
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>

                    <br />
                    <br />
                        
                    <TextField
                    color="secondary"
                    variant="outlined"
                    value={this.state.name}
                    type="text"
                    label={<Typography variant="body1" style={{fontFamily: "Signika", color: "#FFFFFF"}}> Name </Typography>}
                    name={"name"}
                    sx={{"& .MuiOutlinedInput-root":{"& > fieldset": {border: '2px solid #E5650F'}}, input: { color: 'white' }}}
                    style={{width: "50%", display: "flex", margin: "auto"}}
                    onChange={this.handleChange}
                    />

                    <br />
                    <br />
                        
                    <TextField
                    color="secondary"
                    variant="outlined"
                    value={this.state.email}
                    type="email"
                    label={<Typography variant="body1" style={{fontFamily: "Signika", color: "#FFFFFF"}}> Email </Typography>}
                    name={"email"}
                    sx={{"& .MuiOutlinedInput-root":{"& > fieldset": {border: '2px solid #E5650F'}}, input: { color: 'white' }}}
                    style={{width: "50%", display: "flex", margin: "auto"}}
                    onChange={this.handleChange}
                    />

                    <br />
                    <br />

                    <TextField
                    color="secondary"
                    variant="outlined"
                    value={this.state.phone}
                    type="text"
                    label={<Typography variant="body1" style={{fontFamily: "Signika", color: "#FFFFFF"}}> Phone </Typography>}
                    name={"phone"}
                    sx={{"& .MuiOutlinedInput-root":{"& > fieldset": {border: '2px solid #E5650F'}}, input: { color: 'white' }}}
                    style={{width: "50%", display: "flex", margin: "auto"}}
                    onChange={this.handleChange}
                    />

                    <br />
                    <br />

                    <TextField
                    color="secondary"
                    variant="outlined"
                    value={this.state.address}
                    type="text"
                    label={<Typography variant="body1" style={{fontFamily: "Signika", color: "#FFFFFF"}}> Address </Typography>}
                    name={"address"}
                    sx={{"& .MuiOutlinedInput-root":{"& > fieldset": {border: '2px solid #E5650F'}}, input: { color: 'white' }}}
                    style={{width: "50%", display: "flex", margin: "auto"}}
                    onChange={this.handleChange}
                    />

                    <br />
                    <br />

                    <TextField
                    color="secondary"
                    variant="outlined"
                    multiline
                    rows={5}
                    value={this.state.description}
                    type="text"
                    label={<Typography variant="body1" style={{fontFamily: "Signika", color: "#FFFFFF"}}> Project Description </Typography>}
                    name={"description"}
                    inputProps={{ style: { color: "white" } }}

                    sx={{"& .MuiOutlinedInput-root":{"& > fieldset": {border: '2px solid #E5650F'}}, input: { color: 'white' }}}
                    style={{width: "80%", display: "flex", margin: "auto"}}
                    onChange={this.handleChange}
                    />

                    <br />
                    <br />

                    <Button variant="contained" component="label" color="secondary" style={{width: 100, display: "flex", margin: "auto"}}>
                    Add Photos
                    <input type="file" multiple onChange={this.handlePicture} style={{width: 0, opacity: 0}}/>

                    </Button>

                    <br />
                    <br />
                    

                    <div style={{textAlign: "center"}}>
                        {this.state.pictures.length > 0 ? this.state.pictures.map((picture, index) => {
                        return (
                            <div key={index} style={{display: "inline-block", border: "1px solid #E5650F", borderRadius: 5, margin: 5, padding: 10}}>
                                <Button onClick={() => this.setState({viewPicture: URL.createObjectURL(picture)})}> 
                            <img src={URL.createObjectURL(picture)} alt="img" style={{height: 100, width: 100, borderRadius: 15}}/>
                            </Button>
                            <TextField
                                onChange={this.handleChange}
                                multiline
                                rows={3}
                                value={this.state.pictures.id}
                                variant="outlined"
                                type="text"
                                label={<Typography variant="body1" style={{fontFamily: "Signika", color: "#FFFFFF"}}> Description </Typography>}
                                name={picture.id}
                                inputProps={{ style: { color: "white" } }}

                                sx={{"& .MuiOutlinedInput-root":{"& > fieldset": {border: '2px solid #E5650F'}}}}
                                style={{
                                display: "flex",
                                margin: "auto",
                                width: "70%"
                                }}
                            />
                            <Button variant="contained" color="secondary" style={{margin: 10}} onClick={() => this.deletePicture(picture.id)}>
                                Del
                            </Button>   
                            </div>
                        )
                        })  
                        :
                        null
                        }
                    </div>

               

                    <Typography align="center" variant="h6" style={{fontFamily: "Signika", color: "#FFFFFF", margin: "5%"}}> {this.state.alert}</Typography>

                        
                <Button
                color="secondary"
                variant="contained"
                style={{width: 100, display: "flex", margin: "auto"}}
                onClick={() => 
                    this.setState({confirm: true})
                    }
                > 
                Submit
                </Button>

                <br />
                <br />
               

            {this.state.confirm ? 
            <Modal 
            open={true} 
            onClose={() => this.setState({confirm: false})}
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <div style={{backgroundColor: "#FFFFFF", borderRadius: 15, padding: 20}}>
                <Typography variant="body1" style={{padding: 20}} >  Send this request? </Typography>
                <Button variant="contained" color="secondary" style={{width: "50%"}} onClick={() => this.setState({confirm: false})}> Back </Button>
                <Button variant="contained" color="secondary" style={{width: "50%"}} onClick={() => [this.sendRequest()]}> Yes </Button>
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

                    </Grid>
                    
                </Grid>

                </div>



                
                </div>
                                         
            </div>
        )
    }
    
}