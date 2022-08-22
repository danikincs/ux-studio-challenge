import React, { useState, useRef } from "react";
import { Row,Col } from "react-bootstrap";

//interaction svg-s
import mute from "../assets/images/icons/Mute.png";
import call from "../assets/images/icons/Call.png";
import more from "../assets/images/icons/More.png";
import edit from "../assets/images/icons/Settings.png";
import favourite from "../assets/images/icons/Favourite.png";
import remove from "../assets/images/icons/Delete.png";
import { useOutsideAlerter } from "../_helpers/outside-click-alert.component";

interface IProps {
    contact:IContact

    editContact: (_id:string) => void
    deleteContact: (_id:string) => void

    showSettingDetails:string
    setShowSettingDetails:(data:string) => void
}
export interface IContact {
    _id:string
    avatar:string
    name:string
    phone:string
    email:string

}

export default function Contact(props:IProps) {


    const { _id, avatar, name, phone } = props.contact;

    const [ isHovering, setIsHovering ] = useState(false);

    const outerRef = useRef<HTMLDivElement>(null);
    useOutsideAlerter(outerRef, props.showSettingDetails, props.setShowSettingDetails);


    const handleMouseOver = () => {
        if(!props.showSettingDetails.length) {
            setIsHovering(true);
        }
    };
    
    const handleMouseOut = () => {
        setIsHovering(false);
    };

    return(
        <div ref={outerRef} key={_id} className="contact-container" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <div className="image-container">
                <img className="profile-picture-small" src={`${process.env.REACT_APP_API_URL}/${avatar}`} alt="user-avatar" />
                <div className="name-container">
                    <p className="headline-3">{name}</p>
                    <p className="message-text">{phone}</p>
                </div>
            </div>
            {(isHovering || props.showSettingDetails === _id) && (
                <div className="icon-container">
                    <button className="small-button"><img src={mute} alt="mute"/></button>
                    <button className="small-button"><img src={call} alt="call"/></button> 
                    <div className="more-container">
                        <button className="small-button" onClick={() => props.setShowSettingDetails(_id)}><img src={more} alt="more"/></button> 
                        {props.showSettingDetails === _id && (
                        <div className="more-details"> 
                            <div className="action-row" onClick={() => props.editContact(_id)}>
                                <img src={edit} alt="edit-icon"/>
                                <p>Edit</p>
                            </div>
                            <div className="action-row">
                                <img src={favourite} alt="edit-icon"/>
                                <p>Favourite</p>
                            </div>
                            <div className="action-row" onClick={() => props.deleteContact(_id)}>
                                <img src={remove} alt="edit-icon"/>
                                <p>Remove</p>
                            </div>
                        </div>
                    )}
                    </div>
                </div>
            )}
        </div>
    )
}