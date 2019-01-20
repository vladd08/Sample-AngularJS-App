import Cat from "../models/cat";

const CatService = [
  () => {
    let catService = {};
    let cats = [
      new Cat(
        "Tom",
        "Common",
        /* jshint ignore:start */
        "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        /* jshint ignore:end */
        2,
        "Male"
      ),
      new Cat(
        "Joy",
        "Brittish shorthair",
        /* jshint ignore:start */
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXjhYG2c5myi8y_vziQOoCg_4WvcIHkAFKr9PpsJCUZSTKZtDD",
        /* jshint ignore:end */
        0.6,
        "Male"
      ),
      new Cat(
        "Lucy",
        "Imperial",
        /* jshint ignore:start */
        "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        /* jshint ignore:end */
        1,
        "Female"
      ),
      new Cat(
        "Julie",
        "Common",
        /* jshint ignore:start */
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoweT_7x_-6xw2jD1svn8S5JIP7xaWzmQDp2x7d21Wo7CHlXv5",
        /* jshint ignore:end */
        1.4,
        "Female"
      )
    ];

    catService.addCat = cat => {
      cats.push(cat);
    };
    catService.getCats = () => {
      return cats;
    };
    catService.getCatById = id => {
      return cats[id - 1];
    };

    return catService;
  }
];

export default CatService;
