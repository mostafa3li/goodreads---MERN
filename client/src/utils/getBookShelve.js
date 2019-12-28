const getBookShelve = (bookId, userBooks) => {
  if (userBooks.length > 0) {
    const book = userBooks.filter((userBook) => {
      return userBook.book._id === bookId;
    });
    if (book.length > 0) {
      return book[0].shelve[0];
    }
  }
  return "none";
};

export default getBookShelve;
