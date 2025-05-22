class Ynor {
  constructor(options) {
    this.el = typeof options.el === 'string' 
      ? document.querySelector(options.el) 
      : options.el;
    this.components = options.components || {};
    this._state = {};
    this._events = {};
    
    // Process the component definition
    this._processComponent(options);
    
    // Initial render
    this._render();
  }

  // Component processing
  _processComponent(component) {
    // Extract template
    if (component.template) {
      this.template = component.template;
    } else if (component.templateId) {
      this.template = document.getElementById(component.templateId).innerHTML;
    }

    // Initialize state
    if (component.data) {
      this._state = this._makeReactive(
        typeof component.data === 'function' 
          ? component.data() 
          : component.data
      );
    }

    // Register methods
    if (component.methods) {
      Object.keys(component.methods).forEach(key => {
        this[key] = component.methods[key].bind(this);
      });
    }

    // Lifecycle hooks
    this._callHook('created');
  }

  // Reactivity system
  _makeReactive(obj) {
    const self = this;
    return new Proxy(obj, {
      get(target, key) {
        return target[key];
      },
      set(target, key, value) {
        target[key] = value;
        self._render();
        return true;
      }
    });
  }

  // Template compilation
  _compileTemplate() {
    let html = this.template;
    
    // Handle components
    html = html.replace(/<([A-Z][a-zA-Z]*)([^>]*)>/g, (match, tagName, attrs) => {
      if (this.components[tagName]) {
        const component = this.components[tagName];
        return `<div data-component="${tagName.toLowerCase()}">${component.template}</div>`;
      }
      return match;
    });

    // Handle directives
    html = html.replace(/\{\{\s*(.*?)\s*\}\}/g, (_, expr) => {
      return this._evaluateExpression(expr);
    });

    // Handle events
    html = html.replace(/@([\w-]+)="([^"]+)"/g, (_, event, handler) => {
      return `${event}="this.__ynorInstance.${handler}(event)"`;
    });

    return html;
  }

  // Expression evaluation
  _evaluateExpression(expr) {
    try {
      with (this._state) {
        return eval(expr);
      }
    } catch (e) {
      console.error(`Error evaluating expression: ${expr}`, e);
      return '';
    }
  }

  // Rendering
  _render() {
    if (!this.el || !this.template) return;
    
    const compiled = this._compileTemplate();
    this.el.innerHTML = compiled;
    this.el.__ynorInstance = this;
    
    // Process components
    this.el.querySelectorAll('[data-component]').forEach(el => {
      const componentName = el.getAttribute('data-component');
      new Ynor({
        el: el,
        ...this.components[componentName]
      });
    });
    
    this._callHook('mounted');
  }

  // Lifecycle management
  _callHook(hook) {
    if (this[hook]) {
      this[hook]();
    }
  }
}
////////////////////////////////////////////// add more functions
class YnorRuntime {
  render(component) {
    const context = {
      ...component.data,
      $emit: (event, ...args) => {
        // Handle events
      }
    };
    
    // Simple template interpolation
    return component.template.replace(/\{\{(.*?)\}\}/g, (_, expr) => {
      try {
        with(context) return eval(expr.trim());
      } catch {
        return '';
      }
    });
  }
}

module.exports = YnorRuntime;
//////////////////////////////////////////////
// Global registration
window.Ynor = Ynor;