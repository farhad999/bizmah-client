export const computeImageUrl = (image) => {
  if (!image) {
    return '';
  }
  return `${process.env.BASE_URL}/storage/${image}`
}
