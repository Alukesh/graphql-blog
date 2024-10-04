const { GraphQLList } = require('graphql')
const { UserType } = require('./types')
const { User } = require('../models')

const users = {
    type: GraphQLList(UserType),
    resolve(parent, args) {
        return User.find()
    }
}

module.exports = { users }