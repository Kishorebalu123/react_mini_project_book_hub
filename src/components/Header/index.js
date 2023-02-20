import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

class Header extends Component {
  state = {showHamburgerMenu: false}

  onCloseBtn = () => {
    this.setState({showHamburgerMenu: false})
  }

  hamburgerMenu = () => {
    this.setState({showHamburgerMenu: true})
  }

  onClickBtn = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {showHamburgerMenu} = this.state

    return (
      <nav>
        <div className="mobile-nav-container">
          <div className="nav-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/df5saokjj/image/upload/v1675824167/Book%20hub/Group_7732_erur1z.png"
                alt="website logo"
                className="home-website-logo1"
              />
            </Link>

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
                  onClick={this.onClickBtn}
                >
                  Logout
                </button>
              </li>
            </ul>

            <button
              onClick={this.hamburgerMenu}
              className="hamburger"
              type="button"
            >
              <img
                src="https://res.cloudinary.com/df5saokjj/image/upload/v1676103890/Book%20hub/Book%20hub%20medium%20and%20large/icon_tpnqv4.png"
                alt=""
              />
            </button>
          </div>
        </div>

        {showHamburgerMenu && (
          <div className="hamburger-menu">
            <ul className="nav-items">
              <Link to="/" className="nav-link">
                <li className="nav-item">Home</li>
              </Link>
              <Link to="/shelf" className="nav-link">
                <li className="nav-item">Bookshelves</li>
              </Link>

              <li className="nav-item">
                <button
                  className="logout-button"
                  type="button"
                  onClick={this.onClickBtn}
                >
                  Logout
                </button>
              </li>
              <li>
                <AiFillCloseCircle
                  onClick={this.onCloseBtn}
                  className="close-button"
                />
              </li>
            </ul>
          </div>
        )}
      </nav>
    )
  }
}
export default withRouter(Header)
