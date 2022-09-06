FROM node:16-alpine3.16
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install --force
COPY . /app
EXPOSE 8462
CMD ["npm", "start"]
