# Build stage
FROM node:20-buster-slim

WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the entire application
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN yarn build

# Copy Prisma schema and migrations
COPY src/database/prisma/schema.prisma ./prisma/schema.prisma
COPY src/database/prisma/migrations ./prisma/migrations

# Production stage
FROM node:alpine

WORKDIR /usr/src/app

# Copy built node modules and compiled code
COPY --from=build-stage /usr/src/app/node_modules ./node_modules
COPY --from=build-stage /usr/src/app/dist ./dist

# Expose the port the app runs on
EXPOSE 3011

# Command to run the app
CMD ["sh", "-c", "npx prisma migrate deploy --schema=./prisma/schema.prisma && node dist/index.js"]

