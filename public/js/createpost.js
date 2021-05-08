console.log("hello world");
const title = document.getElementById("post-title");
const description = document.getElementById("post-description");
const submitButton = document.getElementById("submit-button");

const newFormHandler = async (event) => {
  event.preventDefault();

  const postTitle = title.value;
  const postDescription = description.value;

  if (title.value && description.value) {
    const response = await fetch("/api/posts", {
      method: "POST",

      body: JSON.stringify({
        title: postTitle,
        description: postDescription,
      }),

      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("the request went through");
      document.location.replace("/api/users/posts");
    } else {
      console.log("the request failed");
    }
  }
};

submitButton.addEventListener("click", newFormHandler);
