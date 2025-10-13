# ---- Build ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Declara args para Vite:
ARG VITE_STAGE
ARG VITE_API_URL
ARG VITE_PUBLIC_API_URL
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_PUBLISHABLE_OR_ANON_KEY
# Expórtalas como ENV para que Vite las lea en npm run build
ENV VITE_STAGE=${VITE_STAGE}
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_PUBLIC_API_URL=${VITE_PUBLIC_API_URL}
ENV VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
ENV VITE_SUPABASE_PUBLISHABLE_OR_ANON_KEY=${VITE_SUPABASE_PUBLISHABLE_OR_ANON_KEY}
RUN npm run build

# ---- Runtime ----
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]