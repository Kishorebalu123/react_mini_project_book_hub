import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/df5saokjj/image/upload/v1675825803/Book%20hub/Book%20hub%20medium%20and%20large/Group_7484_1_ofnclf.png"
      alt="not found"
      className="not-found-img"
    />
    <h1>Page Not Found</h1>
    <p>
      we are sorry, the page you requested could not be found. Please go back to
      the homepage.
    </p>

    <Link to="/">
      <button type="button" className="home-page-btn">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
