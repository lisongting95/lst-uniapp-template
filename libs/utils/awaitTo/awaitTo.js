/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
function to(promise) {
  return promise.then(res => [null, res]).catch(error => [error])
}

export default to
// # sourceMappingURL=await-to-js.es5.js.map
