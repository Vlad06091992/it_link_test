// ---- query ---------

// get colors

// query GetAllColors {
//   getAllColors {
//     id
//     name
//     rgb
//     hex
//     created_at
//   }
// }

// query GetAllColors {
//   getAllColors(pageNumber: 3) {
//     id
//     name
//     rgb
//     hex
//     created_at
//   }
// }

//get color by name

// query FindColorByName {
//   findColorByName(name: "Зеленый") {
//     id
//     name
//     rgb
//     hex
//     created_at
//   }
// }

// ---- mutation ---------

// add color

// mutation AddColor {
//   addColor(
//     colorData: { name: "Черный", hex: "#FF0000", rgb: "rgb(255, 255, 0)" }
// ) {
//     id
//     name
//     rgb
//     hex
//     created_at
//   }
// }

//remove by id

// mutation AddColor {
//   removeColorById(id: 34)
// }

//update color

// mutation UpdateColorById {
//   updateColorById(id: 37, colorUpdateDTO:  { name: "Зеленый", hex: "#FF22000", rgb: "rgb(255, 255, 317)" })
// }
