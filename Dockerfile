FROM node:12.13.0

WORKDIR /usr/app
COPY package*.json ./
ENV PATH /usr/app/node_modules/.bin:$PATH
RUN npm install -g @angular/cli
RUN npm install -qy
COPY . .

EXPOSE 8081 49153

CMD ["npm", "start"]

