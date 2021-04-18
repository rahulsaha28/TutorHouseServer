const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const UserSchema = require('./DataBaseConfig/UserSchema');
const ProductSchema = require('./DataBaseConfig/ProductSchema');
const CartSchema = require('./DataBaseConfig/CartSchema');
const ReviewSchema = require('./DataBaseConfig/ReviewSchema');


const app = express();

// config .env file
dotenv.config();
app.use(cors());
app.use(express.json());



// database url
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ulntk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

// database connection
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });

// add user table
const User = mongoose.model('User', UserSchema);
// add product table
const Product = mongoose.model('Product', ProductSchema);
// add cart table
const Cart = mongoose.model('Cart', CartSchema);
//  add rating table
const Review  = mongoose.model('Review', ReviewSchema);

// admin middleware
const AdminMiddleware = (req, res, next)=>{
    
    if(req.headers["type"]==="admin"){
      next();  
    }else{
      res.status(500).json({redirect:"/"})  
    }

    
    
}

//------------------user route is here -----------------------------

// get user
app.post('/user', async(req, res)=>{

    await User.findOne(
        {
            email:req.body.email
        }, 
        (err, user)=>{
            if(!err){
                res.status(200).json({user})
            }
        });

});

// set user
app.post('/user/add', async(req, res)=>{

    
    const user = new User(req.body);
    await user.save()
            .then(user=>res.status(200).json({success:"Added Successfully"}))
            .catch(err=>res.status(500).json({error:"Fail to add"}))
    
});

// update user
app.put('/user', async(req, res)=>{

   await User.updateOne(
        {
            email:req.body.email
        },
        {
            type:req.body.type
        }, 
        (err, user)=>{

            if(!err){
                res.status(200).json({user});
            }
        })
    
});

// delete
app.delete('/user', async(req, res)=>{

    await User.deleteOne(
        {
            email:req.body.email
        },
        (err, user)=>{

            if(!err){
                res.status(200).json({user})
            }
        })
    
});

// -----------------------------------------------------------------



// ---------------------product route is here --------------------------

// get all product
app.get('/product', async(req, res)=>{
    await Product.find({}, (err, product)=>{
        if(!err){
            res.status(200).json({product});
        }
    })
});
// get product
app.post('/product', async(req, res)=>{

    await Product.findOne(
        {
            _id:req.body.id
        }, 
        (err, product)=>{
            if(!err){
                res.status(200).json({product})
            }
        });

});

// set Product
app.post('/product/add', AdminMiddleware, async(req, res)=>{

    
    const product = new Product(req.body);
    await product.save()
            .then(result=>res.status(200).json({ success:"Added Successfully." }))
            .catch(err=>res.status(500).json({ error:"Some problem happen."}))
    
});

// update product
app.put('/product', async(req, res)=>{

   
    
});

//product delete
app.delete('/product', AdminMiddleware, async(req, res)=>{

    await Product.deleteOne(
        {
            _id:req.body.id
        },
        (err, product)=>{

            if(!err){
                res.status(200).json({success:"Successfully delete item"})
            }
        })
    
});


// ---------------------------------------------------------------------


// ------------------------ Cart ---------------------------------------


// get all cart
app.post('/cart/all', AdminMiddleware, async(req, res)=>{
    await Cart.find({}, (err, cart)=>{
        if(!err){
            res.status(200).json({cart});
        }
    })
});



// get cart
app.post('/cart', async(req, res)=>{

    await Cart.find(
        {
            email:req.body.email
        }, 
        (err, cart)=>{
            if(!err){
                res.status(200).json({cart})
            }
        });

});

// set Cart
app.post('/cart/add', async(req, res)=>{

    
    const cart = new Cart(req.body);
    await cart.save()
            .then(result=>res.status(200).json({ success:"Order is placed successfully" }))
            .catch(err=>res.status(500).json({error:"Can not placed Order"}))
    
});

// update cart status
app.put('/cart/status', async(req, res)=>{

    await Cart.updateOne(
        {
            _id:req.body.id
        },
        {
            status:req.body.status
        }, 
        (err, cart)=>{

            if(!err){
                res.status(200).json({success:"Update Successfully"});
            }
        })
    
});

//cart delete
app.delete('/cart', async(req, res)=>{

    await Cart.deleteOne(
        {
            _id:req.body.id
        },
        (err, product)=>{

            if(!err){
                res.status(200).json({product})
            }
        })
    
});

// ---------------------------------------------------------------------


// ---------------------- Review ---------------------------------------

// get all Review
app.get('/review', async(req, res)=>{
    await Review.find({}, (err, review)=>{
        if(!err){
            res.status(200).json({review});
        }
    })
});
// get review
app.post('/review', async(req, res)=>{

   

});

// set review
app.post('/review/add', async(req, res)=>{

    
    const review = new Review(req.body);
    await review.save()
            .then(result=>res.status(200).json({ success:"Review Added Successfully" }))
            .catch(err=>res.status(500).json({error:"Some Problem happen"}))
    
});

// update review
app.put('/review', async(req, res)=>{

   
    
});

//product review
app.delete('/review', async(req, res)=>{

    
    
});


// ----------------------------------------------------------------------




// app listener
app.listen(process.env.PORT, ()=>console.log("Listening on ....."));