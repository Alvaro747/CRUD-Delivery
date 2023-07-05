const path = require('path')
const BaseModel = require(path.resolve(path.dirname(require.main.filename), 'src/models/base/base.model'))

/**
 * @swagger
 * components:
 *    schemas:
 *      Order:
 *        type: object
 *        required:
 *          - address
 *        properties:
 *          id:
 *            type: string
 *            description: Order id.
 *          firstname:
 *            type: string
 *            description: Client Name .
 *          lastname:
 *            type: string
 *            description: Client last Name.
 *          address:
 *            type: string
 *            description: Client address.
 *          description:
 *            type: string
 *            description: Client description.
 *          menu:
 *            type: array
 *            description: menu ordered by the client.
 *        example:
 *            id: ""
 *            firstname: "alvaro"
 *            lastname: "Bernal"
 *            address: "123 Main Street"
 *            description: "deliver at reception"
 *            menu: [""]
 */
class OrderManagementModel extends BaseModel {
  constructor (args, dependencies) {
    if (!args || !dependencies) {
      throw new Error('Required args and dependencies to build this entity')
    }

    super(dependencies)

    /* Base Properties */
    this._dependencies = dependencies
    this._utilities = this._dependencies.utilities
    this._dataTypesManager = this._dependencies.DataTypesManager

    /* Custom Properties */
    this._types = this._dataTypesManager.types

    /* Assigments */
    const timestamp = this._utilities.generator.time.timestamp()

    /* Base Properties */
    this.last_modification = { value: timestamp, type: this._types.timestamp }
    this.id = { value: args.id, type: this._types.bigserial, isPK: true }
    this.date_creation = { value: timestamp, type: this._types.timestamp }
    this.last_user_modification = {
      value: args.user_id,
      type: this._types.object
    }
    this.status = { value: args.status || OrderManagementModel.statuses.active, type: this._types.object }

    /* Custom fields */
    this.firstname = { value: args.firstname, type: this._types.string }
    this.lastname = { value: args.lastname, type: this._types.string }
    this.address = { value: args.address, type: this._types.string }
    this.description = { value: args.description, type: this._types.string }
    this.menu = { value: args.menu, type: this._types.array }
  }

  // Return entity sanitized
  get sanitized () {
    return {
      id: this.id.value || this.id.type.default,
      firstname: this.firstname.value || this.firstname.type.default,
      lastname: this.lastname.value || this.lastname.type.default,
      address: this.address.value || this.address.type.default,
      description: this.description.value || this.description.type.default,
      menu: this.menu.value || this.menu.type.default
    }
  }

  get get () {
    return {
      id: this.id.value || this.id.type.default,
      date_creation: this.date_creation.value || this.date_creation.type.default,
      last_modification: this.last_modification.value || this.last_modification.type.default,
      last_user_modification: this.last_user_modification.value || this.last_user_modification.type.default,
      status: this.status.value || this.status.type.default,
      firstname: this.firstname.value || this.firstname.type.default,
      lastname: this.lastname.value || this.lastname.type.default,
      address: this.address.value || this.address.type.default,
      description: this.description.value || this.description.type.default,
      menu: this.menu.value || this.menu.type.default
    }
  }
}

OrderManagementModel.statuses = {
  inactive: { id: 1, name: 'inactive', title: 'Inactive' },
  active: { id: 2, name: 'active', title: 'Active' },
  deleted: { id: 999, name: 'deleted', title: 'Deleted' }
}

module.exports = OrderManagementModel
