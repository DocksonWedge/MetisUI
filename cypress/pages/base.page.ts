export class BasePage {
    baseUrl: string
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }
    
    get url(){
        return this.baseUrl
    }
    /* I'm using text here since there are no obvious test selectors, 
    * and text seems more readable and arguably more reliable than relying on 
    * the order of the contents box.
    */
    get tocEntries() {
        return `.toctext`
    }

    tocLink(title: string) {
        return `a[href="#${title.replace(" ", "_")}"]`
    }

    get sectionHeader() {
        return `.mw-headline`
    }
}