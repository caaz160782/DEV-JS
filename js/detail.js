let objetPost

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

const findPost = (idPost) => {
    let post
    $.ajax({
        method: "GET",
        url: `https://devpost-72887-default-rtdb.firebaseio.com/posts/${idPost}.json`,
        success: response => {
            post = response
            console.log(post)      
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
     objetPost=findPost(idPost)   
  }

 const createNode = (typeElement, text,arrayClass) => {
    let node = document.createElement(typeElement)
    node.textContent = text
    arrayClass.forEach(className => {
        node.classList.add(className)
    });    
   return node
}

  const drawPost =(objetPost) =>{
    let mainPost = document.getElementById("mainPost")    
    while(mainPost.lastElementChild) {
        mainPost.removeChild(mainPost.lastElementChild)
    }  
 //  for (const key in objetPost) {
        //console.log(key)
        //console.log(objetPost[key])
    let {fecha,imgUrlPostContent,imgUrlPostTiltle,opiniones,tags,titlePost,txtPost,usuario,reactionsCount,countComment}= objetPost

    let divImg= createNode("div",null,["dibujo-react"])
      mainPost.appendChild(divImg)
    let imgPost= createNode("img",null,["rounded","w-100","mg-fluid"])
    imgPost.setAttribute('src',imgUrlPostTiltle )
    imgPost.setAttribute('alt',"principal")
    imgPost.setAttribute('height',"274px")
    imgPost.setAttribute('width',"751px")
    divImg.appendChild(imgPost)
  
    let articleContend = createNode("article",null,["contenedor-post","m-1"])
    mainPost.appendChild(articleContend)

    let divPx = createNode("div",null,["px-2"])
    articleContend.appendChild(divPx)

    let divAutor = createNode("div",null,["my-3"])
    divAutor.setAttribute('id',"autora")  
    divPx.appendChild(divAutor)
   
    let imgAutor= createNode("img",null,["avatar-read"])
    imgAutor.setAttribute('src',usuario.pictureProfileUser )
    imgAutor.setAttribute('alt',"user")
    imgAutor.setAttribute('width',"35px")
    divAutor.appendChild(imgAutor)

    let aAutor= createNode("a",usuario.nameUser,["font-weight-bold","py-1"])
    aAutor.setAttribute('href',"#")
    divAutor.appendChild(aAutor)

    let spanAutor= createNode("span",fecha,["mx-2"])
     divAutor.appendChild(spanAutor)

    let hTitle = createNode("h1",titlePost,["react","d-inline-block","mt-3","mt-lg-5","mb-md-2","mb-lg-3","font-weight-bold"])
    divPx.appendChild(hTitle)

    tags.forEach((tag) => {
        let divTagsPost= createNode("div",`#${tag}`,["flex-mark","pl-2","pl-md-2","d-inline"])  
        divPx.appendChild(divTagsPost)          
       })

    let divtext = createNode("div",null,["my-3"])
        divtext.setAttribute('id',"textoPost")  
      divPx.appendChild(divtext)
  
    let textPost= createNode("textArea",txtPost,["mt-4"])
    textPost.setAttribute('rows',"25")
    textPost.setAttribute('cols',"60")
    textPost.setAttribute('readonly',"true")  
    textPost.setAttribute('style',"border: none")   
    divtext.appendChild(textPost)   

    if(imgUrlPostContent.length >0){
    imgUrlPostContent.forEach((img)=>{
    let imgPost2= createNode("img",null,["rounded","w-100","mg-fluid"])
    imgPost2.setAttribute('src',img )
    imgPost2.setAttribute('alt',"principal")
    imgPost2.setAttribute('height',"274px")
    imgPost2.setAttribute('width',"751px")
    divPx.appendChild(imgPost2)
     })
    }






   
    
//   mainPost.appendChild(articlePost)
 //   }
  
}
drawPost(objetPost)