import {Component} from 'react'
// import {  } from "react-router-dom ";
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import Filters from '../Filters'
import BookCard from '../BookCard'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Bookshelves extends Component {
  state = {
    activeShelf: bookshelvesList[0].value,
    booksData: '',
    searchText: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getAllBooksApi()
  }

  getAllBooksApi = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {activeShelf, searchText} = this.state
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${activeShelf}&search=${searchText}`
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
        id: eachBook.id,
        title: eachBook.title,
        readStatus: eachBook.read_status,
        rating: eachBook.rating,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
      }))
      //  console.log(updatedData)

      this.setState({
        booksData: updatedData,
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

  onChangeSearchInput = event => {
    this.setState({searchText: event.target.value})
  }

  filterBooks = () => {
    const {booksData, searchText} = this.state
    const filteredBooks = booksData.filter(each =>
      each.title.toUpperCase().includes(searchText.toUpperCase()),
    )

    this.setState({booksData: filteredBooks}, this.getAllBooksApi)
  }

  renderBooks = () => {
    const {booksData} = this.state

    return (
      <div>
        <ul className="book-items">
          {booksData.map(eachBook => (
            <BookCard bookCard={eachBook} key={eachBook.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderBooksSection = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBooks()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onClickShelf = event => {
    this.setState({activeShelf: event.target.value})
  }

  renderBookShelvesSection = () => {
    const {activeShelf, searchText} = this.state
    return (
      <div>
        <div className="input-card">
          <input
            className="input"
            type="search"
            placeholder="Search"
            value={searchText}
            onChange={this.onChangeSearchInput}
          />
          <button
            className="search-button"
            onClick={this.filterBooks}
            type="button"
          >
            <BsSearch />
          </button>
        </div>

        <div>
          <h1 className="bookshelves-heading">Bookshelves</h1>
          <ul className="book-shelf-list">
            {bookshelvesList.map(each => (
              <Filters
                key={each.id}
                shelf={each}
                isActive={each.value === activeShelf}
                changeShelf={this.changeShelf}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  changeShelf = activeShelf => {
    this.setState({activeShelf}, this.getAllBooksApi)
  }

  render() {
    return (
      <div>
        <Header />
        <div className="bookshelves-bg-section">
          <div className="bookshelves-list">
            {this.renderBookShelvesSection()}
          </div>
          <div className="books-section">{this.renderBooksSection()}</div>
        </div>
      </div>
    )
  }
}
export default Bookshelves
