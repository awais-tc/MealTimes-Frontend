import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  menuId: {
    type: Number,
    required: true,
    unique: true,
    auto: true
  },
  chefId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  meals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal'
  }]
});

menuSchema.methods.addMeal = async function(meal) {
  this.meals.push(meal);
  await this.save();
};

menuSchema.methods.removeMeal = async function(mealId) {
  this.meals = this.meals.filter(meal => !meal._id.equals(mealId));
  await this.save();
};

const Menu = mongoose.model('Menu', menuSchema);
export default Menu;