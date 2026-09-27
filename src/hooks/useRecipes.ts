import { useEffect, useState } from 'react'
import type { Recipe } from '../types'

const RECIPE_PARTS = [
  '/recipes-0.json',
  '/recipes-1.json',
  '/recipes-2.json',
  '/recipes-3.json',
  '/recipes-4.json',
  '/recipes-5.json',
]

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    Promise.all(
      RECIPE_PARTS.map((url) =>
        fetch(url).then((r) => {
          if (!r.ok) throw new Error('Tarifler yüklenemedi')
          return r.json() as Promise<Recipe[]>
        }),
      ),
    )
      .then((parts) => {
        if (!cancelled) {
          setRecipes(parts.flat())
          setLoading(false)
        }
      })
      .catch((e: Error) => {
        if (!cancelled) {
          setError(e.message)
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { recipes, loading, error }
}
