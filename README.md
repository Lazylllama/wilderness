# wilderness
wait.. what is this?

# dev
- We use docker, if you dont want to use docker then you have to figure it out yourself. pretty much just run `docker compose run --rm --service-ports rails-app bin/setup` and everything should just work, you can then run `bin/setup` to setup everything else for you and start the app

- Edit credential files using `EDITOR="vim" rails credentials:edit --environment=development`, you will most likely need to remove the old one and create a new one unless you have the development.key file. This is the format of the credentials file:
    ```yaml
    for_example:
        nothing: true
    ```