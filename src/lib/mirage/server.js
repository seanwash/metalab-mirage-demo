import { inflections } from 'inflected';
import { createServer, Model, Factory, trait, hasMany, RestSerializer } from 'miragejs';

inflections('en', function (inflect) {
  inflect.irregular('pokemon', 'pokemon');
});

export function makeServer({ environment = 'test' }) {
  //
  // See: https://miragejs.com/api/classes/server/
  //
  return createServer({
    environment,

    //
    // See: https://miragejs.com/api/classes/serializer/
    //
    serializers: {
      application: RestSerializer,
      pokemon: RestSerializer.extend({
        include: ['types', 'moves'],
        embed: true,
      }),
    },

    //
    // Models define the entities and relationships between them.
    //
    // See: https://miragejs.com/api/classes/model/
    //
    models: {
      move: Model.extend({
        pokemon: hasMany(),
      }),

      pokemon: Model.extend({
        moves: hasMany(),
        types: hasMany(),
      }),

      type: Model.extend({
        pokemon: hasMany(),
      }),
    },

    //
    // See: https://miragejs.com/docs/getting-started/overview/#factories
    //
    factories: {
      move: Factory.extend({
        name(i) {
          return `Move ${i + 1}`;
        },
      }),

      pokemon: Factory.extend({
        baseExperience: 178,
        height: 11,
        weight: 320,

        name(i) {
          return `Pokemon ${i + 1}`;
        },

        withTypes: trait({
          afterCreate(pokemon, server) {
            // Only create new types for this Pokemon if it doesn't already have
            // some. This is useful in the case of tests where the test sets up
            // the data required for the scenario being tested. We don't want to
            // blow away any setup already done.
            if (pokemon.types.length === 0) {
              server.createList('type', 3, { pokemon: [pokemon] });
            }
          },
        }),

        withMoves: trait({
          afterCreate(pokemon, server) {
            server.createList('move', 3, { pokemon: [pokemon] });
          },
        }),
      }),

      type: Factory.extend({
        name(i) {
          return `Type ${i + 1}`;
        },
      }),
    },

    //
    // Seeds are created when `createServer` is called. They are used to populate
    // the initial state of the database so that a user doesn't start from a
    // blank slate every time refresh the page.
    //
    // Note that seeds are not automatically run when `environment` is `test`.
    //
    // See: https://miragejs.com/docs/main-concepts/factories/
    //
    seeds(server) {
      server.createList('pokemon', 20, 'withTypes', 'withMoves');
    },

    //
    // Routes defines the available API routes and methods that are accessible
    // via the client.
    //
    // See: https://miragejs.com/docs/main-concepts/route-handlers/#gatsby-focus-wrapper
    // Note: You can also control the passthrough routes → https://miragejs.com/api/classes/server/#passthrough
    //
    routes() {
      // Configure the namespace to match the production API so that the base
      // API_URL can be swapped via an env variable.
      this.namespace = '/api/v2';

      // Route Handlers → All of the standard REST methods are supported.
      this.get('/pokemon', (schema, request) => {
        // A simple pagination example.
        let page = request.queryParams.page || 1;
        let perPage = 15;
        let end = perPage * page;
        let start = end - perPage;

        return (
          schema.pokemon
            .all()
            // Sort by ID descending. Internally, Mirage stores IDs as strings.
            .sort((a, b) => (parseInt(b.id) > parseInt(a.id) ? 1 : -1))
            .slice(start, end)
        );
      });

      // A POST request handler that creates a new Pokemon with a given request body.
      this.post('/pokemon', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.pokemon.create(attrs);
      });

      // A Resource shorthand also exists.
      this.resource('types', { only: ['index'] });
      // Timing can be used to simulate slow networks.
      this.resource('moves', { only: ['index', 'show'] }, { timing: 2000 });

      this.passthrough();
    },
  });
}
