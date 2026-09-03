export const defaultFilters = { state:'', city:'', category:'', bestTime:'', popularity:'all', sort:'popular' }

export function filterAndSortDestinations(list, q, filters) {
  const query = (q || '').trim().toLowerCase()
  const filtered = list.filter(d => {
    const text = `${d.name} ${d.city} ${d.state} ${d.category} ${d.description || ''} ${d.historicalSignificance || ''} ${d.bestTimeToVisit || ''} ${d.bestSeason || ''} ${d.location || ''}`.toLowerCase()
    const best = d.bestSeason || 'Year-round'
    return (!query || text.includes(query)) &&
      (!filters.state || d.state === filters.state) &&
      (!filters.city || d.city.toLowerCase().includes(filters.city.toLowerCase())) &&
      (!filters.category || d.category === filters.category) &&
      (!filters.bestTime || best === filters.bestTime) &&
      (filters.popularity === 'all' || Number(d.popularity || 0) >= Number(filters.popularity))
  })
  return [...filtered].sort((a,b) => {
    if (filters.sort === 'az') return a.name.localeCompare(b.name)
    if (filters.sort === 'za') return b.name.localeCompare(a.name)
    return Number(b.popularity || 0) - Number(a.popularity || 0)
  })
}
