export interface Ingredient {
  n: string
  a: string
  u: string
  alts?: string[]
}

export interface Recipe {
  id: string
  name: string
  region: string
  country: string
  category: string
  timeMin: number
  servings: number
  difficulty: string
  tags: string[]
  ingredients: Ingredient[]
  tools: string[]
  methods: Record<string, string>
  steps: string[]
  tips: string[]
  halal: boolean
  measures?: string
  videoQuery?: string
}
