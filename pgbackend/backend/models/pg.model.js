import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  contactPhone: {
    type: String,
  },
  contactEmail: {
    type: String,
    required: true
  },
  amenities: [{
    type: String
  }],
  rules: [{
    type: String,
    required: true
  }],
  images: [{
    type: String
  }],
  location: {
    type: {
      type: String, // Specify GeoJSON type (e.g., 'Point')
      enum: ['Point'], // 'Point' is the only valid type for GeoJSON points
      required: true
    },  
    coordinates: {
      type: [String], // [longitude, latitude]
      required: true
    }
  }
}, { timestamps: true });

export const Home = mongoose.model('Home', homeSchema);



// import mongoose from "mongoose";

// const homeSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   address: {
//     type: String,
//     required: true
//   },
//   city:{
//     type:String,
//     required:true
//   },
//   price:{
//     type:Number,
//     required:true
//   },
//   type:{
//     type:String,
//     required:true
//   },
//   gender:{
//     type:String,
//     required:true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   contactPhone:{
//     type:String,
//     required:true
//   },
//   contactEmail:{
//     type:String,
//     required:true
//   },
//   // available: {
//   //   type: Boolean,
//   //   default: true
//   // },
//   amenities: [{
//     type: String
//   }],
//   rules:[{
//     type: String,
//     required: true
//   }],
//   images: [{
//     type: String,
//     }],
//     // thumbnail:{
//     //   type:String,
//     //   required:true
//     // }
//     location: {
//       type: {
//         longitude: {
//           type: Number,
//           required: true
//         },
//         latitude: {
//           type: Number,
//         },
//       },
//     }
    
// },{ timestamps: true }
// );

// export const Home = mongoose.model('Home', homeSchema);
