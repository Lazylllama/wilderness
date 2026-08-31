# wilderness
Very early-stage YSWS platform.

# Features
- Landing page
  - Release flipper
  - Shop items form DB
  - uhh falling snow
  - very awesome buttons
- [Figma design ](https://www.figma.com/design/6zIEr8D7Dbz9ZpEBS3gJHy/foresty-forest?node-id=0-1&t=cWC6XEYNkyK3rPly-1) [ts like 60% of the work]
- Alerts
- Hopes and prayers

# dev
- We use docker, if you dont want to use docker then you have to figure it out yourself. pretty much just run `docker compose run --rm --service-ports rails-app bin/setup` and everything should just work, you can then run `bin/setup` to setup everything else for you and start the app

- Edit credential files using `EDITOR="vim" rails credentials:edit --environment=development`, you will most likely need to remove the old one and create a new one unless you have the development.key file. This is the format of the credentials file:
    ```yaml
    for_example:
        nothing: true
    ```

# deploy
linux w/ domain:
```sh
git clone <this repo> && cd wilderness
cp .env.production.example .env.production   # fill it in, the comments say how
docker compose --env-file .env.production -f compose.prod.yml up -d --build
```

- update: `git pull` then the same `up -d --build`
- logs: `docker compose -f compose.prod.yml logs -f app`
- console: `docker compose -f compose.prod.yml exec app bin/rails console`

alr running nginx/Caddy? see `compose.prod.yml`.

# contributing
- use `bin/lint` to lint :)