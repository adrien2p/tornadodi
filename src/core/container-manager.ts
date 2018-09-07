import { Container } from "./container";

class ContainerManagerStatic {
    private defaultToken: any =  Symbol('default');
    private $$containers: Map<any, Container> = new Map();
    private $$current: Container;

    constructor() {
        /**
         * Initialize the default container.
         */
        const defaultContainer = new Container(this.defaultToken,);
        this.$$containers.set(this.defaultToken, defaultContainer);
        this.$$current = defaultContainer;
    }

    /**
     * @desc Create a new container and store it.
     *
     * @param token
     * @return {Container}
     */
    public create(token: any): Container {
        const container = new Container(token);
        this.$$containers.set(token, container);
        return container;
    }

    /**
     * @desc Allow to get the default container.
     *
     * @return {Container}
     */
    public get(token?: any): Container {
        const container = this.$$containers.get(token || this.defaultToken);
        if (!container) throw new Error(`Unable to find the container with the token "${token}".`);
        return container;
    }

    /**
     * @desc Allow to set a new container which as not be created through the ContainerManager.
     *
     * @param {Container} container
     * @return {this}
     */
    public set(container: Container): this {
        this.$$containers.set(container.token, container);
        return this;
    }
}

export const ContainerManager = new ContainerManagerStatic();