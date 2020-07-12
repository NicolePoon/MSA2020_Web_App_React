import React, { useState, useEffect } from 'react';
import MediaCard from '../MediaCardComponent/MediaCard';
import { Grid } from '@material-ui/core';
import './MediaGrid.css';

interface IState {
    selfLink: string;
    volumeInfo: any;
}


interface IMediaGridProps {
    SearchQuery: (string | null);
}
function MediaGrid(props: IMediaGridProps) {
    const [ItemArray, setItemArray] = useState<IState[]>([{ selfLink: "", volumeInfo:{ }}]);

    useEffect(() => {
        fetch("https://www.googleapis.com/books/v1/volumes?q=" + props.SearchQuery+"&startIndex=0&maxResults=40"+
        "&key=AIzaSyCT_tETcy1JgZjbP4iuohi8KX3cGOo5P-I")
            .then(response => response.json())
            .then(response => {
                console.log(response.totalItems)
                setItemArray(response.items)
            })
            .catch(() => console.log("it didn't work")
            );

    }, [props.SearchQuery]);

    var Cards: JSX.Element[] = [];
    ItemArray.forEach((el: IState, i: Number) => {
        if (!el || !el.volumeInfo.imageLinks) {
            return;
        }
        
        var imageLink = el.volumeInfo.imageLinks.thumbnail;


        Cards.push(
            <Grid key={"card_"+i} item spacing={2} className="MediaGridCard">
                <MediaCard ImageUrl={imageLink} title={el.volumeInfo.title} authors={el.volumeInfo.authors} Description={el.volumeInfo.description} />
            </Grid>)
    });

    return (
        <div>
            <Grid container spacing={2} className="MediaGridContainer">
                {Cards}
            </Grid>
        </div>
    )
}

export default MediaGrid