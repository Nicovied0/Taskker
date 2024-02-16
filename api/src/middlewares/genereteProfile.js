const axios = require("axios");
const User = require("../models/User.model");

async function genereteProfile(req, res) {
  try {
    const usersResponse = await axios.get(
      `${process.env.URL_MICROSERVICES}/user`
    );

    const lastProfileData = usersResponse.data[usersResponse.data.length - 1];

    const newUser = new User({
      name: lastProfileData.name,
      email: lastProfileData.email,
      userIdRegister: lastProfileData._id,
      organization: "TuOrganizacion",
    });
    await newUser.save();
  } catch (error) {
    console.error(
      "Error saving last profile data to local database:",
      error.message
    );
    return res
      .status(500)
      .json({ error: "Error saving last profile data to local database" });
  }
}

module.exports = genereteProfile;
