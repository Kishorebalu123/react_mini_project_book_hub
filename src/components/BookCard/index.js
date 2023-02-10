import {Link} from 'react-router-dom'

import './index.css'

const BookCard = props => {
  const {bookCard} = props
  const {id, title, readStatus, rating, authorName, coverPic} = bookCard
  return (
    <Link to={`/books/${id}`}>
      <li>
        <div>
          <img src={coverPic} alt="" />
          <div>
            <h1>{title}</h1>
            <p>{authorName}</p>
            <div>
              <p>Avg Rating</p>

              <p>{rating}</p>
            </div>
            <p>
              <span>Status: </span>
              {readStatus}
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default BookCard
