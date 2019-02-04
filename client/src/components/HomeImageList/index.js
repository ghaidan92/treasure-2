import React from 'react';
import ImageCard from "../ImageCard";

const HomeImageList = (props) => {
    
    console.log(props.users);
    console.log(props);
    var Image;
    

    props.users.forEach((user) => {
        console.log(user)

        Image = user.items.map(object => {
            console.log(object)
            return <ImageCard 
            itemName={object.itemName} 
            zipCode={object.zipCode}
            itemDescription={object.itemDescription}
            key={object.name}
            picture={object.itemPicture}
            username={object.username}
            />
        })
    });


    return(

        <div className="card-columns">
          {Image}
        </div>
    )
};

export default HomeImageList;