export function deepPopulate(field) {
  return function (next) {
    this.populate(field);
    next();
  };
}
