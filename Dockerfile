# Use a node image to build the frontend
FROM node:latest

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the code
COPY . .

# Build the project
RUN yarn build

# Serve the static files (if using something like Nginx or Serve)
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]
