import { FormEvent, useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { IContact } from "./contact.component";
import add from "../assets/images/icons/Add.png"
import change from "../assets/images/icons/Change.png"
import trash from "../assets/images/icons/Delete.png"
import { toast } from 'react-toastify';

//default avatar
import default_avatar from "../assets/images/avatars/Default.png"
import instance from "../_helpers/api";
import TextInput from "./text-input.component";
import path from "node:path/win32";

interface IProps {
    show:boolean
    onHide:() => void
    addContact: (contact:IContact) => void
    selectedContact: IContact | undefined
    updateContactData: (contact:IContact) => void
}

//default contact data
const defaultContactData = {id:"", name:"", phone:"", email:"", avatar:""}

/**
 * Modal for contact addition and update
 * 
 * @param props see interface
 * @returns JSX
 */
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
        sumbitContact();
    }

    //Update or create new contact based on input
    async function sumbitContact() {
        try {

            if(!avatar && !newContactData.avatar) {
                toast.warning("Avatar is required !")
                return
            }

            const formdata = new FormData();
            formdata.append("name", newContactData.name);
            formdata.append("phone", newContactData.phone);
            formdata.append("email", newContactData.email);

            if(avatar) {
                let fileName = Date.now().toString() + "_" + avatar.name
                let blob = avatar.slice(0, avatar.size, 'image/png'); 
                const newFile = new File([blob], fileName, {type: 'image/png'});
                console.log('newFile', newFile)
                formdata.append("avatar", newFile);
            }

            if(props.selectedContact && newContactData.id) {
                const response = await instance.put("/contact/" + newContactData.id, formdata, { headers: { 'content-type': 'multipart/form-data' }
                });
                props.updateContactData(response.data);
            }
            else {
                const response = await instance.post("/contact", formdata);
                props.addContact(response.data)
            }

            setNewContactData(defaultContactData);
            setAvatar(undefined);
            props.onHide();
        }
        catch(err) {
            toast.error("Failed to create/update contact.")
        }
    }

    //get file from input
    async function fileInputAction(event: FormEvent) {
        event.preventDefault();
        const target = event.target as HTMLInputElement;
        const files = target.files;

        if (files?.length) {
            setAvatar(files[0]);
            setNewContactData(prev => { return {...prev, avatar: URL.createObjectURL(files[0])} });
        }
    }

    //hidden interaction for input
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
                        <img className="profile-picture" src={(newContactData.avatar && avatar !== undefined) ? newContactData.avatar : (newContactData.avatar && avatar === undefined) ? `${process.env.REACT_APP_API_URL}/upload-dir/${newContactData.avatar}` : default_avatar} alt="uploaded-avatar"></img>
                        <div>
                            <button onClick={(evt) => openFileUpload(evt)} className="primary-button"><img src={newContactData.avatar ? change : add} alt="plus" />{newContactData.avatar ? "Change Picture" : "Add Picture"}</button>
                            <input  ref={inputRef} className="upload-button" type="file" id="single" onChange={fileInputAction} hidden />
                            {newContactData.avatar && (<button onClick={(evt) => { evt.preventDefault(); setAvatar(undefined); setNewContactData((prev) => { return {...prev, avatar:''}})}} className="small-button"><img src={trash} alt="trash" /></button>)}
                        </div>
                    </div>

                    <TextInput label="Name" placeholder="Jamie Wright" value={newContactData.name} onChange={(evt) => setNewContactData((prev) => { return {...prev, name:evt.target.value} } )} type="text" name="name" />
                    <TextInput label="Phone number" placeholder="+01 234 5687" value={newContactData.phone} onChange={(evt) => setNewContactData((prev) => { return {...prev, phone:evt.target.value} } )} type="tel" name="phone-number" />
                    <TextInput label="Email address" placeholder="jamie.wright@mail.com" value={newContactData.email} onChange={(evt) => setNewContactData((prev) => { return {...prev, email:evt.target.value} } )} type="email" name="email" />

                    <div className="interaction-container">
                        <button className="secondary-button" type="submit">Done</button>
                        <button className="secondary-button-dark" onClick={(evt) => {props.onHide(); evt.preventDefault(); setNewContactData(defaultContactData); setAvatar(undefined)}}>Cancel</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}