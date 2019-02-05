import React from 'react';
import './imagelist.css';
import ImageCard from "../ImageCard";

const ImageList = (props) => {
    
    for (var i=0; i<props.itemObj.length; i++) {
       
       
        

        var Image = props.itemObj.map(object => {
            return <ImageCard 
            itemName={object.itemName} 
            zipCode={object.zipCode}
            itemDescription={object.itemDescription}
            key={object.name}
            picture={object.itemPicture}
            username={object.username}
            />
        })
    }
   
    return(

        <div className="card-columns">
          {Image}
        </div>
    )
};

export default ImageList;