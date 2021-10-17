export default ({ app }, inject) => {
  inject('items', (items) =>
    items && items.edges ? items.edges.map((item) => item.node) : []
  )
  inject(
    'now',
    () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
  )
}
