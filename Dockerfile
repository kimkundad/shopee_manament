FROM node:18.14.1-alpine
WORKDIR /app
COPY package.json ./
COPY ./ ./
RUN npm config set legacy-peer-deps true
RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]