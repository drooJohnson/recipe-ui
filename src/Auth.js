import auth0 from 'auth0-js';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'dev-hj1-xsr0.us.auth0.com',
      clientID: 'RqIKX8kRTMKjj7kwhZpCfjOK9yFcYvPj',
      redirectUri: 'http://localhost:3030/callback',
      audience: 'https://dev-hj1-xsr0.us.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid email'
    });

    this.authFlag = 'isLoggedIn'
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  getIdToken() {
    return this.idToken;
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      })
    })
  }

  setSession(authResult) {
    this.idToken = authResult.idToken;
    localStorage.setItem(this.authFlag, JSON.stringify(true));
  }

  logout() {
    localStorage.setItem(this.authFlag, JSON.stringify(false));
    this.auth0.logout({
      returnTo: 'http://localhost:3030',
      clientID: 'RqIKX8kRTMKjj7kwhZpCfjOK9yFcYvPj',
    });
  }

  silentAuth() {
    if(this.isAuthenticated()) {
      return new Promise((resolve, reject) => {
        this.auth0.checkSession({}, (err, authResult) => {
          if (err) {
            localStorage.removeItem(this.authFlag);
            return reject(err);
          }
          this.setSession(authResult);
          resolve();
        });
      });
    }
  }

  isAuthenticated() {
    console.log(this);
    return JSON.parse(localStorage.getItem(this.authFlag));
    //return new Date().getTime() < this.expiresAt;
  }
}

const auth = new Auth();

export default auth;
