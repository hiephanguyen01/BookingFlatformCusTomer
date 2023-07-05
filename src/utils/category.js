import images from "../assets/images";

export const CATEGORIES = [
  {
    id: 1,
    label: "Studio",
    img: images.studio1,
    linkTo: "studio",
  },
  {
    id: 2,
    label: "Nhiếp ảnh",
    img: images.cameraman,
    linkTo: "photographer",
  },
  {
    id: 3,
    label: "Trang phục",
    img: images.clothes,
    linkTo: "clothes",
  },
  {
    id: 4,
    label: "Make up",
    img: images.makeup,
    linkTo: "makeup",
  },
  {
    id: 5,
    label: "Thiết bị",
    img: images.camera,
    linkTo: "device",
  },
  {
    id: 6,
    label: "Người mẫu",
    img: images.model,
    linkTo: "model",
  },
];

export const categories = {
  1: "studio",
  2: "photographer",
  3: "clothes",
  4: "makeup",
  5: "device",
  6: "model",
};
