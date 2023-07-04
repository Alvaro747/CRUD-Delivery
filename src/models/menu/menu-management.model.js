const path = require("path");
const BaseModel = require(path.resolve(
  path.dirname(require.main.filename),
  "src/models/base/base.model"
));

/**
 * @swagger
 * components:
 *    schemas:
 *      Menu:
 *        type: object
 *        required:
 *          - name
 *        properties:
 *          id:
 *            type: string
 *            description: Menu id.               
 *          name:
 *            type: string
 *            description: Menu Name .
 *          description:
 *            type: string
 *            description: Menu description.
 *          price:
 *            type: number
 *            description: Menu price.
 *          category:
 *            type: string
 *            description: Menu Category.
 *          items:
 *            type: array
 *            description: Menu Items.
 *        example:
 *            id: ""
 *            name: "combo 1"
 *            description: "combo de hamburguesa con papas y gaseosa"
 *            price: 20000
 *            category: "fast food"
 *            items: [""]           
 */
class MenuManagementModel extends BaseModel {
  constructor(args, dependencies) {
    if (!args || !dependencies) {
      throw new Error("Required args and dependencies to build this entity");
    }

    super(dependencies);

    /* Base Properties */
    this._dependencies = dependencies;
    this._utilities = this._dependencies.utilities;
    this._dataTypesManager = this._dependencies.DataTypesManager;

    /* Custom Properties */
    this._types = this._dataTypesManager.types;

    /* Assigments */
    const timestamp = this._utilities.generator.time.timestamp();

    /* Base Properties */
    this.last_modification = { value: timestamp, type: this._types.timestamp };
    this.id = { value: args.id, type: this._types.bigserial, isPK: true };
    this.date_creation = { value: timestamp, type: this._types.timestamp };
    this.last_user_modification = {
      value: args.user_id,
      type: this._types.object,
    };
    this.status = {
      value: args.status || MenuManagementModel.statuses.active,
      type: this._types.object,
    };

    /* Custom fields */
    this.name = { value: args.name, type: this._types.string };
    this.description = { value: args.description, type: this._types.string };
    this.price = { value: args.price, type: this._types.number };
    this.category = { value: args.category, type: this._types.string };
    this.items = { value: args.items, type: this._types.array };
  }

  // Return entity sanitized
  get sanitized() {
    return {
      id: this.id.value || this.id.type.default,
      name: this.name.value || this.name.type.default,
      items: this.items.value || this.items.type.default,
      price: this.price.value || this.price.type.default,
    };
  }

  get get() {
    return {
      id: this.id.value || this.id.type.default,
      date_creation:
        this.date_creation.value || this.date_creation.type.default,
      last_modification:
        this.last_modification.value || this.last_modification.type.default,
      last_user_modification:
        this.last_user_modification.value ||
        this.last_user_modification.type.default,
      status: this.status.value || this.status.type.default,
      name: this.name.value || this.name.type.default,
      description: this.description.value || this.description.type.default,
      price: this.price.value || this.price.type.default,
      category: this.category.value || this.category.type.default,
      items: this.items.value || this.items.type.default,
    };
  }
}

MenuManagementModel.statuses = {
  inactive: { id: 1, name: "inactive", title: "Inactive" },
  active: { id: 2, name: "active", title: "Active" },
  deleted: { id: 999, name: "deleted", title: "Deleted" },
};

module.exports = MenuManagementModel;
