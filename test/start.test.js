import { expect } from 'chai';

//just a stupid test 

it('should add numbers', () => {
    const num1 = 2;
    const num2 = 3;
    const result = num1 + num2;
    // defining the success condition (using chai and expect function)
    // there is 
    expect(result).to.equal(5);
});
it('should not add numbers', () => {
    const num1 = 2;
    const num2 = 3;
    const result = num1 + num2;
    
    expect(result).not.to.equal(6);
});

/* describe('', () => {
    it('', () => {
        const num1 = 2;
        const num2 = 3;
        const result = num1 + num2;
        
        expect(result).to.equal(5);
    });

    it('', () => {
        const num1 = 2;
        const num2 = 3;
        const result = num1 + num2;
        
        expect(result).to.not.equal(6);
    });
}); */
