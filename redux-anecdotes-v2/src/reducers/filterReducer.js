const reducer = (filter = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    default:
      return filter
  }
}

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    filter
  }
}

export default reducer