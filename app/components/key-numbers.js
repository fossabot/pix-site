import Component from '@ember/component'; 

export default Component.extend({

    //Element
    classNames: ['key-numbers'],
    tagName: 'section',

    // Props
    title: 'Pix, c’est…',

    init() {
        this._super(...arguments);
        this.set('keynumbers', [{
            number: '280 000',
            desc: 'comptes créés'
        }, {
            number: '27 millions',
            desc: 'de questions répondues'
        }, {
            number: '3 000',
            desc: 'parcours de tests passés'  
        }, {
            number: '1 500',
            desc: 'organisations partenaires'
        }, {
            number: '35 000',
            desc: 'certifications Pix délivrées'
        }]); 
    }
});

