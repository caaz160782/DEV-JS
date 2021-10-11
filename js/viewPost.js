//optener los post
let postArray=[]
const getPost = () => {
    postArray=[]
    let postsObject={}
    $.ajax({
        method: "GET",
        url: "https://devpost-72887-default-rtdb.firebaseio.com/posts.json",
        success: response => {             
            postsObject = response 
           
            postArray = Object.keys(response).map( key => {
                    return { ...response[key], id: key}
                 })
           //    console.log(postArray)     
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
//
const time =(fechaAnterior)=>{
    let actual=moment().format('DD/MM/YYYY HH:mm:ss');    
    var day1 = new Date(fechaAnterior);
    var day2 = new Date(actual);   
    //let anterior=moment().format(fechaAnterior);    
    let duration =day2.getTime() -day1.getTime()

    return duration
}
console.log(time("10/10/2021 00:20:44"))
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
      if(index === 0){
      let imgPost= createNode("img",null,["card-img-top"])
          imgPost.setAttribute('src',imgUrlPostTiltle )
          imgPost.setAttribute('alt',"principal")
          imgPost.setAttribute('height',"274px")
          articleCard.appendChild(imgPost)    
      }
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
      //let time1=time(fecha)
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
         divWheart.setAttribute('id',"heart-Count")
         divWheart.setAttribute("data-count-reactions", id)           
         divWInteractions.appendChild(divWheart)         
       let divSvg=createNode("div",null,[])           
         divWheart.appendChild(divSvg)
       let iHeart=createNode("i",null,["bi","bi-suit-heart"])   
       divSvg.appendChild(iHeart)

    /*   iDelete.setAttribute("data-post-id-delete", id)
      buttonDelete.appendChild(iDelete)      
      buttonDelete.setAttribute("data-post-id-delete", id)
      buttonDelete.addEventListener("click", clickToDeletePost)
      divWbtnSave.appendChild(buttonDelete)      */

/*     //no funciono svg se cambiaron por icon  
       //<i class="bi bi-suit-heart"></i>
       let svg=createNode("svg",null,[])      
         svg.setAttribute('width',"24") 
         svg.setAttribute('height',"24") 
         svg.setAttribute('xmlns',"http://www.w3.org/2000/svg")
         divSvg.appendChild(svg)
       let path=createNode("path",null,[])     
         path.setAttribute('d',"m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z") 
         svg.appendChild(path)
  */
       let countR= reactionsCount >0 ? reactionsCount : ""
       let divCountReactions=createNode("div",countR,[])  
         divWheart.appendChild(divCountReactions)
       let divTxtReactions=createNode("div","reactions",["d-none","d-md-block","pl-md-1"])  
         divWheart.appendChild(divTxtReactions)  
       let divWComment=createNode("div",null,["comments","d-flex","flex-row"])  
         divWInteractions.appendChild(divWComment)         
       let divSvgC=createNode("div",null,[])  
       divWComment.appendChild(divSvgC)
       let iChat=createNode("i",null,["bi","bi-chat-right"])   
       divWComment.appendChild(iChat) 
/*       let svgC=createNode("svg",null,[])      
         svgC.setAttribute('width',"24") 
         svgC.setAttribute('height',"24") 
         svgC.setAttribute('xmlns',"http://www.w3.org/2000/svg")
         divSvgC.appendChild(svgC)
       let pathC=createNode("path",null,[])     
       pathC.setAttribute('d',"M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z") 
         svgC.appendChild(pathC)
*/    let count= countComment >0 ? countComment : ""
      let divCountComments=createNode("div",count,[])  
       divWComment.appendChild(divCountComments)
       let txtComment= countComment >0 ? "comments" : "Add Comm"
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

$("#heart-Count").click( ()=> {
    //$( "#target" ).click();
    alert("count")
  })


 $("#week").click(()=> {
    
    console.log(1)
    
 })
 $("#fechas").change(()=> {
    let select = $("#fechas option:selected").val()
    console.log(select)
    
 })

