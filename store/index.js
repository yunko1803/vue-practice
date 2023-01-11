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
      }
    },
    actions: {
      async nuxtServerInit(vuexContext, context) {
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
