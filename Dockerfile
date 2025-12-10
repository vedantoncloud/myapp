# Use official Node image
FROM node:18-alpine

# App working directory
WORKDIR /usr/src/app

# Copy package files first
COPY package*.json ./

# Install ONLY production dependencies (faster, cleaner)
RUN npm ci --only=production

# Copy all source code
COPY . .

# Expose port (important for Render)
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
