import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
// import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

const Header = props => {
  const {history} = props

  const onClickBtn = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <div className="mobile-nav-container">
        <nav className="nav-container">
          <div>
            <img
              src="https://res.cloudinary.com/df5saokjj/image/upload/v1675824167/Book%20hub/Group_7732_erur1z.png"
              alt=""
              className="home-website-logo"
            />
          </div>

          <ul className="md-nav-items">
            <Link to="/" className="nav-link">
              <li className="nav-item">Home</li>
            </Link>
            <Link to="/shelf" className="nav-link">
              <li className="nav-item">Bookshelves</li>
            </Link>

            <li>
              <button
                className="logout-button"
                type="button"
                onClick={onClickBtn}
              >
                Logout
              </button>
            </li>
          </ul>

          <button className="hamburger" type="button">
            <img
              src="https://res.cloudinary.com/df5saokjj/image/upload/v1676103890/Book%20hub/Book%20hub%20medium%20and%20large/icon_tpnqv4.png"
              alt=""
            />
          </button>
        </nav>
      </div>

      {/*
        <div className="hamburger-menu">
          <ul className="nav-items">
            <Link to="/" className="nav-link">
              <li className="nav-item">Home</li>
            </Link>
            <Link to="/shelf" className="nav-link">
              <li className="nav-item">Bookshelves</li>
            </Link>

            <li>
              <button
                className="logout-button"
                type="button"
                onClick={onClickBtn}
              >
                Logout
              </button>
            </li>
            <li>
              <AiFillCloseCircle className="close-button" />
            </li>
          </ul>
        </div>
      */}
    </>
  )
}
export default Header
