//optener los post
const getPost = () => {
    let posts
    $.ajax({
        method: "GET",
        url: "https://devpost-72887-default-rtdb.firebaseio.com/posts.json",
        success: response => { 
            
            posts = response
           // llenaTags(tags)
        },
        error: error => {
            console.log(error)
        },
        async: false
    })    
    return posts
}

console.log(getPost())

const createNode = (typeElement, text,arrayClass) => {
    let node = document.createElement(typeElement)
    node.textContent = text
    arrayClass.forEach(className => {
        node.classList.add(className)
    }); 
   
   return node
}

//pinta article por posts
const drawPost =(objectPost) =>{
    let divWrapper = document.getElementById("wrapperCards")    
    while(divWrapper.lastElementChild) {
        divWrapper.removeChild(divWrapper.lastElementChild)
    }  
    for (const key in objectPost) {
      console.log(key)
      console.log(objectPost[key])
      let {fechaPost,imgUrlPostContent,imgUrlPostTiltle,opiniones,tags,titlePost,txtPost,usuario,reactionsCount,countComment}= objectPost[key]
      let articleCard= createNode("article",null,["card"])
      let imgPost= createNode("img",null,["card-img-top"])
          imgPost.setAttribute('src',imgUrlPostContent )
          imgPost.setAttribute('alt',"Card image cap")
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
      /** <div class=" datos pl-2 pl-md-2">
                            <div class="nombre">Suprabha
                                <div class="card user flex-md-column justify-content-md-center " style="width: 14rem;">
                                    <div class="header pt-md-2 d-md-flex flex-md-row align-items-center">
                                        <div class="avatar"><img src="images/1avatar.png"></div>
                                        <div class="name-avatar pt-md-2">Suprabha </div>
                                    </div>

                                    <div class="follow"><button class="btn-follow"> Follow </button> </div>
                                    <div class="card-body">
                                        <p>Lorem iprehenderit aliquid, iustoiis eveniet. Exercitationem fugiat,
                                            nesciunt, veritatis optio quo, cupiditate eaque vitae quisquam nam
                                            repellendus atque numquam.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="date mt-md-2">Aug 20 (1 hour ago)</div>
       </div>*/    
       let divWrappertTitlePost= createNode("div",null,["row","pt-2","ml-md-5","no-gutters"])  
           divCardbody.appendChild(divWrappertTitlePost)
       let divTitlePost= createNode("div",null,["col-12","title"])  
           divWrappertTitlePost.appendChild(divTitlePost)
       let ligaTitlePost= createNode("a","React Environment Variables",["nav-link"])  
           ligaTitlePost.setAttribute('href',"post.html?"+key)
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
        

      divWrapper.appendChild(articleCard)
    }

}
drawPost(getPost())