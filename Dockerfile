# Build stage
FROM node:18

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy Prisma schema and generate Prisma Client
COPY src/database/prisma ./src/database/prisma
RUN npx prisma generate

# Copy the rest of your application
COPY . .

# Build the application
RUN yarn build
COPY src/database/prisma/schema.prisma dist/database/prisma/schema.prisma
COPY src/database/prisma/migrations dist/database/prisma/migrations

# Production stage
FROM node:alpine

WORKDIR /usr/src/app

# Copy built node modules and compiled code
COPY --from=build-stage /usr/src/app/node_modules ./node_modules
COPY --from=build-stage /usr/src/app/dist ./dist

# Expose the port the app runs on
EXPOSE 3011

# Command to run the app
CMD [ "node", "dist/index.js" ]
