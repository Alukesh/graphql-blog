
const { PostType, CommentType } = require('./types')
const { User, Post, Comment } = require('../models')
const { GraphQLString, GraphQLList } = require('graphql')
const { createJwtToken } = require('../util/auth')


const register = {
    type: GraphQLString,
    description: 'Register new user',
    args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        displayName: { type: GraphQLString },
    },
    async resolve(parent, args) {
        const { username, email, password, displayName } = args
        const user = new User({ username, email, password, displayName })

        await user.save()
        const token = createJwtToken(user)
        return token
    }
}

const login = {
    type: GraphQLString,
    description: 'Login user',
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(parent, args) {
        const user = await User.findOne({ email: args.email }).select('+password')
        if (!user || args.password !== user.password) {
            console.log(user);
            throw new Error(`Invalid credencials`)
        }

        const token = createJwtToken(user)
        return token;
    }
}


const addPost = {
    type: PostType,
    description: 'Create new blog post',
    args: {
        title: { type: GraphQLString },
        body: { type: GraphQLString },
    },
    resolve(parent, args, { verifiedUser }) {
        console.log('Verified user', verifiedUser);
        if (!verifiedUser) {
            throw new Error('Unauthorized')
        }

        const post = new Post({
            authorId: verifiedUser._id,
            title: args.title,
            body: args.body,
        })
        return post.save()
    }
}

const updatePost = {
    type: PostType,
    description: 'Update blog post',
    args: {
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
    },
    async resolve(parent, args, { verifiedUser }) {
        if (!verifiedUser) {
            throw new Error('Unauthenticated')
        }
        const postUpdated = await Post.findOneAndUpdate(
            {
                _id: args.id, authorId: verifiedUser._id
            },
            { title: args.title, body: args.body },
            {
                new: true,
                runValidators: true,
            }
        )
        if (!postUpdated) {
            throw new Error('No post with the given Id found for the author')
        }
        return postUpdated;
    }
}

const deletePost = {
    type: GraphQLString,
    description: 'Delete post',
    args: {
        postId: { type: GraphQLString },
    },
    async resolve(parent, args, { verifiedUser }) {
        if (!verifiedUser) {
            throw new Error('Unauthenticated')
        }
        const postDeleted = await Post.findOneAndDelete({
            _id: args.postId, authorId: verifiedUser._id
        })
        if (!postDeleted) {
            throw new Error('No post with the given Id found for the author')
        }
        return 'Post deleted'
    }
}



const addComment = {
    type: CommentType,
    description: 'Create a new comment on the blog post',
    args: {
        comment: { type: GraphQLString },
        postId: { type: GraphQLString },
    },
    resolve(parent, args, { verifiedUser }) {
        const comment = new Comment({
            userId: verifiedUser._id,
            postId: args.postId,
            comment: args.comment,
        })
        return comment.save()
    }
}

module.exports = { register, login, addPost, addComment, updatePost, deletePost }