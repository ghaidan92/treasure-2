import React from 'react';
import './imagelist.css';
import ImageCard from "../ImageCard/index.js";

const ImageList = (props) => {
    console.log(props.itemObjects);

    var itemObjects = props.itemObjects.map(itemObj => {
    console.log(itemObj.itemObjects.data.itemName);
    return <ImageCard  /*key={image.id}*/ itemName={itemObj.itemObjects.data.itemName} />
    });

    return <div className="image-list">{itemObjects}</div>;
};

export default ImageList;