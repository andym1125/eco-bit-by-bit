import {ScoreResponseBody, ScraperBody, ESG} from './../../types'

const SUSTAINABLE_CLOTHING_MATERIALS: string[] = ['Hemp', 'Organic Cotton', 'Organic Linen', 'Lyocell', 'Enconyl', 'Cork', 'Pinatex', 'Polyester', 'Bamboo', 'Stainless Steel',
                                                    'Straw', 'Recycled Plastics', 'Cotton', 'Linen', 'Recycled']; // Some common sustainable clothing materials to compare products with


function score(x: ScraperBody):   void{

    let score = 0;
    let breakdown = "Score Breakdown:\n";
    let count = 0;

    for(let i = 0; i < SUSTAINABLE_CLOTHING_MATERIALS.length; ++i){
        if(x.description.includes(SUSTAINABLE_CLOTHING_MATERIALS[i])){
            ++count;
        }
    }

    if(count == 1){
        breakdown += "This product contains some sustainable materials.\n"
        score += 5;
    }

    else if(count == 2 || count == 3){
        breakdown += "This product contains sustainable materials.\n"
        score += 15;
    }

    else if(count >= 4){
        breakdown += "This product contains many sustainable materials.\n"
        score += 25;
    }

    else{
        breakdown += "This product could not be determined to contain any sutainable materials.\n"
    }


    // ESG score assignment

    breakdown += "ESG(Environmental, Social, and Governance) Ratings aim to measure a company's management of financially relevant ESG risks and opportunities.\n"
    if(x.esg == 'ccc'){
        score += 5;
        breakdown += "Manufacturer ESG rating: CCC\nA rating of CCC indicates company is laggard.\n";
    }

    else if(x.esg == 'b'){
        score += 8;
        breakdown += "Manufacturer ESG rating: B\nA rating of B indicates company is laggard.\n";
    }

    else if(x.esg == 'bb'){
        score += 12;
        breakdown += "Manufacturer ESG rating: BB\nA rating of BB indicates company is average.\n";
    }

    else if(x.esg == 'bbb'){
        score += 15;
        breakdown += "Manufacturer ESG rating: BBB\nA rating of BBB indicates company is average.\n";
    }

    else if(x.esg == 'a'){
        score += 20;
        breakdown += "Manufacturer ESG rating: A\nA rating of A indicates company is average.\n";
    }

    else if(x.esg == 'aa'){
        score += 22;
        breakdown += "Manufacturer ESG rating: AA\nA rating of AA indicates company is leader.\n";
    }

    else if(x.esg == 'aaa'){
        score += 25;
        breakdown += "Manufacturer ESG rating: AAA\nA rating of AAA indicates company is leader.\n";
    }

    else{
        breakdown += "ESG score not found for the manufacturer of this product.\n";
        // ESG not available
    }
    // ESG score assignment end

    // Carbon score assignment
    breakdown += "Implied Temperature Rise from MSCI ESG Research is an intuitive, forward-looking metric, expressed in degrees Celsius, designed to show the temperature alignment of companies with global temperature goals\n";
    if(x.temp <= 1.5){
        score += 25;
        breakdown += "MSCI Implied Temperature Rise less than or equal to 1.5 indicates this company is alligned with global temperature goals.\n";
    }

    else if(x.temp <= 2){
        score += 15;
        breakdown += "MSCI Implied Temperature Rise between 1.5 and 2 indicates this company is alligned with global temperature goals.\n";

    }

    else if(x.temp <= 3.2){
        score += 10;
        breakdown += "MSCI Implied Temperature Rise between 2 and 3.2 indicates this company is misalligned with global temperature goals.\n";

    }

    else{
        score += 5;
        breakdown += "MSCI Implied Temperature Rise greater than 3.2 indicates this company is strongly misalligned with global temperature goals.\n";

    }
    // temp assignment end


    // Customer review score assignment
    breakdown += "Customer Review Analysis\n"
    if(x.customer_rating == 1){
        breakdown += "Customers really didn't like this product.\n"
        score += 5;
    }

    else if(x.customer_rating == 2){
        breakdown += "Customers didn't like this product.\n"
        score += 10;
    }

    else if(x.customer_rating == 3){
        breakdown += "Customers thought that this product was okay.\n"
        score += 15;
    }

    else if(x.customer_rating == 4){
        breakdown += "Customers enjoyed this product.\n"
        score += 20;
    }

    else if(x.customer_rating == 5){
        breakdown += "Customers really liked this product.\n"
        score += 25;
    }


}
