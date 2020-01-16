const getBookShelve = (bookId, userBooks) => {
  if (userBooks.length > 0) {
    const bookShelve = userBooks.find((userBook) => {
      return userBook.book._id === bookId;
    });
    if (bookShelve) {
      return { shelve: bookShelve.shelve[0], rating: bookShelve.rating };
    }
  }
  return { shelve: "no shelve", rating: "no rating" };
};

export default getBookShelve;
