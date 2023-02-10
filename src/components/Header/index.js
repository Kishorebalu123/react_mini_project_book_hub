import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props

  const onClickBtn = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav>
      <div>
        <img
          src="https://res.cloudinary.com/df5saokjj/image/upload/v1675824167/Book%20hub/Group_7732_erur1z.png"
          alt=""
        />
      </div>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/shelf">
          <li>Bookshelves</li>
        </Link>

        <li>
          <button type="button" onClick={onClickBtn}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
