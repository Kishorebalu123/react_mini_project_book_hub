import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import ReactSlick from '../ReactSlick'

import './index.css'

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
      console.log(response.status)

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
    <div>
      <img
        src="https://res.cloudinary.com/df5saokjj/image/upload/v1675824260/Book%20hub/Group_7522_m7pvoa.png"
        alt=""
      />
      <p>Something went wrong, please try again.</p>

      <button type="button" onClick={this.getTopRatedApi}>
        Try Again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderTopRatedBooksView = () => {
    const {booksData} = this.state

    return (
      <div>
        <ReactSlick booksData={booksData} />
      </div>
    )
  }

  renderBooksSection = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTopRatedBooksView()
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
        <div>
          <div>
            <h1>Find Your Next Favorite Books?</h1>
            <p>
              You are in the right place. Tell us what titles or geners you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
          </div>
          <div>
            <h1>Top Rated Books</h1>
            <Link to="/shelf">
              <button type="button">Find Books</button>
            </Link>
          </div>
          <div>{this.renderBooksSection()}</div>
        </div>
      </>
    )
  }
}
export default Home
