const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const axios = require("axios");
const redis = require("./config/redis");
const APP_URL = `http://app:4002`;
const USERS_URL = `http://user:4001`;

const typeDefs = `#graphql
  type Movie {
    id: ID  
    title: String
    slug: String
    synopsis: String
    trailerUrl: String
    imgUrl: String
    rating: Int
    Genre: Genre
    Casts: [Casts]
    authorId: String
    User: User
  }

  type Casts {
    name: String,
    profilePic: String,
  }

  type Genre {
    id: ID
    name: String
  }

  type User { 
    _id: ID
    username: String
    email: String
    password: String
    phoneNumber: String
    address: String
  }

  type EditDeleteMovies {
    message: String
  }

  type createUsers {
    acknowledge: Boolean
    insertedId: String
  }

  type deleteUsers {
    acknowledge: Boolean    
    deletedCount: Int
  }

  type Query {
    movies: [Movie]
    users: [User]
    genres: [Genre]
    findUsersById(id: String): User
    moviesById(id: ID): Movie
  }

  input inputCasts{
    name: String,
    profilePic: String,
  }

  type Mutation {
    createMovies(
      title: String
      slug: String
      synopsis: String
      trailerUrl: String
      imgUrl: String
      rating: Int
      Genre: String
      cast: [inputCasts]
      authorId: String
    ): Movie
    editMovies(
      id: String
      title: String
      slug: String
      synopsis: String
      trailerUrl: String
      imgUrl: String
      rating: Int
      Genre: String
      cast: [inputCasts]
      authorId: String
    ): EditDeleteMovies
    deleteMovies(id: String): EditDeleteMovies
    createUsers(
      username: String
      email: String
      password: String
      phoneNumber: String
      address: String
    ): createUsers
    deleteUsers(id: String): deleteUsers  
  }
`;

const resolvers = {
  Query: {
    movies: async () => {
      try {
        const movies = await redis.get("movies");
        if (movies) {
          return JSON.parse(movies);
        } else {
          const { data } = await axios.get(`${APP_URL}/movies`);
          await redis.set("movies", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: {
            code: error.response.status,
            http: { status: error.response.status },
          },
        });
      }
    },
    genres: async () => {
      try {
        const genres = await redis.get("genres");
        if (genres) {
          return JSON.parse(genres);
        } else {
          const { data } = await axios.get(`${APP_URL}/genres`);
          await redis.set("genres", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: {
            code: error.response.status,
            http: { status: error.response.status },
          },
        });
      }
    },
    users: async () => {
      try {
        const users = await redis.get("users");
        if (users) {
          return JSON.parse(users);
        } else {
          const { data } = await axios.get(`${USERS_URL}/users`);
          await redis.set("users", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: {
            code: error.response.status,
            http: { status: error.response.status },
          },
        });
      }
    },
    findUsersById: async (_, args) => {
      try {
        const { data } = await axios.get(`${USERS_URL}/users/${args.id}`);
        return data;
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: {
            code: error.response.status,
            http: { status: error.response.status },
          },
        });
      }
    },
    moviesById: async (_, args) => {
      try {
        const { data: movie } = await axios.get(`${APP_URL}/movies/${args.id}`);
        const { data: user } = await axios.get(
          `${USERS_URL}/users/${movie.authorId}`
        );
        movie.User = user;
        return movie;
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: {
            code: error.response.status,
            http: { status: error.response.status },
          },
        });
      }
    },
  },
  Mutation: {
    createMovies: async (_, args) => {
      try {
        const { data } = await axios.post(`${APP_URL}/movies`, args);
        await redis.del("movies");
        return data;
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: {
            code: error.response.status,
            http: { status: error.response.status },
          },
        });
      }
    },
    editMovies: async (_, args) => {
      try {
        const { data } = await axios.put(`${APP_URL}/movies/${args.id}`, args);
        await redis.del("movies");
        return data;
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: {
            code: error.response.status,
            http: { status: error.response.status },
          },
        });
      }
    },
    deleteMovies: async (_, args) => {
      try {
        const { data } = await axios.delete(`${APP_URL}/movies/${args.id}`);
        await redis.del("movies");
        return data;
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: {
            code: error.response.status,
            http: { status: error.response.status },
          },
        });
      }
    },
    createUsers: async (_, args) => {
      try {
        const { data } = await axios.post(`${USERS_URL}/users`, args);
        await redis.del("users");
        return data;
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: {
            code: error.response.status,
            http: { status: error.response.status },
          },
        });
      }
    },
    deleteUsers: async (_, args) => {
      try {
        const { data } = await axios.delete(
          `${USERS_URL}/users/${args.id}`,
          args
        );
        await redis.del("users");
        return data;
      } catch (error) {
        throw new GraphQLError(error.response.data.message, {
          extensions: {
            code: error.response.status,
            http: { status: error.response.status },
          },
        });
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => console.log(`🚀 Server ready at ${url}`));
