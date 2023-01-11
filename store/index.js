import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null,
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
      },
      setToken(state, token) {
        state.token = token;
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
        let res = await axios.post(`https://nuxt-blog-381bf-default-rtdb.firebaseio.com/posts.json?auth=${vuexContext.state.token}`, createdPost);
        vuexContext.commit('addPost', {
          ...createdPost,
          id: res.data.name,
        });
      },
      async editPost(vuexContext, editedPost) {
        let result = await axios.put(`https://nuxt-blog-381bf-default-rtdb.firebaseio.com/posts/${ editedPost.id }.json?auth=${vuexContext.state.token}`, {
          ...editedPost,
          updatedDate: new Date(),
        });
        vuexContext.commit('editPost', {
          ...editedPost,
          updatedDate: new Date(),
        });
      },
      async authenticateUser(vuexContext, authData) {
        try {
          let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIKey}`;
          if (authData.isLogin) {
            authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIKey}`;
          }
          let res = await axios.post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          });
          vuexContext.commit('setToken', res.data.idToken);
        } catch (e) {
          console.error(e);
        }
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
