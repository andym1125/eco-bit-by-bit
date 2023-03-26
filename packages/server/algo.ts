let Sustainable_Clothing_Materials: string[] = ['Hemp', 'Organic Cotton', 'Organic Linen', 'Lyocell', 'Enconyl', 'Cork', 'Pinatex']; //Some common sustainable clothing materials to compare products with

//Check if product materials matches any of the sustainable materials in above array
function Contains_Sustainable_Materials(product_material string){
    return Sustainable_Clothing_Materials.find(element => element == product_material);
}