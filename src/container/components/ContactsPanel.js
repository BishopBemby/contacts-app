import React, { useState, useRef, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faSearch, faAdd } from '@fortawesome/free-solid-svg-icons'

import img from "../../assets/images/img.png"
import { ContactsList } from "./ContactsList";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

import { GlobalContext } from '../../context/GlobalState';

import './ContactsPanel.scss'

export const ContactsPanel = () => {
    const contact = <FontAwesomeIcon icon={faAddressBook} />
    const searchIcon = <FontAwesomeIcon icon={faSearch} />
    const addIcon = <FontAwesomeIcon icon={faAdd} />

    let navigate = useNavigate();

    const { addContact, contacts } = useContext(GlobalContext);
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [show, setShow] = useState(false);
    const inputEl = useRef('')
    const handleClose = () => setShow(false);

    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const handleShow = () => {
        setShow(true)
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const newContact = {
            id: contacts.length + 1,
            name,
            phone,
            company,
            email,
            address,
            image: img
        };
        addContact(newContact);
        handleClose()
        setAddress("")
        setName("")
        setPhone('')
        setEmail("")
        setCompany("")
        navigate("/");
    };

    const handleFilterTextInputChange = () => {
        searchHandler(inputEl.current.value)
    }

    const searchHandler = (searchTerm) => {
        console.log(searchTerm)
        setSearchTerm(searchTerm)
        if (searchTerm !== "") {
            const newContactsList = contacts.filter((contact) => { return Object.values(contact.name).join("").toLowerCase().includes(searchTerm.toLowerCase()) })
            setSearchResults(newContactsList)
        } else {
            setSearchResults(contacts)
        }
    }

    return (
        <React.Fragment>
            <div className="container mx-auto">
                <div className="flex contact-heading">
                    <span className="contact-icon">
                        {contact}
                    </span>
                    <span className="text-black px-1">
                        Contacts
                    </span>
                </div>
                <hr></hr>
                <div>
                    <div className="flex mt-24 mb-10">
                        <span>
                            <input
                                size={"20px"}
                                className="input-search"
                                type="text"
                                placeholder="Search..."
                                onChange={handleFilterTextInputChange}
                                ref={inputEl}
                            />
                            <span className="search-icon" onClick={handleFilterTextInputChange}>{searchIcon}</span>
                        </span>

                        <span className="ms-5">
                            <Button variant="" className="bg-gradient text-white text-2xl" onClick={handleShow}>
                                {addIcon}
                                <span className="ms-1">Add Contact</span>
                            </Button>
                        </span>

                    </div>
                    <Modal show={show} onHide={handleClose} className="add-modal">
                        <Modal.Header>
                            <Modal.Title>Add Contact</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="w-full max-w-sm container mt-20 mx-auto">
                                <form onSubmit={onSubmit}>
                                    <div className="w-full mb-3">
                                        <label
                                            className="block text-xs mb-2"
                                            htmlFor="name"
                                        >
                                            Name
                                        </label>
                                        <input
                                            className="form-control shadow border rounded py-2 px-3"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            type="text"
                                            placeholder="Enter name"
                                            required
                                        />
                                    </div>
                                    <div className="w-full mb-3">
                                        <label
                                            className="block text-xs mb-2"
                                            htmlFor="company"
                                        >
                                            Company
                                        </label>
                                        <input
                                            className="form-control shadow border rounded py-2 px-3"
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                            type="text"
                                            placeholder="Enter company"
                                            required
                                        />
                                    </div>
                                    <div className="w-full mb-3">
                                        <label
                                            className="block text-xs mb-2"
                                            htmlFor="phone"
                                        >
                                            Phone
                                        </label>
                                        <input
                                            className="form-control shadow border rounded py-2 px-3"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            type="number"
                                            placeholder="Enter Phone"
                                            size="10"
                                            maxLength="10"
                                            required
                                        />
                                    </div>
                                    <div className="w-full mb-3">
                                        <label
                                            className="block text-xs mb-2"
                                            htmlFor="email"
                                        >
                                            Email
                                        </label>
                                        <input
                                            className="form-control shadow border rounded py-2 px-3"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="email"
                                            placeholder="Enter Email"
                                            required
                                        />
                                    </div>
                                    <div className="w-full mb-3">
                                        <label
                                            className="block text-xs mb-2"
                                            htmlFor="address"
                                        >
                                            Address
                                        </label>
                                        <input
                                            className="form-control shadow border rounded py-2 px-3"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            type="text"
                                            placeholder="Enter Address"
                                            required
                                        />
                                    </div>
                                    <div className="">
                                        <button className="bg-gradient border none text-white font-bold py-2 px-4 rounded">
                                            Add Contact
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
                <ContactsList list={searchTerm < 1 ? contacts : searchResults} />
            </div>
        </React.Fragment>
    );
};