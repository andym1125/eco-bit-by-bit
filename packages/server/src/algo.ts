import {ScoreResponseBody, ScraperBody, ESG} from './../../types'

const SUSTAINABLE_CLOTHING_MATERIALS: string[] = ['Hemp', 'Organic Cotton', 'Organic Linen', 'Lyocell', 'Enconyl', 'Cork', 'Pinatex', 'Polyester', 'Bamboo', 'Stainless Steel',
                                                    'Straw', 'Recycled Plastics', 'Cotton', 'Linen', 'Recycled']; // Some common sustainable clothing materials to compare products with


export default function score(x: ScraperBody): ScoreResponseBody {

    let numScore = 0;
    let breakdown = "Score Breakdown:\n";
    let count = 0;

    // tslint:disable-next-line:prefer-for-of in
    for(let i = 0; i < SUSTAINABLE_CLOTHING_MATERIALS.length; ++i){
        if(x.description.includes(SUSTAINABLE_CLOTHING_MATERIALS[i])){
            ++count;
        }
    }

    if(count === 1){
        breakdown += "This product contains some sustainable materials.\n"
        numScore += 5;
    }

    else if(count === 2 || count === 3){
        breakdown += "This product contains sustainable materials.\n"
        numScore += 15;
    }

    else if(count >= 4){
        breakdown += "This product contains many sustainable materials.\n"
        numScore += 25;
    }

    else{
        breakdown += "This product could not be determined to contain any sutainable materials.\n"
    }


    // ESG score assignment

    breakdown += "ESG(Environmental, Social, and Governance) Ratings aim to measure a company's management of financially relevant ESG risks and opportunities.\n"
    if(x.esg === 'ccc'){
        numScore += 5;
        breakdown += "Manufacturer ESG rating: CCC\nA rating of CCC indicates company is laggard.\n";
    }

    else if(x.esg === 'b'){
        numScore += 8;
        breakdown += "Manufacturer ESG rating: B\nA rating of B indicates company is laggard.\n";
    }

    else if(x.esg === 'bb'){
        numScore += 12;
        breakdown += "Manufacturer ESG rating: BB\nA rating of BB indicates company is average.\n";
    }

    else if(x.esg === 'bbb'){
        numScore += 15;
        breakdown += "Manufacturer ESG rating: BBB\nA rating of BBB indicates company is average.\n";
    }

    else if(x.esg === 'a'){
        numScore += 20;
        breakdown += "Manufacturer ESG rating: A\nA rating of A indicates company is average.\n";
    }

    else if(x.esg === 'aa'){
        numScore += 22;
        breakdown += "Manufacturer ESG rating: AA\nA rating of AA indicates company is leader.\n";
    }

    else if(x.esg === 'aaa'){
        numScore += 25;
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
        numScore += 25;
        breakdown += "MSCI Implied Temperature Rise less than or equal to 1.5 indicates this company is alligned with global temperature goals.\n";
    }

    else if(x.temp <= 2){
        numScore += 15;
        breakdown += "MSCI Implied Temperature Rise between 1.5 and 2 indicates this company is alligned with global temperature goals.\n";

    }

    else if(x.temp <= 3.2){
        numScore += 10;
        breakdown += "MSCI Implied Temperature Rise between 2 and 3.2 indicates this company is misalligned with global temperature goals.\n";

    }

    else{
        numScore += 5;
        breakdown += "MSCI Implied Temperature Rise greater than 3.2 indicates this company is strongly misalligned with global temperature goals.\n";

    }
    // temp assignment end


    // Customer review score assignment
    breakdown += "Customer Review Analysis\n"
    if(x.customer_rating === 1){
        breakdown += "Customers really didn't like this product.\n"
        numScore += 5;
    }

    else if(x.customer_rating === 2){
        breakdown += "Customers didn't like this product.\n"
        numScore += 10;
    }

    else if(x.customer_rating === 3){
        breakdown += "Customers thought that this product was okay.\n"
        numScore += 15;
    }

    else if(x.customer_rating === 4){
        breakdown += "Customers enjoyed this product.\n"
        numScore += 20;
    }

    else if(x.customer_rating === 5){
        breakdown += "Customers really liked this product.\n"
        numScore += 25;
    }

    if(x.errmsg)
    {
        return {
            name: x.title,
            url: 'string',
            score: 0,
            breakdown: {
                water: 0,
                carbon: 0,
                esg: x.esg,
                bio: 0,
                recycle: 0,
                durable: 0,
                ctx: null,
            },
            err: null,
            expl: '', // explanation of scores
            reli_expl: '',
            reliability: 0
        }
    }


    return {
        name: x.title,
        url: 'string',
        score: 65, // placeholder
        breakdown: {
            water: 65, // placeholder
            carbon: 65, // placeholder
            esg: x.esg,
            bio: 65, // placeholder
            recycle: 65, // placeholder
            durable: x.customer_rating ? x.customer_rating*20 : 0,
            ctx: '',
        },
        err: null,
        expl: breakdown, // placeholder
        reli_expl: ' //placeholder', // placeholder
        reliability: 65 // placeholder
    }
}

// tslint:disable-next-line:no-console in
console.log(score({
    title: "Fancy boots",
    manufacturer: "Walmart",
    customer_rating: 4.2,
    esg: 'aa',
    // temp: 1.7,
    description: "string"
}))
