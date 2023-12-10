FROM nginx:1.23.0-alpine
WORKDIR /app
COPY ./dist/wowUI /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
