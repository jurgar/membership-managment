const renderCard = (membership) => {
  const { name } = membership;
  const title = document.createElement("h2");
  title.textContent = name;

  document.querySelector(".cards").append(title);
};

fetch("http://localhost:3000/memberships")
  .then((resp) => resp.json())
  .then((response) => {
    response.forEach((membership) => renderCard(membership));
  })
  .catch((error) => console.error(error));
