# Use an official Node.js runtime as the parent image
FROM node

WORKDIR /app

# Copy package files and install dependencies
COPY package.json pnpm-lock.json ./
RUN pnpm install

# Copy the entire project
COPY . .

# Build the Next.js application
RUN pnpm run build

# Expose port 3008
EXPOSE 3008

# Start Next.js in production mode
CMD ["pnpm", "start"]
