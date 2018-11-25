import React from 'react'
import Filter from './Filter'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {

  vote = async (anecdote, event) => {
    event.preventDefault()
    this.props.voteAnecdote(anecdote)
    this.props.setNotification(`You voted '${anecdote.content}'`)
    setTimeout(() => {
      this.props.setNotification('')
    }, 5000)
  }
  
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store} />
        {this.props.anecdotesToShow.sort((a, b) => b.votes - a.votes)
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={(e) => this.vote(anecdote, e)}>
                  vote
                </button>
              </div>
            </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes.filter(anecdote => 
          anecdote.content.toLowerCase()
            .includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList
