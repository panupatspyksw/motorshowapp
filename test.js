const moment = require('moment')
const pageination = (page,total) => {
    var pageinationhtml = []
    if(total > 0){
      pageinationhtml.push('<')
      if(total > 5){
          if(page > 2){
            pageinationhtml.push(1)
            pageinationhtml.push('...')
          }
          if(page==total){
            pageinationhtml.push(page-2)
          }
          if(page-1>0){
            pageinationhtml.push(page-1)
          }
          
          
          pageinationhtml.push(page)
          if(page+1<total){
            pageinationhtml.push(page+1)
          }
          if(page == 1 && page+2<total){
            pageinationhtml.push(page+2)
          }
          if(page+1==total){
            pageinationhtml.push(page+1)
          }
          if(page < total-1){
            pageinationhtml.push('...')
            pageinationhtml.push(total)
          }


      }else{
        for(var i = 1; i<total-1; i++){
          pageinationhtml.push(i)
        }
      }
      pageinationhtml.push('>')

    }
    console.log(pageinationhtml)
}

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  console.log(age)
  return age;
}


var minage = moment().subtract(18, "years");
var maxage = moment().subtract(70, "years");

// var maxage = startdate.subtract(70, "years");
minage = minage.format("YYYY-MM-DD");
maxage = maxage.format("YYYY-MM-DD");

// maxage = maxage.format("YYYY-MM-DD");

