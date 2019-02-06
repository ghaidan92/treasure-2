import React from 'react';

const HomeImageCard = (props) => {

    var Card = props.items.map(item => {
        return (
            <div className="card">
                <img className="card-img-top" src={item.itemPicture || "https://via.placeholder.com/350x350"} alt={props.itemName} />
                <div className="card-body">
                    <h5 className="card-title">{item.itemName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Location: {item.zipCode}</h6>
                    <p className="card-text">{item.itemDescription}</p>
                    <p className="card-text">Posted By: {props.user}</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        );
    })

    return (
        <div>{Card}</div>
    )


}

export default HomeImageCard;
