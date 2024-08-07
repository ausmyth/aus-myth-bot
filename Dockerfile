# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and yarn.lock files
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files
COPY . .

# Install ts-node globally
RUN yarn global add ts-node typescript

# Set environment variables
# (Assuming .env file is needed, copy it to the working directory)
COPY .env ./

# Expose the port your app runs on (if applicable)
# EXPOSE 3000

# Command to run your application
CMD ["yarn", "start"]