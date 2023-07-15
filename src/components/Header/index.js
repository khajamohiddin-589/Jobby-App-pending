import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const OnClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <div className="header-mobile-view">
        <ul className="header-menu-list-mobile">
          <li className="nav-menu-item-mobile">
            <Link to="/">
              <img
                className="logo-mobile-view-header"
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
              />{' '}
            </Link>
          </li>

          <ul className="icons-container-mobile">
            <li className="nav-menu-item-mobile">
              <Link to="/" className="nav-link">
                <AiFillHome className="nav-icon" />
              </Link>
            </li>

            <li className="nav-menu-item-mobile">
              <Link to="/jobs" className="nav-link">
                {' '}
                <BsFillBriefcaseFill className="nav-icon" />
              </Link>
            </li>
            <li onClick={OnClickLogout} className="nav-menu-item-mobile">
              <FiLogOut className="nav-icon" />
            </li>
          </ul>
        </ul>
      </div>
      <div className="header-desktop-view">
        <ul className="header-menu-list-desktop">
          <li className="nav-menu-item-desktop">
            <Link to="/" className="nav-link">
              <img
                className="logo-desktop-view-header"
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
              />{' '}
            </Link>
          </li>
          <ul className="home-jobs-container">
            <Link to="/" className="nav-link">
              <li className="home-job-text">Home</li>
            </Link>
            <Link to="/jobs" className="nav-link">
              <li className="home-job-text">Jobs</li>
            </Link>
          </ul>
          <li className="nav-menu-item-desktop">
            <button
              onClick={OnClickLogout}
              className="log-out-button-header"
              type="button"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
