const list = document.querySelector('.list');
const delSingleOrderBtn = document.querySelector('.delSingleOrder-Btn')
const discardAllBtn = document.querySelector('.discardAllBtn')
let sellProductLis = []

axios.get('https://livejs-api.hexschool.io/api/livejs/v1/admin/joseph-aa-api/orders', {
    headers: {
        Authorization: `uaxtW0KHOcU6Yd2ZJItSl0Wec9A3`,
        },
})
.then((res) => {
    console.log(res.data.orders)
    let orders = res.data.orders
    showList(orders)
    let sellProductLis = Object.entries(sellProduct).map(([label, value]) => [label, value]);
    toC3(sellProductLis)
})
.catch((err) => {
    console.log(err)
})

let sellProduct = {
    '收納': 0,
    '床架': 0,
    '窗簾': 0,
    '其他': 0,
}
// let sellProduct = {}
console.log(sellProduct)
const showList = (aa) => {
    let str = '';
    aa.forEach(elm => {
        let productStr = '';
        for(let i = 0; i < elm.products.length; i++){
            productStr += `<p>${elm.products[i].title}</p>`;
            let productsType = elm.products[i]
            if(sellProduct[productsType.category] === 0){
                sellProduct[productsType.category] = 1
            }else{
                sellProduct[productsType.category] += 1
            }
        }
        str += `<tr>
            <td>${elm.createdAt}</td>
            <td>
                <p>${elm.user.name}</p>
                <p>${elm.user.tel}</p>
            </td>
            <td>${elm.user.address}</td>
            <td>${elm.user.email}</td>
            <td class="product">
                ${productStr}
            </td>
            <td>2021/03/08</td>
            <td class="orderStatus">
                <a href="#">${elm.paid}</a>
            </td>
            <td>
                <input type="button" class="delSingleOrder-Btn" data-Orders="${elm.id}" value="刪除">
            </td>
        </tr>`;
    });
    list.innerHTML = str;
};
list.addEventListener('click' , (e) => {
    let btnId = e.target.getAttribute('data-Orders')
    console.log(btnId)
    axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/admin/joseph-aa-api/orders/${btnId}` , {
        headers: {
            Authorization: `uaxtW0KHOcU6Yd2ZJItSl0Wec9A3`,
            },
    }).then((res) => {
        let orders = res.data.orders
        showList(orders)
        let sellProductLis = Object.entries(sellProduct).map(([label, value]) => [label, value]);
        toC3(sellProductLis)
    })
    .catch((err) => {
        console.log(err)
    })
})

// C3.js
const toC3 = (aa) => {
    let chart = c3.generate({
        bindto: '#chart', // HTML 元素绑定
        data: {
            type: "pie",
            columns: aa,
            colors:{
                '收納': "#DACBFF",
                '床架': "#9D7FEA",
                '窗簾': "#5434A7",
                '其他': "#63c522",
            },
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        donut: {
            title: "Iris Petal Width"
        }
    });
}
discardAllBtn.addEventListener('click' , (e) => {
    axios.delete('https://livejs-api.hexschool.io/api/livejs/v1/admin/joseph-aa-api/orders', {
        headers: {
            Authorization : 'uaxtW0KHOcU6Yd2ZJItSl0Wec9A3'
        }
    })
    .then((res) => {
        let orders = res.data.orders
        showList(orders)
        let sellProductLis = Object.entries(sellProduct).map(([label, value]) => [label, value]);
        toC3(sellProductLis)
    }).catch((err) => {
        console.log(err)
    })
})