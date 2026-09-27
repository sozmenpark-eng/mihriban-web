import { Link, useParams } from 'react-router-dom'
import { useRecipes } from '../hooks/useRecipes'
import { plateForCategory } from '../lib/plates'

export function RecipeDetail() {
  const { id } = useParams<{ id: string }>()
  const { recipes, loading, error } = useRecipes()
  const recipe = recipes.find((r) => r.id === id)

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center py-24 text-cream-muted">
        Yükleniyor…
      </div>
    )
  }

  if (error || !recipe) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-16 text-center">
        <p className="text-cream-dim">Tarif bulunamadı.</p>
        <Link to="/" className="text-copper-glow underline-offset-2 hover:underline">
          ← Ana sayfaya dön
        </Link>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-cream-muted transition hover:text-copper-glow"
      >
        ← Tüm tarifler
      </Link>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="relative aspect-[2/1] sm:aspect-[21/9]">
          <img
            src={plateForCategory(recipe.category)}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        </div>

        <div className="space-y-6 p-5 sm:p-8">
          <header className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-copper/20 px-3 py-0.5 text-xs font-medium text-copper-glow ring-1 ring-copper/30">
                {recipe.category}
              </span>
              {recipe.halal && (
                <span className="rounded-full bg-halal/20 px-3 py-0.5 text-xs font-medium text-halal ring-1 ring-halal/40">
                  Helal
                </span>
              )}
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-cream sm:text-3xl">
              {recipe.name}
            </h1>
            <p className="text-sm text-cream-dim">
              {recipe.region}
              {recipe.country ? ` · ${recipe.country}` : ''}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-cream-dim">
              <span>⏱ {recipe.timeMin} dakika</span>
              <span>🍽 {recipe.servings} kişilik</span>
              <span>📊 {recipe.difficulty}</span>
            </div>
            {recipe.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {recipe.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-border/60 px-2 py-0.5 text-[11px] text-cream-muted"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </header>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-cream">Malzemeler</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ing, i) => (
                <li
                  key={`${ing.n}-${i}`}
                  className="flex flex-wrap items-baseline gap-x-2 rounded-lg border border-border/60 bg-kitchen/40 px-3 py-2 text-sm"
                >
                  <span className="font-medium text-cream">{ing.n}</span>
                  {(ing.a || ing.u) && (
                    <span className="text-cream-dim">
                      {[ing.a, ing.u].filter(Boolean).join(' ')}
                    </span>
                  )}
                  {ing.alts && ing.alts.length > 0 && (
                    <span className="w-full text-xs text-cream-muted">
                      alternatif: {ing.alts.join(', ')}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            {recipe.measures && (
              <p className="mt-3 text-xs leading-relaxed text-cream-muted">
                Ölçüler: {recipe.measures}
              </p>
            )}
          </section>

          {recipe.tools.length > 0 && (
            <section>
              <h2 className="mb-2 text-lg font-semibold text-cream">Gereçler</h2>
              <p className="text-sm text-cream-dim">{recipe.tools.join(' · ')}</p>
            </section>
          )}

          <section>
            <h2 className="mb-3 text-lg font-semibold text-cream">Yapılışı</h2>
            <ol className="space-y-3">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-copper/25 text-xs font-semibold text-copper-glow">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-cream-dim">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {Object.keys(recipe.methods).length > 0 && (
            <section>
              <h2 className="mb-3 text-lg font-semibold text-cream">Yöntem notları</h2>
              <dl className="space-y-3">
                {Object.entries(recipe.methods).map(([k, v]) => (
                  <div key={k} className="rounded-xl border border-border/60 bg-kitchen/40 p-3">
                    <dt className="mb-1 text-xs font-semibold uppercase tracking-wide text-copper-glow">
                      {k}
                    </dt>
                    <dd className="text-sm leading-relaxed text-cream-dim">{v}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {recipe.tips.length > 0 && (
            <section>
              <h2 className="mb-3 text-lg font-semibold text-cream">İpuçları</h2>
              <ul className="space-y-2">
                {recipe.tips.map((tip, i) => (
                  <li
                    key={i}
                    className="rounded-xl border border-copper/20 bg-copper/10 px-3 py-2 text-sm leading-relaxed text-cream-dim"
                  >
                    💡 {tip}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </article>
  )
}
