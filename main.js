const books = [
   { 
	  title: "React Billionaire", 
	  pages: 250, 
	  author: {
		  name: 'Alice',
		  age: 35
	  },
	  available: false,
	  price: '101€',
	  tags: ['advanced', 'js', 'react', 'senior']
    },
   { 
	  title: "Advanced JS", 
	  pages: 500, 
	  author: {
		  name: 'Bob',
		  age: 20
	  },
	  available: true,
	  price: '25€',
	  tags: ['advanced', 'js', 'mid-senior']
    },
   { 
	  title: "CSS Secrets", 
	  pages: 320, 
	  author: {
		  name: 'Alice',
		  age: 17
	  },
	  available: true,
	  price: '8€',
	  tags: ['html', 'css', 'junior']
    },
   { 
	  title: "HTML Mastery", 
	  pages: 200, 
	  author: {
		  name: 'Charlie',
		  age: 50
	  },
	  available: false,
	  price: '48€',
	  tags: ['html', 'advanced', 'junior', 'mid-senior']
    },
];
console.log(books);

// Crea una funzione che somma due numeri.
// Crea un array (longBooks) con i libri che hanno più di 300 pagine;
// Creare un array (longBooksTitles) che contiene solo i titoli dei libri contenuti in longBooks.
// Stampa in console ogni titolo nella console.

const longBooks = books.filter(book => book.pages > 300);
console.log(longBooks);

const longBooksTitles = longBooks.map(book => book.title);
console.log(longBooksTitles);


// Creare un array (availableBooks) che contiene tutti i libri disponibili.
// Crea un array (discountedBooks) con gli availableBooks, ciascuno con il prezzo scontato del 20% (mantieni lo stesso formato e arrotonda al centesimo)
// Salva in una variabile (fullPricedBook) il primo elemento di discountedBooks che ha un prezzo intero (senza centesimi).

const availableBooks = books.filter(book => book.available);
console.log(availableBooks);

const discountedBooks = availableBooks.map(book => {
    const priceNumber = parseFloat(book.price.replace('€', ''));
    const discountedPrice = (priceNumber * 0.8).toFixed(2) + '€';
    return { ...book, price: discountedPrice };
});
console.log(discountedBooks);

const fullPricedBook = discountedBooks.find(book => parseFloat(book.price) % 1 === 0);
console.log(fullPricedBook);


// Creare un array (authors) che contiene gli autori dei libri.
// Crea una variabile booleana (areAuthorsAdults) per verificare se gli autori sono tutti maggiorenni.
// Ordina l’array authors in base all’età, senza creare un nuovo array.
// (se areAuthorsAdult è true, ordina in ordine crescente, altrimenti in ordine decrescente)

const authors = books.map(book => book.author);
console.log(authors);

const areAuthorsAdults = authors.every(author => author.age >= 18);
console.log(areAuthorsAdults);

const author = authors.sort((a, b) => {
    return areAuthorsAdults ? b.age - a.age : a.age - b.age;
});
console.log(author);

// Creare un array (ages) che contiene le età degli autori dei libri.
// Calcola la somma delle età (agesSum) usando reduce.
// Stampa in console l’età media degli autori dei libri.

const ages = authors.map(author => author.age);
console.log(ages);

const agesSum = ages.reduce((acc, age) => acc + age, 0 );
console.log(agesSum);

const averageAge = (agesSum / ages.length).toFixed(2);
console.log(`L'età media degli autori è: ${averageAge}`);

// Usando la l'API https://boolean-spec-frontend.vercel.app/freetestapi/books/{id} usa la combinazione di .map() e Promise.all(), 
// per creare una funzione (getBooks) che a partire da un array di id (ids), ritorna una promise che risolve un array di libri (books).
// Testala con l’array [2, 13, 7, 21, 19] .

const ids = [2, 13, 7, 21, 19];

async function getBooks(ids) {
    const baseUrl = 'https://boolean-spec-frontend.vercel.app/freetestapi/books/';

    const promise = ids.map(id => fetch(`${baseUrl}${id}`).then(response => response.json()));     // promise è un array di promesse, ognuna delle quali recupera un libro dall'API

    const books = await Promise.all(promise);                                               // books è il risultato di tutte le promesse risolte
    return books;                                                                  // ritorna books
};

getBooks(ids).then(books => console.log(books)).catch(error => console.error('Error fetching books:', error));