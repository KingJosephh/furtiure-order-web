const productWrap = document.querySelector('.productWrap')
const addCartList = document.querySelector('.addCartList')
const totalPrice = document.querySelector('.totalPrice')
let data;
let carArray;
let addDataId = [];
let total = 0;
axios.get('https://livejs-api.hexschool.io/api/livejs/v1/customer/joseph-aa-api/carts')
.then((res) => {
    console.log(res)
})
.catch((err) => {
    console.log(err)
})
axios.get('https://livejs-api.hexschool.io/api/livejs/v1/customer/joseph-aa-api/products')
.then((res) => {
    data = res.data.products
    render()
    console.log(data)
})
.catch((err) => {
    console.log(err)
})
const render = () => {
    let str = '';
    data.forEach(item => {
        str += `<li class="productCard">
        <h4 class="productType">新品</h4>
        <img src="${item.images}" alt="">
        <a href="#" class="addCardBtn" data-productId="${item.id}">加入購物車</a>
        <h3>${item.title}</h3>
        <del class="originPrice">NT$${item.origin_price}</del>
        <p class="nowPrice">NT$${item.price}</p>
    </li>`
    });
    productWrap.innerHTML = str;
}
productWrap.addEventListener('click' , (e) => {
    event.preventDefault();
    let aa = e.target
    if(aa.textContent === "加入購物車"){
        let getId = aa.getAttribute('data-productId')
        data.forEach(item => {
            if(item.id === getId){
                addDataId.push(item.id)
            }
        })
        renderAddProduct()
    }
})
const renderAddProduct = () => {
    let countId = {};
    let str = '';
    let total = 0;
    addDataId.forEach(item => {
        countId[item] = (countId[item] || 0) + 1;
    });
    Object.entries(countId).forEach(([itemId, itemCount]) => {
        axios.post('https://livejs-api.hexschool.io/api/livejs/v1/customer/joseph-aa-api/carts',{
            "data": {
                "productId": itemId,
                "quantity": itemCount
            }
        }).then((res) => {
            let shop = res.data.carts
            total = res.data.finalTotal
            console.log(res)
            showCarList(shop)
            totalPriceGet(total)
        }).catch((err) => {
            console.log(err)
        })
    });
}
const showCarList = (aa) => {
    let str = '';
    aa.forEach(item => {
        str += `<tr>
                <td>
                    <div class="cardItem-title">
                        <img src="${item.product.images}" alt="">
                        <p>${item.product.title}</p>
                    </div>
                </td>
                <td>NT$${item.product.price}</td>
                <td>${item.quantity}</td>
                <td>NT$${item.product.price * item.quantity}</td>
                <td class="discardBtn">
                    <a href="#" class="material-icons" deleteId="${item.id}">
                        clear
                    </a>
                </td>
            </tr>`
    })
    addCartList.innerHTML = str;
}
// shopCareList()
const totalPriceGet = (aa) => {
    let getTotal = `<tr>
                    <td>
                        <a href="#" class="discardAllBtn">刪除所有品項</a>
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                        <p>總金額</p>
                    </td>
                    <td>NT$${aa}</td>
                </tr>`
                totalPrice.innerHTML = getTotal;
}
totalPriceGet(total)

addCartList.addEventListener('click' ,(e) => {
    event.preventDefault();
    let deleteObjId = e.target.getAttribute('deleteId')
    console.log(deleteObjId)
    axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/customer/joseph-aa-api/carts/${deleteObjId}`)
    .then((res) => {
        let shop = res.data.carts
        console.log(res)
        showCarList(shop)
    }).catch((err) => {
        console.log(err)
    })
})
totalPrice.addEventListener('click' , (e) => {
    event.preventDefault();
    if(e.target.textContent === "刪除所有品項"){
        axios.delete('https://livejs-api.hexschool.io/api/livejs/v1/customer/joseph-aa-api/carts')
        .then((res) => {
            let shop = res.data.carts
            total = 0
            console.log(shop)
            showCarList(shop)
            totalPriceGet(total)
        }).catch((err) => {
            console.log(err)
            alert('購物車內已經沒有商品了 RRR ((((；゜Д゜)')
        })
    }
})

const customerName = document.querySelector('#customerName')
const customerPhone = document.querySelector('#customerPhone')
const customerEmail = document.querySelector('#customerEmail')
const customerAddress = document.querySelector('#customerAddress')
const tradeWay = document.querySelector('#tradeWay')
const orderInfoBtn = document.querySelector('.orderInfo-btn')

orderInfoBtn.addEventListener('click' , (e) => {
    event.preventDefault();
    if(customerName.value && customerPhone.value && customerEmail.value && customerAddress.value && tradeWay.value !== ''){
        axios.post('https://livejs-api.hexschool.io/api/livejs/v1/customer/joseph-aa-api/orders' , {
            "data": {
                "user": {
                "name": customerName.value,
                "tel": customerPhone.value,
                "email": customerEmail.value,
                "address": customerAddress.value,
                "payment": tradeWay.value
                }
            }
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }   
})