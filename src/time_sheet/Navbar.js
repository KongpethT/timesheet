import { Link } from "react-router-dom";
import {
    IoLogIn, IoLogOut, IoLibrary, IoKey, IoBarChart, IoRibbon, IoDuplicate
} from "react-icons/io5";
import { FcAssistant, FcBullish, FcPlanner, FcBusinessman, FcServices } from "react-icons/fc";
import { memory } from "./configure/env"

export default function Navbar() {
    let account = ''
    let userState = ''
    if (memory.get_full_name !== null) { account = JSON.parse(memory.get_full_name).value }
    if (memory.get_state_code !== null) { userState = JSON.parse(memory.get_state_code).value }
    const signout = () => {
        localStorage.clear()
        window.location.href = "/"
    }

    return (
        <nav className="navbar navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/#">Wellcome {account}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Wellcome</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-start flex-grow-1 pe-3">
                            {(!memory.get_token) ?
                                <li className="nav-item fs-5">
                                    <Link to="/" className="nav-link"><IoLogIn /> Sign In</Link>
                                </li>
                                :
                                <div>
                                    <li className="nav-item">
                                        <Link to="/#" className="nav-link" onClick={signout}>Sign Out <IoLogOut className="fs-6 text-primary" /></Link>
                                        <Link to="/person/changePassword" className="nav-link">Change password <IoKey className="fs-6 text-danger" /></Link>
                                    </li>
                                </div>
                            }
                            {(!memory.get_token) ? null :
                                <li className="nav-item dropdown fs-5">
                                    <Link className="nav-link dropdown-toggle" to="/#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown-menu
                                    </Link>
                                    <ul className="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
                                        {/**timeline */}
                                        {(userState === 'analyze') ? null :
                                            <div>
                                                <li>
                                                    <FcPlanner className="fs-6" /> Timelines
                                                </li>
                                                <li><Link to="/timeline/new" className="dropdown-item"><IoDuplicate className="fs-6 text-success" /> Create</Link></li>
                                                <li><Link to="/timeline/view" className="dropdown-item"><IoLibrary className="fs-6 text-info" /> View</Link></li>
                                            </div>
                                        }
                                        {/**sales activity */}
                                        {(userState === 'analyze') ? null :
                                            <div>
                                                <li>
                                                    <hr className="dropdown-divider" />
                                                    <FcBullish className="fs-6" /> sales activity
                                                </li>
                                                <li><Link to="/sales/new" className="dropdown-item"><IoDuplicate className="fs-6 text-success" /> Open sales</Link></li>
                                                <li><Link to="/sales/view" className="dropdown-item"><IoRibbon className="fs-6 text-info" /> View sales activity</Link></li>
                                            </div>
                                        }
                                        {/**sales activity (admin)*/}
                                        {(userState === 'user') ? null :
                                            <div>
                                                <li>
                                                    <hr className="dropdown-divider" />
                                                    <FcBullish className="fs-6" /> sales activity (Admin)
                                                </li>
                                                <li><Link to="/sales/admin/view" className="dropdown-item"><IoRibbon className="fs-6 text-info" /> View sales activity (Admin)</Link></li>
                                            </div>
                                        }
                                        {/**Customer */}
                                        {(userState === 'analyze') ? null :
                                            <div>
                                                <li>
                                                    <hr className="dropdown-divider" />
                                                    <FcAssistant className="fs-6" /> Customers
                                                </li>
                                                <li><Link to="/customer/newAgency" className="dropdown-item"><IoDuplicate className="fs-6 text-success" /> Create-Agency</Link></li>
                                                <li><Link to="/customer/newClient" className="dropdown-item"><IoDuplicate className="fs-6 text-success" /> Create-Client</Link></li>
                                                <li><Link to="/customer/view" className="dropdown-item"><IoLibrary className="fs-6 text-info" /> View</Link></li>
                                            </div>
                                        }
                                        {/**person */}
                                        {(userState === 'user' | userState === 'analyze') ? null :
                                            <div>
                                                <li>
                                                    <hr className="dropdown-divider" />
                                                    <FcBusinessman className="fs-6" /> persons
                                                </li>

                                                <li><Link to="/person/new" className="dropdown-item"><IoDuplicate className="fs-6 text-success" /> Create</Link></li>
                                                <li><Link to="/person/view" className="dropdown-item"><IoLibrary className="fs-6 text-info" /> View</Link></li>
                                                {/*<li><Link to="/person/changePassword" className="dropdown-item"><IoKey className="fs-6 text-warning" /> Change password</Link></li>*/}
                                            </div>
                                        }
                                        <li>
                                            <hr className="dropdown-divider" />
                                            <FcServices className="fs-6" /> Tools
                                        </li>
                                        <li><Link to="/tools/dashboard" className="dropdown-item"><IoBarChart className="fs-6 text-success" /> Dashboard</Link></li>
                                    </ul>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </nav >
    )
}