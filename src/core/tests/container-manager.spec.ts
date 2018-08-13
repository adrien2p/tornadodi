import { ContainerManager } from "../";
import { Container } from "../container";

describe('ContainerManager', () => {
    it('should have been initialize with a default container', () => {
        const container = ContainerManager.get();

        expect(container).toBeTruthy();
    });
    it('should be able to create a new container', () => {
        const container = ContainerManager.create('container1');

        expect(container).toBeTruthy();
        expect(container.token).toBe('container1');
    });
    it('should be able to get a container by giving a token', () => {
        const container = ContainerManager.get('container1');

        expect(container).toBeTruthy();
        expect(container.token).toBe('container1');
    });
    it('should not be able to get a container if it does not exist', () => {
        let error = null;
        try {
            ContainerManager.get('container2');
        } catch(e) {
            error = e;
        }

        expect(error).toBeDefined();
        expect(error.message).toBe(`Unable to find the container with the token "container2".`);
    });
    it('should keep the reference on the container', () => {
        let container = ContainerManager.get();
        container.registerAsValue({ useValue: 42, token: 'staticValue' });

        container = ContainerManager.get();
        const providerValue = container.get('staticValue');

        expect(providerValue).toBe(42);
    });
    it('should be able to set a new container', () => {
        const container = new Container('container2');
        ContainerManager.set(container);

        const setContainer = ContainerManager.get('container2');

        expect(setContainer).toBeTruthy();
        expect(setContainer.token).toBe(container.token);
        expect(setContainer).toEqual(container);
    });
});