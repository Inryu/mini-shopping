
// Fetch the items from the JSON file
function loadItems() {
    return fetch('data/data.json')
        .then(response => response.json())
        .then(json=>json.items);
        
}

// Update the list with the given items
// items배열 안의 값을 map을 통해 li 문자열로 만들고, 그 배열들을 join을 통해 하나의 문자열로 만듦.
function displayItems(items){
    const container=document.querySelector('.items');
    container.innerHTML=items.map(item=>createHTMLString(item)).join('');
}

//Create HTML list item from the given data items
function createHTMLString(item){
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
        <span class="item__description">${item.gender},${item.size}</span>
    </li>
    `
    ;
}

function onButtonClick(event,items){

    const dataset=event.target.dataset;
    const key=dataset.key;
    const value=dataset.value;

    if(key==null||value==null){
        return;
    }

    const filtered=items.filter(item=>item[key]==value); //item의 key(type or color)가 valus인 것만!    
    displayItems(filtered);
}


//버튼이 클릭되었을 때 동작! 필터링!
function setEventListeners(items){
    const logo=document.querySelector('.logo');

    //이벤트 위임
    const buttons=document.querySelector('.buttons'); //버튼 컨테이너 자체에 이벤트 리스너를 등록할 것임

    //로고는 모든 아이템 보여주기
    logo.addEventListener('click',()=>displayItems(items));
    
    //각 버튼은 필터링
    buttons.addEventListener('click',event=>onButtonClick(event,items));

}

// main
loadItems()
    .then(items => {
        displayItems(items);
        setEventListeners(items);
    })
    .catch(console.log);
