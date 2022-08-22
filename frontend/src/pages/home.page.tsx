import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import AddContactModal from '../components/add-modal.component';
import Contact, { IContact } from '../components/contact.component';
import HeaderNavBar from '../components/header-nav-bar.component';

//default user avatars
import timothy_avatar from "../assets/images/avatars/Timothy.png";
import sarah_avatar from "../assets/images/avatars/Sarah.png";

//icons
import back from "../assets/images/icons/Back-arrow.png";
import brightness from "../assets/images/icons/Light-mode.png";
import instance from '../_helpers/api';

const default_contacts: IContact[] = [
    {
        _id:"1",
        avatar:timothy_avatar,
        name:"Timothy Lewis",
        phone:"+36 01 234 5678",
        email:"danikincs@gmail.com"
    },
    {
        _id:"2",
        avatar:sarah_avatar,
        name:"Sarah Wright",
        phone:"+36 01 234 5678",
        email:"danikincs@gmail.com"
    }
]

function Home() {

    const [ contacts, setContacts ] = useState<IContact[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);

    const [ showAddContactModal, setShowAddContactModal ] = useState<boolean>(false);
    const [ showSettingDetails, setShowSettingDetails ] = useState<string>('')

    //update contact
    const [ selectedContact, setSelectedContact ] = useState<IContact | undefined>(undefined)

    useEffect(() => {
        getContacts();
        setLoading(false);
    }, []);

    async function getContacts() {
        try {
            const contactsResponse = await instance.get("/contact");
            console.log('contacts', contactsResponse.data);
            setContacts(contactsResponse.data);
        }
        catch(err) {

        }
    }

    function addContact(newContact:IContact) {
        setContacts(prev => [...prev, newContact])
    }

    function editContact(_id:string) {
        const selected = contacts.find((contact:IContact) => contact._id === _id)

        if(!selected) {
            return;
        }

        setSelectedContact(selected);
        setShowAddContactModal(true)
    }

    async function deleteContact(_id:string) {
        try {
            const deleteRes = await instance.delete("/contact/" + _id)

            if(deleteRes.data.acknowledged) {
                setContacts(prev => {
                    const newData = prev.filter((contact:IContact) => contact._id !== _id)
                    return newData
                })
            }            
        }
        catch(err:any) {
            console.log('error', err)
        }
    }

    async function updateContactData(newContactData:IContact) {
        setContacts(prev => {
            return prev.map((contact:IContact) => contact._id === newContactData._id ? newContactData : contact)
        })
    }

    return (
        <div className="home-page-container">
            <Row className="home-grid-row">
                <Col className="grid-col" lg={3}>
                </Col>
                <Col className="grid-col" lg={6}>
                </Col>
                <Col className="grid-col" lg={3}>
                </Col>
            </Row>
            <Row className="home-grid-row">
                <Col className="grid-col" lg={3}>
                    <button className="small-button-dark back"><img src={back} alt="back"/></button>
                </Col>
                <Col className="grid-col" lg={6}>
                    <HeaderNavBar handleModalAction={() => setShowAddContactModal(true)} />
                </Col>
                <Col className="grid-col" lg={3}>
                    <button className="small-button-dark brightness"><img src={brightness} alt="brightness"/></button>
                </Col>
            </Row>
            <Row className="home-grid-row">
                <Col className="grid-col" lg={3}>
                </Col>
                <Col className="grid-col" lg={6}>
                    {!loading ?
                    <div className='contacts-container'>
                        {contacts.map((contact:IContact) => {
                            return(
                                <Contact 
                                    contact={contact} 
                                    editContact={editContact} 
                                    deleteContact={deleteContact}
                                    showSettingDetails={showSettingDetails}
                                    setShowSettingDetails={setShowSettingDetails}

                                />
                            )
                        })}
                        {!contacts.length && <p className="info-text">No contacts avalible</p>}
                    </div>
                    :
                        <p>Loading</p>
                    }
                </Col>
                <Col className="grid-col" lg={3}>
                </Col>
            </Row>

            <AddContactModal 
                show={showAddContactModal} 
                onHide={() => {setShowAddContactModal(false); setSelectedContact(undefined)}} 
                addContact={addContact} 
                selectedContact={selectedContact}
                updateContactData={updateContactData}
                />
        </div>
    );
}

export default Home;
