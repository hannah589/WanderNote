import { useSelector, useDispatch } from "react-redux"

function Favourites() {
  const notes = useSelector(state => state.notes)

  const rendersNotes = notes.map(n => (
    <article key={n.id}>

    </article>
  ))

  return (
    <>
      <h2>My Favourites</h2>
      <p>A personal archive of valleys, islands, and architectural retreats to inspire your future journeys.
      </p>
    </>
  )
}

export default Favourites
