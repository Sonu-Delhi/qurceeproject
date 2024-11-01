// const uploadProductPermission = require("../../helpers/permission")
const clientModel = require("../../models/ourClientsModel")


async function addClientController(req,res){
    try{
        // const sessionUserId = req.userId

        // if(!uploadProductPermission(sessionUserId)){
        //     throw new Error("Permission denied")
        // }
    
        const uploadProduct = new clientModel(req.body)
        const saveProduct = await uploadProduct.save()

        res.status(201).json({
            message : "Product upload successfully",
            error : false,
            success : true,
            data : saveProduct
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

async function getClient(req,res){
    try{
        const allProduct = await clientModel.find().sort({ createdAt : -1 })

        res.json({
            message : "All Product",
            success : true,
            error : false,
            data : allProduct
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}
async function deleteClient(req,res){
    try{
        const currentUserId = req.userId 
        const addToCartProductId = req.body._id

        const deleteProduct = await clientModel.deleteOne({ _id : addToCartProductId})

        res.json({
            message : "Product Deleted From Cart",
            error : false,
            success : true,
            data : deleteProduct
        })

    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = {addClientController,getClient,deleteClient}