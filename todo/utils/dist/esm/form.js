"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormData = exports.fromInputNameToAttr = exports.formDataWithCover = exports.tagsToOptions = void 0;

var tagsToOptions = function tagsToOptions(tags) {
  return tags ? tags.split(', ').map(function (t) {
    return {
      id: t,
      name: t
    };
  }) : [];
};

exports.tagsToOptions = tagsToOptions;

var formDataWithCover = function formDataWithCover(uploader, key) {
  var formData = new FormData();

  if (uploader.getImage()) {
    var cover = uploader.getImage();
    formData.append("".concat(key, "[cover]"), cover.files[0]);
    formData.append('crop_x', cover.crop_x);
    formData.append('crop_y', cover.crop_y);
    formData.append('crop_w', cover.crop_w);
    formData.append('crop_h', cover.crop_h);
  }

  return formData;
};

exports.formDataWithCover = formDataWithCover;

var fromInputNameToAttr = function fromInputNameToAttr(name) {
  return name.split('[')[1].replace(']', '');
};

exports.fromInputNameToAttr = fromInputNameToAttr;

var getFormData = function getFormData(object) {
  return Object.keys(object).reduce(function (formData, key) {
    formData.append(key, object[key]);
    return formData;
  }, new FormData());
};

exports.getFormData = getFormData;