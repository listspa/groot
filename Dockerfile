FROM nginx
COPY ./dist/groot-tester /usr/share/nginx/html/groot-doc/
EXPOSE 80
