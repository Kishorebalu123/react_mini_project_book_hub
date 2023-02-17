import './index.css'

const Filters = props => {
  const {shelf, changeShelf, isActive} = props
  const {label, id, value} = shelf

  const activeClassName = isActive ? 'active' : 'non-active'

  const onClickValue = () => {
    changeShelf(value, label)
  }

  return (
    <li className="list-item" onClick={onClickValue} key={id}>
      <button type="button" className={`${activeClassName} shelf-name`}>
        {label}
      </button>
    </li>
  )
}
export default Filters
