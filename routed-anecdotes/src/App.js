import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Container, Table, Grid, Image, Header, Divider, Segment, Form, Input, Label, Button } from 'semantic-ui-react'
import dijkstra from './Edsger_Wybe_Dijkstra.jpg'

const Menu = () => {
  const style = {
    'background-color': 'darkgreen',
    'padding': '5px',
    'font-size': '1.2em',
    'a.color': 'white'
  }
  const activeStyle = {
    'background-color': 'green',
    'padding': '8px',
    'border-radius': '10px'
  }
  const linkStyle = {
    'color': 'linen'
  }
  return (
    <div style={ style }>    
      <NavLink exact to='/' activeStyle={ activeStyle } style={ linkStyle }>anecdotes</NavLink>&nbsp;&nbsp;
      <NavLink to='/new' activeStyle={ activeStyle } style={ linkStyle }>create new</NavLink>&nbsp;&nbsp;
      <NavLink to='/about' activeStyle={ activeStyle } style={ linkStyle }>about</NavLink>&nbsp;&nbsp;
    </div>
  )
}

const Notification = ({ notification }) => {
  const style = {
    'color': 'darkgreen',
    'border-style': 'solid',
    'border-width': '1px',
    'border-radius': '10px',
    'padding': '5px',
    'margin-top': '10px',
    'margin-bottom': '10px'
  }
  return (
    <div style={ style }>
      { notification }
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <Header as='h2' dividing>Anecdotes</Header>
    <Table>
      {anecdotes.map(anecdote =>
        <Table.Row key={anecdote.id} >
          <Table.Cell>
            <Link to={`./anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </Table.Cell>
        </Table.Row>)}
    </Table>  
  </div>
)

const Anecdote = ({ anecdote }) => {
  if (anecdote) {
    return (
      <div>
        <Header as='h2' dividing>{anecdote.content}</Header>
        <p>has {anecdote.votes} votes</p>
        <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
      </div>
    )
  } else {
    return (
      <div>
        <h2>No such anecdote!</h2>
      </div>
    )
  }
}

const About = () => (
  <div>
    <Header as='h2' dividing>About anecdote app</Header>
    <Grid>
      <Grid.Row>
        <Grid.Column width={10}>
          <p>According to Wikipedia:</p>
          
          <em>An anecdote is a brief, revealing account of an individual person or an incident. 
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
            An anecdote is "a story with a point."</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Grid.Column>
        <Grid.Column width={6}>
          <Image src={dijkstra} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <Header as='h2' dividing>create a new anecdote</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Label pointing='below'>content</Label>
            <Input name='content' value={this.state.content} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
          <Label pointing='below'>author</Label>
            <Input name='author' value={this.state.author} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
          <Label pointing='below'>url for more info</Label>
            <Input name='info' value={this.state.info} onChange={this.handleChange} />
          </Form.Field> 
          <Button type='submit'>create</Button>
        </Form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `A new anecdote ${anecdote.content} created!`
    })
    setTimeout(() => {
      this.setState({ notification: ''})
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <Container>
        <Segment inverted color='olive' tertiary>
          <Router>
            <div>
              <Header as='h1'>Software anecdotes</Header>
                <Menu />
                <Notification notification={this.state.notification} />
                <Segment>
                <Route exact path='/' 
                      render={() =>
                        <AnecdoteList anecdotes={this.state.anecdotes} />}
                />
                <Route exact path='/anecdotes/:id' 
                      render={({match}) =>
                        <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
                />
                <Route exact path='/about' render={() => <About />} /> 
                <Route exact path='/new' render={({history}) =>
                  <CreateNew history={history} addNew={this.addNew}/>}
                />
                </Segment>
            </div>
          </Router>
          <div>
            <Divider />
            <Footer />
          </div>
        </Segment>
      </Container>
    );
  }
}

export default App;
