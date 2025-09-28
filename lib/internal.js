function prop(props) {
  if (props.props) {
    var p = props.props
    delete props.props
    props = Object.assign({}, p, props)
  }
  return props
}

module.exports = { prop }
