FROM artifactory.list-group.com/isp/libs/docker-img-maven-node/java8-node10-chrome as builder
WORKDIR /app
COPY package.json /app/package.json
RUN http_proxy="http://192.168.232.108:8080/" https_proxy="http://192.168.232.108:8080/" npm_config_registry="https://artifactory.list-group.com/artifactory/api/npm/npm/" npm install --verbose
COPY . /app
RUN npm run build-demo-app

FROM nginx
COPY --from=builder /app/dist/groot-tester /usr/share/nginx/html/groot-doc/
EXPOSE 80
