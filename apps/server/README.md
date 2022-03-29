# Express Server

## npm scripts

- `dev`: run a dev server that automatically restarts on file changes
- `build`: build the TypeScript into JavaScript, this should usually only be called using the `turbo` cli so that dependencies are also built.
- `start`: run the built javascript from the build output

The `dev` and `start` scripts both load `.env` files in using the `dotenv` require method, see [here](https://github.com/motdotla/dotenv#preload) for details.

The `dev` script uses `tsconfig-paths` to enable support for the `paths` feature of `tsconfig` in `ts-node-dev`. See [here](https://medium.com/@fmoessle/typescript-paths-with-ts-node-ts-node-dev-and-jest-671deacf6428) for details.
