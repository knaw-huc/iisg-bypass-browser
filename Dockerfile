FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.29.1-alpine AS runtime
COPY deployment/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY deployment/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
