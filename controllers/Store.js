const Store = require("../models/Store");
const slugify = require("slugify");

module.exports = {
  newStore: async (req, res) => {
    try {
      const { name, description, socials, owner } = req.body;

      const subdomain = slugify(name, {
        remove: /[*+~.()'"!:@]/g,
      }).toLowerCase();

      const data = {
        name,
        subdomain,
        description,
        // @note socials must be a url in middleware
        socials,
        owner,
      };

      const store = new Store(data);
      store.save();
      res.status(200).json({ store, message: "Store Saved" });
    } catch (error) {
      if (error?.code === 11000) {
        res.status(400).send("Shop Name Already Exist");
      }
    }
  },

  getStore: async (req, res) => {
    const sort = "-createdAt";
    // const sort = req.query.sort || "-createdAt";
    // const limit = parseInt(req.query.limit) || 10;
    const limit = 10;
    const skip = 0;
    // const skip = parseInt(req.query.skip) || 0;
    const filters = {
      createdAt: {
        $gte: new Date("2022-01-01"),
        // $gte: new Date(req.query.fromDate) || new Date("2022-01-01"),
        $lte: new Date(),
        // $lte: new Date(req.query.toDate) || new Date(),
      },
    };

    const store = await Store.find(filters).sort(sort).skip(skip).limit(limit);
    res.status(200).json({ store });
  },

  getStoreById: async (req, res) => {
    try {
      const { store } = req.params;

      const sort = "-createdAt";
      // const sort = req.query.sort || "-createdAt";
      // const limit = parseInt(req.query.limit) || 10;
      const limit = 10;
      const skip = 0;
      // const skip = parseInt(req.query.skip) || 0;
      const filters = {
        subdomain: store,
        createdAt: {
          $gte: new Date("2022-01-01"),
          // $gte: new Date(req.query.fromDate) || new Date("2022-01-01"),
          $lte: new Date(),
          // $lte: new Date(req.query.toDate) || new Date(),
        },
      };

      const _store = await Store.findOne(filters)
        .sort(sort)
        .skip(skip)
        .limit(limit);

      res.status(200).json({
        store: _store,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getStoresByUserId: async (req, res) => {
    const { owner } = req.params;
    const sort = "-createdAt";
    // const sort = req.query.sort || "-createdAt";
    // const limit = parseInt(req.query.limit) || 10;
    const limit = 10;
    const skip = 0;
    // const skip = parseInt(req.query.skip) || 0;
    const filters = {
      owner: owner,
      createdAt: {
        $gte: new Date("2022-01-01"),
        // $gte: new Date(req.query.fromDate) || new Date("2022-01-01"),
        $lte: new Date(),
        // $lte: new Date(req.query.toDate) || new Date(),
      },
    };

    const stores = await Store.find(filters).sort(sort).skip(skip).limit(limit);

    res.status(200).json({ stores, message: "Stores retrieved successfully" });
  },
  updateStore: async (req, res) => {
    try {
      const { store } = req.params;
      const update = req.body;

      const _store = await Store.findOneAndUpdate(
        { subdomain: store },
        { $set: update },
        { new: true }
      );
      res.status(200).json({
        store: _store,
        message: "Store updated successfully",
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  deleteStore: async (req, res) => {
    try {
      const { store } = req.params;

      const _store = await Store.findOneAndDelete({ subdomain: store });
      res.status(200).json({
        store: _store,
        message: "Store deleted successfully",
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
