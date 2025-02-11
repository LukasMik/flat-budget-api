# Using Node.js version 22 as the base image
FROM node:22

# Setting the working directory in the container
WORKDIR /app

# Copying package.json and pnpm-lock.yaml into the container
COPY package.json pnpm-lock.yaml ./

# Installing dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copying the entire application code into the container
COPY . .

# Exposing port 3000
EXPOSE 3000

# Starting the application
CMD ["pnpm", "start"]