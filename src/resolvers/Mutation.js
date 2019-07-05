import uuidv4 from "uuid/v4";

const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some(user => {
      return user.email === args.email;
    });

    if (emailTaken) {
      throw new Error("Email taken");
    }

    const user = {
      id: uuidv4(),
      ...args.data
    };

    db.users.push(user);

    return user;
  },
  deleteUser(parent, args, { db }, info) {
    const userIndex = users.findIndex(user => {
      return user.id === args.id;
    });

    if (userIndex === -1) {
      throw new Error("User	not	found");
    }

    const deleteuser = users.splice(userIndex, 1);

    db.posts = db.posts.filter(post => {
      const match = post.author === args.id;
      if (match) {
        db.comments = db.comments.filter(comment => {
          return comment.post !== post.id;
        });
      }
      return !match;
    });

    db.comments = db.comments.filter(comment => comment.author !== args.id);

    return deleteuser[0];
  },
  deletePost(parent, args, { db }, info) {
    const postIndex = db.posts.findIndex(post => {
      return post.id === args.id;
    });

    if (postIndex == -1) {
      throw new Error("Post	not	found");
    }

    const postDelete = db.posts.splice(postIndex, 1);

    db.comments = db.comments.filter(comment => {
      return comment.post !== args.id;
    });

    return postDelete[0];
  },
  createPost(parent, args, { db }, info) {
    const userExits = db.users.some(user => user.id === args.data.author);

    if (!userExits) {
      throw new Error("User not Found");
    }

    const post = {
      id: uuidv4(),
      ...args.data
    };

    db.posts.push(post);

    return post;
  },
  updatePost(parent, args, { db }, info) {
    const { id, data } = args;
    const post = db.posts.find(post => post.id === id);

    if (!post) {
      throw new Error("Post not found");
    }

    if (typeof data.title === "string") {
      post.title = data.title;
    }

    if (typeof data.body === "string") {
      post.body = data.body;
    }

    if (typeof data.published === "boolean") {
      post.published = data.published;
    }

    return post;
  },
  createComment(parent, args, { db }, info) {
    const userExits = db.users.some(user => user.id === args.data.author);
    const postExit = db.posts.some(
      post => post.id === args.data.post && post.published
    );

    if (!userExits || !postExit) {
      throw new Error("User or Post not Found");
    }
    const comment = {
      id: uuidv4(),
      ...args.data
    };

    db.comments.push(comment);

    return comment;
  },
  updateUser(parent, args, { db }, info) {
    const { id, data } = args;
    console.log(data);

    const user = db.users.find(user => user.id === id);

    if (!user) {
      throw new Error("User not found");
    }

    if (typeof data.email === "string") {
      const emailTaken = db.users.some(user => user.email === data.email);

      if (emailTaken) {
        throw new Error("Email taken");
      }
      user.email = data.email;
    }

    if (typeof data.email === "string") {
      user.age = data.age;
    }

    if (typeof data.age !== "undefined") {
      user.age = data.age;
    }

    return user;
  },
  deleteComment(parent, args, { db }, info) {
    const commentIndex = db.comments.findIndex(comment => {
      return comment.id === args.id;
    });

    if (!commentIndex === -1) {
      throw new Error("Comment not found");
    }

    const deleteComment = db.comments.splice(commentIndex, 1);

    return deleteComment[0];
  },
  updateComment(parent, args, { db }, info) {
    const { id, data } = args;
    const comment = db.comments.find(comment => comment.id === id);

    if (!comment) {
      throw new Error("Comment not found");
    }
    if (typeof data.text === "string") {
      comment.text = data.text
    }

    return comment
  }
};

export { Mutation as default };
