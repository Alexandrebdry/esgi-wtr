import React, { useContext, useEffect, useState } from 'react';
import { Typography, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import {getUserById, setAdvisorStatus} from "../../../services/userServices";
import { getUserConversation } from "../../../services/conversationServices";
import { UserContext } from "../../provider/UserProvider";
import { DataGrid } from "@mui/x-data-grid";


export default function () {

    const [status, setStatus] = useState('');
    const {user} = useContext(UserContext);
    const [conv, setConv] = useState('');
    const[playOnce, setPlayOnce] = useState(true);

    const handleChange = event => {
        setStatus(event.target.value);
       
        try {
            const usr = setAdvisorStatus(user.id, event.target.value);
            if(usr?.message) throw new Error(usr.message);
        }
        catch(err) {
            console.log(err);
        }
    };

    const getUserStatus = async () => {
        try {
            const res = await (await getUserById(user.id)).json();
            setStatus(res.isOnline);
            if(res?.message) throw new Error(res.message);
        }
        catch(err) {
            console.log(err);
        }
    }

    const getConversations = async () => {
        try{
            const res = await (await getUserConversation(user.id)).json();
            setConv(res);
            if(res?.message) throw new Error(res.message);
        }
        catch(err) {
            console.log(err);
        }
    }

    if (playOnce) {
        getUserStatus();
        getConversations();
        setPlayOnce(false); 
    }



    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'name', width: 130 },
        { field: 'createdAt', headerName: 'Créée le', width: 130},
       
    ];

    const rows = [];

    conv ? conv.map((el) => 
        rows.push(el)
    ) : ''; 

    rows ? rows.map((el, index) => 
        el.id = index
    ) : ''; 


    return (
        <>
            <Typography textAlign={"center"} fontWeight={"bolder"} variant={"h4"} margin={"90px"}>Bienvenue sur votre espace conseiller</Typography>

            <Typography fontWeight={"bolder"} variant={"p"} margin={"90px"} fontSize={"20px"}>Discussions :</Typography>

            <FormControl sx={{ m: 1, minWidth: 130 }}>
                <InputLabel id="changeStatus">Status</InputLabel>
                <Select
                    labelId="status"
                    id="changeStatus"
                    value={status}
                    label="Status"
                    onChange={handleChange}
                >
                    <MenuItem value={true}>En ligne</MenuItem>
                    <MenuItem value={false}>Hors ligne</MenuItem>
                </Select>
            </FormControl>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </>
    )
}
