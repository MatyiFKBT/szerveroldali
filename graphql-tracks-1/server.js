const { ApolloServer, gql } = require('apollo-server');

let counter = 10

const users = [
  { id: 1, name: 'Adam', email: 'adam@example.com', password: 'test' },
  { id: 2, name: 'Bela', email: 'bela@example.com', password: 'test' },
]
const projects = [
  { id: 1, name: 'First project', userId: 1 },
  { id: 2, name: 'Second project', userId: 2  },
]

const tracks = [
  { id: 1, name: 'Skillet - Whispers In The Dark', color: 'red', projectId: 1, filters: [1] },
  { id: 2, name: 'The Rolling Stones - Paint It, Black', color: 'black', projectId: 1, filters: [1,2]  },
  { id: 3, name: 'Manowar - Warriors of the World', color: 'darkred', projectId: 2, filters: [2]  },
]

const filters = [
  { id: 1, name: 'Filter 1', tracks: [1,2] },
  { id: 2, name: 'Filter 2', tracks: [2,3] },
]

const schema = gql`
type Query {
  greeting(name: String): String
  counter: Int
  projects: [Project]
}
type Mutation {
  increaseCounter: Int
  decreaseCounter: Int
}
type Project {
  id: Int
  name: String
  tracks: [Track]
}
type Track {
  id: Int
  name: String
  color: String
  project: Project
}
`

const resolvers = {
  Query: {
    greeting: (parent, {name}, context, info) => `Hello ${name}`,
    counter: () => counter,
    projects: () => projects,
  },
  Project: {
    tracks: (project) => tracks.filter(track => track.projectId === project.id)
  },
  Track: {
    project: (track) => projects.find(project => project.id === track.projectId)
  },
  Mutation: {
    increaseCounter: () => ++counter,
    decreaseCounter: () => --counter
  }
}

const server = new ApolloServer({ 
    typeDefs: schema, 
    resolvers,
  });
  server.listen()