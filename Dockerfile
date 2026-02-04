# 1. Base image
FROM node:20

# 2. Set working directory
WORKDIR /app

# 3. Copy package files
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy project files
COPY . .

# 6. Build Prisma client (در صورت استفاده از TS یا migration)
RUN npx prisma generate

# 7. Expose port
EXPOSE 3000

# 8. Run the app
CMD ["npm", "run", "start:dev"]
