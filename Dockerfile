# Base image
FROM node:18

# Install pnpm
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

# Create app directory
WORKDIR /usr/src/app

ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_USERNAME=${DB_USERNAME}
ENV DB_NAME=${DB_NAME}
ENV DB_PORT=${DB_PORT}

ENV DATABASE_URL=${DATABASE_URL}
ENV JWT_SECRET=${JWT_SECRET}

COPY --chown=node:node prisma ./prisma

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./

# Install app dependencies
RUN pnpm install
RUN npx prisma generate

# Bundle app source
COPY --chown=node:node . .

# Creates a "dist" folder with the production build
RUN pnpm build

# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]