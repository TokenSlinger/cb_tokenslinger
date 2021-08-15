import React from "react";
import { useParams } from "react-router-dom";

export default function Account() {
    
    const { address } = useParams()

    return(
        <React.Fragment>
            Account: { address }
        </React.Fragment>
    )

}