import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import './imagecard.css'

const ImageCard = (props) => {


    return (
        <div>
            <Card key={props.itemName} className="card">
                <CardBody>
                    <CardTitle>{props.itemName}</CardTitle>
                    <CardSubtitle>Location: {props.zipCode}</CardSubtitle>
                    <CardText>{props.itemDescription}</CardText>
                </CardBody>
            </Card>
        </div>
    )

}

export default ImageCard;