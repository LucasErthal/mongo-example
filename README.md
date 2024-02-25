# Mongo project for tests

This project is my first try creating an backend using MongoDB + GraphQL, I will add random things that I'm studying and/or think its interesting

## How run it
The project runs using docker, so if you don't have docker installed, look on the <a href="https://docs.docker.com/desktop/" target="_blank">official documentation</a> to install it.

### Development mode:
1. Run docker compose -d && yarn dev
2. If everything is ok, this message should appear:
3. ![image](https://github.com/LucasErthal/mongo-example/assets/57104379/786bfa8e-ff24-4a70-872a-9ea43f4eeff5)
4. Doing a CTRL + left click on the url, this screen should appear and you're good to test it ![image](https://github.com/LucasErthal/mongo-example/assets/57104379/abb3064a-edfc-4a26-b954-9809a070ca7a)

### Prod mode:
1. Run docker compose -f docker-compose-prod.yml up -d, docker image will be builded and run the container automatically
2. You can access the same link as dev mode (http://localhost:3000/) and test it.
