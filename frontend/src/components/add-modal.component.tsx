import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Form, Modal, Row } from "react-bootstrap";
import { IContact } from "./contact.component";
import add from "../assets/images/icons/Add.png"
import change from "../assets/images/icons/Change.png"
import trash from "../assets/images/icons/Delete.png"

//default avatar
import default_avatar from "../assets/images/avatars/Default.png"
import instance from "../_helpers/api";

interface IProps {
    show:boolean
    onHide:() => void
    addContact: (contact:IContact) => void
    selectedContact: IContact | undefined
    updateContactData: (contact:IContact) => void
}

const defaultContactData = {_id:"", name:"", phone:"", email:"", avatar:""}

export default function AddContactModal(props:IProps) {

    const [ newContactData, setNewContactData ] = useState<IContact>(defaultContactData);
    const [ avatar, setAvatar ] = useState<File>();

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(props.selectedContact) {
            setNewContactData(props.selectedContact)
        } 
        else {
            setNewContactData(defaultContactData)
        }

    }, [props.selectedContact])

    function submitContactForm(evt:any) {
        evt.preventDefault();
        createNewContact();
    }

    async function createNewContact() {
        try {
            console.log('lefut az add new contact')

            const formdata = new FormData();
            formdata.append("name", newContactData.name);
            formdata.append("phone", newContactData.phone);
            formdata.append("email", newContactData.email);

            if(avatar) {
                formdata.append("avatar", avatar);
            }

            if(props.selectedContact && newContactData._id) {
                const response = await instance.put("/contact/" + newContactData._id, formdata);
                console.log('res', response.data)
                props.updateContactData(response.data);
            }
            else {
                const response = await instance.post("/contact", formdata);
                props.addContact(response.data)
            }
            props.onHide();
        }
        catch(err) {
            console.log('upload err', err)
        }
    }

    async function fileUpload(event: FormEvent) {
        event.preventDefault();
        const target = event.target as HTMLInputElement;
        const files = target.files;

        if (files?.length) {
            setAvatar(files[0]);
            setNewContactData(prev => { return {...prev, avatar: URL.createObjectURL(files[0])} });
        }
    }

    function openFileUpload(event:FormEvent) {
        event.preventDefault();
       if(inputRef.current) {
            inputRef.current.click();
       }
    }

    return(
        <Modal show={props.show} onHide={props.onHide} dialogClassName="add-contact-modal" backdrop="static">
            <Modal.Body>
                <p className="headline-1">Add contact</p>
                <form className="add-contact-form" onSubmit={ (evt) =>submitContactForm(evt)}>
                    <div className="profile-picture-uploader">
                        <img className="profile-picture" src={newContactData.avatar ? `${process.env.REACT_APP_API_URL}/${newContactData}` : default_avatar} alt="uploaded-avatar"></img>
                        {/* <div className="upload-container"> */}
                            <button onClick={(evt) => openFileUpload(evt)} className="primary-button"><img src={newContactData.avatar ? change : add} alt="plus" />{newContactData.avatar ? "Change Picture" : "Add Picture"}</button>
                            <input ref={inputRef} className="upload-button" type="file" id="single" onChange={fileUpload} hidden />
                            {newContactData.avatar && (<button className="small-button"><img src={trash} alt="trash" /></button>)}
                        {/* </div> */}
                    </div>

                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input required value={newContactData.name} onChange={(evt) => setNewContactData((prev) => { return {...prev, name:evt.target.value} } )} type="text" id="name" name="name" />
                    </div>

                    <div className="input-group">
                        <label>Phone number</label>
                        <input required value={newContactData.phone} onChange={(evt) => setNewContactData((prev) => { return {...prev, phone:evt.target.value} } )} type="text" id="phone-number" name="phone-number" />
                    </div>

                    <div className="input-group">
                        <label>Email address</label>
                        <input required value={newContactData.email} onChange={(evt) => setNewContactData((prev) => { return {...prev, email:evt.target.value} } )} type="email" id="email" name="email" />
                    </div>

                    <div className="interaction-container">
                        <button className="secondary-button" type="submit">Done</button>
                        <button className="secondary-button-dark" onClick={(evt) => {props.onHide(); evt.preventDefault()}}>Cancel</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}