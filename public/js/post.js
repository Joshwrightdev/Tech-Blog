

const deleteButton = document.getElementById("delete-btn");
const postId = document.getElementById("post-id");
console.log(postId.value);


const newFormHandler = async (event) => {
  event.preventDefault();

  if (postId.value) {
    const response = await fetch(`/api/posts/${postId.value}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/api/users/posts');
    } else {
      alert('Failed to delete post');
    }
  }
};

deleteButton.addEventListener("click", newFormHandler);