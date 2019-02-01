import React, { Component } from 'react';

class ImageCard extends Component {

    // constructor(props) {
    //     super(props);
      
    //     this.itemObjRef = React.createRef();
    // }

    componentDidMount() {
 
        // console.log(this.imageRef.current.clientHeight);
    }

  
    render() {
        // const {description, urls} =this.props.image;

        return (
            <div >

                <h1 className="test">{this.props.itemName}</h1>
                {/* <img ref={this.itemObjRef} src={this.props.itemObj} alt='alt'/> */}
            </div>
        );
    }
}

export default ImageCard;