export function searchResults({ query, results }) {
  const queryRegex = new RegExp(`(${query})`, "i");

  if (!results) return "";

  const resultsHTML = results
    ? results
        .filter(Boolean)
        .map(([method, path, operation]) => {
          const route = `${method} ${path}`.replace(
            queryRegex,
            `<mark>$1</mark>`
          );
          const summary = operation.summary.replace(
            queryRegex,
            `<mark>$1</mark>`
          );
          return `<li>
<a href="/${method}/${path}">
  <h3>${summary}</h3>
  <pre><code>${route}</code></pre>
</a>
</li>`;
        })
        .join("\n")
    : "";

  if (resultsHTML) {
    return `<h2>${results.length} Results</h2>
    
  <ul>
    ${resultsHTML}
  </ul>`;
  }

  if (query) {
    return `<p>
    No results found for <code>${query}</code>. Try these examples: <br />
    <a href="/?query=GET /user"><code>GET /user</code></a
    >,
    <a href="/?query=/repos/{owner}/{repo}"
      ><code>/repos/{owner}/{repo}</code></a
    >,
    <a href="/?query=label"><code>label</code></a>
  </p>`;
  }

  return `<p>
  Examples: <br />
  <a href="/?query=GET /user"><code>GET /user</code></a
  >,
  <a href="/?query=/repos/{owner}/{repo}"
    ><code>/repos/{owner}/{repo}</code></a
  >,
  <a href="/?query=label"><code>label</code></a>
</p>`;
}
