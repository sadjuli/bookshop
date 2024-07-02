import { showSlide, nextSlide } from './slider.js'
import { setCategory, fetchBooks, displayBooks } from './books.js'

import '../styles/styles.css'

showSlide(0)
fetchBooks()