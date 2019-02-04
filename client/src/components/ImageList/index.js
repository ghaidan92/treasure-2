import React from 'react';
// import './imagelist.css';
import ImageCard from "../ImageCard";

const ImageList = (props) => {

    var Image = props.itemObj.map(object => {
        return <ImageCard 
        itemName={object.itemName} 
        zipCode={object.zipCode}
        itemDescription={object.itemDescription}
        key={object.name}
        />
    })
    return(

        <div>
          {Image}
        </div>
    )
};

export default ImageList;