/*
    Campos:
        firstName
        lastName
        email
        password
        profilePicture
        birthDate
        
        }

*/

//Array de metodos (C R U D)
const customersController = {};
import customersModel from "../models/Customers.js";

// SELECT
customersController.getcustomers = async (req, res) => {
    const customers = await customersModel.find();
    res.json(customers);
};

// INSERT
customersController.createcustomers = async (req, res) => {
    const { firstName, lastName, email, password, profilePicture, birthDate } = req.body;
    const newcustomers = new customersModel({ firstName, lastName, email, password, profilePicture, birthDate });
    await newcustomers.save();
    res.json({ message: "customer save" });
};

// DELETE
customersController.deletecustomers = async (req, res) => {
    const deletedcustomers = await customersModel.findByIdAndDelete(req.params.id);
    if (!deletedcustomers) {
        return res.status(404).json({ message: "customer dont find" });
    }
    res.json({ message: "customer deleted" });
};

// UPDATE
customersController.updatecustomers = async (req, res) => {
    // Solicito todos los valores
    const { firstName, lastName, email, password, profilePicture, birthDate } = req.body;
    // Actualizo
    await customersModel.findByIdAndUpdate(
        req.params.id,
        {
            firstName,
            lastName,
            email,
            password,
            profilePicture,
            birthDate
        },
        { new: true }
    );
    // muestro un mensaje que todo se actualizo
    res.json({ message: "customer update" });
};

export default customersController;