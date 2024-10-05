const { GraphQLList, GraphQLID, GraphQLString } = require('graphql')
const { UserType, PostType, CommentType } = require('./types')
const { User, Post, Comment, } = require('../models')

const users = {
    type: new GraphQLList(UserType),
    description: 'Retrives list of users',
    resolve(parent, args) {
        return User.find()
    }
}


const user = {
    type: UserType,
    description: 'Retrives one user',
    args: { id: { type: GraphQLID }, },
    resolve(_, args) {
        return User.findById(args.id)
    }
}

const posts = {
    type: new GraphQLList(PostType),
    description: 'Retrives list of posts',
    resolve() {
        return Post.find()
    }
}

const post = {
    type: PostType,
    description: 'Retrievs one post',
    args: { id: { type: GraphQLID } },
    resolve(_, args) {
        return Post.findById(args.id)
    }
}

const comments = {
    type: GraphQLList(CommentType),
    description: 'Retrives list of comments',
    resolve() {
        return Comment.find()
    }
}

const comment = {
    type: CommentType,
    description: 'Retrievs one comment',
    args: { id: { type: GraphQLString } },
    resolve(_, args) {
        return Comment.findById(args.id)
    }
}

module.exports = { user, users, posts, post, comment, comments }