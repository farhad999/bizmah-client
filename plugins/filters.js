import Vue from 'vue';

Vue.filter('priceFormat', function (value, size = 0) {
  if (value === undefined) return '';

  let number = parseFloat(value);

  return '৳' + number.toLocaleString();
})

Vue.filter('capitalize', function (value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
})
