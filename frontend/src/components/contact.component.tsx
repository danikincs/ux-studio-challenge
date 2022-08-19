import React, { useState } from "react";
import { Row,Col } from "react-bootstrap";

//interaction svg-s
import mute from "../assets/images/icons/Mute.png";
import call from "../assets/images/icons/Call.png";
import more from "../assets/images/icons/More.png";

export interface IContact {
    _id:number
    avatar:string
    name:string
    phone:string
    email:string
}

export default function Contact(props:IContact) {

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
      };
    
      const handleMouseOut = () => {
        setIsHovering(false);
      };

    return(
        <div key={props._id} className="contact-container" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <div className="image-container">
                <img className="profile-picture-small" src={props.avatar} alt="user-avatar" />
            </div>
            <div className="name-container">
                <p className="headline-3">{props.name}</p>
                <p className="message-text">{props.phone}</p>
            </div>
            {isHovering && (
                <div className="icon-container">
                    <img src={mute} alt="mute"/>
                    <img src={call} alt="call"/>
                    <img src={more} alt="more"/>  
                </div>
            )}
        </div>
    )
}