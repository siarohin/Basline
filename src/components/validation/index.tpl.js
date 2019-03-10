export default (dataName, textError) => (
  `<span data-name=${dataName}-error class="error-label">
    ${textError}
  </span>
`);
