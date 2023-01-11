import Vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'

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
      },
      clearToken(state) {
        state.token = null;
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
          const jwt = res.data.idToken;
          const expirationDate = res.data.expiresIn * 1000;
          vuexContext.commit('setToken', jwt);
          localStorage.setItem('token', jwt);
          localStorage.setItem('tokenExpiration', new Date().getTime() + +expirationDate);
          Cookie.set('jwt', jwt);
          Cookie.set('expirationDate', new Date().getTime() + +expirationDate);
        } catch (e) {
          console.error(e);
        }
      },
      setLogoutTimer(vuexContext, duration) {
        setTimeout(() => {
          vuexContext.commit('clearToken');
        }, duration);
      },
      initAuth(vuexContext, req) {
        let token;
        let expirationDate;
        if (req) {
          if (!req.headers.cookie) return;
          const jwt = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='));
          if (!jwt) return;
          token = jwt.split('=')[1];
          expirationDate = req.headers.cookie.split(';').find(c => c.trim().startsWith('expirationDate=')).split('=')[1];
        } else {
          token = localStorage.getItem('token');
          expirationDate = localStorage.getItem('tokenExpiration');
        }
        if (!token || new Date().getTime() > +expirationDate) {
          console.log('No token or invalid token');
          vuexContext.dispatch('logout');
          return;
        }
        vuexContext.commit('setToken', token);
      },
      logout(vuexContext) {
        vuexContext.commit('clearToken');
        Cookie.remove('jwt');
        Cookie.remove('expirationDate');
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
      isAuthenticated(state) {
        return state.token != null;
      }
    }
  });
}

export default createStore;
