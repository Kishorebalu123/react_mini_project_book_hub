import './index.css'

const Filters = props => {
  const {shelf, changeShelf, isActive} = props
  const {label, id, value} = shelf

  const activeClassName = isActive ? 'active' : 'non-active'

  const onClickValue = () => {
    changeShelf(value)
  }

  return (
    <li className="list-item" onClick={onClickValue} key={id}>
      <p className={`${activeClassName} shelf-name`}>{label}</p>
    </li>
  )
}
export default Filters
