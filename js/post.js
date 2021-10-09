//https://devpost-72887-default-rtdb.firebaseio.com/tags
//obtiene tags

let postObj = {}
postObj.tags = []
let editando = false

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
let arrayTags=[]
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

// obtener los valores de los inputs

//SELECTORES

let imagenPrincipal = $('#inputGroupFile01')
let imagenes = $('#inputGroupFile02')
let titlePost = $('#textareaTitle')
let tags= $('#inputTags');
let post = $('#textarea-post');

let btnSubmit = $('#btn-submit')
let formulario = $('.form-group')

let arrayImages = [];

post.change(obtenerDatos)
titlePost.change(obtenerDatos)
imagenPrincipal.change(obtenerDatos)


imagenes.change(obtenerDatos)
tags.change(obtenerDatos)


function obtenerDatos(e) {
   postObj[e.target.name] = e.target.value
   //console.log(postObj);

}

btnSubmit.click( e =>{
   e.preventDefault()

   postObj.imgUrlPostTiltle= retornodecargaimagen 

   imgUrlPostContent
  //postObj.fecha = new Date.now();
   postObj.usuario = getUser()
  // console.log(postObj);
//   createProduct(postObj)

const { titlePost, txtPost, imgUrlPostContent, imgUrlPostTiltle, tags } =postObj
 if (titlePost === undefined || tags.length === 0 || txtPost === undefined || imgUrlPostContent === undefined || imgUrlPostTiltle === undefined  ){
   alert('campos obligatorios')
   return
  }

if(!editando){

   postObj.usuario = getUser()
   createPost(postObj)
} else {
      console.log(postObj)
      alert('editando')
      updatingPost(postObj)
      editando = false
      btnSubmit.text('Create Post');
   }
   getPostAjax()
})


const getPostAjax = () => {
   let postsArray = []

   $.ajax({
      method: "GET",
      url: "https://devpost-72887-default-rtdb.firebaseio.com/posts.json",
      success: response => {
       //  console.log(response);
         postsArray = Object.keys(response).map( key => {
            return { ...response[key], id: key}
         })
           mostrarPostEnHtml(postsArray)
      },
      error: error => {
         console.log(error)
      },
      async: false
   })

}


getPostAjax()

const createPost = (pObject) => {
   $.ajax({
      method: "POST",
      url: "https://devpost-72887-default-rtdb.firebaseio.com/posts.json",
      data: JSON.stringify(pObject),
      success: (response) => {
      //   console.log(response);
         getPostAjax()
      },
      error: error => {
         console.log(error);
      }
   })
}
//NUEVA REVISAR
function deletePost(id) {
   console.log(id);
   $.ajax({
      method: "DELETE",
      url: `https://devpost-72887-default-rtdb.firebaseio.com/posts/${id}.json`,

      success: (response) => {
         console.log(response);
         getPostAjax()
      },
      error: error => {
         console.log(error);
      }
   })
}

//NUEVA REVISAR
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
        getPostAjax()
      },
      error: error => {
         console.log(' NO se hizo el update', error);
      }
   })

}

//
function preparingUpdatingPost(todoUnPost){
   const { titlePost, txtPost,id, imgUrlPostContent, imgUrlPostTiltle, tags, usuario} = todoUnPost
   console.log(id);
   //aca relleno los inputs con los valores del objetoque quiero editar
   console.log(titlePost, txtPost);
   $('#textareaTitle').val(titlePost)
   $('#textarea-post').val(txtPost)
   //$('#inputGroupFile01').val(imgUrlPostContent)

   //devolver valores al objeto
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
   //let nameUser
  // let pictureProfileUser
   $.ajax({
      url: 'https://randomuser.me/api/',
      dataType: 'json',
      success: function (data) {
     //   pictureProfileUser = data.results[0].picture.thumbnail;
       // nameUser = data.results[0].login.username
        userPost.pictureProfileUser = data.results[0].picture.thumbnail;
        userPost.nameUser = data.results[0].login.username
      },
      async: false
   });
   return userPost
}
//NUEVA REVISAR
function mostrarPostEnHtml(arregloKoders){
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




//console.log(getUser());
/**
  const date = new Date()
  const record = date.getFullYear() +'-'+ date.getMonth() +'-'+ date.getDate()
  console.log(record)
 */