import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {bookData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getAllBooksApi()
  }

  getAllBooksApi = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')

    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    //   console.log(id)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const book = data.book_details
      const updatedData = {
        id: book.id,
        title: book.title,
        readStatus: book.read_status,
        rating: book.rating,
        authorName: book.author_name,
        coverPic: book.cover_pic,
        aboutBook: book.about_book,
        aboutAuthor: book.about_author,
      }
      // console.log(updatedData)

      this.setState({
        bookData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={32} width={32} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/df5saokjj/image/upload/v1675824260/Book%20hub/Group_7522_m7pvoa.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>

      <button className="try-again" type="button" onClick={this.getAllBooksApi}>
        Try Again
      </button>
    </div>
  )

  renderBookDetails = () => {
    const {bookData} = this.state
    const {
      title,
      readStatus,
      rating,
      authorName,
      coverPic,
      aboutAuthor,
      aboutBook,
    } = bookData
    return (
      <div>
        <div className="bg-book-container">
          <img className="cover-img" src={coverPic} alt={title} />
          <div className="details-container">
            <h1 className="title-name">{title}</h1>
            <p>{authorName}</p>
            <p className="rating-card">
              Avg Rating <BsFillStarFill className="star" />
              {rating}
            </p>
            <p>
              Status:
              <span className="status"> {readStatus}</span>
            </p>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="bg-about">
          <h1 className="about">About Author</h1>
          <p className="description">{aboutAuthor}</p>
          <h1 className="about">About Book</h1>
          <p className="description">{aboutBook}</p>
        </div>
        <Footer />
      </div>
    )
  }

  renderBookDetailsSection = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBookDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="book-details-container">
          {this.renderBookDetailsSection()}
        </div>
      </>
    )
  }
}
export default BookDetails
