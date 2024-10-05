const { GraphQLSchema, GraphQLObjectType } = require('graphql')


//Imposrt queries
const { users, user, posts, post, comment, comments } = require('./queries')

//Imposrt mutations
const { register, login, addPost, addComment, updatePost, deletePost, } = require('./mutations')

//Define QueryType
const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'Queries',
    fields: { users, user, posts, post, comment, comments }
})

//Define MutationType
const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'Mutations',
    fields: { register, login, addPost, addComment, updatePost, deletePost }
})


module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
})