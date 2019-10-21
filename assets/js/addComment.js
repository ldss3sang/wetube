import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const commentDeleteBtns = document.querySelectorAll(
  "#jsCommentList li span:nth-child(2)"
);

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const deleteComment = async event => {
  const comment = event.currentTarget;
  const commentId = comment.dataset.id;
  const response = await axios({
    url: `/api/delete-comment/${commentId}`
  });
  if (response.status === 200) {
    comment.parentElement.remove();
    decreaseNumber();
  }
};

const addComment = (id, comment) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const iconSpan = document.createElement("span");
  span.innerHTML = comment;
  iconSpan.innerHTML = '<i class="fas fa-trash-alt" title="Delete"></i>';
  iconSpan.dataset.id = id;
  li.appendChild(span);
  li.appendChild(iconSpan);
  iconSpan.addEventListener("click", deleteComment);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
  if (response.status === 200) {
    addComment(response.data.id, comment);
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

const init = () => {
  addCommentForm.addEventListener("submit", handleSubmit);
  console.log(commentDeleteBtns);
  commentDeleteBtns.forEach(btn =>
    btn.addEventListener("click", deleteComment)
  );
};

if (addCommentForm) {
  init();
}
