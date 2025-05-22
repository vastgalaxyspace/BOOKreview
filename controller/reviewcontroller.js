const review=require('../model/review');

const reviews={};

reviews.updatereview=async(req,res)=>{
    const { id } = req.params;
    const { rating, comment } = req.body;

    if (!rating || !comment) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
        const review = await review.findByIdAndUpdate(id, { rating, comment }, { new: true });
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ message: "Review updated successfully", review });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

reviews.deletereview=async(req,res)=>{
    const { id } = req.params;

    try {
        const review = await review.findByIdAndDelete(id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports=reviews;