export default function appReducer(state, action) {

    switch (action.type) {
        case "ADD_CONTACT":
            return {
                ...state,
                contacts: [...state.contacts, action.payload],
            };

        case "EDIT_CONTACT":
            const updatedContact = action.payload;

            const updatedContacts = state.contacts.map((contact) => {
                if (contact.id === updatedContact.id) {
                    return updatedContact;
                }
                return contact;
            });

            return {
                ...state,
                contacts: updatedContacts,
            };

        default:
            return state;
    }
};