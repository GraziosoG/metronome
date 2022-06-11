import './Button.css';
import PropTypes from 'prop-types'

const Button = ({ className, display, onClick }) => {
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {display}
    </button>
  )
}

Button.defaultProps = {
    className: 'blackButton'
}

Button.propTypes = {
    className: PropTypes.string,
    display: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button