# Stage 1: build static project ./dist

FROM node as builder

WORKDIR /usr/src/app

ARG API_URL

ENV API_URL=${API_URL}

COPY ./package.json .

RUN yarn install

COPY . .

RUN yarn run build
#  ----------------------------------------------------------------

# Stage 2: serve static project with nginx
FROM nginx:alpine

COPY --from=builder /usr/src/app/dist  /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;"]
# ----------------------------------------------------------------