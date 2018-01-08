const url = "http://localhost:3001"

const headers = {
  //'Accept': 'application/json',
  'Authorization': "marcos"
}

export const get = (bookId) =>
  fetch(`${url}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book)

//GetAll busca todos os posts
export const getAll = () =>
  fetch(`${url}/posts`, { headers })
    .then(res => res.json())
    .catch(err => console.log(err))
    

//GetAll busca todos os comentarios
export const getComent = () =>
fetch(`${url}/coments`, { headers })
  .then(res => res.json())
  .catch(err => console.log(err))


export const update = (book, shelf) =>
  fetch(`${url}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())

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
