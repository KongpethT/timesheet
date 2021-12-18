import { Link } from "react-router-dom";
import { IoLogIn, IoLogOut, IoCreate, IoFolderOpen } from "react-icons/io5";
import { account } from "./variable/config"

export default function Navbar(props) {


    //const { clickDashboard, clickCreateTimeline } = props
    const isSwitch = (key) => {
        switch (key) {
            case 'profile':
                window.location.href = '/'
                break;

            case 'logout':
                localStorage.removeItem('accessToken')
                localStorage.removeItem('accessCode')
                localStorage.removeItem('accessFullName')
                window.location.href = "/"
                break;

            default:
                break;
        }

    }

    return (
        <nav className="navbar navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Wellcome {localStorage.getItem('accessFullName')}</a>
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
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            {(!account.token) ?
                                <li className="nav-item fs-5">
                                    <Link to="/signin" className="nav-link"><IoLogIn /> Sign In</Link>
                                </li>
                                :
                                <li className="nav-item fs-5">
                                    <Link className="nav-link" onClick={() => { isSwitch('logout') }}>Sign Out <IoLogOut /></Link>
                                </li>
                            }
                            {(!account.token) ? null :
                                <li className="nav-item dropdown fs-5">
                                    <a className="nav-link dropdown-toggle" href="#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown menu
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
                                        <li><Link to="/timeline/new" className="dropdown-item"><IoCreate /> Create</Link></li>
                                        <li><Link to="/timeline/view" className="dropdown-item"><IoFolderOpen /> View</Link></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>
                            }
                        </ul>
                        {/*
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        */}
                    </div>
                </div>
            </div>
            {/*
            <div classNameName='header'>
                <div>
                    <h4>Wellcome {localStorage.getItem('accessFullName')}</h4>
                </div>
                <div classNameName='nav-bar'>
                    <ul>
                        <li onClick={clickDashboard}>Dashboard</li>
                        <li onClick={() => { isSwitch('profile') }}><span>|</span> Timeline</li>
                        <li onClick={clickCreateTimeline}><span>|</span> New</li>
                        <li onClick={() => { isSwitch('logout') }}><span>|</span> Logout</li>
                    </ul>
                </div>
            </div>
            */}
        </nav >
    )
}