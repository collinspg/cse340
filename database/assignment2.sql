-- Assignment Task 1
-- QUERY 1: Insert a new record into the account table

INSERT INTO account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- QUERY 2: Modify Tony Stark's account_type to 'Admin'

UPDATE account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';

-- QUERY 3: Delete the Tony Stark record from the database

DELETE FROM account
WHERE account_email = 'tony@starkent.com';

-- QUERY 4: Modify the "GM Hummer" description to "a huge interior"

UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- QUERY 5: Select make, model, and classification name for Sport category items using an inner join

SELECT i.inv_make, i.inv_model, c.classification_name
FROM inventory i
INNER JOIN classification c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

-- QUERY 6: Update all records in the inventory table to add '/vehicles' to the image and thumbnail paths

UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
