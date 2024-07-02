const apiKey = 'AIzaSyAYqHMSRaiUP-WDJyzgDDbW8qkAXn1dtnw'
let category = 'Architecture'
let startIndex = 0
const maxResults = 6

const loadMoreButton = document.getElementById('loadMore')
const booksContainer = document.getElementById('books')

let basket = []
const cartEl = document.getElementById('basket')

const toggleCartItem = (bookId) => {
    const itemIdx = basket.findIndex((item) => item === bookId)
    if (itemIdx === -1) {
        basket.push(bookId)
        const bookButton = document.querySelector(`[data-book-id='${bookId}']`)
        bookButton.classList.add('book__button--incart')
        bookButton.innerHTML = 'In The Cart'
    }
    if (basket.length) {
        cartEl.classList.add('cart__count--show')
        cartEl.innerHTML = basket.length
    }
}

const fetchBooks = async () => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${category}&startIndex=${startIndex}&maxResults=${maxResults}&key=${apiKey}`)
    const data = await response.json()
    displayBooks(data.items)
    startIndex += maxResults
}

const categoriesEl = document.querySelectorAll('.categories__item')

const setCategory = (categoryName) => {
    categoriesEl.forEach((el) => {
        if (el.getAttribute('data-category') === categoryName) {
            el.className = 'categories__item categories__item--active'
        } else {
            el.className = 'categories__item'
        }
    })
    category = categoryName
    let startIndex = 0
    booksContainer.innerHTML = ''
    fetchBooks()
}

categoriesEl.forEach((item) => {
    item.addEventListener('click', () => {
        const categoryName = item.getAttribute('data-category')
        setCategory(categoryName)
    })
})

const displayBooks = (books) => {
    books.forEach(book => {
        const bookElement = document.createElement('div')
        bookElement.className = 'book'
        const bookImage = document.createElement('img')
        bookImage.src = book.volumeInfo.imageLinks.thumbnail
        const bookInfo = document.createElement('div')
        bookInfo.className = 'book__info'
        bookInfo.innerHTML = `
            <div class="book__author">${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'No authors'}</div>    
            <h3 class="book__title">${book.volumeInfo.title}</h3>
            <div class=>${book.volumeInfo.publishedDate}</div>
            <div class="book__description">${book.volumeInfo.description ? book.volumeInfo.description : 'No description'}</div>
            <div class="book__price">${book.saleInfo.retailPrice ? book.saleInfo.retailPrice.amount : '-'}</div>
        `
        const cartButton = document.createElement('button')
        cartButton.classList.add('button')
        cartButton.classList.add('book__button')
        cartButton.setAttribute('data-book-id', book.id)
        cartButton.innerHTML = 'Buy Now'
        cartButton.addEventListener('click', () => toggleCartItem(book.id))
        bookInfo.appendChild(cartButton)
        bookElement.appendChild(bookImage)
        bookElement.appendChild(bookInfo)
        booksContainer.appendChild(bookElement)
    });
}

loadMoreButton.addEventListener('click', fetchBooks)

export { fetchBooks, displayBooks, setCategory }