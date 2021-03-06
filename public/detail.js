import { requestPreview } from "/components/request-preview.js";

const $parametersForm = document.querySelector(`#parametersForm`);
const $requestPreview = document.querySelector(`#requestPreview`);
const $requestPreviewForm = document.querySelector(`#request-preview`);

function updateRequestPreview(event) {
  const form = new FormData($parametersForm);
  const { token, ...rest } = Object.fromEntries(form.entries());

  const options = Object.fromEntries(
    Object.entries(rest).filter(([key, value]) => value !== "")
  );

  const path = decodeURIComponent(location.pathname);
  const [method] = path.substr(1).split("/");
  const url = path.substr(method.length + 1);

  const requestOptions = {
    baseUrl: "https://api.github.com",
    method,
    url,
    headers: {
      authorization: `bearer ${token}`,
      accept: "application/vnd.github.v3+json",
      "user-agent": `octokit.rest`
    },
    mediaType: {
      previews: []
    },
    ...options
  };

  $requestPreview.innerHTML = requestPreview(requestOptions);

  const query = new URLSearchParams();
  for (const [parameter, value] of Object.entries({ token, ...rest })) {
    query.append(parameter, value);
  }
  window.history.pushState({}, null, `?${query}`);
}

$parametersForm.addEventListener("keyup", updateRequestPreview);
$parametersForm.addEventListener("submit", event => {
  event.preventDefault();
  $requestPreviewForm.submit();
});

const $submitButton = $parametersForm.querySelector("button");
$submitButton.style.display = "none";
