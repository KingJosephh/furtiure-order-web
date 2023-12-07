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
    'Antony 遮光窗簾': 0,
    'Charles 雙人床架': 0,
    'Antony 雙人床架／雙人加大': 0,
    'Louvre 雙人床架／雙人加大': 0,
    'Jordan 雙人床架／雙人加大': 0,
    'Antony 床邊桌': 0,
    'Louvre 單人床架': 0,
    'Charles 系列儲物組合': 0
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
            if(sellProduct[productsType.title] === 0){
                sellProduct[productsType.title] = 1
            }else{
                sellProduct[productsType.title] += 1
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
            type: "donut",
            columns: aa,
            colors:{
                "Antony 遮光窗簾": "#DACBFF",
                "Charles 雙人床架": "#9D7FEA",
                "Antony 雙人床架／雙人加大": "#5434A7",
                "Louvre 雙人床架／雙人加大": "#63c522",
                "Jordan 雙人床架／雙人加大": "#d12293",
                "Antony 床邊桌": "#438dcb",
                "Louvre 單人床架": "#ff7803",
                "Charles 系列儲物組合": "#cb45cc",
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