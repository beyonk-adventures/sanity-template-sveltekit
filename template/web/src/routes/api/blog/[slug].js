import client from '$lib/sanity-client.js'

export async function get ({ page }) {
  try {
    // We have access to params.slug because the filename has [slug] in it.
    const { slug } = page.params
    const filter = '*[_type == "post" && slug.current == $slug][0]';
    const projection = `{
      ...,
      body[]{
        ...,
        children[]{
          ...,
          _type == 'authorReference' => {
            _type,
            author->
          }
        }
      }
    }`;

    const query = filter + projection;
    const post = await client.fetch(query, { slug })
    return {
      body: { post }
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