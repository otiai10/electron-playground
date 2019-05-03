
class SearchService {
  constructor(tokens) {
    this.accessToken = tokens.access_token;
    this.refreshToken = tokens.refresh_token; 
    this.scope = tokens.scope;
    this.tokenType = tokens.token_type;
    this.expiryDate = tokens.expiry_date;
  }
  search(query) {
    const url = new URL('https://www.googleapis.com/youtube/v3/search');
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('q', query);
    return fetch(url.toString(), {
      headers: {
        Authorization: `${this.tokenType} ${this.accessToken}`,
      },
    });
  }
}

module.exports = SearchService;
