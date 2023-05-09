const {
  newStore,
  getStore,
  getStoreById,
  getStoresByUserId,
} = require("../controllers/Store");

const StoreRouter = require("express").Router();

StoreRouter.post("/", newStore)
  .get("/", getStore)
  .get("/:store", getStoreById)
  .get("/user/:owner", getStoresByUserId);

module.exports = StoreRouter;
