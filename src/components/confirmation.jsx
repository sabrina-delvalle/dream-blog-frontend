import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
axios.defaults.withCredentials = true;

function Confirmation() {
    let { id } = useParams();

    useEffect(() => {
        const confirmation = async () => {
            axios.get(`${process.env.REACT_APP_API}/confirmation/${id}`, {
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                    }    
            })
            .then(response => {
                console.log(response.data);
            })
        }
        confirmation();
    }, [id])

  return (<div></div>);
}

export default Confirmation;
