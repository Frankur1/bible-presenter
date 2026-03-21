let ruBible
let hyBible

async function loadBible(){

const ru = await fetch("/bible/ru_synodal.json")
ruBible = await ru.json()

const hy = await fetch("/bible/ArmEastern.json")
hyBible = await hy.json()

fillBooks()

}

function fillBooks(){

const select=document.getElementById("book")
select.innerHTML=""

for(let i=0;i<ruBible.length;i++){

const option=document.createElement("option")
option.value=i
option.text=ruBible[i].abbrev || ruBible[i].name || ("Book "+(i+1))

select.appendChild(option)

}

fillChapters()

}

function fillChapters(){

const bookIndex=document.getElementById("book").value

const chapterCount=ruBible[bookIndex].chapters.length

const select=document.getElementById("chapter")
select.innerHTML=""

for(let i=1;i<=chapterCount;i++){

const option=document.createElement("option")
option.value=i
option.text=i

select.appendChild(option)

}

fillVerses()

}

function fillVerses(){

const bookIndex=document.getElementById("book").value
const chapter=document.getElementById("chapter").value

const verseCount=ruBible[bookIndex].chapters[chapter-1].length

const select=document.getElementById("verse")
select.innerHTML=""

for(let i=1;i<=verseCount;i++){

const option=document.createElement("option")
option.value=i
option.text=i

select.appendChild(option)

}

}

function getRussianVerse(book,chapter,verse){

const bookData=ruBible[book]

if(Array.isArray(bookData.chapters[0])){
return bookData.chapters[chapter-1][verse-1]
}

if(bookData.chapters[0].verses){
return bookData.chapters[chapter-1].verses[verse-1]
}

}

function getArmenianVerse(book,chapter,verse){

if(hyBible.books){

return hyBible.books[book].chapters[chapter-1].verses[verse-1].text

}

if(Array.isArray(hyBible)){

return hyBible[book].chapters[chapter-1][verse-1]

}

}

function showVerse(){

const book=document.getElementById("book").value
const chapter=document.getElementById("chapter").value
const verse=document.getElementById("verse").value

const ru=getRussianVerse(book,chapter,verse)
const hy=getArmenianVerse(book,chapter,verse)

document.getElementById("result").innerHTML=`

<div class="ru">${ru}</div>
<div class="hy">${hy}</div>

`

}

document.getElementById("book")?.addEventListener("change",fillChapters)
document.getElementById("chapter")?.addEventListener("change",fillVerses)

window.onload=loadBible