import { supabase } from './supabase'

export async function getInventory() {
  return await supabase.from('inventory').select('*')
}
