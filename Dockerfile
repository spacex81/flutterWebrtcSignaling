# Use the official Node.js 14 image as a parent image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any dependencies
RUN npm install

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run server.js when the container launches
CMD ["node", "server.js"]
