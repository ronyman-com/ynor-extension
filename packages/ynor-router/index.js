class YnorRouter {
  constructor(routes = [], options = {}) {
    this.routes = new Map(routes.map(route => [route.path, route]));
    this.history = options.mode === 'history' ? window.history : {
      pushState: (_, __, path) => window.location.hash = path,
      replaceState: (_, __, path) => window.location.hash = path
    };
    this.current = null;
    
    window.addEventListener('popstate', this._handleNavigation.bind(this));
    window.addEventListener('hashchange', this._handleNavigation.bind(this));
  }

  navigate(path) {
    this.history.pushState({}, '', path);
    this._handleNavigation();
  }

  _handleNavigation() {
    const path = window.location.pathname || window.location.hash.slice(1) || '/';
    const route = this.routes.get(path) || this.routes.get('*');
    
    if (route && route.component) {
      this.current = route;
      if (typeof route.component === 'function') {
        route.component().then(module => this._render(module.default));
      } else {
        this._render(route.component);
      }
    }
  }

  _render(component) {
    const app = new YnorCore().createApp(component);
    app.mount('#app');
  }
}

module.exports = YnorRouter;