// Select all elements which have data-link attribute
// add click event to each elemetn
// retrieve the link url and redirect to that page

const clickableElements = document.querySelectorAll("[data-link]") as NodeListOf <HTMLDivElement>;

//@ts-ignore
for (const clickableElement of clickableElements){
    clickableElement.style.cursor = "pointer";
    clickableElement.addEventListener('click', ()=>{
        window.location.href = clickableElement.dataset.link ?? "#";
    })
}





