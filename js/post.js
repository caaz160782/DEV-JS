//https://devpost-72887-default-rtdb.firebaseio.com/tags
import {
   postObj,
   btnSubmit,
   formulario,
   misListener,
   reiniciarObjeto,
   }
         from './variables.js'

let editando = false
let arrayTags = []
misListener()
//postObj.tags = []
//esta funcion de encarga de on¿btener el valor de la variable enviada desde la pagina index
const queryString =  ()=> {
   let query_string = {};
   let query = window.location.search.substring(1);
   let vars = query.split("&");
   for (let i=0;i<vars.length;i++) {
     let pair = vars[i].split("=");
     if (typeof query_string[pair[0]] === "undefined") {
       query_string[pair[0]] = decodeURIComponent(pair[1]);
     } else if (typeof query_string[pair[0]] === "string") {
       let arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
       query_string[pair[0]] = arr;
     } else {
       query_string[pair[0]].push(decodeURIComponent(pair[1]));
     }
   }
   return query_string;
 }
let objectIdPost= queryString()

//para llebar el select
const getTags = () => {//para llebar el select
    let tags
    $.ajax({
        method: "GET",
        url: "https://devpost-72887-default-rtdb.firebaseio.com/tags.json",
        success: response => {
            // console.log('response al terminar la peticion',response)
            tags = response
           // llenaTags(tags)
        },
        error: error => {
            console.log(error)
        },
        async: false
    })
    return tags
}
 //pintar slect //id="tags"
 const llenaTags =(tags )=>{
    for (const key in tags) {
       $("#tags").append('<option value=' + key + '>' + tags[key] + '</option>');
    }
 }
 //console.log(getTags());
 llenaTags(getTags())
  //llena input

const llenaInpuTag=()=>{
   //let select_item = $("#tags").val()
    let select_text = $("#tags option:selected").text()
    $("#tags option:selected").remove()
     arrayTags=[...arrayTags, select_text]
     postObj.tags = arrayTags
    $("#inputTags").val(arrayTags.toString())
 }
//metodo change en tag
$("#tags").change(function() {
   //llenamos el input
   llenaInpuTag()
   console.log(arrayTags);
})


btnSubmit.click( e =>{
   e.preventDefault()
   const tiempoTranscurrido = Date.now();
   const fecha = new Date(tiempoTranscurrido);
   fecha.toUTCString()
   
   const { titlePost, txtPost, imgUrlPostContent, imgUrlPostTiltle, tags } = postObj
   if (
      titlePost === undefined || titlePost === '' || tags.length === 0
      || txtPost === undefined || txtPost === '' || imgUrlPostContent === undefined || imgUrlPostTiltle === undefined
   ) {
      alert('campos obligatorios')
      return
   }

   if(!editando){
   postObj.fecha = fecha
   postObj.usuario = getUser()
   postObj.reactionsCount = 0
   postObj.countComment =0
   createPost(postObj)
} else {
   postObj.fecha = fecha
      if (
         titlePost === undefined || titlePost === '' || tags.length === 0
         || txtPost === undefined || txtPost === '' || imgUrlPostContent === undefined || imgUrlPostTiltle === undefined
      ) {
         alert('campos obligatorios')
         return
      }

      updatingPost(postObj)
      editando = false
      btnSubmit.text('Create Post');
   }
   //getPostAjax()
   reiniciarObjeto()
   formulario[0].reset()
})



const createPost = (pObject) => {
   $.ajax({
      method: "POST",
      url: "https://devpost-72887-default-rtdb.firebaseio.com/posts.json",
      data: JSON.stringify(pObject),
      success: (response) => {
      //   console.log(response);
      alert("post creado")
      },
      error: error => {
         console.log(error)
      }
   })
}


function updatingPost(post) {
   console.log('desde editar');
   let { id } = post
   console.log(id);
   $.ajax({
      method: "PUT",
      url: `https://devpost-72887-default-rtdb.firebaseio.com/posts/${id}.json`,
      data: JSON.stringify(post),
      success: (response) => {
         console.log('se hizo el update', response);        
      },
      error: error => {
         console.log(' NO se hizo el update', error);
      }
   })

}

function preparingUpdatingPost(todoUnPost){
   const { titlePost, txtPost,id, imgUrlPostContent, imgUrlPostTiltle, tags, usuario} = todoUnPost
   //console.log(id);
   //aca relleno los inputs con los valores del objetoque quiero editar
   //console.log(titlePost, txtPost);
   $('#textareaTitle').val(titlePost)
   $('#textarea-post').val(txtPost)
   $("#inputTags").val(tags.toString())
   //$('#inputGroupFile01').val(imgUrlPostContent)
   //devolver valores al objeto
/*   console.log(titlePost, txtPost);
   $('#textareaTitle').val(titlePost)
   $('#textarea-post').val(txtPost)
   tags.forEach((x,i) =>  $('#inputTags').val(`${x}, `))
*/
   postObj.id = id
   postObj.imgUrlPostContent = imgUrlPostContent
   postObj.imgUrlPostTiltle  = imgUrlPostTiltle
   postObj.tags  = tags
   postObj.usuario = usuario
   postObj.txtPost = txtPost
   postObj.titlePost = titlePost
   //cambiar boton aca
   btnSubmit.text('Guardar Cambios');
   editando = true
}
//preparingUpdatingPost({ titlePost: 'clau', txtPost: 'rgguez', id:"-MlXwRrmCgzevdklXuPx" })
function getUser(){
   let userPost = {}   
   $.ajax({
      url: 'https://randomuser.me/api/',
      dataType: 'json',
      success: function (data) {
      //pictureProfileUser = data.results[0].picture.thumbnail;
     //nameUser = data.results[0].login.username     
        userPost.pictureProfileUser = data.results[0].picture.thumbnail;
        userPost.nameUser = data.results[0].login.username
      },
      async: false
   });
   return userPost
}
//let info.lorem(50) 
 // se busca el post por medio del id
const findPost = (idPost) => {
   let post
   $.ajax({
       method: "GET",
       url: `https://devpost-72887-default-rtdb.firebaseio.com/posts/${idPost}.json`,
       success: response => {            
           post = response
//console.log(post)
           preparingUpdatingPost(post)
       },
       error: error => {
           console.log(error)
       },
       async: false
   })
   return post
}

if(objectIdPost.idpost !== "undefined") {
   let idPost=objectIdPost.idpost
   findPost(idPost)
   console.log( findPost(idPost) )
 }
//NUEVA REVISAR
/*function mostrarPostEnHtml(arregloKoders){
   console.log('*************');
   console.log('FUNCION DE PINTAR');
   console.log(arregloKoders);
   console.log('*************');

   let aside = $('#aside-right')
    aside.text('')

   arregloKoders.forEach( post =>{
      const { id, titlePost} = post
      let pNombre = document.createElement('p')
      pNombre.textContent = id
      let btnEliminar = document.createElement('button')
      btnEliminar.textContent = 'delete'
      btnEliminar.classList.add('btn', 'btn-danger')
      btnEliminar.onclick = () => deletePost(id)
      let btnEditar = document.createElement('button')
      btnEditar.textContent = 'edite'
      btnEditar.classList.add('btn', 'btn-warning')
      btnEditar.onclick = () => preparingUpdatingPost(post)
      aside.append(btnEliminar)
      aside.append(btnEditar)
      aside.append(pNombre)
   })

}
*/


