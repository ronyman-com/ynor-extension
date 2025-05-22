const jsdom = require('jsdom');
const { JSDOM } = jsdom;

class YnorTestUtils {
  static render(component) {
    const dom = new JSDOM(`<!DOCTYPE html><div id="app"></div>`);
    global.window = dom.window;
    global.document = dom.window.document;

    const app = new YnorCore().createApp(component);
    app.mount('#app');
    return dom;
  }

  static simulate(event, element) {
    const evt = new window.Event(event);
    element.dispatchEvent(evt);
  }
}

module.exports = YnorTestUtils;