import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const BookCard = props => {
  const {bookCard} = props
  const {id, title, readStatus, rating, authorName, coverPic} = bookCard
  return (
    <Link className="book-link" to={`/books/${id}`}>
      <li className="list-item1">
        <div className="each-book">
          <img className="cover-pic" src={coverPic} alt="" />
          <div className="book-details">
            <h1 className="book-title">{title}</h1>
            <p className="author">{authorName}</p>
            <p className="rating">
              Avg Rating <BsFillStarFill className="star" />
              {rating}
            </p>
            <p className="read-status">Status: {readStatus}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default BookCard
