import React from "react";
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import { Rating } from "@material-ui/lab";
import useStyles from './styles'

export default function PlaceDetails ({place, selected, refProp}) {
    const classes = useStyles();
    if(selected) refProp?.current?.scrollIntoView({behavior: "smooth", block: "start"})
    return(
          <Card>
            <CardMedia
                style = {{height:350}}
                image = {place.photo ? place.photo.images.large.url : 'https://images.squarespace-cdn.com/content/v1/59f776520abd04e5c4009aa8/1616801069667-3S8IULAFED6BRPLKI0QD/IMG_8050_edited_rgb.jpg' }
                title = {place.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">{place.name}</Typography>
                <Box display = "flex" justifyContent = "space-between">
                <Rating   value={Number(place.rating)} readOnly/>
                    <Typography gutterBottom variant="subtitle1">out of {place.num_reviews} reviews</Typography>
                </Box>
                <Box display = "flex" justifyContent = "space-between">
                    <Typography variant="subtitle1">Price</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.price_level}</Typography>
                </Box>
                <Box display = "flex" justifyContent = "space-between">
                    <Typography variant="subtitle1">Ranking</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.ranking}</Typography>
                </Box>
                {place?.awards?.map((award)=>(
                    <Box my={1} display="flex" justifyContent= "space-between">
                        <img src={award.images.small} alt={award.display_name}/>
                        <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography> 
                    </Box> 
                ))}
                {place?.cuisine?.map(({name})=>(
                    <Chip key={name} size="small" label={name} className={classes.chip} />
                ))}
                {place?.address &&(
                    <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.subtitle}>
                        <LocationOnIcon className={classes.iconSpace}/> {place.address}
                    </Typography>
                )}
                {place?.phone && (
                    <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.spacing}>
                        <PhoneIcon className={classes.iconSpace}/> {place.phone}
                    </Typography>
                )}
                <CardActions className={classes.iconSpace}>
                    <button size="small" color="primary" onClick={()=>window.open(place.web_url,"_blank")}>Trip Advisor</button>
                    <button size="small" color="primary" onClick={()=>window.open(place.website,"_blank")}>Website</button>
                </CardActions>
            </CardContent>
          </Card>
    )
}