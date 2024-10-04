const { GraphQLSchema, GraphQLObjectType } = require('graphql')


//Imposrt queries
const { users, user, posts, post } = require('./queries')

//Imposrt mutations
const { register, login, addPost, } = require('./mutations')

//Define QueryType
const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'Queries',
    fields: { users, user, posts, post }
})

//Define MutationType
const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'Mutations',
    fields: { register, login, addPost }
})


module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
})