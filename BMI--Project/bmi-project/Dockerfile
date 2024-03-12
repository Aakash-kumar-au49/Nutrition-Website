FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
# Ensure vite is installed locally
#RUN npm install vite
RUN npm install vite --save-dev
Copy . .
EXPOSE 5173
CMD ["npm,""run","dev"]


