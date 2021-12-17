import './navbar.css'

export default function Navbar(props) {
    const { clickDashboard, clickCreateTimeline } = props

    const isSwitch = (go) => {

        switch (go) {
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

        <div className="container">
            <div className='header'>
                <div>
                    <h4>Wellcome {localStorage.getItem('accessFullName')}</h4>
                </div>
                <div className='nav-bar'>
                    <ul>
                        <li onClick={clickDashboard}>Dashboard</li>
                        <li onClick={() => { isSwitch('profile') }}><span>|</span> Timeline</li>
                        <li onClick={clickCreateTimeline}><span>|</span> New</li>
                        <li onClick={() => { isSwitch('logout') }}><span>|</span> Logout</li>
                    </ul>
                </div>
            </div>
        </div >
    )
}