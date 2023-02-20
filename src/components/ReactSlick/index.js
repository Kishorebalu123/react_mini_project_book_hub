import {Link} from 'react-router-dom'

import './index.css'

const ReactSlick = props => {
  const {bookData} = props
  const {id, coverPic, title, authorName} = bookData

  return (
    <Link className="book-link" to={`/books/${id}`}>
      <li>
        <div className="slick-item">
          <img className="book-image" src={coverPic} alt={title} />
          <h1 className="title">{title}</h1>
          <p className="author-name">{authorName}</p>
        </div>
      </li>
    </Link>
  )
}

export default ReactSlick
