let products = [
    {
        id: 0,
        price:  1400,
        stock: 10,
        name: "Hoodies",
        urlImage:"./assets/images/featured1.png"
    },
    {
        id: 1,
        price:  1400,
        stock: 15,
        name: "Shirts",
        urlImage:"./assets/images/featured2.png"
    },
    {
        id: 2,
        price:  1400,
        stock: 20,
        name: "Sweatshirts",
        urlImage:"./assets/images/featured3.png"
    }
]
const hoodies = [{
    id: 0,
    price:  1400,
    stock: 10,
    name: "Hoodies",
    urlImage:"./assets/images/featured1.png"
}]
const shirts = [
    {
        id: 1,
        price:  1400,
        stock: 15,
        name: "Shirts",
        urlImage:"./assets/images/featured2.png"
    }
]
const sweatshirts = [ {
    id: 2,
    price:  1400,
    stock: 20,
    name: "Sweatshirts",
    urlImage:"./assets/images/featured3.png"
}]

const selectCategory = document.querySelector('.catalogue__nav')
const contenItems = document.querySelector(".catalogue__item");
const iconCart = document.querySelector('.bx-shopping-bag');
const contentCart = document.querySelector('.contentcartshop');
const contentcartshop__item = document.querySelector('.contentcartshop__item');
const contentTotal = document.querySelector('.contentcartshop__total');

let objCartShop = {};

function printTotal(){
    const arrayItemShop = Object.values(objCartShop);
    
    if(!arrayItemShop.length)
    return(contentCart.innerHTML = `<div class="carrito__vacio"><h4>Your car is empty</h4></div>`);

    let total = arrayItemShop.reduce((acum, curr) =>{
        acum += curr.price * curr.amount;
        return acum;
    },0)

    contentTotal.innerHTML = `
    <div class="contentcartTotal">
    <h3>$${total}</h3>
    <buttom class="buy">Comprar</buttom>
    </div>`
}

function printProduct(products){
    let html = ``
products.forEach(({id,price,stock,name,urlImage}) =>{
    html += ` 
    <div class="product">
        <div class="product__img">
            <img src="${urlImage}" alt="${name}">
        </div>
        <div class="product__btn">
            <button class="btn__add" id="${id}">+</button>
        </div>
        <div class="product__body">
            <p><span>$${price}</span>|Stock:${stock}</p>
            <h3>${name}</h3>
        </div>
    </div>`;

});
contenItems.innerHTML = html
}

function printProductInCart(){
    let html = ``

    const arrayCartShop = Object.values(objCartShop);
    arrayCartShop.forEach(({id,price,stock,amount,name,urlImage}) =>{
        html +=`  <div class="product__cart">
        <div class="productcart__img">
            <img src="${urlImage}" alt="${name}">
        </div>
        <div class="productcart__info">
            <div class="productcart__subtittle"><h3>${name}</h3></div>
            <p>Stock:${stock}|<span>$${price}</span></p>
            <div class="productcart__btn">
                <button class="btncart__add" id="${id}">+</button>
                <p>Units:<strong>${amount}</strong></p>
                <button class="btn__rest" id="${id}">-</button>
            </div>
            
        </div>
        <div class="product__body">
            <a><i class='bx bx-trash-alt' id='${id}'></i></a>
        </div>
    </div>`;
    });

    contentcartshop__item.innerHTML = html

    printTotal();
}

printProduct(products);



selectCategory.addEventListener('click',(e) => {
    if(e.target.classList.contains('show__all')){
        printProduct(products)
    }
    if(e.target.classList.contains('hoodies')){
        printProduct(hoodies)
    }
    if(e.target.classList.contains('shirts')){
        printProduct(shirts)
    }
    if(e.target.classList.contains('sweatshirts')){
        printProduct(sweatshirts)
    }
});


contenItems.addEventListener('click',(e)=>{
    if(e.target.classList.contains('btn__add')){
        const idProduct = Number(e.target.id);
        
        const currentProduct = products.find((product)=> product.id ===idProduct);
    
        if(objCartShop[currentProduct.id]){
            if(currentProduct.stock === objCartShop[idProduct].amount)
                return alert("there is no availability of this product in stock");
            objCartShop[currentProduct.id].amount++;
        }else{ objCartShop[currentProduct.id] = {...currentProduct};
                objCartShop[currentProduct.id].amount= 1;
        }
        printProductInCart();
    }
});

contentcartshop__item.addEventListener('click',(e)=>{
    if(e.target.classList.contains('btncart__add')){
        const idProduct = Number(e.target.id);

        const currentProduct = products.find((product)=> product.id ===idProduct);
        
            if(currentProduct.stock === objCartShop[idProduct].amount)
                return alert("there is no availability of this product in stock");

        objCartShop[idProduct].amount++;
    }
    if(e.target.classList.contains('btn__rest')){
        const idProduct = Number(e.target.id);
        if(objCartShop[idProduct].amount === 1){
            const option = confirm('are you sure you want to delete this product?')
            if(option){ delete objCartShop[idProduct];
            }
        }else{
            objCartShop[idProduct].amount--;
        }
        
    }
    if(e.target.classList.contains('bx-trash-alt')){
        const idProduct = Number(e.target.id);
        const option = confirm('are you sure you want to delete this product?')
        if(option){ delete objCartShop[idProduct];
        }
    }
    printProductInCart();
});

iconCart.addEventListener("click", () => {
    contentCart.classList.toggle("contentcartshop__show");
});

contentTotal,addEventListener('click',(e) =>{
    if( e.target.classList.contains('buy')){
        const option = confirm('Make up?');
        if(option){
            products = products.map(product =>{
                if(objCartShop[product.id]?.id === product.id){
                    return{
                        ...product,
                        stock: product.stock - objCartShop[product.id].amount,
                    }
                }else{
                    return product
                }
            })
            objCartShop = {};
            printProduct(products);
            printProductInCart();
        }
    }
})