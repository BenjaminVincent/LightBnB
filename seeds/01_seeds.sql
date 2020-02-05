INSERT INTO users (
    name, email, password) 
    VALUES ('SLEEF DAVID', '1@a.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (
  name, email, password) 
  VALUES ('Arnold Washintonsly', '2@b.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (
  name, email, password) 
    VALUES ('G Johnson', '3@c.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO properties (
    title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code) 
    VALUES (
    'TITLE', 'DESCRIPTION', 1, 'cat.com', 'cat.net', 400, 3, 2, 1, true, 'place1', 'place2', 'place3', '9999 place4', '38222');

INSERT INTO properties (
    title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code) 
    VALUES ('TITLE', 'DESCRIPTION', 2, 'cat.com', 'cat.net', 400, 3, 2, 1, true, 'place5', 'place6', 'place7', '9999 place8', '38223');

INSERT INTO properties (
    title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, active, province, city, country, street, post_code) 
    VALUES ('TITLE', 'DESCRIPTION', 2, 'cat.com', 'cat.net', 400, 3, 2, 1, true, 'place9', 'place10', 'place11', '9999 place12', '38224');


INSERT INTO property_reviews (
  guest_id, property_id, reservation_id, rating, message) 
  VALUES (1, 1, 199, 5, 'Kinda bad but 5 stars you know?');
INSERT INTO property_reviews (
    guest_id, property_id, reservation_id, rating, message) 
    VALUES (
    2, 2, 200, 5, '0/5 nice try guy');
INSERT INTO property_reviews (
    guest_id, property_id, reservation_id, rating, message) 
    VALUES (
    3, 3, 200, 5, 'cried myself to sleep then ate some apples, 6/10');