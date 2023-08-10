const { allRoutes } = require("./router/router");

module.exports = class Application {
  #express = require("express");
  #App = this.#express();
  constructor(PORT, DB_URL) {
    this.configDatabase(DB_URL);
    this.configApplication();
    this.createServer(PORT);
    this.configRoutes();
    this.errorHandler();
  }

  configApplication() {
    const path = require("path");
    this.#App.use(this.#express.json());
    this.#App.use(this.#express.urlencoded({ extended: true }));
    this.#App.use(this.#express.static(path.join(__dirname, "..", "public")));
  }

  createServer(PORT) {
    const http = require("http");
    const server = http.createServer(this.#App);
    server.listen(PORT, () => {
      console.log(`Server is run on http://localhost:${PORT}`);
    });
  }

  configDatabase(DB_URL) {
    const mongoose = require("mongoose");
    mongoose.connect(DB_URL);
    console.log("successfully connected to MongoDB");
  }

  errorHandler() {
    this.#App.use((req, res, next) => {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "صفحه با آدرس مورد نظر یافت نشد.",
      });
    });
    this.#App.use((error, req, res, next) => {
      const status = error?.status || 500;
      const message = error?.message || "Internal Server Error";
      return res.status(status).json({
        status,
        success: false,
        message,
      });
    });
  }

  configRoutes() {
    this.#App.get("/", (req, res) => {
      return res.json({ message: "welcome to my new app" });
    });
    const catchAllRoutes=(err,req,res,next)=>{
      try {
        this.#App.use("/api/v1", allRoutes);
      } catch (error) {
        next(err)
      }
    }
    catchAllRoutes();
  }
};
