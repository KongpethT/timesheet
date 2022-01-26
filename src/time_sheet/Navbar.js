import { Link } from "react-router-dom";
import {
    IoLogIn, IoLogOut, IoLibrary, IoBarChart, IoRibbon, IoDuplicate
} from "react-icons/io5";
import { FcBullish, FcPlanner, FcServices, FcCustomerSupport, FcKey, FcConferenceCall } from "react-icons/fc";
import { memory } from "./configure/env"

export default function Navbar() {
    let account = ''
    let userState = ''
    if (memory.get_full_name !== null) { account = JSON.parse(memory.get_full_name).value }
    if (memory.get_state_code !== null) { userState = JSON.parse(memory.get_state_code).value }
    console.log(process.env.NODE_ENV)
    const signout = () => {
        localStorage.clear()
        window.location.href = "/"
    }

    return (
        <div className="navbar navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/#">Welcome <span className="text-uppercase text-success">{account}</span></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="offcanvas offcanvas-end"
                    tabIndex="-1" id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    style={{ width: '320px', margin: '60px 10px 10px 10px' }}>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-start flex-grow-1 pe-3">
                            {/**login / logout / change password */}
                            {(!memory.get_token) ?
                                <li className="nav-item fs-5">
                                    <Link to="/" className="nav-link"><IoLogIn /> Sign In</Link>
                                </li>
                                :
                                <div>
                                    <li className="nav-item">
                                        <Link to="/#" className="nav-link" onClick={signout}>Sign Out <IoLogOut className="fs-6 text-primary" /></Link>
                                        <Link to="/person/changePassword" className="nav-link">Change password <FcKey className="fs-6 text-danger" /></Link>
                                    </li>
                                    <hr className="dropdown-divider bg-dark" />
                                </div>
                            }
                            {/**dropdown menu */}
                            {(!memory.get_token) ? null :
                                <div className="nav-item fs-5">
                                    <div>
                                        {/**timeline */}
                                        {(userState === 'analyze' | userState === 'user') ? null :
                                            <div>
                                                <li>
                                                    <FcPlanner className="fs-6" /> <label className="text-secondary">Timelines</label>
                                                </li>
                                                <li><Link to="/timeline/new" className="dropdown-item"><IoDuplicate className="fs-6 text-success" /> Create</Link></li>
                                                <li><Link to="/timeline/view" className="dropdown-item"><IoLibrary className="fs-6 text-info" /> View</Link></li>
                                            </div>
                                        }
                                        {/**sales activity */}
                                        {(userState === 'analyze' | userState === 'admin') ? null :
                                            <div>
                                                <li>
                                                    <hr className="dropdown-divider bg-dark" />
                                                    <FcBullish className="fs-6" /> <label className="text-secondary">sales activity</label>
                                                </li>
                                                <li><Link to="/sales/new" className="dropdown-item"><IoDuplicate className="fs-6 text-success" /> Open sales</Link></li>
                                                <li><Link to="/sales/view" className="dropdown-item"><IoRibbon className="fs-6 text-info" /> View sales activity</Link></li>
                                            </div>
                                        }
                                        {/**sales activity (admin)*/}
                                        {(userState === 'user' | userState === 'admin') ? null :
                                            <div>
                                                <li>
                                                <hr className="dropdown-divider bg-dark" />
                                                    <FcBullish className="fs-6" /><label className="text-secondary"> sales activity (Admin)</label>
                                                </li>
                                                <li><Link to="/sales/admin/view" className="dropdown-item"><IoRibbon className="fs-6 text-info" /> View sales activity (Admin)</Link></li>
                                            </div>
                                        }
                                        {/**Customer */}
                                        {(userState === 'analyze' | userState === 'admin') ? null :
                                            <div>
                                                <li>
                                                <hr className="dropdown-divider bg-dark" />
                                                    <FcCustomerSupport className="fs-6" /><label className="text-secondary"> Customers</label>
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
                                                <hr className="dropdown-divider bg-dark" />
                                                    <FcConferenceCall className="fs-5" /><label className="text-secondary"> Persons</label>
                                                </li>

                                                <li><Link to="/person/new" className="dropdown-item"><IoDuplicate className="fs-6 text-success" /> Create</Link></li>
                                                <li><Link to="/person/view" className="dropdown-item"><IoLibrary className="fs-6 text-info" /> View</Link></li>
                                                {/*<li><Link to="/person/changePassword" className="dropdown-item"><IoKey className="fs-6 text-warning" /> Change password</Link></li>*/}
                                            </div>
                                        }
                                        {(userState === 'user' | userState === 'admin' | userState === 'analyze') ? null :
                                            <div>
                                                <li>
                                                <hr className="dropdown-divider bg-dark" />
                                                    <FcServices className="fs-6" /><label className="text-secondary"> Tools</label>
                                                </li>
                                                <li><Link to="/tools/dashboard" className="dropdown-item"><IoBarChart className="fs-6 text-success" /> Dashboard</Link></li>
                                            </div>
                                        }
                                    </div>
                                </div>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    )
}