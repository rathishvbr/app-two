export default function () {
  // this.urlPrefix = 'http://two.app.localhost:5200';
  // this.namespace = '/api/v1/';

  // Delay responses to simulate network latency
  this.timing = 1000;

  this.get('/songs', (schema, request) => {
    console.log(
      'Token print from mirage********: ',
      request.requestHeaders.Authorization
    );
    if (request.requestHeaders.Authorization) {
      return schema.songs.all();
    } else {
      return new Response(401, {}, { errors: ['Not authorized'] });
    }
  });
  this.get('/users/me', () => {
    return {
      data: {
        id: 1,
        type: 'users',
        attributes: {
          name: 'Rathish',
          email: 'rathishvbr@gmail.com',
          bio: 'Hi there!',
        },
      },
    };
  });
}
