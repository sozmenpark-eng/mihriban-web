import { useMemo, useState } from 'react'
import { Filters } from '../components/Filters'
import { RecipeCard } from '../components/RecipeCard'
import { useRecipes } from '../hooks/useRecipes'

export function Home() {
  const { recipes, loading, error } = useRecipes()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [region, setRegion] = useState('')
  const [tag, setTag] = useState('')

  const categories = useMemo(
    () => [...new Set(recipes.map((r) => r.category))].sort((a, b) => a.localeCompare(b, 'tr')),
    [recipes],
  )
  const regions = useMemo(
    () => [...new Set(recipes.map((r) => r.region))].sort((a, b) => a.localeCompare(b, 'tr')),
    [recipes],
  )
  const tags = useMemo(
    () =>
      [...new Set(recipes.flatMap((r) => r.tags))]
        .sort((a, b) => a.localeCompare(b, 'tr'))
        .slice(0, 80),
    [recipes],
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLocaleLowerCase('tr')
    return recipes.filter((r) => {
      if (category && r.category !== category) return false
      if (region && r.region !== region) return false
      if (tag && !r.tags.includes(tag)) return false
      if (!q) return true
      const hay = [
        r.name,
        r.region,
        r.category,
        r.country,
        ...r.tags,
        ...r.ingredients.map((i) => i.n),
      ]
        .join(' ')
        .toLocaleLowerCase('tr')
      return hay.includes(q)
    })
  }, [recipes, search, category, region, tag])

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center py-24 text-cream-muted">
        Tarifler yükleniyor…
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center py-24 text-red-300">
        {error}
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-cream sm:text-3xl">
          Kilerdeki lezzetler
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-cream-dim">
          Anadolu&apos;dan sofraya {recipes.length} geleneksel tarif. Kategori, bölge
          veya malzemeyle ara; Mihriban&apos;ın mutfağından seç.
        </p>
      </section>

      <Filters
        search={search}
        onSearch={setSearch}
        category={category}
        onCategory={setCategory}
        region={region}
        onRegion={setRegion}
        tag={tag}
        onTag={setTag}
        categories={categories}
        regions={regions}
        tags={tags}
        resultCount={filtered.length}
        totalCount={recipes.length}
      />

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-border bg-card px-6 py-12 text-center text-cream-muted">
          Bu kriterlere uygun tarif bulunamadı.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      )}
    </div>
  )
}
