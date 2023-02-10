import Slider from 'react-slick'
import {Link} from 'react-router-dom'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 700,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
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
              <Link to={`/books/${id}`}>
                <div className="slick-item" key={id}>
                  <img className="logo-image" src={coverPic} alt="" />
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
