/** Map recipe category to recovered plate image path under /plates. */
const CATEGORY_PLATE: Record<string, string> = {
  Çorba: 'soup',
  Börek: 'borek',
  Hamur: 'borek',
  Kahvaltı: 'eggs',
  Kebap: 'kebab',
  Et: 'kebab',
  Köfte: 'kofte',
  Sebze: 'eggplant',
  Dolma: 'eggplant',
  Zeytinyağlı: 'eggplant',
  Güveç: 'eggplant',
  Pilav: 'rice',
  Baklagil: 'rice',
  Tatlı: 'baklava',
  Tören: 'baklava',
  Balık: 'eggs',
  Meze: 'eggplant',
  Salata: 'eggplant',
  Makarna: 'borek',
  Sandviç: 'eggs',
  Sokak: 'kebab',
  Osmanlı: 'kebab',
  Dünya: 'rice',
  'Ana yemek': 'kebab',
}

export function plateForCategory(category: string): string {
  const key = CATEGORY_PLATE[category] ?? 'kebab'
  return `/plates/${key}.svg`
}
