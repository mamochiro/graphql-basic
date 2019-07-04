const Query =  {
  greeting(parent, args, { db }, info) {
    if (args.name && args.position) {
      return `Hello ${args.name} You Are ${args.position}`;
    } else {
      return `Hello!`;
    }
  },
  add(parent, args, { db }, info) {
    if (args.numbers.lenght === 0) {
      return 0;
    }
    return args.numbers.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });
  },
  users(parent, args, {db}, info) {
    if (!args.query) {
      return db.users;
    }

    return db.users.filter(user => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }

    return db.posts.filter(post => {
      const isTitleMatch = post.title
        .toLowerCase()
        .includes(args.query.toLowerCase());
      const isBodyMatch = post.body
        .toLowerCase()
        .includes(args.query.toLowerCase());
      return isBodyMatch || isTitleMatch;
    });
  },
  comments(parent, args, { db }, info) {
    if (!args.query) {
      return db.comments
    }
    return db.comments.find(comment => {
      return comment.text.toLowerCase().includes(args.query.toLowerCase())
    })
  }
}

export { Query as default }