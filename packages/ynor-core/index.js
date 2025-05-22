class YnorCore {
  constructor(options = {}) {
    this.components = new Map();
    this.directives = {};
    this.mixins = [];
    this.config = {
      delimiters: ['{{', '}}'],
      ...options
    };
  }

  component(name, definition) {
    this.components.set(name, definition);
    return this;
  }

  directive(name, handler) {
    this.directives[name] = handler;
    return this;
  }

  mixin(mixin) {
    this.mixins.push(mixin);
    return this;
  }

  createApp(rootComponent) {
    return new YnorApplication(rootComponent, this);
  }
}

class YnorApplication {
  constructor(rootComponent, core) {
    this.root = rootComponent;
    this.core = core;
    this._init();
  }

  _init() {
    // Apply mixins
    this.core.mixins.forEach(mixin => {
      Object.assign(this.root, mixin);
    });
  }

  mount(el) {
    const rootEl = typeof el === 'string' ? document.querySelector(el) : el;
    rootEl.innerHTML = this._compile(this.root.template);
  }

  _compile(template) {
    // Basic template compilation
    return template.replace(/\{\{(.*?)\}\}/g, (_, expr) => {
      return this._evaluate(expr.trim());
    });
  }

  _evaluate(expr) {
    try {
      with(this.root.data()) {
        return eval(expr);
      }
    } catch (e) {
      console.error(`Ynor compile error: ${expr}`, e);
      return '';
    }
  }
}

module.exports = YnorCore;