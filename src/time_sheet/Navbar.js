import { Link } from "react-router-dom";
import {
    IoLogIn, IoLogOut, IoMenu, IoCreate, IoFolderOpen, IoKey, IoBarChart, IoRibbon, IoAddCircle
} from "react-icons/io5";
import { FcAssistant, FcBullish, FcPlanner, FcBusinessman, FcServices } from "react-icons/fc";
import { memory } from "./configure/env"

export default function Navbar() {
    const signout = () => {
        localStorage.clear()
        window.location.href = "/"
    }

    return (
        <nav className="navbar navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/#">Wellcome {localStorage.getItem('accessFullName')}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Wellcome</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            {(!memory.get_token) ?
                                <li className="nav-item fs-5">
                                    <Link to="/" className="nav-link"><IoLogIn /> Sign In</Link>
                                </li>
                                :
                                <li className="nav-item fs-5">
                                    <Link to="/#" className="nav-link" onClick={signout}>Sign Out <IoLogOut /></Link>*/
                                </li>
                            }
                            {(!memory.get_token) ? null :
                                <li className="nav-item dropdown fs-5">
                                    <Link className="nav-link dropdown-toggle" to="/#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <IoMenu className="fs-2" /> Dropdown menu
                                    </Link>
                                    <ul className="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
                                        <li>
                                            <FcPlanner className="fs-2" /> Timelines
                                        </li>
                                        <li><Link to="/timeline/new" className="dropdown-item"><IoCreate className="fs-4 text-info" /> Create</Link></li>
                                        <li><Link to="/timeline/view" className="dropdown-item"><IoFolderOpen className="fs-4 text-info" /> View</Link></li>

                                        <li>
                                            <hr className="dropdown-divider" />
                                            <FcBullish className="fs-2" /> sales activity
                                        </li>
                                        <li><Link to="/sales/new" className="dropdown-item"><IoAddCircle className="fs-4 text-info" /> Open sales</Link></li>
                                        <li><Link to="/sales/view" className="dropdown-item"><IoRibbon className="fs-4 text-info" /> View sales activity</Link></li>

                                        <li>
                                            <hr className="dropdown-divider" />
                                            <FcAssistant className="fs-2" /> Customers
                                        </li>
                                        <li><Link to="/customer/new" className="dropdown-item"><IoCreate className="fs-4 text-info" /> Create</Link></li>
                                        <li><Link to="/customer/view" className="dropdown-item"><IoFolderOpen className="fs-4 text-info" /> View</Link></li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                            <FcBusinessman className="fs-2" /> persons
                                        </li>
                                        <li><Link to="/person/new" className="dropdown-item"><IoCreate className="fs-4 text-info" /> Create</Link></li>
                                        <li><Link to="/person/view" className="dropdown-item"><IoFolderOpen className="fs-4 text-info" /> View</Link></li>
                                        <li><Link to="/person/change_password" className="dropdown-item"><IoKey className="fs-4 text-warning" /> Change password</Link></li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                            <FcServices className="fs-2" /> Tools
                                        </li>
                                        <li><Link to="/tools/dashboard" className="dropdown-item"><IoBarChart className="fs-4 text-success" /> Dashboard</Link></li>
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