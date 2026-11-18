// TVmaze is a free TV show API, no key needed: https://www.tvmaze.com/api
const BASE_URL = 'https://api.tvmaze.com'

async function getJson(path) {
  const res = await fetch(BASE_URL + path)
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`)
  }
  return res.json()
}

// search shows by name, returns a plain list of shows
export async function searchShows(query) {
  const results = await getJson('/search/shows?q=' + encodeURIComponent(query))
  return results.map((r) => r.show)
}

// the api has no "popular" endpoint, so we take a page of shows and keep the best rated
export async function getTopShows() {
  const shows = await getJson('/shows?page=1')
  return shows
    .filter((s) => s.rating.average && s.image)
    .sort((a, b) => b.rating.average - a.rating.average)
    .slice(0, 24)
}

// one show with its cast and all episodes in a single request
export function getShowDetails(id) {
  return getJson(`/shows/${id}?embed[]=cast&embed[]=episodes`)
}

// the summary comes as html like "<p><b>Show</b> is...</p>", we only want the text
export function stripHtml(html) {
  if (!html) return ''
  return new DOMParser().parseFromString(html, 'text/html').body.textContent || ''
}
