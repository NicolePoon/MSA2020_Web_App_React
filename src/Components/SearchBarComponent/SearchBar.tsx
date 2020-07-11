import React, {useState} from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import './SearchBar.css';
import {IUserInput} from '../../Common/interfaces'

interface ISearchBarProps{
    SetUserInput: (a: IUserInput) => void;
}


function SearchBar(props: ISearchBarProps) {

    const [SearchQuery, setSearchQuery] = useState<string | null>("");
    const handleSearchQueryChange = (s: string | null) =>{
        setSearchQuery(s);          
    }

    const [HasFocus, setHasFocus] = useState<boolean>(false);

    const handleSubmit = () => {
        if (SearchQuery?.length !== 0 && SearchQuery !== null && SearchQuery !== "") {
            let UserInput: IUserInput = {
                SearchQuery: SearchQuery,
                
            }
            props.SetUserInput(UserInput);
        } else {
            setHasFocus(true);
        }
    }

    return <div className="SearchBarContainer">
        <Grid container spacing={0} justify="flex-start"  alignItems="flex-end">
            <Grid item xs={3} >
                <TextField
                    required
                    id="outlined-required"
                    label="Book Name"
                    variant="outlined"
                    error={HasFocus && SearchQuery === ""}
                    onClick={() => setHasFocus(true)}
                    value={SearchQuery}
                    onChange={e => handleSearchQueryChange(e.target.value)}
                />
            </Grid>

            <Grid item xs={3}>
                <Button variant="outlined" size="large" color="secondary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Grid>

        </Grid>
    </div>
}

export default SearchBar