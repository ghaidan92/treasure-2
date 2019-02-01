import React from 'react';


const Card = (props) => {

    return (
        <div>
            <h1>{props.itemName}</h1>
            <h2>{props.zipCode}</h2>
        </div>
    )

}

export default Card;