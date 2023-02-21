import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

import Header from '../Header'
import ReactSlick from '../ReactSlick'
import Footer from '../Footer'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
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
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {booksData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTopRatedBooksApi()
  }

  getTopRatedBooksApi = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.books.map(eachBook => ({
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        id: eachBook.id,
        title: eachBook.title,
      }))
      //    console.log(response.status)

      this.setState({
        booksData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getTopRatedApi = () => {
    this.getTopRatedBooksApi()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/df5saokjj/image/upload/v1675824260/Book%20hub/Group_7522_m7pvoa.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>

      <button className="try-again" type="button" onClick={this.getTopRatedApi}>
        Try Again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={32} width={32} />
    </div>
  )

  renderHomeContainer = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderSuccessView = () => {
    const {booksData} = this.state
    return (
      <div className="home-success-card">
        <div className="top-container">
          <h1 className="main-heading1">Find Your Next Favorite Books?</h1>
          <p className="paragraph">
            You are in the right place. Tell us what titles or geners you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <div className="find-books">
            <Link to="/shelf">
              <button className="find-books-btn" type="button">
                Find Books
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-top-rated-books">
          <div className="top-mini-card">
            <h1 className="books-heading">Top Rated Books</h1>
            <div className="md-find-books">
              <Link to="/shelf">
                <button className="find-books-btn" type="button">
                  Find Books
                </button>
              </Link>
            </div>
          </div>
          <ul className="top-rated-list-items">
            <div className="main-container">
              <div className="slick-container">
                <Slider {...settings}>
                  {booksData.map(eachBook => (
                    <ReactSlick bookData={eachBook} key={eachBook.id} />
                  ))}
                </Slider>
              </div>
            </div>
          </ul>
        </div>

        <div className="footer">
          <Footer />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="main-home-container">
        <Header />
        <div className="home-container1">{this.renderHomeContainer()}</div>
      </div>
    )
  }
}
export default Home
