import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';

function RenderCard({item}) {

    return(
        <Card>
            <CardImg src={item.image} alt={item.name} />

            <CardBody>
            <CardTitle><b><h4>{item.name}</h4></b></CardTitle>

            {item.designation ? <CardSubtitle><b>{item.designation}</b></CardSubtitle> : null }

            <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );

}

function Home(props) {
    return(
       <div className="container">
            <div className="row align-items-start">

                <div className=" col-md m-1">
                    <RenderCard item={props.dish} />
                </div>

                <div className=" col-md m-1">
                    <RenderCard item={props.promotion} />
                </div>

                <div className=" col-md m-1">
                    <RenderCard item={props.leader} />
                </div>

            </div>
        </div>
    );
}

export default Home;