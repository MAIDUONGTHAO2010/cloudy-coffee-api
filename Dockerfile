# Use the official Node.js image
FROM node:20.14.0

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the NestJS app
RUN npm run build

ARG PORT
ENV PORT=${PORT}

# Start the app
CMD ["npm", "run", "dev"]
