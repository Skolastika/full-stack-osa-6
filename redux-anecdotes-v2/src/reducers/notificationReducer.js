const notificationReducer = (state = 'Hello', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const setNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification 
  }
}

export const notify = (notification, timeout) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: ''
      })
    }, timeout * 100)
  }
}


export default notificationReducer