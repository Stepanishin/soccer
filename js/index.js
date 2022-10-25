// FAQ SECTION
let question = document.querySelectorAll(".question");

question.forEach((qsitem) => {
  qsitem.addEventListener("click", function (e) {
    //   store the .answer div containing the answer
    let sibling = qsitem.nextElementSibling;

    // Nested loop for removing active class from all and set answer height to 0
    question.forEach((item) => {
      item.nextElementSibling.style.height = "0px";
      //   remove class "active" except for the currently clicked item
      item != qsitem && item.parentNode.classList.remove("active");
    });
    //then toggle the "active" class of clicked item's parent ".qna"
    this.parentNode.classList.toggle("active");

    // set actual height for .answer div if .qna has the class "active"
    if (qsitem.parentNode.classList.contains("active")) {
      sibling.style.height = sibling.scrollHeight + "px";
    } else {
      sibling.style.height = "0px";
    }
  });
});
// ////////////////////////////////////////////////////////////////////////////////////////
// js code for burger menu to add style overflow hidden to body
let burger = document.querySelectorAll(".hamburger");
const toggleOverflow = () => {
  let myBody = document.getElementsByTagName('body')[0]
  myBody.classList.toggle('ovh')
}
// ////////////////////////////////////////////////////////////
// Closing of Hamburger
const deleteBurgerMenu = () => {
  let myBody = document.getElementsByTagName('body')[0]
  toggle.checked = false
  myBody.classList.remove('ovh')
}