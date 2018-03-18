Meteor.publish("recipes", function(){
   return Recipes.find({author: this.userId}); 
});

Meteor.publish("recipeDetail", function(id){
    check(id, String);
    return Recipes.find({_id: id}); 
 });
// console.log(Meteor.settings.public.ga.account);