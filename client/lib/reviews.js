import { supabase } from './supabase'

export async function getReviews(productId) {
  return await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: false })
}

export async function addReview(productId, rating, comment) {
  return await supabase.from('reviews').insert({
    product_id: productId,
    rating,
    comment
  })
}
