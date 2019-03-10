export default (dataName, textError) => (`
  <span data-name=${dataName}-error class="error-label negative-margin_top">
    ${textError}
  </span>
`);
