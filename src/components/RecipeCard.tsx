import { Link } from 'react-router-dom'
import type { Recipe } from '../types'
import { plateForCategory } from '../lib/plates'

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      to={`/tarif/${recipe.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:border-copper/40 hover:bg-card-hover hover:shadow-[0_8px_30px_rgba(196,120,74,0.12)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={plateForCategory(recipe.category)}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-kitchen/90 via-kitchen/20 to-transparent" />
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-kitchen/80 px-2.5 py-0.5 text-[11px] font-medium text-cream ring-1 ring-border backdrop-blur">
            {recipe.category}
          </span>
          {recipe.halal && (
            <span className="rounded-full bg-halal/90 px-2.5 py-0.5 text-[11px] font-medium text-white">
              Helal
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="text-[15px] font-semibold leading-snug text-cream group-hover:text-copper-glow">
          {recipe.name}
        </h2>
        <p className="text-xs text-cream-muted">{recipe.region}</p>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-1 text-xs text-cream-dim">
          <span>⏱ {recipe.timeMin} dk</span>
          <span>🍽 {recipe.servings} kişilik</span>
          <span>{recipe.difficulty}</span>
        </div>
      </div>
    </Link>
  )
}
