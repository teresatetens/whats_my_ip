import React from 'react';
import {AppBar, Toolbar, Typography } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(()=>({
    typographyStyles: {
        flex: 1
    }
}));


const Header = ({userData}) => {
    const classes = useStyles();
    const {ip, location:{city},location:{lat}, location:{lng} } = userData;
    
    return (
        <AppBar position="static" >
            <Toolbar>
                <Typography  variant = "h6" className ={classes.typographyStyles} >
                    Your IP Address is: {ip}<br/>
                    You live in {city}<br/>
                    Your Coordinates: {lat}, {lng}
                </Typography>
                <RoomIcon/>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
