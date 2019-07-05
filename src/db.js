let users = [
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

let posts = [
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

let comments = [
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


const db = {
  users,
  posts,
  comments
}

export { db as default }