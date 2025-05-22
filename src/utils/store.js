class Store {
  constructor(state = {}) {
    this.state = new Proxy(state, {
      set: (target, key, value) => {
        target[key] = value;
        this._notify(key);
        return true;
      }
    });
    this.subscribers = {};
  }

  subscribe(key, callback) {
    if (!this.subscribers[key]) {
      this.subscribers[key] = [];
    }
    this.subscribers[key].push(callback);
  }

  _notify(key) {
    if (this.subscribers[key]) {
      this.subscribers[key].forEach(cb => cb(this.state[key]));
    }
  }

  commit(mutation, payload) {
    if (this.mutations && this.mutations[mutation]) {
      this.mutations[mutation](this.state, payload);
    }
  }

  dispatch(action, payload) {
    if (this.actions && this.actions[action]) {
      return this.actions[action](this, payload);
    }
  }
}

// Example store configuration
export const store = new Store({
  user: null,
  theme: 'light'
});

store.mutations = {
  setUser(state, user) {
    state.user = user;
  },
  toggleTheme(state) {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
  }
};

store.actions = {
  async fetchUser({ commit }, userId) {
    const user = await fetch(`/api/users/${userId}`).then(res => res.json());
    commit('setUser', user);
  }
};