const { GraphQLSchema, GraphQLObjectType } = require('graphql')


//Imposrt queries
const { } = require('./queries')

//Imposrt mutations
const { } = require('./mutations')

//Define QueryType
const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'Queries',
    fields: {}
})

//Define MutationType
const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'Mutations',
    fields: {}
})


module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
})