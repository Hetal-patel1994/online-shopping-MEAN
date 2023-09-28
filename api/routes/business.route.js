const express = require('express');
const app = express();
const businessRoutes = express.Router();
const multer = require('multer');

// Require Business model in our routes module
let Business = require('../models/Business');



var store = multer.diskStorage({
  destination:function(req,file,cb){
  
    cb(null, '../public/upload/');
  },
  filename:function(req,file,cb){
      cb(null, Date.now()+'.'+file.originalname);
  }
});


var upload = multer({storage:store}).single('file');

businessRoutes.post('/uploads', function(req,res){
  console.log("req"+req);
  upload(req,res,function(err){
      if(err){
          return res.status(501).json({error:err});
      }
      //do all database record saving activity
      console.log("req.file"+JSON.stringify(req.file))
      return res.json({originalname:req.file.originalname, uploadname:req.file.filename,path:req.file.path});
  });
});




// Defined store route
businessRoutes.route('/add').post(function (req, res) {
  let business = new Business(req.body);
  business.save()
    .then(business => {
      res.status(200).json({'business': 'business in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
businessRoutes.route('/').get(function (req, res) {
    Business.find(function (err, businesses){
    if(err){
      console.log(err);
    }
    else {
      res.json(businesses);
    }
  });
});

// Defined edit route
businessRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Business.findById(id, function (err, business){
      res.json(business);
  });
});

//  Defined update route
businessRoutes.route('/update/:id').post(function (req, res) {
    Business.findById(req.params.id, function(err, business) {
    if (!business)
      return next(new Error('Could not load Document'));
    else {
        business.person_name = req.body.person_name;
        business.business_name = req.body.business_name;
        business.business_gst_number = req.body.business_gst_number;

        business.save().then(business => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
businessRoutes.route('/delete/:id').get(function (req, res) {
    Business.findByIdAndRemove({_id: req.params.id}, function(err, business){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = businessRoutes;