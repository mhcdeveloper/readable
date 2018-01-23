const url = "http://localhost:3001"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
//localStorage.token = Math.random().toString(36).substr(-8)
if (!token)
  token = "uwus48jq";

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}


/*
  Inicio dos Metodos relacionados ao posts
*/

//GetAll busca todos os posts
export const getAllPosts = () => {
  return (
    fetch(`${url}/posts`, { headers })
      .then(res => res.json())
      .catch(err => console.log(err))  
  )
}

//Get detail of a single post
export const getDetail = (id) => {
  return (
    fetch(`${url}/posts/${id}`, { headers })
      .then(res => res.json())
      .catch(err => console.log(err))
  )
}
  
//Metodo responsável por adicionar um novo post
export const createPost = (post) => {
  return (
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
      .catch(err => console.log(err))
  )
}  
  
/*
  Fim dos Metodos relacionados ao posts
*/






/*
  Inicio dos Metodos relacionados ao comments
*/

//GetAll busca todos os comentarios
export const getComment = () => {
  return (
    fetch(`${url}/coments`, { headers })
      .then(res => res.json())
      .catch(err => console.log(err))
  )
}

//Get comments of a single post
export const getCommentPost = (id) =>  {
  return (
    fetch(`${url}/posts/${id}/comments`, { headers })
      .then(res => res.json())
      .catch(err => console.log(err))
  )
}

//Metodo responsável por fazer o voteScore
export const voteScoreComment = ({ id, option }) => {
  return (
    fetch(`${url}/comments/${id}`, { method: 'POST', headers }, {
      body: { option: option }  
    }).then(res => console.log(res))
    .catch(err => console.log(err))
  )
}

/*
  Fim dos Metodos relacionados ao comments
*/








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
