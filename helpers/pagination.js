module.exports.pagination = (page,total,path) => {
    var html = ''
    var total = parseInt(total)
    var page = parseInt(page)
    console.log(total,page)

    var pageinationhtml = ['<ul class="pagination">']
    var pageinationhtml2 = []

    if(total > 0){
      pageinationhtml.push(`
      <li class="page-item ${(page == 1 ? 'disabled' : '')}" ><a href="${path}${page-1}" class="page-link"><</a></li>
      `)
      if(total > 5){
        
          if(page > 2){
            pageinationhtml.push(`<li class="page-item" ><a href="${path}1" class="page-link">1</a></li>`)
            pageinationhtml.push('<li class="page-item pe-none"><span class="page-link">...</span></li>')
          }
          if(page==total){
            pageinationhtml.push(`<li class="page-item" ><a href="${path}${total-2}" class="page-link">${total-2}</a></li>`)
          }
          if(page-1>0){
            pageinationhtml.push(`<li class="page-item" ><a href="${path}${page-1}" class="page-link">${page-1}</a></li>`)
          }
          
          
          pageinationhtml.push(`<li class="page-item active" ><a href="${path}${page}" class="page-link">${page}</a></li>`)
          if(page+1<total){
            pageinationhtml.push(`<li class="page-item" ><a href="${path}${page+1}" class="page-link">${page+1}</a></li>`)
          }
          if(page == 1 && page+2<total){
            pageinationhtml.push(`<li class="page-item" ><a href="${path}${page+2}" class="page-link">${page+2}</a></li>`)
          }
          if(page+1==total){
            pageinationhtml.push(`<li class="page-item" ><a href="${path}${page+1}" class="page-link">${page+1}</a></li>`)
          }
          if(page < total-1){
            pageinationhtml.push('<li class="page-item  pe-none"><span class="page-link">...</span></li>')
            pageinationhtml.push(`<li class="page-item" ><a href="${path}${total}" class="page-link">${total}</a></li>`)
          }


      }else{
        for(var i = 1; i<=total; i++){
          if(i==page){
            pageinationhtml.push(`<li class="page-item active" ><a href="${path}${page}" class="page-link">${page}</a></li>`)

          }else{
            pageinationhtml.push(`<li class="page-item" ><a href="${path}${i}" class="page-link">${i}</a></li>`)

          }

        }
      }
      pageinationhtml.push(`
      <li class="page-item ${(page == total ? 'disabled' : '')}" ><a href="${path}${page+1}" class="page-link">></a></li></ul>
      `)

      html = pageinationhtml.join('')
    }


    return html
}


