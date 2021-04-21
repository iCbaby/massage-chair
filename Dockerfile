FROM node:14-alpine

# 安装pm2的插件webshell，方便在容器外直接管理node和pm2
RUN npm install -g pm2@latest
# && pm2 install pm2-webshell
# RUN pm2 conf pm2-webshell:username digital && pm2 conf pm2-webshell:password digital

ADD . /app
WORKDIR /app

RUN npm install --registry=https://registry.npm.taobao.org

EXPOSE 3000

ENTRYPOINT npm run prod && tail -f /dev/null