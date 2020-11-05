FROM node:15.0-alpine as build

# Set timezone
ENV TZ Europe/Paris

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --silent
RUN yarn global add expo-cli

# Copy code
COPY . ./
# Build app
RUN expo build:web

# Production environment
FROM nginx:1.19-alpine

# Copy built app
COPY --from=build /app/web-build /var/www

# Copy all files in docker/ directory
COPY docker /

EXPOSE 80
