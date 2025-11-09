#stage1 : compile and build angular code base

#pull node official image and rename it
FROM node:latest as build

#set working directry
WORKDIR /home/pupil/Desktop/TCS_Angular/task-manager

#add source code
COPY ./ /home/pupil/Desktop/TCS_Angular/task-manager

#install all dependencies
RUN  npm install

#build the code
RUN npm run build

#stage2: serve app with Nginx server

#pull nginx
FROM nginx:latest

#copy build output
COPY --from=build /home/pupil/Desktop/TCS_Angular/task-manager/dist/task-manager/browser /usr/share/nginx/html

#expose port 80
EXPOSE 80