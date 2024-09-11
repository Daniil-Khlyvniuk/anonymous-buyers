FROM node:20-alpine

ARG workDir="anonymous-buyers"

WORKDIR /$workDir

COPY ./package*.json /$workDir/

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]
