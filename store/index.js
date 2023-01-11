import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id);
        state.loadedPosts[postIndex] = editedPost;
      }
    },
    actions: {
      async nuxtServerInit(vuexContext) {
        try {
          let res = await axios.get('https://nuxt-blog-381bf-default-rtdb.firebaseio.com/posts.json');
          const postsArray = [];
          for (const key in res.data) {
            postsArray.push({
              ...res.data[key],
              id: key,
            });
          }
          vuexContext.commit('setPosts', postsArray);
        } catch (e) {
          console.error(e);
        }
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts);
      },
      async addPost(vuexContext, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date(),
        }
        let res = await axios.post('https://nuxt-blog-381bf-default-rtdb.firebaseio.com/posts.json', createdPost);
        vuexContext.commit('addPost', {
          ...createdPost,
          id: res.data.name,
        });
      },
      async editPost(vuexContext, editedPost) {
        let result = await axios.put(`https://nuxt-blog-381bf-default-rtdb.firebaseio.com/posts/${ editedPost.id }.json`, {
          ...editedPost,
          updatedDate: new Date(),
        });
        vuexContext.commit('editPost', {
          ...editedPost,
          updatedDate: new Date(),
        });
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      }
    }
  });
}

export default createStore;
