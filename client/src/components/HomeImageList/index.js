import React from 'react';
import HomeImageCard from '../HomeImageCard'

const HomeImageList = (props) => {
    

    // props.users.forEach((user) => {
    //     console.log(user)

    //     Image = user.items.map(object => {
    //         console.log(object)
    //         return <ImageCard 
    //         itemName={object.itemName} 
    //         zipCode={object.zipCode}
    //         itemDescription={object.itemDescription}
    //         key={object.name}
    //         picture={object.itemPicture}
    //         username={object.username}
    //         />
    //     })
    // });

    var Image = props.users.map(user => {
        return <HomeImageCard
        user={user.username}
        items={user.items}
        />
    })
    

    return(
        <div className="card-columns">
          {Image}
        </div>
    )
};

export default HomeImageList;