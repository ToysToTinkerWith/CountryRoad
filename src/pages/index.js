import React from "react"

import Head from "next/head"

import {Loader} from '@googlemaps/js-api-loader';

import { Grid, Button, Typography } from "@material-ui/core"

import CountryRoad from "../components/Animations/CountryRoad"


export default class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            postalCode: ""
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
        this.getUserLocation = this.getUserLocation.bind(this)
        
    }

    getUserLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {

            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
                version: 'weekly',
              });
              
              loader.load().then(() => {
                
                const geocoder = new window.google.maps.Geocoder();

                geocoder
                .geocode({ location: {lat: lat, lng: lng} })
                .then((response) => {
                if (response.results[0]) {

                    this.setState({
                        postalCode: response.results[0].address_components[6].long_name
                    })

                } else {
                    window.alert("No results found");
                }
                })
                .catch((e) => window.alert("Geocoder failed due to: " + e));
              });

            
          
            const lat = position.coords.latitude
            const lng = position.coords.longitude

            
            
        })
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
      
    render() {

        let textHeight

        if (this.state.width >= 960) {
            if (this.state.width >= 1050) {
                if (this.state.width >= 1356) {
                    textHeight = 180
                }
                else {
                    textHeight = 250
                }  
            }
            else {
                textHeight = 320
            }
        }

        const whidbeyPostals = ["98236", "98260", "98249", "98253", "98239", "98277", "98278"]
                
            
        

        return (
            <div>
                <Head>
                <title>Country Road</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Web applications have expanded throughout the development of the internet. Users expect their experience to be fast, reliable, and easy. Bergquist Applications is a suite of libraries, built on the cloud, to deliver on these expectations." />
                <meta name="keywords" content="Progressive Web Development, Modern Development Tools, Database, Styled Components, Authentication, Payment Processing" />

                
                </Head>

                <Grid container style={{position: "relative", top: "10vh"}}>
                    <Grid item xs={12} sm={6} md={6}>
                        {this.state.width < 960 ? 
                        <>
                        <Typography align="center" variant="h2" style={{fontFamily: "Anton", color: "#FFFFFF", marginLeft: "5%", marginRight: "5%"}}> COUNTRY ROAD</Typography>
                        <Typography align="center" variant="h3" style={{fontFamily: "Anton", color: "#E5650F", marginLeft: "5%", marginRight: "5%"}}> DRIVEWAYS</Typography>
                        </>
                        :
                        <>
                        <Typography align="right" variant="h1" style={{fontFamily: "Anton", color: "#FFFFFF", marginLeft: "2%", marginRight: "5%"}}> COUNTRY ROAD</Typography>
                        <Typography align="right" variant="h2" style={{fontFamily: "Anton", color: "#E5650F", marginLeft: "2%", marginRight: "5%"}}> DRIVEWAYS</Typography>
                        </>
                        }
                        <Typography align="center" variant="h6" style={{fontFamily: "Signika", color: "#000000", margin: "1%", marginTop: "10%"}}> Gravel Driveways and Roads.</Typography>
                        <Typography align="center" variant="h6" style={{fontFamily: "Signika", color: "#000000", margin: "1%"}}> Maintenance and New Construction.</Typography>
                        <Typography align="center" variant="h6" style={{fontFamily: "Signika", color: "#000000", margin: "1%"}}> Serving Whidbey Island.</Typography>
                        <Typography align="center" variant="h6" style={{fontFamily: "Signika", color: "#000000", margin: "1%", marginBottom: "10%"}}> Affordable. Efficient. Local.</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        
                        <img src={"/Swoosh.svg"} alt={"Swoosh"} style={{ borderRadius: 15, width: "100%", display: "flex", margin: "auto", maxHeight: 400, paddingRight: "5%", paddingLeft: "5%"}} />

                    </Grid>
                </Grid>

                <br />
                <br />
                <br />
                <br />
                <br />


                <Grid container style={{backgroundColor: "#000000"}}>
                        <Grid item xs={12} sm={12} md={4} style={{padding: 40}}>
                                         
                                
                            <Typography variant="h4" align="center" style={{ color: "#E5650F", fontFamily: "Anton", letterSpacing: "3px", position: "relative", top: 0}}> <b>WHO WE ARE</b> </Typography>
                            <br />
                            <Typography  align="center"  style={{fontSize: "14px", fontWeight: 400, color: "#FFFFFF", height: textHeight}}> 
                            WITH OVER 500 DRIVEWAYS COMPLETED ON WHIDBEY ISLAND, WE HAVE A SKILLED, FOCUSED, TALENTED TEAM AND THE BEST EQUIPMENT. WE HAVE EXTENSIVE EXPERIENCE BUILDING AND RESTORING GRAVEL DRIVEWAYS, ROADS AND PARKING AREAS. WE PROVIDE FAST, FREE ESTIMATES AND WILL WORK WITH YOU TO MEET YOUR NEEDS.                                    
                            </Typography>
                            <br />
                            <Button variant="contained"  style={{backgroundColor: "#E5650F", position: "relative", display: "flex", margin: "auto", color: "#FFFFFF", padding: 10,  borderRadius: 15}} onClick={() => window.location.href = "/about"}>
                            <Typography  style={{ fontFamily: "Anton", fontSize: "18px", letterSpacing: "3px"}}> ABOUT US </Typography>
                            </Button>
                            
                                           
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} style={{padding: 40}}>
                        
                            <Typography variant="h4" align="center" color="secondary" style={{ color: "#E5650F", fontFamily: "Anton", letterSpacing: "3px", position: "relative", top: 0}}> <b>WHAT WE DO</b> </Typography>
                            <br />
                            <Typography  align="center"  style={{fontSize: "14px", fontWeight: 400, color: "#FFFFFF", height: textHeight}}> 
                            WE ARE GRATEFUL THAT OUR SOLUTION HAS BEEN USED WITHIN THE WHIDBEY ISLAND LOCAL COMMUNITIES, WHETHER AT HOMES, OFFICE BUILDINGS, RESTAURANTS, RETREATS, LOCAL BUSINESSES, GOVERNMENT BUILDINGS, PUBLIC SETTINGS OR PRIVATE OUTDOOR AREAS. WITH PERMISSION FROM OUR WONDERFUL CUSTOMERS, WE ARE SHARING WITH YOU INFORMATION ON SOME OF OUR PROJECTS.                            
                            </Typography>
                            <br />
                            <Button variant="contained" style={{backgroundColor: "#E5650F", color: "#FFFFFF", display: "flex", margin: "auto", padding: 10,  borderRadius: 15}} onClick={() => window.location.href = "/work"}>
                            <Typography  style={{fontFamily: "Anton", fontSize: "18px", letterSpacing: "3px"}}> OUR WORK </Typography>
                            </Button>
                           
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} style={{padding: 40}}>
                        
                            <Typography variant="h4" align="center" color="secondary" style={{color: "#E5650F", fontFamily: "Anton", letterSpacing: "3px", position: "relative", top: 0}}> <b>CONTACT US</b> </Typography>
                            <br />
                            <Typography  align="center"  style={{fontSize: "14px", fontWeight: 400, color: "#FFFFFF", height: textHeight}}> 
                            DURING AN IN PERSON ASSESSMENT WE CAN HELP YOU CHOOSE FROM VARIOUS GRAVEL OPTIONS AND PROVIDE AN ESTIMATE WHICH FITS YOUR NEEDS. FILL OUT OUR ONLINE FORM TO EXPEDITE THE PROCESS AND SEE HOW YOU CAN SAVE ON YOUR NEXT DRIVEWAY. CONTACT US NOW TO LEARN WHAT WE CAN DO FOR YOU.                            
                            </Typography>
                            <br />
                            <Button variant="contained" color="secondary" style={{backgroundColor: "#E5650F", color: "#FFFFFF", display: "flex", margin: "auto", padding: 10,  borderRadius: 15}} onClick={() => window.location.href = "/contact"}>
                            <Typography  style={{fontFamily: "Anton", fontSize: "18px", letterSpacing: "3px"}}> CONTACT </Typography>
                            </Button>
                            
                                    
                        </Grid>
                    </Grid>

                    <div style={{backgroundColor: "#FFFFFF"}}>
                    <Typography align="center" variant="h4" style={{fontFamily: "Anton", letterSpacing: "3px", padding: "5%"}}> GRAVEL DRIVEWAYS, ROADS, AND PARKING AREA REPAIRS. NEW CONSTRUCTION FOR OAK HARBOR, COUPEVILLE, GREENBANK, FREELAND, LANGLEY, CLINTON AND SURROUNDING AREAS.  </Typography>
                    <Grid container>
                        <Grid item xs={12} sm={6} md={6} >
                            <Button variant="contained" onClick={() => this.getUserLocation()} style={{backgroundColor: "#000000", color: "#FFFFFF", display: "flex", margin: "auto", padding: 10, marginTop: "5%", marginBottom: "2%", borderRadius: 15}} >
                                <Typography  style={{fontFamily: "Anton", fontSize: "18px", letterSpacing: "3px"}}> CHECK LOCATION </Typography>
                            </Button>
                            {this.state.postalCode ? 
                                whidbeyPostals.includes(this.state.postalCode) ?
                                <>
                                    <Typography align="center" variant="h6" style={{fontFamily: "Anton", letterSpacing: "3px", padding: "5%", paddingBottom: 0}}> Postal Code: {this.state.postalCode}  </Typography>
                                    <Typography align="center" variant="h6" style={{fontFamily: "Anton", letterSpacing: "3px", padding: "5%"}}> You are in our service range! </Typography>
                                </>
                                :
                                <>
                                    <Typography align="center" variant="h6" style={{fontFamily: "Anton", letterSpacing: "3px", padding: "5%", paddingBottom: 0}}> Postal Code: {this.state.postalCode}  </Typography>
                                    <Typography align="center" variant="h6" style={{fontFamily: "Anton", letterSpacing: "3px", padding: "5%"}}> You are out of our service range. </Typography>
                                </>
                            :
                            null
                            }
                            
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} >
                            <img src={"/Logo.png"} alt={"Logo"} style={{ borderRadius: 15, display: "flex", margin: "auto", height: 100, marginTop: "5%", marginBottom: "5%"}} />
                        </Grid>
                    </Grid>
                    </div>

                    <div style={{backgroundImage: "url('EquipmentDark.png')", backgroundSize: "cover"}}>
                        <Typography variant="h4" style={{color: "#E5650F", fontFamily: "Anton", letterSpacing: "3px", padding: "1%", paddingLeft: "5%", paddingTop: "5%"}}> FREE ESTIMATES</Typography>
                        <Typography variant="h4" style={{color: "#E5650F", fontFamily: "Anton", letterSpacing: "3px", padding: "1%", paddingLeft: "5%"}}> REASONABLE RATES </Typography>
                        <Typography variant="h4" style={{color: "#E5650F", fontFamily: "Anton", letterSpacing: "3px", padding: "1%", paddingLeft: "5%"}}> NEW DRIVEWAY INSTALLATION</Typography>
                        <Typography variant="h4" style={{color: "#E5650F", fontFamily: "Anton", letterSpacing: "3px", padding: "1%", paddingLeft: "5%"}}> PARKING RESURFACING </Typography>
                        <Typography variant="h4" style={{color: "#E5650F", fontFamily: "Anton", letterSpacing: "3px", padding: "1%", paddingLeft: "5%"}}> NEW ROADS </Typography>
                        <Typography variant="h4" style={{color: "#E5650F", fontFamily: "Anton", letterSpacing: "3px", padding: "1%", paddingLeft: "5%", paddingBottom: "5%"}}> ANNUAL MAINTENANCE PROGRAMS </Typography>
                        <Button variant="contained"  style={{backgroundColor: "#E5650F", color: "#FFFFFF", padding: 10, marginLeft: "5%", marginTop: "5%", marginBottom: "5%", borderRadius: 15}} onClick={() => window.location.href = "/contact"}>
                            <Typography  style={{fontFamily: "Anton", fontSize: "18px", letterSpacing: "3px"}}> CONTACT US </Typography>
                        </Button>
                    </div>
                    
                    <CountryRoad />
                           
            </div>
        )
    }
    
}