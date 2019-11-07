export default params => {
  return `
    <div style="min-width: 0">
      <div class="progress" style="height: 5px;">
        <div
          class="progress-bar"
          role="progressbar"
          style="width: ${params.value * 100}%;"
          aria-valuenow="${params.value * 100}"
          aria-valuemin="0"
          aria-valuemax="100"
          >
        </div>
      </div>
    </div>
  `;
};
