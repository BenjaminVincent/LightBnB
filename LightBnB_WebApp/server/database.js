const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  return db.query(`SELECT * FROM users WHERE email = $1;`, [email])
  .then(res => res.rows[0])

  .catch(error => null);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {

  return db.query(`SELECT * FROM users WHERE id = $1;`, [id])
  .then(res => res.rows[0])
  .catch(error => null);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return db.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`,
    [user.name, user.email, user.password]
  )
  .then(res => res.rows[0])
  .catch(error => null);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return db.query(
    `SELECT reservations.*, properties.*, AVG(property_reviews.rating) AS average_rating
    FROM properties
    JOIN reservations ON reservations.property_id = properties.id
    JOIN property_reviews ON property_reviews.property_id = properties.id
    WHERE reservations.end_date < now()::date AND reservations.guest_id = $1
    GROUP BY reservations.id, properties.id
    ORDER BY reservations.start_date 
    LIMIT $2;`,
    [guest_id, limit]
  )
  .then(res => res.rows)
  .catch(error => null);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  
  let queryParams = [];
  let where = false;
  let str = `SELECT properties.*, AVG(property_reviews.rating) AS average_rating
  FROM properties
  LEFT JOIN property_reviews ON property_id = properties.id `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    str += `WHERE city LIKE $${queryParams.length} `;
    where = true;
  }

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    str += `WHERE properties.owner_id = $${queryParams.length} `;
    where = true;
  }

  if (where && options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night);
    str += `AND cost_per_night >= $${queryParams.length} `;
  } else if (!where && options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night);
    str += `WHERE cost_per_night >= $${queryParams.length} `;
    where = true;
  }

  if (where && options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night);
    str += `AND cost_per_night <= $${queryParams.length} `;
  } else if (!where && options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night);
    str += `WHERE cost_per_night <= $${queryParams.length} `;
    where = true;
  }

  if (where && options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    str += `AND property_reviews.rating >= $${queryParams.length} `;
  } else if (!where && options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    str += `WHERE property_reviews.rating >= $${queryParams.length} `;
    where = true;
  }

  queryParams.push(limit);
  str += `GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};`;

  return db.query(str, queryParams).then(res => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  queryParams = [
    property.owner_id,
    `${property.title}`,
    `${property.description}`,
    `${property.thumbnail_photo_url}`,
    `${property.cover_photo_url}`,
    `${property.cost_per_night}`,
    `${property.street}`,
    `${property.city}`,
    `${property.province}`,
    `${property.post_code}`,
    `${property.country}`,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms
  ];

  // {
  //   owner_id: int,
  //   title: string,
  //   description: string,
  //   thumbnail_photo_url: string,
  //   cover_photo_url: string,
  //   cost_per_night: string,
  //   street: string,
  //   city: string,
  //   province: string,
  //   post_code: string,
  //   country: string,
  //   parking_spaces: int,
  //   number_of_bathrooms: int,
  //   number_of_bedrooms: int
  // }

  str = `INSERT INTO properties (
        owner_id, 
        title, 
        description, 
        thumbnail_photo_url, 
        cover_photo_url, 
        cost_per_night, 
        street, 
        city, 
        province, 
        post_code,
        country, 
        parking_spaces, 
        number_of_bathrooms, 
        number_of_bedrooms
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING *`;

  return db.query(str, queryParams)
  .then(res => res.rows);

}
exports.addProperty = addProperty;
