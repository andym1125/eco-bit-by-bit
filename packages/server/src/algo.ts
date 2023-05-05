import {ScoreResponseBody, ScraperBody, ESG} from './../../types'


export default function score(x: ScraperBody): ScoreResponseBody {

    let numScore = 0;
    let carbonScore = 0,
    bioScore = 0,
    recycleScore = 0,
    durability = 0,
    waterScore = 0,
    reliabilityScore = 0;
    let mFlag = false,
    esgFlag = true;
    let reliabilityExp = "Reliability Score: ";

    let ScoreExp = "\nMaterial Breakdown:\n";
    if(x.description.includes("hemp") || x.description.includes("Hemp")){
        ScoreExp += "This product uses hemp. Hemp produces far more pulp per plant than the equivalent amount of timber and is biodegradable.\n";
        waterScore += 50;
        bioScore += 50;
        recycleScore += 50;
        durability += 20;
        carbonScore += 50;
        mFlag = true;
    }

    if(x.description.includes("Cotton") || x.description.includes("cotton")){
        ScoreExp += "This product uses cotton. Cotton is all-natural and biodegradable, however, Cotton farming is water-intensive and the crop requires the use of pesticides.\n";
        waterScore += 10;
        bioScore += 30;
        recycleScore += 40;
        durability += 40;
        carbonScore += 20;
        mFlag = true;
    }

    if(x.description.includes("Linen") || x.description.includes("linen")){
            ScoreExp += "Linen is a natural fiber made from the flax plant, it is both recyclable and biodegradable.\n";
            ScoreExp += "The Flax crop is much more eco-friendly than cotton, as it requires no irrigation.\n";
            waterScore += 30;
            bioScore += 40;
            recycleScore += 50;
            durability += 50;
            carbonScore += 30;
            mFlag = true;

    }

    if(x.description.includes("Cork") || x.description.includes("cork")){
        ScoreExp += "Cork is a biodegradable material gathered from the bark of a tree and regenerates after harvesting.\n";
        ScoreExp += "Cork is notable for it's strength and durability\n";
        waterScore += 50;
        bioScore += 50;
        recycleScore += 50;
        durability += 50;
        carbonScore += 50;
        mFlag = true;
    }

    if(x.description.includes("Lyocell") || x.description.includes("lyocell")){
        waterScore += 30;
        ScoreExp += "Lyocell is a greener alternative to other silk-like fabrics, production of Lyocell produces far less toxic chemicals such as carbon disulfide.\n";
        bioScore += 50;
        recycleScore += 50;
        durability += 50;
        carbonScore += 30;
        mFlag = true;
    }

    if(x.description.includes("Straw") || x.description.includes("straw")){
        ScoreExp += "Straw is cheap and biodegradable and readily available almost anywhere.\n";
        waterScore += 40;
        bioScore += 50;
        recycleScore += 50;
        durability += 50;
        carbonScore += 50;
        mFlag = true;
    }

    if(x.description.includes("Stainless Steel") || x.description.includes("stainless steel")){
        ScoreExp += "Stainless steel is produced toxin free, is super durable, and can be recycled plenty of times, however, the production of stainless steel uses a lot of water.\n";
        waterScore += 10;
        bioScore += 50;
        recycleScore += 50;
        durability += 50;
        carbonScore += 10;
        mFlag = true;
    }

    if(x.description.includes("pinatex") || x.description.includes("Pinatex")){
        ScoreExp += "Pinatex is a leather aleternative made from pineapples. It is used from waste materials and is vegan friendly.\n";
        ScoreExp += "Pinatex is a sustainable, low waste alternative to leather.\n";
        waterScore += 40;
        bioScore += 50;
        recycleScore += 50;
        durability += 50;
        carbonScore += 50;
        mFlag = true;
    }

    if(x.description.includes("Straw") || x.description.includes("straw")){
        ScoreExp += "Straw is cheap and biodegradable and readily available almost anywhere.\n";
        waterScore += 40;
        bioScore += 50;
        recycleScore += 50;
        durability += 50;
        carbonScore += 50;
        mFlag = true;
    }

    if(x.description.includes("Polyester") || x.description.includes("polyester")){
        ScoreExp += "Polyester is a synthetic fiber.It is not biodegradable and its production is not water conservative\n";
        waterScore -= 50;
        bioScore -= 50;
        recycleScore -= 50;
        durability += 50;
        carbonScore -= 50;
        mFlag = true;
    }

    if(x.description.includes("Rayon") || x.description.includes("rayon")){
        ScoreExp += "Rayon is better than other synthetic fibers like polyester and nylon, however, it is still an unsustainable material which has a harmful impact on the planet.\n";
        waterScore -= 50;
        bioScore -= 50;
        recycleScore -= 50;
        durability += 50;
        carbonScore -= 50;
        mFlag = true;
    }

    if(waterScore < 0){
        waterScore = 0;
    }

    else if(waterScore > 100){
        waterScore = 100;
    }

    if(bioScore < 0){
        bioScore = 0;
    }

    else if(bioScore > 100){
        bioScore = 100;
    }

    if(recycleScore < 0){
        recycleScore = 0;
    }

    else if(recycleScore > 100){
        recycleScore = 100;
    }

    if(durability < 0){
        durability = 0;
    }

    else if(durability > 100){
        durability = 100;
    }

    if(carbonScore < 0){
        carbonScore = 0;
    }

    else if(carbonScore > 100){
        carbonScore = 100;
    }

    // ESG score assignment
    ScoreExp += "\nESG(Environmental, Social, and Governance) Ratings aim to measure a company's management of financially relevant ESG risks and opportunities.\n"
    if(x.esg === 'ccc'){
        numScore += 5;
        ScoreExp += "Manufacturer ESG rating: CCC\nA rating of CCC indicates company is laggard.\n";
    }

    else if(x.esg === 'b'){
        numScore += 8;
        ScoreExp += "Manufacturer ESG rating: B\nA rating of B indicates company is laggard.\n";
    }

    else if(x.esg === 'bb'){
        numScore += 12;
        ScoreExp += "Manufacturer ESG rating: BB\nA rating of BB indicates company is average.\n";
    }

    else if(x.esg === 'bbb'){
        numScore += 15;
        ScoreExp += "Manufacturer ESG rating: BBB\nA rating of BBB indicates company is average.\n";
    }

    else if(x.esg === 'a'){
        numScore += 20;
        ScoreExp += "Manufacturer ESG rating: A\nA rating of A indicates company is average.\n";
    }

    else if(x.esg === 'aa'){
        numScore += 22;
        ScoreExp += "Manufacturer ESG rating: AA\nA rating of AA indicates company is leader.\n";
    }

    else if(x.esg === 'aaa'){
        numScore += 25;
        ScoreExp += "Manufacturer ESG rating: AAA\nA rating of AAA indicates company is leader.\n";
    }

    else{
        ScoreExp += "ESG score not found for the manufacturer of this product.\n";
        esgFlag = false;
        // ESG not available
    }
    // ESG score assignment end

    // Carbon score assignment
    ScoreExp += "\nImplied Temperature Rise from MSCI ESG Research is an intuitive, forward-looking metric, expressed in degrees Celsius, designed to show the temperature alignment of companies with global temperature goals\n";
    if(x.temp <= 1.5){
        numScore += 25;
        ScoreExp += "MSCI Implied Temperature Rise less than or equal to 1.5 indicates this company is alligned with global temperature goals.\n";
    }

    else if(x.temp <= 2){
        numScore += 15;
        ScoreExp += "MSCI Implied Temperature Rise between 1.5 and 2 indicates this company is alligned with global temperature goals.\n";

    }

    else if(x.temp <= 3.2){
        numScore += 10;
        ScoreExp += "MSCI Implied Temperature Rise between 2 and 3.2 indicates this company is misalligned with global temperature goals.\n";

    }

    else{
        numScore += 5;
        ScoreExp += "MSCI Implied Temperature Rise greater than 3.2 indicates this company is strongly misalligned with global temperature goals.\n";

    }
    // temp assignment end


    // Customer review score assignment
    ScoreExp += "Customer Review Analysis\n"
    if(x.customer_rating === 1){
        ScoreExp += "This product averaged a 1 star rating indicating this is probably not a durable product.\n"
        numScore += 5;
        reliabilityScore += 5;
    }

    else if(x.customer_rating === 2){
        ScoreExp += "This product averaged a 2 star rating indicating this may not be a durable product.\n"
        numScore += 10;
        reliabilityScore += 10;
    }

    else if(x.customer_rating === 3){
        ScoreExp += "This product averaged a 3 star rating indicating this product has average durability.\n"
        numScore += 15;
        reliabilityScore += 15;
    }

    else if(x.customer_rating === 4){
        ScoreExp += "This product averaged a 4 star rating indicating this could be a durable product.\n"
        numScore += 20;
        reliabilityScore += 20;
    }

    else if(x.customer_rating === 5){
        ScoreExp += "This product averaged a 5 star rating indicating this is a durable product.\n"
        numScore += 25;
        reliabilityScore += 25;
    }

    if(esgFlag && mFlag){
        reliabilityScore +=75;
    }

    else if(esgFlag || mFlag){
        reliabilityScore += 50;
    }

    else{
        reliabilityScore += 20;
    }

    if(reliabilityScore >= 90){
        reliabilityExp += "A\tWe found information on the manufacturer and what materials are used. This product also received positive reviews.\n";
    }

    else if(reliabilityScore >= 80){
        reliabilityExp += "B\tWe found information on the manufacturer and what materials are used. This product did not receive very good reviews.\n";
    }

    else if(reliabilityScore >= 65){
        if(esgFlag){
            reliabilityExp += "C\tWe found information on the manufacturer, but not on any of the materials used. This product also received positive reviews.\n";
        }

        else{
            reliabilityExp += "C\tWe found information on the materials used, but not about the manufacturer. This product also received positive reviews.\n";
        }
    }

    else if(reliabilityScore >= 50){
        if(esgFlag){
            reliabilityExp += "D\tWe found information on the manufacturer, but not on any of the materials used. This product did not receive very good reviews.\n";
        }

        else{
            reliabilityExp += "D\tWe found information on the materials used, but not about the manufacturer. This product did not receive very good reviews.\n";
        }
    }

    else if(reliabilityScore >= 35){
        reliabilityExp += "E\tWe could not find any information on the manufacturer or the materials used. This product did however receive positive reviews.\n";
    }

    else{
        reliabilityExp += "F\tWe could not find any information on the manufacturer or the materials used. This product recieved poor reviews.\n";
    }

    if(x.errmsg)
    {
        return {
            name: x.title,
            url: x.url,
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
        url: x.url,
        score: numScore, // placeholder
        breakdown: {
            water: waterScore, // placeholder
            carbon: carbonScore, // placeholder
            esg: x.esg,
            bio: bioScore, // placeholder
            recycle: recycleScore, // placeholder
            durable: x.customer_rating ? x.customer_rating*20 : 0,
            ctx: '',
        },
        err: null,
        expl: ScoreExp, // placeholder
        reli_expl: reliabilityExp, // placeholder
        reliability: reliabilityScore // placeholder
    }
}
