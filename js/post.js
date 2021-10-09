//https://devpost-72887-default-rtdb.firebaseio.com/tags
//obtiene tags

let postObj = {}


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

let arrayImages = [];

post.change(obtenerDatos)
titlePost.change(obtenerDatos)
imagenPrincipal.change(obtenerDatos)
imagenes.change(obtenerDatos)
tags.change(obtenerDatos)


function obtenerDatos(e) {

   postObj[e.target.name] = e.target.value
   console.log(postObj);
}

btnSubmit.click( e =>{
   e.preventDefault()
//   postObj.fecha = new Date.now();
   postObj.usuario = getUser()
   console.log(postObj);
  // createProduct(postObj)

})

const createProduct = (pObject) => {
   $.ajax({
      method: "POST",
      url: "https://devpost-72887-default-rtdb.firebaseio.com/posts.json",
      data: JSON.stringify(pObject),
      success: (response) => {
         console.log(response);
      },
      error: error => {
         console.log(error);
      }
   })
}

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

//console.log(getUser());