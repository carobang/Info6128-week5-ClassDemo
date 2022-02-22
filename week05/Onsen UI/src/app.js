// document.addEventListener('init',()=>{
//     const alertBtn = document.querySelector('#alertBtn');
//     console.log(alertBtn)
// })
let elemnets = {
    navigator: null,
    alertBtn: null,
    confirmBtn: null,
    promptBtn: null,
    toastBtn: null,
    sheetBtn: null,
    tabsRow: null,
    cardsRow: null,
    emptyRow:null,
    switch:null,
};

const showAlert = () =>{
    ons.notification.alert('This is an alert!');
}
const showConfirm = async() =>{
    try{
        const result = await ons.notification.confirm('This is a question?');
        ons.notification.alert(`You selected: ${result ? 'Ok' : 'Cancle'}`);
    }
    catch(e){
        console.error(e)
    }
}
const showPrompt = async() =>{
    try{
        const result = await ons.notification.prompt('This is also a question?');
        const message = result ? `Entered: ${result}` : 'Entered Nothing!';
        ons.notification.alert(message);
    }
    catch(e){
        console.error(e)
    }
}
const showToast = () =>{
    ons.notification.toast('Testing')
}
const showSheet = async() =>{
    const btns =[
        'Button 0',
        'Button 1',
        {
            lable:'Button 2',
            modifier:'destructive',
            icon:'md-done'
        },
        {
            lable: 'Cancel',
            icon:'md-close'
        },
    ];
        try{
            const index = await ons.openActionSheet({
                title:'My Action Sheet',
                cancellable: true,
                buttons:btns,
            });
            const result = btns[index];
            ons.notification.alert(`You selected: ${result?.lable || result || 'nothing'}`)
        }
        catch(e){
            console.error(e);
        }
}

const changePage = (page,data)=>{
    elemnets.navigator.pushPage(page,{data});
}

const changeStyles= (e)=>{
    const plat = e.target.checked ? 'android' : 'ios';
    ons.forcePlatformStyling(plat);
}

document.addEventListener('init',(e)=>{
    if(e.target.id==='home'){
        elemnets = {
            navigator: document.querySelector('#navigator'),
            alertBtn: document.querySelector('#alertBtn'),
            confirmBtn: document.querySelector('#confirmBtn'),
            promptBtn: document.querySelector('#promptBtn'),
            toastBtn: document.querySelector('#toastBtn'),
            sheetBtn: document.querySelector('#sheetBtn'),
            emptyRow: document.querySelector('#empty-row'),
            tabsRow: document.querySelector('#tabs-row'),
            cardsRow: document.querySelector('#cards-row'),
            switch: document.querySelector('#switch'),
    
        }
    
        elemnets.alertBtn.addEventListener('click',showAlert);
        elemnets.confirmBtn.addEventListener('click',showConfirm);
        elemnets.promptBtn.addEventListener('click',showPrompt);
        elemnets.toastBtn.addEventListener('click',showToast);
        elemnets.sheetBtn.addEventListener('click',showSheet);
    
        ons.preload(['views/tabs.html', 'views/cards.html']);
        elemnets.emptyRow.addEventListener('click',() => changePage('empty.html'));
        elemnets.tabsRow.addEventListener('click',() => changePage('views/tabs.html'));
        elemnets.cardsRow.addEventListener('click',() => changePage('views/cards.html',{id:"1234", text:"Hello"}));
        elemnets.switch.addEventListener('change',changeStyles)
    }

    if(e.target.id==='cards'){
       console.log(elemnets.navigator.topPage.data);
        elemnets.cardBtn= document.querySelector('#cardBtn');
        elemnets.cardBtn.addEventListener('click',()=> changePage('views/tabs.html'));
    }
});
//padd the history with an extra page
window.addEventListener('load',() => window.history.pushState({ },''));
//when the back button is pressed, if there is more pages on our navigator, we will popPage(), else we will exit our application
window.addEventListener('popstate',() =>{
    const pages = elemnets.navigator.pages;
    if(pages && pages.length >1){
        elemnets.navigator.popPage();
        window.history.pushState({ },'');
    }
    else{
        window.history.back();
    }
})