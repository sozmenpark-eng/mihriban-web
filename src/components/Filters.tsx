interface FiltersProps {
  search: string
  onSearch: (v: string) => void
  category: string
  onCategory: (v: string) => void
  region: string
  onRegion: (v: string) => void
  tag: string
  onTag: (v: string) => void
  categories: string[]
  regions: string[]
  tags: string[]
  resultCount: number
  totalCount: number
}

export function Filters({
  search,
  onSearch,
  category,
  onCategory,
  region,
  onRegion,
  tag,
  onTag,
  categories,
  regions,
  tags,
  resultCount,
  totalCount,
}: FiltersProps) {
  const hasFilter = search || category || region || tag

  return (
    <div className="space-y-4">
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-cream-muted">
          🔍
        </span>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Tarif, malzeme veya etiket ara…"
          className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm text-cream placeholder:text-cream-muted outline-none ring-copper/0 transition focus:border-copper/50 focus:ring-2 focus:ring-copper/30"
          aria-label="Tarif ara"
        />
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3">
        <select
          value={category}
          onChange={(e) => onCategory(e.target.value)}
          className="rounded-xl border border-border bg-card px-3 py-2 text-sm text-cream outline-none focus:border-copper/50"
          aria-label="Kategori"
        >
          <option value="">Tüm kategoriler</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={region}
          onChange={(e) => onRegion(e.target.value)}
          className="max-w-[200px] rounded-xl border border-border bg-card px-3 py-2 text-sm text-cream outline-none focus:border-copper/50"
          aria-label="Bölge"
        >
          <option value="">Tüm bölgeler</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <select
          value={tag}
          onChange={(e) => onTag(e.target.value)}
          className="max-w-[180px] rounded-xl border border-border bg-card px-3 py-2 text-sm text-cream outline-none focus:border-copper/50"
          aria-label="Etiket"
        >
          <option value="">Tüm etiketler</option>
          {tags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        {hasFilter && (
          <button
            type="button"
            onClick={() => {
              onSearch('')
              onCategory('')
              onRegion('')
              onTag('')
            }}
            className="rounded-xl border border-border px-3 py-2 text-sm text-cream-dim transition hover:border-copper/40 hover:text-cream"
          >
            Temizle
          </button>
        )}
      </div>

      <p className="text-xs text-cream-muted">
        {resultCount} / {totalCount} tarif
      </p>
    </div>
  )
}
