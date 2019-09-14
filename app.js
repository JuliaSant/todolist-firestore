const itemList = document.querySelector('#item-list');
const form = document.querySelector('#add-item-form');
const list = document.querySelector('ul');
//Criando elemento e atualiznado
function renderLista(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let desc = document.createElement('span');
    let cross = document.createElement('div');
    


    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    desc.textContent = doc.data().desc;
    cross.textContent = 'x';


    li.appendChild(name); 
    li.appendChild(desc);
    li.appendChild(cross);
    

    itemList.appendChild(li);

    //////Apagando
    cross.addEventListener('click', (e) =>{
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('lista').doc(id).delete();
    })

}

//atualizando
//db.collection('lista').get().then((snapshot) => {
   // snapshot.docs.forEach(doc => {
   //     renderLista(doc);
   // })
//});

////Salvando no bando
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('lista').add({
        name: form.name.value,
        desc: form.desc.value
    });
    form.name.value = '';
    form.desc.value ='';
})
/////Concluido
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

//Real-time
db.collection('lista').orderBy('desc').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    changes.forEach(change =>{
        if(change.type == 'added'){
            renderLista(change.doc);
        }else if(change.type == 'removed'){
            let li = itemList.querySelector('[data-id=' + change.doc.id + ']');
            itemList.removeChild(li);
        }
       // console.log(change.doc.data())
    })
})