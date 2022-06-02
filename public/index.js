const socket = io();
const productForm = document.getElementById('productForm')

fetch('http://localhost:8080/products')
  .then(response => response.json())
  .then(data => {
    const containerProduct = document.getElementById('containerProduct')
   const products=data
    .map(product => {
        const productTemplate = `
        <tr>
        <th scope="row">${product.id}</th>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td><img src="${product.image}" width="100px" /></td>
      </tr>
        `
  
        return productTemplate
      })
      .join('')
  
      containerProduct.innerHTML = products
   
  })
  .catch(e => console.error(e))


productForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const title = document.getElementById('title')
    const price = document.getElementById('price')
    const image = document.getElementById('image')
  const message = document.getElementById('message')

  
    const product = {
      title: title.value,
      price: price.value,
      image: image.value,
    }
    fetch('http://localhost:8080/createProduct', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  })
  .then(response => response.json())
  .then(data => {
   
   message.innerHTML = 'Producto creado correctamente'
    title.value = ''
    price.value = ''
    image.value = ''

  })
  .catch(e => console.error(e))
  
  console.log(product)
})

socket.on('newProduct', data => {
    const containerProduct = document.getElementById('containerProduct')
      containerProduct.innerHTML += `
      <tr>
      <th scope="row">${data.id}</th>
      <td>${data.title}</td>
      <td>${data.price}</td>
      <td><img src="${data.image}" width="100px" /></td>
    </tr>
      `
    })