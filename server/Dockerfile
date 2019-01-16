# FROM node:8
# WORKDIR /usr/src/app

# COPY package*.json ./
# RUN npm install
# COPY ./ ./

# EXPOSE 5000
# # RUN apt-get update && apt install -y expect 
# CMD ["npm" , "run" , "server"]



# FROM nginx:alpine
# COPY ./build /usr/share/nginx/html/
# # COPY nginx.conf /etc/nginx/nginx.conf
# EXPOSE 80
# ENTRYPOINT ["nginx","-g","daemon off;"]


FROM nginx:alpine
COPY ./nginx/conf.d/nginx.conf /etc/nginx/nginx.conf
COPY ./build /usr/share/nginx/html/
# COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80   
ENTRYPOINT ["nginx","-g","daemon off;"]

