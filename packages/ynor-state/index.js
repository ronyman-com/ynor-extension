class YnorStore {
  constructor(state = {}) {
    this.state = new Proxy(state, {
      set: (target, key, value) => {
        target[key] = value;
        this._notify(key);
        return true;
      }
    });
    this.subscribers = new Map();
  }

  subscribe(key, callback) {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set());
    }
    this.subscribers.get(key).add(callback);
    return () => this.unsubscribe(key, callback);
  }

  unsubscribe(key, callback) {
    if (this.subscribers.has(key)) {
      this.subscribers.get(key).delete(callback);
    }
  }

  _notify(key) {
    if (this.subscribers.has(key)) {
      this.subscribers.get(key).forEach(cb => cb(this.state[key]));
    }
  }
}

module.exports = YnorStore;