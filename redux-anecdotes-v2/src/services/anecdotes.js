import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(url, { content, votes: 0 })
  console.log(response.data)
  return response.data
}

const update = async (id, anecdote) => {
  const response = await axios.put(`${url}/${id}`, anecdote)
  return response.data
}

export default { getAll, createNew, update }