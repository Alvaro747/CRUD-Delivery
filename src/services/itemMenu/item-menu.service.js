class ItemMenuService {
  constructor(dependencies) {
    /* Base Properties */
    this._dependencies = dependencies;
    this._db = dependencies.db;
    this._models = dependencies.models;
    this._utilities = dependencies.utilities;
    this._console = this._dependencies.console;
    this._services = this._dependencies.services;

    /* Custom Properties */
    /* this._myPrivateProperty = 'Some value' */
    this._tableName = "item_menu";

    /* Assigments */
    /* this._newPrivateObject = new SomeObject(this._dependencies) */
  }

  async create(data) {
    try {
      if (!data || !data.name) {
        return this._utilities.io.response.error("Please provide all data");
      }

      data.id = this._utilities.generator.id({
        length: 15,
        prefix: "item_menu-",
      });

      const entity = new this._models.ItemMenuManagementModel(
        data,
        this._dependencies
      );
      const transactionResponse = await this._db.transaction.create({
        tableName: this._tableName,
        entity: entity.get,
      });

      if (!transactionResponse) {
        this._console.error(transactionResponse);
        return this._utilities.io.response.error();
      }

      return this._utilities.io.response.success(entity.sanitized);
    } catch (error) {
      this._console.error(error);
      return this._utilities.io.response.error();
    }
  }

  async update(data) {
    try {
      if (!data || !data.id) {
        return this._utilities.io.response.error("Please provide an id");
      }

      const transactionResponse = await this._db.transaction.update({
        tableName: this._tableName,
        entity: data,
      });

      if (!transactionResponse) {
        this._console.error(transactionResponse);
        return this._utilities.io.response.error();
      }

      return this._utilities.io.response.success(data);
    } catch (error) {
      this._console.error(error);
      return this._utilities.io.response.error();
    }
  }

  async delete(data) {
    data.status = this.status.deleted // assign the deleted property to the item menu
    try {
      if (!data || !data.id) {
        return this._utilities.io.response.error("Please provide an id");
      }

      const transactionResponse = await this._db.transaction.update({
        tableName: this._tableName,
        entity: data,
      });

      if (!transactionResponse) {
        this._console.error(transactionResponse);
        return this._utilities.io.response.error();
      }

      return this._utilities.io.response.success(data);
    } catch (error) {
      this._console.error(error);
      return this._utilities.io.response.error();
    }
  }

  async get(data) {
    try {
      if (!data || !data.queryselector) {
        return this._utilities.io.response.error(
          "Please provide a queryselector"
        );
      }

      let response = {};

      switch (data.queryselector) {
        case "id":
          response = await this.#getById(data);
          if (response.result[0].status.name === "deleted") {
            response = this._utilities.io.response.error(
              "The item was removed from the database"
            );
          }
          break;
        case "PROPERTY":
          response = await this.#getByPROPERTY(data);
          break;
        default:
          response = this._utilities.io.response.error(
            "Provide a valid slug to query"
          );
          break;
      }

      return response;
    } catch (error) {
      this._console.error(error);
      return this._utilities.io.response.error();
    }
  }

  async #getById(data) {
    try {
      if (!data || !data.search) {
        return this._utilities.io.response.error(
          "Please provide query to search"
        );
      }

      return this.#getByFilters({
        filters: [{ key: "id", operator: "==", value: data.search }],
      });
    } catch (error) {
      this._console.error(error);
      return this._utilities.io.response.error();
    }
  }

  async #getByPROPERTY(data) {
    try {
      if (!data || !data.search) {
        return this._utilities.io.response.error(
          "Please provide query to search"
        );
      }

      return this.#getByFilters({
        filters: [{ key: "PROPERTY", operator: "==", value: data.search }],
      });
    } catch (error) {
      this._console.error(error);
      return this._utilities.io.response.error();
    }
  }

  async #getByFilters(data) {
    try {
      if (!data || !data.filters) {
        return this._utilities.io.response.error(
          "Please provide at least one filter"
        );
      }

      const transactionResponse = await this._db.transaction.getByFilters({
        tableName: this._tableName,
        filters: data.filters,
      });

      return this._utilities.io.response.success(transactionResponse);
    } catch (error) {
      this._console.error(error);
      return this._utilities.io.response.error();
    }
  }

  get status() {
    return this._models.ItemMenuManagementModel.statuses;
  }
}

module.exports = ItemMenuService;
