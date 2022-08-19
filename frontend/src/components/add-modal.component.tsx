import React, { FormEvent, useEffect, useState } from "react";
import { Form, Modal, Row } from "react-bootstrap";
import { IContact } from "./contact.component";

//default avatar
import default_avatar from "../assets/images/avatars/Default.png"

interface IProps {
    show:boolean
    onHide:() => void
    addContact: (contact:IContact) => void
}

export default function AddContactModal(props:IProps) {

    const [ newContactData, setNewContactData ] = useState<IContact>({_id:0, name:"", phone:"", email:"", avatar:""});

    function submitContactForm(evt:any) {
        evt.preventDefault();
        props.addContact(newContactData)
        props.onHide();
    }

    async function fileUpload(event: FormEvent) {
        const target = event.target as HTMLInputElement;
        const files = target.files;

        if (files?.length) {
            setNewContactData(prev => { return {...prev, avatar: URL.createObjectURL(files[0])} });
        }
    }

    return(
        <Modal show={props.show} onHide={props.onHide} dialogClassName="add-contact-modal" backdrop="static">
            <Modal.Header> 
                <p>Add contact </p>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={ (evt) =>submitContactForm(evt)}>
                <img src={newContactData.avatar ? newContactData.avatar : default_avatar} alt="uploaded-avatar"></img>

                <div className="upload-container">
                    <label htmlFor="single" className="link-button btn">
                        Upload profile photo
                    </label>
                    <input className="upload-button" type="file" id="single" onChange={fileUpload} hidden />
                </div>

                <label>Name
                    <input onChange={(evt) => setNewContactData((prev) => { return {...prev, name:evt.target.value} } )} type="text" name="name" />
                </label>
                <label>Phone number
                    <input onChange={(evt) => setNewContactData((prev) => { return {...prev, phone:evt.target.value} } )} type="text" name="phone-number" />
                </label>
                <label>Email address
                    <input onChange={(evt) => setNewContactData((prev) => { return {...prev, email:evt.target.value} } )} type="email" name="name" />
                </label>
                <div className="interaction-container">
                    <button onClick={props.onHide}>Cancel</button>
                    <button type="submit">Done</button>
                </div>
            </form>
            </Modal.Body>
        </Modal>
    )
}