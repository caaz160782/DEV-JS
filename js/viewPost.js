//optener los post
let postArray=[]
const getPost = () => {
    postArray=[]
    let postsObject
    $.ajax({
        method: "GET",
        url: "https://devpost-72887-default-rtdb.firebaseio.com/posts.json",
        success: response => {             
            postsObject = response 
        //   console.log(postsObject)     
                for (const key in postsObject) {
                    console.log(key)
                    console.log(postsObject[key])
                     //postsObject = postsObject[key]
                     //postsObject.id = key
                     postArray = [...postArray, {...postsObject[key]}]
                  }
//               console.log(postArray)     
        },
        error: error => {
            console.log(error)
        },
        async: false
    })    
    //return posts
    return postArray
}
//funcion eliminar en bd con llamada ajax creada por Clau
const deletePost=(idPost) => {
    console.log(idPost);
    $.ajax({
       method: "DELETE",
       url: `https://devpost-72887-default-rtdb.firebaseio.com/posts/${idPost}.json`,
 
       success: (response) => {
         // console.log(response);
         drawPost(getPost())
       },
       error: error => {
          console.log(error);
       }
    })
 }
//obtiene id y se llama  ala funcion ndelete
const clickToDeletePost=(e)=>{
    let idPost = e.target.dataset.postIdDelete    
    deletePost(idPost)
}
const clickToEditPost=(e)=>{
    let idPost = e.target.dataset.postIdEdit
    window.location.href = `newsPost.html?idpost=${idPost}` 
}
//console.log(getPost())
const createNode = (typeElement, text,arrayClass) => {
    let node = document.createElement(typeElement)
    node.textContent = text
    arrayClass.forEach(className => {
        node.classList.add(className)
    });    
   return node
}
//pinta article por posts
//const drawPost =(objectPost) =>{
const drawPost =(arrayPost) =>{
    let divWrapper = document.getElementById("wrapperCards")    
    while(divWrapper.lastElementChild) {
        divWrapper.removeChild(divWrapper.lastElementChild)
    }  
  // for (const key in objectPost) {
      //console.log(key)
      //console.log(objectPost[key])
     arrayPost.forEach((post, index) => {
    // let {fecha,imgUrlPostContent,imgUrlPostTiltle,opiniones,tags,titlePost,txtPost,usuario,reactionsCount,countComment}= objectPost[key]
      let {id,fecha,imgUrlPostContent,imgUrlPostTiltle,opiniones,tags,titlePost,txtPost,usuario,reactionsCount,countComment}= post
      
      let articleCard= createNode("article",null,["card"])
      let imgPost= createNode("img",null,["card-img-top"])
          imgPost.setAttribute('src',imgUrlPostContent )
          imgPost.setAttribute('alt',"avatar")
        
          articleCard.appendChild(imgPost)    
      
          let divCardbody= createNode("div",null,["card-body","container","pt-2"])
          articleCard.appendChild(divCardbody)
      let divInfoUser= createNode("div",null,["row","justify-content-sm-start","align-items-start","no-gutters"])  
          divCardbody.appendChild(divInfoUser)
      
      let avatarDiv= createNode("div",null,["avatar"])   
          divInfoUser.appendChild(avatarDiv)
      
       let avatarImgUser= createNode("img",null,[])        
          avatarImgUser.setAttribute('src',usuario.pictureProfileUser) 
          avatarDiv.appendChild(avatarImgUser) 
      //card de visualizacion pequeña esta va dentro de row1

      let avatarDatosDiv= createNode("div",null,["datos","pl-2","pl-md-2"])   
          divInfoUser.appendChild(avatarDatosDiv)
      
      let avatarNombreDiv= createNode("div",usuario.nameUser,["nombre"])   
          avatarDatosDiv.appendChild(avatarNombreDiv)   

      let avatarCardUserDiv= createNode("div","",["card","user","flex-md-column","justify-content-md-center"])   
          avatarNombreDiv.appendChild(avatarCardUserDiv)   

      let avatarCardheaderDiv= createNode("div","",["header","pt-md-2","d-md-flex","flex-md-row","align-items-center"])   
           avatarCardUserDiv.appendChild(avatarCardheaderDiv)  
       
     let avatarCardImgDiv= createNode("div","",["avatar"])   
         avatarCardheaderDiv.appendChild(avatarCardImgDiv)      
      
     let avatarImgUserCard= createNode("img",null,[])        
         avatarImgUserCard.setAttribute('src',usuario.pictureProfileUser) 
         avatarCardImgDiv.appendChild(avatarImgUserCard)  
         
     let avatarNombreDivCard= createNode("div",usuario.nameUser,["name-avatar","pt-md-2"])   
         avatarCardheaderDiv.appendChild(avatarNombreDivCard)      
         

      let avatarCardBtnDiv= createNode("div","",["follow"])   
         avatarCardUserDiv.appendChild(avatarCardBtnDiv)   
         
      let buttonFollow = createNode("button","Follow",["btn-follow"]) 
          avatarCardBtnDiv.appendChild(buttonFollow)      

      let avatarCardBodyDiv= createNode("div","",["card-body"])   
          avatarCardUserDiv.appendChild(avatarCardBodyDiv)     

      let avatarCardp= createNode("p",`Lorem iprehenderit aliquid, iustoiis eveniet. Exercitationem fugiat,nesciunt, veritatis optio quo, 
                                       cupiditate eaque vitae quisquam nam repellendus atque numquam.`,[])   
          avatarCardBodyDiv.appendChild(avatarCardp)                   

      let avatarDatePostDiv= createNode("div",fecha,["date","mt-md-2"])   
          avatarDatosDiv.appendChild(avatarDatePostDiv)       

     
       let divWrappertTitlePost= createNode("div",null,["row","pt-2","ml-md-5","no-gutters"])  
           divCardbody.appendChild(divWrappertTitlePost)
       let divTitlePost= createNode("div",null,["col-12","title"])  
           divWrappertTitlePost.appendChild(divTitlePost)
       let ligaTitlePost= createNode("a",titlePost,["nav-link"])  
           ligaTitlePost.setAttribute('href',"post.html?idpost="+id)           
           divTitlePost.appendChild(ligaTitlePost)
       let divWTagsPost= createNode("div",null,["row","pt-2","ml-md-5","no-gutters"])  
           divCardbody.appendChild(divWTagsPost)
       tags.forEach((tag) => {
          let divTagsPost= createNode("div",`#${tag}`,["flex-mark","pl-2","pl-md-2"])  
          divWTagsPost.appendChild(divTagsPost)          
         })
       let divWInteractions= createNode("div",null,["row","pt-3","ml-md-5","no-gutters","justify-content-sm-start","justify-content-md-between","align-items-center","flex-nowrap"])  
         divCardbody.appendChild(divWInteractions)
       let divWheart=createNode("div",null,["heart","d-flex","flex-row"])  
         divWInteractions.appendChild(divWheart)         
       let divSvg=createNode("div",null,[])  
         divWheart.appendChild(divSvg)
       let svg=createNode("svg",null,[])      
         svg.setAttribute('width',"24") 
         svg.setAttribute('height',"24") 
         svg.setAttribute('xmlns',"http://www.w3.org/2000/svg")
         divSvg.appendChild(svg)
       let path=createNode("path",null,[])     
         path.setAttribute('d',"M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z") 
         svg.appendChild(path)
       let divCountReactions=createNode("div",reactionsCount,[])  
         divWheart.appendChild(divCountReactions)
       let divTxtReactions=createNode("div","reactions",["d-none","d-md-block","pl-md-1"])  
         divWheart.appendChild(divTxtReactions)  

       let divWComment=createNode("div",null,["comments","d-flex","flex-row"])  
         divWInteractions.appendChild(divWComment)         
       let divSvgC=createNode("div",null,[])  
       divWComment.appendChild(divSvgC)
       let svgC=createNode("svg",null,[])      
         svgC.setAttribute('width',"24") 
         svgC.setAttribute('height',"24") 
         svgC.setAttribute('xmlns',"http://www.w3.org/2000/svg")
         divSvgC.appendChild(svgC)
       let pathC=createNode("path",null,[])     
       pathC.setAttribute('d',"M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z") 
         svgC.appendChild(pathC)
       let divCountComments=createNode("div",countComment,[])  
       divWComment.appendChild(divCountComments)
       let txtComment= countComment >0 ? "comments" : "Add Comment"
       let divTxtComment=createNode("div",txtComment,["d-none","d-md-block","pl-md-1"])  
       divWComment.appendChild(divTxtComment)             
    
       let divWInfo=createNode("div",null,["d-flex","flex-row","align-items-center"])  
         divWInteractions.appendChild(divWInfo)          

        //falta funcion para sacr min horas,dias,semans ,meses naios
      let divTime=createNode("div","1 min read",["min"])  
      divWInfo.appendChild(divTime) 

      let divWbtnSave=createNode("div","",["save","pl-1"])  
      divWInfo.appendChild(divWbtnSave) 

      let divbtnSave=createNode("button","Save",["btn-save"])  
      divWbtnSave.appendChild(divbtnSave)     

      let iEdit=createNode("i","",["bi","bi-pencil-square"])
      let buttonEdit = createNode("button","",["btn","btn-info","mr-1"])
      iEdit.setAttribute("data-post-id-edit", id)
      buttonEdit.appendChild(iEdit)      
      buttonEdit.setAttribute("data-post-id-edit", id)
      buttonEdit.addEventListener("click", clickToEditPost)
      divWbtnSave.appendChild(buttonEdit)      
    
      let iDelete=createNode("i","",["bi","bi-trash"])
      let buttonDelete = createNode("button","",["btn","btn-danger"])
      iDelete.setAttribute("data-post-id-delete", id)
      buttonDelete.appendChild(iDelete)      
      buttonDelete.setAttribute("data-post-id-delete", id)
      buttonDelete.addEventListener("click", clickToDeletePost)
      divWbtnSave.appendChild(buttonDelete)      

      divWrapper.appendChild(articleCard)
   // }
        })

}

drawPost(getPost())