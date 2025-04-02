import { Home } from '../models/pg.model.js';
// import { Address } from "../models/address.model.js";
import cloudinary from '../utils/cloudinary.js';
import sharp from 'sharp';

export const postDetails = async (req, res) => {
  try {
    let imageUrls = []; // Initialize an array for storing image URLs

    if (req.files && req.files.length > 0) {
      // If multiple files are provided
      const uploadToCloudinary = async (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream({ folder: "homes" }, (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          });
          stream.end(buffer);
        });
      };

      // Process each image
      for (const image of req.files) {
        const optimizedImageBuffer = await sharp(image.buffer)
          .resize({ width: 800, height: 800, fit: 'inside' })
          .toFormat('jpeg', { quality: 80 })
          .toBuffer();

        const imageUrl = await uploadToCloudinary(optimizedImageBuffer);
        imageUrls.push(imageUrl); // Add each uploaded image URL to the array
      }
    }

    // Create the home object with or without images
    const home = new Home({
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      price: req.body.price,
      type: req.body.type,
      gender: req.body.gender,
      contactPhone: req.body.contactPhone,
      contactEmail: req.body.contactEmail,
      description: req.body.description,
      amenities: req.body.amenities,
      rules: req.body.rules,
      images: imageUrls, // Use the array of image URLs
      location: {
        type: 'Point',
        coordinates: [req.body.longitude, req.body.latitude]
      }
    });

    const savedHome = await home.save();
    res.status(201).json(savedHome);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




export const fetchHomes = async (req, res) => {
  try {
    const homes = await Home.find()
      .exec();
    res.json(homes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getHomeById = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id)
      .exec();
    if (home) {
      res.json(home);
    } else {
      res.status(404).json({ message: 'Home not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateHome = async (req, res) => {
  try {
    // Find the existing home
    const home = await Home.findById(req.params.id);
    if (!home) {
      return res.status(404).json({ message: 'Home not found' });
    }

    // Handle multiple image uploads
    let imageUrls = [...home.images]; // Preserve existing images
    if (req.files && req.files.length > 0) {
      const uploadToCloudinary = async (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "homes" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            }
          );
          stream.end(buffer);
        });
      };

      // Process each new image
      for (const image of req.files) {
        const optimizedImageBuffer = await sharp(image.buffer)
          .resize({ width: 800, height: 800, fit: 'inside' })
          .toFormat('jpeg', { quality: 80 })
          .toBuffer();

        const imageUrl = await uploadToCloudinary(optimizedImageBuffer);
        imageUrls.push(imageUrl);
      }
    }

    // Prepare update data with all possible fields
    const updateData = {};
    
    // Only add fields that are present in the request body
    if (req.body.name) updateData.name = req.body.name;
    if (req.body.address) updateData.address = req.body.address;
    if (req.body.city) updateData.city = req.body.city;
    if (req.body.price) updateData.price = req.body.price;
    if (req.body.type) updateData.type = req.body.type;
    if (req.body.gender) updateData.gender = req.body.gender;
    if (req.body.contactPhone) updateData.contactPhone = req.body.contactPhone;
    if (req.body.contactEmail) updateData.contactEmail = req.body.contactEmail;
    if (req.body.description) updateData.description = req.body.description;
    if (req.body.amenities) updateData.amenities = req.body.amenities;
    if (req.body.rules) updateData.rules = req.body.rules;
    
    // Always update images if we have processed any
    if (imageUrls.length > 0) updateData.images = imageUrls;

    // Handle location update if coordinates are provided
    if (req.body.longitude && req.body.latitude) {
      updateData.location = {
        type: 'Point',
        coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)]
      };
    }

    // Use findByIdAndUpdate for atomic update
    const updatedHome = await Home.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    // Return the updated document
    res.status(200).json(updatedHome);
  } catch (error) {
    console.error('Update error:', error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteHome = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (!home) {
      return res.status(404).json({ message: 'Home not found' });
    }

    await home.deleteOne();

    res.json({ message: 'Home and address deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}