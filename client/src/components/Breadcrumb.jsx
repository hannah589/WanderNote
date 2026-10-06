
function Breadcrumb({children}) {
  return (
    <ul class="breadcrumb">
      <li><a href="#">Home</a></li>
      <li><a href="#">{children}</a></li>
    </ul>
  )
}

export default Breadcrumb
