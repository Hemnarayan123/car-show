import { Car } from "../model/car.model.js";
// import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";


const addCar = async (req, res) => {
  const {
    title,
    description,
    price,
    features,
    brand,
    model,
    condition,
    year,
    body_type,
    seats,
    color,
    fuel_type,
    mileage,
    transmission,
    drivetrain,
    power,
    battery_capacity,
    charge_port,
    charge_speed,
    charge_time,
    length,
    width,
    height,
    cargo_volume,
  } = req.body;

  try {
    const existUser = await User.findById(req.decoded.userId);
    if (!existUser) {
      return res.status(400).json({ message: "User not found" });
    }

    if (existUser.role !== "admin") {
      return res.status(403).json({ message: "Permission denied" });
    }

    const imageLocalPaths = req.files.map(file => file.path);

    if (!imageLocalPaths || imageLocalPaths.length === 0) {
      return res.status(400).json({ error: "Please upload at least one image" });
    }

    const uploadedImages = await Promise.all(imageLocalPaths.map(uploadOnCloudinary));
    const imageUrls = uploadedImages.map(img => img.url);

    if (!imageUrls || imageUrls.length === 0) {
      return res.status(400).json({ error: "Failed to upload images to Cloudinary" });
    }

    const car = new Car({
      title,
      description,
      price,
      features,
      brand,
      model,
      condition,
      year,
      body_type,
      seats,
      color,
      fuel_type,
      mileage,
      transmission,
      drivetrain,
      power,
      battery_capacity,
      charge_port,
      charge_speed,
      charge_time,
      length,
      width,
      height,
      cargo_volume,
      images: imageUrls,
    });

    await car.save();
    res.status(200).json({ car });
  } catch (error) {
    console.error("Error in addCar:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCar = async (req, res) => {
  Car.find()
    .then((cardata) => {
      res.json({ cardata });
    })
    .catch((err) => {
      console.log(err);
    });
};

const deletCar = async (req, res) => {
  try {
    const existUser = await User.findById(req.decoded.userId);
    // console.log("existuser delet", existUser);
    if (existUser.role === "admin") {
      await Car.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "car data deleted" });
    } else {
      res.status(400).json({ message: "user is not admin" });
    }
  } catch (error) {
    console.log("error in deletProduct", error);
  }
};

const updateCar = async (req, res) => {
  console.log("Request received to update car");
  const {
    title,
    description,
    price,
    features,
    brand,
    model,
    condition,
    year,
    body_type,
    seats,
    color,
    fuel_type,
    mileage,
    transmission,
    drivetrain,
    power,
    battery_capacity,
    charge_port,
    charge_speed,
    charge_time,
    length,
    width,
    height,
    cargo_volume,
  } = req.body;

  const { id } = req.params;
  // console.log("Car ID:", id);

  try {
    const existUser = await User.findById(req.decoded.userId);
    if (!existUser) {
      return res.status(400).json({ message: "User not found" });
    }

    if (existUser.role !== "admin") {
      return res.status(403).json({ message: "Permission denied" });
    }

    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    let imageUrls = car.images;

    if (req.files && req.files.length > 0) {
      const imageLocalPaths = req.files.map(file => file.path);
      // console.log("Image Local Paths:", imageLocalPaths);

      if (imageLocalPaths && imageLocalPaths.length > 0) {
        if (imageUrls && imageUrls.length > 0) {
          await Promise.all(imageUrls.map(url => deleteFromCloudinary(url)));
        }

        const uploadedImages = await Promise.all(imageLocalPaths.map(uploadOnCloudinary));
        imageUrls = uploadedImages.map(img => img.url);
        // console.log("Uploaded Image URLs:", imageUrls);

        if (!imageUrls || imageUrls.length === 0) {
          return res.status(400).json({ error: "Failed to upload images to Cloudinary" });
        }
      }
    }

    // Update car fields
    car.title = title;
    car.description = description;
    car.price = price;
    car.features = features;
    car.brand = brand;
    car.model = model;
    car.condition = condition;
    car.year = year;
    car.body_type = body_type;
    car.seats = seats;
    car.color = color;
    car.fuel_type = fuel_type;
    car.mileage = mileage;
    car.transmission = transmission;
    car.drivetrain = drivetrain;
    car.power = power;
    car.battery_capacity = battery_capacity;
    car.charge_port = charge_port;
    car.charge_speed = charge_speed;
    car.charge_time = charge_time;
    car.length = length;
    car.width = width;
    car.height = height;
    car.cargo_volume = cargo_volume;
    car.images = imageUrls;

    await car.save();
    res.status(200).json({ car });
  } catch (error) {
    console.error("Error in updateCar:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { addCar, getCar, deletCar, updateCar };
