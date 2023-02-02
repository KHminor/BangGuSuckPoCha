FROM node:18.12.1 as build-stage
WORKDIR /var/jenkins_home/workspace/deploytest/rtc-server
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]