# Chọn image Node.js chính thức để build
FROM node:18 AS build

# Set thư mục làm việc trong container
WORKDIR /app

# Copy toàn bộ source code vào container
COPY package*.json ./
RUN npm install

COPY . .

# Build project React
RUN npm run  build

# Giai đoạn production: sử dụng Nginx để serve app
FROM nginx:alpine

# Copy build từ giai đoạn trước vào Nginx public folder
COPY --from=build /app/build /usr/share/nginx/html

# Copy file cấu hình nginx nếu có
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
