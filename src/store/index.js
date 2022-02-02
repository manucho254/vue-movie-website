import { createStore } from 'vuex'

export default createStore({
    state: {
        isLoading: false,
        pageLoaderIsloaded: false,
    },
    mutations: {
        setIsLoading(state, status) {
            state.isLoading = status
        }
    }
})