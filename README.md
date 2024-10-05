GraphQL API With Express, MongoDB, and JWT

HI, On http://localhost:3000/graphql page we can view GraphiQL interface to touch with mutations and queries 

I've done a great introduction to Graphql technology here. 
It`s backend server for authentication and authorization for commented posts.


List of queries{
users: [User]
Retrives list of users;

user(id: ID): User
Retrives one user;

posts: [Post]
Retrives list of posts;

post(id: ID): Post
Retrievs one post;

comment(id: String): Comment
Retrievs one comment;

comments: [Comment]
Retrives list of comments;
}


Mutations{
register(
username: String
email: String
password: String
displayName: String
) - Register new user;

login(email: Stringpassword: String)
Login user;

addPost(title: Stringbody: String): Post
Create new blog post;

addComment(comment: StringpostId: String): Comment
Create a new comment on the blog post;

updatePost(
id: String
title: String
body: String
): Post
Update blog post;

deletePost(postId: String)
Delete post;
}