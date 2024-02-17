import * as Yup from "yup";

export const validationSchema = (category, fileRef) =>
  Yup.object({
    name: Yup.string()
      .required("Required")
      .matches(/^[A-Za-z]+$/, "Only letters required"),
    rprice: Yup.number()
      .required("Required")
      // .matches(/^[0-9]+$/, "Only number"),
      .positive()
      .integer(),
    price: Yup.number().required("Required").positive().integer(),
    // .matches(/^[0-9]+$/, "Only number"),
    desc: Yup.string().required("Required"),
    files: Yup.mixed()
      .test("is-file-too-big", "File exceeds 10MB", () => {
        let valid = true;
        const files = fileRef?.current?.files;
        if (files) {
          const fileArr = Array.from(files);
          fileArr.forEach((file) => {
            const size = file.size / 1024 / 1024;
            if (size > 10) {
              valid = false;
            }
          });
        }
        return valid;
      })
      .test("is-file-of-correct-type", "File is not of supported type", () => {
        let valid = true;
        const files = fileRef?.current?.files;
        if (files) {
          const fileArr = Array.from(files);
          fileArr.forEach((file) => {
            const type = file.type.split("/")[1];
            const validTypes = [
              "zip",
              "xml",
              "xhtml+xml",
              "plain",
              "svg+xml",
              "rtf",
              "pdf",
              "jpeg",
              "png",
              "jpg",
              "ogg",
              "json",
              "html",
              "gif",
              "csv",
            ];
            if (!validTypes.includes(type)) {
              valid = false;
            }
          });
        }
        return valid;
      }),
    category: Yup.string()
      .oneOf(
        category?.map((item) => {
          return item?._id;
        }),
        "Invalid Category"
      )
      .required("Required"),
    quantity: Yup.number().required("Required").positive().integer(),
    // .matches(/^[0-9]+$/, "Only number"),
    shipping: Yup.number().required("Required").positive().integer(),
  });
