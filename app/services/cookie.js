import Service from '@ember/service';
import ENV from 'app-one/config/environment';

export default class CookieService extends Service {
  getCookie(cname) {
    // Support for testing
    if (ENV.environment === 'test') {
      return 'test-token';
    }
    let name = cname + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  clearCookie() {
    document.cookie.split(';').forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(
          /=.*/,
          '=;expires=' +
            new Date().toUTCString() +
            ';Path=/;Domain=.app.localhost;'
        );
    });
  }

  logout() {
    this.clearCookie();
    window.open(ENV.appOne.url, '_self');
  }

  handleAuthentication() {
    // Support for testing
    if (ENV.environment === 'test') {
      return true;
    }
    if (!this.getToken()) {
      window.open(ENV.appOne.url, '_self');
    }
  }

  getToken() {
    return this.getCookie('access_token') || '';
  }
}
