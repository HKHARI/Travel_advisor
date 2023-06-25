import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import {Paper, Typography, useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';

export default function Map ({setCoordinates, setBounds, coordinates, places, setChildCliked}) {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');

    return(
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key: 'AIzaSyCTIFyED2PCsao-tQoQdd5QeWbuEEXWyLA'}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={7}
                margin={[50,50,50,50]}
                options={''}
                onChange={(e) => {
                    setCoordinates({lat: e.center.lat, lng: e.center.lng});
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw});
                }}
                onChildClick={(child) => setChildCliked(child)}
            >
                {places?.map((place, i) =>(
                    <div 
                        className={classes.markerContainer} 
                        lat={Number(place.latitude)} 
                        lng={Number(place.longitude)} 
                        key={i}>
                            {
                                !isDesktop ? (
                                    <LocationOnOutlinedIcon color="primary" fontSize="large"/>
                                ) : (
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography gutterBottom className={classes.typography} variant="subtitle2">
                                            {place.name}
                                        </Typography>
                                        <img
                                            className={classes.pointer}
                                            src= {place.photo ? place.photo.images.large.url : 'https://images.squarespace-cdn.com/content/v1/59f776520abd04e5c4009aa8/1616801069667-3S8IULAFED6BRPLKI0QD/IMG_8050_edited_rgb.jpg' }
                                            alt={place.name}
                                        />
                                        <Rating size="small" value={Number(place.rating)} readOnly/>
                                    </Paper>
                                )
                            }
                    </div>
                ))}
            </GoogleMapReact>
        </div> 
    )
}