const dataLoad = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/news/categories')
  const data = await response.json()
  newsAllCategorys(data.data.news_category)
}

const newsAllCategorys = (news) => {
  // console.log(news)
  const newsAllCategory = document.querySelector('#news-all-category')
  news.forEach(item => {
    // console.log(item)
    const div = document.createElement('div')
    div.innerHTML = `
    <div class="tabs">
                <a onclick="news('${item.category_id}')" class="tab">${item.category_name}</a>
              </div>
    `
    newsAllCategory.appendChild(div)
  })
}



// show news data 
const news = async (categoryId) => {

  const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
  const data = await response.json()
  newsPortal(data.data)
}



const newsPortal = (news) => {
  // console.log(news)
  const newsStorage = document.querySelector('#news-storage')
  newsStorage.textContent = ''
  news?.forEach(item => {
    // console.log(item)
    const div = document.createElement('div')
    div.innerHTML = `
        <div class="card bg-base-100 shadow-md">
  <figure class="px-10 pt-10">
    <img src="${item?.image_url}" alt="Shoes" class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${item.title.slice(0, 40)}...</h2>
    <p>Total Views: ${item.total_view ? item.total_view : 'No view'} </p>
    <div class="card-actions">
      <button  onclick="showDetails('${item._id}')" class="btn btn-primary">Details</button>
    </div>
  </div>
</div>
        `
    newsStorage.appendChild(div)
  })
}




const showDetails =async (newsId) => {
  // console.log(newsId)
  const response= await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
  const data=await response.json()
  const dataOfArray=(data.data)
  dataOfArray.forEach(item=>{


    const detailsStorage = document.querySelector('#details-storage')
    detailsStorage.textContent=''
    const div = document.createElement('div')
    div.innerHTML = `
  <dialog id="my_modal" class="modal modal-bottom sm:modal-middle">
    <form method="dialog" class="modal-box">
      <p class="text-lg">${item.details}</p>
      <p class="py-4">Press ESC key or click the button below to close</p>
      <div class="modal-action">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </div>
    </form>
  </dialog>
    `

    detailsStorage.appendChild(div)

    const modal = document.querySelector('#my_modal')
  
    modal.showModal()
    
  })


  

}







news('01')
dataLoad()