let SUSTAINABLE_CLOTHING_MATERIALS: string[] = ['Hemp', 'Organic Cotton', 'Organic Linen', 'Lyocell', 'Enconyl', 'Cork', 'Pinatex']; // Some common sustainable clothing materials to compare products with

// Check if product materials matches any of the sustainable materials in above array
function Contains_Sustainable_Materials(productMaterial: string){
    return SUSTAINABLE_CLOTHING_MATERIALS.find(element => element === productMaterial);
}