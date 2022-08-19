import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import AddContactModal from '../components/add-modal.component';
import Contact, { IContact } from '../components/contact.component';
import HeaderNavBar from '../components/header-nav-bar.component';

//default user avatars
import timothy_avatar from "../assets/images/avatars/Timothy.png";
import sarah_avatar from "../assets/images/avatars/Sarah.png";

const default_contacts: IContact[] = [
    {
        _id:1,
        avatar:timothy_avatar,
        name:"Timothy Lewis",
        phone:"+36 01 234 5678",
        email:"danikincs@gmail.com"
    },
    {
        _id:2,
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

    //update contact
    const [ selectedContactId, setSelectedContactId ] = useState<number | undefined>(undefined)

    useEffect(() => {
        setContacts(default_contacts);
        setLoading(false);
    }, []);

    function addContact(newContact:IContact) {
        setContacts(prev => [...prev, newContact])
    }

    function updateContact() {

    }

    function deleteCOntact() {

    }

    return (
        <div className="home-page-container">
            <HeaderNavBar handleModalAction={() => setShowAddContactModal(true)} />

            {!loading ?
                <div className='contacts-container'>
                    {contacts.map((contact:IContact) => {
                        return(
                            <Contact _id={contact._id} avatar={contact.avatar} name={contact.name} phone={contact.phone} email={contact.email} />
                        )
                    })}
                </div>
            :
                <p>Loading</p>
            }
            <AddContactModal 
                show={showAddContactModal} 
                onHide={() => setShowAddContactModal(false)} 
                addContact={addContact} 
                />
        </div>
    );
}

export default Home;
