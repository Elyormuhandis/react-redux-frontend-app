FROM node:16.16.0-alpine3.16
WORKDIR /app
COPY yarn.lock yarn-error.log package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
