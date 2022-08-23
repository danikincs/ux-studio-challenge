import { useEffect, useRef, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import AddContactModal from '../components/add-modal.component';
import Contact, { IContact } from '../components/contact.component';
import HeaderNavBar from '../components/header-nav-bar.component';
import { toast } from 'react-toastify';

//icons
import back from "../assets/images/icons/Back-arrow.png";
import brightness from "../assets/images/icons/Light-mode.png";
import instance from '../_helpers/api';
import { useOutsideAlerter } from '../_helpers/outside-click-alert.component';

function Home() {

    const [ contacts, setContacts ] = useState<IContact[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);

    const [ showAddContactModal, setShowAddContactModal ] = useState<boolean>(false);
    const [ showSettingDetails, setShowSettingDetails ] = useState<string>('');

    //update contact
    const [ selectedContact, setSelectedContact ] = useState<IContact | undefined>(undefined);

    useEffect(() => {
        getContacts();
        setLoading(false);
    }, []);

    const outerRef = useRef<HTMLDivElement>(null);

    useOutsideAlerter(outerRef, showSettingDetails, setShowSettingDetails );

    async function getContacts() {
        try {
            const contactsResponse = await instance.get("/contact");
            console.log('hehe', contactsResponse)
            setContacts(contactsResponse.data);
        }
        catch(err) {
            toast.error("Failed to get contact.")

        }
    }

    //add new contact
    function addContact(newContact:IContact) {
        setContacts(prev => [...prev, newContact])
    }

    //set selected to contact object
    function editContact(id:string) {
        const selected = contacts.find((contact:IContact) => contact.id === id)

        if(!selected) {
            return;
        }

        setSelectedContact(selected);
        setShowAddContactModal(true)
    }

    //delete contact by id and update state
    async function deleteContact(id:string) {
        try {
            const deleteRes = await instance.delete("/contact/" + id)

            if(deleteRes.data.success) {
                setContacts(prev => {
                    const newData = prev.filter((contact:IContact) => contact.id !== id)
                    return newData
                })
            }            
        }
        catch(err:any) {
            toast.error("Failed to delete contact.")
        }

        setShowSettingDetails('');
    }

    //update contact by data and update state
    async function updateContactData(newContactData:IContact) {
        setContacts(prev => {
            return prev.map((contact:IContact) => contact.id === newContactData.id ? {...contact, ...newContactData} : contact)
        })
    }

    return (
        <div className="home-page-container">
            {/* react bootstrap layout, it probably should be normal css table grid */}
            <Row className="home-grid-row">
                <Col className="grid-col" lg={3} sm={1} md={1}>
                </Col>
                <Col className="grid-col" lg={6}>
                </Col>
                <Col className="grid-col" lg={3} sm={1} md={1}>
                </Col>
            </Row>
            <Row className="home-grid-row">
                <Col className="grid-col" lg={3} sm={1} md={1}>
                    <button className="small-button-dark back"><img src={back} alt="back"/></button>
                </Col>
                <Col className="grid-col" lg={6}>
                    <HeaderNavBar handleModalAction={() => setShowAddContactModal(true)} />
                </Col>
                <Col className="grid-col" lg={3} sm={1} md={1}>
                    <button className="small-button-dark brightness"><img src={brightness} alt="brightness"/></button>
                </Col>
            </Row>
            <Row className="home-grid-row">
                <Col className="grid-col" lg={3} sm={1} md={1}>
                </Col>
                <Col className="grid-col contacts-container-cell" lg={6} md={10} sm={10}>
                    {!loading ?
                    <div ref={outerRef} className='contacts-container'>
                        {contacts.map((contact:IContact) => {
                            return(
                                <div key={contact.id}>
                                    <Contact 
                                        contact={contact} 
                                        editContact={editContact} 
                                        deleteContact={deleteContact}
                                        showSettingDetails={showSettingDetails}
                                        setShowSettingDetails={setShowSettingDetails}
                                    />
                                </div>
                            )
                        })}
                        {!contacts.length && <p className="info-text">No contacts avalible</p>}
                    </div>
                    :
                        <p>Loading</p>
                    }
                </Col>
                <Col className="grid-col" lg={3} sm={1} md={1}>
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
