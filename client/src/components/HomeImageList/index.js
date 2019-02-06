import React from 'react';
import HomeImageCard from '../HomeImageCard'

const HomeImageList = (props) => {

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