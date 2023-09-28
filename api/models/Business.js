const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema for Business
let KC = new Schema({
product_name: {
type: String
},
category_name: {
type: String
},
material_name: {
type: String
},
price: {
type: Number
},
description: {
type: String
},
fileupload: {
type: String
// data: Buffer,
// contentType: String
},
},{
collection: 'productlist'
});
module.exports = mongoose.model('KC', KC);
// let Item = new ItemSchema(
//   { img: 
//       { data: Buffer, contentType: String }
//   }
// );
// var Item = mongoose.model('Clothes',ItemSchema);