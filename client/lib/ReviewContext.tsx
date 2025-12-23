import { useEffect, useState } from 'react'
import { getReviews, addReview } from '../lib/reviews'
import { getUser } from '../lib/auth'

export default function Reviews({ productId }) {
  const [reviews, setReviews] = useState([])
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(5)
  const [user, setUser] = useState(null)

  useEffect(() => {
    loadReviews()
    getUser().then(setUser)
  }, [])

  async function loadReviews() {
    const { data } = await getReviews(productId)
    setReviews(data || [])
  }

  async function submitReview() {
    if (!user) {
      alert('Please login to write a review')
      return
    }

    await addReview(productId, rating, comment)
    setComment('')
    loadReviews()
  }

  return (
    <div className="reviews">
      <h3>Customer Reviews</h3>

      {reviews.map(r => (
        <div key={r.id}>
          ⭐ {r.rating}/5
          <p>{r.comment}</p>
        </div>
      ))}

      {user && (
        <div>
          <h4>Write a review</h4>
          <select onChange={e => setRating(e.target.value)}>
            {[5,4,3,2,1].map(n => (
              <option key={n}>{n}</option>
            ))}
          </select>

          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
          />

          <button onClick={submitReview}>Submit</button>
        </div>
      )}
    </div>
  )
}
