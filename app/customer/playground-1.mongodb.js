// Select the database to use.
use('mongodbVSCodePlaygroundDB');

// Insert a few documents into the customers collection.
db.getCollection('customers').insertMany([
  { 'name': 'Alice Johnson', 'dob': new Date('1985-05-14T00:00:00Z'), 'memberNumber': 'C001', 'interest': 'Gardening' },
  { 'name': 'Bob Smith', 'dob': new Date('1990-07-22T00:00:00Z'), 'memberNumber': 'C002', 'interest': 'Photography' },
  { 'name': 'Charlie Brown', 'dob': new Date('1982-01-30T00:00:00Z'), 'memberNumber': 'C003', 'interest': 'Travel' },
  { 'name': 'Diana Prince', 'dob': new Date('1979-12-16T00:00:00Z'), 'memberNumber': 'C004', 'interest': 'Reading' },
  { 'name': 'Ethan Hunt', 'dob': new Date('1988-08-03T00:00:00Z'), 'memberNumber': 'C005', 'interest': 'Cooking' },
  { 'name': 'Fiona Apple', 'dob': new Date('1992-11-15T00:00:00Z'), 'memberNumber': 'C006', 'interest': 'Music' },
  { 'name': 'George Orwell', 'dob': new Date('1903-06-25T00:00:00Z'), 'memberNumber': 'C007', 'interest': 'Writing' },
  { 'name': 'Hannah Arendt', 'dob': new Date('1906-10-14T00:00:00Z'), 'memberNumber': 'C008', 'interest': 'Philosophy' }
]);

// Run a find command to view all customers.
const allCustomers = db.getCollection('customers').find().count();

// Print a message to the output window.
console.log(`Total number of customers: ${allCustomers}`);

// Example aggregation to group customers by interest.
db.getCollection('customers').aggregate([
  // Group the total number of customers by interest.
  { $group: { _id: '$interest', totalCustomers: { $sum: 1 } } }
]);
