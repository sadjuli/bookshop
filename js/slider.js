let currentSlide = 0
const slider = document.querySelectorAll('.slider')
const slides = document.querySelectorAll('.slide')
const pins = document.querySelectorAll('.slider__pin')

const showSlide = (index) => {
    slider[0].style.transform = `translateX(-${(index) * 1120}px)`
    pins.forEach((pin, idx) => {
        pin.classList.remove('slider__pin--active')
        if (idx === index) {
            pin.classList.add('slider__pin--active')
        }
    })
}

const nextSlide = () => {
  currentSlide = (currentSlide + 1) % slides.length
  showSlide(currentSlide)
}

document.querySelectorAll('.slider').forEach((slide, index) => {
  slide.addEventListener('click', () => {
    nextSlide()
  })
})

pins.forEach((pin, idx) => {
    pin.addEventListener('click', () => showSlide(idx))
})

export { showSlide, nextSlide }