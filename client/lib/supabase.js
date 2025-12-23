import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://azaihuzkzxrreimlmcll.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6YWlodXprenhycmVpbWxtY2xsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0OTM3OTksImV4cCI6MjA4MjA2OTc5OX0.w7zxMOKHuBrq4YownRrR_1UZNVq97vxAfZgRka_Qa8o'
)
