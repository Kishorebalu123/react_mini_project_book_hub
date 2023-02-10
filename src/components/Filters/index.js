import './index.css'

const Filters = props => {
  const {shelf, changeShelf, isActive} = props
  const {label, id, value} = shelf

  const activeClassName = isActive ? 'active' : ''

  const onClickValue = () => {
    changeShelf(value)
  }

  return (
    <li onClick={onClickValue} key={id}>
      <p className={activeClassName}>{label}</p>
    </li>
  )
}
export default Filters
