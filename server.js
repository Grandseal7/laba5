import express from "express";
import cors from "cors";

import productsRouter from "./routes/products.js";
import ordersRouter from "./routes/orders.js";
import { logger } from "./middleware/logger.js";

const app = express();

const PORT = 3000;

// CORS для React
app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.use(logger);

app.use("/api/products", productsRouter);

app.use("/api/orders", ordersRouter);

// Главная страница
app.get("/", (req, res) => {
  res.send("АгроМаркет API работает");
});

// Проверка сервера
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString()
  });
});

// Информация о проекте
app.get("/api/about", (req, res) => {
  res.json({
    name: "АгроМаркет",
    version: "1.0",
    author: "Салимжан Галымбек"
  });
});

// 404 для неизвестных маршрутов
app.use((req, res) => {
  res.status(404).json({
    error: `Маршрут ${req.method} ${req.originalUrl} не найден`
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`API запущен: http://localhost:${PORT}`);
});