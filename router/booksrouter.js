const express=require('express');
const router=express.Router();

const bookcontroller=require('../controller/bookcontroller');
const reviewcontroller=require('../controller/reviewcontroller');
const auth=require('../middleware/authmiddleware');


router.post('/add', bookcontroller.addBook);
router.get('/getall', bookcontroller.getallbooks);
router.get('/get/:id', bookcontroller.getBookbyid);
router.post(':id/review',auth.verifyToken ,bookcontroller.reviewbook);

router.put('/updatereview/:id', reviewcontroller.updatereview);
router.delete('/deletereview/:id', reviewcontroller.deletereview);
module.exports = router;