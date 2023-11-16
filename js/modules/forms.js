function forms() {
  //Forms
  const forms = document.querySelectorAll("form");

  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо, скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      // body: formData, //Используется при работе с formData
      body: data,
    });

    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
      display: block;
      margin:0 auto;
      `;
      // form.append(statusMessage);
      form.insertAdjacentElement("afterend", statusMessage);

      // const request = new XMLHttpRequest(); //Это используется при XMLHHTPRequest
      // request.open("POST", "server.php");  //Это используется при XMLHHTPRequest
      // request.setRequestHeader("Content-type", "multipart/form-data"); //При formData не надо писать заголовки

      // request.setRequestHeader("Content-type", "application/json"); // Это используется при XMLHHTPRequest, При JSON

      const formData = new FormData(form);

      // const object = {}; //Это используется для работы с JSON файлами
      // formData.forEach(function (value, key) {
      //   object[key] = value;
      // });

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      // const json = JSON.stringify(object); //Это используется при XMLHHTPRequest

      // request.send(json);
      // fetch("server.php", {
      //   method: "POST",
      //   headers: { "Content-type": "application/json" },
      //   // body: formData, //Используется при работе с formData
      //   body: JSON.stringify(object),
      // })
      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });

      // request.addEventListener("load", () => { //Это используется при XMLHHTPRequest
      //   if (request.status === 200) {
      //     console.log(request.response);
      //     showThanksModal(message.success);
      //     statusMessage.remove();
      //     form.reset();
      //   } else {
      //     showThanksModal(message.failure);
      //   }
      // });
    });
  }

  function showThanksModal(message) {
    const previousModalDialog = document.querySelector(".modal__dialog");
    previousModalDialog.classList.add("hide");
    previousModalDialog.classList.remove("show");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      previousModalDialog.classList.add("show");
      previousModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }

  fetch("http://localhost:3000/menu").then((data) => data.json());
  // .then((res) => console.log(res));

  //   fetch("https://jsonplaceholder.typicode.com/posts", {
  //     method: "POST",
  //     body: JSON.stringify({ name: "Alex" }),
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((json) => console.log(json));
}

module.exports = forms;
