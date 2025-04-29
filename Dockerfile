# Giai đoạn build: sử dụng Node.js để build React app
FROM node:18 AS build

# Thư mục làm việc trong container
WORKDIR /app

# Cài dependencies
COPY package*.json ./
RUN npm install

# Copy toàn bộ source code và build project
COPY . .
RUN npm run build

# Giai đoạn production: dùng Nginx để serve app
FROM nginx:alpine

# Copy build React vào thư mục public của Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Thêm cấu hình Nginx để hỗ trợ React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Mở port 80
EXPOSE 80

# Khởi chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
