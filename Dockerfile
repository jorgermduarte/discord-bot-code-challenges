FROM node:16

# create the directory inside the container
WORKDIR /discord_bot_moriarty

# copy the generated modules and all other files to the container
COPY . .

# run npm install in our local machine
RUN npm install --silent

EXPOSE ${APP_PORT}