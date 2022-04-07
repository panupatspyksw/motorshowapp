var settickethtml = `<div class="position-absolute p-3 d-flex align-items-center bg-success w-100 text-white h60" style="bottom: -60px;" setqrpopup>
Ticket has been set as front QRCode
</div>`
var i = 1
$(document).on("click",(evt)=>{
    if($(evt.target).is("[setqrcode]")){
        i++;
        $("#appcontainer").append(settickethtml)
        $("[setqrpopup]").attr("id","aaa"+i)
        gsap.timeline().to("[setqrpopup]#"+"aaa"+i,{bottom: 0, duration: .5}).to("[setqrpopup]#"+"aaa"+i,{bottom: "-60px", duration: .5, delay:.5, onComplete:()=>{
            $("#"+"aaa"+i).remove()
        }})


    }
})