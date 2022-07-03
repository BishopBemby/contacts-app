import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faHouse, faUser, faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { Route, Routes } from 'react-router-dom';
import { ContactsPanel } from './components/ContactsPanel';
import { GlobalProvider } from "./../context/GlobalState";
import "./Container.scss"

function Container() {
    const bars = <FontAwesomeIcon icon={faBars} />
    const home = <FontAwesomeIcon icon={faHouse} />
    const user = <FontAwesomeIcon icon={faUser} />
    const contact = <FontAwesomeIcon icon={faAddressBook} />
    return <>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-auto bg-gradient sticky-top">
                    <div class="d-flex flex-sm-column flex-row ms-2 flex-nowrap align-items-center sticky-top">
                        <a href="#" class="nav-link py-3 px-2 icon-color" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
                            {bars}
                        </a>
                        <ul class="nav nav-pills flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
                            <li class="nav-item">
                                <a href="#" class="nav-link py-3 px-2 icon-color" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
                                    {home}
                                </a>
                            </li>
                            <li className='nav-item contact-border active'>
                                <a href="#" class="contact nav-link py-3 px-2 icon-color" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">
                                    {contact}
                                </a>
                            </li>
                            <li>
                                <a href="#" class="nav-link py-3 px-2 icon-color" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Orders">
                                    {user}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-sm p-3 min-vh-100">
                    <GlobalProvider>
                        <Routes>
                            <Route path="/" element={<ContactsPanel />} />
                        </Routes>
                    </GlobalProvider>
                </div>
            </div>
        </div></>
}

export default Container;