const Books=require("../model/books");


const book={};
book.addBook = async (req, res) => {
    const { title, author, genre, description } = req.body;
    if (!title || !author || !genre || !description) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
  
    try {
      const book = await Books.create({
        title,
        author,
        genre,
        description,
        // createdBy: req.user._id,
      });
      res.status(201).json({ message: "Book added successfully", book });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  book.getallbooks = async (req, res) => {
    try {
        const { author, genre, page = 1, limit = 10 } = req.query;

        
        const filter = {};
        if (author) filter.author = author;
        if (genre) filter.genre = genre;


        const skip = (page - 1) * limit;

        
        const books = await Books.find(filter)
            .skip(skip)
            .limit(parseInt(limit));

        
        const totalBooks = await Books.countDocuments(filter);

        res.status(200).json({
            message: "Books fetched successfully",
            books,
            totalBooks,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalBooks / limit),
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


book.getBookbyid=async(req,res)=>{

        const { id } = req.params;

    try{
        const book = await Books.findById(id).select('-createdAt -updatedAt -__v');;
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book fetched successfully", book});
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}
book.reviewbook=async(req,res)=>{
  const { book, rating, comment } = req.body;
  if (!book || !rating || !comment) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  try {
    const book = await Books.findById(book);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

  
    const existingReview = await Review.findOne({
      book: book,
      user: req.user._id,
    });
    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this book" });
    }

    const review = await Review.create({
      book: book,
      user: req.user._id,
      rating,
      comment,
    });

    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = book;