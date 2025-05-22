class Router {
  constructor(routes) {
    this.routes = routes;
    this.currentComponent = null;
    this.rootElement = null;
    
    window.addEventListener('popstate', () => this._handleNavigation());
  }

  init(rootEl) {
    this.rootElement = rootEl;
    this._handleNavigation();
  }

  go(path) {
    history.pushState({}, '', path);
    this._handleNavigation();
  }

  async _handleNavigation() {
    const path = window.location.pathname;
    const route = this.routes[path] || this.routes['/'];
    
    if (!route) return;
    
    // Dynamic import for code splitting
    const module = await import(`../views/${route}`);
    const component = module.default;
    
    if (this.currentComponent) {
      this.currentComponent.el.remove();
    }
    
    this.currentComponent = new Ynor({
      el: this.rootElement,
      ...component
    });
  }
}

// Singleton pattern
export default new Router();