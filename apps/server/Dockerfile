# install stage
FROM node:current

WORKDIR /app

# copy the JSON files
COPY out/json .

# copy the yarn lock
COPY out/yarn.lock .

# install the packages
RUN yarn install

# copy the rest of the package over
COPY out/full .

# build the app
RUN npx turbo run build --scope=server --include-dependencies --no-deps

CMD PORT=3000 npx turbo run start --scope=server

EXPOSE 3000
