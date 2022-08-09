export default function (server) {
  server.createList('song', 10);
  server.get('/songs', (schema, request) => {
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
  server.get('/users/me', () => {
    return {
      data: {
        id: 1,
        type: 'users',
        attributes: {
          name: 'Rathish',
          email: 'rathishvbr@gmail.com',
          bio: 'I am a Senior Software Engineer',
        },
      },
    };
  });
}
