const url = "http://localhost:3001"

const headers = {
  //'Accept': 'application/json',
  'Authorization': "marcos"
}

//GetAll busca todos os posts
export const getAll = () =>
  fetch(`${url}/posts`, { headers })
    .then(res => res.json())
    .catch(err => console.log(err))

//Get detail of a single post
export const getDetail = (id) =>
  fetch(`${url}/posts/${id}`, { headers })
  .then(res => res.json())
  .catch(err => console.log(err))
  
export const createPost = (post) => {
  fetch(`${url}/posts/`,{ method: 'POST',  headers },{
    body: JSON.stringify({
      author: post.author, 
      category: 'redux',
      commentCount: 0,
      deleted: false,
      body: post.body,
      timestamp: Date.now(),
      title: post.title,
      voteScore: 0
    })
  })
    .then(res => console.log(res))
    .catch(err => console.log(err));
}  

//GetAll busca todos os comentarios
export const getComment = () =>
fetch(`${url}/coments`, { headers })
  .then(res => res.json())
  .catch(err => console.log(err))

//Get comments of a single post
export const getCommentPost = (id) =>
  fetch(`${url}/posts/${id}/comments`, { headers })
  .then(res => res.json())
  .catch(err => console.log(err))
  

export const updatePost = (post) =>
  fetch(`${url}/posts/${post.id}`, { method: 'PUT',  headers },{
    body: JSON.stringify({ post })
  }).then(res => res.json())
  .catch(err => console.log(err));

export const search = (query, maxResults) =>
  fetch(`${url}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, maxResults })
  }).then(res => res.json())
    .then(data => data.books)
