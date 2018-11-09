export const tagsToOptions = tags =>
  tags
    ? tags.split(', ').map(t => ({
        id: t,
        name: t,
      }))
    : [];

export const formDataWithCover = (uploader, key) => {
  const formData = new FormData();
  if (uploader.getImage()) {
    const cover = uploader.getImage();
    formData.append(`${key}[cover]`, cover.files[0]);
    formData.append('crop_x', cover.crop_x);
    formData.append('crop_y', cover.crop_y);
    formData.append('crop_w', cover.crop_w);
    formData.append('crop_h', cover.crop_h);
  }
  return formData;
};

export const fromInputNameToAttr = name => name.split('[')[1].replace(']', '');

export const getFormData = object =>
  Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
  }, new FormData());
