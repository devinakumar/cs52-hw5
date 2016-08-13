import Post from '../models/post_model';

const cleanPosts = (posts) => {
  return posts.map(post => {
    return { id: post._id, title: post.title, tags: post.tags, author: post.author };
  });
};

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.content = req.body.content;
  post.tags = req.body.tags;
  post.author = req.user.username;
  post.save()
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.json({ error });
    });
};

export const getPosts = (req, res) => {
  Post.find()
  .then(result => {
    res.json(cleanPosts(result));
  })
  .catch(error => {
    res.json({ error });
  });
};

export const getPost = (req, res) => {
  Post.findById(req.params.id)
  .then(result => {
    res.json(result);
  })
  .catch(error => {
    res.json({ error });
  });
};

export const deletePost = (req, res) => {
  Post.findByIdAndRemove(req.params.id)
  .then(result => {
    res.json({ message: 'Post deleted!' });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const updatePost = (req, res) => {
  Post.findById(req.params.id)
  .then(result => {
    const newPost = result;
    newPost.title = (req.body.title !== undefined) ? req.body.title : result.title;
    newPost.content = (req.body.content !== undefined) ? req.body.content : result.content;
    newPost.tags = (req.body.tags !== undefined) ? req.body.tags : result.tags;
    return newPost.save();
  })
  .then(result => {
    res.json(result);
  })
  .catch(error => {
    res.json({ error });
  });
};
