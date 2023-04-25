const elementCloser = document.querySelectorAll("[data-close]") as NodeListOf <HTMLDivElement>;

//@ts-ignore
for (const closer of elementCloser){
    closer.style.cursor = "pointer";
    closer.addEventListener('click', ()=>{
        let closableElementID = closer.dataset.close ?? "";
        let closableElement = document.getElementById(closableElementID) as HTMLDivElement;
        closableElement.style.display='none';
    })
}