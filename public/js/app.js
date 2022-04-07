$(document).ready(()=>{
    var htl = gsap.timeline()
    htl.to(".menupage",{opacity: 1, duration: .3})
    htl.reverse(-1)
    htl.reversed(true);
    $(".hamburger").on("click",(e)=>{
        $(".hamburger").toggleClass("is-active")
        htl.reversed(!htl.reversed());
        $(".menupage").toggleClass("pe-none")
    })
   
    function gallerymodal(currentpage,title,slides){
        return `
        <div class="app-modal position-fixed top-0 left-0 bg-main container-xxl p-0 min-vh-100 zfront d-flex gallerymodal" id="gallery" >
            <div class="position-relative h-100 d-flex flex-column justify-content-center  min-vh-100 w-100">
                <div class="modal-header p-0 m-0 d-block border-0">
                    <div class="container-xxl px-0 top-0 left-0 bg-main header position-absolute" id="header">
                        <div class="d-flex justify-content-between align-items-center position-relative h-100">
                            <div class="h-100 d-flex flex-column justify-content-center">
                                <a onclick="javascript:$('#gallery').remove()" class="box text-decoration-none"><i class="fs-2 fas fa-chevron-left text-white "></i></a>
                            </div>
                            <div class="text-center h-100 d-flex flex-column justify-content-center">
                                <div class="fs-menu text-uppercase text-white">${title ?? 'gallery'}</div>
                            </div>
                            <div class="box"></div>
                        </div>
                    </div>
                </div>
                <div class="appmodal-content col-12 overflow-hidden d-block">
                    <div class="header"></div>
                    <div class="row d-flex overflow-hidden" slider-wrapper currentpage = ${currentpage}>
                        <div class="position-relative">
                            <div class="d-flex col-12 position-relative" slider-pages>
                                ${slides}
                            </div>
                            <div class="w-100 d-flex justify-content-between align-items-center position-absolute top-50 start-50 translate-middle pe-none">
                                <a class="d-block d-flex align-items-center justify-content-center text-decoration-none bg-main2 text-white fs-4 wh50 pe-auto" role="button" back-button>
                                    <i class="fa-solid fa-chevron-left"></i>
                                </a>
                                <a class="d-block d-flex align-items-center justify-content-center text-decoration-none bg-main2 text-white fs-4 wh50 pe-auto" role="button" next-button>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </a>
                            </div>
                        </div>
                        <div class=" bottom-0 p-3 justify-content-center d-flex gap-3">
                            <div class="fs-h3 text-white">
                                <span current_page>1</span>
                                <span>/</span>
                                <span total_page>10</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    }

    function focusonlyone(e){
        $(e).parent().children().not(e).removeClass("active")
        $(e).addClass("active")
    }

  
    function sliderimageinit(){
        
        $("[slider-image-wrapper]").each((index,element)=>{
            
        })

    }
   
    function sliderpageinit(element){
        var currentpage = parseInt($(element).attr("currentpage") ?? 0);
        var pageswrapper = $(element).find("[slider-pages]")
        var pagewidth = $(pageswrapper).children()[0].clientWidth;
        var maxpage = $(element).find("[slider-pages]").children("[slider-page]").length;
        var maxtranslate = pagewidth*maxpage;
        $(pageswrapper).addClass("transition-none")
        $(pageswrapper).css("transform", `translateX(-${currentpage*pagewidth}px)`)
        if($(element).find("[slider-pages]").children("[slider-page]")[currentpage]){
            $(pageswrapper).height($(element).find("[slider-pages]").children("[slider-page]")[currentpage].clientHeight);
        }

        // pageswrapperlocation = currentpage*pagewidth;
        $(element).find("[slider-pages]").children("[slider-page]").each((slidepage, slideele)=>{
            var startdrag = false;
            var startposition = 0;
            var valuestarttoend  = 0;
            var pageX = 0;
            var differce = 0;
            $(document).on("mousedown mouseup mousemove touchstart touchend touchmove",(eventdrag)=>{

            if($(eventdrag.target).is(slideele) || $(eventdrag.target).parent().is(slideele)){
                if(eventdrag.type == "mousedown" || eventdrag.type == "touchstart"){
                    startdrag = true;
                    startposition =  eventdrag.pageX ?? eventdrag.originalEvent.touches[0].pageX;
                    $(pageswrapper).addClass("transition-none")
                }else if((eventdrag.type == "touchmove" || eventdrag.type == "mousemove") && startdrag){
                    $(eventdrag.target).addClass("pe-none")
                    setTimeout(()=>{ $(eventdrag.target).removeClass("pe-none") }, 500);
                }
            
            }
            if((eventdrag.type == "touchend" || eventdrag.type == "mouseup") && startdrag ){
                $(pageswrapper).removeClass("transition-none")
                startdrag = false;
                if((differce) < -pagewidth/2 && slidepage < maxpage-1 && pageX != 0){
                    currentpage += 1;
                    console.log("next=============")
                    console.log("difference=>",differce)
                    console.log("startposition=>",startposition)
                    console.log("startdrag=>",startdrag)


                }else if((differce) > pagewidth/2 && slidepage != 0  && pageX != 0){
                    currentpage -= 1;
                    console.log("back=============")
                    console.log("difference=>",differce)


                }
                differce = 0

                $(element).find("[current_page]").html(`${currentpage+1}`)
                $(pageswrapper).css("transform", `translateX(-${currentpage*pagewidth}px)`);
                console.log("currentpage=>",currentpage)
                // var pagee = $("[slider-pagination]").children()[currentpage]
                console.log($(element).find("[slider-pagination]").children()[currentpage])
                focusonlyone($(element).find("[slider-pagination]").children()[currentpage])
                // $("[slider-pagination] div").removeClass("active") 
                // $(pagee).addClass("active")
                // focusonlyone(pagee)

                $(pageswrapper).height($(element).find("[slider-pages]").children("[slider-page]")[currentpage].clientHeight);

            }
            if((eventdrag.type == "touchmove" || eventdrag.type == "mousemove") && startdrag){
                pageX = eventdrag.pageX ?? eventdrag.originalEvent.touches[0].pageX;
                differce = pageX - startposition;
                var old = -currentpage*pagewidth;
                $(pageswrapper).css("transform", `translateX(${differce+old}px)`);
            }
            })
        })
        $(element).find("[current_page]").html(`${currentpage+1}`)
        $(element).find("[total_page]").html(`${maxpage}`)
        $(element).find("[next-button]").on("click",()=>{
            $(pageswrapper).removeClass("transition-none")
            if(currentpage != maxpage -1){
                currentpage +=1;
                $(element).find("[current_page]").html(`${currentpage+1}`)
                $(pageswrapper).css("transform", `translateX(-${currentpage*pagewidth}px)`);
            }
        })
        $(element).find("[back-button]").on("click",()=>{
            $(pageswrapper).removeClass("transition-none")

            if(currentpage != 0){
                currentpage -=1;
                $(element).find("[current_page]").html(`${currentpage+1}`)
                $(pageswrapper).css("transform", `translateX(-${currentpage*pagewidth}px)`);
            }
        })
        $(element).find("[slider-pagination]").children().each((page_number,page)=>{
            $(page).on("click",()=>{
                $(pageswrapper).removeClass("transition-none")
                currentpage = page_number;
                $(element).find("[current_page]").html(`${currentpage+1}`)
                $(pageswrapper).css("transform", `translateX(-${currentpage*pagewidth}px)`)
                $(pageswrapper).height($(element).find("[slider-pages]").children("[slider-page]")[currentpage].clientHeight);

            })
        })
        $(window).on("resize",(e)=>{
            pagewidth = $(pageswrapper).children()[0].clientWidth;
            $(pageswrapper).css("transform", `translateX(-${currentpage*pagewidth}px)`)
            $(pageswrapper).css("height", `unset`)
        })
        
    }
    
    $("[slider-wrapper]").each((index,element)=>{
        sliderpageinit(element)
    })

    document.addEventListener('click', function(e) {
        if($(e.target).is("[focusonlyone]")){
            focusonlyone(e.target)
        }else if($(e.target).is("[gallery-slider]>*")){
            (async function () {
               $parent = $(e.target).parent()
               var title = $parent.attr("title")
               await $("#appcontainer").append( gallerymodal( $(e.target).index() , title , $parent.html()) )
               gsap.from("#gallery",{opacity: 0,y:"+=100%" , duration: .3})
               await sliderpageinit(document.querySelector("#gallery [slider-wrapper]"))
            }())
        }
 
    })

    $(".saved").each((indxe,element)=>{
        $(element).on("click",(evt)=>{
            $(element).toggleClass("active")
        })
    })
})

