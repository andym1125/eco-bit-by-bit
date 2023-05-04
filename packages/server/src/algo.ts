import {ScoreResponseBody, ScraperBody} from './../../types'

const SUSTAINABLE_CLOTHING_MATERIALS: string[] = ['Hemp', 'Organic Cotton', 'Organic Linen', 'Lyocell', 'Enconyl', 'Cork', 'Pinatex', 'Polyester']; // Some common sustainable clothing materials to compare products with

// Check if product materials matches any of the sustainable materials in above array
function Contains_Sustainable_Materials(productMaterial: string){
    return SUSTAINABLE_CLOTHING_MATERIALS.find(element => element === productMaterial);
}

/*
function HTMLToString ( HTMLelement ) {
    var tmpNode = document.createElement( "div" );
    tmpNode.appendChild( HTMLelement.cloneNode( true ) );
    var str = tmpNode.innerHTML;
    tmpNode = HTMLelement = null; // prevent memory leaks in IE
    return str;
 }
*/

function score(x: ScraperBody):   void{

    let score = 0;
    let breakdown = "Score Breakdown:\n";

    // ESG score assignment

    if(x.esg == 'CCC'){
        score += 1;
        breakdown += "CCC indicates company is laggard.\n";
    }

    else if(x.esg == 'B'){
        score += 2;
        breakdown += "B indicates company is laggard.\n";
    }

    else if(x.esg == 'BB'){
        score += 3;
        breakdown += "BB indicates company is average.\n";
    }

    else if(x.esg == 'BBB'){
        score += 4;
        breakdown += "BBB indicates company is average.\n";
    }

    else if(x.esg == 'A'){
        score += 6;
        breakdown += "A indicates company is average.\n";
    }

    else if(x.esg == 'AA'){
        score += 8;
        breakdown += "AA indicates company is leader.\n";
    }

    else if(x.esg == 'AAA'){
        score += 10;
        breakdown += "AAA indicates company is leader.\n";
    }

    else{
        // ESG not available
    }
    // ESG score assignment end

    // Carbon score assignment
    if(x.temp == -1){
        // temp not available
    }

    else if(x.temp <= 1.5){
        score += 10;
        breakdown += "MSCI Implied Temperature Rise less than or equal to 1.5 indicates this company is alligned with global temperature goals.\n";
    }

    else if(x.temp <= 2){
        score += 8;
        breakdown += "MSCI Implied Temperature Rise between 1.5 and 2 indicates this company is alligned with global temperature goals.\n";

    }

    else if(x.temp <= 3.2){
        score += 4;
        breakdown += "MSCI Implied Temperature Rise between 2 and 3.2 indicates this company is misalligned with global temperature goals.\n";

    }

    else{
        score += 1;
        breakdown += "MSCI Implied Temperature Rise greater than 3.2 indicates this company is strongly misalligned with global temperature goals.\n";

    }
    // temp assignment end


    // Customer review score assignment
    if(x.customer_rating == 1){
        score += 1;
    }

    else if(x.customer_rating == 2){
        score += 2;
    }

    else if(x.customer_rating == 3){
        score += 3;
    }

    else if(x.customer_rating == 4){
        score += 4;
    }

    else if(x.customer_rating == 5){
        score += 5;
    }


}
