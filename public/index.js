const socket = io();
const productForm = document.getElementById('productForm')

productForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const title = document.getElementById('title')
    const price = document.getElementById('price')
    const image = document.getElementById('image')
  
    const product = {
      title: title.value,
      price: price.value,
      image: image.value,
    }
    console.log(product)
})