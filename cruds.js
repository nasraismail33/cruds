
let title = document.getElementById ('title')
let price = document.getElementById ('price')
let taxes = document.getElementById ('taxes')
let ads = document.getElementById ('ads')
let discount = document.getElementById ('discount')
let total = document.getElementById ('total')
let count = document.getElementById ('count')
let category = document.getElementById ('category')
let submit = document.getElementById ('submit')


let mood = 'create';
let tmp;

//console.log(title,price,taxes,ads,discount,total,count,category)
//get total
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML = result;
        total.style.background = 'blue';
    }else{
        total.innerHTML ='';
        total.style.background = 'red';  
    }
}

//create product
let datapro;
if(localStorage.product != null){
  datapro = JSON.parse(localStorage.product)
}else{
   datapro = [];

}

submit.onclick = function(){
  let newpro = {
    title:title.value,
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value,
  }

if(mood === 'create'){
  if(newpro.count > 1){
    for(let i = 0; i < newpro.count;i++){
      datapro.push(newpro);
    }
  }else{
    datapro.push(newpro);
  }
}else{
  datapro[tmp] = newpro;
  mood = 'create';
  submit.innerHTML = 'create';
  count.style.display = 'block';
}

  

  
  localStorage.setItem('product',JSON.stringify(datapro))
  console.log(datapro)

  cleardata()
  showdata()
}


//CLEAR
function cleardata(){
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value ='';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
};

//read
function showdata(){
  getTotal();
  let table = '';
  for(let i = 0; i < datapro.length;i++){
    //table = datapro[i];
   //console.log(table)
   table += `
   <tr>
   <td>${i} </td>
   <td> ${datapro[i].title}</td>
   <td>${datapro[i].price} </td>
   <td> ${datapro[i].taxes}</td>
   <td>${datapro[i].ads} </td>
   <td>${datapro[i].discount} </td>
   <td> ${datapro[i].total}</td>
   <td> ${datapro[i].category}</td>
   <td><button onclick="updatedata(${i})" >update</button> </td>
   <td><button onclick="deletedata(${i})" >  delete</button> </td>
</tr>
   `
  }
  document.getElementById ('tbody').innerHTML = table;
  let btnDelete = document.getElementById('deletAll')
  if(datapro.length > 0){
    btnDelete.innerHTML = `
    <button onclick="deleteAll()" >delete All (${datapro.length}) </button> 
    `
  }else{
    btnDelete.innerHTML = ''
  }

}
showdata()



function deletedata(i){
 // console.log(i)
 datapro.splice(i,1)
 localStorage.product = JSON.stringify(datapro)
 showdata()
}



function deleteAll(){
  localStorage.clear()
  datapro.splice(0)
  showdata()

}

//count


//update
function updatedata(i){
  //console.log(i)
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  getTotal()
  count.style.display = 'none';
  category.value = datapro[i].category;
  submit.innerHTML = 'update';
  mood = 'update';
  tmp = i;
  scroll({
    top:0,
    behavior:'smooth',
  })
}

//search
let searchmood = 'title';

function getsearchmood(id){
  let search = document.getElementById('search');
  if(id == 'searchtitle'){
    searchmood = 'title';
    search.placeholder = 'Search By Title';
  }else{
    searchmood = 'category';
    search.placeholder = 'Search By category';
  }
  search.focus()
 // console.log(searchmood)
}

function searchdata(value){
  let table = '';
  //console.log(value);
  if(searchmood == 'title'){

    for(let i = 0; i < datapro.length;i++){
      if(datapro[i].title.includes(value)){
        //console.log(i)
        table += `
        <tr>
        <td>${i} </td>
        <td> ${datapro[i].title}</td>
        <td>${datapro[i].price} </td>
        <td> ${datapro[i].taxes}</td>
        <td>${datapro[i].ads} </td>
        <td>${datapro[i].discount} </td>
        <td> ${datapro[i].total}</td>
        <td> ${datapro[i].category}</td>
        <td><button onclick="updatedata(${i})" >update</button> </td>
        <td><button onclick="deletedata(${i})" >  delete</button> </td>
     </tr>
        `
      }
    }
 
  }else{
    for(let i = 0; i < datapro.length;i++){
      if(datapro[i].category.includes(value)){
        //console.log(i)
        table += `
        <tr>
        <td>${i} </td>
        <td> ${datapro[i].title}</td>
        <td>${datapro[i].price} </td>
        <td> ${datapro[i].taxes}</td>
        <td>${datapro[i].ads} </td>
        <td>${datapro[i].discount} </td>
        <td> ${datapro[i].total}</td>
        <td> ${datapro[i].category}</td>
        <td><button onclick="updatedata(${i})" >update</button> </td>
        <td><button onclick="deletedata(${i})" >  delete</button> </td>
     </tr>
        `
      }
    }



  }
  document.getElementById ('tbody').innerHTML = table;
}




console.log()

