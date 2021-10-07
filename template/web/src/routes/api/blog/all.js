import client from '$lib/sanity-client.js'

/**
 * This route is called 'all' instead of index to prevent route conflicts.
 */
export async function get () {
  try {
    const posts = await client.fetch('*[_type == "post" && defined(slug.current) && publishedAt < now()]|order(publishedAt desc)')

    return {
      body: {
        posts
      }
    }
  } catch (err) {
    return {
      status: 500,
      body: {
        message: err.message
      }
    } 
  }
};