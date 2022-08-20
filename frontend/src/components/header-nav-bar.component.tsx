import React from "react";
import { Row, Col } from "react-bootstrap";

//icons
import settings from "../assets/images/icons/Settings.png";
import avatar from "../assets/images/icons/Profile-pic.png";
import add from "../assets/images/icons/Add.png";

interface IProps {
    handleModalAction: () => void
}

export default function HeaderNavBar(props:IProps) {

    return(
        <div className="header-container"> 
        
            <h1 className="headline-1">Contacts</h1>

            <div className="nav-bar-interaction-container">
                <button className="small-button"><img src={settings} alt="settings"/></button> 
                <button className="small-button-dark"><img src={avatar} alt="small-avatar" /></button> 
                <button className="primary-button-gradiant" onClick={props.handleModalAction}>
                    <img src={add} alt="add" />
                    <span className="body-text">Add new</span>
                </button>
            </div>

        </div>
    );
} 