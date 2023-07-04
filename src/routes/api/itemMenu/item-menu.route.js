class ItemMenuRoute {
  constructor(dependencies) {
    /* Base Properties */
    this._dependencies = dependencies;
    this._utilities = this._dependencies.utilities;
    this._console = this._dependencies.console;
    this._services = this._dependencies.services;

    /* Custom Properties */
    /* this._myPrivateProperty = 'Some value' */

    /* Assigments */
    /* this._newPrivateObject = new SomeObject(this._dependencies) */
    this.EntityService = this._services.ItemMenuService;
  }

  /**
   * @swagger
   * /delivery/item/{queryselector}:
   *   get:
   *     summary: Get an Item Menu by query selector.
   *     description: Returns the Item menu information that matches the query selector an search specified in the route.
   *     tags:
   *       - ItemMenu
   *     parameters:
   *       - in: path
   *         name: queryselector
   *         description: Is the filter available for this query
   *         required: true
   *         schema:
   *           enum:
   *              - id
   *       - in: query
   *         name: search
   *         description: Keyword to search for entities.
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: OK.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Response'
   *             examples:
   *               Success:
   *                 value:
   *                   status: 200
   *                   success: true
   *                   message: Operation completed successfully
   *                   result:
   *                     $ref: '#/components/schemas/ItemMenu'
   *       500:
   *         description: Something was wrong while you make this action.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Response'
   *             examples:
   *               Success:
   *                 value:
   *                   status: 500
   *                   success: false
   *                   message: Something was wrong while you make this action
   *                   result: null
   */
  async get({ params }) {
    try {
      const entityService = new this.EntityService(this._dependencies);

      return entityService.get(params);
    } catch (error) {
      this._console.error(error);
      return this._utilities.io.response.error();
    }
  }

 /**
   * @swagger
   * /delivery/item/:
   *   post:
   *      summary: Create a new Item menu.
   *      description: Returns the created  Item menu with data provided.
   *      tags:
   *       - ItemMenu
   *      requestBody:
   *        description:  Item menu object to be created.
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/ItemMenu'
   *      responses:
   *       200:
   *         description: OK.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Response'
   *             examples:
   *               Success:
   *                 value:
   *                   status: 200
   *                   success: true
   *                   message: Operation completed successfully
   *                   result:
   *                     $ref: '#/components/schemas/ItemMenu'
   *       500:
   *         description: Something was wrong while you make this action.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Response'
   *             examples:
   *               Success:
   *                 value:
   *                   status: 500
   *                   success: false
   *                   message: Something was wrong while you make this action
   *                   result: null
   */
  async create({ params }) {
    try {
      const entityService = new this.EntityService(this._dependencies);

      return entityService.create(params);
    } catch (error) {
      this._console.error(error);
      return this._utilities.io.response.error();
    }
  }

   /**
   * @swagger
   * /delivery/item/:
   *   patch:
   *      summary: Update an existing Item menu.
   *      description: Updates the data of an existing Item menu with the data provided.
   *      tags:
   *       - ItemMenu
   *      requestBody:
   *        description: Item menu object to be created.
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/ItemMenu'
   *      responses:
   *       200:
   *         description: OK.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Response'
   *             examples:
   *               Success:
   *                 value:
   *                   status: 200
   *                   success: true
   *                   message: Operation completed successfully
   *                   result:
   *                     $ref: '#/components/schemas/ItemMenu'
   *       500:
   *         description: Something was wrong while you make this action.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Response'
   *             examples:
   *               Success:
   *                 value:
   *                   status: 500
   *                   success: false
   *                   message: Something was wrong while you make this action
   *                   result: null
   */
  async update({ params }) {
    try {
      const entityService = new this.EntityService(this._dependencies);

      return entityService.update(params);
    } catch (error) {
      this._console.error(error);
      return this._utilities.io.response.error();
    }
  }

  /**
   * @swagger
   * /delivery/item/:
   *   delete:
   *      summary: Delete an existing Item menu.
   *      description: Updates the data of an existing Item menu with status deleted.
   *      tags:
   *       - ItemMenu
   *      requestBody:
   *        description: Item Menu object to be deleted.
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/ItemMenu'
   *      responses:
   *       200:
   *         description: OK.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Response'
   *             examples:
   *               Success:
   *                 value:
   *                   status: 200
   *                   success: true
   *                   message: Operation completed successfully
   *                   result:
   *                     $ref: '#/components/schemas/ItemMenu'
   *       500:
   *         description: Something was wrong while you make this action.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Response'
   *             examples:
   *               Success:
   *                 value:
   *                   status: 500
   *                   success: false
   *                   message: Something was wrong while you make this action
   *                   result: null
   */
  async delete({ params }) {
    try {
      const entityService = new this.EntityService(this._dependencies);
      return entityService.delete(params);
    } catch (error) {
      this._console.error(error);
      return this._utilities.io.response.error();
    }
  }
}

module.exports = ItemMenuRoute;
