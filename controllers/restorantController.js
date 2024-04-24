import ResturantModel from "../models/restorantModel.js"

const createResturantController = async (req, res) => {
    console.log("in controller ");
    try {
      const {
        title,
        imageUrl,
        foods,
        time,
        pickup,
        delivery,
        isOpen,
        logoUrl,
        rating,
        ratingCount,
        code,
        coords,
      } = req.body;
      // validation
      
      if (!title ) {
        return res.status(500).send({
          success: false,
          message: "please provide title and address",
        });
      }
      const newResturant = new ResturantModel({
        title,
        imageUrl,
        foods,
        time,
        pickup,
        delivery,
        isOpen,
        logoUrl,
        rating,
        ratingCount,
        code,
        coords,
      });
  
      await newResturant.save();
  
      res.status(201).send({
        success: true,
        message: "New Resturant Created successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Create Resturant api",
        error,
      });
    }
  };

  const getAllResturantController = async (req, res) => {
    try {
        const resturants = await ResturantModel.find({});
        if (!resturants || resturants.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No restaurants found",
                total_count: 0
            });
        }
        res.status(200).json({
            success: true,
            message: "Restaurants found",
            total_count: resturants.length,
            resturants: resturants // Optionally, include the list of restaurants in the response
        });
    } catch (error) {
        console.error("Error in getAllResturant API:", error);
        return res.status(500).json({
            success: false,
            message: "Error in getAllResturant API"
        });
    }
};

const getResturantByIdController = async(req,res) => {
  const restaurant = await ResturantModel.findOne(req.body._id);
  if(!restaurant){
    return res.status(404).send({
        success:false,
        message:"Resturant not found with with id"
    })
  }
  console.log(" "+restaurant.title);
  res.status(200).send({
    success:true,
    message:"Resutrant found with given id",
    restaurant
  })
  
}

const deleteResturantController = async(req,res) => {
   try{
    const resturantId = req.params.id;
    if(!resturantId){
        return res.status(404).send({
            success:false,
            message:"Enter id of resturant"
        })
    }
    await ResturantModel.findByIdAndDelete(resturantId)
    res.status(200).send({
        success:true,
        message:"resturant deleted"
    })
   }catch(error){
    return res.status(500).send({
        success:false,
        message:"Error in delete Resturant API"
    })
   }
}

export  {createResturantController,getAllResturantController,getResturantByIdController,deleteResturantController};