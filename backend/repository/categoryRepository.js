
const Category=require('../models/categoryModel')

class CategoryRepository{
    async existCategory(name){
       try {
            const existingCategory = await Category.findOne({
              name: { $regex: new RegExp(`^${name}$`, "i") },
            });
        
            return existingCategory;
          } catch (error) {
           console.log(error);
          }
    }
    async createCategory(name,image){
    try {
        const newCategory = new Category({ name:name, images:image });
        const savedCategory = await newCategory.save();
        return savedCategory;
      } catch (error) {
        throw new Error('Error in creating category: ' + error.message);
      }

 }
 async  getCategoryById(categoryId) {
    try {
        const category = await Category.findById(categoryId);
        return category;
    } catch (error) {
        console.log('Error in getting category by ID: ' + error.message);
    }
}
async updateCategoryName(categoryId,name){
  try{
    const category =await this.getCategoryById(categoryId)
     category.name= name?name:category.name
     await category.save()
     }catch (error) {
  console.error('Error updating category name:', error);}}

async updateCategoryimage(categoryId,images){
  try{
  const category =await this.getCategoryById(categoryId)
   category.images= images?images:category.images
   await category.save()
}catch (error) {
  console.error('Error updating category image:', error);}}
async getCategories() {
  try {
    const categories = await Category.find();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
   
  }
}

}

module.exports= CategoryRepository