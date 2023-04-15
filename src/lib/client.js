import {createClient} from '@sanity/client'

export const client = createClient({
  projectId: 'fuuv236z',
  dataset: 'production',
  apiVersion: '2021-03-25',
  token: 'sk4FKqYAf4czTU8TG9uUMinBclm2Ub6btyAYKpwXMtRjA66nbh3mRA7NpgBHUFrOsh3GuJbneJ00gbORPoKq7GJL604gU9NY3LqhkoEGu6kwneKxm1VYyTu91aUoHbt7YvZmOmFwsT4v9ssT83y6GpR4xfTTsLtUbYgSUOFvBChSSUzCrzAr',
  useCdn: false
})
