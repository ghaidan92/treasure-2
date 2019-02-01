import React from 'react';
import './imagelist.css';
import Card from "../ImageCard";

const ImageList = (props) => {

    var Image = props.itemObj.map(object => {
        return <Card itemName={object.itemName} zipCode={object.zipCode}/>
    })
    return(

        <div>
          {Image}
        </div>
    )
};

export default ImageList;