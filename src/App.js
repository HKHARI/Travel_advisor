import React, {useState, useEffect} from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import {getPlacesData} from './api/index';
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";




 export default function App()  {
    const [places, setplaces] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});
    const [ChildCliked, setChildCliked] = useState(null); 
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setCoordinates({lat: 11, lng: 12});
        {/* Below code is not working in privacy browser as they are not allowing to fetch the data of user location */}
        navigator.geolocation.getCurrentPosition(({coords :{longitude, latidude}})=>{
            setCoordinates({lat: latidude, lng:longitude});
        })
    }, []);

    useEffect(() => {
        setIsLoading(true);
       if(bounds){
        getPlacesData(bounds.sw, bounds.ne).then((data) => { 
            setplaces(data);
            setIsLoading(false);
        });
       }
        
    }, [coordinates, bounds]);
    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{width:'100%'}}>
                <Grid item xs={12} md={4}>
                    <List 
                        places={places} 
                        ChildCliked={ChildCliked}  
                        isLoading = {isLoading}  
                    />
                    
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                        setCoordinates = {setCoordinates}
                        setBounds = {setBounds}
                        coordinates = {coordinates}
                        places = {places}
                        setChildCliked = {setChildCliked}
                    />
                </Grid>
            </Grid>

        </>
    )
} 