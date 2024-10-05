const express = require('express')
const dotenv = require('dotenv')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./graphql/schema')

const { connectDB } = require('./db')
const app = express()
dotenv.config()
const PORT = process.env.PORT

const { authenticate } = require('./middleware/auth')
const { Post, Comment } = require('./models')
connectDB()

app.use(express.json());
app.use(authenticate)

app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: true,
    }))

app.get('/', (req, res) => {
    console.log(req.verifiedUser);
    res.json({ msg: `Welcome! go to /graphql` })
})

app.post('/addPost', async (req, res) => {
    const { title, body } = req.body;
    console.log('req.body =>', req.body);

    const { verifiedUser } = req;
    if (!verifiedUser) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const newPost = new Post({
            authorId: verifiedUser._id,
            title,
            body,
        });
        await newPost.save();

        res.status(201).json({ msg: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create post' });
    }
});


app.post('/addComment', async (req, res) => {
    const { comment, postId } = req.body;
    const { verifiedUser } = req;
    if (!verifiedUser) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const newComment = new Comment({
            userId: verifiedUser._id,
            postId,
            comment,
        })
        await newComment.save()
        res.status(200).json({ msg: 'Comment created succesfully', comment: newComment })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create comment' });
    }
})


app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);
})