# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files
COPY . .

# Display the contents of the interactionCreate.ts file for debugging
RUN cat src/listeners/interactionCreate.ts

# Compile TypeScript to JavaScript
RUN yarn build

# Expose the port your app runs on (if applicable)
# EXPOSE 3000

# Command to run your application
CMD ["node", "dist/Bot.js"]
