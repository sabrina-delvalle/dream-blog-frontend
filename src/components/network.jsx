import React from "react";
import { useEffect, useState } from 'react'

export default function Network() {
    const [backendData, setBackendData] = useState([{}]);

    useEffect( () => {
      fetch('http://localhost:5000/login')
          .then( response => response.json())
          .then(data => {
            console.log(data)
            setBackendData(data)
          })
    }, [])
  
    return(
      <div>
        {(typeof backendData.users === 'undefined') ? 
            (<p>loading...</p>) : (backendData.users.map((user, i) => {
                return <p key={i}>{user}</p>
        }))
        }
      </div>
    ) 
}
