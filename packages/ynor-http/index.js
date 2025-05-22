class YnorHttp {
  constructor(baseURL = '') {
    this.baseURL = baseURL;
    this.interceptors = {
      request: [],
      response: []
    };
  }

  async request(config) {
    // Apply request interceptors
    let requestConfig = config;
    for (const interceptor of this.interceptors.request) {
      requestConfig = await interceptor(requestConfig);
    }

    const url = new URL(requestConfig.url, this.baseURL);
    const response = await fetch(url, {
      method: requestConfig.method || 'GET',
      headers: requestConfig.headers,
      body: requestConfig.data ? JSON.stringify(requestConfig.data) : null
    });

    let responseData = await response.json();

    // Apply response interceptors
    for (const interceptor of this.interceptors.response) {
      responseData = await interceptor(responseData);
    }

    return {
      data: responseData,
      status: response.status,
      headers: response.headers
    };
  }

  get(url, config = {}) {
    return this.request({ ...config, url, method: 'GET' });
  }

  post(url, data, config = {}) {
    return this.request({ ...config, url, method: 'POST', data });
  }
}

module.exports = YnorHttp;