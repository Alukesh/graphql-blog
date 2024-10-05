const express = require('express')
const dotenv = require('dotenv')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./graphql/schema')

const { connectDB } = require('./db')
const app = express()
dotenv.config()
const PORT = process.env.PORT

const { authenticate } = require('./middleware/auth')
const { Post, Comment, User } = require('./models')
const { createJwtToken } = require('./util/auth')
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

app.post('/login', async (req, res) => {
    const {
        email,
        password,
    } = req.body;
    const user = await User.findOne({ email }).select('+password')
    if (!user || password !== user.password) {
        res.status(400).json({ msg: 'Invalid credencials' })
    }
    const token = createJwtToken(user)
    res.json({ msg: `Welcome!`, token })
})

app.post('/register', async (req, res) => {
    const {
        username,
        email,
        password,
        displayName,
    } = req.body;
    const user = new User({ username, email, password, displayName })
    await user.save()
    const token = createJwtToken(user)
    res.json({ msg: `Welcome!`, token })
})


app.get('/getPosts', async (req, res) => {
    const posts = await Post.find()
    res.json({ posts })
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


app.post('/updatePost', async (req, res) => {
    const { id, title, body } = req.body;
    console.log('req.body =>', req.body);

    const { verifiedUser } = req;
    if (!verifiedUser) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const postUpdated = await Post.findOneAndUpdate(
            {
                _id: id, authorId: verifiedUser._id
            },
            { title, body },
            {
                new: true,
                runValidators: true,
            }
        )
        if (!postUpdated) {
            res.status(400).json({ error: 'No post with the given Id found for the author' })
        }

        res.status(201).json({ msg: 'Post updated successfully', post: postUpdated });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update post' });
    }
});


app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);
})