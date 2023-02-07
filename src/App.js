import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import { getPlaceData } from "./api";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

const App = () => {
    const [places, setPlaces] = useState([]);

    const [coordinates, setCoordinates] = useState({});
    const[bounds, setBounds] = useState({});
    const [childClicked, setChildClicked] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude}}) => {
            setCoordinates({lat: latitude, lng: longitude});
        })
    }, []) /*getting current positon coordinates*/

    useEffect(() => {
        console.log(coordinates, bounds);
        getPlaceData(bounds.sw, bounds.ne)
            .then((data) => {
                console.log(data);

                setPlaces(data);
            })
    }, [coordinates, bounds]); /*Calling getPlaceData and getting data from API from dynamically changing coordinates via map*/

    return (
        <>
        <CssBaseline />
            <Header />
            <Grid container space ={3} style={{ width: '100%'}}>
                <Grid item xs={12} md={4}>
                    <List 
                        places={places}
                        childClicked={childClicked}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={places}
                        setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default App;