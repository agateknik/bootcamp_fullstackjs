BASE_URL = "https://v1.appbackend.io/v1/rows/xl4p4X4CBmzP";

async function getData() {
  try {
    const response = await fetch(BASE_URL);
    const activity = await response.json();
    return activity;
  } catch (error) {
    console.log("error ketika melakukan fetching");
    return { data: [] };
  }
}

async function main() {
  const getActivity = await getData();
  const containerActivity = document.getElementById("activity");

  getActivity.data.forEach((activity) => {
    const newDiv = document.createElement("div");

    newDiv.textContent = `${activity.activity} - ${activity.desc}`;
    containerActivity.appendChild(newDiv);
  });
}
main();

const inputActivity = document.getElementById("inputActivity");
const inputDesc = document.getElementById("inputDesc");
const addActivityButton = document.getElementById("addActivityButton");

addActivityButton.addEventListener("click", async () => {
  const activity = inputActivity.value;
  const desc = inputDesc.value;

  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([{ activity, desc }]),
  });
  const data = await response.json();
  console.log(data);

  window.location.reload();
});
