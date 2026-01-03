import { Url } from "next/dist/shared/lib/router/router"

// lib/testapi.ts
type RedditParams = {
  url: string
  sortType: string
}

export type RedditPost = {
  title: string
  selftext: string
  author: string
  url: string
}

export type RedditApiResponse = {
  body: RedditPost[]
}


export async function testapi() {
  const url = new URL("https://api.steadyapi.com/v1/reddit/posts")

  const params: RedditParams = {
    url: "https://www.reddit.com/r/SaaS",
    sortType: "new",
  }

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.STEADY_API_KEY}`,
      Accept: "application/json",
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch Reddit posts")
  }

  return res.json()
}
