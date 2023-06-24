import React, {useState, useEffect} from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import {getPlacesData} from './api/index';
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";




 export default function App()  {
    const [places, setplaces] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState(null);

    useEffect(() => {
        console.log("summma");
        setCoordinates({lat: 11, lng: 12});
        navigator.geolocation.getCurrentPosition(({coords :{longitude, latidude}})=>{
            console.log(latidude, longitude);
            if(longitude != null && latidude != null){
                setCoordinates({lat: latidude, lng:longitude});
            }else{
                setCoordinates({lat: 11, lng: 12});
            }  
        })
    }, []);

    useEffect(() => {
       if(bounds){
        getPlacesData(bounds.sw, bounds.ne).then((data) => {
            console.log(data);
            setplaces(data);
        });
       }
        
    }, [coordinates, bounds]);
    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{width:'100%'}}>
                <Grid item xs={12} md={4}>
                    <List />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                        setCoordinates = {setCoordinates}
                        setBounds = {setBounds}
                        coordinates = {coordinates}
                    />
                </Grid>
            </Grid>

        </>
    )
} 