FROM node:13.12.0-alpine
RUN apk update && apk upgrade && apk add --no-cache bash git openssh gcc libc-dev
WORKDIR /app
COPY . .
RUN npm install --silent
EXPOSE 3000 
CMD ["node", "index.js"]
