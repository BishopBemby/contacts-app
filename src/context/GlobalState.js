import React, { createContext, useReducer } from 'react';
import img from "../assets/images/img.png"
import appReducer from './AppReducer';

let initialState = {
    contacts: [
        {
            id: 1,
            name: "John",
            company: "Seimens Ltd.",
            email: "john@abc.com",
            phone: "2227776661",
            address: "23, WestSide, PA",
            image: img
        },
        {
            id: 2,
            name: "Shreya",
            company: "KPMG",
            email: "shreya@abc.com",
            phone: "6555444366",
            address: "333, Boulevard Road , PA",
            image: img
        },
        {
            id: 3,
            name: "Payal",
            company: "TCS Ltd.",
            email: "payal@klm.com",
            phone: "3349776166",
            address: "23, Shastri Nagar, Delhi",
            image: img
        },
        {
            id: 4,
            name: "Sajid",
            company: "Infosys",
            email: "sajid@abc.com",
            phone: "6657776906",
            address: "233, East Village, TX",
            image: img
        },
        {
            id: 5,
            name: "Paramjit",
            company: "Zuru",
            email: "paramjit@pqr.in",
            phone: "2229996866",
            address: "556, North Atlantic valley, PA",
            image: img
        }
    ]
};

export let GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    function addContact(contact) {
        dispatch({
            type: "ADD_CONTACT",
            payload: contact
        });
    }

    function editContact(contact) {
        dispatch({
            type: "EDIT_CONTACT",
            payload: contact
        });
    }

    return (
        <GlobalContext.Provider
            value={{
                contacts: state.contacts,
                addContact,
                editContact
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};