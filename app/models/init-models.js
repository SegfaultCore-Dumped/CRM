var DataTypes = require("sequelize").DataTypes;
var _account = require("./account");
var _account_verification = require("./account_verification");
var _dish = require("./dish");
var _dish_category = require("./dish_category");
var _dish_has_product = require("./dish_has_product");
var _faq_question = require("./faq_question");
var _faq_question_type = require("./faq_question_type");
var _forgot_password = require("./forgot_password");
var _gender = require("./gender");
var _inventory = require("./inventory");
var _inventory_has_product = require("./inventory_has_product");
var _notification = require("./notification");
var _notification_type = require("./notification_type");
var _producer = require("./producer");
var _product = require("./product");
var _quantity_type = require("./quantity_type");
var _restaurant = require("./restaurant");
var _review = require("./review");
var _site = require("./site");
var _site_has_producer = require("./site_has_producer");
var _site_order = require("./site_order");
var _site_order_has_product = require("./site_order_has_product");
var _site_order_status = require("./site_order_status");
var _storage_type = require("./storage_type");

function initModels(sequelize) {
  var account = _account(sequelize, DataTypes);
  var account_verification = _account_verification(sequelize, DataTypes);
  var dish = _dish(sequelize, DataTypes);
  var dish_category = _dish_category(sequelize, DataTypes);
  var dish_has_product = _dish_has_product(sequelize, DataTypes);
  var faq_question = _faq_question(sequelize, DataTypes);
  var faq_question_type = _faq_question_type(sequelize, DataTypes);
  var forgot_password = _forgot_password(sequelize, DataTypes);
  var gender = _gender(sequelize, DataTypes);
  var inventory = _inventory(sequelize, DataTypes);
  var inventory_has_product = _inventory_has_product(sequelize, DataTypes);
  var notification = _notification(sequelize, DataTypes);
  var notification_type = _notification_type(sequelize, DataTypes);
  var producer = _producer(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var quantity_type = _quantity_type(sequelize, DataTypes);
  var restaurant = _restaurant(sequelize, DataTypes);
  var review = _review(sequelize, DataTypes);
  var site = _site(sequelize, DataTypes);
  var site_has_producer = _site_has_producer(sequelize, DataTypes);
  var site_order = _site_order(sequelize, DataTypes);
  var site_order_has_product = _site_order_has_product(sequelize, DataTypes);
  var site_order_status = _site_order_status(sequelize, DataTypes);
  var storage_type = _storage_type(sequelize, DataTypes);

  producer.belongsToMany(site, { as: 'sites', through: site_has_producer, foreignKey: "producer_id", otherKey: "site_id" });
  site.belongsToMany(producer, { as: 'producers', through: site_has_producer, foreignKey: "site_id", otherKey: "producer_id" });
  account_verification.belongsTo(account, { as: "account", foreignKey: "account_id"});
  account.hasMany(account_verification, { as: "account_verifications", foreignKey: "account_id"});
  forgot_password.belongsTo(account, { as: "account", foreignKey: "account_id"});
  account.hasMany(forgot_password, { as: "forgot_passwords", foreignKey: "account_id"});
  notification.belongsTo(account, { as: "account", foreignKey: "account_id"});
  account.hasMany(notification, { as: "notifications", foreignKey: "account_id"});
  review.belongsTo(account, { as: "account", foreignKey: "account_id"});
  account.hasMany(review, { as: "reviews", foreignKey: "account_id"});
  dish_has_product.belongsTo(dish, { as: "dish", foreignKey: "dish_id"});
  dish.hasMany(dish_has_product, { as: "dish_has_products", foreignKey: "dish_id"});
  dish.belongsTo(dish_category, { as: "dish_category", foreignKey: "dish_category_id"});
  dish_category.hasMany(dish, { as: "dishes", foreignKey: "dish_category_id"});
  faq_question.belongsTo(faq_question_type, { as: "faq_question_type", foreignKey: "faq_question_type_id"});
  faq_question_type.hasMany(faq_question, { as: "faq_questions", foreignKey: "faq_question_type_id"});
  account.belongsTo(gender, { as: "gender", foreignKey: "gender_id"});
  gender.hasMany(account, { as: "accounts", foreignKey: "gender_id"});
  dish.belongsTo(inventory, { as: "inventory", foreignKey: "inventory_id"});
  inventory.hasMany(dish, { as: "dishes", foreignKey: "inventory_id"});
  inventory_has_product.belongsTo(inventory, { as: "inventory", foreignKey: "inventory_id"});
  inventory.hasMany(inventory_has_product, { as: "inventory_has_products", foreignKey: "inventory_id"});
  site.belongsTo(inventory, { as: "inventory", foreignKey: "inventory_id"});
  inventory.hasMany(site, { as: "sites", foreignKey: "inventory_id"});
  notification.belongsTo(notification_type, { as: "notification_type", foreignKey: "notification_type_id"});
  notification_type.hasMany(notification, { as: "notifications", foreignKey: "notification_type_id"});
  site_has_producer.belongsTo(producer, { as: "producer", foreignKey: "producer_id"});
  producer.hasMany(site_has_producer, { as: "site_has_producers", foreignKey: "producer_id"});
  dish_has_product.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(dish_has_product, { as: "dish_has_products", foreignKey: "product_id"});
  inventory_has_product.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(inventory_has_product, { as: "inventory_has_products", foreignKey: "product_id"});
  site_order_has_product.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(site_order_has_product, { as: "site_order_has_products", foreignKey: "product_id"});
  dish_has_product.belongsTo(quantity_type, { as: "quantity_type", foreignKey: "quantity_type_id"});
  quantity_type.hasMany(dish_has_product, { as: "dish_has_products", foreignKey: "quantity_type_id"});
  inventory_has_product.belongsTo(quantity_type, { as: "quantity_type", foreignKey: "quantity_type_id"});
  quantity_type.hasMany(inventory_has_product, { as: "inventory_has_products", foreignKey: "quantity_type_id"});
  account.belongsTo(restaurant, { as: "restaurant", foreignKey: "restaurant_id"});
  restaurant.hasMany(account, { as: "accounts", foreignKey: "restaurant_id"});
  site.belongsTo(restaurant, { as: "restaurant", foreignKey: "restaurant_id"});
  restaurant.hasMany(site, { as: "sites", foreignKey: "restaurant_id"});
  site_has_producer.belongsTo(site, { as: "site", foreignKey: "site_id"});
  site.hasMany(site_has_producer, { as: "site_has_producers", foreignKey: "site_id"});
  site_order.belongsTo(site, { as: "site", foreignKey: "site_id"});
  site.hasMany(site_order, { as: "site_orders", foreignKey: "site_id"});
  site_order_has_product.belongsTo(site_order, { as: "site_order", foreignKey: "site_order_id"});
  site_order.hasMany(site_order_has_product, { as: "site_order_has_products", foreignKey: "site_order_id"});
  site_order.belongsTo(site_order_status, { as: "site_order_status", foreignKey: "site_order_status_id"});
  site_order_status.hasMany(site_order, { as: "site_orders", foreignKey: "site_order_status_id"});
  inventory_has_product.belongsTo(storage_type, { as: "storage_type", foreignKey: "storage_type_id"});
  storage_type.hasMany(inventory_has_product, { as: "inventory_has_products", foreignKey: "storage_type_id"});

  return {
    account,
    account_verification,
    dish,
    dish_category,
    dish_has_product,
    faq_question,
    faq_question_type,
    forgot_password,
    gender,
    inventory,
    inventory_has_product,
    notification,
    notification_type,
    producer,
    product,
    quantity_type,
    restaurant,
    review,
    site,
    site_has_producer,
    site_order,
    site_order_has_product,
    site_order_status,
    storage_type,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
