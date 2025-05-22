class YnorCompiler {
  compile(source) {
    // Parse the .ynor file structure
    const templateMatch = source.match(/<template>([\s\S]*?)<\/template>/);
    const scriptMatch = source.match(/<script>([\s\S]*?)<\/script>/);
    const styleMatch = source.match(/<style>([\s\S]*?)<\/style>/);

    if (!templateMatch) {
      throw new Error('No template found in .ynor file');
    }

    const template = templateMatch[1].trim();
    const script = scriptMatch ? scriptMatch[1].trim() : 'export default {}';
    const styles = styleMatch ? styleMatch[1].trim() : '';

    // Generate the output code
    const output = `
      ${script}
      const __template = ${JSON.stringify(template)};
      const __styles = ${JSON.stringify(styles)};
      
     
      if (__styles) {
        const styleEl = document.createElement('style');
        styleEl.textContent = __styles;
        document.head.appendChild(styleEl);
      }
      
      
      export const render = (el, data) => {
        const runtime = new (require('ynor-runtime'))();
        el.innerHTML = runtime.render({
          ...exports.default,
          template: __template,
          data
        });
      };
      
     
      export default {
        ...exports.default,
        template: __template,
        styles: __styles
      };
    `;

    return {
      code: output,
      map: null // Add source map generation if needed
    };
  }
}

module.exports = YnorCompiler;