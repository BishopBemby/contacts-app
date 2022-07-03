import React, { useState, useContext } from 'react';
import img from "../../assets/images/img.png"

import { GlobalContext } from '../../context/GlobalState';
import { useNavigate } from 'react-router-dom';
import { Modal, Card, Toast, ToastContainer } from "react-bootstrap";
import "./ContactsList.scss";

export const ContactsList = (props) => {
    const { contacts, editContact } = useContext(GlobalContext);
    let navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [showCard, setShowCard] = useState(1);
    const [id, setID] = useState(null);
    const handleClose = () => setShow(false);

    const [selectedUser, setSelectedUser] = useState({
        id: id,
        name: "",
        phone: "",
        email: "",
        company: "",
        address: "",
        image: img
    });

    const [selectedDisplayUser, setSelectedDisplayUser] = useState({
        id: 0,
        name: "",
        phone: "",
        email: "",
        company: "",
        address: "",
        image: img
    });

    React.useEffect(() => {
        if (selectedDisplayUser.id === 0) {
            setShowCard(false)
        } else {
            setShowCard(true)
        }
    }, [showCard, selectedDisplayUser.id])

    const handleShow = (e) => {
        e.preventDefault();
        let val = e.target.value
        setID(val)
        setShow(true)
        const contactId = val;
        const selectedContact = contacts.find(
            (currentContact) => currentContact.id === parseInt(contactId)
        )
        setSelectedUser(selectedContact);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        editContact(selectedUser);
        handleClose()
        navigate("/");
    };

    const handleOnChange = (userKey, newValue) => {
        setSelectedUser({ ...selectedUser, [userKey]: newValue });
    }


    const checkedCheckBox = (e) => {
        var instate = (e.target.checked);
        if (instate) {
            e.target.checked = true;
            const contactId = e.target.id;
            if (e.target.checked) {
                const selectedContact = contacts.find(
                    (currentContact) => currentContact.id === parseInt(contactId)
                )
                setSelectedDisplayUser(selectedContact);
                document.getElementById("")
            }
        }
        const cbs = document.getElementsByName("cb");
        for (var i = 0; i < cbs.length; i++) {
            cbs[i].target.checked = false;
        }

    }

    return (
        <>
            <React.Fragment>
                <div className='row'>
                    <div className='col-sm-7'>
                        <ToastContainer>
                            {props.list.length > 0 ? (

                                props.list.map((contact) => (
                                    <>
                                        <Toast
                                            className="custom-toast my-2 pt-2"
                                            key={contact.id}
                                            value={contact.id}
                                        >
                                            <div className="flex flex-column px-2 py-3">
                                                <input type="radio" className='mx-2' name="cb" id={contact.id} onChange={checkedCheckBox} />
                                                <span className="mx-1" value={contact.name}>
                                                    <img src={contact.image} className="icon-img" alt="imgs" />
                                                </span>
                                                <span className='mx-1'>
                                                    {contact.name}
                                                </span>
                                                <span className='company pe-2'>
                                                    {contact.company}
                                                    <button className="bg-gradient ms-2 border rounded text-white text-2xl" value={contact.id} onClick={handleShow}>
                                                        Edit
                                                    </button>
                                                </span>

                                            </div>
                                        </Toast>
                                    </>
                                ))
                            ) : (
                                <p className="text-center py-5">No data.</p>
                            )}
                        </ToastContainer>
                    </div>
                    <div className='col-sm-5 my-2'>
                        {showCard && <Card style={{ width: '18rem', backgroundColor: "rgb(238, 235, 235)" }}>
                            <div className='text-center py-3'>
                                <Card.Img variant="top" className='card-img' src={selectedDisplayUser.image} />
                            </div>
                            <Card.Body>
                                <Card.Title>{selectedDisplayUser.name}</Card.Title>
                                <Card.Text>
                                    <table class="table table-borderless table-responsive">
                                        <tbody>
                                            <tr>
                                                <td>Full Name</td>
                                                <td>{selectedDisplayUser.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>{selectedDisplayUser.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Phone</td>
                                                <td>{selectedDisplayUser.phone}</td>
                                            </tr>
                                            <tr>
                                                <td>Company</td>
                                                <td>{selectedDisplayUser.company}</td>
                                            </tr>
                                            <tr>
                                                <td>Address</td>
                                                <td>{selectedDisplayUser.address}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Card.Text>
                            </Card.Body>
                        </Card>}
                    </div>
                </div>


            </React.Fragment>
            {
                <Modal show={show} onHide={handleClose} className="edit-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Contact</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="w-full max-w-sm container mt-20 mx-auto">
                            <form onSubmit={onSubmit}>
                                <div className="w-full mb-3">
                                    <label
                                        className="block text-xs font-bold mb-2"
                                        htmlFor="name"
                                    >
                                        Name
                                    </label>
                                    <input
                                        className="form-control shadow border rounded w-full py-2 px-3"
                                        value={selectedUser.name}
                                        onChange={(e) => handleOnChange("name", e.target.value)}
                                        type="text"
                                        placeholder="Enter name"
                                    />
                                </div>
                                <div className="w-full mb-3">
                                    <label
                                        className="block text-xs font-bold mb-2"
                                        htmlFor="Phone"
                                    >
                                        Phone
                                    </label>
                                    <input
                                        className="form-control shadow border rounded w-full py-2 px-3"
                                        value={selectedUser.phone}
                                        onChange={(e) => handleOnChange("phone", e.target.value)}
                                        type="text"
                                        placeholder="Enter Phone"
                                    />
                                </div>
                                <div className="w-full  mb-3">
                                    <label
                                        className="block text-xs font-bold mb-2"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        className="form-control shadow border rounded w-full py-2 px-3"
                                        value={selectedUser.email}
                                        onChange={(e) => handleOnChange("email", e.target.value)}
                                        type="email"
                                        placeholder="Enter email"
                                    />
                                </div>
                                <div className="w-full  mb-3">
                                    <label
                                        className="block text-xs font-bold mb-2"
                                        htmlFor="company"
                                    >
                                        Company
                                    </label>
                                    <input
                                        className="form-control shadow border rounded w-full py-2 px-3"
                                        value={selectedUser.company}
                                        onChange={(e) => handleOnChange("company", e.target.value)}
                                        type="text"
                                        placeholder="Enter company"
                                    />
                                </div>
                                <div className="w-full  mb-3">
                                    <label
                                        className="block text-xs font-bold mb-2"
                                        htmlFor="address"
                                    >
                                        Address
                                    </label>
                                    <input
                                        className="form-control shadow border rounded w-full py-2 px-3"
                                        value={selectedUser.address}
                                        onChange={(e) => handleOnChange("address", e.target.value)}
                                        type="text"
                                        placeholder="Enter Address"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <button className="bg-gradient border none w-full text-white font-bold py-2 px-4 rounded">
                                        Edit Address
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            }</>
    );
};