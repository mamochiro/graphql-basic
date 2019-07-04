import { GraphQLServer } from "graphql-yoga";
// const { GraphQLServer } = require("graphql-yoga");

//demo user data
const users = [
  {
    id: "1",
    name: "maekkir",
    email: "mamochiro11@gmail.com",
    age: 27
  },
  {
    id: "2",
    name: "mmmaaaa",
    email: "mark@livw.com"
  },
  {
    id: "11",
    name: "qqqq",
    email: "yuri@kk.com",
    age: 13
  },
  {
    id: "14",
    name: "ts over",
    email: "ts_oce@kk.com",
    age: null
  },
  {
    id: "15",
    name: "maloct",
    email: "malocah@kk.com"
  }
];

const posts = [
  {
    id: "10",
    title: "GraphQL 101",
    body: "This is how to use GraphQL...",
    published: true,
    author: "1"
  },
  {
    id: "11",
    title: "Mark testing",
    body: "Moo",
    published: false,
    author: "11"
  }
];

const comments = [
  {
    id: "1",
    text: "test 1 ",
    author: "11",
    post: "10"
  },
  {
    id: "2",
    text: "test 2 ",
    author: "1",
    post: "11"
  },
  {
    id: "3",
    text: "test 3 ",
    author: "2",
    post: "11"
  },
  {
    id: "4",
    text: "test 4 ",
    author: "1",
    post: "11"
  }
];

const typeDefs = `
    type Query {
			post: Post!
			greeting(name: String , position:	String): String!
			add(numbers:	[Float!]!): Float!
			grades:	[Int!]!
			users(query:	String): [User!]!
			posts(query:	String):	[Post!]!
			comments(query: String) : [Comment!]!
		}
		
		type User {
			id:	ID!
			name: String!
			email:	String!
			age: Int
			posts:	[Post!]!
			comments:	[Comment!]!
		}

		type Post	{
			id:	ID!
			title:	String!
			body:	String!
			published:	Boolean!
			author:	User!	
			comments: [Comment]! 
		}

		type Comment	{
			id: ID!
			text:	String!
			author: User!
			post: Post!
		}
`;

const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      if (args.name && args.position) {
        return `Hello ${args.name} You Are ${args.position}`;
      } else {
        return `Hello!`;
      }
    },
    add(parent, args, ctx, info) {
      if (args.numbers.lenght === 0) {
        return 0;
      }
      return args.numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });
    },
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }

      return posts.filter(post => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isBodyMatch || isTitleMatch;
      });
    },
    comments(parent, args, ctx, info) {
      if (!args.query) {
        return comments;
      }
      return comments.find(comment => {
        return comment.text.toLowerCase().includes(args.query.toLowerCase());
      });
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
		},
		comments(parent , args , ctx , info)	{
			return comments.filter((comments) => {
				return comments.post === parent.id
			})
		}
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.author === parent.id;
      });
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
			return posts.find((post) => {
				return post.id === parent.post
			})
		}
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("server is up");
});
