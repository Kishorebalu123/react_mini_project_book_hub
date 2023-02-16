import Slider from 'react-slick'
import {Link} from 'react-router-dom'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}
const ReactSlick = props => {
  const {booksData} = props

  return (
    <div className="main-container">
      <div className="slick-container">
        <Slider {...settings}>
          {booksData.map(eachBook => {
            const {id, coverPic, title, authorName} = eachBook
            return (
              <Link className="book-link" to={`/books/${id}`}>
                <div className="slick-item" key={id}>
                  <img className="book-image" src={coverPic} alt="" />
                  <h1 className="title">{title}</h1>
                  <p className="author-name">{authorName}</p>
                </div>
              </Link>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}

export default ReactSlick
