import { InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
/*  typePolicies: {
    Query: {
      fields: {
        recipes: {
          keyArgs: false,
          merge(existing, incoming) {
            let recipes = [];
            if (existing && existing.recipes) {
              recipes = recipes.concat(existing.recipes);
            }
            if (incoming && incoming.recipes) {
              recipes = recipes.concat(incoming.recipes);
            }
            return {
              ...incoming,
              recipes
            };
          }
        }
      }
    }
  }*/
});
