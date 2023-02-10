import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'

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
    console.log(id)
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
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
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
        <div>
          <img src={coverPic} alt="" />
          <div>
            <h1>{title}</h1>
            <p>{authorName}</p>
            <p>
              <span>Avg Rating</span>
              {rating}
            </p>
            <p>Status: {readStatus}</p>
          </div>
        </div>
        <div>
          <h1>About Author</h1>
          <p>{aboutAuthor}</p>
          <h1>About Book</h1>
          <p>{aboutBook}</p>
        </div>
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
        <div>{this.renderBookDetailsSection()}</div>
      </>
    )
  }
}
export default BookDetails
