var myApp = angular.module("myApp",  []);

myApp.filter('unique', function() {

 return function (arr, field) {
   var o = {}, i, l = arr.length, r = [];
   for(i=0; i<l;i+=1) {
     o[arr[i][field]] = arr[i];
   }
   for(i in o) {
     r.push(o[i]);
   }
   return r;
 };
})

myApp.controller("BookController", ["$http", function($http) {
  console.log('running');

  var self = this;
  self.newBook = {};
  self.books = [];

  getBooks();

  // read only
  function getBooks() {
    $http.get('/books')
      .then(function(response) {
        console.log(response.data);
        self.books = response.data;
        for (var i = 0; i < self.books.length; i++) {
          self.books[i].published = new Date(self.books[i].published);
          console.log(self.books[i].published);
        }
      });
  }

  // tied to DOM thru self object
  self.addBook = function() {
    console.log('new book: ', self.newBook);
    $http.post('/books', self.newBook)
      .then(function(response) {
        console.log('POST finished. Get books again.');
        getBooks();
      });
  }

  self.clickMe = function(bookObj) {
    console.log(bookObj);
  }

  self.deleteBook = function(bookObj) {
    console.log('deletedelete');
    var id = bookObj.id;
    $http.delete('/books/' + id)
      .then(function(response) {
        console.log('Book deleted.');
        getBooks();
      });
  }

  self.updateBook = function(bookObj, index) {
    var id = bookObj.id;
    console.log(id);
    $http.put('/books/' + id, self.books[index])
      .then(function(response) {
        console.log('PUT finished. Book updated.');
        getBooks();
      });
  }


}]);

// function updateBook() {
//   var id = $(this).parent().data('id');
//   console.log(id);
//
//   // make book object
//   var book = {};
//   var fields = $(this).parent().children().serializeArray();
//   fields.forEach(function(field) {
//     book[field.name] = field.value;
//   });
//   console.log(book);
//
//   $.ajax({
//     type: 'PUT',
//     url: '/books/' + id,
//     data: book,
//     success: function(result) {
//       console.log('updated!!!!');
//       getBooks();
//     },
//     error: function(result) {
//       console.log('could not update book!');
//     }
//   });
//
// }
