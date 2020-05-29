const { ApolloServer, gql } = require('apollo-server');
const models = require('./models/')
const axios = require('axios').default;

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
  addProject(project: ProjectInput): Project
}
input ProjectInput {
  name: String
}
type Project {
  id: Int
  name: String
  description: String
  tracks: [Track]
}
type Track {
  id: Int
  name: String
  color: String
  project: Project
  filters: [Filter]
}
type Filter {
  id: Int
  name: String
  tracks: [Track]
}
`

const resolvers = {
  Query: {
    greeting: (parent, {name}, context, info) => `Hello ${name}`,
    counter: () => counter,
    projects: (parent, data, {projects}) => projects.findAll(),
  },
  Project: {
    // tracks: (project) => tracks.filter(track => track.projectId === project.id)
    tracks: (project) => project.getTracks(),
    description: async () => {
      const response = await axios.get('https://programming-quotes-api.herokuapp.com/quotes/random');
      return response.data.en;
    }
  },
  Track: {
    // project: (track) => projects.find(project => project.id === track.projectId),
    project: (track) => track.getProject(),
    // filters: (track) => filters.filter(filter => track.filters.includes(filter.id))
  },
  Filter: {
    // tracks: (filter) => tracks.filter(track => track.filters.includes(track.id))
    // tracks: (filter) => filter.tracks.map(trackId => tracks.find(t => t.id === trackId))
  },
  Mutation: {
    increaseCounter: () => ++counter,
    decreaseCounter: () => --counter,
    // addProject: (parent, {project}) => {
    //   const newProject = {...project, id: projects.length+1}
    //   projects.push(newProject)
    //   return newProject;
    // }
  }
}


async function start() {
  await models.sequelize.sync()
  const server = new ApolloServer({ 
      typeDefs: schema, 
      resolvers,
      context: {
        db: models,
        tracks: models.tracks,
        projects: models.projects,
      }
    });
    server.listen()
}
start()