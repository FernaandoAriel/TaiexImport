const customersController = {};

import customersModel from "../models/Customers.js";

customersController.getCustomers = async (req, res) =>{
    const customers = await customersModel.find();
    res.json(customers)
};

customersController.createCustomers = async (req, res) =>{
    const {name, lastName, email, password} = req.body;

    const newCustomer = new customersModel({
        name, lastName, email, password
    });

    await newCustomer.save();
    res.json({message: "Cliente guardado"});
};

customersController.deleteCustomers = async (req, res) =>{
    const deletedCustomer = await clientsModel.findByIdAndDelete(req.params.id);

      if(!deleteCustomer){
            return res.status(400).json({message: "Not found"});
        }

    res.json({message: "Cliente eliminado"});
};

customersController.updateCustomers = async (req, res) =>{
    const {name, lastName, email, password} = req.body;

    const updatedCustomer = await clientsModel.findByIdAndUpdate(req.params.id, {name, lastName, email, password});

    if(!updatedCustomer){
            return res.status(400).json({message: "Not found"});
        }
    
    res.json({message: "Cliente actualizado"});
};

export default customersController;